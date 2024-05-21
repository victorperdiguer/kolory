import React, { useEffect } from "react"
import { Button } from "../button";
import { useState } from "react";
import { SwatchBook, Droplet } from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Gluten } from "next/font/google";

const gluten = Gluten({
  weight: "500",
  subsets: ['latin']
})

const SideMenu = () => {

  const [itemDisplay, setItemDisplay] = useState("saved-palettes");
  const { data: session, status } = useSession();
  const [savedPalettes, setSavedPalettes] = useState([]);
  const [savedColors, setSavedColors] = useState([]);

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
      <div>
        {itemDisplay === "saved-palettes" && savedPalettes.length > 0 ? (
          <div>
            {savedPalettes.map((palette, index) => (
              <div
                key={index}
                className="p-3 flex flex-row w-full justify-center m-auto"
              >
                {palette.map((color, index) => (
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

        {itemDisplay === "saved-colors" && savedColors.length === 0 ? (
          <div className="p-3">
            <p className={gluten.className}>No saved palettes</p>
          </div>
        ) : null}

        {itemDisplay === "saved-colors" && savedColors.length > 0 ? (
          <div>
            {savedColors.map((color, index) => (
              <div key={index} className="p-3 flex flex-row justify-center items-center">
                <Droplet fill={"#"+color} color={"#"+color}/>
                <p className={gluten.className}>{color.toUpperCase()}</p>
              </div>
            ))}
          </div>
        ) : null}

        {itemDisplay === "saved-colors" && savedColors.length === 0 ? (
          <div className="p-3">
            <p className={gluten.className}>No saved colors</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SideMenu;
