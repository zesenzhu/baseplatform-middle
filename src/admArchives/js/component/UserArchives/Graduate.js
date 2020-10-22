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
import GraduateContact from "../Modal/GraduateContact";
import GraduateJobType from "../Modal/GraduateJobType";
import $ from "jquery";
const { MainAction, CommonAction, PublicAction } = actions;
let { checkUrlAndPostMsg } = Public;

class Graduate extends Component {
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
                  {/* <CheckBox
                    value={data.UserID}
                    // type="gray"
                    onChange={this.onCheckChange}
                  ></CheckBox> */}
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
                    background: `url(${arr.PhotoPath}) no-repeat center center / 100% auto`,
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
          title: "学号",
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
          title: "毕业年份",
          align: "center",
          width: 80,
          dataIndex: "Year",
          key: "Year",
          render: (Year) => {
            return (
              <span title={Year} className="Year">
                {Year ? Year : "--"}
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
          title: "班级",
          align: "center",
          width: 140,
          key: "MyClass",
          render: (data) => {
            return (
              <p className="Class" title={data.ClassName}>
                {data.ClassName ? data.ClassName : "--"}
              </p>
            );
          },
        },
        {
          title: "毕业去向",
          align: "center",
          width: 160,
          key: "JobType",
          render: (data) => {
            return data.HasTrack ? (
              <div className="JobType-box">
                <span
                  title={data.JobType}
                  className="JobType"
                  style={{
                    color: data.JobType === "升学" ? "#002871" : "#187100",
                  }}
                >
                  {data.JobType}
                </span>
                <span title={data.Discription} className="Discription">
                  {data.Discription}
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
          width: 120,
          align: "center",
          key: "Telephone",
          dataIndex: "Telephone",
          render: (Telephone) => {
            return (
              <p title={Telephone} className="Telephone">
                {Telephone ? Telephone : "--"}
              </p>
            );
          },
        },
        {
          title: "操作",
          align: "center",
          key: "handle",
          width: 270,
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
                  onClick={this.GraduateEdit.bind(this, data)}
                  className="check-btn"
                >
                  编辑毕业去向
                </Button>
                {IsLeader ? (
                  ""
                ) : (
                  <Button
                    color="blue"
                    type="default"
                    onClick={this.GraduateChange.bind(this, data)}
                    className="check-btn"
                  >
                    编辑联系信息
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
  GraduateChange = (data) => {
    // console.log(data);
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetGraduateEditParams({
        Email: data.Email,
        Telephone: data.Telephone,
        HomeAddress: data.HomeAddress,
        UserID: data.UserID,
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        GraduateContactModalVisible: true,
      })
    );
  };
  GraduateEdit = (data) => {
    let { dispatch } = this.props;

    dispatch(
      CommonAction.SetGraduateEditParams({
        Discription: data.Discription,
        JobType: data.JobType,
        UserName: data.UserName,
        UserID: data.UserID,
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        GraduateJobTypeModalVisible: true,
      })
    );
  };
  onAddGraduate = () => {
    let {
      dispatch,
      DataState: {
        CommonData: { InitEditGraduate },
      },
    } = this.props;
    dispatch(CommonAction.SetEditUserArchivesData(InitEditGraduate));

    dispatch(
      CommonAction.SetUserArchivesParams({
        UserArchivesModalRole: "Graduate",
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
        DetailsType: "graduate",
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
      CommonAction.SetGraduateParams({
        collegeID: e.value,
        collegeName: e.title,
        majorID: "",
        majorName: "",
        classID: "",
        className: "",
        keyword: "",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetGraduateToPage({}));
  };
  onMajorChange = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetGraduateParams({
        majorID: e.value,
        majorName: e.title,
        classID: "",
        className: "",
        keyword: "",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetGraduateToPage({}));
  };
  onGradeChange = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetGraduateParams({
        gradeID: e.value,
        gradeName: e.title,
        classID: "",
        className: "",
        keyword: "",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetGraduateToPage({}));
  };
  onClassChange = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetGraduateParams({
        classID: e.value,
        className: e.title,

        keyword: "",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetGraduateToPage({}));
  };
  // 搜索
  onChangeSearch = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetGraduateParams({
        searchValue: e.target.value,
      })
    );
  };
  onCancelSearch = (value) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetGraduateParams({
        keyword: "",
        searchValue: "",
        cancelBtnShow: "n",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetGraduateToPage({}));
  };
  onGraduateSearch = (e) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          GraduateParams: { searchValue },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetGraduateParams({
        keyword: e.value,
        searchValue: e.value,
        cancelBtnShow: "y",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetGraduateToPage({}));
  };
  onTableChange = (page, filters, sorter) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          GraduateParams: { searchValue },
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
      CommonAction.SetGraduateParams({
        sortType: Order,
        sortFiled: sorter.columnKey,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetGraduateToPage({}));
  };
  onShowSizeChange = (current, pageSize) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          GraduateParams: { searchValue },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetGraduateParams({
        pageIndex: 0,
        pageSize,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetGraduateToPage({}));
  };
  onPagiNationChange = (e) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          GraduateParams: { searchValue },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetGraduateParams({
        pageIndex: e - 1,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetGraduateToPage({}));
  };
  onCheckBoxGroupChange = (checkedList) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          GraduateParams: { searchValue },
        },
        MainData: {
          GraduateData: { List },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetGraduateParams({
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
          GraduateParams: { searchValue },
        },
        MainData: {
          GraduateData: { List },
        },
      },
    } = this.props;

    let checkAll = e.target.checked;
    let keyList = List.map((child) => child.UserID);
    dispatch(
      CommonAction.SetGraduateParams({
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
          GraduateParams: { checkedList },
        },
      },
    } = this.props;
    if (checkedList instanceof Array && checkedList.length === 0) {
      dispatch(
        PublicAction.showErrorAlert({
          type: "warn",
          title: "请先勾选所要删除的毕业生",
        })
      );
    } else {
      dispatch(
        PublicAction.showErrorAlert({
          type: "btn-query",
          title: "确定删除所勾选的毕业生吗？",
          onOk: () => {
            dispatch(
              MainAction.DeleteGraduate({
                fn: () => {
                  dispatch(
                    PublicAction.showErrorAlert({
                      type: "success",
                      title: "删除成功",
                    })
                  );
                  dispatch(
                    CommonAction.SetGraduateParams({
                      checkedList: [],
                      checkAll: false,
                    })
                  );
                  dispatch(MainAction.GetGraduateToPage({}));
                },
              })
            );
          },
        })
      );
    }
  };

  render() {
    let {
      DataState: {
        MainData: {
          GraduateTree: { CollegeList, MajorList, GradeList, ClassList },
          GraduateData: { Total, PageIndex, List },
        },
        CommonData: {
          RolePower: { LockerVersion_1, IsCollege },
          GraduateParams: {
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
      },
      PublicState: {
        Loading: { TableLoading },
      },
    } = this.props;

    let College = [{ value: "", title: "全部学院" }].concat(CollegeList);
    let Grade = [{ value: "", title: "全部年级" }].concat(GradeList);
    let Major = [{ value: "", title: "全部专业" }];
    let Class = [{ value: "", title: "全部班级" }];
    // collegeID  &&
    //   MajorList instanceof Array &&
    //   MajorList.forEach((child) => {
    //     if (child.CollegeID === collegeID) {
    //       Major.push(
    //         //   {
    //         //   value:child.value,title:child.title
    //         // }
    //         child
    //       );
    //     }
    //   });
    // collegeID  &&
    //   majorID  &&
      gradeID  &&
      ClassList instanceof Array &&
      ClassList.forEach((child) => {
        if (
          // child.CollegeID === collegeID &&
          // child.MajorID === majorID &&
          child.GradeID === gradeID
        ) {
          Class.push(
            //   {
            //   value:child.value,title:child.title
            // }
            child
          );
        }
      });
    return (
      <div id="Graduate" className="Content">
        <div className="Graduate-box">
          <div className="Content-top">
            <span className="top-tips">
              <span className="tips menu39 ">毕业生档案管理</span>
            </span>
            <div className="top-nav">
              <a className="link">
                <span
                  onClick={this.onLinkClick.bind(
                    this,
                    "导入毕业生",
                    "#/ImportFile/Graduate"
                  )}
                  className="ImportFile"
                >
                  导入毕业去向
                </span>
              </a>
            </div>
          </div>
          <div className="Content-hr"></div>
          <div className="Content-handle">
            {/* <span className="dropTitle">{IsCollege ? "" : "院系"}专业:</span> */}

            {/* {!IsCollege ? (
              <DropDown
                ref="dropMenuFirst"
                onChange={this.onCollegeSelect}
                width={120}
                disabled={IsCollege}
                height={240}
                dropSelectd={{
                  value: collegeID,
                  title: collegeID  ? collegeName : "全部学院",
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
              disabled={
                collegeID  ? (Major.length > 0 ? false : true) : true
              }
              dropSelectd={{
                value: majorID,
                title:
                  majorID 
                    ? majorName
                    : collegeID  && Major.length === 0
                    ? "暂无专业"
                    : "全部专业",
              }}
              dropList={Major}
              onChange={this.onMajorChange}
            ></DropDown> */}
            <DropDown
              ref="dropMenuThird"
              width={120}
              height={240}
              // style={{ marginLeft: "50px" }}
              title={"年级班级:"}
              dropSelectd={{
                value: gradeID,
                title: gradeID  ? gradeName : "全部年级",
              }}
              dropList={Grade}
              onChange={this.onGradeChange}
            ></DropDown>
            <DropDown
              ref="dropMenuFourth"
              width={120}
              height={240}
              // style={{
              //   display:
              //     this.state.thirdSelect.value !== 0 ? "block" : "none",
              // }}
              disabled={
                // collegeID  &&
                // majorID  &&
                gradeID  &&
                Class.length > 0
                  ? false
                  : true
              }
              dropSelectd={{
                value: classID,
                title:
                  classID 
                    ? className
                    : 
                    // collegeID  &&
                    //   majorID  &&
                      gradeID  &&
                      Class.length === 0
                    ? "暂无班级"
                    : "全部班级",
              }}
              dropList={Class}
              onChange={this.onClassChange}
            ></DropDown>
            <div className="Search">
              <Search
                placeHolder="请输入学号或姓名进行搜索..."
                onClickSearch={this.onGraduateSearch}
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
                  {/* <CheckBoxGroup
                    style={{ width: "100%" }}
                    value={checkedList}
                    onChange={this.onCheckBoxGroupChange}
                  > */}
                  <Table
                    className="table"
                    // loading={TableLoading}
                    columns={this.state.columns}
                    pagination={false}
                    onChange={this.onTableChange}
                    dataSource={List}
                  ></Table>
                  {/* </CheckBoxGroup> */}

                  {/* <div style={{ display: "inline-block" }}>
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
                  </div> */}
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
                      ? "暂无符合条件的毕业生档案"
                      : "暂无毕业生档案"
                  }
                  type="3"
                  style={{ marginTop: "150px" }}
                ></Empty>
              )}
            </Loading>
          </div>
        </div>
        <GraduateContact></GraduateContact>
        <GraduateJobType></GraduateJobType>
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
export default connect(mapStateToProps)(Graduate);
