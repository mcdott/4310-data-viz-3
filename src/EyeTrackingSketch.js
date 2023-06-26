import React, { useRef } from "react";
import Sketch from "react-p5";
import audioFile from "./birds.mp3";

const SketchComponent = () => {
  const colors = ["red", "yellow", "white", "black", "gray"];
  const backgrounds = ["black", "black", "black", "white", "white"];
  const audio = useRef(new Audio(audioFile));

  const index = Math.floor(Math.random() * colors.length);
  const ball = useRef({
    pos: { x: 0, y: 0 },
    color: colors[index],
    backgroundColor: backgrounds[index],
  });

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    ball.current.pos.y = p5.height / 2;
  };

  const draw = (p5) => {
    p5.background(ball.current.backgroundColor);
    p5.noStroke();
    p5.fill(ball.current.color);
    p5.ellipse(ball.current.pos.x, ball.current.pos.y, 50, 50);

    if (ball.current.pos.x > p5.width + 25) {
      const index = Math.floor(Math.random() * colors.length);
      ball.current.color = colors[index];
      ball.current.backgroundColor = backgrounds[index];
      ball.current.pos.x = -25;
    } else {
      ball.current.pos.x += 2;
    }
  };

  const mouseMoved = (p5) => {
    // Check if the mouse is over the ball
    if (
      p5.dist(p5.mouseX, p5.mouseY, ball.current.pos.x, ball.current.pos.y) < 25
    ) {
      if (audio.current.paused) {
        audio.current.play(); // Play the sound only if it's not already playing
      }
    } else {
      if (!audio.current.paused) {
        audio.current.pause(); // Pause the sound only if it's playing
        audio.current.currentTime = 0; // Reset the audio playback
      }
    }
  };

  return <Sketch setup={setup} draw={draw} mouseMoved={mouseMoved} />;
};

export default SketchComponent;
