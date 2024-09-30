import { getAllMessages, onHumanSendMessage } from "@/actions/chatbot/human";
import { useChatContext } from "@/context/user-chat-context";
import { pusherClient } from "@/lib/utils";
import {
  HumanMessageProps,
  HumanMessageSchema,
} from "@/schemas/chatbot.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useChatbotHuman = (domainId: string) => {
  const { chatRoomId } = useChatContext();
  const router = useRouter();
  const [ownerResponse, setOwnerResponse] = useState<string[]>([]);
  const [userResponse, setUserResponse] = useState<string[]>([]);
  const messageWindowRef = useRef<HTMLDivElement | null>(null);
  const [onAiTyping, SetOnAiTyping] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HumanMessageProps>({
    resolver: zodResolver(HumanMessageSchema),
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
  }, [userResponse, ownerResponse]);

  useEffect(() => {
    console.log("pusherCLient useeffect human");
    pusherClient
      .subscribe("realtime")
      .bind(
        "customerResponse",
        (data: { customerResponse: string; chatRoomId: string }) => {
          console.log('data : ', data);

          setUserResponse((prev)=>[...prev, data.customerResponse]);
        }
      );
    return () => {
      pusherClient.unbind("customerResponse");
      pusherClient.unsubscribe("realtime");
    };
  }, []);

  const onStartChatting = handleSubmit(async (values) => {
    if (values && values.content) {
      setOwnerResponse((prev)=>[...prev, values.content!])
      reset();
      console.log("values : ", values.content);

      try {
        if (chatRoomId) {
          await onHumanSendMessage(domainId, values.content, chatRoomId);
        }
      } catch (error) {
        console.log("error in onStarting chat pusherclient : ", error);
      }
    }
    router.refresh();
  });

  console.log('userResponse in usehumaninteraction : ', userResponse)


  useEffect(() => {
    const fetchData = async () => {
      if (chatRoomId) {
        const msgs = await getAllMessages(chatRoomId!);
        setUserResponse(msgs?.question!);
        setOwnerResponse(msgs?.answer!);
      }
    };

    fetchData();
  }, [chatRoomId]);


  return {
    onAiTyping,
    messageWindowRef,
    register,
    onStartChatting,
    ownerResponse,
    errors,
    userResponse,
  };
};
