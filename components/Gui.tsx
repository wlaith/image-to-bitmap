/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from "react";

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

  image: string | null;
  setImage: (image: string | null) => void;

  onDownload: () => void;
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
  image,
  setImage,
  onDownload,
}) => {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const guiRef = useRef<HTMLDivElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleDownloadClick = async () => {
    setIsDownloading(true);
    try {
      await onDownload();
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (guiRef.current) {
        const guiRect = guiRef.current.getBoundingClientRect();
        const maxX = window.innerWidth - guiRect.width;
        const maxY = window.innerHeight - guiRect.height;

        setPosition((prev) => ({
          x: Math.min(Math.max(prev.x, 0), maxX),
          y: Math.min(Math.max(prev.y, 0), maxY),
        }));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only start dragging if clicking the handle area
    if (e.currentTarget.classList.contains("drag-handle")) {
      setIsDragging(true);
      dragStartPos.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
      // Prevent text selection while dragging
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && guiRef.current) {
      const guiRect = guiRef.current.getBoundingClientRect();
      const maxX = window.innerWidth - guiRect.width;
      const maxY = window.innerHeight - guiRect.height;

      const newX = e.clientX - dragStartPos.current.x;
      const newY = e.clientY - dragStartPos.current.y;

      setPosition({
        x: Math.min(Math.max(newX, 0), maxX),
        y: Math.min(Math.max(newY, 0), maxY),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global mouse up and move handlers
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && guiRef.current) {
        const guiRect = guiRef.current.getBoundingClientRect();
        const maxX = window.innerWidth - guiRect.width;
        const maxY = window.innerHeight - guiRect.height;

        const newX = e.clientX - dragStartPos.current.x;
        const newY = e.clientY - dragStartPos.current.y;

        setPosition({
          x: Math.min(Math.max(newX, 0), maxX),
          y: Math.min(Math.max(newY, 0), maxY),
        });
      }
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("mousemove", handleGlobalMouseMove);

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [isDragging]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setImage(imgURL);
    }
  };

  return (
    <div
      ref={guiRef}
      style={{
        accentColor: "white",
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "grab",
        minWidth: "300px",
        userSelect: "none",
      }}
      className="flex flex-col gap-5 bg-[#2c2c2cc2] border border-[#444444] p-10 rounded-xl backdrop-blur-sm"
    >
      <div className="flex flex-col gap-2">
        <div
          className="drag-handle flex flex-col gap-6 -mt-4 items-center cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <div className="flex flex-col gap-1">
            <div className="border-t-1 border-[#848484] rounded-full w-10"></div>
            <div className="border-t-1 border-[#848484] rounded-full w-10"></div>
          </div>

          <h1 className="font-bold self-start text-lg select-none">
            Convert JPGs to bitmaps
          </h1>
        </div>

        {/* Upload Image */}
        <div className="flex flex-col gap-2">
          <label>Upload Image</label>
          <input
            className="border p-2 rounded-full cursor-pointer bg-white/10 hover:bg-white/20 transition-colors"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {/* pixel size */}
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
            max="50"
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

      {/* Download Button */}
      <div className="flex flex-col gap-2 mt-4">
        <button
          onClick={handleDownloadClick}
          disabled={isDownloading || !image}
          className={`flex items-center justify-center gap-2 border p-2 rounded-full cursor-pointer transition-colors ${
            isDownloading || !image
              ? "opacity-50 cursor-not-allowed"
              : "bg-white/10 hover:bg-white/20"
          }`}
        >
          <span>{isDownloading ? "Downloading..." : "Download Image"}</span>
        </button>
      </div>
    </div>
  );
};

export default Gui;
