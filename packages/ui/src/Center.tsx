"use client"
import React from 'react'

const Center = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="flex justify-center flex-col ">
      <div className="flex justify-center items-center">
         {children}
      </div>
    </div>
  )
}

export default Center
