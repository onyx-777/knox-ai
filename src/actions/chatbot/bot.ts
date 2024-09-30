"use server";

import { client } from "@/lib/prisma";
import { Groq } from "groq-sdk";
import { onGetAllFilterQuestions } from "../bot-training";
import { extractEmailsFromString, pusherServer } from "@/lib/utils";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const onChatBotSendMessage = async (
  domainId: string,
  customerResponse: string,
  chatRoomId: string | undefined,
  live: boolean
): Promise<{
  response: string | null;
  isLive: boolean;
  chatRoomId: string | undefined;
}> => {
  try {
    const ques = await onGetAllFilterQuestions(domainId);
    console.log("ques : ", ques);
    console.log("customerResponse : ", customerResponse);

    if (chatRoomId && live) {
      try {
        console.log("pusherServer trigger bot");
        await pusherServer.trigger("realtime", "customerResponse", {
          customerResponse,
          chatRoomId,
        });

        try {
          await client.chatMessage.upsert({
            where: {
              chatRoomId,
            },
            create: {
              question: [customerResponse],
              domainId,
            },
            update: {
              question: {
                push: [customerResponse],
              },
            },
          });
        } catch (error) {
          console.log(
            "error in client.chatMessage.update storing message in bot.ts :",
            error
          );
        }
        return {
          response: null,
          isLive: live,
          chatRoomId: chatRoomId,
        };
      } catch (error) {
        console.log("error in pusherServer : ", error);
        throw error;
      }
    } else {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "assistant",
            content: `Ask user for the email and verify its actually an email`,
          },
          {
            role: "user",
            content: customerResponse,
          },
        ],
        model: "llama3-70b-8192",
      });

      if (chatCompletion) {
        console.log("response : ", chatCompletion.choices[0].message.content);
        const extractedEmail = extractEmailsFromString(customerResponse);
        let customerEmail: string | undefined;
        if (extractedEmail) {
          customerEmail = extractedEmail[0];
        }

        if (customerEmail) {
          const isCustomerExists = await client.customer.findUnique({
            where: {
              email: customerEmail,
            },
            select: {
              email: true,
              id: true,
            },
          });

          if (isCustomerExists) {
            console.log("isCustomerExists : ", isCustomerExists);
            try {
              const response = await client.customer.update({
                where: {
                  id: isCustomerExists.id,
                },
                data: {
                  chatRoom: {
                    update: {
                      where: {
                        customerId: isCustomerExists.id,
                      },
                      data: {
                        live: true,
                      },
                    },
                  },
                  ChatMessage: {
                    update: {
                      where: {
                        customerId: isCustomerExists.id,
                      },
                      data: {
                        role: "user",
                      },
                    },
                  },
                },
                select: {
                  chatRoom: {
                    select: {
                      id: true,
                      live: true,
                    },
                  },
                  ChatMessage: {
                    select: {
                      id: true,
                    },
                  },
                },
              });
              return {
                response: `Welcome back ${
                  customerEmail.split("@")[0]
                }! I'm glad to connect with you again. Is there anything you need help with?`,
                isLive: response.chatRoom[0].live,
                chatRoomId: response.chatRoom[0].id,
              };
            } catch (error) {
              console.log(
                "error in client.chatroom.update in bot.ts : ",
                error
              );
              return {
                response: "An error occurred while updating your chat room.",
                isLive: false,
                chatRoomId: undefined,
              };
            }
          } else {
            try {
              const newCustomer = await client.customer.create({
                data: {
                  email: customerEmail,
                  domainId,
                  chatRoom: {
                    create: {
                      domainId,
                      live: true,
                    },
                  },
                  ChatMessage: {
                    create: {
                      domainId,
                    },
                  },
                },
                select: {
                  chatRoom: {
                    select: {
                      id: true,
                      live: true,
                    },
                  },
                },
              });

              return {
                response: `Welcome aboard ${
                  customerEmail.split("@")[0]
                }! I'm glad to connect with you. Is there anything you need help with?`,
                isLive: newCustomer.chatRoom[0].live,
                chatRoomId: newCustomer.chatRoom[0].id,
              };
            } catch (error) {
              console.log(
                "error in creating chatroom and chatMessages : ",
                error
              );
              return {
                response: "An error occurred while creating your chat room.",
                isLive: false,
                chatRoomId: undefined,
              };
            }
          }
        }

        return {
          response: chatCompletion.choices[0].message.content,
          isLive: false,
          chatRoomId: undefined,
        };
      }
    }

    // Fallback return in case none of the above conditions are met
    return {
      response: "I'm sorry, I couldn't process your request.",
      isLive: false,
      chatRoomId: undefined,
    };
  } catch (error) {
    console.log("error in onChatbotsendmessage : ", error);
    return {
      response: "An unexpected error occurred.",
      isLive: false,
      chatRoomId: undefined,
    };
  }
};
