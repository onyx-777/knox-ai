"use client";
import { useChangePassword } from "@/hooks/settings/use-settings";
import React from "react";
import Section from "../section-label";
import FormGenerator from "../forms/form-generator";
import { Button } from "../ui/button";
import { Loader } from "../loader";
import { Separator } from "../ui/separator";

type Props = {};

const ChangePassword = (props: Props) => {
  const { register, errors, onChangePassword, loading } = useChangePassword();

  return (
    <>
      <Separator />

      <div className="flex flex-col lg:flex-row justify-start items-center gap-20">
        <div className="lg:col-span-1">
          <Section label="Change Password" message="Reset your password" />
        </div>
        <form onSubmit={onChangePassword} className="lg:col-span-4">
          <div className="lg:w-[500px] flex flex-col gap-3">
            <FormGenerator
              register={register}
              errors={errors}
              name="password"
              placeholder="New Password"
              type="text"
              inputType="input"
            />
            <FormGenerator
              register={register}
              errors={errors}
              name="confirmPassword"
              placeholder="Confirm Password"
              type="text"
              inputType="input"
            />
            <Button className="bg-grandis w-fit text-black font-semibold">
              <Loader loading={loading}>Change Password</Loader>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
