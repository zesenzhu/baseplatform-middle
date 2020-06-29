import UpUIState from '../../actions/UpUIState';
const AddStudentModalShow = (state={Show:false},actions) => {
    switch (actions.type) {
        case UpUIState.ADD_STUDENT_MODAL_OPEN:
            return {Show:true};
        case UpUIState.ADD_STUDENT_MODAL_CLOSE:
            return {Show:false};
        default:
            return state;
    }
};
export default  AddStudentModalShow;