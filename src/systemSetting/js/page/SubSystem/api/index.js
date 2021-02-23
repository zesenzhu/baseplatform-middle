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
const { SubSystemProxy, AccessProxy_univ, ImgUrlProxy } = CONFIG;
//操作常量
/**
 * @description: 获取所有应用（子系统）列表  http://192.168.129.1:8033/showdoc/web/#/11?page_id=2266
 * @param {*} payload
 * @return {*}
 */
export function GetAllSubSystem(payload = {}) {
  let { sysState, userType, sysType, key, pageIndex, pageSize } = payload;
  let url =
    SubSystemProxy +
    `/GetAllSubSystem?${sysState ? "sysState=" + sysState : ""}${
      userType ? "&userType=" + userType : ""
    }${sysType ? "&sysType=" + sysType : ""}${key ? "&key=" + key : ""}${
      pageIndex ? "&pageIndex=" + pageIndex : ""
    }${pageSize ? "&pageSize=" + pageSize : ""}`;

  return get(url, 2)
    .then((json) => {
      if (json.StatusCode === 200) {
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
// 获取可添加的应用（子系统）列表 http://192.168.129.1:8033/showdoc/web/#/11?page_id=2268
export function GetSubSystemToAdd(payload = {}) {
  let { pageIndex, pageSize } = payload;
  let url =
    SubSystemProxy +
    `/GetSubSystemToAdd?${pageIndex ? "pageIndex=" + pageIndex : ""}${
      pageSize ? "&pageSize=" + pageSize : ""
    }`;

  return get(url, 2)
    .then((json) => {
      if (json.StatusCode === 200) {
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

// 更改应用（子系统）可访问状态 http://192.168.129.1:8033/showdoc/web/#/11?page_id=2272
export function ToggleAccessState(payload = {}) {
  // let {  sysID, accessible } = payload;
  let url = SubSystemProxy + `/ToggleAccessState`;

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
// 更改应用（子系统）可访问状态 http://192.168.129.1:8033/showdoc/web/#/11?page_id=2272
export function GetClientidAndKey(payload = {}) {
  let { sysName } = payload;
  let url =
    SubSystemProxy +
    `/GetSubSystemIDAndSecretKey?${sysName ? "sysName=" + sysName : ""}`;

  return get(url, 2)
    .then((json) => {
      if (json.StatusCode === 200 && json.Data) {
        let { SysID, SysSecretKey } = json.Data;
        return {
          StatusCode: json.StatusCode,
          Data: { sysID: SysID, sysSecretKey: SysSecretKey },
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

// 添加已有应用（子系统）到学校 http://192.168.129.1:8033/showdoc/web/#/11?page_id=2269
export function AddSubSystemToSchool(payload = {}) {
  // let {  sysIDs  } = payload;
  let url = SubSystemProxy + `/AddSubSystemToSchool`;

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

// 录入新应用（子系统）信息 http://192.168.129.1:8033/showdoc/web/#/11?page_id=2267
export function AddSubSystemInfo(payload = {}) {
  // let {  sysIDs  } = payload;
  let url = SubSystemProxy + `/AddSubSystemInfo`;

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

// 录入新应用（子系统）信息 http://192.168.129.1:8033/showdoc/web/#/11?page_id=2267
export function DeleteSubSystemFromSchool(payload = {}) {
  // let {  sysIDs  } = payload;
  let url = SubSystemProxy + `/DeleteSubSystemFromSchool`;

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
// 查看应用（子系统）详情（  http://192.168.129.1:8033/showdoc/web/#/11?page_id=2271
export function GetSubSystemDetail(payload = {}) {
  let { sysID } = payload;
  let url =
    SubSystemProxy + `/GetSubSystemDetail?${sysID ? "sysID=" + sysID : ""}`;

  return get(url, 2)
    .then((json) => {
      if (json.StatusCode === 200&&json.Data) {
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
// 录入新应用（子系统）信息 http://192.168.129.1:8033/showdoc/web/#/11?page_id=2270
export function EditSubSystemInfo(payload = {}) {
  // let {  sysIDs  } = payload;
  let url = SubSystemProxy + `/EditSubSystemInfo`;

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