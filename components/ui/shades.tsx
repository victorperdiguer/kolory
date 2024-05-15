'use client'

import React from "react"
import { useEffect, useState } from "react";
import { colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";
import a11yPlugin from "colord/plugins/a11y";
import {CheckCircle2} from "lucide-react";
extend([mixPlugin]);
extend([a11yPlugin]);




const Shades = ({color, colors}: {color: string, colors: string[]}) => {

  const [hover, setHover] = useState<boolean[]>([]);

  const [shades, setShades] = useState<string[]>([]);
  
  const generateShades = () => {
    const brightness = colord("#" + color).brightness();
  
    // Determine the number of tints and shades based on brightness
    const totalVariants = 20;
    const numShades = Math.round(totalVariants * brightness);
    const numTints = totalVariants - numShades;
    console.log("brillo", brightness, "numShades", numShades, "numTints", numTints)
    
    // Generate tints and shades
    const newTints = colord("#" + color).tints(numTints).map(tint => tint.toHex().replace("#", "")).reverse();
    const newShades = colord("#" + color).shades(numShades).map(shade => shade.toHex().replace("#", ""));
    console.log("Shades", newShades, "Tints", newTints)

    
    // Combine tints and shades
    const combinedVariants = Array.from(new Set([...newTints, ...newShades])).filter(color => color.length <= 6);
    console.log("Final version", combinedVariants)
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

return (
  <div className="flex flex-col justify-start w-full">
    {shades.length > 0 &&
      shades.map((shade, shadeIndex) => (
        <div
          key={"container" + shadeIndex}
          className="w-full"
          style={{
            backgroundColor: "#" + shade,
          }}
          onMouseEnter={() => handleMouseEnter(shadeIndex)}
          onMouseLeave={() => handleMouseLeave(shadeIndex)}
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
