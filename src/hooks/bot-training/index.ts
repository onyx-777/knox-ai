import { helpdeskQuestionSubmit, onCreateFilterQuestions, onGetAllFilterQuestions } from "@/actions/bot-training";
import { useToast } from "@/components/ui/use-toast";
import {
  FilterQuestionsProps,
  FilterQuestionsSchema,
  HelpDeskQuestionsProps,
  HelpDeskQuestionsSchema,
} from "@/schemas/chatbot.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useHelpDesk = (domainId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<HelpDeskQuestionsProps>({
    resolver: zodResolver(HelpDeskQuestionsSchema),
  });

  const onQuestionSubmit = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const response = await helpdeskQuestionSubmit(values, domainId);
      if (response) {
        reset();
        setLoading(false);
        toast({
          title: "Success",
        });
      }
      router.refresh();
    } catch (error) {
      console.log("error in hooks/chatbot helpdekh hook : ", error);
    }
  });

  return {
    errors,
    loading,
    register,
    onQuestionSubmit,
  };
};

export const useFilterQuestions = (domainId: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FilterQuestionsProps>({
    resolver: zodResolver(FilterQuestionsSchema),
  })
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [isQuestions, setIsQuestions] = useState<
    { id: string; question: string }[]
  >([])

  const onAddFilterQuestions = handleSubmit(async (values) => {
    setLoading(true)
    const questions = await onCreateFilterQuestions(domainId, values.question)
    if (questions) {
      reset();
      setIsQuestions(questions.questions!)
      toast({
        title: questions.status == 200 ? 'Success' : 'Error',
        description: questions.message,
      })
      reset()
      setLoading(false)
    }
  })

  const onGetQuestions = async () => {
    setLoading(true)
    const questions = await onGetAllFilterQuestions(domainId)
    if (questions) {
      setIsQuestions(questions.questions)
      setLoading(false)
    }
  }

  useEffect(() => {
    onGetQuestions()
  }, [])

  return {
    loading,
    onAddFilterQuestions,
    register,
    errors,
    isQuestions,
  }
}
