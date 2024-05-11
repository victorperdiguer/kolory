import React from "react"
import { useState } from "react";
import { colord } from "colord";
import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Label } from "../label";
import { Input } from "../input";

const InfoOption = ({ color, colorIndex, colors }: {color: string, colorIndex: number, colors: string[] }) => {
  
  const [optionHover, setOptionHover] = useState(false);
  const hoverColor = colord("#"+color).isLight() ? colord("#"+color).darken(0.1).toHex() : colord("#"+color).lighten(0.1).toHex();
  const colorProperties = {
    Hue: colord("#"+color).hue(),
    RGB: colord("#"+color).toRgbString(),
    HSL: colord("#"+color).toHslString(),
    Alpha: colord("#"+color).alpha(),
    Brightness: colord("#"+color).brightness(),
    Luminance: colord("#"+color).isDark() ? "Dark" : "Light",
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
        style={{ backgroundColor: optionHover ? hoverColor : "transparent" }} >
        <Popover>
            <PopoverTrigger>
            <Info className="w-6 h-6"/>
            </PopoverTrigger>
            <PopoverContent>
            <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Color information</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
                {Object.keys(colorProperties).map((property, index) => {
                    return (
                        <div key={index}>
                            <Label htmlFor={property}>{property}</Label>
                            <Input
                                id={property}
                                defaultValue={colorProperties[property as keyof typeof colorProperties]}
                                className="col-span-2 h-8"
                                readOnly
                            />
                        </div>
                    );
                })}
            </div>
            </div>
        </div>
            </PopoverContent>
        </Popover>
    </div>
  )
};

export default InfoOption;
