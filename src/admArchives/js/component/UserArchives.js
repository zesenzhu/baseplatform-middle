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
import Graduate from "./Graduate";
import LogDynamic from "./LogDynamic";
import LogRecord from "./LogRecord";
import $ from "jquery";
import "../../scss/index.scss";
import { getData } from "../../../common/js/fetch";

class UserArchives extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MenuParams: {
        MenuBox: {
          display: true,
          width: 240,
          MenuBoxTopPic: "pic1",
        },
        children: [
          {
            key: "All",
            title: "用户档案总览",
            icon: "menu10",
            onTitleClick: this.handleClick.bind(this.key),
            active: true,
            selected: true,
          },
          {
            key: "Student",
            title: "学生档案",
            icon: "menu39",
            onTitleClick: this.handleClick.bind(this.key),
          },
          {
            key: "Teacher",
            title: "教师档案",
            icon: "menu33",
            onTitleClick: this.handleClick.bind(this.key),
          },
          {
            key: "Leader",
            title: "领导档案",
            icon: "menu35",
            onTitleClick: this.handleClick.bind(this.key),
          },
        ],
      },
      showLeftMenu: true,
      showBarner: true,
      route: false,
    };
  }

  componentWillMount() {
    const { DataState, UIState } = this.props;
    let userMsg = DataState.LoginUser;
    this.handleMenu();
    let route = history.location.pathname;
    // 获取接口数据
    //this.requestData(route)
    //let route = history.location.pathname;
    // let userMsg = DataState.LoginUser.SchoolID ? DataState.LoginUser : JSON.parse(sessionStorage.getItem('UserInfo'))
    let pathArr = route.split("/");
    let handleRoute = pathArr[2];
    let ID = pathArr[3];
    if (userMsg.UserType === "7" && userMsg.UserClass === "2") {
      let Menu = this.state.MenuParams;
      let children = Menu.children;
      if (children[children.length - 1].key === "Leader") {
        Menu.children.pop();
      }

      // Menu.children = children;
      this.setState({
        MenuParams: Menu,
      });
    }
    // 获取接口数据
    if (handleRoute === "Graduate") {
      this.setState({
        showLeftMenu: false,
        showBarner: true,
        route: true,
      });
    } else if (handleRoute === "LogDynamic" || handleRoute === "LogRecord") {
      this.setState({
        showLeftMenu: false,
        showBarner: false,
        route: false,
      });
    } else {
      this.setState({
        showLeftMenu: true,
        showBarner: true,
        route: false,
      });
    }
    history.listen(() => {
      //路由监听
      let route = history.location.pathname;

      let pathArr = route.split("/");
      let handleRoute = pathArr[2];
      let ID = pathArr[3];
      // 获取接口数据
      // if (handleRoute === "Graduate") {
      //   this.setState({
      //     showLeftMenu: false,
      //     showBarner: false,
      //     route: true
      //   });
      // } else
      if (handleRoute === "LogDynamic" || handleRoute === "LogRecord") {
        this.setState({
          showLeftMenu: false,
          showBarner: false,
          route: false,
        });
      } else {
        this.setState({
          showLeftMenu: true,
          showBarner: true,
          route: false,
        });
      }

      //   $(".frame_leftmenu_mainitem").removeClass("selected active");
      //   $(".frame_leftmenu_mainitem")
      //     .children("*")
      //     .removeClass("active");
      this.handleMenu();
    });
  }

  //操作左侧菜单，响应路由变化
  handleMenu = () => {
    if (history.location.pathname === "/UserArchives") {
      history.push("/UserArchives/All");
    }
    let path = history.location.pathname.split("/")[2];
    // console.log(path);
    let param = this.state.MenuParams;
    let len = param.children.length;

    for (let i = 0; i < len; i++) {
      param.children[i]["active"] = false;
      param.children[i]["selected"] = false;
      if (path === param.children[i].key) {
        param.children[i]["active"] = true;
        param.children[i]["selected"] = true;
        this.setState({
          MenuParams: param,
        });
        // console.log(param)
      }
    }
  };
  //左侧菜单每项的点击事件
  handleClick = (key) => {
    let route = history.location.pathname;
    // 获取接口数据
    //this.requestData(route)
    //let route = history.location.pathname;
    // let userMsg = DataState.LoginUser.SchoolID ? DataState.LoginUser : JSON.parse(sessionStorage.getItem('UserInfo'))
    let pathArr = route.split("/");
    let handleRoute = pathArr[2];
    // console.log(key);
    if (key !== "All") {
      // console.log(key)
      if (handleRoute === "Student") {
        window.StudentCancelSearch();
      } else if (handleRoute === "Teacher") {
        window.TeacherCancelSearch();
      } else if (handleRoute === "Leader") {
        window.LeaderCancelSearch();
      }
      history.push("/UserArchives/" + key + "/all");
    } else {
      history.push("/UserArchives/" + key);
    }
    // console.log(this.state.MenuParams)
    // this.handleMenu();
  };
  //每个组件的下拉菜单的数据请求
  AllDropDownMenu = (route) => {};

  render() {
    const { UIState, DataState } = this.props;
    // console.log(this.state.MenuParams)
    let {
      MainData: {
        FrameData: { subtitle, image, enname, cnname },
      },
    } = DataState;
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
            showBarner={this.state.showBarner}
            className="myFrame mainFrame"
          >
            <div ref="frame-time-barner">
              <TimeBanner route={this.state.route} />
            </div>
            <div ref="frame-left-menu">
              {/* <Menu params={this.state.MenuParams}> </Menu> */}
            </div>
            <div ref="frame-right-content">
              <Loading
                size={"large"}
                opacity={false}
                spinning={UIState.AppLoading.RightLoading}
              >
                <Route
                  path="/UserArchives/All"
                  history={history}
                  component={All}
                ></Route>
                <Route
                  path="/UserArchives/Student/:GradeID"
                  history={history}
                  component={Student}
                ></Route>
                <Route
                  path="/UserArchives/Teacher/:SubjectID"
                  history={history}
                  component={Teacher}
                ></Route>
                <Route
                  path="/UserArchives/Leader"
                  history={history}
                  component={Leader}
                ></Route>
                <Route
                  path="/UserArchives/Graduate"
                  history={history}
                  component={Graduate}
                ></Route>
                <Route
                  path="/UserArchives/LogDynamic"
                  history={history}
                  component={LogDynamic}
                ></Route>
                <Route
                  path="/UserArchives/LogRecord"
                  history={history}
                  component={LogRecord}
                ></Route>
              </Loading>
            </div>
          </Frame>
        </Loading>
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

export default connect(mapStateToProps)(UserArchives);
