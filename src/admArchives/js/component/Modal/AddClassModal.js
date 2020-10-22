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
class AddClassModal extends Component {
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
          UserArchivesParams: { AddClassName },
        },
      },
    } = this.props;

    dispatch(
      util.checkClassName({
        value: AddClassName,
        success: () => {
          dispatch(
            MainAction.AddClass({
              fn: () => {
                this.ModalCancel();
                dispatch(
                  PublicAction.showErrorAlert({
                    type: "success",
                    title: "添加成功",
                  })
                );
                dispatch(MainAction.GetTree({ isLoading: false }));
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
        ClassNameTipsVisible: false,
      })
    );
    dispatch(
      CommonAction.SetModalVisible({
        AddClassModalVisible: false,
      })
    );
    dispatch(
      CommonAction.SetUserArchivesParams({
        AddClassName: "",
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
      CommonAction.SetUserArchivesParams({
        AddClassName: e.target.value,
      })
    );
  };
  onInpuBlur = (e) => {
    let { dispatch } = this.props;
    dispatch(
      util.checkClassName({
        value: e.target.value,
        success: () => {
          dispatch(
            CommonAction.SetUserArchivesParams({
              AddClassName: e.target.value,
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
          ModalVisible: { AddClassModalVisible },
          TipsVisible: { HandleMojorTipsVisible, ClassNameTipsVisible },
          TipsTitle: { AddClassTipsTitle },
          RolePower: { IsCollege },
          UserArchivesParams: { AddClassID, AddClassName },
          EditUserArchivesData: {
            CollegeID,
            CollegeName,
            HandleMajorType,
            MajorID,
            MajorName,
            GradeID,
            GradeName,
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
      // <div id="AddClassModal"  >
      <Modal
        ref="UserArchivesModal"
        mask={true}
        width={400}
        bodyStyle={{ height: 200, padding: 0 }}
        type="1"
        title={"添加班级"}
        visible={AddClassModalVisible}
        className="AddClassModal"
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
              <span className="props">学院:</span>
              <span title={CollegeName} className="title">
                {CollegeName ? CollegeName : "--"}
              </span>
            </div>
            <div className="addclass-select-grade" style={{ zIndex: 10 }}>
              <span className="props">专业:</span>
              <span title={MajorName} className="title">
                {MajorName ? MajorName : "--"}
              </span>
            </div>
            <div className="addclass-select-grade" style={{ zIndex: 10 }}>
              <span className="props">年级:</span>
              <span title={GradeName} className="title">
                {GradeName ? GradeName : "--"}
              </span>
            </div>
            <div className="addclass-select-grade">
              {" "}
              <span className="props">班级名称:</span>
              <Tips
                // placement="bottom"
                visible={ClassNameTipsVisible}
                title={AddClassTipsTitle}
              >
                <Input
                  type="text"
                  value={AddClassName}
                  placeholder="请输入班级名称..."
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
export default connect(mapStateToProps)(AddClassModal);
