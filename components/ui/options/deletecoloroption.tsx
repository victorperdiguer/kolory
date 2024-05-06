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
import { colord } from "colord";


const DeleteColorOption = ({ textColor, color, colorIndex }: { textColor: string, color: string, colorIndex: number }) => {
  const {pattern} = useParams<{pattern: string}>();

  const hoverColor = colord(color).isLight() ? colord(color).darken(0.1).toHex() : colord(color).lighten(0.1).toHex();

  const {lockedColors, handleLockColor} = useContext(LockedColorsContext);

  const [optionHover, setOptionHover] = useState(false);

  const navigate = useRouter();


  const deleteColorHandler = (clickedColorPosition: number) => {
    const currentColors = pattern.split('-')
    const newColors = currentColors.filter((color, index) => index !== clickedColorPosition)
    const newParams = newColors.join('-')
    handleLockColor(clickedColorPosition, true)
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
        style={{ backgroundColor: optionHover ? hoverColor : "transparent" }} >
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
