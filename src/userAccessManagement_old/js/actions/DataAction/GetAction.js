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
 * @LastEditTime: 2020-09-28 09:42:00
 * @Description: 模块接口的get的action
 * @FilePath: \baseplatform-middle\src\userAccessManagement\js\actions\DataAction\GetAction.js
 */

// import { postData, getData } from "../../../../common/js/fetch";
import PublicAction from "../PublicAction";
import HandleAction from "../HandleAction";
import CONFIG from "../../../../common/js/config";
import { postData, getData } from "../util";
const {
  BasicProxy,
  UserInfoProxy,
  SelectObjectProxy,
  UserAccessProxy,
  UserAccountProxy,
} = CONFIG;
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
          data: res.Data instanceof Array?res.Data.map((child, index) => {
            child.key = index;
            return child;
          }):[],
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
// 获取环境、家长配置
const GET_CONFIG = "GET_CONFIG";
// 获取产品使用环境及家长功能配置 （大学、中小学通用）
const GetConfig = ({ fn = () => {}, schoolID }) => {
  return (dispatch, getState) => {
    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID },
      },
    } = State;
    if (schoolID === undefined) {
      schoolID = SchoolID;
    }
    let url = UserAccountProxy + "/GetConfig";
    getData({
      url,
      params: { SchoolID: schoolID },
    }).then(({ res }) => {
      let Data = {};
      if (res) {
        Data = res.Data;
        dispatch({
          type: GET_CONFIG,
          data: res.Data,
        });
      } else {
        Data = {
          ProductUseRange: -1, //1专业院校；2综合大学；3单个中小学；4多个中小学
          ParentsShow: 0, //1开启家长功能，0关闭家长功能},
        };
      }
      // 项目的生命周期里就加载一次
      let {
        HandleState: {
          CommonData: { RoleList },
        },
      } = getState();
      let List = [];
      if (Data.ParentsShow === 0) {
        RoleList = RoleList.forEach((child) => {
          if (child.value !== 3) {
            List.push(child);
          }
        });
      } else {
        List = RoleList;
      }
      dispatch(HandleAction.SetRoleListParams(List));
      dispatch({
        type: GET_CONFIG,
        data: Data,
      });
      fn({ Data: getState(), res });
    });
  };
};

// 获取用户身份类型列表
const GET_INDENTITY_MODULE = "GET_INDENTITY_MODULE";
// 获取用户身份类型列表
const GetIdentityModule = ({ fn = () => {}, identityID }) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.MoreLoadingOpen());

    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID },
      },
      HandleState: {
        ParamsData: {
          IdentityPower: { IdentityID },
        },
      },
    } = State;
    if (identityID === undefined) {
      identityID = IdentityID;
    }
    let url = UserAccessProxy + "GetIdentityModule";
    getData({
      url,
      params: { IdentityID: identityID },
    }).then(({ res }) => {
      if (res) {
        //   "Data": {
        //     "ModuleIDs":"D401,D403",                //拥有权限的模块ID串
        //     "ModuleGroupList":[{
        //         "ModuleGroupID":"S001",                //分组ID
        //         "ModuleGroupName":"教学管理",        //分组名称
        //         "ModuleTotalCount": 2 ,                    //子模块数量
        //         "ModuleList":[{
        //             "ModuleID": "D401",            //模块ID
        //             "ModuleName": "智能排课",        //模块名称
        //             },
        //             "ModuleID": "D4012",            //模块ID
        //             "ModuleName": "智能排课",        //模块名称
        //         }]
        //     }]
        // }
        let { ModuleIDs, ModuleGroupList } = res.Data
          ? res.Data
          : { ModuleIDs: "", ModuleGroupList: [] };
        if (typeof ModuleIDs === "string") {
          dispatch(
            HandleAction.ParamsSetIdentityPower({
              ModuleIDs: ModuleIDs.split(","),
            })
          );
        }
        dispatch({
          type: GET_INDENTITY_MODULE,
          data:
            ModuleGroupList instanceof Array
              ? ModuleGroupList.map((child, index) => {
                  child.key = index;
                  return child;
                })
              : false,
        });
      } else {
        dispatch({
          type: GET_INDENTITY_MODULE,
          data: res,
        });
      }
      fn({ Data: getState(), res });
      dispatch(PublicAction.MoreLoadingClose());
    });
  };
};
// 获取用户身份类型列表
const GET_INDENTITY_USER = "GET_INDENTITY_USER";
// 获取用户身份类型列表
const GetIdentityUser = ({ fn = () => {}, identityID }) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.MoreLoadingOpen());

    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID },
      },
      HandleState: {
        ParamsData: {
          CheckMember: { IdentityID, IdentityCode, PageIndex, PageSize },
        },
      },
    } = State;
    if (identityID === undefined) {
      identityID = IdentityID;
    }
    let url = UserAccessProxy + "GetIdentityUser";
    getData({
      url,
      params: { IdentityID: identityID, IdentityCode, PageIndex, PageSize },
    }).then(({ res }) => {
      let Data = res;
      if (res) {
        //   "Data": {
        //     "PageIndex":6,
        //   "Total":6,
        //   "List":[{
        //   "UserID": "T001",
        //   "UserName": "张老师",
        //   "UserType": 1,                //用户类型
        //   "Content":[
        //         "语文>高中一年级>高一1班",
        //         "语文>高中一年级>高一2班"
        //   ]
        // }]
        // }
        Data = res.Data;
      }
      dispatch({
        type: GET_INDENTITY_USER,
        data: Data,
      });
      fn({ Data: getState(), res });
      dispatch(PublicAction.MoreLoadingClose());
    });
  };
};

// 获取选择对象结构树
const GET_TREE = "GET_TREE";
// 获取选择对象结构树
const GetTree = ({ fn = () => {}, SelectRole }) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.MoreLoadingOpen());

    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID },
      },
      HandleState: {
        ParamsData: {
          AddMember: { SelectRole:selectRole },
        },
        CommonData: { RoleList },
      },
    } = State;
    if (SelectRole === undefined) {
      SelectRole = selectRole;
    }
    let url = SelectObjectProxy + "GetTree";
    getData({
      url,
      params: {
        SchoolID,
        userType: SelectRole,
        //  RoleList.find(child=>child.value===parseInt(SelectRole)).code
      },
    }).then(({ res }) => {
      let Data = res;
      if (res) {
        //   "Data": {
        // "NodeType": 2,    //节点类型，0管理员，1教师，2学生，3家长
        // "NodeLevel": "grade",    //节点等级，标识班级、年级、学科等
        // "NodeID": "1C6C29F3-A31D-4B7A-BA48-A6D9379C0427",    //节点ID，可以是班级ID，年级ID，学科ID等
        // "ParentID": "",    //父节点ID
        // "NodeName": "高中一年级",    //节点名称
        // "UserCount": 6,            //人数
        // "FullID": "1C6C29F3-A31D-4B7A-BA48-A6D9379C0427",    //节点全ID
        // "FullName": "高中一年级",    //节点全名称
        // "MajorID": null,
        // "LastTreeNode": false,    //是否是最后一层树节点
        // "Children": [ ]           //下级节点
        Data =
          res.Data instanceof Array
            ? res.Data.map((child) => {
                return { ...child, nodeType: "tree" };
              })
            : [];
      }
      dispatch(
        HandleAction.ParamsSetAddMember({ List: Data, NodeType: "tree" })
      );
      dispatch({
        type: GET_TREE,
        data: Data,
      });
      fn({ Data: getState(), res });
      dispatch(PublicAction.MoreLoadingClose());
    });
  };
};

// 获取选择对象用户
const GET_USER = "GET_USER";
// 获取选择对象用户
const GetUser = ({ fn = () => {}, SelectRole, NodeID }) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.MoreLoadingOpen());

    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID },
      },
      HandleState: {
        ParamsData: {
          AddMember: { SelectRole: selectRole, NodeID: nodeID },
        },
        CommonData: { RoleList },
      },
    } = State;
    if (SelectRole === undefined) {
      SelectRole = selectRole;
    }
    if (NodeID === undefined) {
      NodeID = nodeID;
    }
    let url = SelectObjectProxy + "GetUser";
    getData({
      url,
      params: {
        SchoolID,
        userType: SelectRole,
        // RoleList.find(child=>child.value===parseInt(SelectRole)).code
        nodeID: NodeID,
      },
    }).then(({ res }) => {
      let Data = res;
      if (res) {
        //   "Data": {
        // "NodeType": 2,    //节点类型，0管理员，1教师，2学生，3家长
        // "NodeLevel": "grade",    //节点等级，标识班级、年级、学科等
        // "NodeID": "1C6C29F3-A31D-4B7A-BA48-A6D9379C0427",    //节点ID，可以是班级ID，年级ID，学科ID等
        // "ParentID": "",    //父节点ID
        // "NodeName": "高中一年级",    //节点名称
        // "UserCount": 6,            //人数
        // "FullID": "1C6C29F3-A31D-4B7A-BA48-A6D9379C0427",    //节点全ID
        // "FullName": "高中一年级",    //节点全名称
        // "MajorID": null,
        // "LastTreeNode": false,    //是否是最后一层树节点
        // "Children": [ ]           //下级节点
        Data =
          res.Data instanceof Array
            ? res.Data.map((child) => {
                return { ...child, nodeType: "user" };
              })
            : [];
      }
      dispatch(
        HandleAction.ParamsSetAddMember({ List: Data, NodeType: "user" })
      );

      dispatch({
        type: GET_USER,
        data: Data,
      });
      fn({ Data: getState(), res });
      dispatch(PublicAction.MoreLoadingClose());
    });
  };
};

// 获取选择对象用户
const SEARCH_IDENTITY_USER = "SEARCH_IDENTITY_USER";
// 获取选择对象用户
const SearchIdentityUser = ({ fn = () => {}, identityID }) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.ModalLoadingOpen());

    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID },
      },
      HandleState: {
        ParamsData: {
          SearchIdentity: { KeyWord, PageIndex, PageSize },
        },
        CommonData: { RoleList },
      },
    } = State;

    let url = UserAccessProxy + "SearchIdentityUser";
    getData({
      url,
      params: {
        KeyWord,
        PageIndex,
        // RoleList.find(child=>child.value===parseInt(SelectRole)).code
        PageSize,
      },
    }).then(({ res }) => {
      let Data = res;
      if (res) {
        //   "Data": "PageIndex":10,
        // "Total":""
        // "List":[{
        //   "UserID":"t001",
        //   "UserName":"张老师",
        //   "UserType":1,
        //   "IdentityNames":"安防管理员,广播管理员,宿舍管理员",
        //   "IdentityIDs":"001,002,003",
        //   "IdentityList":[{                    //可分配身份列表
        //       "IdentityID":"001",                //身份ID
        //       "IdentityName":"安防管理员",        //身份名称
        //   }]
        // }]
        Data = res.Data
          ? {
              PageIndex: res.Data.PageIndex,
              Total: res.Data.Total,
              List: res.Data.List.map((child, index) => {
                child.key = index;
                return child;
              }),
            }
          : {
              PageIndex,
              Total: 0,
              List: [],
            };
      }

      dispatch({
        type: SEARCH_IDENTITY_USER,
        data: Data,
      });
      fn({ Data: getState(), res });
      dispatch(PublicAction.ModalLoadingClose());
    });
  };
};
// 获取可分配身份权限
const GET_IDENTITY_TYPE_FOR_ACCREDIT = "GET_IDENTITY_TYPE_FOR_ACCREDIT";
// 获取可分配身份权限
const GetIdentityTypeForAccredit = ({ userID, fn = () => {}, identityID }) => {
  return (dispatch, getState) => {
    dispatch(PublicAction.MoreLoadingOpen());

    let State = getState();
    let {
      PublicState: {
        LoginMsg: { SchoolID },
      },
      HandleState: {
        ParamsData: {
          SearchIdentity: { UserID, KeyWord, PageIndex, PageSize },
        },
        CommonData: { RoleList },
      },
    } = State;
    if (userID === undefined) {
      userID = UserID;
    }
    let url = UserAccessProxy + "GetIdentityTypeForAccredit";
    getData({
      url,
      params: {
        userID,
        SchoolID,
      },
    }).then(({ res }) => {
      let Data = res;
      if (res) {
        //   "Data": "PageIndex":10,
        // "Total":""
        // "List":[{
        //   "UserID":"t001",
        //   "UserName":"张老师",
        //   "UserType":1,
        //   "IdentityNames":"安防管理员,广播管理员,宿舍管理员",
        //   "IdentityIDs":"001,002,003",
        //   "IdentityList":[{                    //可分配身份列表
        //       "IdentityID":"001",                //身份ID
        //       "IdentityName":"安防管理员",        //身份名称
        //   }]
        // }]
        Data = res.Data instanceof Array ? res.Data : [];
      }

      dispatch({
        type: GET_IDENTITY_TYPE_FOR_ACCREDIT,
        data: Data,
      });
      fn({ Data: getState(), res });
      dispatch(PublicAction.MoreLoadingClose());
    });
  };
};
export default {
  GetIdentityTypeForAccredit,
  GET_IDENTITY_TYPE_FOR_ACCREDIT,

  SearchIdentityUser,
  SEARCH_IDENTITY_USER,

  GET_USER,
  GetUser,

  GET_TREE,
  GetTree,

  GetIdentityUser,
  GET_INDENTITY_USER,

  GET_INDENTITY_MODULE,
  GetIdentityModule,

  GetConfig,
  GET_CONFIG,

  GetIdentityTypeList,
  GET_INDENTITY_TYPE_LIST,
};
