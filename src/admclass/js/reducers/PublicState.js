import PublicAction from "../actions/PublicAction";
const PublicState = (
  state = {
    Loading: {
      AppLoading: true,
      ModalLoading: false,
      TableLoading: false,
      ContentLoading: false,
    },
    Alert: {
      appAlert: false,
      title: "",
      type: 0,
    },
    LoginMsg: {
      isLogin: false,
      UserName: "",
      PhotoPath: "",
      UserID: "",
      Gender: "",
      UserType: "",
      UserClass: "",
      SchoolID: "",
    },
  },
  actions
) => {
  switch (actions.type) {
    case PublicAction.SHOW_ERROR_ALERT:
      return Object.assign({}, state, {
        Alert: {
          ...state.Alert,
          appAlert: true,
          title: actions.msg.title,
          littleTitle: actions.msg.littleTitle,
          type: actions.msg.type,
          onOk: actions.msg.onOk,
          onCancel: actions.msg.onCancel,
          onClose: actions.msg.onClose,
          onHide: actions.msg.onHide,
        },
      });

    case PublicAction.CLOSE_ERROR_ALERT:
      return Object.assign({}, state, {
        Alert: { ...state.Alert, appAlert: false },
      });

    case PublicAction.APP_LOADING_OPEN:
      return Object.assign({}, state, {
        Loading: { ...state.Loading, AppLoading: true },
      });
    case PublicAction.APP_LOADING_CLOSE:
      return Object.assign({}, state, {
        Loading: { ...state.Loading, AppLoading: false },
      });
    case PublicAction.MODAL_LOADING_OPEN:
      return Object.assign({}, state, {
        Loading: { ...state.Loading, ModalLoading: true },
      });
    case PublicAction.MODAL_LOADING_CLOSE:
      return Object.assign({}, state, {
        Loading: { ...state.Loading, ModalLoading: false },
      });
    case PublicAction.TABLE_LOADING_OPEN:
      return Object.assign({}, state, {
        Loading: { ...state.Loading, TableLoading: true },
      });
    case PublicAction.TABLE_LOADING_CLOSE:
      return Object.assign({}, state, {
        Loading: { ...state.Loading, TableLoading: false },
      });

    case PublicAction.GET_LOGIN_USER_INFO:
      return Object.assign({}, state, {
        LoginMsg: { ...state.LoginMsg, isLogin: true, ...actions.data },
      });

    default:
      return state;
  }
};
export default PublicState;
