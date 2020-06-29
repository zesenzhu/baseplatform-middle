import {getData,postData} from "../../common/js/fetch";

import {loginApi,GetScheduleInfoForAssitant} from "./index";

import {showErrorAlert} from "../store/appAlert";

import {LOGIN_USER_INFO_UPDATE,SCHEDULE_COMMON_INFO_UPDATE} from "../store";


//获取数据以及封装数据格式
const getGetData =  async (url,level,api='',mode='cors',arr=[500,403]) =>{

    try {

        let fetchAsync = '';

        try {

            fetchAsync = await getData(api+url,level,mode,false,arr);

        }
        catch (e) {

            return  e;

        }

        let json = await fetchAsync.json();

        return json;

    }
    catch (e) {

        return e;

    }
};
//调用post接口
const getPostData = async (url,data,level,api='',content_type='json',arr=[500,403]) =>{

    try {
        let fetchAsync = '';

        try {

            fetchAsync = await postData(api+url,data,level,content_type,false,arr);

        }
        catch (e) {
            return  e;
        }

        let json = await fetchAsync.json();

        return  json;

    }
    catch (e) {

        return e;

    }

};



//获取全部的URL参数

export const getQueryUrlParams = () => {

    const obj = {};

    let query =
        window.location.search.substring(1) ||
        window.location.href.split("?")[1] ||
        window.location.href;

    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {

        let pair = vars[i].split("=");

        obj[pair[0]] = pair[1];

    }

    return obj;

};


//将对象值解码后返回
export const decodeObjValue = (obj) => {

    let UserInfo = {};

    for (let [key, value] of Object.entries(obj)) {

        if (key === "PhotoPath") {

            let date = new Date();

            let time = date.getTime();

            value = value + "?T=" + time;
        }

        UserInfo[key] = decodeURIComponent(value);

    }

    UserInfo.isLogin = true;

    // console.log(JSON.stringify(UserInfo))

    return UserInfo;

};


//弹窗获取公共信息

export const modalGetNeedInfo = ({token,ScheduleID,dispatch})=>{

    loginApi({token:token,method:'TokenCheck',params:'000'}).then((res)=>{

        if (res.data.result===true){//登录成功

            loginApi({token,method:'GetUserInfo',params:'000'}).then(result=>{

                //如果成功获取到用户信息
                if (result.data&&result.error==='0'){

                    const UserInfo = decodeObjValue(result.data);

                    const { SchoolID,UserID,UserType } = UserInfo;

                    dispatch({type:LOGIN_USER_INFO_UPDATE,data:UserInfo});

                    GetScheduleInfoForAssitant({SchoolID,UserType:parseInt(UserType),UserID,ScheduleID,dispatch}).then(data=>{

                        if (data){

                            const {ItemWeek} = data;

                            const newItem = ItemWeek.map(i=>{

                                if (i.WeekNO===1){

                                    const StartWeekDay = i.StartWeekDay;

                                    let lessDate = 0;

                                    switch (StartWeekDay) {

                                        case '星期日':

                                            lessDate = 6;

                                            break;

                                        case '星期六':

                                            lessDate = 5;

                                            break;

                                        case '星期五':

                                            lessDate = 4;

                                            break;

                                        case '星期四':

                                            lessDate = 3;

                                            break;

                                        case '星期三':

                                            lessDate = 2;

                                            break;

                                        case '星期二':

                                            lessDate = 1;

                                            break;

                                        default:

                                            lessDate = 0;

                                    }

                                    const date = new Date(i.StartDate);

                                    const StartDate = getBeforeDate(date,lessDate);

                                    return {

                                        ...i,

                                        StartDate,

                                        StartWeekDay:'星期一'

                                    }

                                }else{

                                    return i;

                                }

                            });

                            data['ItemWeek'] = newItem;

                            dispatch({type:SCHEDULE_COMMON_INFO_UPDATE,data});

                        }

                    })

                }else{

                    showErrorAlert({title:'获取用户信息失败',dispatch});

                }

            },err=>{


                dispatch(show)

            });

        }else{

            postMessage('loginFailure');

        }

    },(err)=>{

        postMessage('loginFailure');

    });

};




//在某个日期之前的某天
const  getBeforeDate = (d,n) =>{

    let year = d.getFullYear();
    let mon = d.getMonth() + 1;
    let day = d.getDate();
    if(day <= n) {
        if(mon > 1) {
            mon = mon - 1;
        } else {
            year = year - 1;
            mon = 12;
        }
    }
    d.setDate(d.getDate() - n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
    return s;

};


export {

    getPostData,

    getGetData

}