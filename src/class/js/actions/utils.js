//搜索正则
import AppAlertActions from "./AppAlertActions";

const SearchReg = ({key,type,dispatch,ErrorTips}) => {

    let pattern = '';

    if (type===1){

        pattern =  /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/

    }else{

        pattern =  /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/

    }

    if (pattern.test(key)){

        return true;

    }else{

        dispatch(AppAlertActions.alertWarn({title:ErrorTips}));

        return false;

    }


};

export default {

    SearchReg

}