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
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import actions from "../actions";
import "../../scss/Grade.scss";
import $ from "jquery";
import GradeCard from "./Cards/GradeCard";
import RenameModal from "./Modal/RenameModal";
const { UpDataState, UpUIState, PublicAction } = actions;
class Grade extends Component {
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
        GradeReSetModalVisible: true,
      })
    );
    dispatch(
      UpDataState.SetGradeData({
        GradeName: data.GradeName,
        GradeID: data.GradeID,
        InitGradeName: data.GradeName,
      })
    );
    console.log(data);
  };
  onCardClick = (data) => {
    let { dispatch } = this.props;

    dispatch(
      UpDataState.SetSelectGradeData({
        value: data.GradeID,
        title: data.GradeName,
      })
    );
    history.push("Class");
    console.log(data);
  };
  ReNameGradeModalCancel = () => {
    let { dispatch } = this.props;
    dispatch(
      UpDataState.SetModalVisible({
        GradeReSetModalVisible: false,
      })
    );
    dispatch(
      UpDataState.SetGradeData({
        GradeName: "",
        GradeID: "",
        InitGradeName: "",
      })
    );
    dispatch(UpDataState.SetTips({ GradeReSetTips: "年级名称不能为空" }));
    dispatch(UpDataState.SetTipsVisible({ GradeReSetTipsVisible: false }));
  };
  ReNameGradeModalOk = () => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          gradeData: { GradeName, GradeID, InitGradeName },
        },
      },
    } = this.props;
    this.checkName(GradeName, () => {
      this.ReNameGradeModalCancel();
    });
  };
  //
  onEditNameChange = (e) => {
    let { dispatch } = this.props;
    this.checkName(e.target.value.trim());
    dispatch(
      UpDataState.SetGradeData({
        GradeName: e.target.value.trim(),
      })
    );
  };
  onEditNameBlur = (e) => {
    let { dispatch } = this.props;
    this.checkName(e.target.value.trim());

    // dispatch(
    //   UpDataState.SetGradeData({
    //     GradeName: e.target.value.trim(),
    //   })
    // );
  };
  checkName = (name, func = () => {}) => {
    let { dispatch } = this.props;
    let Test = /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/.test(
      name
    );
    if (name === "") {
      dispatch(UpDataState.SetTips({ GradeReSetTips: "年级名称不能为空" }));
      dispatch(UpDataState.SetTipsVisible({ GradeReSetTipsVisible: true }));
    } else if (!Test) {
      dispatch(UpDataState.SetTips({ GradeReSetTips: "年级名称格式不正确" }));
      dispatch(UpDataState.SetTipsVisible({ GradeReSetTipsVisible: true }));
    } else {
      dispatch(UpDataState.SetTips({ GradeReSetTips: "年级名称不能为空" }));
      dispatch(UpDataState.SetTipsVisible({ GradeReSetTipsVisible: false }));
      func();
    }
  };
  render() {
    const {
      DataState: {
        MainData: {
          GradeData: { List },
        },
        CommonData: {
          ModalVisible: { GradeReSetModalVisible },
          TipsVisible: { GradeReSetTipsVisible },
          Tips: { GradeReSetTips },
          UserPower,
          gradeData: { GradeName, GradeID, InitGradeName },
        },
      },
      PublicState: {
        Loading: { TableLoading },
      },
    } = this.props;

    return (
      <Loading
        opacity={false}
        // tip="加载中..."
        size="large"
        spinning={TableLoading}
      >
        <div id="Grade" className="Grade">
          <div className="content-top">
            <i className="top-icon"></i>
            <div className="top-title">年级管理</div>
          </div>
          <div className="content-main">
            {List instanceof Array && List.length > 0 ? (
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
            )}
          </div>
        </div>
        <Modal
          ref="ReNameGrade"
          bodyStyle={{ padding: 0, height: "150px" }}
          type="1"
          title="重命名"
          width={450}
          visible={GradeReSetModalVisible}
          onOk={this.ReNameGradeModalOk}
          onCancel={this.ReNameGradeModalCancel}
        >
          <RenameModal
            type="grade"
            editName={GradeName}
            onEditNameChange={this.onEditNameChange}
            onEditNameBlur={this.onEditNameBlur}
            tipsVivible={GradeReSetTipsVisible}
            tipsTitle={GradeReSetTips}
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
export default connect(mapStateToProps)(Grade);
