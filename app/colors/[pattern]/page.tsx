'use client'
import React from "react"
import { useState } from "react"
import Palette from "@/components/ui/palette"
import { LockedColorsContext } from "@/lib/lockedColorsContext";


export default function Page({params}: {params: {pattern: string}}) {

  const [colors, setColors] = useState(params.pattern.split('-'))
  const [lockedColors, setLockedColors] = useState<number[]>([]);

  const handleLockColor = (clickedColorPosition: number) => {
      if (lockedColors.includes(clickedColorPosition)) {
      setLockedColors(lockedColors.filter((lockedColorPosition) => lockedColorPosition !== clickedColorPosition));
      } else {
      setLockedColors([...lockedColors, clickedColorPosition]);
      }
  };


  return (
    <LockedColorsContext.Provider value={{ lockedColors, handleLockColor }}>

    <div className="flex lg:flex-row flex-col" style={{height: 'calc(100vh - 4rem'}}>
      {colors.map((color: string, colorIndex: number) => (
        <Palette key={colorIndex} color={"#"+color} colors={colors} colorIndex={colorIndex} />
      ))}
    </div>

    </LockedColorsContext.Provider>
  )
}