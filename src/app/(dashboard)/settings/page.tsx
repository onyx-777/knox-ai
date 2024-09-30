import dynamic from "next/dynamic";
import React from "react";

const Plan = dynamic(() => import("@/components/settings/plan"), {
  loading: () => (
    <div className="w-[300px] h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
  ),
  ssr: true,
});
const ChangePassword = dynamic(
  () => import("@/components/settings/change-password"),
  {
    loading: () => (
      <div className="w-[300px] h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
    ),
    ssr: true,
  }
);
const DarkModetoggle = dynamic(
  () => import("@/components/settings/dark-mode"),
  {
    loading: () => (
      <div className="w-[300px] h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
    ),
    ssr: true,
  }
);

const Settings = () => {
  return (
    <>
      <div className="overflow-y-auto w-full chat-window flex-1 flex flex-col gap-10">
        <Plan />
        <DarkModetoggle />
        <ChangePassword />
      </div>
    </>
  );
};

export default Settings;
