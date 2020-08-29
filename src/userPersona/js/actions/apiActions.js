import {getGetData,getPostData,removeSlashUrl} from './utils';

import { btnErrorAlertShow } from './appAlertActions';

import {fetch} from 'whatwg-fetch'

import $ from 'jquery'

import config from './config'


//get

//获取基础信息
export const GetBaseInfoForPages = async ({dispatch})=>{

    const res = await getGetData(`/Global/GetBaseInfoForPages`,1);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        window.location.href='/Error.aspx?errcode=E001';

    }

};


//获取子系统的服务器地址信息
export const GetSubSystemsMainServerBySubjectID = async ({appid='000',access_token='4d39af1bff534514e24948568b750f6c',sysIDs='',subjectID='',dispatch})=>{

    const res = await getGetData(`/BaseApi/Global/GetSubSystemsMainServerBySubjectID?appid=${appid}&access_token=${access_token}&sysIDs=${sysIDs}&subjectID=${subjectID}`,1);

    if (res.StatusCode === 200){

        return res.Data;

    }

};

//获取学校当前学年学期信息

export const GetCurrentTermInfo =  async ({SchoolID,dispatch})=>{

    const res = await getGetData(`/BaseApi/SysMgr/Setting/GetCurrentTermInfo?appid=000&access_token=4d39af1bff534514e24948568b750f6c&schoolID=${SchoolID}`,1);

    if (res.StatusCode===200){

        return res.Data;

    }

};


//获取学生学籍档案详情

export const getDetailStuStatus =  async ({userId,proxy,dispatch})=>{

    const res = await getGetData(`/admin/getDetailStuStatus?userId=${userId}`,1,proxy);

    if (res.code===0){

        if (res.data.studentStatus.length>0){

            return res.data;

        }

    }

};


//获取教师档案详情

export const getTeacherDetailIntroduction =  async ({teacherId,proxy,dispatch})=>{

    const res = await getGetData(`/admin/getTeacherDetailIntroduction?teacherId=${teacherId}`,1,proxy);

    if (res.code===0){

        if (res.data){

            return res.data;

        }

    }

};

//获取科研以及获奖情况
export const getScientificCaseDetail =  async ({userId,scientificType,proxy,dispatch})=>{

    const res = await getGetData(`/admin/getScientificCaseDetail?userId=${userId}&scientificType=${scientificType}`,1,removeSlashUrl(proxy));

    if (res.code===0){

        if (res.data){

            return res.data;

        }

    }

};



//获取用户详情For画像

export const GetUserDetailForHX =  async ({UserID,UserType,dispatch})=>{

    const res = await getGetData(`/UserMgr/UserInfoMgr/GetUserDetailForHX?UserID=${UserID}&UserType=${UserType}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }else{

        if (res.ErrCode===-2){

            window.location.href='/Error.aspx?errcode=E001';

        }

    }

};



//获取用户详情For画像

export const GetUserLogForHX =  async ({UserID,UserType,dispatch})=>{

    const res = await getGetData(`/UserMgr/UserInfoMgr/GetUserLogForHX?UserID=${UserID}&UserType=${UserType}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }

};





//获取个人空间的学习科目和课程

export const GetStudentStudyInfo =  async ({schoolID,userID,termID='',dispatch})=>{

    const res = await getGetData(`/CourseClass/api/GetStudentStudyInfo?schoolID=${schoolID}&userID=${userID}&termID=${termID}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }

};





//获取学生活动日常

export const GetStuActivities =  async ({StudentId,ClassId,GradeId,ActiveType=0,TimeStamp=new Date().getTime(),Key=new Date().getTime(),IsCourseClass=false,proxy='',dispatch})=>{

     const res = await dataSetsGetData(`${removeSlashUrl(proxy)}/api/v1/Student/Active/Class/One?StudentId=${StudentId}&ClassId=${ClassId}&GradeId=${GradeId}&ActiveType=${ActiveType}&TimeStamp=${TimeStamp}&Key=${Key}&IsCourseClass=${IsCourseClass}`);

    // const res = transferInterface({appid:'860',reqUrl:`${removeSlashUrl(proxy)}/api/v1/Student/Active/Class/One?StudentId=${StudentId}&ClassId=${ClassId}&GradeId=${GradeId}&ActiveType=${ActiveType}&TimeStamp=${TimeStamp}&Key=${Key}&IsCourseClass=${IsCourseClass}`});

    if (res&&res.length>0){

        return res[0];

    }
};


//获取学生单个异常

export const GetStuWaring =  async ({StudentId,WarningId='',WarningType=7,ClassId,GradeId,TimeStamp=new Date().getTime(),Key=new Date().getTime(),IsCourseClass=false,proxy='',dispatch})=>{

    const res = await dataSetsGetData(`${removeSlashUrl(proxy)}/api/v1/Student/Warning/Class/One/Detail?StudentId=${StudentId}&ClassId=${ClassId}&GradeId=${GradeId}&WarningId=${WarningId}&WarningType=${WarningType}&TimeStamp=${TimeStamp}&Key=${Key}&IsCourseClass=${IsCourseClass}`);


    if (res&&res.length>0){

        return res;

    }

};


//获取学生宿舍

export const GetStuDormitory  =  async ({userId,userType,schoolId,proxy='',dispatch})=>{

    const res = await transferInterface({appid:'E48',reqUrl:`${removeSlashUrl(proxy)}/student/bedAndStatus?userId=${userId}&userType=${userType}&schoolId=${schoolId}`})

   if (res.StatusCode===200&&res.Data.code===1){

       //const data = JSON.parse(res.Data);

       return res.Data.result;

   }

};



//第三方接口中转接口

export const transferInterface = async ({appid,reqUrl}) =>{

    const token = sessionStorage.getItem("token");

    const url = encodeURIComponent(reqUrl);

    const res = await getGetData(`/Global/GetHttpRequestTransfer?appid=${appid}&token=${token}&reqUrl=${url}`,1,config.ceshiProxy);

    let response = '';

    try {

        const data = JSON.parse(res);

        response = {

            StatusCode:200,

            Msg:'success',

            Data:data

        }

    }catch (e) {

        response = {

            StatusCode:400,

            Msg:'接口错误',

            Data:null

        }

    }

    return response;

};




//post

//重置密码
export const ResetPwd = async ({userID,userType,newPwd,dispatch}) =>{

    const res = await getPostData(`/UserMgr/UserAccount/ResetPwd`,{

        userID,userType,newPwd

    },2);

    if (res.StatusCode===200){

        return res.ErrCode;

    }else if (res.StatusCode===400){

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'重置密码失败'}));

    }

};












//大数据相关的请求


const dataSetsGetData = async (url)=>{

  const res = await fetch(url,{

      method:'GET',

      mode: "cors",

      cache: "no-cache",

      headers:{

          'Content-Type':'application/json',

          'Accept':"application/json",

          'Lg_MgrCenter_Token':sessionStorage.getItem("token"),

          'Lg_MgrCenter_UserId':JSON.parse(sessionStorage.getItem("UserInfo")).UserID,

          "Lg_MgrCenter_Client":0

      }

  });

  const data = await res.json();

 /* $.ajax({

      url,

      dataType:'jsonp',

      jsonp: "jsoncallback",

      headers:{

          'Content-Type':'application/json',

          'Accept':"application/json",

          'Lg_MgrCenter_Token':sessionStorage.getItem("token"),

          'Lg_MgrCenter_UserId':JSON.parse(sessionStorage.getItem("UserInfo")).UserID,

          "Lg_MgrCenter_Client":0

      },

      success:(data)=>{

          console.log(data);

      },

      error:(e,err)=>{

          console.log(e,err);

      }

  });*/

  return data;

};



//宿舍请求

const dormitoryGetData =  (url) =>{

    $.ajax({

        type:"get",

        url,

        dataType: "jsonp",

        jsonp: "jsoncallback",

        success:(data)=>{

            console.log(data);

        },

        error:(e,err)=>{

            console.log(e,err);

        }

    })

};



export default {

    GetBaseInfoForPages,

    GetSubSystemsMainServerBySubjectID,

    GetCurrentTermInfo,

    getDetailStuStatus,

    getTeacherDetailIntroduction,

    getScientificCaseDetail,

    GetUserDetailForHX,

    GetUserLogForHX,

    ResetPwd,

    GetStuActivities,

    GetStuWaring,

    transferInterface,

    GetStuDormitory

}


