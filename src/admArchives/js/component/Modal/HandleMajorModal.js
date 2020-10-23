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
  Tips,
} from "../../../../common";
import { connect } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

import { Icon, Table, Input } from "antd";
import history from "../../containers/history";
import { postData, getData } from "../../../../common/js/fetch";
import CONFIG from "../../../../common/js/config";
import actions from "../../actions";
// import "../../scss/Main.scss";
import $ from "jquery";
const { MainAction, CommonAction, PublicAction, util } = actions;
class HandleMajorModal extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    const { DataState } = nextProps;
  }
  componentDidMount() {}
  ModalOk = () => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          MajorEditParams: { HandleMajorType, MajorName },
        },
      },
    } = this.props;
    let fn = "";
    let TipsName = "添加";
    if (HandleMajorType === "add") {
      fn = MainAction.AddMajor;
      TipsName = "添加";
    } else {
      fn = MainAction.EditMajor;
      TipsName = "编辑";
    }

    dispatch(
      util.checkMajorName({
        value: MajorName,
        success: () => {
          dispatch(
            fn({
              fn: () => {
                this.ModalCancel();
                dispatch(
                  PublicAction.showErrorAlert({
                    type: "success",
                    title: TipsName + "成功",
                  })
                );
                dispatch(MainAction.GetTree({isLoading: false}));
              },
            })
          );
        },
      })
    );
  };
  ModalCancel = () => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetTipsVisibleParams({
        MajorTipsVisible: false,
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        HandleMajorModalVisible: false,
      })
    );
    dispatch(
      CommonAction.SetMajorEditParams({
        HandleMajorType: "add", //add,edit,delete
        MajorID: "",
        MajorName: "",
        HandleMajorCollegeID: "",
        HandleMajorCollegeName: "",
      })
    );
  };
  onCollgeDropChange = (e) => {
    let { dispatch } = this.props;

    dispatch(
      CommonAction.SetMajorEditParams({
        HandleMajorCollegeID: e.value,
        HandleMajorCollegeName: e.title,
      })
    );
  };
  onInpuChange = (e) => {
    let { dispatch } = this.props;

    dispatch(
      CommonAction.SetMajorEditParams({
        MajorName: e.target.value.trim(),
      })
    );
  };
  onInpuBlur = (e) => {
    let { dispatch } = this.props;
    dispatch(
      util.checkMajorName({
        value: e.target.value,
        success: () => {
          dispatch(
            CommonAction.SetMajorEditParams({
              MajorName: e.target.value,
            })
          );
        },
      })
    );
  };
  render() {
    const {
      DataState: {
        MainData: {
          StudentTree: { CollegeList, MajorList: majorList },
          TeacherTree,
          TitleList,
        },
        CommonData: {
          ModalVisible: { HandleMajorModalVisible },
          TipsVisible: { HandleMojorTipsVisible, MajorNameTipsVisible },
          TipsTitle: { HandleMojorTipsTitle },
          RolePower: { IsCollege },
          MajorEditParams: {
            CollegeID,
            CollegeName,
            HandleMajorType,
            MajorID,
            MajorName,
            HandleMajorCollegeID,
            HandleMajorCollegeName,
          },
        },
      },
      PublicState: {
        Loading: { ModalLoading },
      },
    } = this.props;
    // let MajorList = [];
    // CollegeID !== "" &&
    //   majorList instanceof Array &&
    //   majorList.forEach((child) => {
    //     if (child.CollegeID === CollegeID) {
    //       MajorList.push(child);
    //     }
    //   });
    let isNull = true;
    return (
      // <div id="HandleMajorModal"  >
      <Modal
        ref="UserArchivesModal"
        mask={true}
        width={400}
        bodyStyle={{ height: 130, padding: 0 }}
        type="1"
        title={HandleMajorType === "add" ? "添加专业" : "编辑专业"}
        visible={HandleMajorModalVisible}
        className="HandleMajorModal"
        onCancel={this.ModalCancel}
        onOk={this.ModalOk}
      >
        <Loading
          opacity={0.5}
          tip="处理中..."
          size="small"
          spinning={ModalLoading}
        >
          <div className="ModalContent">
            <div className="addclass-select-grade" style={{ zIndex: 10 }}>
              <span className="props">选择学院:</span>

              {HandleMajorType === "add" && !IsCollege ? (
                <DropDown
                  style={{ zIndex: 10 }}
                  width={150}
                  dropSelectd={{
                    value: HandleMajorCollegeID,
                    title: HandleMajorCollegeName,
                  }}
                  onChange={this.onCollgeDropChange}
                  dropList={CollegeList}
                  height={200}
                ></DropDown>
              ) : (
                <span title={HandleMajorCollegeName}>
                  {HandleMajorCollegeName ? HandleMajorCollegeName : "--"}
                </span>
              )}
            </div>
            <div className="addclass-select-grade">
              {" "}
              <span className="props">专业名称:</span>
              <Tips
                // placement="bottom"
                visible={MajorNameTipsVisible}
                title={HandleMojorTipsTitle}
              >
                <Input
                  type="text"
                  value={MajorName}
                  placeholder="请输入专业名称..."
                  onChange={this.onInpuChange}
                  onBlur={this.onInpuBlur}
                  //   disabled={gradeSelectd.valu ? false : true}
                />
              </Tips>
            </div>
          </div>
        </Loading>
      </Modal>
      // </div>
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
export default connect(mapStateToProps)(HandleMajorModal);
