'use client';

import React, { useMemo } from "react";
import ChatbotWindow from "../global/chatbot-window";
import { useChatbot } from "@/hooks/chatbot/use-chatbot-bot-interaction";

// Memoize the TypingIndicator component to prevent unnecessary re-renders
const TypingIndicator = React.memo(() => (
  <div className="flex items-center space-x-1">
    {[0, 150, 300].map((delay) => (
      <div
        key={delay}
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: `${delay}ms` }}
      />
    ))}
  </div>
));

TypingIndicator.displayName = 'TypingIndicator';

export const BotWindow = (({ domainId }: { domainId: string }) => {
  const {
    register,
    errors,
    onStartChatting,
    onAiTyping,
    messageWindowRef,
    AiResponse,
    userResponse,
    realtime
  } = useChatbot(domainId);

  // Memoize the combined responses to prevent unnecessary recalculations
  const combinedResponses = useMemo(() => {
    const maxLength = Math.max(userResponse.length, AiResponse.length);
    return Array.from({ length: maxLength }, (_, i) => [
      i < userResponse.length ? { role: "user", content: userResponse[i] } : null,
      i < AiResponse.length ? { role: "assistant", content: AiResponse[i] } : null
    ]).flat().filter(Boolean);
  }, [userResponse, AiResponse]);

  return (
    <ChatbotWindow
      combinedResponses={combinedResponses}
      domainId={domainId}
      errors={errors}
      messageWindowRef={messageWindowRef}
      onStartChatting={onStartChatting}
      register={register}
    />
  );
});
