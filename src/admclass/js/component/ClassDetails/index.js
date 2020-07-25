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
  DetailsModal,
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
import Admin from "./Admin";
import Student from "./Student";
import Teacher from "./Teacher";
import SetGanderModal from "../Modal/SetGanderModal";
import ReSetStudentClassModal from "../Modal/ReSetStudentClassModal";

import "../../../scss/ClassDetails.scss";
import $ from "jquery";
const { UpDataState, UpUIState, PublicAction } = actions;
class ClassDetails extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    const { DataState } = nextProps;
  }
  componentDidMount() {}

  //
  onSetGanderModalOk = () => {
    let {
      dispatch,
      DataState: {
        CommonData: { ClassDetailsParams, SelectGanderData },
      },
    } = this.props;
    if (!SelectGanderData.IsSet) {
      dispatch(
        PublicAction.showErrorAlert({ title: "请选择需要设置为班主任的教师" })
      );
    } else {
      dispatch(
        UpDataState.SetGanger({
          func: () => {
            dispatch(UpDataState.GetClassTeacher({}));
            dispatch(
              UpDataState.SetClassDetailsParams({
                CheckAll: false,
                CheckList: [],
              })
            );

            dispatch(UpDataState.GetStudentToPage({}));

            dispatch(
              PublicAction.showErrorAlert({
                type: "success",
                title: "操作成功",
              })
            );
            window.opener.location.reload();
          },
        })
      );
    }
  };
  onSetGanderModalCancel = () => {
    let { dispatch } = this.props;
    dispatch(
      UpDataState.SetSelectGanderData({
        IsSet: false,
        UserID: "",
        UserName: "",
        PhotoPath: "",
      })
    );
    dispatch(
      UpDataState.SetSubjectTeacherParams({
        CancelBtnShow: "n",
        SearchValue: "",
        Keyword: "",
        SubjectIDs: "all",
        SUbjectNames: "全部学科",
      })
    );
    dispatch(
      UpDataState.SetModalVisible({
        EditGangerModalVisible: false,
      })
    );
  };
  onReSetStudentClassModalOk = () => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          ResetClassParams: { Class },
          SelectGanderData,
        },
      },
    } = this.props;
    if (Class.value === "") {
      dispatch(
        UpDataState.SetTipsVisible({
          ResetClassTipsVisible: true,
          // Class:{value:'',title:'请选择班级'},
        })
      );
    } else {
      dispatch(
        UpDataState.ReSetStudentClass({
          func: () => {
            dispatch(
              UpDataState.SetClassDetailsParams({
                CheckAll: false,
                CheckList: [],
              })
            );
            dispatch(UpDataState.GetStudentToPage({}));
            this.onReSetStudentClassModalCancel();
            dispatch(
              PublicAction.showErrorAlert({
                type: "success",
                title: "操作成功",
              })
            );
            window.opener.location.reload();
          },
        })
      );
    }
  };
  onReSetStudentClassModalCancel = () => {
    let { dispatch } = this.props;
    dispatch(
      UpDataState.SetResetClassParams({
        Grade: { value: "", title: "请选择年级" },
        Class: { value: "", title: "请选择班级" },
      })
    );
    dispatch(
      UpDataState.SetModalVisible({
        ReSetStudentClassModalVisible: false,
      })
    );
  };
  DetailsMsgModalOk = () => {
    let { dispatch } = this.props;

    dispatch(UpDataState.SetModalVisible({ DetailsMsgModalVisible: false }));
  };
  DetailsMsgModalCancel = () => {
    let { dispatch } = this.props;

    dispatch(UpDataState.SetModalVisible({ DetailsMsgModalVisible: false }));
  };
  render() {
    const {
      DataState: {
        MainData: { ClassTeacherData, SubjectData, UserDetail },
        CommonData: {
          UserPower,
          ModalVisible: {
            ReSetStudentClassModalVisible,
            EditGangerModalVisible,
            DetailsMsgModalVisible,
          },
          ClassDetailsParams,
          DetailsModalRole,
        },
      },
      PublicState: {
        Loading: { TableLoading, ModalLoading },
      },
    } = this.props;

    return (
      <Loading
        opacity={false}
        // tip="加载中..."
        size="large"
        spinning={TableLoading}
      >
        {ClassTeacherData.ClassID === ClassDetailsParams.ClassID ? (
          <React.Fragment>
            {UserPower === "Admin" || UserPower === "TeachingLeader" ? (
              <Admin></Admin>
            ) : (
              ""
            )}
            {UserPower === "Student" ? <Student></Student> : ""}
            {UserPower === "Teacher" ? <Teacher></Teacher> : ""}
          </React.Fragment>
        ) : (
          <Empty
            type={"3"}
            title={"暂无班级"}
            style={{ marginTop: "200px" }}
          ></Empty>
        )}
        {/* <div id="ClassDetails" className="ClassDetails"> */}

        {/* </div> */}
        <Modal
          ref="setGander"
          bodyStyle={{ padding: 0, height: "536px" }}
          type="1"
          title="设置班主任"
          width={1000}
          visible={EditGangerModalVisible}
          onOk={this.onSetGanderModalOk}
          onCancel={this.onSetGanderModalCancel}
        >
          <Loading
            opacity={false}
            // tip="加载中..."
            size="large"
            spinning={ModalLoading}
          >
            <SetGanderModal></SetGanderModal>
          </Loading>
        </Modal>
        <Modal
          ref="ReSetStudentClass"
          bodyStyle={{ padding: 0, height: "216px" }}
          type="1"
          title="调班"
          width={540}
          visible={ReSetStudentClassModalVisible}
          onOk={this.onReSetStudentClassModalOk}
          onCancel={this.onReSetStudentClassModalCancel}
        >
          <Loading
            opacity={false}
            // tip="加载中..."
            size="large"
            spinning={ModalLoading}
          >
            <ReSetStudentClassModal></ReSetStudentClassModal>
          </Loading>
        </Modal>
        <DetailsModal
          ref="DetailsMsgModal"
          visible={DetailsMsgModalVisible}
          module={1}
          onOk={this.DetailsMsgModalOk}
          onCancel={this.DetailsMsgModalCancel}
          data={UserDetail}
          type={DetailsModalRole}
        ></DetailsModal>
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
export default connect(mapStateToProps)(ClassDetails);
