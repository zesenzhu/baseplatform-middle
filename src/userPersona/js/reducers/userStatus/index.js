import {USER_STATUS_UPDATE,USER_STATUS_STATE_READY,USER_STATUS_RECEIVED_STATE_CHANGE} from "../../actions/userStatusActions";

const defaultState = {

    ready:false,

    receiveData:false

};

const userStatus = (state=defaultState,actions)=>{

    switch (actions.type) {

        case USER_STATUS_UPDATE:

            return {...state,...actions.data};

        case USER_STATUS_STATE_READY:

            return {...state,ready:true};

        case USER_STATUS_RECEIVED_STATE_CHANGE:

            return {...state,receiveData:actions.data};

        default:

            return state;

    }

};

export default userStatus;