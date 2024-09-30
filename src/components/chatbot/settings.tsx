import PremiumBadge from "@/icons/premium-badge";
import React from "react";
import { Separator } from "../ui/separator";

type Props = {};

const Index = (props: Props) => {
  return (
    <div className="flex flex-col gap-3 mt-5">
      <div className="flex gap-4 items-center">
        <h2 className="font-bold text-2xl">Chatbot Settings</h2>
        <div className="flex gap-1 bg-cream rounded-full px-3 py-1 text-xs items-center font-bold">
          <PremiumBadge />
          Premium
        </div>
      </div>
      <Separator orientation="horizontal" />
      <div className="grid md:grid-cols-2">
        <div className="col-span-1 flex flex-col gap-5 order-last md:order-first">
          <EditChatbotIcon
            chatBot={chatBot}
            register={register}
            errors={errors}
          />
          <WelcomeMessage
            message={chatBot?.welcomeMessage!}
            register={register}
            errors={errors}
          />
        </div>
        <div className="col-span-1 relative ">
          <Image
            src="/images/bot-ui.png"
            className="sticky top-0"
            alt="bot-ui"
            width={530}
            height={769}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
