import React, { Component } from "react";
import Public from "../../public";
import "../../../scss/Animation/ReactCanvas/WaveRound.scss";
import blue from '../../../images/Animation/ReactCanvas/shadow-blue.png'
import green from '../../../images/Animation/ReactCanvas/shadow-green.png'
import orange from '../../../images/Animation/ReactCanvas/shadow-orange.png'
// const { requestNextAnimationFrame } = Public;
window.requestAnimaFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 30);
  };
class WaveRound extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.state = {
      start: false,
      canvas: "",
      ctx: "",
      width: props.width ? props.width : 120 /* 宽度 */,
      height: props.height ? props.height : 130 /* 高度 */,

      colors: props.colors
        ? props.colors
        : ["#367aec", "#6ca0f6"] /* 颜色:[液体，影子] */,
      shandow: props.shandow ? props.shandow : true,

      requestAnimaFrame: "",
      background: props.background ? props.background : "#1ca222", //背景
      number: props.num,
      speed: props.speed ? props.speed : 0.33,
      // ||props.num===0?props.num:false
    };
  }
  componentWillMount() {
    if (this.state.shandow) {
      // a = colors[0];
      // colors[0]= colors[1];
      // colors[1] = a;
      this.state.colors.reverse();
    }
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.num, nextProps.background);
    let canvas = this.state.canvas;
    let ctx = this.state.ctx;

    if (canvas.getContext) {
      //  canvas.width = width;
      //  canvas.height = height;
      ctx = canvas.getContext("2d");

      if (nextProps.num !== this.props.num) {
        // console.log(nextProps.num);
        this.draw(ctx, canvas, nextProps.num);
      }
    }
  }
  componentDidMount() {
    const canvas = this.canvas.current;
    let ctx = "";
    if (canvas.getContext) {
      //  canvas.width = width;
      //  canvas.height = height;
      ctx = canvas.getContext("2d");

      this.draw(ctx, canvas);
    }
    this.setState({
      canvas: canvas,
      ctx: ctx,
    });
  }

  draw = (ctx, canvas, num = this.state.number) => {
    // canvas = document.getElementById("canvas");
    // ctx = canvas.getContext("2d");
    var Green=document.getElementById("green");
    var Blue=document.getElementById("blue");
    var Orange=document.getElementById("orange");
    let speed = this.state.speed;
    let initSpeed = 0;

    let bi = this.state.width / 250;
    let oRange = num;
    let that = this;
    // oRange2 = document.getElementsByName("range2")[0];
    let M = Math;
    let Sin = M.sin;
    let Cos = M.cos;
    let Sqrt = M.sqrt;
    let Pow = M.pow;
    let PI = M.PI;
    let Round = M.round;
    let oW = (canvas.width = this.state.width);
    let oH = (canvas.height = this.state.height);
    // 线宽
    let lineWidth = 1;
    // 大半径
    let r = oW / 2;
    let cR = r - 6 * lineWidth;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    // 水波动画初始参数
    let axisLength = 2 * r - 8 * lineWidth; // Sin 图形长度
    let unit = axisLength / 9; // 每轮波浪宽
    let range = 0.8; // 浪幅 可调整高度
    let nowrange = range;
    let xoff = 8 * bi;
    let xoffset = 8 * lineWidth; // x 轴偏移量
    let xoffset2 = 8 * lineWidth + 2 * unit; // x 轴偏移量，相对xoffset偏移一个波浪
    let data = oRange; // 数据量
    let sp = 0; // 周期偏移量
    let nowdata = 0.5;
    let waveupsp = 0.006; // 水波上涨速度
    // 圆动画初始参数
    let arcStack = []; // 圆栈
    let bR = r - 8 * lineWidth;
    let soffset = -(PI / 2); // 圆动画起始位置
    let circleLock = true; // 起始动画锁
    // 获取圆动画轨迹点集
    for (var i = soffset; i < soffset + 2 * PI; i += 1 / (8 * PI)) {
      arcStack.push([r + bR * Cos(i), r + bR * Sin(i)]);
    }
    // 圆起始点
    let cStartPoint = arcStack.shift();
    ctx.strokeStyle = "#1c86d1";
    ctx.moveTo(cStartPoint[0], cStartPoint[1]);
    // 开始渲染
    render();
    var color = colorRgba("#1c86d1", 0.2);
    var color1 = colorRgba("#f6b71e", 0.2);

    function drawSine() {
      ctx.beginPath();
      ctx.save();
      var Stack = []; // 记录起始点和终点坐标
      for (var i = xoffset; i <= xoffset + axisLength; i += 20 / axisLength) {
        var x = sp + (xoffset + i) / unit; //1,2波浪不同的因数
        var y = Sin(x) * nowrange;
        var dx = i;
        var dy = 2 * cR * (1 - nowdata) + (r - cR) - unit * y;
        ctx.lineTo(dx, dy);
        Stack.push([dx, dy]);
      }
      // 获取初始点和结束点
      var startP = Stack[0];
      var endP = Stack[Stack.length - 1];
      ctx.lineTo(xoffset + axisLength, oW);
      ctx.lineTo(xoffset, oW);
      ctx.lineTo(startP[0], startP[1]);
      ctx.fillStyle = colorRgba("#fff", 0.2);
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.save();
      var Stack2 = []; // 记录起始点和终点坐标
      // xoffset = xoffset
      for (
        var i = -xoffset2;
        i <= xoffset2 + axisLength + xoffset2;
        i += 20 / axisLength
      ) {
        var x = sp + (-xoffset2 + i) / unit; //1,2波浪不同的因数
        var y = Sin(x) * nowrange;
        var dx = i;
        var dy = 2 * cR * (1 - nowdata) + (r - cR) - unit * y;
        ctx.lineTo(dx, dy);
        Stack2.push([dx, dy]);
      }
      // 获取初始点和结束点
      var startP2 = Stack2[0];
      var endP = Stack2[Stack2.length - 1];
      ctx.lineTo(-xoffset2 + axisLength, 0.9 * oW);
      ctx.lineTo(-xoffset2, 0.9 * oW);
      ctx.lineTo(startP2[0], startP2[1]);
      ctx.fillStyle = colorRgba("#fff", 0.2);
      ctx.fill();
      ctx.restore();
      
    }
    // 绘画字体
    function drawText() {
      if (oRange === false) {
        return;
      }
      ctx.globalCompositeOperation = "source-over";
      var size = 0.5 * cR;
      ctx.font = "bold " + size + "px Microsoft Yahei";
      let txt = oRange;
      // (nowdata.toFixed(2) * 100).toFixed(0);
      var fonty = r + size / 2;
      var fontx = r - size * 0.8;
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText(txt, r, r + 10);
    }
    //最外面
    function drawCircle() {
      ctx.beginPath();
      ctx.lineWidth = 10;
      ctx.strokeStyle = colorRgba(that.state.background, 0.2);
      ctx.arc(r, r, cR - 5, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.restore();
    }

    //背景
    function ColorBackground() {
      ctx.beginPath();
      ctx.fillStyle = that.state.background;

      ctx.arc(r, r, cR - 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.save();
    }
    //裁剪中间水圈
    function clipCircle() {
      ctx.save()
      ctx.beginPath();
      ctx.arc(r, r, cR - 5, 0, 2 * Math.PI, false);
      // ctx.rect(0,0,120,140);
      ctx.clip();
      ctx.restore()

    }
    // 绘画渐变--废弃
    function drawRadialGradient() {
      ctx.beginPath();
      ctx.save()

      // ctx.restore()
      let gradient = ctx.createRadialGradient(r, 2*r-10, 0,r , 2*r-25,40);

      gradient.addColorStop(0, colorRgba(that.state.background, 0.4));
// that.state.background
      gradient.addColorStop(1, colorRgba('#f5f5f5', 1));
      ctx.fillStyle = gradient;
      ctx.arc(r, 2*r+5, 60,   Math.PI, Math.PI*2 , false);
      // ctx.transform(1,-0.5,-0.5,1,10,10);
      // ctx.transform(1,1,-0.5,1,30,10);
      // ctx.skew(1, 0);
      ctx.fill();
      // ctx.closePath()

      // ctx.fillRect(0, 2*r, 2*r, 2*r+20);
      ctx.restore();
    }
    // 渲染阴影
    function drawImageShadow(){
      // let imgUrl = ''
      // green: "#1ca222",
      // orange: "#ff7e00",
      // blue: "#1790e5"
      let img = ''
      // var img = new Image();
			// img.onload = function(){
			// 	// ('加载完毕')
				
			// 	// 将图片画到canvas上面上去！
			// 	// ctx.drawImage(img,100,100);
        
      //   ctx.drawImage(img,0,r*2);
 
			// }
      if(that.state.background!=='#1ca222'&&that.state.background!=='#ff7e00'&&that.state.background!=='#1790e5'){
        return;
      }else if(that.state.background==='#1ca222'){
        img = Green
      }else if(that.state.background==='#ff7e00'){
        img = Orange
      }else if(that.state.background==='#1790e5'){
        img = Blue
      }
      
      ctx.drawImage(img,0,r);
    }
    //渲染canvas
    function render() {
      ctx.clearRect(0, 0, oW, oH);
      // drawRadialGradient()

      //最外面淡黄色圈
      drawCircle();

      ColorBackground();
      
      //灰色圆圈
      // grayCircle();
      //橘黄色进度圈
      // orangeCircle();
      //裁剪中间水圈
      clipCircle();
      // 控制波幅

      sp += 0.07 * speed; //改变速度
      // 开始水波动画

      drawSine();
      // 写字
      // ctx.restore()
      drawImageShadow()

      drawText();
      
      requestAnimationFrame(render);
    }
    /**
     * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
     * sHex为传入的十六进制的色值
     * alpha为rgba的透明度
     */
    function colorRgba(sHex='#1790e5', alpha) {
      // 十六进制颜色值的正则表达式
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      /* 16进制颜色转为RGB格式 */
      let sColor =typeof sHex === 'string'&& sHex.toLowerCase();
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          var sColorNew = "#";
          for (let i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }
        // 处理六位的颜色值
        var sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        // return sColorChange.join(',')
        return "rgba(" + sColorChange.join(",") + "," + alpha + ")";
      } else {
        return sColor;
      }
    }
  };
  render() {
    return (
      <canvas
        ref={this.canvas}
        // className={"WaveRound " + this.state.background}
      >
        <img alt='green' src={green} id='green' /> 
        <img alt='blue' src={blue} id='blue'/> 
        <img alt='orange' src={orange} id='orange'/> 

        您的浏览器不支持canvas，请更换浏览器.
      </canvas>
      
    );
  }
}
function Vertex(x, y, baseY) {
  /* 波浪类,生成波浪基础参数 */
  this.baseY = baseY; /* 初始Y */
  this.x = x;
  this.y = y;
  this.vy = 0; /* y轴上的变化速度 */
  this.targetY = 0; /* 相对Y */
  this.friction = 0.003; /* 摩擦力 */
  this.deceleration = 1; /* 减速（度） */
}
Vertex.prototype.updateY = function (diffVal) {
  /* 波浪Y */
  this.targetY = diffVal + this.baseY; /* 变化+基础=相对 */
  this.vy += this.targetY - this.y; /* 每次变化就是速度，时间可以比做1 */
  this.y +=
    this.vy * this.friction; /* 速度*摩擦系数*时间+上次的位置=最新的位置 */
  this.vy *= this.deceleration; /* 每次*0.95就是说每次减少0.05 */
  /* 反正最后就是不懂，瞎扯的 */
};
export default WaveRound;
