"use client";
import React, { useState } from "react";
import OtpForm from "./otp-form";
import { useForm, useFormContext } from "react-hook-form";
import { AuthAs } from "@prisma/client";
import dynamic from "next/dynamic";
import { Spinner } from "@/components/ui/spinner";
import { z } from "zod";
import { UserRegistrationSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContextHook } from "@/context/use-auth-context";
import TypeSelectionForm from "./type-selection-form";

const DetailsForm = dynamic(() => import("./account-details-form"), {
  ssr: false,
  loading: Spinner,
});
type Props = {};

const RegistrationFormStep = ({}: Props) => {
  const { currentStep } = useAuthContextHook();
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [onUser, setOnUser] = useState<AuthAs>(AuthAs.OWNER);
  const [onOTP, setOnOTP] = useState<string>("");

  setValue("otp", onOTP);

  switch (currentStep) {
    case 1:
      return (
        <TypeSelectionForm
          register={register}
          setUserType={setOnUser}
          userType={onUser}
        />
      );
    case 2:
      return <DetailsForm errors={errors} register={register} />;
    case 3:
      return <OtpForm onOTP={onOTP} setOTP={setOnOTP} />;
    default:
      break;
  }
};

export default RegistrationFormStep;
