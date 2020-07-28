import UpUIState from "../../actions/UpUIState";
const AppTipsVisible = (
  state = {
    SchoolNameTipsVisible: false,
    SchoolCodeTipsVisible: false,
    SchoolLevelTipsVisible: false,
    SchoolSessionTypeTipsVisible: false,
    SchoolTelTipsVisible: false,
    SchoolLinkmanTipsVisible: false,
     
  },
  actions
) => {
  switch (actions.type) {
    case UpUIState.APP_TIPS_VISIBLE:
      return Object.assign({}, state, { ...actions.data });
      case UpUIState.APP_TIPS_ALL_CLOSE:
        return Object.assign({}, state, { SchoolNameTipsVisible: false,
          SchoolCodeTipsVisible: false,
          SchoolLevelTipsVisible: false,
          SchoolSessionTypeTipsVisible: false,
          SchoolTelTipsVisible: false,
          SchoolLinkmanTipsVisible: false, });
    default:
      return state;
  }
};
export default AppTipsVisible;
