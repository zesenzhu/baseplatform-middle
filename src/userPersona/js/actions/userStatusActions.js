export const USER_STATUS_UPDATE = 'USER_STATUS_UPDATE';

export const USER_STATUS_STATE_READY = 'USER_STATUS_STATE_READY';

export const USER_STATUS_RECEIVED_STATE_CHANGE = 'USER_STATUS_RECEIVED_STATE_CHANGE';



export const userStatusReady = ()=>{

    return {type:USER_STATUS_STATE_READY};

};

export const userStatusUpdate = (payload)=>{

    return {type:USER_STATUS_UPDATE,data:payload};

};

export const userStatusReceiveData = (payload)=>{

    return {type:USER_STATUS_RECEIVED_STATE_CHANGE,data:payload};

};



export default {

    USER_STATUS_UPDATE,

    USER_STATUS_STATE_READY,

    USER_STATUS_RECEIVED_STATE_CHANGE,

    userStatusReceiveData,

    userStatusUpdate,

    userStatusReady

}