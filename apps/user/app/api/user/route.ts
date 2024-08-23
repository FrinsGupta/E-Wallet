import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../../lib/auth";

export const GET =async () => {
   const session = await getServerSession(NEXT_AUTH);
   console.log(session);
   
   if (session.user) {
    return Response.json({
        user:session.user
    })
   }
   return Response.json({msg:"You are not logged In",status:400})
}