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

const LockOption = ({ textColor, color, colorIndex }: { textColor: string, color: string, colorIndex: number }) => {

  const lockHandler = (lockStatus: boolean) => {
    handleLockColor(colorIndex);
  };

  const [optionHover, setOptionHover] = useState(false);

  const {lockedColors, handleLockColor} = useContext(LockedColorsContext);

return (
    <div
        onMouseEnter={() => {
            setOptionHover(true);
        }}
        onMouseLeave={() => {
            setOptionHover(false);
        }}
        className="rounded-lg aspect-square flex justify-center items-center p-1.5"
        style={{ backgroundColor: optionHover ? "rgba(0, 0, 0, 0.1)" : "transparent" }}
    >
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    {" "}
                    {!lockedColors.some((e) => e == colorIndex) ? (
                        <LockOpen onClick={() => lockHandler(false)} />
                    ) : (
                        <LockKeyhole onClick={() => lockHandler(true)} />
                    )}
                </TooltipTrigger>
                <TooltipContent>
                    {!lockedColors.some((e) => e == colorIndex) ? <p>Lock color</p> : <p>Unlock color</p>}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
);
};

export default LockOption;
