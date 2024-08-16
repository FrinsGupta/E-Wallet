import React from "react"

interface ButtonType {
    btname: string,
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
}
const Button = ({btname, onClick}: ButtonType) => {
  return (
    <div className=' w-full px-9  text-white my-2'>
       <button onClick={onClick} className='rounded-md bg-black w-full font-semibold py-2 px-3'>{btname}</button>
    </div>
  )
}

export default Button
