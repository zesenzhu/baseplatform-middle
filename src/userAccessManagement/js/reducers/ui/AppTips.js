import UpUIState from "../../actions/UpUIState";
const AppTips = (
  state = {
    SchoolCodeTips: "",
    SchoolNameTips: "",
    SchoolLevelTips: "",
    SchoolSessionTypeTips: "",
    SchoolTelTips: "",
    SchoolLinkmanTips: "",
  },
  action
) => {
  switch (action.type) {
    case UpUIState.SET_APP_TIPS:
      return { ...state, ...action.data };
      break;

    default:
      return state;
  }
};
export default AppTips;
