import { postData, getData } from "../../../common/js/fetch";
import UpUIState from './UpUIState';
import CONFIG from '../../../common/js/config';
import 'whatwg-fetch';
import actions from './index'




//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO';
// 获取教学方案
const GET_TEACHING_SOLUTION_MSG = 'GET_TEACHING_SOLUTION_MSG'
// 查看教学方案
const GET_TEACHING_SOLUTION_DETAILS_MSG = 'GET_TEACHING_SOLUTION_DETAILS_MSG'
// 查看教学学期
const GET_TEACHING_SOLUTION_TERM_MSG = 'GET_TEACHING_SOLUTION_TERM_MSG'
// 重命名方案ID
const GET_SOLUTION_ID = 'GET_SOLUTION_ID'
//操作的执行
//获取登录用户信息
const getLoginUser = (data) => {
    return (dispatch) => {
            dispatch({ type: GET_LOGIN_USER_INFO, data: data });
    }
};


//获取教学方案
const getTeachingSolutionMsg = (url) => {
    return (dispatch) => {
        getData(CONFIG.TeachingSolutionProxy + url, 2).then(res => {
            dispatch({ type: actions.UpUIState.APP_LOADING_OPEN });


            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {

                dispatch({ type: GET_TEACHING_SOLUTION_MSG, data: json.Data });
                dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });

            }
        });
    }
}
//获取教学方案详情
const getTeachingSolutionDetailsMsg = (url) => {
    return (dispatch) => {
        getData(CONFIG.TeachingSolutionProxy + url, 2).then(res => {
            dispatch(actions.UpUIState.ModalLoadingOpen());


            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {

                dispatch({ type: GET_TEACHING_SOLUTION_DETAILS_MSG, data: json.Data });
                dispatch(actions.UpUIState.ModalLoadingClose());


            }
        });
    }
}
//获取教学方案详情
const getTeachingSolutionTermMsg = (url) => {
    return (dispatch) => {
        getData(CONFIG.TeachingSolutionProxy + url, 2).then(res => {
            // dispatch(actions.UpUIState.ModalLoadingOpen());


            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {

                dispatch({ type: GET_TEACHING_SOLUTION_TERM_MSG, data: json.Data });
                // dispatch(actions.UpUIState.ModalLoadingClose());


            }
        });
    }
}
//获取方案ID
const getSolutionID = (id) => {
    return (dispatch) => {
        dispatch({ type: GET_SOLUTION_ID, data: id });
    }
};


export default {
    getLoginUser,
    GET_LOGIN_USER_INFO,


    getTeachingSolutionMsg,
    GET_TEACHING_SOLUTION_MSG,

    GET_TEACHING_SOLUTION_DETAILS_MSG,
    getTeachingSolutionDetailsMsg,

    GET_SOLUTION_ID,
    getSolutionID,
    GET_TEACHING_SOLUTION_TERM_MSG,
    getTeachingSolutionTermMsg

}