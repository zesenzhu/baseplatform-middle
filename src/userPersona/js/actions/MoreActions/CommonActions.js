import { postData, getData } from "../../../../common/js/fetch";

import CONFIG from "../../../../common/js/config";
import "whatwg-fetch";
import { MainActions } from "../index";
import Public from "../../../../common/js/public";

const {} = CONFIG;
// 查询我的班级德育信息参数
const COMMON_SET_CLASS_MORAL_EDU_INFO_BY_CRITERIAS_PARAMS =
  "COMMON_SET_CLASS_MORAL_EDU_INFO_BY_CRITERIAS_PARAMS";
const SetClassMoralEduInfoByCriteriasParams = (data) => {
  return (dispatch) => {
    dispatch({
      type: COMMON_SET_CLASS_MORAL_EDU_INFO_BY_CRITERIAS_PARAMS,
      data: data,
    });
  };
};
const CommonActions = {
  COMMON_SET_CLASS_MORAL_EDU_INFO_BY_CRITERIAS_PARAMS,
  SetClassMoralEduInfoByCriteriasParams,
};
export default CommonActions;
