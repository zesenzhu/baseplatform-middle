import { combineReducers } from "redux";
import ParamsData from "./ParamsData";
import CommonData from "./CommonData";
import ControlData from "./ControlData";
// import GetData from "./ParamsData";

const DataState = combineReducers({
  ParamsData,CommonData,ControlData
});
export default DataState;
