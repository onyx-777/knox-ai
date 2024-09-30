"use server";

import { client } from "@/api";

export const getBlogPost = async (id: string) => {
  const post = await client.GET("/airplanes/{id}", {
    params: {
      //@ts-ignore
      query: {
        populate: "*",
      },
      path: {
        id: Number(id),
      },
    },
  });

  const data = post.data?.data;
  return data;
};
