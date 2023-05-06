import Link from "next/link";
import React from "react";

function SideBar() {
  return (
    <div className="w-[400px] h-full h-[100vh] bg-slate-500 text-white">
      <ul className="flex flex-col items-center">
        <li className="list-none">
          <Link href={"/products"}>Product List</Link>
        </li>
        <li className="list-none">
          <Link href={"/users"}>User List</Link>
        </li>
        <li className="list-none">
          <Link href={"/analytics"}>Analytics</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
