//initFunc为初始化后的回调函数，成功返回操作对象;失败返回false，表明基础插件不存在
//操作对象可以调用start(proName, moduleName, url, exeName, exeParam)方法，启动exe
//操作对象在谷歌火狐及ie10以上浏览器可调用sendmessage(proName, moduleName, msgData)方法，向指定模块发送消息；
//也可在谷歌火狐及ie10以上浏览器实现reciveExeMessageFunc(msg)函数接收消息
//当websocket被断开时，将触发reConnectFunc回调函数，此时，可重新建立对象并连接
export default function BsToCsFunc(initFunc, reciveExeMessageFunc, reConnectFunc) {
    this.checkBase = false;
    this._Socket = null;
    this.objState = 0;
    this.objConnect = false;
    this.socketArrayLength = 5;
    this.activexObj = null;

    var maxPort = 15326;
//    var browser = getBrowserInfo();
//    if (browser != null && browser[0] == "firefox") {
//        this.socketArrayLength = 2;
//        maxPort = 15323;
//    }

    var socketArray = new Array();
    var thisObj = this;
    for (var i = 15321; i < maxPort; ++i) {
        try {
            var tmpSocket = new WebSocket("ws://127.0.0.1:" + i);
            //tmpSocket.CONNECTING
            socketArray.push(tmpSocket);
            tmpSocket.onclose = function () {
                if (!thisObj.checkBase) {
                    --thisObj.socketArrayLength;
                    if (thisObj.socketArrayLength <= 0) {
                        if (typeof initFunc === 'function') {
                            initFunc(false);
                        }
                    }
                }
                else {
                    //说明本来连接到了socket服务器，但是突然断开了，最有可能是因为服务被停止了，以及卸载或重装了基础插件
                    if (typeof reConnectFunc === 'function') {
                        reConnectFunc();
                    }
                }
            };
            tmpSocket.onopen = function () {
                switch (this.readyState) {
                    case 0: case 2: case 3:
                        break;
                    case 1:
                        thisObj.objState = 0;
                        thisObj.objConnect = true;
                        thisObj._Socket = this;
                        thisObj.checkBase = true;
                        if (typeof initFunc === 'function') {
                            initFunc(thisObj);
                        }
                        if (typeof reciveExeMessageFunc === 'function') {
                            this.onmessage = function (e) {
                                reciveExeMessageFunc(e.data);
                            }
                        }

                        break;

                    default:
                }
            }
        }
        catch (e) {
            try {
                thisObj.objState = 1;
                thisObj.objConnect = true;
                createActivexObj("B94EBF17-D4AB-4A91-A298-008DDA8AEFB3", "LgClientStart", "", 1, 1);
                thisObj.activexObj = document.getElementById("LgClientStart");
                if (thisObj.activexObj.CheckOcx() === "ok") {
                    thisObj.objConnect = true;
                    thisObj.checkBase = true;
                    if (typeof initFunc === 'function') {
                        initFunc(thisObj);
                    }
                }
                else {
                    if (typeof initFunc === 'function') {
                        initFunc(false);
                    }
                }
            }
            catch (e) {
                if (typeof initFunc === 'function') {
                    initFunc(false);
                }
            }
            break;
        }
    }

}

BsToCsFunc.prototype.start = function (proName, moduleName, url, exeName, exeParam) {
    if (this.objState === 0) {
        if (this.objConnect) {
            var char1 = String.fromCharCode(1);
            var char2 = String.fromCharCode(2);
            //连接成功后
            this._Socket.send(proName + char1 + moduleName + char1 + "001" + char2 + url + char2 + exeName + char2 + exeParam);
            return true;
        }
        else {
            return false;
        }
    }
    else {
        if (this.objConnect) {
            this.activexObj.NotifyService("5$" + url + "," + proName + "," + moduleName + "," + exeName + "#" + exeParam);
            return true;
        }
        else {
            return false;
        }
    }
}

//如果页面需要接收exe发送的消息，则需要在initFunc函数内调用此函数
BsToCsFunc.prototype.willReciveMessage = function (proName, moduleName) {
    if (this.objState === 0) {
        if (this.objConnect) {
            var char1 = String.fromCharCode(1);
            var char2 = String.fromCharCode(2);
            this._Socket.send(proName + char1 + moduleName);
            return true;
        }
    }
    return false;
}

BsToCsFunc.prototype.sendMessage = function (proName, moduleName, msgData) {
    if (this.objState === 0) {
        if (this.objConnect) {
            var char1 = String.fromCharCode(1);
            var char2 = String.fromCharCode(2);
            //给exe发信息
            this._Socket.send(proName + char1 + moduleName + char1 + "000" + char2 + msgData);
            return true;
        }
    }
    return false;
}

//如果页面需要获取本机mac地址，则需要在initFunc函数内调用此函数，将在reciveExeMessageFunc内接收到{LocalMacIDs:[mac1,mac2,...,macN]}的json字符串
BsToCsFunc.prototype.GetMacIDs = function (proName, moduleName) {
    if (this.objState === 0) {
        if (this.objConnect) {
            var char1 = String.fromCharCode(1);
            var char2 = String.fromCharCode(2);
            //给服务发信息
            this._Socket.send(proName + char1 + moduleName + char1 + "002" + char2 + "");
            return true;
        }
    }
    return false;
}

//检测浏览器类型及版本
 export function getBrowserInfo() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    var res = new Array();
    s = ua.match(/msie ([\d.]+)/) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
        (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
        (s = ua.match(/opera\/([\d.]+)/)) ? Sys.opera = s[1] :
        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

    if (Sys.ie) {
        res[0] = "ie";
        res[1] = Sys.ie;
    } else if (!!window.ActiveXObject || "ActiveXObject" in window) {
        res[0] = "ie";
        res[1] = "11.0";
    }
    else if (Sys.firefox) {
        res[0] = "firefox";
        res[1] = Sys.firefox;
    }
    else if (Sys.chrome) {
        res[0] = "chrome";
        res[1] = Sys.chrome;
    }
    else if (Sys.safari) {
        res[0] = "safari";
        res[1] = Sys.safari;
    }
    else if (Sys.opera) {
        res[0] = "opera";
        res[1] = Sys.opera;
    }
    else {
        res = null;
    }
    return res;
}

//---------------------浏览器兼容Begin-----------------------------//
//创建ActiveX控件实例
function createActivexObj(clsid, objID, evtArr, width, height) {
    if (document.getElementById(objID) == null) {
        var browserInfo = getBrowserInfo();
        var AcXobj;
        if (browserInfo[0] === "ie") {
            AcXobj = document.createElement("OBJECT");
            AcXobj.setAttribute("classid", "clsid:{" + clsid + "}");
            if (evtArr) {
                for (var i = 0; i < evtArr.length; i++) {
                    var evts = evtArr[i].split(":");
                    document.body.innerHTML += ('<script for="' + objID
                    + '" event="' + evts[0] + '(' + setArgs(evts[2]) + ')">'
                    + evts[1] + '(' + setArgs(evts[2]) + ');</script>');
                }
            }
        }
        AcXobj.setAttribute("id", objID);
        if (width === null || height === null || width === 0 || height === 0) {
            AcXobj.setAttribute("height", 0);
            AcXobj.setAttribute("width", 0);
            if (browserInfo[0] === "ie" && (browserInfo[1] === "6.0" || browserInfo[1] === "7.0")) {
                AcXobj.style.display = "none";
            }
        }
        else {
            AcXobj.setAttribute("height", height);
            AcXobj.setAttribute("width", width);
        }
        document.body.appendChild(AcXobj);
    }

    function setArgs(alenght) {
        if (alenght === null)
            return "";
        var res = "";
        for (var ai = 0; ai < alenght; ai++) {
            res += "acxArg_" + ai + ",";
        }
        res = res.substr(0, res.length - 1);
        return res;
    }
}
//---------------------浏览器兼容End-----------------------------//