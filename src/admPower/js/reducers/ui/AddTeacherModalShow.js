import UpUIState from '../../actions/UpUIState';
const AddTeacherModalShow = (state={Show:false},actions) => {
    switch (actions.type) {
        case UpUIState.ADD_TEACHER_MODAL_OPEN:
            return {Show:true};
        case UpUIState.ADD_TEACHER_MODAL_CLOSE:
            return {Show:false};
        default:
            return state;
    }
};
export default  AddTeacherModalShow;