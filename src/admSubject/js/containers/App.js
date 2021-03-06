import React, { Component } from "react";
import { Menu, Loading, Alert } from "../../../common";
import { connect } from "react-redux";

import Frame from "../../../common/Frame";

import history from "./history";

import logo from "../../images/SubjectLogo.png";
//import TimeBanner from '../component/TimeBanner'
import config from "../../../common/js/config";

import Subject from "../component/Subject";

import "../../scss/index.scss";

import actions from "../actions";

import $ from "jquery";

import { QueryPower, QueryAdminPower } from "../../../common/js/power";

import { getQueryVariable } from "../../../common/js/disconnect";
import ImportFile from "./ImportFile";

const SUBJECT_MODULEID = "000-2-0-18"; //学科管理

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInitGuide: false,
      Import: false, //导入
      ImportData: {
        course: { subtitle: "导入课程", route: "course" },
        subject: { subtitle: "导入学科", route: "subject" },
      },
    };
  }

  componentWillMount() {
    // 获取接口数据

    //   简单点，不做路由监听了，本身路由变化就是打开新界面
    let { ImportData } = this.state;
    let { dispatch } = this.props;
    if (history.location) {
      let { pathname } = history.location;
      let path = pathname.slice(1).split("/");

      if (path[0] === "ImportFile" && ImportData[path[1]]) {
        //只管导入和对应导入界面的
        this.setState({ Import: ImportData[path[1]] });
        dispatch({type:actions.UpUIState.APP_LOADING_CLOSE});
      }
    }
    history.listen(() => {
      //路由监听
      let route = history.location.pathname;
      // console.log(route)
    });
  }

  onAppAlertOK() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
    //window.location.href = "/html/login"
  }
  onAppAlertCancel() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertClose() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  // 请求每个组件主要渲染的数据
  requestData = (route) => {
    const { dispatch, DataState } = this.props;

    if (
      !DataState.LoginUser.SchoolID &&
      !JSON.parse(sessionStorage.getItem("UserInfo"))
    ) {
      return;
    }

    let UserMsg = DataState.LoginUser.SchoolID
      ? DataState.LoginUser
      : JSON.parse(sessionStorage.getItem("UserInfo"));
    // console.log(DataState.LoginUser.SchoolID,UserMsg)

    if (parseInt(UserMsg.UserType) === 7 || parseInt(UserMsg.UserType) === 10) {
      dispatch(
        actions.UpDataState.getPeriodMsg(
          "/GetPeriodBySchoolID?schoolID=" + UserMsg.SchoolID
        )
      );

      dispatch(
        actions.UpDataState.getSubjectMsg(
          "/GetSchoolSubjectInfo?schoolID=" +
            UserMsg.SchoolID +
            "&periodID=&pageSize=8&pageIndex=1"
        )
      );

      dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
    } else {
      let havePower = QueryPower({
        UserInfo: UserMsg,
        ModuleID: SUBJECT_MODULEID,
      });

      havePower.then((res) => {
        if (res) {
          let pathArr = route.split("/");
          let handleRoute = pathArr[1];
          // console.log(route)
          if (route === "/") {
            //dispatch(actions.UpDataState.getAllUserPreview('/ArchivesAll'));
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            if (!this.props.DataState.PeriodMsd)
              dispatch(
                actions.UpDataState.getPeriodMsg(
                  "/GetPeriodBySchoolID?schoolID=" + UserMsg.SchoolID
                )
              );
            dispatch(
              actions.UpDataState.getSubjectMsg(
                "/GetSchoolSubjectInfo?schoolID=" +
                  UserMsg.SchoolID +
                  "&periodID=&pageSize=8&pageIndex=1"
              )
            );
            // if (!this.props.DataState.SubjectMsg.addSubjectMsg)
            //     dispatch(actions.UpDataState.getSubjectModalMsg('/GetSubjectInfoForAddBySchool?schoolID=' + UserMsg.SchoolID));
          } else {
            history.push("/");
          }
        }
      });
    }

    if (getQueryVariable("isInitGuide")) {
      this.setState({ isInitGuide: true });
    }
  };

  pageInit() {
    const { dispatch } = this.props;

    let route = history.location.pathname;

    let token = sessionStorage.getItem("token");

    const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

    dispatch(actions.UpDataState.getLoginUser(UserInfo));

    this.Frame.getIdentity({ ModuleID: "000006" }, (identify) => {
      this.requestData(route);
    });
  }

  onRef(ref) {
    this.Frame = ref;
  }

  render() {
    const { UIState, DataState } = this.props;

    let UserID = DataState.LoginUser.UserID;
    const { Import } = this.state;

    return (
      <React.Fragment>
        <Loading
          opacity={false}
          tip="加载中..."
          size="large"
          spinning={UIState.AppLoading.appLoading}
        >
          <Frame
            pageInit={this.pageInit.bind(this)}
            module={{
              cnname: "学科管理",
              enname: "Subject Management",
              image: logo,
              subtitle: Import && Import.subtitle,
            }}
            onRef={this.onRef.bind(this)}
            className="myFrame"
            type="triangle"
            showBarner={false}
            showLeftMenu={false}
          >
            <div ref="frame-right-content">
              {UserID ? (
                Import ? (
                  <ImportFile
                    title={Import.subtitle}
                    route={Import.route}
                  ></ImportFile>
                ) : (
                  <Subject></Subject>
                )
              ) : (
                ""
              )}
            </div>
          </Frame>
        </Loading>
        <Alert
          show={UIState.AppAlert.appAlert}
          className={`${this.state.isInitGuide ? "isInitGuide" : ""}`}
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
