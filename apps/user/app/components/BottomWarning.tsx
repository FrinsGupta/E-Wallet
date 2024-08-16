// import { useNavigate } from "react-router-dom"

type BottomWarningType = {
    warning: string,
    link: string
}

const BottomWarning = ({warning, link}: BottomWarningType) => {
//   const navigate = useNavigate();
  return (
    <div className=' font-semibold flex mt-2 mb-7' >
      {warning} <p className='underline ml-2 cursor-pointer'><button onClick={()=>{
        if (link=="Login") {
        //   navigate('/')
        } else {
        //   navigate('/signup')
        }
      }} className=" underline">{link}</button> </p> 
    </div>
  )
}

export default BottomWarning
