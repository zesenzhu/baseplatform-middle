import HandleAction from "../../actions/HandleAction";
import logo from "../../../images/img-userPower.png";
const CommonData = (
  state = {
    FrameData: {
      cnname: "用户权限管理",
      enname: "User Access Management",
      image: logo,
      showLeftMenu: false,
      showBarner: true,
      type: "circle",
      className: "UserFrame",
    },
    TimeBarnerList: [
      { value: "", title: "各类用户身份设置", icon: "all" },
      { value: "more", title: "高级权限设置", icon: "more" },
    ],
    RouteData: [],
    RoleList: [
      { value: 0, title: "管理员", code: "admin" },
      { value: 1, title: "教师", code: "teacher" },
      { value: 2, title: "学生", code: "student" },
      { value: 3, title: "家长", code: "parents" },
    ],
    DefaultIdentity: [
      // { value: "IC0001", title: "学校管理员" },
      { value: "IC0009", title: "院系管理员" },
      { value: "IC0011", title: "任课教师" },
      { value: "IC0012", title: "班主任" },
      { value: "IC0013", title: "教研组长" },
      { value: "IC0014", title: "学生" },
      { value: "IC0015", title: "家长" },
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
