import { postData, getData } from "../../../../../common/js/fetch";
import CONFIG from "../../../../../common/js/config";
import Public from "../../../../../common/js/public";
function get() {
  return new Promise((resolve, reject) => {
    // arguments
    let data = [...arguments];
    data[1] || data.push(2);

    try {
      getData(...data)
        .then((res) => res.json())
        .then((json) => {
          resolve(json);
        });
    } catch (e) {
      console.error(e);
      reject({
        StatusCode: 501,
        Data: false,
        Msg: "请求出现错误",
      });
    }
  });
}
function post() {
  return new Promise((resolve, reject) => {
    // arguments

    let data = [...arguments];

    data[2] || data.push(2);
    data[3] || data.push("json");
    console.log(data);
    try {
      postData(...data)
        .then((res) => res.json())
        .then((json) => {
          resolve(json);
        });
    } catch (e) {
      console.error(e);
      reject({
        StatusCode: 501,
        Data: false,
        Msg: "请求出现错误",
      });
    }
  });
}
const { SubSystemProxy,ModuleProxy, AccessProxy_univ, ImgUrlProxy } = CONFIG;
//操作常量
/**
 * @description: 获取所有应用模块列表  http://192.168.129.1:8033/showdoc/web/#/11?page_id=2274
 * @param {*} payload
 * @return {*}
 */
export function GetAllModule(payload = {}) {
  let { groupID, userType, sysType, key, pageIndex, pageSize } = payload;
  let url =
    ModuleProxy +
    `/GetAllModule?${groupID ? "groupID=" + groupID : ""}${
      userType ? "&userType=" + userType : ""
    }${key ? "&key=" + key : ""}${pageIndex ? "&pageIndex=" + pageIndex : ""}${
      pageSize ? "&pageSize=" + pageSize : ""
    }`;

  return get(url, 2)
    .then((json) => {
      if (json.StatusCode === 200) {
        let List = json.Data.List.map((c, i) => {
          let index = json.Data.TotalCount>=pageSize*(pageIndex-1) ?pageIndex-1:Math.floor(json.Data.TotalCount/pageSize)
          let OrderNo = pageSize * index + i + 1;
          OrderNo = OrderNo>=10?OrderNo:'0'+OrderNo
          return { ...c, OrderNo ,key:i };
        });
        return {
          StatusCode: json.StatusCode,
          Data: json.Data
            ? {
                ...json.Data,
                PageSize: pageSize,
                PageIndex:
                  pageIndex * pageSize > json.Data.TotalCount
                    ? Math.ceil(json.Data.TotalCount / pageSize)
                    : pageIndex,
                List,
              }
            : {},
        };
      } else {
        return {
          StatusCode: json.StatusCode,
        };
      }
    })
    .catch((res) => {
      return res;
    });
}
 // 获取模块分组列表 http://192.168.129.1:8033/showdoc/web/#/11?page_id=2283
export function GetModuleGroupList(payload = {}) {
  let { sysName } = payload;
  let url =
    ModuleProxy +
    `/GetModuleGroupList`;

  return get(url, 2)
    .then((json) => {
      if (json.StatusCode === 200 && json.Data instanceof Array) {
        return {
          StatusCode: json.StatusCode,
          Data: json.Data,
        };
      } else {
        return {
          StatusCode: json.StatusCode,
        };
      }
    })
    .catch((res) => {
      return res;
    });
}

 // 获取已添加的第三方应用列表 http://192.168.129.1:8033/showdoc/web/#/11?page_id=2282
 export function GetThirdPartySubSystem(payload = {}) {
  let { sysName } = payload;
  let url =
  SubSystemProxy +
    `/GetThirdPartySubSystem`;

  return get(url, 2)
    .then((json) => {
      if (json.StatusCode === 200 && json.Data instanceof Array) {
        return {
          StatusCode: json.StatusCode,
          Data: json.Data,
        };
      } else {
        return {
          StatusCode: json.StatusCode,
        };
      }
    })
    .catch((res) => {
      return res;
    });
}
 
 // 获取用户身份类型列表 http://192.168.129.1:8033/showdoc/web/#/11?page_id=2284
 export function GetIdentityTypeList(payload = {}) {
  let { sysName } = payload;
  let url =
  ModuleProxy +
    `/GetIdentityTypeList`;

  return get(url, 2)
    .then((json) => {
      if (json.StatusCode === 200 && json.Data instanceof Array) {
        return {
          StatusCode: json.StatusCode,
          Data: json.Data,
        };
      } else {
        return {
          StatusCode: json.StatusCode,
        };
      }
    })
    .catch((res) => {
      return res;
    });
}
// 获取图片资源服务器地址
export function GetImgUrlProxy(payload = {}) {
  // let { sysName } = payload;
  let url = ImgUrlProxy + `/Base/GetBaseServerAddr`;

  return get(url, 2)
    .then((json) => {
      if (json.StatusCode === 200 && json.Data) {
        return {
          StatusCode: json.StatusCode,
          Data: json.Data,
        };
      } else {
        return {
          StatusCode: json.StatusCode,
        };
      }
    })
    .catch((res) => {
      return res;
    });
}
// 上传图标
export function UploadHandler(payload = {}) {
  let { userid, data, ImgUrlProxy } = payload;
  let url =
    ImgUrlProxy +
    `SubjectRes_UploadHandler.ashx?method=doUpload_WholeFile&userid=${userid}`;

  return post(url, data, 1, "file", false, false)
    .then((json) => {
      if (json && json.result === "true") {
        return {
          StatusCode: 200,
          Data: {
            ...json,
          },
        };
      } else {
        return {
          StatusCode: 400,
          Data: false,
        };
      }
    })
    .catch((res) => {
      return res;
    });
}

 

// 添加第三方模块 http://192.168.129.1:8033/showdoc/web/#/11?page_id=2275
export function AddModule(payload = {}) {
  // let {  sysIDs  } = payload;
  let url = ModuleProxy + `/AddModule`;

  return post(url, { ...payload }, 2)
    .then((json) => {
      if (json.StatusCode === 200) {
        return {
          StatusCode: json.StatusCode,
          Data: json.Data,
        };
      } else {
        return {
          StatusCode: json.StatusCode,
          Data: false,
        };
      }
    })
    .catch((res) => {
      return res;
    });
}
// 修改模块信息 http://192.168.129.1:8033/showdoc/web/#/11?page_id=2276
export function EditModuleInfo(payload = {}) {
  // let {  sysIDs  } = payload;
  let url = ModuleProxy + `/EditModule`;

  return post(url, { ...payload }, 2)
    .then((json) => {
      if (json.StatusCode === 200) {
        return {
          StatusCode: json.StatusCode,
          Data: json.Data,
        };
      } else {
        return {
          StatusCode: json.StatusCode,
          Data: false,
        };
      }
    })
    .catch((res) => {
      return res;
    });
}


// 删除第三方模块 http://192.168.129.1:8033/showdoc/web/#/11?page_id=2277
export function DeleteModule(payload = {}) {
  // let {  sysIDs  } = payload;
  let url = ModuleProxy + `/DeleteModule`;

  return post(url, { ...payload }, 2)
    .then((json) => {
      if (json.StatusCode === 200) {
        return {
          StatusCode: json.StatusCode,
          Data: json.Data,
        };
      } else {
        return {
          StatusCode: json.StatusCode,
          Data: false,
        };
      }
    })
    .catch((res) => {
      return res;
    });
}
 