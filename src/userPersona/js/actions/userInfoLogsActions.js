export const USER_INFO_LOGS_UPDATE = 'USER_INFO_LOGS_UPDATE';

export const userInfoLosUpdate = (payload)=>{

    return {type:USER_INFO_LOGS_UPDATE,data:payload};

};

export default {

    USER_INFO_LOGS_UPDATE,

    userInfoLosUpdate

}