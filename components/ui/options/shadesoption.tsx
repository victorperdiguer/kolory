import React from "react"
import { colord } from "colord";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layers } from "lucide-react";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "../tooltip";
import { set } from "mongoose";

const ShadesOption = ({ color, colorIndex, shades }: { color: string, colorIndex: number, shades: boolean }) => {

  const hoverColor = colord("#"+color).isLight() ? colord("#"+color).darken(0.1).toHex() : colord("#"+color).lighten(0.1).toHex();

  const [optionHover, setOptionHover] = useState(false);

  const [activateShades, setActivateShades] = useState<boolean>(false);

  const navigate = useRouter();

  const shadeHandler = () => {
    setActivateShades(!shades);
  }

  return (
    <div
      onMouseEnter={() => {
        setOptionHover(true);
      }}
      onMouseLeave={() => {
        setOptionHover(false);
      }}
      className="rounded-lg aspect-square flex justify-center items-center p-1.5"
      style={{ backgroundColor: optionHover ? hoverColor : "transparent" }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {" "}
            <Layers onClick={() => shadeHandler()} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Change color shade</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ShadesOption;
