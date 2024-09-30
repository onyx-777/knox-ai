"use client";
import React, { useState, useEffect } from "react";
import FormGenerator from "../form-generator";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChatBot, Domain } from "@prisma/client";
import { Loader } from "@/components/loader";
import { toast } from "@/components/ui/use-toast";
import { useUpsertChatbot } from "@/hooks/chatbot/use-chatbot";

const UpsertChatbotForm = ({
  data,
  domainId,
}: {
  data?: ChatBot;
  domainId: string;
}) => {
  const { errors, loading, onFormSubmit, register, setValue, watch } =
    useUpsertChatbot(domainId);

  const [icon, setIcon] = useState<string | undefined>(data?.icon);
  const imageUrl: string = watch("icon");
  console.log("imageUrl", imageUrl);

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("welcomeMessage", data.welcomeMessage);
      setValue("icon", data.icon);
      data.background && setValue("background", data.background);
      data.textColor && setValue("textColor", data.textColor);
      data.domainId && setValue("domainId", data.domainId);
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

  const isIcon = () => {
    if (icon === undefined) {
      toast({
        variant: "destructive",
        title: "Icon Required",
      });
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="flex flex-col justify-center items-center w-full gap-7">
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-5">
          <FormGenerator
            label="Name"
            errors={errors}
            inputType="input"
            name="name"
            placeholder="Enter Chatbot name"
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
        </div>
        {icon ? (
          <div className="flex flex-col justify-center items-center w-full gap-5 border-2 border-dashed py-2 pb-4">
            <p className="font-semibold">Icon</p>
            <div className="relative w-32 aspect-video rounded-full overflow-hidden">
              <Image
                src={icon}
                alt="Domain icon"
                fill
                className="rounded-full"
              />
            </div>
            <Button className="w-fit" onClick={handleRemoveImage}>
              Remove Image
            </Button>
          </div>
        ) : (
          <FormGenerator
            label=""
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
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-5">
          <FormGenerator
            label="Background Color"
            inputType="input"
            name="background"
            placeholder="Enter color name"
            errors={errors}
            register={register}
            type="text"
          />
          <FormGenerator
            label="Text Color"
            inputType="input"
            name="textColor"
            placeholder="Enter color name"
            errors={errors}
            register={register}
            type="text"
          />
        </div>
        <Button className="w-full" type="submit" onClick={isIcon}>
          <Loader loading={loading}>Submit</Loader>
        </Button>
      </div>
    </form>
  );
};

export default UpsertChatbotForm;
