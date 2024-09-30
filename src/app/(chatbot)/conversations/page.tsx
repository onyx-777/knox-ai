import { onGetAllAccountDomains } from "@/actions/bot-training";
import NavBar from "@/components/navbar";
import Sidebar from "@/components/sidebar/dashboard";
import { Spinner } from "@/components/spinner";
import dynamic from "next/dynamic";
import React from "react";

const ConversationPage = async () => {
  const domains = await onGetAllAccountDomains();
  if (!domains) return;

  const DataTable = dynamic(
    () =>
      import("@/components/conversations/table/data-table").then(
        (mod) => mod.DataTable
      ),
    {
      loading: () => <Spinner />,
      ssr: false,
    }
  );

  const Messenger = dynamic(
    () => import("@/components/conversations/messenger"),
    {
      loading: () => <Spinner />,
      ssr: true,
    }
  );

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4 overflow-auto mt-10 min-h-screen min-w-screen transition-all duration-300 ml-72 sidebar-collapsed:ml-20">
          <NavBar />
          <div className="flex flex-col lg:flex-row overflow-hidden h-full justify-center items-start w-full flex-1">
            <div className="w-full flex-auto px-4">
              <DataTable data={domains} />
            </div>
            {/* <Separator className="bg-gray-400 h-full" orientation="vertical" /> */}
            <div className="w-full flex-auto px-4 overflow-hidden">
              <Messenger />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationPage;
