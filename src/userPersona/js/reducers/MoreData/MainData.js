// import MainActions from "../../../actions/MainActions";
import Actions from '../../actions';
// import DataState from "./../DataState";
import Public from "../../../../common/js/public";
import { func } from "prop-types";
import Config from "../../../../common/js/config";
let {MainActions} = Actions
const MainData = (state = {}, actions) => {
  let ApplyModuleSort = [];
  switch (actions.type) {
    case MainActions.MAIN_GET_RES_HTTP_SERVER_ADDR:
      return Object.assign({}, state, {
        ResHttpServerAddr: actions.data,
      });

    default:
      return state;
  }
};

export default MainData;
