"use server";

import { client } from "@/lib/prisma";
import { ChangePasswordProps } from "@/schemas/auth.schema";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { AuthAs } from "@prisma/client";
import { redirect } from "next/navigation";

export const onCompleteUserRegistration = async (
  fullname: string,
  clerkId: string,
  type: AuthAs
) => {
  try {
    const response = await client.user.create({
      data: {
        id : clerkId,
        fullname,
        type,
      },
      // ADD subscription
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    });

    if (response) return { status: 200, user: response };
  } catch (error) {
    return { status: 400 };
  }
};

export const onUpdatePassword = async (password: string) => {
  const user = await currentUser();
  if (!user) redirect("/auth/sign-in");

  try {
    const updatedUser = await clerkClient().users.updateUser(user.id, {
      password,
    });
    if (updatedUser) {
      return { status: 200, message: "Password updated" };
    }
  } catch (error) {
    console.log("error in src/action/auth/changePassword : ", error);
  }
};