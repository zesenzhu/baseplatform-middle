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
 * @Date: 2020-09-17 10:44:21
 * @LastEditTime: 2020-09-17 14:25:57
 * @Description: 模块用户编辑的控制的action
 * @FilePath: \baseplatform-university\src\userAccessManagement\js\actions\HandleAction\ControlAction.js
 */

import PublicAction from "../PublicAction";

// 设置提示visible参数
const CONTROL_SET_TIPS_VISIBLE_PARAMS = "CONTROL_SET_TIPS_VISIBLE_PARAMS";
const SetTipsVisibleParams = (data) => {
  return (dispatch) => {
    dispatch({ type: CONTROL_SET_TIPS_VISIBLE_PARAMS, data: data });
  };
};
// 设置提示Title
const CONTROL_SET_TIPS_TITLE_PARAMS = "CONTROL_SET_TIPS_TITLE_PARAMS";
const SetTipsTitleParams = (data) => {
  return (dispatch) => {
    dispatch({ type: CONTROL_SET_TIPS_TITLE_PARAMS, data: data });
  };
};
// 设置Modal参数
const CONTROL_SET_MODAL_VISIBLE = "CONTROL_SET_MODAL_VISIBLE";
const SetModalVisible = (data) => {
  return (dispatch) => {
    dispatch({ type: CONTROL_SET_MODAL_VISIBLE, data: data });
  };
};
export default{
  SetModalVisible,
  CONTROL_SET_MODAL_VISIBLE,
  CONTROL_SET_TIPS_VISIBLE_PARAMS,
  SetTipsVisibleParams,
  CONTROL_SET_TIPS_TITLE_PARAMS,
  SetTipsTitleParams,
};
