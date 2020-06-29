import UpDataState from '../../actions/UpDataState';
const GetTeachingSolutionDetailsMsg = (state = { solutionDetailsData: [] }, actions) => {
    switch (actions.type) {
        case UpDataState.GET_TEACHING_SOLUTION_DETAILS_MSG:
        let data = handleData(actions.data)    
        const {Files,...others} = data;
            return Object.assign({}, state, { solutionDetailsData: Files,...others });
        default:
            return state;
    }
};
function handleData(data) {
    const {Files,...others} = data;
    let newFiles = Files.map((child,index) => {
        return {key:index,OrderNO:index+1,...child}
    })
    return {Files:newFiles,...others};
}
export default GetTeachingSolutionDetailsMsg;