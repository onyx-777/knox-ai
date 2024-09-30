import { getAllDomainsData } from "@/actions/domain";
import { getSubscriptionDetails } from "@/actions/subscription";
import { DataTable } from "@/components/domain/list/data-table";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";
import React from "react";

export const revalidate = 60;

const UpsertDomainBtn = dynamic(
  () => import("@/components/domain/upsert-domain-btn"),
  {
    loading: () => (
      <div className="w-[300px] h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
    ),
    ssr: false,
  }
);

const Domain = async () => {
  const data = await getAllDomainsData();
  const subscriptionDetails = await getSubscriptionDetails();
  if (!data || !subscriptionDetails) return null;
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-between items-center w-full p-10">
        <div className="text-3xl font-bold">Domains</div>
        <UpsertDomainBtn
          btnName="Add Domain"
          subscription={subscriptionDetails}
          allDomains={data}
        />
      </div>
      <Separator className="border-2 border-gray-700" />
      <DataTable data={data} />
    </div>
  );
};

export default Domain;
