"use client";


import { Button } from "@repo/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const AppBar = () => {
  const session = useSession();
  const user = session?.data?.user;
  const router = useRouter();

  return (
    <div className="flex justify-between border-b border-gray-300 px-4 py-2">
         <div className=" ml-4 text-2xl font-semibold flex flex-col justify-center">
            PayTM
        </div>
      <div className="flex flex-col justify-center pt-2">
        <Button btname={user ? "Logout" : "Login"} onClick={async()=>{
            if (user) {
              await signOut(); 
               router.push('/api/auth/signin')
            } else {
                signIn()
            }
        }}/>
          
      </div>
    </div>
  );
};

export default AppBar;
