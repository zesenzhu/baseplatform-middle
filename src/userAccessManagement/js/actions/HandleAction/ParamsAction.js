/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 * 
 * 
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *            佛祖保佑       永不宕机     永无BUG
 * 
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-09-17 10:43:49
 * @LastEditTime: 2020-09-18 14:53:14
 * @Description: 模块用户编辑的参数的action
 * @FilePath: \baseplatform-middle\src\userAccessManagement\js\actions\HandleAction\ParamsAction.js
 */

import PublicAction from "../PublicAction";
// 设置版本或角色权限 的数据
const PARAMS_SET_CUETOM_IDENTITY = "PARAMS_SET_CUETOM_IDENTITY";
const ParamsSetCustomIdentity = (data) => {
  return (dispatch) => {
    dispatch({ type: PARAMS_SET_CUETOM_IDENTITY, data: data });
  };
};
// const ParamsAction ={}
export default {
    PARAMS_SET_CUETOM_IDENTITY,
    ParamsSetCustomIdentity,
}