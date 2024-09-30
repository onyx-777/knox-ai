"use server";

import { client } from "@/lib/prisma";
import { pusherServer } from "@/lib/utils";

export const onHumanSendMessage = async (
  domainId: string,
  ownerResponse: string,
  chatRoomId: string
) => {
  try {
    const live = await client.chatRoom.findUnique({
      where: {
        id: chatRoomId,
      },
      select: {
        live: true,
        customerId: true,
      },
    });

    if (live?.live && live.customerId) {
      try {
        console.log("pusherServer trigger human");
        console.log("human in pusher trigger : ", live?.live, live.customerId);

        pusherServer.trigger("realtime", "ownerResponse", ownerResponse);

        try {
          await client.chatMessage.upsert({
            where: {
              chatRoomId,
            },
            create: {
              answer: [ownerResponse],
              domainId,
            },
            update: {
              answer: {
                push: [ownerResponse],
              },
            },
          });
        } catch (error) {
          console.log(
            "error in client.chatMessage.update storing message in human.ts :",
            error
          );
        }
      } catch (error) {
        console.log("error in pusherServer in onHumanSendMessage : ", error);
      }
    }
  } catch (error) {
    console.log("error in onHumanSendMessage : ", error);
  }
};

export const getAllMessages = async (chatRoomId: string) => {
  try {
    return await client.chatMessage.findUnique({
      where: {
        chatRoomId,
      },
      select: {
        question: true,
        answer: true,
      },
    });
  } catch (error) {
    console.log("error in getAllMessages : ", error);
  }
};
