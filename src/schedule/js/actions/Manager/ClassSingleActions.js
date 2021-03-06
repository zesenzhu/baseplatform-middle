import ApiActions from "../ApiActions";

import AppAlertActions from '../AppAlertActions';

import utils from '../utils';

const MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_SHOW = 'MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_SHOW';

const MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE = 'MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE';

const MANAGER_CLASS_SINGLE_WEEK_CHANGE = 'MANAGER_CLASS_SINGLE_WEEK_CHANGE';

const MANAGER_CLASS_SINGLE_INIT = 'MANAGER_CLASS_SINGLE_INIT';

const MANAGER_CLASS_SINGLE_CLASS_LIST_UPDATE = 'MANAGER_CLASS_SINGLE_CLASS_LIST_UPDATE';

const MANAGER_CLASS_SINGLE_SCHEDULE_UPDATE = 'MANAGER_CLASS_SINGLE_SCHEDULE_UPDATE';

const MANAGER_CLASS_SINGLE_WEEK_LIST_UPDATE = 'MANAGER_CLASS_SINGLE_WEEK_LIST_UPDATE';

const MANAGER_CLASS_SINGLE_SEARCH_RESULT_SHOW = 'MANAGER_CLASS_SINGLE_SEARCH_RESULT_SHOW';

const MANAGER_CLASS_SINGLE_SEARCH_RESULT_HIDE = 'MANAGER_CLASS_SINGLE_SEARCH_RESULT_HIDE';

const MANAGER_CLASS_SINGLE_SEARCH_LOADING_SHOW = 'MANAGER_CLASS_SINGLE_SEARCH_LOADING_SHOW';

const MANAGER_CLASS_SINGLE_SEARCH_LOADING_HIDE = 'MANAGER_CLASS_SINGLE_SEARCH_LOADING_HIDE';

const MANAGER_CLASS_SINGLE_SEARCHLIST_UPDATE = 'MANAGER_CLASS_SINGLE_SEARCHLIST_UPDATE';

const MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_MODAL_SHOW = 'MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_MODAL_SHOW';

const MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_MODAL_HIDE = 'MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_MODAL_HIDE';

const MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_LOADING_SHOW = 'MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_LOADING_SHOW';

const MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_LOADING_HIDE = 'MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_LOADING_HIDE';

const MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_DATA_UPDATE = 'MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_DATA_UPDATE';

const MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_PAGE_CHANGE= 'MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_PAGE_CHANGE';

const MANAGER_CSA_LEFT_MENU_SEARCH_INPUT_CHANGE = 'MANAGER_CAS_LEFT_MENU_SEARCH_INPUT_CHANGE';

const MANAGER_CSA_LEFT_MENU_CANCEL_BTN_SHOW = 'MANAGER_CAS_LEFT_MENU_CANCEL_BTN_SHOW';

const MANAGER_CSA_LEFT_MENU_CANCEL_BTN_HIDE = 'MANAGER_CAS_LEFT_MENU_CANCEL_BTN_HIDE';

//?????????????????????????????????
const MANAGER_CS_SCHEDULE_DETAIL_MODAL_SHOW = 'MANAGER_CS_SCHEDULE_DETAIL_MODAL_SHOW';

const MANAGER_CS_SCHEDULE_DETAIL_MODAL_HIDE = 'MANAGER_CS_SCHEDULE_DETAIL_MODAL_HIDE';

//loading

const MANAGER_CS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW = 'MANAGER_CS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW';

const MANAGER_CS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE = 'MANAGER_CS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE';

const MANAGER_CS_SCHEDULE_DETAIL_MODAL_INIT = 'MANAGER_CS_SCHEDULE_DETAIL_MODAL_INIT';


//??????????????????
const MANAGER_CS_CHANGE_TIME_MODAL_SHOW = 'MANAGER_CS_CHANGE_TIME_MODAL_SHOW';

const MANAGER_CS_CHANGE_TIME_MODAL_HIDE = 'MANAGER_CS_CHANGE_TIME_MODAL_HIDE';

const MANAGER_CS_CHANGE_TIME_MODAL_LOADING_SHOW = 'MANAGER_CS_CHANGE_TIME_MODAL_LOADING_SHOW';

const MANAGER_CS_CHANGE_TIME_MODAL_LOADING_HIDE = 'MANAGER_CS_CHANGE_TIME_MODAL_LOADING_HIDE';

const MANAGER_CS_CHANGE_TIME_MODAL_INIT = 'MANAGER_CS_CHANGE_TIME_MODAL_INIT';

const MANAGER_CS_CHANGE_TIME_MODAL_CLASSHOUR_PICK = 'MANAGER_CS_CHANGE_TIME_MODAL_CLASSHOUR_PICK';

//??????????????????

const MANAGER_CS_ADJUST_CLASSROOM_MODAL_SHOW = 'MANAGER_CS_ADJUST_CLASSROOM_MODAL_SHOW';

const MANAGER_CS_ADJUST_CLASSROOM_MODAL_HIDE = 'MANAGER_CS_ADJUST_CLASSROOM_MODAL_HIDE';

const MANAGER_CS_ADJUST_CLASSROOM_MODAL_LOADING_SHOW = 'MANAGER_CS_ADJUST_CLASSROOM_MODAL_LOADING_SHOW';

const MANAGER_CS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE = 'MANAGER_CS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE';

const MANAGER_CS_ADJUST_CLASSROOM_MODAL_INIT = 'MANAGER_CS_ADJUST_CLASSROOM_MODA_INIT';

const MANAGER_CS_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE = 'MANAGER_CS_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE';

const MANAGER_CS_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE = 'MANAGER_CS_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE';

const MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE = 'MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE';

const MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE = 'MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE';

const MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW = 'MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW';

const MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE = 'MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE';

const MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW = 'MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW';

const MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE = 'MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE';

const MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW = 'MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW';

const MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE = 'MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE';

//????????????

const MANAGER_CS_REPLACE_SCHEDULE_MODAL_SHOW = 'MANAGER_CS_REPLACE_SCHEDULE_MODAL_SHOW';

const MANAGER_CS_REPLACE_SCHEDULE_MODAL_HIDE = 'MANAGER_CS_REPLACE_SCHEDULE_MODAL_HIDE';

const MANAGER_CS_REPLACE_SCHEDULE_MODAL_LOADING_SHOW = 'MANAGER_CS_REPLACE_SCHEDULE_MODAL_LOADING_SHOW';

const MANAGER_CS_REPLACE_SCHEDULE_MODAL_LOADING_HIDE = 'MANAGER_CS_REPLACE_SCHEDULE_MODAL_LOADING_HIDE';

const MANAGER_CS_REPLACE_SCHEDULE_MODAL_INIT = 'MANAGER_CS_REPLACE_SCHEDULE_MODAL_INIT';

const MANAGER_CS_REPLACE_SCHEDULE_MODAL_TEACHER_PICK = 'MANAGER_CS_REPLACE_SCHEDULE_MODAL_TEACHER_PICK';

const MANAGER_CS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE = 'MANAGER_CS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE';

const MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW = 'MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW';

const MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE = 'MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE';

const MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW = 'MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW';

const MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE = 'MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE';

const MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE = 'MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE';

const MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW = 'MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW';

const MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE = 'MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE';





const ClassSingleScheduleUpdate = (pickInfo) =>{

    return (dispatch,getState) => {

        const { LoginUser,Manager,PeriodWeekTerm } = getState();

        let { SchoolID } = LoginUser;

        let ClassID = pickInfo.catChildrenId;

        let {WeekNO} = Manager.ClassSingle;

        ApiActions.GetScheduleOfClassOne({

            SchoolID,WeekNO,ClassID,dispatch

        }).then(data => {

            if (data){

                let { ScheduleCount} = data;

                let Schedule = utils.ScheduleRemoveRepeat(data.ItemSchedule.map((item) => {

                    return {

                        ...item,

                        title:item.SubjectName,

                        titleID:item.SubjectID,

                        secondTitle:item.TeacherName,

                        secondTitleID:item.TeacherID,

                        thirdTitle:item.ClassRoomName,

                        thirdTitleID:item.ClassRoomID,

                        WeekDay:item.WeekDay,

                        ClassHourNO:item.ClassHourNO,

                        ScheduleType:item.ScheduleType

                    }

                }));

                data.ItemCourseClass.map(item=>{

                    let ShiftClass = {

                        ClassID:item.ClassID,

                        WeekDay:item.WeekDayNO,

                        ClassHourNO:item.ClassHourNO,

                        IsShift:true

                    };

                    Schedule.push(ShiftClass);

                });

                dispatch({type:MANAGER_CLASS_SINGLE_SCHEDULE_UPDATE,data:{ScheduleCount,Schedule,PickClass:pickInfo.catChildrenName,PickClassID:pickInfo.catChildrenId}});

                dispatch({type:MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE});

            }

        });

    }

};



const WeekUpdate = () => {

    return (dispatch,getState) => {

        const { Manager,LoginUser } = getState();

        const { PickClass,PickClassID,WeekNO } = Manager.ClassSingle;
        //?????????????????????????????????????????????????????????
        if (PickClass === ''){

            dispatch({type:MANAGER_CLASS_SINGLE_SCHEDULE_UPDATE,data:{Schedule:[]}});

            dispatch({type:MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE});

        }else{

            let SchoolID = LoginUser.SchoolID;

            ApiActions.GetScheduleOfClassOne({

                SchoolID,WeekNO,ClassID:PickClassID,dispatch

            }).then(data => {

                if (data){

                    let { ScheduleCount} = data;

                    let Schedule = utils.ScheduleRemoveRepeat(data.ItemSchedule.map((item) => {

                        return {

                            ...item,

                            title:item.SubjectName,

                            titleID:item.SubjectID,

                            secondTitle:item.TeacherName,

                            secondTitleID:item.TeacherID,

                            thirdTitle:item.ClassRoomName,

                            thirdTitleID:item.ClassRoomID,

                            WeekDay:item.WeekDay,

                            ClassHourNO:item.ClassHourNO,

                            ScheduleType:item.ScheduleType

                        }

                    }));

                    data.ItemCourseClass.map(item=>{

                        let ShiftClass = {

                            ClassID:item.ClassID,

                            WeekDay:item.WeekDayNO,

                            ClassHourNO:item.ClassHourNO,

                            IsShift:true

                        };

                        Schedule.push(ShiftClass);

                    });

                    dispatch({type:MANAGER_CLASS_SINGLE_SCHEDULE_UPDATE,data:{ScheduleCount,Schedule}});

                    dispatch({type:MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE});

                }

            });

        }

    }

};


//????????????
const ClassSearch = (val) => {

    return (dispatch,getState) => {

        let Key = val;

        let pattern =  utils.SearchReg({type:2,dispatch,ErrorTips:"??????????????????ID??????????????????",key:Key});

        if (pattern){

            dispatch({type:MANAGER_CLASS_SINGLE_SEARCH_RESULT_SHOW});

            dispatch({type:MANAGER_CLASS_SINGLE_SEARCHLIST_UPDATE,data:[]});

            dispatch({type:MANAGER_CLASS_SINGLE_SEARCH_LOADING_SHOW});

            dispatch({type:MANAGER_CSA_LEFT_MENU_CANCEL_BTN_SHOW});

            let { LoginUser,Manager,PeriodWeekTerm } = getState();

            let SchoolID = LoginUser.SchoolID;

            let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;

            let SubjectID ='';

            ApiActions.GetClassByGradeIDAndKey({

                SchoolID,PeriodID,GradeID:'',Flag:0,Key,dispatch

            }).then(data => {

                if (data){

                    const result = data.map((item) => {

                        return {

                            id:item.ClassID,

                            name:item.ClassName

                        }

                    });

                    dispatch({type:MANAGER_CLASS_SINGLE_SEARCHLIST_UPDATE,data:result});



                    dispatch({type:MANAGER_CLASS_SINGLE_SEARCH_LOADING_HIDE});

                }

            });

        }

    };

};

//????????????????????????

const OptionalClassInit = ({ClassHourNO,WeekDay,ClassID,WeekNO}) => {

    return dispatch => {

        dispatch({type:MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_MODAL_SHOW});

        ApiActions.GetCourseClassInfo({ClassID,ClassHourNO,WeekNO,WeekDayNO:WeekDay,dispatch}).then(data=>{

           if (data){

               let DataSource = [];

               if (data.length>0){

                   DataSource = data.map((item,key)=>{

                       return {

                           key:key,

                           ...item,

                       }

                   })

               }

               dispatch({type:MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_DATA_UPDATE,data:DataSource});

           }

           dispatch({type:MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_LOADING_HIDE});

        });

    }

};


//??????????????????

const ScheduleDetailShow = (Params) => {

    return (dispatch,getState)=>{

        const { SchoolID } = getState().LoginUser;

        const { TeacherID,ScheduleID,ClassDate,ClassHourNO,SubjectID } = Params;

        dispatch({type:MANAGER_CS_SCHEDULE_DETAIL_MODAL_SHOW});

        ApiActions.GetScheduleDetailByUserID({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data){

                data['SubjectID'] = SubjectID;

                dispatch({type:MANAGER_CS_SCHEDULE_DETAIL_MODAL_INIT,data:data});

            }

            dispatch({type:MANAGER_CS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE});

        })

    }

};

//??????
const StopSchedule = (params) => {

    return (dispatch,getState) => {

        const { SchoolID,UserID } = getState().LoginUser;

        const { TeacherID,ClassDate,ClassHourNO,ScheduleID } = params;

        ApiActions.OverScheduleAndGetTea({UserID,ScheduleID,SchoolID,TeacherID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data===0){

                dispatch(AppAlertActions.alertSuccess({title:'????????????!'}));

                dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

            }

        });

    }

};

//????????????
const RebackStopSchedule = (params) => {

    return (dispatch,getState) => {

        const { SchoolID,UserID } = getState().LoginUser;

        const { TeacherID,ClassDate,ClassHourNO,ScheduleID } = params;

        ApiActions.CancelOverScheduleAndGetTea({UserID,ScheduleID,SchoolID,TeacherID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data===0){

                dispatch(AppAlertActions.alertSuccess({title:'??????????????????!'}));

                dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

            }

        });

    }

};

//??????????????????

const RebackTime = (params) => {

    return (dispatch,getState) => {

        const { SchoolID,UserID } = getState().LoginUser;

        const { TeacherID,ClassDate,ClassHourNO,ScheduleID } = params;

        ApiActions.CancelChangeDateAndGetTea({UserID,ScheduleID,SchoolID,TeacherID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data===0){

                dispatch(AppAlertActions.alertSuccess({title:'????????????????????????!'}));

                dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

            }

        });

    }

};




//????????????????????????

const ChangeTimeShow = (params) =>{

    return (dispatch,getState) => {

        const { ClassDate,ClassHourNO,StartEndTime,WeekDay,

            ClassHourName,ClassHourType,TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName

        } = params;

        const { ItemWeek,NowDate } = getState().PeriodWeekTerm;

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = getState().Manager.SubjectCourseGradeClassRoom;

        const WeekNO = getState().Manager.ClassSingle.WeekNO;

        dispatch({ type:MANAGER_CS_CHANGE_TIME_MODAL_SHOW});

        dispatch({type:MANAGER_CS_CHANGE_TIME_MODAL_INIT,data:{TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName,StartEndTime,ClassHourType,NowDate,WeekDay,ItemClassHourCount,NowClassHourNO,WeekNO,ClassDate,ClassHourNO,ItemClassHour,ItemWeek}});

        dispatch({type:MANAGER_CS_CHANGE_TIME_MODAL_LOADING_HIDE});


    }

};


//?????????????????????

const SelectClassHour = (params) => {

    return (dispatch,getState) => {

        const { SelectWeekDay,SelectClassHourNO,SelectDate } = params;

        dispatch({type:MANAGER_CS_CHANGE_TIME_MODAL_CLASSHOUR_PICK,data:{SelectWeekDay,SelectClassHourNO,SelectDate}})

    }

};




//????????????????????????

const WeekPick = (WeekNO) => {

    return (dispatch,getState) => {

        dispatch({type:MANAGER_CS_CHANGE_TIME_MODAL_INIT,data:{WeekNO}});

    }

};

//????????????????????????
const ChangeTimeCommit = () =>{

    return (dispatch,getState)=>{

        const { SelectDate,SelectClassHourNO,TeacherID,ClassDate,ClassHourNO,ScheduleID,NowClassRoomID,NowClassRoomName } = getState().Manager.ClassSingle.ChangeTime;

        if (SelectDate){

            dispatch({type:MANAGER_CS_CHANGE_TIME_MODAL_LOADING_SHOW});

            const { SchoolID,UserID } = getState().LoginUser;

            const ScheduleClassDateAndClassHourNO = `${SelectDate},${SelectClassHourNO}`;

            ApiActions.ChangeDateAndGetTea({

                SchoolID,ScheduleID,ScheduleClassDateAndClassHourNO,ClassDate,ClassHourNO,

                NowClassRoomID,NowClassRoomName,TeacherID,dispatch,UserID

            }).then(data=>{

                if (data===0){

                    dispatch(AppAlertActions.alertSuccess({title:"?????????????????????"}));

                    dispatch({type:MANAGER_CS_CHANGE_TIME_MODAL_HIDE});

                    dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

                }

                dispatch({type:MANAGER_CS_CHANGE_TIME_MODAL_LOADING_HIDE});

            })

        }else {

            dispatch(AppAlertActions.alertWarn({title:"???????????????????????????"}));

        }

    }

};



//??????????????????show

const AdjustClassRoomShow = (params) => {

    return (dispatch,getState)=>{

        const { ClassDate,ClassHourNO,TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName } = params;

        const { SchoolID } = getState().LoginUser;

        dispatch({ type:MANAGER_CS_ADJUST_CLASSROOM_MODAL_SHOW});

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

            dispatch({type:MANAGER_CS_ADJUST_CLASSROOM_MODAL_INIT,data:{ClassDate,ClassHourNO,TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName,ClassRoomList}});

            dispatch({type:MANAGER_CS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE});

        });

    }

};

//??????????????????

const ClassRoomSearchClick = (SearchValue) => {

    return (dispatch,getState)=>{

        const Key = SearchValue.trim();

        if (Key){

            dispatch({type:MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW});

            dispatch({type:MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW});

            dispatch({type:MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW});

            const { SchoolID } = getState().LoginUser;

            const { ClassRoomList,NowClassRoomID } = getState().Manager.ClassSingle.AdjustClassRoom;

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

                dispatch({type:MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE,data:SearchList});



                dispatch({type:MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE});

            });

        }else{

            dispatch(AppAlertActions.alertWarn({title:"????????????????????????"}));

        }

    }

};

//????????????

const AdjustClassRoomCommit = () =>{

    return (dispatch,getState) => {

        const { CheckedValue,TeacherID,ClassDate,ClassHourNO,ScheduleID } = getState().Manager.ClassSingle.AdjustClassRoom;

        const { SchoolID,UserID } = getState().LoginUser;

        if (CheckedValue){

            dispatch({type:MANAGER_CS_ADJUST_CLASSROOM_MODAL_LOADING_SHOW});

            ApiActions.ChangeClassRoomAndGetTea({

                SchoolID,ScheduleID,TeacherID,ClassHourNO,ClassDate,

                ScheduleClassRoomID:CheckedValue,dispatch,UserID

            }).then(data=>{

                if (data===0){

                    dispatch({type:MANAGER_CS_ADJUST_CLASSROOM_MODAL_HIDE});

                    dispatch(AppAlertActions.alertSuccess({title:"?????????????????????"}));

                    dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

                }

                dispatch({type:MANAGER_CS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE});

            });

        }else{

            dispatch(AppAlertActions.alertWarn({title:"?????????????????????!"}));

        }

    }

};

//??????????????????

const RebackClassRoom = (params) => {

    return (dispatch,getState) => {

        const { TeacherID,ClassDate,ClassHourNO,ScheduleID } = params;

        const { SchoolID,UserID } = getState().LoginUser;

        ApiActions.CancelChangeClassRoomAndGetTea({

            TeacherID,ClassDate,ClassHourNO,ScheduleID,SchoolID,dispatch,UserID

        }).then(data=>{

            if (data===0){

                dispatch(AppAlertActions.alertSuccess({title:"???????????????"}));

                dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

            }

        })

    }

};


//??????????????????

const ChooseReplaceTeacherShow = (params) => {

    return (dispatch,getState) => {

        const { TeacherID,ClassDate,ClassHourNO,ScheduleID } = params;

        const { SubjectID } = getState().Manager.ClassSingle.ScheduleDetail;

        const { SchoolID } = getState().LoginUser;

        dispatch({type:MANAGER_CS_REPLACE_SCHEDULE_MODAL_SHOW});

        ApiActions.GetTeacherBySubjectIDAndKey({SchoolID,PeriodID:'',SubjectID,Key:'',dispatch}).then(data=>{

            if (data){

                let TeacherList = data.map(item=>{

                    return {

                        ID:item.TeacherID,

                        Name:item.TeacherName

                    }

                });

                dispatch({type:MANAGER_CS_REPLACE_SCHEDULE_MODAL_INIT,data:{TeacherList,TeacherID,ClassDate,ClassHourNO,ScheduleID}});

            }

            dispatch({type:MANAGER_CS_REPLACE_SCHEDULE_MODAL_LOADING_HIDE});

        })

    }

};

//??????????????????

const ReplaceSearchClick = (SearchValue) => {

    return (dispatch,getState)=>{

        const Key = SearchValue.trim();

        if (Key){

            dispatch({type:MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW});

            dispatch({type:MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW});

            dispatch({type:MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW});

            const { SchoolID } = getState().LoginUser;

            const { SubjectID } = getState().Manager.ClassSingle.ScheduleDetail;

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

                dispatch({type:MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE,data:SearchList});



                dispatch({type:MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE});

            });

        }else{

            dispatch(AppAlertActions.alertWarn({title:"????????????????????????"}));

        }

    }

};


//??????????????????

const ReplaceScheduleCommit = () => {


    return (dispatch,getState)=>{

        const { ActiveTeacherID,TeacherID,ClassDate,ClassHourNO,ScheduleID } = getState().Manager.ClassSingle.ReplaceSchedule;

        const { SchoolID,UserID } = getState().LoginUser;

        if (ActiveTeacherID){

            dispatch({type:MANAGER_CS_REPLACE_SCHEDULE_MODAL_LOADING_SHOW});

            ApiActions.ChangeTeacher({

                SchoolID,ScheduleID,TeacherID,ClassHourNO,ClassDate,

                ScheduleTeacherID:ActiveTeacherID,dispatch,UserID

            }).then(data=>{

                if (data===0){

                    dispatch({type:MANAGER_CS_REPLACE_SCHEDULE_MODAL_HIDE});

                    dispatch(AppAlertActions.alertSuccess({title:"?????????????????????"}));

                    dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

                }

                dispatch({type:MANAGER_CS_REPLACE_SCHEDULE_MODAL_LOADING_HIDE});

            });

        }else{

            dispatch(AppAlertActions.alertWarn({title:"?????????????????????!"}));

        }

    }

};


//??????????????????

const RebackReplaceSchedule = (params) => {

    return (dispatch,getState) => {

        const { TeacherID,ClassDate,ClassHourNO,ScheduleID } = params;

        const { SchoolID,UserID } = getState().LoginUser;

        ApiActions.CancelChangeTeacherAndGetTea({

            TeacherID,ClassDate,ClassHourNO,ScheduleID,SchoolID,dispatch,UserID

        }).then(data=>{

            if (data===0){

                dispatch(AppAlertActions.alertSuccess({title:"???????????????"}));

                dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

            }

        })

    }

};





//?????????????????????????????????

const ScheduleModalInfoUpdate = ({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}) => {

    return dispatch => {

        dispatch({type:MANAGER_CS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW});

        ApiActions.GetScheduleDetailByUserID({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data){

                dispatch({type:MANAGER_CS_SCHEDULE_DETAIL_MODAL_INIT,data:data});

            }

            dispatch({type:MANAGER_CS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE});

        })

    }

};






export default {

    MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_SHOW,

    MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_HIDE,

    MANAGER_CLASS_SINGLE_WEEK_CHANGE,

    MANAGER_CLASS_SINGLE_CLASS_LIST_UPDATE,

    MANAGER_CLASS_SINGLE_INIT,

    MANAGER_CLASS_SINGLE_SCHEDULE_UPDATE,

    MANAGER_CLASS_SINGLE_WEEK_LIST_UPDATE,

    MANAGER_CLASS_SINGLE_SEARCHLIST_UPDATE,

    MANAGER_CLASS_SINGLE_SEARCH_LOADING_SHOW,

    MANAGER_CLASS_SINGLE_SEARCH_LOADING_HIDE,

    MANAGER_CLASS_SINGLE_SEARCH_RESULT_SHOW,

    MANAGER_CLASS_SINGLE_SEARCH_RESULT_HIDE,

    MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_MODAL_SHOW,

    MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_MODAL_HIDE,

    MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_LOADING_SHOW,

    MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_LOADING_HIDE,

    MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_DATA_UPDATE,

    MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_PAGE_CHANGE,

    MANAGER_CSA_LEFT_MENU_SEARCH_INPUT_CHANGE,

    MANAGER_CSA_LEFT_MENU_CANCEL_BTN_SHOW,

    MANAGER_CSA_LEFT_MENU_CANCEL_BTN_HIDE,

    //????????????

    MANAGER_CS_SCHEDULE_DETAIL_MODAL_SHOW,

    MANAGER_CS_SCHEDULE_DETAIL_MODAL_HIDE,

    MANAGER_CS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE,

    MANAGER_CS_SCHEDULE_DETAIL_MODAL_INIT,

    MANAGER_CS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW,

    //????????????
    MANAGER_CS_CHANGE_TIME_MODAL_SHOW,

    MANAGER_CS_CHANGE_TIME_MODAL_HIDE,

    MANAGER_CS_CHANGE_TIME_MODAL_LOADING_SHOW,

    MANAGER_CS_CHANGE_TIME_MODAL_LOADING_HIDE,

    MANAGER_CS_CHANGE_TIME_MODAL_INIT,

    MANAGER_CS_CHANGE_TIME_MODAL_CLASSHOUR_PICK,

    //??????????????????

    MANAGER_CS_ADJUST_CLASSROOM_MODAL_SHOW,

    MANAGER_CS_ADJUST_CLASSROOM_MODAL_HIDE,

    MANAGER_CS_ADJUST_CLASSROOM_MODAL_LOADING_SHOW,

    MANAGER_CS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE,

    MANAGER_CS_ADJUST_CLASSROOM_MODAL_INIT,

    MANAGER_CS_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE,

    MANAGER_CS_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE,

    MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,

    MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW,

    MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE,

    MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW,

    MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE,

    MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE,

    MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW,

    MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE,

    //????????????

    MANAGER_CS_REPLACE_SCHEDULE_MODAL_SHOW,

    MANAGER_CS_REPLACE_SCHEDULE_MODAL_HIDE,

    MANAGER_CS_REPLACE_SCHEDULE_MODAL_LOADING_HIDE,

    MANAGER_CS_REPLACE_SCHEDULE_MODAL_LOADING_SHOW,

    MANAGER_CS_REPLACE_SCHEDULE_MODAL_INIT,

    MANAGER_CS_REPLACE_SCHEDULE_MODAL_TEACHER_PICK,

    MANAGER_CS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,

    MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW,

    MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE,

    MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW,

    MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE,

    MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE,

    MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW,

    MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE,

    ClassSingleScheduleUpdate,

    WeekUpdate,

    ClassSearch,

    OptionalClassInit,

    //???????????????????????????????????????

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

