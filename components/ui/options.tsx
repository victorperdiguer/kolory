import React from "react"
import { Heart } from "lucide-react";
import LockOption from "./options/lockoption";
import DeleteColorOption from "./options/deletecoloroption";
import MoveOption from "./options/moveoption";
import { DragControls } from "framer-motion";
import InfoOption from "./options/infooption";
import ShadesOption from "./options/shadesoption";

const Options = ({color, colorIndex, colors, dragControls, shadeActive, setShadeActive} : { color: string, colorIndex: number, colors: string[], dragControls: DragControls, shadeActive: boolean, setShadeActive: Function}) => {

  return (
    <div className="flex lg:flex-col flex-row-reverse justify-center gap-6 mb-20">
      <DeleteColorOption color={color} colorIndex={colorIndex}/>
      <InfoOption color={color} colorIndex={colorIndex} colors={colors}/>
      <MoveOption
        dragControls={dragControls}
        color={color} colorIndex={colorIndex} colors={colors}
      />
      <Heart></Heart>
      <ShadesOption color={color} colorIndex={colorIndex} shadeActive={shadeActive} setShadeActive={setShadeActive}></ShadesOption>
      <LockOption color={color} colorIndex={colorIndex} />
    </div>
  )
};

export default Options;
