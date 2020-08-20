import {LOGIN_USER_INFO_UPDATE} from "../../actions/loginUserActions";

const defaultState = {

    SchoolID:'',

    UserID:'',

    UserName:'',

    UserClass:'',

    UserType:''

};

const loginUser = (state=defaultState,actions)=>{

      switch (actions.type) {

          case LOGIN_USER_INFO_UPDATE:

              return actions.data ;

          default:

              return state;

      }

};

export default loginUser;