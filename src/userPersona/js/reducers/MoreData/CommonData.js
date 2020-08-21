import Actions from '../../actions';

// import DataState from "./../DataState";
import Public from "../../../../common/js/public";
let {CommonActions} = Actions
const CommonData = (state = {}, actions) => {
  let communicationData = {};
  switch (actions.type) {
    case CommonActions.COMMON_SET_HANDLE_APPLICATION_DATA:
      return Object.assign({}, state, {
        HandleApplicationData: {
          ...state.HandleApplicationData,
          ...actions.data,
        },
      });

    default:
      return state;
  }
};

export default CommonData;
