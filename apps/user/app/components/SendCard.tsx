"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import  Center  from "@repo/ui/Center";
import  TextInput  from "@repo/ui/TextInput";
import { useState } from "react";
import axios from 'axios'
import Loader from "@repo/ui/Loader";

const SendCard = () => {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [loading,setLoading] = useState(false)

    return <div className="h-[90vh]">
        <Center>
        <div className={`${loading?'block':'hidden'} absolute top-0 left-0 w-full h-full bg-gray-500 opacity-85 flex items-center justify-center`}>
      <Loader/>
      </div>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button btname={"Send"} onClick={async() => {
                            setLoading(true)
                           const response = await axios.post('http://localhost:3000/api/p2pTransfer',{
                            amount,
                            number
                           })
                           console.log(response);
                           setLoading(false)
                           window.location.href = 'http://localhost:3000/transfer'
                        }}/>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}

export default SendCard
