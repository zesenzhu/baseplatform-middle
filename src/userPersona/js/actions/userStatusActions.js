export const USER_STATUS_UPDATE = 'USER_STATUS_UPDATE';

export const userStatusUpdate = (payload)=>{

    return {type:USER_STATUS_UPDATE,data:payload};

};

export default {

    USER_STATUS_UPDATE,

    userStatusUpdate

}