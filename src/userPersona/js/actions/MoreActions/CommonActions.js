import { postData, getData } from "../../../../common/js/fetch";

import CONFIG from "../../../../common/js/config";
import "whatwg-fetch";
import MainActions from "./MainActions";
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
// 设置学生成绩参数
const COMMON_SET_STU_RESULT_PARAMS =
  "COMMON_SET_STU_RESULT_PARAMS";
const SetStuResultParams = (data) => {
  return (dispatch) => {
    dispatch({
      type: COMMON_SET_STU_RESULT_PARAMS,
      data: data,
    });
  };
};
// 设置综合素养
const COMMON_SET_STU_QUALITY_PARAMS =
  "COMMON_SET_STU_QUALITY_PARAMS";
const SetStuQualityParams = (data) => {
  return (dispatch) => {
    dispatch({
      type: COMMON_SET_STU_QUALITY_PARAMS,
      data: data,
    });
  };
};
const CommonActions = {
  COMMON_SET_STU_QUALITY_PARAMS,
  SetStuQualityParams,

  SetStuResultParams,
  COMMON_SET_STU_RESULT_PARAMS,

  COMMON_SET_CLASS_MORAL_EDU_INFO_BY_CRITERIAS_PARAMS,
  SetClassMoralEduInfoByCriteriasParams,
};
export default CommonActions;
