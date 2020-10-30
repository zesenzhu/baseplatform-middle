import Method from "./Method";

import AppAlertActions from "./AppAlertActions";


//教师获取个人PC桌面

const GetTeacherDeskTop = async ({UserID,SubjectID,dispatch})=>{

  const res = await Method.getGetData(`/SubjectInfoMgr/DeskTop/Teacher/GetDeskTop?UserID=${UserID}&SubjectID=${SubjectID}`,2);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        //window.location.href='/error.aspx';

        alert(res.Msg);

    }


};



//学生获取个人PC桌面

const GetStudentDeskTop = async ({UserID,dispatch})=>{


    const res = await Method.getGetData(`/SubjectInfoMgr/DeskTop/Student/GetDeskTop?UserID=${UserID}`,2);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        //window.location.href='/error.aspx';

        alert(res.Msg);

    }


};



//获取界面初始化数据

const GetBaseInfoForPages = async ({dispatch}) => {

    const res = await Method.getGetData('/Global/GetBaseInfoForPages',1);

    if (res.StatusCode===200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'产品信息获取失败！'}));

    }

};

//获取小助手地址
const GetMsgWebServerAddress = async ({dispatch}) => {

    const res = await Method.getGetData('/Base/GetSingleSubsystemServer?SysID=200',1);

    if (res.StatusCode===200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'获取消息失败！'}));

    }

};

//获取在线统计信息（首页用）

const GetOnlineStatistics =  async ({dispatch})=>{

    const token = sessionStorage.getItem('token');

    const res = await Method.getGetData(`/BaseApi/Login/GetOnlineStatistics?appid=000&access_token=4d39af1bff534514e24948568b750f6c&token=${token}`,1);

    if (res.StatusCode===200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'获取在线统计信息失败！'}));

    }

};


//获取学校当前学年学期信息

const GetCurrentTermInfo =  async ({dispatch})=>{

    const {SchoolID} = JSON.parse(sessionStorage.getItem('UserInfo'));

    const res = await Method.getGetData(`/BaseApi/SysMgr/Setting/GetCurrentTermInfo?appid=000&access_token=4d39af1bff534514e24948568b750f6c&schoolID=${SchoolID}`,1);

    if (res.StatusCode===200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'获取在线统计信息失败！'}));

    }

};




//获取用户身份
export const GetSelfIdentity = async () => {

    const {UserID} = JSON.parse(sessionStorage.getItem("UserInfo"));


    const res = await Method.getGetData(`/UserMgr/PowerMgr/GetIdentityTypeByUserID?UserID=${UserID}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }

};


//根据用户身份code获取用户身份详情
export const GetIdentityTypeByCode = async (IdentityCodes) => {

    const {SchoolID} = JSON.parse(sessionStorage.getItem("UserInfo"));

    const res = await Method.getData(`/UserMgr/PowerMgr/GetIdentityTypeByCode?SchoolID=${SchoolID}&IdentityCodes=${IdentityCodes}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }

};


export const removeSlashUrl = (url)=>{

    const urlArr = url.split('');

    if (urlArr[urlArr.length-1]==='/'){

        return url.substr(0,urlArr.length-1);

    }else{

        return url;

    }

};


export default {

    GetTeacherDeskTop,

    GetBaseInfoForPages,

    GetStudentDeskTop,

    GetMsgWebServerAddress,

    GetOnlineStatistics,

    GetCurrentTermInfo,

    GetSelfIdentity,

    GetIdentityTypeByCode

}