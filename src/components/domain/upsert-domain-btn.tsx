"use client";

import { useModal } from "@/providers/modal-provider";
import React, { useCallback } from "react";
import { Button } from "../ui/button";
import CustomModal from "../global/custom-modal";
import { Domain, User } from "@prisma/client";
import { pricingCards } from "@/constants/landing-page";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import dynamic from "next/dynamic";
import { Spinner } from "../spinner";

const UpsertDomainForm = dynamic(() => import("../forms/domain"), {
  loading: () => (
    <Spinner />
  ),
  ssr: false,
});

interface SubscriptionProps {
  subscription?: User;
  allDomains?: Domain[];
  btnName: string;
  domainData?: Domain;
}

const UpsertDomainBtn = ({
  subscription,
  allDomains,
  btnName,
  domainData,
}: SubscriptionProps) => {
  const { setOpen } = useModal();

  const isDisabled = useCallback(() => {
    if (subscription && allDomains) {
      const allowed = pricingCards.find(
        ({ title }) => subscription.plan === title.toUpperCase()
      );
      if (!allowed) return { disabled: true, reason: "Plan not found" };
      const isLimitReached =
        allDomains.length === Number(allowed.features[0].split(" ")[0]);
      return {
        disabled: isLimitReached,
        reason: isLimitReached ? "Upgrade Plan" : "",
      };
    }
    return { disabled: false, reason: "" };
  }, [subscription, allDomains]);

  const { disabled: disabledBtn, reason: disabledReason } = isDisabled();

  const handleClick = useCallback(() => {
    if (disabledBtn) return;
    setOpen(
      <CustomModal title={btnName} subheading={`You can ${btnName} here`}>
        <UpsertDomainForm data={domainData} />
      </CustomModal>
    );
  }, [disabledBtn, btnName, domainData, setOpen]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "inline-block",
              disabledBtn ? "cursor-not-allowed" : "cursor-pointer"
            )}
          >
            <Button
              disabled={disabledBtn}
              className="w-full h-full"
              onClick={handleClick}
              aria-describedby={
                disabledBtn ? "button-disabled-reason" : undefined
              }
            >
              {btnName}
            </Button>
          </div>
        </TooltipTrigger>
        {disabledBtn && (
          <TooltipContent>
            <p id="button-disabled-reason">{disabledReason}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default UpsertDomainBtn;
