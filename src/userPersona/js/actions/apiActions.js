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

    console.log("111");

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'未知错误'}));

    }

};




