import express from "express";
import db from '@repo/db/client'
import cors from 'cors'

const app = express();
app.use(cors())

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
  try {
        
       const token = req.body.token
       const userId = req.body.user_identifier
       const amount = parseInt(req.body.amount)
    
    // Update balance in db, add txn
    console.log(token,userId,amount);
    
    
    await db.$transaction([
            db.balance.update({
            where: {
                userId: userId
            },
            data:{
              amount: {
                increment: amount
              }
            }
        }),
           db.onRampTransaction.update({
           where:{
               token: token
           },
           data:{
               status: "Success"
           }
       })
    ])


    res.status(200).json({msg:"Captured"})
}
catch(err){
    console.log(err);
    res.status(411).json({msg:"Error while processing webhook"})
}
})

app.listen(3003)