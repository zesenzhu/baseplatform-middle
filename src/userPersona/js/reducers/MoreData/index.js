import { combineReducers } from "redux";
import CommonData from "./CommonData";
import MainData from "./MainData";

export let initialState = {};

let rootReducers = combineReducers({
  CommonData,
  MainData,
});
export default rootReducers;
