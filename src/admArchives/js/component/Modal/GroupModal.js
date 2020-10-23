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
import { Scrollbars } from "react-custom-scrollbars";

import { Icon, Table } from "antd";
import history from "../../containers/history";
import { postData, getData } from "../../../../common/js/fetch";
import CONFIG from "../../../../common/js/config";
import actions from "../../actions";
// import "../../scss/Main.scss";
import $ from "jquery";
const { MainAction, CommonAction, PublicAction } = actions;
class GroupModal extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    const { DataState } = nextProps;
  }
  componentDidMount() {}
  // 编辑
  onEditClick = (group) => {
    let {
      dispatch,
      UIState,
      DataState: {
        CommonData: {
          GroupEditParams: { CollegeID, CollegeName },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetGroupEditParams({
        HandleGroupType: "edit", //add,edit,delete
        GroupID: group.value,
        GroupName: group.title,
        HandleGroupCollegeID: CollegeID,
        HandleGroupCollegeName: CollegeName,
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        HandleGroupModalVisible: true,
      })
    );
  };
  // 添加
  addClick = (group) => {
    let {
      dispatch,
      UIState,
      DataState: {
        CommonData: {
          GroupEditParams: { CollegeID, CollegeName },
        },
      },
    } = this.props;

    dispatch(
      CommonAction.SetGroupEditParams({
        HandleGroupType: "add", //add,edit,delete
        GroupID: "",
        GroupName: "",
        HandleGroupCollegeID: CollegeID,
        HandleGroupCollegeName: CollegeName,
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        HandleGroupModalVisible: true,
      })
    );
  };
  // 删除
  onDeleteClick = (data) => {
    let { dispatch } = this.props;

    //  console.log(group)
    dispatch(
      CommonAction.SetGroupEditParams({
        GroupID: data.value,
        GroupName: data.title,
      })
    );
    dispatch(
      PublicAction.showErrorAlert({
        type: "btn-query",
        title: "确定删除该教研室？",
        onOk: () => {
          dispatch(
            MainAction.DeleteGroup({
              data: data.value,
              fn: () => {
                dispatch(
                  PublicAction.showErrorAlert({
                    type: "success",
                    title: "删除成功",
                  })
                );
                dispatch(MainAction.GetTeacherTree({isLoading: false}));
              },
            })
          );
          dispatch(PublicAction.hideErrorAlert());
        },
      })
    );
  };
  ModalCancel = () => {
    let { dispatch } = this.props;
    dispatch(
      CommonAction.SetModalVisible({
        GroupModalVisible: false,
      })
    );
  };
  onCollgeDropChange = (e) => {
    let { dispatch } = this.props;

    dispatch(
      CommonAction.SetGroupEditParams({
        CollegeID: e.value,
        CollegeName: e.title,
      })
    );
  };
  render() {
    const {
      DataState: {
        MainData: {
          TeacherTree: { CollegeList, GroupList: groupList },
          TeacherTree,
          TitleList,
        },
        CommonData: {
          ModalVisible: { GroupModalVisible },
          RolePower: { IsCollege },
          GroupEditParams: { CollegeID, CollegeName },
        },
      },
      PublicState: {
        Loading: { ModalLoading },
      },
    } = this.props;
    let GroupList = [];
    CollegeID  &&
      groupList instanceof Array &&
      groupList.forEach((child) => {
        if (child.CollegeID === CollegeID) {
          GroupList.push(child);
        }
      });
    let isNull = true;
    return (
      <Modal
        ref="UserArchivesModal"
        mask={true}
        width={810}
        footer={null}
        bodyStyle={{ height: 480, padding: 0 }}
        type="1"
        title={"教研室管理"}
        visible={GroupModalVisible}
        className="GroupModal"
        onCancel={this.ModalCancel}
      >
        <Loading
          opacity={0.5}
          tip="处理中..."
          size="small"
          spinning={ModalLoading}
        >
          <div className="ModalContent">
            <div className="addclass-select-grade" style={{ zIndex: 10 }}>
              <span className="props">学院:</span>

              {!IsCollege ? (
                <DropDown
                  style={{ zIndex: 10 }}
                  width={150}
                  dropSelectd={{ value: CollegeID, title: CollegeName }}
                  onChange={this.onCollgeDropChange}
                  dropList={CollegeList}
                  height={200}
                ></DropDown>
              ) : (
                <span className="CollegeName" title={CollegeName}>
                  {CollegeName ? CollegeName : "--"}
                </span>
              )}
              <span className="addGroup" onClick={this.addClick}>
                添加教研室
              </span>
            </div>
            <div className="group-box">
              <Scrollbars style={{ height: "360px", width: "100%" }}>
                {GroupList instanceof Array && GroupList.length > 0 ? (
                  GroupList.map((child, index) => {
                    if (child.IsUngroup === 1) {
                      if (GroupList.length - 1 === index && isNull) {
                        return (
                          <Empty
                            key={index}
                            title={"暂无教研室"}
                            type="3"
                            style={{ marginTop: "120px" }}
                          ></Empty>
                        );
                      } else {
                        return "";
                      }
                    } else {
                      isNull = false;
                      return (
                        <div key={index} className="group-content">
                          <span className="group-name">{child.title}</span>
                          <div className="edit-box">
                            <span
                              onClick={this.onEditClick.bind(this, child)}
                              className="edit"
                            >
                              {/* 编辑 */}
                            </span>
                            <span
                              onClick={this.onDeleteClick.bind(this, child)}
                              className="delete"
                            >
                              {/* 删除 */}
                            </span>
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <Empty
                    title={"暂无教研室"}
                    type="3"
                    style={{ marginTop: "120px" }}
                  ></Empty>
                )}
              </Scrollbars>
            </div>
          </div>
        </Loading>
      </Modal>
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
export default connect(mapStateToProps)(GroupModal);
