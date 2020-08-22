import { SYSTEM_WEB_URL_UPDATE } from "../../actions/systemUrlActions";

//目标用户的用户ID和用户类型

const defaultState = {
  Urls: {
    //小助手
    "200": { SysID: "200", WebUrl: "", WsUrl: "" },

    //宿舍管理
    E48: { SysID: "E48", WebUrl: "", WsUrl: "" },

    //教学方案
    "310": { SysID: "310", WebUrl: "", WsUrl: "" },

    //电子资源

    C10: { SysID: "C10", WebUrl: "", WsUrl: "" },

    //李萌芽项目组
    E34: { SysID: "E34", WebUrl: "", WsUrl: "" },

    //精品课程

    D21: { SysID: "D21", WebUrl: "", WsUrl: "" },

    // 学生成绩
    "810": { SysID: "D21", WebUrl: "", WsUrl: "" },
  },

  ModuleRely: {
    account: ["E34"],
  },
};

const systemUrl = (state = defaultState, actions) => {
  switch (actions.type) {
    case SYSTEM_WEB_URL_UPDATE:
      return { ...state, Urls: { ...state.Urls, ...actions.data } };

    default:
      return state;
  }
};
export default systemUrl;
