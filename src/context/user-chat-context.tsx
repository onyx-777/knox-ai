"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ChatMessage = {
  id: string | undefined;
  role: "assistant" | "user";
  question: string[];
  answer: string[];
  createdAt: Date | undefined;
  seen: boolean;
};

type ChatInitialValuesProps = {
  realtime: boolean;
  setRealtime: React.Dispatch<React.SetStateAction<boolean>>;
  domainId: string | undefined;
  setDomainId: React.Dispatch<React.SetStateAction<string | undefined>>;
  chatRoomId: string | undefined;
  setChatRoomId: React.Dispatch<React.SetStateAction<string | undefined>>;
  chats: ChatMessage[];
  setChats: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatInitialValues: ChatInitialValuesProps = {
  chatRoomId: undefined,
  setChatRoomId: () => undefined,
  chats: [],
  setChats: () => undefined,
  loading: false,
  setLoading: () => undefined,
  realtime: false,
  setRealtime: () => undefined,
  domainId: undefined,
  setDomainId: () => undefined,
};

const chatContext = createContext<ChatInitialValuesProps>(ChatInitialValues);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatRoomId, setChatRoomId] = useState<string | undefined>(undefined);
  const [domainId, setDomainId] = useState<string | undefined>(undefined);
  const [realtime, setRealtime] = useState(false);

  const values: ChatInitialValuesProps = {
    chats,
    setChats,
    loading,
    setLoading,
    chatRoomId,
    setChatRoomId,
    realtime,
    setRealtime,
    domainId,
    setDomainId,
  };

  return <chatContext.Provider value={values}>{children}</chatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(chatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
