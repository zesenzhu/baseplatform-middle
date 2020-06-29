import config from '../../common/js/config';

import $ from 'jquery';

import { showErrorAlert } from "../store/appAlert";

import { getGetData,getPostData } from './utils';




//errorcode码

const ErrorCodeTransform = (json,dispatch) => {

    if (json.StatusCode === 500){

       showErrorAlert({title:'程序出现异常，请联系管理员',dispatch});

    }else if (json.StatusCode===400) {

        switch (json.ErrCode) {

            case -1:

                showErrorAlert({title:'参数错误',dispatch});

                break;

            case -3:

                showErrorAlert({title:'暂无可调整的课程',dispatch});

                break;

            case -4:

                showErrorAlert({title:'所调整的课程和教师课表冲突',dispatch});

                break;

            case -5:

                showErrorAlert({title:'所调整的课程和学生课表冲突',dispatch});

                break;

            case -6:

                showErrorAlert({title:'所调整的课程和教室课表冲突',dispatch});

                break;

            case -7:

                showErrorAlert({title:'所调整的课程与教室课表和教师课表冲突',dispatch});

                break;

            case -8:

                showErrorAlert({title:'该课程已被停课，不可进行操作',dispatch});

                break;

            case -9:

                showErrorAlert({title:'进行交换的课程有不属于行政班的课程或不是在同一个行政班下',dispatch});

                break;

            case -10:

                showErrorAlert({title:'该行政班不存在或已被删除',dispatch});

                break;

            default:

                showErrorAlert({title:'参数错误',dispatch});

        }

    }

};



//get方法

export const loginApi = ({token,method,params}) => {

   const ajax =  $.ajax({
        url:`${config.TokenProxy}/UserMgr/Login/Api/Login.ashx?method=${method}&params=${params}${token?'&token='+token:''}`,
        type: "GET",
        dataType: "jsonp",
        jsonp: "jsoncallback" //这里的值需要和回调函数名一样
    });

   return ajax;

};

//获取课表公共信息
export const GetScheduleInfoForAssitant  = async ({SchoolID,UserID,UserType,ScheduleID,dispatch})=>{

    const res = await getGetData(`/Schedule/api/GetScheduleInfoForAssitant?SchoolID=${SchoolID}&UserID=${UserID}&UserType=${UserType}&ScheduleID=${ScheduleID}`,1,config.ScheduleProxy);

    if (parseInt(res.StatusCode) === 200){

        return res.Data;

    }else if ((parseInt(res.StatusCode)!==500)&&(parseInt(res.StatusCode)!==403)){

        showErrorAlert({title:res.Msg?res.Msg:'未知错误',dispatch});

    }

};


//获取课表公共信息
export const GetScheduleForChangeTime  = async ({ClassID,CourseClassID,ClassRoomID,TeacherID,WeekNO,dispatch})=>{

    const res = await getGetData(`/Schedule/api/GetScheduleForChangeTime?ClassID=${ClassID}&CourseClassID=${CourseClassID}&ClassRoomID=${ClassRoomID}&TeacherID=${TeacherID}&WeekNO=${WeekNO}`,1,config.ScheduleProxy);

    if (parseInt(res.StatusCode) === 200){

        return res.Data;

    }else if ((parseInt(res.StatusCode)!==500)&&(parseInt(res.StatusCode)!==403)){

        showErrorAlert({title:res.Msg?res.Msg:'未知错误',dispatch});

    }

};



//获取课表教室信息（含搜索）

export const GetClassRoomByClassTypeAndKey = async ({SchoolID,Flag=1,PeriodID='',ClassRoomTypeID='',GradeID='',Key='',dispatch}) => {

    let res = await getGetData(`/Schedule/api/GetClassRoomByClassTypeAndKey?SchoolID=${SchoolID}&PeriodID=${PeriodID}&ClassRoomTypeID=${ClassRoomTypeID}&Key=${Key}&Flag=${Flag}`,

        2,

        config.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }

};


//获取代课教师（含搜索）

export const GetSubstituteTeacherInfo = async ({SchoolID,SubjectID='',ClassDate='',ClassHourNO='',Key='',dispatch}) => {

    let res = await getGetData(`/Schedule/api/GetSubstituteTeacherInfo?SchoolID=${SchoolID}&SubjectID=${SubjectID}&ClassDate=${ClassDate}&ClassHourNO=${ClassHourNO}&Key=${Key}`,

        2,

        config.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        ErrorCodeTransform(res,dispatch);

    }

};





//post

//调整时间

export const ChangeDateAndGetTea = async ({ UserID,SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,ScheduleClassDateAndClassHourNO,NowClassRoomID,NowClassRoomName,dispatch}) => {

    let res = await getPostData(`/ScheduleTea/api/ChangeDateAndGetTea`,{

        UserID,SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,ScheduleClassDateAndClassHourNO,NowClassRoomID,NowClassRoomName,

    },2,config.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};


//调整教室

export const ChangeClassRoomAndGetTea = async ({ UserID,SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,ScheduleClassRoomID,dispatch}) => {

    let res = await getPostData(`/ScheduleTea/api/ChangeClassRoomAndGetTea`,{

        UserID,SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,ScheduleClassRoomID

    },2,config.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};



//调整代课教师

export const ChangeTeacher = async ({ UserID,SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,ScheduleTeacherID,dispatch}) => {

    let res = await getPostData(`/ScheduleTea/api/ChangeTeacher`,{

        UserID,SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,ScheduleTeacherID

    },2,config.ScheduleProxy);

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        ErrorCodeTransform(res,dispatch);

    }


};
