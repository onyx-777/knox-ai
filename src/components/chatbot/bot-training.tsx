import React, { Suspense, lazy } from "react";
import { TabsContent } from "../ui/tabs";
import TabsMenu from "../tabs/intex";
import { HELP_DESK_TABS_MENU } from "@/constants/form";
import { HelpDeskQuestions } from "@/lib/type";
import FilterQuestions from "./filter-questions";

const HelpDesk = lazy(() => import("./help-desk"));

type Props = {
  id: string;
  helpDeskQuestions: HelpDeskQuestions;
};

const BotTraining = ({ id, helpDeskQuestions }: Props) => {
  return (
    <div className="py-5 w-full mb-10 flex flex-col gap-5 items-start">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl">Bot Training</h2>
        <p className="text-sm font-light">
          Set FAQ questions, create questions for capturing lead information and
          train your bot to act the way you want it to.
        </p>
      </div>
      <TabsMenu triggers={HELP_DESK_TABS_MENU}>
        <TabsContent value="help desk" className="w-full mt-10">
          <Suspense fallback={<div>Loading Help Desk...</div>}>
            <HelpDesk id={id} helpDeskQues={helpDeskQuestions} />
          </Suspense>
        </TabsContent>
        <TabsContent value="questions" className="w-full mt-10">
          <Suspense fallback={<div>Loading Help Desk...</div>}>
            <FilterQuestions domainId={id} />
          </Suspense>
        </TabsContent>
      </TabsMenu>
    </div>
  );
};

export default BotTraining;
