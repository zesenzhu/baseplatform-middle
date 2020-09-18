import UpUIState from "../../actions/UpUIState";
const AppLoading = (
  state = {
    TableLoading: false,
    appLoading: true,
    modalLoading: false,
    searchLoading: false,
    ContentLoading: false,
  },
  actions
) => {
  switch (actions.type) {
    case UpUIState.APP_LOADING_OPEN:
      return Object.assign({}, state, { appLoading: true });
    case UpUIState.APP_LOADING_CLOSE:
      return Object.assign({}, state, { appLoading: false });
    case UpUIState.MODAL_LOADING_OPEN:
      return Object.assign({}, state, { modalLoading: true });
    case UpUIState.MODAL_LOADING_CLOSE:
      return Object.assign({}, state, { modalLoading: false });
    case UpUIState.SEARCH_LOADING_OPEN:
      return Object.assign({}, state, { searchLoading: true });
    case UpUIState.SEARCH_LOADING_CLOSE:
      return Object.assign({}, state, { searchLoading: false });
    case UpUIState.TABLE_LOADING_OPEN:
      return Object.assign({}, state, { TableLoading: true });
    case UpUIState.TABLE_LOADING_CLOSE:
      return Object.assign({}, state, { TableLoading: false });
      case UpUIState.CONTENT_LOADING_OPEN:
      return Object.assign({}, state, { ContentLoading: true });
    case UpUIState.CONTENT_LOADING_CLOSE:
      return Object.assign({}, state, { ContentLoading: false });
    default:
      return state;
  }
};
export default AppLoading;
