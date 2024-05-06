import React from "react"
import { useState } from "react";
import { LockOpen, Lock, Trash2, Heart, Grip, Layers, Info, Delete} from "lucide-react";
import LockOption from "./options/lockoption";
import DeleteColorOption from "./options/deletecoloroption";

const Options = ({textColor, color, colorIndex} : {textColor: string, color: string, colorIndex: number}) => {

  return (
    <div className="flex lg:flex-col flex-row-reverse justify-center gap-7">
      <DeleteColorOption textColor={textColor} color={color} colorIndex={colorIndex}/>
      <Info></Info>
      <Grip></Grip>
      <Heart></Heart>
      <Layers></Layers>
      <LockOption textColor={textColor} color={color} colorIndex={colorIndex} />
    </div>
  )
};

export default Options;
