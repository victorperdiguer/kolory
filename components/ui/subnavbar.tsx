import React from "react"
import Image from "next/image"
import { Gluten } from "next/font/google";

const gluten = Gluten({
  weight: "300",
  subsets: ['latin']
})

const SubNavbar = () => {
  return (
    <div className={gluten.className+" flex flex-row items-center text-zinc-400 pl-5 pr-3 border-b-2 w-full bg-white z-10"}>
      <p>Press </p>
      <Image src="/spacebar.svg" alt="space" width={70} height={30}/>
      <p>to generate a new palette</p>
    </div>
  )
};

export default SubNavbar;
