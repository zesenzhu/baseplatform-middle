import React from 'react';

import ApiActions from '../ApiActions';

import AppAlertActions from '../AppAlertActions';

import ComPageRefresh from '../ComPageRefresh';

import utils from '../utils';


//添加临时课程


const TEACHER_ADD_SCHEDULE_MODAL_SHOW = 'TEACHER_ADD_SCHEDULE_MODAL_SHOW';

const TEACHER_ADD_SCHEDULE_MODAL_HIDE = 'TEACHER_ADD_SCHEDULE_MODAL_HIDE';

const TEACHER_ADD_SCHEDULE_MODAL_INFO_UPDATE = 'TEACHER_ADD_SCHEDULE_MODAL_INFO_UPDATE';

const TEACHER_ADD_SCHEDULE_MODAL_LOADING_SHOW = 'TEACHER_ADD_SCHEDULE_MODAL_LOADING_SHOW';

const TEACHER_ADD_SCHEDULE_MODAL_LOADING_HIDE = 'TEACHER_ADD_SCHEDULE_MODAL_LOADING_HIDE';

const TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_CHANGE = 'TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_CHANGE';
//班级选项改变
const TEACHER_ADD_SCHEDULE_MODAL_CLASS_CHANGE = 'TEACHER_ADD_SCHEDULE_MODAL_CLASS_CHANGE';

//教师选项改变
const TEACHER_ADD_SCHEDULE_MODAL_TEACHER_CHANGE = 'TEACHER_ADD_SCHEDULE_MODAL_TEACHER_CHANGE';


//周次变更
const TEACHER_ADD_SCHEDULE_MODAL_WEEK_CHANGE = 'TEACHER_ADD_SCHEDULE_MODAL_WEEK_CHANGE';

//星期变更
const TEACHER_ADD_SCHEDULE_MODAL_DATE_CHANGE = 'TEACHER_ADD_SCHEDULE_MODAL_DATE_CHANGE';

//课时变更
const TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_CHANGE = 'TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_CHANGE';

//教室变更
const TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_CHANGE = 'TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_CHANGE';

const TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_DISABLED = 'TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_DISABLED';

const TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ABLED = 'TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ABLED';

const TEACHER_ADD_SCHEDULE_MODAL_DATE_DISABLED = 'TEACHER_ADD_SCHEDULE_MODAL_DATE_DISABLED';

const TEACHER_ADD_SCHEDULE_MODAL_DATE_ABLED = 'TEACHER_ADD_SCHEDULE_MODAL_DATE_ABLED';

const TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_ERROR_SHOW = 'TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_ERROR_SHOW';

const TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_ERROR_HIDE = 'TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_ERROR_HIDE';

const TEACHER_ADD_SCHEDULE_MODAL_CLASS_ERROR_SHOW = 'TEACHER_ADD_SCHEDULE_MODAL_CLASS_ERROR_SHOW';

const TEACHER_ADD_SCHEDULE_MODAL_CLASS_ERROR_HIDE = 'TEACHER_ADD_SCHEDULE_MODAL_CLASS_ERROR_HIDE';

const TEACHER_ADD_SCHEDULE_MODAL_TEACHER_ERROR_HIDE = 'TEACHER_ADD_SCHEDULE_MODAL_TEACHER_ERROR_HIDE';

const TEACHER_ADD_SCHEDULE_MODAL_TEACHER_ERROR_SHOW = 'TEACHER_ADD_SCHEDULE_MODAL_TEACHER_ERROR_SHOW';

const TEACHER_ADD_SCHEDULE_MODAL_WEEK_ERROR_SHOW = 'TEACHER_ADD_SCHEDULE_MODAL_WEEK_ERROR_SHOW';

const TEACHER_ADD_SCHEDULE_MODAL_WEEK_ERROR_HIDE = 'TEACHER_ADD_SCHEDULE_MODAL_WEEK_ERROR_HIDE';

const TEACHER_ADD_SCHEDULE_MODAL_DATE_ERROR_SHOW = 'TEACHER_ADD_SCHEDULE_MODAL_DATE_ERROR_SHOW';

const TEACHER_ADD_SCHEDULE_MODAL_DATE_ERROR_HIDE = 'TEACHER_ADD_SCHEDULE_MODAL_DATE_ERROR_HIDE';

const TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_HIDE = 'TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_HIDE';

const TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_SHOW = 'TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_SHOW';

const TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_SHOW = 'TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_SHOW';

const TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_HIDE = 'TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_HIDE';

const TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_LIST_UPDATE = 'TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_LIST_UPDATE';

const TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_HIDE = 'TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_HIDE';

const TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_SHOW = 'TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_SHOW';

const TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LOADING_SHOW = 'TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LOADING_SHOW';

const TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LOADING_HIDE = 'TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LOADING_HIDE';

const TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LIST_UPDATE = 'TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LIST_UPDATE';

const TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_SHOW = 'TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_SHOW';

const TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_HIDE = 'TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_HIDE';

const TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LIST_UPDATE = 'TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LIST_UPDATE';

const TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_OPEN = 'TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_OPEN';

const TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_CLOSE = 'TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_CLOSE';

const TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_OPEN = 'TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_OPEN';

const TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CLOSE = 'TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CLOSE';

const TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_OPEN = 'TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_OPEN';

const TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CLOSE = 'TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CLOSE';


//将班级和教师的下拉置为可选状态

const  TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_ABLED = 'TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_ABLED';

const  TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_DISABLED = 'TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_DISABLED';

//将班级和教师下拉置空

const TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_CHANGE = 'TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_CHANGE';

//将班级和教师的list更换。

const TEACHER_ADD_SCHEDULE_MODAL_CLASS_LIST_UPDATE = 'TEACHER_ADD_SCHEDULE_MODAL_CLASS_LIST_UPDATE';


//取消按钮消失与否

const TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_SHOW = 'TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_SHOW';

const TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_HIDE = 'TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_HIDE';

const TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_SHOW = 'TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_SHOW';

const TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_HIDE = 'TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_HIDE';

const TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_SHOW = 'TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_SHOW';

const TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_HIDE = 'TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_HIDE';


//初始化弹窗信息的方法
const InfoInit = () => {

    return (dispatch,getState) => {

        const {WeekNO} = getState().PeriodWeekTerm;

        let { SchoolID,SubjectIDs,SubjectNames } = getState().LoginUser;

        ApiActions.GetAllOptionForAddSchedule({

            SchoolID,dispatch

        }).then(data => {

            if (data){

                //组织年级班级信息
                let gradeClass = data.ItemGrade.map((item) => {

                    let list =  data.ItemClass.map((i) => {

                        if (item.GradeID === i.GradeID){

                            return {

                                name:i.ClassName,

                                id:i.ClassID

                            }

                        }else{

                            return;
                        }

                    }).filter((itm) => {return itm!==undefined });

                    return {

                        id:item.GradeID,

                        name:item.GradeName,

                        list

                    }

                });

                //组织学科信息


                let SubjectIDList = SubjectIDs.split(',');

                let SubjectNameList = SubjectNames.split(',');

                let subject = [];

                let classList = [];

                let SubjectDropShow = false;

                let SubjectID,SubjectName = '';

                const SubjectList = data.ItemSubject;

                if (SubjectIDList.length>1){

                    SubjectIDList.map((item,key)=>{

                        subject.push({value:item,title:SubjectNameList[key]});

                    });

                    SubjectDropShow = true;

                }else if (SubjectIDList.length===1) {

                    SubjectID = SubjectIDList[0];

                    SubjectName = SubjectNameList[0];

                    const SubjectGrades = SubjectList.filter(item=>item.SubjectID===SubjectID)[0].Grades;

                    const SubjectGradeList = SubjectGrades.split(',');

                    classList = gradeClass.map(item=>{

                        if (SubjectGradeList.findIndex(i=>i===item.id)>=0){

                            return item

                        }else{

                            return;

                        }

                    }).filter(item=>item!==undefined);

                    dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_ABLED});

                }



                //组织周次信息
                let week = data.ItemWeek.map((item) => {

                    if (item.WeekNO>=WeekNO){

                        let Title = <span>第{item.WeekNO}周 {item.WeekNO === WeekNO?<span className="nowWeek">(本周)</span>:''}</span>;

                        return{

                            value:item.WeekNO,

                            title:Title

                        }

                    }else{

                        return;

                    }

                }).filter(i=>i!==undefined);

                //组织星期信息
                let date = [];

                for (let i = 0; i <= 6; i++){

                    let title = '';

                    switch (i) {

                        case 0:

                            title = '星期一';

                            break;

                        case 1:

                            title = '星期二';

                            break;

                        case 2:

                            title = '星期三';

                            break;

                        case 3:

                            title = '星期四';

                            break;

                        case 4:

                            title = '星期五';

                            break;

                        case 5:

                            title = '星期六';

                            break;

                        case 6:

                            title = '星期日';

                            break;

                        default:

                            title = '星期一';

                    }

                    date.push({

                        value:i,

                        title

                    });

                }

                //组织课时信息
                let classHour = data.ItemClassHour.map((item) => {

                    let classHourType = '';

                    switch (item.ClassHourType) {

                        case 1:

                            classHourType = '上午';

                            break;

                        case 2:

                            classHourType = '下午';

                            break;

                        case 3:

                            classHourType = '晚上';

                            break;

                        default:

                            classHourType = '上午';

                    }

                    return{

                        type:item.ClassHourType,

                        value:item.ClassHourNO,

                        title:<span>{item.ClassHourName} <span className="classHourType">({classHourType})</span></span>

                    }

                }) ;

                //组织教室信息
                let classRoom = data.ItemClassRoomType.map(item => {

                    let list = data.ItemClassRoom.map((i) => {

                        if (i.ClassRoomTypeID === item.ClassRoomTypeID){

                            return {

                                id:i.ClassRoomID,

                                name:i.ClassRoomName

                            }

                        }else {

                            return;

                        }

                    }).filter((itm) => { return itm !== undefined });

                    return{

                        id:item.ClassRoomTypeID,

                        name:item.ClassRoomTypeName,

                        list

                    }

                });

                dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_INFO_UPDATE,data:{SubjectList,SubjectDropShow,SubjectName,SubjectID,classList,gradeClass,subject,week,date,classHour,classRoom}});

                dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_LOADING_HIDE});

            }

        });

    }

};


//点击班级搜索
const classSearch = (key) => {

    return (dispatch,getState) => {

        if (key.trim() !== ''){

            let pattern =  utils.SearchReg({type:2,dispatch,ErrorTips:"您输入的班级名称或ID不正确",key:key});

            if (pattern){

                let {SchoolID} = getState().LoginUser;

                const { classList } = getState().Teacher.AddTempScheduleModal;

                dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_OPEN});

                dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_SHOW});

                dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_SHOW});

                /* ApiActions.GetClassByGradeIDAndKey({SchoolID,Key:key,dispatch}).then(data => {

                     if (data){

                         let classSearchList = data.map(item => {

                             return{

                                 id:item.ClassID,

                                 name:item.ClassName

                             };

                         });

                         dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_LIST_UPDATE,data:classSearchList});

                         dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_HIDE});

                     }

                 });
     */
                const classSearchList = classList.map(item=>{

                    return item.list.filter(i=>i.name.includes(key));

                }).filter(item=>item.length>0).map(i=>i[0]);

                dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_LIST_UPDATE,data:classSearchList});

                dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_HIDE});

            }

        }else{

            dispatch(AppAlertActions.alertWarn({title:"搜索的内容不能为空！"}));

        }

    };

};

//班级搜索关闭
const classSearchClose = () => {

    return dispatch =>{

        dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_CLOSE});

        dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_HIDE});

    }

};

//点击教师搜索

const teacherSearch = (key) => {

    return (dispatch,getState) => {

        if (key.trim() !== ''){

            let {SchoolID} = getState().LoginUser;

            dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_OPEN});

            dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_SHOW});

            dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_SHOW});

            ApiActions.GetTeacherBySubjectIDAndKey({

                SchoolID,Key:key,dispatch

            }).then(data => {

                if (data){

                    let teacherSearchList = data.map(item => {

                        return{

                            id:item.TeacherID,

                            name:item.TeacherName

                        };

                    });

                    dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LIST_UPDATE,data:teacherSearchList});

                    dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LOADING_HIDE});

                }

            });

        }else{

            dispatch(AppAlertActions.alertWarn({title:"搜索的内容不能为空！"}));

        }

    }

};

//教师搜索关闭
const teacherSearchClose = () => {

    return dispatch =>{

        dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CLOSE});

        dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_HIDE});

    }

};

//点击教室搜索

const classRoomSearch = (key) => {

    return (dispatch,getState) => {

        if(key.trim() !== ''){

            let pattern =  utils.SearchReg({type:2,dispatch,ErrorTips:"您输入的教室名称或ID不正确",key:key});

            if (pattern){

                let {SchoolID} = getState().LoginUser;

                dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_OPEN});

                dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_SHOW});

                dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_SHOW});

                ApiActions.GetClassRoomByClassTypeAndKey({

                    SchoolID,Key:key,dispatch

                }).then(data => {

                    if (data){

                        let classRoomSearchList = data.map(item => {

                            return{

                                id:item.ClassRoomID,

                                name:item.ClassRoomName

                            };

                        });

                        dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LIST_UPDATE,data:classRoomSearchList});

                        dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_HIDE});

                    }

                });

            }

        }else{

            dispatch(AppAlertActions.alertWarn({title:'搜索的内容不能为空！'}));

        }

    }

};

//教室搜索关闭
const classRoomSearchClose = () => {

    return dispatch =>{

        dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CLOSE});

        dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_HIDE});

    }

};


//提交添加内容弹窗

const commitInfo = ({ModalInit,SubjectID,SubjectName,ClassID,CourseClassName,ClassRoomID,ClassRoomName,StudentIDs}) => {

    return (dispatch,getState) => {

        dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_LOADING_SHOW});

        let { SchoolID,UserID,UserType } = getState().LoginUser;

        let { AddTempScheduleModal } = getState().Teacher;

        /*let SubjectID = '';

        if (AddTempScheduleModal.SubjectDropShow){

            SubjectID = AddTempScheduleModal.checkedSubject.value;

        }else{

            SubjectID = AddTempScheduleModal.SubjectID;

        }*/

        let WeekNO = AddTempScheduleModal.checkedWeek.value;

        let WeekDay =  AddTempScheduleModal.checkedDate.value;

        let ClassHourNO = AddTempScheduleModal.checkedClassHour.value;

        let TeacherID = UserID;

        /*let ClassID = AddTempScheduleModal.checkedClass.value;

        let ClassRoomID = AddTempScheduleModal.checkedClassRoom.value;*/


        ApiActions.InsertSchedule({

            UserType:parseInt(UserType),dispatch

            ,UserID,SchoolID,SubjectID,SubjectName,WeekNO,WeekDay,ClassHourNO,TeacherID,TeacherName:'',ClassID,CourseClassName,ClassRoomID,ClassRoomName,StudentIDs

        }).then((data) => {

            if (data===0){

                dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_HIDE});

                dispatch(AppAlertActions.alertSuccess({title:"添加临时课程成功!"}));

                ComPageRefresh.ComPageUpdate(dispatch);

            }

            dispatch({type:TEACHER_ADD_SCHEDULE_MODAL_LOADING_HIDE});

        });


    }

};







export default {

    TEACHER_ADD_SCHEDULE_MODAL_SHOW,

    TEACHER_ADD_SCHEDULE_MODAL_HIDE,

    TEACHER_ADD_SCHEDULE_MODAL_INFO_UPDATE,

    TEACHER_ADD_SCHEDULE_MODAL_LOADING_HIDE,

    TEACHER_ADD_SCHEDULE_MODAL_LOADING_SHOW,

    TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_CHANGE,

    TEACHER_ADD_SCHEDULE_MODAL_CLASS_CHANGE,

    TEACHER_ADD_SCHEDULE_MODAL_TEACHER_CHANGE,

    TEACHER_ADD_SCHEDULE_MODAL_WEEK_CHANGE,

    TEACHER_ADD_SCHEDULE_MODAL_DATE_CHANGE,

    TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_CHANGE,

    TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_CHANGE,

    TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_DISABLED,

    TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ABLED,

    TEACHER_ADD_SCHEDULE_MODAL_DATE_DISABLED,

    TEACHER_ADD_SCHEDULE_MODAL_DATE_ABLED,

    TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_ERROR_SHOW,

    TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_ERROR_HIDE,

    TEACHER_ADD_SCHEDULE_MODAL_CLASS_ERROR_SHOW,

    TEACHER_ADD_SCHEDULE_MODAL_CLASS_ERROR_HIDE,

    TEACHER_ADD_SCHEDULE_MODAL_TEACHER_ERROR_HIDE,

    TEACHER_ADD_SCHEDULE_MODAL_TEACHER_ERROR_SHOW,

    TEACHER_ADD_SCHEDULE_MODAL_WEEK_ERROR_SHOW,

    TEACHER_ADD_SCHEDULE_MODAL_WEEK_ERROR_HIDE,

    TEACHER_ADD_SCHEDULE_MODAL_DATE_ERROR_SHOW,

    TEACHER_ADD_SCHEDULE_MODAL_DATE_ERROR_HIDE,

    TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_HIDE,

    TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_SHOW,

    TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_SHOW,

    TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_HIDE,

    TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_LIST_UPDATE,

    TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_HIDE,

    TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_SHOW,

    TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LOADING_SHOW,

    TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LOADING_HIDE,

    TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LIST_UPDATE,

    TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_SHOW,

    TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_HIDE,

    TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LIST_UPDATE,

    TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_OPEN,

    TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_CLOSE,

    TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_OPEN,

    TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CLOSE,

    TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_OPEN,

    TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CLOSE,

    TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_SHOW,

    TEACHER_ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_HIDE,

    TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_SHOW,

    TEACHER_ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_HIDE,

    TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_SHOW,

    TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_HIDE,

    TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_ABLED,

    TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_DISABLED,

    TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_CHANGE,

    TEACHER_ADD_SCHEDULE_MODAL_CLASS_LIST_UPDATE,

    InfoInit,

    classSearch,

    classSearchClose,

    teacherSearch,

    teacherSearchClose,

    classRoomSearch,

    classRoomSearchClose,

    commitInfo

}