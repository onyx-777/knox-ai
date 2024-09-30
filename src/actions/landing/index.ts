"use server";

import { client } from "@/api";

export const getData = async () => {
  const post = await client.GET("/airplanes", {
    params: {
      query: {
        populate: "*",
      },
    },
  });

  const data = post.data?.data;
  return data;
};
