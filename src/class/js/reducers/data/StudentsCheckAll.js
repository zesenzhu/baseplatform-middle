import UpDataState from '../../actions/UpDataState';
const StudentsCheckAll = (state={checkAll:false},actions) => {
    switch (actions.type) {
        case UpDataState.STUDENTS_CHECKED_ALL:
            return {...state,checkAll:true};
        case UpDataState.STUDENTS_CHECKED_NONE:
            return {...state,checkAll:false};
        default:
            return state;
    }
};
export default StudentsCheckAll;