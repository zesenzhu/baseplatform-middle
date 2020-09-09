import config from './config';

import $ from 'jquery';

import { showErrorAlert } from "../store/appAlert";

import { getGetData,getPostData } from './utils';

import { getData } from '../../common/js/fetch';



//get方法

//获取最初的配置信息
export const GetBaseInfo = async ({dispatch})=>{

    const res = await getGetData(`/Global/GetBaseInfo`,1,config.GetBaseInfo);

    if (parseInt(res.StatusCode) === 200){

        return res.Data;

    }else if ((parseInt(res.StatusCode)!==500)&&(parseInt(res.StatusCode)!==403)){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};





//获取最初的配置信息
export const GetSystemsMainServer = async ({appid,access_token,sysIDs,subjectID='',dispatch})=>{

    const res = await getGetData(`/GetSubSystemsMainServerBySubjectID?appid=${appid}&access_token=${access_token}&sysIDs=${sysIDs}&subjectID=${subjectID}`,1,config.SystemsMainServer);

    if (parseInt(res.StatusCode) === 200){

        return res.Data;

    }else if ((parseInt(res.StatusCode)!==500)&&(parseInt(res.StatusCode)!==403)){

        dispatch(showErrorAlert({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//登录相关
export const loginApi = ({token,method,params}) => {

   const ajax =  $.ajax({
        url:`${config.Login}/UserMgr/Login/Api/Login.ashx?method=${method}&params=${params}${token?'&token='+token:''}`,
        type: "GET",
        dataType: "jsonp",
        jsonp: "jsoncallback" //这里的值需要和回调函数名一样
    });

   return ajax;

};

//获取学年学期
export const GetCurrentTermInfo = async ({SchoolId})=>{

    const res = await getData(`${config.GetBaseInfo}/SysMgr/Setting/GetCurrentTermInfo?SchoolId=${SchoolId}`,2,"cors",false,false);

    const data = await res.json();

    if (parseInt(data.StatusCode) === 200){

        return data.Data;

    }

};

//获取是否初始化完成
export const GetSchoolInitStatus = async ({SchoolId})=>{

    const res = await getData(`${config.GetBaseInfo}/SysMgr/Setting/GetSchoolInitStatus?SchoolId=${SchoolId}`,2,"cors",false,false);

    const data = await res.json();

    if (parseInt(data.StatusCode) === 200){

        return data.Data;

    }

};



