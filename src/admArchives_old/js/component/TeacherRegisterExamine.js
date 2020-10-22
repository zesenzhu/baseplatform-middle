import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../../images/icon-logo.png";
import { Menu, Loading, Alert } from "../../../common";
import Frame from "../../../common/Frame";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import history from "../containers/history";
import TimeBanner from "./TimeBanner";
import All from "./All";
import Student from "./Student";
import Teacher from "./Teacher";
import Leader from "./Leader";
import actions from "../actions";
import $ from "jquery";

import "../../scss/index.scss";
import TeacherRegisterWillExamine from "./TeacherRegisterWillExamine";
import TeacherRegisterDidExamine from "./TeacherRegisterDidExamine";
// import "../../scss/TeacherRegisterExamine.scss";
import {
  DetailsModal,
  DropDown,
  PagiNation,
  Search,
  Table,
  Button,
  CheckBox,
  CheckBoxGroup,
  Modal,
} from "../../../common/index";
import TeacherLogo from "../../images/teacher-logo.png";
import { getData } from "../../../common/js/fetch";

class TeacherRegisterExamine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handleClick: true,
      UserExamineModalVisible: false,
      userMsg: props.DataState.LoginUser,
      TeacherClass: [],
      logo: logo,
      cnname: "用户档案管理",
      enname: "User Profile Management",
      Admin: true,
    };
    const { dispatch, DataState } = this.props;

    // if (!DataState.GradeClassMsg.returnData)
  }

  componentWillMount() {
    const { DataState, dispatch } = this.props;

    let pathname = history.location.pathname;
    let userMsg = DataState.LoginUser;
    if (
      userMsg.UserType === "0" ||
      userMsg.UserType === "7" ||
      userMsg.UserType === "6" ||
      userMsg.UserType === "10"
    ) {
      //         大学环境下：
      // 0 学院管理员
      // 1 教师
      // 2 学生
      // 6 学校管理员
      // 7 学校领导
      // 10 学院领导
      this.setState({
        logo: logo,
        cnname: "用户档案管理",
        enname: "User Profile Management",
        Admin: true,
      });
      document.title = "用户档案管理";
    } else if (userMsg.UserType === "1" && userMsg.UserClass[2] === "1") {
      this.setState({
        logo: TeacherLogo,
        cnname: "班级管理",
        enname: "Class management",
        Admin: false,
      });
      document.title = "班级管理";
    }

    // console.log("554");
    if (pathname.split("/")[2] === "TeacherRegisterDidExamine") {
      this.setState({
        handleClick: false,
      });
      // console.log("554");

      if (
        userMsg.UserType === "0" ||
        userMsg.UserType === "7" ||
        userMsg.UserType === "6" ||
        userMsg.UserType === "10"
      ) {
        dispatch(
          actions.UpDataState.getTeacherDidSignUpLog(
            "/GetTeacherSignUpLogToPage?SchoolID=" +
              this.state.userMsg.SchoolID +
              "&PageIndex=0&PageSize=10&status=1" +
              (DataState.GetTeacherSignUpLog.Subject.value !== 0
                ? "&SubjectID=" + DataState.GetTeacherSignUpLog.Subject.value
                : "")
          )
        );
      }
    } else if (pathname.split("/")[2] === "TeacherRegisterWillExamine") {
      this.setState({
        handleClick: true,
      });
      // console.log(
      //   "554",
      //   userMsg.UserType === "0" || userMsg.UserType === "7",
      //   userMsg
      // );

      if (
        userMsg.UserType === "0" ||
        userMsg.UserType === "7" ||
        userMsg.UserType === "6" ||
        userMsg.UserType === "10"
      ) {
        dispatch(
          actions.UpDataState.getTeacherWillSignUpLog(
            "/GetTeacherSignUpLogToPage?SchoolID=" +
              this.state.userMsg.SchoolID +
              "&PageIndex=0&PageSize=10&status=0" +
              (DataState.GetTeacherSignUpLog.Subject.value !== 0
                ? "&SubjectID=" + DataState.GetTeacherSignUpLog.Subject.value
                : "")
          )
        );
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch, DataState } = nextProps;
    let TeacherClass = DataState.GradeClassMsg.TeacherClass;
    // console.log(this.state.TeacherClass.length === 0 && TeacherClass[0],this.state.TeacherClass.length === 0 , TeacherClass[0])

    if (this.state.TeacherClass.length === 0 && TeacherClass[0]) {
      // console.log('ss')
      let TeacherClasses = TeacherClass[0];
      if (DataState.GetTeacherSignUpLog.Class.value !== 0) {
        TeacherClasses = DataState.GetTeacherSignUpLog.Class;
      }
      this.setState({
        TeacherClass: TeacherClass,
      });
      // history.listen(() => {
      let userMsg = DataState.LoginUser;

      // console.log('11',DataState.GradeClassMsg.TeacherClass)

      //路由监听
      let pathname = history.location.pathname;
      // console.log(pathname.split('/')[2])
      if (
        userMsg.UserType === "0" ||
        userMsg.UserType === "7" ||
        userMsg.UserType === "6" ||
        userMsg.UserType === "10"
      ) {
      } else if (userMsg.UserType === "1" || userMsg.UserClass[2] === "1") {
        let TeacherClass = DataState.GradeClassMsg.TeacherClass;
        if (!(TeacherClass instanceof Array) || !TeacherClass[0]) {
          return;
        }
        // console.log("11");
        if (pathname.split("/")[2] === "TeacherRegisterDidExamine") {
          this.setState({
            handleClick: false,
          });
          dispatch(actions.UpDataState.setTeacherSignUpLogCountMsg(0));

          dispatch(
            actions.UpDataState.getTeacherDidSignUpLog(
              "/GetTeacherSignUpLogToPage?SchoolID=" +
                this.state.userMsg.SchoolID +
                "&PageIndex=0&PageSize=10&status=1&classID=" +
                TeacherClasses.value
            )
          );
        } else if (pathname.split("/")[2] === "TeacherRegisterWillExamine") {
          this.setState({
            handleClick: true,
          });
          dispatch(
            actions.UpDataState.getTeacherWillSignUpLog(
              "/GetTeacherSignUpLogToPage?SchoolID=" +
                this.state.userMsg.SchoolID +
                "&PageIndex=0&PageSize=10&status=0&classID=" +
                TeacherClasses.value
            )
          );
        }
      }
      // });
    }
  }

  UserExamineMadalOk = (e) => {
    // console.log(e)
    this.setState({
      UserExamineModalVisible: false,
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 3000);
  };
  UserExamineMadalCancel = (e) => {
    // console.log(e)
    this.setState({
      UserExamineModalVisible: false,
    });
  };

  onExaminedClick = () => {
    const { UIState, DataState, dispatch } = this.props;
    let userMsg = DataState.LoginUser;

    let TeacherClass = DataState.GradeClassMsg.TeacherClass;

    // console.log('11',DataState.GradeClassMsg.TeacherClass)
    let TeacherClasses = TeacherClass[0];
    if (DataState.GetTeacherSignUpLog.Class.value !== 0) {
      TeacherClasses = DataState.GetTeacherSignUpLog.Class;
    }
    //路由监听
    let pathname = history.location.pathname;
    // console.log(pathname.split('/')[2])
    if (userMsg.UserType === "0" || userMsg.UserType === "7") {
      // if (pathname.split("/")[2] === "TeacherRegisterDidExamine") {
      this.setState({
        handleClick: false,
      });
      dispatch(actions.UpDataState.setTeacherSignUpLogCountMsg(0));
      // dispatch(
      //   actions.UpDataState.getTeacherDidSignUpLog(
      //     "/GetTeacherSignUpLogToPage?SchoolID=" +
      //       this.state.userMsg.SchoolID +
      //       "&PageIndex=0&PageSize=10&status=1" +
      //       (DataState.GetTeacherSignUpLog.Grade.value !== 0
      //         ? "&gradeID=" + DataState.GetTeacherSignUpLog.Grade.value
      //         : "") +
      //       (DataState.GetTeacherSignUpLog.College.value !== 0
      //         ? "&collegeID=" + DataState.GetTeacherSignUpLog.College.value
      //         : "") +
      //       (DataState.GetTeacherSignUpLog.Major.value !== 0
      //         ? "&majorID=" + DataState.GetTeacherSignUpLog.Major.value
      //         : "") +
      //       (DataState.GetTeacherSignUpLog.Class.value !== 0
      //         ? "&classID=" + DataState.GetTeacherSignUpLog.Class.value
      //         : "")
      //   )
      // );
    } else if (userMsg.UserType === "1" || userMsg.UserClass[2] === "1") {
      let TeacherClass = DataState.GradeClassMsg.TeacherClass;
      if (!(TeacherClass instanceof Array) || !TeacherClass[0]) {
        return;
      }

      this.setState({
        handleClick: false,
      });
      dispatch(actions.UpDataState.setTeacherSignUpLogCountMsg(0));

      // dispatch(
      //   actions.UpDataState.getTeacherDidSignUpLog(
      //     "/GetTeacherSignUpLogToPage?SchoolID=" +
      //       this.state.userMsg.SchoolID +
      //       "&PageIndex=0&PageSize=10&status=1&classID=" +
      //       TeacherClasses.value
      //   )
      // );
    }
  };
  onExaminingClick = () => {
    const { UIState, DataState, dispatch } = this.props;
    let userMsg = DataState.LoginUser;
    // if (userMsg.UserType === "1" || userMsg.UserClass[2] === "1") {
    //   let TeacherClass = DataState.GradeClassMsg.TeacherClass;

    //   // console.log('11')

    //   this.setState({
    //     handleClick: true
    //   });
    //   dispatch(
    //     actions.UpDataState.getTeacherWillSignUpLog(
    //       "/GetTeacherSignUpLogToPage?SchoolID=" +
    //         this.state.userMsg.SchoolID +
    //         "&PageIndex=0&PageSize=10&status=0&classID=" +
    //         TeacherClass[0].value
    //     )
    //   );
    // }
    let TeacherClass = DataState.GradeClassMsg.TeacherClass;

    let TeacherClasses = TeacherClass[0];
    if (DataState.GetTeacherSignUpLog.Class.value !== 0) {
      TeacherClasses = DataState.GetTeacherSignUpLog.Class;
    }
    //路由监听
    let pathname = history.location.pathname;
    // console.log(pathname.split('/')[2])
    if (userMsg.UserType === "0" || userMsg.UserType === "7") {
      // dispatch(
      //   actions.UpDataState.getTeacherWillSignUpLog(
      //     "/GetTeacherSignUpLogToPage?SchoolID=" +
      //       this.state.userMsg.SchoolID +
      //       "&PageIndex=0&PageSize=10&status=0" +
      //       (DataState.GetTeacherSignUpLog.Grade.value !== 0
      //         ? "&gradeID=" + DataState.GetTeacherSignUpLog.Grade.value
      //         : "") +
      //       (DataState.GetTeacherSignUpLog.College.value !== 0
      //         ? "&collegeID=" + DataState.GetTeacherSignUpLog.College.value
      //         : "") +
      //       (DataState.GetTeacherSignUpLog.Major.value !== 0
      //         ? "&majorID=" + DataState.GetTeacherSignUpLog.Major.value
      //         : "") +
      //       (DataState.GetTeacherSignUpLog.Class.value !== 0
      //         ? "&classID=" + DataState.GetTeacherSignUpLog.Class.value
      //         : "")
      //   )
      // );
      this.setState({
        handleClick: true,
      });
      // dispatch(
      //   actions.UpDataState.getTeacherWillSignUpLog(
      //     "/GetTeacherSignUpLogToPage?SchoolID=" +
      //       this.state.userMsg.SchoolID +
      //       "&PageIndex=0&PageSize=10&status=0"+
      //       (DataState.GetTeacherSignUpLog.Grade.value!==0?'&gradeID='+DataState.GetTeacherSignUpLog.Grade.value:'') +
      //       (DataState.GetTeacherSignUpLog.Class.value!==0?'&classID='+DataState.GetTeacherSignUpLog.Class.value:'')
      //   )
      // );
      // }
    } else if (userMsg.UserType === "1" || userMsg.UserClass[2] === "1") {
      let TeacherClass = DataState.GradeClassMsg.TeacherClass;
      if (!(TeacherClass instanceof Array) || !TeacherClass[0]) {
        return;
      }
      // console.log("11");
      // if (pathname.split("/")[2] === "TeacherRegisterDidExamine") {
      //   this.setState({
      //     handleClick: false
      //   });
      //   dispatch(actions.UpDataState.setSignUpLogCountMsg(0));

      // dispatch(
      //   actions.UpDataState.getTeacherDidSignUpLog(
      //     "/GetTeacherSignUpLogToPage?SchoolID=" +
      //       this.state.userMsg.SchoolID +
      //       "&PageIndex=0&PageSize=10&status=1&classID=" +
      //       TeacherClasses.value
      //   )
      // );
      // } else if (pathname.split("/")[2] === "TeacherRegisterWillExamine") {
      this.setState({
        handleClick: true,
      });
      // dispatch(
      //   actions.UpDataState.getTeacherWillSignUpLog(
      //     "/GetTeacherSignUpLogToPage?SchoolID=" +
      //       this.state.userMsg.SchoolID +
      //       "&PageIndex=0&PageSize=10&status=0&classID=" +
      //       TeacherClasses.value
      //   )
      // );
      // }
    }
  };

  render() {
    const { UIState, DataState } = this.props;

    // const data = {
    //     userName: '康欣',
    //     userImg: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
    //     Gende: '男',
    //     userText: '学如逆水行舟，不进则退',
    //     userID: '20170025444',
    //     userGrade: '一年级',
    //     userClass: '1班',
    //     userIDCard: '',
    //     userPhone: '15626248624',
    //     userMail: '1519406168@qq.com',
    //     userAddress: '蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团',
    //     userRegisterTime: '2019-01-01 12:24',
    //     userRegisterIP: '190.163.252.198'
    // };
    let {
      MainData: {
        FrameData: { subtitle, image, enname, cnname },
      },
    } = DataState;
    return (
      <React.Fragment>
        <Frame
          userInfo={{
            name: DataState.LoginUser.UserName,
            image: DataState.LoginUser.PhotoPath,
          }}
          module={{
            cnname: cnname,
            enname: enname,
            image: image,
            subtitle: subtitle,
          }}
          type="circle"
          showLeftMenu={false}
          showBarner={false}
          className={
            this.state.Admin
              ? "TeacherRegister adminFrame"
              : "TeacherRegister teacherFrame"
          }
        >
          <div ref="frame-right-content" key={this.props.location.pathname}>
            <div className="content-top">
              <span className="top-tips">
                <i className="top-icon"></i>教师注册审核
              </span>
            </div>
            <div className="content-main">
              <div className="main-handle">
                {/* <Link to='/RegisterExamine/TeacherRegisterWillExamine'><button onClick={this.onExaminingClick} className={`handle-btn btn-examining ${this.state.handleClick ? 'active' : ''} `} >待审核</button></Link>
                                <Link to='/RegisterExamine/TeacherRegisterDidExamine'><button onClick={this.onExaminedClick} className={`handle-btn btn-examined ${!this.state.handleClick ? 'active' : ''} `} >已审核</button></Link> */}
                <Link
                  to="/TeacherRegisterExamine/TeacherRegisterWillExamine"
                  onClick={this.onExaminingClick}
                  className={`handle-btn btn-examining ${
                    this.state.handleClick ? "active" : ""
                  } `}
                >
                  待审核
                  {/* (
                  {DataState.GetTeacherSignUpLog.WillData.Total
                    ? DataState.GetTeacherSignUpLog.WillData.Total
                    : 0}
                  ) */}
                </Link>
                <Link
                  to="/TeacherRegisterExamine/TeacherRegisterDidExamine"
                  onClick={this.onExaminedClick}
                  className={`handle-btn btn-examined ${
                    !this.state.handleClick ? "active" : ""
                  } `}
                >
                  已审核
                  <span
                    className="newCount"
                    style={{
                      display:
                        DataState.GetTeacherSignUpLog.newStatus === 0
                          ? "none"
                          : "inline-block",
                    }}
                  >
                    {"+" + DataState.GetTeacherSignUpLog.newStatus}
                  </span>
                </Link>
              </div>

              <Router>
                <Route
                  path="/TeacherRegisterExamine/TeacherRegisterWillExamine"
                  exact
                  component={TeacherRegisterWillExamine}
                ></Route>
                <Route
                  path="/TeacherRegisterExamine/TeacherRegisterDidExamine"
                  exact
                  component={TeacherRegisterDidExamine}
                ></Route>
              </Router>
            </div>
          </div>
        </Frame>
        {/* <DetailsModal
                    ref='StudentDetailsMsgModal'
                    visible={this.state.UserExamineModalVisible}
                    onOk={this.UserExamineMadalOk}
                    onCancel={this.UserExamineMadalCancel}
                    data={data}
                    type='examine'
                >

                </DetailsModal> */}
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

export default connect(mapStateToProps)(TeacherRegisterExamine);
