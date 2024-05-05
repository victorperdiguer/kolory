'use client'

import React from "react"
import { useEffect, useState } from 'react';
import {motion, useAnimation} from 'framer-motion';
import randomColor from 'randomcolor';

const paths = [
  "M482.8,266.365l-324,187.6h300.4c19.6,0,34.4-16,34.4-35.6v-125.2 C494,282.765,490.8,273.165,482.8,266.365z",
    "M500,329.165l-32.4-120.8c-4-15.6-18.4-26.4-34.4-26.4c-1.6,0-3.2,0-4.8,0.4l-245.2,268.8l292-78.4 c9.6-2.4,17.2-8.8,22-17.2C501.2,347.165,502.4,337.965,500,329.165z",
    "M462.8,245.965l-62.4-108.4c-6.4-10.8-18-17.6-30.8-17.6c-2.8,0-5.6,0.4-8.4,0.8 c-1.6,0.4-3.2,0.8-4.8,1.6l-168,323.6l261.6-151.6C466.8,284.765,472.8,262.765,462.8,245.965z",
    "M406.4,174.765l-88.8-88.4c-6.8-6.8-15.6-10.4-25.2-10.4c-6.8,0-13.6,2-19.2,5.6l-80.8,357.2 l213.6-213.6C420,211.165,420,188.765,406.4,174.765z",
    "M336,119.965l-108.8-62.8c-5.2-3.2-11.6-4.8-17.6-4.8c-10.4,0-20.8,4.8-27.2,12.8l15.6,364.8 l151.2-261.6C358.8,151.565,352.8,129.565,336,119.965z",
    "M252,85.565l-120.8-32.4c-2.8-0.8-6-1.2-9.2-1.2c-13.6,0-26,8-32,20l109.2,348.8l78-291.6 C282.4,110.365,271.2,90.765,252,85.565z",
    "M165.2,399.965c-2-0.8-5.6,0-7.6,0c-7.6,0-12.4,8.4-12.4,16s6.4,14,14,14s16-4,16-11.6 c0-1.6,0-10.4-0.8-11.6C172.8,400.765,165.2,400.365,165.2,399.965z",
    "M194,109.165c0-19.6-14.8-35.6-34.8-35.6H46.4c-19.6,0-36.4,16-36.4,35.6v308.8 c0,19.6,16.8,35.6,36.4,35.6h116.8c19.6,0,34.8-16,34.8-35.6C194,417.965,194,109.165,194,109.165z",
]

const LandingPalette = () => {
  const [colors, setColors] = useState(["#00AB5E", "#0065A3", "#012E49", "#E80048", "#FF4949", "#FF9100", "#FFD400", "#FFD400", "#008ADF"]);
  const controls = useAnimation();

  useEffect(() => {
    controls.start(i => ({
      fill: colors[i],
      transition: { duration: 1 }
    }));
  }, [colors, controls]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColors(colors => randomColor({hue: 'random',count: 9, luminosity: 'random'}));
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 506.653 506.653" width="350px" height="350px">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
      <g id="SVGRepo_iconCarrier">
        {colors.map((color, i) => (
          <motion.path
            key={i}
            custom={i}
            initial={{ fill: color }}
            animate={controls}
            d={paths[i]} // Assuming `paths` is an array of `d` attributes for each path
          />
        ))}
      </g>
    </svg>
  );
};

export default LandingPalette;
