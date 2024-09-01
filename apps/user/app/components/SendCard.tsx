"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import Center from "@repo/ui/Center";
import TextInput from "@repo/ui/TextInput";
import { useState } from "react";
import axios from "axios";
import Loader from "@repo/ui/Loader";

const SendCard = () => {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-1/2   ">
      {/* <Center> */}
      <div
        className={`${loading ? "block" : "hidden"} absolute top-0 left-0 w-full h-full bg-gray-500 opacity-85 flex items-center justify-center`}
      >
        <Loader />
      </div>
      <div className="block mt-10 text-4xl text-[#6a51a6] pt-8 mb-20 pl-20 font-bold">
        P2P Transfer
      </div>
      <div className="w-full flex justify-center">
      <div className="w-[80%]">
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder={"Number"}
              label="To Number"
              onChange={(value) => {
                setNumber(value);
              }}
            />
            <TextInput
              placeholder={"Amount"}
              label="Amount"
              onChange={(value) => {
                setAmount(value);
              }}
            />
            <div className="pt-4 flex justify-center items-center">
              <Button
                btname={"Send"}
                onClick={async () => {
                  setLoading(true);
                  const response = await axios.post(
                    "http://localhost:3000/api/p2pTransfer",
                    {
                      amount,
                      number,
                    }
                  );
                  console.log(response);
                  setLoading(false);
                  window.location.href = "http://localhost:3000/transfer";
                }}
              />
            </div>
          </div>
        </Card>
      </div>
      </div>
      {/* </Center> */}
    </div>
  );
};

export default SendCard;
