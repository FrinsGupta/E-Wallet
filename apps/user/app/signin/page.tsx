"use client"
import { useState } from "react";
import axios from "axios";
import SubHeading from "../components/SubHeading";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import {  useRouter } from "next/navigation";
import Loader from "@repo/ui/Loader"
import { signIn } from "next-auth/react";


export default function () {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false)
    const BackendUrl = process.env.NEXTAUTH_URL

    const router = useRouter();
    
    return (
        <div className=" flex justify-center items-center h-screen bg-gray-300">
            <div className={`${loading?'block':'hidden'} absolute top-0 left-0 w-full h-full bg-gray-500 opacity-85 flex items-center justify-center`}>
      <Loader/>
      </div>
            <div className=" bg-white flex flex-col items-center w-fit h-fit rounded-lg py-4">
                <Heading element={"Sign In"} />
                <SubHeading
                    subHeading={"Enter your information to create your account"}
                />
                {/* <InputBox type={"text"} label={"Name"} placeholder={"John Doe"} onChange={e=> setName(e.target.value)} /> */}
                <InputBox
                    type={"text"}
                    label={"Email"}
                    placeholder={"johndoe@gmail.com"}
                    onChange={e=> setEmail(e.target.value)}
                />
                {/* <InputBox
                    type={"text"}
                    label={"Number"}
                    placeholder={"+917091775353"}
                    onChange={e=> setNumber(e.target.value)}
                /> */}
                <InputBox
                    type={"password"}
                    label={"Password"}
                    placeholder={"password"}
                    onChange={e=> setPassword(e.target.value)}
                />
                <Button btname={"Login"} onClick={async()=>{
                    setLoading(true)
                        // const response = await axios.post(`${BackendUrl}/api/signup`,{
                       const res = await signIn("credentials",{
                           redirect: false,
                           email: email,
                           password: password
                       }) 
                       console.log(res);
                       if (res?.ok) {
                        router.push('/')
                       }
                         setLoading(false)  
                }} />
                <BottomWarning warning={"Don't have an account?"} link={"Register"} />
            </div>
        </div>
    );
}
