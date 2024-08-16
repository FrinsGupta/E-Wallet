import React from 'react'
import Sidebar from '../components/SideBar'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex'>
      <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
        <Sidebar/>
        {children}
        </div>
    </div>
  )
}

export default Layout
