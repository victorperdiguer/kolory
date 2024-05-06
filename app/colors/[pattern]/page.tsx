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

// cancer code, don't even try to understand

const handleLockColor = (clickedColorPosition: number, deleted?: boolean) => {
  let newLockedColors = [] as number[];
  if (deleted !== true) {
    if (lockedColors.includes(clickedColorPosition)) {
      newLockedColors = lockedColors.filter((lockedColorPosition) => lockedColorPosition !== clickedColorPosition);
    } else {
      newLockedColors = [...lockedColors, clickedColorPosition];
    }
    for (let i = 0; i < lockedColors.length-1; i++) {
      console.log("testeando deleted", newLockedColors[i], clickedColorPosition)
      if (newLockedColors[i] > clickedColorPosition) {
          newLockedColors[i]--;
      }
    }
  }
  if (deleted === true) {
    for (let i = 0; i < lockedColors.length; i++) {
      console.log("testeando deleted", lockedColors[i], clickedColorPosition)
      if (lockedColors[i] > clickedColorPosition) {
          lockedColors[i]--;
      }
    }
    newLockedColors = lockedColors
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