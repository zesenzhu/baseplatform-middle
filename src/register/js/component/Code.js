import React, { Component } from "react";
import { Input } from "antd";

import { Loading } from "../../../common";
import md5 from "md5";

import history from "../containers/history";

import { connect } from "react-redux";

class Code extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      code: "",
      codeLength: 5, //验证码长度
      fontSizeMin: 20, //字体最小
      fontSizeMax: 22, //字体最大
      backgroundColorMin: 240, //背景色
      backgroundColorMax: 250,
      colorMin: 10, //字体色
      colorMax: 20,
      lineColorMin: 40, //线条色
      lineColorMax: 180,
      contentWidth: 94,
      contentHeight: 32,
    };
  }
  componentWillMount() {
    this.canvas = React.createRef();
  }
  componentDidMount() {
    this.reloadPic();
  }
  reloadPic = () => {
    let { getCode } = this.props;

    let code = this.drawPic();
    getCode(this.reloadPic, code);
    return code;
  };
  drawPic = () => {
    let code = this.randomCode();

    return code;
  };
  // 随机生成验证码
  randomCode() {
    let random = "";
    // 去掉了I l i o O
    const str = "QWERTYUPLKJHGFDSAZXCVBNMqwertyupkjhgfdsazxcvbnm1234567890";
    for (let i = 0; i < this.state.codeLength; i++) {
      let index = Math.floor(Math.random() * 57);
      random += str[index];
    }
    // getCode(random); //赋值，向上返回验证码
    this.setState(
      {
        code: random,
      },
      this.InitCanvas
    );
    return random;
    // this.InitCanvas();
  }
  InitCanvas = () => {
    let canvas = this.canvas.current;
    let ctx = canvas.getContext("2d");
    ctx.textBaseline = "bottom";
    // 绘制背景
    ctx.fillStyle = this.randomColor(
      this.state.backgroundColorMin,
      this.state.backgroundColorMax
    );
    ctx.fillRect(0, 0, this.state.contentWidth, this.state.contentHeight);
    // 绘制文字
    for (let i = 0; i < this.state.code.length; i++) {
      this.drawText(ctx, this.state.code[i], i);
    }
    this.drawLine(ctx);
    this.drawDot(ctx);
  };

  // 生成一个随机数
  randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  drawDot(ctx) {
    // 绘制干扰点
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = this.randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(
        this.randomNum(0, this.state.contentWidth),
        this.randomNum(0, this.state.contentHeight),
        1,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  }
  drawLine(ctx) {
    // 绘制干扰线
    for (let i = 0; i < 1; i++) {
      ctx.strokeStyle = this.randomColor(
        this.state.lineColorMin,
        this.state.lineColorMax
      );
      ctx.beginPath();
      ctx.moveTo(
        this.randomNum(0, this.state.contentWidth),
        this.randomNum(0, this.state.contentHeight)
      );
      ctx.lineTo(
        this.randomNum(0, this.state.contentWidth),
        this.randomNum(0, this.state.contentHeight)
      );
      ctx.stroke();
    }
  }
  drawText(ctx, txt, i) {
    ctx.fillStyle = this.randomColor(this.state.colorMin, this.state.colorMax);
    let fontSize = this.randomNum(
      this.state.fontSizeMin,
      this.state.fontSizeMax
    );
    ctx.font = fontSize + "px SimHei";
    let padding = 10;
    let offset = (this.state.contentWidth - 40) / (this.state.code.length - 1);
    let x = padding;
    if (i > 0) {
      x = padding + i * offset;
    }
    let y = this.randomNum(
      this.state.fontSizeMax,
      this.state.contentHeight - 5
    );
    if (fontSize > 40) {
      y = 40;
    }
    let deg = this.randomNum(-10, 10);
    // 修改坐标原点和旋转角度
    ctx.translate(x, y);
    ctx.rotate((deg * Math.PI) / 180);
    ctx.fillText(txt, 0, 0);
    // 恢复坐标原点和旋转角度
    ctx.rotate((-deg * Math.PI) / 180);
    ctx.translate(-x, -y);
  }
  // 生成一个随机的颜色
  randomColor(min, max) {
    const r = this.randomNum(min, max);
    const g = this.randomNum(min, max);
    const b = this.randomNum(min, max);
    return `rgb(${r}, ${g}, ${b})`;
  }

  render() {
    let { contentWidth, contentHeight } = this.state;
    let { className } = this.props;
    return (
      //   <div>
      <canvas
        className={`${className}`}
        ref={this.canvas}
        height={contentHeight}
        width={contentWidth}
        onClick={this.reloadPic}
      ></canvas>
      //   </div>
    );
  }
}
Code.defaultProps = {
  getCode: () => {},
  className: "",
};
export default Code;
