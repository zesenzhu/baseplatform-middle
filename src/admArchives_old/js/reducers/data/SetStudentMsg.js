import UpDataState from '../../actions/UpDataState';


const SetStudentMsg = (state = {initStudentMsg:{},changeStudentMsg:{}}, actions) => {
    switch (actions.type) {
        case UpDataState.SET_INIT_STUDENT_MSG:
            return Object.assign({}, state, { initStudentMsg:actions.data,changeStudentMsg:actions.data });
        case UpDataState.SET_STUDENT_MSG:
            let changeStudentMsg =  Object.assign({},state.changeStudentMsg,{...actions.data})
            return Object.assign({}, state, { changeStudentMsg:changeStudentMsg });

        default:
            return state;
    }
};


export default SetStudentMsg;