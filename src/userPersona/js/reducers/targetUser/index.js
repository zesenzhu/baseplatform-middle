import {TARGET_USER_INFO_UPDATE} from '../../actions/targetUserActions';

const defaultState = {

  UserType:'',

  UserID:''

};

const targetUser = (state,actions) =>{

  switch (actions.type) {

      case TARGET_USER_INFO_UPDATE:

        return {...state,...actions.data};

      default:

          return state;

  }

};
export default targetUser;