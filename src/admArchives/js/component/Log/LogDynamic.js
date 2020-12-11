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
import { Icon, Table, Tooltip } from "antd";
import history from "../../containers/history";
import { postData, getData } from "../../../../common/js/fetch";
import CONFIG from "../../../../common/js/config";
import actions from "../../actions";

import TipsLog from "./TipsLog";
// import "../../scss/Main.scss";
import $ from "jquery";
const { MainAction, CommonAction, PublicAction } = actions;
let { checkUrlAndPostMsg } = Public;

class LogDynamic extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      columns: [
        {
          title: "",
          key: "OrderNo",
          width: 68,
          align: "left",
          render: (data) => {
            let { LogIDs } = data;
            // console.log(data.LogIDs,LogIDs)
            return (
              <div className="registerTime-content">
                <label style={{ whiteSpace: "nowrap" }}>
                  <CheckBox value={data.key}></CheckBox>
                  <span className="key-content">{data.OrderNo}</span>
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
          width: 92,
          key: "UserName",
          // dataIndex: "UserName",
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
          width: 120,
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
          title: "操作次数",
          width: 120,
          align: "center",
          key: "OperationCount",
          dataIndex: "OperationCount",
          render: (OperationCount) => {
            return (
              <span title={OperationCount} className="OperationCount">
                {OperationCount ? OperationCount : "--"}
              </span>
            );
          },
        },
        {
          title: "操作内容",
          width: 410,
          align: "left",
          key: "Logs",
          dataIndex: "Logs",
          render: (Logs) => {
            if (!Logs[0]) {
              return;
            }
            return (
              <div className="Logs-box">
                <span className="Logs-tips" title={Logs[0].Content}>
                  {Logs[0].Content ? Logs[0].Content : "--"}
                </span>
                <Tooltip
                  placement="top"
                  trigger="click"
                  overlayClassName="LogsMore"
                  arrowPointAtCenter={true}
                  title={<TipsLog data={Logs}></TipsLog>}
                >
                  <span
                    className="Logs-more"
                    style={{
                      display: Logs.length > 1 ? "inline-block" : "none",
                    }}
                  >
                    查看更多
                  </span>
                </Tooltip>
              </div>
            );
          },
        },
        {
          title: "操作",
          align: "center",
          width: 120,
          key: "handle",
          // dataIndex: "key",
          render: (data) => {
            // //console.log(key)
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  onClick={this.LogSignReaded.bind(this, data)}
                  className="handle-btn-1"
                >
                  标记已读
                </Button>
              </div>
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
          dispatch(MainAction.GetUnreadLogToPage({}));
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
    dispatch(MainAction.GetUnreadLogToPage({}));
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
    dispatch(MainAction.GetUnreadLogToPage({}));
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
    dispatch(MainAction.GetUnreadLogToPage({}));
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
        // sortFiled: sorter.columnKey,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetUnreadLogToPage({}));
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
    dispatch(MainAction.GetUnreadLogToPage({}));
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
    dispatch(MainAction.GetUnreadLogToPage({}));
  };
  onCheckBoxGroupChange = (checkedList) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          LogParams: { searchValue },
        },
        MainData: {
          LogDynamicData: { List },
        },
      },
    } = this.props;

    dispatch(
      CommonAction.SetLogParams({
        checkedList,
        checkAll: List.length === checkedList.length ? true : false,
      })
    );
  };
  onCheckAllChange = (e) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          LogParams: { searchValue },
        },
        MainData: {
          LogDynamicData: { List },
        },
      },
    } = this.props;

    let checkAll = e.target.checked;
    let keyList = List.map((child) => child.key);
    dispatch(
      CommonAction.SetLogParams({
        checkedList: checkAll ? keyList : [],
        checkAll,
      })
    );
  };
  onReadAllClick = () => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          LogParams: { checkedList },
        },
      },
    } = this.props;
    if (checkedList instanceof Array && checkedList.length === 0) {
      dispatch(
        PublicAction.showErrorAlert({
          type: "warn",
          title: "请先勾选所要标记已读的档案",
        })
      );
    } else {
      dispatch(
        PublicAction.showErrorAlert({
          type: "btn-query",
          title: "确定标记所勾选的档案吗？",
          onOk: () => {
            dispatch(
              MainAction.LogSignReaded({
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
                  dispatch(MainAction.GetUnreadLogToPage({}));
                },
              })
            );
          },
        })
      );
    }
  };
  LogSignAllReaded = () => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          LogParams: { checkedList },
        },
      },
    } = this.props;
    dispatch(
      PublicAction.showErrorAlert({
        type: "btn-query",
        title: "确定全部标记已读吗？",
        onOk: () => {
          dispatch(
            MainAction.LogSignAllReaded({
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
                dispatch(MainAction.GetUnreadLogToPage({}));
              },
            })
          );
        },
      })
    );
  };
  render() {
    let {
      DataState: {
        MainData: {
          StudentTree: { CollegeList, MajorList, GradeList, ClassList },
          LogDynamicData: {
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
      <div id="LogDynamic" className="Content">
        <div className="LogDynamic-box">
          <div className="Content-top">
            <span className="top-tips">
              <span className="tips menu39 ">最近档案动态</span>
            </span>
            <div className="top-nav">
              <a className="link">
                <span
                  onClick={this.onLinkClick.bind(
                    this,
                    "查看全部变更记录",
                    "#/UserArchives/LogRecord"
                  )}
                  className="record"
                >
                  查看全部变更记录
                </span>
              </a>
            </div>
          </div>
          <div className="Content-hr"></div>
          <div className="Content-handle clearfix">
            <p className="top-tips">
              最近有
              <span className="Total">{TotalUser}</span>
              份用户档案发生变更，其中录入
              <span className="Add">{Add}</span>
              份，更新
              <span className="Edit">{Edit}</span>
              份，删除
              <span className="Delete">{Delete}</span>份
            </p>
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
            <span
              onClick={this.LogSignAllReaded.bind(this)}
              className="LogSignAllReaded"
            >
              全部标记已读
            </span>
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
                  <CheckBoxGroup
                    style={{ width: "100%" }}
                    value={checkedList}
                    onChange={this.onCheckBoxGroupChange}
                  >
                    <Table
                      className="table"
                      // loading={TableLoading}
                      columns={this.state.columns}
                      pagination={false}
                      onChange={this.onTableChange}
                      dataSource={List}
                    ></Table>
                  </CheckBoxGroup>

                  <div style={{ display: "inline-block" }}>
                    <CheckBox
                      className="checkAll-box"
                      // type="gray"
                      onChange={this.onCheckAllChange}
                      checked={checkAll}
                    >
                      <span className="checkAll-title">全选</span>
                    </CheckBox>
                    <Button
                      onClick={this.onReadAllClick}
                      className="ReadAll"
                      color="blue"
                    >
                      全部标记已读
                    </Button>
                  </div>
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
export default connect(mapStateToProps)(LogDynamic);
