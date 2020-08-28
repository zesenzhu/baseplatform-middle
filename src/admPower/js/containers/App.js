import React, { Component } from "react";
import { Menu, Loading, Alert, LeftMenu, Modal } from "../../../common";
import Frame from "../../../common/Frame";
import { connect } from "react-redux";
import CONFIG from "../../../common/js/config";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import history from "./history";
import logo from "../../images/img-userPower.png";
import PowerContent from "../component/PowerContent";
import "../../scss/index.scss";
import $ from "jquery";
import { postData, getData } from "../../../common/js/fetch";
import {
  TokenCheck_Connect,
  TokenCheck,
  getUserInfo,
} from "../../../common/js/disconnect";
import { QueryPower, QueryAdminPower } from "../../../common/js/power";

import actions from "../actions";
//import { urlAll, proxy } from './config'
const POWER_MODULEID = "000-2-0-09"; //用户权限管理模块ID

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      PowerMsg: [],
    };
  }

  QuerySelfPower() {
    const { DataState, UIState, dispatch } = this.props;

    let userMsg = DataState.LoginUser.SchoolID
      ? DataState.LoginUser
      : JSON.parse(sessionStorage.getItem("UserInfo"));
    let havePower = QueryPower({
      UserInfo: userMsg,
      ModuleID: POWER_MODULEID,
    });
    havePower.then((res) => {
      if (res) {
        dispatch(
          actions.UpDataState.getUserPowerMsg(
            "/GetGlobalUserPower?SchoolID=" + userMsg.SchoolID
          )
        );

        dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
        dispatch({ type: actions.UpUIState.RIGHT_LOADING_OPEN });
      }
    });
  }

  componentDidMount() {
    const { dispatch, DataState } = this.props;
    let route = history.location.pathname;
    //判断token是否存在
    //判断token是否存在
    let that = this;

    TokenCheck_Connect(false, () => {
      let token = sessionStorage.getItem("token");
      let { LockerVersion } = JSON.parse(
        //校园基础信息管理 XG5.2-免费版,1为基础版
        sessionStorage.getItem("LgBasePlatformInfo")
      )?JSON.parse(
        //校园基础信息管理 XG5.2-免费版,1为基础版
        sessionStorage.getItem("LgBasePlatformInfo")
      ):{};
      if (LockerVersion === "1") {
        window.location.href =
          config.ErrorProxy + "/LockerMgr/ErrorTips.aspx?ErrorCode=-3";
      }
      // sessionStorage.setItem('UserInfo', '')
      if (sessionStorage.getItem("UserInfo")) {
        dispatch(
          actions.UpDataState.getLoginUser(
            JSON.parse(sessionStorage.getItem("UserInfo"))
          )
        );
        that.QuerySelfPower();
      } else {
        getUserInfo(token, "000");
        let timeRun = setInterval(function () {
          if (sessionStorage.getItem("UserInfo")) {
            dispatch(
              actions.UpDataState.getLoginUser(
                JSON.parse(sessionStorage.getItem("UserInfo"))
              )
            );
            that.QuerySelfPower();
            clearInterval(timeRun);
          }
        }, 1000);
        //dispatch(actions.UpDataState.getLoginUser(JSON.parse(sessionStorage.getItem('UserInfo'))));
      }
    });

    //

    history.listen(() => {
      //路由监听
      let route = history.location.pathname;
      //this.requestData(route);
      //this.requestData(route);
    });
  }

  componentWillUpdate() {
    //this.requestData(route);
  }
  componentDidUpdate() {}
  componentWillReceiveProps(nextProps) {
    const { DataState, UIState, dispatch } = nextProps;
    //console.log(DataState.LoginUser.SchoolID,'ddd',!DataState.GetUserPowerMsg.Power.student)
    if (
      DataState.LoginUser.SchoolID &&
      !DataState.GetUserPowerMsg.Power.student
    ) {
      let school = DataState.LoginUser.SchoolID;

      dispatch(
        actions.UpDataState.getUserPowerMsg(
          "/GetGlobalUserPower?SchoolID=" + school
        )
      );
    }
  }

  onAppAlertOK() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
    window.location.href = "/html/login";
  }
  onAppAlertCancel() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertClose() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }

  render() {
    const { UIState, DataState } = this.props;
    let UserID = DataState.LoginUser.UserID;

    return (
      <React.Fragment>
        <Loading
          tip="加载中..."
          size="large"
          opacity={false}
          spinning={UIState.AppLoading.appLoading}
        >
          <Frame
            userInfo={{
              name: DataState.LoginUser.UserName,
              image: DataState.LoginUser.PhotoPath,
            }}
            module={{
              cnname: "用户权限管理",
              enname: "User Access Management",
              image: logo,
            }}
            type="triangle"
            showBarner={false}
            showLeftMenu={false}
          >
            <div ref="frame-right-content">
              {UserID ? (
                <Loading
                  opacity={false}
                  tip="加载中..."
                  size="large"
                  spinning={UIState.AppLoading.rightLoading}
                >
                  <PowerContent></PowerContent>
                </Loading>
              ) : (
                ""
              )}
            </div>
          </Frame>
        </Loading>
        <Alert
          show={UIState.AppAlert.appAlert}
          type={UIState.AppAlert.type}
          abstract={UIState.AppAlert.littleTitle}
          title={UIState.AppAlert.title}
          onOk={UIState.AppAlert.onOk}
          onHide={UIState.AppAlert.onHide}
          onCancel={UIState.AppAlert.onCancel}
          onClose={UIState.AppAlert.onClose}
        ></Alert>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState,
  };
};
export default connect(mapStateToProps)(App);
