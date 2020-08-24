import {USER_STATUS_UPDATE} from "../../actions/userStatusActions";

const defaultState = '';

const userStatus = (state=defaultState,actions)=>{

    switch (actions.type) {

        case USER_STATUS_UPDATE:

            return {...state,...actions.data};

        default:

            return state;

    }

};

export default userStatus;