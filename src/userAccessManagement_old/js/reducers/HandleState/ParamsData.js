import HandleAction from "../../actions/HandleAction";
const ParamsData = (
  state = {
    CustomIdentity: {
      IdentityName: "",
      Description: "",
      UserType: [],
      InitIdentityName: "",
      InitDescription: "",
      InitUserType: [],
      IdentityID: "",
      type: "add", //add,edit
    },
    IdentityPower: {
      IdentityID: "",
      IdentityName: "",
      Description: "",
      UserType: [],
      ModuleIDs: [],
      InitModuleIDs: [],
      type: "edit", //add,edit
    },
    CheckMember: {
      IdentityID: "",
      IdentityCode: "",
      IdentityName: "",
      UserType: [],
      Description: "",
      PageIndex: 0,
      PageSize: 8,
      type: "custom", //自定义：custom,id的为默认
    },
    AddMember: {
      IdentityID: "",
      IdentityCode: "",
      IdentityName: "",
      UserType: [],
      MemberList: [],
      SelectRole: "",
      NodeID: "",
      NodeName: "",
      FullID: [],
      FullName: [],
      NodeType: "tree", //tree,user
      LayoutType: "type", //type,level
      SearchUserWord:'',//搜索关键词
      SearchUserWordVisible:false,//搜索关键词
      SearchPageIndex:-1,
      SearchPageSize:5,
      List: [], //存当前的列表
      //       单个节点数据结构要求：NodeType|NodeLevel|NodeID|FullID

      // 节点内的数据以竖线”|”分隔

      // 多个节点间使用英文逗号”,”分隔，例如：NodeType|NodeLevel|NodeID|FullID,NodeType|NodeLevel|NodeID|FullID
    },
    SearchIdentity: {
      SearchValue: "",
      KeyWord: "",
      CancelBtnShow: "n",
      PageIndex: 1,
      PageSize: 5,
      EditIndex:-1,
      IdentityIDsList:[],
      UserID:''
    },
  },
  actions
) => {
  switch (actions.type) {
    case HandleAction.PARAMS_SET_SEARCH_IDENTITY:
      return Object.assign({}, state, {
        SearchIdentity: { ...state.SearchIdentity, ...actions.data },
      });
    case HandleAction.PARAMS_SET_ADD_MEMBER:
      return Object.assign({}, state, {
        AddMember: { ...state.AddMember, ...actions.data },
      });
    case HandleAction.PARAMS_SET_CHECK_MEMBER:
      return Object.assign({}, state, {
        CheckMember: { ...state.CheckMember, ...actions.data },
      });
    case HandleAction.PARAMS_SET_IDENTITY_POWER:
      return Object.assign({}, state, {
        IdentityPower: { ...state.IdentityPower, ...actions.data },
      });
    case HandleAction.PARAMS_SET_CUETOM_IDENTITY:
      return Object.assign({}, state, {
        CustomIdentity: { ...state.CustomIdentity, ...actions.data },
      });
    default:
      return state;
  }
};

export default ParamsData;
