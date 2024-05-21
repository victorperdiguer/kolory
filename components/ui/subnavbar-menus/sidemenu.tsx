import React from "react"
import { Button } from "../button";
import { useState } from "react";
import { SwatchBook, Droplet } from "lucide-react";
import axios from "axios";

const SideMenu = () => {

  const [itemDisplay, setItemDisplay] = useState("saved-palettes");

  return (
    <div>
      <div className="flex flex-row justify-between p-3">
          <Button variant="noborder"
            onClick={() => {setItemDisplay("saved-palettes")}}
            >
            <SwatchBook color={itemDisplay === "saved-palettes" ? "black": "#d1d1d1"}/>
          </Button>
          <Button variant="noborder"
            onClick={() => {setItemDisplay("saved-colors")}}
            >
            <Droplet color={itemDisplay === "saved-colors" ? "black": "#d1d1d1"}/>
          </Button>
      </div>
    </div>
  )
};

export default SideMenu;
