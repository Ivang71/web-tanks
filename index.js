const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

const directions = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  space: 32,
};

function modifyRgbColor(colors) {
  //accepts array of rgb colors
  const epsilon = 5;
  return colors.map((color) => {
    do {
      color += Math.round(Math.random() * 2 * epsilon - epsilon);
    } while (color <= 0 || color >= 255);
    return color;
  });
}

const rgbToHex = (colors) =>
  '#' +
  colors
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');

function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

class Bullet {
  constructor({
    x,
    y,
    r,
    xSpeed,
    ySpeed,
    lifetime = 1e4,
    color = [128, 128, 128],
  }) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.lifetime = lifetime;
    this.color = color;
  }

  draw() {
    this.color = modifyRgbColor(this.color);
    const normalFillStyle = ctx.fillStyle;
    ctx.fillStyle = rgbToHex(this.color);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = normalFillStyle;
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x + this.r > width || this.x - this.r < 0) {
      this.xSpeed = -this.xSpeed;
    }
    if (this.y - this.r < 0 || this.y + this.r > height) {
      this.ySpeed = -this.ySpeed;
    }
  }
}

class Tank {
  constructor({ x, y, size, color = '#000', deg = 0 }) {
    // x, y - coordinates of center
    this.x = x;
    this.y = y;
    this.size = size;
    // degree of tank rotation in radians
    this.deg = deg;
    this.color = color;
    this.keysInfo = {};
  }

  draw() {
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.deg - Math.PI / 2);

    const normalX = this.x;
    const normalY = this.y;
    const normalFillStyle = ctx.fillStyle;

    this.x = 0;
    this.y = 0;
    const xTopLeft = this.x - this.size / 2;
    const yTopLeft = this.y - this.size / 2;
    ctx.fillStyle = this.color;

    ctx.fillRect(xTopLeft, yTopLeft, this.size, this.size);
    ctx.fillRect(
      xTopLeft + this.size / 3,
      yTopLeft - this.size / 2 + 1, //add 1 to draw barell correctly
      this.size / 3,
      this.size / 2
    );

    this.x = normalX;
    this.y = normalY;
    ctx.fillStyle = normalFillStyle;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.closePath();
  }

  move() {
    const speedCoeff = 7;
    const ySpeed = Math.sin(tank.deg) * speedCoeff;
    const xSpeed = Math.cos(tank.deg) * speedCoeff;

    if (this.x + this.size / 2 > width) {
      this.x -= xSpeed * 2;
    }
    if (this.x - this.size / 2 < 0) {
      this.x += xSpeed * 2;
    }
    if (this.y - this.size / 2 < 0) {
      this.y += ySpeed * 2;
    }
    if (this.y + this.size / 2 > height) {
      this.y -= ySpeed * 2;
    }

    if (this.keysInfo[directions.left]) {
      tank.deg += Math.PI / (speedCoeff * 4);
    }
    if (this.keysInfo[directions.right]) {
      tank.deg -= Math.PI / (speedCoeff * 4);
    }
    if (this.keysInfo[directions.up]) {
      tank.y += ySpeed;
      tank.x -= xSpeed;
    }
    if (this.keysInfo[directions.down]) {
      tank.x += xSpeed;
      tank.y -= ySpeed;
    }
  }

  fire() { //FIXME
    const bullet = new Bullet({
      x: this.x,
      y: this.y + this.size - this.size / 6,
      r: this.size / 6,
      ySpeed: Math.sin(-this.deg - Math.PI) * 10,
      xSpeed: Math.cos(-this.deg - Math.Pi) * 10,
    });
    bullets.push(bullet);
  }
}

window.onkeydown = (e) => {
  tank.keysInfo[e.keyCode] = true;
  if (e.keyCode === directions.space) {
    tank.fire();
  }
};

window.onkeyup = (e) => {
  delete tank.keysInfo[e.keyCode];
};

const tank = new Tank({
  x: width / 2,
  y: height / 2,
  size: 70,
  color: '#5275e6',
});

const bullets = [];

setInterval(() => {
  ctx.clearRect(0, 0, width, height);
  for (const bullet of bullets) {
    bullet.draw();
    bullet.move();
  }
  tank.draw();
  tank.move();
}, 1000 / 60);
