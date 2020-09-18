import DataAction from "../../actions/DataAction";
const GetData = (
  state = {
    IdentityTypeList: null, //[]
    ParentConfig: {
      ProductUseRange: -1, //1专业院校；2综合大学；3单个中小学；4多个中小学
      ParentsShow: 0, //1开启家长功能，0关闭家长功能},
    },
    IdentityModuleList:[]
  },
  actions
) => {
  switch (actions.type) {
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
