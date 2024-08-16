"use server"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../route";
import db from '@repo/db/client'

export const createOnrampTxns = async (provider: string, amount: number) => {
    // Ideally the token should come from the banking provider (hdfc/axis)
  const session = await getServerSession(NEXT_AUTH);
  if (!session?.user || !session.user?.id) {
    return {
        msg: "Unauthorized request"
    }
  }
  try{
      const token = (Math.random()*1000).toString();
    
      await db.onRampTransaction.create({
        data:{
            provider,
            status:"Processing",
            startTime: new Date(),
            token: token,
            userId: session?.user?.id,
            amount: amount * 100
        }
      })
      return {
        msg: "Done"
      }
  }catch(err){
    console.log(err);
    return {
        msg:"Failed creating onRamptxn"
    }
    
  }

};
