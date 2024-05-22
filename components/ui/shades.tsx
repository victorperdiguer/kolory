'use client'

import React from "react"
import { useEffect, useState } from "react";
import { colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";
import a11yPlugin from "colord/plugins/a11y";
import {CheckCircle2} from "lucide-react";
extend([mixPlugin]);
extend([a11yPlugin]);




const Shades = ({color, setColor, setShadeActive}: {color: string, setColor: (color: string) => void, setShadeActive: (active: boolean) => void}) => {

  const [hover, setHover] = useState<boolean[]>([]);

  const [shades, setShades] = useState<string[]>([]);
  
  const generateShades = () => {
    const baseColor = colord("#" + color);
    const hsl = baseColor.toHsl();
    const totalVariants = 20;
    
    // Determine the number of darks and lights based on lightness
    const numShades = Math.round(totalVariants * (hsl.l / 100));
    const numTints = totalVariants - numShades;

    // Generate darker shades
    const newShades = Array.from({ length: numShades }, (_, i) => {
      const lightness = Math.max(hsl.l - (i + 1) * (hsl.l / numShades), 0);
      return colord({ h: hsl.h, s: hsl.s, l: lightness }).toHex().replace("#", "");
    });

    // Generate lighter tints
    const newTints = Array.from({ length: numTints }, (_, i) => {
      const lightness = Math.min(hsl.l + (i + 1) * ((100 - hsl.l) / numTints), 100);
      return colord({ h: hsl.h, s: hsl.s, l: lightness }).toHex().replace("#", "");
    });

    // Combine tints and shades
    const combinedVariants = [...newTints.reverse(), colord("#" + color).toHex().replace("#", ""), ...newShades];

    // Set the new shades
    setShades(combinedVariants);
    setHover(new Array(combinedVariants.length).fill(false));
  };

  useEffect(() => {
    generateShades();
  }, [color]);

  const handleMouseEnter = (index: number) => {
    setHover(prevHover => prevHover.map((val, i) => i === index ? true : val));
  };

  const handleMouseLeave = (index: number) => {
    setHover(prevHover => prevHover.map((val, i) => i === index ? false : val));
  };

  const handleClick = (shade: string) => {
    setColor(shade);
    setShadeActive(false);
  };

  return (
    <div 
      className="flex flex-col justify-start w-full"
      >
      {shades.length > 0 &&
        shades.map((shade, shadeIndex) => (
          <div
            key={"container" + shadeIndex}
            className="w-full flex justify-center items-center cursor-pointer"
            style={{
              backgroundColor: "#" + shade,
              height: "calc((100vh - 6rem)/25)"
            }}
            onMouseEnter={() => handleMouseEnter(shadeIndex)}
            onMouseLeave={() => handleMouseLeave(shadeIndex)}
            onClick={() => handleClick(shade)}
          >
            <h6
              key={"shade" + shadeIndex}
              className={
                "w-full text-center flex justify-center " +
                (colord("#" + shade).isLight() ? "text-black" : "text-white")
              }
            >
              {hover[shadeIndex] ? shade.toUpperCase() : shade == color ? <CheckCircle2/> : String.fromCharCode(160)}
            </h6>
          </div>
        ))}
    </div>
  );
};

export default Shades;
