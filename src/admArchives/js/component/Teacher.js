import React from "react";
import { connect } from "react-redux";
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
  Loading,
} from "../../../common/index";
//import '../../../common/scss/_left_menu.scss'
import { Link } from "react-router-dom";
import CONFIG from "../../../common/js/config";
import { postData, getData } from "../../../common/js/fetch";
import Public from "../../../common/js/public";
import { Scrollbars } from "react-custom-scrollbars";

import history from "../containers/history";
import EditModal from "./EditModal";
import IconLocation from "../../images/icon-location.png";
import actions from "../actions";
import StudentChangeRecord from "./StudentChangeRecord";
import "../../scss/Teacher.scss";
let { checkUrlAndPostMsg } = Public;
class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //GradeArr:[{value:0,title:'全部年级'}]
      secondDropList: [{ value: 0, title: "全部班级" }],
      DropMenuShow: false,
      selectedRowKeys: [],
      columns: [
        {
          title: "",
          dataIndex: "OrderNo",
          key: "OrderNo",
          width: 68,
          align: "left",
          render: (key) => {
            return (
              <div className="registerTime-content">
                <label style={{ whiteSpace: "nowrap" }}>
                  <CheckBox
                    value={key.key}
                    type="gray"
                    onChange={this.onCheckChange}
                  ></CheckBox>
                  <span className="key-content">
                    {key.OrderNo + 1 >= 10
                      ? key.OrderNo + 1
                      : "0" + (key.OrderNo + 1)}
                  </span>
                </label>
              </div>
            );
          },
        },
        {
          title: "",
          align: "right",
          key: "UserImg",
          colSpan: 0,
          width: 50,
          dataIndex: "UserImgs",
          render: (arr) => {
            return (
              <div className="name-content">
                {/* <img
                  alt={arr.UserName}
                  onClick={this.onUserNameClick.bind(this, arr.key)}
                  className="name-img"
                  width="47"
                  height="47"
                  src={arr.UserImg}
                ></img> */}
                <i
                  alt={arr.UserName}
                  onClick={this.onUserNameClick.bind(this, arr.key)}
                  className="name-img"
                  style={{
                    width: "37.5px",
                    height: "47px",
                    display: "inline-block",
                    background: `url(${arr.UserImg}) no-repeat center center / 100% auto`,
                  }}
                ></i>
              </div>
            );
          },
        },
        {
          title: "姓名",
          align: "left",
          colSpan: 2,
          width: 90,
          key: "UserName",
          dataIndex: "UserName",
          sorter: true,
          render: (arr) => {
            return (
              <div className="name-content">
                <span
                  title={arr.UserName}
                  className="name-UserName"
                  onClick={this.onUserNameClick.bind(this, arr.key)}
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
          key: "UserID",
          width: 120,
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
          dataIndex: "Gender",
          width: 80,
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
          width: 110,
          align: "center",
          key: "SubjectNames",
          dataIndex: "SubjectNames",
          render: (arr) => {
            return (
              <span title={arr.showTwo} className="SubjectName">
                {arr.showTwo ? arr.showTwo : "--"}
              </span>
            );
          },
        },
        {
          title: "职称",
          width: 110,
          align: "center",
          key: "Titles",
          dataIndex: "Titles",
          render: (Titles) => {
            return (
              <span title={Titles.TitleName} className="Title">
                {Titles.TitleName ? Titles.TitleName : "--"}
              </span>
            );
          },
        },
        {
          title: "操作",
          align: "center",
          width: 232,
          key: "handleMsg",
          dataIndex: "handleMsg",
          render: (handleMsg) => {
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  type="default"
                  onClick={this.TeacherEdit.bind(this, handleMsg)}
                  className="handle-btn"
                >
                  编辑
                </Button>
                <Button
                  color="blue"
                  type="default"
                  onClick={this.TeacherChange.bind(this, handleMsg)}
                  className="check-btn"
                >
                  查看变更记录
                </Button>
              </div>
            );
          },
        },
      ],
      data: [
        {
          key: 1,
          UserName: {
            key: "01",
            PhotoPath:
              "http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg",
            UserName: "祝泽森",
          },
          UserID: "S00001",
          Grader: "男",
          GradeName: "一年级",
          ClassName: "一年1班",
          Others: {},
        },
      ],
      pagination: 1,
      loading: false,
      selectedAll: false,
      checkedList: [],
      checkAll: false,
      TeacherModalVisible: false,
      userKey: 0,
      TeacherChangeKey: 0,
      TeacherChangeMadalVisible: false,
      alertShow: false,
      alertTitle: "提示信息",
      alertQueryShow: false,
      alertQueryTitle: "查询提示~",
      TeacherDetailsMsgModalVisible: false,
      addTeacherModalVisible: false,
      selectSubject: { value: "all", title: "全部学科" },
      userMsg: props.DataState.LoginUser,
      keyword: "",
      CancelBtnShow: "n",
      searchValue: "",
      sortType: "",
      sortFiled: "",
      searchWord: "",
      teacherChangeUserLog: {},
      pageSize: 10,
    };
    window.TeacherCancelSearch = this.TeacherCancelSearch.bind(this);
  }
  TeacherCancelSearch = () => {
    this.setState({
      CancelBtnShow: "n",
      keyword: "",
      searchValue: "",
      checkAll: false,
      checkedList: [],
      // pagination: 1
    });
  };
  componentWillReceiveProps(nextProps) {
    const { DataState, UIState, dispatch } = nextProps;
    let SubjectTeacherPreview = DataState.SubjectTeacherPreview;
    let selectSubject = SubjectTeacherPreview.SubjectID || {
      value: "all",
      title: "全部学科",
    };
    // console.log(SubjectTeacherPreview.SubjectID);
    this.setState({
      selectSubject: selectSubject,
      pagination: Number(SubjectTeacherPreview.pageIndex) + 1,
    });
    // dispatch(
    //   actions.UpDataState.getSubjectTeacherPreview(
    //     "/GetTeacherToPage?SchoolID=" +
    //       this.state.userMsg.SchoolID +
    //       "&SubjectIDs=" +
    //       selectSubject.value +
    //       "&PageIndex=0&pageSize="+this.state.pageSize +
    //       this.state.sortType +
    //       this.state.sortFiled,
    //       selectSubject
    //   )
    // );
  }
  componentWillMount() {}

  TeacherDropMenu = (e) => {
    const { dispatch } = this.props;

    this.setState({
      checkedList: [],
      checkAll: false,
      selectSubject: e,
      searchValue: "",
      keyword: "",
      // pagination: 1,
      CancelBtnShow: "n",
    });
    dispatch(actions.UpDataState.setSubjectOfAddTeacher(e));

    dispatch(
      actions.UpDataState.getSubjectTeacherPreview(
        "/GetTeacherToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&SubjectIDs=" +
          e.value +
          "&PageIndex=0&pageSize=" +
          this.state.pageSize +
          this.state.sortType +
          this.state.sortFiled,
        e
      )
    );
  };

  TeacherSearch = (e) => {
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
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
        })
      );
      return;
    }
    this.setState({
      checkedList: [],
      checkAll: false,
      keyword: "&keyword=" + e.value,
      CancelBtnShow: "y",
      searchWord: e.value,
      // pagination: 1
    });
    dispatch(
      actions.UpDataState.getSubjectTeacherPreview(
        "/GetTeacherToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&SubjectIDs=" +
          this.state.selectSubject.value +
          "&PageIndex=0&pageSize=" +
          this.state.pageSize +
          "&keyword=" +
          e.value +
          this.state.sortType +
          this.state.sortFiled,
        this.state.selectSubject
      )
    );
  };

  onSelectChange = (e) => {
    //this.setState({ selectedRowKeys });
  };

  TeacherEdit = (e) => {
    const { dispatch } = this.props;

    dispatch(
      actions.UpDataState.getSubjectTeacherMsg(
        "/GetSubject?schoolID=" + this.state.userMsg.SchoolID,
        false
      )
    );
    this.setState({
      TeacherModalVisible: true,
      userKey: e.key,
    });
  };

  TeacherChange = (e) => {
    const { dispatch, DataState } = this.props;

    let innerID = DataState.SubjectTeacherPreview.newList[e.key].Others.InnerID;
    let url = "/GetUserLog?innerID=" + innerID;
    // console.log(innerID)
    dispatch(actions.UpDataState.getUserLog(url, "teacher"));
    this.setState({
      teacherChangeUserLog:
        DataState.SubjectTeacherPreview.newList[e.key].Others,
    });
  };

  onMouseEnterName = () => {};
  OnCheckAllChange = (e) => {
    if (e.target.checked) {
      this.setState({
        checkedList: this.props.DataState.SubjectTeacherPreview.keyList,
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
    const { dispatch } = this.props;

    // postData('http://192.168.2.9:8082/Schedule/api/SetSubstituteTeacher', {
    //     Type:0,
    //     schooID: "s0003",
    //     Item:'',
    //     TeacherID1:'T0002',
    //     TeacherID2:'T0003'
    // }, 2, 'json').then(res => {
    //     return res.json()
    // }).then(json => {
    //     if (json.StatusCode !== 200) {
    //         dispatch(actions.UpUIState.showErrorAlert({
    //             type: 'btn-error',
    //             title: json.Message,
    //             ok: this.onAppAlertOK.bind(this),
    //             cancel: this.onAppAlertCancel.bind(this),
    //             close: this.onAppAlertClose.bind(this)
    //         }));
    //     } else if (json.StatusCode === 200) {

    //         this.setState({
    //             TeacherModalVisible: false
    //         })
    //         dispatch(actions.UpDataState.getSubjectTeacherPreview('/GetTeacherToPage?SchoolID=school1&SubjectIDs=all&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));

    //     }
    // });
    this.setState({
      checkedList,
      checkAll:
        checkedList.length ===
        this.props.DataState.SubjectTeacherPreview.keyList.length
          ? true
          : false,
    });
  };
  handleTeacherModalOk = (e) => {
    // console.log(e)
    let url = "/EditTeacher";
    const { DataState, dispatch, UIState } = this.props;
    const { initTeacherMsg, changeTeacherMsg } = DataState.SetTeacherMsg;
    let picObj = DataState.GetPicUrl.picObj;
    let visible = UIState.EditModalTipsVisible;
    let haveMistake = false;
    for (let visi in visible) {
      if (visible[visi]) {
        haveMistake = true;
      }
    }
    //用户ID必填
    if (changeTeacherMsg.userID === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserIDTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //用户名必填
    if (changeTeacherMsg.userName === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserNameTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //性别必选
    if (!changeTeacherMsg.gender) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          GenderTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //职称必选
    if (changeTeacherMsg.titleID === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          TitleIDVisible: true,
        })
      );
      haveMistake = true;
    }
    //学科存在
    let SubjectListChange =
      DataState.SubjectTeacherMsg.returnData.SubjectListChange;
    let isSubject = false;
    SubjectListChange.map((child) => {
      typeof changeTeacherMsg.subjectIDs === "string" &&
        changeTeacherMsg.subjectIDs.split(",").map((subjectID) => {
          if (child.value === subjectID) {
            isSubject = true;
          }
        });
    });

    //学科必选
    if (changeTeacherMsg.subjectIDs === "" || !isSubject) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          changeSubjectTipsVisible: true,
        })
      );
      haveMistake = true;
    }

    if (haveMistake) {
      return;
    }
    // console.log(visible)
    if (
      Public.comparisonObject(initTeacherMsg, changeTeacherMsg) &&
      !picObj.picUploader.isChanged()
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "教师信息没有发生改变",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
      return;
    } else {
      if (picObj.picUploader.uploadSubmit()) {
        let PhotoEdit = 0;
        if (picObj.picUploader.isChanged()) {
          PhotoEdit = 1;
        }
        postData(
          CONFIG.UserInfoProxy + url,
          {
            ...changeTeacherMsg,
            photoPath: picObj.picUploader.getCurImgPath(),
            PhotoEdit: PhotoEdit,
          },
          2
        )
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            // if (json.StatusCode !== 200) {
            //   dispatch(
            //     actions.UpUIState.showErrorAlert({
            //       type: "btn-error",
            //       title: json.Message,
            //       ok: this.onAppAlertOK.bind(this),
            //       cancel: this.onAppAlertCancel.bind(this),
            //       close: this.onAppAlertClose.bind(this)
            //     })
            //   );
            // } else
            if (json.StatusCode === 200) {
              dispatch(
                actions.UpUIState.showErrorAlert({
                  type: "success",
                  title: "操作成功",
                  onHide: this.onAlertWarnHide.bind(this),
                })
              );
              this.setState({
                TeacherModalVisible: false,
              });
              this.setState({
                checkedList: [],
                checkAll: false,
              });
              dispatch(
                actions.UpDataState.getSubjectTeacherPreview(
                  "/GetTeacherToPage?SchoolID=" +
                    this.state.userMsg.SchoolID +
                    "&SubjectIDs=" +
                    this.state.selectSubject.value +
                    "&PageIndex=" +
                    (this.state.pagination - 1) +
                    "&pageSize=" +
                    this.state.pageSize +
                    this.state.keyword +
                    this.state.sortType +
                    this.state.sortFiled,
                  this.state.selectSubject
                )
              );
              dispatch(actions.UpUIState.editAlltModalTipsVisible());
            }
          });
      }
    }
  };
  //提示事件
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
  //
  handleTeacherModalCancel = (e) => {
    // console.log(e);
    const { dispatch } = this.props;

    dispatch(actions.UpUIState.editAlltModalTipsVisible());

    this.setState({
      TeacherModalVisible: false,
    });
  };
  //添加教师
  handleAddTeacherModalOk = (e) => {
    // console.log(e);
    let url = "/AddTeacher";
    const { DataState, dispatch, UIState } = this.props;
    let picObj = DataState.GetPicUrl.picObj;
    const { initTeacherMsg, changeTeacherMsg } = DataState.SetTeacherMsg;
    let visible = UIState.EditModalTipsVisible;
    let haveMistake = false;
    for (let visi in visible) {
      if (visible[visi]) {
        haveMistake = true;
      }
    }
    //用户ID必填
    if (changeTeacherMsg.userID === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserIDTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //用户名必填
    if (changeTeacherMsg.userName === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserNameTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //性别必选
    if (!changeTeacherMsg.gender) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          GenderTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //职称必选
    if (changeTeacherMsg.titleID === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          TitleIDVisible: true,
        })
      );
      haveMistake = true;
    }
    //学科必选
    if (changeTeacherMsg.subjectIDs === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          changeSubjectTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    if (haveMistake) {
      return;
    }
    if (
      Public.comparisonObject(initTeacherMsg, changeTeacherMsg) &&
      !picObj.picUploader.isChanged()
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "教师信息没有发生改变",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
      return;
    } else {
      if (picObj.picUploader.uploadSubmit()) {
        postData(
          CONFIG.UserInfoProxy + url,
          {
            ...changeTeacherMsg,
            photoPath: picObj.picUploader.getCurImgPath(),
          },
          2
        )
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            // if (json.StatusCode !== 200) {
            //   dispatch(
            //     actions.UpUIState.showErrorAlert({
            //       type: "btn-error",
            //       title: json.Msg,
            //       ok: this.onAppAlertOK.bind(this),
            //       cancel: this.onAppAlertCancel.bind(this),
            //       close: this.onAppAlertClose.bind(this)
            //     })
            //   );
            // } else
            if (json.StatusCode === 200) {
              dispatch(
                actions.UpUIState.showErrorAlert({
                  type: "success",
                  title: "操作成功",
                  onHide: this.onAlertWarnHide.bind(this),
                })
              );
              // console.log(json.Data)
              this.setState({
                studentModalVisible: false,
              });
              this.setState({
                addTeacherModalVisible: false,
              });
              this.setState({
                checkedList: [],
                checkAll: false,
              });
              dispatch(
                actions.UpDataState.getSubjectTeacherPreview(
                  "/GetTeacherToPage?SchoolID=" +
                    this.state.userMsg.SchoolID +
                    "&SubjectIDs=" +
                    this.state.selectSubject.value +
                    "&PageIndex=" +
                    (this.state.pagination - 1) +
                    "&pageSize=" +
                    this.state.pageSize +
                    this.state.keyword +
                    this.state.sortType +
                    this.state.sortFiled,
                  this.state.selectSubject
                )
              );
              // dispatch(actions.UpDataState.setSubjectOfAddTeacher({value:0,title:'暂无学科'}))

              dispatch(actions.UpUIState.editAlltModalTipsVisible());
            }
          });
      }
    }
  };
  handleAddTeacherModalCancel = (e) => {
    // console.log(e);
    const { dispatch } = this.props;

    dispatch(actions.UpUIState.editAlltModalTipsVisible());
    this.setState({
      addTeacherModalVisible: false,
    });
  };
  TeacherChangeMadalOk = (e) => {
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.TEACHER_CHANGE_MODAL_CLOSE });
  };
  TeacherChangeMadalCancel = (e) => {
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.TEACHER_CHANGE_MODAL_CLOSE });
  };

  onDeleteAllClick = () => {
    const { dispatch } = this.props;
    // console.log(this.state.checkedList);
    if (this.state.checkedList.length === 0) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请先勾选所要删除的教师",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
    } else {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-query",
          title: "确定删除勾选的教师吗？",
          ok: this.onAlertQueryOk.bind(this),
          cancel: this.onAlertQueryClose.bind(this),
          close: this.onAlertQueryClose.bind(this),
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
    const { dispatch, DataState } = this.props;
    let url = "/DeleteTeacher";
    let checkList = this.state.checkedList;
    let Total = DataState.SubjectTeacherPreview.Total;

    let dataList = DataState.SubjectTeacherPreview.newList;
    let UserIDList = checkList.map((child, index) => {
      return dataList[child].UserID;
    });
    let len = UserIDList.length;

    let UserIDListString = UserIDList.join();
    let pagination = this.state.pagination - 1;
    postData(
      CONFIG.UserInfoProxy + url,
      {
        userIDs: UserIDListString,
        schoolID: this.state.userMsg.SchoolID,
      },
      2,
      "urlencoded",
      false,
      false
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 400) {
          let id = [];
          let name = [];
          json.Data instanceof Array &&
            json.Data.map((child) => {
              id.push(child.UserID);
              name.push(child.UserName + "（" + child.UserID + "）");
            });
          if (json.ErrCode === -2) {
            // UserIDList.join()

            dispatch(
              actions.UpUIState.showErrorAlert({
                type: "btn-error",
                title: "工号" + id.join("、") + "的教师不存在",
                ok: this.onAlertQueryClose.bind(this),
                cancel: this.onAlertQueryClose.bind(this),
                close: this.onAlertQueryClose.bind(this),
              })
            );
          } else if (json.ErrCode === -3 || json.ErrCode === -4) {
            // UserIDList.join()
            dispatch(
              actions.UpUIState.showErrorAlert({
                type: "btn-error",
                title: name.join("、") + "有正在任课的班级，不允许删除",
                ok: this.onAlertQueryClose.bind(this),
                cancel: this.onAlertQueryClose.bind(this),
                close: this.onAlertQueryClose.bind(this),
              })
            );
          } else {
            dispatch(
              actions.UpUIState.showErrorAlert({
                type: "btn-error",
                title: json.Msg,
                ok: this.onAlertQueryClose.bind(this),
                cancel: this.onAlertQueryClose.bind(this),
                close: this.onAlertQueryClose.bind(this),
              })
            );
          }
        } else if (json.StatusCode === 200) {
          // if((Total-len)%(this.state.pagination-1)===0){
          //   pagination = this.state.pagination - 2;
          //   this.setState({
          //     pagination:pagination+1
          //   })
          // }
          this.setState({
            checkedList: [],
            checkAll: false,
          });
          dispatch(actions.UpUIState.hideErrorAlert());
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "操作成功",
              onHide: this.onAlertWarnHide.bind(this),
            })
          );
          dispatch(
            actions.UpDataState.getSubjectTeacherPreview(
              "/GetTeacherToPage?SchoolID=" +
                this.state.userMsg.SchoolID +
                "&SubjectIDs=" +
                this.state.selectSubject.value +
                "&PageIndex=" +
                pagination +
                "&pageSize=" +
                this.state.pageSize +
                this.state.keyword +
                this.state.sortType +
                this.state.sortFiled,
              this.state.selectSubject
            )
          );
          this.setState({
            checkedList: [],
            checkAll: false,
          });
        }
      });
  };
  // 分页
  onPagiNationChange = (e) => {
    const { dispatch, DataState } = this.props;
    // console.log(this.state.selectSubject)
    this.setState({
      checkedList: [],
      checkAll: false,
      // pagination: e
    });
    dispatch(
      actions.UpDataState.getSubjectTeacherPreview(
        "/GetTeacherToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&SubjectIDs=" +
          this.state.selectSubject.value +
          "&PageIndex=" +
          (e - 1) +
          "&pageSize=" +
          this.state.pageSize +
          this.state.sortType +
          this.state.sortFiled +
          this.state.keyword,
        this.state.selectSubject
      )
    );
    // this.setState({
    //   checkedList: [],
    //   checkAll: false,
    //   // pagination: e
    // });
  };
  onUserNameClick = (key) => {
    const {
      DataState: {
        SubjectTeacherPreview: { pensonalList },
      },
    } = this.props;
    if (pensonalList[key]) {
      let token = sessionStorage.getItem("token");
      window.open(
        "/html/userPersona/index.html?userType=" +
          1 +
          "&userID=" +
          pensonalList[key].userID +
          "&lg_tk=" +
          token
      );
    }
    // this.setState({
    //   TeacherDetailsMsgModalVisible: true,
    //   detailData: DataState.SubjectTeacherPreview.pensonalList[key],
    // });
  };
  TeacherDetailsMsgModalOk = () => {
    this.setState({
      TeacherDetailsMsgModalVisible: false,
    });
  };
  TeacherDetailsMsgModalCancel = () => {
    this.setState({
      TeacherDetailsMsgModalVisible: false,
    });
  };
  onAddTeacher = (e) => {
    // console.log(e);
    const { dispatch } = this.props;

    dispatch(
      actions.UpDataState.getSubjectTeacherMsg(
        "/GetSubject?schoolID=" + this.state.userMsg.SchoolID,
        false
      )
    );
    this.setState({
      addTeacherModalVisible: true,
      userKey: "add",
    });
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    //console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };

  //监听table的change进行排序操作
  onTableChange = (page, filters, sorter) => {
    const { DataState, dispatch } = this.props;
    // console.log(sorter)
    if (
      sorter &&
      (sorter.columnKey === "UserName" || sorter.columnKey === "UserID")
    ) {
      let sortType =
        sorter.order === "descend"
          ? "SortType=DESC"
          : sorter.order === "ascend"
          ? "SortType=ASC"
          : "";
      this.setState({
        checkedList: [],
        checkAll: false,
        sortType: "&" + sortType,
        sortFiled: "&sortFiled=" + sorter.columnKey,
      });
      dispatch(
        actions.UpDataState.getSubjectTeacherPreview(
          "/GetTeacherToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&SubjectIDs=" +
            this.state.selectSubject.value +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&sortFiled=" +
            sorter.columnKey +
            "&&pageSize=" +
            this.state.pageSize +
            "&" +
            sortType +
            this.state.keyword,
          this.state.selectSubject
        )
      );
    } else if (sorter && !sorter.columnKey) {
      this.setState({
        checkedList: [],
        checkAll: false,
        sortType: "",
        sortFiled: "",
      });
      dispatch(
        actions.UpDataState.getSubjectTeacherPreview(
          "/GetTeacherToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&SubjectIDs=" +
            this.state.selectSubject.value +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&pageSize=" +
            this.state.pageSize +
            this.state.keyword,
          this.state.selectSubject
        )
      );
    }
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
      checkAll: false,
      checkedList: [],
      // pagination: 1
    });
    dispatch(
      actions.UpDataState.getSubjectTeacherPreview(
        "/GetTeacherToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&SubjectIDs=" +
          this.state.selectSubject.value +
          "&PageIndex=" +
          0 +
          "&pageSize=" +
          this.state.pageSize +
          this.state.sortType +
          this.state.sortFiled,
        this.state.selectSubject
      )
    );
  };
  onLinkClick = (btnName, route) => {
    let url = window.location.href.split(window.location.hash).join(route);

    // console.log(url);
    checkUrlAndPostMsg({ btnName, url });
  };
  onShowSizeChange = (current, pageSize) => {
    const { dispatch } = this.props;
    this.setState({
      checkAll: false,
      checkedList: [],
      pagination: 1,
      pageSize: pageSize,
    });
    dispatch(
      actions.UpDataState.getSubjectTeacherPreview(
        "/GetTeacherToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&SubjectIDs=" +
          this.state.selectSubject.value +
          "&PageIndex=" +
          0 +
          "&pageSize=" +
          pageSize +
          this.state.sortType +
          this.state.sortFiled+
          this.state.keyword,
        this.state.selectSubject
      )
    );
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
    //     userAddress: '蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团'
    // };
    let { LockerVersion } = JSON.parse(//校园基础信息管理 XG5.2-免费版,1为基础版
      sessionStorage.getItem("LgBasePlatformInfo")
    )?JSON.parse(//校园基础信息管理 XG5.2-免费版,1为基础版
      sessionStorage.getItem("LgBasePlatformInfo")
    ):{};
    return (
      <div className="Teacher">
        <div className="Teacher-box">
          <div className="Teacher-top">
            <span className="top-tips">
              <span className="tips menu33 ">教师档案管理</span>
            </span>
            <div className="top-nav">
              {LockerVersion!=='1'?<><a
                className="link"
                // target="_blank"
                // to="/TeacherRegisterExamine"
                // replace
                onClick={this.onLinkClick.bind(
                  this,
                  "教师注册审核",
                  "#/TeacherRegisterExamine/TeacherRegisterWillExamine"
                )}
              >
                <span className="RegisterExamine">教师注册审核</span>
              </a>
              <span className="divide">|</span></>:''}
              <span
                className="link"
                style={{ cursor: "pointer" }}
                onClick={this.onAddTeacher}
              >
                <span className="add">添加教师</span>
              </span>
              <span className="divide">|</span>
              <a
                className="link"
                // target="_blank"
                // to="/ImportFile/Teacher"
                // replace
                onClick={this.onLinkClick.bind(
                  this,
                  "导入教师",
                  "#/ImportFile/Teacher"
                )}
              >
                <span className="ImportFile">导入教师</span>
              </a>
            </div>
          </div>
          <div className="Teacher-hr"></div>
          <div className="Teacher-content">
            <div className="content-top">
              <DropDown
                ref="dropMenuFirst"
                title="学科："
                onChange={this.TeacherDropMenu.bind(this)}
                width={120}
                height={240}
                dropSelectd={this.state.selectSubject}
                dropList={
                  DataState.SubjectTeacherMsg.returnData
                    ? DataState.SubjectTeacherMsg.returnData.SubjectList
                    : [{ value: "all", title: "全部学科" }]
                }
              ></DropDown>
              <div className="Search">
                <span
                  className="search-tips"
                  style={{
                    display:
                      this.state.CancelBtnShow === "y" ? "block" : "none",
                  }}
                >
                  <span>
                    {"搜索关键词“" + this.state.searchWord + "”共找到"}
                  </span>
                  <span className="Total">
                    {" " + DataState.SubjectTeacherPreview.Total + " "}
                  </span>
                  人
                </span>
                <Search
                  placeHolder="请输入工号或姓名进行搜索..."
                  onClickSearch={this.TeacherSearch.bind(this)}
                  width={250}
                  height={30}
                  Value={this.state.searchValue}
                  onCancelSearch={this.onCancelSearch}
                  onChange={this.onChangeSearch.bind(this)}
                  CancelBtnShow={this.state.CancelBtnShow}
                ></Search>
              </div>
            </div>
            <div className="content-render">
              <Loading
                tip="加载中..."
                opacity={false}
                size="large"
                spinning={UIState.AppLoading.TableLoading}
              >
                <div>
                  <CheckBoxGroup
                    style={{ width: "100%" }}
                    value={this.state.checkedList}
                    onChange={this.onCheckBoxGroupChange.bind(this)}
                  >
                    {DataState.SubjectTeacherPreview.newList instanceof Array &&
                    DataState.SubjectTeacherPreview.newList.length !== 0 ? (
                      <Table
                        className="table"
                        columns={this.state.columns}
                        pagination={false}
                        loading={UIState.AppLoading.TableLoading}
                        dataSource={DataState.SubjectTeacherPreview.newList}
                        onChange={this.onTableChange.bind(this)}
                      ></Table>
                    ) : (
                      <Empty
                        title={
                          this.state.CancelBtnShow === "y" ||
                          this.state.selectSubject.value !== "all"
                            ? "暂无符合条件的教师档案"
                            : "暂无教师档案"
                        }
                        type="3"
                        style={{ marginTop: "150px" }}
                      ></Empty>
                    )}
                  </CheckBoxGroup>
                  {DataState.SubjectTeacherPreview.Total ? (
                    <div style={{ display: "inline-block" }}>
                      <CheckBox
                        className="checkAll-box"
                        type="gray"
                        onChange={this.OnCheckAllChange}
                        checked={this.state.checkAll}
                      >
                        <span className="checkAll-title">全选</span>
                      </CheckBox>
                      <Button
                        onClick={this.onDeleteAllClick}
                        className="deleteAll"
                        color="blue"
                      >
                        删除
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="pagination-box">
                    <PagiNation
                      showQuickJumper
                      showSizeChanger
                      pageSize={this.state.pageSize}
                      current={this.state.pagination}
                      hideOnSinglePage={DataState.SubjectTeacherPreview.Total?false:true}
                      onShowSizeChange={this.onShowSizeChange}
                      total={DataState.SubjectTeacherPreview.Total}
                      onChange={this.onPagiNationChange}
                    ></PagiNation>
                  </div>
                </div>
              </Loading>
            </div>
          </div>
        </div>

        {/* 模态框 */}
        <Modal
          ref="handleTeacherMadal"
          bodyStyle={{ padding: 0, height: "500px" }}
          type="1"
          title={"编辑教师"}
          visible={this.state.TeacherModalVisible}
          onOk={this.handleTeacherModalOk}
          onCancel={this.handleTeacherModalCancel}
        >
          {this.state.TeacherModalVisible ? (
            <EditModal type="teacher" userKey={this.state.userKey}></EditModal>
          ) : (
            ""
          )}
        </Modal>
        <Modal
          ref="handleTeacherMadal"
          bodyStyle={{ padding: 0, height: "500px" }}
          type="1"
          title={"添加教师"}
          visible={this.state.addTeacherModalVisible}
          onOk={this.handleAddTeacherModalOk}
          onCancel={this.handleAddTeacherModalCancel}
        >
          {this.state.addTeacherModalVisible ? (
            <EditModal type="teacher" userKey={this.state.userKey}></EditModal>
          ) : (
            ""
          )}
        </Modal>
        {/* <Modal
          ref="TeacherChangeMadal"
          bodyStyle={{ padding: 0 }}
          type="2"
          width={650}
          visible={this.state.TeacherChangeMadalVisible}
          onOk={this.TeacherChangeMadalOk}
          onCancel={this.TeacherChangeMadalCancel}
        >
          <div className="modal-TeacherChange">
            <div className="content-top">
              <img
                src={IconLocation}
                width="30"
                height="40"
                alt="icon-location"
              />
              <span className="top-text">毛峰的档案变更记录</span>
            </div>
            <div className="content">
              <TeacherChangeRecord data={""}></TeacherChangeRecord>
            </div>
          </div>
        </Modal> */}
        <Modal
          ref="StudentChangeMadal"
          bodyStyle={{ padding: 0 }}
          type="2"
          footer={null}
          width={650}
          visible={UIState.AppModal.TeacherChangeMadalVisible}
          onOk={this.TeacherChangeMadalOk}
          onCancel={this.TeacherChangeMadalCancel}
        >
           <Loading
            // tip="加载中..."
            opacity={false}
            size="small"
            spinning={UIState.AppLoading.modalLoading}
          >
          {DataState.GetUserLog.UserLog instanceof Array &&
          DataState.GetUserLog.UserLog.length > 0 ? (
            <div className="modal-studentChange">
              <div className="content-top">
                <img
                  src={IconLocation}
                  width="30"
                  height="40"
                  alt="icon-location"
                />
                <span className="top-text">
                  {this.state.teacherChangeUserLog.UserName}的档案变更记录
                </span>
              </div>
              <div className="content">
                <Scrollbars style={{ width: 100 + "%", height: 280 + "px" }}>
                  {UIState.AppModal.TeacherChangeMadalVisible ? (
                    <StudentChangeRecord
                      data={DataState.GetUserLog.UserLog}
                    ></StudentChangeRecord>
                  ) : (
                    ""
                  )}
                </Scrollbars>
              </div>
            </div>
          ) : (
            <Empty
              type="4"
              title="该用户暂无档案变更记录"
              style={{ top: "150px", position: "relative",height:'411px' }}
            ></Empty>
          )}
          </Loading>
        </Modal>
        <DetailsModal
          ref="TeacherDetailsMsgModal"
          visible={this.state.TeacherDetailsMsgModalVisible}
          module={1}
          onOk={this.TeacherDetailsMsgModalOk}
          onCancel={this.TeacherDetailsMsgModalCancel}
          data={this.state.detailData ? this.state.detailData : []}
          type="teacher"
        >
          <div className="modal-top"></div>
          <div className="modal-content"></div>
        </DetailsModal>
        {/* 提示框 */}
      </div>
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
export default connect(mapStateToProps)(Teacher);
