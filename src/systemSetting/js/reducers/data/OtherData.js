import UpDataState from "../../action/data/UpDataState";

const OtherData = (
  state = {
    SysUrl: [],
  },
  actions
) => {
  let InitSystemData = {};
  switch (actions.type) {
    case UpDataState.MAIN_GET_SUB_SYSTEMS_MAIN_SERVER:
      return Object.assign({}, state, {
        SysUrl: actions.data,
      });
    default:
      return state;
  }
};

export default OtherData;
