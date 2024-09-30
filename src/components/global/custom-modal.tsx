"use client";
import { useModal } from "@/providers/modal-provider";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";

type Props = {
  title?: string;
  subheading?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const CustomModal = ({ children, defaultOpen, subheading, title }: Props) => {
  const { isOpen, setClose } = useModal();
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] p-0 overflow-scroll flex flex-col justify-center items-center">
        <DialogHeader className="text-left">
          <DialogTitle className="text-2xl font-bold text-center pt-10">{title}</DialogTitle>
          <DialogDescription>{subheading}</DialogDescription>
          <Separator className="w-full"/>
        </DialogHeader>
        <div className="mt-6">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;