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
class HandleGroupModal extends Component {
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
          GroupEditParams: { HandleGroupType, GroupName },
        },
      },
    } = this.props;
    let fn = "";
    let TipsName = "添加";
    if (HandleGroupType === "add") {
      fn = MainAction.AddGroup;
      TipsName = "添加";
    } else {
      fn = MainAction.EditGroup;
      TipsName = "编辑";
    }

    dispatch(
      util.checkGroupName({
        value: GroupName,
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
                dispatch(MainAction.GetTeacherTree({isLoading: false}));
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
        GroupTipsVisible: false,
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        HandleGroupModalVisible: false,
      })
    );
    dispatch(
      CommonAction.SetGroupEditParams({
        HandleGroupType: "add", //add,edit,delete
        GroupID: "",
        GroupName: "",
        HandleGroupCollegeID: "",
        HandleGroupCollegeName: "",
      })
    );
  };
  onCollgeDropChange = (e) => {
    let { dispatch } = this.props;

    dispatch(
      CommonAction.SetGroupEditParams({
        HandleGroupCollegeID: e.value,
        HandleGroupCollegeName: e.title,
      })
    );
  };
  onInpuChange = (e) => {
    let { dispatch } = this.props;

    dispatch(
      CommonAction.SetGroupEditParams({
        GroupName: e.target.value.trim(),
      })
    );
  };
  onInpuBlur = (e) => {
    let { dispatch } = this.props;
    dispatch(
      util.checkGroupName({
        value: e.target.value,
        success: () => {
          dispatch(
            CommonAction.SetGroupEditParams({
              GroupName: e.target.value,
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
          StudentTree: { CollegeList, GroupList: groupList },
          TeacherTree,
          TitleList,
        },
        CommonData: {
          ModalVisible: { HandleGroupModalVisible },
          TipsVisible: { HandleMojorTipsVisible, GroupNameTipsVisible },
          TipsTitle: { HandleMojorTipsTitle },
          RolePower: { IsCollege },
          GroupEditParams: {
            CollegeID,
            CollegeName,
            HandleGroupType,
            GroupID,
            GroupName,
            HandleGroupCollegeID,
            HandleGroupCollegeName,
          },
        },
      },
      PublicState: {
        Loading: { ModalLoading },
      },
    } = this.props;
    // let GroupList = [];
    // CollegeID !== "" &&
    //   groupList instanceof Array &&
    //   groupList.forEach((child) => {
    //     if (child.CollegeID === CollegeID) {
    //       GroupList.push(child);
    //     }
    //   });
    let isNull = true;
    return (
      // <div id="HandleGroupModal"  >
      <Modal
        ref="UserArchivesModal"
        mask={true}
        width={400}
        bodyStyle={{ height: 130, padding: 0 }}
        type="1"
        title={HandleGroupType === "add" ? "添加教研室" : "编辑教研室"}
        visible={HandleGroupModalVisible}
        className="HandleGroupModal"
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

              {HandleGroupType === "add" && !IsCollege ? (
                <DropDown
                  style={{ zIndex: 10 }}
                  width={150}
                  dropSelectd={{
                    value: HandleGroupCollegeID,
                    title: HandleGroupCollegeName,
                  }}
                  onChange={this.onCollgeDropChange}
                  dropList={CollegeList}
                  height={200}
                ></DropDown>
              ) : (
                <span title={HandleGroupCollegeName}>
                  {HandleGroupCollegeName ? HandleGroupCollegeName : "--"}
                </span>
              )}
            </div>
            <div className="addclass-select-grade">
              {" "}
              <span className="props">教研室名称:</span>
              <Tips
                // placement="bottom"
                visible={GroupNameTipsVisible}
                title={HandleMojorTipsTitle}
              >
                <Input
                  type="text"
                  value={GroupName}
                  placeholder="请输入教研室名称..."
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
export default connect(mapStateToProps)(HandleGroupModal);
