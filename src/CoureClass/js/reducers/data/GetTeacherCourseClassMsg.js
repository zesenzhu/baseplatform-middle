import UpDataState from '../../actions/UpDataState';
import history from '../../containers/history'

const GetTeacherCourseClassMsg = (state = {CourseClassSource : []}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_TECHER_COURSE_CLASS_MSG:
            let data = handleData(actions.data)
            return Object.assign({}, state, {CourseClassSource: data });
        default:
            return state;
    }
};

function handleData(data) {
    return data;
}
export default GetTeacherCourseClassMsg;