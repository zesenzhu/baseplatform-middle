import {getData,postData} from "../../common/js/fetch";

import config from './config';

//获取数据以及封装数据格式
export const getGetData =  async (url,level,api=config.BaseProxy,mode='cors',arr=false) =>{

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
export const getPostData = async (url,data,level,api=config.BaseProxy,content_type='urlencoded',arr=false) =>{

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
