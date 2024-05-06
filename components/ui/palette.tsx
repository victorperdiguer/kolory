import React from "react";
import { useState } from "react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { colorMap } from "@/lib/colorkeys";
import { Gluten } from "next/font/google";
import Options from "./options";

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

  const colorName =
    colorMap[
      colord(color).toName({ closest: true }) as keyof typeof colorMap
    ] || colord(color).toName({ closest: true });

  const textColor = colord(color).isDark() ? "white" : "black";

  const [paletteHover, setPaletteHover] = useState(false);



  return (
    <div
      style={{ backgroundColor: color, height: "calc(100vh - 4rem" }}
      className={
        "w-full lg:h-screen flex lg:flex-col flex-row-reverse justify-center items-center px-[5px] relative" +
        " " +
        "text-" +
        textColor
      }
      onMouseEnter={() => setPaletteHover(true)}
      onMouseLeave={() => setPaletteHover(false)}
    >
      {paletteHover && <Options textColor={textColor}></Options>}

      <div className="absolute lg:bottom-12 lg:left-auto left-12 flex flex-col justify-center lg:items-center gap-4">
        <h4 className="font-semibold text-2xl">
          {color.toUpperCase().replace("#", "")}
        </h4>
        <h6 className={gluten.className + " " + "opacity-[0.7]"}>
          {colorName}
        </h6>
      </div>
    </div>
  );
};

export default Palette;
