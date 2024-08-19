import React from "react";
import Sidebar from "../components/SideBar";
import AppBar from "../components/AppBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppBar />
      <div className="flex">
        <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
          <Sidebar />
        </div>
          {children}
      </div>
    </>
  );
};

export default Layout;
