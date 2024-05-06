import React from "react";
import { useState, useContext } from "react";
import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "../tooltip";
import { LockedColorsContext } from "@/lib/lockedColorsContext";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";


const DeleteColorOption = ({ textColor, color, colorIndex }: { textColor: string, color: string, colorIndex: number }) => {
  const {pattern} = useParams<{pattern: string}>();

  const {lockedColors, handleLockColor} = useContext(LockedColorsContext);

  const [optionHover, setOptionHover] = useState(false);

  const navigate = useRouter();


  const deleteColorHandler = (clickedColorPosition: number) => {
    const currentColors = pattern.split('-')
    const newColors = currentColors.filter((color, index) => index !== clickedColorPosition)
    const newParams = newColors.join('-')
    if (lockedColors.some((e) => e == clickedColorPosition)) {
      handleLockColor(clickedColorPosition)
    }
    navigate.push(`/colors/${newParams}`)
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
        style={{ backgroundColor: optionHover ? "rgba(0, 0, 0, 0.1)" : "transparent" }}
    >
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    {" "}
                    {pattern.split('-').length != 1 ? <Trash2 onClick={() => deleteColorHandler(colorIndex)} /> : null}
                </TooltipTrigger>
                <TooltipContent>
                    <p>Delete color</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
);
};

export default DeleteColorOption;
