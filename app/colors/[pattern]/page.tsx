'use client'
import React from "react"
import { useState, useEffect } from "react"
import Palette from "@/components/ui/palette"
import { LockedColorsContext } from "@/lib/lockedColorsContext";

export default function Page({params}: {params: {pattern: string}}) {

let aux = sessionStorage.getItem('lockedColors') as string
const initialLockedColors = JSON.parse(aux) as number[] || [];

const [colors, setColors] = useState(params.pattern.split('-'))
const [lockedColors, setLockedColors] = useState<number[]>(initialLockedColors as number[]);

const handleLockColor = (clickedColorPosition: number) => {
  console.log("color clicked", clickedColorPosition, "Prelock:", lockedColors);
  let newLockedColors;
  if (lockedColors.includes(clickedColorPosition)) {
    newLockedColors = lockedColors.filter((lockedColorPosition) => lockedColorPosition !== clickedColorPosition);
  } else {
    newLockedColors = [...lockedColors, clickedColorPosition];
  }
  setLockedColors(newLockedColors);
  sessionStorage.setItem('lockedColors', JSON.stringify(newLockedColors));
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