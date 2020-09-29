import { combineReducers } from "redux";
import DataState from "./DataState";
// import UIState from './UIState';
import HandleState from "./HandleState";
import PublicState from "./PublicState";

export let initialState = {};

let rootReducers = combineReducers({
  DataState,
  // UIState,
  PublicState,
  HandleState,
});
export default rootReducers;
