import UpUIState from '../../actions/UpUIState';
const AddCourseClassModalShow = (state={Show:false},actions) => {
    switch (actions.type) {
        case UpUIState.ADD_COURSE_CLASS_MODAL_OPEN:
            return {Show:true};
        case UpUIState.ADD_COURSE_CLASS_MODAL_CLOSE:
            return {Show:false};
        default:
            return state;
    }
};
export default  AddCourseClassModalShow;