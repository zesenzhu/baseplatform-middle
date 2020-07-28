import UpUIState from "../../actions/UpUIState";
const TipsVisible = (
  state = {
    PwdTipsShow: false,
    UserIDTipsVisible: false,
    UserNameTipsVisible: false,
    TelphoneTipsVisible:false,
    WeixinTipsVisible:false,
    WeiboTipsVisible:false,
    QQTipsVisible:false,
  },
  actions
) => {
  switch (actions.type) {
    case UpUIState.SET_TIPS_VISIBLE:
        return Object.assign({}, state, actions.data);
    case UpUIState.USER_NAME_TIPS_VISIBLE_OPEN:
      return Object.assign({}, state, { UserNameTipsVisible: true });
    case UpUIState.USER_NAME_TIPS_VISIBLE_CLOSE:
      return Object.assign({}, state, { UserNameTipsVisible: false });
    case UpUIState.USER_ID_TIPS_VISIBLE_OPEN:
      return Object.assign({}, state, { UserIDTipsVisible: true });
    case UpUIState.USER_ID_TIPS_VISIBLE_CLOSE:
      return Object.assign({}, state, { UserIDTipsVisible: false });
    case UpUIState.PWD_TIPS_OPEN:
      return Object.assign({}, state, { PwdTipsShow: true });
    case UpUIState.PWD_TIPS_CLOSE:
      return Object.assign({}, state, { PwdTipsShow: false });
    case UpUIState.ALL_TIPS_VISIBLE_CLOSE:
      return Object.assign({}, state, {
        UserIDTipsVisible: false,
        UserNameTipsVisible: false,
      });
    default:
      return state;
  }
};
export default TipsVisible;
