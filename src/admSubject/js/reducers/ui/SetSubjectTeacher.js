import UpUIState from '../../actions/UpUIState';
const SetSubjectTeacher = (state = { setSubjectTeacherModalShow: false }, actions) => {
    switch (actions.type) {
        case UpUIState.ADD_SUBJECT_TEACHER_MODAL_OPEN:
            return Object.assign({}, state, { setSubjectTeacherModalShow: true });
        case UpUIState.ADD_SUBJECT_TEACHER_MODAL_CLOSE:
            return Object.assign({}, state, { setSubjectTeacherModalShow: false });
       
        default:
            return state;
    }
};
export default SetSubjectTeacher;