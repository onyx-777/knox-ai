import CustomScrollArea from "@/components/global/scrollbars";
import NavBar from "@/components/navbar";
import Sidebar from "@/components/sidebar/dashboard";
import dynamic from "next/dynamic";

const ChatProvider = dynamic(
  () => import("@/context/user-chat-context").then((mod) => mod.ChatProvider),
  {
    ssr: true,
  }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ChatProvider>{children}</ChatProvider>;
}
