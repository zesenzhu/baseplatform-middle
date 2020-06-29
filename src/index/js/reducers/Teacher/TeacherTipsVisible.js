import HeaderActions from "../../actions/Teacher/HeaderActions";
import TeacherCustomActions from "../../actions/Teacher/TeacherCustomActions";

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
    case TeacherCustomActions.SET_CUSTOM_TIPS_VISIBLE:
      return Object.assign({}, state, { ...actions.data });

    default:
      return state;
  }
};
export default TeacherTipsVisible;
