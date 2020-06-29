import {getData,postData} from "../../../common/js/fetch";

import CONFIG from '../../../common/js/config';

const api = CONFIG.PersonalProxy;


//获取数据以及封装数据格式
const getGetData =  async (url,level,api,mode='cors',arr=[401,403]) =>{
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
const getPostData = async (url,data,level,api,content_type='urlencoded',arr=[401,403]) =>{

    try {
        let fetchAsync = '';
        try {
            /*fetchAsync = await postData(CONFIG.proxy+url,data,level);*/
            fetchAsync = await postData(api+url,data,level,content_type,false,arr);

        }
        catch (e) {

            return  e;

        }


        let json = fetchAsync.json();


        return  json;

    }

    catch (e) {

        return e;

    }

};

/*const getPostData = (url,data,level) => {

    return new Promise((resolve,reject)=>{

        let mode = 'no-cors';

        postData(api+url,data,level).then(res=>{ console.log(res);}).then(json=>{

           if (json.Status === 200){

                resolve(json);

           }

        });


    });

};*/

export default {

    getPostData,

    getGetData

}