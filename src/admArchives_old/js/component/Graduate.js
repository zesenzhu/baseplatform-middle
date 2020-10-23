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
  Loading,
  Empty,
} from "../../../common/index";
//import '../../../common/scss/_left_menu.scss'
import { Link } from "react-router-dom";
import CONFIG from "../../../common/js/config";
import { postData, getData } from "../../../common/js/fetch";
import history from "../containers/history";
import IconLocation from "../../images/icon-location.png";
import actions from "../actions";
import "../../scss/Graduate.scss";
import Public from "../../../common/js/public";
import GraduateJobType from "./GraduateJobType";
import GraduateContact from "./GraduateContact";
let { checkUrlAndPostMsg } = Public;

class Graduate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "",
          dataIndex: "OrderNo",
          key: "OrderNo",
          width: 68,
          align: "center",
          render: (key) => {
            return (
              <div className="registerTime-content">
                {/* <CheckBox value={key.key} onChange={this.onCheckChange}></CheckBox> */}
                <span className="key-content">
                  {key.OrderNo + 1 >= 10
                    ? key.OrderNo + 1
                    : "0" + (key.OrderNo + 1)}
                </span>
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
          width: 92,
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
          title: "毕业年份",
          align: "center",
          dataIndex: "Grade",
          width: 110,
          key: "Grade",
          render: (Grade) => {
            return (
              <span title={Grade.Year} className="GradeName">
                {Grade.Year ? Grade.Year : "--"}
              </span>
            );
          },
        },
        {
          title: "班级",
          width: 110,
          align: "center",
          key: "Class",
          dataIndex: "Class",
          render: (arr) => {
            return (
              <span title={arr.ClassName} className="ClassName">
                {arr.ClassName ? arr.ClassName : "--"}
              </span>
            );
          },
        },
        {
          title: "毕业去向",
          width: 140,
          align: "center",
          key: "JobType",
          dataIndex: "JobType",
          render: (JobType) => {
            return JobType.HasTrack ? (
              <div className="JobType-box">
                <span
                  title={JobType.JobType}
                  className="JobType"
                  style={{
                    color: JobType.JobType === "升学" ? "#002871" : "#187100",
                  }}
                >
                  {JobType.JobType}
                </span>
                <span title={JobType.Discription} className="Discription">
                  {JobType.Discription}
                </span>
              </div>
            ) : (
              <span title={"不详"} className="HasTrack">
                不详
              </span>
            );
          },
        },
        {
          title: "预留电话",
          width: 140,
          align: "center",
          key: "Telephone",
          dataIndex: "Telephone",
          render: (Telephone) => {
            return (
              <span title={Telephone} className="Telephone">
                {Telephone ? Telephone : "--"}
              </span>
            );
          },
        },
        {
          title: "操作",
          align: "center",
          width: 270,
          key: "handleMsg",
          dataIndex: "handleMsg",
          render: (handleMsg, i) => {
            //console.log(handleMsg,i)
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  type="default"
                  onClick={this.HandleJobType.bind(this, handleMsg.key)}
                  className="handle-btn"
                >
                  编辑毕业去向
                </Button>
                <Button
                  color="blue"
                  type="default"
                  onClick={this.HandleContact.bind(this, handleMsg.key)}
                  className="handle-btn"
                >
                  编辑联系信息
                </Button>
              </div>
            );
          },
        },
      ],
      firstSelect: { value: 0, title: "全部" },
      secondSelect: { value: 0, title: "全部班级" },
      secondDropMenuShow: false,
      secondDropList: [{ value: 0, title: "全部班级" }],
      userMsg: props.DataState.LoginUser,
      checkedList: [],
      userKey: 0,
      checkAll: false,
      StudentDetailsMsgModalVisible: false,
      keyword: "",
      CancelBtnShow: "n",
      pagination: 1,
      searchValue: "",
      columnKey: "",
      order: "",
      detailData: "",
      searchWord: "",
      GraduateDetailsMsgModalVisible: false,
      EmptyTitle: "暂无毕业生档案数据",
      pageSize: 10,
    };
  }
  // 下拉菜单
  StudentDropMenu = (e) => {
    const { DataState, dispatch } = this.props;
    this.setState({
      firstSelect: e,
      secondSelect: { value: 0, title: "全部班级" },
      searchValue: "",
      pagination: 1,
      CancelBtnShow: "n",
      keyword: "",
    });
    if (e.value) {
      this.setState({ secondDropMenuShow: true });
    } else {
      this.setState({ secondDropMenuShow: false });
    }
    dispatch(
      actions.UpDataState.getGraduatePreview(
        "/GetGraduate?SchoolID=" +
          this.state.userMsg.SchoolID +
          (e.value !== 0 ? "&gradeID=" + e.value : "") +
          "&PageIndex=0&pageSize=" +
          this.state.pageSize +
          (this.state.columnKey ? "&sortFiled=" + this.state.columnKey : "") +
          (this.state.order ? "&SortType=" + this.state.order : "")
      )
    );
  };
  StudentDropMenuSecond = (e) => {
    const { DataState, dispatch } = this.props;
    this.setState({
      secondSelect: e,
      pageSize:10,
      searchValue: "",
      pagination: 1,
      CancelBtnShow: "n",
      keyword: "",
    });
    dispatch(
      actions.UpDataState.getGraduatePreview(
        "/GetGraduate?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.firstSelect.value !== 0
            ? "&gradeID=" + this.state.firstSelect.value
            : "") +
          (e.value !== 0 ? "&classID=" + e.value : "") +
          "&PageIndex=0&pageSize=" +
          this.state.pageSize +
          (this.state.columnKey ? "&sortFiled=" + this.state.columnKey : "") +
          (this.state.order ? "&SortType=" + this.state.order : "")
      )
    );
  };
  // 搜索 click
  StudentSearch = (e) => {
    const { dispatch, DataState } = this.props;

    if (e.value === "") {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "关键词不能为空",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this),
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
      searchWord: e.value,
      pagination: 1,
    });
    dispatch(
      actions.UpDataState.getGraduatePreview(
        "/GetGraduate?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=0&pageSize=" +
          this.state.pageSize +
          "&keyword=" +
          e.value +
          (this.state.firstSelect.value !== 0
            ? "&gradeID=" + this.state.firstSelect.value
            : "") +
          (this.state.secondSelect.value !== 0
            ? "&classID=" + this.state.secondSelect.value
            : "") +
          "" +
          (this.state.columnKey ? "&sortFiled=" + this.state.columnKey : "") +
          (this.state.order ? "&SortType=" + this.state.order : "")
      )
    );
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
      actions.UpDataState.getGraduatePreview(
        "/GetGraduate?SchoolID=" +
          this.state.userMsg.SchoolID +
          "&PageIndex=" +
          0 +
          "&pageSize=" +
          this.state.pageSize +
          (this.state.firstSelect.value !== 0
            ? "&gradeID=" + this.state.firstSelect.value
            : "") +
          (this.state.secondSelect.value !== 0
            ? "&classID=" + this.state.secondSelect.value
            : "") +
          "" +
          (this.state.columnKey ? "&sortFiled=" + this.state.columnKey : "") +
          (this.state.order ? "&SortType=" + this.state.order : "")
      )
    );
  };
  //table 多选组
  OnCheckAllChange = (e) => {
    //console.log(e)
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
    //console.log(checkedList)
    this.setState({
      checkedList,
      checkAll:
        checkedList.length ===
        this.props.DataState.GetGraduatePreview.keyList.length
          ? true
          : false,
    });
  };
  //监听table的change进行排序操作
  onTableChange = (page, filters, sorter) => {
    const { DataState, dispatch } = this.props;
    //console.log(sorter)
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
      dispatch(
        actions.UpDataState.getGraduatePreview(
          "/GetGraduate?SchoolID=" +
            this.state.userMsg.SchoolID +
            (this.state.keyword ? "&keyword=" + this.state.keyword : "") +
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
            sortType
        )
      );
      this.setState({
        checkedList: [],
        checkAll: false,
        columnKey: sorter.columnKey,
        order:
          sorter.order === "descend"
            ? "DESC"
            : sorter.order === "ascend"
            ? "ASC"
            : "",
      });
    } else {
      dispatch(
        actions.UpDataState.getGraduatePreview(
          "/GetGraduate?PageIndex=" +
            (this.state.pagination - 1) +
            "&pageSize=" +
            this.state.pageSize +
            "&schoolID=" +
            this.state.userMsg.SchoolID +
            (this.state.keyword ? "&keyword=" + this.state.keyword : "")
        )
      );
      this.setState({
        columnKey: "",
        order: "",
      });
    }
  };
  // 分页
  onPagiNationChange = (e) => {
    const { dispatch, DataState } = this.props;

    //console.log(e)
    dispatch(
      actions.UpDataState.getGraduatePreview(
        "/GetGraduate?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.keyword ? "&keyword=" + this.state.keyword : "") +
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
          (this.state.columnKey ? "&sortFiled=" + this.state.columnKey : "") +
          (this.state.order ? "&SortType=" + this.state.order : "")
      )
    );
    this.setState({
      checkedList: [],
      checkAll: false,
      pagination: e,
    });
  };
  // colunm 事件
  onUserNameClick = (key) => {
    const { DataState } = this.props;
    this.setState({
      GraduateDetailsMsgModalVisible: true,
      detailData: DataState.GetGraduatePreview.pensonalList[key],
    });
  };
  // 编辑毕业去向
  HandleJobType = (key) => {
    // //console.log(key)
    const { dispatch, DataState } = this.props;
    let data = DataState.GetGraduatePreview.newList[key].handleMsg;
    let GraduateMsg = {
      UserName: data.UserName,
      UserID: data.UserID,
      JobType: data.JobType,
      Discription: data.Discription,
    };
    dispatch(actions.UpDataState.getGraduateMsg(GraduateMsg));
    dispatch(actions.UpUIState.HandleGraduateModalOpen());
  };
  HandleContact = (key) => {
    // //console.log(key)
    const { dispatch, DataState } = this.props;
    let data = DataState.GetGraduatePreview.newList[key].handleMsg;
    let GraduateMsg = {
      UserID: data.UserID,
      Email: data.Email,
      Telephone: data.Telephone,
      HomeAddress: data.HomeAddress,
    };
    dispatch(actions.UpDataState.getGraduateContactMsg(GraduateMsg));
    dispatch(actions.UpUIState.HandleGraduateContactModalOpen());
  };
  // 用户信息弹窗
  GraduateDetailsMsgModalOk = () => {
    this.setState({
      GraduateDetailsMsgModalVisible: false,
    });
  };
  GraduateDetailsMsgModalCancel = () => {
    this.setState({
      GraduateDetailsMsgModalVisible: false,
    });
  };
  // 提示事件
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
  // 编辑毕业生去向
  handleGraduateModalOk = () => {
    const { dispatch, DataState, UIState } = this.props;
    let data = DataState.GetGraduateMsg.GraduateChangeMsg;
    let visible = UIState.EditModalTipsVisible.GraduateJobTypeVisible;
    let url = "/EditGraduateTrack";

    if (visible) {
      return;
    }
    if (
      Public.comparisonObject(DataState.GetGraduateMsg.GraduateInitMsg, data)
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "毕业去向没有发生改变。",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
      return;
    }
    postData(
      CONFIG.XTestProxy + url,
      {
        userID: data.UserID,
        JobType: data.JobType || "升学",
        Discription: data.Discription,
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
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "操作成功",
              onHide: this.onAlertWarnHide.bind(this),
            })
          );
          dispatch(
            actions.UpDataState.getGraduatePreview(
              "/GetGraduate?SchoolID=" +
                this.state.userMsg.SchoolID +
                (this.state.keyword ? "&keyword=" + this.state.keyword : "") +
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
                (this.state.columnKey
                  ? "&sortFiled=" + this.state.columnKey
                  : "") +
                (this.state.order ? "&SortType=" + this.state.order : "")
            )
          );
        }
        dispatch(actions.UpDataState.getGraduateContactMsg());
        dispatch(actions.UpUIState.HandleGraduateModalClose());
      });
  };
  handleGraduateModalCancel = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpDataState.getGraduateContactMsg());
    dispatch(actions.UpUIState.HandleGraduateModalClose());
  };
  // 编辑联系方式
  handleGraduateContactModalOk = () => {
    const { dispatch, DataState, UIState } = this.props;
    let data = DataState.GetGraduateMsg.GraduateContactChangeMsg;
    let visible =
      UIState.EditModalTipsVisible.EmailTipsVisible ||
      UIState.EditModalTipsVisible.TelephoneTipsVisible ||
      UIState.EditModalTipsVisible.HomeAdressTipsVisible;
    let url = "/EditGraduateContact";

    if (visible) {
      return;
    }
    if (
      Public.comparisonObject(
        DataState.GetGraduateMsg.GraduateContactInitMsg,
        data
      )
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "联系方式没有发生改变",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
      return;
    }
    postData(
      CONFIG.XTestProxy + url,
      {
        userID: data.UserID,
        Email: data.Email,
        Telephone: data.Telephone,
        HomeAddress: data.HomeAddress,
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
        // } else {
        if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "操作成功",
              onHide: this.onAlertWarnHide.bind(this),
            })
          );
          dispatch(
            actions.UpDataState.getGraduatePreview(
              "/GetGraduate?SchoolID=" +
                this.state.userMsg.SchoolID +
                (this.state.keyword ? "&keyword=" + this.state.keyword : "") +
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
                (this.state.columnKey
                  ? "&sortFiled=" + this.state.columnKey
                  : "") +
                (this.state.order ? "&SortType=" + this.state.order : "")
            )
          );
        }
        dispatch(
          actions.UpUIState.editModalTipsVisible({
            HomeAdressTipsVisible: false,
            EmailTipsVisible: false,
            TelephoneTipsVisible: false,
          })
        );
        dispatch(actions.UpDataState.getGraduateMsg());
        dispatch(actions.UpUIState.HandleGraduateContactModalClose());
      });
  };
  // handleGraduaContactModalCancel
  handleGraduateContactModalCancel = () => {
    const { dispatch } = this.props;
    dispatch(
      actions.UpUIState.editModalTipsVisible({
        HomeAdressTipsVisible: false,
        EmailTipsVisible: false,
        TelephoneTipsVisible: false,
      })
    );

    dispatch(actions.UpDataState.getGraduateMsg());
    dispatch(actions.UpUIState.HandleGraduateContactModalClose());
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    //console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  //通用提示弹窗
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
  onToGraduate = () => {
    window.open("/html/admArchives/#/ImportFile/Graduate");
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
      pagination: 1,
    });

    dispatch(
      actions.UpDataState.getGraduatePreview(
        "/GetGraduate?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.keyword ? "&keyword=" + this.state.keyword : "") +
          (this.state.firstSelect.value !== 0
            ? "&gradeID=" + this.state.firstSelect.value
            : "") +
          (this.state.secondSelect.value !== 0
            ? "&classID=" + this.state.secondSelect.value
            : "") +
          "&PageIndex=0" +
          // (this.state.pagination - 1) +
          "&pageSize=" +
          pageSize +
          (this.state.columnKey ? "&sortFiled=" + this.state.columnKey : "") +
          (this.state.order ? "&SortType=" + this.state.order : "")
      )
    );
  };
  render() {
    const { DataState, UIState } = this.props;
    //console.log(DataState.GetGraduateGradeClassMsg, DataState.GetGraduateGradeClassMsg.Class[this.state.firstSelect.value])
    return (
      <div id="Graduate" className="Graduate">
        <div className="Graduate-box">
          <div className="Graduate-top">
            <span className="top-tips">
              <span className="tips menu-location ">毕业生档案管理</span>
            </span>
            <div className="top-nav">
              <a
                className="link"
                // target="_blank"
                // to="/ImportFile/Teacher"
                // replace
                onClick={this.onLinkClick.bind(
                  this,
                  "导入毕业去向",
                  "#/ImportFile/Graduate"
                )}
              >
                <span className="ImportFile">导入毕业去向</span>
              </a>
            </div>

            {/* <Button onClick={this.onToGraduate.bind(this)} className='btn-toGraduate' color='blue' shape='round'>导入毕业去向</Button> */}
          </div>
          <div className="Graduate-hr"></div>
          <div className="Graduate-content">
            <div className="content-top">
              <div className="dropMenu-box">
                <DropDown
                  ref="dropMenuFirst"
                  onChange={this.StudentDropMenu}
                  width={120}
                  height={240}
                  title="班级："
                  dropSelectd={this.state.firstSelect}
                  dropList={DataState.GetGraduateGradeClassMsg.Grade}
                ></DropDown>
                <DropDown
                  ref="dropMenuSecond"
                  width={120}
                  height={240}
                  style={{
                    display: this.state.secondDropMenuShow ? "block" : "none",
                  }}
                  dropSelectd={this.state.secondSelect}
                  dropList={
                    DataState.GetGraduateGradeClassMsg.Class[
                      this.state.firstSelect.value
                    ]
                  }
                  onChange={this.StudentDropMenuSecond}
                ></DropDown>
              </div>
              <div className="search-box">
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
                    {" " + DataState.GetGraduatePreview.Total + " "}
                  </span>
                  人
                </span>
                <Search
                  placeHolder="请输入学号或姓名进行搜索..."
                  onClickSearch={this.StudentSearch.bind(this)}
                  width={250}
                  height={30}
                  onCancelSearch={this.onCancelSearch}
                  Value={this.state.searchValue}
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
                {DataState.GetGraduatePreview.newList instanceof Array &&
                DataState.GetGraduatePreview.newList.length !== 0 ? (
                  <Table
                    className="table"
                    loading={UIState.AppLoading.TableLoading}
                    columns={this.state.columns}
                    pagination={false}
                    onChange={this.onTableChange.bind(this)}
                    dataSource={DataState.GetGraduatePreview.newList}
                  ></Table>
                ) : (
                  <Empty
                    title={
                      this.state.CancelBtnShow === "y" ||
                      this.state.firstSelect.value !== 0
                        ? "暂无符合条件的毕业生档案"
                        : "暂无毕业生档案"
                    }
                    type="3"
                    style={{ marginTop: "150px" }}
                  ></Empty>
                )}

                <div className="pagination-box">
                  <PagiNation
                    showQuickJumper
                    showSizeChanger
                    hideOnSinglePage={DataState.GetGraduatePreview.Total===0?true:false}
                    pageSize={this.state.pageSize}
                    onShowSizeChange={this.onShowSizeChange}
                    current={this.state.pagination}
                    total={DataState.GetGraduatePreview.Total}
                    onChange={this.onPagiNationChange}
                  ></PagiNation>
                </div>
              </Loading>
            </div>
          </div>
        </div>
        {/* 个人信息 */}
        <DetailsModal
          ref="GraduateDetailsMsgModal"
          visible={this.state.GraduateDetailsMsgModalVisible}
          onOk={this.GraduateDetailsMsgModalOk}
          module={1}
          onCancel={this.GraduateDetailsMsgModalCancel}
          data={this.state.detailData}
          type="graduate"
        ></DetailsModal>
        {/* 编辑毕业去向 */}
        <Modal
          ref="handleGraduateMadal"
          bodyStyle={{ padding: 0, height: 216 + "px" }}
          type="1"
          title={"编辑毕业去向"}
          width={540}
          visible={UIState.AppModal.handleGraduateModalVisible}
          onOk={this.handleGraduateModalOk}
          onCancel={this.handleGraduateModalCancel}
        >
          {UIState.AppModal.handleGraduateModalVisible ? (
            <Loading
              tip="加载中..."
              opacity={false}
              size="large"
              spinning={UIState.AppLoading.modalLoading}
            >
              <GraduateJobType></GraduateJobType>
            </Loading>
          ) : (
            ""
          )}
        </Modal>
        {/* 编辑联系方式*/}
        <Modal
          ref="handleGraduateContactMadal"
          bodyStyle={{ padding: 0, height: 216 + "px" }}
          type="1"
          title={"编辑联系方式"}
          width={540}
          visible={UIState.AppModal.handleGraduateContactModalVisible}
          onOk={this.handleGraduateContactModalOk}
          onCancel={this.handleGraduateContactModalCancel}
        >
          {UIState.AppModal.handleGraduateContactModalVisible ? (
            <Loading
              tip="加载中..."
              opacity={false}
              size="large"
              spinning={UIState.AppLoading.modalLoading}
            >
              <GraduateContact></GraduateContact>
            </Loading>
          ) : (
            ""
          )}
        </Modal>
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
export default connect(mapStateToProps)(Graduate);
