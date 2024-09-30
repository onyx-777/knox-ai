"use server";

import { client } from "@/lib/prisma";
import {
  FilterQuestionsProps,
  HelpDeskQuestionsProps,
} from "@/schemas/chatbot.schema";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const helpdeskQuestionSubmit = async (
  values: HelpDeskQuestionsProps,
  domainId: string
) => {
  try {
    const response = await client.helpDesk.upsert({
      where: {
        domainId,
      },
      create: {
        question: {
          set: [values.question],
        },
        answer: {
          set: [values.answer],
        },
        Domain: {
          connect: {
            id: domainId,
          },
        },
      },
      update: {
        question: {
          push: [values.question],
        },
        answer: {
          push: [values.answer],
        },
      },
    });
    return response;
  } catch (error) {
    console.log("error in action/helpdesk : ", error);
  }
};

export const getAllHelpDeskQuestions = async (domainId: string) => {
  try {
    const response = await client.helpDesk.findFirst({
      where: {
        domainId,
      },
      select: {
        answer: true,
        question: true,
      },
    });
    return response;
  } catch (error) {
    console.log("error in action/helpdesk getAllHelpDeskQuestions : ", error);
  }
};

export const onCreateFilterQuestions = async (id: string, question: string) => {
  try {
    const filterQuestion = await client.domain.update({
      where: {
        id,
      },
      data: {
        FilterQuestions: {
          create: {
            question,
          },
        },
      },
      include: {
        FilterQuestions: {
          select: {
            id: true,
            question: true,
          },
        },
      },
    });

    if (filterQuestion) {
      return {
        status: 200,
        message: "Filter question added",
        questions: filterQuestion.FilterQuestions,
      };
    }
    return {
      status: 400,
      message: "Oops! something went wrong",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllFilterQuestions = async (id: string) => {
  try {
    const questions = await client.filterQuestions.findMany({
      where: {
        domainId: id,
      },
      select: {
        question: true,
        id: true,
      },
      orderBy: {
        question: "asc",
      },
      cacheStrategy: {
        swr: 120,
        ttl: 120,
      },
    });

    return {
      status: 200,
      message: "",
      questions: questions,
    };
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllAccountDomains = async () => {
  try {
    const user = await currentUser();
    if (!user) redirect("/auth/sign-in");

    const response = await client.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        Domain: {
          select: {
            id: true,
            name: true,
            icon: true,
            Customer: {
              select: {
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                  },
                },
                ChatMessage: {
                  select: {
                    seen: true,
                  },
                },
                email: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });

    const flattenedData = response?.Domain.flatMap((domain) =>
      domain.Customer.map((customer) => ({
        domainId: domain.id,
        domainName: domain.name,
        domainIcon: domain.icon,
        email: customer.email,
        createdAt: customer.createdAt,
        chatRoomId: customer.chatRoom[0].id,
        chatRoomLive: customer.chatRoom[0].live,
        chatMessageSeen: customer.ChatMessage[0].seen,
      }))
    );

    return flattenedData;
  } catch (error) {
    console.log("error in action/bot-training : ", error);
  }
};
