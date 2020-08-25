import {getGetData,getPostData} from './utils';

import { btnErrorAlertShow } from './appAlertActions';



//获取基础信息
export const GetBaseInfoForPages = async ({dispatch})=>{

    const res = await getGetData(`/Global/GetBaseInfoForPages`,1);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'初始化界面错误'}));

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

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'未获取到学年学期信息'}));

    }

};


//获取学生学籍档案详情

export const getDetailStuStatus =  async ({userId,proxy,dispatch})=>{

    const res = await getGetData(`/admin/getDetailStuStatus?userId=${userId}`,1,proxy);

    if (res.code===0){

        if (res.data.studentStatus.length>0){

            return res.data;

        }else{

            dispatch(btnErrorAlertShow({title:'该用户不存在或已被删除'}));

        }

    }else{

        dispatch(btnErrorAlertShow({title:res.msg?res.msg:'获取用户信息失败'}));

    }

};


//获取教师档案详情

export const getTeacherDetailIntroduction =  async ({teacherId,proxy,dispatch})=>{

    const res = await getGetData(`/admin/getTeacherDetailIntroduction?teacherId=${teacherId}`,1,proxy);

    if (res.code===0){

        if (res.data){

            return res.data;

        }else{

            dispatch(btnErrorAlertShow({title:'该用户不存在或已被删除'}));

        }

    }else{

        dispatch(btnErrorAlertShow({title:res.msg?res.msg:'获取用户信息失败'}));

    }

};


export const getScientificCaseDetail =  async ({userId,scientificType,proxy,dispatch})=>{

    const res = await getGetData(`/admin/getScientificCaseDetail?userId=${userId}&scientificType=${scientificType}`,1,proxy);

    if (res.code===0){

        if (res.data){

            return res.data;

        }else{

            dispatch(btnErrorAlertShow({title:'该用户不存在或已被删除'}));

        }

    }else{

        dispatch(btnErrorAlertShow({title:res.msg?res.msg:'获取用户信息失败'}));

    }

};



//获取用户详情For画像

export const GetUserDetailForHX =  async ({UserID,UserType,proxy='',dispatch})=>{

    const res = await getGetData(`/UserMgr/UserInfoMgr/GetUserDetailForHX?UserID=${UserID}&UserType=${UserType}`,2,proxy);

    if (res.StatusCode===200){

        return res.Data;

    }else{

        dispatch(btnErrorAlertShow({title:res.msg?res.msg:'获取用户详情失败'}));

    }

};



//获取用户详情For画像

export const GetUserLogForHX =  async ({UserID,UserType,proxy='',dispatch})=>{

    const res = await getGetData(`/UserMgr/UserInfoMgr/GetUserLogForHX?UserID=${UserID}&UserType=${UserType}`,2,proxy);

    if (res.StatusCode===200){

        return res.Data;

    }else{

        dispatch(btnErrorAlertShow({title:res.msg?res.msg:'获取用户详情失败'}));

    }

};







export default {

    GetBaseInfoForPages,

    GetSubSystemsMainServerBySubjectID,

    GetCurrentTermInfo

}


