import { z } from "zod";

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 2; // 2MB
export const ACCEPTED_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

export type DomainSettingsProps = {
  name: string;
  domain: string;
  icon: string;
  welcomeMessage: string;
  
};

export const DomainSettingsSchema = z.object({
  domain: z
    .string()
    .min(4, { message: "A domain must have at least 3 characters" })
    .refine(
      (value) =>
        /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ""),
      "This is not a valid domain"
    )
    .optional()
    .or(z.literal("").transform(() => undefined)),
  icon: z.string().url(),
  welcomeMessage: z
    .string()
    .min(6, "The message must be at least 6 characters")
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

export const AddDomainSchema = z.object({
  name: z.string().min(2, { message: "Domain must be at least 2 characters" }),
  domain: z
    .string()
    .min(4, { message: "A domain must have at least 3 characters" })
    .refine(
      (value) =>
        /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ""),
      "This is not a valid domain"
    ),
  icon: z.string().url(),
  welcomeMessage: z
    .string()
    .min(4, { message: "A welcome message must have at least 3 characters" }),
});