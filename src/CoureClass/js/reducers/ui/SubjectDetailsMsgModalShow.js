import UpUIState from '../../actions/UpUIState';
const SubjectDetailsMsgModalShow = (state={Show:false},actions) => {
    switch (actions.type) {
        case UpUIState.SUBJECT_DETAILS_MODAL_OPEN:
            return {Show:true};
        case UpUIState.SUBJECT_DETAILS_MODAL_CLOSE:
            return {Show:false};
        default:
            return state;
    }
};
export default  SubjectDetailsMsgModalShow;