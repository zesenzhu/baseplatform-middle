import UpUIState from "../../actions/UpUIState";
const AppTipsVisible = (
  state = {
    UserIDTipsVisible: false,
    PwdTipsVisible: false,
    UserNameTipsVisible: false,
    GenderTipsVisible: false,
    GradeIDTipsVisible: false,
    ClassIDTipsVisible: false,
    SubjectIDsTipsVisible: false,
    SchoolIDTipsVisible: false
    ,ComfirmPwdTipsVisible:false
  },
  actions
) => {
  switch (actions.type) {
    case UpUIState.APP_TIPS_VISIBLE:
      return Object.assign({}, state, { ...actions.data });

    default:
      return state;
  }
};
export default AppTipsVisible;
