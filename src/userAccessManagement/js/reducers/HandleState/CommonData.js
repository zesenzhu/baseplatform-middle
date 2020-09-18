import HandleAction from "../../actions/HandleAction";
import logo from "../../../images/img-userPower.png";
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
    RoleList: [
      { value: 0, title: "管理员" },
      { value: 1, title: "教师" },
      { value: 2, title: "学生" },
      { value: 3, title: "家长" },
    ],
  },
  actions
) => {
  switch (actions.type) {
    case HandleAction.COMMON_SET_ROLE_LIST_PARAMS:
      return Object.assign({}, state, {
        RoleList: actions.data,
      });
    case HandleAction.COMMON_SET_FRAME_PARAMS:
      return Object.assign({}, state, {
        FrameData: { ...state.FrameData, ...actions.data },
      });
    case HandleAction.COMMON_SET_ROUTE_PARAMS:
      return Object.assign({}, state, {
        RouteData: actions.data,
      });
    default:
      return state;
  }
};

export default CommonData;
