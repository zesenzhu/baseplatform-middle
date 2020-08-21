import {TARGET_USER_INFO_UPDATE} from '../../actions/targetUserActions';

//目标用户的用户ID和用户类型

const defaultState = {

  UserType:'',

  UserID:''

};

const targetUser = (state=defaultState,actions) =>{

  switch (actions.type) {

      case TARGET_USER_INFO_UPDATE:

        return {...state,...actions.data};

      default:

          return state;

  }

};
export default targetUser;