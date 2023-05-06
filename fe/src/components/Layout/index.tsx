import React from "react";
import Header from "../Header";
import Footer from "../Footer";

function Layout({ children }: any) {
  return (
    <>
      <Header />
      <main className="w-full h-[100vh]">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
