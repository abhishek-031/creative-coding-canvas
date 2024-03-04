const canvasSketch = require('canvas-sketch');
const colorPalettes = require('nice-color-palettes')

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  const COUNT = 50;
  const MARGIN = 200;

  function drawCircle(ctx, x, y, radius, fillColor) {
    ctx.beginPath();
    ctx.fillStyle=fillColor;
    ctx.arc(x,y,radius,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();
  }

  return ({ context, width, height }) => {
    const palette = colorPalettes[Math.floor(Math.random()*50)];
    let w = width-2*MARGIN, h = height-2*MARGIN;
    context.fillStyle = 'white';
    let circles = [];
    for(let i=0;i<COUNT;i++) {
      for(let j=0;j<COUNT;j++) {
        circles.push({
          x: Math.floor(i/(COUNT-1)*w)+MARGIN,
          y: Math.floor(j/(COUNT-1)*h)+MARGIN,
          fillColor: palette[Math.floor(Math.random()*5)],
          radius: Math.random()*width*0.01
        });
      }
    }
    context.fillRect(0, 0, width, height);
    circles = circles.filter(circle => Math.random()<0.5)
    circles.forEach(({x, y, radius, fillColor}) => {
      drawCircle(context,x,y,radius,fillColor)
    })
  };
};

canvasSketch(sketch, settings);
