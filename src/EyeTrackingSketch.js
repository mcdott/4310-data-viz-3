import React, { useEffect, useRef } from "react";
import p5 from "p5";

const Sketch = () => {
  const myP5 = useRef();
  const myContainer = useRef();

  useEffect(() => {
    myP5.current = new p5(sketch, myContainer.current);
    return () => myP5.current.remove();
  }, []);

  const sketch = (p) => {
    let sizes = [10, 20, 30, 40, 50];
    let speeds = [1, 2, 3, 4, 5];
    let combinations = [];

    let ball = {
      x: 100,
      y: 100,
      xSpeed: 2,
      ySpeed: 3,
      size: 24,
    };

    p.setup = () => {
      p.createCanvas(400, 400);

      // Create all possible combinations of size and speed
      for (let i = 0; i < sizes.length; i++) {
        for (let j = 0; j < speeds.length; j++) {
          combinations.push({ size: sizes[i], speed: speeds[j] });
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

      // Every 5 seconds
      if (p.frameCount % (5 * 60) === 0) {
        let combination = combinations.shift(); // Get the next combination
        ball.size = combination.size;
        ball.xSpeed = combination.speed;
        ball.ySpeed = combination.speed;
      }

      p.background(220);

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
      p.fill(150, 0, 255);
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

  return <div ref={myContainer}></div>;
};

export default Sketch;
