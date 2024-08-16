import express from "express";
import db from '@repo/db/client'

const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
  try { const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    // Update balance in db, add txn
    
    await db.balance.update({
        where: {
            userId: paymentInformation.userId
        },
        data:{
          amount: {
            increment: paymentInformation.amount
          }
        }
    })

    await db.onRampTransaction.update({
        where:{
            token: paymentInformation.token
        },
        data:{
            status: "Success"
        }
    })

    res.status(200).json({msg:"Captured"})
}
catch(err){
    console.log(err);
    res.status(411).json({msg:"Error while processing webhook"})
}
})

app.listen(3003)