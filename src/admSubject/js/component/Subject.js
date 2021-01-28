import "../../scss/Subject.scss";
import React from "react";
import { connect } from "react-redux";
import actions from "../actions";
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import ChangeSubject from "./ChangeSubject.js";
import SetSubjectTeacher from "./SetSubjectTeacher.js";
import { getQueryVariable } from "../../../common/js/disconnect";
import { checkUrlAndPostMsg, getDataStorage } from "../../../common/js/public";

import {
  Search,
  DropDown,
  Button,
  Table,
  DetailsModal,
  PagiNation,
  Modal,
} from "../../../common";
class Subject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "学科名称",
          align: "left",
          key: "SubjectName",
          width: 270,
          dataIndex: "SubjectName",
          render: (arr) => {
            return (
              <div className="SubjectName-content">
                <img
                  className="SubjectName-img"
                  alt={arr.SubjectName}
                  src={arr.SubjectImg}
                  width={80}
                  height={50}
                />
                <span title={arr.SubjectName} className="SubjectName-name">
                  {arr.SubjectName}
                </span>
              </div>
            );
          },
        },
        {
          title: "开课年级",
          align: "left",
          width: 340,
          dataIndex: "Grades",
          key: "Grades",
          render: (Grades) => {
            return (
              <React.Fragment>
                <span
                  title={Grades.P1Grades}
                  style={{ display: Grades.P1Grades ? "block" : "none" }}
                  className="Grades P1Grades"
                >
                  <span className="grades-tips">小学：</span>
                  {Grades.P1Grades}
                </span>
                <span
                  title={Grades.P2Grades}
                  style={{ display: Grades.P2Grades ? "block" : "none" }}
                  className="Grades P2Grades"
                >
                  <span className="grades-tips">初中：</span>
                  {Grades.P2Grades}
                </span>
                <span
                  title={Grades.P3Grades}
                  style={{ display: Grades.P3Grades ? "block" : "none" }}
                  className="Grades P3Grades"
                >
                  <span className="grades-tips">高中：</span>
                  {Grades.P3Grades}
                </span>
              </React.Fragment>
            );
          },
        },
        {
          title: "教研组长",
          align: "left",
          width: 196,
          dataIndex: "Teacher",
          key: "Teacher",
          render: (Teacher) => {
            return Teacher.map((child, index) => {
              let GradeName = "";
              if (child.Grade === "P1") {
                GradeName = "小学：";
              } else if (child.Grade === "P2") {
                GradeName = "初中：";
              } else if (child.Grade === "P3") {
                GradeName = "高中：";
              }

              return (
                <React.Fragment key={index}>
                  <span className="Teacher" title={child.TeacherName}>
                    <span className="Teacher-tips">{GradeName}</span>
                    <span
                      onClick={
                        child.TeacherName
                          ? this.onClickTeacherName.bind(this, child.TeacherID)
                          : this.onClickTeacherNameNo
                      }
                      className={child.TeacherName ? "handleName" : "noHandle"}
                    >
                      {child.TeacherName ? child.TeacherName : "未填写"}
                    </span>
                  </span>
                  <br />
                </React.Fragment>
              );
            });
          },
        },
        {
          title: "操作",
          align: "center",
          width: 290,
          key: "handle",
          dataIndex: "key",
          render: (key) => {
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  type="default"
                  onClick={this.onHandleClick.bind(this, key)}
                  className="handle-btn"
                >
                  编辑
                </Button>
                <Button
                  color="blue"
                  type="default"
                  onClick={this.onSetTeacherClick.bind(this, key)}
                  className="handle-btn"
                >
                  设置教研组长
                </Button>
                <Button
                  color="blue"
                  type="default"
                  onClick={this.onDeleteSubjectClick.bind(this, key)}
                  className="handle-btn"
                >
                  删除
                </Button>
              </div>
            );
          },
        },
      ],
      SubjectSelect: { value: "", title: "全部学段" },
      UserMsg: props.DataState.LoginUser,
      pagination: 1,
      isInitGuide: false,
      isAIProduct: false,
    };
  }
  // 钩子
  componentWillMount() {
    if (getQueryVariable("isInitGuide")) {
      this.setState({ isInitGuide: true });

      this.setState({
        columns: [
          {
            title: "学科名称",
            align: "left",
            key: "SubjectName",
            width: 300,
            dataIndex: "SubjectName",
            render: (arr) => {
              return (
                <div className="SubjectName-content">
                  <img
                    className="SubjectName-img"
                    alt={arr.SubjectName}
                    src={arr.SubjectImg}
                    width={80}
                    height={50}
                  />
                  <span title={arr.SubjectName} className="SubjectName-name">
                    {arr.SubjectName}
                  </span>
                </div>
              );
            },
          },
          {
            title: "开课年级",
            align: "left",
            width: 480,
            dataIndex: "Grades",
            key: "Grades",
            render: (Grades) => {
              return (
                <React.Fragment>
                  <span
                    title={Grades.P1Grades}
                    style={{ display: Grades.P1Grades ? "block" : "none" }}
                    className="Grades P1Grades"
                  >
                    <span className="grades-tips">小学：</span>
                    {Grades.P1Grades}
                  </span>
                  <span
                    title={Grades.P2Grades}
                    style={{ display: Grades.P2Grades ? "block" : "none" }}
                    className="Grades P2Grades"
                  >
                    <span className="grades-tips">初中：</span>
                    {Grades.P2Grades}
                  </span>
                  <span
                    title={Grades.P3Grades}
                    style={{ display: Grades.P3Grades ? "block" : "none" }}
                    className="Grades P3Grades"
                  >
                    <span className="grades-tips">高中：</span>
                    {Grades.P3Grades}
                  </span>
                </React.Fragment>
              );
            },
          },
          {
            title: "操作",
            align: "center",
            width: 240,
            key: "handle",
            dataIndex: "key",
            render: (key) => {
              return (
                <div className="handle-content">
                  <Button
                    color="blue"
                    type="default"
                    onClick={this.onHandleClick.bind(this, key)}
                    className="handle-btn edit init-guide"
                  >
                    编辑
                  </Button>
                  <Button
                    color="blue"
                    type="default"
                    onClick={this.onDeleteSubjectClick.bind(this, key)}
                    className="handle-btn del init-guide"
                  >
                    删除
                  </Button>
                </div>
              );
            },
          },
        ],
      });
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.DataState.SubjectMsg.pageIndex &&
      nextProps.DataState.SubjectMsg.pageIndex !== this.state.pagination
    ) {
      this.setState({
        pagination: nextProps.DataState.SubjectMsg.pageIndex,
      });
    }
  }

  //事件

  //编辑学科
  onHandleClick = (key) => {
    const { dispatch, DataState } = this.props;
    dispatch(
      actions.UpDataState.changeSubjectModalMsg(
        DataState.SubjectMsg.oldData.SubjectItem[key]
      )
    );
    dispatch(actions.UpUIState.changeSubjectModalOpen());
  };

  //添加学科
  onAddSubjectClick = () => {
    const { dispatch, DataState } = this.props;
    if (!DataState.ChangeSubjectMsg) {
      return;
    }
    if (!DataState.PeriodMsd)
      dispatch(
        actions.UpDataState.getPeriodMsg(
          "/GetPeriodBySchoolID?schoolID=" + this.state.UserMsg.SchoolID
        )
      );
    //   获取可添加学科
    dispatch(
      actions.UpDataState.getSubjectModalMsg(
        "/GetSubjectInfoForAddBySchool?schoolID=" + this.state.UserMsg.SchoolID
      )
    );

    dispatch(actions.UpDataState.addSubjectModalMsg([]));
    dispatch(actions.UpUIState.addSubjectModalOpen());
  };
  onClickTeacherName = (id) => {
    const { dispatch } = this.props;

    // dispatch(actions.UpDataState.getTeacherMsg("/GetUserDetail?userID=" + id));

    const token = sessionStorage.getItem("token");

    window.open(
      `/html/userPersona/index.html?userID=${id}&userType=1&lg_tk=${token}`
    );
  };
  onClickTeacherNameNo = () => {};
  //操作分页
  onPagiNationChange = (value) => {
    const { dispatch } = this.props;
    // this.setState({
    //   pagination: value
    // });
    dispatch(
      actions.UpDataState.getSubjectMsg(
        "/GetSchoolSubjectInfo?schoolID=" +
          this.state.UserMsg.SchoolID +
          "&periodID=" +
          (this.state.SubjectSelect.value
            ? this.state.SubjectSelect.value
            : "") +
          "&pageSize=8&pageIndex=" +
          value
      )
    );
  };

  // 关闭信息弹窗
  SubjectDetailsMsgModalCancel = () => {
    const { dispatch } = this.props;
    dispatch({ type: actions.UpUIState.SUBJECT_DETAILS_MODAL_CLOSE });
  };
  //操作下拉菜单，选择学段
  AdmDropMenu = (value) => {
    const { dispatch } = this.props;
    let periodID = "";
    this.setState({
      SubjectSelect: value,
      // pagination: 1
    });
    if (value.value !== 0) {
      periodID = value.value;
    }
    dispatch(
      actions.UpDataState.getSubjectMsg(
        "/GetSchoolSubjectInfo?schoolID=" +
          this.state.UserMsg.SchoolID +
          "&periodID=" +
          periodID +
          "&pageSize=8&pageIndex=1"
      )
    );
  };

  //删除
  onDeleteSubjectClick = (key) => {
    const { dispatch } = this.props;
    // console.log(key)
    dispatch(
      actions.UpUIState.showErrorAlert({
        type: "btn-warn",
        title: "删除学科将删除相关的教学班、课表等数据",
        ok: this.onAlertWarnOk.bind(this, key),
        cancel: this.onAlertWarnClose.bind(this),
        close: this.onAlertWarnClose.bind(this),
      })
    );
  };

  //删除按钮
  onAlertWarnClose = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };

  onAlertWarnOk = (key) => {
    const { dispatch, DataState, UIState } = this.props;
    let url = "/DeleteSubjectForSchoolOne";
    let userMsg = DataState.LoginUser;
    let pagination = this.state.pagination;
    // console.log(userMsg)
    dispatch(actions.UpUIState.hideErrorAlert());
    postData(
      CONFIG.SubjectProxy + url,
      {
        schoolID: this.state.UserMsg.SchoolID,
        subjectID: DataState.SubjectMsg.SubjectItem[key].SubjectName.SubjectID,
        userID: this.state.UserMsg.UserID || userMsg.UserID,
        userType: userMsg.UserType,
      },
      2,
      "json"
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          // this.setState({
          //   pagination: 1
          // });
          // if(DataState.SubjectMsg.Total%8===1){
          //   pagination -= 1;
          //   this.setState({
          //     pagination:pagination
          //   })
          // }
          dispatch(
            actions.UpDataState.getSubjectMsg(
              "/GetSchoolSubjectInfo?schoolID=" +
                this.state.UserMsg.SchoolID +
                "&periodID=" +
                (this.state.SubjectSelect.value
                  ? this.state.SubjectSelect.value
                  : "") +
                "&pageSize=8&pageIndex=" +
                pagination
            )
          );
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "成功",
              onHide: this.onAlertWarnHide.bind(this),
            })
          );
        }
      });
  };

  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  //编辑弹窗操作
  changeSubjectModalOk = () => {
    let url = "/UpdateSubjectForSchoolOne";
    const { dispatch, DataState } = this.props;
    let userMsg = DataState.LoginUser;
    // if (DataState.ChangeSubjectMsg.GlobalGradeIDs.length === 0) {
    //   dispatch(
    //     actions.UpUIState.showErrorAlert({
    //       type: "btn-error",
    //       title: "开课年级没有选择哦~",
    //       ok: this.onAppAlertOK.bind(this),
    //       cancel: this.onAppAlertCancel.bind(this),
    //       close: this.onAppAlertClose.bind(this)
    //     })
    //   );
    //   return;
    // }
    if (DataState.ChangeSubjectMsg.GlobalGradeIDs === "") {
      dispatch({ type: actions.UpUIState.TIPS_VISIBLE_GRADE_OPEN });
      return;
    } else {
      dispatch({ type: actions.UpUIState.TIPS_VISIBLE_GRADE_CLOSE });
    }
    dispatch({ type: actions.UpUIState.MODAL_LOADING_OPEN });
    postData(
      CONFIG.SubjectProxy + url,
      {
        schoolID: this.state.UserMsg.SchoolID,
        subjectID: DataState.ChangeSubjectMsg.SubjectID || "",
        globalGradeIDs: DataState.ChangeSubjectMsg.GlobalGradeIDs,
        userID: this.state.UserMsg.UserID || userMsg.UserID,
        subjectName: DataState.ChangeSubjectMsg.SubjectName || "",
        userType: userMsg.UserType,
      },
      2,
      "json"
    )
      .then((res) => {
        dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });
        return res.json();
      })
      .then((json) => {
        // if (json.StatusCode === 400) {
        //     dispatch(actions.UpUIState.showErrorAlert({
        //         type: 'error',
        //         title: "失败",
        //         onHide: this.onAlertWarnHide.bind(this)
        //     }));
        //     // console.log('错误码：' + json.StatusCode)
        // } else
        if (json.StatusCode === 200) {
          dispatch(actions.UpUIState.changeSubjectModalClose());
          dispatch(
            actions.UpDataState.getSubjectMsg(
              "/GetSchoolSubjectInfo?schoolID=" +
                this.state.UserMsg.SchoolID +
                "&periodID=" +
                (this.state.SubjectSelect.value
                  ? this.state.SubjectSelect.value
                  : "") +
                "&pageSize=8&pageIndex=" +
                this.state.pagination
            )
          );
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "成功",
              onHide: this.onAlertWarnHide.bind(this),
            })
          );
        }
      });
  };
  changeSubjectModalCancel = () => {
    const { dispatch, DataState } = this.props;
    dispatch({ type: actions.UpUIState.TIPS_VISIBLE_CLOSE });

    dispatch({ type: actions.UpUIState.TIPS_VISIBLE_GRADE_CLOSE });
    dispatch(actions.UpUIState.changeSubjectModalClose());
  };
  //添加弹窗操作
  AddSubjectModalOk = () => {
    const { dispatch, DataState, UIState } = this.props;
    let url = "/InsertSubjectForSchoolOne";
    let userMsg = DataState.LoginUser;
    let isFalse = false;
    if (UIState.AppTips.SubjectNameTips) {
      isFalse = true;
      // return;
    }
    let Test = /^[,_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{1,50}$/;

    if (Test.test(DataState.ChangeSubjectMsg.SubjectName.trim())) {
      dispatch({ type: actions.UpUIState.TIPS_VISIBLE_CLOSE });
    } else {
      dispatch({ type: actions.UpUIState.TIPS_VISIBLE_OPEN });
      isFalse = true;
      // return;
    }
    // if (!DataState.ChangeSubjectMsg.SubjectName) {
    //   dispatch(
    //     actions.UpUIState.showErrorAlert({
    //       type: "btn-error",
    //       title: "学科名称没有选择哦~",
    //       ok: this.onAppAlertOK.bind(this),
    //       cancel: this.onAppAlertCancel.bind(this),
    //       close: this.onAppAlertClose.bind(this)
    //     })
    //   );
    //   return;
    // }
    if (DataState.ChangeSubjectMsg.GlobalGradeIDs === "") {
      dispatch({ type: actions.UpUIState.TIPS_VISIBLE_GRADE_OPEN });
      isFalse = true;
      // return;
    } else {
      dispatch({ type: actions.UpUIState.TIPS_VISIBLE_GRADE_CLOSE });
    }
    if (isFalse) {
      return;
    }
    dispatch({ type: actions.UpUIState.MODAL_LOADING_OPEN });
    postData(
      CONFIG.SubjectProxy + url,
      {
        schoolID: this.state.UserMsg.SchoolID,
        subjectID: DataState.ChangeSubjectMsg.SubjectID || "",
        subjectName: DataState.ChangeSubjectMsg.SubjectName.trim(),
        globalGradeIDs: DataState.ChangeSubjectMsg.GlobalGradeIDs,
        userID: this.state.UserMsg.UserID || userMsg.UserID,
        userType: userMsg.UserType,
      },
      2,
      "json"
    )
      .then((res) => {
        dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });
        return res.json();
      })
      .then((json) => {
        // if (json.StatusCode === 400) {
        //     dispatch(actions.UpUIState.showErrorAlert({
        //         type: 'error',
        //         title: json.Msg,
        //         onHide: this.onAlertWarnHide.bind(this)
        //     }));
        //     // console.log('错误码：' + json.StatusCode)
        // } else
        if (json.StatusCode === 200) {
          // this.setState({
          //   pagination: 1
          // });
          dispatch(actions.UpUIState.addSubjectModalClose());
          dispatch(
            actions.UpDataState.getSubjectMsg(
              "/GetSchoolSubjectInfo?schoolID=" +
                this.state.UserMsg.SchoolID +
                "&periodID=" +
                (this.state.SubjectSelect.value
                  ? this.state.SubjectSelect.value
                  : "") +
                "&pageSize=8&pageIndex=1"
            )
          );

          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "成功",
              onHide: this.onAlertWarnHide.bind(this),
            })
          );
        }
      });
  };
  AddSubjectModalCancel = () => {
    const { dispatch, DataState } = this.props;
    dispatch({ type: actions.UpUIState.TIPS_VISIBLE_CLOSE });

    dispatch({ type: actions.UpUIState.TIPS_VISIBLE_GRADE_CLOSE });
    dispatch(actions.UpUIState.addSubjectModalClose());
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

  //设置学科教研组长
  onSetTeacherClick = (key) => {
    const { dispatch, DataState } = this.props;
    let subjectTeacherMsg = DataState.SubjectMsg.oldData.SubjectItem[key];
    dispatch(
      actions.UpDataState.setSubjectTeacherMsg({
        isChange: false,
        ...subjectTeacherMsg,
      })
    );
    dispatch(actions.UpUIState.setSubjectTeacherModalOpen());
  };

  SetSubjectTeacherModalOk = () => {
    const { dispatch, DataState } = this.props;
    let url = "/SetHeadOfTeachingGroup";
    let userMsg = DataState.LoginUser;
    if (!DataState.SetSubjectTeacherMsg.SubjectTeacherMsg.isChange) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-error",
          title: "您还没有改变教研组长哦~",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
        })
      );
      return;
    }
    //教师格式P1/T0001
    let newTeacher = DataState.SetSubjectTeacherMsg.SubjectTeacherMsg.Teachers.split(
      ","
    )
      .map((child) => {
        let loca = child.lastIndexOf("/");
        return child.slice(0, loca);
      })
      .join();

    dispatch({ type: actions.UpUIState.MODAL_LOADING_OPEN });
    postData(
      CONFIG.SubjectProxy + url,
      {
        schoolID: this.state.UserMsg.SchoolID || DataState.LoginUser.SchoolID,
        subjectID: DataState.SetSubjectTeacherMsg.SubjectTeacherMsg.SubjectID,
        teacher: newTeacher,
        userID: this.state.UserMsg.UserID || DataState.LoginUser.UserID,
      },
      2,
      "json"
    )
      .then((res) => {
        dispatch({ type: actions.UpUIState.MODAL_LOADING_CLOSE });
        return res.json();
      })
      .then((json) => {
        // if (json.StatusCode === 400) {
        //     dispatch(actions.UpUIState.showErrorAlert({
        //         type: 'error',
        //         title: "失败",
        //         onHide: this.onAlertWarnHide.bind(this)
        //     }));
        //     // console.log('错误码：' + json.StatusCode)
        // } else
        if (json.StatusCode === 200) {
          dispatch(
            actions.UpDataState.getSubjectMsg(
              "/GetSchoolSubjectInfo?schoolID=" +
                this.state.UserMsg.SchoolID +
                "&periodID=" +
                (this.state.SubjectSelect.value
                  ? this.state.SubjectSelect.value
                  : "") +
                "&pageSize=8&pageIndex=" +
                this.state.pagination
            )
          );
          dispatch(actions.UpUIState.setSubjectTeacherModalClose());
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "成功",
              onHide: this.onAlertWarnHide.bind(this),
            })
          );
        }
      });
  };
  SetSubjectTeacherModalCancel = () => {
    const { dispatch, DataState } = this.props;
    dispatch(actions.UpUIState.setSubjectTeacherModalClose());
  };
  onLinkClick = (btnName, route) => {
    let url = window.location.href.split(window.location.hash).join(route);

    // console.log(url);
    checkUrlAndPostMsg({ btnName, url });
  };
  render() {
    const { DataState, UIState } = this.props;
    let { ProductType } = getDataStorage("LgBasePlatformInfo"); //获取平台版本，看是大学还是中小学
    ProductType = parseInt(ProductType);
    let isAI = false;
    if (ProductType === 2) {
      isAI = true;
    }
    return (
      <React.Fragment>
        <div className="Adm ">
          <div className="Adm-box">
            {!this.state.isInitGuide ? (
              <>
                <div className="Adm-top">
                  <span className="top-tips">
                    <span className="tips tips-location">学科管理</span>
                  </span>
                  {/*    <Button
                                  onClick={this.onAddSubjectClick.bind(this)}
                                  className="top-btn"
                                  color="blue"
                                  shape="round"
                              >
                                  +添加学科
                              </Button> */}
                  {!isAI ? (
                    <>
                      <span
                        className="link"
                        style={{ cursor: "pointer" }}
                        onClick={this.onAddSubjectClick.bind(this)}
                      >
                        <span className="add">添加学科</span>
                      </span>
                      <span className="divide">|</span>
                      <a className="link">
                        <span
                          onClick={this.onLinkClick.bind(
                            this,
                            "导入学科",
                            "#/ImportFile/subject"
                          )}
                          className="ImportFile"
                        >
                          导入学科
                        </span>
                      </a>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="Adm-hr"></div>
              </>
            ) : null}

            <div className="Adm-content">
              <div className="content-top clearfix">
                {DataState.PeriodMsg && DataState.PeriodMsg.value.length > 1 ? (
                  <DropDown
                    ref="dropMenuFirst"
                    onChange={this.AdmDropMenu.bind(this)}
                    width={120}
                    dropSelectd={this.state.SubjectSelect}
                    dropList={
                      DataState.PeriodMsg
                        ? DataState.PeriodMsg.value
                        : [{ value: 0, title: "全部学段" }]
                    }
                  ></DropDown>
                ) : null}
              </div>

              {this.state.isInitGuide ? (
                <div className={"init-guide-title clearfix"}>
                  <div className={"tips"}>
                    当前共有
                    <span style={{ color: "#ff0000" }}>
                      {DataState.SubjectMsg.Total}
                    </span>
                    个学科
                  </div>

                  {/* <Button
                                onClick={this.onAddSubjectClick.bind(this)}
                                className="top-btn init-guide"
                                color="blue"
                                shape="round"
                            >
                                +添加学科
                            </Button> */}
                  {!isAI ? (
                    <>
                      {" "}
                      <span
                        className="link"
                        style={{ cursor: "pointer" }}
                        onClick={this.onAddSubjectClick.bind(this)}
                      >
                        <span className="add">添加学科</span>
                      </span>
                      <span className="divide">|</span>
                      <a className="link">
                        <span
                          onClick={this.onLinkClick.bind(
                            this,
                            "导入学科",
                            "#/ImportFile/subject"
                          )}
                          className="ImportFile"
                        >
                          导入学科
                        </span>
                      </a>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              ) : null}

              <div
                className={`content-render ${
                  this.state.isInitGuide ? "init-guide" : ""
                }`}
              >
                {DataState.SubjectMsg.Total &&
                DataState.SubjectMsg.Total > 0 ? (
                  <>
                    <Table
                      className={`table ${
                        this.state.isInitGuide ? "init-guide" : ""
                      }`}
                      loading={UIState.SubjectTableLoading.TableLoading}
                      columns={this.state.columns}
                      pagination={false}
                      dataSource={
                        DataState.SubjectMsg
                          ? DataState.SubjectMsg.SubjectItem
                          : []
                      }
                    ></Table>

                    <PagiNation
                      showQuickJumper
                      // defaultCurrent={DataState.SubjectMsg ? DataState.SubjectMsg.PageIndex : 1}
                      pageSize={8}
                      current={this.state.pagination}
                      hideOnSinglepage={true}
                      total={DataState.SubjectMsg.Total}
                      onChange={this.onPagiNationChange.bind(this)}
                    ></PagiNation>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <DetailsModal
          ref="SubjectDetailsMsgModal"
          visible={UIState.SubjectDetailsMsgModalShow.Show}
          onOk={this.SubjectDetailsMsgModalOk}
          onCancel={this.SubjectDetailsMsgModalCancel}
          data={DataState.TeacherMsg ? DataState.TeacherMsg.data : {}}
          type="teacher"
        ></DetailsModal>
        <Modal
          ref="handleTeacherMadal"
          bodyStyle={{ height: 332 + "px", padding: 0 }}
          width={780}
          type="1"
          title={"编辑学科"}
          mask={!this.state.isInitGuide}
          visible={UIState.ChangeSubjectModal.changeModalShow}
          onOk={this.changeSubjectModalOk}
          onCancel={this.changeSubjectModalCancel}
        >
          {UIState.ChangeSubjectModal.changeModalShow ? (
            <ChangeSubject type="change"></ChangeSubject>
          ) : (
            ""
          )}
        </Modal>
        <Modal
          ref="addTeacherMadal"
          bodyStyle={{ height: 332 + "px", padding: 0 }}
          type="1"
          width={780}
          title={"添加学科"}
          mask={!this.state.isInitGuide}
          visible={UIState.ChangeSubjectModal.addModalShow}
          onOk={this.AddSubjectModalOk}
          onCancel={this.AddSubjectModalCancel}
        >
          {UIState.ChangeSubjectModal.addModalShow ? (
            <ChangeSubject type="add"></ChangeSubject>
          ) : (
            ""
          )}
        </Modal>
        <Modal
          ref="addTeacherMadal"
          bodyStyle={{ height: 276 + "px", padding: 0 }}
          type="1"
          width={580}
          title={"设置教研组长"}
          visible={UIState.SetSubjectTeacher.setSubjectTeacherModalShow}
          onOk={this.SetSubjectTeacherModalOk}
          onCancel={this.SetSubjectTeacherModalCancel}
          destroyOnClose={true}
        >
          {UIState.SetSubjectTeacher.setSubjectTeacherModalShow ? (
            <SetSubjectTeacher></SetSubjectTeacher>
          ) : (
            ""
          )}
        </Modal>
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
export default connect(mapStateToProps)(Subject);
