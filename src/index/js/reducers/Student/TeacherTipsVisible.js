import TeacherCustomActions from "../../actions/Student/TeacherCustomActions";

const TeacherTipsVisible = (
  state = {
    WebNameTipsVisible: false,
    WebAddressTipsVisible: false,
    ToolNameTipsVisible:false,
    ToolUrlTipsVisible:false,

  },
  actions
) => {
  switch (actions.type) {
    case TeacherCustomActions.STU_SET_CUSTOM_TIPS_VISIBLE:
      return Object.assign({}, state, { ...actions.data });

    default:
      return state;
  }
};
export default TeacherTipsVisible;
