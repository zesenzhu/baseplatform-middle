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



//获取全部的年级和学科信息
export const GetAllSubjectAndGradeInfo_Middle = async ({schoolID='',dispatch}) => {

    let res = await Method.getGetData(`/GetAllSubjectAndGradeInfo_Middle?schoolID=${schoolID}`,

        2,config.CourseClassProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(appAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));


    }


};


//获取年级教学班统计信息
export const GetGradeCouseclassSumarry_Middle = async ({schoolID='',userID='',userType='',dispatch}) => {

    let res = await Method.getGetData(`/GetGradeCouseclassSumarry_Middle?schoolID=${schoolID}&userID=${userID}&userType=${userType}`,

        2,config.CourseClassProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(appAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));


    }


};


//年级学科教学班统计信息
export const GetGradeSubjectCouseclassSumarry_Middle = async ({schoolID='',userID='',userType='',gradeID='',dispatch}) => {

    let res = await Method.getGetData(`/GetGradeSubjectCouseclassSumarry_Middle?schoolID=${schoolID}&userID=${userID}&userType=${userType}&gradeID=${gradeID}`,

        2,config.CourseClassProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(appAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));


    }


};


//获取学科教学班统计信息
export const GetSubjectCouseclassSumarry_Middle = async ({schoolID='',userID='',userType='',dispatch}) => {

    let res = await Method.getGetData(`/GetGradeSubjectCouseclassSumarry_Middle?schoolID=${schoolID}&userID=${userID}&userType=${userType}`,

        2,config.CourseClassProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(appAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));


    }


};



//获取学科教师教学班统计信息
export const GetSubjectTeacherCouseclassSumarry_Middle = async ({schoolID='',userID='',userType='',subjectID='',dispatch}) => {

    let res = await Method.getGetData(`/GetSubjectTeacherCouseclassSumarry_Middle?schoolID=${schoolID}&userID=${userID}&userType=${userType}&subjectID=${subjectID}`,

        2,config.CourseClassProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(appAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));


    }


};


//分页获取学科任课教师信息及其教学班统计信息
export const GetSubjectTeacherForPage_Middle = async ({schoolID='',userID='',userType='',subjectID='',pageIndex=1,pageSize=9,dispatch}) => {

    let res = await Method.getGetData(`/GetSubjectTeacherForPage_Middle?schoolID=${schoolID}&userID=${userID}&userType=${userType}&subjectID=${subjectID}&pageIndex=${pageIndex}&pageSize=${pageSize}`,

        2,config.CourseClassProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(appAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));


    }


};


//分页获取教学班信息
export const GetCourseClassInfoForPage_Middle = async ({schoolID='',userID='',userType='',subjectID='',gradeID='',classType=2,key='',pageIndex=1,pageSize=10,dispatch}) => {

    let res = await Method.getGetData(`/GetCourseClassInfoForPage_Middle?schoolID=${schoolID}&userID=${userID}&userType=${userType}&subjectID=${subjectID}&gradeID=${gradeID}&classType=${classType}&key=${key}&pageIndex=${pageIndex}&pageSize=${pageSize}`,

        2,config.CourseClassProxy);

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

//删除教学班
export const DeleteCourseClass = async ({ schoolID='',userID='',userType='',courseClassIDs='',dispatch}) => {

    let res = await Method.getPostData(`/DeleteCourseClass`,{

        schoolID,userID,userType,courseClassIDs

    },2,config.CourseClassProxy);

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        dispatch(appAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }

};
