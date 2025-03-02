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
    <div>
      <p>circle size</p>
      <input
        type="range"
        min="1"
        max="100"
        value={pixelSize}
        onChange={(e) => setPixelSize(Number(e.target.value))}
      />
      <p className="mt-5">lights</p>
      <input
        type="range"
        min="1"
        max="100"
        value={lightsValue}
        onChange={(e) => setLightsValue(Number(e.target.value))}
      />
      <p className="mt-5">color</p>
      <input
        type="color"
        value="#000000"
        onChange={(e) => setColor(e.target.value)}
      />
      <p>{color}</p>

      <p className="mt-5">background</p>
      <input
        type="color"
        value="#FFFFFF"
        onChange={(e) => setBackground(e.target.value)}
      />
      <p>{background}</p>

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
