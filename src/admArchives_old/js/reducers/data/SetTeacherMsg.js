import UpDataState from '../../actions/UpDataState';


const SetTeacherMsg = (state = {initTeacherMsg:{},changeTeacherMsg:{},addTeacherSubject:{value:'all',title:'全部学科'}}, actions) => {
    switch (actions.type) {
        case UpDataState.SET_INIT_TEACHER_MSG:
            return Object.assign({}, state, { initTeacherMsg:actions.data,changeTeacherMsg:actions.data });
        case UpDataState.SET_TEACHER_MSG:
            let changeTeacherMsg =  Object.assign({},state.changeTeacherMsg,{...actions.data})
            return Object.assign({}, state, { changeTeacherMsg:changeTeacherMsg });
            case UpDataState.SET_SUBJECT_OF_ADD_TEACHER:
                 
                return Object.assign({}, state, { addTeacherSubject:actions.data });
        default:
            return state;
    }
};


export default SetTeacherMsg;