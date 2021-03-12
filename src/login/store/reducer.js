import { combineReducers } from "redux";

import commSetting from "./commSetting";

import introduce from "./introduce";

import slider from "./slider";

import appAlert from "./appAlert";
import changePwd from "./changePwd";

const reducer = combineReducers({
  commSetting,

  introduce,

  slider,

  appAlert,
  changePwd,
});

export default reducer;
