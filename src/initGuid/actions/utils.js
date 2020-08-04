import {getData,postData} from "../../common/js/fetch";

import config from './config';


//获取数据以及封装数据格式
const getGetData =  async (url,level,api=config.BaseProxy,mode='cors',arr=false) =>{

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
const getPostData = async (url,data,level,api=config.BaseProxy,content_type='urlencoded',arr=false) =>{

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


export {

    getPostData,

    getGetData

}