import { getData } from "@/actions/landing";
import { testFun } from "@/actions/test";
import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { pricingCards } from "@/constants/landing-page";
import { currentUser } from "@clerk/nextjs/server";
import clsx from "clsx";
import { ArrowRightCircleIcon, Check } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { lazy, Suspense } from "react";

export const revalidate = 3600;

const OptimizedImage = dynamic(() => import("@/components/optimized-image"), {
  ssr: true,
});

const Card = dynamic(
  () => import("@/components/ui/card").then((mod) => mod.Card),
  {
    loading: () => (
      <div className="w-[300px] h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
    ),
    ssr: true,
  }
);

const CardHeader = dynamic(() =>
  import("@/components/ui/card").then((mod) => mod.CardHeader)
);
const CardTitle = dynamic(() =>
  import("@/components/ui/card").then((mod) => mod.CardTitle)
);
const CardDescription = dynamic(() =>
  import("@/components/ui/card").then((mod) => mod.CardDescription)
);
const CardContent = dynamic(() =>
  import("@/components/ui/card").then((mod) => mod.CardContent)
);
const CardFooter = dynamic(() =>
  import("@/components/ui/card").then((mod) => mod.CardFooter)
);

export default async function Home() {
  const user = await currentUser();
  const test = await testFun();
  console.log("name : ", test);

  return (
    <main>
      <section>
        <div className="flex items-center justify-center flex-col mt-[80px] gap-4 ">
          <span className="text-orange bg-orange/20 px-4 py-2 rounded-full text-sm">
            An AI powered sales assistant chatbot
          </span>
          <OptimizedImage
            src="/images/corinna-ai-logo.png"
            width={500}
            height={100}
            alt="Logo"
            className="max-w-lg object-contain"
          />
          <p className="text-center max-w-[500px]">
            Your AI powered sales assistant! Embed Corinna AI into any website
            with just a snippet of code!
          </p>
          <div className="flex justify-center items-center w-full gap-5">
            {user ? (
              <Button className="bg-orange font-bold text-white px-4">
                <Link href={"/dashboard"}>Get Started</Link>
              </Button>
            ) : (
              <Button className="bg-orange font-bold text-white px-4">
                <Link href={"/auth/sign-up"}>Start For Free</Link>
              </Button>
            )}
          </div>
          <OptimizedImage
            src="/images/iphonecorinna.png"
            width={400}
            height={100}
            alt="Logo"
            className="max-w-lg object-contain"
          />
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 mt-10">
        <h2 className="text-4xl text-center"> Choose what fits you right</h2>
        <p className="text-muted-foreground text-center max-w-lg">
          Our straightforward pricing plans are tailored to meet your needs. If
          {" you're"} not ready to commit you can get started for free.
        </p>
      </section>

      <div className="flex justify-center gap-4 flex-wrap mt-6">
        {pricingCards.map((card) => (
          <Suspense
            key={card.title}
            fallback={
              <div className="w-[300px] h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
            }
          >
            <Card
              className={clsx("w-[300px] flex flex-col justify-between", {
                "border-2 border-primary": card.title === "Unlimited",
              })}
            >
              <CardHeader>
                <CardTitle className="text-orange">{card.title}</CardTitle>
                <CardDescription>
                  {
                    pricingCards.find((c) => c.title === card.title)
                      ?.description
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">{card.price}</span>
                <span className="text-muted-foreground">
                  <span>/ month</span>
                </span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div>
                  {card.features.map((feature) => (
                    <div key={feature} className="flex gap-2">
                      <Check />
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/dashboard?plan=${card.title}`}
                  className="bg-[#f3d299] border-orange border-2 p-2 w-full text-center font-bold rounded-md"
                >
                  Get Started
                </Link>
              </CardFooter>
            </Card>
          </Suspense>
        ))}
      </div>

      <section className="flex justify-center items-center flex-col gap-4 mt-28">
        <h2 className="text-4xl text-center">News Room</h2>
        <p className="text-muted-foreground text-center max-w-lg">
          Explore our insights on AI, technology, and optimizing your business.
        </p>
      </section>
    </main>
  );
}
