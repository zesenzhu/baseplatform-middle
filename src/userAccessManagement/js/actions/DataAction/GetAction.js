/*
 *                        .::::.
 *                      .::::::::.
 *                     :::::::::::
 *                  ..:::::::::::'
 *               '::::::::::::'
 *                 .::::::::::
 *            '::::::::::::::..
 *                 ..::::::::::::.
 *               ``::::::::::::::::
 *                ::::``:::::::::'        .:::.
 *               ::::'   ':::::'       .::::::::.
 *             .::::'      ::::     .:::::::'::::.
 *            .:::'       :::::  .:::::::::' ':::::.
 *           .::'        :::::.:::::::::'      ':::::.
 *          .::'         ::::::::::::::'         ``::::.
 *      ...:::           ::::::::::::'              ``::.
 *     ````':.          ':::::::::'                  ::::..
 *                        '.:::::'                    ':'````..
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-09-17 10:35:48
 * @LastEditTime: 2020-09-18 08:40:48
 * @Description: 模块接口的get的action
 * @FilePath: \baseplatform-middle\src\userAccessManagement\js\actions\DataAction\GetAction.js
 */

// import { postData, getData } from "../../../../common/js/fetch";
import PublicAction from "../PublicAction";
import HandleAction from "../HandleAction";
import CONFIG from "../../../../common/js/config";
import { postData, getData } from "../util";
const { BasicProxy, UserInfoProxy, UserAccessProxy } = CONFIG;
/**
 * @description:
 * @param {fn:回调函数，数据回来后}
 * @return {type}
 */
// 获取用户身份类型列表
const GET_INDENTITY_TYPE_LIST = "GET_INDENTITY_TYPE_LIST";
// 获取用户身份类型列表
const GetIdentityTypeList = ({ fn = () => {}, schoolID }) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.ContentLoadingOpen());

    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = State;
    if (schoolID === undefined) {
      schoolID = SchoolID;
    }
    let url = UserAccessProxy + "GetIdentityTypeList";
    getData({
      url,
      params: { SchoolID: schoolID },
    }).then(({ res }) => {
      if (res) {
        //     "IdentityID": 0,            //身份类型ID（学校ID+身份类型Code）
        //   "IdentityCode": "IC-000",    //身份类型Code
        //   "IdentityName": "系统管理员",    //身份类型名称
        //   "Description": "系统超级管理员",    //身份描述信息
        //   "IdentityLevel": 1, //1：表示不允许任何操作（如系统超管），
        //                         //2：表示仅允许编辑权限（如院系管理员、任课教师）
        //                       //3：表示允许编辑权限、编辑成员（如教务管理员）
        //                       //4：表示自定义身份
        //   "UserType_View": "管理员",        //账号类型（文本类型，用于显示）
        //   "UserType": "0",                    //账号类型（原始数据）
        //   "IconUrl": "xxxx.jpg",            //身份图标（绝对地址）
        //   "ModuleNames":"最高权限",            //身份权限模块名称串
        //   "ModuleIDs":"xxx,xxx",            //模块权限ID串，英文逗号分隔
        //   "UserCount":1,                    //成员人数
        dispatch({
          type: GET_INDENTITY_TYPE_LIST,
          data: res.Data.map((child, index) => {
            child.key = index;
            return child;
          }),
        });
      } else {
        dispatch({
          type: GET_INDENTITY_TYPE_LIST,
          data: res,
        });
      }
      fn({ Data: getState(), res });
      dispatch(PublicAction.ContentLoadingClose());
    });
  };
};

export default { GetIdentityTypeList, GET_INDENTITY_TYPE_LIST };
