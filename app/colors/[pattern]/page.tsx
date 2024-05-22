'use client'
import React, { useState, useEffect } from "react";
import Palette from "@/components/ui/palette";
import { LockedColorsContext } from "@/lib/lockedColorsContext";
import { Reorder } from "framer-motion";
import { useRouter } from "next/navigation";
import SubNavbar from "@/components/ui/subnavbar";
import randomColor from "randomcolor";
import { usePDF } from "react-to-pdf";
import SideMenu from "@/components/ui/subnavbar-menus/sidemenu";

const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
};

const rgbToHex = ({ r, g, b }: { r: number; g: number; b: number }) => {
  return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const averageColor = (color1: string, color2: string) => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  const avgRgb = {
    r: Math.round((rgb1.r + rgb2.r) / 2),
    g: Math.round((rgb1.g + rgb2.g) / 2),
    b: Math.round((rgb1.b + rgb2.b) / 2),
  };
  return rgbToHex(avgRgb);
};

export default function Page({ params }: { params: { pattern: string } }) {
  let aux = sessionStorage.getItem('lockedColors') as string;
  const initialLockedColors = JSON.parse(aux) as number[] || [];

  const navigate = useRouter();
  const [colors, setColors] = useState(params.pattern.split('-'));
  const [lockedColors, setLockedColors] = useState<number[]>(initialLockedColors as number[]);
  const [showSideMenu, setShowSideMenu] = useState<boolean>(false);

  const { toPDF, targetRef } = usePDF({
    method: "save",
    filename: "palettes.pdf",
    page: { orientation: "landscape", format: "a5" },
  });

  const handleLockColor = (clickedColorPosition: number, deleted?: boolean, colorAdded?: boolean) => {
    let newLockedColors = [] as number[];
    if (deleted !== true) {
      if (colorAdded === true) {
        for (let i = 0; i < lockedColors.length; i++) {
          if (lockedColors[i] > clickedColorPosition) {
            lockedColors[i]++;
          }
        }
        newLockedColors = lockedColors
      } else {
        if (lockedColors.includes(clickedColorPosition)) {
          newLockedColors = lockedColors.filter((lockedColorPosition) => lockedColorPosition !== clickedColorPosition);
        } else {
          newLockedColors = [...lockedColors, clickedColorPosition];
        }
      }



    }
    if (deleted === true) {
      for (let i = 0; i < lockedColors.length; i++) {
        if (lockedColors[i] > clickedColorPosition) {
          lockedColors[i]--;
        }
      }
      newLockedColors = lockedColors;
    }
    setLockedColors(newLockedColors);
    sessionStorage.setItem('lockedColors', JSON.stringify(newLockedColors));
  };

  const addColorAtIndex = (index: number) => {
    const color1 = colors[index];
    const color2 = colors[index + 1];
    const newColor = averageColor(color1, color2);
    const newColors = [...colors.slice(0, index + 1), newColor, ...colors.slice(index + 1)];
    setColors(newColors);
    handleLockColor(index, false, true);
    const colorURL = newColors.join("-");
    navigate.push(`/colors/${colorURL}`);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        const newColors = colors.map((color, colorIndex) => {
          let newColor;
          if (lockedColors.includes(colorIndex)) {
            newColor = color;
          }
          else {
            newColor = randomColor({ hue: 'random', luminosity: 'random' }).replace("#", "");
          }
          return newColor;
        });
        setColors(newColors);
        const colorURL = newColors.join("-");
        navigate.push(`/colors/${colorURL}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lockedColors]);

  return (
    <LockedColorsContext.Provider value={{ lockedColors, handleLockColor }}>
      <div>
        <SubNavbar
          params={params}
          targetRef={targetRef}
          handleExportPdf={toPDF}
          showSideMenu={showSideMenu}
          setShowSideMenu={setShowSideMenu}
        />

        <div id="div encima del reorder">
          <Reorder.Group
            ref={targetRef}
            values={colors}
            onReorder={(newColors) => {
              const indexMap = new Map();
              newColors.forEach((color, newIndex) => {
                const oldIndex = colors.indexOf(color);
                indexMap.set(oldIndex, newIndex);
              });

              const newLockedColors = lockedColors.map((oldIndex) =>
                indexMap.get(oldIndex)
              );
              setLockedColors(newLockedColors);
              sessionStorage.setItem(
                "lockedColors",
                JSON.stringify(newLockedColors)
              );

              setColors(newColors);
            }}
            axis="x"
            className="flex lg:flex-row flex-col"
          >
            {colors.map((color: string, colorIndex: number) => (
                <Palette
                  key={color}
                  color={color}
                  colors={colors}
                  colorIndex={colorIndex}
                  addColorAtIndex={addColorAtIndex}
                />
            ))}

            {showSideMenu ? (
              <SideMenu />
            ) : null}
          </Reorder.Group>
        </div>
      </div>
    </LockedColorsContext.Provider>
  );
}
