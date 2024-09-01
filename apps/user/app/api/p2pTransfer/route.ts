import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { NEXT_AUTH } from "../../lib/auth";
import db from "@repo/db/client";
import { Prisma } from "@prisma/client";
import { log } from "console";

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(NEXT_AUTH);
    const from = session?.user?.id;
    const body = await req.json();
    const to = body.number;

    const amount = parseInt(body.amount);

    if (!from) {
      return Response.json({ msg: "Error while sending" });
    }

    const toUser = await db.user.findFirst({
      where: {
        number: to,
      },
    });

    if (!toUser) {
      return Response.json({ msg: "User not fournd" });
    }

    await db.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${from} FOR UPDATE`;
      const fromBalance = await tx.balance.findFirst({
        where: {
          userId: from,
        },
      });
      if (!fromBalance || fromBalance.amount < amount) {
        return Response.json({ msg: "Insufficient Balance" });
      }

      await tx.balance.update({
        where: {
          userId: from,
        },
        data: {
          amount: {
            decrement: amount,
          },
        },
      });

      await tx.balance.update({
        where: {
          userId: toUser.id,
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      });

      await tx.p2pTransfer.create({
        data: {
          fromUserId: from,
          toUserId: toUser.id,
          amount,
          timestamp: new Date(),
        },
      });
    });
    return Response.json({ msg: "Success" });
  } catch (error) {
    console.log(error);
    return Response.json({ msg: error });
  }
};

export const GET = async () => {
  try {
    const session = await getServerSession(NEXT_AUTH);
    const userId = await session?.user?.id;

    const userTxns = await db.p2pTransfer.findMany({
      where: {
        fromUserId: userId,
      },
    });

    return Response.json({ userTxns });
  } catch (error) {
    console.log(error);
    return Response.json(error);
  }
};
