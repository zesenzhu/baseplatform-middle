/*
 * ......................................&&.........................
 * ....................................&&&..........................
 * .................................&&&&............................
 * ...............................&&&&..............................
 * .............................&&&&&&..............................
 * ...........................&&&&&&....&&&..&&&&&&&&&&&&&&&........
 * ..................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&..............
 * ................&...&&&&&&&&&&&&&&&&&&&&&&&&&&&&.................
 * .......................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&.........
 * ...................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&...............
 * ..................&&&   &&&&&&&&&&&&&&&&&&&&&&&&&&&&&............
 * ...............&&&&&@  &&&&&&&&&&..&&&&&&&&&&&&&&&&&&&...........
 * ..............&&&&&&&&&&&&&&&.&&....&&&&&&&&&&&&&..&&&&&.........
 * ..........&&&&&&&&&&&&&&&&&&...&.....&&&&&&&&&&&&&...&&&&........
 * ........&&&&&&&&&&&&&&&&&&&.........&&&&&&&&&&&&&&&....&&&.......
 * .......&&&&&&&&.....................&&&&&&&&&&&&&&&&.....&&......
 * ........&&&&&.....................&&&&&&&&&&&&&&&&&&.............
 * ..........&...................&&&&&&&&&&&&&&&&&&&&&&&............
 * ................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&............
 * ..................&&&&&&&&&&&&&&&&&&&&&&&&&&&&..&&&&&............
 * ..............&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&....&&&&&............
 * ...........&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&......&&&&............
 * .........&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&.........&&&&............
 * .......&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&...........&&&&............
 * ......&&&&&&&&&&&&&&&&&&&...&&&&&&...............&&&.............
 * .....&&&&&&&&&&&&&&&&............................&&..............
 * ....&&&&&&&&&&&&&&&.................&&...........................
 * ...&&&&&&&&&&&&&&&.....................&&&&......................
 * ...&&&&&&&&&&.&&&........................&&&&&...................
 * ..&&&&&&&&&&&..&&..........................&&&&&&&...............
 * ..&&&&&&&&&&&&...&............&&&.....&&&&...&&&&&&&.............
 * ..&&&&&&&&&&&&&.................&&&.....&&&&&&&&&&&&&&...........
 * ..&&&&&&&&&&&&&&&&..............&&&&&&&&&&&&&&&&&&&&&&&&.........
 * ..&&.&&&&&&&&&&&&&&&&&.........&&&&&&&&&&&&&&&&&&&&&&&&&&&.......
 * ...&&..&&&&&&&&&&&&.........&&&&&&&&&&&&&&&&...&&&&&&&&&&&&......
 * ....&..&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&...........&&&&&&&&.....
 * .......&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&..............&&&&&&&....
 * .......&&&&&.&&&&&&&&&&&&&&&&&&..&&&&&&&&...&..........&&&&&&....
 * ........&&&.....&&&&&&&&&&&&&.....&&&&&&&&&&...........&..&&&&...
 * .......&&&........&&&.&&&&&&&&&.....&&&&&.................&&&&...
 * .......&&&...............&&&&&&&.......&&&&&&&&............&&&...
 * ........&&...................&&&&&&.........................&&&..
 * .........&.....................&&&&........................&&....
 * ...............................&&&.......................&&......
 * ................................&&......................&&.......
 * .................................&&..............................
 * ..................................&..............................
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-11-03 20:47:06
 * @LastEditTime: 2020-11-04 08:38:20
 * @Description: 动画循环方法
 * @FilePath: \baseplatform-middle\src\common\js\Aniamtion\util\animate.js
 */

export let requestAnimationFrame =
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function (callback) {
    return window.setTimeout(callback, 17 /*~ 1000/60*/);
  };

export let cancelAnimationFrame =
  window.cancelRequestAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.mozCancelRequestAnimationFrame ||
  window.msCancelAnimationFrame ||
  window.msCancelRequestAnimationFrame ||
  window.oCancelAnimationFrame ||
  window.oCancelRequestAnimationFrame ||
  window.clearTimeout;

//   计算鼠标移动距离
export let captureMouse = function (element) {
  var mouse = { x: 0, y: 0, event: null },
    body_scrollLeft = document.body.scrollLeft,
    element_scrollLeft = document.documentElement.scrollLeft,
    body_scrollTop = document.body.scrollTop,
    element_scrollTop = document.documentElement.scrollTop,
    offsetLeft = element.offsetLeft,
    offsetTop = element.offsetTop;

  element.addEventListener(
    "mousemove",
    function (event) {
      var x, y;

      if (event.pageX || event.pageY) {
        x = event.pageX;
        y = event.pageY;
      } else {
        x = event.clientX + body_scrollLeft + element_scrollLeft;
        y = event.clientY + body_scrollTop + element_scrollTop;
      }
      x -= offsetLeft;
      y -= offsetTop;

      mouse.x = x;
      mouse.y = y;
      mouse.event = event;
    },
    false
  );

  return mouse;
};
//   计算触摸移动距离，element
export let captureTouch = function (element) {
  var touch = { x: null, y: null, isPressed: false, event: null },
    body_scrollLeft = document.body.scrollLeft,
    element_scrollLeft = document.documentElement.scrollLeft,
    body_scrollTop = document.body.scrollTop,
    element_scrollTop = document.documentElement.scrollTop,
    offsetLeft = element.offsetLeft,
    offsetTop = element.offsetTop;

  element.addEventListener(
    "touchstart",
    function (event) {
      touch.isPressed = true;
      touch.event = event;
    },
    false
  );

  element.addEventListener(
    "touchend",
    function (event) {
      touch.isPressed = false;
      touch.x = null;
      touch.y = null;
      touch.event = event;
    },
    false
  );

  element.addEventListener(
    "touchmove",
    function (event) {
      var x,
        y,
        touch_event = event.touches[0]; //first touch

      if (touch_event.pageX || touch_event.pageY) {
        x = touch_event.pageX;
        y = touch_event.pageY;
      } else {
        x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
        y = touch_event.clientY + body_scrollTop + element_scrollTop;
      }
      x -= offsetLeft;
      y -= offsetTop;

      touch.x = x;
      touch.y = y;
      touch.event = event;
    },
    false
  );

  return touch;
};

// 转换颜色
export let parseColor = function (color, toNumber) {
  if (toNumber === true) {
    if (typeof color === "number") {
      return color | 0; //chop off decimal
    }
    if (typeof color === "string" && color[0] === "#") {
      color = color.slice(1);
    }
    return window.parseInt(color, 16);
  } else {
    if (typeof color === "number") {
      color = "#" + ("00000" + (color | 0).toString(16)).substr(-6); //pad
    }
    return color;
  }
};
//   #xxxxxx=>ragb()
export let colorToRGB = function (color, alpha) {
  //number in octal format or string prefixed with #
  if (typeof color === "string" && color[0] === "#") {
    color = window.parseInt(color.slice(1), 16);
  }
  alpha = alpha === undefined ? 1 : alpha;
  //parse hex values
  var r = (color >> 16) & 0xff,
    g = (color >> 8) & 0xff,
    b = color & 0xff,
    a = alpha < 0 ? 0 : alpha > 1 ? 1 : alpha;
  //only use 'rgba' if needed
  if (a === 1) {
    return "rgb(" + r + "," + g + "," + b + ")";
  } else {
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }
};
// 检查是否包含该点
/**
 *
 * @param {object}  rect  对象包含: x, y, width, height.
 * @param {number}  x       position x.
 * @param {number}  y       position y.
 * @return {boolean}
 */
export let containsPoint = function (rect, x, y) {
  return !(
    x < rect.x ||
    x > rect.x + rect.width ||
    y < rect.y ||
    y > rect.y + rect.height
  );
};
//
/**
 * Determine if two rectangles overlap.
 * @param {object}  rectA Object with properties: x, y, width, height.
 * @param {object}  rectB Object with properties: x, y, width, height.
 * @return {boolean}
 */
intersects = function (rectA, rectB) {
  return !(
    rectA.x + rectA.width < rectB.x ||
    rectB.x + rectB.width < rectA.x ||
    rectA.y + rectA.height < rectB.y ||
    rectB.y + rectB.height < rectA.y
  );
};
export default {
  captureMouse,
  cancelAnimationFrame,
  requestAnimationFrame,
  captureTouch,
  parseColor,
  colorToRGB,
  containsPoint,
  intersects,
};
