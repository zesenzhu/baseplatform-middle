import HandleAction from "../../actions/HandleAction";
const ControlData = (
  state = {
    ModalVisible: {
      CustomIdentityModalVisible: false,
    },
    TipsVisible: {
      IndentityNameTipsVisible: false,
      DescriptionTipsVisible: false,
    },
    TipsTitle: {
      IndentityNameTipsTitle: "身份名称格式有误",
      DescriptionTipsTitle: "身份描述格式有误",
    },
  },
  actions
) => {
  switch (actions.type) {
    case HandleAction.CONTROL_SET_MODAL_VISIBLE:
      return Object.assign({}, state, {
        ModalVisible: { ...state.ModalVisible, ...actions.data },
      });
    case HandleAction.CONTROL_SET_TIPS_TITLE_PARAMS:
      return Object.assign({}, state, {
        TipsTitle: { ...state.TipsTitle, ...actions.data },
      });
    case HandleAction.CONTROL_SET_TIPS_VISIBLE_PARAMS:
      return Object.assign({}, state, {
        TipsVisible: { ...state.TipsVisible, ...actions.data },
      });
    default:
      return state;
  }
};

export default ControlData;
