import UpDataState from '../../actions/UpDataState';


const SetLeaderMsg = (state = {initLeaderMsg:{},changeLeaderMsg:{}}, actions) => {
    switch (actions.type) {
        case UpDataState.SET_INIT_LEADER_MSG:
            return Object.assign({}, state, { initLeaderMsg:actions.data,changeLeaderMsg:actions.data });
        case UpDataState.SET_LEADER_MSG:
            let changeLeaderMsg =  Object.assign({},state.changeLeaderMsg,{...actions.data})
            return Object.assign({}, state, { changeLeaderMsg:changeLeaderMsg });

        default:
            return state;
    }
};


export default SetLeaderMsg;