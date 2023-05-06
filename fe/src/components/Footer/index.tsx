import React from "react";
import styles from "./style.module.css";

function Footer() {
  return (
    <div
      className={
        " sticky bottom-0 bg-[#151509] text-white p-5 flex justify-center items-center " +
        styles.footer
      }
    >
      Footer
    </div>
  );
}

export default Footer;
