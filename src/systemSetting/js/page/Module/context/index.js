import { createContext } from "react";
import staticData from "./staticData";
import LoginMsg from "./loginMsg";
import GroupList from "./GroupList";
import ThirdPartySubSystem from "./ThirdPartySubSystem";
// 创建上下文
export const Context = createContext(null);

// 初始数据
export const initState = {
  ...staticData,
  LoginMsg,
  GroupList,
  ImgUrlProxy: "",
  ThirdPartySubSystem,
  IdentityTypeList:{}
};

// reducer
export const reducer = (state, action) => {
  switch (action.type) {
    case "identityTypeList":
      return Object.assign({}, state, { IdentityTypeList: action.data });
    case "thirdPartySubSystem":
      return Object.assign({}, state, { ThirdPartySubSystem: action.data });
    case "groupList":
      return Object.assign({}, state, { GroupList: action.data });
    case "loginMsg":
      return Object.assign({}, state, { LoginMsg: action.data });
    case "imgUrlProxy":
      return Object.assign({}, state, { ImgUrlProxy: action.data });
    default:
      return state;
  }
};
