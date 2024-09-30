import { onUpdatePassword } from "@/actions/auth";
import { toast, useToast } from "@/components/ui/use-toast";
import {
  ChangePasswordProps,
  ChangePasswordSchema,
} from "@/schemas/auth.schema";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useThemeMode = () => {
  const { setTheme, theme } = useTheme();

  return {
    setTheme,
    theme,
  };
};

export const useChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordProps>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: 'onChange',
  })
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)

  const onChangePassword = handleSubmit(async (values) => {
    try {
      setLoading(true)
      const updated = await onUpdatePassword(values.password)
      if (updated) {
        reset()
        setLoading(false)
        toast({ title: 'Success', description: updated.message })
      }
    } catch (error) {
      console.log(error)
    }
  })
  return {
    register,
    errors,
    onChangePassword,
    loading,
  }
}