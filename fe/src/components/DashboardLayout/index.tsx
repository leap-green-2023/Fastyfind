import React from "react";
import SideBar from "../SideBar";

function DashboardLayout({ children }: any) {
  return (
    <div className="flex gap-2">
      <SideBar />
      <div className="flex items-center justify-center content-center w-full">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
