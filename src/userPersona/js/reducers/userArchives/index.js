import {USER_ARCHIVES_UPDATE} from "../../actions/userArchivesActions";

const defaultState = '';

const userArchives = (state=defaultState,actions)=>{

      switch (actions.type) {

          case USER_ARCHIVES_UPDATE:

              return {...state,...actions.data};

          default:

              return state;

      }

};

export default userArchives;