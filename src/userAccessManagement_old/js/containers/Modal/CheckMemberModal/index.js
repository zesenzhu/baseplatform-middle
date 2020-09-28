import React, { Component } from "react";
import {
  Menu,
  Loading,
  Alert,
  Modal,
  // Frame,
  Button,
  Empty,
  Search,
  Tips,
  DetailsModal,
  Table,
  CheckBox,
  CheckBoxGroup,
} from "../../../../../common";
import { connect } from "react-redux";
import { Modal as AntdModal, Input } from "antd";
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  // IndexRedirect ,
  BrowserRouter,
} from "react-router-dom";
import { IndexRedirect } from "react-router";
import history from "../../../config/history";
//import TimeBanner from '../component/TimeBanner'
import CONFIG from "../../../../../common/js/config";
import DefaultIndentityUser from "./DefaultIndentityUser";
import CustomIndentityUser from "./CustomIndentityUser";

import { HandleAction, DataAction, PublicAction } from "../../../actions";
import Public from "../../../../../common/js/public";
import Scrollbars from "react-custom-scrollbars";
// import Table from "../../component/Table";
let { getQueryVariable, setRole, ArrayNoRepeat } = Public;
// const { HandleAction, DataAction, PublicAction } = actions;
class CheckMemberModal extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }

  onModalCancel = () => {
    let {
      dispatch,
      HandleState: {
        ParamsData: {
          CheckMember: { type },
        },
      },
    } = this.props;
    dispatch(HandleAction.SetModalVisible({ CheckMemberModalVisible: false }));
    if (type === "edit") {
      dispatch(DataAction.GetIdentityTypeList({}));
    }
    dispatch(
      HandleAction.ParamsSetCheckMember({
        IdentityID: "",
        IdentityCode: "",
        IdentityName: "",
        UserType: [],
        Description: "",
        PageIndex: 0,
        PageSize: 10,
        type: "custom", //自定义：custom,id的为默认
      })
    );
    dispatch({type:DataAction.GET_INDENTITY_USER,data:[]})
    dispatch(PublicAction.ContentLoadingClose());
  };

  render() {
    const {
      HandleState: {
        ParamsData: {
          CheckMember: {
            PageSize,
            UserType,
            IdentityName,
            type, //add,edit
          },
        },
        CommonData: { RoleList },
        ControlData: {
          ModalVisible: { CheckMemberModalVisible },
        },
      },
      DataState: {
        GetData: {
          IdentityUser: { PageIndex, Total, List },
        },
      },
      PublicState: {
        Loading: { AppLoading, ContentLoading, ModalLoading, MoreLoadingClose },
      },
    } = this.props;
    let ModalName = IdentityName;
    let width = 960;
    let height = "611px";
    let ModalTitle = "查看成员";
    if (type === "custom") {
      width = 760;
      height = "432px";
    } else if (type === "edit") {
      ModalTitle = "编辑成员";
      width = 760;
      height = "432px";
    }

    return (
      <Modal
        ref="CheckMemberModal"
        bodyStyle={{ padding: 0, height: height }}
        width={width}
        footer={null}
        type="1"
        title={
          <span className="Modal-title">
            {ModalTitle}
            <span className="ModalName">
              <i>-</i>
              {ModalName}
            </span>
          </span>
        }
        visible={CheckMemberModalVisible}
        onCancel={this.onModalCancel}
        className="Modal CheckMemberModal"
      >
        <Loading
          opacity={false}
          tip="请稍候..."
          size="small"
          spinning={ModalLoading}
        >
          <div
            style={{ height: height }}
            className={`ModalContent ${
              type === "custom" || type === "edit" ? "custom" : "default"
            }`}
          >
            {type === "custom" || type === "edit" ? (
              <CustomIndentityUser></CustomIndentityUser>
            ) : (
              <DefaultIndentityUser></DefaultIndentityUser>
            )}
          </div>
        </Loading>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(CheckMemberModal);
