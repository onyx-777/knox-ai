import { z, ZodType } from "zod";
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from "./domain.schema";

export type ChatbotSchemaProps = {
  name: string;
  welcomeMessage: string;
  icon: string;
  background?: string;
  textColor?: string;
  helpdesk?: boolean;
  domainId?: string;
};

export type HelpDeskQuestionsProps = {
  question: string;
  answer: string;
};

export type FilterQuestionsProps = {
  question: string;
};

export const AddChatbotSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Chatbot name must be at least 2 characters" }),
  welcomeMessage: z
    .string()
    .min(6, { message: "Welcome message must be at least 6 characters" }),
  icon: z
    .string()
    .min(2, { message: "Chatbot must have an avatar" }),
  background: z.string().optional(),
  textColor: z.string().optional(),
  helpdesk: z.boolean().optional(),
});

export const HelpDeskQuestionsSchema = z.object({
  question: z.string().min(1, { message: "Question cannot be left empty" }),
  answer: z.string().min(1, { message: "Question cannot be left empty" }),
});

export const FilterQuestionsSchema = z.object({
  question: z.string().min(1, { message: "Question cannot be left empty" }),
});

export type ChatBotMessageProps = {
  content?: string;
  image?: any;
};

export const ChatBotMessageSchema: ZodType<ChatBotMessageProps> = z
  .object({
    content: z
      .string()
      .min(1)
      .optional()
      .or(z.literal("").transform(() => undefined)),
    image: z.any().optional(),
  })
  .refine((schema) => {
    if (schema.image?.length) {
      if (
        ACCEPTED_FILE_TYPES.includes(schema.image?.[0].type!) &&
        schema.image?.[0].size <= MAX_UPLOAD_SIZE
      ) {
        return true;
      }
    }
    if (!schema.image?.length) {
      return true;
    }
  });

export type HumanMessageProps = {
  content?: string;
  image?: any;
};

export const HumanMessageSchema: ZodType<HumanMessageProps> = z
  .object({
    content: z
      .string()
      .min(1)
      .optional()
      .or(z.literal("").transform(() => undefined)),
    image: z.any().optional(),
  })
  .refine((schema) => {
    if (schema.image?.length) {
      if (
        ACCEPTED_FILE_TYPES.includes(schema.image?.[0].type!) &&
        schema.image?.[0].size <= MAX_UPLOAD_SIZE
      ) {
        return true;
      }
    }
    if (!schema.image?.length) {
      return true;
    }
  });
