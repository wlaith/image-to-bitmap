import React, { useRef, useEffect, useState, useCallback } from "react";
import Sketch from "react-p5";
import p5Types from "p5";

interface ImageSketchProps {
  pixelSize: number;
  lightsValue: number;
  color: string;
  background: string;
  canvasWidth: number;
  canvasHeight: number;
  image: string | null;
  onDownload: (callback: () => Promise<void>) => void;
}

const ImageSketch: React.FC<ImageSketchProps> = ({
  pixelSize,
  lightsValue,
  color,
  background,
  canvasWidth,
  canvasHeight,
  image,
  onDownload,
}) => {
  const imgRef = useRef<p5Types.Image | null>(null);
  const offsetX = useRef<number>(0);
  const offsetY = useRef<number>(0);
  const p5Ref = useRef<p5Types | null>(null);
  const canvasRef = useRef<p5Types.Renderer | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

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
    canvasRef.current = p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.noSmooth();
    p5Ref.current = p5;
  };

  const draw = (p5: p5Types) => {
    p5.background(background);

    if (imgRef.current && imgRef.current.width > 0) {
      const img = imgRef.current;
      for (let y = 0; y < img.height; y += pixelSize) {
        for (let x = 0; x < img.width; x += pixelSize) {
          const c = img.get(x, y);
          const brightness = p5.brightness(c);
          const fillColor = p5.color(color);

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

  useEffect(() => {
    if (p5Ref.current) {
      p5Ref.current.redraw();
    }
  }, [pixelSize]);

  const downloadHandler = useCallback(async () => {
    if (!p5Ref.current || !canvasRef.current || isDownloading) {
      return;
    }
    
    try {
      setIsDownloading(true);
      const canvas = (canvasRef.current as p5Types.Renderer).elt as HTMLCanvasElement;
      
      // Get canvas data
      const dataUrl = canvas.toDataURL('image/png');
      
      // Create a temporary link element
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      link.download = `pixel-art-${timestamp}.png`;
      link.href = dataUrl;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
      throw error;
    } finally {
      setIsDownloading(false);
    }
  }, [isDownloading, p5Ref, canvasRef]);

  // Register the download handler
  useEffect(() => {
    onDownload(downloadHandler);
  }, [onDownload, downloadHandler]);

  return (
    <div>
      <Sketch key={image} preload={preload} setup={setup} draw={draw} />
    </div>
  );
};

export default ImageSketch;
