import HandleAction from "../../actions/HandleAction";
const ParamsData = (state = {}, actions) => {
  switch (actions.type) {
    // case HandleAction.MAIN_GET_ALL_LOG_TO_PAGE:
    //   return Object.assign({}, state, {
    //     LogRecordData: actions.data,
    //   });
    default:
      return state;
  }
};

export default ParamsData;

