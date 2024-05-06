import React from "react"
import { useState } from "react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { colorMap } from "@/lib/colorkeys";
import { Gluten } from "next/font/google";
import Options from "./options";

extend([namesPlugin]);

const gluten = Gluten({
  weight: "200",
  subsets: ['latin']
})

const Palette = ({
  color,
  colors,
  lockedColors,
  colorIndex,
  setLockedColors
}: {
  color: string,
  colors: string[],
  lockedColors: string[],
  colorIndex: number,
  setLockedColors: (value: string[]) => void
}) => {

    const colorName = colorMap[colord(color).toName({closest: true}) as keyof typeof colorMap] || colord(color).toName({closest: true})
    const textColor = colord(color).isDark() ? "white" : "black";

    return (
        <div style={{backgroundColor: color, height: 'calc(100vh - 4rem'}} className={"w-full lg:h-screen flex lg:flex-col flex-row justify-center items-center px-[5px] relative" + " " + "text-"+textColor}>
            <Options color={color}></Options>
            <h5 className="font-semibold">{color.toUpperCase()}</h5>
            <h6 className={gluten.className + " " + "opacity-[0.7]"}>{colorName}</h6>
        </div>
    )
};

export default Palette;
