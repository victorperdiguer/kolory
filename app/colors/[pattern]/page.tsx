'use client'
import React, { use } from "react"
import { useState, useEffect } from "react"
import Palette from "@/components/ui/palette"
import { LockedColorsContext } from "@/lib/lockedColorsContext";
import { Reorder } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Page({params}: {params: {pattern: string}}) {

let aux = sessionStorage.getItem('lockedColors') as string
const initialLockedColors = JSON.parse(aux) as number[] || [];

const navigate = useRouter();
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

useEffect(() => {
  console.log("New color array", colors)
}, [colors])

  return (
    <LockedColorsContext.Provider value={{ lockedColors, handleLockColor }}>

    <div style={{height: 'calc(100vh - 4rem'}} id="div encima del reorder">
      <Reorder.Group 
        values={colors}
        onReorder={setColors}
        axis="x"
        className="flex lg:flex-row flex-col"
        >

      {colors.map((color: string, colorIndex: number) => (
        <Palette key={color} color={color} colors={colors} colorIndex={colorIndex} />
      ))}

      </Reorder.Group>
    </div>

    </LockedColorsContext.Provider>
  )
}