import DataAction from "../../actions/DataAction";
const GetData = (
  state = {
    IdentityTypeList: null, //[]
    ParentConfig: {
      ProductUseRange: -1, //1专业院校；2综合大学；3单个中小学；4多个中小学
      ParentsShow: 0, //1开启家长功能，0关闭家长功能},
    },
    IdentityModuleList: [
      // {
      //   key: 0,
      //   ModuleGroupID: "S001", //分组ID
      //   ModuleGroupName: "教学管理", //分组名称
      //   ModuleTotalCount: 2, //子模块数量
      //   ModuleList: [
      //     {
      //       ModuleID: "D401", //模块ID
      //       ModuleName: "智能排课", //模块名称
      //     },
      //     {
      //       ModuleID: "D4012", //模块ID
      //       ModuleName: "智能排课",
      //     }, //模块名称
      //   ],
      // },{
      //   key: 2,
      //   ModuleGroupID: "S002", //分组ID
      //   ModuleGroupName: "测试管理", //分组名称
      //   ModuleTotalCount: 2, //子模块数量
      //   ModuleList: [
      //     {
      //       ModuleID: "D501", //模块ID
      //       ModuleName: "测试排课", //模块名称
      //     },
      //     {
      //       ModuleID: "D5012", //模块ID
      //       ModuleName: "测试排课",
      //     }, //模块名称
      //   ],
      // },
    ],
    IdentityUser: {
      PageIndex: 1,
      Total: 0,
      List: [],
    },
    TreeList: [],
    UserList: [],
  },
  actions
) => {
  switch (actions.type) {
    case DataAction.GET_TREE:
      return Object.assign({}, state, {
        TreeList: actions.data,
      });
    case DataAction.GET_USER:
      return Object.assign({}, state, {
        UserList: actions.data,
      });
    case DataAction.GET_INDENTITY_MODULE:
      return Object.assign({}, state, {
        IdentityModuleList: actions.data,
      });
      case DataAction.GET_INDENTITY_USER:
      return Object.assign({}, state, {
        IdentityUser: actions.data,
      });
    case DataAction.GET_CONFIG:
      return Object.assign({}, state, {
        ParentConfig: actions.data,
      });
    case DataAction.GET_INDENTITY_TYPE_LIST:
      return Object.assign({}, state, {
        IdentityTypeList: actions.data,
      });
    default:
      return state;
  }
};

export default GetData;
