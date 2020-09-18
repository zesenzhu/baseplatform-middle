import { postData, getData } from "../../../common/js/fetch";
import UpUIState from './UpUIState';
import CONFIG from '../../../common/js/config';
import 'whatwg-fetch';
import actions from './index'
import Mock from 'mockjs'
import TeacherState from './TeacherUpDataState'




//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO';
//获取教学班总览信息
const GET_COURE_CLASS_ALL_MSG = 'GET_COURE_CLASS_ALL_MSG';
//设置教学班菜单
const SET_COURE_CLASS_ALL_MSG = 'SET_COURE_CLASS_ALL_MSG'
//获取学科总览
const GET_SUBJECT_ALL_MSG = 'GET_SUBJECT_ALL_MSG'
//获取年级总览
const GET_CLASS_ALL_MSG = 'GET_CLASS_ALL_MSG'
//获取行政班信息
const GET_COURSE_CLASS_DETAILS_MSG = 'GET_COURSE_CLASS_DETAILS_MSG'
// 弹窗获取学校教师信息
const GET_TEACHER_MSG = 'GET_TEACHER_MSG'
//编辑教学班信息
const GET_COURSE_CLASS_DETAILS_HANDEL_CLASS_MSG = 'GET_COURSE_CLASS_DETAILS_HANDEL_CLASS_MSG';
//编辑教学班-编辑教学班名称
const SET_COURSE_CLASS_NAME = 'SET_COURSE_CLASS_NAME';
//编辑教学班-编辑教学班信息
const SET_COURSE_CLASS_DATA = 'SET_COURSE_CLASS_DATA';
//编辑/添加教学班-获取教师信息
const GET_SUBJECT_TEACHER_MSG = 'GET_SUBJECT_TEACHER_MSG';
//编辑/添加教学班-获取教师信息
const SET_SUBJECT_TEACHER_MSG = 'SET_SUBJECT_TEACHER_MSG';
//编辑/添加教学班-获取教师默认信息
const SET_SUBJECT_TEACHER_DEFAULT_MSG = 'SET_SUBJECT_TEACHER_DEFAULT_MSG';
//编辑/添加教学班-获取学生信息
const SET_COURSE_CLASS_STUDENT_MSG = 'SET_COURSE_CLASS_STUDENT_MSG';
//编辑/添加教学班-获取学生默认信息
const SET_COURSE_CLASS_STUDENT_DEFAULT_MSG = 'SET_COURSE_CLASS_STUDENT_DEFAULT_MSG';
//教师中转
const SET_SUBJECT_TEACHER_TRANSFER_MSG = 'SET_SUBJECT_TEACHER_TRANSFER_MSG'
//学生中转
const SET_CLASS_STUDENT_TRANSFER_MSG = 'SET_CLASS_STUDENT_TRANSFER_MSG'

const SET_CLASS_STUDENT_TRANSFER_TRANSFER_MSG = 'SET_CLASS_STUDENT_TRANSFER_TRANSFER_MSG'
//编辑/添加教学班-获取年级班级信息
const GET_GRADE_CLASS_MSG = 'GET_GRADE_CLASS_MSG';
//编辑/添加教学班-获取年级班级信息
const GET_CLASS_STUDENT_MSG = 'GET_CLASS_STUDENT_MSG';
//编辑/添加教学班-搜索年级班级信息
const SEARCH_CLASS_STUDENT_MSG = 'SEARCH_CLASS_STUDENT_MSG';


//获取教学班更新动态
const GET_COURSE_CLASS_DYNAMIC_MSG = 'GET_COURSE_CLASS_DYNAMIC_MSG';

//获取教学班更新动态
const GET_COURSE_CLASS_RECORD_MSG = 'GET_COURSE_CLASS_RECORD_MSG';
//教学班调整详情
const GET_LOG_DETAILS_MSG = 'GET_LOG_DETAILS_MSG'

//插入教学班
const INSERT_NEW_CLASSL_MSG = 'INSERT_NEW_CLASSL_MSG'
//教学班分页页数
const CLASS_PAGISIZE_MSG = 'CLASS_PAGISIZE_MSG'
//搜索教学班分页页数
const SEARCH_PAGISIZE_MSG = 'SEARCH_PAGISIZE_MSG'
// 公共编辑教学班
const SET_COURSE_CLASS_TRANSFER_MSG = 'SET_COURSE_CLASS_TRANSFER_MSG';
const SET_COURSE_CLASS_DEFAULT_MSG = 'SET_COURSE_CLASS_DEFAULT_MSG'
//操作的执行
//获取登录用户信息
const getLoginUser = (data) => {
    return (dispatch) => {


            dispatch({ type: GET_LOGIN_USER_INFO, data: data});
      
    }
};
//获取学校学段信息
const getCoureClassAllMsg = (url, func) => {


    return (dispatch) => {


        getData(CONFIG.CourseClassProxy + url,2).then(res => {

            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
                dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
                dispatch({ type: GET_COURE_CLASS_ALL_MSG, data: json.Data, func: func });
            }
        });
    }
}


//设置教学班菜单
const setCoureClassAllMsg = (data, subjectID = null) => {
    return {
        type: SET_COURE_CLASS_ALL_MSG,
        data: data,
        subjectID: subjectID
    }
};

//获取学科总览
const getSubjectAllMsg = (url, subject) => {
    return (dispatch) => {
        getData(CONFIG.CourseClassProxy + url,2).then(res => {
            dispatch({ type: actions.UpUIState.RIGHT_LOADING_CLOSE });

            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
              // console.log(json.Data)`
                dispatch({ type: GET_SUBJECT_ALL_MSG, data: json.Data, subject: subject });

            }
        });
    }
}
//获取教学班信息
const getClassAllMsg = (url, subject, Class) => {
    return (dispatch) => {
        dispatch({ type: actions.UpUIState.TABLE_LOADING_OPEN });

        getData(CONFIG.CourseClassProxy + url,2).then(res => {
            dispatch({ type: actions.UpUIState.TABLE_LOADING_CLOSE });
            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
              // console.log(json.Data)
                dispatch({ type: GET_CLASS_ALL_MSG, data: json.Data, subject: subject, Class: Class });

            }
        });
    }
}
//获取教学班信息
const getCourseClassDetailsMsg = (url,log=false) => {
    return (dispatch) => {
        dispatch({ type: actions.UpUIState.MODAL_LOADING_OPEN });

        getData(CONFIG.CourseClassProxy + url,2).then(res => {
            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
              // console.log(json.Data)
                dispatch({ type: GET_COURSE_CLASS_DETAILS_MSG, data: json.Data });
                dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });
                if(log){
                    dispatch(actions.UpUIState.CourseClassDetailsModalOpen());

                }
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
//获取教学班信息
const getCourseClassDetailsHandleClassMsg = (url) => {
    return (dispatch) => {
        dispatch({ type: actions.UpUIState.MODAL_LOADING_OPEN });

        getData(CONFIG.CourseClassProxy + url,2).then(res => {
            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
              // console.log(json.Data)
                dispatch({ type: GET_COURSE_CLASS_DETAILS_HANDEL_CLASS_MSG, data: json.Data });
                dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });
            }
        });
    }
}
//编辑教学班-编辑教学班名称
const setCourseClassName = (courseClassName) => {
    return (dispatch) => {
        dispatch({ type: SET_COURSE_CLASS_NAME, data: courseClassName })
    }
}
//获取教学班信息
const getSubjectTeacherMsg = (url) => {
    return (dispatch) => {
        dispatch({ type: actions.UpUIState.TEACHER_LOADING_MODAL_OPEN });

        getData(CONFIG.SubjectProxy + url, 2).then(res => {
            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
              // console.log(json.Data)
                dispatch({ type: GET_SUBJECT_TEACHER_MSG, data: json.Data });
                dispatch({ type: actions.UpUIState.TEACHER_LOADING_MODAL_COLSE });
            }
        });
    }
}
//编辑教学班-设置教师
const setSubjectTeacherMsg = (teacher) => {
    return (dispatch) => {
        dispatch({ type: SET_SUBJECT_TEACHER_MSG, data: teacher })
    }
}
//编辑教学班-设置教师中转
const setSubjectTeacherTransferMsg = (teacher) => {
    return (dispatch) => {
        dispatch({ type: SET_SUBJECT_TEACHER_TRANSFER_MSG, data: teacher })
    }
}
//编辑教学班-设置默认教师
const setSubjectTeacherDefaultMsg = (teacher) => {
    return (dispatch) => {
        dispatch({ type: SET_SUBJECT_TEACHER_DEFAULT_MSG, data: teacher })
    }
}
//编辑教学班-设置学生
const setCourseClassDataMsg = (student) => {
    return (dispatch) => {
        dispatch({ type: SET_COURSE_CLASS_DATA, data: student })
    }
}
//编辑教学班-设置学生
const setCourseClassStudentMsg = (student) => {
    return (dispatch) => {
        dispatch({ type: SET_COURSE_CLASS_STUDENT_MSG, data: student })
    }
}
//编辑教学班-设置默认学生
const setCourseClassStudentDefaultMsg = (student) => {
    return (dispatch) => {
        dispatch({ type: SET_COURSE_CLASS_STUDENT_DEFAULT_MSG, data: student })
    }
}
//编辑教学班-设置学生中转
const setClassStudentTransferMsg = (student) => {
    return (dispatch) => {
        dispatch({ type: SET_CLASS_STUDENT_TRANSFER_MSG, data: student })
    }
}

//编辑教学班-设置学生中转的中转
const setClassStudentTransferTransferMsg = (student) => {
    return (dispatch) => {
        dispatch({ type: SET_CLASS_STUDENT_TRANSFER_TRANSFER_MSG, data: student })
    }
}
//获取年级行政班信息
const getGradeClassMsg = (url) => {
    return (dispatch) => {
        dispatch({ type: actions.UpUIState.STUDENT_LOADING_MODAL_OPEN });

        getData(CONFIG.CourseClassProxy + url,2).then(res => {
            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
              // console.log(json.Data)
                dispatch({ type: GET_GRADE_CLASS_MSG, data: json.Data });
                dispatch({ type: actions.UpUIState.STUDENT_LOADING_MODAL_COLSE });
            }
        });
    }
}
//获取行政班学生信息
const getClassStudentMsg = (url,func=(popStudent)=>{}) => {
    return (dispatch,getState) => {
        dispatch(actions.UpUIState.ClassStudentLoadingModalOpen());

        getData(CONFIG.CourseClassProxy + url,2).then(res => {
            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
              // console.log(json.Data)
                dispatch({ type: GET_CLASS_STUDENT_MSG, data: json.Data });
                let state = getState()
                // console.log(state)
              func(state.DataState.GetStudentClassMsg.ClassStudent.propStudent)

                dispatch(actions.UpUIState.ClassStudentLoadingModalClose());
            }
        });
    }
}
//搜索行政班学生信息
const searchClassStudentMsg = (url) => {
    return (dispatch) => {
        dispatch(actions.UpUIState.ClassStudentLoadingModalOpen());

        getData(CONFIG.CourseClassProxy + url,2).then(res => {
            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
              // console.log(json.Data)
                dispatch({ type: SEARCH_CLASS_STUDENT_MSG, data: json.Data });
                dispatch(actions.UpUIState.ClassStudentLoadingModalClose());
            }
        });
    }
}
//获取最新动态
const getCourseClassDynamicMsg = (url) => {
    return (dispatch) => {
        dispatch(actions.UpUIState.CourseClassDynamicLoadingOpen());

        getData(CONFIG.CourseClassProxy + url,2).then(res => {
            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
              // console.log(json.Data)
                dispatch({ type: GET_COURSE_CLASS_DYNAMIC_MSG, data: json.Data });
                dispatch(actions.UpUIState.CourseClassDynamicLoadingClose());
            }
        });
    }
}
//获取历史记录
const getCourseClassRecordMsg = (url) => {
    return (dispatch) => {
        dispatch(actions.UpUIState.CourseClassDynamicLoadingOpen());

        getData(CONFIG.CourseClassProxy + url,2).then(res => {
            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
              // console.log(json.Data)
                dispatch({ type: GET_COURSE_CLASS_RECORD_MSG, data: json.Data });
                dispatch(actions.UpUIState.CourseClassDynamicLoadingClose());
            }
        });
    }
}
//教学班调整详情
const getLogDetailsMsg = (url,log=false) => {
    

    return (dispatch) => {
        
        dispatch({ type: actions.UpUIState.MODAL_LOADING_OPEN });

        getData(CONFIG.CourseClassProxy + url,2).then(res => {
            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
              // console.log(json.Data)
                dispatch({ type: GET_LOG_DETAILS_MSG, data: json.Data });
                dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });
                if(log){
                    dispatch(actions.UpUIState.LogDetailsModalOpen());

                }
            }
        });
    }
}

//插入新数据
const InsertNewClassMag = (data) => {
    return {
        type: INSERT_NEW_CLASSL_MSG,
        data: data
    }
};

//修改教学班页数
const ClassPagisizeMsg = (pagiSize) => {
    return (dispatch) => {
        dispatch({ type: CLASS_PAGISIZE_MSG, data: pagiSize })
    }
}
//修改搜索教学班页数
const SearchPagisizeMsg = (pagiSize) => {
    return (dispatch) => {
        dispatch({ type: SEARCH_PAGISIZE_MSG, data: pagiSize })
    }
}
//修改编辑教学班-中转
const SetCourseClassTransferMsg = (data) => {
    return (dispatch) => {
        dispatch({ type: SET_COURSE_CLASS_TRANSFER_MSG, data  })
    }
}
//修改编辑教学班-默认
const SetCourseClassDefaultMsg = (data) => {
    return (dispatch) => {
        dispatch({ type: SET_COURSE_CLASS_DEFAULT_MSG, data  })
    }
}
export default {
    ...TeacherState,
    getLoginUser,
    GET_LOGIN_USER_INFO,
    getCoureClassAllMsg,
    GET_COURE_CLASS_ALL_MSG,
    SET_COURE_CLASS_ALL_MSG,
    setCoureClassAllMsg,
    GET_SUBJECT_ALL_MSG,
    getSubjectAllMsg,
    GET_CLASS_ALL_MSG,
    getClassAllMsg,
    GET_COURSE_CLASS_DETAILS_MSG,
    getCourseClassDetailsMsg,
    getTeacherMsg,
    GET_TEACHER_MSG,
    GET_COURSE_CLASS_DETAILS_HANDEL_CLASS_MSG,
    getCourseClassDetailsHandleClassMsg,
    SET_COURSE_CLASS_NAME,
    setCourseClassName,
    GET_SUBJECT_TEACHER_MSG,
    getSubjectTeacherMsg,
    SET_SUBJECT_TEACHER_MSG,
    setSubjectTeacherMsg,
    SET_SUBJECT_TEACHER_DEFAULT_MSG,
    setSubjectTeacherDefaultMsg,
    SET_COURSE_CLASS_STUDENT_MSG,
    setCourseClassStudentMsg,
    SET_COURSE_CLASS_STUDENT_DEFAULT_MSG,
    setCourseClassStudentDefaultMsg,
    setSubjectTeacherTransferMsg,
    SET_SUBJECT_TEACHER_TRANSFER_MSG,
    SET_CLASS_STUDENT_TRANSFER_MSG,
    SET_CLASS_STUDENT_TRANSFER_TRANSFER_MSG,
    setClassStudentTransferMsg,
    setClassStudentTransferTransferMsg,

    GET_GRADE_CLASS_MSG,
    getGradeClassMsg,
    GET_CLASS_STUDENT_MSG,
    getClassStudentMsg,
    SEARCH_CLASS_STUDENT_MSG,
    searchClassStudentMsg,

    GET_COURSE_CLASS_DYNAMIC_MSG,
    getCourseClassDynamicMsg,
    GET_COURSE_CLASS_RECORD_MSG,
    getCourseClassRecordMsg,
    getLogDetailsMsg,
    GET_LOG_DETAILS_MSG,
    SET_COURSE_CLASS_DATA,
    setCourseClassDataMsg,
    INSERT_NEW_CLASSL_MSG,
    InsertNewClassMag,
    SEARCH_PAGISIZE_MSG,
    CLASS_PAGISIZE_MSG,
    ClassPagisizeMsg,
    SearchPagisizeMsg,

    SET_COURSE_CLASS_DEFAULT_MSG,
    SET_COURSE_CLASS_TRANSFER_MSG,
    SetCourseClassTransferMsg,
    SetCourseClassDefaultMsg



}