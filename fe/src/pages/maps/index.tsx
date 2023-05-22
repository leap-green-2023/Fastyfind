import React from "react";
import dynamic from "next/dynamic";

// import Map from "../../MapboxMap/mapboxMap";
import MyPage from "./myPage";
// const DynamicMap = dynamic(() => import("./myPage"), {
//   ssr: false,
// });

function Maps({ pageProps }: any) {
  return <MyPage {...pageProps} />;
}
export default Maps;
