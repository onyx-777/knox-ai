import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

async function NavBar() {
  const user = await currentUser();
  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      <div className="absolute inset-0 bg-transparent dark:bg-transparent backdrop-blur-lg" aria-hidden="true"></div>
      <div className="relative flex gap-5 justify-between items-center px-7 py-1 font-bold dark:border-none border-b border-solid border-zinc-100/50 leading-[154.5%] max-md:flex-wrap max-md:px-5">
        <div className="flex gap-1.5 justify-center self-stretch my-auto text-2xl tracking-tighter text-neutral-700 dark:text-neutral-200">
          <Image
            src="/images/corinna-logo.png"
            alt="Corinna AI Logo"
            width={40}
            height={40}
            className="cursor-pointer bg-white rounded-lg p-1 duration-500 hidden md:block"
          />
        </div>
        <div className="flex justify-center items-center gap-3">
          {user ? (
            <UserButton />
          ) : (
            <Link
              href="/auth/sign-up"
              className="bg-orange px-4 py-2 rounded-sm text-white hover:bg-orange-600 transition-colors"
            >
              Free Trial
            </Link>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default NavBar;