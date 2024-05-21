import React, { useEffect } from "react"
import { Button } from "../button";
import { useState } from "react";
import { SwatchBook, Droplet, CircleOff } from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Gluten } from "next/font/google";
import { useRouter } from "next/navigation";

const gluten = Gluten({
  weight: "300",
  subsets: ['latin']
})

const SideMenu = () => {

  const [itemDisplay, setItemDisplay] = useState("saved-palettes");
  const { data: session, status } = useSession();
  const [savedPalettes, setSavedPalettes] = useState([]);
  const [savedColors, setSavedColors] = useState([]);
  const navigate = useRouter();

  useEffect(() => {
    const fetchSavedColors = async () => {
      if (status === "authenticated" && session) {
        try {
          const response = await axios.get(`/api/color?email=${session?.user?.email}`);
          setSavedColors(response.data.savedColors);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchSavedColors();
  }, [status, session, itemDisplay]);

  useEffect(() => {
    const fetchSavedPalettes = async () => {
      if (status === "authenticated" && session) {
        try {
          const response = await axios.get(`/api/palette?email=${session?.user?.email}`);
          setSavedPalettes(response.data.savedPalettes);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchSavedPalettes();
  }, [status, session, itemDisplay]);

  const accessPalette = (palette: string[]) => {
    navigate.push(`/colors/${palette.join('-')}`);
  }
    
  return (
    <div>
      <div className="flex flex-row justify-between p-3">
        <Button
          variant="noborder"
          onClick={() => {
            setItemDisplay("saved-palettes");
          }}
        >
          <SwatchBook
            color={itemDisplay === "saved-palettes" ? "black" : "#d1d1d1"}
          />
        </Button>
        <Button
          variant="noborder"
          onClick={() => {
            setItemDisplay("saved-colors");
          }}
        >
          <Droplet
            color={itemDisplay === "saved-colors" ? "black" : "#d1d1d1"}
          />
        </Button>
      </div>
      <div className="p-3">
        {itemDisplay === "saved-palettes" && savedPalettes.length > 0 ? (
          <div className="h-screen flex-1 overflow-auto">
            {savedPalettes.map((palette: string[], index: number) => (
                <div
                    key={index}
                    className="mb-3 flex flex-row w-full justify-center m-auto cursor-pointer"
                    onClick={() => {accessPalette(palette)}}
                >
                    {palette.map((color: string, index: number) => (
                        <div
                            key={index}
                            style={{ backgroundColor: "#" + color }}
                            className="flex-1 h-12" // flex-1 to take equal space, h-12 for height
                        ></div>
                    ))}
                </div>
            ))}
          </div>
        ) : null}

        {itemDisplay === "saved-palettes" && savedPalettes.length === 0 ? (
          <div className="p-3 flex flex-col justify-center gap-5 items-center">
            <CircleOff color="#d1d1d1"/>
            <p className={gluten.className + " " + "text-center"} style={{color: "#d1d1d1"}}>No saved palettes</p>
          </div>
        ) : null}

        {itemDisplay === "saved-colors" && savedColors.length > 0 ? (
          <div>
            {savedColors.map((color: string, index: number) => (
              <div key={index} className="p-3 flex flex-row justify-center items-center">
                <Droplet fill={"#"+color} color={"#"+color}/>
                <p className={gluten.className+" "+"mt-1"}>{color.toUpperCase()}</p>
              </div>
            ))}
          </div>
        ) : null}

        {itemDisplay === "saved-colors" && savedColors.length === 0 ? (
          <div className="p-3 flex flex-col justify-center gap-5 items-center">
            <CircleOff color="#d1d1d1"/>
            <p className={gluten.className + " " + "text-center"} style={{color: "#d1d1d1"}}>No saved colors</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SideMenu;
