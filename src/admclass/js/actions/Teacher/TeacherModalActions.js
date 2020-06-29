//教师弹窗
import AppAlertActions from '../../actions/AppAlertActions';

import ApiActions from '../../actions/ApiActions';

import CCActions from '../../actions/Teacher/ClassChargeActions';

import AppAlertSuccess from "../AppAlertSuccess";

import utils from '../utils';


const TEACHER_TEACHER_MODAL_SHOW = 'TEACHER_TEACHER_MODAL_SHOW';
const TEACHER_TEACHER_MODAL_HIDE = 'TEACHER_TEACHER_MODAL_HIDE';
const TEACHER_TEACHER_MODAL_LOADING_HIDE = "TEACHER_TEACHER_MODAL_LOADING_HIDE";
const TEACHER_TEACHER_MODAL_LOADING_SHOW = 'TEACHER_TEACHER_MODAL_LOADING_SHOW';
const TEACHER_TEACHER_MODAL_LIST_LOADING_HIDE = 'TEACHER_TEACHER_MODAL_LIST_LOADING_HIDE';
const TEACHER_TEACHER_MODAL_LIST_LOADING_SHOW = 'TEACHER_TEACHER_MODAL_LIST_LOADING_SHOW';
const TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_DISABLED = 'TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_DISABLED';
const TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_ABLED = 'TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_ABLED';
const TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_CHANGE = 'TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_CHANGE';
const TEACHER_TEACHER_MODAL_INPUT_CHANGE = 'TEACHER_TEACHER_MODAL_INPUT_CHANGE';
const TEACHER_TEACHER_MODAL_EMPTY_HIDE = 'TEACHER_TEACHER_MODAL_EMPTY_HIDE';
const TEACHER_TEACHER_MODAL_EMPTY_SHOW = 'TEACHER_TEACHER_MODAL_EMPTY_SHOW';
const TEACHER_TEACHER_MODAL_CLOSE_SHOW = 'TEACHER_TEACHER_MODAL_CLOSE_SHOW';
const TEACHER_TEACHER_MODAL_CLOSE_HIDE = 'TEACHER_TEACHER_MODAL_CLOSE_HIDE';



//教师的弹窗
const TEACHER_TEACHER_MODAL_UPDATA_TEACHERLIST = 'TEACHER_TEACHER_MODAL_UPDATA_TEACHERLIST';
const TEACHER_TEACHER_MODAL_UPDATA_SUBJECTS = 'TEACHER_TEACHER_MODAL_UPDATA_SUBJECTS';
const TEACHER_TEACHER_MODAL_UPDATE_NEW_TEACHER = 'TEACHER_TEACHER_MODAL_UPDATE_NEW_TEACHER';
const TEACHER_TEACHER_MODAL_UPDATE_ORIGIN_TEACHER = 'TEACHER_TEACHER_MODAL_UPDATE_ORIGIN_TEACHER';
const TEACHER_TEACHER_MODAL_ORIGIN_TEACHER_SHOW = 'TEACHER_TEACHER_MODAL_ORIGIN_TEACHER_SHOW';
const TEACHER_TEACHER_MODAL_ORIGIN_TEACHER_HIDE = 'TEACHER_TEACHER_MODAL_ORIGIN_TEACHER_HIDE';
const TEACHER_TEACHER_MODAL_NEW_TEACHER_TITLE = 'TEACHER_TEACHER_MODAL_NEW_TEACHER_TITLE';






//教师弹框获取所有的教师和学科的数据
const getTeacherData = (opts) =>{

    return (dispatch,getState) => {

        let TeacherID = '';

        const ClassID = getState().Teacher.ClassCharge.ActiveClassID;

        const {type,originTeacherInfo } = opts;

        const { SubjectID,SubjectName } = originTeacherInfo?originTeacherInfo:{};

        let { SchoolID } = getState().DataState.LoginUser;



        switch (type) {

            case 1:

                dispatch({type:TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_CHANGE,data:{value:"none",title:"请选择学科"}});

                ApiActions.GetSubject({ClassID,dispatch}).then(data=>{

                    if (data){

                        dispatch({type:TEACHER_TEACHER_MODAL_UPDATA_SUBJECTS,list:data.List});

                    }

                    dispatch({type:TEACHER_TEACHER_MODAL_LOADING_HIDE});

                });

                break;

            case 2:

                dispatch({type:TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_CHANGE,data:{value:SubjectID,title:SubjectName}});

                dispatch({type:TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_DISABLED});

                TeacherID = getState().Teacher.TeacherModal.originTeacherInfo.id;

                ApiActions.GetTeacherForSetCourseTeacher({SchoolID,UserID:TeacherID,SubjectID,ClassID,dispatch}).then(data=>{

                    if (data){

                        dispatch({type:TEACHER_TEACHER_MODAL_UPDATA_TEACHERLIST,list:data});

                    }

                    dispatch({type:TEACHER_TEACHER_MODAL_LOADING_HIDE});

                });

                break;

            default:

                return;

        }

    }

};

//教师弹窗选择的学科发生改变

const teacherModalSelectChange = (selectData) => {

    return (dispatch,getState) => {

        const {type,inputContent} = getState().Teacher.TeacherModal;

        let { SchoolID } = getState().DataState.LoginUser;

        const { ActiveClassID } = getState().Teacher.ClassCharge;

        dispatch({type:TEACHER_TEACHER_MODAL_LIST_LOADING_SHOW});

        dispatch({type:TEACHER_TEACHER_MODAL_UPDATE_NEW_TEACHER,data:{id:'',photo:'',name:''}});

        let TeacherID = '';

        if (type ===2||type===4){ //如果type是2或者4类型的代表更新需要将已有教师ID排除

            TeacherID = getState().Teacher.TeacherModal.originTeacherInfo.id;

        }

        let SubjectID = selectData.value;


        ApiActions.GetTeacherForSetCourseTeacher({SchoolID,UserID:TeacherID,SubjectID,Keyword:inputContent,ClassID:ActiveClassID,dispatch}).then(data=>{

            if (data){

                dispatch({type:TEACHER_TEACHER_MODAL_UPDATA_TEACHERLIST,list:data});

            }

            dispatch({type:TEACHER_TEACHER_MODAL_LIST_LOADING_HIDE});

        });

    }

};

//教师弹窗点击搜索按钮
const  teacherSearchBtnClick = () => {

    return (dispatch,getState) => {

        let { type,subjectsSelect,inputContent } = getState().Teacher.TeacherModal;

        let { SchoolID } = getState().DataState.LoginUser;

        const { ActiveClassID } = getState().Teacher.ClassCharge;

        let RegResult = utils.SearchReg({key:inputContent,dispatch,ErrorTips:"您输入的姓名或工号格式不正确",type:1});

        if (RegResult){

            //展示loading
            dispatch({type:TEACHER_TEACHER_MODAL_LIST_LOADING_SHOW});

            let UserID = '';

            let SubjectID = '';

            if (type===2||type===4){//排除教师ID

                UserID = getState().Teacher.TeacherModal.originTeacherInfo.id;

            }

            if(subjectsSelect.value==='none'){

                dispatch(AppAlertActions.alertWarn({title:"请先选择学科！"}));

                dispatch({type:TEACHER_TEACHER_MODAL_LIST_LOADING_HIDE});

                dispatch({type:TEACHER_TEACHER_MODAL_CLOSE_HIDE});

                dispatch({type:TEACHER_TEACHER_MODAL_INPUT_CHANGE,data:''});


            }else{

                dispatch({type:TEACHER_TEACHER_MODAL_CLOSE_SHOW});

                SubjectID = subjectsSelect.value;

                ApiActions.GetTeacherForSetCourseTeacher({SchoolID,UserID,SubjectID,Keyword:inputContent,ClassID:ActiveClassID,dispatch}).then(data=>{

                    if (data){

                        dispatch({type:TEACHER_TEACHER_MODAL_UPDATA_TEACHERLIST,list:data});

                        dispatch({type:TEACHER_TEACHER_MODAL_LIST_LOADING_HIDE});

                    }else{

                        dispatch({type:TEACHER_TEACHER_MODAL_LIST_LOADING_SHOW});

                    }

                });

            }

        }

    }

};

//教师弹窗点击取消搜索
const teacherSearchClose = () => {

    return (dispatch,getState) => {

        dispatch({type:TEACHER_TEACHER_MODAL_LIST_LOADING_SHOW});

        let { SchoolID } = getState().DataState.LoginUser;

        let {subjectsSelect,type} = getState().Teacher.TeacherModal;

        const { ActiveClassID } = getState().Teacher.ClassCharge;

        let UserID = '';

        let SubjectID = '';

        if (subjectsSelect.value==='none'){

            dispatch({type:TEACHER_TEACHER_MODAL_LIST_LOADING_HIDE});

            return;

        }else{

            SubjectID = subjectsSelect.value;

        }

        if (type===2||type===4){//排除教师ID

            UserID = getState().Teacher.TeacherModal.originTeacherInfo.id;

        }

        ApiActions.GetTeacherForSetCourseTeacher({SchoolID,UserID,SubjectID,ClassID:ActiveClassID,dispatch}).then(data=>{

            if (data){

                dispatch({type:TEACHER_TEACHER_MODAL_UPDATA_TEACHERLIST,list:data});

            }

            dispatch({type:TEACHER_TEACHER_MODAL_LIST_LOADING_HIDE});

        });

    }

};

//更改任课教师
const updateTeacher = (classInfo) => {

    return (dispatch,getState) => {

        const newTeacherId = getState().Teacher.TeacherModal.newPickTeacher.id;

        const ClassID = classInfo.ClassID;

        let SubjectID = '';

        const type = getState().Teacher.TeacherModal.type;

        if (type===2){

            SubjectID = getState().Teacher.TeacherModal.SubjectID;

        }else{

            SubjectID = getState().Teacher.TeacherModal.subjectsSelect.value;

        }

        let tips = '';

        switch (type) {

            case 1:

                tips = '添加任课教师成功';

                break;

            case 2:

                tips = '更改任课教师成功！';

                break;

            default:

                tips = '';

        }

        ApiActions.SetCourseClassTeacher({ClassID,SubjectID,UserID:newTeacherId,dispatch}).then(data=>{

            if (data===0){

                /*dispatch(AppAlertActions.alertSuccess({title:tips}));*/

                dispatch(AppAlertSuccess.AlertSuccess({title:tips}));

                dispatch({type:TEACHER_TEACHER_MODAL_HIDE});

            }

            dispatch(CCActions.TeacherUpdate());

        });

    }

};

//删除任课教师

const delSubjectTeacher = ({ClassID,SubjectID}) => {

    return (dispatch,getState) => {

        ApiActions.SetCourseClassTeacher({ClassID,SubjectID,dispatch}).then(data=>{

            if (data===0){

                dispatch({type:AppAlertActions.CLOSE_ERROR_ALERT});

                /*dispatch(AppAlertActions.alertSuccess({title:"删除成功！"}));*/

                dispatch(AppAlertSuccess.AlertSuccess({title:'删除成功！'}));

                dispatch(CCActions.TeacherUpdate());

            }


        });

    }

};



export default {

    TEACHER_TEACHER_MODAL_HIDE,
    TEACHER_TEACHER_MODAL_SHOW,
    TEACHER_TEACHER_MODAL_LOADING_SHOW,
    TEACHER_TEACHER_MODAL_LOADING_HIDE,
    TEACHER_TEACHER_MODAL_LIST_LOADING_HIDE,
    TEACHER_TEACHER_MODAL_LIST_LOADING_SHOW,
    TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_CHANGE,
    TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_DISABLED,
    TEACHER_TEACHER_MODAL_SUBJECTS_SELECT_ABLED,
    TEACHER_TEACHER_MODAL_INPUT_CHANGE,
    TEACHER_TEACHER_MODAL_EMPTY_SHOW,
    TEACHER_TEACHER_MODAL_EMPTY_HIDE,
    TEACHER_TEACHER_MODAL_CLOSE_HIDE,
    TEACHER_TEACHER_MODAL_CLOSE_SHOW,

    TEACHER_TEACHER_MODAL_UPDATA_SUBJECTS,
    TEACHER_TEACHER_MODAL_UPDATA_TEACHERLIST,
    TEACHER_TEACHER_MODAL_UPDATE_NEW_TEACHER,
    TEACHER_TEACHER_MODAL_UPDATE_ORIGIN_TEACHER,
    TEACHER_TEACHER_MODAL_ORIGIN_TEACHER_SHOW,
    TEACHER_TEACHER_MODAL_ORIGIN_TEACHER_HIDE,
    TEACHER_TEACHER_MODAL_NEW_TEACHER_TITLE,

    getTeacherData,

    teacherModalSelectChange,

    teacherSearchBtnClick,

    teacherSearchClose,

    updateTeacher,

    delSubjectTeacher

}