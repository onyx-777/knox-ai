"use server";
import { client } from "@/lib/prisma";

export const currentPlan = async (clerkId: string) => {
  console.log("clerkId: ", clerkId);
  try {
    const plan = await client.user.findUnique({
      where: {
        id: clerkId,
      },
      select: {
        plan: true,
      },
      cacheStrategy: {
        ttl: 60,
        swr: 120,
      },
    });

    return plan;
  } catch (error) {
    console.log("error in actions/plan : ", error);
  }
};
