import React from "react";
import { useState } from "react";
import { Grip } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "../tooltip";
import { colord } from "colord";
import { motion, DragControls } from "framer-motion";

const MoveOption = ({ color, dragControls }: {color: string, dragControls: DragControls }) => {

  const [optionHover, setOptionHover] = useState(false);

  const hoverColor = colord("#"+color).isLight() ? colord("#"+color).darken(0.1).toHex() : colord("#"+color).lighten(0.1).toHex();

return (
    <motion.div
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
    </motion.div>
);
};

export default MoveOption;
