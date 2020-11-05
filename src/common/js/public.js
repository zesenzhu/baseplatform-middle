import { func } from "prop-types";

import config from "./config";

//对象深度对比
const deepCompare = (x, y) => {
  var i, l, leftChain, rightChain;

  function compare2Objects(x, y) {
    var p;

    // remember that NaN === NaN returns false
    // and isNaN(undefined) returns true
    if (
      isNaN(x) &&
      isNaN(y) &&
      typeof x === "number" &&
      typeof y === "number"
    ) {
      return true;
    }

    // Compare primitives and functions.
    // Check if both arguments link to the same object.
    // Especially useful on the step where we compare prototypes
    if (x === y) {
      return true;
    }

    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if (
      (typeof x === "function" && typeof y === "function") ||
      (x instanceof Date && y instanceof Date) ||
      (x instanceof RegExp && y instanceof RegExp) ||
      (x instanceof String && y instanceof String) ||
      (x instanceof Number && y instanceof Number)
    ) {
      return x.toString() === y.toString();
    }

    // At last checking prototypes as good as we can
    if (!(x instanceof Object && y instanceof Object)) {
      return false;
    }

    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
      return false;
    }

    if (x.constructor !== y.constructor) {
      return false;
    }

    if (x.prototype !== y.prototype) {
      return false;
    }

    // Check for infinitive linking loops
    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
      return false;
    }

    // Quick checking of one object being a subset of another.
    // todo: cache the structure of arguments[0] for performance
    for (p in y) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      } else if (typeof y[p] !== typeof x[p]) {
        return false;
      }
    }

    for (p in x) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      } else if (typeof y[p] !== typeof x[p]) {
        return false;
      }

      switch (typeof x[p]) {
        case "object":
        case "function":
          leftChain.push(x);
          rightChain.push(y);

          if (!compare2Objects(x[p], y[p])) {
            return false;
          }

          leftChain.pop();
          rightChain.pop();
          break;

        default:
          if (x[p] !== y[p]) {
            return false;
          }
          break;
      }
    }

    return true;
  }

  if (arguments.length < 1) {
    return true; //Die silently? Don't know how to handle such case, please help...
    // throw "Need two or more arguments to compare";
  }

  for (i = 1, l = arguments.length; i < l; i++) {
    leftChain = []; //Todo: this can be cached
    rightChain = [];

    if (!compare2Objects(arguments[0], arguments[i])) {
      return false;
    }
  }

  return true;
};

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

//获取url参数
function getUrlQueryVariable(url, variable) {
  if (!url) {
    return;
  }
  var query = url.split("?")[1];

  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
}

/**
 *
 * 返回对相应的数据类型
 */
function getType(data) {
  return Object.prototype.toString.call(data).substring(8).split(/]/)[0];
}

/**
 *
 * @param {*} sourceObj
 * @param {*} compareObj
 *
 * 比较对象是否相等
 *
 */
function comparisonObject(sourceObj, compareObj) {
  if (arguments.length < 2) throw "Incorrect number of parameters";
  let sourceType = getType(sourceObj);
  if (sourceType !== getType(compareObj)) return false;
  // Not objects and arrays
  if (
    sourceType !== "Array" &&
    sourceType !== "Object" &&
    sourceType !== "Set" &&
    sourceType !== "Map"
  ) {
    if (sourceType === "Number" && sourceObj.toString() === "NaN") {
      return compareObj.toString() === "NaN";
    }
    if (sourceType === "Date" || sourceType === "RegExp") {
      return sourceObj.toString() === compareObj.toString();
    }
    return sourceObj === compareObj;
  } else if (sourceType === "Array") {
    if (sourceObj.length !== compareObj.length) return false;
    if (sourceObj.length === 0) return true;
    for (let i = 0; i < sourceObj.length; i++) {
      if (!comparisonObject(sourceObj[i], compareObj[i])) return false;
    }
  } else if (sourceType === "Object") {
    let sourceKeyList = Reflect.ownKeys(sourceObj);
    let compareKeyList = Reflect.ownKeys(compareObj);
    let key;
    if (sourceKeyList.length !== compareKeyList.length) return false;
    for (let i = 0; i < sourceKeyList.length; i++) {
      key = sourceKeyList[i];
      if (key !== compareKeyList[i]) return false;
      if (!comparisonObject(sourceObj[key], compareObj[key])) return false;
    }
  } else if (sourceType === "Set" || sourceType === "Map") {
    // 把 Set Map 转为 Array
    if (!comparisonObject(Array.from(sourceObj), Array.from(compareObj)))
      return false;
  }
  return true;
}
// 处理链接，获取lg_tk
function getLg_tk(url) {
  let Url = decodeURIComponent(url);
  if (Url.indexOf("lg_tk") === -1) {
    return Url;
  }
  let lg_tk = "";
  if (Url.indexOf("#") === -1) {
    lg_tk = Url.split("lg_tk=")[1].split("&")[0];
  } else {
    lg_tk = Url.split("lg_tk=")[1].split("#")[0].split("&")[0];
  }

  lg_tk = Url.includes("?lg_tk=") ? "?lg_tk=" + lg_tk : "&lg_tk=" + lg_tk;

  return Url.replace(lg_tk, "");
}
// 处理url适合获取icon
const UrlGetIcon = (url) => {
  let urlArr = "";
  // console.log(url,url instanceof String,typeof url)
  if (typeof url !== "string") {
    return;
  }
  if (url.indexOf("://") !== "-1") {
    urlArr = url.split("/").slice(0, 3).join("/");
    // console.log(urlArr)
    return urlArr;
  } else {
    urlArr = url.split("/")[0];
    // console.log(urlArr)

    return urlArr;
  }
};
const requestNextAnimationFrame = (function () {
  var originalWebkitMethod,
    wrapper = undefined,
    callback = undefined,
    geckoVersion = 0,
    userAgent = navigator.userAgent,
    index = 0,
    self = this;
  if (window.webkitRequestAnimationFrame) {
    wrapper = function (time) {
      if (time === undefined) {
        time += new Date();
      }
      self.callback(time);
    };
    originalWebkitMethod = window.webkitRequestAnimationFrame;
    window.webkitRequestAnimationFrame = function (callback, element) {
      self.callback = callback;
      originalWebkitMethod(wrapper, element);
    };
  }
  if (window.mozRequestAnimationFrame) {
    index = userAgent.indexOf("rv:");
    if (userAgent.indexOf("Gecko") !== -1) {
      geckoVersion = userAgent.substr(index + 3, 3);
      if (geckoVersion === "2.0") {
        window.mozRequestAnimationFrame = undefined;
      }
    }
  }

  return (
    window.requestNextAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback, element) {
      var start, finish;
      window.setTimeout(function () {
        start = +new Date();
        callback(start);
        finish = +new Date();
        self.timeout = 1000 / 60 - (finish - start);
      }, self.timeout);
    }
  );
})();

const IEVersion = () => {
  let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  // console.log(userAgent)
  let isIE =
    userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  let isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  let isIE11 =
    userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    let fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion < 10) {
      //IE版本低于10 跳转到错误页面
      window.location.href = config.ErrorProxy + "/browser-tips.html";
      return false;
      console.log("版本过低");

      console.log(fIEVersion);
    } else {
      console.log("这是IE10");
      return true; //IE版本>=10
    }
  } else if (isEdge) {
    console.log("这个edge");
    return true; //edge
  } else if (isIE11) {
    console.log("这是IE11");
    return true; //IE11
  } else {
    console.log("不是ie浏览器");
    return true;
  }
};
// 给教务系统，处理url，改变布局，设置跳转逻辑
export function checkUrlAndPostMsg(
   { sysid= "000", btnName= "", url= "" },
  useDefault = true,
  func = () => {}
) {
  let iFrame = getQueryVariable("iFrame");
  let isIFrame = false;
  // let { sysid, btnName, url } = params;
  // console.log(iFrame, sysid, btnName, url, arguments);
  if (iFrame === "true") {
    isIFrame = true;

    window.parent.postMessage({ sysid, btnName, url }, "*");
  } else if (useDefault) {
    window.open(url)
  }
  if(typeof arguments[arguments.length-1] === 'function'){
    arguments[arguments.length-1](isIFrame);
  }
  // (isIFrame);
  return isIFrame;
}

// 设置用户角色,模块角色统一在这处理
const setRole = (LoginMsg) => {
  // let {
  //   dispatch,
  //   DataState,
  //   PublicState: {
  //     LoginMsg: { UserType, UserClass },
  //   },
  // } = this.props;
  let { UserType, UserClass } = LoginMsg;
  let Role = "";
  UserType = parseInt(UserType);
  UserClass = parseInt(UserClass);
  if (UserType === 0 && (UserClass === 1 || UserClass === 2)) {
    //学校管理员（admin_学校代码，创建学校时生成）
    Role = "Admin-School";
  } else if (UserType === 0 && (UserClass === 3 || UserClass === 4)) {
    //学院管理员
    Role = "Admin-College";
  } else if (UserType === 1) {
    //教师,— UserClass=100000~111111：
    //后5位分别代表：
    //任课教师、班主任、教研者（V3.0无效，恒为0）、学科主管、校领导
    //（V3.0无效，恒为0），值为1时代表有该身份；
    Role = "Teacher";
  } else if (UserType === 2) {
    //学生
    Role = "Student";
  } else if (UserType === 7) {
    //学校领导（V3.0之后的版本才有此角色）
    // — UserClass=0 校长
    //— UserClass=1 副校长
    //— UserClass=2 教务主任
    Role = "Leader-School";
  } else if (UserType === 10) {
    //学院领导（V3.0之后的版本才有此角色）
    // — UserClass=3 院长
    //— UserClass=4 副院长
    Role = "Leader-College";
  } else if (UserType === 3) {
    //家长

    Role = "Parent";
  } else if (UserType === 4) {
    //教育专家

    Role = "Specialist";
  } else if (UserType === 5) {
    //教育局领导

    Role = "Leader-Education";
  }
  return { ...LoginMsg, Role };
};
// 数组与与元素 去重添加
const noRepeat = (data, value) => {
  //data:Array,value:string
  let end = [];
  data instanceof Array && data.push(value);
  data instanceof Array &&
    data.forEach((child) => {
      let isRepeat = false;
      if (child === "" || child === undefined) {
        return;
      }
      if (end.length === 0) {
        end.push(child);
      } else {
        if (!end.some((child2) => child2 === child)) {
          end.push(child);
        }
      }
    });
  return end;
};
// 数组与数组去重合并
const ArrayNoRepeat = (Arr1, Arr2) => {
  let end = Arr1;
  Arr2.forEach((child, index) => {
    end = noRepeat(end, child);
  });
  return end;
};
export default {
  deepCompare,
  getQueryVariable,
  getUrlQueryVariable,
  comparisonObject,
  getLg_tk,
  UrlGetIcon,
  IEVersion,
  requestNextAnimationFrame,
  checkUrlAndPostMsg,
  setRole,
  noRepeat,ArrayNoRepeat
};
