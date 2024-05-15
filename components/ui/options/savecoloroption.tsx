import React, { use } from "react";
import { useState } from "react";
import { Heart } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "../tooltip";
import { colord } from "colord";
import axios from "axios";
import { useSession } from "next-auth/react";

const SaveColorOption = ({ color }: { color: string }) => {

  const { data: session } = useSession();

  const textColor = colord("#" + color).isDark() ? "white" : "black"

  const [optionHover, setOptionHover] = useState(false);

  const hoverColor = colord("#"+color).isLight() ? colord("#"+color).darken(0.1).toHex() : colord("#"+color).lighten(0.1).toHex();

  const saveColorHandler = async () => {
    if (!session) {
      console.error("User not authenticated");
      return;
    }

    try {
      const response = await axios.post('/api/color', { email: session?.user?.email, color });
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
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
                          <Heart 
                          fill={textColor}
                          onClick={() => saveColorHandler()} />
                  </TooltipTrigger>
                  <TooltipContent>
                      Save color
                  </TooltipContent>
              </Tooltip>
          </TooltipProvider>
      </div>
  );
};

export default SaveColorOption;
