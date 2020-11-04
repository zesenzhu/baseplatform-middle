import util from "../../util";

let {
  animate: { requestAnimationFrame, cancelAnimationFrame, colorToRGB },
  math: { Round, Sin, PI },
} = util;

// 初始
function init(canvas, { text, type }) {
  let ctx = "";
  var Green = document.getElementById("green");
  var Blue = document.getElementById("blue");
  var Orange = document.getElementById("orange");
  var Purple = document.getElementById("purple");
  let data = {
    angle: 90,
    angleSpeed: -0.04,
  };
  // 绘画波浪
  // angle:角度
  function drawWave({
    xOffset = -10,
    yOffset = undefined,
    xSpeed = 0.2,
    ySpeed = 0.02,
    angle = 0,
    range = 10,
    color = "#ffffff",
  }) {
    //   let { xOffset, yOffset, xSpeed, angle, range, ySpeed } = params;
    let boxWidth = canvas.width;
    let boxHeight = canvas.height;
    //   console.log(xOffset, angle);
    //   let range = 30; //幅度
    let lineColor = "#1c86d1"; //波浪颜色
    if (yOffset === undefined) {
      yOffset = boxWidth / 2;
    }

    let xPos = xOffset; //x初始
    let yPos = yOffset; //y初始

    let Stack = []; //点数组
    let Points = Round((boxWidth - xPos * 2) / xSpeed);
    ctx.fillStyle = colorToRGB(color, 0.2);
    ctx.lineWidth = 1;
    ctx.beginPath();
    //   ctx.save();

    yPos = yOffset + Sin(angle) * range;
    ctx.moveTo(xPos, yPos);
    //   console.log(Points)
    for (let i = 1; i < Points; i++) {
      xPos += xSpeed;
      angle += ySpeed;
      yPos = yOffset + Sin(angle) * range;
      ctx.lineTo(xPos, yPos);
    }
    ctx.lineTo(xPos, boxWidth);
    ctx.lineTo(xOffset, boxWidth);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
  // 渲染背景
  function drawBG({ color = "#1c86d1" }) {
    let boxWidth = canvas.width;
    let boxHeight = canvas.height;
    //   ctx.save();

    ctx.beginPath();

    ctx.fillStyle = color;
    ctx.arc(boxWidth / 2, boxWidth / 2, boxWidth / 2 - 6, 0, 2 * PI);
    ctx.fill();
    //   ctx.restore();
  }
  // x渲染外圈
  function drawCircle({ color = "#1c86d1" }) {
    let boxWidth = canvas.width;
    let boxHeight = canvas.height;
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = colorToRGB(color, 0.2);
    ctx.arc(boxWidth / 2, boxWidth / 2, boxWidth / 2 - 2.5, 0, 2 * PI);
    ctx.stroke();
    //   ctx.restore();
  }
  // 渲染内圈
  function drawClipCircle({ color = "#1c86d1" }) {
    let boxWidth = canvas.width;
    let boxHeight = canvas.height;
    ctx.save();
    ctx.beginPath();
    ctx.arc(boxWidth / 2, boxWidth / 2, boxWidth / 2 - 5, 0, 2 * PI, false);
    // ctx.rect(0,0,120,140);
    ctx.clip();
    //   ctx.restore();
  }
  // 渲染阴影
  function drawImageShadow({ color = "#1790e5" }) {
    let boxWidth = canvas.width;
    // let imgUrl = ''
    // green: "#1ca222",
    // orange: "#ff7e00",
    // blue: "#1790e5"
    let img = null;

    if (color === "#1ca222") {
      img = Green;
    } else if (color === "#ff7e00") {
      img = Orange;
    } else if (color === "#1790e5") {
      img = Blue;
    } else if (color === "#9179fc") {
      img = Purple;
    } else {
      return;
    }
    ctx.drawImage(img, 0, boxWidth / 2 + 5);
  }
  // 绘画字体
  function drawText({ color = "#1790e5", text = "测试" }) {
    let boxWidth = canvas.width;
    let r = boxWidth / 2;
    if (text === false) {
      return;
    }
    ctx.globalCompositeOperation = "source-over";
    let size = (0.5 * boxWidth) / 2;
    ctx.font = "bold " + size + "px TimesNewRomanPS-BoldMT";
    let txt = text;
    // (nowdata.toFixed(2) * 100).toFixed(0);
    var fonty = r + size / 2;
    var fontx = r - size * 0.8;
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(txt, r, r + 10);
  }
  // 渲染
  function render({ type, text }) {
    let color = "#1790e5";
    switch (type) {
      case "green":
        color = "#1ca222";
        break;
      case "blue":
        color = "#1790e5";
        break;
      case "orange":
        color = "#ff7e00";
        break;
      case "purple":
        color = "#9179fc";
        break;

      default:
        color = "#1790e5";
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBG({ color });
    drawCircle({ color });

    drawClipCircle({ color });
    drawWave({ angle: data.angle });
    drawWave({ angle: data.angle + 85 });
    drawImageShadow({ color });
    drawText({ text });
    data.angle += data.angleSpeed;
    //   console.log(ctx)
  }
  function draw() {
    requestAnimationFrame(draw, canvas);
    render({ type, text });
  }
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    //   console.log(CanvasRef.current, ctx);

    draw();
    drawImageShadow({});
  }
  return cancelAnimationFrame.bind(window, draw, canvas);
}

export default init;
