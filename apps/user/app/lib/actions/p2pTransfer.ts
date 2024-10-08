"use server"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../auth"
import db from '@repo/db/client'
import  {Prisma}  from '@prisma/client';

export const p2pTransfer = async(to: string, amount: number) => {
    const session = await getServerSession(NEXT_AUTH);
    const from = session?.user?.id
    if (!from) {
        return {
            msg:"Error while sending"
        }
    }

    const toUser = await db.user.findFirst({
        where:{
            number: to
        }
    })

    if (!toUser) {
        return {
            msg: "User not fournd"
        }
    }

    await db.$transaction(async(tx: Prisma.TransactionClient)=>{
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${from} FOR UPDATE`;
        const fromBalance = await tx.balance.findFirst({
            where: {
                userId: from
            }
        })
        if (!fromBalance || fromBalance.amount<amount) {
            return {
                msg: "Insufficient Balance"
            }
        }

        await tx.balance.update({
            where: {
                userId: from
            },
            data:{
                amount: {
                    decrement: amount
                }
            }
        })

       await tx.balance.update({
        where: {
            userId: to
        },
        data: {
            amount: {
                increment: amount
            }
        }
       })

       await tx.p2pTransfer.create({
        data: {
            fromUserId: from,
            toUserId: toUser.id,
            amount,
            timestamp: new Date()
        }
       })

    })
}