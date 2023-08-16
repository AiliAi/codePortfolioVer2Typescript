import React, {useRef, useEffect} from 'react';
import P5 from 'p5';
import './canvas.scss';

const Canvas = () => {
  const processingRef = useRef();

  const Sketch = (p) => {
    const particles = [];
    let pariclesCount;
    const bgColor = '#5C53DB';
    const dotColor = '#53C4DB';
    const lineColor = '#689DF2';
    const newDistance = 300;
    let x;
    let y;

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      if (p.windowWidth < 700) {
        pariclesCount = 30;
      } else {
        pariclesCount = 150;
      }
      p.frameRate(30);
      for (let i = 0; i < pariclesCount; i++) {
        x = p.random(0, p.width);
        y = p.random(0, p.height);
        particles.push(new Particle(p, x, y));
      }
    };

    p.draw = () => {
      p.background(bgColor);

      for (let i = 0; i < particles.length; i++) {
        particles[i].createParticle();
        particles[i].moveParticle();
        particles[i].joinParticles(particles.slice(i));
      }

      if (particles.length > pariclesCount) {
        particles.splice(0, 1); // erases the first dot from array when a new dot is added
      }

      particles.push(
        new Particle(
          p,
          p.random(p.mouseX - newDistance, p.mouseX + newDistance),
          p.random(p.mouseY - newDistance, p.mouseY + newDistance)
        )
      );
    };

    p.windowResized = () => {
      if (p) {
        p.background(bgColor);
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      }
    };

    class Particle {
      constructor(p, x, y) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.r = p.random(3, 10);
        this.xSpeed = p.random(-0.5, 0.5);
        this.ySpeed = p.random(-0.5, 0.5);
      }

      createParticle() {
        this.p.noStroke();
        this.p.fill(dotColor);
        this.p.circle(this.x, this.y, this.r);
      }

      moveParticle() {
        if (this.x < 0 || this.x > this.p.width) this.xSpeed *= -0.5;
        if (this.y < 0 || this.y > this.p.height) this.ySpeed *= -0.5;
        this.x += this.xSpeed;
        this.y += this.ySpeed;
      }

      joinParticles(particles) {
        particles.forEach((element) => {
          const dis = this.p.dist(this.x, this.y, element.x, element.y);
          if (dis < 85) {
            this.p.stroke(lineColor);
            this.p.line(this.x, this.y, element.x, element.y);
          }
        });
      }
    }
  };

  useEffect(() => {
    new P5(Sketch, processingRef.current);
  }, []);

  return <div className="canvas-content" ref={processingRef} />;
};

export default Canvas;
