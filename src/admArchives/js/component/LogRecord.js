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
import locale from "antd/es/date-picker/locale/zh_CN";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { Tooltip, DatePicker, Input } from "antd";
import CONFIG from "../../../common/js/config";
import { postData, getData } from "../../../common/js/fetch";
import history from "../containers/history";
import IconLocation from "../../images/icon-location.png";
import actions from "../actions";
import "../../scss/LogRecord.scss";
import Public from "../../../common/js/public";
import TipsLog from "./TipsLog";
import moment from "moment";

class LogRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "编号",
          dataIndex: "LogID",
          key: "LogID",
          width: 150,
          sorter: true,
          align: "center",
          render: (LogID) => {
            return (
              <div className="registerTime-content">
                {/* <CheckBox value={key.key} onChange={this.onCheckChange}></CheckBox> */}
                <span title={LogID} className="key-content">
                  {LogID}
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
          dataIndex: "UserName",
          render: (arr) => {
            return (
              <div className="name-content">
                {/* <img
                  alt={arr.UserName}
                  onClick={this.onUserNameClick.bind(this, arr.key)}
                  className="name-img"
                  width="47"
                  height="47"
                  src={arr.PhotoPath}
                ></img> */}
                <i
                  alt={arr.UserName}
                  onClick={this.onUserNameClick.bind(this, arr.key)}
                  className="name-img"
                  style={{
                    width: "37.5px",
                    height: "47px",
                    display: "inline-block",
                    background: `url(${arr.PhotoPath}) no-repeat center center / 100% auto`,
                  }}
                ></i>
              </div>
            );
          },
        },
        {
          title: "用户档案",
          align: "left",
          colSpan: 2,
          width: 110,
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
                <span title={arr.UserID} className="UserID">
                  {arr.UserID ? arr.UserID : "--"}
                </span>
              </div>
            );
          },
        },
        {
          title: "档案类型",
          align: "center",
          dataIndex: "UserType_Txt",
          key: "UserType_Txt",
          width: 110,
          render: (UserType_Txt) => {
            return (
              <span title={UserType_Txt} className="UserType_Txt">
                {UserType_Txt ? UserType_Txt : "--"}
              </span>
            );
          },
        },
        {
          title: "操作类型",
          align: "center",
          dataIndex: "OperationType_Txt",
          width: 120,
          key: "OperationType_Txt",
          render: (OperationType_Txt) => {
            return (
              <span title={OperationType_Txt} className="OperationType_Txt">
                {OperationType_Txt ? OperationType_Txt : "--"}
              </span>
            );
          },
        },
        {
          title: "变更内容",
          width: 100,
          align: "center",
          key: "OperatorDetail",
          dataIndex: "OperatorDetail",
          render: (OperatorDetail) => {
            return (
              <Tooltip
                placement="top"
                trigger="click"
                arrowPointAtCenter={true}
                title={<TipsLog data={OperatorDetail}></TipsLog>}
              >
                {OperatorDetail.length > 0 ? (
                  <span className="OperatorDetail">{">>"}</span>
                ) : (
                  <span className="OperatorDetail-null">{"--"}</span>
                )}
              </Tooltip>
            );
          },
        },
        {
          title: (
            <span>
              姓名<br></br>工号
            </span>
          ),
          width: 140,
          align: "center",
          key: "Operator",
          dataIndex: "Operator",
          render: (Operator) => {
            return (
              <span className="Operator">
                <span title={Operator.OperatorName} className="OperatorName">
                  {Operator.OperatorName ? Operator.OperatorName : "--"}
                </span>
                <br></br>
                <span title={Operator.OperatorID} className="OperatorID">
                  {Operator.OperatorID ? Operator.OperatorID : "--"}
                </span>
              </span>
            );
          },
        },
        {
          title: "操作时间",
          align: "center",
          width: 170,
          key: "LogTime",
          dataIndex: "LogTime",
          render: (LogTime) => {
            // //console.log(key)
            return (
              <span title={LogTime} className="LogTime">
                {LogTime ? LogTime : "--"}
              </span>
            );
          },
        },
        {
          title: "操作者IP",
          align: "center",
          width: 150,
          key: "OperatorIP",
          dataIndex: "OperatorIP",
          render: (OperatorIP) => {
            // //console.log(key)
            return (
              <span title={OperatorIP} className="OperatorIP">
                {OperatorIP ? OperatorIP : "--"}
              </span>
            );
          },
        },
      ],
      FileTypeSelect: { value: -1, title: "全部" },
      HandleTypeSelect: { value: -1, title: "全部" },
      FileTypeList: [
        { value: -1, title: "全部" },
        { value: 1, title: "教师" },
        { value: 2, title: "学生" },
        { value: 7, title: "领导" },
      ],
      HandleTypeList: [
        { value: -1, title: "全部" },
        { value: 1, title: "录入" },
        { value: 2, title: "删除" },
        { value: 3, title: "更新" },
      ],
      checkedList: [],
      checkAll: false,
      userMsg: props.DataState.LoginUser,
      pagination: 1,
      SortType: "",
      UserType: "",
      UserTypeList: { 1: "teacher", 2: "student", 7: "leader" },
      startTime: null,
      endTime: null,
      startMomentTime: null,
      endtMomentTime: null,
      endOpen: false,
      sortFiled: "",
      pageSize: 10,
    };
  }
  FileTypeDropMenu = (e) => {
    const { DataState, dispatch } = this.props;

    dispatch(
      actions.UpDataState.getLogRecordPreview(
        "/GetAllLogToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.startTime ? "&beginTime=" + this.state.startTime : "") +
          (this.state.endTime ? "&endTime=" + this.state.endTime : "") +
          "&&OperationType=" +
          this.state.HandleTypeSelect.value +
          "&UserType=" +
          e.value +
          "&PageIndex=" +
          (this.state.pagination - 1) +
          "&pageSize=" +
          this.state.pageSize +
          this.state.SortType +
          this.state.sortFiled
      )
    );
    this.setState({
      checkedList: [],
      checkAll: false,
      pagination: 1,
      FileTypeSelect: e,
    });
  };
  HandleTypeDropMenu = (e) => {
    const { DataState, dispatch } = this.props;

    dispatch(
      actions.UpDataState.getLogRecordPreview(
        "/GetAllLogToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.startTime ? "&beginTime=" + this.state.startTime : "") +
          (this.state.endTime ? "&endTime=" + this.state.endTime : "") +
          "&OperationType=" +
          e.value +
          "&UserType=" +
          this.state.FileTypeSelect.value +
          "&PageIndex=" +
          (this.state.pagination - 1) +
          "&pageSize=" +
          this.state.pageSize +
          this.state.SortType +
          this.state.sortFiled
      )
    );
    this.setState({
      checkedList: [],
      checkAll: false,
      pagination: 1,
      HandleTypeSelect: e,
    });
  };
  // 档案动态全部标记已读
  LogSignAllReaded = () => {
    const { DataState, dispatch } = this.props;

    let url = "/LogSignAllReaded";

    postData(
      CONFIG.proxy + url,
      {
        UserID: this.state.userMsg.UserID,
      },
      2
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 400) {
          //console.log('错误码：400' + json)
        } else if (json.StatusCode === 200) {
          this.setState({
            checkedList: [],
            checkAll: false,
            pagination: 1,
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
            actions.UpDataState.getLogRecordPreview(
              "/GetAllLogToPage?SchoolID=" +
                this.state.userMsg.SchoolID +
                (this.state.startTime
                  ? "&beginTime=" + this.state.startTime
                  : "") +
                (this.state.endTime ? "&endTime=" + this.state.endTime : "") +
                "&OperationType=" +
                this.state.HandleTypeSelect.value +
                "&UserType=" +
                this.state.FileTypeSelect.value +
                "&PageIndex=0&pageSize=" +
                this.state.pageSize
            )
          );
          this.setState({
            checkedList: [],
            checkAll: false,
            pagination: 1,
          });
        }
      });
  };
  // 档案动态标记已读
  LogSignReaded = (key) => {
    // //console.log(key)
    const { DataState, dispatch } = this.props;
    let userInfo = DataState.LogRecordPreview.LogRecord.List.newList[key];
    let url = "/LogSignReaded";
    let LogIDs =
      userInfo.Logs instanceof Array &&
      userInfo.Logs.map((child, index) => {
        return child.LogID;
      }).join();
    postData(
      CONFIG.proxy + url,
      {
        LogIDs: LogIDs,
        UserID: this.state.userMsg.UserID,
      },
      2
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 400) {
          //console.log('错误码：400' + json)
        } else if (json.StatusCode === 200) {
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
            actions.UpDataState.getLogRecordPreview(
              "/GetAllLogToPage?SchoolID=" +
                this.state.userMsg.SchoolID +
                (this.state.startTime
                  ? "&beginTime=" + this.state.startTime
                  : "") +
                (this.state.endTime ? "&endTime=" + this.state.endTime : "") +
                "&OperationType=" +
                this.state.HandleTypeSelect.value +
                "&UserType=" +
                this.state.FileTypeSelect.value +
                "&PageIndex=0&pageSize=" +
                this.state.pageSize
            )
          );
          this.setState({
            checkedList: [],
            checkAll: false,
            pagination: 1,
          });
        }
      });
  };
  // 显示用户详情
  onUserNameClick = (key) => {
    const { DataState, dispatch } = this.props;
    let userInfo = DataState.LogRecordPreview.LogRecord.List.newList[key];
    //console.log(key,userInfo)
    this.setState({
      UserType: userInfo.UserType,
    });
    if (!userInfo.Deleted) {
      if (userInfo.UserType === 1 || userInfo.UserType === 2) {
        //学生教师调到个人画像
        let token = sessionStorage.getItem("token");
        window.open(
          "/html/userPersona#/?&userType=" +
            userInfo.UserType +
            "&userID=" +
            userInfo.userID +
            "&lg_tk=" +
            token
        );
      } else {
        dispatch(
          actions.UpDataState.getUserMsg(
            "/GetUserDetail?userid=" + userInfo.UserName.UserID
          )
        );
      }
    } else {
      // dispatch(actions.UpUIState.showErrorAlert({
      //     type: 'btn-warn',
      //     title: "该用户已删除",
      //     ok: this.onAlertQueryOk.bind(this),
      //     cancel: this.onAlertQueryClose.bind(this),
      //     close: this.onAlertQueryClose.bind(this)
      // }));
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "error",
          title: "该用户已删除",
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
  // 用户详情关闭
  UserDetailsMsgModalCancel = () => {
    const { DataState, dispatch } = this.props;

    dispatch(actions.UpUIState.UserInfoModalClose());
  };
  // 点击全选
  OnCheckAllChange = (e) => {
    //console.log(e)
    if (e.target.checked) {
      this.setState({
        checkedList: this.props.DataState.LogRecordPreview.LogRecord.List
          .keyList,
        checkAll: e.target.checked,
      });
    } else {
      this.setState({
        checkedList: [],
        checkAll: e.target.checked,
      });
    }
  };
  // 点击多选组
  onCheckBoxGroupChange = (checkedList) => {
    const { DataState } = this.props;
    //console.log(checkedList)
    this.setState({
      checkedList,
      checkAll:
        checkedList.length ===
        DataState.LogRecordPreview.LogRecord.List.keyList.length
          ? true
          : false,
    });
  };
  // 点击删除全部
  onDeleteAllClick = () => {
    const { dispatch } = this.props;
    //console.log(this.state.checkedList)
    if (this.state.checkedList.length === 0) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-warn",
          title: "你还没有选择哦~",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this),
        })
      );
    } else {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-query",
          title: "确定全部标记？",
          ok: this.onAlertQueryOk.bind(this),
          cancel: this.onAlertQueryClose.bind(this),
          close: this.onAlertQueryClose.bind(this),
        })
      );
    }
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    ////console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  // 提示弹窗事件
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
  // 全部标记
  onAlertQueryOk = () => {
    const { dispatch, DataState } = this.props;
    let url = "/LogSignReaded";
    let checkList = this.state.checkedList;
    let dataList = DataState.LogRecordPreview.LogRecord.List.newList;
    let LogIDList = checkList.map((child, index) => {
      return (
        dataList[child].Logs instanceof Array &&
        dataList[child].Logs.map((child, index) => {
          return child.LogID;
        }).join()
      );
    });
    let LogIDListString = LogIDList.join();

    postData(
      CONFIG.proxy + url,
      {
        LogIDs: LogIDListString,
        UserID: this.state.userMsg.UserID,
      },
      2
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 400) {
          //console.log('错误码：400' + json)
        } else if (json.StatusCode === 200) {
          this.setState({
            checkedList: [],
            checkAll: false,
          });
          dispatch(actions.UpUIState.hideErrorAlert());
          dispatch(
            actions.UpDataState.getLogRecordPreview(
              "/GetAllLogToPage?SchoolID=" +
                this.state.userMsg.SchoolID +
                (this.state.startTime
                  ? "&beginTime=" + this.state.startTime
                  : "") +
                (this.state.endTime ? "&endTime=" + this.state.endTime : "") +
                "&OperationType=" +
                this.state.HandleTypeSelect.value +
                "&UserType=" +
                this.state.FileTypeSelect.value +
                "&PageIndex=0&pageSize=" +
                this.state.pageSize
            )
          );
          this.setState({
            checkedList: [],
            checkAll: false,
            pagination: 1,
          });
        }
      });
  };
  //监听table的change进行排序操作
  onTableChange = (page, filters, sorter) => {
    const { DataState, dispatch } = this.props;
    // //console.log(sorter)
    if (
      sorter &&
      (sorter.columnKey === "UserName" || sorter.columnKey === "LogID")
    ) {
      let sortFiled =
        sorter.columnKey === "UserName"
          ? "&sortFiled=UserID"
          : "&sortFiled=LogID";
      let sortType =
        sorter.order === "descend"
          ? "&SortType=DESC"
          : sorter.order === "ascend"
          ? "&SortType=ASC"
          : "";
      dispatch(
        actions.UpDataState.getLogRecordPreview(
          "/GetAllLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            (this.state.startTime ? "&beginTime=" + this.state.startTime : "") +
            (this.state.endTime ? "&endTime=" + this.state.endTime : "") +
            "&OperationType=" +
            this.state.HandleTypeSelect.value +
            "&UserType=" +
            this.state.FileTypeSelect.value +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&pageSize=" +
            this.state.pageSize +
            sortType +
            sortFiled
        )
      );
      this.setState({
        checkedList: [],
        checkAll: false,
        SortType: sortType,
        sortFiled: sortFiled,
      });
    } else if (sorter && !sorter.columnKey) {
      dispatch(
        actions.UpDataState.getLogRecordPreview(
          "/GetAllLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            (this.state.startTime ? "&beginTime=" + this.state.startTime : "") +
            (this.state.endTime ? "&endTime=" + this.state.endTime : "") +
            "&OperationType=" +
            this.state.HandleTypeSelect.value +
            "&UserType=" +
            this.state.FileTypeSelect.value +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&pageSize=" +
            this.state.pageSize
        )
      );
      this.setState({
        checkedList: [],
        checkAll: false,
        SortType: "",
        sortFiled: "",
      });
    }
  };
  // 分页
  onPagiNationChange = (value) => {
    const { DataState, dispatch } = this.props;

    dispatch(
      actions.UpDataState.getLogRecordPreview(
        "/GetAllLogToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.startTime ? "&beginTime=" + this.state.startTime : "") +
          (this.state.endTime ? "&endTime=" + this.state.endTime : "") +
          "&OperationType=" +
          this.state.HandleTypeSelect.value +
          "&UserType=" +
          this.state.FileTypeSelect.value +
          "&PageIndex=" +
          (value - 1) +
          "&pageSize=" +
          this.state.pageSize +
          "&" +
          this.state.SortType +
          this.state.sortFiled
      )
    );
    this.setState({
      checkedList: [],
      checkAll: false,
      pagination: value,
    });
  };
  //操作时间
  disabledStartDate = (current) => {
    const { endMomentTime } = this.state;
    if (!current || !endMomentTime) {
      return current && current > moment().endOf("day");
    }
    return (
      current &&
      (current.valueOf() > endMomentTime.valueOf() ||
        current > moment().endOf("day"))
    );
  };
  disabledEndDate = (current) => {
    const { startMomentTime } = this.state;
    if (!startMomentTime || !current) {
      return current && current > moment().endOf("day");
    }

    return (
      current &&
      (current.valueOf() < startMomentTime.valueOf() ||
        current > moment().endOf("day"))
    );
  };
  //操作时间事件
  onStartTimeSelectOk = (Moment, time) => {
    // //console.log(time,Moment)
    const { DataState, dispatch } = this.props;
    ////console.log(time.valueOf())
    dispatch(
      actions.UpDataState.getLogRecordPreview(
        "/GetAllLogToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.startTime ? "&beginTime=" + this.state.startTime : "") +
          (this.state.endTime ? "&endTime=" + this.state.endTime : "") +
          "&OperationType=" +
          this.state.HandleTypeSelect.value +
          "&UserType=" +
          this.state.FileTypeSelect.value +
          "&PageIndex=0&pageSize=" +
          this.state.pageSize
      )
    );
    this.setState({
      pagination: 1,
    });
  };
  onStartTimeSelectChange = (Moment, time) => {
    const { DataState, dispatch } = this.props;

    if (Moment === null) {
      dispatch(
        actions.UpDataState.getLogRecordPreview(
          "/GetAllLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            (this.state.endTime ? "&endTime=" + this.state.endTime : "") +
            "&OperationType=" +
            this.state.HandleTypeSelect.value +
            "&UserType=" +
            this.state.FileTypeSelect.value +
            "&PageIndex=0&pageSize=" +
            this.state.pageSize
        )
      );
      this.setState({
        pagination: 1,
      });
    }
    this.setState({
      startTime: time,
      startMomentTime: Moment,
    });
  };
  onEndTimeSelectOk = (Moment, time) => {
    const { DataState, dispatch } = this.props;
    // //console.log(time)
    dispatch(
      actions.UpDataState.getLogRecordPreview(
        "/GetAllLogToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.startTime ? "&beginTime=" + this.state.startTime : "") +
          (this.state.endTime ? "&endTime=" + this.state.endTime : "") +
          "&OperationType=" +
          this.state.HandleTypeSelect.value +
          "&UserType=" +
          this.state.FileTypeSelect.value +
          "&PageIndex=0&pageSize=" +
          this.state.pageSize
      )
    );
    this.setState({
      pagination: 1,
    });
  };
  onEndTimeSelectChange = (Moment, time) => {
    const { DataState, dispatch } = this.props;

    // console.log(Moment, time)
    if (Moment === null) {
      dispatch(
        actions.UpDataState.getLogRecordPreview(
          "/GetAllLogToPage?SchoolID=" +
            this.state.userMsg.SchoolID +
            (this.state.startTime ? "&beginTime=" + this.state.startTime : "") +
            "&OperationType=" +
            this.state.HandleTypeSelect.value +
            "&UserType=" +
            this.state.FileTypeSelect.value +
            "&PageIndex=0&pageSize=" +
            this.state.pageSize
        )
      );
      this.setState({
        pagination: 1,
      });
    }
    this.setState({
      endMomentTime: Moment,
      endTime: time,
    });
  };
  //时间面板打开，开始的选择结束控制结束的面板打开
  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
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
      actions.UpDataState.getLogRecordPreview(
        "/GetAllLogToPage?SchoolID=" +
          this.state.userMsg.SchoolID +
          (this.state.startTime ? "&beginTime=" + this.state.startTime : "") +
          (this.state.endTime ? "&endTime=" + this.state.endTime : "") +
          "&OperationType=" +
          this.state.HandleTypeSelect.value +
          "&UserType=" +
          this.state.FileTypeSelect.value +
          "&PageIndex=" +
          0 +
          "&PageSize=" +
          pageSize +
          "&" +
          this.state.SortType +
          this.state.sortFiled
      )
    );
  };
  render() {
    const { DataState, UIState } = this.props;
    let data = DataState.LogRecordPreview.LogRecord;
    return (
      <div id="LogRecord" className="LogRecord">
        <div className="Graduate-box">
          <div className="Graduate-top">
            <span className="top-tips">
              <span className="tips menu-location ">档案变更记录</span>
            </span>
            {/* <Link to='/UserArchives/LogRecord' target='_blank' className='link-record'>查看全部变更记录</Link> */}
          </div>
          <div className="Graduate-hr"></div>
          <div className="Graduate-content">
            <div className="content-top">
              <div className="dropMenu-box">
                <DropDown
                  ref="dropMenuFirst"
                  className="firstDropMenu"
                  onChange={this.FileTypeDropMenu}
                  title="档案类型："
                  width={120}
                  height={96}
                  dropSelectd={this.state.FileTypeSelect}
                  dropList={this.state.FileTypeList}
                ></DropDown>
                <DropDown
                  ref="dropMenuSecond"
                  className="firstDropMenu"
                  title="操作类型："
                  width={120}
                  height={96}
                  dropSelectd={this.state.HandleTypeSelect}
                  dropList={this.state.HandleTypeList}
                  onChange={this.HandleTypeDropMenu}
                ></DropDown>

                <div className="handleTimeSelect">
                  <span className="time-tips">操作时间：</span>
                  <DatePicker
                    locale={locale}
                    showTime={{ format: "HH:mm" }}
                    value={this.state.startMomentTime}
                    placeholder="请选择开始时间"
                    onOk={this.onStartTimeSelectOk.bind(this)}
                    onChange={this.onStartTimeSelectChange.bind(this)}
                    disabledDate={this.disabledStartDate}
                    format={"YYYY-MM-DD HH:mm"}
                    onOpenChange={this.handlestartOpenChange}
                  />
                  <span className="time-to">至</span>
                  <DatePicker
                    locale={locale}
                    showTime={{ format: "HH:mm" }}
                    value={this.state.endMomentTime}
                    placeholder="请选择结束时间"
                    onOk={this.onEndTimeSelectOk.bind(this)}
                    onChange={this.onEndTimeSelectChange.bind(this)}
                    disabledDate={this.disabledEndDate}
                    format={"YYYY-MM-DD HH:mm"}
                    open={this.state.endOpen}
                    onOpenChange={this.handleEndOpenChange}
                  />
                  {/* <Button onClick={this.onCheckClick} className='check-btn' color='blue'>查询</Button> */}
                </div>
              </div>
            </div>
            <div className="content-render">
              <Loading
                tip="加载中..."
                opacity={false}
                size="large"
                spinning={UIState.AppLoading.TableLoading}
              >
                {data.List.newList instanceof Array &&
                data.List.newList.length !== 0 ? (
                  <Table
                    className="table"
                    loading={UIState.AppLoading.TableLoading}
                    columns={this.state.columns}
                    pagination={false}
                    onChange={this.onTableChange.bind(this)}
                    dataSource={data.List.newList}
                  ></Table>
                ) : (
                  <Empty
                    title={
                      this.state.FileTypeSelect.value !== 0 ||
                      this.state.HandleTypeSelect.value !== 0 ||
                      !this.state.startMomentTime ||
                      !this.state.endMomentTime
                        ? "暂无符合条件的用户档案"
                        : "暂无用户档案"
                    }
                    type="3"
                    style={{ marginTop: "150px" }}
                  ></Empty>
                )}
                <div className="pagination-box">
                  <PagiNation
                    showQuickJumper
                    showSizeChanger
                    pageSize={this.state.pageSize}
                    onShowSizeChange={this.onShowSizeChange}
                    hideOnSinglePage={data.Total === 0 ? true : false}
                    current={this.state.pagination}
                    total={data.Total}
                    onChange={this.onPagiNationChange}
                  ></PagiNation>
                </div>
              </Loading>
            </div>
          </div>
        </div>
        <DetailsModal
          ref="UserDetailsMsgModal"
          visible={UIState.AppModal.userInfoModalVisible}
          onOk={this.UserDetailsMsgModalOk}
          module={1}
          onCancel={this.UserDetailsMsgModalCancel}
          data={DataState.UserMsg}
          type={this.state.UserTypeList[this.state.UserType || 1]}
        ></DetailsModal>
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
export default connect(mapStateToProps)(LogRecord);
