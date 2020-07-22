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
import "../../scss/Student.scss";
import CONFIG from "../../../common/js/config";
import { postData, getData } from "../../../common/js/fetch";
import Public from "../../../common/js/public";
import { Scrollbars } from "react-custom-scrollbars";

import history from "../containers/history";
import EditModal from "./EditModal";
import IconLocation from "../../images/icon-location.png";
import actions from "../actions";
import StudentChangeRecord from "./StudentChangeRecord";
let { checkUrlAndPostMsg } = Public;
class Student extends React.Component {
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
          width: 50,
          colSpan: 0,
          dataIndex: "UserName",
          render: (arr) => {
            return (
              <div className="name-content">
                <i
                  alt={arr.UserName}
                  onClick={this.onUserNameClick.bind(this, arr.key)}
                  className="name-img"
                  style={{
                    width: "47px",
                    height: "47px",
                    display: "inline-block",
                    background: `url(${arr.PhotoPath}) no-repeat center center / 47px`,
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
          title: "学号",
          align: "center",
          width: 120,
          dataIndex: "UserID",
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
          width: 80,
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
          title: "年级",
          align: "center",
          key: "GradeName",
          width: 110,
          dataIndex: "GradeName",
          render: (GradeName) => {
            return (
              <span title={GradeName} className="GradeName">
                {GradeName ? GradeName : "--"}
              </span>
            );
          },
        },
        {
          title: "班级",
          align: "center",
          width: 110,
          key: "ClassName",
          dataIndex: "ClassName",
          render: (ClassName) => {
            return (
              <span title={ClassName} className="ClassName">
                {ClassName ? ClassName : "--"}
              </span>
            );
          },
        },
        {
          title: "操作",
          align: "center",
          key: "handle",
          width: 232,
          dataIndex: "key",
          render: (key) => {
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  type="default"
                  onClick={this.StudentEdit.bind(this, key)}
                  className="handle-btn"
                >
                  编辑
                </Button>
                <Button
                  color="blue"
                  type="default"
                  onClick={this.StudentChange.bind(this, key)}
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
      studentModalVisible: false,
      userKey: 0,
      StudentChangeKey: 0,
      StudentChangeMadalVisible: false,
      alertShow: false,
      alertTitle: "提示信息",
      alertQueryShow: false,
      alertQueryTitle: "查询提示~",
      StudentDetailsMsgModalVisible: false,
      addStudentModalVisible: false,
      firstSelect: { value: 0, title: "全部年级" },
      secondSelect: { value: 0, title: "全部班级" },
      userMsg: props.DataState.LoginUser,
      keyword: "",
      CancelBtnShow: "n",
      searchValue: "",
      sortType: "",
      sortFiled: "",
      searchWord: "",
      studentChangeUserLog: {},
      pageSize: 10,
    };
    window.StudentCancelSearch = this.StudentCancelSearch.bind(this);
  }
  StudentCancelSearch = () => {
    this.setState({
      CancelBtnShow: "n",
      keyword: "",
      searchValue: "",
      checkAll: false,
      checkedList: [],
      pagination: 1,
    });
  };
  componentWillReceiveProps(nextProps) {
    let Grades = nextProps.DataState.GradeClassMsg.Grades
      ? nextProps.DataState.GradeClassMsg.Grades
      : [];
    let len = Grades.length;
    let initFirstSelect = { value: 0, title: "全部年级" };
    let Classes = [{ value: 0, title: "全部班级" }];
    let Select = nextProps.DataState.GradeStudentPreview;
    //  console.log(Grades)
    let GradeArr = [{ value: 0, title: "全部年级" }];

    for (let i = 0; i < len; i++) {
      let Grade = { value: Grades[i].GradeID, title: Grades[i].GradeName };
      GradeArr.push(Grade);
    }

    if (
      nextProps.DataState.GradeClassMsg.returnData.AllClasses &&
      Select.GradeID &&
      Select.GradeID.value !== 0
    ) {
      // console.log('位置',this.state.pagination)
      let ClassArr =
        nextProps.DataState.GradeClassMsg.returnData.AllClasses[
          Select.GradeID.value
        ];
      ClassArr.map((Class) => {
        Classes.push(Class);
      });
      //Classes.push(this.props.DataState.GradeClassMsg.returnData.AllClasses[e.value]);
      //this.refs.dropMenuSecond.state.dropList = Classes;]
      this.setState({
        secondDropList: Classes,
        DropMenuShow: true,
        // pagination:1
      });
    } else {
      this.setState({
        DropMenuShow: false,
        secondDropList: Classes,
      });
    }
    // console.log('ss')
    this.setState({
      GradeArr: GradeArr,
      firstSelect: Select.GradeID || initFirstSelect,
      secondSelect: Select.ClassID
        ? Select.ClassID
        : { value: 0, title: "全部年级" },
      pagination: Number(Select.pageIndex) + 1,
    });
  }
  componentWillMount() {}

  StudentDropMenu = (e) => {
    const { dispatch, DataState } = this.props;

    let Classes = [{ value: 0, title: "全部班级" }];
    // this.setState({
    //     firstSelect:e
    // })
    ////  console.log(this.refs.dropMenuSecond)
    if (e.value !== 0) {
      //Classes.push(this.props.DataState.GradeClassMsg.returnData.AllClasses[e.value]);
      //this.refs.dropMenuSecond.state.dropList = Classes;]
      this.setState({
        checkedList: [],
        checkAll: false,
        firstSelect: e,
        CancelBtnShow: "n",
        searchValue: "",
        // pagination: 1,
        keyword: "",
      });
      dispatch(
        actions.UpDataState.getGradeStudentPreview(
          "/GetStudentToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&GradeID=" +
            e.value +
            "&pageSize=" +
            this.state.pageSize +
            "&PageIndex=0&pageSize=" +
            this.state.pageSize +
            this.state.sortFiled +
            this.state.sortType,
          e
        )
      );
    } else {
      this.setState({
        checkedList: [],
        checkAll: false,
        firstSelect: e,
        CancelBtnShow: "n",
        searchValue: "",
        // pagination: 1,
        keyword: "",
      });
      dispatch(
        actions.UpDataState.getGradeStudentPreview(
          "/GetStudentToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&PageIndex=0" +
            this.state.sortFiled +
            "&pageSize=" +
            this.state.pageSize +
            this.state.sortType
        )
      );
    }
  };

  StudentDropMenuSecond = (e) => {
    const { dispatch, DataState } = this.props;
    //  console.log(e);
    // this.setState({
    //     secondSelect:e
    // })
    if (e.value === 0) {
      this.setState({
        checkedList: [],
        checkAll: false,
        secondSelect: e,
        CancelBtnShow: "n",
        searchValue: "",
        // pagination: 1
      });
      dispatch(
        actions.UpDataState.getGradeStudentPreview(
          "/GetStudentToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&GradeID=" +
            this.state.firstSelect.value +
            "&PageIndex=0" +
            this.state.sortFiled +
            "&pageSize=" +
            this.state.pageSize +
            this.state.sortType,
          this.state.firstSelect
        )
      );
    } else {
      this.setState({
        checkedList: [],
        checkAll: false,
        secondSelect: e,
        searchValue: "",
        CancelBtnShow: "n",
        // pagination: 1
      });
      dispatch(
        actions.UpDataState.getGradeStudentPreview(
          "/GetStudentToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&GradeID=" +
            this.state.firstSelect.value +
            "&ClassID=" +
            e.value +
            "&PageIndex=0" +
            "&pageSize=" +
            this.state.pageSize +
            this.state.sortFiled +
            this.state.sortType,
          this.state.firstSelect,
          e
        )
      );
    }
  };

  StudentSearch = (e) => {
    const { dispatch, DataState } = this.props;
    // this.setState({
    //     keyword: '&keyword='+e.value,
    //     CancelBtnShow: 'y',
    //     pagination: 1,
    // })
    if (e.value === "") {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",

          title: "请输入关键字搜索",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
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
          title: "输入的学号或姓名格式不正确",
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
      searchWord: e.value,
      CancelBtnShow: "y",
      // pagination: 1
    });
    // //  console.log(e)
    dispatch(
      actions.UpDataState.getGradeStudentPreview(
        "/GetStudentToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.firstSelect.value !== 0
            ? "&gradeID=" + this.state.firstSelect.value
            : "") +
          (this.state.secondSelect.value !== 0
            ? "&classID=" + this.state.secondSelect.value
            : "") +
          "&keyword=" +
          e.value +
          "&PageIndex=0&pageSize=" +
          this.state.pageSize +
          this.state.sortFiled +
          this.state.sortType,
        this.state.firstSelect,
        this.state.secondSelect
      )
    );
  };

  onSelectChange = (e) => {
    // //  console.log(e)
    //this.setState({ selectedRowKeys });
  };

  StudentEdit = (e, key) => {
    //  console.log(e, key)
    const { dispatch, DataState } = this.props;

    dispatch(
      actions.UpDataState.getGradeClassMsg(
        "/GetGradeClassTree?schoolID=" + this.state.userMsg.SchoolID
      )
    );
    this.setState({
      studentModalVisible: true,
      userKey: e,
    });
  };

  StudentChange = (key) => {
    //  console.log(e, key)
    const { dispatch, DataState } = this.props;

    let innerID = DataState.GradeStudentPreview.newList[key].Others.InnerID;
    let url = "/GetUserLog?innerID=" + innerID;
    // console.log(innerID)
    dispatch(actions.UpDataState.getUserLog(url, "student"));
    this.setState({
      studentChangeUserLog: DataState.GradeStudentPreview.newList[key].Others,
    });
  };

  onMouseEnterName = () => {};
  OnCheckAllChange = (e) => {
    //  console.log(e)
    if (e.target.checked) {
      this.setState({
        checkedList: this.props.DataState.GradeStudentPreview.keyList,
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
    //  console.log(checkedList)
    this.setState({
      checkedList,
      checkAll:
        checkedList.length ===
        this.props.DataState.GradeStudentPreview.keyList.length
          ? true
          : false,
    });
  };
  handleStudentModalOk = (e) => {
    let url = "/EditStudent";

    const { DataState, dispatch, UIState } = this.props;
    const { initStudentMsg, changeStudentMsg } = DataState.SetStudentMsg;
    let picObj = DataState.GetPicUrl.picObj;
    // console.log(picObj.picUploader.isChanged());
    let EditModalTipsVisible = UIState.EditModalTipsVisible;
    for (let key in EditModalTipsVisible) {
      if (EditModalTipsVisible[key]) {
        return;
      }
    }
    //    if(EditModalTipsVisible.UserIDTipsVisible||EditModalTipsVisible.UserNameTipsVisible||EditModalTipsVisible.GenderTipsVisible||EditModalTipsVisible.GradeTipsVisible||EditModalTipsVisible.ClassTipsVisible){
    //        return;
    //    }
    if (!changeStudentMsg.classID) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          ClassTipsVisible: true,
        })
      );
      return;
    } else if (changeStudentMsg.classID === -1) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          ClassTipsVisible: false,
        })
      );
      return;
    } else {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          ClassTipsVisible: false,
        })
      );
    }
    if (
      Public.comparisonObject(changeStudentMsg, initStudentMsg) &&
      !picObj.picUploader.isChanged()
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "学生信息没有发生改变",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
      return;
    } else {
      if (picObj.picUploader.uploadSubmit()) {
        // console.log(picObj.picUploader.getCurImgPath())
        let PhotoEdit = 0;
        if (picObj.picUploader.isChanged()) {
          PhotoEdit = 1;
        }
        postData(
          CONFIG.UserInfoProxy + url,
          {
            ...changeStudentMsg,
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
            //     dispatch(actions.UpUIState.showErrorAlert({
            //         type: 'btn-error',
            //         title: json.Msg,
            //         ok: this.onAppAlertOK.bind(this),
            //         cancel: this.onAppAlertCancel.bind(this),
            //         close: this.onAppAlertClose.bind(this)
            //     }));
            // } else
            if (json.StatusCode === 200) {
              //  console.log(json.Data)
              dispatch(
                actions.UpUIState.showErrorAlert({
                  type: "success",
                  title: "操作成功",
                  onHide: this.onAlertWarnHide.bind(this),
                })
              );
              this.setState({
                studentModalVisible: false,
              });
              this.setState({
                checkedList: [],
                checkAll: false,
              });
            }
            dispatch(
              actions.UpDataState.getGradeStudentPreview(
                "/GetStudentToPage?SchoolID=" +
                  this.state.userMsg.SchoolID +
                  (this.state.firstSelect.value !== 0
                    ? "&gradeID=" + this.state.firstSelect.value
                    : "") +
                  (this.state.secondSelect.value !== 0
                    ? "&classID=" + this.state.secondSelect.value
                    : "") +
                  "&PageIndex=" +
                  (this.state.pagination - 1) +
                  "&pageSize=" +
                  this.state.pageSize +
                  this.state.sortFiled +
                  this.state.sortType +
                  this.state.keyword,
                this.state.firstSelect,
                this.state.secondSelect
              )
            );
            dispatch(actions.UpUIState.editAlltModalTipsVisible());
          });
      }
    }
  };
  handleStudentModalCancel = (e) => {
    //  console.log(e)
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.editAlltModalTipsVisible());
    this.setState({
      studentModalVisible: false,
    });
  };
  StudentChangeMadalOk = (e) => {
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.STUDENT_CHANGE_MODAL_CLOSE });
  };
  StudentChangeMadalCancel = (e) => {
    //  console.log(e)
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.STUDENT_CHANGE_MODAL_CLOSE });
  };

  onDeleteAllClick = () => {
    const { dispatch } = this.props;
    //  console.log(this.state.checkedList)
    if (this.state.checkedList.length === 0) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请先勾选所要删除的学生",
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
          title: "确定删除勾选的学生吗？",
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
    let url = "/DeleteStudent";
    let checkList = this.state.checkedList;
    let dataList = DataState.GradeStudentPreview.newList;
    let Total = DataState.GradeStudentPreview.Total;
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
      2
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
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
          this.setState({
            checkedList: [],
            checkAll: false,
          });
          dispatch(
            actions.UpDataState.getGradeStudentPreview(
              "/GetStudentToPage?SchoolID=" +
                this.state.userMsg.SchoolID +
                (this.state.firstSelect.value !== 0
                  ? "&gradeID=" + this.state.firstSelect.value
                  : "") +
                (this.state.secondSelect.value !== 0
                  ? "&classID=" + this.state.secondSelect.value
                  : "") +
                "&PageIndex=" +
                pagination +
                "&pageSize=" +
                this.state.pageSize +
                this.state.sortFiled +
                this.state.sortType +
                this.state.keyword,
              this.state.firstSelect,
              this.state.secondSelect
            )
          );
        }
      });
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

  // 分页
  onPagiNationChange = (e) => {
    const { dispatch, DataState } = this.props;

    this.setState({
      checkedList: [],
      checkAll: false,
      // pagination: e
    });
    dispatch(
      actions.UpDataState.getGradeStudentPreview(
        "/GetStudentToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.firstSelect.value !== 0
            ? "&gradeID=" + this.state.firstSelect.value
            : "") +
          (this.state.secondSelect.value !== 0
            ? "&classID=" + this.state.secondSelect.value
            : "") +
          "&PageIndex=" +
          (e - 1) +
          "&pageSize=" +
          this.state.pageSize +
          this.state.sortType +
          this.state.sortFiled +
          this.state.keyword,
        this.state.firstSelect,
        this.state.secondSelect
      )
    );
  };
  onUserNameClick = (key) => {
    const { DataState } = this.props;
    this.setState({
      StudentDetailsMsgModalVisible: true,
      detailData: DataState.GradeStudentPreview.pensonalList[key],
    });
  };
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
  onAddStudent = (e) => {
    //  console.log(e)
    const { dispatch, DataState } = this.props;

    dispatch(
      actions.UpDataState.getGradeClassMsg(
        "/GetGradeClassTree?schoolID=" + this.state.userMsg.SchoolID
      )
    );
    this.setState({
      addStudentModalVisible: true,
      userKey: "add",
    });
  };
  handleAddStudentModalOk = (e) => {
    //  console.log(e)
    let url = "/AddStudent";

    const { DataState, dispatch, UIState } = this.props;
    let picObj = DataState.GetPicUrl.picObj;
    const { initStudentMsg, changeStudentMsg } = DataState.SetStudentMsg;
    let visible = UIState.EditModalTipsVisible;
    let haveMistake = false;
    for (let visi in visible) {
      if (visible[visi]) {
        haveMistake = true;
      }
    }

    // 错误
    //用户ID必填
    if (changeStudentMsg.userID === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserIDTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //用户名必填
    if (changeStudentMsg.userName === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserNameTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //性别必选
    if (!changeStudentMsg.gender) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          GenderTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //年级必选
    if (!changeStudentMsg.gradeID) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          GradeTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //班级必选
    if (!changeStudentMsg.classID) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          ClassTipsVisible: true,
        })
      );
      haveMistake = true;
    } else if (changeStudentMsg.classID === -1) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          ClassTipsVisible: false,
        })
      );
      haveMistake = true;
    } else {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          ClassTipsVisible: false,
        })
      );
    }
    if (haveMistake) {
      return;
    }
    if (
      Public.comparisonObject(
        changeStudentMsg,
        initStudentMsg && !picObj.picUploader.isChanged()
      )
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-error",
          title: "请先填写学生信息",
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
            ...changeStudentMsg,
            photoPath: picObj.picUploader.getCurImgPath(),
          },
          2
        )
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            // if (json.StatusCode !== 200) {
            //     dispatch(actions.UpUIState.showErrorAlert({
            //         type: 'btn-error',
            //         title: json.Msg,
            //         ok: this.onAppAlertOK.bind(this),
            //         cancel: this.onAppAlertCancel.bind(this),
            //         close: this.onAppAlertClose.bind(this)
            //     }));
            // } else
            if (json.StatusCode === 200) {
              //  console.log(json.Data)
              dispatch(
                actions.UpUIState.showErrorAlert({
                  type: "success",
                  title: "操作成功",
                  onHide: this.onAlertWarnHide.bind(this),
                })
              );
              this.setState({
                studentModalVisible: false,
              });
              this.setState({
                addStudentModalVisible: false,
              });
              this.setState({
                checkedList: [],
                checkAll: false,
              });
              dispatch(
                actions.UpDataState.getGradeStudentPreview(
                  "/GetStudentToPage?SchoolID=" +
                    this.state.userMsg.SchoolID +
                    (this.state.firstSelect.value !== 0
                      ? "&gradeID=" + this.state.firstSelect.value
                      : "") +
                    (this.state.secondSelect.value !== 0
                      ? "&classID=" + this.state.secondSelect.value
                      : "") +
                    "&PageIndex=" +
                    (this.state.pagination - 1) +
                    "&pageSize=" +
                    this.state.pageSize +
                    this.state.sortFiled +
                    this.state.sortType +
                    this.state.keyword,
                  this.state.firstSelect,
                  this.state.secondSelect
                )
              );
              dispatch(actions.UpUIState.editAlltModalTipsVisible());
            }
          });
      }
    }
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    //console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  handleAddStudentModalCancel = (e) => {
    //  console.log(e)
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.editAlltModalTipsVisible());
    this.setState({
      addStudentModalVisible: false,
    });
  };

  //监听table的change进行排序操作
  onTableChange = (page, filters, sorter) => {
    const { DataState, dispatch } = this.props;
    // //  console.log(sorter)
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
        actions.UpDataState.getGradeStudentPreview(
          "/GetStudentToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            (this.state.firstSelect.value !== 0
              ? "&gradeID=" + this.state.firstSelect.value
              : "") +
            (this.state.secondSelect.value !== 0
              ? "&classID=" + this.state.secondSelect.value
              : "") +
            "&sortFiled=" +
            sorter.columnKey +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&pageSize=" +
            this.state.pageSize +
            "&" +
            sortType +
            this.state.keyword,
          this.state.firstSelect,
          this.state.secondSelect
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
        actions.UpDataState.getGradeStudentPreview(
          "/GetStudentToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            (this.state.firstSelect.value !== 0
              ? "&gradeID=" + this.state.firstSelect.value
              : "") +
            (this.state.secondSelect.value !== 0
              ? "&classID=" + this.state.secondSelect.value
              : "") +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&pageSize=" +
            this.state.pageSize +
            this.state.keyword,
          this.state.firstSelect,
          this.state.secondSelect
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
      actions.UpDataState.getGradeStudentPreview(
        "/GetStudentToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.firstSelect.value !== 0
            ? "&gradeID=" + this.state.firstSelect.value
            : "") +
          (this.state.secondSelect.value !== 0
            ? "&classID=" + this.state.secondSelect.value
            : "") +
          "&PageIndex=" +
          0 +
          "&pageSize=" +
          this.state.pageSize +
          this.state.sortType +
          this.state.sortFiled,
        this.state.firstSelect,
        this.state.secondSelect
      )
    );
  };
  onLinkClick = (btnName, route) => {
    let url = window.location.href.split(window.location.hash).join(route);

    // console.log(url);
    checkUrlAndPostMsg({ btnName, url });
  };
  // 改变显示条目数
  onShowSizeChange = (current, pageSize) => {
    // console.log(current, pageSize);
    const { dispatch } = this.props;

    this.setState({
      pageSize,
      checkedList: [],
      checkAll: false,
      pagination:1
    });

    dispatch(
      actions.UpDataState.getGradeStudentPreview(
        "/GetStudentToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.firstSelect.value !== 0
            ? "&gradeID=" + this.state.firstSelect.value
            : "") +
          (this.state.secondSelect.value !== 0
            ? "&classID=" + this.state.secondSelect.value
            : "") +
          "&PageIndex=0" 
           +
          "&pageSize=" +
          pageSize +
          this.state.sortFiled +
          this.state.sortType +
          this.state.keyword,
        this.state.firstSelect,
        this.state.secondSelect
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
    //  console.log(this.state.pagination)
    return (
      <div className="Student">
        <div className="Student-box">
          <div className="Student-top">
            <span className="top-tips">
              <span className="tips menu39 ">学生档案管理</span>
            </span>
            <div className="top-nav">
              {/* <a
                className="link"
                // to="/UserArchives/Graduate"
                // target="_blank"
                // replace
              >
                <span className="Graduate">毕业生档案管理</span>
              </a>
              <span className="divide">|</span> */}
              <a className="link">
                <span
                  onClick={this.onLinkClick.bind(
                    this,
                    "学生注册审核",
                    "#/RegisterExamine/RegisterWillExamine"
                  )}
                  className="RegisterExamine"
                >
                  学生注册审核
                </span>
              </a>
              <span className="divide">|</span>
              <span
                className="link"
                style={{ cursor: "pointer" }}
                onClick={this.onAddStudent}
              >
                <span className="add">添加学生</span>
              </span>
              <span className="divide">|</span>
              <a
                className="link"
                // target="_blank"
                // to="/ImportFile/Student"
                // replace
                onClick={this.onLinkClick.bind(
                  this,
                  "导入学生",
                  "#/ImportFile/Student"
                )}
              >
                <span className="ImportFile">导入学生</span>
              </a>
            </div>
          </div>
          <div className="Student-hr"></div>
          <div className="Student-content">
            <div className="content-top">
              <DropDown
                ref="dropMenuFirst"
                onChange={this.StudentDropMenu}
                width={120}
                title="班级："
                height={240}
                dropSelectd={this.state.firstSelect}
                dropList={
                  DataState.GradeClassMsg.returnData
                    ? DataState.GradeClassMsg.returnData.grades
                    : [{ value: 0, title: "全部年级" }]
                }
              ></DropDown>
              <DropDown
                ref="dropMenuSecond"
                width={120}
                height={240}
                style={{ display: this.state.DropMenuShow ? "block" : "none" }}
                dropSelectd={this.state.secondSelect}
                dropList={this.state.secondDropList}
                onChange={this.StudentDropMenuSecond}
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
                    {" " + DataState.GradeStudentPreview.Total + " "}
                  </span>
                  人
                </span>
                <Search
                  placeHolder="请输入学号或姓名进行搜索..."
                  onClickSearch={this.StudentSearch.bind(this)}
                  height={30}
                  width={250}
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
                    {DataState.GradeStudentPreview.newList instanceof Array &&
                    DataState.GradeStudentPreview.newList.length !== 0 ? (
                      <Table
                        className="table"
                        loading={UIState.AppLoading.TableLoading}
                        columns={this.state.columns}
                        pagination={false}
                        onChange={this.onTableChange.bind(this)}
                        dataSource={DataState.GradeStudentPreview.newList}
                      ></Table>
                    ) : (
                      <Empty
                        title={
                          this.state.CancelBtnShow === "y" ||
                          this.state.firstSelect.value !== 0
                            ? "暂无符合条件的学生档案"
                            : "暂无学生档案"
                        }
                        type="3"
                        style={{ marginTop: "150px" }}
                      ></Empty>
                    )}
                  </CheckBoxGroup>
                  {DataState.GradeStudentPreview.Total > 0 ? (
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
                      onShowSizeChange={this.onShowSizeChange}
                      current={this.state.pagination}
                      hideOnSinglePage={DataState.GradeStudentPreview.Total===0?true:false}
                      total={DataState.GradeStudentPreview.Total}
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
          ref="handleStudentMadal"
          bodyStyle={{ padding: 0 }}
          type="1"
          title="编辑学生"
          visible={this.state.studentModalVisible}
          onOk={this.handleStudentModalOk}
          onCancel={this.handleStudentModalCancel}
        >
          {this.state.studentModalVisible ? (
            <EditModal type="student" userKey={this.state.userKey}></EditModal>
          ) : (
            ""
          )}
        </Modal>
        <Modal
          ref="StudentChangeMadal"
          bodyStyle={{ padding: 0 }}
          type="2"
          width={650}
          visible={UIState.AppModal.StudentChangeMadalVisible}
          onOk={this.StudentChangeMadalOk}
          onCancel={this.StudentChangeMadalCancel}
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
                  {this.state.studentChangeUserLog.UserName}的档案变更记录
                </span>
              </div>
              <div className="content">
                <Scrollbars style={{ width: 100 + "%", height: 280 + "px" }}>
                  {UIState.AppModal.StudentChangeMadalVisible ? (
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
              style={{ top: "150px", position: "relative" }}
            ></Empty>
          )}
        </Modal>
        <Modal
          ref="handleTeacherMadal"
          bodyStyle={{ padding: 0 }}
          type="1"
          title={"添加学生"}
          visible={this.state.addStudentModalVisible}
          onOk={this.handleAddStudentModalOk}
          onCancel={this.handleAddStudentModalCancel}
        >
          {this.state.addStudentModalVisible ? (
            <EditModal type="student" userKey={this.state.userKey}></EditModal>
          ) : (
            ""
          )}
        </Modal>
        <DetailsModal
          ref="StudentDetailsMsgModal"
          visible={this.state.StudentDetailsMsgModalVisible}
          module={1}
          onOk={this.StudentDetailsMsgModalOk}
          onCancel={this.StudentDetailsMsgModalCancel}
          data={this.state.detailData ? this.state.detailData : []}
          type="student"
        ></DetailsModal>
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
export default connect(mapStateToProps)(Student);
