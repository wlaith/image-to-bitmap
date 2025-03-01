import React, { useState, useRef } from "react";
import Sketch from "react-p5";
import p5Types from "p5";

const pixelSize = 10; // Size of each pixel in the pixelation effect

const ImageSketch: React.FC = () => {
  const [image, setImage] = useState<string | null>(null); // Stores the image URL
  const imgRef = useRef<p5Types.Image | null>(null); // Reference to the p5 image
  const offsetX = useRef<number>(0); // Horizontal offset to center the image
  const offsetY = useRef<number>(0); // Vertical offset to center the image

  // Handle file selection
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imgURL = URL.createObjectURL(file); // Create a temporary URL
      setImage(imgURL);
    }
  };

  const preload = (p5: p5Types) => {
    if (image) {
      imgRef.current = p5.loadImage(image, (img) => {
        console.log("Image loaded into p5.js");
        // Resize the image to fit within the canvas while maintaining aspect ratio
        if (img.width > img.height) {
          img.resize(0, 600); // Resize based on height
        } else {
          img.resize(600, 0); // Resize based on width
        }

        // Calculate offsets to center the image
        offsetX.current = (p5.width - img.width) / 2;
        offsetY.current = (p5.height - img.height) / 2;
      });
    }
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(600, 600).parent(canvasParentRef);
    p5.noSmooth(); // Disable smoothing to achieve the pixelated effect
  };

  const draw = (p5: p5Types) => {
    p5.background(255);

    if (imgRef.current && imgRef.current.width > 0) {
      const img = imgRef.current;
      // Draw the image with pixelation effect
      for (let y = 0; y < img.height; y += pixelSize) {
        for (let x = 0; x < img.width; x += pixelSize) {
          // Get the color of the pixel at (x, y)
          const c = img.get(x, y);

          // Set the fill color to the pixel color
          p5.fill(c);

          // Draw a circle representing the pixel
          p5.noStroke();
          p5.ellipse(
            x + offsetX.current + p5.width / 2, // Apply horizontal offset
            y + offsetY.current + p5.height / 2, // Apply vertical offset
            pixelSize,
            pixelSize
          );
        }
      }

      p5.noLoop(); // Stop drawing after one frame
    } else {
      p5.text("No image selected", p5.width / 2, p5.height / 2);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <Sketch key={image} preload={preload} setup={setup} draw={draw} />
    </div>
  );
};

export default ImageSketch;
