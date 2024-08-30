import React from "react";
import SendCard from "../../components/SendCard";
import P2ptxns from "../../components/P2ptxns";
import db from "@repo/db/client";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../lib/auth";

const getP2pTxns = async () => {
  // const txns = await axios.get('http://localhost:3000/api/p2pTransfer')
  // return txns.data.userTxns
  const session = await getServerSession(NEXT_AUTH);
  const userId = await session?.user?.id;

  if (!session || !session?.user) {
    throw new Error("User not authenticated");
  }

  const userTxns = await db.p2pTransfer.findMany({
    where: {
      fromUserId: userId,
    },
  });

  return userTxns;
};

const page = async () => {
  const txns = await getP2pTxns();
  //  console.log(txns);

  return (
    <div className="w-full flex items-center justify-center h-[80vh]">
    {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4"> */}
      <SendCard />
      <div className="w-1/2">
      <div className="w-[80%]">
        <P2ptxns transactions={txns} receiver="iirigr" />
      </div>
      </div>
    </div>
  );
};

export default page;
