import UpDataState from '../../actions/UpDataState';
import history from '../../containers/history'


const GetLogDetailsMsg = (state = {}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_LOG_DETAILS_MSG:

            let data = handleData(actions.data, actions.subject, actions.Class)
            return Object.assign({}, state, { tableSource: data });
        default:
            return state;
    }
};

function handleData(data) {

    return data
}
export default GetLogDetailsMsg;