import {USER_INFO_LOGS_UPDATE} from "../../actions/userInfoLogsActions";

const defaultState = [];

const userInfoLogs = (state=defaultState,actions)=>{

    switch (actions.type) {

        case USER_INFO_LOGS_UPDATE:

            return [...actions.data];

        default:

            return state;

    }

};

export default userInfoLogs;