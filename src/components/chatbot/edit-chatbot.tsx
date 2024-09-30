import Section from "@/components/section-label";
import Image from "next/image";
import React, { lazy, Suspense } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ChatBot } from "@prisma/client";
import { Spinner } from "../spinner";

const UpsertChatbotForm = lazy(() => import("../forms/chatbot/upsert-form"));

const EditChatbotIcon = async ({
  domainId,
  data,
}: {
  domainId: string;
  data: ChatBot;
}) => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap justify-between items-center w-full px-20 gap-5">
      <div>
        <Card className="w-fit rounded-3xl">
          <CardHeader>
            <Section label="Chatbot" message="Edit chatbot settings." />
          </CardHeader>
          <CardContent className="w-fit">
            <Suspense fallback={<Spinner />}>
              <UpsertChatbotForm data={data} domainId={domainId} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
      <div className="relative aspect-square">
        <Image
          src="/images/iphonecorinna.png"
          width={300}
          height={100}
          alt="Logo"
          className="max-w-lg object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default EditChatbotIcon;
