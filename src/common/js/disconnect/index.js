import config from "../config";

import $ from "jquery";

import Public from "../public";

export function TokenCheck(IsDesk = false, SysID = "000",fun=()=>{},isFirst=false) {
  // console.log(fun)
  let session_token = sessionStorage.getItem("token");

  let url_token = getQueryVariable("lg_tk"); //lg_tk为链接上带的token

  let local_token = localStorage.getItem("token");

  let preUrl = encodeURIComponent(Public.getLg_tk(window.location.href));

  let url = window.location.href;

  if (!session_token && !url_token && !local_token) {
    //没有token,跳转至掉线界面

    //根据是否传参来判断是否是桌面方调用

    sessionStorage.clear();

    if (IsDesk) {
      //如果是桌面调用
      window.location.href = "/UserMgr/Login/Login.aspx";

    } else {
      if (
        !url.includes("html/admDisconnect") &&
        !getQueryVariable("lg_preurl")
      ) {
        window.location.href = "/html/admDisconnect?lg_preurl=" + preUrl;
      }
    }
  } else {
    //有token，对token进行验证

    let token = url_token||session_token|| local_token;

    //回调函数
    let jsoncallback = json => {
      //  console.log(json + 1);
    };
    //jsonp验证token
    $.ajax({
      url:
        config.TokenProxy +
        "/UserMgr/Login/Api/Login.ashx?token=" +
        token +
        "&method=tokenCheck&params=" +
        SysID,
      type: "GET",
      dataType: "jsonp",
      jsonp: "jsoncallback",
      success: function(data) {

          // console.log('success function1');

          //验证成功，则
        let json = data;
        // if (!sessionStorage.getItem('UserInfo'))
        // console.log(json, getQueryVariable('lg_preurl'))
        if (json.data.result) {

            console.log('success');

          //result为true

          sessionStorage.setItem("token", token);
          localStorage.setItem("token", token);
          if(isFirst){
            getUserInfo(token, "000",fun);

          }
          // fun()
          if (!sessionStorage.getItem("UserInfo")) {
            getUserInfo(token, "000");
          }
          //   let i = 1
          //   let checkTokenNull = setInterval(function() {
          //   //  console.log(i++)

          //     if (!sessionStorage.getItem("token")) {
          //       clearInterval(checkTokenNull);
          //       window.location.href = "/UserMgr/Login/Login.aspx";
          //     }
          //   }, 500);
          setTimeout(function() {
            let lastTime = sessionStorage.getItem("lastTime");
            let date = new Date();
            let time = date.getTime();
            if (time - lastTime >= 60000) {
              sessionStorage.setItem("lastTime", time);
              TokenCheck(IsDesk);
            }
          }, 60000);
          if (url.split("html/")[1]) {
            //有就说明不在登录页
            if (url.includes("html/admDisconnect")) {
              //本身在掉线界面

              if (getQueryVariable("lg_preurl")) {
                //查询是否有lg_preurl,有则跳至该地址，没有则跳至桌面

                window.location.href = decodeURIComponent(
                  url.split("lg_preurl=")[1]
                );
              } else {
                window.location.href = "/";
              }
            } else {
              return;
            }
          } else {
            return;
          }

          /* else if (getQueryVariable('lg_preurl')) {//查询是否有lg_preurl,有则跳至该地址，没有则跳至桌面
                         window.location.href = getQueryVariable('lg_preurl');
                     } else {
                         window.location.href = config.BasicProxy;
                     }*/
        } else {

            console.log('failed');

          //验证不成功
          //sessionStorage.setItem('token', '')
          //回调函数
          let jsoncallback = json => {
            ////  console.log(json + 1);
          };
          if (token !== session_token) {
            //如果第一个验证失败，判断是否用的是session的token，不是就进行url的token验证
            //jsonp验证token
            let token_2 = url_token || local_token
           
            $.ajax({
              url:
                config.TokenProxy +
                "/UserMgr/Login/Api/Login.ashx?token=" +
                token_2 +
                "&method=tokenCheck&params=" +
                SysID,
              type: "GET",
              dataType: "jsonp",
              jsonp: "jsoncallback", //这里的值需要和回调函数名一样
              success: function(data) {
                //验证成功，则

                  console.log('success function2');

                let json = data;
                // if (!sessionStorage.getItem('UserInfo'))

                if (json.data.result) {
                  //result为true
                  // if (url.split('html/')[1]) {//有就说明不在登录页

                    console.log('success2');

                  sessionStorage.setItem("token", token_2);
                  localStorage.setItem("token", token_2);
                  // fun()
                  if(isFirst){
                    getUserInfo(token, "000",fun);
        
                  }
                  if (!sessionStorage.getItem("UserInfo")) {
                    getUserInfo(token, "000",fun);
                  }

                  setTimeout(function() {
                    let lastTime = sessionStorage.getItem("lastTime");
                    let date = new Date();
                    let time = date.getTime();
                    if (time - lastTime >= 60000) {
                      sessionStorage.setItem("lastTime", time);
                      TokenCheck(IsDesk);
                    }
                  }, 60000);
                  if (url.includes("html/admDisconnect")) {
                    //本身在掉线界面

                    if (getQueryVariable("lg_preurl")) {
                      //查询是否有lg_preurl,有则跳至该地址，没有则跳至桌面

                      window.location.href = decodeURIComponent(
                        url.split("lg_preurl=")[1]
                      );
                    } else {
                      window.location.href = "/";
                    }
                  } else {
                    return;
                  }
                  // } else if (!getQueryVariable('lg_preurl')) {//查询是否有lg_preurl,有则跳至该地址，没有则跳至桌面
                  //     window.location.href = getQueryVariable('lg_preurl');
                  // } else {
                  //     window.location.href = config.BasicProxy;
                  // }
                } else {

                    console.log('failed2');

                  //验证不成功
                  // if (url.split('html/')[1]) {//有就说明不在登录页
                  if (token !== url_token) {
                    //如果第一个验证失败，判断是否用的是session的token，不是就进行url的token验证
                    //jsonp验证token
                    let token_3 = local_token
                   
                    $.ajax({
                      url:
                        config.TokenProxy +
                        "/UserMgr/Login/Api/Login.ashx?token=" +
                        token_3 +
                        "&method=tokenCheck&params=" +
                        SysID,
                      type: "GET",
                      dataType: "jsonp",
                      jsonp: "jsoncallback", //这里的值需要和回调函数名一样
                      success: function(data) {
                        //验证成功，则

                        console.log('success function 3');

                        let json = data;
                        // if (!sessionStorage.getItem('UserInfo'))
        
                        if (json.data.result) {

                            console.log('success3');

                          //result为true
                          // if (url.split('html/')[1]) {//有就说明不在登录页
        
                          sessionStorage.setItem("token", token_3);
                          localStorage.setItem("token", token_3);
                          // fun()
                          if(isFirst){
                            getUserInfo(token, "000",fun);
                
                          }
                          if (!sessionStorage.getItem("UserInfo")) {
                            getUserInfo(token, "000",fun);
                          }
        
                          setTimeout(function() {
                            let lastTime = sessionStorage.getItem("lastTime");
                            let date = new Date();
                            let time = date.getTime();
                            if (time - lastTime >= 60000) {
                              sessionStorage.setItem("lastTime", time);
                              TokenCheck(IsDesk);
                            }
                          }, 60000);
                          if (url.includes("html/admDisconnect")) {
                            //本身在掉线界面
        
                            if (getQueryVariable("lg_preurl")) {
                              //查询是否有lg_preurl,有则跳至该地址，没有则跳至桌面
        
                              window.location.href = decodeURIComponent(
                                url.split("lg_preurl=")[1]
                              );
                            } else {
                              window.location.href = "/";
                            }
                          } else {
                            return;
                          }
                          // } else if (!getQueryVariable('lg_preurl')) {//查询是否有lg_preurl,有则跳至该地址，没有则跳至桌面
                          //     window.location.href = getQueryVariable('lg_preurl');
                          // } else {
                          //     window.location.href = config.BasicProxy;
                          // }
                        } else {

                            console.log('failed3');

                          //验证不成功
                          // if (url.split('html/')[1]) {//有就说明不在登录页
        
                          sessionStorage.clear();
        
                          if (!url.includes("html/admDisconnect")) {
                            if (IsDesk) {
                              window.location.href = "/UserMgr/Login/Login.aspx";
                            } else {
                              window.location.href =
                                "/html/admDisconnect?lg_preurl=" +
                                encodeURIComponent(Public.getLg_tk(url));
                            }
        
                            // } else {
                            //     return;
                            // }
                          } else {
                            return;
                          }
                        }
                      },
                      err:function () {

                        console.log('error function3');

                      }

                    });
                  }else{
                    sessionStorage.clear();

                    if (!url.includes("html/admDisconnect")) {
                      if (IsDesk) {
                        window.location.href = "/UserMgr/Login/Login.aspx";
                      } else {
                        window.location.href =
                          "/html/admDisconnect?lg_preurl=" +
                          encodeURIComponent(Public.getLg_tk(url));
                      }
  
                      // } else {
                      //     return;
                      // }
                    } else {
                      return;
                    }
                  }
                 
                }
              },
              err:function () {

                console.log('error function 2');

              }
            });
          } else {
            sessionStorage.clear();

            // if (url.split('html/')[1]) {//有就说明不在登录页
            if (!url.includes("html/admDisconnect")) {
              if (IsDesk) {
                window.location.href = "/UserMgr/Login/Login.aspx";
              } else {
                window.location.href =
                  "/html/admDisconnect?lg_preurl=" +
                  encodeURIComponent(Public.getLg_tk(url));
              }

              // } else {
              //     return;
              // }
            } else {
              return;
            }
          }
        }
      },
      error: function(textStatus) {
        //请求失败后调用的函数
        ////  console.log(JSON.stringify(textStatus));
        // if (url.split('html/')[1]) {//有就说明不在登录页

        console.log('err function');

        if (IsDesk){

            window.location.href = "/UserMgr/Login/Login.aspx";

        }else {

            if (url.includes("html/admDisconnect")) {
                window.location.href =
                    "/html/admDisconnect?lg_preurl=" +
                    encodeURIComponent(Public.getLg_tk(url));
            } else {

                window.location.href = "/html/admDisconnect?lg_preurl=" + preUrl;

            }

        }

        // } else {
        //     return;
        // }
      }
    });
  }
}
//获取url参数
export function getQueryVariable(variable) {
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
//验证成功后进行用户信息获取
export function getUserInfo(token, SysID="000",fun=()=>{}) {
  let date = new Date();
  let time = date.getTime();
  //回调函数
  let jsoncallback = json => {
    ////  console.log(json + 1);
  };
  $.ajax({
    url:
      config.TokenProxy +
      "/UserMgr/Login/Api/Login.ashx?token=" +
      token +
      "&method=GetUserInfo&params=" +
      SysID,
    type: "GET",
    dataType: "jsonp",
    jsonp: "jsoncallback", //这里的值需要和回调函数名一样
    success: function(data) {
      let loginInfo = data.data;

      let UserInfo = {};

      for (let [key, value] of Object.entries(loginInfo)) {
        if (key === "PhotoPath") {
          let date = new Date();
          let time = date.getTime();
          value = value + "?T=" + time;
        }
        UserInfo[key] = decodeURIComponent(value);
      }

      UserInfo.isLogin = true;
      // console.log(JSON.stringify(UserInfo))

      sessionStorage.setItem("UserInfo", JSON.stringify(UserInfo));

      fun()
      //   sessionStorage.setItem("lastTime", time);
    },
    error: function() {}
  });
}

export function TokenCheck_Disconnect() {
  let lastTime = sessionStorage.getItem("lastTime");
  let date = new Date();
  let time = date.getTime();
  /*   if (time - lastTime >= 60000) {*/
  sessionStorage.setItem("lastTime", time);
  TokenCheck();
  // let i = 0
  // console.log(i++)
  setInterval(function() {
      TokenCheck();
      // console.log(i++)
    }, 60000);
}

export function TokenCheck_Connect(IsDesk=false,fun=()=>{}) {
  let lastTime = sessionStorage.getItem("lastTime");
  let date = new Date();
  let time = date.getTime();
  let i = 1;
  let url_token = getQueryVariable("lg_tk"); //lg_tk为链接上带的token
  let checkTokenNull = setInterval(function() {
    ////  console.log(i++)
    // localStorage.setItem("token", url_token);
    // !url_token&&!sessionStorage.getItem("token")&&
    if (!localStorage.getItem("token")) {
      TokenCheck(IsDesk);
      // clearInterval(checkTokenNull);
      // window.location.href = "/UserMgr/Login/Login.aspx";
    }
  }, 500);
  /*   if (time - lastTime >= 60000) {*/
  sessionStorage.setItem("lastTime", time);
// console.log(fun)
  TokenCheck(IsDesk,"000",fun,true);
  /*}*/
  // setTimeout(function() {
  //     let lastTime = sessionStorage.getItem('lastTime')
  //     let date = new Date();
  //     let time = date.getTime()
  //     if (time - lastTime >= 60000) {
  //         TokenCheck(IsDesk)
  //         sessionStorage.setItem('lastTime', time)
  //     }

  // }, 60000)
}

export function LogOut(SysID="000",IsPersonnal) {

  let token = sessionStorage.getItem("token") || getQueryVariable("lg_tk");

  $.ajax({
    url:
      config.TokenProxy +
      "/UserMgr/Login/Api/Login.ashx?token=" +
      token +
      "&method=Logout&params=" +
      SysID,
    type: "GET",
    dataType: "jsonp",
    jsonp: "jsoncallback", //这里的值需要和回调函数名一样
    success: function(data) {
      //验证成功，则
      let json = data;

      if (json.data.result) {
        //result为true

        window.location.href = "/UserMgr/Login/Login.aspx";

        localStorage.removeItem("token");

        sessionStorage.clear();

      }
    },

    error: function(textStatus, err) {
      //请求失败后调用的函数

      alert(err);
    }
  });
}



//分离之前的登录，在线相关的函数

const loginApi = ({token,method,params}) => {

    const {WebRootUrl=''} = sessionStorage.getItem('LgBasePlatformInfo')?JSON.parse(sessionStorage.getItem('LgBasePlatformInfo')):{};

    const ajax =  $.ajax({
        url:`${WebRootUrl}/UserMgr/Login/Api/Login.ashx?method=${method}&params=${params}${token?'&token='+token:''}`,
        type: "GET",
        dataType: "jsonp",
        jsonp: "jsoncallback" //这里的值需要和回调函数名一样
    });

    return ajax;

};


//一次性检查token是否在线

export const checkTokenOnce = (func=()=>{}) =>{

    const session_token = sessionStorage.getItem("token");

    const url_token = getQueryVariable("lg_tk"); //lg_tk为链接上带的token

    const local_token = localStorage.getItem("token");

    const preUrl = encodeURIComponent(Public.getLg_tk(window.location.href));

    const url = window.location.href;

    if (!session_token && !url_token && !local_token) {

        if (!url.includes("html/admDisconnect")&&!getQueryVariable("lg_preurl")) {

            sessionStorage.clear();

            localStorage.removeItem('LgBaseUserInfo');

            localStorage.removeItem('token');

            window.location.href = config.HashPrevProxy+"/html/admDisconnect?lg_preurl=" + preUrl;

        }

    }else{

        const token = url_token||local_token||session_token;

        loginApi({token,method:"tokenCheck",params:'000'}).then(res=>{ //如果有返回值

            if (!(parseInt(res.error)===0&&res.data.result)){

                sessionStorage.clear();

                localStorage.removeItem('LgBaseUserInfo');

                localStorage.removeItem('token');

                window.location.href = config.HashPrevProxy+"/html/admDisconnect?lg_preurl=" + preUrl;

            }else{

                loginApi({token,method:"GetUserInfo",params:'000'}).then(res=>{

                    if (parseInt(res.error)===0&&res.data){

                        let UserInfo = {};

                        for (let [key, value] of Object.entries(res.data)) {
                            if (key === "PhotoPath") {
                                let date = new Date();
                                let time = date.getTime();
                                value = value + "?T=" + time;
                            }
                            UserInfo[key] = decodeURIComponent(value);
                        }

                        sessionStorage.setItem("UserInfo", JSON.stringify(UserInfo));

                    }

                });

            }

        },err=>{//错误的情况下

            sessionStorage.clear();

            localStorage.removeItem('LgBaseUserInfo');

            localStorage.removeItem('token');

            window.location.href = config.HashPrevProxy+"/html/admDisconnect?lg_preurl=" + preUrl;

        })

    }

};


//循环查询token
export const checkTokenRepeat = () =>{

    setInterval(()=>{

        const session_token = sessionStorage.getItem("token");

        const url_token = getQueryVariable("lg_tk"); //lg_tk为链接上带的token

        const local_token = localStorage.getItem("token");

        const preUrl = encodeURIComponent(Public.getLg_tk(window.location.href));

        const url = window.location.href;

        if (!session_token && !url_token && !local_token) {

            if (!url.includes("html/admDisconnect")&&!getQueryVariable("lg_preurl")) {

                sessionStorage.clear();

                localStorage.removeItem('LgBaseUserInfo');

                localStorage.removeItem('token');

                window.location.href =config.HashPrevProxy+ "/html/admDisconnect?lg_preurl=" + preUrl;

            }

        }else{

            const token = url_token||local_token||session_token;

            loginApi({token,method:"tokenCheck",params:'000'}).then(res=>{ //如果有返回值

                if (!(parseInt(res.error)===0&&res.data.result)){

                    sessionStorage.clear();

                    localStorage.removeItem('LgBaseUserInfo');

                    localStorage.removeItem('token');

                    window.location.href = config.HashPrevProxy+"/html/admDisconnect?lg_preurl=" + preUrl;

                }

            },err=>{//错误的情况下

                sessionStorage.clear();

                localStorage.removeItem('LgBaseUserInfo');

                localStorage.removeItem('token');

                window.location.href = config.HashPrevProxy+"/html/admDisconnect?lg_preurl=" + preUrl;

            })

        }

    },60000);


};


//先查询用户名，再查询是否在线
export const checkIsOnline = () => {

    setInterval(()=>{

        const lastTime = localStorage.getItem('LgBaseCheckTime');

        const UserInfo = sessionStorage.getItem("UserInfo");

        if (!UserInfo){

            checkTokenOnce();

        }

    },500)

};


//定时获取最新的用户信息5分钟
export const updateUserInfo = () => {

    setInterval(()=>{

        const token = localStorage.getItem("token");

        loginApi({token,method:"GetUserInfo",params:'000'}).then(res=>{

            if (parseInt(res.error)===0&&res.data){

                let UserInfo = {};

                for (let [key, value] of Object.entries(res.data)) {
                    if (key === "PhotoPath") {
                        let date = new Date();
                        let time = date.getTime();
                        value = value + "?T=" + time;
                    }
                    UserInfo[key] = decodeURIComponent(value);
                }

                sessionStorage.setItem("UserInfo", JSON.stringify(UserInfo));

            }

        });

    },300000);

};

//界面初次加载获取用户信息和验证token
export const firstPageLoad = (func=()=>{}) => {

    const session_token = sessionStorage.getItem("token");

    const {WebRootUrl=''} = sessionStorage.getItem("LgBasePlatformInfo")?JSON.parse(sessionStorage.getItem("LgBasePlatformInfo")):{};

    const url_token = getQueryVariable("lg_tk"); //lg_tk为链接上带的token

    const local_token = localStorage.getItem("token");

    const preUrl = encodeURIComponent(Public.getLg_tk(window.location.href));

    const url = window.location.href;


    if (!session_token && !url_token && !local_token) {

        if (!url.includes("html/admDisconnect")&&!getQueryVariable("lg_preurl")) {

            sessionStorage.clear();

            localStorage.removeItem('token');

            window.location.href = WebRootUrl+"/UserMgr/Login/Login.aspx?lg_preurl="+preUrl;

        }

    }else{

        const token = url_token||local_token||session_token;

        loginApi({token,method:"tokenCheck",params:'000'}).then(res=>{ //如果有返回值

            if (!(parseInt(res.error)===0&&res.data.result)){

                sessionStorage.clear();

                localStorage.removeItem('token');

                window.location.href = WebRootUrl+"/UserMgr/Login/Login.aspx?lg_preurl="+preUrl;

            }else{//token没问题的情况下



                loginApi({token,method:"GetUserInfo",params:'000'}).then(res=>{

                    if (parseInt(res.error)===0&&res.data){

                        if (parseInt(res.data.LockerState)===1){

                            let UserInfo = {};

                            for (let [key, value] of Object.entries(res.data)) {
                                if (key === "PhotoPath") {
                                    let date = new Date();
                                    let time = date.getTime();
                                    value = value + "?T=" + time;
                                }
                                UserInfo[key] = decodeURIComponent(value);
                            }

                            sessionStorage.setItem("token",token);

                            localStorage.setItem("token",token);

                            sessionStorage.setItem("UserInfo", JSON.stringify(UserInfo));


                            updateUserInfo();

                            checkTokenRepeat();

                            checkIsOnline();

                            func();

                        }else{

                            const {WebRootUrl=''} = sessionStorage.getItem("LgBasePlatformInfo")?JSON.parse(sessionStorage.getItem("LgBasePlatformInfo")):{};

                            window.location.href = WebRootUrl+'LockerMgr/ErrorTips.aspx?ErrorCode='+res.data.LockerState;

                        }

                    }else{//获取用户信息失败

                        LogOut()

                    }

                },err=>{

                    LogOut()

                });

            }

        },err=>{//错误的情况下

            sessionStorage.clear();

            localStorage.removeItem('LgBaseUserInfo');

            localStorage.removeItem('token');

            window.location.href = LoginServerRootUrl+"/UserMgr/Login/Login.aspx?lg_preurl="+preUrl;

        });

    }

};
