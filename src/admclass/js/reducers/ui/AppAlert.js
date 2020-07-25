import PublicAction from "../../actions/PublicAction";
const AppAlert = (state = { appAlert: false, title: "", type: 0 }, actions) => {
  switch (actions.type) {
    case PublicAction.SHOW_ERROR_ALERT:
      return {
        appAlert: true,
        title: actions.msg.title,
        littleTitle: actions.msg.littleTitle,
        type: actions.msg.type,
        onOk: actions.msg.onOk,
        onCancel: actions.msg.onCancel,
        onClose: actions.msg.onClose,
        onHide: actions.msg.onHide,
      };
    case PublicAction.CLOSE_ERROR_ALERT:
      return { ...state, appAlert: false };
    default:
      return state;
  }
};
export default AppAlert;
