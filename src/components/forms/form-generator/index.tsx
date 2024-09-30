"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/uploadthing";
import { DomainSettingsProps } from "@/schemas/domain.schema";

type Props = {
  type: "text" | "email" | "password" | "image";
  inputType: "select" | "input" | "textarea" | "image";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  register: UseFormRegister<any>;
  name: string;
  errors?: FieldErrors<FieldValues>;
  lines?: number;
  form?: string;
  defaultValue?: string;
  setValue?: UseFormSetValue<FieldValues>;
  endpoint?: "domain" | "chatbot";
};

const FormGenerator = ({
  errors,
  inputType,
  name,
  placeholder,
  defaultValue,
  type,
  form,
  label,
  lines,
  setValue,
  options,
  register,
  endpoint,
}: Props) => {
  switch (inputType) {
    case "input":
    default:
      return (
        <Label className="flex flex-col w-72 gap-4" htmlFor={`input-${label}`}>
          <p className="font-bold text-lg text-muted-foreground">
            {" "}
            {label && label}
          </p>
          <Input
            id={`input-${label}`}
            type={type}
            placeholder={placeholder}
            form={form}
            defaultValue={defaultValue}
            {...register(name)}
            className="text-sm "
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
    case "select":
      return (
        <Label htmlFor={`select-${label}`}>
          {label && label}
          <select form={form} id={`select-${label}`} {...register(name)}>
            {options?.length &&
              options.map((option) => (
                <option value={option.value} key={option.id}>
                  {option.label}
                </option>
              ))}
          </select>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
    case "textarea":
      return (
        <Label className="flex flex-col gap-4" htmlFor={`input-${label}`}>
          {label && label}
          <Textarea
            form={form}
            id={`input-${label}`}
            placeholder={placeholder}
            {...register(name)}
            rows={lines}
            defaultValue={defaultValue}
            className="w-[20rem] resize-none border-b-8"
            
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
    case "image":
      return (
        <Label className="flex flex-col gap-4" htmlFor={`input-${label}`}>
          {label && label}
          <FileUpload endpoint={endpoint!} setValue={setValue!} {...register(name)} />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
  }
};

export default FormGenerator;
