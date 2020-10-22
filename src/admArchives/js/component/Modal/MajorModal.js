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
class MajorModal extends Component {
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
  onEditClick = (major) => {
    let {
      dispatch,
      UIState,
      DataState: {
        CommonData: {
          MajorEditParams: { CollegeID, CollegeName },
        },
      },
    } = this.props;
    dispatch(
      CommonAction.SetMajorEditParams({
        HandleMajorType: "edit", //add,edit,delete
        MajorID: major.value,
        MajorName: major.title,
        HandleMajorCollegeID: CollegeID,
        HandleMajorCollegeName: CollegeName,
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        HandleMajorModalVisible: true,
      })
    );
  };
  // 添加
  addClick = (major) => {
    let {
      dispatch,
      UIState,
      DataState: {
        CommonData: {
          MajorEditParams: { CollegeID, CollegeName },
        },
      },
    } = this.props;

    dispatch(
      CommonAction.SetMajorEditParams({
        HandleMajorType: "add", //add,edit,delete
        MajorID: "",
        MajorName: "",
        HandleMajorCollegeID: CollegeID,
        HandleMajorCollegeName: CollegeName,
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        HandleMajorModalVisible: true,
      })
    );
  };
  // 删除
  onDeleteClick = (data) => {
    let { dispatch } = this.props;

    //  console.log(group)
    dispatch(
      PublicAction.showErrorAlert({
        type: "btn-query",
        title: "确定删除该专业？",
        onOk: () => {
          dispatch(
            MainAction.DeleteMajor({
              data: data.value,
              fn: () => {
                dispatch(
                  PublicAction.showErrorAlert({
                    type: "success",
                    title: "删除成功",
                  })
                );
                dispatch(MainAction.GetTree({isLoading: false}));
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
        MajorModalVisible: false,
      })
    );
  };
  onCollgeDropChange = (e) => {
    let { dispatch } = this.props;

    dispatch(
      CommonAction.SetMajorEditParams({
        CollegeID: e.value,
        CollegeName: e.title,
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
          ModalVisible: { MajorModalVisible },
          RolePower: { IsCollege },
          MajorEditParams: { CollegeID, CollegeName },
        },
      },
      PublicState: {
        Loading: { ModalLoading },
      },
    } = this.props;
    let MajorList = [];
    CollegeID  &&
      majorList instanceof Array &&
      majorList.forEach((child) => {
        if (child.CollegeID === CollegeID) {
          MajorList.push(child);
        }
      });
    let isNull = true;
    console.log(CollegeList,IsCollege)
    return (
      <Modal
        ref="UserArchivesModal"
        mask={true}
        width={810}
        footer={null}
        bodyStyle={{ height: 480, padding: 0 }}
        type="1"
        title={"专业管理"}
        visible={MajorModalVisible}
        className="MajorModal"
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
                添加专业
              </span>
            </div>
            <div className="major-box">
              <Scrollbars style={{ height: "360px", width: "100%" }}>
                {MajorList instanceof Array && MajorList.length > 0 ? (
                  MajorList.map((child, index) => {
                    if (child.value === 0) {
                      if (MajorList.length - 1 === index && isNull) {
                        return (
                          <Empty
                            key={index}
                            title={"暂无专业"}
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
                        <div key={index} className="major-content">
                          <span className="major-name">{child.title}</span>
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
                    title={"暂无专业"}
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
export default connect(mapStateToProps)(MajorModal);
