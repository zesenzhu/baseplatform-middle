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
import TeacherContent from "./TeacherContent";
import StudentContent from "./StudentContent";
// import "../../scss/Main.scss";
import $ from "jquery";
const { UpDataState, UpUIState, PublicAction } = actions;
class Student extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    const { DataState } = nextProps;
  }
  componentDidMount() {}
  onGetStudentPageClick = (params, getNew = true) => {
    let {
      dispatch,
      DataState: {
        CommonData: { ClassDetailsParams, selectGrade },
      },
    } = this.props;

    // if (ClassID === undefined) {
    //   ClassID = ClassDetailsParams.ClassID;
    // }
    // if (Keyword === undefined) {
    //   Keyword = ClassDetailsParams.Keyword;
    // }
    // if (PageIndex === undefined) {
    //   PageIndex = ClassDetailsParams.PageIndex;
    // }
    // if (PageSize === undefined) {
    //   PageSize = ClassDetailsParams.PageSize;
    // }
    dispatch(
      UpDataState.SetClassDetailsParams({
        ...params,
      })
    );
    if (getNew) {
      dispatch(UpDataState.GetStudentToPage({}));
    }
  };
  onDetailModalShow = (role, UserID, UserType) => {
    let { dispatch ,
      PublicState: {
        LoginMsg: { identify },
      },} = this.props;
    let token = sessionStorage.getItem("token");
    window.open(
      "/html/userPersona/index.html?userType=" +
        UserType +
        "&userID=" +
        UserID +
        "&lg_tk=" +
        token+
        (identify && identify instanceof Array && identify.length > 0
          ? "&lg_ic=" + identify[0].IdentityCode
          : "")
    );
    // dispatch(UpDataState.SetDetailsModalRole(role));
    // dispatch(UpDataState.GetUserDetail({ UserID }));
    // dispatch(UpDataState.SetModalVisible({ DetailsMsgModalVisible: true }));
  };
  onCheckAllEndClick = (type) => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          ClassDetailsParams: { CheckList },
        },
      },
    } = this.props;
    if (CheckList.length === 0) {
      dispatch(
        PublicAction.showErrorAlert({ type: "btn-warn", title: "请勾选学生" })
      );
      return;
    }
    if (type === "reset") {
      //调班
      dispatch(UpDataState.GetGradeClassTree({}));
      dispatch(
        UpDataState.SetModalVisible({
          ReSetStudentClassModalVisible: true,
        })
      );
    }
  };
  render() {
    const {
      DataState: {
        MainData: { ClassTeacherData, ClassStudentData },
        CommonData: { SelectStudent, ClassDetailsParams },
      },
      PublicState,
    } = this.props;
    let { GradeName, ClassName } = ClassTeacherData;
    return (
      <div id="Admin" className="Admin">
        <div className="content-top">
          <i className="top-icon"></i>
          <div
            title={
              (GradeName ? GradeName : "--") +
              ">" +
              (ClassName ? ClassName : "--")
            }
            className="top-title"
          >
            {/* 我的班级：{" "} */}
            {(GradeName ? GradeName : "--") +
              ">" +
              (ClassName ? ClassName : "--")}
          </div>
        </div>
        <div className="content-main">
          <TeacherContent
            // onSetGangerClick={this.onSetGangerClick}
            // onReSetClick={this.onReSetClick}
            // onDeleteClick={this.onDeleteClick}
            canControl={false}
            onDetailModalShow={this.onDetailModalShow}
            data={ClassTeacherData}
          ></TeacherContent>
          <StudentContent
            // onSetMonitorClick={this.onSetMonitorClick}
            // onSelectStudentClick={this.onSelectStudentClick}
            // onDeleteMonitorClick={this.onDeleteMonitorClick}
            onDetailModalShow={this.onDetailModalShow}
            onGetStudentPageClick={this.onGetStudentPageClick}
            canControl={false}
            // type={"Student"}
            // onCheckAllEndClick={this.onCheckAllEndClick}
            // selectStudent={SelectStudent}
            data={ClassStudentData}
            classDetailsParams={ClassDetailsParams}
          ></StudentContent>
          {/* {List instanceof Array && List.length > 0 ? (
              List.map((child, index) => {
                return (
                  <GradeCard
                    onCardClick={this.onCardClick}
                    onReNameClick={this.onReNameClick}
                    key={index}
                    data={child}
                    canControl={UserPower==='Admin'}
                    className={"Card"}
                  ></GradeCard>
                );
              })
            ) : (
              <Empty
                type={"3"}
                title={"暂无年级"}
                style={{ marginTop: "150px" }}
              ></Empty>
            )} */}
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
export default connect(mapStateToProps)(Student);
