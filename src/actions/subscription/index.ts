"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getSubscriptionDetails = async () => {
  // TODO : change from client.subscription.findunique to client.user.findunique
  try {
    const user = await currentUser();
    if (!user) return;
    const response = await client.user.findUnique({
      where: {
        id: user.id,
      },
    });

    return response;
  } catch (error) {
    console.log("error in action/subscription : ", error);
  }
};
