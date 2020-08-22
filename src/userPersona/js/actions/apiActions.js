import {getGetData,getPostData} from './utils';

import { btnErrorAlertShow } from './appAlertActions';



//获取基础信息
export const GetBaseInfoForPages = async ({dispatch})=>{

    const res = await getGetData(`/Global/GetBaseInfoForPages`,1);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//获取子系统的服务器地址信息
export const GetSubSystemsMainServerBySubjectID = async ({appid='000',access_token='4d39af1bff534514e24948568b750f6c',sysIDs='',subjectID='',dispatch})=>{

    const res = await getGetData(`/BaseApi/Global/GetSubSystemsMainServerBySubjectID?appid=${appid}&access_token=${access_token}&sysIDs=${sysIDs}&subjectID=${subjectID}`,1);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'未知错误'}));

    }

};

//获取学校当前学年学期信息

export const GetCurrentTermInfo =  async ({SchoolID,dispatch})=>{

    const res = await getGetData(`/BaseApi/SysMgr/Setting/GetCurrentTermInfo?appid=000&access_token=4d39af1bff534514e24948568b750f6c&schoolID=${SchoolID}`,1);

    if (res.StatusCode===200){

        return res.Data;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'获取在线统计信息失败！'}));

    }

};


//获取学生学籍档案详情

export const getDetailStuStatus =  async ({userId,proxy,dispatch})=>{

    const res = await getGetData(`/admin/getDetailStuStatus?userId=${userId}`,1,proxy);

    if (res.code===0){

        return res.data;

    }else{

        dispatch(btnErrorAlertShow({title:res.msg?res.msg:'获取在线统计信息失败！'}));

    }

};


//获取用户详情For画像

export const GetUserDetailForHX =  async ({UserID,UserType,proxy,dispatch})=>{

    const res = await getGetData(`/UserMgr/UserInfoMgr/GetUserDetailForHX?UserID=${UserID}&UserType=${UserType}`,2,proxy);

    if (res.StatusCode===200){

        return res.Data;

    }else{

        dispatch(btnErrorAlertShow({title:res.msg?res.msg:'获取在线统计信息失败！'}));

    }

};




export default {

    GetBaseInfoForPages,

    GetSubSystemsMainServerBySubjectID,

    GetCurrentTermInfo

}


