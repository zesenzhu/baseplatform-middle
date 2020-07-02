import React, { Component } from "react";
import { Menu, Loading, Alert, LeftMenu, Modal } from "../../../common";
import { connect } from "react-redux";
import TimeBanner from "../component/TimeBanner";
import CONFIG from "../../../common/js/config";
import deepCompare from "../../../common/js/public";
import Student from './Student';

import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
  Redirect
} from "react-router-dom";
import history from "./history";
import Frame from "../../../common/Frame";

import logo from "../../images/image-MyClass.png";
import All from "../component/All";
import Subject from "../component/Subject";
import Search from "../component/Search";
import Class from "../component/Class";
import Dynamic from "../component/Dynamic";
import Record from "../component/Record";
import ImportFile from "../component/ImportFile";
import LogDetails from "../component/LogDetails";
import HandleCourseClass from "../component/HandleCourseClass";
import AddCourseClass from "../component/AddCourseClass";
import {
  TokenCheck_Connect,
  TokenCheck,
  getUserInfo
} from "../../../common/js/disconnect";

import CourseClassDetails from "../component/CourseClassDetails";
import Teacher from "../component/Teacher";

//import Subject from '../component/Subject'
import "../../scss/index.scss";
import $ from "jquery";
import { postData, getData } from "../../../common/js/fetch";

import actions from "../actions";
//import { urlAll, proxy } from './config'
import { QueryPower, QueryAdminPower } from "../../../common/js/power";
const COURECLASS_MODULEID = "000-2-0-17"; //教学班管理

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      MenuParams: {},
      showBarner: true,
      showLeftMenu: true,
      UserMsg: JSON.parse(sessionStorage.getItem("UserInfo"))
    };

    window.MenuClcik = this.MenuClcik.bind(this);
    // if()
    // dispatch(
    //     actions.UpDataState.getCoureClassAllMsg(
    //       "/GetCouseclassSumarry?schoolID=" +
    //         JSON.parse(sessionStorage.getItem("UserInfo")).SchoolID,
    //       this.MenuClcik
    //     )
    //   );
  }

  componentWillMount() {
    const { dispatch, DataState } = this.props;

    // 获取接口数据
    let route = history.location.pathname;
    // let UserMsg = DataState.LoginUser.SchoolID ? DataState.LoginUser : JSON.parse(sessionStorage.getItem('UserInfo'))
    let that = this;
    //判断token是否存在
    TokenCheck_Connect(false, () => {
      // that.requestData(route);
      let token = sessionStorage.getItem("token");
      // sessionStorage.setItem('UserInfo', '')
      if (sessionStorage.getItem("UserInfo")) {
        dispatch(
          actions.UpDataState.getLoginUser(
            JSON.parse(sessionStorage.getItem("UserInfo"))
          )
        );

        const { UserType } = JSON.parse(sessionStorage.getItem("UserInfo"));

        that.setState({
          UserMsg: JSON.parse(sessionStorage.getItem("UserInfo"))
        });

          if (parseInt(UserType)===2){

              this.setState({showBarner:false,showLeftMenu:false});

          }

        that.requestData(route);
      } else {
        getUserInfo(token, "000");
        let timeRun = setInterval(function() {
          if (sessionStorage.getItem("UserInfo")) {
            dispatch(
              actions.UpDataState.getLoginUser(
                JSON.parse(sessionStorage.getItem("UserInfo"))
              )
            );
            that.setState({
              UserMsg: JSON.parse(sessionStorage.getItem("UserInfo"))
            });

            const { UserType } = JSON.parse(sessionStorage.getItem("UserInfo"));

            if (parseInt(UserType)===2){

                this.setState({showBarner:false,showLeftMenu:false});

            }

            that.requestData(route);

            clearInterval(timeRun);
          }
        }, 1000);
        //dispatch(actions.UpDataState.getLoginUser(JSON.parse(sessionStorage.getItem('UserInfo'))));
      }
      history.listen(() => {
        //路由监听
        let route = history.location.pathname;
        //this.requestData(route);
        that.requestData(route);
      });
    });
  }
  componentWillUpdate() {
    //this.requestData(route);
  }
  componentDidUpdate() {}
  componentWillReceiveProps(nextProps) {
    //console.log(this.state.UserMsg)
    this.setState({
      MenuParams: nextProps.DataState.GetCoureClassAllMsg.MenuParams
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
  requestData = route => {
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

    if (parseInt(UserMsg.UserType)!==2){

        let havePower = QueryPower({
            UserInfo: UserMsg,
            ModuleID: COURECLASS_MODULEID
        });

        havePower.then(res => {
            console.log(res);
            if (res) {
                let SubjectID = DataState.GetCoureClassAllMsg.Subject;
                let GradeID = DataState.GetCoureClassAllMsg.Grade;

                let pathArr = route.split("/");
                let handleRoute = pathArr[1];
                let routeID = pathArr[2];
                let subjectID = pathArr[3];
                let classID = pathArr[4];
                // console.log(UserMsg)
                if (UserMsg.UserType === "0" || UserMsg.UserType === "7")
                    dispatch(
                        actions.UpDataState.getCoureClassAllMsg(
                            "/GetCouseclassSumarry?schoolID=" + UserMsg.SchoolID,
                            this.MenuClcik
                        )
                    );
                // console.log(route, routeID, subjectID)
                dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
                if (route === "/") {
                    if (UserMsg.UserType === "1") {
                        history.push("/Teacher");
                        return;
                    } else if (UserMsg.UserType === "0" || UserMsg.UserType === "7") {
                        history.push("/All");
                    } else {
                        console.log("用户没有权限访问");
                        return;
                    }
                    // this.setState({
                    //   showBarner: true,
                    //   showLeftMenu: true
                    // });
                    // dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
                    // if (!DataState.GetCoureClassAllMsg.MenuParams) return;
                    // dispatch(actions.UpDataState.setCoureClassAllMsg("all"));
                    // dispatch(
                    //   actions.UpDataState.getCoureClassAllMsg(
                    //     "/GetCouseclassSumarry?schoolID=" + UserMsg.SchoolID,
                    //     this.MenuClcik
                    //   )
                    // );
                } else if (
                    (UserMsg.UserType === "0" || UserMsg.UserType === "7") &&
                    handleRoute === "All"
                ) {
                    dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
                    if (!DataState.GetCoureClassAllMsg.MenuParams) return;
                    dispatch(actions.UpDataState.setCoureClassAllMsg("all"));
                    dispatch(
                        actions.UpDataState.getCoureClassAllMsg(
                            "/GetCouseclassSumarry?schoolID=" + UserMsg.SchoolID,
                            this.MenuClcik
                        )
                    );
                    this.setState({
                        showBarner: true,
                        showLeftMenu: true
                    });
                } else if (
                    (UserMsg.UserType === "0" || UserMsg.UserType === "7") &&
                    handleRoute === "Subject" &&
                    subjectID === "all"
                ) {
                    dispatch({ type: actions.UpUIState.RIGHT_LOADING_OPEN });
                    //if (DataState.getSubjectAllMsg[routeID] === undefined)
                    dispatch(
                        actions.UpDataState.getSubjectAllMsg(
                            "/GetSubjectCouseclassSumarry?subjectID=" + routeID,
                            routeID
                        )
                    );
                    if (!DataState.GetCoureClassAllMsg.MenuParams) return;
                    dispatch(actions.UpDataState.setCoureClassAllMsg(routeID));
                    this.setState({
                        showBarner: true,
                        showLeftMenu: true
                    });
                } else if (
                    (UserMsg.UserType === "0" || UserMsg.UserType === "7") &&
                    handleRoute === "Subject" &&
                    subjectID === "Class"
                ) {
                    // console.log('/')
                    this.setState({
                        showBarner: true,
                        showLeftMenu: true
                    });
                    dispatch(
                        actions.UpDataState.getSubjectAllMsg(
                            "/GetSubjectCouseclassSumarry?subjectID=" + routeID,
                            routeID
                        )
                    );
                    dispatch(
                        actions.UpDataState.getClassAllMsg(
                            "/GetGradeCouseclassDetailForPage?schoolID=" +
                            UserMsg.SchoolID +
                            "&key=&pageIndex=1&pageSize="+DataState.SetPagiSizeMsg.ClassPagisize+"&subjectID=" +
                            routeID +
                            "&gradeID=" +
                            classID,
                            routeID,
                            classID
                        )
                    );

                    if (!DataState.GetCoureClassAllMsg.MenuParams) return;
                    dispatch(actions.UpDataState.setCoureClassAllMsg(classID, routeID));
                } else if (
                    (UserMsg.UserType === "0" || UserMsg.UserType === "7") &&
                    handleRoute === "Search"
                ) {
                    // if (!DataState.GetCoureClassAllMsg.MenuParams)
                    //     return;
                    this.setState({
                        showBarner: true,
                        showLeftMenu: true
                    });
                    dispatch(
                        actions.UpDataState.getClassAllMsg(
                            "/GetGradeCouseclassDetailForPage?schoolID=" +
                            UserMsg.SchoolID +
                            "&key=" +
                            routeID +
                            "&pageIndex=1&pageSize="+DataState.SetPagiSizeMsg.SearchPagisize+"&subjectID=" +
                            // SubjectID +
                            "&gradeID="
                            // +
                            // GradeID
                        )
                    );
                } else if (
                    (UserMsg.UserType === "0" || UserMsg.UserType === "7") &&
                    handleRoute === "Log"
                ) {
                    // if (!DataState.GetCoureClassAllMsg.MenuParams)
                    //     return;
                    //dispatch(actions.UpDataState.getClassAllMsg('/CoureClass_Class?schoolID=sss'));
                    this.setState({
                        showBarner: false,
                        showLeftMenu: false
                    });
                    // const { dispatch, DataState, UIState } = this.props;

                    // let userMsg = DataState.LoginUser;
                    if (routeID === "Record") {
                        dispatch(
                            actions.UpDataState.getCourseClassRecordMsg(
                                "/GetGourseClassLogForPage?userID=" +
                                UserMsg.UserID +
                                "&userType=" +
                                UserMsg.UserType +
                                "&schoolID=" +
                                UserMsg.SchoolID +
                                "&startDate=" +

                                "&endDate=" +

                                "&operateType=0"
                            )
                        );
                    } else {
                        dispatch(
                            actions.UpDataState.getCourseClassDynamicMsg(
                                "/GetGourseClassLogNew?userID=" +
                                UserMsg.UserID +
                                "&userType=" +
                                UserMsg.UserType +
                                "&schoolID=" +
                                UserMsg.SchoolID +
                                "&startDate=" +
                                "&endDate=" +
                                "&operateType=0"
                            )
                        );
                    }
                } else if (UserMsg.UserType === "1" && handleRoute === "Teacher") {
                    this.setState({
                        showBarner: true,
                        showLeftMenu: false
                    });
                    dispatch(
                        actions.UpDataState.getTeacherCourseClassMsg(
                            "/GetCourseClassByUserID?schoolID=" +
                            UserMsg.SchoolID +
                            "&teacherID=" +
                            UserMsg.UserID
                        )
                    );
                    dispatch(
                        actions.UpDataState.getSubjectAndGradeInfoForTeacher(
                            "/GetSubjectAndGradeInfoForTeacher?schoolID=" +
                            UserMsg.SchoolID +
                            "&userID=" +
                            UserMsg.UserID
                        )
                    );
                } else if (handleRoute === "ImportFile") {
                    this.setState({
                        showBarner: false,
                        showLeftMenu: false
                    });
                } else {
                    if (UserMsg.UserType === "1") {
                        history.push("/Teacher");
                    } else if (UserMsg.UserType === "0" || UserMsg.UserType === "7") {
                        history.push("/All");
                    } else {
                        console.log("用户没有权限访问");
                        return;
                    }
                }
            }
        });

    }

  };

  MenuClcik = (id, type, sub = null) => {
    // 0console.log(id, type)
    if (type === "All") {
      history.push("/All");
    } else if (type === "Subject") {
      history.push("/Subject/" + id + "/all");
    } else if (type === "Class") {
      history.push("/Subject/" + sub + "/Class/" + id);
    }
    //history.push('/'+id)
  };

  //模态框关闭
  CourseClassDetailsModalOk = () => {
    const { dispatch, DataState } = this.props;
    dispatch(actions.UpUIState.CourseClassDetailsModalClose());
    dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });
  };
  CourseClassDetailsModalCancel = () => {
    const { dispatch, DataState } = this.props;
    dispatch(actions.UpUIState.CourseClassDetailsModalClose());
    dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });
  };
  //日志模态框关闭
  LogDetailsModalOk = () => {
    const { dispatch, DataState } = this.props;
    dispatch(actions.UpUIState.LogDetailsModalClose());
  };
  LogDetailsModalCancel = () => {
    const { dispatch, DataState } = this.props;
    dispatch(actions.UpUIState.LogDetailsModalClose());
  };
  //编辑教学班模态框
  ChangeCourseClassModalOk = () => {
    const { dispatch, DataState } = this.props;
    let userMsg = DataState.LoginUser;
    let data = DataState.GetCourseClassDetailsHandleClassMsg;
    let route = history.location.pathname;
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    let routeID = pathArr[2];
    let subjectID = pathArr[3];
    let classID = pathArr[4];
    let SubjectID = DataState.GetCoureClassAllMsg.Subject;
    let GradeID = DataState.GetCoureClassAllMsg.Grade;
    let pageIndex = DataState.GetClassAllMsg.allClass.pageIndex;
    let isFalse = false;

    console.log(JSON.stringify(data.selectData.Student)===JSON.stringify(data.InitStudent),data.selectData.Student, data.TableSource,deepCompare.deepCompare(data.selectData.Student, data.InitStudent ),data.selectData.Teacher.value === data.TeacherID ,
    data.selectData.CourseClass.CourseClassName === data.CourseClassName,JSON.stringify(data.selectData.Class)===JSON.stringify(data.InitClass))
    if (
      data.selectData.Teacher.value === data.TeacherID &&
      data.selectData.CourseClass.CourseClassName === data.CourseClassName &&
      // deepCompare.deepCompare(data.selectData.Student, data.TableSource)
      JSON.stringify(data.selectData.Student)===JSON.stringify(data.InitStudent)&&
      JSON.stringify(data.selectData.Class)===JSON.stringify(data.InitClass)
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "教学班信息没有发生改变",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this)
        })
      );
      return;
    }
    let value = data.selectData.CourseClass.CourseClassName;
    if (value === "") {
      // dispatch(
      //   actions.UpUIState.showErrorAlert({
      //     type: "btn-error",
      //     title: "您还没填写教学班名称哦~",
      //     ok: this.onAppAlertOK.bind(this),
      //     cancel: this.onAppAlertCancel.bind(this),
      //     close: this.onAppAlertClose.bind(this)
      //   })
      // );
      // return;
      dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_OPEN });
      // return;
      isFalse = true
    }
    //console.log(this.state.courseClassName, e.target.value)
    let Test = /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(value);
    if (!Test) {
      // dispatch(
      //   actions.UpUIState.showErrorAlert({
      //     type: "btn-error",
      //     title: "教学班名称格式不符合要求",
      //     ok: this.onAppAlertOK.bind(this),
      //     cancel: this.onAppAlertCancel.bind(this),
      //     close: this.onAppAlertClose.bind(this)
      //   })
      // );
      // return;
      dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_OPEN });
      // return;
      isFalse = true
    }
    if(isFalse){
      return
    }
    dispatch({ type: actions.UpUIState.SUBJECT_TIPS_SHOW_CLOSE });
    dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_CLOSE });

    dispatch({ type: actions.UpUIState.GRADE_TIPS_SHOW_CLOSE });
    // console.log(data.selectData.Student,data.TableSource,deepCompare.deepCompare(data.selectData.Student, data.TableSource))
    let courseClassStus = data.selectData.Student.map((child, index) => {
      return child.StudentID;
    }).join();
    let url = "/InsertOrEditCourseClass";
    //dispatch(actions.UpDataState.setCourseClassStudentMsg(Student))

    postData(
      CONFIG.CourseClassProxy + url,
      {
        userID: userMsg.UserID,
        userType: userMsg.UserType,
        schoolID: userMsg.SchoolID,
        courseClassName: data.selectData.CourseClass.CourseClassName,
        teacherID: data.selectData.Teacher.value,
        gradeID: data.GradeID,
        subjectID: data.SubjectID,
        courseClassStus: courseClassStus,
        courseClassID: data.selectData.CourseClass.CourseClassID,
        classIDs:data.selectData.Class.join()
      },
      2,
      "json"
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 400) {
          // console.log('错误码：' + json.StatusCode)
        } else if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "成功",
              onHide: this.onAlertWarnHide.bind(this)
            })
          );
          if (userMsg.UserType === "0") {
            if (handleRoute === "Search") {
              dispatch(
                actions.UpDataState.getClassAllMsg(
                  "/GetGradeCouseclassDetailForPage?schoolID=" +
                    this.state.UserMsg.SchoolID +
                    "&key=" +
                    routeID +
                    "&pageIndex=" +
                    pageIndex +
                    "&pageSize="+DataState.SetPagiSizeMsg.ClassPagisize+"&subjectID=" +
                    // SubjectID +
                    "&gradeID=" 
                    // +
                    // GradeID
                )
              );
            } else {
              dispatch(
                actions.UpDataState.getClassAllMsg(
                  "/GetGradeCouseclassDetailForPage?schoolID=" +
                    this.state.UserMsg.SchoolID +
                    "&key=&pageIndex=" +
                    pageIndex +
                    "&pageSize="+DataState.SetPagiSizeMsg.ClassPagisize+"&subjectID=" +
                    routeID +
                    "&gradeID=" +
                    classID,
                  routeID,
                  classID
                )
              );
            }
          } else if (userMsg.UserType === "1") {
            history.push("/Teacher");
          }
          //dispatch(actions.UpDataState.getClassAllMsg('/GetGradeCouseclassDetailForPage?schoolID=' + this.state.UserMsg.SchoolID + '&pageIndex=1&pageSize=10', routeID, classID));
        }
      });
    dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });
    dispatch(actions.UpUIState.ChangeCourseClassModalClose());
    dispatch(actions.UpDataState.setCourseClassName([]));
    dispatch(actions.UpDataState.setCourseClassStudentMsg([]));
    dispatch(actions.UpDataState.setSubjectTeacherMsg([]));
    dispatch(actions.UpDataState.setClassStudentTransferMsg([]));
    // dispatch(actions.UpDataState.setClassStudentTransferTransferMsg([]));
    dispatch(actions.UpDataState.setSubjectTeacherTransferMsg([]));
    // dispatch(actions.UpDataState.setCourseClassStudentMsg([]));
    dispatch(actions.UpDataState.SetCourseClassDefaultMsg({ClassSource:[],Class:[]}));
    dispatch(actions.UpDataState.setClassStudentTransferTransferMsg({ClassSource:[],Class:[]}));
    // dispatch(actions.UpDataState.setClassStudentTransferMsg([]));
    dispatch(
      actions.UpDataState.setCourseClassDataMsg({
        Subject: {},
        Grade: {},
        Teacher: [],
        Student: []
      })
    );
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  ChangeCourseClassModalCancel = () => {
    const { dispatch, DataState } = this.props;
    // let Student = DataState.GetCourseClassDetailsHandleClassMsg.TableSource;
    // let Teacher = {value:DataState.GetCourseClassDetailsHandleClassMsg.TeacherID,title:DataState.GetCourseClassDetailsHandleClassMsg.TeacherName}
    dispatch(actions.UpDataState.setCourseClassName({}));
    // dispatch(actions.UpDataState.setCourseClassStudentMsg({}));
    dispatch(actions.UpDataState.setSubjectTeacherMsg([]));
    // dispatch(actions.UpDataState.setClassStudentTransferMsg([]));
    // dispatch(actions.UpDataState.setClassStudentTransferTransferMsg([{}]));
    dispatch(actions.UpDataState.setSubjectTeacherTransferMsg([]));
    dispatch(actions.UpDataState.setCourseClassStudentMsg([]));
    dispatch(actions.UpDataState.SetCourseClassDefaultMsg({ClassSource:[],Class:[]}));
    dispatch(actions.UpDataState.setClassStudentTransferTransferMsg({ClassSource:[],Class:[]}));
    dispatch(actions.UpDataState.setClassStudentTransferMsg([]));
    dispatch(
      actions.UpDataState.setCourseClassDataMsg({
        Subject: {},
        Grade: {},
        Teacher: [],
        Student: []
      })
    );
    dispatch(actions.UpUIState.ChangeCourseClassModalClose());
    dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });
  };
  //添加教学班模态框
  AddCourseClassModalOk = () => {
    const { dispatch, DataState } = this.props;
    let Student =
      DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student;
    // console.log(Student)
    //dispatch(actions.UpDataState.setCourseClassStudentMsg(Student))
    let userMsg = DataState.LoginUser;
    let data = DataState.GetCourseClassDetailsHandleClassMsg;
    let route = history.location.pathname;
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    let routeID = pathArr[2];
    let subjectID = pathArr[3];
    let classID = pathArr[4];
    let pageIndex = DataState.GetClassAllMsg.allClass.pageIndex;
    let isFalse = false;
    // if (data.selectData.Teacher.value === data.TeacherID && data.selectData.CourseClass.CourseClassName === data.CourseClassName && deepCompare.deepCompare(data.selectData.Student, data.TableSource)) {
    //     dispatch(actions.UpUIState.showErrorAlert({
    //         type: 'btn-error',
    //         title: "您还没有选择哦~",
    //         ok: this.onAppAlertOK.bind(this),
    //         cancel: this.onAppAlertCancel.bind(this),
    //         close: this.onAppAlertClose.bind(this)
    //     }));
    //     return;
    // }
    if (data.selectData.CourseClass.CourseClassName === "") {
      // dispatch(
      //   actions.UpUIState.showErrorAlert({
      //     type: "warn",
      //     title: "请输入教学班名称",
      //     ok: this.onAppAlertOK.bind(this),
      //     cancel: this.onAppAlertCancel.bind(this),
      //     close: this.onAppAlertClose.bind(this),
      //     onHide: this.onAlertWarnHide.bind(this)
      //   })
      // );
      dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_OPEN });
      isFalse = true
    }
    let value = data.selectData.CourseClass.CourseClassName;
    //console.log(this.state.courseClassName, e.target.value)
    let Test = /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(value);
    if (value === "" || value === undefined || !Test) {
      // dispatch(
      //   actions.UpUIState.showErrorAlert({
      //     type: "btn-error",
      //     title: "输入的教学班名称格式不正确",
      //     ok: this.onAppAlertOK.bind(this),
      //     cancel: this.onAppAlertCancel.bind(this),
      //     close: this.onAppAlertClose.bind(this)

      //   })
      // );
      dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_OPEN });
      // return;
      isFalse = true

    }

    if (
      data.selectData.Subject &&
      data.selectData.Subject instanceof Object &&
      !data.selectData.Subject.value
    ) {
      // dispatch(
      //   actions.UpUIState.showErrorAlert({
      //     type: "warn",
      //     title: "请选择学科",
      //     ok: this.onAppAlertOK.bind(this),
      //     cancel: this.onAppAlertCancel.bind(this),
      //     close: this.onAppAlertClose.bind(this),
      //     onHide: this.onAlertWarnHide.bind(this)
      //   })
      // );
      dispatch({ type: actions.UpUIState.SUBJECT_TIPS_SHOW_OPEN });
      // return;
      isFalse = true

    }

    if (
      data.selectData.Grade &&
      data.selectData.Grade instanceof Object &&
      !data.selectData.Grade.value
    ) {
      // dispatch(
      //   actions.UpUIState.showErrorAlert({
      //     type: "warn",
      //     title: "请选择年级",
      //     ok: this.onAppAlertOK.bind(this),
      //     cancel: this.onAppAlertCancel.bind(this),
      //     close: this.onAppAlertClose.bind(this),
      //     onHide: this.onAlertWarnHide.bind(this)
      //   })
      // );
      dispatch({ type: actions.UpUIState.GRADE_TIPS_SHOW_OPEN });

      // return;
      isFalse = true

    }

    if(isFalse){
      return
    }
    dispatch({ type: actions.UpUIState.SUBJECT_TIPS_SHOW_CLOSE });
    dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_CLOSE });

    dispatch({ type: actions.UpUIState.GRADE_TIPS_SHOW_CLOSE });

    // if(!data.selectData.Teacher.value){
    //     dispatch(actions.UpUIState.showErrorAlert({
    //         type: 'btn-error',
    //         title: "您还没选择教师哦~",
    //         ok: this.onAppAlertOK.bind(this),
    //         cancel: this.onAppAlertCancel.bind(this),
    //         close: this.onAppAlertClose.bind(this)
    //     }));
    //     return;
    // }
    // if(!data.selectData.Student.length){
    //     dispatch(actions.UpUIState.showErrorAlert({
    //         type: 'btn-error',
    //         title: "您还没选择学生哦~",
    //         ok: this.onAppAlertOK.bind(this),
    //         cancel: this.onAppAlertCancel.bind(this),
    //         close: this.onAppAlertClose.bind(this)
    //     }));
    //     return;
    // }
    // console.log(data.selectData.Student,data.TableSource,deepCompare.deepCompare(data.selectData.Student, data.TableSource))
    let courseClassStus = data.selectData.Student.map((child, index) => {
      return child.StudentID;
    }).join();
    let url = "/InsertOrEditCourseClass";
    //dispatch(actions.UpDataState.setCourseClassStudentMsg(Student))

    postData(
      CONFIG.CourseClassProxy + url,
      {
        userID: userMsg.UserID,
        userType: userMsg.UserType,
        schoolID: userMsg.SchoolID,
        courseClassName: data.selectData.CourseClass.CourseClassName,
        teacherID: data.selectData.Teacher.value,
        gradeID: data.selectData.Grade.value,
        subjectID: data.selectData.Subject.value,
        courseClassStus: courseClassStus,
        courseClassID: "",
        classIDs:data.selectData.Class.join()

      },
      2,
      "json"
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 400) {
          // console.log('错误码：' + json.StatusCode)
        } else if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "成功",
              onHide: this.onAlertWarnHide.bind(this)
            })
          );
          if (userMsg.UserType === "0") {
            if (handleRoute === "Search") {
              dispatch(
                actions.UpDataState.getClassAllMsg(
                  "/GetGradeCouseclassDetailForPage?schoolID=" +
                    this.state.UserMsg.SchoolID +
                    "&key=" +
                    routeID +
                    "&pageIndex=" +
                    pageIndex +
                    "&pageSize="+DataState.SetPagiSizeMsg.SearchPagisize+"&subjectID=" +
                    // SubjectID +
                    "&gradeID=" 
                    // +
                    // GradeID
                )
              );
            } else {
              if(classID){
                dispatch(
                  actions.UpDataState.getClassAllMsg(
                    "/GetGradeCouseclassDetailForPage?schoolID=" +
                      this.state.UserMsg.SchoolID +
                      "&key=&pageIndex=" +
                      pageIndex +
                      "&pageSize="+DataState.SetPagiSizeMsg.ClassPagisize+"&subjectID=" +
                      routeID +
                      "&gradeID=" +
                      classID,
                    routeID,
                    classID
                  )
                );
              }else if(routeID){
                dispatch({ type: actions.UpUIState.RIGHT_LOADING_OPEN });
                //if (DataState.getSubjectAllMsg[routeID] === undefined)
                dispatch(
                  actions.UpDataState.getSubjectAllMsg(
                    "/GetSubjectCouseclassSumarry?subjectID=" + routeID,
                    routeID
                  )
                );
              }else{
                dispatch(
                  actions.UpDataState.getCoureClassAllMsg(
                    "/GetCouseclassSumarry?schoolID=" + this.state.UserMsg.SchoolID,
                    this.MenuClcik
                  )
                );
              }
              
            }
          } else if (userMsg.UserType === "1") {
            history.push("/Teacher");
          }
          // dispatch(actions.UpDataState.getClassAllMsg('/GetGradeCouseclassDetailForPage?schoolID=' + this.state.UserMsg.SchoolID + '&pageIndex=1&pageSize=10&subjectID='+routeID+'&gradeID='+classID, routeID, classID));
        }
      });
    dispatch(actions.UpUIState.AddCourseClassModalClose());
    dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });

    // dispatch(actions.UpUIState.ChangeCourseClassModalClose())
    dispatch(actions.UpDataState.setCourseClassName({ CourseClassName: "" }));
    dispatch(
      actions.UpDataState.setCourseClassDataMsg({
        Subject: {},
        Grade: {},
        Teacher: [],
        Student: []
      })
    );
    dispatch(actions.UpDataState.setCourseClassStudentMsg([]));
    dispatch(actions.UpDataState.SetCourseClassDefaultMsg({ClassSource:[],Class:[]}));
    dispatch(actions.UpDataState.setClassStudentTransferTransferMsg({ClassSource:[],Class:[]}));
    dispatch(actions.UpDataState.setClassStudentTransferMsg([]));

    // dispatch(actions.UpDataState.setCourseClassStudentMsg([]));
    dispatch(actions.UpDataState.setSubjectTeacherMsg([]));
    // dispatch(actions.UpDataState.setClassStudentTransferMsg([]));
    // dispatch(actions.UpDataState.setClassStudentTransferTransferMsg([]));
    dispatch(actions.UpDataState.setSubjectTeacherTransferMsg([]));
  };
  AddCourseClassModalCancel = () => {
    const { dispatch, DataState } = this.props;
    let Student = DataState.GetCourseClassDetailsHandleClassMsg.TableSource;
    let Teacher = {
      value: DataState.GetCourseClassDetailsHandleClassMsg.TeacherID,
      title: DataState.GetCourseClassDetailsHandleClassMsg.TeacherName
    };
    dispatch(actions.UpDataState.setCourseClassStudentMsg([]));
    dispatch(actions.UpDataState.SetCourseClassDefaultMsg({ClassSource:[],Class:[]}));
    dispatch(actions.UpDataState.setClassStudentTransferTransferMsg({ClassSource:[],Class:[]}));
    dispatch(actions.UpDataState.setClassStudentTransferMsg([]));
    dispatch(actions.UpUIState.AddCourseClassModalClose());
    dispatch({ type: actions.UpUIState.SUBJECT_TIPS_SHOW_CLOSE });
    dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_CLOSE });

    dispatch({ type: actions.UpUIState.GRADE_TIPS_SHOW_CLOSE });
    dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });
  };
  render() {
    const { UIState, DataState } = this.props;
    let {UserID,UserType} = DataState.LoginUser;

    if (DataState.GetCoureClassAllMsg.isError) {
      // console.log('d')

      // history.push('/All')
      window.location.href = "/html/CoureClass#/All";
    }
    let route = history.location.pathname.split("/");
    let cnname = "教学班管理";
    let enname = "CoureClass Management";
    if (route[1] === "Teacher"||(route[1] === "ImportFile"&&DataState.LoginUser.UserType==='1')) {
      cnname = "我的教学班管理";
      enname = "My class Management";
    }else if (route[1] === "Student") {
        cnname = "我的教学班";
        enname = "My CourseClass";
        
        
    }
     
    return (
      <React.Fragment>
        <Loading
          tip="加载中..."
          opacity={false}
          size="large"
          spinning={UIState.AppLoading.appLoading}
        >
          <Frame
            userInfo={{
              name: DataState.LoginUser.UserName,
              image: DataState.LoginUser.PhotoPath
            }}
            module={{
              cnname: cnname,
              enname: enname,
              image: logo
            }}
            type="triangle"
            showBarner={this.state.showBarner}
            showLeftMenu={this.state.showLeftMenu}
          >
            <div ref="frame-time-barner">
              <TimeBanner />
            </div>

            <div ref="frame-left-menu">
              <Menu params={DataState.GetCoureClassAllMsg.MenuParams}></Menu>
            </div>

            <div ref="frame-right-content">
              <Loading
                tip="加载中..."
                opacity={false}
                size="large"
                spinning={UIState.AppLoading.rightLoading}
              >
               {UserID? <Router>
                  <Route path="/All" exact component={All}></Route>
                  <Route
                    path="/Subject/:subjectID/all"
                    component={Subject}
                  ></Route>
                  <Route
                    path="/Subject/:subjectID/Class/:classID"
                    component={Class}
                  ></Route>
                  <Route path="/Search" component={Search}></Route>
                  <Route path="/Log/Record" component={Record}></Route>
                  <Route path="/Log/Dynamic" component={Dynamic}></Route>
                  <Route path="/Teacher" component={Teacher}></Route>
                  <Route path="/ImportFile" component={ImportFile}></Route>

                  <Route path={"/Student"} component={Student}></Route>

                       {

                         parseInt(UserType)===2?

                             <Redirect path={"/*"} to={"/Student"}></Redirect>

                             :''

                       }

                </Router>:''
}
                {/* <Route path='/UserArchives/All' exact history={history} component={All}></Route>
                            <Route path='/UserArchives/Student' exact history={history} component={Student}></Route>
                            <Route path='/UserArchives/Teacher' exact history={history} component={Teacher}></Route>
                            <Route path='/UserArchives/Leader' exact history={history} component={Leader}></Route> */}

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

        {/* 模态框 */}
        <Modal
          ref="CourseClassDetailsMadal"
          bodyStyle={{ padding: 0 }}
          width={720}
          type="1"
          destroyOnClose={true}
          title={"教学班详情"}
          visible={
            UIState.SetCourseClassDetailsModalShow
              .setCourseClassDetailsMadalShow
          }
          onOk={this.CourseClassDetailsModalOk}
          onCancel={this.CourseClassDetailsModalCancel}
        >
          <Loading
            wrapperClassName="Detail-laoding"
            opacity={false}
            spinning={UIState.AppLoading.modalLoading}
          >
            <CourseClassDetails></CourseClassDetails>
          </Loading>
        </Modal>
        <Modal
          ref="CourseClassDetailsMadal"
          type="1"
          width={800}
          // width={680}

          destroyOnClose={true}
          title={"编辑教学班"}
          bodyStyle={{ height: 530 + "px", padding: 0 }}
          // bodyStyle={{ height: 305 + "px", padding: 0 }}
          visible={UIState.ChangeCourseClassModalShow.Show}
          onOk={this.ChangeCourseClassModalOk}
          onCancel={this.ChangeCourseClassModalCancel}
        >
          <Loading
            wrapperClassName="handle-laoding"
            opacity={false}
            spinning={UIState.AppLoading.modalLoading}
          >
            <HandleCourseClass></HandleCourseClass>
          </Loading>
        </Modal>
        <Modal
          ref="AddCourseClassDetailsMadal"
          type="1"
          width={800}
          // width={680}
          destroyOnClose={true}
          title={"添加教学班"}
          bodyStyle={{ height: 530 + "px", padding: 0 }}
          // bodyStyle={{ height: 305 + "px", padding: 0 }}

          visible={UIState.AddCourseClassModalShow.Show}
          onOk={this.AddCourseClassModalOk}
          onCancel={this.AddCourseClassModalCancel}
        >
          <Loading
            wrapperClassName="handle-laoding"
            opacity={false}
            spinning={UIState.AppLoading.modalLoading}
          >
            {UIState.AddCourseClassModalShow.Show ? (
              <AddCourseClass
                type={
                  DataState.LoginUser.UserType === "0"
                    ? "Admin"
                    : DataState.LoginUser.UserType === "1"
                    ? "Teacher"
                    : false
                }
              ></AddCourseClass>
            ) : (
              ""
            )}
          </Loading>
        </Modal>
        <Modal
          ref="LogDetailsMadal"
          type="1"
          width={720}
          title={"教学班调整详情"}
          bodyStyle={{ height: 532 + "px", padding: 0 }}
          visible={UIState.LogDetailsModalShow.Show}
          footer={null}
          destroyOnClose={true}
          onOk={this.LogDetailsModalOk}
          onCancel={this.LogDetailsModalCancel}
        >
          <LogDetails></LogDetails>
        </Modal>
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
