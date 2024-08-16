const Heading = ({element}:{element: "Sign Up" | "Sign In"}) => {
    return (
      <div className=' font-bold text-3xl py-3 '>
        {element}
      </div>
    )
  }
  
  export default Heading
  