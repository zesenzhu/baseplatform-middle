import Method from './Method';

import AppAlertActions from './AppAlertActions';

import CONFIG from "../../../common/js/config";



//api接口


//GET


//errorcode码

const ErrorCodeTransform = (json,dispatch) => {

    if (json.StatusCode === 500){

        dispatch(AppAlertActions.alertError({title:'程序出现异常，请联系管理员'}));

    }else if (json.StatusCode===400) {

        switch (json.ErrCode) {

            case -1:

                dispatch(AppAlertActions.alertError({title:'参数错误'}));

                break;

            case -3:

                dispatch(AppAlertActions.alertError({title:'暂无可调整的课程'}));

                break;

            case -4:

                dispatch(AppAlertActions.alertError({title:'所调整的课程和教师课表冲突'}));

                break;

            case -5:

                dispatch(AppAlertActions.alertError({title:'所调整的课程和学生课表冲突'}));

                break;

            case -6:

                dispatch(AppAlertActions.alertError({title:'所调整的课程和教室课表冲突'}));

                break;

            case -7:

                dispatch(AppAlertActions.alertError({title:'所调整的课程与教室课表和教师课表冲突'}));

                break;

            case -8:

                dispatch(AppAlertActions.alertError({title:'该课程已被停课，不可进行操作'}));

                break;

            case -9:

                dispatch(AppAlertActions.alertError({title:'进行交换的课程有不属于行政班的课程或不是在同一个行政班下'}));

                break;

            case -10:

                dispatch(AppAlertActions.alertError({title:'该行政班不存在或已被删除'}));

                break;

            default:

                dispatch(AppAlertActions.alertError({title:'参数错误'}));

        }

    }

};



//获取子系统地址链接

const GetSingleSubsystemServer = async ({dispatch}) => {

    let res = await Method.getGetData(`/Base/GetSingleSubsystemServer?SysID=E31`,

        2,

        CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        //dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常",ok:()=>{ return ()=>window.location.href='/error.aspx'}}));

        ErrorCodeTransform(res,dispatch);


    }


};


//获取学期、学段、周、年级、教室类型信息，如果是教师则返回只任教的学段

const GetTermAndPeriodAndWeekNOInfo = async ({SchoolID,UserID,UserType,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetTermAndPeriodAndWeekNOInfo?SchoolID=${SchoolID}&UserID=${UserID}&UserType=${UserType}`,

        2,

        CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        //dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常",ok:()=>{ return ()=>window.location.href='/error.aspx'}}));

        ErrorCodeTransform(res,dispatch);

    }


};

//获取学段课时、学科、年级、教室类型信息


const GetAllOptionByPeriodID = async ({SchoolID,PeriodID,UserID,UserType,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetAllOptionByPeriodID?SchoolID=${SchoolID}&UserID=${UserID}&UserType=${UserType}&PeriodID=${PeriodID}`,

        2,

        CONFIG.ScheduleProxy);

    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        //dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常",ok:()=>{ return ()=>window.location.href='/error.aspx'}}));

        ErrorCodeTransform(res,dispatch);

    }


};


//分页获取学科教师总课表（包含全学科和单学科）

const GetAllScheduleOfTeachersBySubjectIDForPage = async ({SchoolID,PeriodID,SubjectID='',WeekNO=0,PageIndex,PageSize,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetAllScheduleOfTeachersBySubjectIDForPage?SchoolID=${SchoolID}&SubjectID=${SubjectID}&PeriodID=${PeriodID}&WeekNO=${WeekNO}&PageIndex=${PageIndex}&PageSize=${PageSize}`,

        2,

        CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        //dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常",ok:()=>{ return ()=>window.location.href='/error.aspx'}}));

        ErrorCodeTransform(res,dispatch);

    }


};



//分页获取班级总课表

const GetAllScheduleOfClassByGradeIDForPage = async ({SchoolID,PeriodID,GradeID='',WeekNO=0,PageIndex,PageSize,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetAllScheduleOfClassByGradeIDForPage?SchoolID=${SchoolID}&GradeID=${GradeID}&PeriodID=${PeriodID}&WeekNO=${WeekNO}&PageIndex=${PageIndex}&PageSize=${PageSize}`,

        2,

        CONFIG.ScheduleProxy);
        //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};


//分页获取教室总课表

const GetAllScheduleOfClassRoomByClassRoomTypeForPage = async ({SchoolID,PeriodID,ClassRoomType='',WeekNO=0,PageIndex,PageSize,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetAllScheduleOfClassRoomByClassRoomTypeForPage?SchoolID=${SchoolID}&ClassRoomType=${ClassRoomType}&PeriodID=${PeriodID}&WeekNO=${WeekNO}&PageIndex=${PageIndex}&PageSize=${PageSize}`,

        2,

        CONFIG.ScheduleProxy);
    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};




//获取单个班级课表

const GetScheduleOfClassOne = async ({SchoolID,ClassID,WeekNO=0,dispatch}) => {

    let res = await Method.getGetData(`/schedule/api/GetScheduleOfClassOne?SchoolID=${SchoolID}&ClassID=${ClassID}&WeekNO=${WeekNO}`,

        2,

        CONFIG.ScheduleProxy);
        //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};

//获取单个班级课表

const GetScheduleOfClassRoomOne = async ({PeriodID,ClassRoomID,WeekNO=0,dispatch}) => {

    let res = await Method.getGetData(`/schedule/api/GetScheduleOfClassRoomOne?PeriodID=${PeriodID}&ClassRoomID=${ClassRoomID}&WeekNO=${WeekNO}`,

        2,

        CONFIG.ScheduleProxy);
    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};



//获取课表教师信息（含搜索）

const GetTeacherBySubjectIDAndKey = async ({SchoolID,PeriodID='',Flag=1,SubjectID='',Key='',dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetTeacherBySubjectIDAndKey?SchoolID=${SchoolID}&PeriodID=${PeriodID}&SubjectID=${SubjectID}&Key=${Key}&Flag=${Flag}`,

        2,

        CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};


//获取学生信息（含搜索）

const GetSudentInfoByClassIDAndKey = async ({ClassID,Key='',dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetSudentInfoByClassIDAndKey?ClassID=${ClassID}&Key=${Key}`,

        2,

        CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};





//获取单个教师或学生的课表信息

const GetScheduleByUserID = async ({SchoolID,PeriodID,UserType,UserID,WeekNO=0,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetScheduleByUserID?SchoolID=${SchoolID}&PeriodID=${PeriodID}&UserType=${UserType}&UserID=${UserID}&WeekNO=${WeekNO}`,

        2,

        CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};


//获取走班课程

const GetCourseClassInfo = async ({ClassID,WeekNO,WeekDayNO,ClassHourNO,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetCourseClassInfo?ClassID=${ClassID}&WeekNO=${WeekNO}&WeekDayNO=${WeekDayNO}&ClassHourNO=${ClassHourNO}`,

        2,

        CONFIG.ScheduleProxy);

        //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};


//获取全部课时和全部学段用于课表设置

const GetAllPeriodAndClassHours = async ({SchoolID,dispatch}) => {

    let res = await Method.getGetData(`/schedule/api/GetAllPeriodAndClassHours?SchoolID=${SchoolID}`,

        2,

        CONFIG.ScheduleProxy);

    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};






//获取全部学科、周次、课时、学科教师、行政班信息

const GetAllOptionForAddSchedule = async ({SchoolID,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetAllOptionForAddSchedule?SchoolID=${SchoolID}`,

        2,

        CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }

};


//获取课表班级信息（含搜索）

const GetClassByGradeIDAndKey = async ({SchoolID,PeriodID='',GradeID='',Key='',Flag=1,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetClassByGradeIDAndKey?SchoolID=${SchoolID}&PeriodID=${PeriodID}&GradeID=${GradeID}&Key=${Key}&Flag=${Flag}`,

        2,

        CONFIG.ScheduleProxy);

        //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }

};



//获取课表教室信息（含搜索）

const GetClassRoomByClassTypeAndKey = async ({SchoolID,Flag=1,PeriodID='',ClassRoomTypeID='',GradeID='',Key='',dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetClassRoomByClassTypeAndKey?SchoolID=${SchoolID}&PeriodID=${PeriodID}&ClassRoomTypeID=${ClassRoomTypeID}&Key=${Key}&Flag=${Flag}`,

        2,

        CONFIG.ScheduleProxy);

    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }

};


//获取任课教师的任课学科及任课班级（用于代课）

const GetSubjectAndClassInfoByTeacherID = async ({TeacherID,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetSubjectAndClassInfoByTeacherID?TeacherID=${TeacherID}`,

        2,

        CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }

};


//获取未结束上课的月、周、节次信息
const GetAllDateTimeInfo = async ({SchoolID,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetAllDateTimeInfo?SchoolID=${SchoolID}`,

        2,

        CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }

};


//根据上课日期获取周次、星期信息
const GetWeekInfoByDate = async ({SchoolID,ClassDate,dispatch}) => {

    let res = await Method.getGetData(`/schedule/api/GetWeekInfoByDate?SchoolID=${SchoolID}&ClassDate=${ClassDate}`,

        2,

        CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }

};


//根据任课教师及上课日期获取课程安排信息

const GetScheduleByTeacherIDAndDate = async ({TeacherID,ClassDate,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetScheduleByTeacherIDAndDate?TeacherID=${TeacherID}&ClassDate=${ClassDate}`,

        2,

        CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }

};

//获取指定时间内未被占用的教室

const GetClassRoomIsNotBusy = async ({ClassDate,ClassHourNO,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetClassRoomIsNotBusy?ClassDate=${ClassDate}&ClassHourNO=${ClassHourNO}`,

        2,

        CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }

};


//判断教室是否被占用

const ClassRoomIsUseded = async ({ClassRoomID,ClassDate,ClassHourNO,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/ClassRoomIsUseded?ClassRoomID=${ClassRoomID}&ClassDate=${ClassDate}&ClassHourNO=${ClassHourNO}`,

        2,

        CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }

};

//判断教室是否被占用

const GetScheduleLogForPage = async ({SchoolID,OperateType=0,StartDate='',EndDate='',PageIndex=1,PageSize=10,ScheduleID='',dispatch}) => {

    let Url = '/Schedule/api/GetScheduleLogForPage?SchoolID='+SchoolID+'&OperateType='+OperateType+'&StartDate='+StartDate+'&EndDate='+EndDate+'&PageIndex='+PageIndex+'&PageSize='+PageSize+'&ScheduleID='+ScheduleID;

    let res = await Method.getGetData(Url,

        2,

        CONFIG.ScheduleProxy);

    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');


    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }

};

//课时设置切换处理程序并获取切换后的课时信息

const ShiftClassHourModel = async ({SchoolID,CreateType=0,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/ShiftClassHourModel?SchoolID=${SchoolID}&CreateType=${CreateType}`,

        2,

        CONFIG.ScheduleProxy);

    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');


    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }

};

//获取班主任所在行政班的信息

const GetClassInfoByGanger = async ({SchoolID,ClassID,dispatch}) => {

    let res = await Method.getGetData(`/ScheduleTea/api/GetClassInfoByGanger?SchoolID=${SchoolID}&ClassID=${ClassID}`,

        2,

        CONFIG.ScheduleProxy);

    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    //'http://192.168.2.26:8084');


    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }

};

//获取任课教师课表单堂课的课堂详情

const GetScheduleDetailByUserID = async ({SchoolID,TeacherID,ScheduleID,ClassDate,ClassHourNO,dispatch}) => {

    let res = await Method.getGetData(`/ScheduleTea/api/GetScheduleDetailByUserID?SchoolID=${SchoolID}&TeacherID=${TeacherID}&ScheduleID=${ScheduleID}&ClassDate=${ClassDate}&ClassHourNO=${ClassHourNO}`,

        2,);

    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    //'http://192.168.2.26:8084');


    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }

};

//获取班主任所带行政班
const GetMyClass = async ({UserID,dispatch}) => {

    let res = await Method.getGetData(`/UserMgr/ClassMgr/GetMyClass?UserID=${UserID}`,

        2,CONFIG.AdmClassProxy);

    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    //'http://192.168.2.26:8084');


    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }

};


//获取班主任所带行政班
const GetStudentForAddOrEditCourseClassByKey = async ({schoolID,gradeID,key='',dispatch}) => {

    let res = await Method.getGetData(`/GetStudentForAddOrEditCourseClassByKey?schoolID=${schoolID}&gradeID=${gradeID}&key=${key}`,

        2,CONFIG.CourseClassProxy);

    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    //'http://192.168.2.26:8084');


    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }

};



//【新】获取教师、班级、教室课表集合


const GetScheduleForChangeTime = async ({ClassID='',CourseClassID,ClassRoomID,TeacherID,WeekNO,dispatch}) => {

    let res = await Method.getGetData(`/Schedule/api/GetScheduleForChangeTime?ClassID=${ClassID}&CourseClassID=${CourseClassID}&ClassRoomID=${ClassRoomID}&TeacherID=${TeacherID}&WeekNO=${WeekNO}`,

        2,CONFIG.ScheduleProxy);

    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    //'http://192.168.2.26:8084');


    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }

};



















//POST



//添加临时课程。写入课程数据接口

const InsertSchedule =  async ({ UserType,UserID,SchoolID,SubjectID,SubjectName,WeekNO,WeekDay,ClassHourNO,TeacherID,TeacherName,ClassID,CourseClassID='',CourseClassName,ClassRoomID,ClassRoomName,StudentIDs,dispatch}) => {

    let res = await Method.getPostData(`/Schedule/api/InsertSchedule`,{

        UserType,UserID,SchoolID,SubjectID,SubjectName,WeekNO,WeekDay,ClassHourNO,TeacherID,TeacherName,ClassID,CourseClassID,CourseClassName,ClassRoomID,ClassRoomName,StudentIDs

    },2,CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};

//设置代课教师

const SetSubstituteTeacher =  async ({ ClassID,ClassName,UserID,UserType,SchoolID,SubjectID,Type,Item,TeacherID1,TeacherID2,dispatch}) => {

    let res = await Method.getPostData(`/Schedule/api/SetSubstituteTeacher`,{

        ClassID,ClassName,UserID,UserType,SchoolID,SubjectID,Type,Item,TeacherID1,TeacherID2

    },2,CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};


//教师课程互换

const ExchangeTeacherSchedule =  async ({UserID,UserType,ScheduleID1,ScheduleID2,dispatch}) => {

    let res = await Method.getPostData(`/Schedule/api/ExchangeTeacherSchedule`,{

        ScheduleID1,ScheduleID2,UserID,UserType

    },2,CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};



//批量调整上课时间
const BatchEditClassDate =  async ({ UserID,ClassDate1,ClassHours1,ClassDate2,ClassHours2,Grades,dispatch}) => {

    let res = await Method.getPostData(`/Schedule/api/BatchEditClassDate`,{

        UserID,ClassDate1,ClassHours1,ClassDate2,ClassHours2,Grades

    },2,CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};


//单个调整上课时间

const EditClassDateOne =  async ({ UserID,UserType,ScheduleID,ClassDate1,ClassHourNO1,ClassDate2,ClassHourNO2,ClassRoomID,dispatch}) => {

    let res = await Method.getPostData(`/Schedule/api/EditClassDateOne`,{

        UserID,UserType,ScheduleID,ClassDate1,ClassHourNO1,ClassDate2,ClassHourNO2,ClassRoomID

    },2,CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};

//调整上课教室

const AdjustClassRooomOfSchedule =  async ({ UserID,UserType,SchoolID,Type,Item,ClassRoomID1,ClassRoomID2,dispatch}) => {

    let res = await Method.getPostData(`/Schedule/api/AdjustClassRooomOfSchedule`,{

        UserID,UserType:parseInt(UserType),SchoolID,Type,Item,ClassRoomID1,ClassRoomID2

    },2,CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};


//按教师调整课程-停课

const CloseTeacherSchedule =  async ({ UserID,UserType,ScheduleIDs,dispatch}) => {

    let res = await Method.getPostData(`/Schedule/api/CloseTeacherSchedule`,{

        UserID,UserType,ScheduleIDs

    },2,CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};


//批量停课

const BatchCloseSchedule =  async ({ SchoolID,UserID,UserType,ClassDate,ClassHours,Grades,dispatch}) => {

    let res = await Method.getPostData(`/Schedule/api/BatchCloseSchedule`,{

        SchoolID,UserID,UserType:parseInt(UserType),ClassDate,ClassHours,Grades

    },2,CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};


//清除课表

const DeleteScheduleByGrades =  async ({ UserID,UserType,SchoolID,GradeIDs,dispatch}) => {

    let res = await Method.getPostData(`/Schedule/api/DeleteScheduleByGrades`,{

        UserID,UserType,SchoolID,GradeIDs

    },2,CONFIG.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};


//批量调整课时
const UpdateClassHourTimeInstall = async ({ SchoolID,PeriodID='',MorningTimes=0,AfternoonTimes=0,dispatch}) => {

    let res = await Method.getPostData(`/Schedule/api/UpdateClassHourTimeInstall`,{

        SchoolID,PeriodID,MorningTimes,AfternoonTimes

    },2,
        CONFIG.ScheduleProxy);
        //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};

//添加课时
const InsertClassHourInfo = async ({ SchoolID,ClassHourName,OrderNO,EndTime,StartTime,PeriodID='',ClasssHourType,CreateType,dispatch}) => {

    let res = await Method.getPostData(`/Schedule/api/InsertClassHourInfo`,{

            SchoolID,OrderNO,ClassHourName,EndTime,StartTime,PeriodID,ClasssHourType,CreateType

        },2,
        CONFIG.ScheduleProxy);
        //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};

//编辑课时

const UpdateClassHourInfo = async ({ SchoolID,ClassHourName,ClassHourNO,NewClassHourNO,EndTime,StartTime,PeriodID='',ClasssHourType,CreateType,dispatch}) => {

    let res = await Method.getPostData(`/Schedule/api/UpdateClassHourInfo`,{

            SchoolID,ClassHourNO,ClassHourName,NewClassHourNO,EndTime,StartTime,PeriodID,ClasssHourType,CreateType

        },2,
        CONFIG.ScheduleProxy);
        //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};

//删除课时

const DeleteClassHourInfo = async ({ SchoolID,ClassHourNO,PeriodID='',dispatch}) => {

    let res = await Method.getPostData(`/Schedule/api/DeleteClassHourInfo`,{

            SchoolID,ClassHourNO,PeriodID

        },2,
        CONFIG.ScheduleProxy);
        //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};


//设置课表联动
const SetScheduleIsAutomatic = async ({ SchoolID,IsEnable,Times,dispatch}) => {

    let res = await Method.getPostData(`/Schedule/api/SetScheduleIsAutomatic`,{

            SchoolID,IsEnable,Times

        },2,
        CONFIG.ScheduleProxy);
        //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};

//撤销课程安排调整
const RevolveScheduleLog = async ({ SchoolID,LogID,UserID,UserName,OperateType,dispatch}) => {

    let res = await Method.getPostData(`/Schedule/api/RevolveScheduleLog`,{

            SchoolID,LogID,UserID,UserName,OperateType

        },2,

        CONFIG.ScheduleProxy);
    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};

//终止上课

const OverScheduleAndGetTea = async ({ SchoolID,UserID,TeacherID,ClassDate,ClassHourNO,ScheduleID,dispatch}) => {

    let res = await Method.getPostData(`/ScheduleTea/api/OverScheduleAndGetTea`,{

            SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,UserID

        },2,

        CONFIG.ScheduleProxy);
    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};

//撤销终止上课

const CancelOverScheduleAndGetTea = async ({ UserID,SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,dispatch}) => {

    let res = await Method.getPostData(`/ScheduleTea/api/CancelOverScheduleAndGetTea`,{

            SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,UserID

        },2,

        CONFIG.ScheduleProxy);
        //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};

//调整时间

const ChangeDateAndGetTea = async ({ UserID,SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,ScheduleClassDateAndClassHourNO,NowClassRoomID,NowClassRoomName,dispatch}) => {

    let res = await Method.getPostData(`/ScheduleTea/api/ChangeDateAndGetTea`,{

        UserID,SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,ScheduleClassDateAndClassHourNO,NowClassRoomID,NowClassRoomName,

        },2);

    //'http://192.168.2.26:8084');
    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};


//撤销调整时间

const CancelChangeDateAndGetTea = async ({ UserID,SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,dispatch}) => {

    let res = await Method.getPostData(`/ScheduleTea/api/CancelChangeDateAndGetTea`,{

        SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,UserID

    },2);

    //'http://192.168.2.26:8084');
    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};

//调整教室

const ChangeClassRoomAndGetTea = async ({ UserID,SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,ScheduleClassRoomID,dispatch}) => {

    let res = await Method.getPostData(`/ScheduleTea/api/ChangeClassRoomAndGetTea`,{

        SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,ScheduleClassRoomID,UserID

    },2);

    //'http://192.168.2.26:8084');
    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};

//撤销教室调整

const CancelChangeClassRoomAndGetTea = async ({ UserID,SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,dispatch}) => {

    let res = await Method.getPostData(`/ScheduleTea/api/CancelChangeClassRoomAndGetTea`,{

        SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,UserID

    },2);

    //'http://192.168.2.26:8084');
    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};

//找人代课

const ChangeTeacher = async ({ UserID,SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,ScheduleTeacherID,dispatch}) => {

    let res = await Method.getPostData(`/ScheduleTea/api/ChangeTeacher`,{

        SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,ScheduleTeacherID,UserID

    },2);

    //'http://192.168.2.26:8084');
    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};


//撤销找人代课

const CancelChangeTeacherAndGetTea = async ({ UserID,SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,dispatch}) => {

    let res = await Method.getPostData(`/ScheduleTea/api/CancelChangeTeacherAndGetTea`,{

        SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,UserID

    },2);

    //'http://192.168.2.26:8084');
    //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};



export default {

    GetTermAndPeriodAndWeekNOInfo,

    GetAllOptionByPeriodID,

    GetAllScheduleOfTeachersBySubjectIDForPage,

    GetTeacherBySubjectIDAndKey,

    GetScheduleByUserID,

    GetAllOptionForAddSchedule,

    GetClassByGradeIDAndKey,

    GetClassRoomByClassTypeAndKey,

    InsertSchedule,

    GetMyClass,

    GetSubjectAndClassInfoByTeacherID,

    GetAllDateTimeInfo,

    GetWeekInfoByDate,

    GetScheduleByTeacherIDAndDate,

    GetClassRoomIsNotBusy,

    ClassRoomIsUseded,

    SetSubstituteTeacher,

    ExchangeTeacherSchedule,

    BatchEditClassDate,

    EditClassDateOne,

    AdjustClassRooomOfSchedule,

    CloseTeacherSchedule,

    BatchCloseSchedule,

    DeleteScheduleByGrades,

    GetAllScheduleOfClassByGradeIDForPage,

    GetScheduleOfClassOne,

    GetScheduleOfClassRoomOne,

    GetAllScheduleOfClassRoomByClassRoomTypeForPage,

    GetCourseClassInfo,

    GetAllPeriodAndClassHours,

    UpdateClassHourTimeInstall,

    InsertClassHourInfo,

    UpdateClassHourInfo,

    DeleteClassHourInfo,

    SetScheduleIsAutomatic,

    GetScheduleLogForPage,

    RevolveScheduleLog,

    ShiftClassHourModel,

    GetClassInfoByGanger,

    GetSudentInfoByClassIDAndKey,

    GetScheduleDetailByUserID,

    OverScheduleAndGetTea,

    CancelOverScheduleAndGetTea,

    ChangeDateAndGetTea,

    CancelChangeDateAndGetTea,

    ChangeClassRoomAndGetTea,

    CancelChangeClassRoomAndGetTea,

    ChangeTeacher,

    CancelChangeTeacherAndGetTea,

    GetSingleSubsystemServer,

    GetStudentForAddOrEditCourseClassByKey,

    GetScheduleForChangeTime

}
