import {TERM_INFO_UPDATE} from "../../actions/termInfoActions";

const defaultState = {};

const termInfo = (state=defaultState,actions)=>{

      switch (actions.type) {

          case TERM_INFO_UPDATE:

              return {...state,...actions.data};

          default:

              return state;

      }

};

export default termInfo;