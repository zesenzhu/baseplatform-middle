import {getData,postData} from "../../../common/js/fetch";

import CONFIG from '../../../common/js/config';

const Api = CONFIG.AdmClassProxy;

//获取数据以及封装数据格式
const getGetData =  async (url,level,api=Api,mode='cors',arr=[401,403]) =>{

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
const getPostData = async (url,data,level,api=Api,content_type='urlencoded',arr=[401,403]) =>{

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