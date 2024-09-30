import { getBlogPost } from "@/actions/blog";
import Image from "next/image";
import React from "react";

type Props = { params: { id: string } };

const PostPage = async ({ params }: Props) => {
  const post = await getBlogPost(params.id);
  //@ts-ignore
  const imageUrl = `${process.env.STRAPI_URL}${post?.attributes?.image?.data[0].attributes?.url}`;
  // if(!post) return
  return (
    <>
      <div className="container flex justify-center my-10">
        <div className="lg:w-6/12 flex flex-col">
          <h2 className="text-6xl font-bold pb-10">{post?.attributes?.name}</h2>
          <div className="aspect-video relative w-full rounded-lg">
            <Image src={imageUrl} alt="post featured image" fill />
          </div>
          <div className="text-xl parsed-container flex flex-col mt-10 gap-10">
            {post?.attributes?.blog}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
