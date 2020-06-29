import React, { Component } from "react";
import { Input } from "antd";

import {
  Loading,
  Empty,
  DropDown,
  CheckBox,
  CheckBoxGroup,
  PagiNation,
  Modal,
  Button,
  // Input,
  Tips
} from "../../../common";
import md5 from "md5";

import { Scrollbars } from "react-custom-scrollbars";
import history from "../containers/history";

import { connect } from "react-redux";

import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import actions from "../actions";
import "../../scss/Register.scss";
import Agreement from "./Agreement";
class Register extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      UserID: "",
      idName: props.role === "Student" ? "学号" : "工号",
      UserIDTipsTitle: "由1-24位字母与数字组成",
      PwdTipsTitle: `密码应由8-20位字母、数字及特殊字符的任意两种及以上组成`, //密码应由8-20位字母、数字及特殊字符\`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\的任意两种及以上组成
      ComfirmPwdTipsTitle: `请输入确认密码并确认与登录密码相同`, //密码应由8-20位字母、数字及特殊字符\`~!@#$%^&*()_+-={}|[]:\";'<>?,./\\的任意两种及以上组成
      UserNameTipsTitle: "姓名由1-20位的汉字、字母、数字、下划线、空格组成",
      GenderTipsTitle: "请选择性别",
      SubjectTipsTitle: "请选择所教学科",
      GradeTipsTitle: "请选择年级",
      ClassTipsTitle: "请选择班级",
      SchoolTipsTitle: "请选择学校",
      UserName: "",
      password: "",
      PwdStrong: 0,
      GenderSelect: { value: 0, title: "请选择性别" },
      GradeSelect: { value: 0, title: "请选择年级" },
      ClassSelect: { value: 0, title: "请选择班级" },
      SchoolSelect: { value: 0, title: "请选择学校" },
      SubjectSelect: [],
      ComfirmPassword:'',
      GenderList: [
        {
          value: "男",
          title: "男"
        },
        {
          value: "女",
          title: "女"
        },
        {
          value: "保密",
          title: "保密"
        }
      ],
      Agreement: false,
      Read: false
    };
  }
  componentWillReceiveProps(nextProps) {
    const { DataState } = nextProps;
    this.setState({
      idName: nextProps.role === "Student" ? "学号" : "工号"
    });
  }

  //自动关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  //提示弹窗
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

  // 用户id change
  onUserIDChange = e => {
    this.setState({
      UserID: e.target.value.trim()
    });
  };
  // 用户id blur
  onUserIDBlur = e => {
    const { dispatch } = this.props;
    let value = e.target.value;
    let Test = /^([a-zA-Z0-9]{1,24})$/.test(value);
    if (!Test) {
      dispatch(
        actions.UpUIState.AppTipsVisible({
          UserIDTipsVisible: true
        })
      );
    } else {
      dispatch(
        actions.UpDataState.setUserMsg({
          UserID: value
        })
      );
      dispatch(
        actions.UpUIState.AppTipsVisible({
          UserIDTipsVisible: false
        })
      );
    }
  };
  // 用户姓名 change
  onUserNameChange = e => {
    this.setState({
      UserName: e.target.value.trim()
    });
  };
  // 用户姓名 blur
  onUserNameBlur = e => {
    const { dispatch } = this.props;
    let value = e.target.value;
    let Test = /^[a-zA-Z0-9_\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_\u4e00-\u9fa5]$|^[a-zA-Z0-9_\u4e00-\u9fa5]{1,50}$/.test(
      value
    );
    if (!Test) {
      dispatch(
        actions.UpUIState.AppTipsVisible({
          UserNameTipsVisible: true
        })
      );
    } else {
      dispatch(
        actions.UpDataState.setUserMsg({
          UserName: value
        })
      );
      dispatch(
        actions.UpUIState.AppTipsVisible({
          UserNameTipsVisible: false
        })
      );
    }
  };
  // 密码 change
  onPwdChange = e => {
    this.setState({
      password: e.target.value.trim()
    });
  };
  // 密码 blur
  onPwdBlur = e => {
    const { dispatch } = this.props;
    let value = e.target.value;
    const { isOK, txt } = this.UserComm_ValidatePwd(value);

    let PwdStrong = this.UserComm_PwdStrong(value);
    this.setState({
      PwdStrong: PwdStrong
    });
    if (!isOK) {
      dispatch(
        actions.UpUIState.AppTipsVisible({
          PwdTipsVisible: true
        })
      );
    } else {
      dispatch(
        actions.UpDataState.setUserMsg({
          Pwd: md5(value)
        })
      );
      dispatch(
        actions.UpUIState.AppTipsVisible({
          PwdTipsVisible: false
        })
      );
    }
  };
  // 确认密码 change
  onComfirmPwdChange = e => {
    this.setState({
      ComfirmPassword: e.target.value.trim()
    });
  };
  // 确认密码 blur
  onComfirmPwdBlur = e => {
    const { dispatch } = this.props;
    let value = e.target.value;

    if (e.target.value!==this.state.password) {
      dispatch(
        actions.UpUIState.AppTipsVisible({
          ComfirmPwdTipsVisible: true
        })
      );
    } else {
      // dispatch(
      //   actions.UpDataState.setUserMsg({
      //     Pwd: md5(value)
      //   })
      // );
      dispatch(
        actions.UpUIState.AppTipsVisible({
          ComfirmPwdTipsVisible: false
        })
      );
    }
  };
  //密码合法判断
  UserComm_ValidatePwd = pwd => {
    let lengthOver8 = true;
    let lengthLess20 = true;
    let containNumber = true;
    let containLetters = true;
    let containSymbol = true;
    let isOK = true;

    let txt = "";

    lengthOver8 = pwd.length >= 8;
    lengthLess20 = pwd.length <= 20;
    containNumber = /[0-9]+/.test(pwd);
    containLetters = /[a-zA-Z]+/.test(pwd);
    containSymbol = /[`~\!@#$%\^&*\(\)_\+={}|\[\]:\";\'<>\?,.\/\\-]+/.test(pwd);
    isOK = /^([0-9a-zA-Z`~\!@#$%\^&*\(\)_\+={}|\[\]:\";\'<>\?,.\/\\-]){8,20}$/.test(
      pwd
    );

    if (!lengthOver8) {
      txt += "密码长度不足8位、";
    }
    if (!lengthLess20) {
      txt += "密码长度不能超过20位、";
    }

    if (
      (containNumber && containLetters) ||
      (containNumber && containSymbol) ||
      (containLetters && containSymbol) ||
      (containNumber && containLetters && containSymbol)
    ) {
      //密码合法
    } else {
      txt += "至少包含字母、数字及特殊符号中的两种、";
    }

    if (lengthOver8 && lengthLess20 && !isOK) {
      txt += "密码包含非法字符、";
    }

    if (txt === "") {
      txt = "密码合法";
      return { isOK: true, txt: txt };
    } else {
      txt = txt.substr(0, txt.length - 1);
      return { isOK: false, txt: txt };
    }
  };
  // 密码强度
  UserComm_PwdStrong = pwd => {
    const containNumber = /[0-9]+/.test(pwd);

    const containLetters = /[a-zA-Z]+/.test(pwd);

    const containSymbol = /[`~\!@#$%\^&*\(\)_\+={}|\[\]:\";\'<>\?,.\/\\-]+/.test(
      pwd
    );

    //判断是否是强

    if (containLetters && containNumber && containSymbol) {
      return 3;
    } else if (
      (containLetters && !containSymbol && !containNumber) ||
      (containSymbol && !containLetters && !containNumber) ||
      (containNumber && !containLetters && !containSymbol)
    ) {
      //判断是否是弱类型

      return 1;
    } else if (!containLetters && !containNumber && !containSymbol) {
      //是否是这样的类型
      return 0;
    } else {
      //是否是中等类型

      return 2;
    }
  };

  // 性别选择
  onGenderChange = e => {
    const { dispatch } = this.props;
    this.setState({
      GenderSelect: e
    });
    dispatch(
      actions.UpUIState.AppTipsVisible({
        GenderTipsVisible: false
      })
    );
    //改变reduce学生中转数据
    dispatch(actions.UpDataState.setUserMsg({ Gender: e.value }));
  };
  // 学校选择
  onSchoolChange = e => {
    const { dispatch, DataState } = this.props;
    this.setState({
      SchoolSelect: e
    });
    dispatch(
      actions.UpUIState.AppTipsVisible({
        SchoolIDTipsVisible: false
      })
    );
    //改变reduce学生中转数据
    dispatch(actions.UpDataState.setUserMsg({ SchoolID: e.value }));

    dispatch(
      actions.UpDataState.getSubjectData({
        SchoolID: e.value
      })
    );
    dispatch(
      actions.UpDataState.getGradeClassData({
        SchoolID: e.value
      })
    );
  };
  // 年级选择
  onGradeChange = e => {
    const { dispatch } = this.props;
    this.setState({
      GradeSelect: e
    });
    dispatch(
      actions.UpUIState.AppTipsVisible({
        GradeIDTipsVisible: false
      })
    );
    //改变reduce学生中转数据
    dispatch(actions.UpDataState.setUserMsg({ GradeID: e.value }));
  };
  // 班级选择
  onClassChange = e => {
    const { dispatch } = this.props;
    this.setState({
      ClassSelect: e
    });
    dispatch(
      actions.UpUIState.AppTipsVisible({
        ClassIDTipsVisible: false
      })
    );
    //改变reduce学生中转数据
    dispatch(actions.UpDataState.setUserMsg({ ClassID: e.value }));
  };
  // 选择协议已读
  onCheckBoxChange = e => {
    this.setState({
      Agreement: e.target.checked
    });
  };
  // 打开协议窗口
  onReadAgreement = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.AgreementModalOpen());
  };
  // 关闭协议窗口
  onAgreementClose = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.AgreementModalClose());
  };
  // 提交注册
  onSubmit = role => {
    const { dispatch, DataState, UIState } = this.props;
    // console.log(role,this.props.role,this.state.Agreement)
    if (!this.state.Agreement) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请勾选同意注册协议",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this)
        })
      );
      return;
    }

    let VisibleIsFalse = false;
    // for (let child in UIState.AppTipsVisible) {
    //   // console.log(UIState.AppTipsVisible[child]);

    //   if (UIState.AppTipsVisible[child]) {
    //     VisibleIsFalse = true;
    //   }
    // }

    let MsgIsFalse = false;
    let SubmitMsg = {};
    let studentMsg = {};
    let url = "";
    let StudentSignUp = "/StudentSignUp";
    let TeacherSignUp = "/TeacherSignUp";
    if(UIState.AppTipsVisible.ComfirmPwdTipsVisible){
      VisibleIsFalse = true;

      // return;
    }
    if(md5(this.state.ComfirmPassword)!==DataState.RegisterMsg.Pwd){
      dispatch(actions.UpUIState.AppTipsVisible({ComfirmPwdTipsVisible:true}));
      VisibleIsFalse = true;
    }else{
      dispatch(actions.UpUIState.AppTipsVisible({ComfirmPwdTipsVisible:false}));

    }
    for (let child in DataState.RegisterMsg) {
      // console.log(child);

      if (this.props.role === "Student" && child !== "SubjectIDs") {
        for (let Visible in UIState.AppTipsVisible) {
          // console.log(UIState.AppTipsVisible[child]);

          if (
            Visible === child + "TipsVisible" &&
            UIState.AppTipsVisible[Visible]
          ) {
            VisibleIsFalse = true;
          }
        }
        if (
          DataState.RegisterMsg[child] === "" ||
          DataState.RegisterMsg[child] === []||
          ((child === "ClassID" ||
              child === "GradeID" ||
              child === "SchoolID") &&
              DataState.RegisterMsg[child] === 0)
        ) {
          MsgIsFalse = true;
          let TipsVisible = [];
          TipsVisible[child + "TipsVisible"] = true;
          // console.log(TipsVisible);

          dispatch(actions.UpUIState.AppTipsVisible(TipsVisible));
        } else {
          url = StudentSignUp;
          SubmitMsg[child] = DataState.RegisterMsg[child];
        }
      }
      if (
        this.props.role === "Teacher" &&
        child !== "GradeID" &&
        child !== "ClassID"
      ) {
        for (let Visible in UIState.AppTipsVisible) {
          // console.log(UIState.AppTipsVisible[child]);

          if (
            Visible === child + "TipsVisible" &&
            UIState.AppTipsVisible[Visible]
          ) {
            VisibleIsFalse = true;
          }
        }
        if (
          DataState.RegisterMsg[child] === "" ||
          (DataState.RegisterMsg[child] instanceof Array &&
            DataState.RegisterMsg[child].length === 0)
            ||
            ((child === "SchoolID") && 
            DataState.RegisterMsg[child] === 0)
            
        ) {
          MsgIsFalse = true;
          let TipsVisible = [];
          TipsVisible[child + "TipsVisible"] = true;
          // console.log(TipsVisible);

          dispatch(actions.UpUIState.AppTipsVisible(TipsVisible));
        } else {
          url = TeacherSignUp;

          SubmitMsg[child] = DataState.RegisterMsg[child];
        }
      }
    }
    if (VisibleIsFalse) {
      return;
    }
    if (MsgIsFalse) {
      return;
    }
    if (url === "") {
      console.log("url是空的");
      return;
    }
    postData(
      CONFIG.RegisterProxy + url,
      {
        ...SubmitMsg
      },
      2
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "注册成功，即将跳转至登陆页",
              ok: this.onAppAlertOK.bind(this),
              cancel: this.onAppAlertCancel.bind(this),
              close: this.onAppAlertClose.bind(this),
              onHide: this.onRegisterSuccess.bind(this)
            })
          );
        }
      });

    // console.log(DataState.RegisterMsg);
  };

  // 注册成功跳转至登陆页
  //自动关闭
  onRegisterSuccess = () => {
    const { dispatch } = this.props;

    dispatch(actions.UpUIState.hideErrorAlert());
    window.location.href = "/Login.html";
  };
  // 跳转到登陆页
  onLoginInClick = () => {
    window.location.href = "/Login.html";
  };
  // 学科多选
  onCheckBoxGroupChange = value => {
    const { dispatch } = this.props;

    if (value.length === 0) {
      return;
    }
    this.setState({
      SubjectSelect: value
    });

    //改变reduce学生中转数据
    dispatch(actions.UpDataState.setUserMsg({ SubjectIDs: value.join() }));
    dispatch(
      actions.UpUIState.AppTipsVisible({
        SubjectIDsTipsVisible: false
      })
    );
  };
  //遍历显示学科选择
  MapSubjects = () => {
    const { DataState } = this.props;
    let SubjectList = DataState.getReisterData.SubjectList;
    if (SubjectList.length === 1 && SubjectList[0].value === 0) {
      return <span>暂无学科</span>;
    }
    let Subjects = SubjectList.map((child, index) => {
      return (
        <CheckBox
          type="gray"
          className={"checkedBoxMap"}
          key={child.value}
          value={child.value}
        >
          <span className="checkedBoxMap-title" title={child.title}>
            {child.title}
          </span>
        </CheckBox>
      );
    });
    return Subjects;
  };

  // 选择角色
  onRoleSelect = role => {
    history.push("/" + role);
  };
  render() {
    const { DataState, UIState } = this.props;
    // console.log(this.props.role);
    return (
      <div id="Register" className="Register">
        <p className="top-tips">账号注册</p>
        <div className="select-role-box">
          <span
            onClick={this.onRoleSelect.bind(this, "Student")}
            className={`no-select ${
              this.props.role === "Student" ? "select" : ""
            }`}
          >
            我是学生
          </span>
          <span
            onClick={this.onRoleSelect.bind(this, "Teacher")}
            className={`no-select ${
              this.props.role === "Teacher" ? "select" : ""
            }`}
          >
            我是教师
          </span>
        </div>
        <div className="input-content">
          <div className="clearfix row userId-row">
            <span className="left">
              <span className="must">*</span>
              {this.state.idName}：
            </span>
            <span className="right">
              <Tips
                overlayClassName={"tips tips-userID"}
                visible={UIState.AppTipsVisible.UserIDTipsVisible}
                title={this.state.idName + this.state.UserIDTipsTitle}
                getPopupContainer={e => e.parentNode}
                autoAdjustOverflow={false}
              >
                <Input
                  className="input UserID-input"
                  maxLength={24}
                  width={200}
                  type="text"
                  name="UserName"
                  onChange={this.onUserIDChange.bind(this)}
                  onBlur={this.onUserIDBlur.bind(this)}
                  value={this.state.UserID}
                  placeholder={"请输入" + this.state.idName}
                ></Input>
              </Tips>
            </span>
          </div>
          <div className="clearfix row pwd-row">
            <span className="left">
              <span className="must">*</span>
              {"登录密码"}：
            </span>
            <span className="right">
              <Tips
                overlayClassName={"tips"}
                visible={UIState.AppTipsVisible.PwdTipsVisible}
                title={this.state.PwdTipsTitle}
                getPopupContainer={e => e.parentNode}
                autoAdjustOverflow={false}
              >
                <Input
                  className="input password-input"
                  maxLength={24}
                  width={200}
                  type="password"
                  name="passWord"
                  onChange={this.onPwdChange.bind(this)}
                  onBlur={this.onPwdBlur.bind(this)}
                  value={this.state.password}
                  placeholder={"请输入密码"}
                ></Input>
              </Tips>
              
            </span>
          </div>
          <div
                className="PwdStrong"
                style={{ display: this.state.PwdStrong ? "block" : "none" }}
              >
                <span className="strongTips">密码强度：</span>
                <span className="pwd-box">
                  <span
                    className={`color-first-${this.state.PwdStrong} box-first `}
                  ></span>
                  <span
                    className={`color-second-${this.state.PwdStrong} box-second`}
                  ></span>
                  <span
                    className={`color-third-${this.state.PwdStrong} box-third`}
                  ></span>
                </span>
                <span
                  className={`strongTips tips-color-${this.state.PwdStrong} `}
                >
                  {this.state.PwdStrong === 1
                    ? "弱"
                    : this.state.PwdStrong === 2
                    ? "中"
                    : this.state.PwdStrong === 3
                    ? "强"
                    : ""}
                </span>
              </div>
              <div className="clearfix row pwd-row">
            <span className="left">
              <span className="must">*</span>
              {"确认密码"}：
            </span>
            <span className="right">
              <Tips
                overlayClassName={"tips"}
                visible={UIState.AppTipsVisible.ComfirmPwdTipsVisible}
                title={this.state.ComfirmPwdTipsTitle}
                getPopupContainer={e => e.parentNode}
                autoAdjustOverflow={false}
              >
                <Input
                  className="input password-input"
                  maxLength={24}
                  width={200}
                  type="password"
                  name="ComfirmPassWord"
                  onChange={this.onComfirmPwdChange.bind(this)}
                  onBlur={this.onComfirmPwdBlur.bind(this)}
                  value={this.state.ComfirmPassword}
                  placeholder={"请输入密码"}
                ></Input>
              </Tips>
              
            </span>
          </div>
          <div className="clearfix row userName-row">
            <span className="left">
              <span className="must">*</span>
              {"姓名"}：
            </span>
            <span className="right">
              <Tips
                overlayClassName={"tips"}
                visible={UIState.AppTipsVisible.UserNameTipsVisible}
                title={this.state.UserNameTipsTitle}
                getPopupContainer={e => e.parentNode}
                autoAdjustOverflow={false}
              >
                <Input
                  className="input UserName-input"
                  width={200}
                  maxLength={24}
                  type="text"
                  name="User-Name"
                  onChange={this.onUserNameChange.bind(this)}
                  onBlur={this.onUserNameBlur.bind(this)}
                  value={this.state.UserName}
                  placeholder={"请输入姓名"}
                ></Input>
              </Tips>
            </span>
          </div>
          <div className="clearfix row gender-row">
            <span className="left">
              <span className="must">*</span>
              {"性别"}：
            </span>
            <span className="right">
              <Tips
                overlayClassName={"tips"}
                visible={UIState.AppTipsVisible.GenderTipsVisible}
                title={this.state.GenderTipsTitle}
                getPopupContainer={e => e.parentNode}
                autoAdjustOverflow={false}
              >
                <DropDown
                  style={{ zIndex: 10 }}
                  dropSelectd={this.state.GenderSelect}
                  dropList={this.state.GenderList}
                  width={200}
                  height={96}
                  onChange={this.onGenderChange.bind(this)}
                ></DropDown>
              </Tips>
            </span>
          </div>
          <div
            className="clearfix row School-row"
            style={{
              display:
                DataState.getReisterData.SchoolList instanceof Array &&
                DataState.getReisterData.SchoolList.length >= 2
                  ? "block"
                  : "none"
            }}
          >
            <span className="left">
              <span className="must">*</span>
              {"学校"}：
            </span>
            <span className="right">
              <Tips
                overlayClassName={"tips"}
                visible={UIState.AppTipsVisible.SchoolIDTipsVisible}
                title={this.state.SchoolTipsTitle}
                getPopupContainer={e => e.parentNode}
                autoAdjustOverflow={false}
              >
                <DropDown
                  style={{ zIndex: 7 }}
                  dropSelectd={this.state.SchoolSelect}
                  dropList={DataState.getReisterData.SchoolList}
                  width={200}
                  height={96}
                  onChange={this.onSchoolChange.bind(this)}
                ></DropDown>
              </Tips>
            </span>
          </div>
          <div
            className="clearfix row grade-row"
            style={{
              display: this.props.role === "Student" ? "block" : "none"
            }}
          >
            <span className="left">
              <span className="must">*</span>
              {"年级"}：
            </span>
            <span className="right">
              <Tips
                overlayClassName={"tips"}
                visible={UIState.AppTipsVisible.GradeIDTipsVisible}
                title={this.state.GradeTipsTitle}
                getPopupContainer={e => e.parentNode}
                autoAdjustOverflow={false}
              >
                <DropDown
                  style={{ zIndex: 2 }}
                  disabled={
                    this.state.SchoolSelect.value === 0 &&
                    DataState.getReisterData.GradeList[0].value === 0
                      ? true
                      : false
                  }
                  dropSelectd={this.state.GradeSelect}
                  dropList={DataState.getReisterData.GradeList}
                  width={200}
                  height={96}
                  onChange={this.onGradeChange.bind(this)}
                ></DropDown>
              </Tips>
            </span>
          </div>
          <div
            className="clearfix row class-row"
            style={{
              display: this.props.role === "Student" ? "block" : "none"
            }}
          >
            <span className="left">
              <span className="must">*</span>
              {"班级"}：
            </span>
            <span className="right">
              <Tips
                overlayClassName={"tips"}
                visible={UIState.AppTipsVisible.ClassIDTipsVisible}
                title={this.state.ClassTipsTitle}
                getPopupContainer={e => e.parentNode}
                autoAdjustOverflow={false}
              >
                <DropDown
                  style={{ zIndex: 1 }}
                  disabled={this.state.GradeSelect.value === 0 ? true : false}
                  dropSelectd={this.state.ClassSelect}
                  dropList={
                    DataState.getReisterData.ClassList[
                      this.state.GradeSelect.value
                    ]
                  }
                  width={200}
                  height={96}
                  onChange={this.onClassChange.bind(this)}
                ></DropDown>
              </Tips>
            </span>
          </div>
          <div
            className="clearfix row subject-row"
            style={{
              display: this.props.role === "Teacher" ? "block" : "none"
            }}
          >
            <span className="left">
              <span className="must">*</span>
              {"所教学科"}：
            </span>
            <span className="right subject-right">
              <Tips
                overlayClassName={"tips"}
                placement="rightTop"
                visible={UIState.AppTipsVisible.SubjectIDsTipsVisible}
                title={this.state.SubjectTipsTitle}
                getPopupContainer={e => e.parentNode}
                autoAdjustOverflow={false}
              >
                {DataState.getReisterData.SubjectList instanceof Array &&
                (DataState.getReisterData.SubjectList.length > 1 ||
                  (DataState.getReisterData.SubjectList[0] &&
                    DataState.getReisterData.SubjectList[0].value !== 0)) ? (
                  <Scrollbars autoHeightMin={33}
                  autoHeightMax={107} className='Scrollbars' style={{ display: "inline-block",
                  width: "unset",
                  // height: "unset",
                  maxWidth: "300px",
                  minWidth: "100px", }}>
                    <CheckBoxGroup
                      onChange={this.onCheckBoxGroupChange.bind(this)}
                      className={"checkedBoxGroupMap"}
                      value={this.state.SubjectSelect}
                    >
                      {this.MapSubjects()}
                    </CheckBoxGroup>
                  </Scrollbars>
                ) : (
                  <span className="no-subject">请先选择学校</span>
                )}
              </Tips>
            </span>
          </div>
          <div className="row">
            <CheckBox
              type="gray"
              className={"checkedBox"}
              value={this.state.Agreement}
              onChange={this.onCheckBoxChange.bind(this)}
            ></CheckBox>
            <span className="checkedBox-title">
              我已阅读
              <span onClick={this.onReadAgreement.bind(this)} className="agree">
                注册协议
              </span>
              ，同意注册。
            </span>
          </div>
          <div className="row submitBox">
            <Button
              className="btn-submit"
              type="primary"
              color="blue"
              onClick={e => this.onSubmit(this.props.role)}
            >
              注册
            </Button>
          </div>
          <p className="isRegister">
            已有账号？点击进行
            <span onClick={this.onLoginInClick.bind(this)} className="LoginIn">
              登录
            </span>
          </p>
        </div>
        <Modal
          visible={UIState.AppModal.AgreementModal}
          type="2"
          height={600}
          onClose={this.onAgreementClose.bind(this)}
          onCancel={this.onAgreementClose.bind(this)}
        >
          <Agreement></Agreement>
        </Modal>
      </div>
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
export default connect(mapStateToProps)(Register);
