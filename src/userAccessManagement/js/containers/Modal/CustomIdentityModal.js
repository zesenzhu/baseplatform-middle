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
  CheckBox,
  CheckBoxGroup,
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
  // 身份描述:change
  onDescriptionChange = (e) => {
    let { dispatch } = this.props;
    dispatch(
      HandleAction.ParamsSetCustomIdentity({
        Description: e.target.value.trim(),
      })
    );
  };
  onDescriptionBlur = (e) => {
    let { dispatch } = this.props;
    dispatch(
      HandleAction.checkDescription({
        value: e.target.value.trim(),
        success: () => {
          dispatch(
            HandleAction.ParamsSetCustomIdentity({
              Description: e.target.value.trim(),
            })
          );
        },
      })
    );
  };
  onUserTypeChange = (e) => {
    let {
      dispatch,
      HandleState: {
        ParamsData: {
          CustomIdentity: { UserType },
        },
      },
    } = this.props;
    if (e.length > 2)
    {
      //最多两个组合
      return;
    }
    if (
      UserType.length === 1 &&
      e.length === 2 &&
      e.some((child) => child === 3 || child === 2)
    )
    {
      return;
    }
    dispatch(
      HandleAction.checkUserType({
        value: e.sort(),
        fn: () => {
          dispatch(
            HandleAction.ParamsSetCustomIdentity({
              UserType: e,
            })
          );
        },
      })
    );
  };
  //
  onModalOk = () => {
    let {
      dispatch,
      HandleState: {
        ParamsData: {
          CustomIdentity: {
            IdentityName,
            Description,
            UserType,
            type,
            InitIdentityName,
            InitDescription,
            InitUserType,
          },
        },
      },
      PublicState: {
        Loading: { ModalLoading },
      },
    } = this.props;
    if (ModalLoading)
    {
      return;
    }
    let Error = false;
    let Post = () => { };

    if (type === "add")
    {
      Post = DataAction.AddIdentityType;
    } else if (type === "edit")
    {
      Post = DataAction.EditIdentityType;
      if (
        IdentityName === InitIdentityName &&
        Description === InitDescription &&
        UserType === InitUserType
      )
      {
        dispatch(
          PublicAction.showErrorAlert({
            type: "error",
            title: "您还没有编辑哦~",
          })
        );
        return;
      }
    } else
    {
      console.log("type不对");
      return;
    }
    dispatch(
      HandleAction.checkIndentityName({
        value: IdentityName,
        success: () => { },
        error: () => {
          Error = true;
        },
      })
    );

    dispatch(
      HandleAction.checkDescription({
        value: Description,
        success: () => { },
        error: () => {
          Error = true;
        },
      })
    );

    dispatch(
      HandleAction.checkUserType({
        value: UserType,
        success: () => { },
        error: () => {
          Error = true;
        },
      })
    );
    if (Error)
    {
      return;
    } else
    {
      dispatch(
        Post({
          fn: () => {
            this.onModalCancel();
          },
        })
      );
    }
  };
  onModalCancel = () => {
    let { dispatch } = this.props;
    dispatch(
      HandleAction.SetTipsVisibleParams({
        IndentityNameTipsVisible: false,
        DescriptionTipsVisible: false,
        UserTypeTipsVisible: false,
      })
    );
    dispatch(
      HandleAction.SetModalVisible({ CustomIdentityModalVisible: false })
    );
    dispatch(
      HandleAction.ParamsSetCustomIdentity({
        IdentityName: "",
        Description: "",
        UserType: [],
        InitIdentityName: "",
        InitDescription: "",
        InitUserType: [],
        type: "add",
      })
    );
    dispatch(PublicAction.ContentLoadingClose());
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
        CommonData: { RoleList },
        ControlData: {
          ModalVisible: { CustomIdentityModalVisible },
          TipsVisible: {
            IndentityNameTipsVisible,
            DescriptionTipsVisible,
            UserTypeTipsVisible,
          },
          TipsTitle: {
            IndentityNameTipsTitle,
            DescriptionTipsTitle,
            UserTypeTipsTitle,
          },
        },
      },
      PublicState: {
        Loading: { AppLoading, ContentLoading, ModalLoading },

        LoginMsg: { UserName, PhotoPath },
      },
    } = this.props;
    let ModalName = "自定义身份";
    if (type === "add")
    {
      ModalName = "添加自定义身份";
    } else if (type === "edit")
    {
      ModalName = "编辑自定义身份";
    }
    return (
      <Modal
        ref="CustomIdentityModal"
        bodyStyle={ { padding: 0, height: type === "edit" ? "248px" : "230px" } }
        width={ 520 }
        type="1"
        title={ ModalName }
        visible={ CustomIdentityModalVisible }
        onOk={ this.onModalOk }
        onCancel={ this.onModalCancel }
        className="Modal CustomIdentityModal"
      >
        <Loading
          opacity={ 0.5 }
          tip="请稍候..."
          size="small"
          spinning={ ModalLoading }
        >
          <div
            className="ModalContent"
            style={ { height: type === "edit" ? "248px" : "230px" } }
          >
            <div className="row">
              <span className="left">
                <i className="must">*</i>
                身份名称:
              </span>
              <span className="right">
                <Tips
                  overlayClassName="tips"
                  visible={ IndentityNameTipsVisible }
                  title={ IndentityNameTipsTitle }
                >
                  <Input
                    className="IndentityName"
                    placeholder="请输入8个字符以内的身份名称..."
                    maxLength={ 8 }
                    onChange={ this.onIndentityNameChange }
                    onBlur={ this.onIndentityNameBlur }
                    value={ IdentityName }
                  ></Input>
                </Tips>
              </span>
            </div>
            <div className="row">
              <span className="left"><i className="must">*</i>身份描述:</span>
              <span className="right">
                <Tips
                  overlayClassName="tips"
                  visible={ DescriptionTipsVisible }
                  title={ DescriptionTipsTitle }
                >
                  <Input.TextArea
                    className="Description"
                    placeholder="请输入20个字符以内的身份描述..."
                    maxLength={ 20 }
                    // autoSize={{minRows: 4, maxRows: 4}}
                    rows={ 3 }
                    onChange={ this.onDescriptionChange }
                    onBlur={ this.onDescriptionBlur }
                    value={ Description }
                  ></Input.TextArea>
                </Tips>
              </span>
            </div>
            <div className="row no-bottom">
              <span className="left">
                <i className="must">*</i>账号类型:
              </span>
              <span className="right">
                <Tips
                  overlayClassName="tips"
                  visible={ UserTypeTipsVisible }
                  title={ UserTypeTipsTitle }
                >
                  <CheckBoxGroup
                    value={ UserType }
                    onChange={ this.onUserTypeChange }
                  >
                    { RoleList instanceof Array
                      ? RoleList.map((child, index) => {
                        let disabled = false;
                        if (
                          UserType.length >= 2 &&
                          !UserType.includes(child.value)
                        )
                        {
                          disabled = true;
                        } else if (
                          UserType.length === 1 &&
                          (UserType[0] === 2 || UserType[0] === 3) &&
                          UserType[0] !== child.value
                        )
                        {
                          disabled = true;
                        } else if (
                          UserType.length === 1 &&
                          (UserType[0] === 0 || UserType[0] === 1) &&
                          (child.value === 2 || child.value === 3)
                        )
                        {
                          disabled = true;
                        }
                        return (
                          <>
                            { child.value === 2 || child.value === 3 ? (
                              <i className="devide"></i>
                            ) : (
                                ""
                              ) }
                            <CheckBox
                              className="UserType-radio"
                              key={ index }
                              value={ child.value }
                              disabled={ disabled }
                            >
                              { child.title }
                            </CheckBox>
                          </>
                        );
                      })
                      : "" }
                  </CheckBoxGroup>
                </Tips>
              </span>
            </div>
            { type === "edit" ? (
              <div className="row">
                <span className="left"></span>
                <span className="right right-tips">
                  注: 修改账号类型，会导致可选权限及成员初始化
                </span>
              </div>
            ) : (
                ""
              ) }
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
