"use client";
import React, { useCallback, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Section from "@/components/section-label";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import FormGenerator from "../forms/form-generator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { HelpDeskQuestions } from "@/lib/type";
import { useHelpDesk } from "@/hooks/bot-training";

type Props = {
  id: string;
  helpDeskQues: HelpDeskQuestions;
};

const HelpDesk = ({ id, helpDeskQues }: Props) => {
  const { register, errors, onQuestionSubmit, loading } = useHelpDesk(id);

  const memoizedHelpDeskQues = useMemo(() => helpDeskQues, [helpDeskQues]);

  const renderAccordionItems = useCallback(() => {
    return memoizedHelpDeskQues?.question.map((ques, i) => (
      <AccordionItem key={i} value={`item-${i}`}>
        <AccordionTrigger>{ques}</AccordionTrigger>
        <AccordionContent>
          {memoizedHelpDeskQues.answer[i] || "No answer available"}
        </AccordionContent>
      </AccordionItem>
    ));
  }, [memoizedHelpDeskQues]);

  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
      <CardContent className="p-6 border-r-[1px]">
        <CardTitle>Help Desk</CardTitle>
        <form onSubmit={onQuestionSubmit} className="flex flex-col gap-6 mt-10">
          <div className="flex flex-col gap-3">
            <Section
              label="Question"
              message="Add a question that you believe is frequently asked."
            />
            <FormGenerator
              inputType="input"
              register={register}
              errors={errors}
              form="help-desk-form"
              name="question"
              placeholder="Type your question"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Section
              label="Answer to question"
              message="The answer for the question above."
            />
            <FormGenerator
              inputType="textarea"
              register={register}
              errors={errors}
              name="answer"
              form="help-desk-form"
              placeholder="Type your answer"
              type="text"
              lines={5}
            />
          </div>
          <Button
            type="submit"
            className="bg-orange hover:bg-orange hover:opacity-70 transition duration-150 ease-in-out text-white font-semibold"
          >
            <Loader loading={loading}>Create</Loader>
          </Button>
        </form>
      </CardContent>
      <CardContent className="p-6 overflow-y-auto chat-window">
        {memoizedHelpDeskQues?.question ? (
          <Accordion type="single" collapsible>
            {renderAccordionItems()}
          </Accordion>
        ) : (
          <CardDescription>No Questions to show</CardDescription>
        )}
      </CardContent>
    </Card>
  );
};

export default HelpDesk;