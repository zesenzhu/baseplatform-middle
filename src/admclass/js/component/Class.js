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
} from "../../../common";
import { connect } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { Icon, Table } from "antd";
import history from "../containers/history";
import Public from "../../../common/js/public";

import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import actions from "../actions";
import "../../scss/Class.scss";
import $ from "jquery";
import ClassCard from "./Cards/ClassCard";
import RenameModal from "./Modal/RenameModal";
let { checkUrlAndPostMsg } = Public;
const { UpDataState, UpUIState, PublicAction } = actions;
class Class extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    const { DataState } = nextProps;
  }
  componentDidMount() {}
  onReNameClick = (data) => {
    let { dispatch } = this.props;
    dispatch(
      UpDataState.SetModalVisible({
        ClassReSetModalVisible: true,
      })
    );
    dispatch(
      UpDataState.SetClassData({
        ClassName: data.ClassName,
        ClassID: data.ClassID,
        InitClassName: data.ClassName,
      })
    );
  };
  onDeleteClick = (data) => {
    let {
      dispatch,
      DataState: {
        MainData: {
          ClassData: { GradeID },
        },
      },
    } = this.props;

    dispatch(
      PublicAction.showErrorAlert({
        type: "btn-query",
        title: "确认删除该班级吗？",
        onOk: () => {
          dispatch(
            UpDataState.DeleteClass({
              GradeID: data.GradeID,
              ClassIDs: data.ClassID,
              func: () => {
                dispatch(PublicAction.hideErrorAlert());
                dispatch(UpDataState.GetSummary({}));
                // console.log(history)
                dispatch(UpDataState.GetGradeSummary({}));
              },
            })
          );
        },
      })
    );
  };

  onCardClick = (data) => {
    let {
      dispatch,
      DataState: {
        MainData: {
          ClassData: { GradeID, GradeName },
        },
      },
    } = this.props;

    dispatch(
      UpDataState.SetSelectClassData({
        GradeName: GradeName,
        GradeID: GradeID,
        ClassName: data.ClassName,
        ClassID: data.ClassID,
      })
    );
    // history.push("Class");
    let url = window.location.href.split(window.location.hash).join('#/ClassDetails/'+data.ClassID);

    // console.log(url);
    checkUrlAndPostMsg({ btnName:'班级详情', url });
  };
  ReNameGradeModalCancel = () => {
    let { dispatch } = this.props;
    dispatch(
      UpDataState.SetModalVisible({
        ClassReSetModalVisible: false,
      })
    );
    dispatch(
      UpDataState.SetGradeData({
        GradeName: "",
        GradeID: "",
        InitGradeName: "",
      })
    );
    dispatch(
      UpDataState.SetClassData({
        ClassName: "",
        ClassID: "",
        InitClassName: "",
      })
    );
    dispatch(UpDataState.SetTips({ ClassReSetTips: "班级名称不能为空" }));
    dispatch(UpDataState.SetTipsVisible({ ClassReSetTipsVisible: false }));
  };
  ReNameGradeModalOk = () => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          ClassData: { ClassName, ClassID, InitClassName },
        },
      },
    } = this.props;
    this.checkName(ClassName, () => {
      dispatch(
        UpDataState.EditClass({
          func: () => {
            this.ReNameGradeModalCancel();
            dispatch(UpDataState.GetSummary({}));
            dispatch(UpDataState.GetGradeSummary({}));
          },
        })
      );
    });
  };
  //
  onEditNameChange = (e) => {
    let { dispatch } = this.props;
    this.checkName(e.target.value);
    dispatch(
      UpDataState.SetClassData({
        ClassName: e.target.value,
      })
    );
  };
  onEditNameBlur = (e) => {
    let { dispatch } = this.props;
    this.checkName(e.target.value);

    // dispatch(
    //   UpDataState.SetGradeData({
    //     GradeName: e.target.value,
    //   })
    // );
  };
  checkName = (name, func = () => {}) => {
    let { dispatch } = this.props;
    let Test = /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/.test(
      name
    );
    if (name === "") {
      dispatch(UpDataState.SetTips({ ClassReSetTips: "班级名称不能为空" }));
      dispatch(UpDataState.SetTipsVisible({ ClassReSetTipsVisible: true }));
    } else if (!Test) {
      dispatch(UpDataState.SetTips({ ClassReSetTips: "班级名称格式不正确" }));
      dispatch(UpDataState.SetTipsVisible({ ClassReSetTipsVisible: true }));
    } else {
      dispatch(UpDataState.SetTips({ ClassReSetTips: "班级名称不能为空" }));
      dispatch(UpDataState.SetTipsVisible({ ClassReSetTipsVisible: false }));
      func();
    }
  };

  onGradeChange = (e) => {
    let { dispatch } = this.props;

    dispatch(
      UpDataState.SetSelectGradeData({
        ...e,
      })
    );
    dispatch(UpDataState.GetGradeSummary({}));
  };
  onClassSearch = (e) => {
    let { dispatch } = this.props;
    console.log(e);
    dispatch(
      UpDataState.SetClassParams({
        Keyword: e.value,
        CancelBtnShow: "y",
        PageIndex: 0,
      })
    );
    dispatch(UpDataState.GetGradeSummary({}));
  };
  onChangeSearch = (e) => {
    let { dispatch } = this.props;
    dispatch(
      UpDataState.SetClassParams({
        SearchValue: e.target.value,
        // CancelBtnShow:'y'
      })
    );
  };
  onCancelSearch = () => {
    let { dispatch } = this.props;
    dispatch(
      UpDataState.SetClassParams({
        Keyword: "",
        SearchValue: "",
        CancelBtnShow: "n",
        PageIndex: 0,
      })
    );
    dispatch(UpDataState.GetGradeSummary({}));
  };
  onPagiNationChange = (value) => {
    let { dispatch } = this.props;
    dispatch(
      UpDataState.SetClassParams({
        PageIndex: value - 1,
      })
    );
    dispatch(UpDataState.GetGradeSummary({}));
  };
  // 改变显示条目数
  onShowSizeChange = (current, pageSize) => {
    let { dispatch } = this.props;
    dispatch(
      UpDataState.SetClassParams({
        PageSize: pageSize,
        PageIndex: 0,
      })
    );
    dispatch(UpDataState.GetGradeSummary({}));
  };
  render() {
    const {
      DataState: {
        MainData: {
          ClassData: { Total, List },
          GradeData,
        },
        CommonData: {
          ModalVisible: { ClassReSetModalVisible },
          TipsVisible: { ClassReSetTipsVisible },
          Tips: { ClassReSetTips },
          // gradeData: { GradeName, GradeID, InitGradeName },
          ClassData: { ClassName },
          selectGrade,
          UserPower,
          ClassParams: {
            Keyword,
            PageIndex,
            PageSize,
            SearchValue,
            CancelBtnShow,
          },
        },
      },
      PublicState: {
        Loading: { TableLoading },
      },
    } = this.props;
    let GradeList = [{ value: "", title: "全部年级" }];
    GradeData.List instanceof Array &&
      GradeData.List.forEach((child) => {
        GradeList.push({
          value: child.GradeID,
          title: child.GradeName,
        });
      });
    return (
      <Loading
        opacity={false}
        // tip="加载中..."
        size="large"
        spinning={TableLoading}
      >
        <div id="Class" className="Class">
          <div className="content-top">
            <i className="top-icon"></i>
            <div className="top-title">行政班管理</div>
          </div>
          <div className="content-handle">
            <DropDown
              ref="Grade"
              style={{zIndex:10}}
              width={120}
              height={240}
              title="年级："
              dropSelectd={selectGrade}
              dropList={GradeList}
              onChange={this.onGradeChange}
            ></DropDown>
            <Search
              placeHolder="请输入班级名称/教师工号/教师姓名进行搜索..."
              onClickSearch={this.onClassSearch}
              height={30}
              className="Search"
              width={380}
              Value={SearchValue}
              onCancelSearch={this.onCancelSearch}
              onChange={this.onChangeSearch}
              CancelBtnShow={CancelBtnShow}
            ></Search>
          </div>
          <div className="content-main">
            {List instanceof Array && List.length > 0 ? (
              List.map((child, index) => {
                return (
                  <ClassCard
                    onCardClick={this.onCardClick}
                    onReNameClick={this.onReNameClick}
                    onDeleteClick={this.onDeleteClick}
                    key={index}
                    data={child}
                    canControl={UserPower==='Admin'}
                    className={"Card"}
                  ></ClassCard>
                );
              })
            ) : (
              <Empty
                type={"3"}
                title={
                  selectGrade.value === "" || CancelBtnShow === "n"
                    ? "暂无班级"
                    : "暂无符合条件的班级"
                }
                style={{ marginTop: "150px" }}
              ></Empty>
            )}
          </div>
          <div className="pagination-box">
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
        </div>
        <Modal
          ref="ReNameClass"
          bodyStyle={{ padding: 0, height: "150px" }}
          type="1"
          title="重命名"
          width={450}
          visible={ClassReSetModalVisible}
          onOk={this.ReNameGradeModalOk}
          onCancel={this.ReNameGradeModalCancel}
        >
          <RenameModal
            type="class"
            editName={ClassName}
            onEditNameChange={this.onEditNameChange}
            onEditNameBlur={this.onEditNameBlur}
            tipsVivible={ClassReSetTipsVisible}
            tipsTitle={ClassReSetTips}
          ></RenameModal>
        </Modal>
      </Loading>
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
export default connect(mapStateToProps)(Class);
