import "whatwg-fetch";
import "es6-promise";
import { TESTKEY } from "./SecretKey";
import {
  AESEncryptionBody,
  AESEncryptionUrl,
  requestSecure,
  ErrorAlert,
} from "./util";
import { stringify } from "querystring";
import ReactDOM from "react-dom";
import React from "react";
import { TokenCheck } from "../disconnect";
import config from "../config";
import Public from "../public";

// 参数
// url:请求服务对象
// paramsObj：请求的参数，格式为json
// SecurityLevel:请求的安全等级，分1,2,3,4四个等级
// content_type：请求的实体的数据的媒体类型，默认urlencoded格式，支持json

function postData(
  url,
  paramsObj = {},
  SecurityLevel = 1,
  content_type = "urlencoded",
  IsDesk = false,
  element = true,
  moreParams={ credentials:'omit', requestHeader: {}  }
) {
  let token = sessionStorage.getItem("token") || getQueryVariable("lg_tk");

  // if (!token && SecurityLevel !== 1) {
  //     console.log('token无效，请重新登录');//后期会进行无token的事件操作
  //     return new Promise(function (resolve, reject) {
  //         if (resolve) {
  //             resolve(stringify({ 'Status': 4001, 'Msg': "token无效，请重新登录" }));
  //         } else {
  //             reject(stringify({ 'Status': 4000, 'Msg': "错误！" }));
  //         }
  //     });
  // }
  let {   requestHeader ,credentials} = moreParams;
 
  if(requestHeader===undefined){
    requestHeader = {}
  }
  if(credentials===undefined){
    credentials = 'omit'
  }

  let ContentTypeArr = [
    "application/x-www-form-urlencoded",
    "application/json",
    "multipart/form-data",
  ];
  let ContentType = "";
  if (content_type === "urlencoded") {
    ContentType = ContentTypeArr[0];
  } else if (content_type === "json") {
    ContentType = ContentTypeArr[1];
  } else if (content_type === "file") {
    ContentType = ContentTypeArr[2];
  } else {
    // ContentType = ContentTypeArr[0];
    ContentType = content_type;
  }
  let result = fetch(url, {
    method: "post", //*post、get、put、delete，此项为请求方法相关的配置
    mode: "cors", //no-cors(跨域模式但服务器端不支持cors),*cors(跨域模式，需要服务器通过Access-control-Allow-Origin来
    //允许指定的源进行跨域),same-origin(同源)
    cache: "no-cache", //*no-cache,default,reload,force-cache,only-ifcached,此项为缓存相关配置
    credentials: credentials, //*include(携带cookie)、same-origin(cookie同源携带)、omit(不携带)

    headers: {
      Accept: "application/json, text/plain, */*", //请求头，代表的、发送端（客户端）希望接收的数据类型
      "Content-Type": ContentType, //实体头，代表发送端（客户端|服务器）发送的实体数据的数据类型
      Authorization: requestSecure(paramsObj, TESTKEY, SecurityLevel),
      ...requestHeader
    },
    redirect: "follow", //manual、*follow(自动重定向)、error，此项为重定向的相关配置
    // referrer: 'no-referrer',//该首部字段会告知服务器请求的原始资源的URI
    // 注意post时候参数的形式
    body: AESEncryptionBody(paramsObj, TESTKEY, SecurityLevel, content_type), //此处需要和headers里的"Content-Type"相对应
  });
  // .then(data => data.json()).then(json => {
  //     if (json.StatusCode === '401') {
  //         TokenCheck(IsDesk);
  //     }
  // })

  // result.then(res => {//做提前处理
  //     console.log(res)
  //     return res;
  // }, err => {

  // })
  result
    .then((res) => {
      //做提前处理
      let clone = res.clone();
      //console.log(clone.json());
      return clone;
    })
    .then((response) => {
      //当请求成功时直接返回response，失败则进行json解析返回失败信息
      // console.log(response.status)

      if (response.status === 200) {
        return response;
      } else if (response.status === 401) {
        const preUrl = encodeURIComponent(
          Public.getLg_tk(window.location.href)
        );

        window.location.href = "/html/admDisconnect?lg_preurl=" + preUrl;
      } else {
        return response.json().then((json) => {
          //   console.log(json)
          return Promise.reject(json);
        });
      }
    })
    .then(
      (res) => res.json(),
      (err) => {
        return false;
      }
    )
    .then((json) => {
      // console.log(json, json.StatusCode === 200)
      if (element !== false) {
        handleStatusCode(json, element);
      }
    });
  return result;
}
// 处理statusCode
function handleStatusCode(json, element = true) {
  let title = "";
  // return
  if (!json) {
    title = "服务器出现未知异常，请重试或联系管理员";
    ReactDOM.render(
      // eslint-disable-next-line react/react-in-jsx-scope
      <ErrorAlert
        key={"alert" + "400-" + Math.round(Math.random() * 10000)}
        show={true}
        title={title}
      />,
      document.getElementById("alert")
    );
    return;
  }

  if (json.StatusCode === undefined) {
    title = "服务器出现未知异常，请重试或联系管理员";
    ReactDOM.render(
      // eslint-disable-next-line react/react-in-jsx-scope
      <ErrorAlert
        key={"alert" + "400-" + Math.round(Math.random() * 10000)}
        show={true}
        title={title}
      />,
      document.getElementById("alert")
    );
    return;
  }
  if (!element || json.StatusCode === 200) return;
  // console.log(json.StatusCode);

  let isAllSelect = false;
  let isSelect = {};
  if (element === true) {
    isAllSelect = true;
  } else if (element instanceof Array) {
    element.map((child) => {
      isSelect[child] = true;
    });
  } else {
    console.log("参数错误");
    return;
  }
  switch (json.StatusCode) {
    case 400:
      if (isAllSelect || isSelect[400]) {
        title = json.Msg;
        ReactDOM.render(
          // eslint-disable-next-line react/react-in-jsx-scope
          <ErrorAlert
            key={"alert" + "400-" + Math.round(Math.random() * 10000)}
            show={true}
            title={title}
          />,
          document.getElementById("alert")
        );
      }
      break;
    case 500:
      if (isAllSelect || isSelect[500]) {
        title = "服务器出现未知异常，请重试或联系管理员";
        ReactDOM.render(
          // eslint-disable-next-line react/react-in-jsx-scope
          <ErrorAlert
            key={"alert" + "400-" + Math.round(Math.random() * 10000)}
            show={true}
            title={title}
          />,
          document.getElementById("alert")
        );
      }
      break;
    case 401:
      if (isAllSelect || isSelect[401]) TokenCheck();
      break;
    case 403:
      if (isAllSelect || isSelect[403])
        window.location.href = config.ErrorProxy + "/Error.aspx?errcode=E011";
      break;
    default:
      window.location.href = config.ErrorProxy + "/Error.aspx?errcode=E011";
  }
}

const getData =(
  url,
  SecurityLevel = 1,
  mode = "cors",
  IsDesk = false,
  element = true,
  moreParams={ credentials:'omit',content_type: "urlencoded", requestHeader: {} }
) =>{
  let token = sessionStorage.getItem("token") || getQueryVariable("lg_tk");
  // if (!token && SecurityLevel !== 1) {
  //     console.log('token无效，请重新登录');//后期会进行无token的事件操作
  //     return new Promise(function (resolve, reject) {
  //         if (resolve) {
  //             resolve(stringify({ 'Status': 4001, 'Msg': "token无效，请重新登录" }));
  //         } else {
  //             reject(stringify({ 'Status': 4000, 'Msg': "错误！" }));
  //         }
  //     });
  // }
  // console.log(isIE());
  let { content_type, requestHeader ,credentials} = moreParams;
  if(content_type===undefined){
    content_type = "urlencoded"
  }
  if(requestHeader===undefined){
    requestHeader = {}
  }
  if(credentials===undefined){
    credentials = 'omit'
  }


  if (isIE()) {
    url = encodeURI(url);
  }
  let ContentTypeArr = [
    "application/x-www-form-urlencoded",
    "application/json",
    "multipart/form-data",
  ];
  let ContentType = "";
  if (content_type === "urlencoded") {
    ContentType = ContentTypeArr[0];
  } else if (content_type === "json") {
    ContentType = ContentTypeArr[1];
  } else if (content_type === "file") {
    ContentType = ContentTypeArr[2];
  } else {
    // ContentType = ContentTypeArr[0];
    ContentType = content_type;
  }
  // console.log(url)
  let result = fetch(AESEncryptionUrl(url, TESTKEY, SecurityLevel, IsDesk), {
    method: "get", //*post、get、put、delete，此项为请求方法相关的配置
    mode: mode, //no-cors(跨域模式但服务器端不支持cors),*cors(跨域模式，需要服务器通过Access-control-Allow-Origin来
    //允许指定的源进行跨域),same-origin(同源)
    cache: "no-cache", //*no-cache,default,reload,force-cache,only-ifcached,此项为缓存相关配置
    credentials: credentials, //*include(携带cookie)、same-origin(cookie同源携带)、omit(不携带)
    headers: {
      Accept: "application/json, text/plain, */*", //请求头，代表的、发送端（客户端）希望接收的数据类型
      "Content-Type": ContentType, //实体头，代表发送端（客户端|服务器）发送的实体数据的数据类型
      Authorization: requestSecure(url, TESTKEY, SecurityLevel),
      ...requestHeader,
    },
    redirect: "follow", //manual、*follow(自动重定向)、error，此项为重定向的相关配置
    // referrer: 'no-referrer',//该首部字段会告知服务器请求的原始资源的URI
  });

  // result.then(data => {
  //     let json = data;
  //     console.log(json)
  //     if (json.StatusCode === '401') {
  //         TokenCheck(IsDesk);
  //     }
  //     return data
  // })

  result
    .then((res) => {
      //做提前处理
      let clone = res.clone();
      // console.log(clone.json())
      return clone;
    })
    .then((response) => {
      // console.log(response.status)
      //当请求成功时直接返回response，失败则进行json解析返回失败信息

      if (response.status === 200) {
        return response;
      } else {
        if (response.status === 401) {
          const preUrl = encodeURIComponent(
            Public.getLg_tk(window.location.href)
          );

          window.location.href = "/html/admDisconnect?lg_preurl=" + preUrl;

        } else {
          return response.json().then((json) => {
            //   console.log(json)
            return Promise.reject(json);
          });
        }
      }
    })
    .then(
      (res) => res.json(),
      (err) => {
        return false;
      }
    )
    .then((json) => {
      // console.log(json, json.StatusCode === 200)
      if (element !== false) {
        handleStatusCode(json, element);
      }
    });

  return result;
}

//获取url参数
function getQueryVariable(variable) {
  var query =
    window.location.search.substring(1) ||
    window.location.href.split("?")[1] ||
    window.location.href;

  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
}
function isIE() {
  //获取当前浏览器相关信息
  var explorer = window.navigator.userAgent.toLowerCase();
  //判断是否是ie浏览器
  if (
    explorer.indexOf("msie") >= 0 ||
    explorer.indexOf("rv:11.0) like gecko") >= 0
  ) {
    return true;
  } else {
    return false;
  }
}

export { postData, getData };
