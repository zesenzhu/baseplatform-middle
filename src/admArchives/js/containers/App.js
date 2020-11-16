import React, { Component, createRef } from "react";
import {
  Menu,
  Loading,
  Alert,
  Modal,
  // Frame,
  Button,
  Empty,
  Search,
  DetailsModal,
} from "../../../common";
import Frame from "../../../common/Frame";
import { connect } from "react-redux";
import { Modal as AntdModal, Input } from "antd";
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  // IndexRedirect ,
  BrowserRouter,
} from "react-router-dom";
import { IndexRedirect } from "react-router";
import Main from "../component/Main";
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
import Icon, { CaretDownOutlined } from "@ant-design/icons";
// import { console } from "es6-shim";
import UserArchives from "../component/UserArchives";
import All from "../component/UserArchives/All";
import Student from "../component/UserArchives/Student";
import ImportFile from "../component/ImportFile";
import RegisterExamine from "../component/StudentRegisterExamine";
import TeacherRegisterExamine from "../component/TeacherRegisterExamine";
import TimeBanner from "../component/Common/TimeBanner";
import TeacherLogo from "../../images/Frame/teacher-logo.png";
import logo from "../../images/Frame/icon-logo.png";

const { Bs2CsProxy } = CONFIG;
let { getQueryVariable, matchParamfromArray } = Public;
const { MainAction, CommonAction, PublicAction } = actions;
class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      UserMsg: props.PublicState.LoginMsg,
    };
    this.Frame = createRef();
  }

  componentWillMount() {
    const { dispatch, DataState } = this.props;
    let route = history.location.pathname;
    //判断token是否存在
    let that = this;

    // 获取人脸库地址
    dispatch(
      MainAction.GetSubSystemsMainServerBySubjectID({
        fn: () => {
          this.SetBannerList(); //获取到后再次进行列表更新
        },
      })
    );
  }

  // 第一次访问所要请求的接口
  RequestData = () => {
    const { dispatch, DataState, PublicState } = this.props;
    // if (!PublicState.LoginMsg.isLogin) {
    // console.log(this.Frame.getIdentity)
    let route = history.location.pathname.slice(1);
    // console.log(history, route);
    let pathArr = route.split("/");
    // console.log(pathArr)
    if (JSON.parse(sessionStorage.getItem("UserInfo"))) {
      let userMsg = JSON.parse(sessionStorage.getItem("UserInfo"));

      if (!userMsg.SchoolID) {
        //做字段排除，不存在就不能进界面
        return;
      }
      let ModuleID = "000012";
      if (
        userMsg.UserType === "1" &&
        ((pathArr[0] === "ImportFile" && pathArr[1] === "Student") ||
          pathArr[0] === "RegisterExamine")
      ) {
        ModuleID = "000014";
      }
      // return;
      userMsg = this.setRole(userMsg);
      dispatch(
        PublicAction.getLoginUser(
          // ...JSON.parse(sessionStorage.getItem("UserInfo")),
          userMsg
        )
      );
      // 数据请求前的处理
      this.SetRoleLeader(); //权限升级身份后没有领导
      this.SetRoleCollege();
      this.SetRoleTeacher();
      this.SetProductTypeLeader();
      this.SetBannerList();
      dispatch(MainAction.GetUnreadLogCount({}));
      this.Frame.getIdentity({ ModuleID }, (identify) => {
        // console.log(identify)
        userMsg = this.setRole(userMsg, identify);
        dispatch(
          PublicAction.getLoginUser(
            // ...JSON.parse(sessionStorage.getItem("UserInfo")),
            userMsg
          )
        );
        this.RouteListening({ isFirst: true });

        history.listen(() => this.RouteListening({}));
        // this.RequestData();
        dispatch(PublicAction.AppLoadingClose());
      });
    }
    //查询userInfo是否存在

    // }

    // console.log(userMsg.UserType,userMsg.UserClass,userMsg.UserType !== "6" || userMsg.UserClass !== "2")
  };
  // 工作平台班级选择
  MatchParam = (fn) => {
    let {
      DataState: {
        MainData: {
          StudentTree: { CollegeList },
          TeacherClassList,
        },
        CommonData: {
          RolePower: { IsTeacher },
        },
      },
      dispatch,
    } = this.props;
    // 适配工作平台跳转到对应班级
    if (IsTeacher) {
      matchParamfromArray({ array: TeacherClassList }, (res) => {
        if (res) {
          dispatch(
            CommonAction.SetRegisterExamineParams({
              classID: res.value,
              className: res.title,

              keyword: "",
              pageIndex: 0,
              checkedList: [],
              checkAll: false,
            })
          );
          dispatch(MainAction.GetSignUpLogToPage({}));
        } else {
          fn();
        }
      });
    }
  };
  // 路由监听
  RouteListening = ({ isFirst = false, fn = () => {} }) => {
    const {
      dispatch,
      DataState: {
        CommonData: {
          RolePower: {
            LockerVersion_1,
            IsTeacher,
            IsLeader,
            IsCollege,
            NoLeader,
          },
          RegisterExamineParams: { classID, className },
        },
      },
      PublicState: {
        LoginMsg: { CollegeID, CollegeName },
      },
    } = this.props;
    let Route = this.ConstructRoute();
    dispatch(CommonAction.SetRouteParams(Route));

    let FirstRoute = Route[0];
    let SecondRoute = Route[1];
    console.log("第一", FirstRoute, IsTeacher);

    if (IsTeacher) {
      //教师只能进审核
      if (FirstRoute !== "RegisterExamine") {
        this.SetRegisterExamineDefaultRoute();
        // return;
      }
      document.title = "班级管理";
      dispatch(
        CommonAction.SetFrameParams({
          showBarner: false,
          image: TeacherLogo,
          cnname: "班级管理",
          enname: "Class management",
          className: "ClassFrame",
          subtitle: "学生注册",
        })
      );
    } else {
      document.title = "用户档案管理";
      dispatch(
        CommonAction.SetFrameParams({
          cnname: "用户档案管理",
          enname: "User Profile Management",
          image: logo,
          showLeftMenu: false,
          showBarner: true,
          type: "circle",
          className: "UserFrame",
        })
      );
    }

    if (IsLeader || IsCollege) {
      if (
        (FirstRoute === "UserArchives" && SecondRoute === "Leader") ||
        (FirstRoute === "ImportFile" && SecondRoute === "Leader")
      ) {
        //学院没有领导
        this.SetFirstDefaultRoute({ isFirst: true });
        return;
      }
    }
    if (IsLeader) {
      //领导没有档案动态
      if (
        FirstRoute === "UserArchives" &&
        (SecondRoute === "LogDynamic" || SecondRoute === "LogRecord")
      ) {
        this.SetFirstDefaultRoute({ isFirst: true });
        return;
      }
    }
    if (LockerVersion_1) {
      if (
        FirstRoute === "RegisterExamine" ||
        FirstRoute === "TeacherRegisterExamine" ||
        (FirstRoute === "UserArchives" && SecondRoute === "Graduate")
      ) {
        //基础版本没有注册审核和毕业生
        this.SetFirstDefaultRoute({ isFirst: true });
        return;
      }
    }
    if (FirstRoute === "All") {
    } else if (FirstRoute === "UserArchives") {
      if (
        SecondRoute === "Student" ||
        SecondRoute === "Teacher" ||
        SecondRoute === "Leader" ||
        SecondRoute === "Graduate" ||
        SecondRoute === "All"
      ) {
        console.log(NoLeader);
        if (NoLeader && SecondRoute === "Leader") {
          this.SetFirstDefaultRoute({ isFirst: true });
          // return;
        } else {
          dispatch(
            CommonAction.SetFrameParams({
              showBarner: true,
              subtitle: "",
            })
          );
          // console.log(SecondRoute);
          dispatch(MainAction.GetUnreadLogCount({}));
          this.AllGetData({ type: SecondRoute });
        }
      } else if (SecondRoute === "LogDynamic" || SecondRoute === "LogRecord") {
        dispatch(
          CommonAction.SetFrameParams({
            showBarner: false,
            subtitle:
              SecondRoute === "LogDynamic" ? "最近档案动态" : "档案变更记录",
          })
        );
        this.AllGetData({ type: SecondRoute });
      } else {
        this.SetFirstDefaultRoute({ isFirst: true });
      }
    } else if (FirstRoute === "RegisterExamine") {
      let RegisterParams = {
        keyword: "",
        pageIndex: 0,
        // pageSize: 10,
        sortFiled: "UserID",
        sortType: "",
        cancelBtnShow: "n",
        searchValue: "",
        checkedList: [],
        checkAll: false,
      };
      if (IsCollege) {
        RegisterParams.collegeID = CollegeID;
        RegisterParams.collegeName = CollegeName;
      }
      if (LockerVersion_1) {
        //基础版不要注册审核
        this.SetFirstDefaultRoute({ isFirst: true });
        return;
      }
      dispatch(
        CommonAction.SetFrameParams({
          showBarner: false,
          subtitle: "学生注册审核",
        })
      );
      // 教师
      if (IsTeacher) {
        if (classID) {
          if (SecondRoute === "RegisterWillExamine") {
            dispatch(
              CommonAction.SetRegisterExamineParams({
                status: 0,
                ...RegisterParams,
              })
            );
            dispatch(MainAction.GetSignUpLogToPage({}));
          } else if (SecondRoute === "RegisterDidExamine") {
            dispatch(
              CommonAction.SetRegisterExamineParams({
                status: 1,
                ...RegisterParams,
              })
            );
            dispatch(MainAction.GetSignUpLogToPage({}));
          } else {
            this.SetRegisterExamineDefaultRoute();
          }
        } else {
          dispatch(
            MainAction.GetClassAndPower({
              isLoading: true,
              fn: (State) => {
                const {
                  // dispatch,
                  DataState: {
                    MainData: { TeacherClassList },
                  },
                  PublicState,
                } = State;
                this.MatchParam(() => {
                  if (SecondRoute === "RegisterWillExamine") {
                    dispatch(
                      CommonAction.SetRegisterExamineParams({
                        ...RegisterParams,
                        classID: TeacherClassList[0].value,
                        className: TeacherClassList[0].title,
                        status: 0,
                      })
                    );
                    dispatch(MainAction.GetSignUpLogToPage({}));
                  } else if (SecondRoute === "RegisterDidExamine") {
                    dispatch(
                      CommonAction.SetRegisterExamineParams({
                        ...RegisterParams,

                        classID: TeacherClassList[0].value,
                        className: TeacherClassList[0].title,
                        status: 1,
                      })
                    );
                    dispatch(MainAction.GetSignUpLogToPage({}));
                  } else {
                    this.SetRegisterExamineDefaultRoute();
                  }
                });
              },
            })
          );
        }
      } else {
        //管理员
        if (SecondRoute === "RegisterWillExamine") {
          dispatch(MainAction.GetTree({ isLoading: isFirst }));

          dispatch(
            CommonAction.SetRegisterExamineParams({
              ...RegisterParams,

              status: 0,
            })
          );
          dispatch(MainAction.GetSignUpLogToPage({}));
        } else if (SecondRoute === "RegisterDidExamine") {
          dispatch(MainAction.GetTree({ isLoading: isFirst }));

          dispatch(
            CommonAction.SetRegisterExamineParams({
              ...RegisterParams,

              status: 1,
            })
          );
          dispatch(MainAction.GetSignUpLogToPage({}));
        } else {
          this.SetRegisterExamineDefaultRoute();
        }
      }
    } else if (FirstRoute === "TeacherRegisterExamine") {
      let RegisterParams = {
        keyword: "",
        pageIndex: 0,
        // pageSize: 10,
        sortFiled: "UserID",
        sortType: "",
        cancelBtnShow: "n",
        searchValue: "",
        checkedList: [],
        checkAll: false,
      };
      if (LockerVersion_1) {
        //基础版不要注册审核
        this.SetFirstDefaultRoute({ isFirst: true });
        return;
      }

      dispatch(
        CommonAction.SetFrameParams({
          showBarner: false,
          subtitle: "教师注册审核",
        })
      );
      if (IsCollege) {
        RegisterParams.collegeID = CollegeID;
        RegisterParams.collegeName = CollegeName;
      }
      if (SecondRoute === "TeacherRegisterWillExamine") {
        dispatch(MainAction.GetSubject({ isLoading: false }));

        dispatch(
          CommonAction.SetRegisterExamineParams({
            ...RegisterParams,

            status: 0,
          })
        );
        dispatch(MainAction.GetTeacherSignUpLogToPage({}));
      } else if (SecondRoute === "TeacherRegisterDidExamine") {
        dispatch(MainAction.GetSubject({ isLoading: false }));

        dispatch(
          CommonAction.SetRegisterExamineParams({
            ...RegisterParams,

            status: 1,
          })
        );
        dispatch(MainAction.GetTeacherSignUpLogToPage({}));
      } else {
        this.SetTeacherRegisterExamineDefaultRoute();
      }
    } else if (FirstRoute === "ImportFile") {
      dispatch(
        CommonAction.SetFrameParams({
          showBarner: false,
          className: "ImportFrame",
          subtitle:
            SecondRoute === "Student"
              ? "导入学生档案"
              : SecondRoute === "Teacher"
              ? "导入教师档案"
              : SecondRoute === "Graduate"
              ? "导入毕业生档案"
              : SecondRoute === "Leader"
              ? "导入领导档案"
              : "",
        })
      );
      if (
        SecondRoute === "Student" ||
        SecondRoute === "Teacher" ||
        SecondRoute === "Graduate" ||
        SecondRoute === "Leader"
      ) {
      } else {
        this.SetFirstDefaultRoute({ isFirst: true });
      }
    } else {
      this.SetFirstDefaultRoute({ isFirst: true });
    }
    fn();
    // history.push("11");
    console.log(history, Route);
  };
  // 设置点击头部列表事件
  SelectMenu = (data) => {
    //value
    const {
      dispatch,
      DataState: {
        CommonData: { BannerList },
      },
      PublicState,
    } = this.props;
    let { value: key, url } = BannerList.find((child) => child.value === data);
    let handleRoute = this.ConstructRoute(1);

    if (key === "Face") {
      window.open(url);
    } else {
      history.push("/UserArchives/" + key);
      if (key === handleRoute) {
        //如果路由不变，但点击菜单，默认是不会进行数据请求的
        this.AllGetData({ type: key });
      }
    }

    // history.push('/'+key)
  };
  // 数据请求汇总
  AllGetData = ({ type = "All", fn = () => {} }) => {
    let {
      dispatch,
      PublicState: {
        LoginMsg: { Role, CollegeID, CollegeName },
      },
      DataState: {
        CommonData: {
          RolePower: { IsCollege },
          RouteData,
          InitLeaderParams,
          InitGraduateParams,
          InitLogParams,
        },
      },
    } = this.props;
    // let isCollege = Role.includes("College"); //判断是否是学院领导或管理员
    // console.log(type, IsCollege);

    if (type === "Student") {
      if (RouteData[2]) {
        //如果有值，说明是要进行学院或专业筛选，需等待下拉数据回来
        dispatch(
          MainAction.GetTree({
            // isLoading: isFirst,
            fn: (State) => {
              this.GetStudentModuleData(RouteData[2]);
            },
          })
        );
      } else {
        dispatch(MainAction.GetTree({}));
        this.GetStudentModuleData();
      }
    } else if (type === "Teacher") {
      if (RouteData[2]) {
        //如果有值，说明是要进行学院或专业筛选，需等待下拉数据回来
        dispatch(
          MainAction.GetSubject({
            fn: (State) => {
              this.GetTeacherModuleData(RouteData[2]);
            },
          })
        );
      } else {
        dispatch(MainAction.GetSubject({}));
        this.GetTeacherModuleData();
      }
      // dispatch(MainAction.GetSubject({}));
    } else if (type === "Leader") {
      dispatch(CommonAction.SetLeaderParams(InitLeaderParams));
      dispatch(MainAction.GetLeaderToPage({}));
    } else if (type === "Graduate") {
      if (IsCollege) {
        //是学院，直接确定学院
        InitGraduateParams = {
          ...InitGraduateParams,
          collegeID: CollegeID,
          collegeName: CollegeName,
        };
      }
      dispatch(CommonAction.SetGraduateParams(InitGraduateParams));
      dispatch(
        MainAction.GetGraduateTree({
          fn: (State) => {},
        })
      );
      dispatch(MainAction.GetGraduateToPage({}));
    } else if (type === "All") {
      if (IsCollege) {
        dispatch(MainAction.GetCollegeSummary({}));
      } else {
        dispatch(MainAction.GetSchoolSummary({}));
      }
    } else if (type === "LogDynamic") {
      dispatch(MainAction.GetTree({}));

      if (IsCollege) {
        InitLogParams = { ...InitLogParams, CollegeID, CollegeName };
      }
      dispatch(CommonAction.SetLogParams(InitLogParams));
      dispatch(MainAction.GetUnreadLogToPage({}));
    } else if (type === "LogRecord") {
      dispatch(MainAction.GetTree({}));

      if (IsCollege) {
        InitLogParams = { ...InitLogParams, CollegeID, CollegeName };
      }
      dispatch(CommonAction.SetLogParams(InitLogParams));
      dispatch(MainAction.GetAllLogToPage({}));
    }
    fn();
  };
  GetStudentModuleData = (id) => {
    //id为链接上的
    let {
      dispatch,
      PublicState: {
        LoginMsg: { Role, CollegeID, CollegeName },
      },
      DataState: {
        CommonData: {
          RolePower: { IsCollege },
          RouteData,
          StudentParams: { collegeID },
          InitStudentParams,
        },
        MainData: {
          StudentTree: { CollegeList, MajorList, GradeList },
        },
      },
    } = this.props;
    let data = { ...InitStudentParams }; //初始学生参数
    // console.log(id);
    if (IsCollege) {
      //是学院且参数没选择，第一次进来
      //学院的
      data.collegeID = CollegeID;
      data.collegeName = CollegeName;
      let major;
      if (id) {
        if ((major = MajorList.find((child) => child.value === id))) {
          //专业
          data.majorID = major.value;
          data.majorName = major.title;
        } else {
          //不存在，说明有误
          history.push("/UserArchives/Student");
          return;
        }
      }
      dispatch(
        CommonAction.SetRegisterExamineParams({
          collegeID: CollegeID,
          collegeName: CollegeName,
        })
      );
    } else {
      //学校
      let college;

      if (id) {
        if ((college = GradeList.find((child) => child.value === id))) {
          //学院
          data.gradeID = college.value;
          data.gradeName = college.title;
        } else {
          //不存在，说明有误
          history.push("/UserArchives/Student");
          return;
        }
      }
    }
    dispatch(
      CommonAction.SetStudentParams({
        ...data,
      })
    );
    dispatch(MainAction.GetSignUpLogToPage({ isLoading: false }));

    dispatch(MainAction.GetStudentToPage({}));
  };
  GetTeacherModuleData = (id) => {
    //id为链接上的
    let {
      dispatch,
      PublicState: {
        LoginMsg: { Role, CollegeID, CollegeName },
      },
      DataState: {
        CommonData: {
          RolePower: { IsCollege },
          RouteData,
          TeacherParams: { collegeID },
          InitTeacherParams,
        },
        MainData: {
          TeacherTree: { CollegeList, GroupList },
          SubjectList,
        },
      },
    } = this.props;
    let data = { ...InitTeacherParams }; //初始学生参数
    if (IsCollege) {
      //是学院且参数没选择，第一次进来
      //学院的
      data.collegeID = CollegeID;
      data.collegeName = CollegeName;
      let group;
      if (id) {
        if ((group = GroupList.find((child) => child.value === id))) {
          //专业
          data.groupID = group.value;
          data.groupName = group.title;
        } else {
          //不存在，说明有误
          history.push("/UserArchives/Teacher");
          return;
        }
      }
      dispatch(
        CommonAction.SetRegisterExamineParams({
          collegeID: CollegeID,
          collegeName: CollegeName,
        })
      );
    } else {
      //学校
      let college;

      if (id) {
        if ((college = SubjectList.find((child) => child.value === id))) {
          //学院
          data.subjectID = college.value;
          data.subjectName = college.title;
        } else {
          //不存在，说明有误
          history.push("/UserArchives/Teacher");
          return;
        }
      }
    }
    dispatch(
      CommonAction.SetTeacherParams({
        ...data,
      })
    );
    dispatch(MainAction.GetTitle({}));

    dispatch(MainAction.GetTeacherToPage({}));
    dispatch(MainAction.GetTeacherSignUpLogToPage({ isLoading: false }));
  };
  // 设置教师注册默认路径
  SetTeacherRegisterExamineDefaultRoute = () => {
    history.push("/TeacherRegisterExamine/TeacherRegisterWillExamine");
  };
  // 设置学生注册默认路径
  SetRegisterExamineDefaultRoute = () => {
    history.push("/RegisterExamine/RegisterWillExamine");
  };
  // 设置第一级默认路径
  SetFirstDefaultRoute = ({ isFirst }) => {
    let { dispatch } = this.props;
    if (isFirst) {
      //如果是第一次,因为不会进行数据和路由更新，需要手动
      dispatch(CommonAction.SetRouteParams(["UserArchives", "All"]));

      this.AllGetData({});
    }
    history.push("/UserArchives/All");
  };
  // 解析路由
  ConstructRoute = (tpye = "construct", key) => {
    // type:construct,直接解析，获取pathname，分解为数组
    let route = history.location.pathname.slice(1);
    // console.log(history, route);
    let pathArr = route.split("/");
    if (tpye === "construct") {
      if (key === undefined) {
        return pathArr;
      } else if (key instanceof Number) {
        return pathArr[key];
      } else if (key instanceof String) {
        return pathArr.includes((child) => child === key);
      }
    }
  };
  // 设置用户角色,模块角色统一在这处理
  setRole = (LoginMsg, identify) => {
    // let {
    //   dispatch,
    //   DataState,
    //   PublicState: {
    //     LoginMsg: { UserType, UserClass },
    //   },
    // } = this.props;
    // console.log(identity);
    let { UserType, UserClass } = LoginMsg;
    let Role = "";
    UserType = parseInt(UserType);
    UserClass = parseInt(UserClass);
    if (UserType === 0 && (UserClass === 1 || UserClass === 2)) {
      //学校管理员（admin_学校代码，创建学校时生成）
      Role = "Admin-School";
    } else if (UserType === 0 && (UserClass === 3 || UserClass === 4)) {
      //学院管理员
      Role = "Admin-College";
    } else if (UserType === 1) {
      //教师,— UserClass=100000~111111：
      //后5位分别代表：
      //任课教师、班主任、教研者（V3.0无效，恒为0）、学科主管、校领导
      //（V3.0无效，恒为0），值为1时代表有该身份；
      Role = "Teacher";
    } else if (UserType === 2) {
      //学生
      Role = "Student";
    } else if (UserType === 7) {
      //学校领导（V3.0之后的版本才有此角色）
      // — UserClass=0 校长
      //— UserClass=1 副校长
      //— UserClass=2 教务主任
      Role = "Leader-School";
    } else if (UserType === 10) {
      //学院领导（V3.0之后的版本才有此角色）
      // — UserClass=3 院长
      //— UserClass=4 副院长
      Role = "Leader-College";
    } else if (UserType === 3) {
      //家长

      Role = "Parent";
    } else if (UserType === 4) {
      //教育专家

      Role = "Specialist";
    } else if (UserType === 5) {
      //教育局领导

      Role = "Leader-Education";
    }
    return { ...LoginMsg, Role,identify };
  };
  // 设置banner的选择列表
  SetBannerList = () => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          BannerInitList,
          RolePower: { IsCollege, IsLeader },
        },
        MainData: { SysUrl },
      },
      PublicState: {
        LoginMsg: { UserType, UserClass, Role },
      },
    } = this.props;
    let BannerList = [];

    // Role为领导的时候不能显示领导，
    // ProductType===6,3，适配人工智能实训室，不要领导
    // LockerVersion===1 ，校园基础信息管理 XG5.2-免费版,1为基础版，不要毕业生
    BannerInitList instanceof Array &&
      BannerInitList.forEach((child, index) => {
        if (child.value === "Leader") {
          //领导的
          if (!this.SetProductTypeLeader() && !IsCollege && !IsLeader) {
            BannerList.push(child);
          }
        } else if (child.value === "Graduate") {
          if (!this.SetLockerVersionGradute()) {
            BannerList.push(child);
          }
        } else if (child.value === "Face") {
          if (
            SysUrl instanceof Array &&
            SysUrl.length > 0 &&
            Role.includes("Admin")
          ) {
            let token = sessionStorage.getItem("token");
            BannerList.push({
              url: SysUrl[0].WebSvrAddr + "?lg_tk=" + token,
              ...child,
            });
          }
        } else {
          BannerList.push(child);
        }
      });

    dispatch(CommonAction.SetBannerParams(BannerList));
  };
  // // ProductType===6,3，适配人工智能实训室，不要领导,统一处理
  SetProductTypeLeader = () => {
    let { dispatch } = this.props;
    let { ProductType } = JSON.parse(
      sessionStorage.getItem("LgBasePlatformInfo")
    )
      ? JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"))
      : {};
    let token = sessionStorage.getItem("token");
    ProductType = parseInt(ProductType);
    dispatch(
      CommonAction.SetRolePowerParams({
        NoLeader: ProductType === 6 || ProductType === 3,
      })
    );
    return ProductType === 6 || ProductType === 3;
  };
  SetRoleLeader = () => {
    let {
      dispatch,
      DataState: {
        CommonData: { BannerInitList },
        MainData: { SysUrl },
      },
      PublicState: {
        LoginMsg: { UserType, UserClass, Role },
      },
    } = this.props;
    dispatch(
      CommonAction.SetRolePowerParams({
        IsLeader: Role.includes("Leader"),
      })
    );
    return Role.includes("Leader");
  };
  SetRoleTeacher = () => {
    let {
      dispatch,
      DataState: {
        CommonData: { BannerInitList },
        MainData: { SysUrl },
      },
      PublicState: {
        LoginMsg: { UserType, UserClass, Role },
      },
    } = this.props;
    dispatch(
      CommonAction.SetRolePowerParams({
        IsTeacher: Role.includes("Teacher"),
      })
    );
    return Role.includes("Teacher");
  };
  SetRoleCollege = () => {
    let {
      dispatch,
      DataState: {
        CommonData: { BannerInitList },
        MainData: { SysUrl },
      },
      PublicState: {
        LoginMsg: { UserType, UserClass, Role },
      },
    } = this.props;
    dispatch(
      CommonAction.SetRolePowerParams({
        IsCollege: Role.includes("College"),
      })
    );
    return Role.includes("College");
  };
  // LockerVersion===1 ，校园基础信息管理 XG5.2-免费版,1为基础版，不要毕业生
  // 直接在这进行产品版本判断，AI实训产品时（大学，ProductType==6），可以隐藏教师学科的信息
  SetLockerVersionGradute = () => {
    let { dispatch } = this.props;
    let { LockerVersion, ProductType } = JSON.parse(
      sessionStorage.getItem("LgBasePlatformInfo")
    )
      ? JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"))
      : {};
    let token = sessionStorage.getItem("token");
    ProductType = parseInt(ProductType);
    LockerVersion = parseInt(LockerVersion);
    dispatch(
      CommonAction.SetRolePowerParams({
        LockerVersion_1: LockerVersion === 1,
        ProductType_6: ProductType === 6,
      })
    );
    return LockerVersion === 1;
  };
  // 详情关闭
  onDetailsModalCancel = () => {
    const { dispatch } = this.props;
    dispatch(
      CommonAction.SetModalVisible({
        DetailsModalVisible: false,
      })
    );
  };
  // 获取frame的ref
  onRef = (ref) => {
    this.Frame = ref;
  };
  render() {
    const {
      UIState,
      DataState: {
        CommonData: {
          FrameData: {
            type: FrameType,
            cnname,
            enname,
            image,
            showLeftMenu,
            showBarner,
            className,
            subtitle,
          },
          ModalVisible: { DetailsModalVisible },
          UserArchivesParams: { DetailsType, DetailsData },
        },
      },
      PublicState: {
        Loading: { AppLoading, ContentLoading },
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

    return (
      <React.Fragment>
        <Loading
          opacity={false}
          tip="加载中..."
          size="large"
          spinning={AppLoading}
        >
          <Frame
            userInfo={{
              name: UserName,
              image: PhotoPath,
            }}
            module={{
              cnname: cnname,
              enname: enname,
              image: image,
              subtitle,
            }}
            type={FrameType}
            showLeftMenu={showLeftMenu}
            showBarner={showBarner}
            className={`myFrame AdmArchives-frame ${className}`}
            pageInit={this.RequestData}
            onRef={this.onRef.bind(this)}
          >
            <div ref="frame-time-barner">
              <TimeBanner SelectMenu={this.SelectMenu} />
            </div>
            <div ref="frame-right-content">
              <Loading
                opacity={false}
                // tip="加载中..."
                size="small"
                spinning={ContentLoading}
              >
                <Router>
                  <Route path="/UserArchives" component={UserArchives}>
                    {/* <Redirect from="/UserArchives*" to="/UserArchives/All" /> */}
                  </Route>
                  <Route
                    path="/RegisterExamine/*"
                    exact
                    component={RegisterExamine}
                  ></Route>
                  <Route
                    path="/TeacherRegisterExamine/*"
                    component={TeacherRegisterExamine}
                    exact
                  ></Route>
                  <Route
                    path="/ImportFile/:role"
                    exact
                    component={ImportFile}
                  ></Route>
                  {/* <Redirect from="/" to="/UserArchives" /> */}
                  {/* <Route path="/" component={Temple}>
                    <Redirect from="/" to="/UserArchives" />
                  </Route> */}
                </Router>
              </Loading>
            </div>
          </Frame>
        </Loading>
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
        <DetailsModal
          ref="DetailsMsgModal"
          visible={DetailsModalVisible}
          module={1}
          onCancel={this.onDetailsModalCancel}
          data={DetailsData}
          type={DetailsType}
        ></DetailsModal>
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
