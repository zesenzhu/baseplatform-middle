import UpDataState from '../../actions/UpDataState';
import history from '../../containers/history'

const GetSubjectAllMsg = (state = {}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_SUBJECT_ALL_MSG:
            let data = {};
            data[actions.subject] = handleData(actions.data, actions.subject)
            return Object.assign({}, state, { ...data });
        default:
            return state;
    }
};

function handleData(data, subject) {
    return data;
}
export default GetSubjectAllMsg;