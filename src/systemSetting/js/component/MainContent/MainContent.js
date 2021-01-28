import React, { Component, createRef } from "react";
import Frame from "../../../../common/Frame";
import { TokenCheck_Connect } from "../../../../common/js/disconnect";
import Semester from "../SettingOptions/YearSemesterSetting";
import School from "../SettingOptions/SchoolnfoSetting";
import Subsystem from "../SettingOptions/SubsystemAccessSetting";
import setting from "../../../images/setting_logo.png";
import { Menu } from "../../../../common";
import config from "../../../../common/js/config";
import history from "../../containers/history";
import { QueryPower } from "../../../../common/js/power";
import versionChenck from "../../../../common/js/public";
import UpDataState from "../../action/data/UpDataState";
// import TextBookSetting from "../TextBookSetting";
import TimeBanner from "../newEdition/TimeBanner";

import { connect } from "react-redux";

import DataChange from "../../action/data/DataChange";
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  BrowserRouter,
  Redirect,
} from "react-router-dom";

class MainContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      MenuParams: {
        MenuBox: {
          display: true,
          width: 240,
          MenuBoxTopPic: "pic8",
        },
        children: [
          {
            key: "Semester",
            title: "学年学期设置",
            icon: "menu38",
            onTitleClick: this.handleClick.bind(this.key),
            active: true,
            selected: true,
          },
          {
            key: "School",
            title: "学校基础资料设置",
            icon: "menu44",
            onTitleClick: this.handleClick.bind(this.key),
          },
          // {
          //   key: "TextBookSetting",
          //   title: "教材设置",
          //   icon: "menu41",
          //   onTitleClick: this.handleClick.bind(this.key),
          // },
          {
            key: "Subsystem",
            title: "子系统访问设置",
            icon: "menu43",
            onTitleClick: this.handleClick.bind(this.key),
          },
        ],
      },
      route: false,
      List: [
        { value: "School", title: "学校基础资料设置", icon: "School" },
        { value: "Semester", title: "学年学期设置", icon: "Semester" },
        // {
        //   value: "TextBookSetting",
        //   title: "教材设置",
        //   icon: "TextBookSetting",
        // },
        { value: "Subsystem", title: "子系统访问设置", icon: "Subsystem" },
        // { value: "Face", title: "我的人脸", icon: "Face" },
      ],
      havePower: false,
    };
    const { dispatch } = props;
    const Hash = location.hash;
    versionChenck.IEVersion(); //如果是檢查IE版本是否符合
    this.Frame = createRef();
    //判断是否登录成功
    // TokenCheck_Connect(false, () => {
    //   if (sessionStorage.getItem("UserInfo")) {
    //     const { SchoolID, UserType } = JSON.parse(
    //       sessionStorage.getItem("UserInfo")
    //     );
    //     const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

    //     dispatch(
    //       UpDataState.getLoginUser(
    //         JSON.parse(sessionStorage.getItem("UserInfo"))
    //       )
    //     );
    //     console.log(UserType === "0");
    //     // dispatch(DataChange.getCurrentSbusystemInfo());////模拟测试使用

    //     //判断该用户是否是管理员,如果该用户不是管理员跳转到错误页,
    //     if (UserType !== "0") {
    //       window.location.href = config.ErrorProxy + "/Error.aspx?errcode=E011";
    //     } else {
    //       //如果该用户是管理员则检查用户信息和模块ID是否符合
    //       QueryPower({ UserInfo, ModuleID: "000-2-0-13" }).then((restlu) => {
    //         if (restlu) {
    //           dispatch(DataChange.getCurrentSemester(SchoolID));
    //           //    dispatch(DataChange.getCurrentSchoolInfo(SchoolID));
    //           //    dispatch(DataChange.getCurrentSbusystemInfo({}));
    //           dispatch(DataChange.getServerAdd());
    //         }
    //       });
    //     }
    //   } else {
    //     //如果登录不成功则开启定时器,直到登录后获取到token
    //     let getUserInfo = setInterval(() => {
    //       if (sessionStorage.getItem("UserInfo")) {
    //         const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

    //         const { SchoolID, UserType } = UserInfo;
    //         dispatch(
    //           UpDataState.getLoginUser(
    //             JSON.parse(sessionStorage.getItem("UserInfo"))
    //           )
    //         );
    //         if (UserType !== "0") {
    //           window.location.href =
    //             config.ErrorProxy + "/Error.aspx?errcode=E011";
    //         } else {
    //           //如果该用户是管理员则检查用户信息和模块ID是否符合
    //           QueryPower({ UserInfo, ModuleID: "000-2-0-13" }).then(
    //             (restlu) => {
    //               if (restlu) {
    //                 dispatch(DataChange.getCurrentSemester(SchoolID));
    //                 dispatch(DataChange.getServerAdd());
    //               }
    //             }
    //           );
    //         }
    //         // dispatch(DataChange.getCurrentSbusystemInfo());//模拟测试使用

    //         clearInterval(getUserInfo);
    //       }
    //     }, 20);
    //   }
    // });
  }
  // RequestData =()=>{
  //   const { dispatch } = this.props;
  //   const Hash = location.hash;
  //   const { SchoolID, UserType } = JSON.parse(
  //     sessionStorage.getItem("UserInfo")
  //   );
  //   const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

  //   console.log(UserType === "0");
  //   // dispatch(DataChange.getCurrentSbusystemInfo());////模拟测试使用
  //   let ModuleID = "000001";
  //   //判断该用户是否是管理员,如果该用户不是管理员跳转到错误页,
  //   if (UserType !== "0") {
  //     window.location.href = config.ErrorProxy + "/Error.aspx?errcode=E011";
  //   } else {
  //     //如果该用户是管理员则检查用户信息和模块ID是否符合
  //     // QueryPower({ UserInfo, ModuleID: "000-2-0-13" }).then((restlu) => {
  //     //   console.log(restlu);

  //     //   if (restlu) {
  //       this.Frame.getIdentity({ ModuleID }, (identify) => {
  //         this.setState({
  //           havePower: true,
  //         });
  //         dispatch(DataChange.getCurrentSemester(SchoolID));
  //         //    dispatch(DataChange.getCurrentSchoolInfo(SchoolID));
  //         //    dispatch(DataChange.getCurrentSbusystemInfo({}));
  //         dispatch(DataChange.getServerAdd());
  //       }
  //     )
  //   //   });
  //   // }
  // }
  // }
  // componentWillMount() {
  //   const { dispatch, DataState } = this.props;

  //   // 获取人脸库地址
  //   dispatch(
  //     UpDataState.GetSubSystemsMainServerBySubjectID({
  //       fn: () => {
  //         //   this.SetBannerList(); //获取到后再次进行列表更新
  //       },
  //     })
  //   );
  // }
  // 设置banner的选择列表
  SetBannerList = () => {
    let {
      dispatch,
      DataState: {
        OtherData: { SysUrl },
      },
      PublicState: {
        LoginMsg: { UserType, UserClass, Role },
      },
    } = this.props;
    let BannerList = [];
    let BannerInitList = this.state.List;
    // Role为领导的时候不能显示领导，
    // ProductType===6,3，适配人工智能实训室，不要领导
    // LockerVersion===1 ，校园基础信息管理 XG5.2-免费版,1为基础版，不要毕业生
    BannerInitList instanceof Array &&
      BannerInitList.forEach((child, index) => {
        if (child.value === "Face") {
          if (
            SysUrl instanceof Array &&
            SysUrl.length > 0 &&
            Role.includes("Admin")
          ) {
            let token = sessionStorage.getItem("token");
            BannerList.push({
              url: SysUrl[0].WebSvrAddr + "/MyFace.html?type=1&lg_tk=" + token,
              ...child,
            });
          }
        } else {
          BannerList.push(child);
        }
      });
    this.setState({
      List: BannerList,
    });
    // dispatch(CommonAction.SetBannerParams(BannerList));
  };
  //操作左侧菜单，响应路由变化
  handleMenu = (key) => {
    // if (history.location.pathname === "/MainContent") {
    //   history.push("/MainContent/Semester");
    // }
    let path = key ? key : history.location.pathname.split("/")[2];
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
    // console.log(key);

    history.push("/MainContent/" + key);

    // console.log(this.state.MenuParams)
    // this.handleMenu();
  };
  RequestData = (key) => {
    const { dispatch } = this.props;
    let route = history.location.pathname;
    const { SchoolID, UserType } = JSON.parse(
      sessionStorage.getItem("UserInfo")
    );
    const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
    dispatch(UpDataState.getLoginUser(UserInfo));

    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    let Params = pathArr[2];
    if (handleRoute !== "MainContent") {
      history.push("/MainContent/School");
      this.handleMenu("School");

      //   return;
    } else if (
      Params === "School" ||
      Params === "Subsystem" ||
      // Params === "TextBookSetting" ||
      Params === "Semester"
    ) {
      history.push("/MainContent/" + Params);
      this.handleMenu(Params);
    } else {
      history.push("/MainContent/School");
      this.handleMenu("School");

      //   return;
    }
    let ModuleID = "000001";
    this.Frame.getIdentity({ ModuleID }, (identify) => {
      this.setState({
        havePower: true,
      });
      dispatch(DataChange.getCurrentSemester(SchoolID));
      //    dispatch(DataChange.getCurrentSchoolInfo(SchoolID));
      //    dispatch(DataChange.getCurrentSbusystemInfo({}));
      dispatch(DataChange.getServerAdd());
    });
  };
  // 获取frame的ref
  onRef = (ref) => {
    this.Frame = ref;
  };
  render() {
    let UserName = "";
    let PhotoPath = "";
    let UserID = "";

    //获取用户信息，并渲染到骨架上
    if (sessionStorage.getItem("UserInfo")) {
      const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
      UserName = UserInfo.UserName;
      PhotoPath = UserInfo.PhotoPath;
      UserID = UserInfo.UserID;
    }
    // else {
    //   return <div></div>;
    // }

    // console.log(this.props)
    let path = history.location.pathname.split("/")[2];
    let isImport = false;
    if (path === "Import") {
      isImport = true;
    }
    // console.log(path)
    if (
      path !== "Semester" &&
      path !== "School" &&
      path !== "Subsystem"
      // &&
      // path !== "TextBookSetting"
    ) {
      history.push("/MainContent/School");
    }
    let {
      DataState: { LoginUser },
    } = this.props.state;
    return (
      <Frame
        showLeftMenu={false}
        showBarner={true}
        type={"triangle"}
        module={{
          image: setting,
          cnname: "系统设置",
          enname: "System Settings",
        }}
        userInfo={{ name: UserName, image: PhotoPath }}
        pageInit={this.RequestData}
        onRef={this.onRef.bind(this)}
      >
        {/* <div ref="frame-left-menu">
          <Menu params={this.state.MenuParams}></Menu>
        </div> */}
        <div ref="frame-time-barner">
          <TimeBanner path={path} List={this.state.List} />
        </div>
        {this.state.havePower ? (
          <div ref="frame-right-content">
            <Router>
              <Route
                path="/MainContent/Semester*"
                exact
                history={history}
                component={Semester}
              ></Route>

              <Route
                path="/MainContent/School*"
                exact
                history={history}
                component={School}
              ></Route>

              <Route
                path="/MainContent/Subsystem*"
                exact
                history={history}
                component={Subsystem}
              ></Route>
              {/* <Route
                path="/MainContent/TextBookSetting"
                exact
                history={history}
                component={TextBookSetting}
              ></Route> */}
              {/* <Redirect path="/*" to="/MainContent/Semester"></Redirect> */}
            </Router>
          </div>
        ) : (
          ""
        )}
      </Frame>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(MainContent);
