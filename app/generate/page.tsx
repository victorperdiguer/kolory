'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import randomColor from "randomcolor";

function Page() {

  sessionStorage.clear()

  const navigate = useRouter();

  const colorURL = randomColor({hue: 'random', count: 5, luminosity: 'random'}).join("-").replaceAll("#", "");

  useEffect(() => {
    setTimeout(() => {
    navigate.push(`/colors/${colorURL}`);
    }, 500)
  }, []);

  return (
    <div>
      <div className="h-screen bg-white w-screen flex justify-center items-center" style={{height: 'calc(100vh - 4rem'}}>
        <Image src="/kolorylogo.svg" alt="logo" width={100} height={100} className="animate-spin rounded-full"/>
      </div>
    </div>
  )
}

export default Page