import UpUIState from '../../actions/UpUIState';
const SubjectTableLoading = (state={TableLoading:true},actions) => {
    switch (actions.type) {
        case UpUIState.SUBJECT_TABLE_LOADING_OPEN:
            return {TableLoading:true};
        case UpUIState.SUBJECT_TABLE_LOADING_CLOSE:
            return {TableLoading:false};
        default:
            return state;
    }
};
export default  SubjectTableLoading;