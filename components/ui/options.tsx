import React from "react"
import { LockOpen, Lock, Trash2, Heart, Grip, Layers, Info} from "lucide-react";
import LockOption from "./options/lockoption";

const Options = ({color} : {color: string}) => {
  return (
    <div>
      <Trash2></Trash2>  
      <Info></Info>
      <Grip></Grip>
      <Heart></Heart>
      <Layers></Layers>
      <LockOption textColor={color}></LockOption>
    </div>
  )
};

export default Options;
