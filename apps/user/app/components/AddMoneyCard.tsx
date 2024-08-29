"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import  Select  from "@repo/ui/Select";
import  Loader  from "@repo/ui/Loader";
import { useState } from "react";
import  TextInput  from "@repo/ui/TextInput";
import axios from "axios";

const AddMoneyCard = () => {
    const SUPPORTED_BANKS = [{
        name: "HDFC Bank",
        redirectUrl: "http://localhost:3002"
    }, {
        name: "Axis Bank",
        redirectUrl: "http://localhost:3002"
    }];

    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [amount,setAmount] = useState(0)
    const [loading,setLoading] = useState(false)

    return <Card title="Add Money">
         <div className={`${loading?'block':'hidden'} absolute top-0 left-0 w-full h-full bg-gray-500 opacity-85 flex items-center justify-center`}>
      <Loader/>
      </div>
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
             setAmount(Number(val))
              console.log(amount);
              
        }} />
        
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button btname={"Add Money"} onClick={async() => {
                setLoading(true)
                console.log("Hello");
                
                const response = await axios.post('http://localhost:3000/api/createOnRamptxns',{
                    provider,
                    amount
                })
                console.log(response);

                const token = await response.data.response.token
                const user_identifier = await response.data.response.userId
                const amnt = await response.data.response.amount
                console.log(token,user_identifier,amnt);
                
                window.location.href =  `${redirectUrl}/send?token=${token}&user_identifier=${user_identifier}&amount=${amount}&bank=${provider}` || "";
                setLoading(false)
            }}/>
        </div>
    </div>
</Card>
}

export default AddMoneyCard
