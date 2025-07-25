const ball = document.getElementById("ball");
const canvas = document.getElementById("aimCanvas");
const ctx = canvas.getContext("2d");
const powerIndicator = document.getElementById("powerIndicator");

canvas.width = 600;
canvas.height = 400;

let isDragging = false;
let startX = 0;
let startY = 0;
let power = 0;
let angle = 0;

ball.addEventListener("mousedown", (e) => {
  isDragging = true;
  const rect = ball.getBoundingClientRect();
  startX = rect.left + 10 - canvas.getBoundingClientRect().left;
  startY = rect.top + 10 - canvas.getBoundingClientRect().top;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const mouseX = e.clientX - canvas.getBoundingClientRect().left;
  const mouseY = e.clientY - canvas.getBoundingClientRect().top;

  const dx = startX - mouseX;
  const dy = startY - mouseY;

  power = Math.min(Math.sqrt(dx * dx + dy * dy), 100);
  angle = Math.atan2(dy, dx);

  // Draw aim line
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(mouseX, mouseY);
  ctx.strokeStyle = "#368FCF";
  ctx.lineWidth = 4;
  ctx.stroke();

  powerIndicator.innerText = "Power: " + Math.round(power) + "%";
});

document.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  shootBall();
});

function shootBall() {
  const ballRect = ball.getBoundingClientRect();
  const mazeRect = canvas.getBoundingClientRect();

  const ballX = ball.offsetLeft;
  const ballY = ball.offsetTop;

  const speed = power * 0.5;
  const dx = Math.cos(angle) * speed;
  const dy = Math.sin(angle) * speed;

  // Animate ball movement
  let steps = 0;
  const interval = setInterval(() => {
    if (steps > 20) return clearInterval(interval);

    const nextX = ball.offsetLeft + dx / 20;
    const nextY = ball.offsetTop + dy / 20;

    ball.style.left = `${nextX}px`;
    ball.style.top = `${nextY}px`;

    steps++;
  }, 16);
}
