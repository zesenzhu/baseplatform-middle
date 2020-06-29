import UpDataState from '../../actions/UpDataState';


const GetGraduateMsg = (state = { GraduateChangeMsg: {}, GraduateInitMsg: {}, GraduateContactChangeMsg: {}, GraduateContactInitMsg: {} }, actions) => {
    // let returnData = {grades:null};
    let GraduateChangeMsg = {};
    let GraduateInitMsg = {}
    let GraduateContactChangeMsg = {};
    let GraduateContactInitMsg = {}
    switch (actions.type) {
        case UpDataState.GET_GRADUATE_MSG:
            return Object.assign({}, state, { GraduateChangeMsg: actions.data, GraduateInitMsg: actions.data });
        case UpDataState.SET_GRADUATE_MSG:
            GraduateChangeMsg = Object.assign({}, state.GraduateChangeMsg, { ...actions.data })
            return Object.assign({}, state, { GraduateChangeMsg: GraduateChangeMsg })
        case UpDataState.GET_GRADUATE_CONTACT_MSG:
            return Object.assign({}, state, { GraduateContactChangeMsg: actions.data, GraduateContactInitMsg: actions.data });
        case UpDataState.SET_GRADUATE_CONTACT_MSG:
            GraduateContactChangeMsg = Object.assign({}, state.GraduateContactChangeMsg, { ...actions.data })
            return Object.assign({}, state, { GraduateContactChangeMsg: GraduateContactChangeMsg })
        default:
            return state;
    }
};


export default GetGraduateMsg;