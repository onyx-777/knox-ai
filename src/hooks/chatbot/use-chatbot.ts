import { upsertChatbot } from "@/actions/chatbot";
import { toast, useToast } from "@/components/ui/use-toast";
import { AddChatbotSchema, ChatbotSchemaProps } from "@/schemas/chatbot.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useUpsertChatbot = (domainId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    watch,
  } = useForm<ChatbotSchemaProps>({
    resolver: zodResolver(AddChatbotSchema),
  });

  const onFormSubmit = handleSubmit(async (values) => {
    try {
      setLoading(true);
      await upsertChatbot(values, domainId);
      setLoading(false);
      toast({
        title: "Success",
      });
    } catch (error) {
      console.log("error in useUpsertChatbot", error);
    }
  });

  return {
    onFormSubmit,
    register,
    errors,
    loading,
    setValue,
    watch,
  };
};
