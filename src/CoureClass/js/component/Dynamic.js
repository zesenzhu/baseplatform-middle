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
  CheckBoxGroup,
  Empty
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

class Dynamic extends React.Component {
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
      endMomentTime: null,
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
                <label>
                  <CheckBox type="gray" value={OrderNO - 1}></CheckBox>
                  <span className="key-content">
                    {OrderNO >= 10 ? OrderNO : "0" + OrderNO}
                  </span>
                </label>
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
      dataSource: [],
      UserMsg: props.DataState.LoginUser
    };

    // const { dispatch, DataState, UIState } = this.props;

    // let userMsg = DataState.LoginUser;
    // dispatch(
    //   actions.UpDataState.getCourseClassDynamicMsg(
    //     "/GetGourseClassLogNew?userID=" +
    //       userMsg.UserID +
    //       "&userType=" +
    //       userMsg.UserType +
    //       "&schoolID=" +
    //       userMsg.SchoolID +
    //       "&startDate=" +
    //       this.state.startTime +
    //       "&endDate=" +
    //       this.state.endTime +
    //       "&operateType=0"
    //   )
    // );
  }

  //钩子
  componentWillReceiveProps(nextProps) {
    const { dispatch, DataState, UIState } = nextProps;
    let plainOptions = [];
    let dataSource = DataState.GetCourseClassDynamicMsg.tableSource
      ? DataState.GetCourseClassDynamicMsg.tableSource
      : [];
    if (dataSource.length === 0) {
      return;
    }
    let { pagination, pageSize } = this.state;
    // console.log(pagination, pageSize,dataSource.length , pagination * pageSize)
    let defaultPageSize = pageSize;
    let endPagination = pagination - 1;
    // if (!plainOptions.length) {
    if (dataSource.length < pagination * pageSize) {
      if (dataSource.length <= (pagination - 1) * pageSize) {
        pageSize = dataSource.length - (pagination - 2) * pageSize;
        endPagination = pagination - 2;
      } else {
        pageSize = dataSource.length - (pagination - 1) * pageSize;
        endPagination = pagination - 1;
      }
    }
    for (let index = 0; index < pageSize; index++) {
      plainOptions.push(index + defaultPageSize * endPagination);
    }

    // }
    if (dataSource !== this.state.dataSource) {
      this.setState({
        checkedList: [],
        checkAll: false
      });
    }
    // console.log(plainOptions)
    this.setState({
      dataSource: dataSource,
      plainOptions: plainOptions,
      pagination: endPagination + 1
    });
  }
  onHandleTypeChange = value => {
    const { dispatch, DataState } = this.props;
    let userMsg = DataState.LoginUser;
    this.setState({
      handleTypeSelected: value
    });
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
          value.value
      )
    );
    // console.log(value.value)
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

      dispatch(actions.UpDataState.getCourseClassDetailsMsg(url, true));
    } else {
      url = "/GetCourseClassByIDs?courseClassIDs=" + IDs;
      dispatch(actions.UpDataState.getLogDetailsMsg(url, true));
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
    let plainOptions = this.state.plainOptions;
    let { pagination, pageSize, dataSource } = this.state;
    let defaultPageSize = pageSize;

    let checkedList = [];
    if (e.target.checked) {
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

    let url = "/GourseClassLogReaded";
    let userMsg = DataState.LoginUser;
    let handleTypeSelected = this.state.handleTypeSelected;

    let checkedList = this.state.checkedList;
    let len = checkedList.length;
    let LogID = "";
    let source = this.state.dataSource;
    console.log(checkedList, source)
    checkedList.map((child, index) => {
      if (index !== len - 1) LogID += source[child].LogID + ",";
      else LogID += source[child].LogID;
    });

    if (len === 0) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请先勾选所要标记的更新动态",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this)
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
          //   let { pagination, pageSize, dataSource } = this.state;
          //   let defaultPageSize = pageSize;
          //   if (dataSource.length < pagination * defaultPageSize) {
          //     pageSize = dataSource.length - (pagination - 1) * defaultPageSize;
          //   }
          //   for (let index = 0; index < pageSize; index++) {
          //     plainOptions.push(index + defaultPageSize * (pagination - 1));
          //   }
          //   // console.log(plainOptions, pageSize, dataSource)
          //   this.setState({
          //     plainOptions: plainOptions
          //   });
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
          //   let { pagination, pageSize, dataSource } = this.state;
          //   let plainOptions = [];
          //   let defaultPageSize = pageSize;
          //   if (dataSource.length < pagination * defaultPageSize) {
          //     pageSize = dataSource.length - (pagination - 1) * defaultPageSize;
          //   }
          //   for (let index = 0; index < pageSize; index++) {
          //     plainOptions.push(index + defaultPageSize * (pagination - 1));
          //   }
          //   this.setState({
          //     pagination: 1,
          //     checkAll: false,
          //     checkedList: [],
          //     plainOptions: plainOptions
          //   });
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
  onAlertWarnHide = () => {
    const { dispatch, DataState, UIState } = this.props;

    dispatch(actions.UpUIState.hideErrorAlert());
  };
  //页数变化
  onPaginationChange = value => {
    const { DataState, UIState } = this.props;
    // console.log(value)
    let plainOptions = [];
    let { pagination, pageSize, dataSource } = this.state;
    let defaultPageSize = pageSize;
    if (dataSource.length < value * defaultPageSize) {
      pageSize = dataSource.length - (value - 1) * defaultPageSize;
    }
    for (let index = 0; index < pageSize; index++) {
      plainOptions.push(index + defaultPageSize * (value - 1));
    }
    // console.log(plainOptions, pageSize, dataSource)

    this.setState({
      pagination: value,
      checkAll: false,
      checkedList: [],
      plainOptions: plainOptions
    });
  };

  // 页数改变
  onPagiSizeChange = (current, size) => {
    // console.log(current,size)
    const { dispatch, DataState } = this.props;

    let plainOptions = [];
    let { pagination, pageSize, dataSource } = this.state;
    let defaultPageSize = size;
    if (dataSource.length <  defaultPageSize) {
      pageSize = dataSource.length ;
    }
    for (let index = 0; index < pageSize; index++) {
      plainOptions.push(index );
    }

    this.setState({
      pagination: 1,
      pageSize:size,
      checkAll: false,
      checkedList: [],
      plainOptions: plainOptions
    });
  };
  render() {
    const { DataState, UIState } = this.props;

    return (
      <div id="Dynamic">
        <div className="log-box">
          <div className="log-top">
            <span className="top-tips">
              <span className="tips tip-menu">{"教学班更新动态"}</span>
            </span>
            <Router>
              <Link to="/Log/Record" className="top-to">
                查看历史记录>>
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
            <div style={{ minHeight: 640 + "px" }} className="content-dataShow">
              <CheckBoxGroup
                style={{ width: "100%" }}
                value={this.state.checkedList}
                onChange={this.onCheckBoxGroupChange.bind(this)}
              >
                {DataState.GetCourseClassDynamicMsg.tableSource instanceof
                  Array &&
                DataState.GetCourseClassDynamicMsg.tableSource.length !== 0 ? (
                  <Table
                    className="table"
                    columns={this.state.columns}
                    dataSource={
                      DataState.GetCourseClassDynamicMsg.tableSource
                        ? DataState.GetCourseClassDynamicMsg.tableSource
                        : []
                    }
                    bordered
                    pagination={{
                      hideOnSinglepage: true,
                      pageSize: this.state.pageSize,
                      current: this.state.pagination,
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
                        ? "暂无符合条件的更新动态"
                        : "暂无更新动态"
                    }
                    type="3"
                    style={{ marginTop: "150px" }}
                  ></Empty>
                )}
              </CheckBoxGroup>
              {DataState.GetCourseClassDynamicMsg.tableSource instanceof
                Array &&
              DataState.GetCourseClassDynamicMsg.tableSource.length ? (
                <CheckBox
                  className="checkAll-box"
                  type="gray"
                  onChange={this.OnCheckAllChange}
                  checked={this.state.checkAll}
                >
                  <span className="checkAll-title">全选</span>
                  <Button
                    onClick={this.onSelectAllClick}
                    className="selectAll"
                    color="blue"
                  >
                    标记为已读
                  </Button>
                </CheckBox>
              ) : (
                ""
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
export default connect(mapStateToProps)(Dynamic);
