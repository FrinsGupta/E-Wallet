import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@repo/db/client";
import { signIn } from "next-auth/react";

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "john@gmail.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials: any, req) {
        try {
            const existingUser = await db.user.findFirst({
              where: {
                email: credentials.email,
              },
            });
            if (!existingUser) {
              console.log("User doesnt exist");
              return null;
            }
            const validation = await bcrypt.compare(
              credentials.password,
              existingUser.password
            );
    
            if (!validation) {
                console.log("Validation unsuccessful");
                
              return null;
            }
            console.log("Login Successful");
            console.log(existingUser);
            
            return {
              id: existingUser.id,
              name: existingUser.name,
              email: existingUser.email,
            };
        } catch (error) {
            console.log(error);
            return null;
        }
       
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    session: ({ session, token, user }: any) => {
    //   console.log(session);
      session.user.id = token.sub;
      return session;
    },
  },
  pages:{
    signIn: "/signin"
  }
};

