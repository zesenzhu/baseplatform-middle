import React, { Component } from "react";
import Public from "../../public";
import "../../../scss/Animation/ReactCanvas/WaveRound.scss";

// const { requestNextAnimationFrame } = Public;
window.requestAnimaFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
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
      width: props.width ? props.width : 108 /* 宽度 */,
      height: props.height ? props.height : 108 /* 高度 */,
      verNum: props.verNum
        ? props.verNum
        : props.width
        ? props.width
        : 4000 /* 波浪数 */,
      diffPt: [],
      vertexes: [],
      i: 0,
      xx: props.width ? props.width / 2 : 54,
      dd: 10 /* 浓度 */,
      autoDiff: 2000,
      colors: props.colors
        ? props.colors
        : ["#367aec", "#6ca0f6"] /* 颜色:[液体，影子] */,
      shandow: props.shandow ? props.shandow : true,
      deviation: props.deviation ? props.deviation : 70, //偏移
      requestAnimaFrame: "",
      background: props.background ? props.background : "", //背景
      addH: props.height ? props.height / 2 : 108 / 2
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
    window.cancelAnimationFrame(this.state.requestAnimaFrame);
    console.log(this.state.deviation);
    this.state.deviation = nextProps.deviation;
    this.update(this.state.ctx, this.state.vertexes, this.state.diffPt);
  }
  componentDidMount() {
    /* 初始化canvas */
    const canvas = this.canvas.current;
    let ctx = "";
    if (canvas.getContext) {
      //  canvas.width = width;
      //  canvas.height = height;
      ctx = canvas.getContext("2d");
      // this.initCanvas(
      //   ctx,
      //   this.state.width,
      //   this.state.height
      // ); /* 初始化画布 */
      let cW = this.state.width;
      let cH = this.state.height;
      let addH = this.state.addH;
      let time = 0;
      canvas.width = this.state.width;
      canvas.height = this.state.height;
      let verNum = this.state.verNum;
      let diffPt = [];
      let vertexes = [];
      for (let i = 0; i < verNum; i++)
        vertexes[i] = new Vertex(
          ((cW + this.state.deviation * 2) / (verNum - 1)) * i -
            this.state.deviation,
          cH / 2,
          cH / 2
        ); /* (x,y,baseY) */
      for (let i = 0; i < verNum; i++) {
        //初始赋值
        diffPt[i] = 0;
      }
      // console.log(diffPt)
      this.setState({
        ctx: ctx,
        diffPt: diffPt,
        vertexes: vertexes,
        canvas: canvas
      });
      // console.log('wode')
      this.update(ctx, vertexes, diffPt, addH, time);
    }
  }
  handleStar = () => {
    this.setState({
      start: !this.state.start
    });
  };
  /* 更新 */
  update = (ctx, vertexes, diffPt, addH, time) => {
    // console.log("ss");
    let i = this.state.i;

    // let ctx = this.state.ctx;
    let canvas = this.state.canvas;
    let xx = this.state.xx;
    let dd = this.state.dd;
    let autoDiff = this.state.autoDiff;
    // let diffPt = this.state.diffPt;
    // let vertexes = this.state.vertexes;
    let verNum = this.state.verNum;
    let deviation = this.state.deviation;
    ctx.clearRect(
      0 - deviation,
      0 - deviation,
      canvas.width + deviation,
      canvas.height + deviation
    ); /* 清除画布 */
    autoDiff -=
      autoDiff * 0.9; /* 初始autoDiff为1000，每update :0.1的n次方*autoDiff */
    diffPt[xx] = autoDiff; /* diffPt.length为250 */
    //左侧
    //差分，使得每个点都是上一个点的下一次的解，由于差分函数出来的解是一个曲线，且每次迭代后，曲线相加的结果形成了不断地波浪
    for (let i = xx - 1; i > 0; i--) {
      let d = xx - i; /* i=xx-1,所以每次d=1+n */
      if (d > dd) d = dd; /* 在for循环16起执行d=dd，所以d<=15 */
      diffPt[i] -=
        (diffPt[i] - diffPt[i + 1]) *
        (1 - 0.01 * d); /* 就是曲线函数，16次后就一样 */
    }
    //右侧
    for (let i = xx + 1; i < verNum; i++) {
      let d = i - xx;
      if (d > dd) d = dd;
      diffPt[i] -= (diffPt[i] - diffPt[i - 1]) * (1 - 0.01 * d);
    }
    // console.log(diffPt, i);

    // if (i++ % 5 === 0) {
    //   console.log(diffPt);
    //   this.setState({
    //     i: i
    //   });
    // }
    //更新点Y坐标
    for (let i = 0; i < vertexes.length; i++) {
      vertexes[i].updateY(diffPt[i]);
    }

    if (time % 5===0&&addH>0) {
      addH--;
    }
    time++;
    this.draw(ctx, vertexes, addH);
    let requestAnimaFrame = window.requestAnimaFrame(() =>
      this.update(ctx, vertexes, diffPt, addH, time)
    );
    this.setState({
      diffPt: diffPt,
      vertexes: vertexes,
      // xx: xx,
      dd: dd /* 浓度 */,
      autoDiff: autoDiff,
      requestAnimaFrame: requestAnimaFrame,
      addH: addH
    });
  };
  /* 绘画 */
  draw = (ctx, vertexes, addH) => {
    // let ctx = this.state.ctx;
    let canvas = this.state.canvas;
    let xx = this.state.xx;
    let dd = this.state.dd;
    let autoDiff = this.state.autoDiff;
    let diffPt = this.state.diffPt;
    // let vertexes = this.state.vertexes;
    let height = this.state.height + addH;
    let len = this.state.colors.length;
    let colors = this.state.colors;
    let a = "";
    // let addH = this.state.addH
    let deviation = this.state.deviation / 2;
    if (!this.state.shandow) {
      len = 1;
    }
    for (let j = 0; j < len; j++) {
      ctx.beginPath();
      ctx.moveTo(0 - deviation * 2, height); /* 开始 */
      ctx.fillStyle = this.colorRgba(colors[j], 0.2); /* 填充 */
      ctx.lineTo(vertexes[0].x + j * deviation, vertexes[0].y + addH);
      for (let i = 1; i < vertexes.length; i++) {
        ctx.lineTo(vertexes[i].x + j * deviation, vertexes[i].y + addH);
      }
      ctx.lineTo(canvas.width + deviation, height);
      ctx.lineTo(0 - deviation * 2, height);
      // ctx.closePath()
      ctx.fill();
    }

    // ctx.beginPath();
    // ctx.moveTo(0, height); /* 开始 */
    // ctx.fillStyle = "#6ca0f6"; /* 填充 */
    // ctx.lineTo(vertexes[0].x, vertexes[0].y);
    // for (let i = 1; i < vertexes.length; i++) {
    //   ctx.lineTo(vertexes[i].x, vertexes[i].y);
    // }
    // ctx.lineTo(canvas.width, height);
    // ctx.lineTo(0, height);
    // ctx.fill();

    // ctx.beginPath();
    // ctx.moveTo(0, height);
    // ctx.fillStyle = "#367aec";
    // ctx.lineTo(vertexes[0].x + 20, vertexes[0].y + 3);
    // for (let i = 1; i < vertexes.length; i++) {
    //   ctx.lineTo(vertexes[i].x + 20, vertexes[i].y + 3);
    // }
    // ctx.lineTo(canvas.width, height);
    // ctx.lineTo(0, height);
    // ctx.fill();
  };
  initCanvas = (ctx, width = 108, height = 108) => {
    // console.log(canvas, ctx);

    let cW = this.state.width;
    let cH = this.state.height;
    let verNum = this.state.verNum;
    // console.log(cH, cW, verNum);
    let diffPt = [];
    let vertexes = [];
    for (let i = 0; i < verNum; i++)
      vertexes[i] = new Vertex(
        (cW / (verNum - 1)) * i,
        cH / 2,
        cH / 2
      ); /* (x,y,baseY) */
    for (let i = 0; i < verNum; i++) diffPt[i] = 0;
    // console.log(diffPt)
    // console.log(vertexes);
    this.setState({
      // ctx: ctx,
      diffPt: diffPt,
      vertexes: vertexes
    });
  };

  /**
   * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
   * sHex为传入的十六进制的色值
   * alpha为rgba的透明度
   */
  colorRgba = (sHex, alpha) => {
    // 十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    /* 16进制颜色转为RGB格式 */
    let sColor = sHex.toLowerCase();
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
  };
  render() {
    return (
      <canvas
        ref={this.canvas}
        className={"WaveRound " + this.state.background}
      >
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
Vertex.prototype.updateY = function(diffVal) {
  /* 波浪Y */
  this.targetY = diffVal + this.baseY; /* 变化+基础=相对 */
  this.vy += this.targetY - this.y; /* 每次变化就是速度，时间可以比做1 */
  this.y +=
    this.vy * this.friction; /* 速度*摩擦系数*时间+上次的位置=最新的位置 */
  this.vy *= this.deceleration; /* 每次*0.95就是说每次减少0.05 */
  /* 反正最后就是不懂，瞎扯的 */
};
export default WaveRound;
