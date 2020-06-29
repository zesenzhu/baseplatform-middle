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

export default {

    GetTeacherDeskTop,

    GetBaseInfoForPages,

    GetStudentDeskTop

}