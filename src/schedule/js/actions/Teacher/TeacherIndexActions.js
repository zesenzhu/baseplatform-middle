//学科教师总表学科课表界面初始化

import SCGCRActions from "../Teacher/SCGCRActions";

import STSActions from "../Teacher/SubjectTeacherSubjectActions";

import AppLoadingActions from "../AppLoadingActions";

import STTActions from "../Teacher/SubjectTeacherTeacherActions";

import TPActions from "./TeacherPersonalActions";

import CTActions from "./ClassTotalActions";

import CSActions from "./ClassStudentActions";

import ApiActions from '../ApiActions';

import utils from '../utils';

import $ from 'jquery';

import moment from 'moment';


//学科教师总表学科总课表界面初始化
const STSPageInit = (ResetClassHour) => {

    return (dispatch,getState) => {

        dispatch({type:STSActions.LOADING_SHOW});

        let {PeriodWeekTerm,LoginUser,Teacher} = getState();
        //如果前面获取的周次、学段信息已获得

        let {SchoolID,UserID,UserType} =LoginUser;//需要的参数后期加入


        if (PeriodWeekTerm.ItemPeriod.length>0){

            let { WeekNO,NowWeekDay,NowDate,ItemWeek } = PeriodWeekTerm;

            const nowDateMoment = moment(NowDate);

            const endDateMoment = moment(ItemWeek[ItemWeek.length-1].EndDate);

            const startDateMoment = moment(ItemWeek[0].StartDate);

            if (nowDateMoment.isAfter(endDateMoment)||nowDateMoment.isBefore(startDateMoment)){

                WeekNO = 1;

                NowWeekDay = 1;

                NowDate = ItemWeek[0].StartDate;

            }


            let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

            dispatch({type:STSActions.TEACHER_STS_NOW_WEEK_NO_CHANGE,data:WeekNO});

            dispatch({type:STSActions.TEACHER_STS_NOW_WEEK_DAY_CHANGE,data:NowWeekDay});

            dispatch({type:STSActions.TEACHER_STS_NOW_CLASS_DATE_CHANGE,data:NowDate});


            //判断是否需要重新加载课时信息

            if (ResetClassHour){

                ApiActions.GetAllOptionByPeriodID({

                    SchoolID,PeriodID,UserID,UserType,dispatch

                }).then(data=>{

                    if (data){

                        const SubjectList = data.ItemSubject;

                        let SubjectID = '';

                        if (SubjectList.length>1){

                            SubjectID = SubjectList[0].SubjectID;

                            let SList = SubjectList.map(item =>{

                                return {

                                    value:item.SubjectID,

                                    title:item.SubjectName

                                }

                            });

                            dispatch({type:STSActions.TEACHER_STS_SUBJECT_DROP_SHOW});

                            dispatch({type:STSActions.TEACHER_STS_SUBJECT_DROP_CHANGE,data:{value:SubjectID,title:SubjectList[0].SubjectName}});

                            dispatch({type:STSActions.TEACHER_STS_SUBJECT_DROP_LIST_CHANGE,data:SList})


                        }else if (SubjectList.length === 1) {

                            SubjectID = SubjectList[0].SubjectID;

                            let SubjectName = SubjectList[0].SubjectName;

                            dispatch({type:STSActions.TEACHER_STS_SUBJECT_DROP_HIDE});

                            dispatch({type:STSActions.TEACHER_STS_SUBJECT_TITLE_CHANGE,data:{id:SubjectID,title:SubjectName}});

                        }else{

                            dispatch({type:STSActions.TEACHER_STS_SUBJECT_DROP_HIDE});

                            dispatch({type:STSActions.TEACHER_STS_SUBJECT_TITLE_CHANGE,data:{title:'暂无',id:''}});

                        }

                        dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:data});

                        //旧代码

                       /* ApiActions.GetAllScheduleOfTeachersBySubjectIDForPage({

                            SubjectID,SchoolID, PeriodID,PageIndex:1,PageSize:10,dispatch

                        }).then(json=>{

                            if (json){

                                let SubjectTeacherSchedule = [];


                                SubjectTeacherSchedule =  json.ItemTeacher.map((item) => {

                                    let teacherObj = {

                                        id:item.TeacherID,

                                        name:item.TeacherName

                                    };

                                    let list = utils.ScheduleRemoveRepeat(json.ItemSchedule.map((i) => {

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

                                dispatch({type:STSActions.TEACHER_SUBJECT_TEACHER_SUBJECT_TEACHER_COUNT,data:json.TeacherCount});

                                dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_INIT,data:SubjectTeacherSchedule});

                            }

                            dispatch({type:STSActions.LOADING_HIDE});

                            dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                        });*/

                         ApiActions.GetAllScheduleOfTeachersOneDayForPage({

                             SchoolID,SubjectID,PeriodID,ClassDate:NowDate,dispatch

                         }).then(json=>{

                             if (json){

                                 let SubjectTeacherSchedule = [];


                                 SubjectTeacherSchedule =  json.ItemTeacher.map((item) => {

                                     let teacherObj = {

                                         id:item.TeacherID,

                                         name:item.TeacherName

                                     };

                                     let list = utils.ScheduleRemoveRepeat(json.ItemSchedule.map((i) => {

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

                                 dispatch({type:STSActions.TEACHER_SUBJECT_TEACHER_SUBJECT_TEACHER_COUNT,data:json.TeacherCount});

                                 dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_INIT,data:SubjectTeacherSchedule});

                             }

                             dispatch({type:STSActions.LOADING_HIDE});

                             dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                         });


                    }

                });

            }else if (Object.keys(Teacher.SubjectCourseGradeClassRoom).length>0){

                const SubjectList = Teacher.SubjectCourseGradeClassRoom.ItemSubject;

                let SubjectID = '';

                if (SubjectList.length>1){

                    SubjectID = SubjectList[0].SubjectID;

                    let SList = SubjectList.map(item =>{

                        return {

                            value:item.SubjectID,

                            title:item.SubjectName

                        }

                    });

                    dispatch({type:STSActions.TEACHER_STS_SUBJECT_DROP_SHOW});

                    dispatch({type:STSActions.TEACHER_STS_SUBJECT_DROP_CHANGE,data:{value:SubjectID,title:SubjectList[0].SubjectName}});

                    dispatch({type:STSActions.TEACHER_STS_SUBJECT_DROP_LIST_CHANGE,data:SList})


                }else if (SubjectList.length === 1) {

                    SubjectID = SubjectList[0].SubjectID;

                    let SubjectName = SubjectList[0].SubjectName;

                    dispatch({type:STSActions.TEACHER_STS_SUBJECT_DROP_HIDE});

                    dispatch({type:STSActions.TEACHER_STS_SUBJECT_TITLE_CHANGE,data:{id:SubjectID,title:SubjectName}});

                }else{

                    dispatch({type:STSActions.TEACHER_STS_SUBJECT_DROP_HIDE});

                    dispatch({type:STSActions.TEACHER_STS_SUBJECT_TITLE_CHANGE,data:{title:'暂无',id:''}});

                }

                ApiActions.GetAllScheduleOfTeachersOneDayForPage({

                    SchoolID,SubjectID,PeriodID,ClassDate:NowDate,dispatch

                }).then(json=>{

                    if (json){

                        let SubjectTeacherSchedule = [];

                        SubjectTeacherSchedule =  json.ItemTeacher.map((item) => {

                            let teacherObj = {

                                id:item.TeacherID,

                                name:item.TeacherName

                            };

                            let list = utils.ScheduleRemoveRepeat(json.ItemSchedule.map((i) => {

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

                        dispatch({type:STSActions.TEACHER_SUBJECT_TEACHER_SUBJECT_TEACHER_COUNT,data:json.TeacherCount});

                        dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_INIT,data:SubjectTeacherSchedule});

                    }

                    dispatch({type:STSActions.LOADING_HIDE});

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                });

            }else{

                ApiActions.GetAllOptionByPeriodID({

                    SchoolID,PeriodID,UserID,UserType,dispatch

                }).then(data=>{

                    if (data){

                        const SubjectList = data.ItemSubject;

                        let SubjectID = '';

                        if (SubjectList.length>1){

                            SubjectID = SubjectList[0].SubjectID;

                            let SList = SubjectList.map(item =>{

                                return {

                                    value:item.SubjectID,

                                    title:item.SubjectName

                                }

                            });

                            dispatch({type:STSActions.TEACHER_STS_SUBJECT_DROP_SHOW});

                            dispatch({type:STSActions.TEACHER_STS_SUBJECT_DROP_CHANGE,data:{value:SubjectID,title:SubjectList[0].SubjectName}});

                            dispatch({type:STSActions.TEACHER_STS_SUBJECT_DROP_LIST_CHANGE,data:SList})


                        }else if (SubjectList.length === 1) {

                            SubjectID = SubjectList[0].SubjectID;

                            let SubjectName = SubjectList[0].SubjectName;

                            dispatch({type:STSActions.TEACHER_STS_SUBJECT_DROP_HIDE});

                            dispatch({type:STSActions.TEACHER_STS_SUBJECT_TITLE_CHANGE,data:{id:SubjectID,title:SubjectName}});

                        }else{

                            dispatch({type:STSActions.TEACHER_STS_SUBJECT_DROP_HIDE});

                            dispatch({type:STSActions.TEACHER_STS_SUBJECT_TITLE_CHANGE,data:{title:'暂无',id:''}});

                        }

                        dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:data});



                        ApiActions.GetAllScheduleOfTeachersOneDayForPage({

                            SchoolID,SubjectID,PeriodID,ClassDate:NowDate,dispatch

                        }).then(json=>{

                            if (json){

                                let SubjectTeacherSchedule = [];


                                SubjectTeacherSchedule =  json.ItemTeacher.map((item) => {

                                    let teacherObj = {

                                        id:item.TeacherID,

                                        name:item.TeacherName

                                    };

                                    let list = utils.ScheduleRemoveRepeat(json.ItemSchedule.map((i) => {

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

                                dispatch({type:STSActions.TEACHER_SUBJECT_TEACHER_SUBJECT_TEACHER_COUNT,data:json.TeacherCount});

                                dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_INIT,data:SubjectTeacherSchedule});

                            }

                            dispatch({type:STSActions.LOADING_HIDE});

                            dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                        });

                    }

                });

            }


            /*Promise.all([GetAllOptionByPeriodID,GetAllScheduleOfTeachersBySubjectIDForPage]).then((res)=>{
                //将课程、学期、等等放到redux中
                // res[0].Data['NowWeekNo'] = PeriodWeekTerm.NowWeekNo;

                let NowWeekNo = PeriodWeekTerm.WeekNO;

                dispatch({type:STSActions.STS_NOW_WEEK_CHANGE,data:NowWeekNo});


                if (res[0]){

                    dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                }


                //组织课表的信息存放到redux中
                const json = res[1];

                let SubjectTeacherSchedule = [];

                if (json){

                    SubjectTeacherSchedule =  json.ItemTeacher.map((item) => {

                        let teacherObj = {

                            id:item.TeacherID,

                            name:item.TeacherName

                        };

                        let list = json.ItemSchedule.map((i) => {

                            if (i.TeacherID === item.TeacherID){

                                return {

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

                        }).filter(i => {return i!==undefined});

                        teacherObj['list'] = list;

                        return teacherObj;

                    });

                    dispatch({type:STSActions.TEACHER_SUBJECT_TEACHER_SUBJECT_TEACHER_COUNT,data:json.TeacherCount});

                }

                dispatch({type:STSActions.SUBJECT_TEACHER_SCHEDULE_INIT,data:SubjectTeacherSchedule});

                dispatch({type:STSActions.LOADING_HIDE});

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            });*/


        }else{

            window.location.href='/Error.aspx?errcode=E011';

        }


    }

};

//学科教师总表教师课表界面初始化
const STTPageInit = (ResetClassHour) => {

    return (dispatch,getState) => {

        dispatch({type:STTActions.SCHEDULE_LOADING_SHOW});

        $('.left-menu-wrapper').find('.search_cancel_input').hide();

        let {PeriodWeekTerm,LoginUser,Teacher} = getState();
        //如果前面获取的周次、学段信息已获得

        let {SchoolID,UserID,UserType} =LoginUser;//需要的参数后期加入

        if (PeriodWeekTerm.ItemPeriod.length>0){

            let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

            let NowWeekNo = PeriodWeekTerm.WeekNO;

            //将课程、学期、等等放到redux中
            dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:NowWeekNo});

            if (ResetClassHour){

                let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({SchoolID,PeriodID,UserID,UserType,dispatch});

                let GetTeacherBySubjectIDAndKey = ApiActions.GetTeacherBySubjectIDAndKey({

                    SchoolID,PeriodID,Flag:0

                });

                Promise.all([GetAllOptionByPeriodID,GetTeacherBySubjectIDAndKey]).then(res => {

                    //根据获取的学科信息和教师信息组织数据

                    if(res[0]){

                        dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                        let subjectList = res[0].ItemSubject;

                        let leftMenuData = [];

                        if (res[1].length>0){

                            if (subjectList.length > 1){

                                leftMenuData = subjectList.map((item) => {

                                    let list = res[1].map((i) => {

                                        if (i.SubjectID.includes(item.SubjectID)){

                                            return {

                                                id:i.TeacherID,

                                                name:i.TeacherName

                                            }

                                        }else{

                                            return;

                                        }

                                    }).filter((i) =>i!==undefined);

                                    return {

                                        id:item.SubjectID,

                                        name:item.SubjectName,

                                        list

                                    }

                                });

                                dispatch({type:STTActions.STT_SCHEDULE_INIT,data:leftMenuData});

                            }else{

                                let list = res[1].map((i) => {

                                    if (i.SubjectID.includes(res[0].ItemSubject[0].SubjectID)){

                                        return {

                                            id:i.TeacherID,

                                            name:i.TeacherName

                                        }

                                    }else{

                                        return;

                                    }



                                }).filter(it=>it!==undefined);

                                //查找subjectID和对应的Subjectname
                                /*let subjectID = '';

                                for (let i = 0; i <= res[1].length-1; i++){

                                    subjectID = res[1][i].SubjectID;

                                    break;

                                }

                                let subjectName = subjectList.find((item) => {return item.SubjectID === subjectID }).SubjectName;
        */
                                let subjectName = res[0].ItemSubject[0].SubjectName;

                                dispatch({type:STTActions.SEARCH_TEACHER_RESULT_UPDATE,data:list});

                                dispatch({type:STTActions.SEARCH_TEACHER_RESULT_SHOW});

                                dispatch({type:STTActions.SEARCH_TITLE_SHOW,data:`${subjectName}任课教师列表`});

                            }

                        }else{

                            dispatch({type:STTActions.STT_SCHEDULE_INIT,data:[]});

                        }

                    }

                    dispatch({type:STTActions.SCHEDULE_LOADING_HIDE});

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                });

            }else if (Object.keys(Teacher.SubjectCourseGradeClassRoom).length>0){

                ApiActions.GetTeacherBySubjectIDAndKey({

                    SchoolID,PeriodID,Flag:0

                }).then(data=>{

                    if (data){

                        let subjectList = Teacher.SubjectCourseGradeClassRoom.ItemSubject;

                        let leftMenuData = [];

                        if (data.length>0){

                            if (subjectList.length > 1){

                                leftMenuData = subjectList.map((item) => {

                                    let list = data.map((i) => {

                                        if (i.SubjectID.includes(item.SubjectID)){

                                            return {

                                                id:i.TeacherID,

                                                name:i.TeacherName

                                            }

                                        }else{

                                            return;

                                        }

                                    }).filter((i) =>i!==undefined);

                                    return {

                                        id:item.SubjectID,

                                        name:item.SubjectName,

                                        list

                                    }

                                });

                                dispatch({type:STTActions.STT_SCHEDULE_INIT,data:leftMenuData});

                            }else{

                                let list = data.map((i) => {

                                    if (i.SubjectID.includes(Teacher.SubjectCourseGradeClassRoom.ItemSubject[0].SubjectID)){

                                        return {

                                            id:i.TeacherID,

                                            name:i.TeacherName

                                        }

                                    }else{

                                        return;

                                    }



                                }).filter(it=>it!==undefined);

                                let subjectName = Teacher.SubjectCourseGradeClassRoom.ItemSubject[0].SubjectName;

                                dispatch({type:STTActions.SEARCH_TEACHER_RESULT_UPDATE,data:list});

                                dispatch({type:STTActions.SEARCH_TEACHER_RESULT_SHOW});

                                dispatch({type:STTActions.SEARCH_TITLE_SHOW,data:`${subjectName}任课教师列表`});

                            }

                        }else{

                            dispatch({type:STTActions.STT_SCHEDULE_INIT,data:[]});

                        }

                    }

                    dispatch({type:STTActions.SCHEDULE_LOADING_HIDE});

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                });


            }else{

                let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({SchoolID,PeriodID,UserID,UserType,dispatch});

                let GetTeacherBySubjectIDAndKey = ApiActions.GetTeacherBySubjectIDAndKey({

                    SchoolID,PeriodID,Flag:0

                });

                Promise.all([GetAllOptionByPeriodID,GetTeacherBySubjectIDAndKey]).then(res => {

                    //根据获取的学科信息和教师信息组织数据

                    if(res[0]){

                        dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                        let subjectList = res[0].ItemSubject;

                        let leftMenuData = [];

                        if (res[1].length>0){

                            if (subjectList.length > 1){

                                leftMenuData = subjectList.map((item) => {

                                    let list = res[1].map((i) => {

                                        if (i.SubjectID.includes(item.SubjectID)){

                                            return {

                                                id:i.TeacherID,

                                                name:i.TeacherName

                                            }

                                        }else{

                                            return;

                                        }

                                    }).filter((i) =>i!==undefined);

                                    return {

                                        id:item.SubjectID,

                                        name:item.SubjectName,

                                        list

                                    }

                                });

                                dispatch({type:STTActions.STT_SCHEDULE_INIT,data:leftMenuData});

                            }else{

                                let list = res[1].map((i) => {

                                    if (i.SubjectID.includes(res[0].ItemSubject[0].SubjectID)){

                                        return {

                                            id:i.TeacherID,

                                            name:i.TeacherName

                                        }

                                    }else{

                                        return;

                                    }



                                }).filter(it=>it!==undefined);

                                //查找subjectID和对应的Subjectname
                                /*let subjectID = '';

                                for (let i = 0; i <= res[1].length-1; i++){

                                    subjectID = res[1][i].SubjectID;

                                    break;

                                }

                                let subjectName = subjectList.find((item) => {return item.SubjectID === subjectID }).SubjectName;
        */
                                let subjectName = res[0].ItemSubject[0].SubjectName;

                                dispatch({type:STTActions.SEARCH_TEACHER_RESULT_UPDATE,data:list});

                                dispatch({type:STTActions.SEARCH_TEACHER_RESULT_SHOW});

                                dispatch({type:STTActions.SEARCH_TITLE_SHOW,data:`${subjectName}任课教师列表`});

                            }

                        }else{

                            dispatch({type:STTActions.STT_SCHEDULE_INIT,data:[]});

                        }

                    }

                    dispatch({type:STTActions.SCHEDULE_LOADING_HIDE});

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                });

            }

        }else{

            window.location.href='/Error.aspx?errcode=E011';

        }

    }

};

//获取教师的个人课表

const TeacherPersonalInit = (ResetClassHour) => {

    return (dispatch,getState) => {

        dispatch({type:TPActions.TP_SCHEDULE_LOADING_SHOW});

        let {PeriodWeekTerm,LoginUser,Teacher} = getState();
        //如果前面获取的周次、学段信息已获得
        let {SchoolID,UserID,UserType} = LoginUser;//需要的参数后期加入

        if (PeriodWeekTerm.ItemPeriod.length>0){

            let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

            const WeekNO = getQueryVariable('WeekNO');

            let GetScheduleByUserID = '';

            if (WeekNO){

                GetScheduleByUserID = ApiActions.GetScheduleByUserID({

                    SchoolID,PeriodID,UserID,WeekNO,UserType,dispatch

                });

            }else{

                GetScheduleByUserID = ApiActions.GetScheduleByUserID({

                    SchoolID,PeriodID,UserID,UserType,dispatch

                });

            }

            let NowWeekNo = WeekNO?parseInt(WeekNO):PeriodWeekTerm.WeekNO;

            //将课程、学期、等等放到redux中

            dispatch({type:TPActions.TP_NOW_WEEK_CHANGE,data:NowWeekNo});

            if (ResetClassHour){

                let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({

                    SchoolID,PeriodID,UserID,UserType,dispatch

                });

                Promise.all([GetAllOptionByPeriodID,GetScheduleByUserID]).then(res => {


                    if (res[0]){

                        dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                    }

                    if (res[1]){

                        let schedule = utils.ScheduleRemoveRepeat(res[1].ItemSchedule.map((item) => {

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

                        dispatch({type:TPActions.TP_SCHEDULE_CHANGE,data:{schedule}});

                    }

                    dispatch({type:TPActions.TP_SCHEDULE_LOADING_HIDE});

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                });

            }else if (Object.keys(Teacher.SubjectCourseGradeClassRoom).length>0){

                Promise.all([GetScheduleByUserID]).then(res=>{

                    if (res[0]){

                        let schedule = utils.ScheduleRemoveRepeat(res[0].ItemSchedule.map((item) => {

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

                        dispatch({type:TPActions.TP_SCHEDULE_CHANGE,data:{schedule}});

                    }

                    dispatch({type:TPActions.TP_SCHEDULE_LOADING_HIDE});

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                })

            }else{

                let GetAllOptionByPeriodID = ApiActions.GetAllOptionByPeriodID({

                    SchoolID,PeriodID,UserID,UserType,dispatch

                });

                Promise.all([GetAllOptionByPeriodID,GetScheduleByUserID]).then(res => {


                    if (res[0]){

                        dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:res[0]});

                    }

                    if (res[1]){

                        let schedule = utils.ScheduleRemoveRepeat(res[1].ItemSchedule.map((item) => {

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

                        dispatch({type:TPActions.TP_SCHEDULE_CHANGE,data:{schedule}});

                    }

                    dispatch({type:TPActions.TP_SCHEDULE_LOADING_HIDE});

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                });

            }

        }else{

            window.location.href='/Error.aspx?errcode=E011';

        }

    }

};


const TeacherClassHourChange = () =>{

    return (dispatch,getState)=>{

        let {PeriodWeekTerm,LoginUser,Teacher} = getState();
        //如果前面获取的周次、学段信息已获得
        let {SchoolID,UserID,UserType} = LoginUser;//需要的参数后期加入

        let PeriodID = PeriodWeekTerm.ItemPeriod[PeriodWeekTerm.defaultPeriodIndex].PeriodID;//所需的参数

        ApiActions.GetAllOptionByPeriodID({

            SchoolID,PeriodID,UserID,UserType,dispatch

        }).then(data=>{

            if (data){

                dispatch({type:SCGCRActions.SCGCR_INFO_INIT,data:data});

            }

        });

    }

};

//获取教师班级课表

const ClassTotalInit = () => {

    return (dispatch,getState)=>{

        dispatch({type:CTActions.TEACHER_CLASS_TOTAL_LOADING_SHOW});

        const { PeriodWeekTerm,LoginUser } = getState();

        const { UserID,SchoolID,UserType,UserClass } = LoginUser;

        const { WeekNO,ItemWeek } = PeriodWeekTerm;

        const { Classes } = getState().Teacher.GangerClass;

        const { ItemPeriod,defaultPeriodIndex } = PeriodWeekTerm;

        if (ItemPeriod&&ItemPeriod.length>0){

            const ActivePeriodID = ItemPeriod[defaultPeriodIndex].PeriodID;

            const ActiveClasses =  Classes.filter(item=>item.PeriodID===ActivePeriodID);

            if (ActiveClasses.length>0){

                dispatch({type:CTActions.TEACHER_CT_EMPTY_CLASSES_HIDE});

                let WeekList = [];

                ItemWeek.map(item=>{

                    WeekList.push({

                        value:item.WeekNO,

                        title:item.WeekNO

                    });

                });

                dispatch({type:CTActions.TEACHER_CLASS_TOTAL_WEEK_LIST_UPDATE,data:WeekList});

                dispatch({type:CTActions.TEACHER_CLASS_TOTAL_WEEK_CHANGE,data:WeekNO});

                //获取第一个班级的ID和name


                let {ClassID,ClassName} = ActiveClasses[0];

                //判断班级数量

                if (ActiveClasses.length>1){

                    let list = ActiveClasses.map(item=>{ return { value:item.ClassID,title:item.ClassName}});

                    dispatch({type:CTActions.TEACHER_CLASS_TOTAL_CLASS_DROP_SHOW});

                    dispatch({type:CTActions.TEACHER_CLASS_TOTAL_CLASS_DROP_CHANGE,data:{value:ClassID,title:ClassName}});

                    dispatch({type:CTActions.TEACHER_CLASS_TOTAL_CLASS_DROP_LIST_UPDATE,data:list});

                }else{

                    dispatch({type:CTActions.TEACHER_CLASS_TOTAL_CLASS_DROP_HIDE});

                    dispatch({type:CTActions.TEACHER_CLASS_TOTAL_CLASS_UPDATE,data:{ClassID,ClassName}});

                }

                //获取该行政班级的课时

                ApiActions.GetClassInfoByGanger({SchoolID,ClassID,dispatch}).then(data=>{

                    if (data){

                        const { ItemClassHour,ItemClassHourCount } = data;

                        dispatch({type:CTActions.TEACHER_CLASS_TOTAL_CLASS_CLASSHOUR_UPDATE,data:{ItemClassHour,ItemClassHourCount}});

                        ApiActions.GetScheduleOfClassOne({SchoolID,ClassID,WeekNO,dispatch}).then(json=>{

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

                                dispatch({type:CTActions.TEACHER_CLASS_TOTAL_SCHEDULE_UPDATE,data:Schedule});

                            }

                            dispatch({type:CTActions.TEACHER_CLASS_TOTAL_LOADING_HIDE});

                            dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                        });


                    }

                });


            }else{

                dispatch({type:CTActions.TEACHER_CT_EMPTY_CLASSES_SHOW});

                dispatch({type:CTActions.TEACHER_CLASS_TOTAL_LOADING_HIDE});

                dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            }

        }else{

            window.location.href='/Error.aspx?errcode=E011';

        }



        /*ApiActions.GetClassInfoByGanger({SchoolID,UserID,UserType,UserClass,dispatch}).then(data=>{

            if (data){

                const { ClassName,ClassID,ItemClassHour,ItemClassHourCount } = data;

                dispatch({type:CTActions.TEACHER_CLASS_TOTAL_CLASS_UPDATE,data:{ClassID,ClassName}});

                dispatch({type:CTActions.TEACHER_CLASS_TOTAL_CLASS_CLASSHOUR_UPDATE,data:{ItemClassHour,ItemClassHourCount}})

                ApiActions.GetScheduleOfClassOne({SchoolID,ClassID,WeekNO,dispatch}).then(json=>{

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

                        dispatch({type:CTActions.TEACHER_CLASS_TOTAL_SCHEDULE_UPDATE,data:Schedule});

                    }

                    dispatch({type:CTActions.TEACHER_CLASS_TOTAL_LOADING_HIDE});

                    dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                });


            }

        });
*/

        //获取行政班

       /* ApiActions.GetSubjectAndClassInfoByTeacherID({TeacherID:UserID,dispatch}).then(data=>{

           if (data){

               let ClassList = data.ItemClass.map(item=>{

                  return {

                      value:item.ClassID,

                      title:item.ClassName

                  }

               });

               let ClassID = '';

               if (ClassList.length>1){

                   ClassID = ClassList[0].value;

                dispatch({type:CTActions.TEACHER_CLASS_TOTAL_CLASS_DROP_SHOW});

                dispatch({type:CTActions.TEACHER_CLASS_TOTAL_CLASS_DROP_CHANGE,data:ClassList[0]});

                dispatch({type:CTActions.TEACHER_CLASS_TOTAL_CLASS_DROP_LIST_UPDATE,data:ClassList});

               }else if (ClassList.length===1){

                   ClassID = ClassList[0].value;

                   dispatch({type:CTActions.TEACHER_CLASS_TOTAL_CLASS_DROP_HIDE});

                   dispatch({type:CTActions.TEACHER_CLASS_TOTAL_CLASS_NANE_CHANGE,data:ClassList[0].title});

                   dispatch({type:CTActions.TEACHER_CLASS_TOTAL_CLASS_ID_CHANGE,data:ClassList[0].value});


               }else{

                   dispatch({type:CTActions.TEACHER_CLASS_TOTAL_CLASS_DROP_HIDE});

                   dispatch({type:CTActions.TEACHER_CLASS_TOTAL_CLASS_ID_CHANGE,data:''});

                   dispatch({type:CTActions.TEACHER_CLASS_TOTAL_CLASS_NANE_CHANGE,data:''});

               }

               //如果有任课班级的情况下
               if (ClassID){

                    ApiActions.GetScheduleOfClassOne({SchoolID,ClassID,WeekNO,dispatch}).then(json=>{

                       if (json){

                           let Schedule = json.ItemSchedule.map((item) => {

                               return {

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

                                   WeekDay:item.WeekDay,

                                   ClassHourNO:item.ClassHourNO,

                                   IsShift:true

                               };

                               Schedule.push(ShiftClass);

                           });

                           dispatch({type:CTActions.TEACHER_CLASS_TOTAL_SCHEDULE_UPDATE,data:Schedule});

                       }

                        dispatch({type:CTActions.TEACHER_CLASS_TOTAL_LOADING_HIDE});

                        dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

                    });

               }else{//没有任课班级什么都不请求

                   dispatch({type:CTActions.TEACHER_CLASS_TOTAL_LOADING_HIDE});

                   dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

               }


           }

        });*/

    }

};


//获取学生课表
const ClassStudentPageInit = () =>{

  return (dispatch,getState) => {

      dispatch({type: CSActions.TEACHER_CLASS_TOTAL_STUDENT_INIT});

      const { PeriodWeekTerm,LoginUser } = getState();

      const { SchoolID } = LoginUser;

      const { WeekNO,ItemWeek } = PeriodWeekTerm;

      const { Classes } = getState().Teacher.GangerClass;

      const { ItemPeriod,defaultPeriodIndex } = PeriodWeekTerm;

      if (ItemPeriod&&ItemPeriod.length>0){

          const ActivePeriodID = ItemPeriod[defaultPeriodIndex].PeriodID;

          const ActiveClasses =  Classes.filter(item=>item.PeriodID===ActivePeriodID);

          if (ActiveClasses.length>0){

              let WeekList = [];

              ItemWeek.map(item=>{

                  WeekList.push({

                      value:item.WeekNO,

                      title:item.WeekNO

                  });

              });

              const { ClassID,ClassName } = ActiveClasses[0];

              dispatch({type:CSActions.TEACHER_CS_WEEK_LIST_UPDATE,data:WeekList});

              dispatch({type:CSActions.TEACHER_CS_WEEK_CHANGE,data:WeekNO});

              dispatch({type:CSActions.TEACHER_CS_ACTIVE_CLASSES_CHANGE,data:ActiveClasses});

              //获取第一个班级的课时信息。
              ApiActions.GetClassInfoByGanger({SchoolID,ClassID, dispatch}).then(data => {

                  if (data) {

                      const {ItemClassHour, ItemClassHourCount} = data;

                      /* dispatch({type:CSActions.TEACHER_CS_CLASS_INFO_UPDATE,data:{ClassName,ClassID}});*/

                      dispatch({type: CSActions.TEACHER_CLASS_TOTAL_STUDENT_CLASSHOUR_UPDATE, data: {ItemClassHour, ItemClassHourCount}});

                      //将所有的班级ID拼接成班级ID串。

                      const ClassList = ActiveClasses.map(item=>item.ClassID);

                      const ClassesStr = ClassList.join(',');

                      //获取行政班的学生信息
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

                                  dispatch({type:CSActions.TEACHER_CS_STUDENT_LEFT_LIST_UPDATE,data:StudentList});

                              }else{

                                  let list = json.map((i) => {

                                      return {

                                          id:i.StudentID,

                                          name:i.StudentName

                                      }

                                  });

                                  dispatch({type:CSActions.TEACHER_CS_SEARCH_STUDENT_RESULT_UPDATE,data:list});

                                  dispatch({type:CSActions.TEACHER_CS_SEARCH_STU_RESULT_SHOW});

                                  dispatch({type:CSActions.TEACHER_CS_SEARCH_TITLE_SHOW,data:`${ClassName}学生列表`});

                              }

                          }

                          dispatch({type:CSActions.TEACHER_CS_LOADING_HIDE});

                          dispatch({type:AppLoadingActions.APP_LOADING_HIDE})

                      })


                  }

              });

          }else{

              dispatch({type:CSActions.TEACHER_CS_CLASSES_EMPTY_SHOW});

              dispatch({type:CSActions.TEACHER_CS_LOADING_HIDE});

              dispatch({type:AppLoadingActions.APP_LOADING_HIDE})


          }

      }else{

          window.location.href='/Error.aspx?errcode=E011';

      }



      /*ApiActions.GetClassInfoByGanger({SchoolID,ClassID:Classes[0].ClassID, dispatch}).then(data => {

          if (data) {

              const {ItemClassHour, ItemClassHourCount} = data;

              dispatch({type:CSActions.TEACHER_CS_CLASS_INFO_UPDATE,data:{ClassName,ClassID}});

              dispatch({type: CSActions.TEACHER_CLASS_TOTAL_STUDENT_CLASSHOUR_UPDATE, data: {ItemClassHour, ItemClassHourCount}});

              /!*ApiActions.GetSudentInfoByClassIDAndKey({ClassID,Key:'',dispatch}).then(json=>{

                  if (json){

                      let leftMenuData = [];

                      let list = json.map((i) => {

                          return {

                              id:i.StudentID,

                              name:i.StudentName

                          }

                      });

                      dispatch({type:CSActions.TEACHER_CS_SEARCH_STUDENT_RESULT_UPDATE,data:list});

                      dispatch({type:CSActions.TEACHER_CS_SEARCH_STU_RESULT_SHOW});

                      dispatch({type:CSActions.TEACHER_CS_SEARCH_TITLE_SHOW,data:`${ClassName}学生列表`});

                  }

                  dispatch({type:CSActions.TEACHER_CS_LOADING_HIDE});

                  dispatch({type:AppLoadingActions.APP_LOADING_HIDE})

              })*!/
          }

      });
*/

      //新的代码 2019-12-19



  }

};

const getQueryVariable = (variable) => {

    let query = window.location.href;

    if (query.split("?")[1]){

        let vars = query.split("?")[1].split('&');

        for (let i=0;i<vars.length;i++) {

            let pair = vars[i].split("=");

            if(pair[0] === variable){return pair[1];}

        }

        return(false);

    }else{

        return false;

    }



};


export default {

    STSPageInit,

    STTPageInit,

    TeacherPersonalInit,

    ClassTotalInit,

    ClassStudentPageInit,

    TeacherClassHourChange

}