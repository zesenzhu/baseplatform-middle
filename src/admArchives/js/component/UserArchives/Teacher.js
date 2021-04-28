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
import GroupModal from "../Modal/GroupModal";
import HandleGroupModal from "../Modal/HandleGroupModal";

// import "../../scss/Main.scss";
import $ from "jquery";
const { MainAction, CommonAction, PublicAction } = actions;
let { checkUrlAndPostMsg } = Public;

class Teacher extends Component {
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
                  onClick={this.onUserNameClick.bind(this, arr.UserID)}
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
                  onClick={this.onUserNameClick.bind(this, arr.UserID)}
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
          title: "所教学科",
          align: "center",
          width: 280,
          key: "MyGroup",
          render: (data) => {
            return data.SubjectNames ? (
              <span className="MyGroup" title={data.SubjectNames}>
                {data.SubjectNames}
              </span>
            ) : (
              "--"
            );
          },
        },
        {
          title: "职称",
          align: "center",
          width: 160,
          key: "Title",
          render: (data) => {
            return (
              <span className="Title" title={data.TitleName}>
                {data.TitleName ? data.TitleName : "--"}
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
                  onClick={this.TeacherEdit.bind(this, data)}
                  className="handle-btn"
                >
                  编辑
                </Button>
                {IsLeader ? (
                  ""
                ) : (
                  <Button
                    color="blue"
                    type="default"
                    onClick={this.TeacherChange.bind(this, data)}
                    className="check-btn"
                  >
                    查看变更记录
                  </Button>
                )}
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
  TeacherChange = (data) => {
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
  TeacherEdit = (data) => {
    let { dispatch } = this.props;
    let Data = {
      UserID: data.UserID,
      UserName: data.UserName,
      ImgPath: data.PhotoPath_NoCache ? data.PhotoPath_NoCache : data.PhotoPath,
      Gender: data.Gender,
      CollegeID: data.CollegeID,
      CollegeName: data.CollegeName,
      GroupID: data.GroupID,
      GroupName: data.GroupName,
      TitleID: data.TitleID,
      TitleName: data.TitleName,
      IDCardNo: data.IDCardNo,
      Telephone: data.Telephone,
      Email: data.Email,
      SubjectIDs: data.SubjectIDs.split(","),
      SubjectNames: data.SubjectNames.split(","),
      PhotoEdit: 0,
      HomeAddress: data.HomeAddress,
    };
    dispatch(MainAction.GetSubject({ isLoading: false }));

    dispatch(CommonAction.SetEditUserArchivesData(Data));
    dispatch(CommonAction.SetInitEditUserArchivesData(Data));
    dispatch(
      CommonAction.SetUserArchivesParams({
        UserArchivesModalRole: "Teacher",
        UserArchivesModalType: "edit",
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        UserArchivesModalVisible: true,
      })
    );
  };
  onAddTeacher = () => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          InitEditTeacher,
          TeacherParams,
          RolePower: { ProductType_6 },
        },
        MainData: { SubjectList },
      },
    } = this.props;
    dispatch(MainAction.GetSubject({ isLoading: false }));

    dispatch(
      CommonAction.SetEditUserArchivesData({
        ...InitEditTeacher,
        CollegeID: TeacherParams.collegeID,
        CollegeName: TeacherParams.collegeName,
        GroupID: TeacherParams.groupID,
        GroupName: TeacherParams.groupName,
        SubjectIDs:
          ProductType_6 && SubjectList instanceof Array
            ? SubjectList.map((child) => child.value)
            : [],
      })
    );

    dispatch(
      CommonAction.SetUserArchivesParams({
        UserArchivesModalRole: "Teacher",
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
  onUserNameClick = (UserID) => {
    let {
      dispatch,
      PublicState: {
        LoginMsg: { identify },
      },
    } = this.props;
    // console.log(UserID);
    // if (pensonalList[key]) {
    let token = sessionStorage.getItem("token");
    window.open(
      "/html/userPersona/index.html?userType=" +
        1 +
        "&userID=" +
        UserID +
        "&lg_tk=" +
        token +
        (identify && identify instanceof Array && identify.length > 0
          ? "&lg_ic=" + identify[0].IdentityCode
          : "")
    );
    // }
    // const { DataState } = this.props;
    // this.setState({
    //   TeacherDetailsMsgModalVisible: true,
    //   detailData: DataState.GradeTeacherPreview.pensonalList[key],
    // });
  };
  //学院选择
  onCollegeSelect = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetTeacherParams({
        subjectID: e.value,
        subjectName: e.title,
        groupID: "",
        groupName: "",

        keyword: "",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetTeacherToPage({}));
  };
  onGroupChange = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetTeacherParams({
        groupID: e.value,
        groupName: e.title,

        keyword: "",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetTeacherToPage({}));
  };

  // 搜索
  onChangeSearch = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetTeacherParams({
        searchValue: e.target.value,
      })
    );
  };
  onCancelSearch = (value) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetTeacherParams({
        keyword: "",
        searchValue: "",
        cancelBtnShow: "n",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetTeacherToPage({}));
  };
  onTeacherSearch = (e) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          TeacherParams: { searchValue },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetTeacherParams({
        keyword: e.value.trim(),
        searchValue: e.value,
        cancelBtnShow: "y",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetTeacherToPage({}));
  };
  onTableChange = (page, filters, sorter) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          TeacherParams: { searchValue },
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
      CommonAction.SetTeacherParams({
        sortType: Order,
        sortFiled: sorter.columnKey,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetTeacherToPage({}));
  };
  onShowSizeChange = (current, pageSize) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          TeacherParams: { searchValue },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetTeacherParams({
        pageIndex: 0,
        pageSize,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetTeacherToPage({}));
  };
  onPagiNationChange = (e) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          TeacherParams: { searchValue },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetTeacherParams({
        pageIndex: e - 1,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetTeacherToPage({}));
  };
  onCheckBoxGroupChange = (checkedList) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          TeacherParams: { searchValue },
        },
        MainData: {
          TeacherData: { List },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetTeacherParams({
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
          TeacherParams: { searchValue },
        },
        MainData: {
          TeacherData: { List },
        },
      },
    } = this.props;

    let checkAll = e.target.checked;
    let keyList = List.map((child) => child.key);
    dispatch(
      CommonAction.SetTeacherParams({
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
          TeacherParams: { checkedList },
        },
      },
    } = this.props;
    if (checkedList instanceof Array && checkedList.length === 0) {
      dispatch(
        PublicAction.showErrorAlert({
          type: "warn",
          title: "请先勾选所要删除的教师",
        })
      );
    } else {
      dispatch(
        PublicAction.showErrorAlert({
          type: "btn-query",
          title: "确定删除所勾选的教师吗？",
          onOk: () => {
            dispatch(
              MainAction.DeleteTeacher({
                fn: () => {
                  dispatch(
                    PublicAction.showErrorAlert({
                      type: "success",
                      title: "删除成功",
                    })
                  );
                  dispatch(
                    CommonAction.SetTeacherParams({
                      checkedList: [],
                      checkAll: false,
                    })
                  );
                  dispatch(MainAction.GetTeacherToPage({}));
                },
              })
            );
          },
        })
      );
    }
  };

  // 添加专业
  onEditGroup = () => {
    let {
      dispatch,
      DataState: {
        CommonData: { InitEditStudent, StudentParams },
        MainData: {
          TeacherTree: { CollegeList },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetGroupEditParams({
        CollegeID: StudentParams.collegeID
          ? StudentParams.collegeID
          : CollegeList[0]
          ? CollegeList[0].value
          : "",
        CollegeName: StudentParams.collegeName
          ? StudentParams.collegeName
          : CollegeList[0]
          ? CollegeList[0].title
          : "",
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        GroupModalVisible: true,
      })
    );
  };
  // 导出
  Export = () => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          InitEditStudent,
          TeacherParams: {
            collegeID,
            collegeName,
            groupID,
            groupName,subjectID,subjectName,
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
          TeacherData: { Total, PageIndex, List },
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
    let url =
      CONFIG.UserInfoProxy +
      "/ExportTeacher?subjectID=" +
      subjectID +
      "&subjectName=" +
      subjectName +
      "&groupID=" +
      groupID +
      "&groupName=" +
      groupName +
      "&keyword=" +
      keyword +
      "&lg_tk=" +
      token +
      "&showGroup=0";

    window.open(url);
  };
  render() {
    let {
      DataState: {
        MainData: {
          TeacherTree: { CollegeList, GroupList },
          TeacherData: { Total, PageIndex, List },
          SubjectList,
          TeacherRegisterData,
        },
        CommonData: {
          RolePower: { LockerVersion_1, IsCollege },
          TeacherParams: {
            collegeID,
            collegeName,
            subjectID,
            subjectName,
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

    let College = [{ value: "", title: "全部学院" }].concat(CollegeList);
    let Group = [{ value: "", title: "全部教研室" }];
    let Class = [];
    collegeID &&
      GroupList instanceof Array &&
      GroupList.forEach((child) => {
        if (child.CollegeID === collegeID) {
          Group.push(
            //   {
            //   value:child.value,title:child.title
            // }
            child
          );
        }
      });

    return (
      <div id="Teacher" className="Content">
        <div className="Teacher-box">
          <div className="Content-top">
            <span className="top-tips">
              <span className="tips menu39 ">教师档案管理</span>
            </span>
            <div className="top-nav">
              {/* <span
                className="link"
                style={{ cursor: "pointer" }}
                onClick={this.onEditGroup}
              >
                <span className="addMajor">教研室管理</span>
              </span>
              <span className="divide">|</span> */}
              {!LockerVersion_1 ? (
                <>
                  <a className="link">
                    <span
                      onClick={this.onLinkClick.bind(
                        this,
                        "教师注册审核",
                        "#/TeacherRegisterExamine/TeacherRegisterWillExamine"
                      )}
                      className="RegisterExamine"
                    >
                      教师注册审核
                      {TeacherRegisterData.Total ? (
                        <i className="have-red"></i>
                      ) : (
                        ""
                      )}
                    </span>
                  </a>
                  <span className="divide">|</span>
                </>
              ) : (
                ""
              )}
              <span
                className="link"
                style={{ cursor: "pointer" }}
                onClick={this.onAddTeacher}
              >
                <span className="add">添加教师</span>
              </span>
              <span className="divide">|</span>
              <a className="link">
                <span
                  onClick={this.onLinkClick.bind(
                    this,
                    "导入教师",
                    "#/ImportFile/Teacher"
                  )}
                  className="ImportFile"
                >
                  导入教师
                </span>
              </a>
              <span className="divide">|</span>
              <a className="link">
                <span onClick={this.Export} className="Export">
                  导出教师
                </span>
              </a>
            </div>
          </div>
          <div className="Content-hr"></div>
          <div className="Content-handle">
            <span className="dropTitle">学科:</span>
            {/* {!IsCollege ? (
              <DropDown
                ref="dropMenuFirst"
                onChange={this.onCollegeSelect}
                width={120}
                disabled={IsCollege}
                height={240}
                dropSelectd={{
                  value: collegeID,
                  title: collegeID ? collegeName : "全部学院",
                }}
                dropList={College}
              ></DropDown>
            ) : (
              ""
            )}
            <DropDown
              ref="dropMenuSecond"
              width={120}
              height={240}
              disabled={collegeID ? (Group.length > 0 ? false : true) : true}
              dropSelectd={{
                value: groupID,
                title: groupID
                  ? groupName
                  : collegeID && Group.length === 0
                  ? "暂无教研室"
                  : "全部教研室",
              }}
              dropList={Group}
              onChange={this.onGroupChange}
            ></DropDown> */}
            <DropDown
              ref="dropMenuFirst"
              onChange={this.onCollegeSelect}
              width={120}
              // disabled={IsCollege}
              height={240}
              dropSelectd={{
                value: subjectID,
                title: subjectID ? subjectName : "全部学科",
              }}
              dropList={SubjectList}
            ></DropDown>
            <div className="Search">
              <Search
                placeHolder="请输入工号或姓名进行搜索..."
                onClickSearch={this.onTeacherSearch}
                height={30}
                width={250}
                Value={searchValue}
                onCancelSearch={this.onCancelSearch}
                onChange={this.onChangeSearch}
                CancelBtnShow={cancelBtnShow}
              ></Search>
              {/* <span
                className="search-tips"
                style={{
                  display: cancelBtnShow === "y" ? "block" : "none",
                }}
              >
                <span>{"搜索关键词“" + keyword + "”共找到"}</span>
                <span className="Total">{" " + Total + " "}</span>人
              </span> */}
            </div>
          </div>
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
                  <div className="pagination-box">
                    <PagiNation
                      showQuickJumper
                      showSizeChanger
                      onShowSizeChange={this.onShowSizeChange}
                      pageSize={pageSize}
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
                    cancelBtnShow === "y" || cancelBtnShow !== 0
                      ? "暂无符合条件的教师档案"
                      : "暂无教师档案"
                  }
                  type="3"
                  style={{ marginTop: "150px" }}
                ></Empty>
              )}
            </Loading>
          </div>
        </div>
        <GroupModal></GroupModal>
        <HandleGroupModal></HandleGroupModal>
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
export default connect(mapStateToProps)(Teacher);
