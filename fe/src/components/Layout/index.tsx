import React from "react";
import Header from "../Header";
import Footer from "../Footer";

function Layout({ children }: any) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
