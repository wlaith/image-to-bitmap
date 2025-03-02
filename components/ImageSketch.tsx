import React, { useState, useRef, useEffect } from "react";
import Sketch from "react-p5";
import p5Types from "p5";

interface ImageSketchProps {
  pixelSize: number;
  lightsValue: number;
  color: string;
  background: string;
  canvasWidth: number;
  canvasHeight: number;
}

const ImageSketch: React.FC<ImageSketchProps> = ({
  pixelSize,
  lightsValue,
  color,
  background,
  canvasWidth,
  canvasHeight,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const imgRef = useRef<p5Types.Image | null>(null);
  const offsetX = useRef<number>(0);
  const offsetY = useRef<number>(0);
  const p5Ref = useRef<p5Types | null>(null); // Reference to the p5 instance

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setImage(imgURL);
    }
  };

  const preload = (p5: p5Types) => {
    if (image) {
      imgRef.current = p5.loadImage(image, (img) => {
        console.log("Image loaded into p5.js");
        if (img.width > img.height) {
          img.resize(canvasWidth, 0);
        } else {
          img.resize(0, canvasHeight);
        }
        offsetX.current = (p5.width - img.width) / 2;
        offsetY.current = (p5.height - img.height) / 2;
      });
    }
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    if (window.innerWidth < 650) {
      p5.createCanvas(window.innerWidth - 50, window.innerWidth - 50).parent(
        canvasParentRef
      );
    } else {
      p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    }
    p5.noSmooth();
    p5Ref.current = p5; // Store the p5 instance
  };

  const draw = (p5: p5Types) => {
    p5.background(background);

    if (imgRef.current && imgRef.current.width > 0) {
      const img = imgRef.current;
      for (let y = 0; y < img.height; y += pixelSize) {
        for (let x = 0; x < img.width; x += pixelSize) {
          const c = img.get(x, y);
          const brightness = p5.brightness(c);
          const fillColor = p5.color(color); // Convert the color string to a p5 color object

          p5.fill(fillColor);
          const circleSize = p5.map(
            brightness,
            lightsValue,
            0,
            pixelSize / 2,
            pixelSize * 2
          );
          p5.noStroke();
          p5.ellipse(
            x + offsetX.current + p5.width / 2,
            y + offsetY.current + p5.height / 2,
            circleSize,
            circleSize
          );
        }
      }
    } else {
      p5.text("No image selected", p5.width / 2, p5.height / 2);
    }
  };

  // Use useEffect to trigger re-renders when pixelSize, canvasHeight, or canvasWidth change
  useEffect(() => {
    if (p5Ref.current) {
      p5Ref.current.redraw(); // Force the draw function to re-render
    }
  }, [pixelSize]);

  return (
    <div className="max-sm:self-center max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-2">
      <input
        className="border p-2 mb-2 rounded-full cursor-pointer"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <Sketch key={image} preload={preload} setup={setup} draw={draw} />
    </div>
  );
};

export default ImageSketch;
