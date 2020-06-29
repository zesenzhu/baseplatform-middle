import UpDataState from "../../actions/UpDataState";
import history from "../../containers/history";

const SetPagiSizeMsg = (
  state = { ClassPagisize: 10, SearchPagisize: 10 },
  actions
) => {
  switch (actions.type) {
    case UpDataState.CLASS_PAGISIZE_MSG:
      return Object.assign({}, state, { ClassPagisize: actions.data });
    case UpDataState.SEARCH_PAGISIZE_MSG:
      return Object.assign({}, state, { SearchPagisize: actions.data });
    default:
      return state;
  }
};

function handleData(data) {
  return data;
}
export default SetPagiSizeMsg;
