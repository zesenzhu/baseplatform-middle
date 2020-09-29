import React, { Component, createRef } from "react";
import { Menu, Loading, Alert, Modal, Button, Empty } from "../../../common";
import { connect } from "react-redux";
import Frame from "../../../common/Frame";

import { Modal as AntdModal, Input } from "antd";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
  Redirect,
} from "react-router-dom";
import Main from "../component/Main";
import history from "./history";
import logo from "../../images/setting_logo.png";
//import TimeBanner from '../component/TimeBanner'
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import {
  TokenCheck_Connect,
  TokenCheck,
  getUserInfo,
} from "../../../common/js/disconnect";
// import WebsiteCustom from '../component/WebsiteCustom'
import "../../scss/index.scss";
import actions from "../actions";
//import { urlAll, proxy } from './config'
import TimeBanner from "../component/TimeBanner";
import TermSetting from "../component/TermSetting";
let { UpDataState, UpUIState } = actions;
class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      UserMsg: props.DataState.LoginUser,
    };
    this.BannerRef = createRef();
  }

  componentWillMount() {
    const { dispatch, DataState } = this.props;
    let route = history.location.pathname;
    //判断token是否存在
    let that = this;

    // TokenCheck_Connect(false, () => {
    //   //sessionStorage.setItem('token','')
    //   let token = sessionStorage.getItem("token");
    //   // sessionStorage.setItem('UserInfo', '')
    //   if (sessionStorage.getItem("UserInfo")) {
    //     dispatch(
    //       actions.UpDataState.getLoginUser(
    //         JSON.parse(sessionStorage.getItem("UserInfo"))
    //       )
    //     );
    //     that.RequestData();
    //   } else {
    //     getUserInfo(token, "000");
    //     let timeRun = setInterval(function () {
    //       if (sessionStorage.getItem("UserInfo")) {
    //         dispatch(
    //           actions.UpDataState.getLoginUser(
    //             JSON.parse(sessionStorage.getItem("UserInfo"))
    //           )
    //         );
    //         that.RequestData();

    //         clearInterval(timeRun);
    //       }
    //     }, 1000);
    //     //dispatch(actions.UpDataState.getLoginUser(JSON.parse(sessionStorage.getItem('UserInfo'))));
    //   }

    //   history.listen(() => {
    //     this.RequestData();
    //   });
    // });
  }
  pageInit = () => {
    this.RequestData();
    history.listen(() => {
      this.RequestData();
    });
  };
  // 第一次访问所要请求的接口
  RequestData = () => {
    const { dispatch, DataState } = this.props;
    let { onSelectBar } = this.BannerRef.current;
    if (!DataState.LoginUser.SchoolID) {
      dispatch(
        actions.UpDataState.getLoginUser(
          JSON.parse(sessionStorage.getItem("UserInfo"))
        )
      );
    }

    let userMsg = DataState.LoginUser.SchoolID
      ? DataState.LoginUser
      : JSON.parse(sessionStorage.getItem("UserInfo"));

    // console.log(userMsg.UserType,userMsg.UserClass,userMsg.UserType !== "6" || userMsg.UserClass !== "2")

    if (userMsg.UserType !== "6" || userMsg.UserClass !== "2") {
      window.location.href = CONFIG.ErrorProxy + "/Error.aspx?errcode=E011";
      return;
    }
    dispatch({ type: UpUIState.APP_LOADING_CLOSE });
    let route = history.location.pathname;
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    if (handleRoute === "School") {
      // onSelectBar('School');

      dispatch(actions.UpDataState.QuerySchoolInfo({}));
    dispatch(UpDataState.getImgUrlProxy());

    } else if (handleRoute === "Term") {
      // onSelectBar('Term');

      dispatch(actions.UpDataState.GetCurrentTermInfoForMulti({}));
    } else {
      history.push("/School");
      dispatch(actions.UpDataState.QuerySchoolInfo({}));
    }
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
    let {
      CommonData: { List },
    } = DataState;
    let route = history.location.pathname;
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
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
              image: DataState.LoginUser.PhotoPath,
            }}
            module={{
              // cnname: "学校信息管理",
              // enname: "School Information Management",
              cnname: "系统设置",
              enname: "System Settings",
              image: logo,
            }}
            className="myFrame"
            type="circle"
            showBarner={true}
            showLeftMenu={false}
            pageInit={this.pageInit}
          >
            <div ref="frame-time-barner">
              <TimeBanner
                AfterSelect={(e) => {
                  history.push("/" + e.value);
                }}
                SelectBar={handleRoute}
                ref={this.BannerRef}
                List={List}
              />
            </div>

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
              <Loading
                opacity={0.5}
                size="small"
                spinning={UIState.AppLoading.ContentLoading}
              >
                {UserID ? (
                  <Router exact>
                    <Route path="/School" exact component={Main}>
                      {/* <Redirect from="" to="/SchoolSetting" ></Redirect> */}
                    </Route>

                    <Route path="/Term" exact component={TermSetting}></Route>
                    {/* <Redirect from="/" to="/School"></Redirect> */}
                  </Router>
                ) : (
                  ""
                )}
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
const mapStateToProps = (state) => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState,
  };
};
export default connect(mapStateToProps)(App);
