/*
 *                   江城子 . 程序员之歌
 *
 *               十年生死两茫茫，写程序，到天亮。
 *                   千行代码，Bug何处藏。
 *               纵使上线又怎样，朝令改，夕断肠。
 *
 *               领导每天新想法，天天改，日日忙。
 *                   相顾无言，惟有泪千行。
 *               每晚灯火阑珊处，夜难寐，加班狂。
 *
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-11-03 19:31:54
 * @LastEditTime: 2020-11-03 19:32:55
 * @Description: Math工具类处理，各种数学公式
 * @FilePath: \baseplatform-middle\src\common\js\Aniamtion\util\Math.js
 */

let M = Math;
export const Cos = M.cos; //余弦
export const ACos = M.acos; //反余弦
export const Sin = M.sin; //正弦
export const ASin = M.asin; //反正弦
export const Tan = M.tan; //正切
export const ATan = M.atan; //反正切:(degrees)
export const ATan2 = M.atan2; //反正切2:(x,y)
export const Sqrt = M.sqrt; //开方
export const Pow = M.pow; //平方
export const PI = M.PI; //圆周率
export const Round = M.round; //四舍五入

// 角度与弧度的转换
// 角度转弧度
export function getRadians(degrees) {
  return (degrees * PI) / 180;
}
// 弧度转角度
export function getDegrees(radians) {
  return (radians * 180) / PI;
}
export default {
  Cos,
  Sin,
  Sqrt,
  Pow,
  PI,
  Round,
  getRadians,
  getDegrees,Tan,ASin,ACos,ATan,ATan2
};
