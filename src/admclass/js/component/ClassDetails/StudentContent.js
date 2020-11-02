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
import StudentCard from "../Cards/StudentCard";
// import "../../scss/Main.scss";
import $ from "jquery";
class StudentContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchValue: "",
      Keyword: "",
      CancelBtnShow: "n",
      checkAll: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { DataState } = nextProps;
  }
  componentDidMount() {}
  onClickSearch = (e) => {
    let { onGetStudentPageClick } = this.props;
    // console.log(e);

    onGetStudentPageClick({
      Keyword: e.value.trim(),
      CancelBtnShow: "y",
      PageIndex: 0,
      CheckAll: false,
      CheckList: [],
    });
  };
  onChangeSearch = (e) => {
    let { onGetStudentPageClick } = this.props;
    // this.setState({
    //   SearchValue: e.target.value,
    // });
    // dispatch(
    //   UpDataState.SetClassParams({
    //     SearchValue: e.target.value,
    //   })
    // );
    onGetStudentPageClick({
      SearchValue: e.target.value,
    },false);
  };
  onCancelSearch = (e) => {
    let { onGetStudentPageClick } = this.props;
    this.setState({
      SearchValue: "",
    });
    onGetStudentPageClick({
      Keyword: "",
      SearchValue: "",
      CancelBtnShow: "n",
      PageIndex: 0,
      CheckAll: false,
      CheckList: [],
    });
  };
  onPagiNationChange = (value) => {
    let { onGetStudentPageClick } = this.props;

    onGetStudentPageClick({
      PageIndex: value - 1,
      CheckAll: false,
      CheckList: [],
    });
  };
  // 改变显示条目数
  onShowSizeChange = (current, pageSize) => {
    let { onGetStudentPageClick } = this.props;

    onGetStudentPageClick({
      PageSize: pageSize,
      PageIndex: 0,
      CheckAll: false,
      CheckList: [],
    });
  };
  onSelectStudentClick = (UserMsg, isSelect) => {
    let {
      onSelectStudentClick,
      onGetStudentPageClick,
      data: { List },
      classDetailsParams: { CheckList },
    } = this.props;
    let SelectList = CheckList instanceof Array ? CheckList : [];
    if (isSelect) {
      SelectList.push(UserMsg);
    } else {
      SelectList = [];
      CheckList instanceof Array &&
        CheckList.forEach((child) => {
          if (child.value !== UserMsg.value) {
            SelectList.push(child);
          }
        });
    }
    onGetStudentPageClick(
      {
        CheckAll: List.length === SelectList.length,
        CheckList: SelectList,
      },
      false
    );
    // onSelectStudentClick(SelectList);
  };
  onCheckAllChange = (e) => {
    let {
      onSelectStudentClick,
      onGetStudentPageClick,
      data: { List },
    } = this.props;
    List =
      List instanceof Array
        ? List.map((child) => {
            return { value: child.UserID, title: child.UserName };
          })
        : [];
    // console.log(e.target.value)
    // onSelectStudentClick(!e.target.value?List:[]);
    onGetStudentPageClick(
      {
        CheckAll: e.target.checked,
        CheckList: e.target.checked ? List : [],
      },
      false
    );
  };
  onCheckAllEndClick = (type) => {
    let { onCheckAllEndClick } = this.props;
    onCheckAllEndClick(type);
  };
  render() {
    const {
      data: { Total, List, PageIndex },
      className,
      children,
      onSetMonitorClick,
      onSelectStudentClick,
      onDeleteMonitorClick,
      onGetStudentPageClick,
      canControl,
      onDetailModalShow,
      type,
      selectStudent,
      // CancelBtnShow,
      classDetailsParams,
      ...other
    } = this.props;
    let {
      SearchValue,
      ClassID,
      Keyword,
      // PageIndex,
      PageSize,
      CheckAll,
      onCheckAllEndClick,
      CheckList,
      // SearchValue,
      CancelBtnShow,
    } = classDetailsParams;
    return (
      <div className={`StudentContent ${className}`} {...other}>
        <div className="top-tip">
          <span className="tip-left">学生名单</span>
          <span className="tip-right">({Total}人)</span>
          <Search
            placeHolder="请输入学生学号或/学生姓名进行搜索..."
            onClickSearch={this.onClickSearch}
            height={30}
            className="Search"
            width={320}
            Value={SearchValue}
            onCancelSearch={this.onCancelSearch}
            onChange={this.onChangeSearch}
            CancelBtnShow={CancelBtnShow}
          ></Search>
        </div>
        <div className="sc-main">
          {List instanceof Array && List.length > 0 ? (
            // <CheckBoxGroup value={this.state.checkedList}
            // onChange={this.onCheckBoxGroupChange.bind(this)}>
            // {
            List.map((child, index) => {
              return (
                <StudentCard
                  isSelect={CheckList.some(
                    (child1) => child1.value === child.UserID
                  )}
                  key={index}
                  data={child}
                  type={type}
                  onDetailModalShow={onDetailModalShow}
                  onSetMonitorClick={onSetMonitorClick}
                  canControl={canControl}
                  onSelectStudentClick={this.onSelectStudentClick}
                  // className={"TeacherCard"}
                ></StudentCard>
              );
            })
          ) : (
            // }
            // </CheckBoxGroup>
            <Empty
              type={"4"}
              title={
                CancelBtnShow === "y"
                  ? "暂无符合条件的学生信息"
                  : "暂无学生信息"
              }
              style={{ marginTop: "100px", marginBottom: "100px" }}
            ></Empty>
          )}
          {List instanceof Array && List.length > 0 ? (
            <div className="pagination-box">
              {canControl && type ? (
                <div className="ReSet-box">
                  <CheckBox
                    onChange={this.onCheckAllChange}
                    title={"全选"}
                    type="gray"
                    checked={CheckAll}
                  >
                    全选
                  </CheckBox>
                  {type === "Admin" ? (
                    <Button
                      className="edit-btn"
                      onClick={this.onCheckAllEndClick.bind(this, "reset")}
                      height={28}
                      color={"blue"}
                    >
                      调班
                    </Button>
                  ) : type === "Ganger" ? (
                    <Button
                      className="edit-btn"
                      onClick={this.onCheckAllEndClick.bind(this, "delete")}
                      height={28}
                      color={"red"}
                    >
                      删除
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}

              <PagiNation
                showQuickJumper
                showSizeChanger
                pageSize={PageSize}
                onShowSizeChange={this.onShowSizeChange}
                current={PageIndex + 1}
                hideOnSinglePage={Total === 0 ? true : false}
                total={Total}
                onChange={this.onPagiNationChange}
              ></PagiNation>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
StudentContent.defaultProps = {
  className: "",
  canControl: false,
  type: "",
  data: {
    Total: 0,
    List: [],
    Ganger: {
      IsSet: false,
    },
  },
  onSetMonitorClick: () => {},
  onSelectStudentClick: () => {},
  onDeleteMonitorClick: () => {},
  selectStudent: [],
  onGetStudentPageClick: () => {},
  classDetailsParams: {},
  onDetailModalShow: () => {},
  onCheckAllEndClick: () => {},
};
export default StudentContent;
