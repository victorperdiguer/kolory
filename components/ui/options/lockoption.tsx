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

const LockOption = ({ textColor }: { textColor: string }) => {
  const [locked, setLocked] = useState(false);

  const lockHandler = () => {
    setLocked(!locked);
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
                    {locked ? (
                        <LockOpen onClick={() => lockHandler()} />
                    ) : (
                        <LockKeyhole onClick={() => lockHandler()} />
                    )}
                </TooltipTrigger>
                <TooltipContent>
                    {locked ? <p>Lock color</p> : <p>Unlock color</p>}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
);
};

export default LockOption;
