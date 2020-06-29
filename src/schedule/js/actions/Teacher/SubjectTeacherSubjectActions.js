import ApiActions from '../ApiActions';

import AppAlertActions from '../AppAlertActions';

import utils from '../utils';

const SUBJECT_TEACHER_SCHEDULE_INIT = 'SUBJECT_TEACHER_SCHEDULE_INIT';

const SUBJECT_TEACHER_SCHEDULE_UPDATE = 'SUBJECT_TEACHER_SCHEDULE_UPDATE';

const TEACHER_SUBJECT_TEACHER_SUBJECT_TEACHER_COUNT = 'TEACHER_SUBJECT_TEACHER_SUBJECT_TEACHER_COUNT';

const STS_SUBJECT_CHANGE = 'STS_SUBJECT_CHANGE';

const STS_NOW_WEEK_CHANGE = 'STS_NOW_WEEK_CHANGE';

const STS_PAGE_ADD = 'STS_PAGE_ADD';

const LOADING_SHOW = 'LOADING_SHOW';

const LOADING_HIDE = 'LOADING_HIDE';

const TEACHER_STS_SUBJECT_DROP_SHOW = 'TEACHER_STS_SUBJECT_DROP_SHOW';

const TEACHER_STS_SUBJECT_DROP_HIDE = 'TEACHER_STS_SUBJECT_DROP_HIDE';

const TEACHER_STS_SUBJECT_DROP_CHANGE = 'TEACHER_STS_SUBJECT_DROP_CHANGE';

const TEACHER_STS_SUBJECT_DROP_LIST_CHANGE = 'TEACHER_STS_SUBJECT_DROP_LIST_CHANGE';

const TEACHER_STS_SUBJECT_TITLE_CHANGE = 'TEACHER_STS_SUBJECT_TITLE_CHANGE';

//课程详情弹窗开启和关闭
const TEACHER_STS_SCHEDULE_DETAIL_MODAL_SHOW = 'TEACHER_STS_SCHEDULE_DETAIL_MODAL_SHOW';

const TEACHER_STS_SCHEDULE_DETAIL_MODAL_HIDE = 'TEACHER_STS_SCHEDULE_DETAIL_MODAL_HIDE';

//loading

const TEACHER_STS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW = 'TEACHER_STS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW';

const TEACHER_STS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE = 'TEACHER_STS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE';

const TEACHER_STS_SCHEDULE_DETAIL_MODAL_INIT = 'TEACHER_STS_SCHEDULE_DETAIL_MODAL_INIT';


//调整时间弹窗
const TEACHER_STS_CHANGE_TIME_MODAL_SHOW = 'TEACHER_STS_CHANGE_TIME_MODAL_SHOW';

const TEACHER_STS_CHANGE_TIME_MODAL_HIDE = 'TEACHER_STS_CHANGE_TIME_MODAL_HIDE';

const TEACHER_STS_CHANGE_TIME_MODAL_LOADING_SHOW = 'TEACHER_STS_CHANGE_TIME_MODAL_LOADING_SHOW';

const TEACHER_STS_CHANGE_TIME_MODAL_LOADING_HIDE = 'TEACHER_STS_CHANGE_TIME_MODAL_LOADING_HIDE';

const TEACHER_STS_CHANGE_TIME_MODAL_INIT = 'TEACHER_STS_CHANGE_TIME_MODAL_INIT';

const TEACHER_STS_CHANGE_TIME_MODAL_CLASSHOUR_PICK = 'TEACHER_STS_CHANGE_TIME_MODAL_CLASSHOUR_PICK';

//调整教室弹窗

const TEACHER_STS_ADJUST_CLASSROOM_MODAL_SHOW = 'TEACHER_STS_ADJUST_CLASSROOM_MODAL_SHOW';

const TEACHER_STS_ADJUST_CLASSROOM_MODAL_HIDE = 'TEACHER_STS_ADJUST_CLASSROOM_MODAL_HIDE';

const TEACHER_STS_ADJUST_CLASSROOM_MODAL_LOADING_SHOW = 'TEACHER_STS_ADJUST_CLASSROOM_MODAL_LOADING_SHOW';

const TEACHER_STS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE = 'TEACHER_STS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE';

const TEACHER_STS_ADJUST_CLASSROOM_MODAL_INIT = 'TEACHER_STS_ADJUST_CLASSROOM_MODA_INIT';

const TEACHER_STS_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE = 'TEACHER_STS_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE';

const TEACHER_STS_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE = 'TEACHER_STS_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE';

const TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE = 'TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE';

const TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE = 'TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE';

const TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW = 'TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW';

const TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE = 'TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE';

const TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW = 'TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW';

const TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE = 'TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE';

const TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW = 'TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW';

const TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE = 'TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE';

//找人代课

const TEACHER_STS_REPLACE_SCHEDULE_MODAL_SHOW = 'TEACHER_STS_REPLACE_SCHEDULE_MODAL_SHOW';

const TEACHER_STS_REPLACE_SCHEDULE_MODAL_HIDE = 'TEACHER_STS_REPLACE_SCHEDULE_MODAL_HIDE';

const TEACHER_STS_REPLACE_SCHEDULE_MODAL_LOADING_SHOW = 'TEACHER_STS_REPLACE_SCHEDULE_MODAL_LOADING_SHOW';

const TEACHER_STS_REPLACE_SCHEDULE_MODAL_LOADING_HIDE = 'TEACHER_STS_REPLACE_SCHEDULE_MODAL_LOADING_HIDE';

const TEACHER_STS_REPLACE_SCHEDULE_MODAL_INIT = 'TEACHER_STS_REPLACE_SCHEDULE_MODAL_INIT';

const TEACHER_STS_REPLACE_SCHEDULE_MODAL_TEACHER_PICK = 'TEACHER_STS_REPLACE_SCHEDULE_MODAL_TEACHER_PICK';

const TEACHER_STS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE = 'TEACHER_STS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE';

const TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW = 'TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW';

const TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE = 'TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE';

const TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW = 'TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW';

const TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE = 'TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE';

const TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE = 'TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE';

const TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW = 'TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW';

const TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE = 'TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE';



//学科教师总表学科课表界面更新
const STSPageUpdate = (opt) => {

    return (dispatch,getState) => {

        dispatch({type:LOADING_SHOW});

        const {PeriodWeekTerm,LoginUser,Teacher} = getState();
        //获取需要传递的参数
        let {SchoolID} =LoginUser;

        let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

        let {NowWeekNo,SubjectSelectd,SubjectTitleID,schedule,pageIndex,SubjectDropShow} = Teacher.SubjectTeacherSubjectSchedule;

        let SubjectID = '';

        let PageIndex = 1;
        //判断已选中的学科是否为全部学科
        if (SubjectDropShow){

            SubjectID = SubjectSelectd.value;

        }else{

            SubjectID = SubjectTitleID;

        }
        //如果是下一页的话
        if (opt&&opt.nextPage){

            PageIndex = pageIndex+1;

        }

        ApiActions.GetAllScheduleOfTeachersBySubjectIDForPage({

            SubjectID,PeriodID,SchoolID,WeekNO:NowWeekNo,PageIndex,PageSize:10,dispatch

        }).then(data => {

            if (data){

                let SubjectTeacherSubjectSchedule =  data.ItemTeacher.map((item) => {

                    let teacherObj = {

                        id:item.TeacherID,

                        name:item.TeacherName

                    };

                    let list = utils.ScheduleRemoveRepeat(data.ItemSchedule.map((i) => {

                        if (i.TeacherID === item.TeacherID){

                            return {

                                ...i,

                                type:i.ScheduleType,

                                title:(i.ClassName!==''?i.ClassName:i.CourseClassName),

                                titleID:(i.ClassName!==''?i.ClassID:i.CourseClassID),

                                secondTitle:i.SubjectName,

                                secondTitleID:i.SubjectID,

                                thirdTitle:i.ClassRoomName,

                                thirdTitleID:i.ClassRoomID,

                                WeekDay:i.WeekDay,

                                ClassHourNO:i.ClassHourNO

                            };

                        }else {

                            return ;

                        }

                    }).filter(i => {return i!==undefined}));

                    teacherObj['list'] = list;

                    return teacherObj;

                });
                //判断操作是否是下一页操作
                if (opt&&opt.nextPage){

                    schedule.push(...SubjectTeacherSubjectSchedule);

                    dispatch({type:SUBJECT_TEACHER_SCHEDULE_UPDATE,data:schedule});

                    dispatch({type:STS_PAGE_ADD});

                }else{

                    dispatch({type:SUBJECT_TEACHER_SCHEDULE_UPDATE,data:SubjectTeacherSubjectSchedule});

                }

                dispatch({type:TEACHER_SUBJECT_TEACHER_SUBJECT_TEACHER_COUNT,data:data.TeacherCount});

            }


            dispatch({type:LOADING_HIDE});

        });

    }

};

//课程详情弹窗

const ScheduleDetailShow = (Params) => {

    return (dispatch,getState)=>{

        const { SchoolID } = getState().LoginUser;

        const { TeacherID,ScheduleID,ClassDate,ClassHourNO,SubjectID } = Params;

        dispatch({type:TEACHER_STS_SCHEDULE_DETAIL_MODAL_SHOW});

        ApiActions.GetScheduleDetailByUserID({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data){

                data['SubjectID'] = SubjectID;

                dispatch({type:TEACHER_STS_SCHEDULE_DETAIL_MODAL_INIT,data:data});

            }

            dispatch({type:TEACHER_STS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE});

        })

    }

};

//停课
const StopSchedule = (params) => {

    return (dispatch,getState) => {

        const { SchoolID,UserID } = getState().LoginUser;

        const { TeacherID,ClassDate,ClassHourNO,ScheduleID } = params;

        ApiActions.OverScheduleAndGetTea({UserID,ScheduleID,SchoolID,TeacherID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data===0){

                dispatch(AppAlertActions.alertSuccess({title:'停课成功!'}));

                dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

            }

        });

    }

};

//恢复停课
const RebackStopSchedule = (params) => {

    return (dispatch,getState) => {

        const { SchoolID,UserID } = getState().LoginUser;

        const { TeacherID,ClassDate,ClassHourNO,ScheduleID } = params;

        ApiActions.CancelOverScheduleAndGetTea({UserID,ScheduleID,SchoolID,TeacherID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data===0){

                dispatch(AppAlertActions.alertSuccess({title:'恢复上课成功!'}));

                dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

            }

        });

    }

};

//撤销时间调整

const RebackTime = (params) => {

    return (dispatch,getState) => {

        const { SchoolID,UserID } = getState().LoginUser;

        const { TeacherID,ClassDate,ClassHourNO,ScheduleID } = params;

        ApiActions.CancelChangeDateAndGetTea({UserID,ScheduleID,SchoolID,TeacherID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data===0){

                dispatch(AppAlertActions.alertSuccess({title:'撤销调整时间成功!'}));

                dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

            }

        });

    }

};




//调整时间弹窗出现

const ChangeTimeShow = (params) =>{

    return (dispatch,getState) => {

        const { ClassDate,ClassHourNO,StartEndTime,WeekDay,

            ClassHourName,ClassHourType,TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName

        } = params;

        const { ItemWeek,NowDate } = getState().PeriodWeekTerm;

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = getState().Teacher.SubjectCourseGradeClassRoom;

        const WeekNO = getState().Teacher.SubjectTeacherSubjectSchedule.NowWeekNo;

        dispatch({ type:TEACHER_STS_CHANGE_TIME_MODAL_SHOW});

        dispatch({type:TEACHER_STS_CHANGE_TIME_MODAL_INIT,data:{TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName,StartEndTime,ClassHourType,NowDate,WeekDay,ItemClassHourCount,NowClassHourNO,WeekNO,ClassDate,ClassHourNO,ItemClassHour,ItemWeek}});

        dispatch({type:TEACHER_STS_CHANGE_TIME_MODAL_LOADING_HIDE});


    }

};


//点击某一个课时

const SelectClassHour = (params) => {

    return (dispatch,getState) => {

        const { SelectWeekDay,SelectClassHourNO,SelectDate } = params;

        dispatch({type:TEACHER_STS_CHANGE_TIME_MODAL_CLASSHOUR_PICK,data:{SelectWeekDay,SelectClassHourNO,SelectDate}})

    }

};




//调整时间切换周次

const WeekPick = (WeekNO) => {

    return (dispatch,getState) => {

        dispatch({type:TEACHER_STS_CHANGE_TIME_MODAL_INIT,data:{WeekNO}});

    }

};

//点击提交调整时间
const ChangeTimeCommit = () =>{

    return (dispatch,getState)=>{

        const { SelectDate,SelectClassHourNO,TeacherID,ClassDate,ClassHourNO,ScheduleID,NowClassRoomID,NowClassRoomName } = getState().TEACHER.SubjectTeacherSubjectSchedule.ChangeTime;

        if (SelectDate){

            dispatch({type:TEACHER_STS_CHANGE_TIME_MODAL_LOADING_SHOW});

            const { SchoolID,UserID } = getState().LoginUser;

            const ScheduleClassDateAndClassHourNO = `${SelectDate},${SelectClassHourNO}`;

            ApiActions.ChangeDateAndGetTea({

                SchoolID,ScheduleID,ScheduleClassDateAndClassHourNO,ClassDate,ClassHourNO,

                NowClassRoomID,NowClassRoomName,TeacherID,dispatch,UserID

            }).then(data=>{

                if (data===0){

                    dispatch(AppAlertActions.alertSuccess({title:"调整时间成功！"}));

                    dispatch({type:TEACHER_STS_CHANGE_TIME_MODAL_HIDE});

                    dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

                }

                dispatch({type:TEACHER_STS_CHANGE_TIME_MODAL_LOADING_HIDE});

            })

        }else {

            dispatch(AppAlertActions.alertWarn({title:"请选择调整的时间！"}));

        }

    }

};



//调整教室弹窗show

const AdjustClassRoomShow = (params) => {

    return (dispatch,getState)=>{

        const { ClassDate,ClassHourNO,TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName } = params;

        const { SchoolID } = getState().LoginUser;

        dispatch({ type:TEACHER_STS_ADJUST_CLASSROOM_MODAL_SHOW});

        let ClassRoomList = [];

        ApiActions.GetAllOptionForAddSchedule({SchoolID,dispatch}).then(data=>{

            if (data){

                ClassRoomList = data.ItemClassRoomType.map(item=>{

                    let List = [];

                    data.ItemClassRoom.map(i=>{

                        if (i.ClassRoomTypeID===item.ClassRoomTypeID&&i.ClassRoomID!==NowClassRoomID){

                            List.push({ID:i.ClassRoomID,Name:i.ClassRoomName});

                        }

                    });

                    return {

                        ID:item.ClassRoomTypeID,

                        Name:item.ClassRoomTypeName,

                        List

                    }

                });

            }

            dispatch({type:TEACHER_STS_ADJUST_CLASSROOM_MODAL_INIT,data:{ClassDate,ClassHourNO,TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName,ClassRoomList}});

            dispatch({type:TEACHER_STS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE});

        });

    }

};

//点击教室搜索

const ClassRoomSearchClick = (SearchValue) => {

    return (dispatch,getState)=>{

        const Key = SearchValue.trim();

        if (Key){

            dispatch({type:TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW});

            dispatch({type:TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW});

            dispatch({type:TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW});

            const { SchoolID } = getState().LoginUser;

            const { ClassRoomList,NowClassRoomID } = getState().Teacher.SubjectTeacherSubjectSchedule.AdjustClassRoom;

            let SearchList = [];

            ApiActions.GetClassRoomByClassTypeAndKey({SchoolID,PeriodID:'',ClassRoomTypeID:'',Key,dispatch}).then(data=>{

                if (data){

                    data.map(item=>{

                        let ClassTypeName = ClassRoomList.find(i=>i.ID===item.ClassRoomTypeID).Name;

                        if (item.ClassRoomID!==NowClassRoomID){

                            SearchList.push({

                                ID:item.ClassRoomID,

                                Name:item.ClassRoomName,

                                TypeID:item.ClassRoomTypeID,

                                TypeName:ClassTypeName

                            });

                        }

                    })

                }

                dispatch({type:TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE,data:SearchList});



                dispatch({type:TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE});

            });

        }else{

            dispatch(AppAlertActions.alertWarn({title:"搜索值不能为空！"}));

        }

    }

};

//教室提交

const AdjustClassRoomCommit = () =>{

    return (dispatch,getState) => {

        const { CheckedValue,TeacherID,ClassDate,ClassHourNO,ScheduleID } = getState().Teacher.SubjectTeacherSubjectSchedule.AdjustClassRoom;

        const { SchoolID,UserID } = getState().LoginUser;

        if (CheckedValue){

            dispatch({type:TEACHER_STS_ADJUST_CLASSROOM_MODAL_LOADING_SHOW});

            ApiActions.ChangeClassRoomAndGetTea({

                SchoolID,ScheduleID,TeacherID,ClassHourNO,ClassDate,

                ScheduleClassRoomID:CheckedValue,dispatch,UserID

            }).then(data=>{

                if (data===0){

                    dispatch({type:TEACHER_STS_ADJUST_CLASSROOM_MODAL_HIDE});

                    dispatch(AppAlertActions.alertSuccess({title:"调整教室成功！"}));

                    dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

                }

                dispatch({type:TEACHER_STS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE});

            });

        }else{

            dispatch(AppAlertActions.alertWarn({title:"请选择一个教室!"}));

        }

    }

};

//撤销教室调整

const RebackClassRoom = (params) => {

    return (dispatch,getState) => {

        const { TeacherID,ClassDate,ClassHourNO,ScheduleID } = params;

        const { SchoolID,UserID } = getState().LoginUser;

        ApiActions.CancelChangeClassRoomAndGetTea({

            TeacherID,ClassDate,ClassHourNO,ScheduleID,SchoolID,dispatch,UserID

        }).then(data=>{

            if (data===0){

                dispatch(AppAlertActions.alertSuccess({title:"撤销成功！"}));

                dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

            }

        })

    }

};


//找人代课出现

const ChooseReplaceTeacherShow = (params) => {

    return (dispatch,getState) => {

        const { TeacherID,ClassDate,ClassHourNO,ScheduleID } = params;

        const { SubjectID } = getState().Teacher.SubjectTeacherSubjectSchedule.ScheduleDetail;

        const { SchoolID } = getState().LoginUser;

        dispatch({type:TEACHER_STS_REPLACE_SCHEDULE_MODAL_SHOW});

        ApiActions.GetTeacherBySubjectIDAndKey({SchoolID,PeriodID:'',SubjectID,Key:'',dispatch}).then(data=>{

            if (data){

                let TeacherList = data.map(item=>{

                    return {

                        ID:item.TeacherID,

                        Name:item.TeacherName

                    }

                });

                dispatch({type:TEACHER_STS_REPLACE_SCHEDULE_MODAL_INIT,data:{TeacherList,TeacherID,ClassDate,ClassHourNO,ScheduleID}});

            }

            dispatch({type:TEACHER_STS_REPLACE_SCHEDULE_MODAL_LOADING_HIDE});

        })

    }

};

//找人代课搜索

const ReplaceSearchClick = (SearchValue) => {

    return (dispatch,getState)=>{

        const Key = SearchValue.trim();

        if (Key){

            dispatch({type:TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW});

            dispatch({type:TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW});

            dispatch({type:TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW});

            const { SchoolID } = getState().LoginUser;

            const { SubjectID } = getState().Teacher.SubjectTeacherSubjectSchedule.ScheduleDetailModal;

            let SearchList = [];

            ApiActions.GetTeacherBySubjectIDAndKey({SchoolID,PeriodID:'',SubjectID,Key,dispatch}).then(data=>{

                if (data){

                    data.map(item=>{

                        SearchList.push({

                            ID:item.TeacherID,

                            Name:item.TeacherName

                        });

                    })

                }

                dispatch({type:TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE,data:SearchList});



                dispatch({type:TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE});

            });

        }else{

            dispatch(AppAlertActions.alertWarn({title:"搜索值不能为空！"}));

        }

    }

};


//找人代课提交

const ReplaceScheduleCommit = () => {


    return (dispatch,getState)=>{

        const { ActiveTeacherID,TeacherID,ClassDate,ClassHourNO,ScheduleID } = getState().Teacher.SubjectTeacherSubjectSchedule.ReplaceSchedule;

        const { SchoolID,UserID } = getState().LoginUser;

        if (ActiveTeacherID){

            dispatch({type:TEACHER_STS_REPLACE_SCHEDULE_MODAL_LOADING_SHOW});

            ApiActions.ChangeTeacher({

                SchoolID,ScheduleID,TeacherID,ClassHourNO,ClassDate,

                ScheduleTeacherID:ActiveTeacherID,dispatch,UserID

            }).then(data=>{

                if (data===0){

                    dispatch({type:TEACHER_STS_REPLACE_SCHEDULE_MODAL_HIDE});

                    dispatch(AppAlertActions.alertSuccess({title:"找人代课成功！"}));

                    dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

                }

                dispatch({type:TEACHER_STS_REPLACE_SCHEDULE_MODAL_LOADING_HIDE});

            });

        }else{

            dispatch(AppAlertActions.alertWarn({title:"请选择一个教师!"}));

        }

    }

};


//找人代课撤销

const RebackReplaceSchedule = (params) => {

    return (dispatch,getState) => {

        const { TeacherID,ClassDate,ClassHourNO,ScheduleID } = params;

        const { SchoolID,UserID } = getState().LoginUser;

        ApiActions.CancelChangeTeacherAndGetTea({

            TeacherID,ClassDate,ClassHourNO,ScheduleID,SchoolID,dispatch,UserID

        }).then(data=>{

            if (data===0){

                dispatch(AppAlertActions.alertSuccess({title:"撤销成功！"}));

                dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

            }

        })

    }

};





//更新课程安排详情的内容

const ScheduleModalInfoUpdate = ({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}) => {

    return dispatch => {

        dispatch({type:TEACHER_STS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW});

        ApiActions.GetScheduleDetailByUserID({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data){

                dispatch({type:TEACHER_STS_SCHEDULE_DETAIL_MODAL_INIT,data:data});

            }

            dispatch({type:TEACHER_STS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE});

        })

    }

};


export default {

    SUBJECT_TEACHER_SCHEDULE_INIT,

    STS_SUBJECT_CHANGE,

    STS_NOW_WEEK_CHANGE,

    SUBJECT_TEACHER_SCHEDULE_UPDATE,

    STS_PAGE_ADD,

    LOADING_SHOW,

    LOADING_HIDE,

    TEACHER_SUBJECT_TEACHER_SUBJECT_TEACHER_COUNT,

    TEACHER_STS_SUBJECT_DROP_SHOW,

    TEACHER_STS_SUBJECT_DROP_HIDE,

    TEACHER_STS_SUBJECT_DROP_CHANGE,

    TEACHER_STS_SUBJECT_DROP_LIST_CHANGE,

    TEACHER_STS_SUBJECT_TITLE_CHANGE,

    //课程详情

    TEACHER_STS_SCHEDULE_DETAIL_MODAL_SHOW,

    TEACHER_STS_SCHEDULE_DETAIL_MODAL_HIDE,

    TEACHER_STS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE,

    TEACHER_STS_SCHEDULE_DETAIL_MODAL_INIT,

    TEACHER_STS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW,

    //调整时间
    TEACHER_STS_CHANGE_TIME_MODAL_SHOW,

    TEACHER_STS_CHANGE_TIME_MODAL_HIDE,

    TEACHER_STS_CHANGE_TIME_MODAL_LOADING_SHOW,

    TEACHER_STS_CHANGE_TIME_MODAL_LOADING_HIDE,

    TEACHER_STS_CHANGE_TIME_MODAL_INIT,

    TEACHER_STS_CHANGE_TIME_MODAL_CLASSHOUR_PICK,

    //调整教室弹窗

    TEACHER_STS_ADJUST_CLASSROOM_MODAL_SHOW,

    TEACHER_STS_ADJUST_CLASSROOM_MODAL_HIDE,

    TEACHER_STS_ADJUST_CLASSROOM_MODAL_LOADING_SHOW,

    TEACHER_STS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE,

    TEACHER_STS_ADJUST_CLASSROOM_MODAL_INIT,

    TEACHER_STS_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE,

    TEACHER_STS_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE,

    TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,

    TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW,

    TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE,

    TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW,

    TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE,

    TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE,

    TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW,

    TEACHER_STS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE,

    //找人代课

    TEACHER_STS_REPLACE_SCHEDULE_MODAL_SHOW,

    TEACHER_STS_REPLACE_SCHEDULE_MODAL_HIDE,

    TEACHER_STS_REPLACE_SCHEDULE_MODAL_LOADING_HIDE,

    TEACHER_STS_REPLACE_SCHEDULE_MODAL_LOADING_SHOW,

    TEACHER_STS_REPLACE_SCHEDULE_MODAL_INIT,

    TEACHER_STS_REPLACE_SCHEDULE_MODAL_TEACHER_PICK,

    TEACHER_STS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,

    TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW,

    TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE,

    TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW,

    TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE,

    TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE,

    TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW,

    TEACHER_STS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE,

    STSPageUpdate,

    //从这里开始是课程详情的弹窗

    ScheduleDetailShow,

    StopSchedule,

    RebackStopSchedule,

    ChangeTimeShow,

    SelectClassHour,

    WeekPick,

    ChangeTimeCommit,

    RebackTime,

    AdjustClassRoomShow,

    ClassRoomSearchClick,

    AdjustClassRoomCommit,

    RebackClassRoom,

    ChooseReplaceTeacherShow,

    ReplaceSearchClick,

    ReplaceScheduleCommit,

    RebackReplaceSchedule

}