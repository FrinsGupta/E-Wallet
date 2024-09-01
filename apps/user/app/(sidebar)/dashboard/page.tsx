import { getServerSession } from "next-auth";
import React from "react";
import { NEXT_AUTH } from "../../lib/auth";
import db from "@repo/db/client";

const getData = async () => {
  const session = await getServerSession(NEXT_AUTH);
  const userId = session?.user?.id;

  const getBal = await db.balance.findUnique({
    where: {
      userId,
    },
  });
  const getName = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  const balance = getBal?.amount;
  const name = getName?.name;

  return { balance, name };
};

const page = async () => {
  const { name, balance } = await getData();
  const firstName = name?.split(" ")[0];
  return (
    <div className="w-full flex justify-center items-center h-[75svh]">
    <div className=" flex flex-col justify-center items-center  bg-gray-300 rounded-3xl px-16 py-10">
      <div className=" flex flex-col justify-center items-center w-full">
        <p className=" font-bold text-3xl ">Welcome to E-Wallet</p>
        <p className=" font-semibold text-xl mt-2">
          {" "}
          Good to see you, {firstName} !
        </p>
      </div>
      <div className=" mt-5 bg-gray-400 text-3xl font-bold text-center px-10 py-10 rounded-3xl">
        <p className="">Your Balance </p>
        <p>${balance}</p>
      </div>
    </div>
    </div>
  );
};

export default page;
