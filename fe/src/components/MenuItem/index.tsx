import React, { useState } from "react";
import styles from "./menu.module.css";

function MenuItem({ item }: any) {
  let st = "";
  if (item.nearest === true) {
    st = styles.nearest;
  } else {
    st = "";
  }
  return (
    <div className={"p-2 border-b-[1px] border-lime-950 " + st}>
      <h2 className={"text-lg " + styles.itemText}>{item.name}</h2>
      <p>Хаяг: {item.address}</p>
      <p>Онгойх цаг: {item.working_hours_start}</p>
      <p>Хаах цаг:{item.working_hours_end}</p>
      <p>Бүх өдөр онгойдог эсэх:{item.is_open_allday ? "тийм" : "үгүй"}</p>
    </div>
  );
}

export default MenuItem;
