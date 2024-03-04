const canvasSketch = require('canvas-sketch');
const colorPalettes = require('nice-color-palettes')
const random = require("canvas-sketch-util/random")

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  const COUNT = 6;
  const MARGIN = 200;

  function drawTrapezoid(ctx, x1, y1,x2,y2, fillColor, bottom) {
    ctx.beginPath();
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 40;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x2,bottom);
    ctx.lineTo(x1,bottom);
    ctx.lineTo(x1,y1)
    ctx.closePath();
    ctx.fill()
    ctx.stroke()
  }

  return ({ context, width, height }) => {
    const palette = colorPalettes[Math.floor(Math.random()*50)];
    let w = width-2*MARGIN, h = height-2*MARGIN;
    context.fillStyle = 'white';
    let trapezoids = [], points = [];
    for(let i=0;i<COUNT;i++) {
      for(let j=0;j<COUNT;j++) {
        points.push({
          x: Math.floor(i/(COUNT-1)*w)+MARGIN,
          y: Math.floor(j/(COUNT-1)*h)+MARGIN,
        });
      }
    }

    points = random.shuffle(points);
    for(let i=0;i<points.length-1;i+=2) {
      trapezoids.push({
        x1: points[i].x,
        y1: points[i].y,
        x2: points[i+1].x,
        y2: points[i+1].y,
        fillColor: palette[Math.floor(Math.random()*5)]
      })
    }
    trapezoids.sort((t1,t2)=> {
      return (t1.y1+t1.y2)/2 - (t2.y1 + t2.y2)/2
    })
    context.fillRect(0, 0, width, height);
    // circles = circles.filter(circle => random.value()>0.1)
    trapezoids.forEach(({x1, y1,x2, y2, fillColor}) => {
      drawTrapezoid(context,x1, y1,x2, y2, fillColor, height-MARGIN)
    })
  };
};

canvasSketch(sketch, settings);
