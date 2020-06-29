import ApiActions from "../ApiActions";

import AppAlertActions from '../AppAlertActions';

import AppLoadingActions from "../AppLoadingActions";

import utils from '../utils';


//初始化

const TEACHER_CS_LOADING_HIDE = 'TEACHER_CS_LOADING_HIDE';

const TEACHER_CS_LOADING_SHOW = 'TEACHER_CS_LOADING_SHOW';

const TEACHER_CLASS_TOTAL_STUDENT_INIT = 'TEACHER_CLASS_TOTAL_STUDENT_INIT';

//获取课时

const TEACHER_CLASS_TOTAL_STUDENT_CLASSHOUR_UPDATE = 'TEACHER_CLASS_TOTAL_STUDENT_CLASSHOUR_UPDATE';

//班级名称和ID初始化
const TEACHER_CS_CLASS_INFO_UPDATE = 'TEACHER_CS_CLASS_INFO_UPDATE';

//课程详情弹窗开启和关闭
const TEACHER_CS_SCHEDULE_DETAIL_MODAL_SHOW = 'TEACHER_CS_SCHEDULE_DETAIL_MODAL_SHOW';

const TEACHER_CS_SCHEDULE_DETAIL_MODAL_HIDE = 'TEACHER_CS_SCHEDULE_DETAIL_MODAL_HIDE';

//loading

const TEACHER_CS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW = 'TEACHER_CS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW';

const TEACHER_CS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE = 'TEACHER_CS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE';

const TEACHER_CS_SCHEDULE_DETAIL_MODAL_INIT = 'TEACHER_CS_SCHEDULE_DETAIL_MODAL_INIT';


//调整时间弹窗
const TEACHER_CS_CHANGE_TIME_MODAL_SHOW = 'TEACHER_CS_CHANGE_TIME_MODAL_SHOW';

const TEACHER_CS_CHANGE_TIME_MODAL_HIDE = 'TEACHER_CS_CHANGE_TIME_MODAL_HIDE';

const TEACHER_CS_CHANGE_TIME_MODAL_LOADING_SHOW = 'TEACHER_CS_CHANGE_TIME_MODAL_LOADING_SHOW';

const TEACHER_CS_CHANGE_TIME_MODAL_LOADING_HIDE = 'TEACHER_CS_CHANGE_TIME_MODAL_LOADING_HIDE';

const TEACHER_CS_CHANGE_TIME_MODAL_INIT = 'TEACHER_CS_CHANGE_TIME_MODAL_INIT';

const TEACHER_CS_CHANGE_TIME_MODAL_CLASSHOUR_PICK = 'TEACHER_CS_CHANGE_TIME_MODAL_CLASSHOUR_PICK';

//调整教室弹窗

const TEACHER_CS_ADJUST_CLASSROOM_MODAL_SHOW = 'TEACHER_CS_ADJUST_CLASSROOM_MODAL_SHOW';

const TEACHER_CS_ADJUST_CLASSROOM_MODAL_HIDE = 'TEACHER_CS_ADJUST_CLASSROOM_MODAL_HIDE';

const TEACHER_CS_ADJUST_CLASSROOM_MODAL_LOADING_SHOW = 'TEACHER_CS_ADJUST_CLASSROOM_MODAL_LOADING_SHOW';

const TEACHER_CS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE = 'TEACHER_CS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE';

const TEACHER_CS_ADJUST_CLASSROOM_MODAL_INIT = 'TEACHER_CS_ADJUST_CLASSROOM_MODA_INIT';

const TEACHER_CS_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE = 'TEACHER_CS_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE';

const TEACHER_CS_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE = 'TEACHER_CS_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE';

const TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE = 'TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE';

const TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE = 'TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE';

const TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW = 'TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW';

const TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE = 'TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE';

const TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW = 'TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW';

const TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE = 'TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE';

const TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW = 'TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW';

const TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE = 'TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE';

//找人代课

const TEACHER_CS_REPLACE_SCHEDULE_MODAL_SHOW = 'TEACHER_CS_REPLACE_SCHEDULE_MODAL_SHOW';

const TEACHER_CS_REPLACE_SCHEDULE_MODAL_HIDE = 'TEACHER_CS_REPLACE_SCHEDULE_MODAL_HIDE';

const TEACHER_CS_REPLACE_SCHEDULE_MODAL_LOADING_SHOW = 'TEACHER_CS_REPLACE_SCHEDULE_MODAL_LOADING_SHOW';

const TEACHER_CS_REPLACE_SCHEDULE_MODAL_LOADING_HIDE = 'TEACHER_CS_REPLACE_SCHEDULE_MODAL_LOADING_HIDE';

const TEACHER_CS_REPLACE_SCHEDULE_MODAL_INIT = 'TEACHER_CS_REPLACE_SCHEDULE_MODAL_INIT';

const TEACHER_CS_REPLACE_SCHEDULE_MODAL_TEACHER_PICK = 'TEACHER_CS_REPLACE_SCHEDULE_MODAL_TEACHER_PICK';

const TEACHER_CS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE = 'TEACHER_CS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE';

const TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW = 'TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW';

const TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE = 'TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE';

const TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW = 'TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW';

const TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE = 'TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE';

const TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE = 'TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE';

const TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW = 'TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW';

const TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE = 'TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE';



//左侧菜单

const TEACHER_CS_SEARCH_STU_RESULT_HIDE = 'TEACHER_CS_SEARCH_STU_RESULT_HIDE';

const TEACHER_CS_SEARCH_TITLE_HIDE = 'TEACHER_CS_SEARCH_TITLE_HIDE';

const TEACHER_CS_STUDENT_LEFT_LIST_UPDATE = 'TEACHER_CS_STUDENT_LEFT_LIST_UPDATE';

const  TEACHER_CS_SEARCH_STUDENT_RESULT_UPDATE = 'TEACHER_CS_SEARCH_STUDENT_RESULT_UPDATE';

const TEACHER_CS_SEARCH_STU_RESULT_SHOW = 'TEACHER_CS_SEARCH_STU_RESULT_SHOW';

const TEACHER_CS_SEARCH_TITLE_SHOW = 'TEACHER_CS_SEARCH_TITLE_SHOW';

const TEACHER_CS_SEARCH_LOADING_SHOW = 'TEACHER_CS_SEARCH_LOADING_SHOW';

const TEACHER_CS_SEARCH_LOADING_HIDE = 'TEACHER_CS_SEARCH_LOADING_HIDE';



//课表更新

const TEACHER_CS_SCHEDULE_CHANGE = 'TEACHER_CS_SCHEDULE_CHANGE';


//日期变化

const TEACHER_CS_WEEK_LIST_UPDATE = 'TEACHER_CS_WEEK_LIST_UPDATE';

const TEACHER_CS_WEEK_CHANGE = 'TEACHER_CS_WEEK_CHANGE';


const TEACHER_CS_LEFT_MENU_SEARCH_INPUT_CHANGE = 'TEACHER_CS_LEFT_MENU_SEARCH_INPUT_CHANGE';

const TEACHER_CS_LEFT_MENU_CANCEL_BTN_SHOW = 'TEACHER_CS_LEFT_MENU_CANCEL_BTN_SHOW';

const TEACHER_CS_LEFT_MENU_CANCEL_BTN_HIDE = 'TEACHER_CS_LEFT_MENU_CANCEL_BTN_HIDE';

//显示班级与否

const TEACHER_CS_ACTIVE_CLASSES_CHANGE = 'TEACHER_CS_ACTIVE_CLASSES_CHANGE';

const TEACHER_CS_CLASSES_EMPTY_SHOW = 'TEACHER_CS_CLASSES_EMPTY_SHOW';

const TEACHER_CS_CLASSES_EMPTY_HIDE = 'TEACHER_CS_CLASSES_EMPTY_HIDE';


//学科教师总表教师课表，教师更改
const ClassStudentUpdate = (pickInfo) => {

    return (dispatch,getState) => {

        const { LoginUser,Teacher,PeriodWeekTerm } = getState();

        let { SchoolID } = LoginUser;

        const { ActiveClasses } = Teacher.ClassStudent;

        let UserID = pickInfo.catChildrenId;

        let UserType = 2;

        let {WeekNO} = Teacher.ClassStudent;

        if (ActiveClasses.length>1){

            ApiActions.GetClassInfoByGanger({SchoolID,ClassID:pickInfo.catId,dispatch}).then(json=>{

                if (json){

                    const {ItemClassHour, ItemClassHourCount} = json;

                    dispatch({type:TEACHER_CLASS_TOTAL_STUDENT_CLASSHOUR_UPDATE, data: {ItemClassHour, ItemClassHourCount}});

                    ApiActions.GetScheduleByUserID({

                        SchoolID,PeriodID:'',UserType,UserID,WeekNO,dispatch

                    }).then(data => {

                        if (data){

                            let { ScheduleCount} = data;

                            let Schedule = utils.ScheduleRemoveRepeat(data.ItemSchedule.map((item) => {

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

                            dispatch({type:TEACHER_CS_SCHEDULE_CHANGE,data:{ScheduleCount,Schedule,PickStudentName:pickInfo.catChildrenName,PickStudentID:pickInfo.catChildrenId}});

                            dispatch({type:TEACHER_CS_LOADING_HIDE});

                        }

                    });

                }

            });

        }else{

            ApiActions.GetScheduleByUserID({

                SchoolID,PeriodID:'',UserType,UserID,WeekNO,dispatch

            }).then(data => {

                if (data){

                    let { ScheduleCount} = data;

                    let Schedule = utils.ScheduleRemoveRepeat(data.ItemSchedule.map((item) => {

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

                    dispatch({type:TEACHER_CS_SCHEDULE_CHANGE,data:{ScheduleCount,Schedule,PickStudentName:pickInfo.catChildrenName,PickStudentID:pickInfo.catChildrenId}});

                    dispatch({type:TEACHER_CS_LOADING_HIDE});

                }

            });

        }



    }

};
//周次变更
const CSWeekUpdate = () => {

    return (dispatch,getState) => {

        const { Teacher,LoginUser,PeriodWeekTerm } = getState();

        const { PickStudentID,PickStudentName } = Teacher.ClassStudent;
        //当没有选择教师的时候就不请求后台接口。
        if (PickStudentID === ''){

            dispatch({type:TEACHER_CS_SCHEDULE_CHANGE,data:{Schedule:[]}});

            dispatch({type:TEACHER_CS_LOADING_HIDE});

        }else{

            let {SchoolID} = LoginUser;

            let UserID = PickStudentID;

            let UserType = 2;

            let { WeekNO } = Teacher.ClassStudent;

            ApiActions.GetScheduleByUserID({

                SchoolID,PeriodID:'',UserType,UserID,WeekNO,dispatch

            }).then(data => {

                if (data){

                    let { ScheduleCount} = data;

                    let Schedule = utils.ScheduleRemoveRepeat(data.ItemSchedule.map((item) => {

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

                    dispatch({type:TEACHER_CS_SCHEDULE_CHANGE,data:{ScheduleCount,Schedule}});

                }

                dispatch({type:TEACHER_CS_LOADING_HIDE});

            });

        }

    }

};

//搜索学生
const StudentSearch = (val) => {

    return (dispatch,getState) => {

        let Key = val;

        let pattern =  utils.SearchReg({type:1,dispatch,ErrorTips:"您输入的学生姓名或工号不正确",key:Key});

        if (pattern){

            dispatch({type:TEACHER_CS_SEARCH_LOADING_SHOW});

            dispatch({type:TEACHER_CS_LEFT_MENU_CANCEL_BTN_SHOW});

            dispatch({type:TEACHER_CS_SEARCH_STU_RESULT_SHOW});

            let { LoginUser,Teacher,PeriodWeekTerm } = getState();

            let { SchoolID } = LoginUser;

            let { ActiveClasses } = Teacher.ClassStudent;

            const ClassesStr = ActiveClasses.map(item=>item.ClassID).join(',');

            ApiActions.GetSudentInfoByClassIDAndKey({

                ClassID:ClassesStr,Key,dispatch

            }).then(data => {

                if (data){

                    const result = data.map((item) => {

                        return {

                            id:item.StudentID,

                            name:item.StudentName,

                            catId:item.ClassID,

                            catName:item.ClassName

                        }

                    });

                    dispatch({type:TEACHER_CS_SEARCH_STUDENT_RESULT_UPDATE,data:result});

                    dispatch({type:TEACHER_CS_SEARCH_LOADING_HIDE});

                }

            });


        }


    };

};

//取消学生搜索

const CancelStuSearch = () => {

  return (dispatch,getState) => {

      dispatch({type:TEACHER_CS_LEFT_MENU_SEARCH_INPUT_CHANGE,data:''});

      dispatch({type:TEACHER_CS_LEFT_MENU_CANCEL_BTN_HIDE});

      dispatch({type:TEACHER_CS_SEARCH_LOADING_SHOW});

      const { ActiveClasses } = getState().Teacher.ClassStudent;

      const ClassesStr = ActiveClasses.map(item=>item.ClassID).join(',');

      ApiActions.GetSudentInfoByClassIDAndKey({ClassID:ClassesStr,Key:'',dispatch}).then(json=>{

          if (json){

              //判断是单个的行政班还是多个的行政班

              if (ActiveClasses.length>1){//多个行政班的情况下

                  const StudentList = ActiveClasses.map(item=>{

                      let list = json.map(i=>{ return i.ClassID===item.ClassID?{id:i.StudentID,name:i.StudentName}:undefined }).filter(it=>it!==undefined);

                      // let StuList = list.map(i=>{return {id:i.StudentID,name:i.StudentName}});

                      return {

                          id:item.ClassID,

                          name:item.ClassName,

                          list

                      }

                  });

                  dispatch({type:TEACHER_CS_SEARCH_TITLE_HIDE});

                  dispatch({type:TEACHER_CS_SEARCH_STU_RESULT_HIDE});

                  dispatch({type:TEACHER_CS_STUDENT_LEFT_LIST_UPDATE,data:StudentList});

              }else{

                  let list = json.map((i) => {

                      return {

                          id:i.StudentID,

                          name:i.StudentName

                      }

                  });

                  const { ClassName } = ActiveClasses[0];

                  dispatch({type:TEACHER_CS_SEARCH_STUDENT_RESULT_UPDATE,data:list});

                  dispatch({type:TEACHER_CS_SEARCH_STU_RESULT_SHOW});

                  dispatch({type:TEACHER_CS_SEARCH_TITLE_SHOW,data:`${ClassName}学生列表`});

              }

          }

          dispatch({type:TEACHER_CS_LOADING_HIDE});

          dispatch({type:TEACHER_CS_SEARCH_LOADING_HIDE});

          dispatch({type:AppLoadingActions.APP_LOADING_HIDE})

      })


     /* ApiActions.GetSudentInfoByClassIDAndKey({ClassID,Key:'',dispatch}).then(json=>{

          if (json){

              let leftMenuData = [];

              let list = json.map((i) => {

                  return {

                      id:i.StudentID,

                      name:i.StudentName

                  }

              });

              dispatch({type:TEACHER_CS_SEARCH_STUDENT_RESULT_UPDATE,data:list});

          }

          dispatch({type:TEACHER_CS_SEARCH_LOADING_HIDE});

      })
*/


  }

};

//课程详情弹窗

const ScheduleDetailShow = (Params) => {

    return (dispatch,getState)=>{

        const { SchoolID } = getState().LoginUser;

        const { TeacherID,ScheduleID,ClassDate,ClassHourNO,SubjectID } = Params;

        dispatch({type:TEACHER_CS_SCHEDULE_DETAIL_MODAL_SHOW});

        ApiActions.GetScheduleDetailByUserID({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data){

                data['SubjectID'] = SubjectID;

                dispatch({type:TEACHER_CS_SCHEDULE_DETAIL_MODAL_INIT,data:data});

            }

            dispatch({type:TEACHER_CS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE});

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

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = getState().Teacher.ClassStudent;

        const WeekNO = getState().Teacher.ClassStudent.WeekNO;

        dispatch({ type:TEACHER_CS_CHANGE_TIME_MODAL_SHOW});

        dispatch({type:TEACHER_CS_CHANGE_TIME_MODAL_INIT,data:{TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName,StartEndTime,ClassHourType,NowDate,WeekDay,ItemClassHourCount,NowClassHourNO,WeekNO,ClassDate,ClassHourNO,ItemClassHour,ItemWeek}});

        dispatch({type:TEACHER_CS_CHANGE_TIME_MODAL_LOADING_HIDE});


    }

};


//点击某一个课时

const SelectClassHour = (params) => {

    return (dispatch,getState) => {

        const { SelectWeekDay,SelectClassHourNO,SelectDate } = params;

        dispatch({type:TEACHER_CS_CHANGE_TIME_MODAL_CLASSHOUR_PICK,data:{SelectWeekDay,SelectClassHourNO,SelectDate}})

    }

};




//调整时间切换周次

const WeekPick = (WeekNO) => {

    return (dispatch,getState) => {

        dispatch({type:TEACHER_CS_CHANGE_TIME_MODAL_INIT,data:{WeekNO}});

    }

};

//点击提交调整时间
const ChangeTimeCommit = () =>{

    return (dispatch,getState)=>{

        const { SelectDate,SelectClassHourNO,TeacherID,ClassDate,ClassHourNO,ScheduleID,NowClassRoomID,NowClassRoomName } = getState().Teacher.ClassStudent.ChangeTime;

        if (SelectDate){

            dispatch({type:TEACHER_CS_CHANGE_TIME_MODAL_LOADING_SHOW});

            const { SchoolID,UserID } = getState().LoginUser;

            const ScheduleClassDateAndClassHourNO = `${SelectDate},${SelectClassHourNO}`;

            ApiActions.ChangeDateAndGetTea({

                SchoolID,ScheduleID,ScheduleClassDateAndClassHourNO,ClassDate,ClassHourNO,

                NowClassRoomID,NowClassRoomName,TeacherID,dispatch,UserID

            }).then(data=>{

                if (data===0){

                    dispatch(AppAlertActions.alertSuccess({title:"调整时间成功！"}));

                    dispatch({type:TEACHER_CS_CHANGE_TIME_MODAL_HIDE});

                    dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

                }

                dispatch({type:TEACHER_CS_CHANGE_TIME_MODAL_LOADING_HIDE});

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

        dispatch({ type:TEACHER_CS_ADJUST_CLASSROOM_MODAL_SHOW});

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

            dispatch({type:TEACHER_CS_ADJUST_CLASSROOM_MODAL_INIT,data:{ClassDate,ClassHourNO,TeacherID,ScheduleID,NowClassRoomID,NowClassRoomName,ClassRoomList}});

            dispatch({type:TEACHER_CS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE});

        });

    }

};

//点击教室搜索

const ClassRoomSearchClick = (SearchValue) => {

    return (dispatch,getState)=>{

        const Key = SearchValue.trim();

        if (Key){

            dispatch({type:TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW});

            dispatch({type:TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW});

            dispatch({type:TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW});

            const { SchoolID } = getState().LoginUser;

            const { ClassRoomList,NowClassRoomID } = getState().Teacher.ClassStudent.AdjustClassRoom;

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

                dispatch({type:TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE,data:SearchList});



                dispatch({type:TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE});

            });

        }else{

            dispatch(AppAlertActions.alertWarn({title:"搜索值不能为空！"}));

        }

    }

};

//教室提交

const AdjustClassRoomCommit = () =>{

    return (dispatch,getState) => {

        const { CheckedValue,TeacherID,ClassDate,ClassHourNO,ScheduleID } = getState().Teacher.ClassStudent.AdjustClassRoom;

        const { SchoolID,UserID } = getState().LoginUser;

        if (CheckedValue){

            dispatch({type:TEACHER_CS_ADJUST_CLASSROOM_MODAL_LOADING_SHOW});

            ApiActions.ChangeClassRoomAndGetTea({

                SchoolID,ScheduleID,TeacherID,ClassHourNO,ClassDate,

                ScheduleClassRoomID:CheckedValue,dispatch,UserID

            }).then(data=>{

                if (data===0){

                    dispatch({type:TEACHER_CS_ADJUST_CLASSROOM_MODAL_HIDE});

                    dispatch(AppAlertActions.alertSuccess({title:"调整教室成功！"}));

                    dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

                }

                dispatch({type:TEACHER_CS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE});

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

        const { SubjectID } = getState().Teacher.ClassStudent.ScheduleDetail;

        const { SchoolID } = getState().LoginUser;

        dispatch({type:TEACHER_CS_REPLACE_SCHEDULE_MODAL_SHOW});

        ApiActions.GetTeacherBySubjectIDAndKey({SchoolID,PeriodID:'',SubjectID,Key:'',dispatch}).then(data=>{

            if (data){

                let TeacherList = data.map(item=>{

                    return {

                        ID:item.TeacherID,

                        Name:item.TeacherName

                    }

                });

                dispatch({type:TEACHER_CS_REPLACE_SCHEDULE_MODAL_INIT,data:{TeacherList,TeacherID,ClassDate,ClassHourNO,ScheduleID}});

            }

            dispatch({type:TEACHER_CS_REPLACE_SCHEDULE_MODAL_LOADING_HIDE});

        })

    }

};

//找人代课搜索

const ReplaceSearchClick = (SearchValue) => {

    return (dispatch,getState)=>{

        const Key = SearchValue.trim();

        if (Key){

            dispatch({type:TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW});

            dispatch({type:TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW});

            dispatch({type:TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW});

            const { SchoolID } = getState().LoginUser;

            const { SubjectID } = getState().Teacher.ClassStudent.ScheduleDetailModal;

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

                dispatch({type:TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE,data:SearchList});



                dispatch({type:TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE});

            });

        }else{

            dispatch(AppAlertActions.alertWarn({title:"搜索值不能为空！"}));

        }

    }

};


//找人代课提交

const ReplaceScheduleCommit = () => {


    return (dispatch,getState)=>{

        const { ActiveTeacherID,TeacherID,ClassDate,ClassHourNO,ScheduleID } = getState().Teacher.ClassStudent.ReplaceSchedule;

        const { SchoolID,UserID } = getState().LoginUser;

        if (ActiveTeacherID){

            dispatch({type:TEACHER_CS_REPLACE_SCHEDULE_MODAL_LOADING_SHOW});

            ApiActions.ChangeTeacher({

                SchoolID,ScheduleID,TeacherID,ClassHourNO,ClassDate,

                ScheduleTeacherID:ActiveTeacherID,dispatch,UserID

            }).then(data=>{

                if (data===0){

                    dispatch({type:TEACHER_CS_REPLACE_SCHEDULE_MODAL_HIDE});

                    dispatch(AppAlertActions.alertSuccess({title:"找人代课成功！"}));

                    dispatch(ScheduleModalInfoUpdate({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO}));

                }

                dispatch({type:TEACHER_CS_REPLACE_SCHEDULE_MODAL_LOADING_HIDE});

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

        dispatch({type:TEACHER_CS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW});

        ApiActions.GetScheduleDetailByUserID({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO,dispatch}).then(data=>{

            if (data){

                dispatch({type:TEACHER_CS_SCHEDULE_DETAIL_MODAL_INIT,data:data});

            }

            dispatch({type:TEACHER_CS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE});

        })

    }

};



export default {

    TEACHER_CS_LOADING_SHOW,

    TEACHER_CS_LOADING_HIDE,

    TEACHER_CS_SCHEDULE_CHANGE,

    TEACHER_CS_CLASS_INFO_UPDATE,

    TEACHER_CLASS_TOTAL_STUDENT_CLASSHOUR_UPDATE,

    TEACHER_CS_SEARCH_STU_RESULT_HIDE,

    TEACHER_CS_SEARCH_TITLE_HIDE,

    TEACHER_CS_STUDENT_LEFT_LIST_UPDATE,

    TEACHER_CS_SEARCH_STUDENT_RESULT_UPDATE,

    TEACHER_CS_SEARCH_STU_RESULT_SHOW,

    TEACHER_CS_SEARCH_TITLE_SHOW,

    TEACHER_CS_WEEK_LIST_UPDATE,

    TEACHER_CS_WEEK_CHANGE,

    TEACHER_CS_SEARCH_LOADING_HIDE,

    TEACHER_CS_SEARCH_LOADING_SHOW,

    TEACHER_CLASS_TOTAL_STUDENT_INIT,

    TEACHER_CS_LEFT_MENU_SEARCH_INPUT_CHANGE,

    TEACHER_CS_LEFT_MENU_CANCEL_BTN_SHOW,

    TEACHER_CS_LEFT_MENU_CANCEL_BTN_HIDE,

    //课程详情

    TEACHER_CS_SCHEDULE_DETAIL_MODAL_SHOW,

    TEACHER_CS_SCHEDULE_DETAIL_MODAL_HIDE,

    TEACHER_CS_SCHEDULE_DETAIL_MODAL_LOADING_HIDE,

    TEACHER_CS_SCHEDULE_DETAIL_MODAL_INIT,

    TEACHER_CS_SCHEDULE_DETAIL_MODAL_LOADING_SHOW,

    //调整时间
    TEACHER_CS_CHANGE_TIME_MODAL_SHOW,

    TEACHER_CS_CHANGE_TIME_MODAL_HIDE,

    TEACHER_CS_CHANGE_TIME_MODAL_LOADING_SHOW,

    TEACHER_CS_CHANGE_TIME_MODAL_LOADING_HIDE,

    TEACHER_CS_CHANGE_TIME_MODAL_INIT,

    TEACHER_CS_CHANGE_TIME_MODAL_CLASSHOUR_PICK,

    //调整教室弹窗

    TEACHER_CS_ADJUST_CLASSROOM_MODAL_SHOW,

    TEACHER_CS_ADJUST_CLASSROOM_MODAL_HIDE,

    TEACHER_CS_ADJUST_CLASSROOM_MODAL_LOADING_SHOW,

    TEACHER_CS_ADJUST_CLASSROOM_MODAL_LOADING_HIDE,

    TEACHER_CS_ADJUST_CLASSROOM_MODAL_INIT,

    TEACHER_CS_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE,

    TEACHER_CS_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE,

    TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,

    TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_SHOW,

    TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE,

    TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_SHOW,

    TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE,

    TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LIST_UPDATE,

    TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_SHOW,

    TEACHER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_LOADING_HIDE,

    //找人代课

    TEACHER_CS_REPLACE_SCHEDULE_MODAL_SHOW,

    TEACHER_CS_REPLACE_SCHEDULE_MODAL_HIDE,

    TEACHER_CS_REPLACE_SCHEDULE_MODAL_LOADING_HIDE,

    TEACHER_CS_REPLACE_SCHEDULE_MODAL_LOADING_SHOW,

    TEACHER_CS_REPLACE_SCHEDULE_MODAL_INIT,

    TEACHER_CS_REPLACE_SCHEDULE_MODAL_TEACHER_PICK,

    TEACHER_CS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,

    TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_SHOW,

    TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE,

    TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_SHOW,

    TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE,

    TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LIST_UPDATE,

    TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_SHOW,

    TEACHER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_LOADING_HIDE,

    //显示班级与否

    TEACHER_CS_CLASSES_EMPTY_SHOW,

    TEACHER_CS_CLASSES_EMPTY_HIDE,

    TEACHER_CS_ACTIVE_CLASSES_CHANGE,

    ClassStudentUpdate,

    CSWeekUpdate,

    StudentSearch,

    CancelStuSearch,

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