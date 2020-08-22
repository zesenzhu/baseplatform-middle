import {APP_LOADING_HIDE} from "../../actions/appLoadingActions";

const defaultState = true;

const appLoading = (state=defaultState,actions)=>{

      switch (actions.type) {

          case APP_LOADING_HIDE:

              return false ;

          default:

              return state;

      }

};

export default appLoading;