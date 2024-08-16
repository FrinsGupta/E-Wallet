"use client"
import React from 'react'

const Center = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="flex justify-center flex-col h-full">
      <div className="flex justify-center">
         {children}
      </div>
    </div>
  )
}

export default Center
