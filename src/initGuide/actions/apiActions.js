import {getGetData} from './utils';

import { btnErrorAlertShow } from '../store/appAlert/index';

import config from './config';

//获取基础信息
export const GetBaseInfoForPages = async ({dispatch})=>{

    const res = await getGetData(`/Global/GetBaseInfoForPages`,1);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//获取省份信息
export const GetProvince = async ({dispatch})=>{

    const res = await getGetData(`/GetProvince`,1,config.AreaProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//获取城市信息
export const GetCity = async ({dispatch,ProvinceID})=>{

    const res = await getGetData(`/GetCity?ProvinceID=${ProvinceID}`,1,config.AreaProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//获取区县信息
export const GetCounty = async ({dispatch,CityID})=>{

    const res = await getGetData(`/GetCounty?CityID=${CityID}`,1,config.AreaProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//获取当前学年学期信息
export const GetCurrentTermInfo = async ({dispatch,SchoolID})=>{

    const res = await getGetData(`/SysMgr/Setting/GetCurrentTermInfo?SchoolID=${SchoolID}`,2);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//获取学校基础信息
export const GetSchoolInfo = async ({dispatch,SchoolID})=>{

    const res = await getGetData(`/SysMgr/Setting/GetSchoolInfo?SchoolID=${SchoolID}`,2);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'未知错误'}));

    }

};