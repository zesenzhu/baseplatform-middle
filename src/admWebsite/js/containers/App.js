import React, { Component } from "react";
import { Menu, Loading, Alert, Modal, Button, Empty } from "../../../common";
import { connect } from "react-redux";
import Frame from "../../../common/Frame";

import { Modal as AntdModal, Input } from "antd";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import Main from "../component/Main";
import history from "./history";
import logo from "../../images/icon-WebResources.png";
//import TimeBanner from '../component/TimeBanner'
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import {
  TokenCheck_Connect,
  TokenCheck,
  getUserInfo
} from "../../../common/js/disconnect";
// import WebsiteCustom from '../component/WebsiteCustom'
import "../../scss/index.scss";
import actions from "../actions";
//import { urlAll, proxy } from './config'
import { QueryPower, QueryAdminPower } from "../../../common/js/power";
const WEBSITE_MODULEID = "000-2-0-14"; //网站资源管理

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      UserMsg: props.DataState.LoginUser
    };
  }

  componentWillMount() {
    const { dispatch, DataState } = this.props;
    let route = history.location.pathname;
    //判断token是否存在
    let that = this;

    TokenCheck_Connect(false, () => {
      //sessionStorage.setItem('token','')
      let token = sessionStorage.getItem("token");
      // sessionStorage.setItem('UserInfo', '')
      if (sessionStorage.getItem("UserInfo")) {
        dispatch(
          actions.UpDataState.getLoginUser(
            JSON.parse(sessionStorage.getItem("UserInfo"))
          )
        );
        that.RequestData();
      } else {
        getUserInfo(token, "000");
        let timeRun = setInterval(function() {
          if (sessionStorage.getItem("UserInfo")) {
            dispatch(
              actions.UpDataState.getLoginUser(
                JSON.parse(sessionStorage.getItem("UserInfo"))
              )
            );
            that.RequestData();

            clearInterval(timeRun);
          }
        }, 1000);
        //dispatch(actions.UpDataState.getLoginUser(JSON.parse(sessionStorage.getItem('UserInfo'))));
      }

      history.listen(() => {
        this.RequestData();
      });
    });
  }

  // 第一次访问所要请求的接口
  RequestData = () => {
    const { dispatch, DataState } = this.props;

    if (
      !DataState.LoginUser.SchoolID &&
      !JSON.parse(sessionStorage.getItem("UserInfo"))
    ) {
      return;
    }
    let userMsg = DataState.LoginUser.SchoolID
      ? DataState.LoginUser
      : JSON.parse(sessionStorage.getItem("UserInfo"));
    // console.log(userMsg)

    let havePower = QueryPower({
      UserInfo: userMsg,
      ModuleID: WEBSITE_MODULEID
    });
    havePower.then(res => {
      if (res) {
        let route = history.location.pathname;
        let pathArr = route.split("/");
        let handleRoute = pathArr[1];
        if (handleRoute !== "") {
          history.push("/");
        }
        dispatch(
          actions.UpDataState.getSubjectData(
            "/SubjectResMgr/WebSiteMgr/GetSubjectList?schoolId=" +
              userMsg.SchoolID +
              "&periodId="
          )
        );
        dispatch(
          actions.UpDataState.getTypeData(
            "/SubjectResMgr/WebSiteMgr/GetTypeList?SubjectID=&Period=0"
          )
        );
        dispatch(
          actions.UpDataState.getPeriodData(
            "/SubjectResMgr/WebSiteMgr/GetPeriodList?schoolId=" +
              userMsg.SchoolID
          )
        );

        let urlData =
          "/SubjectResMgr/WebSiteMgr/GetWebsiteInfoList?TypeID=1&pageSize=8&currentIndex=1";
        dispatch(actions.UpDataState.getWebsiteResourceData(urlData));
      }
    });
  };

  //提示弹窗
  onAppAlertOK() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertCancel() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertClose() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  //自动关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };

  render() {
    const { UIState, DataState } = this.props;
    let UserID = DataState.LoginUser.UserID;

    return (
      <React.Fragment>
        <Loading
          opacity={false}
          tip="加载中..."
          size="large"
          spinning={UIState.AppLoading.appLoading}
        >
          <Frame
            userInfo={{
              name: DataState.LoginUser.UserName,
              image: DataState.LoginUser.PhotoPath
            }}
            module={{
              cnname: "网站资源管理",
              enname: "Web resources management",
              image: logo
            }}
            className="myFrame"
            type="circle"
            showBarner={false}
            showLeftMenu={false}
          >
            {/* <div ref="frame-time-barner"><TimeBanner /></div> */}

            <div
              className="box"
              //   style={{
              //     background:
              //       DataState.GetTeachingSolutionMsg.solutionData instanceof
              //         Array &&
              //       DataState.GetTeachingSolutionMsg.solutionData.length
              //         ? "transparent"
              //         : "#fff"
              //   }}
              ref="frame-right-content"
            >
              <Loading spinning={UIState.AppLoading.appLoading}>
                {UserID ? <Main></Main> : ""}
              </Loading>
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
const mapStateToProps = state => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState
  };
};
export default connect(mapStateToProps)(App);
