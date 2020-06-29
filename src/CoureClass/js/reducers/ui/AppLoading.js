import UpUIState from "../../actions/UpUIState";
const AppLoading = (
  state = {
    teacherAddLoading: false,
    appLoading: true,
    appDynamicLoading: false,
    classStudentLoading: false,
    rightLoading: false,
    TableLoading: false,
    modalLoading: false,
    searchLoading: false,
    studentLoading: false,
    teacherLoading: false
  },
  actions
) => {
  switch (actions.type) {
    case UpUIState.APP_LOADING_OPEN:
      return Object.assign({}, state, { appLoading: true });
    case UpUIState.APP_LOADING_CLOSE:
      return Object.assign({}, state, { appLoading: false });
    case UpUIState.RIGHT_LOADING_OPEN:
      return Object.assign({}, state, { rightLoading: true });
    case UpUIState.RIGHT_LOADING_CLOSE:
      return Object.assign({}, state, { rightLoading: false });
    case UpUIState.TABLE_LOADING_OPEN:
      return Object.assign({}, state, { TableLoading: true });
    case UpUIState.TABLE_LOADING_CLOSE:
      return Object.assign({}, state, { TableLoading: false });
    case UpUIState.MODAL_LOADING_OPEN:
      return Object.assign({}, state, { modalLoading: true });
    case UpUIState.MODAL_LOADING_CLOSE:
      return Object.assign({}, state, { modalLoading: false });
    case UpUIState.SEARCH_LOADING_OPEN:
      return Object.assign({}, state, { searchLoading: true });
    case UpUIState.SEARCH_LOADING_CLOSE:
      return Object.assign({}, state, { searchLoading: false });
    case UpUIState.TEACHER_LOADING_MODAL_OPEN:
      return Object.assign({}, state, { teacherLoading: true });
    case UpUIState.TEACHER_LOADING_MODAL_COLSE:
      return Object.assign({}, state, { teacherLoading: false });
    case UpUIState.STUDENT_LOADING_MODAL_OPEN:
      return Object.assign({}, state, { studentLoading: true });
    case UpUIState.STUDENT_LOADING_MODAL_COLSE:
      return Object.assign({}, state, { studentLoading: false });
    case UpUIState.CLASS_STUDENT_LOADING_MODAL_OPEN:
      return Object.assign({}, state, { classStudentLoading: true });
    case UpUIState.CLASS_STUDENT_LOADING_MODAL_COLSE:
      return Object.assign({}, state, { classStudentLoading: false });
    case UpUIState.COURSE_CLASS_DYNAMIC_LOADING_OPEN:
      return Object.assign({}, state, { appDynamicLoading: true });
    case UpUIState.COURSE_CLASS_DYNAMIC_LOADING_CLOSE:
      return Object.assign({}, state, { appDynamicLoading: false });
    case UpUIState.TEACHER_ADD_COURECLASS_LOADING_OPEN:
      return Object.assign({}, state, { teacherAddLoading: true });
    case UpUIState.TEACHER_ADD_COURECLASS_LOADING_CLOSE:
      return Object.assign({}, state, { teacherAddLoading: false });
    default:
      return state;
  }
};
export default AppLoading;
