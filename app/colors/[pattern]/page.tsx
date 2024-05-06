'use client'
import React from "react"
import { useState } from "react"
import Palette from "@/components/ui/palette"

export default function Page({params}: {params: {pattern: string}}) {

  const [colors, setColors] = useState(params.pattern.split('-'))

  return (
    <div className="flex lg:flex-row flex-col" style={{height: 'calc(100vh - 4rem'}}>
      {colors.map((color: string, colorIndex: number) => (
        <Palette key={colorIndex} color={"#"+color} colors={colors} lockedColors={[]} colorIndex={colorIndex} setLockedColors={() => {}} />
      ))}
    </div>
  )
}