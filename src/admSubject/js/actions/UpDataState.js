import { postData, getData } from "../../../common/js/fetch";
import UpUIState from './UpUIState';
import CONFIG from '../../../common/js/config';
import 'whatwg-fetch';
import actions from './index'




//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO';


// 获取学校学科信息
const GET_SUBJECT_MSG = 'GET_SUBJECT_MSG';
// 获取学校学段信息
const GET_PERIOD_MSG = 'GET_PERIOD_MSG';
// 弹窗获取学校教师信息
const GET_TEACHER_MSG = 'GET_TEACHER_MSG'
// 编辑弹窗信息
const CHANGE_SUBJECT_MODAL_MSG = 'CHANGE_SUBJECT_MODAL_MSG'
const HANDLE_SUBJECT_MODAL_MSG = 'HANDLE_SUBJECT_MODAL_MSG'
const ADD_SUBJECT_MODAL_MSG = 'ADD_SUBJECT_MODAL_MSG'
const HANDLE_SUBJECT_NAME_MODAL_MSG = 'HANDLE_SUBJECT_NAME_MODAL_MSG'
const GET_SUBJECT_MODAL_MSG = 'GET_SUBJECT_MODAL_MSG'

//设置教研组长
const SET_SUBJECT_TEACHER_MSG = 'SET_SUBJECT_TEACHER_MSG'
const GET_SUBJECT_TEACHER_MSG = 'GET_SUBJECT_TEACHER_MSG'
const SET_SUBJECT_TEACHER_MSG_All = 'SET_SUBJECT_TEACHER_MSG_All'

//操作的执行
//获取登录用户信息
const getLoginUser = (data) => {
    return (dispatch) => {
        // // console.log(data)
        dispatch({ type: GET_LOGIN_USER_INFO, data: data });

    }
};
//获取学校学段信息
const getPeriodMsg = (url) => {
    return (dispatch) => {
        getData(CONFIG.SubjectProxy + url,2).then(res => {

            return res.json()
        }).then(json => {
           if (json.StatusCode === 200) {
                dispatch({ type: GET_PERIOD_MSG, data: json.Data });
            }
        });
    }
}
//获取学科信息
const getSubjectMsg = (url) => {
    return (dispatch) => {

        dispatch({ type: actions.UpUIState.SUBJECT_TABLE_LOADING_OPEN });
        getData(CONFIG.SubjectProxy + url,2).then(res => {
            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
            dispatch({ type: actions.UpUIState.SUBJECT_TABLE_LOADING_CLOSE });
                dispatch({ type: GET_SUBJECT_MSG, data: json.Data });
            }
        });
    }
}
//获取学校教师信息
const getTeacherMsg = (url) => {
    return (dispatch) => {
        getData(CONFIG.Xproxy + url,2).then(res => {

            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
                // console.log(json.Data)

                dispatch({ type: GET_TEACHER_MSG, data: json.Data });
                dispatch({ type: actions.UpUIState.SUBJECT_DETAILS_MODAL_OPEN });
            }
        });
    }
}

// 编辑弹窗信息
const changeSubjectModalMsg = (data) => {
    return {
        type: CHANGE_SUBJECT_MODAL_MSG,
        data: data
    }
};
const handleSubjectModalMsg = (data) => {
    return {
        type: HANDLE_SUBJECT_MODAL_MSG,
        data: data
    }
};
const addSubjectModalMsg = (data) => {
    return {
        type: ADD_SUBJECT_MODAL_MSG,
        data: data
    }
};
const handleSubjectNameModalMsg = (data) => {
    return {
        type: HANDLE_SUBJECT_NAME_MODAL_MSG,
        data: data
    }
};

const getSubjectModalMsg = (url) => {
    return (dispatch) => {
        getData(CONFIG.SubjectProxy + url,2).then(res => {
            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
                // console.log(json.Data)
                dispatch({ type: GET_SUBJECT_MODAL_MSG, data: json.Data });

            }
        });
    }
}


//设置教研组长
const getSubjectTeacherMsg = (url, grades, allGrades = []) => {
    return (dispatch) => {
        getData(CONFIG.SubjectProxy + url,2).then(res => {
            dispatch({ type: actions.UpUIState.SEARCH_LOADING_CLOSE });

            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
                // console.log(json.Data)
                if (grades === 'All') {

                    dispatch({ type: SET_SUBJECT_TEACHER_MSG_All, data: { Teacher: json.Data.TeacherInfoItem, allGrades: allGrades } });

                } else
                    dispatch({ type: SET_SUBJECT_TEACHER_MSG, data: { Teacher: json.Data.TeacherInfoItem, grades: grades } });

            }
        });
    }
}
const setSubjectTeacherMsg = (data) => {
    return {
        type: GET_SUBJECT_TEACHER_MSG,
        data: data
    }
};
export default {
    getLoginUser,
    GET_LOGIN_USER_INFO,
    getSubjectMsg,
    GET_SUBJECT_MSG,
    getPeriodMsg,
    GET_PERIOD_MSG,
    getTeacherMsg,
    GET_TEACHER_MSG,
    changeSubjectModalMsg,
    CHANGE_SUBJECT_MODAL_MSG,
    handleSubjectModalMsg,
    HANDLE_SUBJECT_MODAL_MSG,
    addSubjectModalMsg,
    ADD_SUBJECT_MODAL_MSG,
    handleSubjectNameModalMsg,
    HANDLE_SUBJECT_NAME_MODAL_MSG,
    getSubjectModalMsg,
    GET_SUBJECT_MODAL_MSG,
    getSubjectTeacherMsg,
    SET_SUBJECT_TEACHER_MSG,
    setSubjectTeacherMsg,
    GET_SUBJECT_TEACHER_MSG,
    SET_SUBJECT_TEACHER_MSG_All

}