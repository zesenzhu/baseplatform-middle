import DataChange from '../action/data/DataChange'

export default (state = {

    semesterInfo: {},

    semesterloading: true,
    schoolInfo: {},
    subsystemInfo: {},
    periodInfo: [
        { ID: "P1", Name: "小学", Period: "", checked: false },
        { ID: "P2", Name: "初中", Period: "", checked: false },
        { ID: "P3", Name: "高中", Period: "", checked: false }],
    serverAddress:""



}, action) => {

    switch (action.type) {
        case DataChange.GET_CURRENT_SEMESTER_INFO:

            return {
                ...state,
                semesterInfo: action.data


            }
        case DataChange.SEMESTER_LOADING_HIDE:


            return {
                ...state,
                semesterloading: action.data


            }
        case DataChange.REFRESH_SEMESTER_INFO:
            return {
                ...state,
                semesterInfo: action.data
            }
        case DataChange.GET_CURRENT_SCHOOL_INFO:
            //    console.log( action.periodData);
            return {
                ...state,
                schoolInfo: action.data,

            }
        case DataChange.REFRESH_SCHOOL_INFO:
            return {
                ...state,
                schoolInfo: action.data,

            }
        case DataChange.INIT_PERIOD_LIST:
            return {
                ...state,
                periodInfo: action.data
            }
        case DataChange.CET_CURRENT_SUBSYSTEM_INFO:
            return {
                ...state,
                subsystemInfo: action.data
            }
        case DataChange.REFRESH_SUBSYSTEM_INFO:
            return {
                ...state,
                subsystemInfo: action.data
            }
        case DataChange.GET_SERVER_ADDRESS:
            return {
                ...state,
                serverAddress: action.data
            }

        default:
            return state;
    }
};
