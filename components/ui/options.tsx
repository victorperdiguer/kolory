import React from "react"
import { useState } from "react";
import { LockOpen, Lock, Trash2, Heart, Grip, Layers, Info, Delete} from "lucide-react";
import LockOption from "./options/lockoption";
import DeleteColorOption from "./options/deletecoloroption";
import MoveOption from "./options/moveoption";
import { DragControls } from "framer-motion";
import {colord} from "colord";

const Options = ({color, colorIndex, dragControls} : { color: string, colorIndex: number, dragControls: DragControls}) => {

  return (
    <div className="flex lg:flex-col flex-row-reverse justify-center gap-7">
      <DeleteColorOption color={color} colorIndex={colorIndex}/>
      <Info></Info>
      <MoveOption
        dragControls={dragControls}
        color={color} colorIndex={colorIndex}
      />
      <Heart></Heart>
      <Layers></Layers>
      <LockOption color={color} colorIndex={colorIndex} />
    </div>
  )
};

export default Options;
