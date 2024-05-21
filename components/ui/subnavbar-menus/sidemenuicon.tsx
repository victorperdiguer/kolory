import React from "react"
import { Menu } from "lucide-react";
import { Button } from "../button";
import { useEffect } from "react";
import { useAnimate } from "framer-motion";


const SideMenuIcon = ({showSideMenu, setShowSideMenu} : {showSideMenu: boolean, setShowSideMenu: Function}) => {

  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      ".menuicon",

      {
        rotate: showSideMenu ? 90 : 0,
      }
    );
  }, [showSideMenu]);

  return (
    <div ref={scope}>
      <Button variant="noborder"
        onClick={() => {setShowSideMenu(!showSideMenu)}}
        >
          <Menu className="menuicon"/>
      </Button>
    </div>
  )
};

export default SideMenuIcon;
