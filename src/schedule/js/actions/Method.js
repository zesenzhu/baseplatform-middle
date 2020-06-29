import {getData,postData} from "../../../common/js/fetch";

import CONFIG from '../../../common/js/config';

const API = CONFIG.ScheduleProxy;

//获取数据以及封装数据格式
const getGetData =  async (url,level,api=API,mode='cors',arr=false) =>{
    try {
        let fetchAsync = '';
        try {
            /*fetchAsync = await getData(CONFIG.proxy+url);*/

            fetchAsync = await getData(api+url,level,mode,false,arr);
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
//调用post接口
const getPostData = async (url,data,level,api=API,content_type='json',arr=false) =>{

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

export default {

    getPostData,

    getGetData

}