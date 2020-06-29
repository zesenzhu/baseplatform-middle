import { postData, getData } from "../../../common/js/fetch";
import UpUIState from "./UpUIState";
import CONFIG from "../../../common/js/config";
import "whatwg-fetch";
import actions from "./index";

//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = "GET_LOGIN_USER_INFO";
const GET_USER_INFO = "GET_USER_INFO";

//操作的执行
//获取登录用户信息
const getLoginUser = data => {
  return dispatch => {
    dispatch({ type: GET_LOGIN_USER_INFO, data: data });
  };
};

//获取登录用户信息
const getUserInfo = url => {
  return dispatch => {
    getData(CONFIG.UserInfoProxy + url, 2)
      .then(res => {
        dispatch({ type: actions.UpUIState.APP_LOADING_OPEN });
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_USER_INFO, data: json.Data });
          dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
        }
      });
  };
};

export default {
  getLoginUser,
  GET_LOGIN_USER_INFO,
  GET_USER_INFO,
  getUserInfo
 
};
