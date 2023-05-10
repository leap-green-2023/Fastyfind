import dynamic from "next/dynamic";
const MyThreeComponent = dynamic(() => import("./index"), {
  ssr: false,
});

export default MyThreeComponent;
