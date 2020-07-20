import ApiActions from "./ApiActions";

import AppAlertActions from "./AppAlertActions";

import ComPageRefresh from './ComPageRefresh';

import utils from './utils';


//课程详情弹窗的参数修改

const COMPONENT_SCHEDULE_DETAIL_MODAL_PARAMS_UPDATE = 'COMPONENT_SCHEDULE_DETAIL_MODAL_PARAMS_UPDATE';

//课程详情弹窗开启和关闭
const COMPONENT_SCHEDULE_DETAIL_MODAL_SHOW = 'COMPONENT_SCHEDULE_DETAIL_MODAL_SHOW';

const COMPONENT_SCHEDULE_DETAIL_MODAL_HIDE = 'COMPONENT_SCHEDULE_DETAIL_MODAL_HIDE';

//loading

const COMPONENT_SCHEDULE_DETAIL_MODAL_LOADING_SHOW = 'COMPONENT_SCHEDULE_DETAIL_MODAL_LOADING_SHOW';

const COMPONENT_SCHEDULE_DETAIL_MODAL_LOADING_HIDE = 'COMPONENT_SCHEDULE_DETAIL_MODAL_LOADING_HIDE';

const COMPONENT_SCHEDULE_DETAIL_MODAL_INIT = 'COMPONENT_SCHEDULE_DETAIL_MODAL_INIT';


//调整时间弹窗
const COMPONENT_CHANGE_TIME_MODAL_SHOW = 'COMPONENT_CHANGE_TIME_MODAL_SHOW';

const COMPONENT_CHANGE_TIME_MODAL_HIDE = 'COMPONENT_CHANGE_TIME_MODAL_HIDE';

const COMPONENT_CHANGE_TIME_MODAL_LOADING_SHOW = 'COMPONENT_CHANGE_TIME_MODAL_LOADING_SHOW';

const COMPONENT_CHANGE_TIME_MODAL_LOADING_HIDE = 'COMPONENT_CHANGE_TIME_MODAL_LOADING_HIDE';

const COMPONENT_CHANGE_TIME_MODAL_INIT = 'COMPONENT_CHANGE_TIME_MODAL_INIT';

const COMPONENT_CHANGE_TIME_MODAL_CLASSHOUR_PICK = 'COMPONENT_CHANGE_TIME_MODAL_CLASSHOUR_PICK';

//调整教室弹窗

const COMPONENT_ADJUST_CLASSROOM_MODAL_SHOW = 'COMPONENT_ADJUST_CLASSROOM_MODAL_SHOW';

const COMPONENT_ADJUST_CLASSROOM_MODAL_HIDE = 'COMPONENT_ADJUST_CLASSROOM_MODAL_HIDE';

const COMPONENT_ADJUST_CLASSROOM_MODAL_LOADING_SHOW = 'COMPONENT_ADJUST_CLASSROOM_MODAL_LOADING_SHOW';

const COMPONENT_ADJUST_CLASSROOM_MODAL_LOADING_HIDE = 'COMPONENT_ADJUST_CLASSROOM_MODAL_LOADING_HIDE';

const COMPONENT_ADJUST_CLASSROOM_MODAL_INIT = 'COMPONENT_ADJUST_CLASSROOM_MODA_INIT';

const COMPONENT_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE = 'COMPONENT_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE';

const COMPONENT_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE = 'COMPONENT_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE';

const COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE = 'COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE';

const COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE = 'COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE';

const COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW = 'COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW';

const COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE = 'COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE';

const COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW = 'COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW';

const COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE = 'COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE';

const COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW = 'COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW';

const COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE = 'COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE';

//找人代课

const COMPONENT_REPLACE_SCHEDULE_MODAL_SHOW = 'COMPONENT_REPLACE_SCHEDULE_MODAL_SHOW';

const COMPONENT_REPLACE_SCHEDULE_MODAL_HIDE = 'COMPONENT_REPLACE_SCHEDULE_MODAL_HIDE';

const COMPONENT_REPLACE_SCHEDULE_MODAL_LOADING_SHOW = 'COMPONENT_REPLACE_SCHEDULE_MODAL_LOADING_SHOW';

const COMPONENT_REPLACE_SCHEDULE_MODAL_LOADING_HIDE = 'COMPONENT_REPLACE_SCHEDULE_MODAL_LOADING_HIDE';

const COMPONENT_REPLACE_SCHEDULE_MODAL_INIT = 'COMPONENT_REPLACE_SCHEDULE_MODAL_INIT';

const COMPONENT_REPLACE_SCHEDULE_MODAL_TEACHER_PICK = 'COMPONENT_REPLACE_SCHEDULE_MODAL_TEACHER_PICK';

const COMPONENT_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE = 'COMPONENT_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE';

const COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW = 'COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW';

const COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE = 'COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE';

const COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW = 'COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW';

const COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE = 'COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE';

const COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE = 'COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE';

const COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW = 'COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW';

const COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE = 'COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE';

//换课弹窗

const COMPONENT_CHANGE_SCHEDULE_MODAL_SHOW = 'COMPONENT_CHANGE_SCHEDULE_MODAL_SHOW';

const COMPONENT_CHANGE_SCHEDULE_MODAL_HIDE = 'COMPONENT_CHANGE_SCHEDULE_MODAL_HIDE';


//课程详情弹窗

const ScheduleDetailShow = (Params) => {

    return (dispatch,getState)=>{

        const { SchoolID } = getState().LoginUser;

        const { TeacherID,ScheduleID,ClassDate,ClassHourNO,SubjectID,ClassID,CourseClassID,ClassRoomID } = Params;

        dispatch({type:COMPONENT_SCHEDULE_DETAIL_MODAL_SHOW});

        ApiActions.GetScheduleDetailByUserID({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data){

                data['SubjectID'] = SubjectID;

                data["ClassID"] = ClassID;

                data["CourseClassID"] = CourseClassID;

                data["ClassRoomID"] = ClassRoomID;

                dispatch({type:COMPONENT_SCHEDULE_DETAIL_MODAL_INIT,data:data});

            }

            dispatch({type:COMPONENT_SCHEDULE_DETAIL_MODAL_LOADING_HIDE});

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

                dispatch(ComPageRefresh.ComPageScheduleUpdate());


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

                dispatch(ComPageRefresh.ComPageScheduleUpdate());

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

                dispatch(ComPageRefresh.ComPageScheduleUpdate());

            }

        });

    }

};




//调整时间弹窗出现

const ChangeTimeShow = (params) =>{

    return (dispatch,getState) => {

        const { ClassDate,ClassHourNO,StartEndTime,WeekDay,

            ClassHourName,ClassHourType,TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName,

            ClassID,CourseClassID

        } = params;

        const { ItemWeek,NowDate } = getState().PeriodWeekTerm;

        const { WeekNO,ItemClassHour,ItemClassHourCount,NowClassHourNO } = getState().ScheduleDetail.Params;


        dispatch({ type:COMPONENT_CHANGE_TIME_MODAL_SHOW});

        dispatch({type:COMPONENT_CHANGE_TIME_MODAL_INIT,data:{TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName,StartEndTime,ClassHourType,NowDate,WeekDay,ItemClassHourCount,NowClassHourNO,WeekNO,OriginWeekNO:WeekNO,ClassDate,ClassHourNO,ItemClassHour,ItemWeek,ClassID,CourseClassID}});

        dispatch({type:COMPONENT_CHANGE_TIME_MODAL_LOADING_HIDE});


    }

};


//点击某一个课时

const SelectClassHour = (params) => {

    return (dispatch,getState) => {

        const { SelectWeekDay,SelectClassHourNO,SelectDate } = params;

        dispatch({type:COMPONENT_CHANGE_TIME_MODAL_CLASSHOUR_PICK,data:{SelectWeekDay,SelectClassHourNO,SelectDate}})

    }

};




//调整时间切换周次

const WeekPick = (WeekNO) => {

    return (dispatch,getState) => {

        dispatch({type:COMPONENT_CHANGE_TIME_MODAL_INIT,data:{WeekNO}});

    }

};

//点击提交调整时间
const ChangeTimeCommit = () =>{

    return (dispatch,getState)=>{

        const { SelectDate,SelectClassHourNO,TeacherID,ClassDate,ClassHourNO,ScheduleID,NowClassRoomID,NowClassRoomName } = getState().ScheduleDetail.ChangeTime;

        if (SelectDate){

            dispatch({type:COMPONENT_CHANGE_TIME_MODAL_LOADING_SHOW});

            const { SchoolID,UserID	 } = getState().LoginUser;

            const ScheduleClassDateAndClassHourNO = `${SelectDate},${SelectClassHourNO}`;

            ApiActions.ChangeDateAndGetTea({

                SchoolID,ScheduleID,ScheduleClassDateAndClassHourNO,ClassDate,ClassHourNO,

                NowClassRoomID,NowClassRoomName,TeacherID,dispatch,UserID

            }).then(data=>{

                if (data===0){

                    dispatch(AppAlertActions.alertSuccess({title:"调整时间成功！"}));

                    dispatch({type:COMPONENT_CHANGE_TIME_MODAL_HIDE});

                    dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

                    dispatch(ComPageRefresh.ComPageScheduleUpdate());

                }

                dispatch({type:COMPONENT_CHANGE_TIME_MODAL_LOADING_HIDE});

            })

        }else {

            dispatch(AppAlertActions.alertWarn({title:"请选择调整的时间！"}));

        }

    }

};



//换课出现

const ChangeScheduleShow = (params) =>{

    return (dispatch,getState) => {

        const { ClassDate,ClassHourNO,StartEndTime,WeekDay,

            ClassHourName,ClassHourType,TeacherID,ScheduleID,

            ClassID,CourseClassID

        } = params;

        const { ItemWeek,NowDate } = getState().PeriodWeekTerm;

        const { WeekNO,ItemClassHour,ItemClassHourCount,NowClassHourNO } = getState().ScheduleDetail.Params;

        dispatch({ type:COMPONENT_CHANGE_SCHEDULE_MODAL_SHOW,data:{CourseClassID,TeacherID,ScheduleID,StartEndTime,ClassHourType,NowDate,WeekDay,ItemClassHourCount,NowClassHourNO,WeekNO,ClassDate,ClassHourNO,ItemClassHour,ItemWeek,ClassID}});

    }

};



//调整教室弹窗show

const AdjustClassRoomShow = (params) => {

    return (dispatch,getState)=>{

        const { ClassDate,ClassHourNO,TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName } = params;

        const { SchoolID } = getState().LoginUser;

        dispatch({ type:COMPONENT_ADJUST_CLASSROOM_MODAL_SHOW});

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

            dispatch({type:COMPONENT_ADJUST_CLASSROOM_MODAL_INIT,data:{ClassDate,ClassHourNO,TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName,ClassRoomList}});

            dispatch({type:COMPONENT_ADJUST_CLASSROOM_MODAL_LOADING_HIDE});

        });

    }

};

//点击教室搜索

const ClassRoomSearchClick = (SearchValue) => {

    return (dispatch,getState)=>{

        const Key = SearchValue.trim();

        if (Key){

            let RegResult = utils.SearchReg({type:2,ErrorTips:"您输入的教师名称和ID格式不正确",dispatch,key:Key});

            if (RegResult){

                dispatch({type:COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW});

                dispatch({type:COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW});

                dispatch({type:COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW});

                const { SchoolID } = getState().LoginUser;

                const { ClassRoomList,NowClassRoomID } = getState().ScheduleDetail.AdjustClassRoom;

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

                    dispatch({type:COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE,data:SearchList});



                    dispatch({type:COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE});

                });


            }

        }else{

            dispatch(AppAlertActions.alertWarn({title:"搜索值不能为空！"}));

        }

    }

};

//教室提交

const AdjustClassRoomCommit = () =>{

    return (dispatch,getState) => {

        const { CheckedValue,TeacherID,ClassDate,ClassHourNO,ScheduleID } = getState().ScheduleDetail.AdjustClassRoom;

        const { SchoolID,UserID } = getState().LoginUser;

        if (CheckedValue){

            dispatch({type:COMPONENT_ADJUST_CLASSROOM_MODAL_LOADING_SHOW});

            ApiActions.ChangeClassRoomAndGetTea({

                SchoolID,ScheduleID,TeacherID,ClassHourNO,ClassDate,

                ScheduleClassRoomID:CheckedValue,dispatch,UserID

            }).then(data=>{

                if (data===0){

                    dispatch({type:COMPONENT_ADJUST_CLASSROOM_MODAL_HIDE});

                    dispatch(AppAlertActions.alertSuccess({title:"调整教室成功！"}));

                    dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

                    dispatch(ComPageRefresh.ComPageScheduleUpdate());

                }

                dispatch({type:COMPONENT_ADJUST_CLASSROOM_MODAL_LOADING_HIDE});

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

                dispatch(ComPageRefresh.ComPageScheduleUpdate());

            }

        })

    }

};


//找人代课出现

const ChooseReplaceTeacherShow = (params) => {

    return (dispatch,getState) => {

        const { TeacherID,ClassDate,ClassHourNO,ScheduleID,TeacherName } = params;

        const { SubjectID } = getState().ScheduleDetail.ScheduleDetail;

        const { SchoolID } = getState().LoginUser;

        dispatch({type:COMPONENT_REPLACE_SCHEDULE_MODAL_SHOW});

        ApiActions.GetTeacherBySubjectIDAndKey({SchoolID,PeriodID:'',SubjectID,Key:'',dispatch}).then(data=>{

            if (data){

                let TeacherList = data.map(item=>{

                    return {

                        ID:item.TeacherID,

                        Name:item.TeacherName

                    }

                });

                dispatch({type:COMPONENT_REPLACE_SCHEDULE_MODAL_INIT,data:{TeacherList,TeacherID,ClassDate,ClassHourNO,ScheduleID,TeacherName}});

            }

            dispatch({type:COMPONENT_REPLACE_SCHEDULE_MODAL_LOADING_HIDE});

        })

    }

};

//找人代课搜索

const ReplaceSearchClick = (SearchValue) => {

    return (dispatch,getState)=>{

        const Key = SearchValue.trim();

        if (Key){

            let RegResult = utils.SearchReg({ErrorTips:"您输入的姓名或工号格式不正确",dispatch,type:1,key:Key});

            if (RegResult){

                dispatch({type:COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW});

                dispatch({type:COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW});

                dispatch({type:COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW});

                const { SchoolID } = getState().LoginUser;

                const { SubjectID } = getState().ScheduleDetail.ScheduleDetail;

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

                    dispatch({type:COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE,data:SearchList});



                    dispatch({type:COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE});

                });

            }


        }else{

            dispatch(AppAlertActions.alertWarn({title:"搜索值不能为空！"}));

        }

    }

};


//找人代课提交

const ReplaceScheduleCommit = () => {


    return (dispatch,getState)=>{

        const { ActiveTeacherID,TeacherID,ClassDate,ClassHourNO,ScheduleID } = getState().ScheduleDetail.ReplaceSchedule;

        const { SchoolID,UserID } = getState().LoginUser;

        if (ActiveTeacherID){

            dispatch({type:COMPONENT_REPLACE_SCHEDULE_MODAL_LOADING_SHOW});

            ApiActions.ChangeTeacher({

                SchoolID,ScheduleID,TeacherID,ClassHourNO,ClassDate,

                ScheduleTeacherID:ActiveTeacherID,dispatch,UserID

            }).then(data=>{

                if (data===0){

                    dispatch({type:COMPONENT_REPLACE_SCHEDULE_MODAL_HIDE});

                    dispatch(AppAlertActions.alertSuccess({title:"找人代课成功！"}));

                    dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

                    dispatch(ComPageRefresh.ComPageScheduleUpdate());

                }

                dispatch({type:COMPONENT_REPLACE_SCHEDULE_MODAL_LOADING_HIDE});

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

            UserID,TeacherID,ClassDate,ClassHourNO,ScheduleID,SchoolID,dispatch

        }).then(data=>{

            if (data===0){

                dispatch(AppAlertActions.alertSuccess({title:"撤销成功！"}));

                dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

                dispatch(ComPageRefresh.ComPageScheduleUpdate());

            }

        })

    }

};





//更新课程安排详情的内容

const ScheduleModalInfoUpdate = ({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}) => {

    return dispatch => {

        dispatch({type:COMPONENT_SCHEDULE_DETAIL_MODAL_LOADING_SHOW});

        ApiActions.GetScheduleDetailByUserID({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data){

                dispatch({type:COMPONENT_SCHEDULE_DETAIL_MODAL_INIT,data:data});

            }

            dispatch({type:COMPONENT_SCHEDULE_DETAIL_MODAL_LOADING_HIDE});

        })

    }

};

export default {

    //课程详情

    COMPONENT_SCHEDULE_DETAIL_MODAL_PARAMS_UPDATE,

    COMPONENT_SCHEDULE_DETAIL_MODAL_SHOW,

    COMPONENT_SCHEDULE_DETAIL_MODAL_HIDE,

    COMPONENT_SCHEDULE_DETAIL_MODAL_LOADING_HIDE,

    COMPONENT_SCHEDULE_DETAIL_MODAL_INIT,

    COMPONENT_SCHEDULE_DETAIL_MODAL_LOADING_SHOW,

    //调整时间
    COMPONENT_CHANGE_TIME_MODAL_SHOW,

    COMPONENT_CHANGE_TIME_MODAL_HIDE,

    COMPONENT_CHANGE_TIME_MODAL_LOADING_SHOW,

    COMPONENT_CHANGE_TIME_MODAL_LOADING_HIDE,

    COMPONENT_CHANGE_TIME_MODAL_INIT,

    COMPONENT_CHANGE_TIME_MODAL_CLASSHOUR_PICK,

    //调整教室弹窗

    COMPONENT_ADJUST_CLASSROOM_MODAL_SHOW,

    COMPONENT_ADJUST_CLASSROOM_MODAL_HIDE,

    COMPONENT_ADJUST_CLASSROOM_MODAL_LOADING_SHOW,

    COMPONENT_ADJUST_CLASSROOM_MODAL_LOADING_HIDE,

    COMPONENT_ADJUST_CLASSROOM_MODAL_INIT,

    COMPONENT_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE,

    COMPONENT_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE,

    COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,

    COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW,

    COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE,

    COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW,

    COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE,

    COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE,

    COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW,

    COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE,

    //找人代课

    COMPONENT_REPLACE_SCHEDULE_MODAL_SHOW,

    COMPONENT_REPLACE_SCHEDULE_MODAL_HIDE,

    COMPONENT_REPLACE_SCHEDULE_MODAL_LOADING_HIDE,

    COMPONENT_REPLACE_SCHEDULE_MODAL_LOADING_SHOW,

    COMPONENT_REPLACE_SCHEDULE_MODAL_INIT,

    COMPONENT_REPLACE_SCHEDULE_MODAL_TEACHER_PICK,

    COMPONENT_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,

    COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW,

    COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE,

    COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW,

    COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE,

    COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE,

    COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW,

    COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE,

    COMPONENT_CHANGE_SCHEDULE_MODAL_SHOW,

    COMPONENT_CHANGE_SCHEDULE_MODAL_HIDE,

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

    RebackReplaceSchedule,

    ChangeScheduleShow,

    ScheduleModalInfoUpdate

}