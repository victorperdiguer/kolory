'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

function Page() {

  const navigate = useRouter();

  useEffect(() => {
    navigate.push("/colors/faeiurfhaelfrea");
  }, []);

  return (
    <div>
      <div className="h-screen bg-white w-screen flex justify-center items-center">
        <Image src="/kolorylogo.svg" alt="logo" width={100} height={100} className="animate-spin rounded-full"/>
      </div>
    </div>
  )
}

export default Page