"use client";
import React, { useEffect, useState } from "react";
import { BotIcon } from "@/icons/bot-icon";
import { useModal } from "@/providers/modal-provider";
import BotUi from "./bot-ui";
import { BotWindow } from "./window";
import { useChatContext } from "@/context/user-chat-context";

const Chatbot = ({domainId} : {domainId : string}) => {
  const { chatRoomId } = useChatContext();

  const { setOpen, setClose, isOpen } = useModal();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const sendMessageToParent = () => {
      if (window.parent !== window) {
        window.parent.postMessage(
          JSON.stringify({ type: "resize", isOpen }),
          "*"
        );
      }
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === "string") {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "close") {
            setClose();
          }
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      }
    };

    if (!isAnimating) {
      sendMessageToParent();
    }
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isOpen, setClose, isAnimating]);

  const handleOpenChat = () => {
    setIsAnimating(true);
    setOpen(
      <BotUi>
        <BotWindow domainId={domainId} />
      </BotUi>
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="h-screen flex flex-col justify-end items-end">
      {!isOpen ? (
        <div
          className="w-[60px] h-[60px] bg-orange rounded-full flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
          onClick={handleOpenChat}
        >
          <BotIcon />
        </div>
      ) : (
        <BotUi>
          <BotWindow domainId={domainId} />
        </BotUi>
      )}
    </div>
  );
};

export default Chatbot;
