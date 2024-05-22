import React from "react"
import Image from "next/image"
import { Gluten } from "next/font/google";
import SideMenuIcon from "./subnavbar-menus/sidemenuicon";
import SavePalette from "./subnavbar-menus/savepalette";
import SharePalette from "./subnavbar-menus/sharepalette";

const gluten = Gluten({
  weight: "300",
  subsets: ['latin']
})

const SubNavbar = ({params, targetRef, handleExportPdf, showSideMenu, setShowSideMenu}: {params: {pattern: string}, targetRef: React.MutableRefObject<any>, handleExportPdf: Function, showSideMenu: boolean, setShowSideMenu: Function}) => {


  return (
    <div className="flex flex-row justify-between items-center pl-7 pr-5 border-b-2 w-full bg-white z-10">
    <div className={gluten.className+" flex flex-row items-center text-zinc-400"}>
      <p>Press </p>
      <Image src="/spacebar.svg" alt="space" width={70} height={30}/>
      <p>to generate a new palette</p>
    </div>
    <div className="flex flex-row justify-center items-center gap-2">
      <SavePalette params={params}/>
      <SharePalette targetRef={targetRef} handleExportPdf={handleExportPdf}/>
      <SideMenuIcon showSideMenu={showSideMenu} setShowSideMenu={setShowSideMenu}/>
    </div>
    </div>
  )
};

export default SubNavbar;
