import React from "react";
import { useState, useContext } from "react";
import { LockOpen, LockKeyhole } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "../tooltip";
import { LockedColorsContext } from "@/lib/lockedColorsContext";
import { colord } from "colord";

const LockOption = ({ color, colorIndex }: { color: string, colorIndex: number }) => {

  const [optionHover, setOptionHover] = useState(false);

  const hoverColor = colord("#"+color).isLight() ? colord("#"+color).darken(0.1).toHex() : colord("#"+color).lighten(0.1).toHex();

  const {lockedColors, handleLockColor} = useContext(LockedColorsContext);

  const lockHandler = () => {
    handleLockColor(colorIndex);
  };


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
                    {lockedColors && !lockedColors.some((e) => e == colorIndex) ? (
                        <LockOpen onClick={() => lockHandler()} />
                    ) : (
                        <LockKeyhole onClick={() => lockHandler()} />
                    )}
                </TooltipTrigger>
                <TooltipContent>
                    {lockedColors && !lockedColors.some((e) => e == colorIndex) ? <p>Lock color</p> : <p>Unlock color</p>}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
);
};

export default LockOption;
