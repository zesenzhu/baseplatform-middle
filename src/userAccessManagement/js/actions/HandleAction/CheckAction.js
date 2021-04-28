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
 * @Date: 2020-09-18 16:27:05
 * @LastEditTime: 2020-09-18 16:53:52
 * @Description: 公共check
 * @FilePath: \baseplatform-middle\src\userAccessManagement\js\actions\HandleAction\CheckAction.js
 */
import HandleAction from "./index";
/**
 * @description:
 * @param {value:要check的值，success:成功方法，error：错误方法，fn：普通方法}
 * @return {type}
 */
// 身份名称
const checkIndentityName = ({
  value,
  success = () => {},
  error = () => {},
  fn = () => {},
}) => {
  return (dispatch, getState) => {
    let { HandleState } = getState();
    let Test = /^[a-zA-Z0-9_\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_\u4e00-\u9fa5]$|^[a-zA-Z0-9_\u4e00-\u9fa5]{1,50}$/.test(
      value
    );

    if (Test) {
      dispatch(
        HandleAction.SetTipsVisibleParams({ IndentityNameTipsVisible: false })
      );
      success(getState());
    } else {
      dispatch(
        HandleAction.SetTipsVisibleParams({ IndentityNameTipsVisible: true })
      );
      error(getState());
    }
    fn(getState());
  };
};
// 身份描述

const checkDescription = ({
  value,
  success = () => {},
  error = () => {},
  fn = () => {},
}) => {
  return (dispatch, getState) => {
    let { HandleState } = getState();
    let Test = /^[?？，。,.+-=\.\\/\*()（）A-Za-z0-9\u4e00-\u9fa5]{1,30}$/.test(
      value
    );

    if (Test) {
      dispatch(
        HandleAction.SetTipsVisibleParams({ DescriptionTipsVisible: false })
      );
      success(getState());
    } else {
      dispatch(
        HandleAction.SetTipsVisibleParams({ DescriptionTipsVisible: true })
      );
      error(getState());
    }
    fn(getState());
  };
};
/**
 * @description:
 * @param {value:[]}
 * @return {type}
 */
// 账号类型
const checkUserType = ({
  value,
  success = () => {},
  error = () => {},
  fn = () => {},
}) => {
  return (dispatch, getState) => {
    let { HandleState } = getState();

    if (value.length) {
      dispatch(
        HandleAction.SetTipsVisibleParams({ UserTypeTipsVisible: false })
      );
      success(getState());
    } else {
      dispatch(
        HandleAction.SetTipsVisibleParams({ UserTypeTipsVisible: true })
      );
      error(getState());
    }
    fn(getState());
  };
};
export default { checkIndentityName, checkDescription, checkUserType };
