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
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { Tooltip } from "antd";
import CONFIG from "../../../common/js/config";
import { postData, getData } from "../../../common/js/fetch";
import history from "../containers/history";
import IconLocation from "../../images/icon-location.png";
import actions from "../actions";
import "../../scss/LogDynamic.scss";
import Public from "../../../common/js/public";
import TipsLog from "./TipsLog";

class LogDynamic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          dataIndex: "key",
          render: (key) => {
            // //console.log(key)
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  onClick={this.LogSignReaded.bind(this, key)}
                  className="handle-btn"
                >
                  标记已读
                </Button>
              </div>
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
      pageSize: 10,
      UserTypeList: { 1: "teacher", 2: "student", 7: "leader" },
    };
  }

  componentWillReceiveProps(nextProps) {
    const { DataState } = nextProps;
    this.setState({
      pagination: DataState.LogPreview.unreadLog.PageIndex + 1,
    });
  }
  FileTypeDropMenu = (e) => {
    const { DataState, dispatch } = this.props;

    dispatch(
      actions.UpDataState.getUnreadLogPreview(
        "/GetUnreadLogToPage?OperationType=" +
          this.state.HandleTypeSelect.value +
          "&UserType=" +
          e.value +
          "&PageIndex=0" +
          // (this.state.pagination - 1) +
          "&pageSize=" +
          this.state.pageSize +
          "&OnlineUserID=" +
          this.state.userMsg.UserID +
          this.state.SortType
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
      actions.UpDataState.getUnreadLogPreview(
        "/GetUnreadLogToPage?OperationType=" +
          e.value +
          "&UserType=" +
          this.state.FileTypeSelect.value +
          "&PageIndex=0" +
          // (this.state.pagination - 1) +
          "&pageSize=" +
          this.state.pageSize +
          "&OnlineUserID=" +
          this.state.userMsg.UserID +
          this.state.SortType
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
    let total = DataState.LogPreview.unreadLog.Total;
    let url = "/LogSignAllReaded";
    if (!total) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "档案暂无变更记录",
          ok: this.onAlertWarnOk.bind(this),
          cancel: this.onAlertWarnClose.bind(this),
          close: this.onAlertWarnClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
      return;
    }
    postData(CONFIG.XTestProxy + url, {}, 2)
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
            actions.UpDataState.getUnreadLogPreview(
              "/GetUnreadLogToPage?OperationType=" +
                this.state.HandleTypeSelect.value +
                "&UserType=" +
                this.state.FileTypeSelect.value +
                "&PageIndex=0&pageSize=" +
                this.state.pageSize +
                "&OnlineUserID=" +
                this.state.userMsg.UserID
            )
          );
          this.setState({
            checkedList: [],
            checkAll: false,
            pagination: 1,
            FileTypeSelect: { value: -1, title: "全部" },
            HandleTypeSelect: { value: -1, title: "全部" },
          });
        }
      });
  };
  // 档案动态标记已读
  LogSignReaded = (key) => {
    // //console.log(key)
    const { DataState, dispatch } = this.props;
    let userInfo = DataState.LogPreview.unreadLog.List.newList[key];
    let url = "/LogSignReaded";
    let LogIDs =
      userInfo.Logs instanceof Array &&
      userInfo.Logs.map((child, index) => {
        return child.LogID;
      }).join();

    postData(
      CONFIG.XTestProxy + url,
      {
        LogIDs: LogIDs,
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
            actions.UpDataState.getUnreadLogPreview(
              "/GetUnreadLogToPage?OperationType=" +
                this.state.HandleTypeSelect.value +
                "&UserType=" +
                this.state.FileTypeSelect.value +
                "&PageIndex=" +
                (this.state.pagination - 1) +
                "&pageSize=" +
                this.state.pageSize +
                "&OnlineUserID=" +
                this.state.userMsg.UserID
            )
          );
          this.setState({
            checkedList: [],
            checkAll: false,
            // pagination: 1
          });
        }
      });
  };
  // 显示用户详情
  onUserNameClick = (key) => {
    const { DataState, dispatch } = this.props;
    let userInfo = DataState.LogPreview.unreadLog.List.newList[key];
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
            userInfo.UserName.UserID +
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
        checkedList: this.props.DataState.LogPreview.unreadLog.List.keyList,
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
        DataState.LogPreview.unreadLog.List.keyList.length
          ? true
          : false,
    });
  };
  // 点击标记全部
  onReadAllClick = () => {
    const { dispatch } = this.props;
    //console.log(this.state.checkedList)
    if (this.state.checkedList.length === 0) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "请先勾选档案",
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
          title: "确定标记所勾选的档案吗？",
          ok: this.onAlertQueryOk.bind(this),
          cancel: this.onAlertQueryClose.bind(this),
          close: this.onAlertQueryClose.bind(this),
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
    let dataList = DataState.LogPreview.unreadLog.List.newList;
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
      CONFIG.XTestProxy + url,
      {
        LogIDs: LogIDListString,
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
          dispatch(actions.UpUIState.hideErrorAlert());
          dispatch(
            actions.UpDataState.getUnreadLogPreview(
              "/GetUnreadLogToPage?OperationType=" +
                this.state.HandleTypeSelect.value +
                "&UserType=" +
                this.state.FileTypeSelect.value +
                "&PageIndex=" +
                (this.state.pagination - 1) +
                "&pageSize=" +
                this.state.pageSize +
                "&OnlineUserID=" +
                this.state.userMsg.UserID
            )
          );
          this.setState({
            checkedList: [],
            checkAll: false,
            // pagination: 1
          });
        }
      });
  };
  //监听table的change进行排序操作
  onTableChange = (page, filters, sorter) => {
    const { DataState, dispatch } = this.props;
    // //console.log(sorter)
    if (sorter && sorter.columnKey === "UserName") {
      let sortType =
        sorter.order === "descend"
          ? "&SortType=DESC"
          : sorter.order === "ascend"
          ? "&SortType=ASC"
          : "";
      dispatch(
        actions.UpDataState.getUnreadLogPreview(
          "/GetUnreadLogToPage?OperationType=" +
            this.state.HandleTypeSelect.value +
            "&UserType=" +
            this.state.FileTypeSelect.value +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&pageSize=" +
            this.state.pageSize +
            "&OnlineUserID=" +
            this.state.userMsg.UserID +
            sortType
        )
      );
      this.setState({
        checkedList: [],
        checkAll: false,
        SortType: sortType,
      });
    } else if (sorter && !sorter.columnKey) {
      dispatch(
        actions.UpDataState.getUnreadLogPreview(
          "/GetUnreadLogToPage?OperationType=" +
            this.state.HandleTypeSelect.value +
            "&UserType=" +
            this.state.FileTypeSelect.value +
            "&PageIndex=" +
            (this.state.pagination - 1) +
            "&pageSize=" +
            this.state.pageSize +
            "&OnlineUserID=" +
            this.state.userMsg.UserID
        )
      );
      this.setState({
        checkedList: [],
        checkAll: false,
        SortType: "",
      });
    }
  };
  // 分页
  onPagiNationChange = (value) => {
    const { DataState, dispatch } = this.props;

    dispatch(
      actions.UpDataState.getUnreadLogPreview(
        "/GetUnreadLogToPage?OperationType=" +
          this.state.HandleTypeSelect.value +
          "&UserType=" +
          this.state.FileTypeSelect.value +
          "&PageIndex=" +
          (value - 1) +
          "&pageSize=" +
          this.state.pageSize +
          "&OnlineUserID=" +
          this.state.userMsg.UserID +
          this.state.SortType
      )
    );
    this.setState({
      checkedList: [],
      checkAll: false,
      pagination: value,
    });
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
      actions.UpDataState.getUnreadLogPreview(
        "/GetUnreadLogToPage?OperationType=" +
          this.state.HandleTypeSelect.value +
          "&UserType=" +
          this.state.FileTypeSelect.value +
          "&PageIndex=" +
          0 +
          "&pageSize=" +
          pageSize +
          "&OnlineUserID=" +
          this.state.userMsg.UserID +
          this.state.SortType
      )
    );
  };
  render() {
    const { DataState, UIState } = this.props;
    let data = DataState.LogPreview.unreadLog;
    return (
      <div id="LogDynamic" className="LogDynamic">
        <div className="Graduate-box">
          <div className="Graduate-top">
            <span className="top-tips">
              <span className="tips menu-location ">最近档案动态</span>
            </span>
            <Link
              to="/UserArchives/LogRecord"
              target="_blank"
              className="link-record"
            >
              查看全部变更记录
            </Link>
          </div>
          <div className="Graduate-hr"></div>
          <div className="Graduate-content">
            <div className="content-top">
              <p className="top-tips">
                最近有
                <span className="Total">{data.TotalUser}</span>
                份用户档案发生变更，其中录入
                <span className="Add">{data.Add}</span>
                份，更新
                <span className="Edit">{data.Edit}</span>
                份，删除
                <span className="Delete">{data.Delete}</span>份
              </p>
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
                  title="操作类型："
                  width={120}
                  height={96}
                  dropSelectd={this.state.HandleTypeSelect}
                  dropList={this.state.HandleTypeList}
                  onChange={this.HandleTypeDropMenu}
                ></DropDown>
                <span
                  onClick={this.LogSignAllReaded.bind(this)}
                  className="LogSignAllReaded"
                >
                  全部标记已读
                </span>
              </div>
            </div>
            <div className="content-render">
              <Loading
                tip="加载中..."
                opacity={false}
                size="large"
                spinning={UIState.AppLoading.TableLoading}
              >
                <CheckBoxGroup
                  style={{ width: "100%" }}
                  value={this.state.checkedList}
                  onChange={this.onCheckBoxGroupChange.bind(this)}
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
                        this.state.HandleTypeSelect.value !== 0
                          ? "暂无符合条件的用户档案"
                          : "暂无用户档案"
                      }
                      type="3"
                      style={{ marginTop: "80px" }}
                    ></Empty>
                  )}
                </CheckBoxGroup>
                {data.Total > 0 ? (
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
                      onClick={this.onReadAllClick}
                      className="deleteAll"
                      color="blue"
                    >
                      全部标记已读
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
        {!DataState.UserMsg.isNull ? (
          <DetailsModal
            ref="UserDetailsMsgModal"
            visible={UIState.AppModal.userInfoModalVisible}
            module={1}
            onOk={this.UserDetailsMsgModalOk}
            onCancel={this.UserDetailsMsgModalCancel}
            data={DataState.UserMsg}
            type={this.state.UserTypeList[this.state.UserType || 1]}
          ></DetailsModal>
        ) : (
          ""
        )}
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
export default connect(mapStateToProps)(LogDynamic);
