import React, { useEffect, useState, useCallback } from "react";

import { connect } from "react-redux";

import "./assets/scss/index.scss";

import { Loading, Alert, CheckBox } from "../common";

import { getQueryVariable } from "../common/js/disconnect";

import {
  getNewTkUrl,
  goToNextPage,
  decodeObjValue,
  removeSlashUrl,
  downLoadFile,
  clearSessionStorage,
} from "./api/utils";

import { GetBaseInfo, loginApi, GetSystemsMainServer } from "./api/index";

import {
  changeSkin,
  changeSetting,
  changePluginStatus,
  getMacID,
} from "./store/commSetting";

import { showWarnAlert, hideAlert } from "./store/appAlert";

import Bs2Cs from "./api/Bs2CsCommon";

import TopFloor from "./application/TopFloor";

import BottomFloor from "./application/BottomFloor";
import ChangePwdModal from "./components/ChangePwdModal";

function App(props) {
  const [AppLoading, setAppLoading] = useState(true);

  //智慧校园的链接
  const [aiSchoolLink, setAiSchoolLink] = useState({
    schoolWeb: "",

    education: "",

    downLoad: "",
  });

  //默认不选择不再提示

  const [unCheckedTips, setUnCheckedTips] = useState(false);

  //监测插件包和MacID
  const [checkBaseMac, setCheckBaseMac] = useState(null);

  const { commSetting, slider, appAlert, dispatch } = props;

  const { skin, WebIndexUrl, ClinetDownUrl } = commSetting;

  useEffect(() => {
    const url = getQueryVariable("lg_preurl")
      ? getQueryVariable("lg_preurl")
      : WebIndexUrl;

    const urlObj = getNewTkUrl({ preUrl: url });

    let nexUrl = "";

    const uriMain = urlObj.newUrl.split("#/")[0];

    const hashUri = urlObj.newUrl.split("#/")[1]
      ? "#/" + urlObj.newUrl.split("#/")[1]
      : "";

    switch (urlObj.type) {
      case 1:
        if (urlObj.nexType === 1) {
          nexUrl = uriMain + "?lg_tk=" + hashUri;
        } else {
          nexUrl = uriMain + "&lg_tk=" + hashUri;
        }

        break;

      case 2:
        nexUrl = uriMain + "&lg_tk=" + hashUri;

        break;

      case 3:
        nexUrl = uriMain + "?lg_tk=" + hashUri;

        break;
    }

    console.log(nexUrl);

    window.top._goUrl = GetCharCodes(nexUrl);
  }, [WebIndexUrl]);

  //异步获取数据
  useEffect(() => {
    GetBaseInfo({ dispatch }).then((data) => {
      if (data) {
        sessionStorage.setItem("LgBasePlatformInfo", JSON.stringify(data));

        let skin = "";

        switch (parseInt(data.ProductType)) {
          case 1:
            skin = "dark_blue";

            break;

          case 2:
            skin = "dark_tech";

            break;

          case 0:

          case 3:
            skin = "ai_school";

            getAiSchoolLink();

            break;

          case 4:
            skin = "cloud_schoolroom";

            break;

          case 5:
            skin = "ai_exam";

            break;

          case 6:
            skin = "ai_practice";

            break;

          default:
            skin = "dark_blue";
        }

        if (
          parseInt(data.ProductType) === 2 ||
          parseInt(data.ProductType) === 5
        ) {
          const appid = "000";

          const access_token = "4d39af1bff534514e24948568b750f6c";

          const sysIDs = parseInt(data.ProductType) === 2 ? "990,751" : 751;

          GetSystemsMainServer({ appid, access_token, sysIDs, dispatch }).then(
            (res) => {
              if (res) {
                const list = res && res.length > 0 ? res : [];

                let IntroWebSvrAddr = "",
                  PCDownLoadWebSvrAddr = "";

                list.map((i) => {
                  if (parseInt(i.SysID) === 990) {
                    IntroWebSvrAddr = i.WebSvrAddr;
                  }

                  if (parseInt(i.SysID) === 751) {
                    PCDownLoadWebSvrAddr = i.WebSvrAddr;
                  }
                });

                data["IntroWebSvrAddr"] = IntroWebSvrAddr;

                data["PCDownLoadWebSvrAddr"] = PCDownLoadWebSvrAddr;
                if (
                  parseInt(data.ProductType) === 5 &&
                  PCDownLoadWebSvrAddr &&
                  getQueryVariable("from_ai_test") !== "1"
                ) {
                  window.location.replace(PCDownLoadWebSvrAddr);
                  return;
                }
              }

              initData(skin, data);
            }
          );
        } else if (parseInt(data.ProductType) === 6) {
          const appid = "000";

          const access_token = "4d39af1bff534514e24948568b750f6c";

          const sysIDs = "D00";

          GetSystemsMainServer({ appid, access_token, sysIDs, dispatch }).then(
            (res) => {
              if (res) {
                const list = res && res.length > 0 ? res : [];

                let PCDownLoadWebSvrAddr = "";

                list.map((i) => {
                  PCDownLoadWebSvrAddr = i.WebSvrAddr;
                });

                data["PCDownLoadWebSvrAddr"] = PCDownLoadWebSvrAddr;
              }

              initData(skin, data);
            }
          );
        } else {
          initData(skin, data);
        }
      }
    });

    window.changeStyle = changeStyle;

    window.top.GetCharString = GetCharString;

    return () => {
      setCheckBaseMac(null);
    };
  }, []);

  const initData = (skin, data) => {
    dispatch(changeSetting({ skin, ...data, footer: data.ProVersion }));

    setAppLoading(false);

    //判断锁控是否正常

    if (parseInt(data.LockerState) === 1 && data.ClinetDownUrl) {
      const token = sessionStorage.getItem("token")
        ? sessionStorage.getItem("token")
        : localStorage.getItem("token");

      const lg_sysid = getQueryVariable("lg_sysid")
        ? getQueryVariable("lg_sysid")
        : "000";

      //再判断是否已登录
      if (token) {
        loginApi({ token: token, method: "TokenCheck", params: lg_sysid }).then(
          (res) => {
            if (res.data.result === true) {
              //如果是已登录判断用户类型再做跳转,否则都要做检查基础平台插件

              localStorage.setItem("token", token);

              sessionStorage.setItem("token", token);

              loginApi({
                token,
                method: "GetUserInfo",
                params: lg_sysid ? lg_sysid : "000",
              }).then((result) => {
                //如果成功获取到用户信息
                if (result.data && result.error === "0") {
                  const UserInfo = decodeObjValue(result.data);

                  sessionStorage.setItem("UserInfo", JSON.stringify(UserInfo));

                  goToNextPage({
                    token,
                    WebIndexUrl: data.WebIndexUrl,
                    UserType: UserInfo.UserType,
                    dispatch,
                  });
                }
              });
            } else {
              // sessionStorage.clear();

              clearSessionStorage("LgBasePlatformInfo");

              localStorage.removeItem("token");

              //当token失效的时候再判断MacID是否登录

              //每一次都做一次监测而不是直接拿之前的Mac地址
              checkBase({
                ProductName: data.ProductName,
                ClinetDownUrl: data.ClinetDownUrl,
                WebIndexUrl: data.WebIndexUrl,
              });
            }
          },
          (resp, err) => {
            // sessionStorage.clear();

            clearSessionStorage("LgBasePlatformInfo");

            localStorage.removeItem("token");

            //每一次都做一次监测而不是直接拿之前的Mac地址

            checkBase({
              ProductName: data.ProductName,
              ClinetDownUrl: data.ClinetDownUrl,
              WebIndexUrl: data.WebIndexUrl,
            });
          }
        );
      } else {
        //没有登录的情况下判断是否有基础插件包

        //2020-08-19

        //每一次都做一次监测而不是直接拿之前的Mac地址

        checkBase({
          ProductName: data.ProductName,
          ClinetDownUrl: data.ClinetDownUrl,
          WebIndexUrl: data.WebIndexUrl,
        });
      }
    } else {
      //锁控不正常的情况下显示锁控信息，清除登录信息

      setAppLoading(false);

      document.title = data.ProductName;

      // sessionStorage.clear();

      clearSessionStorage("LgBasePlatformInfo");

      localStorage.removeItem("token");

      dispatch(
        showWarnAlert({
          title: `加密锁异常,${data.LockerMsg}`,
          okShow: "n",
          cancelTitle: "确定",
          cancel: () => {
            window.location.reload();
          },
          close: () => {
            window.location.reload();
          },
        })
      );
    }
  };

  //改变style风格样式,对外抛出
  const changeStyle = () => {
    dispatch(changeSkin());
  };

  //下载基础插件包
  const downLoadBase = ({ dispatch, ClinetDownUrl }) => {
    dispatch(hideAlert(dispatch));

    downLoadFile(ClinetDownUrl);
  };

  //检查基础插件包
  const checkBase = ({ ProductName, ClinetDownUrl, WebIndexUrl }) => {
    let BstoCs = new Bs2Cs(
      (result) => {
        document.title = ProductName;

        if (!result) {
          const NoCheck = localStorage.getItem("LgBasePluginsNoCheck");

          if (NoCheck !== "true") {
            dispatch(
              showWarnAlert({
                title: (
                  <div className={"prompt"}>
                    <div className={"title"}>
                      检测到未安装基础插件包，为确保功能正常，请先下载安装
                    </div>

                    <div className={"no-check-tips"}>
                      <CheckBox
                        checked={unCheckedTips}
                        onClick={(e) => baseCheckChange(ClinetDownUrl)}
                      >
                        不再提示
                      </CheckBox>
                    </div>
                  </div>
                ),

                ok: (e) => downLoadBase({ ClinetDownUrl, dispatch }),

                okTitle: "确定下载",
              })
            );
          }

          dispatch(changePluginStatus(false));

          setAppLoading(false);

          //createCheckBaseMacFc();
        } else {
          dispatch(changePluginStatus(true));

          //无论有没有MacID都再次重新获取一下

          result.GetMacIDs();
        }
      },
      (macObj) => {
        const macId = JSON.parse(macObj)["LocalMacIDs"].join(",");
        try {
          let LgBasePlatformInfo = JSON.parse(
            sessionStorage.getItem("LgBasePlatformInfo")
          );
          if (LgBasePlatformInfo !== null && macId) {
            let OpenSetInfo = [];
            LgBasePlatformInfo.OpenSetInfo instanceof Array &&
              LgBasePlatformInfo.OpenSetInfo.forEach((child, index) => {
                let { OpenUrl } = child;
                if (typeof OpenUrl === "string") {
                  let OpenUrlArray = OpenUrl.split("&Target=");
                  OpenUrlArray[0] += GetCharCodes(macId);
                  OpenSetInfo.push({
                    ...child,
                    OpenUrl: OpenUrlArray.join("&Target="),
                  });
                }
              });
            LgBasePlatformInfo.OpenSetInfo = OpenSetInfo;
          }

          dispatch(
            changeSetting({ OpenSetInfo: LgBasePlatformInfo.OpenSetInfo })
          );
        } catch (e) {}
        //存储MacID
        localStorage.setItem("LgBaseMacID", macId);

        if (macId) {
          loginApi({ method: "GetTokenByMac", params: macId }).then((d) => {
            if (d.error === "0" && d.data.token) {
              localStorage.setItem("token", d.data.token);

              sessionStorage.setItem("token", d.data.token);

              loginApi({
                token: d.data.token,
                method: "GetUserInfo",
                params: "000",
              }).then((result) => {
                //如果成功获取到用户信息
                if (result.data && result.error === "0") {
                  const UserInfo = decodeObjValue(result.data);

                  sessionStorage.setItem("UserInfo", JSON.stringify(UserInfo));

                  goToNextPage({
                    token: d.data.token,
                    WebIndexUrl,
                    UserType: UserInfo.UserType,
                    dispatch,
                  });
                }

                setAppLoading(false);
              });
            } else {
              setAppLoading(false);
            }
          });
        } else {
          setAppLoading(false);
        }

        //createCheckBaseMacFc();
      }
    );

    window.BstoCs = BstoCs;
  };

  //获取智慧校园的右上角产品地址

  const getAiSchoolLink = () => {
    GetSystemsMainServer({
      appid: "000",
      access_token: "4d39af1bff534514e24948568b750f6c",
      sysIDs: "E46,E34,260",
      dispatch,
    }).then((res) => {
      const list = res && res.length > 0 ? res : [];

      let downLoad = "",
        education = "",
        schoolWeb = "";

      list.map((i) => {
        switch (i.SysID) {
          case "260":
            downLoad = removeSlashUrl(i.WebSvrAddr ? i.WebSvrAddr : "");

            break;

          case "E46":
            schoolWeb = removeSlashUrl(i.WebSvrAddr ? i.WebSvrAddr : "");

            break;

          case "E34":
            education = removeSlashUrl(i.WebSvrAddr ? i.WebSvrAddr : "");

            break;
        }
      });

      setAiSchoolLink((d) => ({ ...d, downLoad, education, schoolWeb }));
    });
  };

  //切换是否提示的按钮

  const baseCheckChange = (ClinetDownUrl) => {
    setUnCheckedTips((d) => {
      localStorage.setItem("LgBasePluginsNoCheck", !d);

      dispatch(
        showWarnAlert({
          title: (
            <div className={"prompt"}>
              <div className={"title"}>
                检测到未安装基础插件包，为确保功能正常，请先下载安装
              </div>

              <div className={"no-check-tips"}>
                <CheckBox
                  checked={!d}
                  onClick={(e) => baseCheckChange(ClinetDownUrl)}
                >
                  不再提示
                </CheckBox>
              </div>
            </div>
          ),

          ok: (e) => downLoadBase({ ClinetDownUrl, dispatch }),

          okTitle: "确定下载",
        })
      );

      return !d;
    });
  };

  const GetCharString = (codes) => {
    var str = "";
    try {
      for (var i = 0; i < codes.length; i++) {
        str += String.fromCharCode(parseInt(codes[i] + codes[i + 1], 16));
        i++;
      }
    } catch (e) {}
    return str;
  };

  const GetCharCodes = (str) => {
    var codes = "";
    try {
      for (var i = 0; i < str.length; i++) {
        codes += str.charCodeAt(i).toString(16).toUpperCase();
      }
    } catch (e) {}
    return codes;
  };

  //每隔1分钟左右监测一下MacID和基础插件包

  const createCheckBaseMacFc = useCallback(() => {
    const timmer = setInterval(() => {
      new Bs2Cs(
        (res) => {
          if (!res) {
            dispatch(changePluginStatus(false));
          } else {
            dispatch(changePluginStatus(true));

            res.GetMacIDs();
          }
        },
        (macObj) => {
          const macId = JSON.parse(macObj)["LocalMacIDs"].join(",");

          //存储MacID
          localStorage.setItem("LgBaseMacID", macId);

          if (macId) {
            loginApi({ method: "GetTokenByMac", params: macId }).then((d) => {
              if (d.error === "0" && d.data.token) {
                localStorage.setItem("token", d.data.token);

                sessionStorage.setItem("token", d.data.token);

                loginApi({
                  token: d.data.token,
                  method: "GetUserInfo",
                  params: "000",
                }).then((result) => {
                  //如果成功获取到用户信息
                  if (result.data && result.error === "0") {
                    const UserInfo = decodeObjValue(result.data);

                    sessionStorage.setItem(
                      "UserInfo",
                      JSON.stringify(UserInfo)
                    );

                    goToNextPage({
                      token: d.data.token,
                      WebIndexUrl,
                      UserType: UserInfo.UserType,
                      dispatch,
                    });
                  }

                  setAppLoading(false);
                });
              } else {
                setAppLoading(false);
              }
            });
          }
        }
      );
    }, 60000);

    setCheckBaseMac(timmer);
  }, []);

  return (
    <div className={`app ${skin}`}>
      {AppLoading ? (
        <Loading tip={"加载中,请稍后..."}></Loading>
      ) : (
        <>
          <TopFloor aiSchoolLink={aiSchoolLink}></TopFloor>

          <BottomFloor></BottomFloor>
        </>
      )}

      <Alert
        className={skin}
        type={appAlert.type}
        okShow={appAlert.okShow}
        cancelShow={appAlert.cancelShow}
        onClose={appAlert.close}
        show={appAlert.show}
        title={appAlert.title}
        onOk={appAlert.ok}
        onCancel={appAlert.cancel}
        okTitle={appAlert.okTitle}
        cancelTitle={appAlert.cancelTitle}
        onHide={appAlert.hide}

      ></Alert>
      <ChangePwdModal></ChangePwdModal>

    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(App);
