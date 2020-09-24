import DataAction from "../../actions/DataAction";
const GetData = (
  state = {
    IdentityTypeList: null, //[]
    ParentConfig: {
      ProductUseRange: -1, //1专业院校；2综合大学；3单个中小学；4多个中小学
      ParentsShow: 0, //1开启家长功能，0关闭家长功能},
    },
    IdentityModuleList: [],
    IdentityUser: {
      PageIndex: 1,
      Total: 0,
      List: [],
    },
    TreeList: [],
    UserList: [],
    SearchIdentity: { PageIndex: 1, Total: 0, List: [] },
    IdentityTypeForAccredit: [],

  },
  actions
) => {
  switch (actions.type) {
    case DataAction.GET_IDENTITY_TYPE_FOR_ACCREDIT:
      return Object.assign({}, state, {
        IdentityTypeForAccredit: actions.data,
      });
    case DataAction.SEARCH_IDENTITY_USER:
      return Object.assign({}, state, {
        SearchIdentity: actions.data,
      });
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
