import {getData,postData} from "../../../common/js/fetch";

import config from '../../../common/js/config';

//import config from './config';


//获取数据以及封装数据格式
export const getGetData =  async (url,level,api=config.UserPersonaProxy,mode='cors',arr=false) =>{

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
export const getPostData = async (url,data,level,api=config.UserPersonaProxy,content_type='urlencoded',arr=false) =>{

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


export const removeSlashUrl = (url)=>{

    const urlArr = url.split('');

    if (urlArr[urlArr.length-1]==='/'){

        return url.substr(0,urlArr.length-1);

    }else{

        return url;

    }

};

export const downLoadFile = (url)=>{

    const oldIframe = document.getElementById("down_load_iframe");

    if (oldIframe){

        document.body.removeChild(oldIframe);

    }

    const iframe = document.createElement("iframe");

    iframe.setAttribute("id","down_load_iframe");

    iframe.src = url;

    iframe.style.display = 'none';

    document.body.appendChild(iframe);

};


export const schoolCodeReg = (str) =>{

    return /^([a-zA-Z0-9]{1,24})$/.test(str.trim());

};

export const schoolNameReg = (str) =>{

    return /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/.test(str.trim());

};


//检测密码的强度

export const UserComm_PwdStrong = (pwd) =>{

    const containNumber = /[0-9]+/.test(pwd);

    const containLetters = /[a-zA-Z]+/.test(pwd);

    const containSymbol = /[`~\!@#$%\^&*\(\)_\+={}|\[\]:\";\'<>\?,.\/\\-]+/.test(pwd);

    //判断是否是强

    if (containLetters&&containNumber&&containSymbol){

        return 3

    }else if (

        (containLetters&&(!containSymbol)&&(!containNumber))||

        (containSymbol&&(!containLetters)&&(!containNumber))||

        (containNumber&&(!containLetters)&&(!containSymbol))

    ){//判断是否是弱类型

        return 1

    }else if (!containLetters&&!containNumber&&!containSymbol) {
        //是否是这样的类型
        return 0;

    }else{//是否是中等类型

        return 2;

    }

};


//密码的正则(最新)

export const UserComm_ValidatePwd = (pwd) => {

    let lengthOver8 = true;
    let lengthLess20 = true;
    let containNumber = true;
    let containLetters = true;
    let containSymbol = true;
    let isOK = true;

    let txt = '';

    lengthOver8 = pwd.length >= 8;
    lengthLess20 = pwd.length <=20;
    containNumber = /[0-9]+/.test(pwd);
    containLetters = /[a-zA-Z]+/.test(pwd);
    containSymbol = /[`~\!@#$%\^&*\(\)_\+={}|\[\]:\";\'<>\?,.\/\\-]+/.test(pwd);
    isOK = /^([0-9a-zA-Z`~\!@#$%\^&*\(\)_\+={}|\[\]:\";\'<>\?,.\/\\-]){8,20}$/.test(pwd);

    if (!lengthOver8) {
        txt += "密码长度不足8位、";
    }
    if (!lengthLess20) {
        txt += "密码长度不能超过20位、";
    }

    if ((containNumber && containLetters)
        || (containNumber && containSymbol)
        || (containLetters && containSymbol)
        || (containNumber && containLetters && containSymbol)) {
        //密码合法
    } else {
        txt += "至少包含字母、数字及特殊符号中的两种、";
    }

    if (lengthOver8 && lengthLess20 && !isOK) {
        txt += "密码包含非法字符、";
    }

    if (txt === "") {
        txt = "密码合法";
        return { isOK: true, txt: txt };
    } else {
        txt = txt.substr(0, txt.length - 1);
        return { isOK: false, txt: txt };
    }
}
