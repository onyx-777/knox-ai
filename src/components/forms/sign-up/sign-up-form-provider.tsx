"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Loader } from "@/components/ui/loader";
import { useSignUpForm } from "@/hooks/sign-up";
import { ChevronLeft } from "lucide-react";
import {
  AuthContextProvider,
  useAuthContextHook,
} from "@/context/use-auth-context";

type Props = {
  children: React.ReactNode;
};

const SignUpFormProvider = ({ children }: Props) => {
  const { onGenerateOTP, onHandleSubmit, loading, methods } = useSignUpForm();
  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit} className="h-full">
          <div className="flex flex-col justify-between gap-3 h-full">
            <Loader loading={loading}>{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
};

export default SignUpFormProvider;
