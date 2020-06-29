import Method from "../../../schedule/js/actions/Method";

import CONFIG from "../../../common/js/config";

import AppAlertActions from "../../../schedule/js/actions/AppAlertActions";


//get方法
//获取第三方账号绑定信息

const GetBindOpenInfo = async ({UserID,dispatch}) =>{

    let res = await Method.getGetData(`/UserMgr/PersonalMgr/GetBindOpenInfo?UserID=${UserID}`,

        2,

        CONFIG.PersonalProxy);

        //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }

};


//获取资源服务器地址

const GetResHttpServerAddr = async ({dispatch}) => {

    let res = await Method.getGetData(`/Global/GetResHttpServerAddr`,2);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }


};



//post方法


//解除绑定

const DeleteOpenBinder = async ({UserID,OpenID,OpenType,dispatch}) =>{

    let res = await Method.getPostData(`/UserMgr/PersonalMgr/DeleteOpenBinder`,

        {UserID,OpenID,OpenType},

        2,

        CONFIG.PersonalProxy);

        //'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev');

    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }

};




export default {

    GetBindOpenInfo,

    DeleteOpenBinder,

    GetResHttpServerAddr

};