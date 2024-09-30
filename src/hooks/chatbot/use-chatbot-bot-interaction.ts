import { onChatBotSendMessage } from "@/actions/chatbot/bot";
import { useChatContext } from "@/context/user-chat-context";
import {
  ChatBotMessageProps,
  ChatBotMessageSchema,
} from "@/schemas/chatbot.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { pusherClient } from "@/lib/utils";
import { getAllMessages } from "@/actions/chatbot/human";
import { useRouter } from "next/navigation";

export const useChatbot = (domainId: string) => {
  const {
    chatRoomId: contextChatRoomId,
    setChatRoomId,
    setRealtime,
    realtime: contextRealtime,
  } = useChatContext();
  const [localChatRoomId, setLocalChatRoomId] = useState<string | undefined>(
    contextChatRoomId
  );
  const [localRealtime, setLocalRealtime] = useState<boolean>(contextRealtime);
  const [returnResponse, setReturnResponse] = useState<string | null>(null);
  const [AiResponse, setAiResponse] = useState<string[]>([]);
  const [userResponse, setUserResponse] = useState<string[]>([]);
  const messageWindowRef = useRef<HTMLDivElement | null>(null);
  const [onAiTyping, SetOnAiTyping] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChatBotMessageProps>({
    resolver: zodResolver(ChatBotMessageSchema),
    mode: "onChange",
  });

  const onScrollToBottom = () => {
    if (messageWindowRef.current) {
      messageWindowRef.current.scroll({
        top: messageWindowRef.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    onScrollToBottom();
  }, [userResponse, AiResponse]);

  useEffect(() => {
    console.log("pusherCLient useeffect bot");

    const pusher = pusherClient.subscribe("realtime");
    console.log('pusher : ', pusher)
    pusher.bind("ownerResponse", (data: string) => {
      setAiResponse((prev) => [...prev, data]);
      console.log("data : ", data);
    });


    return () => {
      pusherClient.unbind("ownerResponse");
      pusherClient.unsubscribe("realtime");
    };
  }, []);

  useEffect(() => {
    setLocalChatRoomId(contextChatRoomId);
    setLocalRealtime(contextRealtime);
  }, [contextChatRoomId, contextRealtime]);

  const onStartChatting = handleSubmit(async (values) => {
    if (values.content) {
      console.log('values : ', values.content)
      setUserResponse((prev) => [...prev, values.content!]);
      reset();
      SetOnAiTyping(true);

      try {
        const response = await onChatBotSendMessage(
          domainId,
          values.content,
          localChatRoomId,
          localRealtime
        );
        SetOnAiTyping(false);

        if (response) {
          setAiResponse((prev) => [...prev, response.response!]);
          setLocalChatRoomId(response.chatRoomId);
          setLocalRealtime(response.isLive);
          setChatRoomId(response.chatRoomId);
          setRealtime(response.isLive);
          setReturnResponse(response.response);
          console.log(
            localChatRoomId,
            localRealtime,
            contextChatRoomId,
            contextRealtime,
            returnResponse
          );
        }
      } catch (error) {
        console.error("Error in onChatBotSendMessage:", error);
        SetOnAiTyping(false);
      }
    }
  });

  useEffect(() => {
    console.log("Updated localChatRoomId:", localChatRoomId);
    console.log("Updated localRealtime:", localRealtime);
  }, [localChatRoomId, localRealtime]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (localChatRoomId) {
  //       const msgs = await getAllMessages(localChatRoomId!);
  //       setUserResponse(msgs?.question!);
  //       setAiResponse(msgs?.answer!);
  //     }
  //     router.refresh();
  //   };

  //   fetchData();
  // }, [localChatRoomId, setUserResponse, setAiResponse]);

  return {
    onAiTyping,
    messageWindowRef,
    register,
    onStartChatting,
    AiResponse,
    errors,
    userResponse,
    realtime: localRealtime,
    chatRoomId: localChatRoomId,
  };
};
