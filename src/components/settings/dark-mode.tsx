"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { SystemMode } from "../themes-placeholder/systemmode";
import { LightMode } from "../themes-placeholder/lightmode";
import { DarkMode } from "../themes-placeholder/darkmode";
import { useThemeMode } from "@/hooks/settings/use-settings";
import { Separator } from "../ui/separator";
import dynamic from "next/dynamic";

const Section = dynamic(
  () => import("../section-label"),
  {
    loading: () => (
      <div className="w-[300px] h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
    ),
    ssr: false,
  }
);


type Props = {};

const DarkModetoggle = (props: Props) => {
  const { setTheme, theme } = useThemeMode();

  return (
    <>
      <Separator />
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
        <div className="lg:col-span-1">
          <Section
            label="Interface Theme"
            message="Select or customize your UI theme "
          />
        </div>
        <div className="lg:col-span-4 flex lg:flex-row flex-col items-start gap-5 flex-wrap">
          <div
            className={cn(
              "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
              theme == "system" && "border-orange"
            )}
            onClick={() => setTheme("system")}
          >
            <SystemMode />
          </div>
          <div
            className={cn(
              "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
              theme == "light" && "border-orange"
            )}
            onClick={() => setTheme("light")}
          >
            <LightMode />
          </div>
          <div
            className={cn(
              "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
              theme == "dark" && "border-orange"
            )}
            onClick={() => setTheme("dark")}
          >
            <DarkMode />
          </div>
        </div>
      </div>
    </>
  );
};

export default DarkModetoggle;
