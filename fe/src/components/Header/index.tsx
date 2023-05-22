import React from "react";
import Link from "next/link";

function Header() {
  return (
    <div className="bg-[#212A3E] text-white z-50 sticky top-0">
      <nav className="p-3">
        <ul className="flex gap-4">
          <li className="list-none">
            <Link href={"/"}>Home </Link>
          </li>
          <li className="list-none">
            <Link href={"/nested"}>Nested </Link>
          </li>
          <li className="list-none">
            <Link href={"/maps"}>Find near maps</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
