import Image from "next/image";
import { Inter } from "next/font/google";
import MyThreeComponent from "@/components/Hero/hero.dynamic";
import { Suspense } from "react";
// import Hero from "@/components/Hero";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="">
      <Suspense fallback={<div>Loading...</div>}>
        <MyThreeComponent />
      </Suspense>
    </main>
  );
}
