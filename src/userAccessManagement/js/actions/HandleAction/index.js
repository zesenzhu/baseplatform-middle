import ParamsAction from "./ParamsAction";
import ControlAction from "./ControlAction";
import CommonAction from "./CommonAction";
let HandleAction = {...ParamsAction, ...ControlAction ,...CommonAction}
export default HandleAction;
