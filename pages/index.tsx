import dynamic from "next/dynamic";
import { useState } from "react";
import Gui from "../components/Gui";

const Sketch = dynamic(() => import("../components/ImageSketch"), {
  ssr: false,
});

export default function Home() {
  const [pixelSize, setPixelSize] = useState<number>(10);
  const [lightsValue, setLightsValue] = useState<number>(100);
  const [color, setColor] = useState<string>("#000000");
  const [background, setBackground] = useState<string>("#FFFFFF");
  const [canvasWidth, setCanvasWidth] = useState<number>(600);
  const [canvasHeight, setCanvasHeight] = useState<number>(600);

  return (
    <div className="p-20 flex w-full justify-between">
      <div>
        <h1 className="mb-4">Pixelation Effect</h1>
        <Gui
          pixelSize={pixelSize}
          setPixelSize={setPixelSize}
          lightsValue={lightsValue}
          setLightsValue={setLightsValue}
          color={color}
          setColor={setColor}
          background={background}
          setBackground={setBackground}
          canvasWidth={canvasWidth}
          setCanvasWidth={setCanvasWidth}
          canvasHeight={canvasHeight}
          setCanvasHeight={setCanvasHeight}
        />
      </div>

      <div className="flex-grow flex justify-center items-center">
        <Sketch
          lightsValue={lightsValue}
          pixelSize={pixelSize}
          color={color}
          background={background}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
        />
      </div>
    </div>
  );
}
