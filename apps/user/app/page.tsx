import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NEXT_AUTH } from "./lib/route";

export default async function  Home () {
  const session = await getServerSession(NEXT_AUTH)
  const user = session.user
  
    if (user) {
      redirect('/dashboard')
    }
    else{
      redirect('/api/auth/signin')
    }
  
}

 
