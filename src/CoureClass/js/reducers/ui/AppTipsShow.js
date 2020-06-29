import UpUIState from "../../actions/UpUIState";
const AppTipsShow = (
  state = { nameTipsShow: false, subjectTipsShow: false, gradeTipsShow: false },
  actions
) => {
  switch (actions.type) {
    case UpUIState.NAME_TIPS_SHOW_OPEN:
      return Object.assign({}, state, { nameTipsShow: true });
    case UpUIState.NAME_TIPS_SHOW_CLOSE:
      return Object.assign({}, state, { nameTipsShow: false });
    case UpUIState.SUBJECT_TIPS_SHOW_OPEN:
      return Object.assign({}, state, { subjectTipsShow: true });
    case UpUIState.SUBJECT_TIPS_SHOW_CLOSE:
      return Object.assign({}, state, { subjectTipsShow: false });
    case UpUIState.GRADE_TIPS_SHOW_OPEN:
      return Object.assign({}, state, { gradeTipsShow: true });
    case UpUIState.GRADE_TIPS_SHOW_CLOSE:
      return Object.assign({}, state, { gradeTipsShow: false });
    default:
      return state;
  }
};
export default AppTipsShow;
