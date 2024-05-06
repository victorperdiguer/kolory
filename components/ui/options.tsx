import React from "react"
import { LockOpen, Lock, Trash2, Heart, Grip, Layers, Info} from "lucide-react";
import LockOption from "./options/lockoption";

const Options = ({textColor, color, colorIndex} : {textColor: string, color: string, colorIndex: number}) => {

  return (
    <div className="flex lg:flex-col flex-row-reverse justify-center gap-7">
      <Trash2></Trash2>  
      <Info></Info>
      <Grip></Grip>
      <Heart></Heart>
      <Layers></Layers>
      <LockOption textColor={textColor} color={color} colorIndex={colorIndex}></LockOption>
    </div>
  )
};

export default Options;
