import UpUIState from '../../actions/UpUIState';
const SetCourseClassDetailsModalShow = (state = { setCourseClassDetailsMadalShow: false }, actions) => {
    switch (actions.type) {
        case UpUIState.COURSE_CLASS_DETAILS_MODAL_OPEN:
            return Object.assign({}, state, { setCourseClassDetailsMadalShow: true });
        case UpUIState.COURSE_CLASS_DETAILS_MODAL_CLOSE:
            return Object.assign({}, state, { setCourseClassDetailsMadalShow: false });
       
        default:
            return state;
    }
};
export default SetCourseClassDetailsModalShow;