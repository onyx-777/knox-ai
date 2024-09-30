"use client";
import React from "react";
import { FormProvider } from "react-hook-form";
import { Loader } from "@/components/ui/loader";
import { useSignInForm } from "@/hooks/sign-in";
import { ChevronLeft } from "lucide-react";
import { AuthContextProvider, useAuthContextHook } from "@/context/use-auth-context";

type Props = {
  children: React.ReactNode;
};

const SignInFormProvider = ({ children }: Props) => {
  const { methods, onHandleSubmit, loading } = useSignInForm();
  const { currentStep, setCurrentStep } = useAuthContextHook();
  console.log('current step : ', currentStep);
  return (
    <AuthContextProvider>
      {currentStep > 1 && (
        <div className="-mt-10 mb-5">
          <ChevronLeft
            className="cursor-pointer text-black dark:text-white hover:shadow-gray-600 hover:shadow-lg rounded-full border border-orange"
            onClick={() => setCurrentStep((prev) => prev - 1)}
          />
        </div>
      )}
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

export default SignInFormProvider;
