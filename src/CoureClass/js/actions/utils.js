import {getData,postData} from "../../../common/js/fetch";

import CONFIG from '../../../common/js/config';

import upUIState from './UpUIState';

const Api = CONFIG.CourseClassProxy;

//获取数据以及封装数据格式
export const getGetData =  async (url,level,api=Api,mode='cors',arr=[500,401,403]) =>{

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
export const getPostData = async (url,data,level,api=Api,content_type='json',arr=[500,401,403]) =>{

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


export const showErrorAlert = ({title,littleTitle,ok,cancel,close,okShow,cancelShow,okTitle,cancelTitle}) => {

    return dispatch=>{

        dispatch({

            type:upUIState.SHOW_ERROR_ALERT,

            msg:{

                type:'btn-error',

                title,

                littleTitle,

                ok:ok?ok:hideAlert(dispatch),

                cancel:cancel?cancel:hideAlert(dispatch),

                close:close?close:hideAlert(dispatch),

                okTitle,

                cancelTitle

            }

        })

    }

};

export const showWarnAlert = ({title,littleTitle,ok,cancel,close,okShow,cancelShow,okTitle,cancelTitle}) => {

    return dispatch=>{

        dispatch({

            type:upUIState.SHOW_ERROR_ALERT,

            msg:{

                type:'btn-warn',

                title,

                littleTitle,

                ok:ok?ok:hideAlert(dispatch),

                cancel:cancel?cancel:hideAlert(dispatch),

                close:close?close:hideAlert(dispatch),

                okTitle,

                cancelTitle

            }

        })

    }

};

export const showSuccessAlert = ({title,hide}) => {

    return dispatch=>{

        dispatch({

            type:upUIState.SHOW_ERROR_ALERT,

            msg:{

                type:'success',

                title,

                onHide:hide?hide:hideAlert(dispatch)

            }

        })

    }

};

export const showQueryAlert = ({title,littleTitle,ok,cancel,close,okShow,cancelShow,okTitle,cancelTitle}) => {

    return dispatch=>{

        dispatch({

            type:upUIState.SHOW_ERROR_ALERT,

            msg:{

                type:'btn-query',

                title,

                littleTitle,

                ok:ok?ok:hideAlert(dispatch),

                cancel:cancel?cancel:hideAlert(dispatch),

                close:close?close:hideAlert(dispatch),

                okShow:okShow==='n'?'n':'y',

                cancelShow:cancelShow==='n'?'n':'y',

                okTitle,

                cancelTitle

            }

        })

    }

};



export const hideAlert = (dispatch) =>{

    return e=>dispatch({type:upUIState.CLOSE_ERROR_ALERT});

};


//学科名称正则
export const subNameReg = (str)=>{

    const Reg = /^[,_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{1,50}$/;

    return Reg.test(str);

};


//学科编号正则

export const subNumReg = (str) =>{

    const Reg = /^[0-9]*$/;

    return Reg.test(str);

};




//人物名称正则
export const teacherSearchReg = (str) => {

    let pattern = '';

    pattern =  /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/

    return pattern.test(str);

};
