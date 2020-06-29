import UpDataState from '../../actions/UpDataState';
const GetSolutionID = (state = { Solution: {} }, actions) => {
    switch (actions.type) {
        case UpDataState.GET_SOLUTION_ID:
            return Object.assign({}, state, { Solution: actions.data });
        default:
            return state;
    }
};

export default GetSolutionID;