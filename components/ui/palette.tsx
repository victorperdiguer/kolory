import React from "react"

const Palette = ({
  color,
  colors,
  lockedColors,
  colorIndex,
  setLockedColors
}: {
  color: string,
  colors: string[],
  lockedColors: string[],
  colorIndex: number,
  setLockedColors: (value: string[]) => void
}) => {
  return (
    <div style={{backgroundColor: color, height: 'calc(100vh - 4rem'}} className="w-full lg:h-screen flex flex-row-reverse justify-center items-center px-[5px] relative">
      {color.toUpperCase()}
    </div>
  )
};

export default Palette;
