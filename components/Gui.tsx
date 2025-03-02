/* eslint-disable @next/next/no-img-element */
import React from "react";

interface GuiProps {
  pixelSize: number;
  setPixelSize: (size: number) => void;

  lightsValue: number;
  setLightsValue: (value: number) => void;

  color: string;
  setColor: (color: string) => void;

  background: string;
  setBackground: (background: string) => void;

  canvasWidth: number;
  setCanvasWidth: (width: number) => void;

  canvasHeight: number;
  setCanvasHeight: (height: number) => void;
}

const Gui: React.FC<GuiProps> = ({
  pixelSize,
  setPixelSize,
  lightsValue,
  setLightsValue,
  color,
  setColor,
  background,
  setBackground,
  canvasWidth,
  setCanvasWidth,
  canvasHeight,
  setCanvasHeight,
}) => {
  return (
    <div
      style={{ accentColor: "white" }}
      className="flex flex-col gap-5 w-full"
    >
      {/* pixel size */}
      <div className="flex flex-col gap-2">
        <label>Pixel size</label>
        <div className="flex items-center gap-2 w-full">
          <img
            src="images/icons/CircleSize.svg"
            alt="circle size"
            className="h-5 w-5"
          ></img>
          <input
            type="range"
            min="1"
            max="100"
            value={pixelSize}
            onChange={(e) => setPixelSize(Number(e.target.value))}
            className="w-full"
          />
          <img
            src="images/icons/CircleSize.svg"
            alt="circle size"
            className="h-7 w-7"
          ></img>
        </div>
      </div>
      {/* light */}
      <div className="flex flex-col gap-2">
        <label>Light</label>
        <div className="flex items-center gap-2 w-full">
          <img
            src="images/icons/Lights.svg"
            alt="circle size"
            className="h-5 w-5"
          ></img>
          <input
            type="range"
            min="1"
            max="100"
            value={lightsValue}
            onChange={(e) => setLightsValue(Number(e.target.value))}
            className="w-full"
          />
          <img
            src="images/icons/Lights-End.svg"
            alt="circle size"
            className="h-5 w-5"
          ></img>
        </div>
      </div>
      {/* color */}
      <div className="flex flex-col rounded-lg gap-2">
        <label>Color</label>
        <div className="flex items-center gap-1">
          <img
            src="images/icons/Color.svg"
            alt="color"
            className="h-5 w-5"
          ></img>
          <input
            className="w-full rounded-full border h-5"
            style={{ background: color }}
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </div>

      {/* Background */}
      <div className="flex flex-col rounded-lg gap-2">
        <label>Background</label>
        <div className="flex items-center gap-1">
          <img
            src="images/icons/Color.svg"
            alt="color"
            className="h-5 w-5"
          ></img>
          <input
            className="w-full rounded-full border h-5"
            style={{ background: background }}
            type="color"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
          />
        </div>
      </div>

      <label className="mt-5">width</label>
      <input
        type="number"
        value={canvasWidth}
        onChange={(e) => setCanvasWidth(Number(e.target.value))}
      />

      <label className="mt-5">height</label>
      <input
        type="number"
        value={canvasHeight}
        onChange={(e) => setCanvasHeight(Number(e.target.value))}
      />
    </div>
  );
};

export default Gui;
