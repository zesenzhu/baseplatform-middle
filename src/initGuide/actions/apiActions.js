import {getGetData,getPostData} from './method';

import { btnErrorAlertShow } from '../store/appAlert/index';

import config from './config';

import {fetch} from 'whatwg-fetch';

//获取基础信息
export const GetBaseInfoForPages = async ({dispatch})=>{

    const res = await getGetData(`/Global/GetBaseInfoForPages`,1);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'界面初始化失败'}));

    }

};


//获取省份信息
export const GetProvince = async ({dispatch})=>{

    const res = await getGetData(`/GetProvince`,1,config.AreaProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }

};


//获取城市信息
export const GetCity = async ({dispatch,ProvinceID})=>{

    const res = await getGetData(`/GetCity?ProvinceID=${ProvinceID}`,1,config.AreaProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }

};


//获取区县信息
export const GetCounty = async ({dispatch,CityID})=>{

    const res = await getGetData(`/GetCounty?CityID=${CityID}`,1,config.AreaProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }

};


//获取当前学年学期信息
export const GetCurrentTermInfo = async ({dispatch,SchoolID})=>{

    const res = await getGetData(`/SysMgr/Setting/GetCurrentTermInfo?SchoolID=${SchoolID}`,2);

    if (res.StatusCode === 200){

        return res.Data;

    }

};


//获取学校基础信息
export const GetSchoolInfo = async ({dispatch,SchoolID})=>{

    const res = await getGetData(`/SysMgr/Setting/GetSchoolInfo?SchoolID=${SchoolID}`,2);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'获取学校基础信息失败'}));

    }

};


//获取学校基础信息
export const GetCollegeList = async ({dispatch,SchoolID,keyword='',index=1,pageSize=10,SortType='CollegeName',SortFiled='asc'})=>{

    const res = await getGetData(`/SysMgr/Setting/College/List?SchoolID=${SchoolID}&index=${index}&pageSize=${pageSize}&keyword=${keyword}&SortType=${SortType}&SortFiled=${SortFiled}`,2);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'获取学校基础信息失败'}));

    }

};


export const GetSubjectInfo_University = async ({dispatch,schoolID,userID='',userType,key='',pageIndex=1,pageSize=10,orderType='ASC'})=>{

    const res = await getGetData(`/Subject/api/GetSubjectInfo_University?schoolID=${schoolID}&userID=${userID}&userType=${userType}&pageIndex=${pageIndex}&pageSize=${pageSize}&key=${key}&orderType=${orderType}`,2);

    if (res.StatusCode === 200) {

        return res.Data;

    }

};


//获取可添加的学科信息

export const GetSubjectInfoValid_University = async ({schoolID,dispatch}) =>{

    const res = await getGetData(`/Subject/api/GetSubjectInfoValid_University?schoolID=${schoolID}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }

};


//获取学校初始化状态

export const GetSchoolInitStatus = async ({schoolID,dispatch}) =>{

    const res = await getGetData(`/SysMgr/Setting/GetSchoolInitStatus?schoolID=${schoolID}`,2);

    if (res.StatusCode===200){

        return res.Data;

    }

};








//post方法

//添加学院

export const AddCollege = async ({SchoolID,CollegeName,CollegeCode,dispatch}) =>{

    const res = await getPostData(`/SysMgr/Setting/College/AddCollege`,{

        SchoolID,CollegeName,CollegeCode

    },2);

    if (res.StatusCode===200){

        return res.ErrCode;

    }else if (res.StatusCode===400){

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'未知错误'}));

    }

};

//删除学院
export const DeleteCollege = async ({SchoolID,CollegeIDs,dispatch}) =>{

    const res = await getPostData(`/SysMgr/Setting/College/DeleteCollege`,{

        SchoolID,CollegeIDs

    },2);

    if (res.StatusCode===200){

        return res.ErrCode;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//编辑学院
export const EditCollege = async ({SchoolID,CollegeID,CollegeCode,CollegeName,dispatch}) =>{

    const res = await getPostData(`/SysMgr/Setting/College/EditCollege`,{

        SchoolID,CollegeID,CollegeCode,CollegeName

    },2);

    if (res.StatusCode===200){

        return res.ErrCode;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//设置学年学期
export const SetTermInfo = async ({SchoolID,UserID,StartDate,EndDate,TermName,dispatch}) =>{

    const res = await getPostData(`/SysMgr/Setting/SetTermInfo`,{

        SchoolID,UserID,StartDate,EndDate,TermName

    },2);

    if (res.StatusCode===200){

        return res.ErrCode;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//中小学修改学校基础信息
export const EditSchoolInfo_Middle = async ({UserID,SchoolID,SchoolName,SchoolImgUrl_Long,SchoolCode,SchoolType,SchoolSessionType,SchoolImgUrl,CountyID,dispatch}) =>{

    const res = await getPostData(`/SysMgr/Setting/EditSchoolInfo`,{

        UserID,SchoolID,SchoolName,SchoolImgUrl_Long,SchoolCode,SchoolType,SchoolSessionType,SchoolImgUrl,CountyID

    },2);

    if (res.StatusCode===200){

        return res.ErrCode;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//大学修改学校基础信息
export const EditSchoolInfo_Univ = async ({UserID,SchoolID,SchoolImgUrl_Long,SchoolName,SchoolCode,SchoolType='',SchoolLevel,SchoolSessionType,SchoolImgUrl,SchoolTel='',SchoolLinkman='',CountyID,dispatch}) =>{

    const res = await getPostData(`/SysMgr/Setting/EditSchoolInfo_Univ`,{

        UserID,SchoolID,SchoolImgUrl_Long,SchoolName,SchoolCode,SchoolType,SchoolSessionType,SchoolImgUrl,SchoolTel,SchoolLinkman,CountyID,SchoolLevel

    },2);

    if (res.StatusCode===200){

        return res.ErrCode;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'未知错误'}));

    }

};


//添加学校基础信息
export const AddSchoolInfo = async ({SchoolLevel,UserID,SchoolID='',SchoolName,SchoolImgUrl_Long,SchoolCode,SchoolType,SchoolSessionType,SchoolImgUrl,SchoolTel='',SchoolLinkman='',CountyID,dispatch}) =>{

    const res = await getPostData(`/SysMgr/Setting/AddSchoolInfo`,{

        SchoolLevel,UserID,SchoolID,SchoolName,SchoolImgUrl_Long,SchoolCode,SchoolType,SchoolSessionType,SchoolImgUrl,SchoolTel,SchoolLinkman,CountyID

    },2);

    if (res.StatusCode===200){

        return res.Data;

    }else{

        dispatch(btnErrorAlertShow({title:res.Msg?res.Msg:'创建学校失败'}));

    }

};


//添加学校基础信息
export const UpdateSchoolInitStatus = async ({SchoolId='',dispatch}) =>{

    const res = await getPostData(`/SysMgr/Setting/UpdateSchoolInitStatus`,{

        SchoolId

    },2);

    if (res.StatusCode===200){

        return res.Data;

    }

};




export const uploadSchoolLogo = async (file,userId,dispatch)=>{

    const { ResHttpRootUrl } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

    const token = sessionStorage.getItem("token");

    const formData = new FormData();

    formData.append("token",token);

    formData.append("file",file);

    try {

        let fetchAsync = '';

        try {

            fetchAsync = await fetch(`${ResHttpRootUrl}SubjectRes_UploadHandler.ashx?method=doUpload_WholeFile&userid=${userId}`,{method :"POST",body: formData});

        }catch (e) {

            dispatch(btnErrorAlertShow({title:'图片上传出错'}));

        }

        const res = await fetchAsync.json();

        if (res.result!=='true'){

            dispatch(btnErrorAlertShow({title:res.message?res.message:'上传图片出错'}));

        }else{

           return res.filePath;

        }


    }catch (e) {

        dispatch(btnErrorAlertShow({title:'图片上传出错'}));

    }

};

