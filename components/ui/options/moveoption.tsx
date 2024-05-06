import React, { use } from "react";
import { useState, useContext } from "react";
import { Grip } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "../tooltip";
import { LockedColorsContext } from "@/lib/lockedColorsContext";
import { colord } from "colord";
import { DragControls } from "framer-motion";

const MoveOption = ({ color, colorIndex, dragControls }: {color: string, colorIndex: number, dragControls: DragControls }) => {

  const [optionHover, setOptionHover] = useState(false);

  const hoverColor = colord("#"+color).isLight() ? colord("#"+color).darken(0.1).toHex() : colord("#"+color).lighten(0.1).toHex();

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
        onPointerDown={(e) => {
          e.preventDefault()
          dragControls.start(e, { snapToCursor: true })
        }}
    >
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Grip/>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Drag around to switch places</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
);
};

export default MoveOption;
