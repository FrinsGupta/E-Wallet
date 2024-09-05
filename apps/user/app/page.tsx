import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NEXT_AUTH } from "./lib/auth";

export default async function  Home () {
  const session = await getServerSession(NEXT_AUTH)
  const user = session?.user

  console.log(user);
  
  
    if (!user) {
      redirect('/api/auth/signin')
    }else{
      redirect('/transfer');
    }

}

 
