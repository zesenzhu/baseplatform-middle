import React, { Component } from "react";
import {
  Frame,
  Menu,
  CheckBox,
  Loading,
  Alert,
  LeftMenu,
  Modal,
  DropDown,
  Button,
  Table,
  Empty,
  CheckBoxGroup
} from "../../../common";
import { connect } from "react-redux";
import "../../scss/Dynamic.scss";
import $ from "jquery";
import moment from "moment";
import { postData, getData } from "../../../common/js/fetch";
import actions from "../actions";
import history from "../containers/history";
import CONFIG from "../../../common/js/config";

import { DatePicker, Input } from "antd";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handleTypeSelected: {
        value: 0,
        title: "全部类型"
      },
      handleTypeList: [
        { value: 0, title: "全部类型" },
        { value: 1, title: "录入教学班" },
        { value: 2, title: "删除教学班" },
        { value: 3, title: "调整教学班" }
      ],
      startTime: "",
      endTime: "",
      startMomentTime: null,
      endtMomentTime: null,
      endOpen: false,
      columns: [
        {
          title: "序号",
          align: "center",

          key: "OrderNO",
          width: 100,
          dataIndex: "OrderNO",
          render: OrderNO => {
            return (
              <div className="CheckBox-content">
                <span className="key-content">
                  {OrderNO >= 10 ? OrderNO : "0" + OrderNO}
                </span>
              </div>
            );
          }
        },
        {
          title: "操作",
          align: "center",
          dataIndex: "OperateTypeName",
          key: "OperateTypeName",
          width: 180,
          render: OperateTypeName => {
            return (
              <React.Fragment>
                <span title={OperateTypeName} className="OperateTypeName">
                  {OperateTypeName}
                </span>
              </React.Fragment>
            );
          }
        },
        {
          title: "更新内容",
          align: "center",
          dataIndex: "OperateParams",
          width: 400,
          key: "OperateParams",
          render: OperateParams => {
            return (
              <p
                style={{
                  textAlign: "left",
                  marginBottom: 0,
                  paddinLeft: 10 + "px"
                }}
              >
                <span
                  className="OperateParams"
                  title={OperateParams.OperateParams.join("")}
                >
                  {OperateParams.OperateParams.map((param, index) => {
                    if (index % 2) {
                      return (
                        <span key={param} className="key-params">
                          {param}
                        </span>
                      );
                    } else {
                      return param;
                    }
                  })}
                </span>
                {/*<span
                  onClick={this.onOperateParamsClick.bind(
                    this,
                    OperateParams.CourseClassIDs
                  )}
                  style={{
                    display: OperateParams.Flag === 1 ? "inline-block" : "none"
                  }}
                  className="Flag"
                >
                  查看详情
                </span>*/}
              </p>
            );
          }
        },
        {
          title: "操作人工号",
          align: "center",
          dataIndex: "OperatorID",
          key: "OperatorID",
          width: 146,
          render: OperatorID => {
            return (
              <React.Fragment>
                <span title={OperatorID} className="OperatorID">
                  {OperatorID}
                </span>
              </React.Fragment>
            );
          }
        },
        {
          title: "操作人名称",
          width: 146,
          align: "center",
          dataIndex: "OperatorName",
          key: "OperatorName",
          render: OperatorName => {
            return (
              <React.Fragment>
                <span title={OperatorName} className="OperatorName">
                  {OperatorName}
                </span>
              </React.Fragment>
            );
          }
        },
        {
          title: "更新时间",
          width: 146,
          align: "center",
          dataIndex: "OperateTime",
          key: "OperateTime",
          render: OperateTime => {
            return (
              <span title={OperateTime} className="OperateTime">
                {OperateTime}
              </span>
            );
          }
        }
      ],
      checkedList: [],
      checkAll: false,
      pageSize: 10,
      plainOptions: [],
      pagination: 1,
      dataSource: []
    };
    const { dispatch, DataState, UIState } = this.props;

    let userMsg = DataState.LoginUser;
    // dispatch(actions.UpDataState.getCourseClassRecordMsg('/GetGourseClassLogForPage?userID=' + userMsg.UserID + '&userType=' + userMsg.UserType + '&schoolID=' + userMsg.SchoolID + '&startDate=' + this.state.startTime + '&endDate=' + this.state.endTime + '&operateType=0'))
  }

  //钩子
  componentWillReceiveProps(nextProps) {
    const { dispatch, DataState, UIState } = nextProps;
    let plainOptions = this.state.plainOptions;
    let dataSource = DataState.GetCourseClassRecordMsg.tableSource
      ? DataState.GetCourseClassRecordMsg.tableSource
      : [];
    let { pagination, pageSize } = this.state;
    let defaultPageSize = pageSize;
    if (plainOptions.length) {
      if (dataSource < pagination * pageSize) {
        pageSize = dataSource - (pagination - 1) * pageSize;
      }
      for (let index = 0; index < pageSize; index++) {
        plainOptions.push(index + defaultPageSize * (pagination - 1));
      }
      this.setState({
        plainOptions: plainOptions
      });
    }
    if (dataSource !== this.state.dataSource) {
      this.setState({
        checkedList: [],
        checkAll: false
      });
    }
    this.setState({
      dataSource: dataSource
    });
  }
  onHandleTypeChange = value => {
    const { dispatch, DataState } = this.props;
    let userMsg = DataState.LoginUser;
    this.setState({
      handleTypeSelected: value
    });
    dispatch(
      actions.UpDataState.getCourseClassRecordMsg(
        "/GetGourseClassLogForPage?userID=" +
          userMsg.UserID +
          "&userType=" +
          userMsg.UserType +
          "&schoolID=" +
          userMsg.SchoolID +
          "&startDate=" +
          this.state.startTime +
          "&endDate=" +
          this.state.endTime +
          "&operateType=" +
          value.value
      )
    );
  };
  //查看详情
  onOperateParamsClick = IDs => {
    const { dispatch, DataState } = this.props;

    let classIDs = IDs.split(",");
    let url = "";
    if (classIDs.length === 0) {
      return;
    } else if (classIDs.length === 1) {
      url = "/GetCourseClassDetail?courseClassID=" + IDs;

      dispatch(actions.UpUIState.CourseClassDetailsModalOpen());
      dispatch(actions.UpDataState.getCourseClassDetailsMsg(url));
    } else {
      url = "/GetCourseClassByIDs?courseClassIDs=" + IDs;
      dispatch(actions.UpUIState.LogDetailsModalOpen());
      dispatch(actions.UpDataState.getLogDetailsMsg(url));
    }
  };
  //操作时间
  disabledStartDate = current => {
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
  disabledEndDate = current => {
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
  onStartTimeSelectOk = time => {
    // console.log(time)
  };
  onStartTimeSelectChange = (Moment, time) => {
    //console.log(time.valueOf())
    this.setState({
      startTime: time,
      startMomentTime: Moment
    });
  };
  onEndTimeSelectOk = time => {
    // console.log(time)
  };
  onEndTimeSelectChange = (Moment, time) => {
    // console.log(time)
    this.setState({
      endTime: time,
      endMomentTime: Moment
    });
  };
  //时间面板打开，开始的选择结束控制结束的面板打开
  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };
  //点击查询
  onCheckClick = () => {
    const { dispatch, DataState } = this.props;

    // if (!this.state.startTime) {
    //     dispatch(actions.UpUIState.showErrorAlert({
    //         type: 'btn-error',
    //         title: "您还没有选择开始时间哦~",
    //         ok: this.onAppAlertOK.bind(this),
    //         cancel: this.onAppAlertCancel.bind(this),
    //         close: this.onAppAlertClose.bind(this)
    //     }));
    //     return;
    // }
    // if (!this.state.endTime) {
    //     dispatch(actions.UpUIState.showErrorAlert({
    //         type: 'btn-error',
    //         title: "您还没有选择结束时间哦~",
    //         ok: this.onAppAlertOK.bind(this),
    //         cancel: this.onAppAlertCancel.bind(this),
    //         close: this.onAppAlertClose.bind(this)
    //     }));
    //     return;
    // }
    let userMsg = DataState.LoginUser;
    let handleTypeSelected = this.state.handleTypeSelected;
    dispatch(
      actions.UpDataState.getCourseClassRecordMsg(
        "/GetGourseClassLogForPage?userID=" +
          userMsg.UserID +
          "&userType=" +
          userMsg.UserType +
          "&schoolID=" +
          userMsg.SchoolID +
          "&startDate=" +
          this.state.startTime +
          "&endDate=" +
          this.state.endTime +
          "&operateType=" +
          handleTypeSelected.value
      )
    );
  };

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

  //列表操作
  //列表多选
  onCheckBoxGroupChange = value => {
    let checkAll = false;

    if (value.length === this.state.plainOptions.length) {
      checkAll = true;
    }
    this.setState({
      checkedList: value,
      checkAll: checkAll
    });
  };
  //列表全选
  OnCheckAllChange = e => {
    //console.log(e.target,this.state.options)
    const { dispatch, DataState } = this.props;
    let plainOptions = [];
    let { pagination, pageSize, dataSource } = this.state;
    let defaultPageSize = pageSize;

    let checkedList = [];
    if (e.target.checked) {
      if (dataSource.length < pagination * defaultPageSize) {
        pageSize = dataSource.length - (pagination - 1) * defaultPageSize;
      }
      for (let index = 0; index < pageSize; index++) {
        plainOptions.push(index + defaultPageSize * (pagination - 1));
      }
      // console.log(plainOptions,pageSize,dataSource)
      this.setState({
        plainOptions: plainOptions
      });
      checkedList = plainOptions;
    } else {
      checkedList = [];
    }
    this.setState({
      checkAll: e.target.checked,
      checkedList: checkedList
    });
  };
  //全选选择
  onSelectAllClick = e => {
    const { dispatch, DataState } = this.props;

    let url = "/DeleteSubject";
    let userMsg = DataState.LoginUser;
    let handleTypeSelected = this.state.handleTypeSelected;

    let checkedList = this.state.checkedList;
    let len = checkedList.length;
    let LogID = "";
    let source = this.state.dataSource;
    // console.log(checkedList,source)
    checkedList.map((child, index) => {
      if (index !== len - 1) LogID += source[child].LogID + "-";
      else LogID += source[child].LogID;
    });

    if (len === 0) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请先勾选所要标记的更新记录",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
          onHide: this.onAlertWarnHide2.bind(this)
        })
      );
      return;
    }
    postData(
      CONFIG.CourseClassProxy + url,
      {
        userID: userMsg.UserID,
        userType: userMsg.UserType,
        logIDs: LogID
      },
      2,
      "json"
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 400) {
          // console.log('错误码：' + json.StatusCode)
        } else if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "成功",
              onHide: this.onAlertWarnHide.bind(this)
            })
          );
        }
      });
    //  else {
    //     dispatch(actions.UpUIState.showErrorAlert({
    //         type: 'btn-warn',
    //         title: "您确定删除？",
    //         ok: this.onAppAlertDeleteAllOK.bind(this, courseClassID),
    //         cancel: this.onAppAlertCancel.bind(this),
    //         close: this.onAppAlertClose.bind(this)
    //     }));
    // }
  };
  //关闭
  onAlertWarnHide2 = () => {
    const { dispatch, DataState, UIState } = this.props;

    dispatch(actions.UpUIState.hideErrorAlert());
  };
  //关闭
  onAlertWarnHide = () => {
    const { dispatch, DataState, UIState } = this.props;

    let userMsg = DataState.LoginUser;
    let handleTypeSelected = this.state.handleTypeSelected;
    dispatch(
      actions.UpDataState.getCourseClassDynamicMsg(
        "/GetGourseClassLogNew?userID=" +
          userMsg.UserID +
          "&userType=" +
          userMsg.UserType +
          "&schoolID=" +
          userMsg.SchoolID +
          "&startDate=" +
          this.state.startTime +
          "&endDate=" +
          this.state.endTime +
          "&operateType=" +
          handleTypeSelected.value
      )
    );
    this.setState({
      pagination: 1
    });
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  //页数变化
  onPaginationChange = value => {
    const { DataState, UIState } = this.props;
    // console.log(value)
    this.setState({
      pagination: value,
      checkAll: false,
      checkedList: []
    });
  };
  // 页数改变
  onPagiSizeChange = (current, size) => {
    // console.log(current,size)
    const { dispatch, DataState } = this.props;

    let plainOptions = [];
    let { pagination, pageSize, dataSource } = this.state;
    let defaultPageSize = size;
   
    this.setState({
      pagination: 1,
      pageSize:size,
      
    });
  };
  render() {
    const { DataState, UIState } = this.props;

    return (
      <div id="Record">
        <div className="log-box">
          <div className="log-top">
            <span className="top-tips">
              <span className="tips tip-menu">{"教学班更新历史记录"}</span>
            </span>
            <Router>
              <Link to="/Log/Dynamic" className="top-to">
                查看最新动态>>
              </Link>
            </Router>
          </div>
          <div className="log-hr"></div>
        </div>
        <div className="log-content">
          <div className="content-top clearfix">
            <DropDown
              title="操作类型："
              className="dropList"
              width={150}
              height={168}
              type="simple"
              dropSelectd={this.state.handleTypeSelected}
              dropList={this.state.handleTypeList}
              onChange={this.onHandleTypeChange.bind(this)}
            ></DropDown>
            <div className="handleTimeSelect">
              <span className="time-tips">操作时间：</span>
              <DatePicker
                value={this.state.startMomentTime}
                placeholder="请选择开始时间"
                onOk={this.onStartTimeSelectOk.bind(this)}
                onChange={this.onStartTimeSelectChange.bind(this)}
                disabledDate={this.disabledStartDate}
                format={"YYYY - MM - DD"}
                onOpenChange={this.handlestartOpenChange}
              />
              <span className="time-to">至</span>
              <DatePicker
                value={this.state.endMomentTime}
                placeholder="请选择结束时间"
                onOk={this.onEndTimeSelectOk.bind(this)}
                onChange={this.onEndTimeSelectChange.bind(this)}
                disabledDate={this.disabledEndDate}
                format={"YYYY - MM - DD"}
                open={this.state.endOpen}
                onOpenChange={this.handleEndOpenChange}
              />
              <Button
                onClick={this.onCheckClick}
                className="check-btn"
                color="blue"
              >
                查询
              </Button>
            </div>
          </div>
          <Loading size="large" spinning={UIState.AppLoading.appDynamicLoading}>
            <div 
            // style={{ minHeight: 640 + "px" }}
             className="content-dataShow">
              {DataState.GetCourseClassRecordMsg.tableSource instanceof Array &&
              DataState.GetCourseClassRecordMsg.tableSource.length !== 0 ? (
                <Table
                  className="table"
                  columns={this.state.columns}
                  dataSource={
                    DataState.GetCourseClassRecordMsg.tableSource
                      ? DataState.GetCourseClassRecordMsg.tableSource
                      : []
                  }
                  bordered
                  pagination={{
                    pageSize: this.state.pageSize,
                    hideOnSinglepage: true,
                    pageSizeOptions:['10','20','50','100'],
                    showQuickJumper: {
                      goButton: (
                        <Button className="go-btn" color="blue" size="small">
                          GO
                        </Button>
                      )
                    },
                    showSizeChanger: true,
                      onShowSizeChange: this.onPagiSizeChange.bind(this),
                    onChange: this.onPaginationChange
                  }}
                ></Table>
              ) : (
                <Empty
                  title={
                    this.state.handleTypeSelected.value !== 0 ||
                    this.state.startTime ||
                    this.state.endTime
                      ? "暂无符合条件的更新记录"
                      : "暂无更新记录"
                  }
                  type="3"
                  style={{ marginTop: "150px" }}
                ></Empty>
              )}
            </div>
          </Loading>
        </div>
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
export default connect(mapStateToProps)(Record);
