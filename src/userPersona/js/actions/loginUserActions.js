export const LOGIN_USER_INFO_UPDATE = 'LOGIN_USER_INFO_UPDATE';

export const loginUserInfoUpdate = (payload) =>{

    return {type:LOGIN_USER_INFO_UPDATE,data:payload};

};

export default {

    loginUserInfoUpdate,

    LOGIN_USER_INFO_UPDATE

}