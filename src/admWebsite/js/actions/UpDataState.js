import { postData, getData } from "../../../common/js/fetch";
import UpUIState from "./UpUIState";
import CONFIG from "../../../common/js/config";
import "whatwg-fetch";
import actions from "./index";

//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = "GET_LOGIN_USER_INFO";
// 获取网站资源数据
const GET_WEBSITE_RESOURCE_DATA = "GET_WEBSITE_RESOURCE_DATA";
// 获取学科
const GET_SUBJECT_DATA = "GET_SUBJECT_DATA";
// 获取分类
const GET_TYPE_DATA = "GET_TYPE_DATA";
// 获取学段
const GET_PERIOD_DATA = "GET_PERIOD_DATA";
// 设置网站初始数据
const SET_INIT_WEBSITE_DATA = "SET_INIT_WEBSITE_DATA";
// 设置网站数据
const SET_WEBSITE_DATA = "SET_WEBSITE_DATA";
//操作的执行
//获取登录用户信息
const getLoginUser = data => {
  return dispatch => {
    dispatch({ type: GET_LOGIN_USER_INFO, data: data });
  };
};

//获取网站资源数据
const getWebsiteResourceData = url => {
  return dispatch => {
    getData(CONFIG.WebsiteProxy + url, 2)
      .then(res => {
        dispatch({ type: actions.UpUIState.APP_LOADING_OPEN });
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_WEBSITE_RESOURCE_DATA, data: json.Data });
          dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
        }
      });
  };
};
//获取学科
const getSubjectData = url => {
  return dispatch => {
    getData(CONFIG.WebsiteProxy + url, 2)
      .then(res => {
        dispatch({ type: actions.UpUIState.APP_LOADING_OPEN });
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_SUBJECT_DATA, data: json.Data });
          dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
        }
      });
  };
};
//获取分类
const getTypeData = url => {
  return dispatch => {
    getData(CONFIG.WebsiteProxy + url, 2)
      .then(res => {
        dispatch({ type: actions.UpUIState.APP_LOADING_OPEN });
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_TYPE_DATA, data: json.Data });
          dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
        }
      });
  };
};
//获取学段
const getPeriodData = url => {
  return dispatch => {
    getData(CONFIG.WebsiteProxy + url, 2)
      .then(res => {
        dispatch({ type: actions.UpUIState.APP_LOADING_OPEN });
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch({ type: GET_PERIOD_DATA, data: json.Data });
          dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
        }
      });
  };
};
//设置初始数据
const setInitWebsiteData = data => {
  return (dispatch,getState) => {
    let State = getState();
    const {DataState} = State;
    dispatch({ type: SET_INIT_WEBSITE_DATA, data: data,DataState:DataState });
  };
};
//设置数据
const setWebsiteData = data => {
    return dispatch => {
      dispatch({ type: SET_WEBSITE_DATA, data: data });
    };
  };
export default {
  getLoginUser,
  GET_LOGIN_USER_INFO,
  GET_WEBSITE_RESOURCE_DATA,
  getWebsiteResourceData,
  GET_TYPE_DATA,
  GET_SUBJECT_DATA,
  getSubjectData,
  getTypeData,
  GET_PERIOD_DATA,
  getPeriodData,
  SET_INIT_WEBSITE_DATA,
  SET_WEBSITE_DATA,
  setInitWebsiteData,
  setWebsiteData
};
