import React from 'react';

import AppAlertActions from '../../actions/AppAlertActions'

import ApiActions from '../../actions/ApiActions';

import ComPageRefresh from '../ComPageRefresh';

import utils from '../utils';


const ADD_SCHEDULE_MODAL_SHOW = 'ADJUST_SCHEDULE_MODAL_SHOW';

const ADD_SCHEDULE_MODAL_HIDE = 'ADJUST_SCHEDULE_MODAL_HIDE';

const ADD_SHEDULE_MODAL_INFO_UPDATE = 'ADD_SHEDULE_MODAL_INFO_UPDATE';

const ADD_SHEDULE_MODAL_LOADING_SHOW = 'ADD_SHEDULE_MODAL_LOADING_SHOW';

const ADD_SHEDULE_MODAL_LOADING_HIDE = 'ADD_SHEDULE_MODAL_LOADING_HIDE';

const ADD_SHEDULE_MODAL_SUBJECT_CHANGE = 'ADD_SHEDULE_MODAL_SUBJECT_CHANGE';
//班级选项改变
const ADD_SHEDULE_MODAL_CLASS_CHANGE = 'ADD_SHEDULE_MODAL_CLASS_CHANGE';

//教师选项改变
const ADD_SHEDULE_MODAL_TEACHER_CHANGE = 'ADD_SHEDULE_MODAL_TEACHER_CHANGE';

//周次变更
const ADD_SHEDULE_MODAL_WEEK_CHANGE = 'ADD_SHEDULE_MODAL_WEEK_CHANGE';

//星期变更
const ADD_SHEDULE_MODAL_DATE_CHANGE = 'ADD_SHEDULE_MODAL_DATE_CHANGE';

//课时变更
const ADD_SHEDULE_MODAL_CLASSHOUR_CHANGE = 'ADD_SHEDULE_MODAL_CLASSHOUR_CHANGE';

//教室变更
const ADD_SHEDULE_MODAL_CLASSROOM_CHANGE = 'ADD_SHEDULE_MODAL_CLASSROOM_CHANGE';

const ADD_SHEDULE_MODAL_CLASSHOUR_DISABLED = 'ADD_SHEDULE_MODAL_CLASSHOUR_DISABLED';

const ADD_SHEDULE_MODAL_CLASSHOUR_ABLED = 'ADD_SHEDULE_MODAL_CLASSHOUR_ABLED';

const ADD_SHEDULE_MODAL_DATE_DISABLED = 'ADD_SHEDULE_MODAL_DATE_DISABLED';

const ADD_SHEDULE_MODAL_DATE_ABLED = 'ADD_SHEDULE_MODAL_DATE_ABLED';

const ADD_SCHEDULE_MODAL_SUBJECT_ERROR_SHOW = 'ADD_SCHEDULE_MODAL_SUBJECT_ERROR_SHOW';

const ADD_SCHEDULE_MODAL_SUBJECT_ERROR_HIDE = 'ADD_SCHEDULE_MODAL_SUBJECT_ERROR_HIDE';

const ADD_SCHEDULE_MODAL_CLASS_ERROR_SHOW = 'ADD_SCHEDULE_MODAL_CLASS_ERROR_SHOW';

const ADD_SCHEDULE_MODAL_CLASS_ERROR_HIDE = 'ADD_SCHEDULE_MODAL_CLASS_ERROR_HIDE';

const ADD_SCHEDULE_MODAL_TEACHER_ERROR_HIDE = 'ADD_SCHEDULE_MODAL_TEACHER_ERROR_HIDE';

const ADD_SCHEDULE_MODAL_TEACHER_ERROR_SHOW = 'ADD_SCHEDULE_MODAL_TEACHER_ERROR_SHOW';

const ADD_SCHEDULE_MODAL_WEEK_ERROR_SHOW = 'ADD_SCHEDULE_MODAL_WEEK_ERROR_SHOW';

const ADD_SCHEDULE_MODAL_WEEK_ERROR_HIDE = 'ADD_SCHEDULE_MODAL_WEEK_ERROR_HIDE';

const ADD_SCHEDULE_MODAL_DATE_ERROR_SHOW = 'ADD_SCHEDULE_MODAL_DATE_ERROR_SHOW';

const ADD_SCHEDULE_MODAL_DATE_ERROR_HIDE = 'ADD_SCHEDULE_MODAL_DATE_ERROR_HIDE';

const ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_HIDE = 'ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_HIDE';

const ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_SHOW = 'ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_SHOW';

const ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_SHOW = 'ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_SHOW';

const ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_HIDE = 'ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_HIDE';

const ADD_SCHEDULE_MODAL_CLASS_SEARCH_LIST_UPDATE = 'ADD_SCHEDULE_MODAL_CLASS_SEARCH_LIST_UPDATE';

const ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_HIDE = 'ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_HIDE';

const ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_SHOW = 'ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_SHOW';

const ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LOADING_SHOW = 'ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LOADING_SHOW';

const ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LOADING_HIDE = 'ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LOADING_HIDE';

const ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LIST_UPDATE = 'ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LIST_UPDATE';

const ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_SHOW = 'ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_SHOW';

const ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_HIDE = 'ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_HIDE';

const ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LIST_UPDATE = 'ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LIST_UPDATE';

const ADD_SCHEDULE_MODAL_CLASS_SEARCH_OPEN = 'ADD_SCHEDULE_MODAL_CLASS_SEARCH_OPEN';

const ADD_SCHEDULE_MODAL_CLASS_SEARCH_CLOSE = 'ADD_SCHEDULE_MODAL_CLASS_SEARCH_CLOSE';

const ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_OPEN = 'ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_OPEN';

const ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CLOSE = 'ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CLOSE';

const ADD_SCHEDULE_MODAL_TEACHER_SEARCH_OPEN = 'ADD_SCHEDULE_MODAL_TEACHER_SEARCH_OPEN';

const ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CLOSE = 'ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CLOSE';

//将班级和教师的下拉置为可选状态

const  MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_DROP_ABLED = 'MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_DROP_ABLED';

const MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_ABLED = 'MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_ABLED';

const MANAGER_ADD_SCHEDULE_MODAL_ClASS_DROP_ABLED = 'MANAGER_ADD_SCHEDULE_MODAL_ClASS_DROP_ABLED';

const MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_CHANGE = 'MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_CHANGE';

const MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_DISABLED = 'MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_DISABLED';

const MANAGER_ADD_SCHEDULE_MODAL_CLASS_DROP_DISABLED = 'MANAGER_ADD_SCHEDULE_MODAL_CLASS_DROP_DISABLED';



//将班级和教师下拉置空

const MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_DROP_CHANGE = 'MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_DROP_CHANGE';

//将班级和教师的list更换。

const MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_LIST_UPDATE = 'MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_LIST_UPDATE';


//取消按钮消失与否

const ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_SHOW = 'ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_SHOW';

const ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_HIDE = 'ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_HIDE';

const ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_SHOW = 'ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_SHOW';

const ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_HIDE = 'ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_HIDE';

const ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_SHOW = 'ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_SHOW';

const ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_HIDE = 'ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_HIDE';



//初始化弹窗信息的方法
const InfoInit = () => {

    return (dispatch,getState) => {

        let {WeekNO} = getState().PeriodWeekTerm;

        let { SchoolID } = getState().LoginUser;



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

               let subject = data.ItemSubject.map((item) => {

                   return {

                       value:item.SubjectID,

                       title:item.SubjectName,

                       Grades:item.Grades

                   }

               });
                //组织教师信息
               /*let teachers = data.ItemSubject.map((item) => {

                  let list = data.ItemTeacher.map((i) => {

                      if (i.SubjectID === item.SubjectID){

                        return{

                            name:i.TeacherName,

                            id:i.TeacherID

                        }

                      }else{

                          return;

                      }

                  }).filter((itm) => { return itm !== undefined });

                  return {

                      id:item.SubjectID,

                      name:item.SubjectName,

                      list

                  }

               });*/

               let teachers = data.ItemTeacher;

               //组织周次信息
               let week = data.ItemWeek.map((item) => {

                  if (item.WeekNO>=WeekNO){

                      return{

                          value:item.WeekNO,

                          title:<span>第{item.WeekNO}周 {item.WeekNO === WeekNO?<span className="nowWeek">(本周)</span>:''}</span>

                      }

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

               dispatch({type:ADD_SHEDULE_MODAL_INFO_UPDATE,data:{classList:[],teacherList:[],gradeClass,subject,teachers,week,date,classHour,classRoom}});

               dispatch({type:ADD_SHEDULE_MODAL_LOADING_HIDE});

           }

        });

    }

};


//点击班级搜索
const classSearch = (key) => {

  return (dispatch,getState) => {

      if (key.trim() !== ''){

        let pattern =  utils.SearchReg({type:2,dispatch,ErrorTips:"您输入的班级ID或名称不正确",key:key});

        if (pattern){

            let {SchoolID} = getState().LoginUser;

            const { classList } = getState().Manager.AddScheduleModal;

            dispatch({type:ADD_SCHEDULE_MODAL_CLASS_SEARCH_OPEN});

            dispatch({type:ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_SHOW});

            dispatch({type:ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_SHOW});

            /* ApiActions.GetClassByGradeIDAndKey({SchoolID,Key:key,dispatch}).then(data => {

               if (data){

                   let classSearchList = data.map(item => {

                       return{

                           id:item.ClassID,

                           name:item.ClassName

                       };

                   });

                   dispatch({type:ADD_SCHEDULE_MODAL_CLASS_SEARCH_LIST_UPDATE,data:classSearchList});

                   dispatch({type:ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_HIDE});

               }

           });
   */

            const classSearchList = classList.map(item=>{

                return item.list.filter(i=>i.name.includes(key));

            }).filter(item=>item.length>0).map(i=>i[0]);

            dispatch({type:ADD_SCHEDULE_MODAL_CLASS_SEARCH_LIST_UPDATE,data:classSearchList});

            dispatch({type:ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_HIDE});

        }

        }else{

            dispatch(AppAlertActions.alertWarn({title:"搜索的内容不能为空！"}));

        }

  };

};

//班级搜索关闭
const classSearchClose = () => {

    return dispatch =>{

        dispatch({type:ADD_SCHEDULE_MODAL_CLASS_SEARCH_CLOSE});

        dispatch({type:ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_HIDE});

    }

};

//点击教师搜索

const teacherSearch = (key) => {

    return (dispatch,getState) => {

        if (key.trim() !== ''){

            let {SchoolID} = getState().LoginUser;

            dispatch({type:ADD_SCHEDULE_MODAL_TEACHER_SEARCH_OPEN});

            dispatch({type:ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_SHOW});

            dispatch({type:ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_SHOW});

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

                    dispatch({type:ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LIST_UPDATE,data:teacherSearchList});

                    dispatch({type:ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LOADING_HIDE});

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

        dispatch({type:ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CLOSE});

        dispatch({type:ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_HIDE});

    }

};

//点击教室搜索

const classRoomSearch = (key) => {

    return (dispatch,getState) => {

        if(key.trim() !== ''){

            let pattern =  utils.SearchReg({type:2,dispatch,ErrorTips:"您输入的教室名称或ID不正确",key:key});

            if (pattern){

                let {SchoolID} = getState().LoginUser;

                dispatch({type:ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_OPEN});

                dispatch({type:ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_SHOW});

                dispatch({type:ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_SHOW});

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

                        dispatch({type:ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LIST_UPDATE,data:classRoomSearchList});

                        dispatch({type:ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_HIDE});

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

        dispatch({type:ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CLOSE});

        dispatch({type:ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_HIDE});

    }

};


//提交添加内容弹窗

const commitInfo = ({ModalInit,SubjectID,SubjectName,TeacherID,TeacherName,ClassID,CourseClassName,ClassRoomID,ClassRoomName,StudentIDs}) => {

    return (dispatch,getState) => {

        dispatch({type:ADD_SHEDULE_MODAL_LOADING_SHOW});

        let { SchoolID,UserID,UserType } = getState().LoginUser;

        let { AddScheduleModal } = getState().Manager;

        // let SubjectID = AddScheduleModal.checkedSubject.value;

        let WeekNO = AddScheduleModal.checkedWeek.value;

        let WeekDay =  AddScheduleModal.checkedDate.value;

        let ClassHourNO = AddScheduleModal.checkedClassHour.value;

        /*let TeacherID = AddScheduleModal.checkedTeacher.value;

        let ClassID = AddScheduleModal.checkedClass.value;

        let ClassRoomID = AddScheduleModal.checkedClassRoom.value;*/


        ApiActions.InsertSchedule({

            UserType:parseInt(UserType),dispatch

            ,UserID,SchoolID,SubjectID,SubjectName,WeekNO,WeekDay,ClassHourNO,TeacherID,TeacherName,ClassID,CourseClassName,ClassRoomID,ClassRoomName,StudentIDs

        }).then((data) => {

            if (data===0){

                dispatch({type:ADD_SCHEDULE_MODAL_HIDE});

                ModalInit();

                dispatch(AppAlertActions.alertSuccess({title:"添加临时课程成功!"}));

               dispatch(ComPageRefresh.ComPageScheduleBetterUpdate());

            }

            dispatch({type:ADD_SHEDULE_MODAL_LOADING_HIDE});

        });


    }

};



const alertHide = (dispatch) => {

  return () => dispatch({type:AppAlertActions.APP_ALERT_HIDE});

};


export default {

    ADD_SCHEDULE_MODAL_SHOW,

    ADD_SCHEDULE_MODAL_HIDE,

    ADD_SHEDULE_MODAL_INFO_UPDATE,

    ADD_SHEDULE_MODAL_LOADING_HIDE,

    ADD_SHEDULE_MODAL_LOADING_SHOW,

    ADD_SHEDULE_MODAL_SUBJECT_CHANGE,

    ADD_SHEDULE_MODAL_CLASS_CHANGE,

    ADD_SHEDULE_MODAL_TEACHER_CHANGE,

   ADD_SHEDULE_MODAL_WEEK_CHANGE,

   ADD_SHEDULE_MODAL_DATE_CHANGE,

   ADD_SHEDULE_MODAL_CLASSROOM_CHANGE,

  ADD_SHEDULE_MODAL_CLASSHOUR_CHANGE,

  ADD_SHEDULE_MODAL_CLASSHOUR_DISABLED,

  ADD_SHEDULE_MODAL_CLASSHOUR_ABLED,

  ADD_SHEDULE_MODAL_DATE_DISABLED,

  ADD_SHEDULE_MODAL_DATE_ABLED,

  ADD_SCHEDULE_MODAL_SUBJECT_ERROR_SHOW,

ADD_SCHEDULE_MODAL_SUBJECT_ERROR_HIDE,

ADD_SCHEDULE_MODAL_CLASS_ERROR_SHOW,

ADD_SCHEDULE_MODAL_CLASS_ERROR_HIDE,

ADD_SCHEDULE_MODAL_TEACHER_ERROR_HIDE,

ADD_SCHEDULE_MODAL_TEACHER_ERROR_SHOW,

ADD_SCHEDULE_MODAL_WEEK_ERROR_SHOW,

ADD_SCHEDULE_MODAL_WEEK_ERROR_HIDE,

ADD_SCHEDULE_MODAL_DATE_ERROR_SHOW,

ADD_SCHEDULE_MODAL_DATE_ERROR_HIDE,

ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_HIDE,

ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_SHOW,

ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_SHOW,

ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_HIDE,

    ADD_SCHEDULE_MODAL_CLASS_SEARCH_LIST_UPDATE,

    ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_HIDE,

    ADD_SCHEDULE_MODAL_CLASS_SEARCH_LOADING_SHOW,

    ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LOADING_SHOW,

    ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LOADING_HIDE,

ADD_SCHEDULE_MODAL_TEACHER_SEARCH_LIST_UPDATE,

    ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_SHOW,

ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LOADING_HIDE,

ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_LIST_UPDATE,

    ADD_SCHEDULE_MODAL_CLASS_SEARCH_OPEN,

    ADD_SCHEDULE_MODAL_CLASS_SEARCH_CLOSE,

    ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_OPEN,

    ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CLOSE,

    ADD_SCHEDULE_MODAL_TEACHER_SEARCH_OPEN,

    ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CLOSE,

ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_SHOW,

ADD_SCHEDULE_MODAL_CLASS_SEARCH_CANCEL_HIDE,

ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_SHOW,

ADD_SCHEDULE_MODAL_TEACHER_SEARCH_CANCEL_HIDE,

ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_SHOW,

ADD_SCHEDULE_MODAL_CLASSROOM_SEARCH_CANCEL_HIDE,

MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_DROP_ABLED,

MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_DROP_CHANGE,

MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_LIST_UPDATE,

MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_ABLED,

MANAGER_ADD_SCHEDULE_MODAL_ClASS_DROP_ABLED,

MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_CHANGE,

MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_DISABLED,

MANAGER_ADD_SCHEDULE_MODAL_CLASS_DROP_DISABLED,

InfoInit,

    classSearch,

    classSearchClose,

    teacherSearch,

    teacherSearchClose,

    classRoomSearch,

    classRoomSearchClose,

    commitInfo

}