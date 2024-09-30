"use server";

import { useChatContext } from "@/context/user-chat-context";
import { client } from "@/lib/prisma";
import {
  ChatBotMessageProps,
  ChatBotMessageSchema,
  ChatbotSchemaProps,
  HelpDeskQuestionsProps,
} from "@/schemas/chatbot.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

export const upsertChatbot = async (values: ChatbotSchemaProps, id: string) => {
  try {
    console.log(
      "values in upsertChatbot actions : ",
      values,
      "domainId : ",
      id
    );
    await client.chatBot.upsert({
      where: {
        domainId: id,
      },
      create: {
        name: values.name,
        domainId:id,
        welcomeMessage: values.welcomeMessage,
        icon: values.icon,
        background: values.background,
        helpdesk: values.helpdesk,
        textColor: values.textColor,
        ChatMessage : {},
      },
      update: {
        name: values.name,
        welcomeMessage: values.welcomeMessage,
        icon: values.icon,
        background: values.background,
        helpdesk: values.helpdesk,
        textColor: values.textColor,
      },
    });
  } catch (error) {
    console.log("error in upsertChatbot : ", error);
  }
};

export const getChatbotInfo = async (id: string) => {
  try {
    const response = await client.chatBot.findUnique({
      where: {
        id,
      },
    });
    return response;
  } catch (error) {
    console.log("error in getchatbotinfo in action/chatbot : ", error);
  }
};

// export const onOwnerSendMessage = async (
//   chatroom: string,
//   message: string,
//   role: 'assistant' | 'user'
// ) => {
//   try {
//     const chat = await client.chatRoom.update({
//       where: {
//         id: chatroom,
//       },
//       data: {
//         message: {
//           create: {
//             message,
//             role,
//           },
//         },
//       },
//       select: {
//         message: {
//           select: {
//             id: true,
//             role: true,
//             message: true,
//             createdAt: true,
//             seen: true,
//           },
//           orderBy: {
//             createdAt: 'desc',
//           },
//           take: 1,
//         },
//       },
//     })

//     if (chat) {
//       return chat
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

