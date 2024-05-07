import React, { useEffect } from "react";
import { useState } from "react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { colorMap } from "@/lib/colorkeys";
import { Gluten } from "next/font/google";
import Options from "./options";
import { Reorder, useDragControls } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";

extend([namesPlugin]);

const gluten = Gluten({
  weight: "200",
  subsets: ["latin"],
});

const Palette = ({
  color,
  colors,
  colorIndex,
}: {
  color: string;
  colors: string[];
  colorIndex: number;
}) => {

  const navigate = useRouter();

  const [colorName, setColorName] = useState<string>("");

  async function getColorName() {
    try {
      const response = await axios.get(`https://api.color.pizza/v1/${color}`);
      setColorName(response.data.colors[0].name);
    } catch (error) {
      const result = 
      colorMap[
      colord("#"+color).toName({ closest: true }) as keyof typeof colorMap
    ] || colord("#"+color).toName({ closest: true });
    setColorName(result as string);
    }
  }

  const textColor = colord("#"+color).isDark() ? "white" : "black";

  const [paletteHover, setPaletteHover] = useState(false);

  const dragControls = useDragControls();

  const newColorURL = () => {
    setTimeout(() => {
        navigate.push(`/colors/${colors.join("-").replaceAll("#", "")}`);
    }, 1);
  }

  useEffect(() => {
    getColorName();
  }, []);

  return (
    //cancer part --> make sure key and value are THE SAME as in the reorder group or shit will break
      <Reorder.Item key={color} value={color} style={{ backgroundColor: "#"+color, height: "calc(100vh - 6rem", width: "100%" }} className={
      "flex lg:flex-col flex-row-reverse justify-center items-center px-[5px] relative"}
    onMouseEnter={() => setPaletteHover(true)}
    onMouseLeave={() => setPaletteHover(false)}
    dragControls={dragControls}
    dragListener={false}
    onDragTransitionEnd={() => newColorURL()}
    >
    <div 
      className={
        "w-full lg:h-screen flex lg:flex-col flex-row-reverse justify-center items-center px-[5px] relative" +
        " " +"text-"+textColor
      }
    >
      {paletteHover && <Options color={color} colorIndex={colorIndex} dragControls={dragControls} colors={colors}
></Options>}

      <div className="absolute lg:bottom-12 lg:left-auto left-12 flex flex-col justify-center lg:items-center gap-4">
        <h4 className="font-semibold text-2xl">
          {color.toUpperCase()}
        </h4>
        <h6 className={gluten.className + " " + "opacity-[0.7]"}>
          {colorName ? colorName : <span style={{color: '#'+color}}>.</span>}
        </h6>
      </div>
    </div>
    </Reorder.Item>
  );
};

export default Palette;
