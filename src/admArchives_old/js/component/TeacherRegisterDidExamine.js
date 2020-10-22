import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../../images/admAriHeadImg-1.png";
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
import "../../scss/TeacherRegisterExamine.scss";
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
  Empty,
} from "../../../common/index";

import { getData } from "../../../common/js/fetch";

class TeacherRegisterDidExamine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondDropList: [{ value: 0, title: "全部班级" }],
      DropMenuShow: false,
      columns: [
        {
          title: "注册时间",
          align: "center",
          dataIndex: "SignUpTime",
          width: 255,
          key: "SignUpTime",
          sorter: true,
          render: (time) => {
            return (
              <div className="registerTime-content">
                <span title={time} className="registerTime">
                  {time ? time : "--"}
                </span>
              </div>
            );
          },
        },
        // {
        //   title: "",
        //   align: "right",
        //   dataIndex: "UserName",
        //   key: "UserImg",
        //   colSpan: 0,
        //   width: 60,
        //   render: (arr) => {
        //     return (
        //       <div className="name-content">
        //         {/* <img
        //           alt={arr.UserName}
        //           onClick={this.onUserNameClick.bind(this, arr.key)}
        //           className="name-img"
        //           width="47"
        //           height="47"
        //           src={arr.PhotoPath}
        //         ></img> */}
        //         <i
        //           alt={arr.UserName}
        //           onClick={this.onUserNameClick.bind(this, arr.key)}
        //           className="name-img"
        //           style={{
        //             width: "47px",
        //             height: "47px",
        //             display: "inline-block",
        //             background: `url(${arr.PhotoPath}) no-repeat center center / 47px`,
        //           }}
        //         ></i>
        //       </div>
        //     );
        //   },
        // },
        {
          title: "姓名",
          align: "center",
          dataIndex: "UserName",
          colSpan: 1,
          width: 150,
          key: "UserName",
          sorter: true,
          render: (arr) => {
            return (
              <div className="name-content">
                <span
                  title={arr.UserName}
                  className="name-UserName"
                  // onClick={this.onUserNameClick.bind(this, arr.key)}
                >
                  {arr.UserName ? arr.UserName : "--"}
                </span>
              </div>
            );
          },
        },
        {
          title: "工号",
          align: "center",
          dataIndex: "UserID",
          width: 220,
          key: "UserID",
          sorter: true,
          render: (UserID) => {
            return (
              <span title={UserID} className="UserID">
                {UserID ? UserID : "--"}
              </span>
            );
          },
        },
        {
          title: "性别",
          align: "center",
          width: 55,
          dataIndex: "Gender",
          key: "Gender",
          render: (Gender) => {
            return (
              <span title={Gender} className="Gender">
                {Gender ? Gender : "--"}
              </span>
            );
          },
        },
        {
          title: "所教学科",
          align: "center",
          width: 260,
          dataIndex: "Subject",
          key: "Subject",
          render: (Subject) => {
            return (
              <span
                title={Subject.SubjectNames ? Subject.SubjectNames : "--"}
                className="ClassName"
              >
                {Subject.SubjectNames ? Subject.SubjectNames : "--"}
              </span>
            );
          },
        },
        {
          title: "状态",
          align: "center",
          width: 170,
          dataIndex: "Status",
          key: "Status",
          render: (Status) => {
            return (
              <div className="handle-content">
                <span
                  title={
                    Status.Status === 1
                      ? "审核通过"
                      : Status.Status === 2
                      ? "审核未通过"
                      : "未审核"
                  }
                  className={`handle-tips `}
                >
                  {Status.Status === 1
                    ? "审核通过"
                    : Status.Status === 2
                    ? "审核未通过"
                    : "未审核"}
                </span>
              </div>
            );
          },
        },
      ],
      keyList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      loading: false,
      selectedAll: false,
      checkedList: [],
      checkAll: false,
      UserExamineModalVisible: false,
      alertShow: false,
      alertTitle: "提示信息",
      alertQueryShow: false,
      alertQueryTitle: "查询提示~",
      firstSelect: props.DataState.GetTeacherSignUpLog.Subject,
      secondSelect: props.DataState.GetTeacherSignUpLog.Group,
      thirdSelect: props.DataState.GetTeacherSignUpLog.Grade,
      fourthSelect: props.DataState.GetTeacherSignUpLog.Class,
      firstList: [{ value: 0, title: "全部学科" }],
      secondList: [{ value: 0, title: "全部教研室" }],
      thirdList: [{ value: 0, title: "全部年级" }],
      fourthList: [{ value: 0, title: "全部班级" }],
      handleUserMsg: [],
      pageindex: 0,
      pagination: 1,
      StudentDetailsMsgModalVisible: false,
      userMsg: props.DataState.LoginUser,
      sortType: "",
      sortFiled: "",
      keyword: "",
      CancelBtnShow: "n",
      searchValue: "",
      secondParam: "",
      TeacherClassSelect: {},
      firstParam: "",
      searchWord: "",
      thirdParam: "",
      fourthParam: "",
      pageSize: 10,
      userType:
        props.DataState.LoginUser.UserType === "0" &&
        (props.DataState.LoginUser.UserClass === "3" ||
          props.DataState.LoginUser.UserClass === "4")
          ? true
          : false, //0为学院，6为学校
    };
  }

  componentWillMount() {
    const { dispatch, DataState } = this.props;
    let userMsg = DataState.LoginUser;
    let isWho = "1";
    // console.log(this.props.DataState.SubjectTeacherMsg.College)
    if (
      userMsg.UserType === "0" ||
      userMsg.UserType === "7" ||
      userMsg.UserType === "6" ||
      userMsg.UserType === "10"
    ) {
      isWho = "1";

      // if (DataState.GetTeacherSignUpLog.Group.value !== 0) {
      //   let GradeList = [];

      //   // let GradeArr = this.props.DataState.SubjectTeacherMsg.Grades[
      //   //   DataState.GetTeacherSignUpLog.Group.value
      //   // ];
      //   // GradeArr.map(Grade => {
      //   //   GradeList.push(Grade);
      //   // });

      //   this.setState({
      //     DropMenuShow: true,
      //     thirdList: GradeList,
      //     secondSelect: DataState.GetTeacherSignUpLog.Group,
      //     secondParam: "&groupID=" + DataState.GetTeacherSignUpLog.Group.value
      //   });
      // }
      // if (DataState.GetTeacherSignUpLog.Subject.value !== 0) {
      //   let GroupList = [];

      //   let GroupArr = this.props.DataState.SubjectTeacherMsg.Group[
      //     DataState.GetTeacherSignUpLog.Subject.value
      //   ];
      //   GroupArr.map(major => {
      //     GroupList.push(major);
      //   });

      //   this.setState({
      //     DropMenuShow: true,
      //     secondList: GroupList,
      //     firstSelect: DataState.GetTeacherSignUpLog.Subject,
      //     firstParam: "&SubjectID=" + DataState.GetTeacherSignUpLog.Subject.value
      //   });
      // }

      this.setState({
        firstSelect: DataState.GetTeacherSignUpLog.Subject,
        firstParam: DataState.GetTeacherSignUpLog.Subject.value
          ? "&SubjectID=" + DataState.GetTeacherSignUpLog.Subject.value
          : "",
      });

      this.StudentDropMenu(DataState.GetTeacherSignUpLog.Subject);

      // if (DataState.GetTeacherSignUpLog.Subject.value !== 0) {
      //   let Group = [{ value: 0, title: "全部教研室" }];
      //   let Grades = [{ value: 0, title: "全部年级" }];
      //   let Classes = [{ value: 0, title: "全部班级" }];
      //   let Group = DataState.GetTeacherSignUpLog.Group;
      //   let Grade = DataState.GetTeacherSignUpLog.Grade;
      //   let Class = DataState.GetTeacherSignUpLog.Class;
      //   Group = this.props.DataState.SubjectTeacherMsg.Group[
      //     DataState.GetTeacherSignUpLog.Subject.value
      //   ];
      //   if (DataState.GetTeacherSignUpLog.Group.value !== 0) {
      //     Grades = this.props.DataState.SubjectTeacherMsg.Grades[
      //       DataState.GetTeacherSignUpLog.Group.value
      //     ];
      //   }
      //   if (DataState.GetTeacherSignUpLog.Grade.value !== 0) {
      //     Classes = this.props.DataState.SubjectTeacherMsg.Classes[
      //       DataState.GetTeacherSignUpLog.Grade.value
      //     ];
      //   }
      //   this.setState({
      //     secondSelect: Group,
      //     thirdSelect: Grade,
      //     fourthSelect: Class,
      //     firstList: this.props.DataState.SubjectTeacherMsg.College,
      //     thirdList: Grades,
      //     fourthList: Classes,
      //     firstSelect: DataState.GetTeacherSignUpLog.Subject,
      //     secondList: Group
      //   });
      // }
      // if (DataState.GetTeacherSignUpLog.Grade.value !== 0) {
      //   let Classes = [{ value: 0, title: "全部班级" }];

      //   let ClassArr = this.props.DataState.SubjectTeacherMsg.returnData.AllClasses[
      //     DataState.GetTeacherSignUpLog.Grade.value
      //   ];
      //   ClassArr.map(Class => {
      //     Classes.push(Class);
      //   });
      //   this.setState({
      //     secondList: Classes
      //   });
      // }
      // this.setState({
      //   firstSelect: DataState.GetTeacherSignUpLog.Grade,
      //   secondSelect: DataState.GetTeacherSignUpLog.Class,
      //   firstParam: "&gradeID=" + DataState.GetTeacherSignUpLog.Grade.value,
      //   secondParam: "&classID=" + DataState.GetTeacherSignUpLog.Class.value
      // });
      // if (DataState.GetTeacherSignUpLog.Class.value === 0) {
      //   this.StudentDropMenu(DataState.GetTeacherSignUpLog.Grade);
      // } else {
      //   this.StudentDropMenuSecond(DataState.GetTeacherSignUpLog.Class);
      // }
    } else if (userMsg.UserType === "1" && userMsg.UserClass[2] === "1") {
      isWho = "2";

      if (DataState.GetTeacherSignUpLog.Class.value !== 0) {
        this.TeacherDropMenuSecond(DataState.GetTeacherSignUpLog.Class);
      }
    }
    this.setState({
      isWho: isWho,
    });

    // if(DataState.GetTeacherSignUpLog.Grade!==this.state.firstSelect||DataState.GetTeacherSignUpLog.Class!==this.state.secondSelect){
    //   this.setState({
    //     firstSelect:DataState.GetTeacherSignUpLog.Grade,
    //     secondSelect:DataState.GetTeacherSignUpLog.Class
    //   })
    //   if(DataState.GetTeacherSignUpLog.Grade.value!==0){
    //     this.setState({
    //       DropMenuShow: true
    //     })
    //   }else{
    //     this.setState({
    //       DropMenuShow: false
    //     })
    //   }
    // }
    // if(DataState.GetTeacherSignUpLog.Grade!==this.state.firstSelect){
    // let Classes = [{ value: 0, title: "全部班级" }];

    // this.setState({
    //   firstSelect: DataState.GetTeacherSignUpLog.Grade,
    //   secondSelect: DataState.GetTeacherSignUpLog.Class
    // });
    // if (DataState.GetTeacherSignUpLog.Grade.value !== 0) {
    //   let ClassArr = this.props.DataState.SubjectTeacherMsg.returnData.AllClasses[
    //     DataState.GetTeacherSignUpLog.Grade.value
    //   ];
    //   ClassArr.map(Class => {
    //     Classes.push(Class);
    //   });
    //   this.setState({
    //     DropMenuShow: true,
    //     secondDropList: Classes,
    //     firstParam: "&gradeID=" + DataState.GetTeacherSignUpLog.Grade.value
    //   });
    // }
    // if (DataState.GetTeacherSignUpLog.Class.value === 0) {
    //   // this.StudentDropMenu(DataState.GetTeacherSignUpLog.Grade);
    // } else {
    //   // this.StudentDropMenuSecond(DataState.GetTeacherSignUpLog.Class);
    //   this.setState({
    //     secondSelect: DataState.GetTeacherSignUpLog.Class,
    //     secondParam: "&classID=" + DataState.GetTeacherSignUpLog.Class.value
    //   });
    // }
    // }
    // if(DataState.GetTeacherSignUpLog.Class!==this.state.secondSelect){

    //   this.StudentDropMenuSecond(DataState.GetTeacherSignUpLog.Class);

    // }
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch, DataState } = nextProps;
    // let TeacherClass = DataState.SubjectTeacherMsg.TeacherClass;
    // let userMsg = DataState.LoginUser;

    // if (
    //   userMsg.UserType === "1" &&
    //   userMsg.UserClass[2] === "1" &&
    //   Object.keys(this.state.TeacherClassSelect).length === 0 &&
    //   TeacherClass[0] &&
    //   DataState.GetTeacherSignUpLog.Class.value === 0
    // ) {
    //   this.TeacherDropMenuSecond(TeacherClass[0]);

    //   // this.setState({
    //   //   TeacherClassSelect: TeacherClass[0],
    //   //   secondParam: "&classID=" + TeacherClass[0].value
    //   // });
    // } else {
    //   let College = DataState.SubjectTeacherMsg.College;
    //   let OldCollege = this.props.DataState.SubjectTeacherMsg.College;
    //   let Group = DataState.SubjectTeacherMsg.Group;
    //   let firstList = this.state.firstList;
    //   let secondList = this.state.secondList;
    //   let userType = this.state.userType;
    //   let len = College.length;
    //   let route = history.location.pathname;

    //   let pathArr = route.split("/");
    //   let handleRoute = pathArr[2];
    //   let ID = pathArr[3];

    //   // console.log(secondList, College);
    //   if (
    //     College !== OldCollege &&
    //     secondList instanceof Array &&
    //     secondList.length <= 1 &&
    //     userType &&
    //     DataState.LoginUser.CollegeID
    //   ) {
    //     let major = { value: 0, title: "全部教研室" };
    //     if (ID !== "all") {
    //       Group[DataState.LoginUser.CollegeID] instanceof Array &&
    //         Group[DataState.LoginUser.CollegeID].map(child => {
    //           if (child.value === ID) {
    //             major = child;
    //           }
    //         });
    //     }
    //     // console.log(major, Group[DataState.LoginUser.CollegeID]);

    //     this.setState({
    //       secondList: Group[DataState.LoginUser.CollegeID],
    //       secondSelect: major
    //     });
    //   } else if (College !== OldCollege && !userType) {
    //     let college = { value: 0, title: "全部学科" };
    //     if (ID !== "all") {
    //       for (let key in Group) {
    //         if (key === ID) {
    //           college = key;
    //         }
    //       }
    //     }
    //     // console.log(college, College);
    //     this.setState({
    //       firstList: College,
    //       firstSelect: college
    //     });
    //   }
    // }
    this.setState({
      pagination: DataState.GetTeacherSignUpLog.DidData.PageIndex + 1,
    });
    // if(DataState.GetTeacherSignUpLog.Grade.value!==this.state.firstSelect.value||DataState.GetTeacherSignUpLog.Class.value!==this.state.secondSelect.value){

    //   if(DataState.GetTeacherSignUpLog.Class.value===0){
    //     this.StudentDropMenu(DataState.GetTeacherSignUpLog.Grade);

    //    }else{
    //     this.StudentDropMenuSecond(DataState.GetTeacherSignUpLog.Class);
    //    }

    // }
    // if(DataState.GetTeacherSignUpLog.Grade!==this.state.firstSelect||DataState.GetTeacherSignUpLog.Class!==this.state.secondSelect){
    //   this.setState({
    //     firstSelect:DataState.GetTeacherSignUpLog.Grade,
    //     secondSelect:DataState.GetTeacherSignUpLog.Class
    //   })
    //   if(DataState.GetTeacherSignUpLog.Grade.value!==0){
    //     this.setState({
    //       DropMenuShow: true
    //     })
    //   }else{
    //     this.setState({
    //       DropMenuShow: false
    //     })
    //   }
    // }
    // if(DataState.GetTeacherSignUpLog.Grade!==this.state.firstSelect){

    //   this.StudentDropMenu(DataState.GetTeacherSignUpLog.Grade);

    // }
    // if(DataState.GetTeacherSignUpLog.Class!==this.state.secondSelect){

    //   this.StudentDropMenuSecond(DataState.GetTeacherSignUpLog.Class);

    // }
  }
  // StudentDropMenu = e => {
  //   const { dispatch } = this.props;

  //   //console.log(e);
  //   let Classes = [{ value: 0, title: "全部班级" }];
  //   this.setState({
  //     firstSelect: e,
  //     secondParam: ""
  //   });
  //   dispatch({
  //     type: actions.UpDataState.SET_TEACHER_REGISTER_GRADE_CLASS_MSG,
  //     data: { Grade: e }
  //   });
  //   if (e.value === 0) {
  //     dispatch({
  //       type: actions.UpDataState.SET_TEACHER_REGISTER_GRADE_CLASS_MSG,
  //       data: { Class: { value: 0, title: "全部班级" } }
  //     });
  //   }

  //   ////console.log(this.refs.dropMenuSecond)
  //   if (e.value !== 0) {
  //     let ClassArr = this.props.DataState.SubjectTeacherMsg.returnData.AllClasses[
  //       e.value
  //     ];
  //     ClassArr.map(Class => {
  //       Classes.push(Class);
  //     });
  //     //Classes.push(this.props.DataState.SubjectTeacherMsg.returnData.AllClasses[e.value]);
  //     //this.refs.dropMenuSecond.state.dropList = Classes;]
  //     this.setState({
  //       secondDropList: Classes,
  //       pagination: 1,
  //       keyword: "",
  //       firstParam: "&gradeID=" + e.value,
  //       CancelBtnShow: "n",
  //       searchValue: "",
  //       secondSelect: { value: 0, title: "全部班级" }
  //     });
  //     dispatch(
  //       actions.UpDataState.getTeacherDidSignUpLog(
  //         "/GetTeacherSignUpLogToPage?SchoolID=" +
  //           this.state.userMsg.SchoolID +
  //           "&PageIndex=0&pageSize="+this.state.pageSize +"&status=1&gradeID=" +
  //           e.value +
  //           this.state.sortType +
  //           this.state.sortFiled
  //       )
  //     );

  //     this.setState({
  //       DropMenuShow: true
  //     });
  //   } else {
  //     dispatch(
  //       actions.UpDataState.getTeacherDidSignUpLog(
  //         "/GetTeacherSignUpLogToPage?SchoolID=" +
  //           this.state.userMsg.SchoolID +
  //           "&PageIndex=0&pageSize="+this.state.pageSize +"&status=1" +
  //           this.state.sortType +
  //           this.state.sortFiled
  //       )
  //     );

  //     this.setState({
  //       DropMenuShow: false,
  //       pagination: 1,
  //       keyword: "",
  //       secondParam: "",
  //       firstParam: "",
  //       CancelBtnShow: "n",
  //       searchValue: "",
  //       secondSelect: { value: 0, title: "全部班级" }
  //     });
  //   }
  // };

  // StudentDropMenuSecond = e => {
  //   const { dispatch } = this.props;
  //   this.setState({
  //     secondSelect: e,
  //     pagination: 1,
  //     keyword: "",
  //     CancelBtnShow: "n",
  //     searchValue: ""
  //   });
  //   dispatch({
  //     type: actions.UpDataState.SET_TEACHER_REGISTER_GRADE_CLASS_MSG,
  //     data: { Class: e }
  //   });

  //   if (e.value === 0) {
  //     this.setState({
  //       secondParam: ""
  //     });
  //     dispatch(
  //       actions.UpDataState.getTeacherDidSignUpLog(
  //         "/GetTeacherSignUpLogToPage?SchoolID=" +
  //           this.state.userMsg.SchoolID +
  //           "&PageIndex=0&pageSize="+this.state.pageSize +"&status=1" +
  //           this.state.firstParam +
  //           this.state.sortType +
  //           this.state.sortFiled
  //       )
  //     );
  //   } else {
  //     this.setState({
  //       secondParam: "&classID=" + e.value
  //     });
  //     dispatch(
  //       actions.UpDataState.getTeacherDidSignUpLog(
  //         "/GetTeacherSignUpLogToPage?SchoolID=" +
  //           this.state.userMsg.SchoolID +
  //           "&PageIndex=0&pageSize="+this.state.pageSize +"&status=1" +
  //           this.state.firstParam +
  //           "&classID=" +
  //           e.value +
  //           this.state.sortType +
  //           this.state.sortFiled
  //       )
  //     );
  //   }
  // };
  // 第一级：学院

  StudentDropMenu = (e) => {
    const { dispatch, DataState } = this.props;

    let Classes = [{ value: 0, title: "全部班级" }];
    // console.log(DataState.SubjectTeacherMsg.Group[e.value], e.value);
    dispatch({
      type: actions.UpDataState.SET_TEACHER_REGISTER_GRADE_CLASS_MSG,
      data: {
        Subject: e,
      },
    });
    if (e.value !== 0 && e.value !== "all") {
      //Classes.push(this.props.DataState.SubjectTeacherMsg.returnData.AllClasses[e.value]);
      //this.refs.dropMenuSecond.state.dropList = Classes;]
      this.setState({
        checkedList: [],
        checkAll: false,
        firstSelect: e,
        CancelBtnShow: "n",
        searchValue: "",
        pagination: 1,
        keyword: "",

        firstParam: "&SubjectID=" + e.value,
      });
      dispatch(
        actions.UpDataState.getTeacherDidSignUpLog(
          "/GetTeacherSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&pageSize=" +
            this.state.pageSize +
            "&status=1" +
            "&SubjectID=" +
            e.value +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    } else {
      this.setState({
        checkedList: [],
        checkAll: false,
        firstSelect: e,
        CancelBtnShow: "n",
        searchValue: "",
        pagination: 1,
        keyword: "",

        firstParam: "",
      });
      dispatch(
        actions.UpDataState.getTeacherDidSignUpLog(
          "/GetTeacherSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&pageSize=" +
            this.state.pageSize +
            "&status=1" +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    }
  };
  // 第二级：教研室

  StudentDropMenuSecond = (e) => {
    const { dispatch, DataState } = this.props;
    //  console.log(e);
    // this.setState({
    //     secondSelect:e
    // })
    dispatch({
      type: actions.UpDataState.SET_TEACHER_REGISTER_GRADE_CLASS_MSG,
      data: {
        Group: e,
        Grade: { value: 0, title: "全部年级" },
        Class: { value: 0, title: "全部班级" },
      },
    });
    if (e.value === 0) {
      this.setState({
        checkedList: [],
        checkAll: false,
        secondSelect: e,
        CancelBtnShow: "n",
        searchValue: "",

        thirdSelect: { value: 0, title: "全部年级" },
        fourthSelect: { value: 0, title: "全部班级" },
        secondParam: "",

        thirdList: [{ value: 0, title: "全部年级" }],
        fourthList: [{ value: 0, title: "全部班级" }],
        pagination: 1,
      });
      dispatch(
        actions.UpDataState.getTeacherDidSignUpLog(
          "/GetTeacherSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&pageSize=" +
            this.state.pageSize +
            "&status=1" +
            this.state.firstParam +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    } else {
      this.setState({
        checkedList: [],
        checkAll: false,
        secondSelect: e,
        searchValue: "",
        CancelBtnShow: "n",
        thirdSelect: { value: 0, title: "全部年级" },
        fourthSelect: { value: 0, title: "全部班级" },
        secondParam: "&groupID=" + e.value,

        // thirdList: DataState.SubjectTeacherMsg.Grades[e.value],
        fourthList: [{ value: 0, title: "全部班级" }],
        // 差年级班级
        pagination: 1,
      });
      dispatch(
        actions.UpDataState.getTeacherDidSignUpLog(
          "/GetTeacherSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&pageSize=" +
            this.state.pageSize +
            "&status=1" +
            this.state.firstParam +
            "&groupID=" +
            e.value +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    }
  };
  // 第三级：年级
  StudentDropMenuThird = (e) => {
    const { dispatch, DataState } = this.props;
    //  console.log(e);
    // this.setState({
    //     secondSelect:e
    // })
    dispatch({
      type: actions.UpDataState.SET_TEACHER_REGISTER_GRADE_CLASS_MSG,
      data: {
        Grade: e,
        Class: { value: 0, title: "全部班级" },
      },
    });
    if (e.value === 0) {
      this.setState({
        checkedList: [],
        checkAll: false,
        thirdSelect: e,
        CancelBtnShow: "n",
        searchValue: "",

        fourthSelect: { value: 0, title: "全部班级" },
        thirdParam: "",

        fourthList: [{ value: 0, title: "全部班级" }],
        pagination: 1,
      });
      dispatch(
        actions.UpDataState.getTeacherDidSignUpLog(
          "/GetTeacherSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&pageSize=" +
            this.state.pageSize +
            "&status=1" +
            this.state.firstParam +
            this.state.secondParam +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    } else {
      this.setState({
        checkedList: [],
        checkAll: false,
        thirdSelect: e,
        searchValue: "",
        CancelBtnShow: "n",
        fourthSelect: { value: 0, title: "全部班级" },
        thirdParam: "&gradeID=" + e.value,
        fourthList:
          DataState.SubjectTeacherMsg.Classes[this.state.secondSelect.value][
            e.value
          ],
        pagination: 1,
      });
      dispatch(
        actions.UpDataState.getTeacherDidSignUpLog(
          "/GetTeacherSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&pageSize=" +
            this.state.pageSize +
            "&status=1" +
            this.state.firstParam +
            this.state.secondParam +
            "&gradeID=" +
            e.value +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    }
  };
  // 第四级：班级
  StudentDropMenuFourth = (e) => {
    const { dispatch, DataState } = this.props;
    //  console.log(e);
    // this.setState({
    //     secondSelect:e
    // })
    dispatch({
      type: actions.UpDataState.SET_TEACHER_REGISTER_GRADE_CLASS_MSG,
      data: {
        Class: e,
      },
    });
    if (e.value === 0) {
      this.setState({
        checkedList: [],
        checkAll: false,
        fourthSelect: e,
        CancelBtnShow: "n",
        fourthParam: "",
        searchValue: "",
        pagination: 1,
      });
      dispatch(
        actions.UpDataState.getTeacherDidSignUpLog(
          "/GetTeacherSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&pageSize=" +
            this.state.pageSize +
            "&status=1" +
            this.state.firstParam +
            this.state.secondParam +
            this.state.thirdParam +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    } else {
      this.setState({
        checkedList: [],
        checkAll: false,
        fourthSelect: e,
        searchValue: "",
        CancelBtnShow: "n",
        fourthParam: "&classID=" + e.value,
        pagination: 1,
      });
      dispatch(
        actions.UpDataState.getTeacherDidSignUpLog(
          "/GetTeacherSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&pageSize=" +
            this.state.pageSize +
            "&status=1" +
            this.state.firstParam +
            this.state.secondParam +
            this.state.thirdParam +
            "&classID=" +
            e.value +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    }
  };
  TeacherDropMenuSecond = (e) => {
    const { dispatch } = this.props;

    this.setState({
      TeacherClassSelect: e,
      checkedList: [],
      checkAll: false,
      pagination: 1,
      keyword: "",
      CancelBtnShow: "n",
      searchValue: "",
    });
    dispatch({
      type: actions.UpDataState.SET_TEACHER_REGISTER_GRADE_CLASS_MSG,
      data: { Class: e },
    });
    if (e.value === 0) {
      this.setState({
        secondParam: "",
      });
      dispatch(
        actions.UpDataState.getTeacherDidSignUpLog(
          "/GetTeacherSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&pageSize=" +
            this.state.pageSize +
            "&status=1" +
            this.state.firstParam +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    } else {
      this.setState({
        secondParam: "&classID=" + e.value,
      });
      dispatch(
        actions.UpDataState.getTeacherDidSignUpLog(
          "/GetTeacherSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0&pageSize=" +
            this.state.pageSize +
            "&status=1" +
            this.state.firstParam +
            "&classID=" +
            e.value +
            this.state.sortType +
            this.state.sortFiled
        )
      );
    }

    //dispatch(actions.UpDataState.getGradeStudentPreview('/ArchivesStudent?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&pageSize="+this.state.pageSize +"&SortFiled=UserID&SortType=ASC'));
  };
  OnCheckAllChange = (e) => {
    //console.log(e.target.checked, this.state.keyList)
    if (e.target.checked) {
      this.setState({
        checkedList: this.state.keyList,
        checkAll: e.target.checked,
      });
    } else {
      this.setState({
        checkedList: [],
        checkAll: e.target.checked,
      });
    }
  };
  onCheckBoxGroupChange = (checkedList) => {
    //console.log(checkedList)
    this.setState({
      checkedList,
      checkAll: checkedList.length === this.state.keyList.length ? true : false,
    });
  };
  onExamineClick = (Others) => {
    //console.log(Others);
    let arr = this.state.data;
    //arr[Others.key-1].Others[isAgree] = !arr[Others.key-1].Others[isAgree];
    this.setState({
      UserExamineModalVisible: true,
    });
  };
  onPagiNationChange = (e) => {
    const { dispatch } = this.props;
    this.setState({
      pagination: e,
    });

    dispatch(
      actions.UpDataState.getTeacherDidSignUpLog(
        "/GetTeacherSignUpLogToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          (e - 1) +
          "&pageSize=" +
          this.state.pageSize +
          "&status=1" +
          this.state.sortType +
          this.state.sortFiled +
          (this.state.keyword ? "&Keyword=" + this.state.keyword : "") +
          this.state.firstParam +
          this.state.secondParam
      )
    );
  };
  UserExamineMadalOk = (e) => {
    //console.log(e)
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
    //console.log(e)
    this.setState({
      UserExamineModalVisible: false,
    });
  };
  onUserNameClick = (key) => {
    const { DataState } = this.props;
    this.setState({
      StudentDetailsMsgModalVisible: true,
      handleUserMsg:
        DataState.GetTeacherSignUpLog.DidData.returnData[key].UserMsg,
    });
  };
  onAgreeAll = (e) => {
    const { dispatch } = this.props;
    //console.log(this.state.checkedList)
    let checkedList = this.state.checkedList;
    if (checkedList.length) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-query",
          title: "确定通过勾选的注册吗？",
          ok: this.onAlertQueryOk.bind(this),
          cancel: this.onAlertQueryClose.bind(this),
          close: this.onAlertQueryClose.bind(this),
        })
      );
    } else {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请勾选所要通过的注册",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
    }
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    //console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  RefuseAll = (e) => {
    const { dispatch } = this.props;
    //console.log(this.state.checkedList)
    let checkedList = this.state.checkedList;
    if (checkedList.length) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-query",
          title: "确定不通过勾选的注册吗？",
          ok: this.onAlertQueryOk.bind(this),
          cancel: this.onAlertQueryClose.bind(this),
          close: this.onAlertQueryClose.bind(this),
        })
      );
    } else {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请勾选所要不通过的注册",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
    }
  };
  onAlertWarnClose = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  onAlertWarnOk = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  onAlertQueryClose = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  onAlertQueryOk = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  onTableChange = (page, filter, sorter, extra) => {
    const { DataState, dispatch } = this.props;
    //console.log(sorter)
    if (
      sorter &&
      (sorter.columnKey === "SignUpTime" ||
        sorter.columnKey === "UserName" ||
        sorter.columnKey === "UserID")
    ) {
      let sortType =
        sorter.order === "descend"
          ? "SortType=DESC"
          : sorter.order === "ascend"
          ? "SortType=ASC"
          : "";
      this.setState({
        sortType: "&" + sortType,
        sortFiled: "&sortFiled=" + sorter.columnKey,
      });
      dispatch(
        actions.UpDataState.getTeacherDidSignUpLog(
          "/GetTeacherSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&pageSize=" +
            this.state.pageSize +
            "&status=1&sortFiled=" +
            sorter.columnKey +
            "&" +
            sortType +
            (this.state.keyword ? "&Keyword=" + this.state.keyword : "") +
            this.state.firstParam +
            this.state.secondParam
        )
      );
    } else if (sorter) {
      this.setState({
        sortType: "",
        sortFiled: "",
      });
      dispatch(
        actions.UpDataState.getTeacherDidSignUpLog(
          "/GetTeacherSignUpLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&pageSize=" +
            this.state.pageSize +
            "&status=1" +
            (this.state.keyword ? "&Keyword=" + this.state.keyword : "") +
            this.state.firstParam +
            this.state.secondParam
        )
      );
    }
  };
  //搜索
  LogSearch = (e) => {
    const { dispatch } = this.props;
    if (e.value === "") {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请输入关键字搜索",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
      return;
    }
    let Test = /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/.test(
      e.value
    );
    if (!Test) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-error",
          title: "输入的工号或姓名格式不正确",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this),
        })
      );
      return;
    }
    this.setState({
      keyword: e.value,
      CancelBtnShow: "y",
      pagination: 1,
      searchWord: e.value,
    });
    dispatch(
      actions.UpDataState.getTeacherDidSignUpLog(
        "/GetTeacherSignUpLogToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          0 +
          "&pageSize=" +
          this.state.pageSize +
          "&status=1" +
          this.state.sortType +
          this.state.sortFiled +
          "&Keyword=" +
          e.value +
          this.state.firstParam +
          this.state.secondParam
      )
    );
  };
  //教师详情信息
  StudentDetailsMsgModalOk = () => {
    this.setState({
      StudentDetailsMsgModalVisible: false,
    });
  };
  StudentDetailsMsgModalCancel = () => {
    this.setState({
      StudentDetailsMsgModalVisible: false,
    });
  };
  //搜索change
  onChangeSearch = (e) => {
    this.setState({
      searchValue: e.target.value.trim(),
    });
  };
  // 取消搜索
  onCancelSearch = (e) => {
    const { dispatch } = this.props;

    this.setState({
      CancelBtnShow: "n",
      keyword: "",
      searchValue: "",
      pagination: 1,
    });

    dispatch(
      actions.UpDataState.getTeacherDidSignUpLog(
        "/GetTeacherSignUpLogToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          0 +
          "&pageSize=" +
          this.state.pageSize +
          "&status=1" +
          this.state.sortType +
          this.state.sortFiled +
          this.state.firstParam +
          this.state.secondParam
      )
    );
  };
  // 改变显示条目数
  onShowSizeChange = (current, pageSize) => {
    // console.log(current, pageSize);
    const { dispatch } = this.props;

    this.setState({
      pageSize,
      checkedList: [],
      checkAll: false,
      pagination: 1,
    });

    dispatch(
      actions.UpDataState.getTeacherDidSignUpLog(
        "/GetTeacherSignUpLogToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          0 +
          "&pageSize=" +
          pageSize +
          "&status=1" +
          this.state.sortType +
          this.state.sortFiled +
          (this.state.keyword ? "&Keyword=" + this.state.keyword : "") +
          this.state.firstParam +
          this.state.secondParam
      )
    );
  };
  render() {
    const { UIState, DataState } = this.props;
    let TeacherClass = DataState.SubjectTeacherMsg.TeacherClass;
    console.log(this.state.userType);
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
    return (
      <React.Fragment>
        <div className="main-select">
          {this.state.isWho === "1" ? (
            <div>
              <DropDown
                ref="dropMenuFirst"
                onChange={this.StudentDropMenu}
                width={120}
                disabled={this.state.userType}
                title="学科："
                height={240}
                dropSelectd={this.state.firstSelect}
                dropList={
                  DataState.SubjectTeacherMsg.returnData
                    ? DataState.SubjectTeacherMsg.returnData.SubjectList
                    : [{ value: "all", title: "全部学科" }]
                }
              ></DropDown>
              {/* <DropDown
                ref="dropMenuSecond"
                width={120}
                height={240}
                style={{
                  display: this.state.userType||this.state.firstSelect.value !== 0 ? "block" : "none"
                }}
                dropSelectd={this.state.secondSelect}
                dropList={this.state.secondList}
                onChange={this.StudentDropMenuSecond}
              ></DropDown> */}
              {/* <DropDown
                ref="dropMenuThird"
                width={120}
                height={240}
                style={{
                  display:
                    this.state.secondSelect.value !== 0 ? "block" : "none"
                }}
                dropSelectd={this.state.thirdSelect}
                dropList={this.state.thirdList}
                onChange={this.StudentDropMenuThird}
              ></DropDown>
              <DropDown
                ref="dropMenuFourth"
                width={120}
                height={240}
                style={{
                  display: this.state.thirdSelect.value !== 0 ? "block" : "none"
                }}
                dropSelectd={this.state.fourthSelect}
                dropList={this.state.fourthList}
                onChange={this.StudentDropMenuFourth}
              ></DropDown> */}
              {/* <DropDown
                onChange={this.StudentDropMenu}
                width={120}
                height={240}
                title="班级："
                dropSelectd={this.state.firstSelect}
                dropList={
                  DataState.SubjectTeacherMsg.returnData
                    ? DataState.SubjectTeacherMsg.returnData.grades
                    : [{ value: 0, title: "全部年级" }]
                }
              ></DropDown>
              <DropDown
                width={120}
                height={240}
                style={{ display: this.state.DropMenuShow ? "block" : "none" }}
                dropSelectd={this.state.secondSelect}
                dropList={this.state.secondDropList}
                onChange={this.StudentDropMenuSecond}
              ></DropDown> */}
            </div>
          ) : TeacherClass.length > 1 ? (
            <DropDown
              width={120}
              height={240}
              title="班级："
              dropSelectd={this.state.TeacherClassSelect}
              dropList={TeacherClass}
              onChange={this.TeacherDropMenuSecond}
            ></DropDown>
          ) : (
            <span className="single">
              {this.state.TeacherClassSelect.title}
            </span>
          )}
          <div className="Search">
            <span
              className="search-tips"
              style={{
                display: this.state.CancelBtnShow === "y" ? "block" : "none",
              }}
            >
              <span>{"搜索关键词“" + this.state.searchWord + "”共找到"}</span>
              <span className="Total">
                {" " + DataState.GetTeacherSignUpLog.DidData.Total + " "}
              </span>
              人
            </span>
            <Search
              placeHolder="请输入工号或姓名进行搜索"
              onClickSearch={this.LogSearch}
              height={30}
              width={250}
              onCancelSearch={this.onCancelSearch}
              Value={this.state.searchValue}
              onChange={this.onChangeSearch.bind(this)}
              CancelBtnShow={this.state.CancelBtnShow}
            ></Search>
          </div>
        </div>
        <div className="content-render did">
          {/* <Loading tip="loading..." spinning={this.state.loading}> */}
          <Loading
            tip="加载中..."
            opacity={false}
            size="large"
            spinning={UIState.AppLoading.TableLoading}
          >
            <CheckBoxGroup
              style={{ width: "100%" }}
              value={this.state.checkedList}
              onChange={this.onCheckBoxGroupChange.bind(this)}
            >
              {DataState.GetTeacherSignUpLog.DidData.returnData instanceof
                Array &&
              DataState.GetTeacherSignUpLog.DidData.returnData.length !== 0 ? (
                <Table
                  className="table didTable"
                  columns={this.state.columns}
                  pagination={false}
                  loading={UIState.AppLoading.TableLoading}
                  dataSource={DataState.GetTeacherSignUpLog.DidData.returnData}
                  onChange={this.onTableChange.bind(this)}
                ></Table>
              ) : (
                <Empty
                  title={
                    this.state.CancelBtnShow === "y" ||
                    this.state.firstSelect.value !== 0
                      ? "暂无符合条件的教师注册"
                      : "暂无教师注册"
                  }
                  type="3"
                  style={{ marginTop: "80px" }}
                ></Empty>
              )}
            </CheckBoxGroup>
            {/* </Loading> */}

            <div className="pagination-box">
              <PagiNation
                showQuickJumper
                showSizeChanger
                pageSize={this.state.pageSize}
                current={this.state.pagination}
                onShowSizeChange={this.onShowSizeChange}
                hideOnSinglePage={
                  DataState.GetTeacherSignUpLog.DidData.Total === 0
                    ? true
                    : false
                }
                total={DataState.GetTeacherSignUpLog.DidData.Total}
                onChange={this.onPagiNationChange}
              ></PagiNation>
            </div>
          </Loading>
        </div>

        <DetailsModal
          ref="StudentDetailsMsgModal"
          visible={this.state.StudentDetailsMsgModalVisible}
          module={1}
          onOk={this.StudentDetailsMsgModalOk}
          onCancel={this.StudentDetailsMsgModalCancel}
          data={this.state.handleUserMsg}
          type="teacher"
        ></DetailsModal>
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

export default connect(mapStateToProps)(TeacherRegisterDidExamine);
