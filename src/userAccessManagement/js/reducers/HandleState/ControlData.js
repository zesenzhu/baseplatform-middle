import HandleAction from "../../actions/HandleAction";
const ControlData = (
  state = { ModalVisible: {}, TipsVisible: {}, TipsTitle: {} },
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
