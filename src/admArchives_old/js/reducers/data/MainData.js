import UpDataState from "../../actions/UpDataState";
import { Children } from "react";
import logo from "../../../images/icon-logo.png";

const MainData = (state = { SysUrl: [],FrameData:{
  cnname:"用户档案管理",
  enname: "User Profile Management",
  image: logo,
  subtitle:''

} }, actions) => {
  switch (actions.type) {
    case UpDataState.GET_SUB_SYSTEMS_MAIN_SERVER:
      return Object.assign({}, state, { SysUrl: actions.data });
      case UpDataState.SET_FRAME_DATA:
      return Object.assign({}, state, { FrameData: {...state.FrameData,...actions.data} });
    default:
      return state;
  }
};

export default MainData;
