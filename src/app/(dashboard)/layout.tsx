import React, { useMemo } from "react";
import BlurPage from "@/components/global/BlurPage";
import NavBar from "@/components/navbar";
import Sidebar from "@/components/sidebar/dashboard";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ChatProvider } from "@/context/user-chat-context";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/sign-in");
  }
  return (
    <>
      <NavBar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4 overflow-auto mt-10 min-h-screen min-w-screen transition-all duration-300 ml-72 sidebar-collapsed:ml-20">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
