import UpDataState from '../../actions/UpDataState';



const GetUserLog = (state = {
    UserLog: [],
    
}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_USER_LOG:
            return Object.assign({}, state, { UserLog: actions.data });

        
        default:
            return state;
    }
};

export default GetUserLog;