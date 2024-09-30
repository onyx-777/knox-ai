"use client";
import React, { useState, useEffect, useMemo } from "react";
import FormGenerator from "../form-generator";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Domain } from "@prisma/client";
import { useDomain } from "@/hooks/domain";
import { Loader } from "@/components/loader";

const UpsertDomainForm = ({ data }: { data?: Domain }) => {
  const { watch, setValue, errors, register, loading, onFormSubmit } = useDomain();

  const [icon, setIcon] = useState<string | undefined>(data?.icon);
  const imageUrl: string = watch("icon");

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("domain", data.domain);
      setValue("welcomeMessage", data.welcomeMessage);
      setValue("icon", data.icon);
      setIcon(data.icon);
    }
  }, [data, setValue]);

  useEffect(() => {
    if (imageUrl) {
      setIcon(imageUrl);
    }
  }, [imageUrl]);

  const handleRemoveImage = () => {
    setValue("icon", "");
    setIcon(undefined);
  };

  const memoizedFormFields = useMemo(
    () => (
      <>
        <FormGenerator
          label="Name"
          errors={errors}
          inputType="input"
          name="name"
          placeholder="Enter domain name"
          register={register}
          type="text"
        />
        <FormGenerator
          label="Domain"
          errors={errors}
          inputType="input"
          name="domain"
          placeholder="Enter domain URL"
          register={register}
          type="text"
        />
        <FormGenerator
          label="Welcome Message"
          inputType="input"
          name="welcomeMessage"
          placeholder="Enter welcome message"
          errors={errors}
          register={register}
          type="text"
        />
      </>
    ),
    [errors, register]
  );

  return (
    <form onSubmit={onFormSubmit}>
      <div className="flex flex-col justify-center items-start w-full gap-4">
        {memoizedFormFields}
        {icon ? (
          <div className="flex flex-col justify-center items-start w-full gap-5">
            <p className="font-semibold">Icon</p>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image src={icon} alt="Domain icon" fill loading="lazy" />
            </div>
            <Button className="w-full" onClick={handleRemoveImage}>
              Remove Image
            </Button>
          </div>
        ) : (
          <FormGenerator
            label="Icon"
            inputType="image"
            name="icon"
            placeholder="Upload domain icon"
            errors={errors}
            register={register}
            endpoint="domain"
            //@ts-ignore
            setValue={setValue}
            type="image"
          />
        )}
        <Button className="w-full" type="submit">
          <Loader loading={loading}>Submit</Loader>
        </Button>
      </div>
    </form>
  );
};

export default UpsertDomainForm;
