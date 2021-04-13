const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

const directions = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
};

class Bullet {
  constructor({ x, y, r, xSpeed, ySpeed, lifetime = 1e4 }) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.lifetime = lifetime;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
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
      yTopLeft - this.size / 2,
      this.size / 3,
      this.size / 2
    );

    this.x = normalX;
    this.y = normalY;
    ctx.fillStyle = normalFillStyle;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.closePath();
  }
}

window.onkeydown = (e) => {
  const direction = directions[e.keyCode];

  if (direction === undefined) {
    return;
  }
  if (direction === 'left') {
    tank.deg += Math.PI / 12;
  }
  if (direction === 'right') {
    tank.deg -= Math.PI / 12;
  }
  if (direction === 'up') {
    tank.y += Math.sin(tank.deg) * 15;
    tank.x -= Math.cos(tank.deg) * 15;
  }
  if (direction === 'down') {
    tank.x += Math.cos(tank.deg) * 15;
    tank.y -= Math.sin(tank.deg) * 15;
  }
};

const bullet = new Bullet({ x: 500, y: 500, r: 50, xSpeed: 2, ySpeed: 3 });

const tank = new Tank({
  x: width / 2,
  y: height / 2,
  deg: Math.PI / 3,
  size: 50,
  color: '#8ab840',
});

setInterval(() => {
  ctx.clearRect(0, 0, width, height);
  bullet.draw();
  tank.draw();
  bullet.move();
}, 1);
