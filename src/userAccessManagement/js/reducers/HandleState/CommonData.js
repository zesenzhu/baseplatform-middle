import HandleAction from "../../actions/HandleAction";
import logo from '../../../images/img-userPower.png'
const CommonData = (
  state = {
    FrameData: {
      cnname: "用户权限管理",
      enname: "User Access Management",
      image: logo,
      showLeftMenu: false,
      showBarner: false,
      type: "circle",
      className: "UserFrame",
    },
    RouteData: [],
  },
  actions
) => {
  switch (actions.type) {
    case HandleAction.COMMON_SET_FRAME_PARAMS:
      return Object.assign({}, state, {
        FrameData: {...state.FrameData,...actions.data},
      });
      case HandleAction.COMMON_SET_ROUTE_PARAMS:
      return Object.assign({}, state, {
        RouteData:  actions.data ,
      });
    default:
      return state;
  }
};

export default CommonData;
