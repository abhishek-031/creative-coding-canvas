const canvasSketch = require('canvas-sketch');
const colorPalettes = require('nice-color-palettes')
const random = require("canvas-sketch-util/random")

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  const COUNT = 40;
  const MARGIN = 200;

  function drawCircle(ctx, x, y, radius, fillColor, rotation) {
    // ctx.beginPath();
    // ctx.fillStyle=fillColor;
    // ctx.arc(x,y,radius,0,Math.PI*2);
    // ctx.fill();
    // ctx.closePath();

    ctx.fillStyle = fillColor;
    ctx.font= `${radius*2}px "Helvetica"`
    ctx.save();
    ctx.translate(x,y)
    ctx.rotate(rotation)
    ctx.fillText("!",0,0)
    ctx.restore();
  }

  return ({ context, width, height }) => {
    const palette = colorPalettes[Math.floor(Math.random()*50)];
    let w = width-2*MARGIN, h = height-2*MARGIN;
    context.fillStyle = 'white';
    let circles = [];
    for(let i=0;i<COUNT;i++) {
      for(let j=0;j<COUNT;j++) {
        let u = i/(COUNT-1);
        let v = j/(COUNT-1);
        circles.push({
          x: Math.floor(i/(COUNT-1)*w)+MARGIN,
          y: Math.floor(j/(COUNT-1)*h)+MARGIN,
          fillColor: palette[Math.floor(Math.random()*5)],
          radius: Math.abs(random.noise2D(u,v)*width*0.05),
          rotation: random.noise2D(u,v)
        });
      }
    }
    context.fillRect(0, 0, width, height);
    // circles = circles.filter(circle => random.value()>0.1)
    circles.forEach(({x, y, radius, fillColor, rotation}) => {
      drawCircle(context,x,y,radius,fillColor, rotation)
    })
  };
};

canvasSketch(sketch, settings);
