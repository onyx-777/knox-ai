"use client";
import React, { useEffect } from "react";
import { Loader } from "../loader";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PaperclipIcon } from "lucide-react";
import Bubble from "../chatbot/bubble";
import { useChatbotHuman } from "@/hooks/chatbot/use-chatbot-human-interaction";
import FormGenerator from "../forms/form-generator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { pusherClient } from "@/lib/utils";
import { useChatContext } from "@/context/user-chat-context";
import dynamic from "next/dynamic";
import { Spinner } from "../spinner";

const ChatbotWindow = dynamic(() => import("../global/chatbot-window"), {
  loading: () => <Spinner />,
  ssr: false,
});

type Props = {};

const TypingIndicator = () => (
  <div className="flex items-center space-x-1">
    <div
      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
      style={{ animationDelay: "0ms" }}
    ></div>
    <div
      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
      style={{ animationDelay: "150ms" }}
    ></div>
    <div
      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
      style={{ animationDelay: "300ms" }}
    ></div>
  </div>
);

const Messenger = (props: Props) => {
  const { chatRoomId, domainId } = useChatContext();
  const {
    messageWindowRef,
    register,
    onStartChatting,
    errors,
    userResponse,
    ownerResponse,
  } = useChatbotHuman(domainId!);

  console.log("userResponse : ", userResponse);

  const combinedResponses = [];
  const maxLength = Math.max(userResponse.length, ownerResponse.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < userResponse.length) {
      combinedResponses.push({
        role: "assistant",
        content: userResponse[i],
      });
    }
    if (i < ownerResponse.length) {
      combinedResponses.push({
        role: "user",
        content: ownerResponse[i],
      });
    }
  }

  console.log("combinedResponses in human", combinedResponses);

  return (
    <div>
      {chatRoomId ? (
          <ChatbotWindow
            combinedResponses={combinedResponses}
            domainId={domainId!}
            chatRoomId={chatRoomId}
            errors={errors}
            messageWindowRef={messageWindowRef}
            onStartChatting={onStartChatting}
            register={register}
          />
      ) : (
        <>No Chat Selected</>
      )}
    </div>
  );
};

export default Messenger;
