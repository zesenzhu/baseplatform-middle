import React, { Component } from "react";
import {
  Menu,
  Loading,
  Alert,
  Modal,
  Button,
  Empty,
  Search,
} from "../../../common";
import { connect } from "react-redux";
import Frame from "../../../common/Frame";

import { Modal as AntdModal, Input } from "antd";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Grade from "../component/Grade";
import Class from "../component/Class";
import ClassDetails from "../component/ClassDetails/index";
import history from "./history";
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
import Public from "../../../common/js/public";
import { Select } from "antd";
import Scrollbars from "react-custom-scrollbars";
import logo from "../../images/logo.png";
import Barner from "../component/Barner";
import { QueryPower, QueryOtherPower } from "../../../common/js/power/index";

const { Bs2CsProxy } = CONFIG;
let { getQueryVariable } = Public;
const { UpDataState, UpUIState, PublicAction } = actions;
class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      UserMsg: props.PublicState.LoginMsg,
    };
  }

  componentWillMount() {
    const { dispatch, DataState } = this.props;
    let route = history.location.pathname;
    //判断token是否存在
    let that = this;
  }

  // 第一次访问所要请求的接口
  RequestData = () => {
    const { dispatch, DataState, PublicState } = this.props;
    if (!PublicState.LoginMsg.isLogin) {
      //查询userInfo是否存在
      if (JSON.parse(sessionStorage.getItem("UserInfo"))) {
        dispatch(
          PublicAction.getLoginUser(
            JSON.parse(sessionStorage.getItem("UserInfo"))
          )
        );
        this.RequestData();
        return;
      } else {
        return;
      }
    }

    let userMsg = PublicState.LoginMsg.isLogin
      ? PublicState.LoginMsg
      : JSON.parse(sessionStorage.getItem("UserInfo"));
    if (!userMsg.SchoolID) {
      return;
    }
    let havePower = QueryPower({
      UserInfo: userMsg,
      ModuleID: "000-2-0-06",
    });
    console.log(userMsg.UserType==='1')
    if(userMsg.UserType==='1'){//教师直接跳到旧的班级管理
      window.location.href = "/html/class#/"
      // window.open("/html/class#/");
    }
    havePower.then((res) => {
      if (res) {
        this.UserPower({
          UserType: userMsg.UserType,
          UserClass: userMsg.UserClass,
          dispatch,
        });
        this.ListenRoute({ isFirst: true });
        history.listen(() => {
          this.ListenRoute({});
        });
        dispatch(PublicAction.AppLoadingClose());
      }
    });

    // console.log(userMsg.UserType,userMsg.UserClass,userMsg.UserType !== "6" || userMsg.UserClass !== "2")
  };
  ListenRoute = ({ isFirst = false }) => {
    const {
      dispatch,
      DataState: {
        CommonData: { UserPower },
      },
      PublicState: {
        LoginMsg: { UserType, UserClass, GroupID, GroupName },
      },
    } = this.props;
    //console.log(UserPower);
    let route = history.location.pathname;

    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    let Params = pathArr[2];

    // 进行角色权限分类
    if (UserType === "" || UserType === undefined) {
      return;
    }

    // if (isFirst) {
    //   this.UserPower({UserType, UserClass,dispatch});
    // }
    if (handleRoute === "Grade") {
      if (UserPower === "Admin" || UserPower === "TeachingLeader") {
        //教务主任和管理员可以景来
        dispatch(UpDataState.GetSummary({}));
      } else {
        window.location.href = CONFIG.ErrorProxy + "/Error.aspx?errcode=E011";
      }
    } else if (handleRoute === "Class") {
      if (UserPower === "Admin" || UserPower === "TeachingLeader") {
        // 有路由变化都要改变数据储存，初始
        dispatch(
          UpDataState.SetClassParams({
            GradeID: "",
            Keyword: "",
            PageIndex: 0,
            PageSize: 12,
            SearchValue: "",
            CancelBtnShow: "n",
          })
        );
        //教务主任和管理员可以景来
        dispatch(UpDataState.GetSummary({}));
        dispatch(UpDataState.GetGradeSummary({}));
      } else {
        window.location.href = CONFIG.ErrorProxy + "/Error.aspx?errcode=E011";
      }
    } else if (handleRoute === "ClassDetails") {
      console.log(UserPower);
      if (UserPower === "Admin" || UserPower === "TeachingLeader") {
         
        dispatch(UpDataState.SetTopLeftData({
          cnname: <span>年级班级管理<span className='tl-title'>-班级详情</span></span>
        }))
        dispatch(
          UpDataState.SetClassDetailsParams({
            ClassID: Params,
            Keyword: "",
            PageIndex: 0,
            PageSize: 20,
            SearchValue: "",
            CancelBtnShow: "n",
            CheckAll: false,
            CheckList: [],
          })
        );
        //教务主任和管理员，学生，教师可以景来
        dispatch(UpDataState.GetClassTeacher({}));
        dispatch(UpDataState.GetStudentToPage({}));
        // dispatch(UpDataState.GetGradeSummary({}));
      } else if (UserPower === "Student") {
        dispatch(UpDataState.SetTopLeftData({
          cnname: '我的行政班',
          enname:"My Class",
        }))
        dispatch(
          UpDataState.SetClassDetailsParams({
            ClassID: GroupID,
            Keyword: "",
            PageIndex: 0,
            PageSize: 20,
            SearchValue: "",
            CancelBtnShow: "n",
            CheckAll: false,
            CheckList: [],
          })
        );
        //教务主任和管理员，学生，教师可以景来
        dispatch(UpDataState.GetClassTeacher({}));
        dispatch(UpDataState.GetStudentToPage({}));
      } else if (UserPower === "Teacher") {
      } else {
        window.location.href = CONFIG.ErrorProxy + "/Error.aspx?errcode=E011";
      }
    } else {
      //当做年级
      history.push("Grade");
      this.ListenRoute({});//因为直接push会导致界面数据不刷新，所以暂时手动给刷新
    }

    // dispatch(
    //   UpDataState.SetSelectGradeData({
    //     value: "",
    //     title: "全部年级",
    //   })
    // );
  };
  UserPower = ({ UserType, UserClass, dispatch, func = () => {} }) => {
    if (UserType === "" || UserType === undefined) {
      return false;
    } else {
      try {
        UserType = UserType.toString();
        UserClass = UserClass.toString();
        let UserPower = "";
        if (UserType === "7" && UserClass === "2") {
          //教务主任
          UserPower = "TeachingLeader";
        } else if (UserType === "0") {
          //管理员
          UserPower = "Admin";
        } else if (UserType === "1") {
          //教师
          if (UserClass[2] === "1") {
            UserPower = "MainTeacher";
          } else {
            UserPower = "Teacher";
          }
        } else if (UserType === "2" || UserType === "3") {
          //学生，家长当学生处理
          UserPower = "Student";
        } else {
          //其它的不能进入
          UserPower = "";
        }
        dispatch(UpDataState.SetUserPower(UserPower));
      } catch (e) {
        console.error("权限分析有问题:" + e);
      }
    }
  };
  render() {
    const {
      UIState,
      DataState: {
        CommonData: { UserPower, TopLeftData },
      },
      PublicState: {
        Loading: { AppLoading },
        Alert: {
          appAlert,
          title,
          type,
          littleTitle,
          onOk,
          onHide,
          onCancel,
          onClose,
        },
        LoginMsg: { UserName, PhotoPath },
      },
    } = this.props;
    let pathname = history.location.pathname;

    let pathArr = pathname.split("/");
    let handleRoute = pathArr[1];
    return (
      <React.Fragment>
        <Router>
          <Loading
            opacity={false}
            tip="加载中..."
            size="large"
            spinning={AppLoading}
          >
            <Frame
              type="triangle"
              showBarner={
                handleRoute !== "ClassDetails" ||
                (UserPower === "MainTeacher" && handleRoute === "ClassDetails")
                  ? true
                  : false
              }
              style={{
                display: `${UIState.AppLoading.show ? "none" : "block"}`,
              }}
              //userInfo={{name:DataState.LoginUser.UserName,image:DataState.LoginUser.PhotoPath}}
              userInfo={{
                name: UserName,
                image: PhotoPath,
              }}
              module={{
                cnname: TopLeftData.cnname,
                enname: TopLeftData.enname,
                image: TopLeftData.image,
              }}
              pageInit={this.RequestData}
            >
              <div ref="frame-time-barner">
                <Barner></Barner>
              </div>
              <div ref="frame-right-content">
                <Router>
                  <Route path="/Grade" component={Grade}></Route>
                  <Route path="/Class" component={Class}></Route>
                  <Route path="/ClassDetails" component={ClassDetails}></Route>
                </Router>
              </div>
            </Frame>
          </Loading>
        </Router>
        <Alert
          show={appAlert}
          type={type}
          abstract={littleTitle}
          title={title}
          onOk={onOk}
          onHide={onHide}
          onCancel={onCancel}
          onClose={onClose}
        ></Alert>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  let { UIState, DataState, PublicState } = state;
  return {
    UIState,
    DataState,
    PublicState,
  };
};
export default connect(mapStateToProps)(App);
