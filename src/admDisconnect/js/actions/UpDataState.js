import {postData,getData} from "../../../common/js/fetch";
import UpUIState from './UpUIState';
import CONFIG from '../../../common/js/config';
import 'whatwg-fetch';



//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO';
//获取所有年级总览信息
const  GET_ALL_USER_PREVIEW = 'GET_ALL_USER_PREVIEW';
//获取学生档案信息
const  GET_GRADE_STUDENT_PREVIEW = 'GET_GRADE_STUDENT_PREVIEW';
//获取教师档案信息
const  GET_SUBJECT_TEACHER_PREVIEW = 'GET_SUBJECT_TEACHER_PREVIEW';
//获取管理员档案信息
const  GET_ADMIN_PREVIEW = 'GET_ADMIN_PREVIEW';
//获取领导档案信息
const  GET_SCHOOL_LEADER_PREVIEW = 'GET_SCHOOL_LEADER_PREVIEW';
//获取年级班级信息
const  GET_GRADE_CLASS_MSG = 'GET_GRADE_CLASS_MSG';
//获取学科信息
const GET_SUBJECT_TEACHER_MSG = 'GET_SUBJECT_TEACHER_MSG';
//修改管理员信息
const SET_ADMIN_PREVIEW = 'SET_ADMIN_PREVIEW';
//改变input值
const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';
// 获取用户信息
const GET_USER_MSG = 'GET_USER_MSG'

//操作的执行
//获取登录用户信息
const  getLoginUser = (url) => {
    return (dispatch)=>{
        getData(CONFIG.proxy+url).then(res=>res.json()).then(json=>{
           dispatch({type:GET_LOGIN_USER_INFO,data:json.data.result});
        });
    }
};
//获取所有用户总览信息
const getAllUserPreview = (url) =>{
    return (dispatch)=>{
        // console.log(CONFIG.proxy+url);
        getData(CONFIG.proxy+url,2).then(res=>{
            if(res.status === '401'){
                console.log('错误码：'+ res.status)
            }
            return res.json()}).then(json=>{
            if(json.status === 400){
                console.log(json.status)
            }else if(json.status === 200){
                dispatch({type:GET_ALL_USER_PREVIEW,data:json.data});
                dispatch({ type: UpUIState.APP_LOADING_CLOSE });
            }
           
        });
    }
}

//获取学生账号信息/改
const getGradeStudentPreview = (url) =>{
    let pageIndex = url.split('PageIndex');
    let pageSize = url.split('PageSize');

    if(pageIndex[0]===url){
        pageIndex = 0;
        pageSize = 10;
    }else{
        pageIndex= pageIndex[1].split('&')[0].split('=')[1]
        pageSize= pageSize[1].split('&')[0].split('=')[1]
    }
    return (dispatch)=>{
        dispatch({ type: UpUIState.APP_LOADING_OPEN });

        getData(CONFIG.UserAccountProxy+url,2).then(res=>{
            if(res.Status === '401'){
                console.log('错误码：'+ res.Status)
            }
            return res.json()}).then(json=>{
            if(json.Status === 400){
                console.log(json.Status)
            }else if(json.Status === 200){
                dispatch({type:GET_GRADE_STUDENT_PREVIEW,data:json.Data,pageIndex:pageIndex,pageSize:pageSize});
                dispatch({ type: UpUIState.APP_LOADING_CLOSE });
            }
           
        });
    }
}

//获取教师档案信息
const getSubjectTeacherPreview = (url) =>{
    let pageIndex = url.split('PageIndex');
    let pageSize = url.split('PageSize');

    if(pageIndex[0]===url){
        pageIndex = 0;
        pageSize = 10;
    }else{
        pageIndex= pageIndex[1].split('&')[0].split('=')[1]
        pageSize= pageSize[1].split('&')[0].split('=')[1]
    }
    return (dispatch)=>{
        dispatch({ type: UpUIState.APP_LOADING_OPEN });
        getData(CONFIG.UserAccountProxy+url,2).then(res=>{
            if(res.Status === '401'){
                console.log('错误码：'+ res.Status)
            }
            return res.json()}).then(json=>{
            if(json.Status === 400){
                console.log(json.Status)
            }else if(json.Status === 200){
                dispatch({type:GET_SUBJECT_TEACHER_PREVIEW,data:json.Data,pageIndex:pageIndex,pageSize:pageSize});
                dispatch({ type: UpUIState.APP_LOADING_CLOSE });
            }
           
        });
    }
}
//获取领导档案信息
const getSchoolLeaderPreview = (url) =>{
    let pageIndex = url.split('PageIndex');
    let pageSize = url.split('PageSize');

    if(pageIndex[0]===url){
        pageIndex = 0;
        pageSize = 10;
    }else{
        pageIndex= pageIndex[1].split('&')[0].split('=')[1]
        pageSize= pageSize[1].split('&')[0].split('=')[1]
    }
    return (dispatch)=>{
        console.log(CONFIG.proxy+url);
        getData(CONFIG.proxy+url,2).then(res=>{
            if(res.status === '401'){
                console.log('错误码：'+ res.status)
            }
            return res.json()}).then(json=>{
            if(json.status === 400){
            }else if(json.status === 200){
                dispatch({type:GET_SCHOOL_LEADER_PREVIEW,data:json.data});
                dispatch({ type: UpUIState.APP_LOADING_CLOSE });
            }
           
        });
    }
}
//获取管理员档案信息
const getAdminPreview = (url) =>{
    let pageIndex = url.split('PageIndex');
    let pageSize = url.split('PageSize');

    if(pageIndex[0]===url){
        pageIndex = 0;
        pageSize = 10;
    }else{
        pageIndex= pageIndex[1].split('&')[0].split('=')[1]
        pageSize= pageSize[1].split('&')[0].split('=')[1]
    }
    return (dispatch)=>{
        dispatch({ type: UpUIState.APP_LOADING_OPEN });
        getData(CONFIG.UserAccountProxy+url,2).then(res=>{
            if(res.Status === '401'){
                console.log('错误码：'+ res.Status)
            }
            return res.json()}).then(json=>{
            if(json.Status === 400){
                console.log(json.Status)
            }else if(json.Status === 200){
                dispatch({type:GET_ADMIN_PREVIEW,data:json.Data,pageIndex:pageIndex,pageSize:pageSize});
                dispatch({ type: UpUIState.APP_LOADING_CLOSE });
            }
           
        });
    }
}
//获取管理员档案信息
const setAdminPreview = (data) =>{
    return (dispatch)=>{
                dispatch({type:SET_ADMIN_PREVIEW,data:data});
    }
}
//获取年级班级信息/改
const getGradeClassMsg = (url) =>{
    return (dispatch)=>{
        getData(CONFIG.UserInfoProxy+url,2).then(res=>{
            if(res.Status === '401'){
                console.log('错误：'+ res.Msg)
            }
            return res.json()}).then(json=>{
            if(json.Status === 400){
                console.log(json.Status)
            }else if(json.Status === 200){
                dispatch({type:GET_GRADE_CLASS_MSG,data:json.Data});
            }
           
        });
    }
}
//获取学科信息/改
const getSubjectTeacherMsg = (url) =>{
    return (dispatch)=>{
        getData(CONFIG.UserInfoProxy+url,2).then(res=>{
            if(res.Status === '401'){
                console.log('错误码：'+ res.Status)
            }
            return res.json()}).then(json=>{
            if(json.Status === 400){
                console.log(json.Status)
            }else if(json.Status === 200){
                dispatch({type:GET_SUBJECT_TEACHER_MSG,data:json.Data});
            }
           
        });
    }
}
//获取Input值
const getChangeInputValue = (value) =>{
    return {type:CHANGE_INPUT_VALUE,value:value};
}
//获取用户信息/改
const getUserMsg = (url) =>{
    return (dispatch)=>{
        getData(CONFIG.UserInfoProxy+url,2).then(res=>{
            if(res.Status === '401'){
                console.log('错误：'+ res.Msg)
            }
            return res.json()}).then(json=>{
            if(json.Status === 400){
                console.log(json.Status)
            }else if(json.Status === 200){
                dispatch({type:GET_USER_MSG,data:json.Data});
            }
           
        });
    }
}

export default {
    getLoginUser,
    getChangeInputValue,
    getAllUserPreview,
    GET_LOGIN_USER_INFO,
    GET_ALL_USER_PREVIEW,
    getSubjectTeacherPreview,
    getGradeStudentPreview,
    getSchoolLeaderPreview,
    getSubjectTeacherMsg,
    GET_GRADE_STUDENT_PREVIEW,
    GET_SUBJECT_TEACHER_PREVIEW,
    GET_SCHOOL_LEADER_PREVIEW,
    getGradeClassMsg,
    GET_GRADE_CLASS_MSG,
    GET_SUBJECT_TEACHER_MSG,
    CHANGE_INPUT_VALUE,

    GET_USER_MSG,
    getUserMsg,

    getAdminPreview,
    GET_ADMIN_PREVIEW,

    SET_ADMIN_PREVIEW,
    setAdminPreview,
}