import React from "react"
import { Heart } from "lucide-react";
import LockOption from "./options/lockoption";
import DeleteColorOption from "./options/deletecoloroption";
import MoveOption from "./options/moveoption";
import { DragControls } from "framer-motion";
import InfoOption from "./options/infooption";
import ShadesOption from "./options/shadesoption";
import SaveColorOption from "./options/savecoloroption";
import { SessionProvider } from "next-auth/react";

const Options = ({color, colorIndex, colors, dragControls, shadeActive, setShadeActive, isSaved, onToggleSave} : { color: string, colorIndex: number, colors: string[], dragControls: DragControls, shadeActive: boolean, setShadeActive: Function, isSaved: boolean, onToggleSave: Function}) => {

  return (
    <div className="flex lg:flex-col flex-row-reverse justify-center gap-6 mb-20">
      <DeleteColorOption color={color} colorIndex={colorIndex}/>
      <InfoOption color={color} />
      <MoveOption
        dragControls={dragControls}
        color={color} 
      />
      <SessionProvider>
        <SaveColorOption color={color} isSaved={isSaved} onToggleSave={onToggleSave} />
      </SessionProvider>
      <ShadesOption color={color} shadeActive={shadeActive} setShadeActive={setShadeActive}></ShadesOption>
      <LockOption color={color} colorIndex={colorIndex} />
    </div>
  )
};

export default Options;
