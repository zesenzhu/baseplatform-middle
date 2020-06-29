import UpDataState from '../../actions/UpDataState';
import history from '../../containers/history'

const GetSubjectTeacherMsg = (state = {}, actions) => {
    switch (actions.type) {
        case UpDataState.GET_SUBJECT_TEACHER_MSG:
                console.log(actions.data)
            let data= handleData(actions.data.TeacherInfoItem)
            return Object.assign({}, state, { teacherList :data });
        default:
            return state;
    }
};

function handleData(data) {
    
    let newdata = data.map((child,index) => {
        return{
            value:child.TeacherID,
            title:child.TeacherName
        }
    })
    return newdata;
}
export default GetSubjectTeacherMsg;