import React, { BaseSyntheticEvent, RefObject } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import FormGenerator from "../forms/form-generator";
import { Loader } from "../loader";
import { Button } from "../ui/button";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Send } from "lucide-react";

type Props = {
  messageWindowRef: RefObject<HTMLDivElement | null>;
  domainId: string;
  chatRoomId?: string;
  combinedResponses?: ({
    role: string;
    content: string;
} | null)[]
  onStartChatting: (e?: BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

const ChatbotWindow = ({
  messageWindowRef,
  combinedResponses,
  domainId,
  chatRoomId,
  errors,
  onStartChatting,
  register,
}: Props) => {
  // if(!combinedResponses) return
  return (
    <div
      className={` ${
        chatRoomId ? "w-[70%] h-screen border-2" : "w-full h-full"
      } mx-auto flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden transition-all duration-300 ease-in-out`}
    >
      <div className="flex justify-between px-4 py-4">
        <div className="flex gap-2">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-start flex-col justify-between">
            <h3 className="text-lg font-bold leading-none">
              Sales Rep - Corinna {chatRoomId}
            </h3>
            <p>
              <div className="flex items-center space-x-2">
                <Switch
                  id="realtime-mode"
                  className="dark:bg-orange"
                  aria-readonly
                  disabled={true}
                />
                <Label htmlFor="realtime-mode" className="font-bold">
                  Live
                </Label>
              </div>
            </p>
          </div>
        </div>
      </div>
      <div
        ref={messageWindowRef}
        className="flex-grow overflow-y-auto p-4 space-y-4"
      >
        <div className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white dark p-3 rounded-lg max-w-[80%]">
          Hello! How can I assist you today? {domainId}
        </div>
        {combinedResponses?.map((response, i) => (
          <div
            key={i}
            className={`flex ${
              response?.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-[80%] ${
                response?.role === "user"
                  ? "bg-orange text-white dark:bg-black "
                  : "bg-gray-100 dark:bg-gray-800 "
              }`}
            >
              {response?.content}
            </div>
          </div>
        ))}
        {/* {onAiTyping && <TypingIndicator />} */}
      </div>
      <div className="p-4 border-t">
        <form
          onSubmit={onStartChatting}
          className="flex gap-4 justify-between items-center h-full w-full mb-10"
        >
          <div className="w-full flex justify-between items-center">
            <FormGenerator
              inputType={"input"}
              name="content"
              placeholder="Enter message..."
              register={register}
              type="text"
              errors={errors}
            />
          <Button
            type="submit"
            className="bg-black text-white dark:bg-white dark:text-black py-9"
            >
            <Send size={20} />
          </Button>
            </div>
        </form>
      </div>
      <div className="flex justify-center pb-2">
        <p className="text-gray-400 text-xs">Powered By Corinna</p>
      </div>
    </div>
  );
};

export default ChatbotWindow;
