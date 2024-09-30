"use client";
import { ConversationSearchProps } from "@/schemas/conversation.schema";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import {
  CheckIcon,
  ChevronDownIcon,
  LucideAlignVerticalDistributeStart,
} from "lucide-react";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getMonthName } from "@/lib/utils";

type Props = {
  register?: UseFormRegister<ConversationSearchProps>;
  domains:
    | {
        Customer: {
          chatRoom: {
            id: string;
            live: boolean;
          }[];
        }[];
        id: string;
        name: string;
        icon: string;
        domain: string;
        createdAt: Date;
      }[]
    | undefined;
};

export default function ConversationSearch({ register, domains }: Props) {
  //@ts-ignore
  const [selected, setSelected] = useState<string>(domains[0]);
  const [query, setQuery] = useState("");

  const filteredDomains =
    query === ""
      ? domains
      : domains?.filter((domain) =>
          domain.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="h-fit w-fit">
      <Combobox
        value={selected}
        onChange={(value) => setSelected(value!)}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "w-fit h-12 rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-black dark:text-white",
              "focus:outline-none font-bold text-xl data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            //@ts-ignore
            displayValue={(domain: typeof selected) => domain.name}
            // {...register("domain")}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {filteredDomains?.map((domain) => (
            <ComboboxOption
              key={domain.id}
              value={domain}
              className="group justify-start flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />

              <div className="w-full flex justify-start items-start flex-1 text-sm/6 dark:text-white text-black">
                {domain.name}
              </div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
