import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import Gui from "../components/Gui";
import Header from "@/components/Header";

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
  const [image, setImage] = useState<string | null>(null);
  const [downloadFn, setDownloadFn] = useState<(() => Promise<void>) | null>(null);

  const handleDownloadCallback = useCallback((callback: () => Promise<void>) => {
    setDownloadFn(() => callback);
  }, []);

  const onDownload = useCallback(async () => {
    if (downloadFn) {
      await downloadFn();
    }
  }, [downloadFn]);

  return (
    <div>
      <Header />

      <div
        className="px-20 mt-5 flex gap-20 w-full justify-between"
        style={{ background: background }}
      >
        <div className="flex w-full justify-center">
          <Sketch
            lightsValue={lightsValue}
            pixelSize={pixelSize}
            color={color}
            background={background}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            image={image}
            onDownload={handleDownloadCallback}
          />
        </div>
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
          image={image}
          setImage={setImage}
          onDownload={onDownload}
        />
      </div>
    </div>
  );
}
