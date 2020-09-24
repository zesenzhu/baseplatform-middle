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
 * @LastEditTime: 2020-09-21 20:47:33
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
// 设置身份权限的参数
const PARAMS_SET_IDENTITY_POWER = "PARAMS_SET_IDENTITY_POWER";
const ParamsSetIdentityPower = (data) => {
  return (dispatch) => {
    dispatch({ type: PARAMS_SET_IDENTITY_POWER, data: data });
  };
};
// 设置查看编辑成员的参数
const PARAMS_SET_CHECK_MEMBER = "PARAMS_SET_CHECK_MEMBER";
const ParamsSetCheckMember = (data) => {
  return (dispatch) => {
    dispatch({ type: PARAMS_SET_CHECK_MEMBER, data: data });
  };
};
// 设置添加成员的参数
const PARAMS_SET_ADD_MEMBER = "PARAMS_SET_ADD_MEMBER";
const ParamsSetAddMember = (data) => {
  return (dispatch) => {
    dispatch({ type: PARAMS_SET_ADD_MEMBER, data: data });
  };
};
// 设置搜索成员的参数
const PARAMS_SET_SEARCH_IDENTITY = "PARAMS_SET_SEARCH_IDENTITY";
const ParamsSetSearchIdentity = (data) => {
  return (dispatch) => {
    dispatch({ type: PARAMS_SET_SEARCH_IDENTITY, data: data });
  };
};
// const ParamsAction ={}
export default {
  PARAMS_SET_SEARCH_IDENTITY,
  ParamsSetSearchIdentity,

  PARAMS_SET_ADD_MEMBER,
  ParamsSetAddMember,
  
  ParamsSetCheckMember,
  PARAMS_SET_CHECK_MEMBER,
  PARAMS_SET_IDENTITY_POWER,
  ParamsSetIdentityPower,
  PARAMS_SET_CUETOM_IDENTITY,
  ParamsSetCustomIdentity,
};
