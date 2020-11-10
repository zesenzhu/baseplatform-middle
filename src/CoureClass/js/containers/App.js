import React, { Component } from "react";

import {  Loading, Alert, LeftMenu, Modal } from "../../../common";

import { connect } from "react-redux";


import CONFIG from "../../../common/js/config";

import Student from './Student';

import {loginUserUpdate} from '../reducers/LoginUser';

import { withRouter } from "react-router-dom";


import Frame from "../../../common/Frame";

import logo from "../../images/image-MyClass.png";

import All from "../component/All";

import Subject from "../component/Subject";

import Search from "../component/Search";

import Class from "../component/Class";



import Record from "../component/Record";

import ImportFile from "../component/ImportFile";

import LogDetails from "../component/LogDetails";

import HandleCourseClass from "../component/HandleCourseClass";

import AddCourseClass from "../component/AddCourseClass";

import AppRoutes from './AppRoutes';

import Banner from '../component/banner';


import CourseClassDetails from "../component/CourseClassDetails";

import Teacher from "../component/Teacher";


import "../../scss/index.scss";

import { postData } from "../../../common/js/fetch";

import actions from "../actions";

import { QueryPower,QueryOtherPower } from "../../../common/js/power";

import {bannerTabHide,bannerBtnShow,bannerLogHide,bannerShow,

    bannerHide} from "../reducers/bannerState";

import {leftMemuShow,leftMemuHide} from "../reducers/leftMenu";

import {appLoadingHide} from "../reducers/AppLoading";

import {getQueryVariable} from "../../../common/js/disconnect";

import {teacherPowerChange} from "../reducers/teacherManagePower";


const COURECLASS_MODULEID = "000-2-0-17"; //教学班管理


class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      MenuParams: {},
      showBarner: true,
      showLeftMenu: true,
      UserMsg: JSON.parse(sessionStorage.getItem("UserInfo")),
      firstLoad:true,
      isFrame:false

    };

    window.MenuClcik = this.MenuClcik.bind(this);

  }


  pageInit(){

      let token = sessionStorage.getItem("token");

      const { history,dispatch } = this.props;

      let UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

      const { UserType } = UserInfo;

      const UserInfoCopy = {...UserInfo,UserType:parseInt(UserInfo.UserType),UserClass:UserInfo.UserClass};

	  let route = history.location.pathname;

      dispatch(
              actions.UpDataState.getLoginUser(
                  UserInfo
              )
          );

      dispatch(loginUserUpdate(UserInfoCopy));

      if ([0,7,10].includes(UserInfoCopy.UserType)){

          this.Frame.getIdentity({ModuleID:'000005'},()=>{

              this.requestData(route);

              history.listen(() => {
                  //路由监听
                  let route = history.location.pathname;

                  if(route.split('/')[1]==='statics'){

                      dispatch(bannerShow());

                      dispatch(leftMemuShow());

                  }

                  if(route.split('/')[1]==='manage'){

                      dispatch(bannerShow());

                      dispatch(leftMemuHide());

                  }

                  if(route.split('/')[1]==='ImportFile'){

                      dispatch(bannerHide());

                      dispatch(leftMemuHide());

                  }

                  if(route.split('/')[1]==='Log'){

                      dispatch(bannerHide());

                      dispatch(leftMemuHide());

                  }

                  if(route.split('/')[1]==='Teacher'){

                      dispatch(bannerShow());

                      dispatch(bannerBtnShow());

                      dispatch(bannerLogHide());

                      dispatch(bannerTabHide());

                      dispatch(leftMemuHide());

                  }

                  this.requestData(route);

              });

          });

      }else if (UserInfoCopy.UserType===1) {

          this.Frame.getIdentity({ModuleID:'000013'},()=>{

              this.requestData(route);

              history.listen(() => {
                  //路由监听
                  let route = history.location.pathname;

                  if(route.split('/')[1]==='statics'){

                      dispatch(bannerShow());

                      dispatch(leftMemuShow());

                  }

                  if(route.split('/')[1]==='manage'){

                      dispatch(bannerShow());

                      dispatch(leftMemuHide());

                  }

                  if(route.split('/')[1]==='ImportFile'){

                      dispatch(bannerHide());

                      dispatch(leftMemuHide());

                  }

                  if(route.split('/')[1]==='Log'){

                      dispatch(bannerHide());

                      dispatch(leftMemuHide());

                  }

                  if(route.split('/')[1]==='Teacher'){

                      dispatch(bannerShow());

                      dispatch(bannerBtnShow());

                      dispatch(bannerLogHide());

                      dispatch(bannerTabHide());

                      dispatch(leftMemuHide());

                  }

                  this.requestData(route);

              });

          })

      }else if (UserInfoCopy.UserType===2){

          this.Frame.getIdentity({ModuleID:'000015'},()=>{

              this.requestData(route);

              history.listen(() => {
                  //路由监听
                  let route = history.location.pathname;

                  if(route.split('/')[1]==='statics'){

                      dispatch(bannerShow());

                      dispatch(leftMemuShow());

                  }

                  if(route.split('/')[1]==='manage'){

                      dispatch(bannerShow());

                      dispatch(leftMemuHide());

                  }

                  if(route.split('/')[1]==='ImportFile'){

                      dispatch(bannerHide());

                      dispatch(leftMemuHide());

                  }

                  if(route.split('/')[1]==='Log'){

                      dispatch(bannerHide());

                      dispatch(leftMemuHide());

                  }

                  if(route.split('/')[1]==='Teacher'){

                      dispatch(bannerShow());

                      dispatch(bannerBtnShow());

                      dispatch(bannerLogHide());

                      dispatch(bannerTabHide());

                      dispatch(leftMemuHide());

                  }

                  this.requestData(route);

              });

          });

      }else{

          window.location.href = CONFIG.ErrorProxy + "/Error.aspx?errcode=E011";

      }


      this.setState({
          UserMsg: UserInfo
      });

      if (parseInt(UserType)===2){

          this.setState({showBarner:false,showLeftMenu:false});

      }



      if(route.split('/')[1]==='statics'){

          dispatch(bannerShow());

          dispatch(leftMemuShow());

      }

      if(route.split('/')[1]==='manage'){

          dispatch(bannerShow());

          dispatch(leftMemuHide());

      }

      if(route.split('/')[1]==='ImportFile'){

          dispatch(bannerHide());

          dispatch(leftMemuHide());

          dispatch(appLoadingHide());

      }

      if(route.split('/')[1]==='Log'){

          dispatch(bannerHide());

          dispatch(leftMemuHide());

      }

      if(route.split('/')[1]==='Teacher'){

          dispatch(bannerShow());

          dispatch(bannerBtnShow());

          dispatch(bannerLogHide());

          dispatch(bannerTabHide());

          dispatch(leftMemuHide());

      }

  }


  UNSAFE_componentWillReceiveProps(nextProps) {

      const { history,dispatch } = nextProps;

        this.setState({

          MenuParams: nextProps.DataState.GetCoureClassAllMsg.MenuParams

        });


    if (getQueryVariable("iFrame")){

     this.setState({isFrame:true});

    }
  }

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
  // 请求每个组件主要渲染的数据
  requestData = route => {
    const { dispatch, DataState,history } = this.props;
    if (
      !DataState.LoginUser.SchoolID &&
      !JSON.parse(sessionStorage.getItem("UserInfo"))
    ) {
      return;
    }
    let UserMsg = DataState.LoginUser.SchoolID
      ? DataState.LoginUser
      : JSON.parse(sessionStorage.getItem("UserInfo"));


      let SubjectID = DataState.GetCoureClassAllMsg.Subject;
      let GradeID = DataState.GetCoureClassAllMsg.Grade;



      const pathArr = route.split("/");
      const handleRoute = pathArr[1];
      const routeID = pathArr[2];
      const subjectID = pathArr[3];
      const classID = pathArr[4];


    if (parseInt(UserMsg.UserType)!==2&&parseInt(UserMsg.UserType)!==7&&parseInt(UserMsg.UserType)!==10){

        if (parseInt(UserMsg.UserType)===0){

            let havePower = QueryPower({
                UserInfo: UserMsg,
                ModuleID: COURECLASS_MODULEID
            });

            havePower.then(res => {

                if (res) {

                    dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
                    if (route === "/") {
                        if (UserMsg.UserType === "1") {
                            //history.push("/Teacher");
                            return;
                        } else if (UserMsg.UserType === "0" || UserMsg.UserType === "7") {
                            history.push("/All");
                        } else {
                            console.log("用户没有权限访问");
                            return;
                        }


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

                    } else if (
                        (UserMsg.UserType === "0" || UserMsg.UserType === "7") &&
                        handleRoute === "Subject" &&
                        subjectID === "all"
                    ) {
                        dispatch({ type: actions.UpUIState.RIGHT_LOADING_OPEN });

                        dispatch(
                            actions.UpDataState.getSubjectAllMsg(
                                "/GetSubjectCouseclassSumarry?subjectID=" + routeID,
                                routeID
                            )
                        );
                        if (!DataState.GetCoureClassAllMsg.MenuParams) return;
                        dispatch(actions.UpDataState.setCoureClassAllMsg(routeID));

                    } else if (
                        (UserMsg.UserType === "0" || UserMsg.UserType === "7") &&
                        handleRoute === "Subject" &&
                        subjectID === "Class"
                    ) {


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


                        dispatch(
                            actions.UpDataState.getClassAllMsg(
                                "/GetGradeCouseclassDetailForPage?schoolID=" +
                                UserMsg.SchoolID +
                                "&key=" +
                                routeID +
                                "&pageIndex=1&pageSize="+DataState.SetPagiSizeMsg.SearchPagisize+"&subjectID=" +

                                "&gradeID="

                            )
                        );
                    } else if (
                        (UserMsg.UserType === "0" || UserMsg.UserType === "7") &&
                        handleRoute === "Log"
                    ) {


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

                            dispatch(appLoadingHide());

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

                            dispatch(appLoadingHide());
                        }
                    } else if (UserMsg.UserType === "1" && handleRoute === "Teacher") {

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

                        dispatch(appLoadingHide());

                    } else if (handleRoute === "ImportFile") {

                    } else {
                        if (UserMsg.UserType === "1") {
                            //history.push("/Teacher");
                        } else if (UserMsg.UserType === "0" || UserMsg.UserType === "7") {
                            /*history.push("/All");*/
                        } else {
                            console.log("用户没有权限访问");
                            return;
                        }
                    }
                }
            });

        }else if (parseInt(UserMsg.UserType)===1) {

            console.log(handleRoute);

            QueryOtherPower({
                SchoolID:UserMsg.SchoolID,
                ModuleID: COURECLASS_MODULEID,
                Power:'Teacher_CourseClass_CURD',
                UserType:UserMsg.UserType
            }).then(data=>{

                if (data){

                    if (handleRoute==='Teacher'){

                        dispatch(bannerShow());

                    }else{

                        dispatch(bannerHide());

                    }

                }else{

                    dispatch(bannerHide());

                }

                dispatch(teacherPowerChange(data));

                let SubjectID = DataState.GetCoureClassAllMsg.Subject;
                let GradeID = DataState.GetCoureClassAllMsg.Grade;

                dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });

                if (UserMsg.UserType === "1" && handleRoute === "Teacher") {

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

                    dispatch(appLoadingHide());

                }

            });

        }

    }

  };

  MenuClcik = (id, type, sub = null) => {

    if (type === "All") {
      // history.push("/All");
    } else if (type === "Subject") {
      history.push("/Subject/" + id + "/all");
    } else if (type === "Class") {
      history.push("/Subject/" + sub + "/Class/" + id);
    }

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

    const { dispatch, DataState,history,LoginUser } = this.props;

      const { classInfo } = this.EditClassRef.state;

    let userMsg = LoginUser;
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

    if (
      data.selectData.Teacher.value === data.TeacherID &&
      data.selectData.CourseClass.CourseClassName === data.CourseClassName &&

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

      dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_OPEN });

      isFalse = true
    }

    let Test = /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(value);

    if (!Test) {

      dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_OPEN });

      isFalse = true
    }

      let courseClassStus = data.selectData.Student.map((child, index) => {
          return child.StudentID;
      }).join();

    let classIDs = data.selectData.Class.join();

    let courseClassType = 1;

    if (classInfo.radioValue===1){

          if(!classInfo.dropSelectd.value){

              this.EditClassRef.setState((state)=>{

                  return {...state,classInfo:{...state.classInfo,tip:true}};

              });

              isFalse = true;

          }else{

              classIDs = classInfo.dropSelectd.value;

              courseClassStus = '';

          }

      }else{

          courseClassType = 2;

      }



    if(isFalse){

      return

    }

    dispatch({ type: actions.UpUIState.SUBJECT_TIPS_SHOW_CLOSE });

    dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_CLOSE });

    dispatch({ type: actions.UpUIState.GRADE_TIPS_SHOW_CLOSE });


    let url = "/InsertOrEditCourseClass";



    dispatch({type:actions.UpUIState.MODAL_LOADING_OPEN});

    postData(CONFIG.CourseClassProxy + url,{
        userID: userMsg.UserID,
        userType: userMsg.UserType,
        schoolID: userMsg.SchoolID,
        courseClassName: data.selectData.CourseClass.CourseClassName,
        teacherID: data.selectData.Teacher.value,
        gradeID: data.GradeID,
        subjectID: data.SubjectID,
        courseClassStus,
        courseClassID: data.selectData.CourseClass.CourseClassID,
        classIDs,
        courseClassType

      },2,"json")
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 400) {

        } else if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "成功",
              onHide: this.onAlertWarnHide.bind(this)
            })
          );

          if (userMsg.UserType === 0) {

              if (window.ManageUpDateTable){

                  window.ManageUpDateTable();

              }

          } else if (userMsg.UserType === 1) {

            history.push("/Teacher");

          }

            dispatch(actions.UpUIState.ChangeCourseClassModalClose());
            dispatch(actions.UpDataState.setCourseClassName([]));
            dispatch(actions.UpDataState.setCourseClassStudentMsg([]));
            dispatch(actions.UpDataState.setSubjectTeacherMsg([]));
            dispatch(actions.UpDataState.setClassStudentTransferMsg([]));
            dispatch(actions.UpDataState.setSubjectTeacherTransferMsg([]));
            dispatch(actions.UpDataState.SetCourseClassDefaultMsg({ClassSource:[],Class:[]}));
            dispatch(actions.UpDataState.setClassStudentTransferTransferMsg({ClassSource:[],Class:[]}));
            dispatch(actions.UpDataState.setCourseClassDataMsg({
                Subject: {},
                Grade: {},
                Teacher: [],
                Student: []
            }));

        }

        dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });

      });

  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };

  ChangeCourseClassModalCancel = () => {

    const { dispatch, DataState } = this.props;

    dispatch(actions.UpDataState.setCourseClassName({}));

    dispatch(actions.UpDataState.setSubjectTeacherMsg([]));

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

    const { classInfo } = this.AddCourClassRef.state;

    const { dispatch, DataState,LoginUser,history} = this.props;

    let Student =
      DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student;

    let userMsg = LoginUser;

    let data = DataState.GetCourseClassDetailsHandleClassMsg;

    let route = history.location.pathname;

    let pathArr = route.split("/");

    let handleRoute = pathArr[1];

    let routeID = pathArr[2];

    let subjectID = pathArr[3];

    let classID = pathArr[4];

    let pageIndex = DataState.GetClassAllMsg.allClass.pageIndex;

    let isFalse = false;

    let courseClassType = 1;

    if (data.selectData.CourseClass.CourseClassName === "") {

      dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_OPEN });

      isFalse = true

    }
    let value = data.selectData.CourseClass.CourseClassName;

    let Test = /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(value);

    if (value === "" || value === undefined || !Test) {

      dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_OPEN });

      isFalse = true

    }

    if (data.selectData.Subject && data.selectData.Subject instanceof Object && !data.selectData.Subject.value){

      dispatch({ type: actions.UpUIState.SUBJECT_TIPS_SHOW_OPEN });

      isFalse = true

    }

    if (data.selectData.Grade && data.selectData.Grade instanceof Object && !data.selectData.Grade.value) {

      dispatch({ type: actions.UpUIState.GRADE_TIPS_SHOW_OPEN });

      isFalse = true

    }

    let courseClassStus = data.selectData.Student.map((child, index) => {

          return child.StudentID;

      }).join();

    let classIDs = data.selectData.Class.join();

      if (classInfo.radioValue===1){

        if(!classInfo.dropSelectd.value){

            this.AddCourClassRef.setState((state)=>{

                return {...state,classInfo:{...state.classInfo,tip:true}};

            });

            isFalse = true;

        }else{

            classIDs = classInfo.dropSelectd.value;

            courseClassStus = '';

        }

    }else{

        courseClassType = 2;

    }
    

    if(isFalse){

      return

    }

    dispatch({ type: actions.UpUIState.SUBJECT_TIPS_SHOW_CLOSE });

    dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_CLOSE });

    dispatch({ type: actions.UpUIState.GRADE_TIPS_SHOW_CLOSE });



    let url = "/InsertOrEditCourseClass";


    dispatch({ type: actions.UpUIState.MODAL_LOADING_OPEN });

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
        courseClassStus,
        courseClassID: "",
        classIDs,
        courseClassType
      },
      2,
      "json"
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 400) {

        } else if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "成功",
              onHide: this.onAlertWarnHide.bind(this)
            })
          );
          if (userMsg.UserType ===0) {

            if (window.ManageUpDateTable){

                window.ManageUpDateTable();

            }

          } else if (userMsg.UserType === 1){
            history.push("/Teacher");
          }

            dispatch(actions.UpUIState.AddCourseClassModalClose());

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
            dispatch(actions.UpDataState.setSubjectTeacherMsg([]));

            dispatch(actions.UpDataState.setSubjectTeacherTransferMsg([]));

        }

          dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });

      });

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

  menuClick({id,name}){

        const { dispatch,breadCrumb,history } = this.props;

        const path  = history.location.pathname;

    }

  onRef(ref){

     this.Frame = ref;

  }


  render() {

    const { UIState, DataState,AppLoading,leftMenu,bannerState,history,editCourseClassModal } = this.props;

    let {UserID,UserType} = DataState.LoginUser;



    let route = history.location.pathname.split("/");


    let cnname = "教学班管理";

    let enname = "CoureClass Management";

    let subtitle = '';

    if (route[1] === "Teacher"||(route[1] === "ImportFile"&&DataState.LoginUser.UserType==='1')) {
      cnname = "我的教学班管理";
      enname = "My class Management";
    }else if (route[1] === "Student") {
        cnname = "更换选课";
        enname = "Change Course Selection";
    }

    if (route[1]==='ImportFile'){

        subtitle = '导入教学班';

    }else if (route[1]==='Log'){

        subtitle = route[2]==='Dynamic'?'最新动态':'历史记录';

    }



    const { isWalkingClass } = editCourseClassModal;


    return (

      <React.Fragment>
        <Loading
          tip="加载中..."
          opacity={false}
          size="large"
          spinning={AppLoading}
        >
          <Frame
            pageInit={this.pageInit.bind(this)}
            module={{
              cnname: cnname,
              enname: enname,
              subtitle:subtitle,
              image: logo
            }}
            type="triangle"
            showBarner={bannerState.show}
            showLeftMenu={leftMenu.show}
            onRef={this.onRef.bind(this)}
          >
            <div ref="frame-time-barner">

                <Banner />

            </div>

            <div ref="frame-left-menu">

                <LeftMenu Icon={"pic3"} Menu={leftMenu.menuList} menuClick={this.menuClick.bind(this)}></LeftMenu>

            </div>

            <div ref="frame-right-content">

                <AppRoutes></AppRoutes>

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
        >

        </Alert>

        {/* 模态框 */}
        <Modal
          ref="CourseClassDetailsMadal"
          bodyStyle={{ padding: 0 }}
          width={720}
          type="1"
          destroyOnClose={true}
          title={parseInt(UserType)===1?'学生名单详情':"教学班详情"}
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
          className={`edit-course-class ${this.state.isFrame?'has-in-frame':''}`}
          destroyOnClose={true}
          title={"编辑教学班"}
          bodyStyle={{ height:this.state.isFrame?396:530, padding: 0 }}
          visible={UIState.ChangeCourseClassModalShow.Show}
          onOk={this.ChangeCourseClassModalOk}
          onCancel={this.ChangeCourseClassModalCancel}
        >
          <Loading
            wrapperClassName="handle-laoding"
            opacity={false}
            spinning={AppLoading}
          >

            <HandleCourseClass onRef={ref=>this.EditClassRef=ref} history={history} isFrame={this.state.isFrame}></HandleCourseClass>

          </Loading>
        </Modal>
        <Modal
          ref="AddCourseClassDetailsMadal"
          type="1"
          width={800}
          destroyOnClose={true}
          title={"添加教学班"}
          bodyStyle={{height:this.state.isFrame?396:530, padding: 0 }}
          visible={UIState.AddCourseClassModalShow.Show}
          onOk={this.AddCourseClassModalOk}
          onCancel={this.AddCourseClassModalCancel}
          className={`add-course-class ${this.state.isFrame?'has-in-frame':''}`}

        >
          <Loading
            wrapperClassName="handle-laoding"
            opacity={false}
            spinning={UIState.AppLoading.modalLoading}
          >
            {UIState.AddCourseClassModalShow.Show ? (
              <AddCourseClass
                type={
                  DataState.LoginUser.UserType === "0"||DataState.LoginUser.UserType==='7'||DataState.LoginUser.UserType==="10"
                    ? "Admin"
                    : DataState.LoginUser.UserType === "1"
                    ? "Teacher"
                    : false
                }
                history={history}
                isFrame={this.state.isFrame}

                onRef={ref=>this.AddCourClassRef=ref}

              >

              </AddCourseClass>
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
          bodyStyle={{height:532, padding: 0 }}
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
  let { UIState, DataState,AppLoading,leftMenu,bannerState,LoginUser,editCourseClassModal } = state;
  return {
    UIState,
    DataState,
    AppLoading,
    leftMenu,
    bannerState,
    LoginUser,
    editCourseClassModal
  };
};
export default connect(mapStateToProps)(withRouter(App));
