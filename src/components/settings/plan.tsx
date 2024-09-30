import React from "react";
import { currentPlan } from "@/actions/Plan";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { pricingCards } from "@/constants/landing-page";
import clsx from "clsx";
import Link from "next/link";
import dynamic from "next/dynamic";

export const revalidate = 60;

const Check = dynamic(
  () => import("lucide-react").then((mod) => mod.Check),
  {
    loading: () => (
      <div className="w-[300px] h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
    ),
    ssr: true,
  }
);
const Card = dynamic(
  () => import("@/components/ui/card").then((mod) => mod.Card),
  {
    loading: () => (
      <div className="w-[300px] h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
    ),
    ssr: true,
  }
);

const CardHeader = dynamic(
  () => import("@/components/ui/card").then((mod) => mod.CardHeader),
  {
    loading: () => (
      <div className="w-[300px] h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
    ),
    ssr: true,
  }
);
const CardTitle = dynamic(
  () => import("@/components/ui/card").then((mod) => mod.CardTitle),
  {
    loading: () => (
      <div className="w-[300px] h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
    ),
    ssr: true,
  }
);
const CardDescription = dynamic(
  () => import("@/components/ui/card").then((mod) => mod.CardDescription),
  {
    loading: () => (
      <div className="w-[300px] h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
    ),
    ssr: true,
  }
);
const CardContent = dynamic(
  () => import("@/components/ui/card").then((mod) => mod.CardContent),
  {
    loading: () => (
      <div className="w-[300px] h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
    ),
    ssr: true,
  }
);
const CardFooter = dynamic(
  () => import("@/components/ui/card").then((mod) => mod.CardFooter),
  {
    loading: () => (
      <div className="w-[300px] h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
    ),
    ssr: true,
  }
);
const Section = dynamic(() => import("../section-label"), {
  loading: () => (
    <div className="w-[300px] h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
  ),
  ssr: true,
});

const Plan = async () => {
  const user = await currentUser();
  if (!user) redirect("auth/sign-in");
  const planDetails = await currentPlan(user.id);
  const planCard = pricingCards.find(
    ({ title }) => title.toUpperCase() === planDetails?.plan
  );
  if (!planCard) return;
  return (
    <div className="flex flex-col lg:flex-row justify-start items-center w-full gap-10">
      <div className="lg:col-span-1">
        <Section
          label="Current Plan"
          message="Your active subscription details "
        />
      </div>
      <div className="lg:col-span-4 flex lg:flex-row flex-col items-start gap-5">
        <Card
          key={planCard.title}
          className={clsx("w-[300px] flex flex-col justify-between", {
            "border-2 border-primary": planCard.title === "Unlimited",
          })}
        >
          <CardHeader>
            <CardTitle className="text-orange">{planCard.title}</CardTitle>
            <CardDescription>
              {
                pricingCards.find((c) => c.title === planCard.title)
                  ?.description
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-4xl font-bold">{planCard.price}</span>
            <span className="text-muted-foreground">
              <span>/ month</span>
            </span>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <div>
              {planCard.features.map((feature) => (
                <div key={feature} className="flex gap-2">
                  <Check />
                  <p>{feature}</p>
                </div>
              ))}
            </div>
            <Link
              href={`/billing?plan=${planCard.title}`}
              className="bg-[#f3d299] border-orange border-2 p-2 w-full text-center dark:text-black font-bold rounded-md"
            >
              Upgrade Plan
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Plan;
