import UpUIState from "../../actions/UpUIState";
const AppTipsVisible = (
  state = {
    WebNameTipsVisible: false,
    WebAddressTipsVisible: false,
    ToolNameTipsVisible: false,
    ToolUrlTipsVisible: false
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
