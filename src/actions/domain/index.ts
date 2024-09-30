"use server";

import { client } from "@/lib/prisma";
import { DomainSettingsProps } from "@/schemas/domain.schema";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const getAllDomainsData = async () => {
  const user = await currentUser();
  if (!user) return;

  const data = await client.domain.findMany({
    where: {
      userId: user.id,
    },

    cacheStrategy: {
      ttl: 120,
      swr: 120,
    },
  });
  revalidatePath("/domain");
  return data;
};

export const integrateDomain = async (values: DomainSettingsProps) => {
  const user = await currentUser();
  if (!user) return;

  try {
    const newDomain = await client.domain.upsert({
      where: {
        userId: user.id,
      },
      create: {
        userId: user.id,
        name: values.name,
        domain: values.domain,
        icon: values.icon,
        welcomeMessage: values.welcomeMessage,
        ChatBot : {},
      },
      update: {
        name: values.name,
        domain: values.domain,
        icon: values.icon,
        welcomeMessage: values.welcomeMessage,
      },
      select: {
        id: true,
        name: true,
        domain: true,
        icon: true,
        welcomeMessage: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return newDomain;
  } catch (error) {
    console.log("error in integrateDomain : ", error);
  }
};

export const domainDelete = async (id: string) => {
  try {
    await client.domain.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log("error in domain delete in actions/domain");
  }
};

export const allDomainsDelete = async () => {
  try {
    const user = await currentUser();
    if (!user) return;
    const response = await client.domain.deleteMany({
      where: {
        userId: user.id,
      },
    });
    return response;
  } catch (error) {
    console.log("error in deleteAllDomains in actions/domain", error);
  }
};
export const getDomain = async (id: string) => {
  try {
    const response = await client.domain.findUnique({
      where: {
        id,
      },
      include: {
        ChatBot: true,
      },
    });

    return response;
  } catch (error) {
    console.log("error in getDomain action/domain : ", error);
  }
};
