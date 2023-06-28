import React, { useState, useEffect, useRef } from "react";
import p5 from "p5";

const Sketch = ({ width = 400, height = 400 }) => {
  const myP5 = useRef();
  const myContainer = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    myP5.current = new p5(sketch, myContainer.current);
    return () => myP5.current.remove();
  }, []);

  const sketch = (p) => {
    let sizes = [20, 40, 60, 80, 100];
    let speeds = [1, 2, 3, 4, 5];
    let colors = [
      { fill: [255, 0, 0], bg: [0, 0, 0] }, // red
      { fill: [255, 255, 0], bg: [0, 0, 0] }, // yellow
      { fill: [255, 255, 255], bg: [0, 0, 0] }, // white
      { fill: [0, 0, 0], bg: [255, 255, 255] }, // black
      { fill: [128, 128, 128], bg: [255, 255, 255] }, // grey
    ];
    let combinations = [];
    let combinationCounter = 0;

    let ball = {
      x: 100,
      y: 100,
      xSpeed: 2,
      ySpeed: 3,
      size: 24,
      color: colors[0],
    };

    p.setup = () => {
      p.createCanvas(width, height);

      // Create all possible combinations of size, speed and color
      for (let i = 0; i < sizes.length; i++) {
        for (let j = 0; j < speeds.length; j++) {
          for (let k = 0; k < colors.length; k++) {
            combinations.push({
              size: sizes[i],
              speed: speeds[j],
              color: colors[k],
            });
          }
        }
      }

      // Shuffle combinations
      combinations = shuffle(combinations);
    };

    p.draw = () => {
      if (combinations.length === 0) {
        p.noLoop(); // Stop the animation
        return;
      }

      // Check if the mouse is within the ball
      const d = p.dist(p.mouseX, p.mouseY, ball.x, ball.y);
      if (d < ball.size / 2) {
        combinationCounter++;
      }

      // Every 5 seconds
      if (p.frameCount % (5 * 60) === 0) {
        if (combinationCounter > 0) {
          // save the previous combination data
          const percentage = Math.round((combinationCounter / (5 * 60)) * 100);
          const { size, speed, color } = ball; // get the properties from the ball
          setData((prevData) => [
            ...prevData,
            { size, color, speed, percentage },
          ]);
        }
        let combination = combinations.shift(); // Get the next combination
        ball.size = combination.size;
        ball.xSpeed = combination.speed;
        ball.ySpeed = combination.speed;
        ball.color = combination.color;

        // reset the counter
        combinationCounter = 0;
      }

      p.background(ball.color.bg);

      // Move the ball
      ball.x += ball.xSpeed;
      ball.y += ball.ySpeed;

      // Check for bounce
      if (ball.x > p.width - ball.size / 2 || ball.x < ball.size / 2) {
        ball.xSpeed = ball.xSpeed * -1;
      }

      if (ball.y > p.height - ball.size / 2 || ball.y < ball.size / 2) {
        ball.ySpeed = ball.ySpeed * -1;
      }

      // Draw the ball
      p.fill(ball.color.fill);
      p.ellipse(ball.x, ball.y, ball.size, ball.size);
    };

    // Function to shuffle an array
    function shuffle(array) {
      let currentIndex = array.length,
        temporaryValue,
        randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
  };

  console.log(data);

  return <div ref={myContainer}></div>;
};

export default Sketch;
