import React from "react"
import { useState } from "react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { colorMap } from "@/lib/colorkeys";
import { Gluten } from "next/font/google";
extend([namesPlugin]);

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

    const colorName = colorMap[colord(color).toName({closest: true}) as keyof typeof colorMap];

    return (
        <div style={{backgroundColor: color, height: 'calc(100vh - 4rem'}} className="w-full lg:h-screen flex lg:flex-col flex-row justify-center items-center px-[5px] relative">
            <h5>{color.toUpperCase()}</h5>
            <h6 className="opacity-[0.5]">{colorName}</h6>
        </div>
    )
};

export default Palette;
