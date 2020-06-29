import UpDataState from '../../actions/UpDataState';
import history from '../../containers/history'

const GetStudentClassMsg = (state = {GradeClass:[],ClassStudent:[]}, actions) => {
    let CheckList = []

    switch (actions.type) {
        case UpDataState.GET_GRADE_CLASS_MSG:
            return Object.assign({}, state, { GradeClass: actions.data });
        case UpDataState.GET_CLASS_STUDENT_MSG:
            let studentList = {};
            actions.data.map((child, index) => {
                studentList[child.StudentID] = child.StudentName;
                CheckList.push(child.StudentID)
            })
            return Object.assign({}, state, { ClassStudent: { CheckList,studentList: studentList, propStudent: actions.data } });
        case UpDataState.SEARCH_CLASS_STUDENT_MSG:
            let searchStudentList = {};
            actions.data.map((child, index) => {
                searchStudentList[child.StudentID] = child.StudentName;
                CheckList.push(child.StudentID)

            })
            return Object.assign({}, state, { ClassStudent: { CheckList,studentList: searchStudentList, propStudent: actions.data } });
        default:
            return state;
    }
};

function handleData(data) {

    let newdata = data.map((child, index) => {
        return {
            value: child.teacherID,
            title: child.teacherName
        }
    })
    return newdata;
}
export default GetStudentClassMsg;