import { Suspense, lazy } from 'react';
import { getDomain } from "@/actions/domain";
import { getAllHelpDeskQuestions } from "@/actions/bot-training";
import InfoBar from "@/components/infobar";
import { Separator } from "@/components/ui/separator";
import Section from "@/components/section-label";
import { ChatBot } from "@prisma/client";
import dynamic from 'next/dynamic';

const UpsertDomainBtn = dynamic(() => import("@/components/domain/upsert-domain-btn"), { ssr: false });
const DeleteDomain = dynamic(() => import("@/components/domain/actions").then(mod => ({ default: mod.DeleteDomain })), { ssr: false });
const CodeSnippet = lazy(() => import("@/components/domain/code-snippet"));
const EditChatbotIcon = lazy(() => import("@/components/chatbot/edit-chatbot"));
const BotTraining = lazy(() => import("@/components/chatbot/bot-training"));

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
  </div>
);

type Props = {
  params: {
    id: string;
  };
};

const DomainId = async ({ params }: Props) => {
  const [getDomainInfo, helpDeskQuestions] = await Promise.all([
    getDomain(params.id),
    getAllHelpDeskQuestions(params.id)
  ]);

  if (!getDomainInfo) return null;

  return (
    <div className="p-10">
      <div className="flex justify-between items-center w-full">
        <div>
          <InfoBar data={getDomainInfo} />
        </div>
        <div className="flex justify-end gap-5 items-center w-full">
          <Suspense fallback={<LoadingSkeleton />}>
            <UpsertDomainBtn btnName="Edit Domain" domainData={getDomainInfo} />
            <DeleteDomain id={params.id} />
          </Suspense>
        </div>
      </div>
      <div className="flex flex-col justify-center items-start gap-10">
        <Suspense fallback={<LoadingSkeleton />}>
          <CodeSnippet id={params.id} />
        </Suspense>
        <Separator className="bg-gray-600" />
        <div className="px-20">
          <Section
            label="Customize Chatbot"
            message="customize your chatbot in your desireable format"
          />
        </div>
        <Suspense fallback={<LoadingSkeleton />}>
          <EditChatbotIcon
            domainId={params.id}
            data={getDomainInfo.ChatBot as ChatBot}
          />
        </Suspense>
        <Separator className="bg-gray-600" />
        <Suspense fallback={<LoadingSkeleton />}>
          <BotTraining id={params.id} helpDeskQuestions={helpDeskQuestions} />
        </Suspense>
      </div>
    </div>
  );
};

export default DomainId;