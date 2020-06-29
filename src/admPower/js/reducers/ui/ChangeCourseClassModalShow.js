import UpUIState from '../../actions/UpUIState';
const ChangeCourseClassModalShow = (state={Show:false},actions) => {
    switch (actions.type) {
        case UpUIState.CHANGE_COURSE_CLASS_MODAL_OPEN:
            return {Show:true};
        case UpUIState.CHANGE_COURSE_CLASS_MODAL_CLOSE:
            return {Show:false};
        default:
            return state;
    }
};
export default  ChangeCourseClassModalShow;