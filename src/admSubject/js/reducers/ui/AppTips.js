import UpUIState from "../../actions/UpUIState";
const AppTips = (
  state = { SubjectNameTips: false, GradeTips: false },
  actions
) => {
  switch (actions.type) {
    case UpUIState.TIPS_VISIBLE_OPEN:
      return Object.assign({}, state, { SubjectNameTips: true });
    case UpUIState.TIPS_VISIBLE_CLOSE:
      return Object.assign({}, state, { SubjectNameTips: false });
    case UpUIState.TIPS_VISIBLE_GRADE_OPEN:
      return Object.assign({}, state, { GradeTips: true });
    case UpUIState.TIPS_VISIBLE_GRADE_CLOSE:
      return Object.assign({}, state, { GradeTips: false });

    default:
      return state;
  }
};
export default AppTips;
