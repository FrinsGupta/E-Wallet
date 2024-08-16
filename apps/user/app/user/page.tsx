"use client";
import { useSession } from "next-auth/react";
import React from "react";
// import { useBalance } from "@repo/store/useBalance";

const page = () => {
  // const balance = useBalance();
  const session = useSession()
  return (
    <div className=" ">
      Hi there {JSON.stringify(session)}
      {/* Hi there {balance} */}
    </div>
  );
};

export default page;
