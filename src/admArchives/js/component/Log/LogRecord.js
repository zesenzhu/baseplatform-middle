import React, { Component } from "react";
import {
  Loading,
  Empty,
  DropDown,
  CheckBox,
  CheckBoxGroup,
  PagiNation,
  Modal,
  Button,
  Search,
} from "../../../../common";
import Public from "../../../../common/js/public";

import { connect } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import moment from "moment";
import locale from "antd/es/date-picker/locale/zh_CN";

import { Icon, Table, Tooltip, DatePicker } from "antd";
import history from "../../containers/history";
import { postData, getData } from "../../../../common/js/fetch";
import CONFIG from "../../../../common/js/config";
import actions from "../../actions";

import TipsLog from "./TipsLog";
// import "../../scss/Main.scss";
import $ from "jquery";
const { MainAction, CommonAction, PublicAction } = actions;
let { checkUrlAndPostMsg } = Public;

class LogRecord extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
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
          // dataIndex: "UserName",
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
                  onClick={this.onUserNameClick.bind(this, arr)}
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
          sorter: true,
          render: (arr) => {
            return (
              <div className="name-content">
                <span
                  title={arr.UserName}
                  className="name-UserName"
                  onClick={this.onUserNameClick.bind(this, arr)}
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
          key: "OperationDetail",
          dataIndex: "OperationDetail",
          render: (OperationDetail) => {
            return OperationDetail ? (
              <Tooltip
                placement="top"
                trigger="click"
                overlayClassName="LogsMore"
                arrowPointAtCenter={true}
                title={
                  <TipsLog data={[{ Content: OperationDetail }]}></TipsLog>
                }
              >
                <span className="OperatorDetail">{">>"}</span>
              </Tooltip>
            ) : (
              <span className="OperatorDetail-null">--</span>
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
      UserTypeList: { 1: "teacher", 2: "student", 7: "leader" },
    };
  }
  componentWillReceiveProps(nextProps) {
    const { DataState } = nextProps;
  }
  componentDidMount() {}
  onLinkClick = (btnName, route) => {
    let url = window.location.href.split(window.location.hash).join(route);

    // console.log(url);
    checkUrlAndPostMsg({ btnName, url });
  };
  // 档案动态标记已读
  LogSignReaded = (data) => {
    // //console.log(key)
    const { DataState, dispatch } = this.props;
    dispatch(
      MainAction.LogSignReaded({
        LogIDs: data.LogIDs,
        fn: () => {
          dispatch(
            PublicAction.showErrorAlert({
              type: "success",
              title: "标记成功",
            })
          );
          dispatch(
            CommonAction.SetLogParams({
              checkedList: [],
              checkAll: false,
            })
          );
          dispatch(MainAction.GetAllLogToPage({}));
        },
      })
    );
  };
  // 显示用户详情
  onUserNameClick = (data) => {
    const {
      DataState,
      dispatch,
      PublicState: {
        LoginMsg: { identify },
      },
    } = this.props;
    let userInfo = data;
    this.setState({
      UserType: userInfo.UserType,
    });
    if (!userInfo.Deleted) {
      if (userInfo.UserType === 1 || userInfo.UserType === 2) {
        //学生教师调到个人画像
        let token = sessionStorage.getItem("token");
        window.open(
          "/html/userPersona/index.html?userType=" +
            userInfo.UserType +
            "&userID=" +
            userInfo.UserID +
            "&lg_tk=" +
            token +
            (identify && identify instanceof Array && identify.length > 0
              ? "&lg_ic=" + identify[0].IdentityCode
              : "")
        );
      } else {
        dispatch(MainAction.GetUserDetail({ UserID: userInfo.UserID }));
        dispatch(
          CommonAction.SetUserArchivesParams({
            DetailsType: this.state.UserTypeList[userInfo.UserType],
          })
        );
        dispatch(
          CommonAction.SetModalVisible({
            DetailsModalVisible: true,
          })
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
        PublicAction.showErrorAlert({
          type: "error",
          title: "该用户已删除",
        })
      );
    }
  };
  //学院选择
  onCollegeSelect = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetLogParams({
        CollegeID: e.value,
        CollegeName: e.title,

        PageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetAllLogToPage({}));
  };
  //用户类型选择
  onUserTypeChange = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetLogParams({
        UserType: e.value,
        UserTypeName: e.title,

        PageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetAllLogToPage({}));
  };
  //操作类型选择
  onOperationTypeChange = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetLogParams({
        OperationType: e.value,
        OperationTypeName: e.title,

        PageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetAllLogToPage({}));
  };
  onTableChange = (page, filters, sorter) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          LogParams: { searchValue },
        },
      },
    } = this.props;
    let Order = "";
    if (sorter.order === "descend") {
      Order = "DESC";
    } else if (sorter.order === "ascend") {
      Order = "ASC";
    }
    dispatch(
      CommonAction.SetLogParams({
        SortType: Order,
        SortFiled: sorter.columnKey,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetAllLogToPage({}));
  };
  onShowSizeChange = (current, PageSize) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          LogParams: { searchValue },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetLogParams({
        PageIndex: 0,
        PageSize,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetAllLogToPage({}));
  };
  onPagiNationChange = (e) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          LogParams: { searchValue },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetLogParams({
        PageIndex: e - 1,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetAllLogToPage({}));
  };

  //操作时间
  disabledStartDate = (current) => {
    const { endMomentTime } = this.state;
    let {
      DataState: {
        CommonData: {
          LogParams: { EndTime },
        },
      },
    } = this.props;
    let End = moment(EndTime);
    if (!current || !EndTime) {
      return current && current > moment().endOf("day");
    }
    return (
      current &&
      (current.valueOf() > End.valueOf() || current > moment().endOf("day"))
    );
  };
  disabledEndDate = (current) => {
    let {
      DataState: {
        CommonData: {
          LogParams: { BeginTime },
        },
      },
    } = this.props;
    let Begin = moment(BeginTime);
    if (!BeginTime || !current) {
      return current && current > moment().endOf("day");
    }

    return (
      current &&
      (current.valueOf() < Begin.valueOf() || current > moment().endOf("day"))
    );
  };
  //操作时间事件
  onStartTimeSelectOk = (Moment, time) => {
    // //console.log(time,Moment)
    const { DataState, dispatch } = this.props;
    ////console.log(time.valueOf())
    dispatch(MainAction.GetAllLogToPage({}));
  };
  onStartTimeSelectChange = (Moment, time) => {
    const { DataState, dispatch } = this.props;
    dispatch(
      CommonAction.SetLogParams({
        PageIndex: 0,
        checkedList: [],
        BeginTime: Moment.format("YYYY-MM-DD HH:mm"),
        checkAll: false,
      })
    );
  };
  onEndTimeSelectOk = (Moment, time) => {
    const { DataState, dispatch } = this.props;
    // //console.log(time)
    dispatch(MainAction.GetAllLogToPage({}));
  };
  onEndTimeSelectChange = (Moment, time) => {
    const { DataState, dispatch } = this.props;

    // console.log(Moment, time)
    dispatch(
      CommonAction.SetLogParams({
        PageIndex: 0,
        checkedList: [],
        EndTime: Moment.format("YYYY-MM-DD HH:mm"),
        checkAll: false,
      })
    );
  };

  render() {
    let {
      DataState: {
        MainData: {
          StudentTree: { CollegeList, MajorList, GradeList, ClassList },
          LogRecordData: {
            TotalUser,
            Add,
            Edit,
            Delete,
            Total,
            PageIndex,
            List,
          },
          StudentRegisterData,
        },
        CommonData: {
          RolePower: { LockerVersion_1, IsCollege, NoLeader },
          LogParams: {
            CollegeID,
            CollegeName,
            UserType, //-1：全部,1 ：教师,2 ：学生,7 ：学校领导,10 ：学院领导
            UserTypeName,
            OperationType, //-1：全部,1 ：录入,2 ：删除,7 ：更新
            OperationTypeName,
            PageSize,
            // PageIndex ,
            SortType,
            checkAll,
            checkedList,
            EndTime,
            BeginTime,
          },
          UserTypeList,
          OperationTypeList,
        },
      },
      PublicState: {
        Loading: { TableLoading },
      },
    } = this.props;
    if (NoLeader) {
      let List = UserTypeList;
      UserTypeList = [];
      List.forEach((child) => {
        if (child.value !== 7) {
          UserTypeList.push(child);
        }
      });
    }
    let College = [{ value: "", title: "全部学院" }].concat(CollegeList);

    return (
      <div id="LogRecord" className="Content">
        <div className="LogRecord-box">
          <div className="Content-top">
            <span className="top-tips">
              <span className="tips menu39 ">档案变更记录</span>
            </span>
          </div>
          <div className="Content-hr"></div>
          <div className="Content-handle clearfix">
            {/* {!IsCollege ? (
              <DropDown
                ref="dropMenuFirst"
                onChange={this.onCollegeSelect}
                width={120}
                disabled={IsCollege}
                title={"学院:"}
                height={240}
                dropSelectd={{
                  value: CollegeID,
                  title: CollegeID !== "" ? CollegeName : "全部学院",
                }}
                dropList={College}
              ></DropDown>
            ) : (
              ""
            )} */}
            <DropDown
              ref="dropMenuSecond"
              width={120}
              height={240}
              title={"档案类型:"}
              dropSelectd={{
                value: UserType,
                title: UserTypeName,
              }}
              dropList={UserTypeList}
              onChange={this.onUserTypeChange}
            ></DropDown>
            <DropDown
              ref="dropMenuThird"
              width={120}
              height={240}
              // style={{ marginLeft: "50px" }}
              title={"操作类型:"}
              dropSelectd={{
                value: OperationType,
                title: OperationTypeName,
              }}
              dropList={OperationTypeList}
              onChange={this.onOperationTypeChange}
            ></DropDown>
            <div className="handleTimeSelect">
              <span className="time-tips">操作时间：</span>
              <DatePicker
                locale={locale}
                showTime={{ format: "HH:mm" }}
                value={BeginTime ? moment(BeginTime) : null}
                placeholder="请选择开始时间"
                onOk={this.onStartTimeSelectOk.bind(this)}
                onChange={this.onStartTimeSelectChange.bind(this)}
                disabledDate={this.disabledStartDate}
                format={"YYYY-MM-DD HH:mm"}
                // onOpenChange={this.handlestartOpenChange}
              />
              <span className="time-to">至</span>
              <DatePicker
                locale={locale}
                showTime={{ format: "HH:mm" }}
                value={EndTime ? moment(EndTime) : null}
                placeholder="请选择结束时间"
                onOk={this.onEndTimeSelectOk.bind(this)}
                onChange={this.onEndTimeSelectChange.bind(this)}
                disabledDate={this.disabledEndDate}
                format={"YYYY-MM-DD HH:mm"}
                // open={this.state.endOpen}
                // onOpenChange={this.handleEndOpenChange}
              />
              {/* <Button onClick={this.onCheckClick} className='check-btn' color='blue'>查询</Button> */}
            </div>
          </div>
          <div className="Content-table">
            <Loading
              // tip="加载中..."
              opacity={0.5}
              size="small"
              spinning={TableLoading}
            >
              {List instanceof Array && List.length !== 0 ? (
                <>
                  <Table
                    className="table"
                    // loading={TableLoading}
                    columns={this.state.columns}
                    pagination={false}
                    onChange={this.onTableChange}
                    dataSource={List}
                  ></Table>

                  <div className="pagination-box">
                    <PagiNation
                      showQuickJumper
                      showSizeChanger
                      onShowSizeChange={this.onShowSizeChange}
                      pageSize={PageSize}
                      current={PageIndex + 1}
                      hideOnSinglePage={Total === 0 ? true : false}
                      total={Total}
                      onChange={this.onPagiNationChange}
                    ></PagiNation>
                  </div>
                </>
              ) : (
                <Empty
                  title={
                    CollegeID !== "" || UserType !== -1 || OperationType !== -1
                      ? "暂无符合条件的档案动态"
                      : "暂无档案动态"
                  }
                  type="3"
                  style={{ marginTop: "150px" }}
                ></Empty>
              )}
            </Loading>
          </div>
        </div>
      </div>
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
export default connect(mapStateToProps)(LogRecord);
