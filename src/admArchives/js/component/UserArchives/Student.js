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
import MajorModal from "../Modal/MajorModal";
import HandleMajorModal from "../Modal/HandleMajorModal";
import AddClassModal from "../Modal/AddClassModal";
// import "../../scss/Main.scss";
import $ from "jquery";
const { MainAction, CommonAction, PublicAction } = actions;
let { checkUrlAndPostMsg } = Public;

class Student extends Component {
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
          title: "??????",
          align: "left",
          colSpan: 2,
          width: 130,
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
          title: "??????",
          align: "center",
          width: 160,
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
        // //   title: "??????",
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
          title: "??????",
          align: "center",
          width: 180,
          key: "MyCollege",
          render: (data) => {
            return data.GradeName ? (
              <span className="MyClass">
                <span className="CollegeMajor" title={data.GradeName}>
                  {data.GradeName}
                </span>
              </span>
            ) : (
              "--"
            );
          },
        },
        {
          title: "??????",
          align: "center",
          width: 180,
          key: "GradeClass",
          render: (data) => {
            return data.ClassName ? (
              <span className="MyClass">
                <span className="GradeClass" title={data.ClassName}>
                  {data.ClassName}
                </span>
              </span>
            ) : (
              "--"
            );
          },
        },
        {
          title: "??????",
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
                  onClick={this.StudentEdit.bind(this, data)}
                  className="handle-btn"
                >
                  ??????
                </Button>
                {IsLeader ? (
                  ""
                ) : (
                  <Button
                    color="blue"
                    type="default"
                    onClick={this.StudentChange.bind(this, data)}
                    className="check-btn"
                  >
                    ??????????????????
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
  StudentChange = (data) => {
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
  StudentEdit = (data) => {
    let { dispatch } = this.props;
    let Data = {
      UserID: data.UserID,
      UserName: data.UserName,
      ImgPath: data.PhotoPath_NoCache ? data.PhotoPath_NoCache : data.PhotoPath,
      Gender: data.Gender,
      CollegeID: data.CollegeID,
      CollegeName: data.CollegeName,
      MajorID: data.MajorID,
      MajorName: data.MajorName,
      GradeID: data.GradeID,
      GradeName: data.GradeName,
      ClassID: data.ClassID,
      ClassName: data.ClassName,
      IDCardNo: data.IDCardNo,
      Telephone: data.Telephone,
      Email: data.Email,
      HomeAddress: data.HomeAddress,
      PhotoEdit: 0,
    };
    dispatch(MainAction.GetTree({ isLoading: false }));

    dispatch(CommonAction.SetEditUserArchivesData(Data));
    dispatch(CommonAction.SetInitEditUserArchivesData(Data));

    dispatch(
      CommonAction.SetUserArchivesParams({
        UserArchivesModalRole: "Student",
        UserArchivesModalType: "edit",
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        UserArchivesModalVisible: true,
      })
    );
  };
  onAddStudent = () => {
    let {
      dispatch,
      DataState: {
        CommonData: { InitEditStudent, StudentParams },
      },
    } = this.props;
    dispatch(MainAction.GetTree({ isLoading: false }));

    dispatch(
      CommonAction.SetEditUserArchivesData({
        ...InitEditStudent,
        CollegeID: StudentParams.collegeID,
        CollegeName: StudentParams.collegeName,
        MajorID: StudentParams.majorID,
        MajorName: StudentParams.majorName,
        GradeID: StudentParams.gradeID,
        GradeName: StudentParams.gradeName,
        ClassID: StudentParams.classID,
        ClassName: StudentParams.className,
      })
    );

    dispatch(
      CommonAction.SetUserArchivesParams({
        UserArchivesModalRole: "Student",
        UserArchivesModalType: "add",
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        UserArchivesModalVisible: true,
      })
    );
  };
  // ??????????????????
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
        2 +
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
    //   StudentDetailsMsgModalVisible: true,
    //   detailData: DataState.GradeStudentPreview.pensonalList[key],
    // });
  };
  //????????????
  onCollegeSelect = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetStudentParams({
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
    dispatch(MainAction.GetStudentToPage({}));
  };
  onMajorChange = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetStudentParams({
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
    dispatch(MainAction.GetStudentToPage({}));
  };
  onGradeChange = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetStudentParams({
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
    dispatch(MainAction.GetStudentToPage({}));
  };
  onClassChange = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetStudentParams({
        classID: e.value,
        className: e.title,

        keyword: "",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetStudentToPage({}));
  };
  // ??????
  onChangeSearch = (e) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetStudentParams({
        searchValue: e.target.value,
      })
    );
  };
  onCancelSearch = (value) => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetStudentParams({
        keyword: "",
        searchValue: "",
        cancelBtnShow: "n",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetStudentToPage({}));
  };
  onStudentSearch = (e) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          StudentParams: { searchValue },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetStudentParams({
        keyword: e.value.trim(),
        searchValue: e.value,
        cancelBtnShow: "y",
        pageIndex: 0,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetStudentToPage({}));
  };
  onTableChange = (page, filters, sorter) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          StudentParams: { searchValue },
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
      CommonAction.SetStudentParams({
        sortType: Order,
        sortFiled: sorter.columnKey,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetStudentToPage({}));
  };
  onShowSizeChange = (current, pageSize) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          StudentParams: { searchValue },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetStudentParams({
        pageIndex: 0,
        pageSize,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetStudentToPage({}));
  };
  onPagiNationChange = (e) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          StudentParams: { searchValue },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetStudentParams({
        pageIndex: e - 1,
        checkedList: [],
        checkAll: false,
      })
    );
    dispatch(MainAction.GetStudentToPage({}));
  };
  onCheckBoxGroupChange = (checkedList) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          StudentParams: { searchValue },
        },
        MainData: {
          StudentData: { List },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetStudentParams({
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
          StudentParams: { searchValue },
        },
        MainData: {
          StudentData: { List },
        },
      },
    } = this.props;

    let checkAll = e.target.checked;
    let keyList = List.map((child) => child.key);
    dispatch(
      CommonAction.SetStudentParams({
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
          StudentParams: { checkedList },
        },
      },
    } = this.props;
    if (checkedList instanceof Array && checkedList.length === 0) {
      dispatch(
        PublicAction.showErrorAlert({
          type: "warn",
          title: "?????????????????????????????????",
        })
      );
    } else {
      dispatch(
        PublicAction.showErrorAlert({
          type: "btn-query",
          title: "????????????????????????????????????",
          onOk: () => {
            dispatch(
              MainAction.DeleteStudent({
                fn: () => {
                  dispatch(
                    PublicAction.showErrorAlert({
                      type: "success",
                      title: "????????????",
                    })
                  );
                  dispatch(
                    CommonAction.SetStudentParams({
                      checkedList: [],
                      checkAll: false,
                    })
                  );
                  dispatch(MainAction.GetStudentToPage({}));
                },
              })
            );
          },
        })
      );
    }
  };
  // ????????????
  onEditMajor = () => {
    let {
      dispatch,
      DataState: {
        CommonData: { InitEditStudent, StudentParams },
        MainData: {
          StudentTree: { CollegeList },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetMajorEditParams({
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
        MajorModalVisible: true,
      })
    );
  };
  // ??????
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
          StudentData: { Total },
        },
      },
    } = this.props;
    if (!Total) {
      dispatch(
        PublicAction.showErrorAlert({
          type: "warn",
          title: "?????????????????????",
        })
      );
      return;
    }
    let token = sessionStorage.getItem("token");
    let url =
      CONFIG.UserInfoProxy +
      "/ExportStudent?gradeID=" +
      gradeID +
      "&gradeName=" +
      gradeName +
      "&classID=" +
      classID +
      "&className=" +
      className +
      "&keyword=" +
      keyword +
      "&lg_tk=" +
      token;

    window.open(url);
  };
  render() {
    let {
      DataState: {
        MainData: {
          StudentTree: { CollegeList, MajorList, GradeList, ClassList },
          StudentData: { Total, PageIndex, List },
          StudentRegisterData,
        },
        CommonData: {
          RolePower: { LockerVersion_1, IsCollege },
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
      },
      PublicState: {
        Loading: { TableLoading },
      },
    } = this.props;

    // let College = [{ value: "", title: "????????????" }].concat(CollegeList);
    let Grade = [{ value: "", title: "????????????" }].concat(GradeList);
    // let Major = [{ value: "", title: "????????????" }];
    let Class = [{ value: "", title: "????????????" }];
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
    gradeID &&
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
      <div id="Student" className="Content">
        <div className="Student-box">
          <div className="Content-top">
            <span className="top-tips">
              <span className="tips menu39 ">??????????????????</span>
            </span>
            <div className="top-nav">
              {/* <span
                className="link"
                style={{ cursor: "pointer" }}
                onClick={this.onEditMajor}
              >
                <span className="addMajor">????????????</span>
              </span>
              <span className="divide">|</span> */}
              {!LockerVersion_1 ? (
                <>
                  <a className="link">
                    <span
                      onClick={this.onLinkClick.bind(
                        this,
                        "??????????????????",
                        "#/RegisterExamine/RegisterWillExamine"
                      )}
                      className="RegisterExamine"
                    >
                      ??????????????????
                      {StudentRegisterData.Total ? (
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
                onClick={this.onAddStudent}
              >
                <span className="add">????????????</span>
              </span>
              <span className="divide">|</span>
              <a className="link">
                <span
                  onClick={this.onLinkClick.bind(
                    this,
                    "????????????",
                    "#/ImportFile/Student"
                  )}
                  className="ImportFile"
                >
                  ????????????
                </span>
              </a>{" "}
              <span className="divide">|</span>
              <a className="link">
                <span onClick={this.Export} className="Export">
                  ????????????
                </span>
              </a>
            </div>
          </div>
          <div className="Content-hr"></div>
          <div className="Content-handle">
            {/* <span className="dropTitle">{IsCollege ? "" : "??????"}??????:</span>
            {!IsCollege ? (
              <DropDown
                ref="dropMenuFirst"
                onChange={this.onCollegeSelect}
                width={120}
                disabled={IsCollege}
                height={240}
                dropSelectd={{
                  value: collegeID,
                  title: collegeID  ? collegeName : "????????????",
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
                    ? "????????????"
                    : "????????????",
              }}
              dropList={Major}
              onChange={this.onMajorChange}
            ></DropDown> */}
            <DropDown
              ref="dropMenuThird"
              width={120}
              height={240}
              // style={{ marginLeft: "50px" }}
              title={"????????????:"}
              dropSelectd={{
                value: gradeID,
                title: gradeID ? gradeName : "????????????",
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
                gradeID && Class.length > 0 ? false : true
              }
              dropSelectd={{
                value: classID,
                title: classID
                  ? className
                  : // collegeID  &&
                  //   majorID &&
                  gradeID && Class.length === 0
                  ? "????????????"
                  : "????????????",
              }}
              dropList={Class}
              onChange={this.onClassChange}
            ></DropDown>
            <div className="Search">
              <Search
                placeHolder="????????????????????????????????????..."
                onClickSearch={this.onStudentSearch}
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
                <span>{"??????????????????" + keyword + "????????????"}</span>
                <span className="Total">{" " + Total + " "}</span>???
              </span> */}
            </div>
          </div>
          <div className="Content-table">
            <Loading
              // tip="?????????..."
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
                      ? "?????????????????????????????????"
                      : "??????????????????"
                  }
                  type="3"
                  style={{ marginTop: "150px" }}
                ></Empty>
              )}
            </Loading>
          </div>
        </div>
        <MajorModal></MajorModal>
        <HandleMajorModal></HandleMajorModal>
        <AddClassModal></AddClassModal>
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
export default connect(mapStateToProps)(Student);
