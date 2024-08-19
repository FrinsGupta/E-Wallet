"use server"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../../lib/route";
import db from '@repo/db/client'
import { NextRequest } from "next/server";

export const POST = async (req:NextRequest) => {
    const body = await req.json()
    const provider = body.provider
    const amount = body.amount

  // Ideally the token should come from the banking provider (hdfc/axis)
  const session = await getServerSession(NEXT_AUTH);

  if (!session?.user || !session.user?.id) {
    console.log("Unauthorized request");
    return Response.json({msg:"Unauthorized User"})
  }

  try{
      const token = (Math.random()*1000).toString();
      // console.log(amount);

      const response = await db.onRampTransaction.create({
        data:{
            provider,
            status:"Processing",
            startTime: new Date(),
            token: token,
            userId: session?.user?.id,
            amount: amount 
        }
      })
      console.log(response);
      
      return Response.json({response})
  }catch(err){
    console.log(err);
    return Response.json({msg:"Error cannot create onRamptxns"})
  }

}