import ParamsAction from "./ParamsAction";
import ControlAction from "./ControlAction";
import CommonAction from "./CommonAction";
import CheckAction from "./CheckAction";
let HandleAction = {
  ...ParamsAction,
  ...ControlAction,
  ...CommonAction,
  ...CheckAction,
};
export default HandleAction;
