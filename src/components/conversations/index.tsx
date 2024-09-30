"use client";
import React from "react";
import TabsMenu from "../tabs/intex";
import { TabsContent } from "../ui/tabs";
import ConversationSearch from "./search";
import { Loader } from "../loader";
import ChatCard from "./chat-card";
import { CardDescription } from "../ui/card";
import { Separator } from "../ui/separator";
import { TABS_MENU } from "@/constants/menu";
import { useConversation } from "@/hooks/conversations";
import { Domain } from "@prisma/client";
import Link from "next/link";
import ConversationPage from "../chatbot/conversations";
import { DataTable } from "./table/data-table";
import { ConversationCustomerType } from "@/lib/type";

type Props = {
  domainsData : ConversationCustomerType
};

const ConversationMenu = ({domainsData}: Props) => {
  // const { register, chatRooms, loading, onGetActiveChatMessages } =
  //   useConversation();

  return (
    <DataTable data={domainsData}  />
  );
};

export default ConversationMenu;
