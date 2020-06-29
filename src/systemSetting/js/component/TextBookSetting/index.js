import React, { Component } from "react";

import { TokenCheck_Connect } from "../../../../common/js/disconnect";

import setting from "../../../images/setting_logo.png";
import { Modal, Loading } from "../../../../common";
import AppAlertAction from "../../action/UI/AppAlertAction";

import config from "../../../../common/js/config";
import history from "../../containers/history";
import { QueryPower } from "../../../../common/js/power";
import versionChenck from "../../../../common/js/public";

import UpDataState from "../../action/data/UpDataState";
import { Collapse, Icon, Select, Table } from "antd";
import PeriodTable from "./PeriodTable";
import SetTextBookModal from "./SetTextBookModal";
import TextBookMsgModal from "./TextBookMsgModal";
import { connect } from "react-redux";

const { Panel } = Collapse;
class TextBookSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    props.dispatch(UpDataState.GetSubjectListData({}));
    // props.dispatch(
    //   UpDataState.SetTextBookInitData({
    //     Subject: {
    //       SubjectID: 123,
    //       SubjectName: "学科",
    //     },
    //     Grade: {
    //       GradeID: 123,
    //       GradeName: "年级",
    //     },
    //     Period: {
    //       PeriodID: 123,
    //       PeriodName: "学期",
    //     },
    //     TextBook: {
    //       TextBookID: 123,
    //       TextBookName: "教材",
    //     },
    //   })
    // );
    // props.dispatch(
    //   UpDataState.SetTextBookModalParams({ SetTextBookModalVisible: true })
    // );
    // props.dispatch(
    //   UpDataState.SetNodeInfoData({ TextBookModalVisible: true })
    // );
  }
  // 抽屉change
  onCollapseChange = (value) => {
    const { dispatch } = this.props;
    console.log(value);
    dispatch(
      UpDataState.SetOpenSubjectData({
        OpenList: value,
      })
    );
  };
  // 设置
  onEditClick = (data) => {
    const { dispatch } = this.props;
    dispatch(
      UpDataState.SetTextBookInitData({
        Subject: data.Subject,
        Grade: data.Grade,
        Period: data.Period,
        TextBook: data.TextBook,
      })
    );
    dispatch(
      UpDataState.SetTextBookModalParams({ SetTextBookModalVisible: true })
    );
    dispatch(
      UpDataState.GetTextBookList({
        subjectId:data.Subject.SubjectID,
        gradeId:data.Grade.GradeID,
        // subjectId: "",
        // gradeId: "",
      })
    );
  };
  // 详情
  onTextBookDetailClick = (id) => {
    const { dispatch } = this.props;
    dispatch(
      UpDataState.GetNodeInfoData({
        upId: id,
      })
    );
  };
  // 设置modal ok
  setTextBookModalOk = () => {
    const { dispatch, DataState } = this.props;
    let {
      Subject,
      Grade,
      TextBook,
      Period,
    } = DataState.TextBookParams.SetTextBook.TextBookMsg;
    if (!TextBook.TextBookId) {
      dispatch(
        AppAlertAction.alertError({ type: "btn-warn", title: `请选择教材` })
      );

      return;
    }
    dispatch(
      UpDataState.SetTextBookInfoData({
        subjectId: Subject.SubjectID,
        gradeId: Grade.GradeID,
        textbookId: TextBook.TextBookId,
        periodId: Period.PeriodID,
        func: () => {
          dispatch(
            UpDataState.SetTextBookModalParams({
              SetTextBookModalVisible: false,
            })
          );
          dispatch(
            UpDataState.SetTextBookInitData({
              ...DataState.TextBookParams.SetTextBook.CopyTextBookMsg,
            })
          );
          
          dispatch(
            UpDataState.GetSubjectListData({
              isFirstLoad: false,
              func: (State) => {
                // let {
                //   OpenList,
                // } = State.DataState.TextBookParams.SelectSubjects;
                // OpenList instanceof Array &&
                //   OpenList.map((subjectId) => {
                    dispatch(UpDataState.GetSubjectInfoData({ subjectId:Subject.SubjectID }));
                  // });
              },
            })
          );
        },
      })
    );
  };
  setTextBookModalCancel = () => {
    const { dispatch, DataState } = this.props;

    dispatch(
      UpDataState.SetTextBookInitData({
        ...DataState.TextBookParams.SetTextBook.CopyTextBookMsg,
      })
    );
    dispatch(
      UpDataState.SetTextBookModalParams({ SetTextBookModalVisible: false })
    );
  };
  TextBookMsgModalOk = () => {
    const { dispatch, DataState } = this.props;

    // dispatch(
    //   UpDataState.GetNodeInfoData({
    //     ...DataState.TextBookParams.SetTextBook.CopyTextBookMsg
    //   })
    // );
    dispatch(UpDataState.SetNodeInfoData({ TextBookModalVisible: false }));
  };
  TextBookMsgModalCancel = () => {
    const { dispatch, DataState } = this.props;

    // dispatch(
    //   UpDataState.GetNodeInfoData({
    //     ...DataState.TextBookParams.SetTextBook.CopyTextBookMsg
    //   })
    // );
    dispatch(UpDataState.SetNodeInfoData({ TextBookModalVisible: false }));
  };
  render() {
    const { DataState } = this.props;
    let {
      OpenList,
      SubjectsLoading,
      SelectSubjectsLoading,
    } = DataState.TextBookParams.SelectSubjects;
    let { SubjectList } = DataState.TextBookData.SubjectList;
    let { SubjectInfoForKey } = DataState.TextBookData.SubjectInfo;
    let { SetTextBookModalVisible } = DataState.TextBookParams.SetTextBook;
    let { TextBookModalVisible } = DataState.TextBookParams.NodeInfo;
    return (
      <div className="TextBookSetting" id="TextBookSetting">
        <div className="guide">
          <i className="TextBook-logo"></i>
          <span className="TextBook-title">教材设置</span>
        </div>
        <div className="TextBook-content">
          <Loading spinning={SubjectsLoading} opacity={false} tip="请稍候...">
            <Collapse
              activeKey={OpenList}
              className={"Subject-Collapse"}
              onChange={this.onCollapseChange.bind(this)}
              expandIconPosition={"right"}
            >
              {SubjectList instanceof Array &&
                SubjectList.map((child) => {
                  return (
                    <Panel
                      header={
                        <div>
                          <i
                            className="Subject-logo"
                            style={{
                              backgroundImage: "url(" + child.SubjectImg + ")",
                              backgroundPosition: "center",
                              backgroundSize: "80px 50px",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></i>
                          <span className="Subject-title">{child.title}</span>
                          <span className="set-num">
                            已设置
                            <span className="set-num-red">
                              {child.Accomplished}
                            </span>
                            /{child.Total}
                          </span>
                        </div>
                      }
                      className="Subject-panel"
                      key={child.value}
                    >
                      <Loading
                        spinning={SelectSubjectsLoading[child.value]}
                        opacity={false}
                      >
                        <div className="Subject-panel-box">
                          {SubjectInfoForKey[child.value] instanceof Array &&
                            SubjectInfoForKey[child.value].map(
                              (Period, index) => {
                                return (
                                  <PeriodTable
                                    className="period-box"
                                    key={index}
                                    title={Period.PeriodName}
                                    data={Period.List}
                                    onEditClick={this.onEditClick}
                                    onTextBookDetailClick={
                                      this.onTextBookDetailClick
                                    }
                                  ></PeriodTable>
                                );
                              }
                            )}
                        </div>
                      </Loading>
                    </Panel>
                  );
                })}
            </Collapse>
          </Loading>
        </div>
        <Modal
          ref="setTextBookModal"
          bodyStyle={{ padding: 0, height: "250px" }}
          type="1"
          width={680}
          title={"设置教材"}
          visible={SetTextBookModalVisible}
          onOk={this.setTextBookModalOk}
          onCancel={this.setTextBookModalCancel}
        >
          {SetTextBookModalVisible ? <SetTextBookModal></SetTextBookModal> : ""}
        </Modal>
        <Modal
          ref="setTextBookModal"
          bodyStyle={{ padding: 0, height: "400px" }}
          type="1"
          width={600}
          title={"教材详细信息"}
          visible={TextBookModalVisible}
          onOk={this.TextBookMsgModalOk}
          onCancel={this.TextBookMsgModalCancel}
        >
          {TextBookModalVisible ? <TextBookMsgModal></TextBookMsgModal> : ""}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(TextBookSetting);
