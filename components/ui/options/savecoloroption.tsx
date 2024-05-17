import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "../tooltip";
import { colord } from "colord";

const SaveColorOption = ({ color, isSaved, onToggleSave } : { color: string, isSaved: boolean, onToggleSave: Function}) => {
  const textColor = colord("#" + color).isDark() ? "white" : "black";
  const [optionHover, setOptionHover] = useState(false);
  const hoverColor = colord("#" + color).isLight()
    ? colord("#" + color).darken(0.1).toHex()
    : colord("#" + color).lighten(0.1).toHex();

  return (
    <div
      onMouseEnter={() => setOptionHover(true)}
      onMouseLeave={() => setOptionHover(false)}
      className="rounded-lg aspect-square flex justify-center items-center p-1.5"
      style={{ backgroundColor: optionHover ? hoverColor : "transparent" }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {isSaved ? (
              <Heart fill={textColor} onClick={() => onToggleSave()} />
            ) : (
              <Heart onClick={() => onToggleSave()} />
            )}
          </TooltipTrigger>
          <TooltipContent>
            {isSaved ? "Unsave color" : "Save color"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SaveColorOption;
