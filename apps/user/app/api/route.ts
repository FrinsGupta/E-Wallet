import db from "@repo/db/client";

export const GET =async () =>{
    const response = await db.user.findMany({})
    return Response.json({msg:"Hi there",response})
}
export const POST = async() =>{
   const response = await db.user.create({
        data:{
        email:"Prince@gmail.com",
        name:"Prince Gupta",
        number:"7091775353",
        password:"prince"
    }
    })
    return Response.json({response})
}

