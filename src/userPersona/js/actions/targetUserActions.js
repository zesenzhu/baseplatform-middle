export const TARGET_USER_INFO_UPDATE = 'TARGET_USER_INFO_UPDATE';

export const targetUserInfoUpdate = (payload)=>{

    return {type:TARGET_USER_INFO_UPDATE,data:payload};

};

export default {

    TARGET_USER_INFO_UPDATE,

    targetUserInfoUpdate

}