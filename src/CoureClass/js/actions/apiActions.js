import Method from "./Method";

import appAlertActions from './appAlertActions';

import config from '../../../common/js/config';


//学生的教学班信息

export const GetAllCourseClassInfoForStu = async ({UserID,UserType,dispatch}) => {

    let res = await Method.getGetData(`/GetAllCourseClassInfoForStu?UserID=${UserID}&UserType=${UserType}`,

        2,);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(appAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));


    }


};


//获取走班课程的教学班信息
export const GetCourseClassInfoBySubject = async ({SchoolID,Key='',SubjectID,UserID,dispatch}) => {

    let res = await Method.getGetData(`/GetCourseClassInfoBySubject?UserID=${UserID}&SchoolID=${SchoolID}&SubjectID=${SubjectID}&Key=${Key}`,

        2);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(appAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));


    }


};


//获取获取走班方式


export const GetCombinationForStu = async ({UserID,UserType,dispatch}) => {

    let res = await Method.getGetData(`/GetCombinationForStu?UserID=${UserID}&UserType=${UserType}`,

        2);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(appAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));


    }


};



//post

//换班

export const SureChangeClass = async ({ UserID,UserName,UserType,CourseClassID1,CourseClassID2,SubjectID,dispatch}) => {

    let res = await Method.getPostData(`/SureChangeClass`,{

        UserName,UserType,CourseClassID1,CourseClassID2,SubjectID,UserID

    },2);

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        dispatch(appAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }

};


export const SureChangeSubjectAndClass = async ({ UserID,UserName,UserType,SubjectIDs,CourseClassIDs,dispatch}) => {

    let res = await Method.getPostData(`/SureChangeSubjectAndClass`,{

        UserName,UserType,SubjectIDs,CourseClassIDs,UserID

    },2);

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        dispatch(appAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }

};


