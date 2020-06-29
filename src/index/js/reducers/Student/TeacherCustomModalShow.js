import HeaderActions from "../../actions/Student/HeaderActions";
import TeacherCustomActions from "../../actions/Student/TeacherCustomActions";

const TeacherCustomModalShow = (
  state = {
    Show: false,
    key: "tool",
    AddWebsiteCustomModalShow: false,
    AddToolCustomModalShow: false,
    EditToolCustomModalShow: false,
    EditCombineCustomModalShow: false
  },
  actions
) => {
  switch (actions.type) {
    case HeaderActions.STUDENT_CUSTOM_MODAL_OPEN:
      return Object.assign({}, state, { Show: true, key: actions.key });
    case HeaderActions.STUDENT_CUSTOM_MODAL_CLOSE:
      return Object.assign({}, state, { Show: false, key: actions.key });
    case TeacherCustomActions.STU_ADD_WEBSITE_CUSTOM_MODAL_OPEN:
      return Object.assign({}, state, { AddWebsiteCustomModalShow: true });
    case TeacherCustomActions.STU_ADD_WEBSITE_CUSTOM_MODAL_CLOSE:
      return Object.assign({}, state, { AddWebsiteCustomModalShow: false });
    case TeacherCustomActions.STU_EDIT_WEBSITE_CUSTOM_MODAL_OPEN:
      return Object.assign({}, state, { EditWebsiteCustomModalShow: true });
    case TeacherCustomActions.STU_EDIT_WEBSITE_CUSTOM_MODAL_CLOSE:
      return Object.assign({}, state, { EditWebsiteCustomModalShow: false });
    case TeacherCustomActions.STU_ADD_TOOL_CUSTOM_MODAL_OPEN:
      return Object.assign({}, state, { AddToolCustomModalShow: true });
    case TeacherCustomActions.STU_ADD_TOOL_CUSTOM_MODAL_CLOSE:
      return Object.assign({}, state, { AddToolCustomModalShow: false });
    case TeacherCustomActions.STU_EDIT_TOOL_CUSTOM_MODAL_OPEN:
      return Object.assign({}, state, { EditToolCustomModalShow: true });
    case TeacherCustomActions.STU_EDIT_TOOL_CUSTOM_MODAL_CLOSE:
      return Object.assign({}, state, { EditToolCustomModalShow: false });
      case TeacherCustomActions.STU_EDIT_COMBINE_CUSTOM_MODAL_OPEN:
      return Object.assign({}, state, { EditCombineCustomModalShow: true });
    case TeacherCustomActions.STU_EDIT_COMBINE_CUSTOM_MODAL_CLOSE:
      return Object.assign({}, state, { EditCombineCustomModalShow: false });
    default:
      return state;
  }
};
export default TeacherCustomModalShow;
