import { postData, getData } from "../../../common/js/fetch";
import UpUIState from './UpUIState';
import CONFIG from '../../../common/js/config';
import 'whatwg-fetch';
import actions from './index'
import Mock from 'mockjs'




//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO';
//获取教学班总览信息
const GET_USER_POWER_MSG = 'GET_USER_POWER_MSG';
//修改教学班总览信息
const SET_USER_POWER_MSG = 'SET_USER_POWER_MSG';

//操作的执行
//获取登录用户信息
const getLoginUser = (data) => {
    return (dispatch) => {    
            dispatch({ type: GET_LOGIN_USER_INFO, data: data});
    }
};
//获取用户权限信息
const getUserPowerMsg = (url) => {
    return (dispatch) => {
        getData(CONFIG.PowerProxy + url, 2).then(res => {
            // console.log(res)
            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
                // console.log(json.Data)
                dispatch({ type: GET_USER_POWER_MSG, data: json.Data });
                dispatch({ type: actions.UpUIState.RIGHT_LOADING_CLOSE });

                const host = window.location.host;

                const protocol = window.location.protocol;

                console.log(document.getElementById("root").offsetHeight);

                window.parent.postMessage({module:'power',height:document.getElementById("root").offsetHeight},`${protocol}//${host}`);


            }
        });
    }
}
//修改用户权限信息
const setUserPowerMsg = (data) => {
    return (dispatch) => {
        dispatch({ type: SET_USER_POWER_MSG, data: data });
    }
}

export default {
    getLoginUser,
    GET_LOGIN_USER_INFO,

    GET_USER_POWER_MSG,
    getUserPowerMsg,
    setUserPowerMsg,
    SET_USER_POWER_MSG



}