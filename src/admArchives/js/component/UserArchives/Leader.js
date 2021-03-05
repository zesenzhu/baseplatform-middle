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
import { Icon, Table } from "antd";
import history from "../../containers/history";
import { postData, getData } from "../../../../common/js/fetch";
import CONFIG from "../../../../common/js/config";
import actions from "../../actions";
// import "../../scss/Main.scss";
import $ from "jquery";
const { MainAction, CommonAction, PublicAction } = actions;
let { checkUrlAndPostMsg } = Public;

class Leader extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      columns: [
        {
          title: "",
          // dataIndex: "OrderNo",
          key: "OrderNo",
          width: 68,
          align: "left",
          render: (data) => {
            return (
              <div className="registerTime-content">
                <label style={{ whiteSpace: "nowrap" }}>
                  <CheckBox
                    value={data.key}
                    // type="gray"
                    onChange={this.onCheckChange}
                  ></CheckBox>
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
          width: 50,
          colSpan: 0,
          // dataIndex: "UserName",
          render: (arr) => {
            return (
              <div className="name-content">
                <i
                  alt={arr.UserName}
                  onClick={this.onUserNameClick.bind(this, arr)}
                  className="name-img"
                  style={{
                    width: "37.5px",
                    height: "47px",
                    display: "inline-block",
                    background: `url(${arr.PhotoPath_NoCache}) no-repeat center center / 100% auto`,
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
          sorter: true,
          render: (arr) => {
            return (
              <div className="name-content">
                <span
                  className="name-UserName"
                  title={arr.UserName ? arr.UserName : ""}
                  onClick={this.onUserNameClick.bind(this, arr)}
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
        // // {
        // //   title: "年级",
        // //   align: "center",
        // //   key: "GradeName",
        // //   width: 110,
        // //   dataIndex: "GradeName",
        // //   render: GradeName => {
        // //     return (
        // //       <span title={GradeName} className="GradeName">
        // //         {GradeName ? GradeName : "--"}
        // //       </span>
        // //     );
        // //   }
        // // },
        {
          title: "行政职务",
          align: "center",
          width: 220,
          key: "Position",
          render: (data) => {
            return (
              <span className="Position" title={data.Position}>
                {data.Position ? data.Position : "--"}
              </span>
            );
          },
        },

        {
          title: "操作",
          align: "center",
          key: "handle",
          width: 232,
          // dataIndex: "key",
          render: (data) => {
            let {
              DataState: {
                CommonData: {
                  RolePower: { IsLeader },
                },
              },
            } = props;
            return (
              <div className="handle-content">
                <Button
                  color="blue"
                  type="default"
                  onClick={this.LeaderEdit.bind(this, data)}
                  className="handle-btn"
                >
                  编辑
                </Button>

                <Button
                  color="blue"
                  type="default"
                  onClick={this.LeaderChange.bind(this, data)}
                  className="check-btn"
                >
                  查看变更记录
                </Button>
              </div>
            );
          },
        },
      ],
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
  //
  LeaderChange = (data) => {
    // console.log(data);
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetUserArchivesParams({
        TipsLogName: data.UserName,
      })
    );
    dispatch(MainAction.GetUserLog({ innerID: data.InnerID }));
    dispatch(
      CommonAction.SetModalVisible({
        UserLogModalVisible: true,
      })
    );
  };
  LeaderEdit = (data) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          RolePower: { IsCollege },
        },
      },
    } = this.props;
    let Data = {
      UserID: data.UserID,
      UserName: data.UserName,
      ImgPath: data.PhotoPath_NoCache ? data.PhotoPath_NoCache : data.PhotoPath,
      Gender: data.Gender,
      CollegeID: data.CollegeID,
      CollegeName: data.CollegeName,
      UserType: 7,
      Position: data.Position,
      IDCardNo: data.IDCardNo,
      Telephone: data.Telephone,
      PhotoEdit: 0,
      Email: data.Email,
      HomeAddress: data.HomeAddress,
    };

    dispatch(CommonAction.SetEditUserArchivesData(Data));
    dispatch(CommonAction.SetInitEditUserArchivesData(Data));

    dispatch(
      CommonAction.SetUserArchivesParams({
        UserArchivesModalRole: "Leader",
        UserArchivesModalType: "edit",
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        UserArchivesModalVisible: true,
      })
    );
  };
  onAddLeader = () => {
    let {
      dispatch,
      DataState: {
        CommonData: { InitEditLeader },
      },
    } = this.props;
    dispatch(CommonAction.SetEditUserArchivesData(InitEditLeader));

    dispatch(
      CommonAction.SetUserArchivesParams({
        UserArchivesModalRole: "Leader",
        UserArchivesModalType: "add",
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        UserArchivesModalVisible: true,
      })
    );
  };
  // 点击姓名头像
  onUserNameClick = (data) => {
    const { dispatch } = this.props;
    dispatch(
      CommonAction.SetUserArchivesParams({
        DetailsType: "leader",
        DetailsData: data.DetailsData,
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        DetailsModalVisible: true,
      })
    );
    // let token = sessionStorage.getItem("token");
    // window.open(
    //   "/html/userPersona/index.html?userType=" +
    //     2 +
    //     "&userID=" +
    //     UserID +
    //     "&lg_tk=" +
    //     token
    // );
  };
  //学院选择
  onCollegeSelect = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetLeaderParams({
        collegeID: e.value,
        collegeName: e.title,
        groupID: "",
        groupName: "",

        keyword: "",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetLeaderToPage({}));
  };
  onGroupChange = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetLeaderParams({
        groupID: e.value,
        groupName: e.title,

        keyword: "",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetLeaderToPage({}));
  };

  // 搜索
  onChangeSearch = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetLeaderParams({
        searchValue: e.target.value,
      })
    );
  };
  onCancelSearch = (value) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetLeaderParams({
        keyword: "",
        searchValue: "",
        cancelBtnShow: "n",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetLeaderToPage({}));
  };
  onLeaderSearch = (e) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          LeaderParams: { searchValue },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetLeaderParams({
        keyword: e.value.trim(),
        searchValue: e.value,
        cancelBtnShow: "y",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetLeaderToPage({}));
  };
  onTableChange = (page, filters, sorter) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          LeaderParams: { searchValue },
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
      CommonAction.SetLeaderParams({
        sortType: Order,
        sortFiled: sorter.columnKey,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetLeaderToPage({}));
  };
  onShowSizeChange = (current, pageSize) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          LeaderParams: { searchValue },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetLeaderParams({
        pageIndex: 0,
        pageSize,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetLeaderToPage({}));
  };
  onPagiNationChange = (e) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          LeaderParams: { searchValue },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetLeaderParams({
        pageIndex: e - 1,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetLeaderToPage({}));
  };
  onCheckBoxGroupChange = (checkedList) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          LeaderParams: { searchValue },
        },
        MainData: {
          LeaderData: { List },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetLeaderParams({
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
          LeaderParams: { searchValue },
        },
        MainData: {
          LeaderData: { List },
        },
      },
    } = this.props;

    let checkAll = e.target.checked;
    let keyList = List.map((child) => child.key);
    dispatch(
      CommonAction.SetLeaderParams({
        checkedList: checkAll ? keyList : [],
        checkAll,
      })
    );
  };
  onDeleteAllClick = () => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          LeaderParams: { checkedList },
        },
      },
    } = this.props;
    if (checkedList instanceof Array && checkedList.length === 0) {
      dispatch(
        PublicAction.showErrorAlert({
          type: "warn",
          title: "请先勾选所要删除的领导",
        })
      );
    } else {
      dispatch(
        PublicAction.showErrorAlert({
          type: "btn-query",
          title: "确定删除所勾选的领导吗？",
          onOk: () => {
            dispatch(
              MainAction.DeleteLeader({
                fn: () => {
                  dispatch(
                    PublicAction.showErrorAlert({
                      type: "success",
                      title: "删除成功",
                    })
                  );
                  dispatch(
                    CommonAction.SetLeaderParams({
                      checkedList: [],
                      checkAll: false,
                    })
                  );
                  dispatch(MainAction.GetLeaderToPage({}));
                },
              })
            );
          },
        })
      );
    }
  };

  // 导出
  Export = () => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          InitEditStudent,
          StudentParams: {
            collegeID,
            collegeName,
            majorID,
            majorName,
            gradeName,
            gradeID,
            classID,
            className,
            keyword,
            cancelBtnShow,
            searchValue,
            pageSize,
            sortFiled,
            sortType,
            checkAll,
            checkedList,
          },
        },
        MainData: {
          StudentTree: { CollegeList },
          LeaderData: { Total, PageIndex, List },
        },
      },
    } = this.props;
    if (!Total) {
      dispatch(
        PublicAction.showErrorAlert({
          type: "warn",
          title: "暂无数据可导出",
        })
      );
      return;
    }
    let token = sessionStorage.getItem("token");
    let url = CONFIG.UserInfoProxy + "/ExportSchoolLeader?lg_tk=" + token;

    window.open(url);
  };
  render() {
    let {
      DataState: {
        MainData: {
          LeaderData: { Total, PageIndex, List },
        },
        CommonData: {
          RolePower: { LockerVersion_1, IsCollege },
          LeaderParams: {
            collegeID,
            collegeName,
            groupID,
            groupName,
            gradeName,
            gradeID,
            classID,
            className,
            keyword,
            cancelBtnShow,
            searchValue,
            pageSize,
            sortFiled,
            sortType,
            checkAll,
            checkedList,
          },
        },
      },
      PublicState: {
        Loading: { TableLoading },
      },
    } = this.props;

    return (
      <div id="Leader" className="Content">
        <div className="Leader-box">
          <div className="Content-top">
            <span className="top-tips">
              <span className="tips menu39 ">领导档案管理</span>
            </span>
            <div className="top-nav">
              <span
                className="link"
                style={{ cursor: "pointer" }}
                onClick={this.onAddLeader}
              >
                <span className="add">添加领导</span>
              </span>
              <span className="divide">|</span>
              <a className="link">
                <span
                  onClick={this.onLinkClick.bind(
                    this,
                    "导入领导",
                    "#/ImportFile/Leader"
                  )}
                  className="ImportFile"
                >
                  导入领导
                </span>
              </a>
              <span className="divide">|</span>
              <a className="link">
                <span onClick={this.Export} className="Export">
                  导出领导
                </span>
              </a>
            </div>
          </div>
          <div className="Content-hr"></div>

          <div className="Content-table">
            <Loading
              // tip="加载中..."
              opacity={false}
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
                      onClick={this.onDeleteAllClick}
                      className="deleteAll"
                      color="blue"
                    >
                      删除
                    </Button>
                  </div>
                </>
              ) : (
                <Empty
                  title={"暂无领导档案"}
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
export default connect(mapStateToProps)(Leader);
