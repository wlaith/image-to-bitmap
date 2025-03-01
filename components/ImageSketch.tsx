import Sketch from "react-p5";
import React from "react";
import p5Types from "p5";

let img: p5Types.Image;
const pixelSize = 10; // Size of each pixel in the pixelation effect
let c;
let offsetX: number;
let offsetY: number;

const preload = (p5: p5Types) => {
  img = p5.loadImage("/images/image.png");
};

const setup = (p5: p5Types, canvasParentRef: Element) => {
  p5.createCanvas(600, 600);
  p5.noSmooth(); // Disable smoothing to achieve the pixelated effect
  img.resize(0, 600); // Resize the image to fit the canvas
  offsetX = (p5.width - img.width) / 2;
  offsetY = (p5.height - img.height) / 2;
};

const draw = (p5: p5Types) => {
  p5.background(255);

  // Draw the image with pixelation effect
  for (let y = 0; y < img.height; y += pixelSize) {
    for (let x = 0; x < img.width; x += pixelSize) {
      // Get the color of the pixel at (x, y)
      c = img.get(x, y);

      // Set the fill color to the pixel color
      p5.fill(c);

      // Draw a rectangle representing the pixel
      p5.noStroke();
      // p5.rect(x, y, pixelSize, pixelSize);
      p5.ellipse(x + offsetX, y + offsetY, pixelSize, pixelSize);
    }
  }

  p5.noLoop(); // Stop drawing after one frame
};

const ImageSketch: React.FC = () => {
  return <Sketch preload={preload} setup={setup} draw={draw} />;
};

export default ImageSketch;
