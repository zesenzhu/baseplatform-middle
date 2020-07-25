import UpDataState from '../../actions/UpDataState';
const TheTeacherList = (state={},actions) => {
    switch (actions.type) {
        case UpDataState.GET_THE_CLASS_THEACHERS:
            return {...state,...actions.data};
        default:
            return state;
    }
};
export default TheTeacherList;