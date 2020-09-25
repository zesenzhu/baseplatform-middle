import React, { Component } from "react";
import { Frame, Menu, Loading, Alert } from "../../../common";
import { connect } from "react-redux";
import UserArchives from "../component/UserArchives";
import {
  TokenCheck_Connect,
  TokenCheck,
  getUserInfo,
} from "../../../common/js/disconnect";
import config from "../../../common/js/config";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import history from "./history";
import RegisterExamine from "../component/RegisterExamine";
import TeacherRegisterExamine from "../component/TeacherRegisterExamine";
import ImportFile from "../component/ImportFile";
// import logo from '../../images/admAriHeadImg-1.png'
// import TimeBanner from '../component/TimeBanner'
// import All from '../component/All'
// import Student from '../component/Student'
// import Teacher from '../component/Teacher'
// import Leader from '../component/Leader'
import "../../scss/index.scss";
import $ from "jquery";
import { getData } from "../../../common/js/fetch";
import actions from "../actions";
import { urlAll, proxy } from "./config";
import { QueryPower, QueryAdminPower } from "../../../common/js/power";
import UpDataState from "../actions/UpDataState";
import TeacherLogo from "../../images/teacher-logo.png";
import logo from "../../images/icon-logo.png";

const PROFILE_MODULEID = "000-2-0-05"; //用户档案管理模块ID

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      AdminPower: true,
    };
    let route = history.location.pathname;
    //判断token是否存在
    let that = this;

    TokenCheck_Connect(false, () => {
      // console.log('sss')
      let token = sessionStorage.getItem("token");
      // sessionStorage.setItem('UserInfo', '')
      if (sessionStorage.getItem("UserInfo")) {
        dispatch(
          actions.UpDataState.getLoginUser(
            JSON.parse(sessionStorage.getItem("UserInfo"))
          )
        );
        that.requestRegister();
        that.requestData(route);
      } else {
        getUserInfo(token, "000");
        let timeRun = setInterval(function () {
          if (sessionStorage.getItem("UserInfo")) {
            dispatch(
              actions.UpDataState.getLoginUser(
                JSON.parse(sessionStorage.getItem("UserInfo"))
              )
            );
            that.requestRegister();

            that.requestData(route);
            clearInterval(timeRun);
          }
        }, 1000);
        //dispatch(actions.UpDataState.getLoginUser(JSON.parse(sessionStorage.getItem('UserInfo'))));
      }
    });
  }

  componentWillMount() {
    const { dispatch } = this.props;
    this.handleMenu();
    let route = history.location.pathname;
    // 获取接口数据
    getData(config.PicProxy + "/Global/GetResHttpServerAddr")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 400) {
          //console.log(json.StatusCode)
        } else if (json.StatusCode === 200) {
          // console.log(json)
          dispatch({ type: actions.UpDataState.GET_PIC_URL, data: json.Data });
        }
      });
    // this.requestData(route);
    if (
      history.location.pathname === "/" ||
      history.location.pathname === "/UserArchives"
    ) {
      history.push("/UserArchives/All");
      // console.log(this.state)
    }
    if (history.location.pathname === "/RegisterExamine") {
      history.push("/RegisterExamine/RegisterWillExamine");
      // console.log(this.state)
    }

    history.listen(() => {
      //路由监听
      let route = history.location.pathname;
      // 获取接口数据
      this.requestData(route);

      if (
        history.location.pathname === "/" ||
        history.location.pathname === "/UserArchives"
      ) {
        history.push("/UserArchives/All");
        // console.log(this.state)
      }
      if (history.location.pathname === "/RegisterExamine") {
        history.push("/RegisterExamine/RegisterWillExamine");
        // console.log(this.state)
      }
    });

    // 获取人脸库地址
    dispatch(UpDataState.GetSubSystemsMainServerBySubjectID());
  }
  componentWillUpdate() {}
  componentDidUpdate() {}

  requestRegister() {
    const { dispatch, DataState } = this.props;

    let userMsg = DataState.LoginUser.SchoolID
      ? DataState.LoginUser
      : JSON.parse(sessionStorage.getItem("UserInfo"));
    let route = history.location.pathname;
    let pathArr = route.split("/");
    let handleRoute = pathArr[2];
    if (userMsg.UserType === "0" || userMsg.UserType === "7") {
      if (handleRoute === "RegisterDidExamine") {
        dispatch(
          actions.UpDataState.getDidSignUpLog(
            "/GetSignUpLogToPage?SchoolID=" +
              userMsg.SchoolID +
              "&PageIndex=0&PageSize=10&status=1" +
              (DataState.GetSignUpLog.Grade.value !== 0
                ? "&gradeID=" + DataState.GetSignUpLog.Grade.value
                : "") +
              (DataState.GetSignUpLog.Class.value !== 0
                ? "&classID=" + DataState.GetSignUpLog.Class.value
                : "")
          )
        );
      } else if (handleRoute === "RegisterWillExamine") {
        dispatch(
          actions.UpDataState.getWillSignUpLog(
            "/GetSignUpLogToPage?SchoolID=" +
              userMsg.SchoolID +
              "&PageIndex=0&PageSize=10&status=0" +
              (DataState.GetSignUpLog.Grade.value !== 0
                ? "&gradeID=" + DataState.GetSignUpLog.Grade.value
                : "") +
              (DataState.GetSignUpLog.Class.value !== 0
                ? "&classID=" + DataState.GetSignUpLog.Class.value
                : "")
          )
        );
      }
    } else if (userMsg.UserType === "1" || userMsg.UserClass[2] === "1") {
      let TeacherClass = DataState.GradeClassMsg.TeacherClass;
      if (!(TeacherClass instanceof Array) || !TeacherClass[0]) {
        return;
      }
      // console.log("11");
      if (handleRoute === "RegisterDidExamine") {
        dispatch(
          actions.UpDataState.getDidSignUpLog(
            "/GetSignUpLogToPage?SchoolID=" +
              userMsg.SchoolID +
              "&PageIndex=0&PageSize=10&status=1&classID=" +
              TeacherClasses.value
          )
        );
      } else if (handleRoute === "RegisterWillExamine") {
        dispatch(
          actions.UpDataState.getWillSignUpLog(
            "/GetSignUpLogToPage?SchoolID=" +
              userMsg.SchoolID +
              "&PageIndex=0&PageSize=10&status=0&classID=" +
              TeacherClasses.value
          )
        );
      }
    }
  }
  onAppAlertOK() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
    // window.location.href = "/html/login"
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
    let userMsg = DataState.LoginUser.SchoolID
      ? DataState.LoginUser
      : JSON.parse(sessionStorage.getItem("UserInfo"));
    let havePower = QueryPower({
      UserInfo: userMsg,
      ModuleID: PROFILE_MODULEID,
    });
    let { LockerVersion } = JSON.parse(
      //校园基础信息管理 XG5.2-免费版,1为基础版
      sessionStorage.getItem("LgBasePlatformInfo")
    )
      ? JSON.parse(
          //校园基础信息管理 XG5.2-免费版,1为基础版
          sessionStorage.getItem("LgBasePlatformInfo")
        )
      : {};
    havePower.then((res) => {
      // console.log(res)
      if (res) {
        let AdminPower = true;
        if (userMsg.UserType === "7" && userMsg.UserClass === "2") {
          AdminPower = false;
        }
        // let pathname = history.location.pathname;

        let pathArr = route.split("/");
        let handleRoute = pathArr[2];
        let ID = pathArr[3];
        // console.log(pathArr);
        // console.log('ddd')
        if (
          (userMsg.UserType === "0" || userMsg.UserType === "7") &&
          (route === "/" || route.split("/")[1] === "UserArchives")
        ) {
          // dispatch(actions.UpDataState.getAllUserPreview('/GetSummary'));
          dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
          if (handleRoute) {
            //dispatch(actions.UpDataState.getAllUserPreview('/Archives' + handleRoute));
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });

            if (
              handleRoute === "All" ||
              handleRoute === "Student" ||
              handleRoute === "Teacher" ||
              handleRoute === "Leader" ||
              handleRoute === "Graduate"
            ) {
              this.changeTitle({ title: "" });
            } else if (handleRoute === "LogDynamic") {
              this.changeTitle({ title: "最近档案动态" });
            } else if (handleRoute === "LogRecord") {
              this.changeTitle({ title: "档案变更记录" });
            }
            if (handleRoute === "Student") {
              // if (!Object.keys(DataState.GradeClassMsg.returnData).length)
              dispatch(
                actions.UpDataState.getGradeClassMsg(
                  "/GetGradeClassTree?schoolID=" + userMsg.SchoolID
                )
              );

              if (ID === "all") {
                dispatch(
                  actions.UpDataState.getGradeStudentPreview(
                    "/GetStudentToPage?SchoolID=" +
                      userMsg.SchoolID +
                      "&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC"
                  )
                );
              } else {
                // console.log("sss");
                dispatch(
                  actions.UpDataState.getGradeStudentPreview(
                    "/GetStudentToPage?SchoolID=" +
                      userMsg.SchoolID +
                      "&GradeID=" +
                      ID +
                      "&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC",
                    ""
                  )
                );
              }
            } else if (handleRoute === "Teacher") {
              // console.log("Teacher：" + DataState.SubjectTeacherMsg.returnData);
              // if (!DataState.SubjectTeacherMsg.returnData || ID !== "all") {
              //学科信息
              console.log(ID);
              dispatch(
                actions.UpDataState.getSubjectTeacherMsg(
                  "/GetSubject?schoolID=" + userMsg.SchoolID,
                  ID
                )
              );
              // }
              // if (!DataState.TeacherTitleMsg.returnData) {
              //职称
              dispatch(
                actions.UpDataState.getTeacherTitleMsg(
                  "/GetTitle?schoolID=" + userMsg.SchoolID
                )
              );
              // }
              // console.log(ID);
              if (ID === "all") {
                dispatch(
                  actions.UpDataState.getSubjectTeacherPreview(
                    "/GetTeacherToPage?SchoolID=" +
                      userMsg.SchoolID +
                      "&SubjectIDs=all&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC"
                  )
                );
              } else {
                dispatch(
                  actions.UpDataState.getSubjectTeacherPreview(
                    "/GetTeacherToPage?SchoolID=" +
                      userMsg.SchoolID +
                      "&SubjectIDs=" +
                      ID +
                      "&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC",
                    ID
                  )
                );
              }
            } else if (handleRoute === "Leader") {
              if (!AdminPower) {
                history.push("/UserArchives/All");
                return;
              }
              dispatch(
                actions.UpDataState.getSchoolLeaderPreview(
                  "/GetSchoolLeader?SchoolID=" +
                    userMsg.SchoolID +
                    "&SortFiled=UserID&SortType=ASC"
                )
              );
            } else if (handleRoute === "Graduate") {
              if (LockerVersion !== "1") {
                if (DataState.GetGraduateGradeClassMsg.Grade.length <= 1)
                  dispatch(
                    actions.UpDataState.getGraduateGradeClassMsg(
                      "/GetGradeClassOfGraduate?SchoolID=" + userMsg.SchoolID
                    )
                  );
                dispatch(
                  actions.UpDataState.getGraduatePreview(
                    "/GetGraduate?PageIndex=0&PageSize=10&schoolID=" +
                      userMsg.SchoolID
                  )
                );
              } else {
                window.location.href =
                  config.ErrorProxy + "/LockerMgr/ErrorTips.aspx?ErrorCode=-3";
              }
            } else if (handleRoute === "LogDynamic") {
              if (LockerVersion !== "1") {
                if (!AdminPower) {
                  history.push("/UserArchives/All");
                  return;
                }
                dispatch(actions.UpUIState.RightLoadingOpen());

                dispatch(
                  actions.UpDataState.getUnreadLogPreview(
                    "/GetUnreadLogToPage?UserType=-1&OperationType=-1&PageIndex=0&PageSize=10&OnlineUserID=" +
                      userMsg.UserID
                  )
                );
              } else {
                window.location.href =
                  config.ErrorProxy + "/LockerMgr/ErrorTips.aspx?ErrorCode=-3";
              }
            } else if (handleRoute === "LogRecord") {
              if (LockerVersion !== "1") {
                if (!AdminPower) {
                  history.push("/UserArchives/All");
                  return;
                }
                dispatch(actions.UpUIState.RightLoadingOpen());
                dispatch(
                  actions.UpDataState.getLogRecordPreview(
                    "/GetAllLogToPage?SchoolID=" +
                      userMsg.SchoolID +
                      "&UserType=-1&OperationType=-1&PageIndex=0&PageSize=10"
                  )
                );
              } else {
                window.location.href =
                  config.ErrorProxy + "/LockerMgr/ErrorTips.aspx?ErrorCode=-3";
              }
            } else if (handleRoute === "All") {
              dispatch(actions.UpDataState.getAllUserPreview("/GetSummary"));
              dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            } else {
              history.push("/UserArchives/All");
              // console.log(handleRoute);
            }
          } else {
            history.push("/UserArchives/All");
          }
        } else if (
          ((userMsg.UserType === "1" && userMsg.UserClass[2] === "1") ||
            userMsg.UserType === "0" ||
            userMsg.UserType === "7") &&
          route.split("/")[1] === "RegisterExamine"
        ) {
          this.changeTitle({ title: "学生注册审核" });
          if (userMsg.UserType === "0" || userMsg.UserType === "7") {
            dispatch(
              UpDataState.SetFrameData({
                image: logo,
                cnname: "用户档案管理",
                enname: "User Profile Management",
                subtitle: "学生注册审核",
              })
            );

            document.title = "用户档案管理";
          } else if (userMsg.UserType === "1" && userMsg.UserClass[2] === "1") {
            dispatch(
              UpDataState.SetFrameData({
                image: TeacherLogo,
                cnname: "班级管理",
                enname: "Class management",
                subtitle: "学生注册审核",
              })
            );

            document.title = "班级管理";
          }
          //dispatch(actions.UpDataState.getAllUserPreview('/RegisterExamine'));
          // console.log('12356')
          dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
          if (
            Object.keys(this.props.DataState.GradeClassMsg.returnData)
              .length === 0
          )
            dispatch(
              actions.UpDataState.getGradeClassMsg(
                "/GetGradeClassTree?schoolID=" + userMsg.SchoolID
              )
            );
          //监听
          if (
            route.split("/")[2] !== "RegisterWillExamine" &&
            route.split("/")[2] !== "RegisterDidExamine"
          ) {
            history.push("/RegisterExamine/RegisterWillExamine");
          }

          // if (userMsg.UserType === "0" || userMsg.UserType === "7") {
          //   if (handleRoute === "RegisterDidExamine") {
          //     dispatch(
          //       actions.UpDataState.getDidSignUpLog(
          //         "/GetSignUpLogToPage?SchoolID=" +
          //           userMsg.SchoolID +
          //           "&PageIndex=0&PageSize=10&status=1" +
          //           (DataState.GetSignUpLog.Grade.value !== 0
          //             ? "&gradeID=" + DataState.GetSignUpLog.Grade.value
          //             : "") +
          //           (DataState.GetSignUpLog.Class.value !== 0
          //             ? "&classID=" + DataState.GetSignUpLog.Class.value
          //             : "")
          //       )
          //     );
          //   } else if (handleRoute === "RegisterWillExamine") {
          //     dispatch(
          //       actions.UpDataState.getWillSignUpLog(
          //         "/GetSignUpLogToPage?SchoolID=" +
          //           userMsg.SchoolID +
          //           "&PageIndex=0&PageSize=10&status=0" +
          //           (DataState.GetSignUpLog.Grade.value !== 0
          //             ? "&gradeID=" + DataState.GetSignUpLog.Grade.value
          //             : "") +
          //           (DataState.GetSignUpLog.Class.value !== 0
          //             ? "&classID=" + DataState.GetSignUpLog.Class.value
          //             : "")
          //       )
          //     );
          //   }
          // } else if (userMsg.UserType === "1" || userMsg.UserClass[2] === "1") {
          //   let TeacherClass = DataState.GradeClassMsg.TeacherClass;
          //   if (!(TeacherClass instanceof Array) || !TeacherClass[0]) {
          //     return;
          //   }
          //   // console.log("11");
          //   if (handleRoute === "RegisterDidExamine") {
          //     dispatch(
          //       actions.UpDataState.getDidSignUpLog(
          //         "/GetSignUpLogToPage?SchoolID=" +
          //           userMsg.SchoolID +
          //           "&PageIndex=0&PageSize=10&status=1&classID=" +
          //           TeacherClasses.value
          //       )
          //     );
          //   } else if (handleRoute === "RegisterWillExamine") {
          //     dispatch(
          //       actions.UpDataState.getWillSignUpLog(
          //         "/GetSignUpLogToPage?SchoolID=" +
          //           userMsg.SchoolID +
          //           "&PageIndex=0&PageSize=10&status=0&classID=" +
          //           TeacherClasses.value
          //       )
          //     );
          //   }
          // }

          // if (handleRoute === "RegisterDidExamine") {

          //   if (userMsg.UserType === "0" || userMsg.UserType === "7") {
          //     dispatch(
          //       actions.UpDataState.getDidSignUpLog(
          //         "/GetSignUpLogToPage?SchoolID=" +
          //           userMsg.SchoolID +
          //           "&PageIndex=0&PageSize=10&status=1"+
          //           (DataState.GetSignUpLog.Grade.value!==0?'&gradeID='+DataState.GetSignUpLog.Grade.value:'') +
          //           (DataState.GetSignUpLog.Class.value!==0?'&classID='+DataState.GetSignUpLog.Class.value:'')
          //       )
          //     );
          //   }
          // } else if (handleRoute === "RegisterWillExamine") {

          //   console.log('554',userMsg.UserType === "0" || userMsg.UserType === "7",userMsg)

          //   if (userMsg.UserType === "0" || userMsg.UserType === "7") {
          //     dispatch(
          //       actions.UpDataState.getWillSignUpLog(
          //         "/GetSignUpLogToPage?SchoolID=" +
          //           userMsg.SchoolID +
          //           "&PageIndex=0&PageSize=10&status=0"+
          //           (DataState.GetSignUpLog.Grade.value!==0?'&gradeID='+DataState.GetSignUpLog.Grade.value:'') +
          //           (DataState.GetSignUpLog.Class.value!==0?'&classID='+DataState.GetSignUpLog.Class.value:'')
          //       )
          //     );
          //   }
          // }
        } else if (
          ((userMsg.UserType === "1" && userMsg.UserClass[2] === "1") ||
            userMsg.UserType === "0" ||
            userMsg.UserType === "7") &&
          route.split("/")[1] === "TeacherRegisterExamine"
        ) {
          this.changeTitle({ title: "教师注册审核" });

          //dispatch(actions.UpDataState.getAllUserPreview('/RegisterExamine'));
          // console.log('12356')
          dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
          dispatch(
            actions.UpDataState.getSubjectTeacherMsg(
              "/GetSubject?schoolID=" + userMsg.SchoolID,
              ID
            )
          );
          // // if(this.state.UserType){
          //   dispatch({
          //     type: actions.UpDataState.SET_REGISTER_GRADE_CLASS_MSG,
          //     data: {
          //       College: {value:userMsg.CollegeID,title:userMsg.CollegeName}
          //     }
          //   });
          // }

          // dispatch(
          //   actions.UpDataState.GetCollege_Univ(
          //     "/GetCollege_Univ?schoolID=" + userMsg.SchoolID
          //   )
          // );
          //监听
          if (
            route.split("/")[2] !== "TeacherRegisterWillExamine" &&
            route.split("/")[2] !== "TeacherRegisterDidExamine"
          ) {
            history.push("/TeacherRegisterExamine/TeacherRegisterWillExamine");
          }
        } else if (
          (userMsg.UserType === "0" || userMsg.UserType === "7") &&
          route.split("/")[1] === "ImportFile"
        ) {
          //dispatch(actions.UpDataState.getAllUserPreview('/RegisterExamine'));
          if (
            route.split("/")[2] !== "Student" &&
            route.split("/")[2] !== "Teacher" &&
            route.split("/")[2] !== "Graduate" &&
            route.split("/")[2] !== "Leader"
          ) {
            history.push("/UserArchives/All");
          }
          let role = route.split("/")[2];
          dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
          let title = "";
          document.title = title =
            role === "Teacher"
              ? "导入教师档案"
              : role === "Leader"
              ? "导入领导档案"
              : role === "Student"
              ? "导入学生档案"
              : "导入毕业生档案";
          this.changeTitle({ title: title });
        } else {
          if (userMsg.UserType === "0" || userMsg.UserType === "7") {
            history.push("/UserArchives/All");
          } else if (userMsg.UserType === "1" && userMsg.UserClass[2] === "1") {
            history.push("/RegisterExamine/RegisterWillExamine");
          } else {
            window.location.href =
              config.ErrorProxy + "/Error.aspx?errcode=E011";
          }
        }
      }
    });
  };
  // 修改二级标题
  changeTitle = ({ title }) => {
    let { dispatch } = this.props;
    dispatch(
      UpDataState.SetFrameData({
        subtitle: title,
      })
    );
  };
  //操作左侧菜单，响应路由变化
  handleMenu = () => {
    if (
      history.location.pathname === "/" ||
      history.location.pathname === "/UserArchives"
    ) {
      history.push("/UserArchives/All");
      // console.log(this.state);
    }
  };
  //左侧菜单每项的点击事件
  handleClick = (key) => {
    // console.log(key);
    history.push("/" + key);
  };
  //每个组件的下拉菜单的数据请求
  AllDropDownMenu = (route) => {};

  render() {
    const { UIState, DataState } = this.props;
    let UserID = DataState.LoginUser.UserID;
    return (
      <React.Fragment>
        {/* <Loading
          tip="加载中..."
          opacity={false}
          size="large"
          spinning={UIState.AppLoading.appLoading}
        > */}
        {UserID ? (
          <Router>
            <Route path="/UserArchives" component={UserArchives}></Route>
            <Route path="/RegisterExamine" component={RegisterExamine}></Route>
            <Route
              path="/TeacherRegisterExamine"
              component={TeacherRegisterExamine}
            ></Route>

            <Route path="/ImportFile/:role" component={ImportFile}></Route>
          </Router>
        ) : (
          ""
        )}
        {/* </Loading> */}
        <Alert
          show={UIState.AppAlert.appAlert}
          type={UIState.AppAlert.type}
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
