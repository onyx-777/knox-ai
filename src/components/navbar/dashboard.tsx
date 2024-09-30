import { UserButton } from "@clerk/nextjs";
import React from "react";
import { ModeToggle } from "../mode-toggle";

const Navbar = async () => {
  return (
    <div className="z-999">
      <UserButton />
      <ModeToggle />
    </div>
  );
};

export default Navbar;
