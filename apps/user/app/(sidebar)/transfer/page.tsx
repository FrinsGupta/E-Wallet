import React from "react";
import prisma from "@repo/db/client";
import AddMoneyCard from "../../components/AddMoneyCard";
import BalanceCard from "../../components/BalanceCard";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../lib/auth";
import OnRampTransactions from "../../components/OnRampTransactions";

const getBalance = async () => {
  const session = await getServerSession(NEXT_AUTH);
  if (!session || !session?.user) {
    throw new Error("User not authenticated");
  }
  const balance = await prisma.balance.findFirst({
    where: {
      userId: session?.user?.id,
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
};

const getOnRampTransactions = async () => {
  const session = await getServerSession(NEXT_AUTH);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return txns.map((t: any) => ({
    id: t.id,
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
};

const page = async () => {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();
  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoneyCard />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <OnRampTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
