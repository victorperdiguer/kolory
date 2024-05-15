import React, { useEffect, useRef, useState } from "react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { colorMap } from "@/lib/colorkeys";
import { Gluten } from "next/font/google";
import Options from "./options";
import { Reorder, useDragControls } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import ReactGPicker from "react-gcolor-picker";
import { useClickOutside } from "@/app/hooks/use-click-outside";
import Shades from "./shades";
import { useSession } from "next-auth/react";

extend([namesPlugin]);

const gluten = Gluten({
  weight: "200",
  subsets: ["latin"],
});

const Palette = ({
  color,
  colors,
  colorIndex,
}: {
  color: string;
  colors: string[];
  colorIndex: number;
}) => {
  const navigate = useRouter();
  const { data: session, status } = useSession();
  const [colorInstance, setColorInstance] = useState<string>(color);
  const [colorName, setColorName] = useState<string>("");
  const [textColor, setTextColor] = useState<string>(colord("#" + color).isDark() ? "white" : "black");
  const [paletteHover, setPaletteHover] = useState(false);
  const [textHover, setTextHover] = useState(false);
  const dragControls = useDragControls();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorsInPalette, setColorsInPalette] = useState<string[]>(colors);
  const [savedColors, setSavedColors] = useState<string[]>([]);
  const hoverColor = colord("#"+color).isLight() ? colord("#"+color).darken(0.1).toHex() : colord("#"+color).lighten(0.1).toHex();
  const [shadeActive, setShadeActive] = useState(false);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const handleSetColor = (newColor: string) => {
    newColor = newColor.replaceAll("#", "");
    setColorInstance(newColor);

    const newColors = [...colors];
    newColors[colorIndex] = newColor;
    setColorsInPalette(newColors);
  };

  const onClickOutside = () => {
    setShowColorPicker(false);
    newColorURL();
  };

  const clickRef = useClickOutside(onClickOutside);

  const newColorURL = () => {
    setTimeout(() => {
      navigate.push(`/colors/${colorsInPalette.join("-").replaceAll("#", "")}`);
    }, 1);
  };

  useEffect(() => {
    newColorURL();
  }, [colorsInPalette]);

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
  }, [status, session]);

  const getColorName = async () => {
    try {
      const response = await axios.get(`https://api.color.pizza/v1/${colorInstance}`);
      setColorName(response.data.colors[0].name);
    } catch (error) {
      const result = colorMap[colord("#" + colorInstance).toName({ closest: true }) as keyof typeof colorMap] || colord("#" + colorInstance).toName({ closest: true });
      setColorName(result as string);
    }
  };

  useEffect(() => {
    getColorName();
    setTextColor(colord("#" + colorInstance).isDark() ? "white" : "black");
    handleSetColor(colorInstance);
  }, [colorInstance]);

  const onToggleSave = async () => {
    if (!session) {
      console.error("User not authenticated");
      return;
    }

    try {
      await axios.post('/api/color', { email: session?.user?.email, color: colorInstance });
      setSavedColors(prevSavedColors => (
        prevSavedColors.includes(colorInstance)
          ? prevSavedColors.filter(savedColor => savedColor !== colorInstance)
          : [...prevSavedColors, colorInstance]
      ));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Reorder.Item
      key={colorInstance}
      value={colorInstance}
      style={{
        backgroundColor: "#" + colorInstance,
        height: "calc(100vh - 6rem",
        width: "100%",
      }}
      className={
        "flex lg:flex-col flex-row-reverse items-center relative" +
        (shadeActive ? "justify-start" : "justify-center")
      }
      onMouseEnter={() => setPaletteHover(true)}
      onMouseLeave={() => setPaletteHover(false)}
      dragControls={dragControls}
      dragListener={false}
      onDragTransitionEnd={() => newColorURL()}
      ref={parentRef}
    >
      {!shadeActive && (
        <div
          className={
            "w-full lg:h-screen flex lg:flex-col flex-row-reverse justify-center items-center px-[5px] relative" +
            " " +
            "text-" +
            textColor +
            " " +
            (shadeActive ? "hidden" : "")
          }
        >
          {paletteHover && (
            <Options
              color={colorInstance}
              colorIndex={colorIndex}
              dragControls={dragControls}
              colors={colors}
              shadeActive={shadeActive}
              setShadeActive={setShadeActive}
              isSaved={savedColors.includes(colorInstance)}
              onToggleSave={onToggleSave}
            />
          )}

          <div className="absolute lg:bottom-12 lg:left-auto left-12 flex flex-col justify-center lg:items-center gap-2">
            <div
              className="relative rounded-lg p-1 cursor-pointer"
              onMouseEnter={() => {
                setTextHover(true);
              }}
              onMouseLeave={() => {
                setTextHover(false);
              }}
              style={{
                backgroundColor: textHover ? hoverColor : "transparent",
              }}
            >
              {showColorPicker ? (
                <div
                  className="p-2 absolute bottom-full rounded-3xl z-50 left-1/2 transform -translate-x-1/2"
                  ref={clickRef}
                >
                  <ReactGPicker
                    value={colorInstance}
                    onChange={(value) => handleSetColor(value)}
                    showAlpha={false}
                    gradient={false}
                    format="hex"
                    popupWidth={
                      parentRef.current?.offsetWidth
                        ? parentRef.current.offsetWidth - 15
                        : undefined
                    }
                  />
                </div>
              ) : (
                ""
              )}

              <h4
                className="font-semibold text-2xl"
                onClick={() => setShowColorPicker(true)}
              >
                {colorInstance.toUpperCase()}
              </h4>
            </div>

            <h6 className={gluten.className + " " + "opacity-[0.7]"}>
              {colorName ? (
                colorName
              ) : (
                <span style={{ color: "#" + colorInstance }}>.</span>
              )}
            </h6>
          </div>
        </div>
      )}

      {shadeActive && (
        <Shades
          color={colorInstance}
          colors={colorsInPalette}
          setColor={setColorInstance}
          shadeActive={shadeActive}
          setShadeActive={setShadeActive}
        />
      )}
    </Reorder.Item>
  );
};

export default Palette;