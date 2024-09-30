'use server'

import { client } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function testFun() {
  try {
    const users = await client.user.findMany({
      where: {
        fullname: {
          contains: "alice",
          mode: 'insensitive',
        }
      },
      select: {
        fullname: true,
      },
      cacheStrategy: { ttl: 60, swr: 120 },
    });
    
    revalidatePath('/');
    return users;
  } catch (error) {
    console.error('Error in testFun:', error);
    throw error;
  }
}