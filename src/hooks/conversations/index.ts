import {
  onGetChatMessages,
  onGetDomainChatRooms,
  onViewUnReadMessages,
} from "@/actions/conversations";
import { useChatContext } from "@/context/user-chat-context";
import { getMonthName } from "@/lib/utils";
import {
  ConversationSearchProps,
  ConversationSearchSchema,
} from "@/schemas/conversation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useConversation = () => {
  const { register, watch } = useForm<ConversationSearchProps>({
    resolver: zodResolver(ConversationSearchSchema),
    mode: "onChange",
  });

  const { setLoading: loadMessages, setChats, setChatRoom } = useChatContext();
  const [loading, setLoading] = useState<boolean>(false);

  const [chatRooms, setChatRooms] = useState<
    {
      chatRoom: {
        id: string;
        createdAt: Date;
        message: {
          message: string;
          createdAt: Date;
          seen: boolean;
        }[];
      }[];
      email: string | null;
    }[]
  >([]);

  useEffect(() => {
    const search = watch(async (values) => {
      try {
        const rooms = await onGetDomainChatRooms(values.domainId!);
        if (rooms) {
          setLoading(false);
          setChatRooms(rooms.Customer);
        }
      } catch (error) {
        console.log(error);
      }
    });

    return () => search.unsubscribe();
  }, [watch]);

  const onGetActiveChatMessages = async (id: string) => {
    try {
      setLoading(true);
      const messages = await onGetChatMessages(id);
      if (messages) {
        setChatRoom(id);
        loadMessages(false);
        setChats(messages[0].message);
      }
    } catch (error) {
      console.log("error in hooks/conversation : ", error);
    }
  };

  return {
    register,
    chatRooms,
    loading,
    onGetActiveChatMessages,
  };
};

export const useChatTime = (createdAt: Date, roomId: string) => {
  const { chatRoom } = useChatContext();
  const [messageSentAt, setMessageSentAt] = useState<string>();
  const [urgent, setUrgent] = useState<boolean>(false);

  const onSetMessageRecievedDate = () => {
    const dt = new Date(createdAt);
    const current = new Date();
    const currentDate = current.getDate();
    const hr = dt.getHours();
    const min = dt.getMinutes();
    const date = dt.getDate();
    const month = dt.getMonth();
    const difference = currentDate - date;

    if (difference <= 0) {
      setMessageSentAt(`${hr}:${min}${hr > 12 ? "PM" : "AM"}`);
      if (current.getHours() - dt.getHours() < 2) {
        setUrgent(true);
      }
    } else {
      setMessageSentAt(`${date} ${getMonthName(month)}`);
    }
  };

  const onSeenChat = async () => {
    if (chatRoom == roomId && urgent) {
      await onViewUnReadMessages(roomId);
      setUrgent(false);
    }
  };

  useEffect(() => {
    onSeenChat();
  }, [chatRoom]);

  useEffect(() => {
    onSetMessageRecievedDate();
  }, []);

  return { messageSentAt, urgent, onSeenChat };
};
