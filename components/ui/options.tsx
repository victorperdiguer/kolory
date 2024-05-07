import React from "react"
import { LockOpen, Lock, Trash2, Heart, Grip, Layers, Info, Delete} from "lucide-react";
import LockOption from "./options/lockoption";
import DeleteColorOption from "./options/deletecoloroption";
import MoveOption from "./options/moveoption";
import { DragControls } from "framer-motion";

const Options = ({color, colorIndex, colors, dragControls} : { color: string, colorIndex: number, colors: string[], dragControls: DragControls}) => {

  return (
    <div className="flex lg:flex-col flex-row-reverse justify-center gap-6 mb-20">
      <DeleteColorOption color={color} colorIndex={colorIndex}/>
      <Info></Info>
      <MoveOption
        dragControls={dragControls}
        color={color} colorIndex={colorIndex} colors={colors}
      />
      <Heart></Heart>
      <Layers></Layers>
      <LockOption color={color} colorIndex={colorIndex} />
    </div>
  )
};

export default Options;
