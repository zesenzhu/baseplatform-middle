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
} from "../../../../common";
import Frame from "../../../../common/Frame";
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
import history from "../../config/history";
//import TimeBanner from '../component/TimeBanner'
import { postData, getData } from "../../../../common/js/fetch";
import CONFIG from "../../../../common/js/config";
import {
  TokenCheck_Connect,
  TokenCheck,
  getUserInfo,
} from "../../../../common/js/disconnect";

import { HandleAction, DataAction, PublicAction } from "../../actions";
import Public from "../../../../common/js/public";
import Scrollbars from "react-custom-scrollbars";
import ContentTop from "../../component/ContentTop";
import Table from "../../component/Table";
let { getQueryVariable, setRole } = Public;
// const { HandleAction, DataAction, PublicAction } = actions;
class CustomIdentityModal extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  // 身份名称change
  onIndentityNameChange = (e) => {
    let { dispatch } = this.props;
    dispatch(
      HandleAction.ParamsSetCustomIdentity({
        IdentityName: e.target.value.trim(),
      })
    );
  };
  onIndentityNameBlur = (e) => {
    let { dispatch } = this.props;
    dispatch(
      HandleAction.checkIndentityName({
        value: e.target.value.trim(),
        success: () => {
          dispatch(
            HandleAction.ParamsSetCustomIdentity({
              IdentityName: e.target.value.trim(),
            })
          );
        },
      })
    );
  };
  render() {
    const {
      HandleState: {
        ParamsData: {
          CustomIdentity: {
            IdentityName,
            Description,
            UserType,
            type, //add,edit
          },
        },
        ControlData: {
          ModalVisible: { CustomIdentityModalVisible },
          TipsVisible: { IndentityNameTipsVisible, DescriptionTipsVisible },
          TipsTitle: { IndentityNameTipsTitle, DescriptionTipsTitle },
        },
      },
      PublicState: {
        Loading: { AppLoading, ContentLoading, ModalLoading },

        LoginMsg: { UserName, PhotoPath },
      },
    } = this.props;
    let ModalName = "自定义身份";
    if (type === "add") {
      ModalName = "添加自定义身份";
    } else if (type === "edit") {
      ModalName = "编辑自定义身份";
    }
    return (
      <Modal
        ref="CustomIdentityModal"
        bodyStyle={{ padding: 0, height: "230px" }}
        width={520}
        type="1"
        title={ModalName}
        visible={CustomIdentityModalVisible}
        onOk={this.onModalOk}
        onCancel={this.onModalCancel}
        className="Modal CustomIdentityModal"
        id="CustomIdentityModal"
      >
        <Loading
          opacity={0.5}
          tip="请稍候..."
          size="small"
          spinning={ModalLoading}
        >
          <div className="ModalContent">
            <div className="row">
              <span className="left">
                <i className="must"></i>
                身份名称:
              </span>
              <span className="right">
                <Tips
                  overlayClassName="tips"
                  visible={IndentityNameTipsVisible}
                  title={IndentityNameTipsTitle}
                >
                  <Input
                    className="IndentityName"
                    placeholder="请输入8个字符以内的身份名称..."
                    maxLength={8}
                    onChange={this.onIndentityNameChange}
                    onBlur={this.onIndentityNameBlur}
                    value={IdentityName}
                  ></Input>
                </Tips>
              </span>
            </div>
            <div className="row">
              <span className="left">
                <i className="must"></i>
                身份名称:
              </span>
              <span className="right">
                <Tips
                  overlayClassName="tips"
                  visible={IndentityNameTipsVisible}
                  title={IndentityNameTipsTitle}
                >
                  <Input
                    className="IndentityName"
                    placeholder="请输入8个字符以内的身份名称..."
                    maxLength={8}
                    onChange={this.onIndentityNameChange}
                    onBlur={this.onIndentityNameBlur}
                    value={IdentityName}
                  ></Input>
                </Tips>
              </span>
            </div>
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
export default connect(mapStateToProps)(CustomIdentityModal);
