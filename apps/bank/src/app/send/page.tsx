"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation';
import {Card} from "@repo/ui/card"
import Loader from "@repo/ui/Loader"

const page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const user_identifier = searchParams.get('user_identifier');
  const bank = searchParams.get('bank');
  const amount = searchParams.get('amount');
  const [loading, setLoading] = useState(false)

  return (
    <>
       <div className={`${loading?'block':'hidden'} absolute top-0 left-0 w-full h-full bg-gray-500 opacity-85 flex items-center justify-center`}>
      <Loader/>
      </div>
    <div className='w-screen  flex items-center justify-center bg-slate-500 h-screen '>
      <div className=' flex flex-col items-center justify-center bg-slate-200 px-16 py-20 rounded-3xl'>
      <div className="text-3xl font-bold">
        {bank}
      </div>
      <div className='mt-6 text-xl'>
        You want to pay {amount} INR
      </div>

      <div className='mt-6'>
       <button className='bg-black text-white px-4 py-2 border rounded-lg' onClick={async()=>{
        setLoading(true)
       const response = await axios.post('http://localhost:3003/hdfcWebhook',{
           token,
           user_identifier,
           amount
        }) 
       if (response.data.msg) {
        window.location.href ="http://localhost:3000/transfer"
       }
       setLoading(false)
      }}>Confirm your payment</button>
      
      </div>
      </div>
    </div>
    </>
  )
}

export default page
