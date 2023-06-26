import React, { useEffect, useState } from "react";
import Sketch from "react-p5";

const SketchComponent = () => {
  const [x, setX] = useState(0);
  const [color, setColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  const colors = ["red", "yellow", "white", "black", "gray"];
  const backgrounds = ["black", "black", "black", "white", "white"];

  useEffect(() => {
    const index = Math.floor(Math.random() * colors.length);
    setColor(colors[index]);
    setBackgroundColor(backgrounds[index]);
  }, []);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(backgroundColor);
    p5.noStroke();
    p5.fill(color);
    p5.ellipse(x, p5.height / 2, 50, 50);

    setX((x) => {
      if (x > p5.width + 25) {
        const index = Math.floor(Math.random() * colors.length);
        setColor(colors[index]);
        setBackgroundColor(backgrounds[index]);
        return -25;
      } else {
        return x + 2;
      }
    });
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SketchComponent;
