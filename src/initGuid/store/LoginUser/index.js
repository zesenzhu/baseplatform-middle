export const LOGIN_USER_INFO_UPDATE = 'LOGIN_USER_INFO_UPDATE';

export const loginUserUpdate = (payload)=>{

    return { type:LOGIN_USER_INFO_UPDATE,data:payload };

};

const defaultState = {

  UserType:'',

  UserID:'',

  SchoolID:'',

  UserClass:'',

  UserName:''

};



const LoginUser = (state=defaultState,actions) =>{

    switch (actions.type) {

        case LOGIN_USER_INFO_UPDATE:

            return {...state,...actions.data};

        default:

            return state;

    }

};

export default LoginUser;