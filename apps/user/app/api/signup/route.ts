import db from '@repo/db/client'
import { NextRequest } from 'next/server'
import bcrypt from 'bcrypt'

export const GET =async () =>{
    const response = await db.user.findMany({})
    return Response.json({msg:"Hi there",response})
}

export const POST = async(req: NextRequest) =>{
    try {
    const body = await req.json()
    const password = await bcrypt.hash(body.password,10)
    const response = await db.user.create({
         data:{
         email:body.email,
         name:body.name,
         number:body.number,
         password
     },
     select:{
        email: true,
         name:true,
         number:true,
         password: true
     }
     })
     return Response.json({response})
    } 
    catch (error) {
        console.log(error);
    }
 }
 
 