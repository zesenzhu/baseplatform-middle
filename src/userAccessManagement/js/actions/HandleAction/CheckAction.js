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
 * @LastEditTime: 2020-09-18 16:35:01
 * @Description: 公共check
 * @FilePath: \baseplatform-middle\src\userAccessManagement\js\actions\HandleAction\CheckAction.js
 */
import HandleAction from "./index";
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

export default {checkIndentityName};
