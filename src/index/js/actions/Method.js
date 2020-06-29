import {getData,postData} from "../../../common/js/fetch";

import CONFIG from '../../../common/js/config';

const Api = CONFIG.DeskTopProxy;

//获取数据以及封装数据格式
const getGetData =  async (url,level,api=Api,mode='cors',arr=false) =>{

    try {

        let fetchAsync = '';

        try {

            fetchAsync = await getData(api+url,level,mode,true,arr);

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
const getPostData = async (url,data,level,api=Api,content_type='urlencoded',arr=false) =>{

    try {
        let fetchAsync = '';

        try {

            fetchAsync = await postData(api+url,data,level,content_type,true,arr);

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