"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
} from "../ui/dialog";
import { useModal } from "@/providers/modal-provider";

type Props = {
  children: React.ReactNode;
};

const BotUi = ({ children }: Props) => {
  const { isOpen, setClose } = useModal();
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent className="sm:max-w-[450px] w-[450px] h-[670px] p-0 m-0 overflow-hidden border-none rounded-xl shadow-lg transition-all duration-300 ease-in-out">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default BotUi;