import { createContext } from "react";
// import staticData from "./staticData";
import LoginMsg from "./loginMsg";
// import HolidayData from "./HolidayData";
// 创建上下文
export const Context = createContext(null);

// 初始数据
export const initState = {
  // ...staticData,
  LoginMsg,
  HolidayData: {},
  ContentLoading: true,
  // GroupList,
  // ImgUrlProxy: "",
  // ThirdPartySubSystem,
  // IdentityTypeList:{}
};

// reducer
export const reducer = (state, action) => {
  switch (action.type) {
    case "loginMsg":
      return Object.assign({}, state, { LoginMsg: action.data });
    case "holidayData":
      return Object.assign({}, state, { HolidayData: action.data });
    case "contentLoading":
      return Object.assign({}, state, { ContentLoading: action.data });
    default:
      return state;
  }
};
