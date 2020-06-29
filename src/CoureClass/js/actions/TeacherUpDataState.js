import { postData, getData } from "../../../common/js/fetch";
import UpUIState from './UpUIState';
import CONFIG from '../../../common/js/config';
import 'whatwg-fetch';
import actions from './index'
import Mock from 'mockjs'
//常量
//获取教师任课的教学班信息
const GET_TECHER_COURSE_CLASS_MSG = 'GET_TECHER_COURSE_CLASS_MSG';
// 获取教师的学科和年级
const GET_SUBJECT_AND_GRADE__MSG = 'GET_SUBJECT_AND_GRADE__MSG'
//函数
//获取教师任课的教学班信息
const getTeacherCourseClassMsg = (url) => {
    return (dispatch) => {
        
        dispatch({ type: actions.UpUIState.RIGHT_LOADING_OPEN });

        getData(CONFIG.CourseClassProxy + url,2).then(res => {
            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
                
                dispatch({ type: GET_TECHER_COURSE_CLASS_MSG, data: json.Data });
                dispatch({ type: actions.UpUIState.RIGHT_LOADING_CLOSE });
            }
        });
    }
}

//获取教师任课的教学班信息
const getSubjectAndGradeInfoForTeacher = (url) => {
    return (dispatch) => {
        
        dispatch({ type: actions.UpUIState.TEACHER_ADD_COURECLASS_LOADING_OPEN });

        getData(CONFIG.CourseClassProxy + url,2).then(res => {
            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
                
                dispatch({ type: GET_SUBJECT_AND_GRADE__MSG, data: json.Data });
                dispatch({ type: actions.UpUIState.TEACHER_ADD_COURECLASS_LOADING_CLOSE });
            }
        });
    }
}

export default {
    GET_TECHER_COURSE_CLASS_MSG,
    getTeacherCourseClassMsg,
    GET_SUBJECT_AND_GRADE__MSG,
    getSubjectAndGradeInfoForTeacher
}