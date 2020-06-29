import ApiActions from "../ApiActions";

import AppAlertActions from '../AppAlertActions';

import utils from '../utils';

const STT_SCHEDULE_INIT = 'STT_SCHEDULE_INIT';

const STT_NOW_WEEK_CHANGE = 'STT_NOW_WEEK_CHANGE';

const SCHEDULE_LOADING_SHOW = 'SCHEDULE_LOADING_SHOW';

const SCHEDULE_LOADING_HIDE = 'SCHEDULE_LOADING_HIDE';

const TEACHER_LIST_UPDATE = 'TEACHER_LIST_UPDATE';

const STT_SCHEDULE_CHANGE = 'STT_SCHEDULE_CHANGE';

const  SEARCH_TEACHER_RESULT_UPDATE = 'SEARCH_TEACHER_RESULT_UPDATE';

const SEARCH_TEACHER_RESULT_SHOW = 'SEARCH_TEACHER_RESULT_SHOW';

const SEARCH_TEACHER_RESULT_HIDE = 'SEARCH_TEACHER_RESULT_HIDE';

const SEARCH_LOADING_SHOW = 'SEARCH_LOADING_SHOW';

const SEARCH_LOADING_HIDE = 'SEARCH_LOADING_HIDE';

const MANAGER_STT_LEFT_MENU_SEARCH_INPUT_CHANGE = 'MANAGER_STT_LEFT_MENU_SEARCH_INPUT_CHANGE';

const MANAGER_STT_LEFT_MENU_CANCEL_BTN_SHOW = 'MANAGER_STT_LEFT_MENU_CANCEL_BTN_SHOW';

const MANAGER_STT_LEFT_MENU_CANCEL_BTN_HIDE = 'MANAGER_STT_LEFT_MENU_CANCEL_BTN_HIDE';


//课程详情弹窗开启和关闭
const MANAGER_STT_SCHEDULE_DETAIL_MODAL_SHOW = 'MANAGER_STT_SCHEDULE_DETAIL_MODAL_SHOW';

const MANAGER_STT_SCHEDULE_DETAIL_MODAL_HIDE = 'MANAGER_STT_SCHEDULE_DETAIL_MODAL_HIDE';

//loading

const MANAGER_STT_SCHEDULE_DETAIL_MODAL_LOADING_SHOW = 'MANAGER_STT_SCHEDULE_DETAIL_MODAL_LOADING_SHOW';

const MANAGER_STT_SCHEDULE_DETAIL_MODAL_LOADING_HIDE = 'MANAGER_STT_SCHEDULE_DETAIL_MODAL_LOADING_HIDE';

const MANAGER_STT_SCHEDULE_DETAIL_MODAL_INIT = 'MANAGER_STT_SCHEDULE_DETAIL_MODAL_INIT';


//调整时间弹窗
const MANAGER_STT_CHANGE_TIME_MODAL_SHOW = 'MANAGER_STT_CHANGE_TIME_MODAL_SHOW';

const MANAGER_STT_CHANGE_TIME_MODAL_HIDE = 'MANAGER_STT_CHANGE_TIME_MODAL_HIDE';

const MANAGER_STT_CHANGE_TIME_MODAL_LOADING_SHOW = 'MANAGER_STT_CHANGE_TIME_MODAL_LOADING_SHOW';

const MANAGER_STT_CHANGE_TIME_MODAL_LOADING_HIDE = 'MANAGER_STT_CHANGE_TIME_MODAL_LOADING_HIDE';

const MANAGER_STT_CHANGE_TIME_MODAL_INIT = 'MANAGER_STT_CHANGE_TIME_MODAL_INIT';

const MANAGER_STT_CHANGE_TIME_MODAL_CLASSHOUR_PICK = 'MANAGER_STT_CHANGE_TIME_MODAL_CLASSHOUR_PICK';

//调整教室弹窗

const MANAGER_STT_ADJUST_CLASSROOM_MODAL_SHOW = 'MANAGER_STT_ADJUST_CLASSROOM_MODAL_SHOW';

const MANAGER_STT_ADJUST_CLASSROOM_MODAL_HIDE = 'MANAGER_STT_ADJUST_CLASSROOM_MODAL_HIDE';

const MANAGER_STT_ADJUST_CLASSROOM_MODAL_LOADING_SHOW = 'MANAGER_STT_ADJUST_CLASSROOM_MODAL_LOADING_SHOW';

const MANAGER_STT_ADJUST_CLASSROOM_MODAL_LOADING_HIDE = 'MANAGER_STT_ADJUST_CLASSROOM_MODAL_LOADING_HIDE';

const MANAGER_STT_ADJUST_CLASSROOM_MODAL_INIT = 'MANAGER_STT_ADJUST_CLASSROOM_MODA_INIT';

const MANAGER_STT_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE = 'MANAGER_STT_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE';

const MANAGER_STT_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE = 'MANAGER_STT_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE';

const MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE = 'MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE';

const MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE = 'MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE';

const MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW = 'MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW';

const MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE = 'MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE';

const MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW = 'MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW';

const MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE = 'MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE';

const MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW = 'MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW';

const MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE = 'MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE';

//找人代课

const MANAGER_STT_REPLACE_SCHEDULE_MODAL_SHOW = 'MANAGER_STT_REPLACE_SCHEDULE_MODAL_SHOW';

const MANAGER_STT_REPLACE_SCHEDULE_MODAL_HIDE = 'MANAGER_STT_REPLACE_SCHEDULE_MODAL_HIDE';

const MANAGER_STT_REPLACE_SCHEDULE_MODAL_LOADING_SHOW = 'MANAGER_STT_REPLACE_SCHEDULE_MODAL_LOADING_SHOW';

const MANAGER_STT_REPLACE_SCHEDULE_MODAL_LOADING_HIDE = 'MANAGER_STT_REPLACE_SCHEDULE_MODAL_LOADING_HIDE';

const MANAGER_STT_REPLACE_SCHEDULE_MODAL_INIT = 'MANAGER_STT_REPLACE_SCHEDULE_MODAL_INIT';

const MANAGER_STT_REPLACE_SCHEDULE_MODAL_TEACHER_PICK = 'MANAGER_STT_REPLACE_SCHEDULE_MODAL_TEACHER_PICK';

const MANAGER_STT_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE = 'MANAGER_STT_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE';

const MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW = 'MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW';

const MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE = 'MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE';

const MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW = 'MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW';

const MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE = 'MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE';

const MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE = 'MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE';

const MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW = 'MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW';

const MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE = 'MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE';




//学科教师总表教师课表，教师更改
const STTTeacherUpdate = (pickInfo) => {

    return (dispatch,getState) => {

        const { LoginUser,Manager,PeriodWeekTerm } = getState();

        let { SchoolID } = LoginUser;

        let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

        let UserID = pickInfo.catChildrenId;

        let UserType = 1;

        let NowWeekNo = Manager.SubjectTeacherTeacherSchedule.NowWeekNo;

        ApiActions.GetScheduleByUserID({

            SchoolID,PeriodID,UserType,UserID,WeekNO:NowWeekNo,dispatch

        }).then(data => {

            if (data){

                let { ScheduleCount} = data;

                let schedule = utils.ScheduleRemoveRepeat(data.ItemSchedule.map((item) => {

                    return {

                        ...item,

                        title:item.SubjectName,

                        titleID:item.SubjectID,

                        secondTitle:(item.ClassName===''?item.CourseClassName:item.ClassName),

                        secondTitleID:(item.ClassName===''?item.CourseClassID:item.ClassID),

                        thirdTitle:item.ClassRoomName,

                        thirdTitleID:item.ClassRoomID,

                        WeekDay:item.WeekDay,

                        ClassHourNO:item.ClassHourNO,

                        ScheduleType:item.ScheduleType

                    }


                }));

                dispatch({type:STT_SCHEDULE_CHANGE,data:{ScheduleCount,schedule,pickTeacher:pickInfo.catChildrenName,pickTeacherID:pickInfo.catChildrenId}});

                dispatch({type:SCHEDULE_LOADING_HIDE});

            }

        });

    }

};
//学科教师总表教师课表，周次变更
const STTWeekUpdate = () => {

    return (dispatch,getState) => {

        const { Manager,LoginUser,PeriodWeekTerm } = getState();

        const { pickTeacher,pickTeacherID } = Manager.SubjectTeacherTeacherSchedule;
        //当没有选择教师的时候就不请求后台接口。
        if (pickTeacher === ''){

            dispatch({type:STT_SCHEDULE_CHANGE,data:{schedule:[]}});

            dispatch({type:SCHEDULE_LOADING_HIDE});

        }else{

            let SchoolID = LoginUser.SchoolID;

            let UserID = pickTeacherID;

            let UserType = 1;

            let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

            let NowWeekNo = Manager.SubjectTeacherTeacherSchedule.NowWeekNo;

            ApiActions.GetScheduleByUserID({

                SchoolID,PeriodID,UserType,UserID,WeekNO:NowWeekNo,dispatch

            }).then(data => {

                if (data){

                    let { ScheduleCount} = data;

                    let schedule = utils.ScheduleRemoveRepeat(data.ItemSchedule.map((item) => {

                        return {
                            ...item,

                            title:item.SubjectName,

                            titleID:item.SubjectID,

                            secondTitle:(item.ClassName===''?item.CourseClassName:item.ClassName),

                            secondTitleID:(item.ClassName===''?item.CourseClassID:item.ClassID),

                            thirdTitle:item.ClassRoomName,

                            thirdTitleID:item.ClassRoomID,

                            WeekDay:item.WeekDay,

                            ClassHourNO:item.ClassHourNO,

                            ScheduleType:item.ScheduleType

                        }


                    }));

                    dispatch({type:STT_SCHEDULE_CHANGE,data:{ScheduleCount,schedule}});

                    dispatch({type:SCHEDULE_LOADING_HIDE});

                }

            });

        }

    }

};

//科教师总表教师课表，搜索教师
const STTTeacherSearch = (val) => {

    return (dispatch,getState) => {

        let Key = val;

        let pattern =  utils.SearchReg({type:1,dispatch,ErrorTips:"您输入的工号或姓名不正确",key:Key});

        if (pattern){

            dispatch({type:SEARCH_LOADING_SHOW});

            dispatch({type:MANAGER_STT_LEFT_MENU_CANCEL_BTN_SHOW});

            dispatch({type:SEARCH_TEACHER_RESULT_SHOW});

            let { LoginUser,Manager,PeriodWeekTerm } = getState();

            let SchoolID = LoginUser.SchoolID;

            let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

            let SubjectID ='';

            ApiActions.GetTeacherBySubjectIDAndKey({

                SchoolID,PeriodID,SubjectID:'',Key,dispatch,Flag:0

            }).then(data => {

                if (data){

                    const result = data.map((item) => {

                        return {

                            id:item.TeacherID,

                            name:item.TeacherName

                        }

                    });

                    dispatch({type:SEARCH_TEACHER_RESULT_UPDATE,data:result});

                    dispatch({type:SEARCH_LOADING_HIDE});

                }

            });

        }



    };

};


//课程详情弹窗

const ScheduleDetailShow = (Params) => {

    return (dispatch,getState)=>{

        const { SchoolID } = getState().LoginUser;

        const { TeacherID,ScheduleID,ClassDate,ClassHourNO,SubjectID } = Params;

        dispatch({type:MANAGER_STT_SCHEDULE_DETAIL_MODAL_SHOW});

        ApiActions.GetScheduleDetailByUserID({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data){

                data['SubjectID'] = SubjectID;

                dispatch({type:MANAGER_STT_SCHEDULE_DETAIL_MODAL_INIT,data:data});

            }

            dispatch({type:MANAGER_STT_SCHEDULE_DETAIL_MODAL_LOADING_HIDE});

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

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = getState().Manager.SubjectCourseGradeClassRoom;

        const WeekNO = getState().Manager.SubjectTeacherTeacherSchedule.NowWeekNo;

        dispatch({ type:MANAGER_STT_CHANGE_TIME_MODAL_SHOW});

        dispatch({type:MANAGER_STT_CHANGE_TIME_MODAL_INIT,data:{TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName,StartEndTime,ClassHourType,NowDate,WeekDay,ItemClassHourCount,NowClassHourNO,WeekNO,ClassDate,ClassHourNO,ItemClassHour,ItemWeek}});

        dispatch({type:MANAGER_STT_CHANGE_TIME_MODAL_LOADING_HIDE});


    }

};


//点击某一个课时

const SelectClassHour = (params) => {

    return (dispatch,getState) => {

        const { SelectWeekDay,SelectClassHourNO,SelectDate } = params;

        dispatch({type:MANAGER_STT_CHANGE_TIME_MODAL_CLASSHOUR_PICK,data:{SelectWeekDay,SelectClassHourNO,SelectDate}})

    }

};




//调整时间切换周次

const WeekPick = (WeekNO) => {

    return (dispatch,getState) => {

        dispatch({type:MANAGER_STT_CHANGE_TIME_MODAL_INIT,data:{WeekNO}});

    }

};

//点击提交调整时间
const ChangeTimeCommit = () =>{

    return (dispatch,getState)=>{

        const { SelectDate,SelectClassHourNO,TeacherID,ClassDate,ClassHourNO,ScheduleID,NowClassRoomID,NowClassRoomName } = getState().Manager.SubjectTeacherTeacherSchedule.ChangeTime;

        if (SelectDate){

            dispatch({type:MANAGER_STT_CHANGE_TIME_MODAL_LOADING_SHOW});

            const { SchoolID,UserID } = getState().LoginUser;

            const ScheduleClassDateAndClassHourNO = `${SelectDate},${SelectClassHourNO}`;

            ApiActions.ChangeDateAndGetTea({

                SchoolID,ScheduleID,ScheduleClassDateAndClassHourNO,ClassDate,ClassHourNO,

                NowClassRoomID,NowClassRoomName,TeacherID,dispatch,UserID

            }).then(data=>{

                if (data===0){

                    dispatch(AppAlertActions.alertSuccess({title:"调整时间成功！"}));

                    dispatch({type:MANAGER_STT_CHANGE_TIME_MODAL_HIDE});

                    dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

                }

                dispatch({type:MANAGER_STT_CHANGE_TIME_MODAL_LOADING_HIDE});

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

        dispatch({ type:MANAGER_STT_ADJUST_CLASSROOM_MODAL_SHOW});

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

            dispatch({type:MANAGER_STT_ADJUST_CLASSROOM_MODAL_INIT,data:{ClassDate,ClassHourNO,TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName,ClassRoomList}});

            dispatch({type:MANAGER_STT_ADJUST_CLASSROOM_MODAL_LOADING_HIDE});

        });

    }

};

//点击教室搜索

const ClassRoomSearchClick = (SearchValue) => {

    return (dispatch,getState)=>{

        const Key = SearchValue.trim();

        if (Key){

            let pattern =  utils.SearchReg({type:2,dispatch,ErrorTips:"您输入的教室ID或名称不正确",key:Key});

            if (pattern){

                dispatch({type:MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW});

                dispatch({type:MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW});

                dispatch({type:MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW});

                const { SchoolID } = getState().LoginUser;

                const { ClassRoomList,NowClassRoomID } = getState().Manager.SubjectTeacherTeacherSchedule.AdjustClassRoom;

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

                    dispatch({type:MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE,data:SearchList});



                    dispatch({type:MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE});

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

        const { CheckedValue,TeacherID,ClassDate,ClassHourNO,ScheduleID } = getState().Manager.SubjectTeacherTeacherSchedule.AdjustClassRoom;

        const { SchoolID,UserID } = getState().LoginUser;

        if (CheckedValue){

            dispatch({type:MANAGER_STT_ADJUST_CLASSROOM_MODAL_LOADING_SHOW});

            ApiActions.ChangeClassRoomAndGetTea({

                SchoolID,ScheduleID,TeacherID,ClassHourNO,ClassDate,

                ScheduleClassRoomID:CheckedValue,dispatch,UserID

            }).then(data=>{

                if (data===0){

                    dispatch({type:MANAGER_STT_ADJUST_CLASSROOM_MODAL_HIDE});

                    dispatch(AppAlertActions.alertSuccess({title:"调整教室成功！"}));

                    dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

                }

                dispatch({type:MANAGER_STT_ADJUST_CLASSROOM_MODAL_LOADING_HIDE});

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

        const { SubjectID } = getState().Manager.SubjectTeacherTeacherSchedule.ScheduleDetail;

        const { SchoolID } = getState().LoginUser;

        dispatch({type:MANAGER_STT_REPLACE_SCHEDULE_MODAL_SHOW});

        ApiActions.GetTeacherBySubjectIDAndKey({SchoolID,PeriodID:'',SubjectID,Key:'',dispatch}).then(data=>{

            if (data){

                let TeacherList = data.map(item=>{

                    return {

                        ID:item.TeacherID,

                        Name:item.TeacherName

                    }

                });

                dispatch({type:MANAGER_STT_REPLACE_SCHEDULE_MODAL_INIT,data:{TeacherList,TeacherID,ClassDate,ClassHourNO,ScheduleID}});

            }

            dispatch({type:MANAGER_STT_REPLACE_SCHEDULE_MODAL_LOADING_HIDE});

        })

    }

};

//找人代课搜索

const ReplaceSearchClick = (SearchValue) => {

    return (dispatch,getState)=>{

        const Key = SearchValue.trim();

        if (Key){

            utils.SearchReg({key:Key,dispatch,ErrorTips:""})

            dispatch({type:MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW});

            dispatch({type:MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW});

            dispatch({type:MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW});

            const { SchoolID } = getState().LoginUser;

            const { SubjectID } = getState().Manager.SubjectTeacherTeacherSchedule.ScheduleDetail;

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

                dispatch({type:MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE,data:SearchList});



                dispatch({type:MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE});

            });

        }else{

            dispatch(AppAlertActions.alertWarn({title:"搜索值不能为空！"}));

        }

    }

};


//找人代课提交

const ReplaceScheduleCommit = () => {


    return (dispatch,getState)=>{

        const { ActiveTeacherID,TeacherID,ClassDate,ClassHourNO,ScheduleID } = getState().Manager.SubjectTeacherTeacherSchedule.ReplaceSchedule;

        const { SchoolID,UserID } = getState().LoginUser;

        if (ActiveTeacherID){

            dispatch({type:MANAGER_STT_REPLACE_SCHEDULE_MODAL_LOADING_SHOW});

            ApiActions.ChangeTeacher({

                SchoolID,ScheduleID,TeacherID,ClassHourNO,ClassDate,

                ScheduleTeacherID:ActiveTeacherID,dispatch,UserID

            }).then(data=>{

                if (data===0){

                    dispatch({type:MANAGER_STT_REPLACE_SCHEDULE_MODAL_HIDE});

                    dispatch(AppAlertActions.alertSuccess({title:"找人代课成功！"}));

                    dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

                }

                dispatch({type:MANAGER_STT_REPLACE_SCHEDULE_MODAL_LOADING_HIDE});

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

        dispatch({type:MANAGER_STT_SCHEDULE_DETAIL_MODAL_LOADING_SHOW});

        ApiActions.GetScheduleDetailByUserID({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data){

                dispatch({type:MANAGER_STT_SCHEDULE_DETAIL_MODAL_INIT,data:data});

            }

            dispatch({type:MANAGER_STT_SCHEDULE_DETAIL_MODAL_LOADING_HIDE});

        })

    }

};




export default {

    STT_NOW_WEEK_CHANGE,

    TEACHER_LIST_UPDATE,

    STT_SCHEDULE_CHANGE,

    SCHEDULE_LOADING_HIDE,

    SCHEDULE_LOADING_SHOW,

    SEARCH_TEACHER_RESULT_UPDATE,

    SEARCH_TEACHER_RESULT_SHOW,

    SEARCH_TEACHER_RESULT_HIDE,

    SEARCH_LOADING_HIDE,

    SEARCH_LOADING_SHOW,

    STT_SCHEDULE_INIT,

    MANAGER_STT_LEFT_MENU_SEARCH_INPUT_CHANGE,

    MANAGER_STT_LEFT_MENU_CANCEL_BTN_SHOW,

    MANAGER_STT_LEFT_MENU_CANCEL_BTN_HIDE,

    //课程详情

    MANAGER_STT_SCHEDULE_DETAIL_MODAL_SHOW,

    MANAGER_STT_SCHEDULE_DETAIL_MODAL_HIDE,

    MANAGER_STT_SCHEDULE_DETAIL_MODAL_LOADING_HIDE,

    MANAGER_STT_SCHEDULE_DETAIL_MODAL_INIT,

    MANAGER_STT_SCHEDULE_DETAIL_MODAL_LOADING_SHOW,

    //调整时间
    MANAGER_STT_CHANGE_TIME_MODAL_SHOW,

    MANAGER_STT_CHANGE_TIME_MODAL_HIDE,

    MANAGER_STT_CHANGE_TIME_MODAL_LOADING_SHOW,

    MANAGER_STT_CHANGE_TIME_MODAL_LOADING_HIDE,

    MANAGER_STT_CHANGE_TIME_MODAL_INIT,

    MANAGER_STT_CHANGE_TIME_MODAL_CLASSHOUR_PICK,

    //调整教室弹窗

    MANAGER_STT_ADJUST_CLASSROOM_MODAL_SHOW,

    MANAGER_STT_ADJUST_CLASSROOM_MODAL_HIDE,

    MANAGER_STT_ADJUST_CLASSROOM_MODAL_LOADING_SHOW,

    MANAGER_STT_ADJUST_CLASSROOM_MODAL_LOADING_HIDE,

    MANAGER_STT_ADJUST_CLASSROOM_MODAL_INIT,

    MANAGER_STT_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE,

    MANAGER_STT_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE,

    MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,

    MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW,

    MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE,

    MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW,

    MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE,

    MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE,

    MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW,

    MANAGER_STT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE,

    //找人代课

    MANAGER_STT_REPLACE_SCHEDULE_MODAL_SHOW,

    MANAGER_STT_REPLACE_SCHEDULE_MODAL_HIDE,

    MANAGER_STT_REPLACE_SCHEDULE_MODAL_LOADING_HIDE,

    MANAGER_STT_REPLACE_SCHEDULE_MODAL_LOADING_SHOW,

    MANAGER_STT_REPLACE_SCHEDULE_MODAL_INIT,

    MANAGER_STT_REPLACE_SCHEDULE_MODAL_TEACHER_PICK,

    MANAGER_STT_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,

    MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW,

    MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE,

    MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW,

    MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE,

    MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE,

    MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW,

    MANAGER_STT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE,

    STTTeacherUpdate,

    STTWeekUpdate,

    STTTeacherSearch,

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