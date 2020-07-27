const defaultState = {

    UserName:"",

    PhotoPath:"",

    UserID:'',

    Gender:"",

    UserType:"",

    UserClass:"",

    SchoolID:""

};

const LOGIN_USER_UPDATE = 'LOGIN_USER_UPDATE';

export const loginUserUpdate = (payLoad)=>{

    return {type:LOGIN_USER_UPDATE,data:payLoad};

};

const LoginUser = (state=defaultState,actions)=>{

    switch (actions.type) {

        case LOGIN_USER_UPDATE:

            return {...actions.data};

        default:

            return state;

    }

};

export default LoginUser;
