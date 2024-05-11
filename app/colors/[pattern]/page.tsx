'use client'
import React, { use } from "react"
import { useState, useEffect } from "react"
import Palette from "@/components/ui/palette"
import { LockedColorsContext } from "@/lib/lockedColorsContext";
import { Reorder } from "framer-motion";
import { useRouter } from "next/navigation";
import SubNavbar from "@/components/ui/subnavbar";
import randomColor from "randomcolor";

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
  }
  if (deleted === true) {
    for (let i = 0; i < lockedColors.length; i++) {
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
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
        const newColors = colors.map((color, colorIndex) => {
            let newColor
            if (lockedColors.includes(colorIndex)) {
              newColor = color
            }
            else {
              newColor = randomColor({hue: 'random', luminosity: 'random'}).replace("#", "");
            }
            return newColor
        });
      setColors(newColors);
      const colorURL = newColors.join("-");
      navigate.push(`/colors/${colorURL}`);
    }
  };


  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [lockedColors]);

  return (
    <LockedColorsContext.Provider value={{ lockedColors, handleLockColor }}>
    <div>
    <SubNavbar/>

    <div  id="div encima del reorder">
      <Reorder.Group 
        values={colors}
        onReorder={(newColors) => {
          // Create a map of old index to new index
          const indexMap = new Map();
          newColors.forEach((color, newIndex) => {
            const oldIndex = colors.indexOf(color);
            indexMap.set(oldIndex, newIndex);
          });

          // Update lockedColors to reflect the new indices
          const newLockedColors = lockedColors.map(oldIndex => indexMap.get(oldIndex));
          setLockedColors(newLockedColors);
          sessionStorage.setItem('lockedColors', JSON.stringify(newLockedColors));

          // Update colors
          setColors(newColors);
        }}
        axis="x"
        className="flex lg:flex-row flex-col"
        >

      {colors.map((color: string, colorIndex: number) => (
        <Palette key={color} color={color} colors={colors} colorIndex={colorIndex} />
      ))}

      </Reorder.Group>
    </div>
    </div>
    </LockedColorsContext.Provider>
    
  )
}