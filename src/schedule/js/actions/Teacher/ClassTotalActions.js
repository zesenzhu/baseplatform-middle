import ApiActions from "../ApiActions";

import AppAlertActions from '../AppAlertActions';

import utils from '../utils';

const TEACHER_CLASS_TOTAL_INIT = 'TEACHER_CLASS_TOTAL_INIT';




//设置班级下拉菜单

const TEACHER_CLASS_TOTAL_CLASS_DROP_SHOW = 'TEACHER_CLASS_TOTAL_CLASS_DROP_SHOW';

const TEACHER_CLASS_TOTAL_CLASS_DROP_HIDE = 'TEACHER_CLASS_TOTAL_CLASS_DROP_HIDE';

//选中班级下拉菜单
const TEACHER_CLASS_TOTAL_CLASS_DROP_CHANGE = 'TEACHER_CLASS_TOTAL_CLASS_DROP_CHANGE';


//班级列表更新
const  TEACHER_CLASS_TOTAL_CLASS_DROP_LIST_UPDATE = 'TEACHER_CLASS_TOTAL_CLASS_DROP_LIST_UPDATE';


//单个班级名称和ID变化
const TEACHER_CLASS_TOTAL_CLASS_UPDATE = 'TEACHER_CLASS_TOTAL_CLASS_UPDATE';

const TEACHER_CLASS_TOTAL_CLASS_CLASSHOUR_UPDATE = 'TEACHER_CLASS_TOTAL_CLASS_CLASSHOUR_UPDATE';


const TEACHER_CLASS_TOTAL_WEEK_CHANGE = 'TEACHER_CLASS_TOTAL_WEEK_CHANGE';


const TEACHER_CLASS_TOTAL_SCHEDULE_UPDATE = 'TEACHER_CLASS_TOTAL_SCHEDULE_UPDATE';

const TEACHER_CLASS_TOTAL_CLASS_COUNT = 'TEACHER_CLASS_TOTAL_CLASS_COUNT';

const TEACHER_CLASS_TOTAL_WEEK_LIST_UPDATE = 'TEACHER_CLASS_TOTAL_WEEK_LIST_UPDATE';

const TEACHER_CLASS_TOTAL_LOADING_HIDE = 'TEACHER_CLASS_TOTAL_LOADING_HIDE';

const TEACHER_CLASS_TOTAL_LOADING_SHOW = 'TEACHER_CLASS_TOTAL_LOADING_SHOW';




//走班弹窗

const TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_SHOW = 'TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_SHOW';

const TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_HIDE = 'TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_HIDE';


//数据变化
const TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_DATA_UPDATE = 'TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_DATA_UPDATE';

const TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_LOADING_HIDE = 'TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_LOADING_HIDE';

const TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_LOADING_SHOW = 'TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_LOADING_SHOW';

//分页变化

const TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_PAGE_CHANGE = 'TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_PAGE_CHANGE';

//课程详情弹窗开启和关闭
const TEACHER_CT_SCHEDULE_DETAIL_MODAL_SHOW = 'TEACHER_CT_SCHEDULE_DETAIL_MODAL_SHOW';

const TEACHER_CT_SCHEDULE_DETAIL_MODAL_HIDE = 'TEACHER_CT_SCHEDULE_DETAIL_MODAL_HIDE';

//loading

const TEACHER_CT_SCHEDULE_DETAIL_MODAL_LOADING_SHOW = 'TEACHER_CT_SCHEDULE_DETAIL_MODAL_LOADING_SHOW';

const TEACHER_CT_SCHEDULE_DETAIL_MODAL_LOADING_HIDE = 'TEACHER_CT_SCHEDULE_DETAIL_MODAL_LOADING_HIDE';

const TEACHER_CT_SCHEDULE_DETAIL_MODAL_INIT = 'TEACHER_CT_SCHEDULE_DETAIL_MODAL_INIT';


//调整时间弹窗
const TEACHER_CT_CHANGE_TIME_MODAL_SHOW = 'TEACHER_CT_CHANGE_TIME_MODAL_SHOW';

const TEACHER_CT_CHANGE_TIME_MODAL_HIDE = 'TEACHER_CT_CHANGE_TIME_MODAL_HIDE';

const TEACHER_CT_CHANGE_TIME_MODAL_LOADING_SHOW = 'TEACHER_CT_CHANGE_TIME_MODAL_LOADING_SHOW';

const TEACHER_CT_CHANGE_TIME_MODAL_LOADING_HIDE = 'TEACHER_CT_CHANGE_TIME_MODAL_LOADING_HIDE';

const TEACHER_CT_CHANGE_TIME_MODAL_INIT = 'TEACHER_CT_CHANGE_TIME_MODAL_INIT';

const TEACHER_CT_CHANGE_TIME_MODAL_CLASSHOUR_PICK = 'TEACHER_CT_CHANGE_TIME_MODAL_CLASSHOUR_PICK';

//调整教室弹窗

const TEACHER_CT_ADJUST_CLASSROOM_MODAL_SHOW = 'TEACHER_CT_ADJUST_CLASSROOM_MODAL_SHOW';

const TEACHER_CT_ADJUST_CLASSROOM_MODAL_HIDE = 'TEACHER_CT_ADJUST_CLASSROOM_MODAL_HIDE';

const TEACHER_CT_ADJUST_CLASSROOM_MODAL_LOADING_SHOW = 'TEACHER_CT_ADJUST_CLASSROOM_MODAL_LOADING_SHOW';

const TEACHER_CT_ADJUST_CLASSROOM_MODAL_LOADING_HIDE = 'TEACHER_CT_ADJUST_CLASSROOM_MODAL_LOADING_HIDE';

const TEACHER_CT_ADJUST_CLASSROOM_MODAL_INIT = 'TEACHER_CT_ADJUST_CLASSROOM_MODA_INIT';

const TEACHER_CT_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE = 'TEACHER_CT_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE';

const TEACHER_CT_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE = 'TEACHER_CT_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE';

const TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE = 'TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE';

const TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE = 'TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE';

const TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW = 'TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW';

const TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE = 'TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE';

const TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW = 'TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW';

const TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE = 'TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE';

const TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW = 'TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW';

const TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE = 'TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE';

//找人代课

const TEACHER_CT_REPLACE_SCHEDULE_MODAL_SHOW = 'TEACHER_CT_REPLACE_SCHEDULE_MODAL_SHOW';

const TEACHER_CT_REPLACE_SCHEDULE_MODAL_HIDE = 'TEACHER_CT_REPLACE_SCHEDULE_MODAL_HIDE';

const TEACHER_CT_REPLACE_SCHEDULE_MODAL_LOADING_SHOW = 'TEACHER_CT_REPLACE_SCHEDULE_MODAL_LOADING_SHOW';

const TEACHER_CT_REPLACE_SCHEDULE_MODAL_LOADING_HIDE = 'TEACHER_CT_REPLACE_SCHEDULE_MODAL_LOADING_HIDE';

const TEACHER_CT_REPLACE_SCHEDULE_MODAL_INIT = 'TEACHER_CT_REPLACE_SCHEDULE_MODAL_INIT';

const TEACHER_CT_REPLACE_SCHEDULE_MODAL_TEACHER_PICK = 'TEACHER_CT_REPLACE_SCHEDULE_MODAL_TEACHER_PICK';

const TEACHER_CT_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE = 'TEACHER_CT_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE';

const TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW = 'TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW';

const TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE = 'TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE';

const TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW = 'TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW';

const TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE = 'TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE';

const TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE = 'TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE';

const TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW = 'TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW';

const TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE = 'TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE';

//是否显示空

const TEACHER_CT_EMPTY_CLASSES_SHOW = 'TEACHER_CT_EMPTY_CLASSES_SHOW';

const TEACHER_CT_EMPTY_CLASSES_HIDE = 'TEACHER_CT_EMPTY_CLASSES_HIDE';



const ClassTotalPageUpdate = () =>{

    return (dispatch,getState) => {

        dispatch({type:TEACHER_CLASS_TOTAL_LOADING_SHOW});

        const {LoginUser,Teacher} = getState();
        //获取需要传递的参数
        let {SchoolID} =LoginUser;

        let { WeekNO,ClassDropSelectd,ClassID,ClassDropShow } = Teacher.ClassTotal;

        let NewClassID = '';

        //判断是否是多个行政班的班主任
        if (ClassDropShow){

            NewClassID = ClassDropSelectd.value;

        }else{

            NewClassID = ClassID;

        }

        ApiActions.GetScheduleOfClassOne({

            SchoolID,WeekNO,ClassID:NewClassID,dispatch

        }).then(json => {

            if (json){

                let Schedule = utils.ScheduleRemoveRepeat(json.ItemSchedule.map((item) => {

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

                json.ItemCourseClass.map(item=>{

                    let ShiftClass = {

                        ClassID:item.ClassID,

                        WeekDay:item.WeekDayNO,

                        ClassHourNO:item.ClassHourNO,

                        IsShift:true

                    };

                    Schedule.push(ShiftClass);

                });

                dispatch({type:TEACHER_CLASS_TOTAL_SCHEDULE_UPDATE,data:Schedule});

            }

            dispatch({type:TEACHER_CLASS_TOTAL_LOADING_HIDE});

        });


    }

};


const ClassTotalClassDropChange = () =>{

    return (dispatch,getState)=>{

        dispatch({type:TEACHER_CLASS_TOTAL_LOADING_SHOW});

        const { ClassDropSelectd,WeekNO } = getState().Teacher.ClassTotal;

        const { SchoolID } = getState().LoginUser;

        const ClassID = ClassDropSelectd.value;

        ApiActions.GetClassInfoByGanger({SchoolID,ClassID,dispatch}).then(data=>{

            if (data){

                const { ItemClassHour,ItemClassHourCount } = data;

                dispatch({type:TEACHER_CLASS_TOTAL_CLASS_CLASSHOUR_UPDATE,data:{ItemClassHour,ItemClassHourCount}});

                ApiActions.GetScheduleOfClassOne({

                    SchoolID,WeekNO,ClassID,dispatch

                }).then(json => {

                    if (json){

                        let Schedule = json.ItemSchedule.map((item) => {

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

                        });

                        json.ItemCourseClass.map(item=>{

                            let ShiftClass = {

                                ClassID:item.ClassID,

                                WeekDay:item.WeekDayNO,

                                ClassHourNO:item.ClassHourNO,

                                IsShift:true

                            };

                            Schedule.push(ShiftClass);

                        });

                        dispatch({type:TEACHER_CLASS_TOTAL_SCHEDULE_UPDATE,data:Schedule});

                    }

                    dispatch({type:TEACHER_CLASS_TOTAL_LOADING_HIDE});

                });

            }

        });

    }

};


//走班课程显示弹窗

const OptionalClassInit = ({ClassHourNO,WeekDay,ClassID,WeekNO}) => {

    return dispatch => {

        dispatch({type:TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_SHOW});

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

                dispatch({type:TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_DATA_UPDATE,data:DataSource});

            }

            dispatch({type:TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_LOADING_HIDE});

        });

    }

};

//课程详情弹窗

const ScheduleDetailShow = (Params) => {

    return (dispatch,getState)=>{

        const { SchoolID } = getState().LoginUser;

        const { TeacherID,ScheduleID,ClassDate,ClassHourNO,SubjectID } = Params;

        dispatch({type:TEACHER_CT_SCHEDULE_DETAIL_MODAL_SHOW});

        ApiActions.GetScheduleDetailByUserID({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data){

                data['SubjectID'] = SubjectID;

                dispatch({type:TEACHER_CT_SCHEDULE_DETAIL_MODAL_INIT,data:data});

            }

            dispatch({type:TEACHER_CT_SCHEDULE_DETAIL_MODAL_LOADING_HIDE});

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

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = getState().Teacher.ClassTotal;

        const WeekNO = getState().Teacher.ClassTotal.WeekNO;

        dispatch({ type:TEACHER_CT_CHANGE_TIME_MODAL_SHOW});

        dispatch({type:TEACHER_CT_CHANGE_TIME_MODAL_INIT,data:{TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName,StartEndTime,ClassHourType,NowDate,WeekDay,ItemClassHourCount,NowClassHourNO,WeekNO,ClassDate,ClassHourNO,ItemClassHour,ItemWeek}});

        dispatch({type:TEACHER_CT_CHANGE_TIME_MODAL_LOADING_HIDE});


    }

};


//点击某一个课时

const SelectClassHour = (params) => {

    return (dispatch,getState) => {

        const { SelectWeekDay,SelectClassHourNO,SelectDate } = params;

        dispatch({type:TEACHER_CT_CHANGE_TIME_MODAL_CLASSHOUR_PICK,data:{SelectWeekDay,SelectClassHourNO,SelectDate}})

    }

};




//调整时间切换周次

const WeekPick = (WeekNO) => {

    return (dispatch,getState) => {

        dispatch({type:TEACHER_CT_CHANGE_TIME_MODAL_INIT,data:{WeekNO}});

    }

};

//点击提交调整时间
const ChangeTimeCommit = () =>{

    return (dispatch,getState)=>{

        const { SelectDate,SelectClassHourNO,TeacherID,ClassDate,ClassHourNO,ScheduleID,NowClassRoomID,NowClassRoomName } = getState().Teacher.ClassTotal.ChangeTime;

        if (SelectDate){

            dispatch({type:TEACHER_CT_CHANGE_TIME_MODAL_LOADING_SHOW});

            const { SchoolID,UserID } = getState().LoginUser;

            const ScheduleClassDateAndClassHourNO = `${SelectDate},${SelectClassHourNO}`;

            ApiActions.ChangeDateAndGetTea({

                SchoolID,ScheduleID,ScheduleClassDateAndClassHourNO,ClassDate,ClassHourNO,

                NowClassRoomID,NowClassRoomName,TeacherID,dispatch,UserID

            }).then(data=>{

                if (data===0){

                    dispatch(AppAlertActions.alertSuccess({title:"调整时间成功！"}));

                    dispatch({type:TEACHER_CT_CHANGE_TIME_MODAL_HIDE});

                    dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

                }

                dispatch({type:TEACHER_CT_CHANGE_TIME_MODAL_LOADING_HIDE});

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

        dispatch({ type:TEACHER_CT_ADJUST_CLASSROOM_MODAL_SHOW});

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

            dispatch({type:TEACHER_CT_ADJUST_CLASSROOM_MODAL_INIT,data:{ClassDate,ClassHourNO,TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName,ClassRoomList}});

            dispatch({type:TEACHER_CT_ADJUST_CLASSROOM_MODAL_LOADING_HIDE});

        });

    }

};

//点击教室搜索

const ClassRoomSearchClick = (SearchValue) => {

    return (dispatch,getState)=>{

        const Key = SearchValue.trim();

        if (Key){

            dispatch({type:TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW});

            dispatch({type:TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW});

            dispatch({type:TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW});

            const { SchoolID } = getState().LoginUser;

            const { ClassRoomList,NowClassRoomID } = getState().Teacher.ClassTotal.AdjustClassRoom;

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

                dispatch({type:TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE,data:SearchList});



                dispatch({type:TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE});

            });

        }else{

            dispatch(AppAlertActions.alertWarn({title:"搜索值不能为空！"}));

        }

    }

};

//教室提交

const AdjustClassRoomCommit = () =>{

    return (dispatch,getState) => {

        const { CheckedValue,TeacherID,ClassDate,ClassHourNO,ScheduleID } = getState().Teacher.ClassTotal.AdjustClassRoom;

        const { SchoolID,UserID } = getState().LoginUser;

        if (CheckedValue){

            dispatch({type:TEACHER_CT_ADJUST_CLASSROOM_MODAL_LOADING_SHOW});

            ApiActions.ChangeClassRoomAndGetTea({

                SchoolID,ScheduleID,TeacherID,ClassHourNO,ClassDate,

                ScheduleClassRoomID:CheckedValue,dispatch,UserID

            }).then(data=>{

                if (data===0){

                    dispatch({type:TEACHER_CT_ADJUST_CLASSROOM_MODAL_HIDE});

                    dispatch(AppAlertActions.alertSuccess({title:"调整教室成功！"}));

                    dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

                }

                dispatch({type:TEACHER_CT_ADJUST_CLASSROOM_MODAL_LOADING_HIDE});

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

        const { SubjectID } = getState().Teacher.ClassTotal.ScheduleDetail;

        const { SchoolID } = getState().LoginUser;

        dispatch({type:TEACHER_CT_REPLACE_SCHEDULE_MODAL_SHOW});

        ApiActions.GetTeacherBySubjectIDAndKey({SchoolID,PeriodID:'',SubjectID,Key:'',dispatch}).then(data=>{

            if (data){

                let TeacherList = data.map(item=>{

                    return {

                        ID:item.TeacherID,

                        Name:item.TeacherName

                    }

                });

                dispatch({type:TEACHER_CT_REPLACE_SCHEDULE_MODAL_INIT,data:{TeacherList,TeacherID,ClassDate,ClassHourNO,ScheduleID}});

            }

            dispatch({type:TEACHER_CT_REPLACE_SCHEDULE_MODAL_LOADING_HIDE});

        })

    }

};

//找人代课搜索

const ReplaceSearchClick = (SearchValue) => {

    return (dispatch,getState)=>{

        const Key = SearchValue.trim();

        if (Key){

            dispatch({type:TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW});

            dispatch({type:TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW});

            dispatch({type:TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW});

            const { SchoolID } = getState().LoginUser;

            const { SubjectID } = getState().Teacher.ClassTotal.ScheduleDetailModal;

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

                dispatch({type:TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE,data:SearchList});



                dispatch({type:TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE});

            });

        }else{

            dispatch(AppAlertActions.alertWarn({title:"搜索值不能为空！"}));

        }

    }

};


//找人代课提交

const ReplaceScheduleCommit = () => {


    return (dispatch,getState)=>{

        const { ActiveTeacherID,TeacherID,ClassDate,ClassHourNO,ScheduleID } = getState().Teacher.ClassTotal.ReplaceSchedule;

        const { SchoolID,UserID } = getState().LoginUser;

        if (ActiveTeacherID){

            dispatch({type:TEACHER_CT_REPLACE_SCHEDULE_MODAL_LOADING_SHOW});

            ApiActions.ChangeTeacher({

                SchoolID,ScheduleID,TeacherID,ClassHourNO,ClassDate,

                ScheduleTeacherID:ActiveTeacherID,dispatch,UserID

            }).then(data=>{

                if (data===0){

                    dispatch({type:TEACHER_CT_REPLACE_SCHEDULE_MODAL_HIDE});

                    dispatch(AppAlertActions.alertSuccess({title:"找人代课成功！"}));

                    dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

                }

                dispatch({type:TEACHER_CT_REPLACE_SCHEDULE_MODAL_LOADING_HIDE});

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

        dispatch({type:TEACHER_CT_SCHEDULE_DETAIL_MODAL_LOADING_SHOW});

        ApiActions.GetScheduleDetailByUserID({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data){

                dispatch({type:TEACHER_CT_SCHEDULE_DETAIL_MODAL_INIT,data:data});

            }

            dispatch({type:TEACHER_CT_SCHEDULE_DETAIL_MODAL_LOADING_HIDE});

        })

    }

};


export default {

    TEACHER_CLASS_TOTAL_INIT,

    TEACHER_CLASS_TOTAL_CLASS_DROP_SHOW,

    TEACHER_CLASS_TOTAL_CLASS_DROP_HIDE,

    TEACHER_CLASS_TOTAL_CLASS_DROP_CHANGE,

    TEACHER_CLASS_TOTAL_CLASS_DROP_LIST_UPDATE,

    TEACHER_CLASS_TOTAL_CLASS_UPDATE,

    TEACHER_CLASS_TOTAL_CLASS_CLASSHOUR_UPDATE,

    TEACHER_CLASS_TOTAL_WEEK_CHANGE,

    TEACHER_CLASS_TOTAL_SCHEDULE_UPDATE,

    TEACHER_CLASS_TOTAL_WEEK_LIST_UPDATE,

    TEACHER_CLASS_TOTAL_LOADING_HIDE,

    TEACHER_CLASS_TOTAL_LOADING_SHOW,

    TEACHER_CLASS_TOTAL_CLASS_COUNT,

    TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_SHOW,

    TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_HIDE,

    TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_DATA_UPDATE,

    TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_LOADING_HIDE,

    TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_LOADING_SHOW,

    TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_PAGE_CHANGE,


    //课程详情

    TEACHER_CT_SCHEDULE_DETAIL_MODAL_SHOW,

    TEACHER_CT_SCHEDULE_DETAIL_MODAL_HIDE,

    TEACHER_CT_SCHEDULE_DETAIL_MODAL_LOADING_HIDE,

    TEACHER_CT_SCHEDULE_DETAIL_MODAL_INIT,

    TEACHER_CT_SCHEDULE_DETAIL_MODAL_LOADING_SHOW,

    //调整时间
    TEACHER_CT_CHANGE_TIME_MODAL_SHOW,

    TEACHER_CT_CHANGE_TIME_MODAL_HIDE,

    TEACHER_CT_CHANGE_TIME_MODAL_LOADING_SHOW,

    TEACHER_CT_CHANGE_TIME_MODAL_LOADING_HIDE,

    TEACHER_CT_CHANGE_TIME_MODAL_INIT,

    TEACHER_CT_CHANGE_TIME_MODAL_CLASSHOUR_PICK,

    //调整教室弹窗

    TEACHER_CT_ADJUST_CLASSROOM_MODAL_SHOW,

    TEACHER_CT_ADJUST_CLASSROOM_MODAL_HIDE,

    TEACHER_CT_ADJUST_CLASSROOM_MODAL_LOADING_SHOW,

    TEACHER_CT_ADJUST_CLASSROOM_MODAL_LOADING_HIDE,

    TEACHER_CT_ADJUST_CLASSROOM_MODAL_INIT,

    TEACHER_CT_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE,

    TEACHER_CT_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE,

    TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,

    TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW,

    TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE,

    TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW,

    TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE,

    TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE,

    TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW,

    TEACHER_CT_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE,

    //找人代课

    TEACHER_CT_REPLACE_SCHEDULE_MODAL_SHOW,

    TEACHER_CT_REPLACE_SCHEDULE_MODAL_HIDE,

    TEACHER_CT_REPLACE_SCHEDULE_MODAL_LOADING_HIDE,

    TEACHER_CT_REPLACE_SCHEDULE_MODAL_LOADING_SHOW,

    TEACHER_CT_REPLACE_SCHEDULE_MODAL_INIT,

    TEACHER_CT_REPLACE_SCHEDULE_MODAL_TEACHER_PICK,

    TEACHER_CT_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,

    TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW,

    TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE,

    TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW,

    TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE,

    TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE,

    TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW,

    TEACHER_CT_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE,

    TEACHER_CT_EMPTY_CLASSES_SHOW,

    TEACHER_CT_EMPTY_CLASSES_HIDE,

    ClassTotalPageUpdate,

    OptionalClassInit,

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

    ClassTotalClassDropChange

}