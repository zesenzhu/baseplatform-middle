import { createContext } from "react";
import staticData from "./staticData";
import LoginMsg from "./loginMsg";
import AddSubSystem from "./addSubSystem";
// 创建上下文
export const Context = createContext(null);

// 初始数据
export const initState = {
  ...staticData,
  LoginMsg,
  AddSubSystem,
  ImgUrlProxy:'',
};

// reducer
export const reducer = (state, action) => {
  switch (action.type) {
    case "loginMsg":
      return Object.assign({}, state, { LoginMsg: action.data });
    case "imgUrlProxy":
      return Object.assign({}, state, { ImgUrlProxy: action.data });
    default:
      return state;
  }
};
