import React from "react";
import "../../scss/Leader.scss";
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
// import { a } from "react-router-dom";
import CONFIG from "../../../common/js/config";
import { postData, getData } from "../../../common/js/fetch";
import history from "../containers/history";
import EditModal from "./EditModal";
import { Scrollbars } from "react-custom-scrollbars";

import Public from "../../../common/js/public";
import IconLocation from "../../images/icon-location.png";
import StudentChangeRecord from "./StudentChangeRecord";
import actions from "../actions";
let { checkUrlAndPostMsg } = Public;
class Leader extends React.Component {
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
                  {" "}
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
          title: "??????",
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
          title: "??????",
          align: "center",
          width: 140,
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
          title: "??????",
          align: "center",
          width: 120,
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
          title: "????????????",
          align: "center",
          width: 120,
          key: "Position",
          dataIndex: "Position",
          render: (Position) => {
            return (
              <span title={Position} className="Position">
                {Position ? Position : "--"}
              </span>
            );
          },
        },
        {
          title: "??????",
          align: "center",
          key: "handle",
          width: 272,
          dataIndex: "key",
          render: (key) => {
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  type="default"
                  onClick={this.LeaderEdit.bind(this, key)}
                  className="handle-btn"
                >
                  ??????
                </Button>
                <Button
                  color="blue"
                  type="default"
                  onClick={this.LeaderChange.bind(this, key)}
                  className="check-btn"
                >
                  ??????????????????
                </Button>
              </div>
            );
          },
        },
      ],
      checkedList: [],
      checkAll: false,
      userMsg: props.DataState.LoginUser,
      LeaderDetailsMsgModalVisible: false,
      sortType: "",
      sortFiled: "",
      leaderChangeUserLog: {},
    };
    window.LeaderCancelSearch = this.LeaderCancelSearch.bind(this);
  }
  LeaderCancelSearch = () => {
    this.setState({
      checkAll: false,
      checkedList: [],
      // pagination: 1
    });
  };
  // ????????????
  OnCheckAllChange = (e) => {
    // console.log(e)
    if (e.target.checked) {
      this.setState({
        checkedList: this.props.DataState.SchoolLeaderPreview.keyList,
        checkAll: e.target.checked,
      });
    } else {
      this.setState({
        checkedList: [],
        checkAll: e.target.checked,
      });
    }
  };
  // ???????????????
  onCheckBoxGroupChange = (checkedList) => {
    const { DataState } = this.props;
    // console.log(checkedList)
    this.setState({
      checkedList,
      checkAll:
        checkedList.length === DataState.SchoolLeaderPreview.keyList.length
          ? true
          : false,
    });
  };
  // ??????????????????
  onDeleteAllClick = () => {
    const { dispatch } = this.props;
    // console.log(this.state.checkedList)
    if (this.state.checkedList.length === 0) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "??????????????????",
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
          title: "????????????????????????????????????",
          ok: this.onAlertQueryOk.bind(this),
          cancel: this.onAlertQueryClose.bind(this),
          close: this.onAlertQueryClose.bind(this),
        })
      );
    }
  };
  // ??????????????????
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
  //????????????
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
  // ????????????
  onAlertQueryOk = () => {
    const { dispatch, DataState } = this.props;
    let url = "/DeleteSchoolLeader";
    let checkList = this.state.checkedList;
    let dataList = DataState.SchoolLeaderPreview.newList;
    let UserIDList = checkList.map((child, index) => {
      return dataList[child].UserID;
    });
    let UserIDListString = UserIDList.join();

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
          this.setState({
            checkedList: [],
            checkAll: false,
          });
          dispatch(actions.UpUIState.hideErrorAlert());
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "????????????",
              onHide: this.onAlertWarnHide.bind(this),
            })
          );
          dispatch(
            actions.UpDataState.getSchoolLeaderPreview(
              "/GetSchoolLeader?SchoolID=" +
                this.state.userMsg.SchoolID +
                this.state.sortFiled +
                this.state.sortType
            )
          );
          this.setState({
            checkedList: [],
            checkAll: false,
          });
        }
      });
  };

  // tableCulomn??????
  onUserNameClick = (key) => {
    const { DataState } = this.props;
    this.setState({
      LeaderDetailsMsgModalVisible: true,
      detailData: DataState.SchoolLeaderPreview.pensonalList[key],
    });
  };
  // ????????????
  LeaderChange = (key) => {
    // console.log(key)
    const { dispatch, DataState } = this.props;

    let innerID = DataState.SchoolLeaderPreview.newList[key].Others.InnerID;
    let url = "/GetUserLog?innerID=" + innerID;
    // console.log(innerID)
    dispatch(actions.UpDataState.getUserLog(url, "leader"));
    this.setState({
      leaderChangeUserLog: DataState.SchoolLeaderPreview.newList[key].Others,
    });
  };
  // ????????????
  LeaderEdit = (key) => {
    // console.log(key)
    const { dispatch } = this.props;
    this.setState({
      userKey: key,
    });
    dispatch(actions.UpUIState.HandleLeaderModalOpen());
  };
  //??????table???change??????????????????
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
      dispatch(
        actions.UpDataState.getSchoolLeaderPreview(
          "/GetSchoolLeader?SchoolID=" +
            this.state.userMsg.SchoolID +
            "&sortFiled=" +
            sorter.columnKey +
            " &" +
            sortType
        )
      );
      this.setState({
        checkedList: [],
        checkAll: false,
        sortType: "&" + sortType,
        sortFiled: "&sortFiled=" + sorter.columnKey,
      });
    } else if (sorter && !sorter.columnKey) {
      dispatch(
        actions.UpDataState.getSchoolLeaderPreview(
          "/GetSchoolLeader?SchoolID=" + this.state.userMsg.SchoolID
        )
      );
      this.setState({
        checkedList: [],
        checkAll: false,
        sortType: "",
        sortFiled: "",
      });
    }
  };
  // ????????????????????????
  LeaderDetailsMsgModalOk = () => {
    this.setState({
      LeaderDetailsMsgModalVisible: false,
    });
  };
  LeaderDetailsMsgModalCancel = () => {
    this.setState({
      LeaderDetailsMsgModalVisible: false,
    });
  };

  // ????????????
  handleLeaderModalOk = (e) => {
    let url = "/EditSchoolLeader";

    const { DataState, dispatch, UIState } = this.props;
    const { initLeaderMsg, changeLeaderMsg } = DataState.SetLeaderMsg;
    let EditModalTipsVisible = UIState.EditModalTipsVisible;
    let picObj = DataState.GetPicUrl.picObj;

    for (let key in EditModalTipsVisible) {
      if (EditModalTipsVisible[key]) {
        return;
      }
    }
    // console.log(initLeaderMsg,changeLeaderMsg,Public.comparisonObject(changeLeaderMsg, initLeaderMsg))
    if (
      Public.comparisonObject(changeLeaderMsg, initLeaderMsg) &&
      !picObj.picUploader.isChanged()
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "??????????????????????????????",
          // ok: this.onAppAlertOK.bind(this),
          // cancel: this.onAppAlertCancel.bind(this),
          // close: this.onAppAlertClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
      return;
    } else {
      if (picObj.picUploader.uploadSubmit()) {
        let { position, ...data } = changeLeaderMsg;
        let PhotoEdit = 0;
        if (picObj.picUploader.isChanged()) {
          PhotoEdit = 1;
        }
        postData(
          CONFIG.UserInfoProxy + url,
          {
            ...data,
            position: position.title,
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
            //       title: json.Msg,
            //       ok: this.onAppAlertOK.bind(this),
            //       cancel: this.onAppAlertCancel.bind(this),
            //       close: this.onAppAlertClose.bind(this)
            //     })
            //   );
            // } else
            if (json.StatusCode === 200) {
              // console.log(json.Data)
              dispatch(
                actions.UpUIState.showErrorAlert({
                  type: "success",
                  title: "????????????",
                  onHide: this.onAlertWarnHide.bind(this),
                })
              );
              dispatch(actions.UpUIState.HandleLeaderModalClose());
              this.setState({
                checkedList: [],
                checkAll: false,
              });
              dispatch(
                actions.UpDataState.getSchoolLeaderPreview(
                  "/GetSchoolLeader?SchoolID=" +
                    this.state.userMsg.SchoolID +
                    this.state.sortFiled +
                    this.state.sortType
                )
              );
              dispatch(actions.UpUIState.editAlltModalTipsVisible());
            }
          });
      }
    }
  };
  handleLeaderModalCancel = (e) => {
    const { dispatch, DataState, UIState } = this.props;
    // console.log(e)
    dispatch(actions.UpUIState.editAlltModalTipsVisible());
    dispatch(actions.UpUIState.HandleLeaderModalClose());
  };

  // ????????????
  onAddLeader = (e) => {
    const { dispatch, DataState, UIState } = this.props;
    this.setState({
      userKey: "add",
    });
    dispatch(actions.UpUIState.AddLeaderModalOpen());
  };
  handleAddLeaderModalOk = (e) => {
    // console.log(e)
    let url = "/AddSchoolLeader";

    const { DataState, dispatch, UIState } = this.props;
    let picObj = DataState.GetPicUrl.picObj;
    const { initLeaderMsg, changeLeaderMsg } = DataState.SetLeaderMsg;
    let visible = UIState.EditModalTipsVisible;
    let haveMistake = false;
    for (let visi in visible) {
      if (visible[visi]) {
        return;
      }
    }
    //??????ID??????
    if (changeLeaderMsg.userID === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserIDTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //???????????????
    if (changeLeaderMsg.userName === "") {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          UserNameTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //????????????
    if (!changeLeaderMsg.gender) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          GenderTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    //????????????
    if (!changeLeaderMsg.position) {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          PositionTipsVisible: true,
        })
      );
      haveMistake = true;
    }
    // console.log(haveMistake)
    if (haveMistake) {
      return;
    }
    // console.log(visible,haveMistake)
    if (
      Public.comparisonObject(changeLeaderMsg, initLeaderMsg) &&
      !picObj.picUploader.isChanged()
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "?????????????????????",
          // ok: this.onAppAlertOK.bind(this),
          // cancel: this.onAppAlertCancel.bind(this),
          // close: this.onAppAlertClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this),
        })
      );
      return;
    } else {
      if (picObj.picUploader.uploadSubmit()) {
        let { position, ...data } = changeLeaderMsg;

        postData(
          CONFIG.UserInfoProxy + url,
          {
            ...changeLeaderMsg,
            photoPath: picObj.picUploader.getCurImgPath(),
            position: position.title,
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
              // console.log(json.Data)
              dispatch(
                actions.UpUIState.showErrorAlert({
                  type: "success",
                  title: "????????????",
                  onHide: this.onAlertWarnHide.bind(this),
                })
              );
              this.setState({
                studentModalVisible: false,
              });
              dispatch(actions.UpUIState.AddLeaderModalClose());
              this.setState({
                checkedList: [],
                checkAll: false,
              });

              dispatch(
                actions.UpDataState.getSchoolLeaderPreview(
                  "/GetSchoolLeader?SchoolID=" +
                    this.state.userMsg.SchoolID +
                    this.state.sortFiled +
                    this.state.sortType
                )
              );
              dispatch(actions.UpUIState.editAlltModalTipsVisible());
            }
          });
      }
    }
  };
  //??????
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    //console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  handleAddLeaderModalCancel = (e) => {
    const { dispatch } = this.props;
    // console.log(e)
    dispatch(actions.UpUIState.editAlltModalTipsVisible());

    dispatch(actions.UpUIState.AddLeaderModalClose());
  };

  LeaderChangeMadalOk = (e) => {
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.LEADER_CHANGE_MODAL_CLOSE });
  };
  LeaderChangeMadalCancel = (e) => {
    //  console.log(e)
    const { dispatch } = this.props;

    dispatch({ type: actions.UpUIState.LEADER_CHANGE_MODAL_CLOSE });
  };
  onLinkClick = (btnName, route) => {
    let url = window.location.href.split(window.location.hash).join(route);

    // console.log(url);
    checkUrlAndPostMsg({ btnName, url });
  };
    // ??????
    Export = () => {
      let {
        dispatch,
        DataState: {
          SchoolLeaderPreview: {
            Total 
          },
          
        },
      } = this.props;
      if (!Total) {
        dispatch(
          actions.UpUIState.showErrorAlert({
            type: "warn",
  
            title: "?????????????????????",
            ok: this.onAppAlertOK.bind(this),
            cancel: this.onAppAlertCancel.bind(this),
            close: this.onAppAlertClose.bind(this),
            onHide: this.onAlertWarnHide.bind(this),
          })
        );
         
        return;
      }
      let token = sessionStorage.getItem("token");
      let url =
        CONFIG.UserInfoProxy +
        "/ExportSchoolLeader?lg_tk=" +
        token;
  
      window.open(url);
    };
  render() {
    const { UIState, DataState } = this.props;

    return (
      <div className="Leader">
        <div className="Leader-box">
          <div className="Leader-top">
            <span className="top-tips">
              <span className="tips menu35 ">??????????????????</span>
            </span>
            <div className="top-nav">
              {/* <a className='link' to='/GraduteArchives' replace>?????????????????????</a>
                            <span className='divide'>|</span> */}
              <span
                className="link"
                style={{ cursor: "pointer" }}
                onClick={this.onAddLeader}
              >
                <span className="add">????????????</span>
              </span>
              <span className="divide">|</span>
              <a
                className="link"
                // target="_blank"
                // to="/ImportFile/Leader"
                // replace
                onClick={this.onLinkClick.bind(
                  this,
                  "????????????",
                  "#/ImportFile/Leader"
                )}
              >
                <span className="ImportFile">????????????</span>
              </a>
              <span className="divide">|</span>
              <a className="link">
                <span onClick={this.Export} className="Export">
                  ????????????
                </span>
              </a>
            </div>
          </div>
          <div className="Leader-hr"></div>
          <div className="Leader-content">
            <div className="content-render">
              <Loading
                tip="?????????..."
                opacity={false}
                size="large"
                spinning={UIState.AppLoading.TableLoading}
              >
                <CheckBoxGroup
                  style={{ width: "100%" }}
                  value={this.state.checkedList}
                  onChange={this.onCheckBoxGroupChange.bind(this)}
                >
                  {DataState.SchoolLeaderPreview.newList instanceof Array &&
                  DataState.SchoolLeaderPreview.newList.length !== 0 ? (
                    <Table
                      className="table"
                      loading={UIState.AppLoading.TableLoading}
                      columns={this.state.columns}
                      pagination={false}
                      onChange={this.onTableChange.bind(this)}
                      dataSource={DataState.SchoolLeaderPreview.newList}
                    ></Table>
                  ) : (
                    <Empty
                      title={"??????????????????"}
                      type="3"
                      style={{ marginTop: "150px" }}
                    ></Empty>
                  )}
                </CheckBoxGroup>
                {DataState.SchoolLeaderPreview.Total > 0 ? (
                  <div style={{ display: "inline-block" }}>
                    <CheckBox
                      className="checkAll-box"
                      type="gray"
                      onChange={this.OnCheckAllChange}
                      checked={this.state.checkAll}
                    >
                      <span className="checkAll-title">??????</span>
                    </CheckBox>
                    <Button
                      onClick={this.onDeleteAllClick}
                      className="deleteAll"
                      color="blue"
                    >
                      ??????
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </Loading>
            </div>
          </div>
        </div>
        {/* ?????????????????? */}
        <DetailsModal
          ref="LeaderDetailsMsgModal"
          visible={this.state.LeaderDetailsMsgModalVisible}
          module={1}
          onOk={this.LeaderDetailsMsgModalOk}
          onCancel={this.LeaderDetailsMsgModalCancel}
          data={this.state.detailData ? this.state.detailData : []}
          type="leader"
        ></DetailsModal>
        {/* ????????? */}
        <Modal
          ref="handleLeaderMadal"
          bodyStyle={{ padding: 0 }}
          type="1"
          title="????????????"
          visible={UIState.AppModal.handleLeaderModalVisible}
          onOk={this.handleLeaderModalOk}
          onCancel={this.handleLeaderModalCancel}
        >
          {UIState.AppModal.handleLeaderModalVisible ? (
            <EditModal type="leader" userKey={this.state.userKey}></EditModal>
          ) : (
            ""
          )}
        </Modal>
        <Modal
          ref="handleLeaderMadal"
          bodyStyle={{ padding: 0 }}
          type="1"
          title={"????????????"}
          visible={UIState.AppModal.addLeaderModalVisible}
          onOk={this.handleAddLeaderModalOk}
          onCancel={this.handleAddLeaderModalCancel}
        >
          {UIState.AppModal.addLeaderModalVisible ? (
            <EditModal type="leader" userKey={this.state.userKey}></EditModal>
          ) : (
            ""
          )}
        </Modal>
        <Modal
          ref="StudentChangeMadal"
          bodyStyle={{ padding: 0 }}
          type="2"
          footer={null}
          width={650}
          visible={UIState.AppModal.LeaderChangeMadalVisible}
          onOk={this.LeaderChangeMadalOk}
          onCancel={this.LeaderChangeMadalCancel}
        >
          <Loading
            // tip="?????????..."
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
                    {this.state.leaderChangeUserLog.UserName}?????????????????????
                  </span>
                </div>
                <div className="content">
                  <Scrollbars style={{ width: 100 + "%", height: 280 + "px" }}>
                    {UIState.AppModal.LeaderChangeMadalVisible ? (
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
                title="?????????????????????????????????"
                style={{ top: "150px", position: "relative", height: "411px" }}
              ></Empty>
            )}
          </Loading>
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
export default connect(mapStateToProps)(Leader);
