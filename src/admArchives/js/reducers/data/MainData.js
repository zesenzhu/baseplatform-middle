import UpDataState from "../../actions/UpDataState";
import { Children } from "react";

const MainData = (state = { SysUrl: [] }, actions) => {
  switch (actions.type) {
    case UpDataState.GET_SUB_SYSTEMS_MAIN_SERVER:
      return Object.assign({}, state, { SysUrl: actions.data });
    default:
      return state;
  }
};

export default MainData;
