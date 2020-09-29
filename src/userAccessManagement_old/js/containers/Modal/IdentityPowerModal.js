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
// import Table from "../../component/Table";
let { getQueryVariable, setRole, ArrayNoRepeat } = Public;
// const { HandleAction, DataAction, PublicAction } = actions;
class IdentityPowerModal extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      columns: [
        {
          title: "应用分组",
          align: "center",
          key: "Group",
          width: 156,
          colSpan: 1,
          render: (data) => {
            let {
              ModuleGroupID,
              ModuleGroupName,
              ModuleTotalCount,
              ModuleList,
            } = data;
            let {
              HandleState: {
                ParamsData: {
                  IdentityPower: { ModuleIDs },
                },
              },
            } = this.props;
            let checked = true;
            let indeterminate = false;
            if (ModuleList instanceof Array) {
              ModuleList.forEach((child, index) => {
                if (ModuleIDs.includes(child.ModuleID)) {
                  indeterminate = true; //有一个就为true，最后检查checked 是否为true,是就把这个改为false
                } else {
                  checked = false;
                }
              });
            } else {
              checked = false;
            }
            if (checked) {
              indeterminate = false;
            }

            return (
              <CheckBox
                indeterminate={indeterminate}
                checked={checked}
                onChange={(e) => this.onGroupChange(e, ModuleList)}
              >
                {ModuleGroupName}
              </CheckBox>
            );
          },
        },
        {
          title: "可访问应用",
          align: "center ",
          colSpan: 1,
          width: 657,
          key: "Module",
          render: (data) => {
            let {
              ModuleGroupID,
              ModuleGroupName,
              ModuleTotalCount,
              ModuleList,
            } = data;
            let {
              HandleState: {
                ParamsData: {
                  IdentityPower: { ModuleIDs },
                },
              },
            } = this.props;

            return (
              <CheckBoxGroup
                value={ModuleIDs}
                onChange={(e) => this.onModuleChange(e, ModuleList)}
              >
                <div className="check-content">
                  {ModuleList instanceof Array
                    ? ModuleList.map((child, index) => {
                        let { ModuleID, ModuleName } = child;

                        return (
                          <CheckBox
                            key={index}
                            value={ModuleID.toString()}
                            // onChange={this.onModuleChange}
                          >
                            {ModuleName}
                          </CheckBox>
                        );
                      })
                    : ""}
                </div>
              </CheckBoxGroup>
            );
          },
        },
      ],
    };
  }

  onUserTypeChange = (e) => {
    let { dispatch } = this.props;
    if (e.length === 0) {
      return;
    }
    dispatch(
      HandleAction.checkUserType({
        value: e,
        success: () => {
          dispatch(
            HandleAction.ParamsSetIdentityPower({
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
          IdentityPower: {
            InitModuleIDs,

            type,
            ModuleIDs,
          },
        },
      },
      PublicState:{
      Loading:{
        ModalLoading
      }
      }
    } = this.props;
    if(ModalLoading){
      return ;
    }
    let Error = false;
    let Post = () => {};

    Post = DataAction.EditIdentityModule;

    if (InitModuleIDs.sort().toString() === ModuleIDs.sort().toString()) {
      dispatch(
        PublicAction.showErrorAlert({
          type: "error",
          title: "您还没有编辑哦~",
        })
      );
      return;
    }

    dispatch(
      Post({
        fn: () => {
          this.onModalCancel();
        },
      })
    );
  };
  onModalCancel = () => {
    let { dispatch } = this.props;
    dispatch(
      HandleAction.SetModalVisible({ IdentityPowerModalVisible: false })
    );
    dispatch(
      HandleAction.ParamsSetIdentityPower({
        IdentityID: "",
        IdentityName: "",
        Description: "",
        UserType: [],
        ModuleIDs: [],
        InitModuleIDs: [],
        type: "edit", //add,edit
      })
    );
    dispatch(PublicAction.ContentLoadingClose());
    dispatch({type:DataAction.GET_INDENTITY_MODULE,data:[]})
  };

  // 选择权限
  onModuleChange = (value, moduleList) => {
    let {
      dispatch,
      HandleState: {
        ParamsData: {
          IdentityPower: { ModuleIDs },
        },
      },
    } = this.props;
    // 先干掉
    let list = [];
    ModuleIDs.forEach((child, index) => {
      if (!moduleList.some((mod) => mod.ModuleID === child)) {
        list.push(child);
      }
    });
    // 后加
    list = ArrayNoRepeat(list, value);
    dispatch(
      HandleAction.ParamsSetIdentityPower({
        ModuleIDs: list,
      })
    );
  };
  //
  onGroupChange = (e, moduleList) => {
    let {
      dispatch,
      HandleState: {
        ParamsData: {
          IdentityPower: { ModuleIDs },
        },
      },
    } = this.props;
    let list = [];
    if (e.target.checked) {
      list = ArrayNoRepeat(
        ModuleIDs,
        moduleList.map((child) => child.ModuleID)
      );
    } else {
      ModuleIDs.forEach((child, index) => {
        if (!moduleList.some((mod) => mod.ModuleID === child)) {
          list.push(child);
        }
      });
    }
    dispatch(
      HandleAction.ParamsSetIdentityPower({
        ModuleIDs: list,
      })
    );
  };
  render() {
    const {
      HandleState: {
        ParamsData: {
          IdentityPower: {
            IdentityName,
            Description,
            ModuleIDs,
            UserType,
            type, //add,edit
          },
        },
        CommonData: { RoleList },
        ControlData: {
          ModalVisible: { IdentityPowerModalVisible },
        },
      },
      DataState: {
        GetData: { IdentityModuleList },
      },
      PublicState: {
        Loading: { AppLoading, ContentLoading, ModalLoading, MoreLoadingClose },

        LoginMsg: { UserName, PhotoPath },
      },
    } = this.props;
    let ModalName = "权限";
    if (type === "add") {
      ModalName = "添加权限";
    } else if (type === "edit") {
      ModalName = "编辑权限";
    }
    let UserTypeName = [];
    UserType instanceof Array &&
      RoleList instanceof Array &&
      UserType.length > 0 &&
      RoleList.map((child, index) => {
        if (UserType.map((value) => parseInt(value)).includes(child.value)) {
          UserTypeName.push(child.title);
        }
      });

    return (
      <Modal
        ref="IdentityPowerModal"
        bodyStyle={{ padding: 0, height: "536px" }}
        width={960}
        type="1"
        title={ModalName}
        visible={IdentityPowerModalVisible}
        onOk={this.onModalOk}
        onCancel={this.onModalCancel}
        className="Modal IdentityPowerModal"
      >
        <Loading
          opacity={0.5}
          tip="请稍候..."
          size="small"
          spinning={ModalLoading}
        >
          <div className="ModalContent">
            <Scrollbars>
              <div className="row">
                <span className="left">身份类型:</span>
                <span className="right">
                  <span title={IdentityName} className="IdentityName">
                    {IdentityName ? IdentityName : "--"}
                  </span>
                  <span title={Description} className="Description">
                    ({Description ? Description : "--"})
                  </span>
                </span>
              </div>
              <div className="row">
                <span className="left">账号类型:</span>
                <span className="right UserTypeName">
                  {UserTypeName.length > 0 ? UserTypeName.join("、") : "--"}
                </span>
              </div>
              <div className="row row-bottom">
                <span className="left">身份权限:</span>
                <span className="right">
                  {/* <CheckBoxGroup
                    value={ModuleIDs}
                    onChange={this.onModuleChange}
                  > */}
                  {/* {IdentityModuleList instanceof Array ? ( */}
                    <Table
                      className="table"
                      bordered={true}
                      columns={this.state.columns}
                      loading={MoreLoadingClose}
                      pagination={false}
                      dataSource={IdentityModuleList}
                    ></Table>
                  {/* ) : (
                    "暂无权限可选择"
                  )} */}
                  {/* </CheckBoxGroup> */}
                  {/* <Tips
                  overlayClassName="tips"
                  visible={UserTypeTipsVisible}
                  title={UserTypeTipsTitle}
                >
                  <CheckBoxGroup
                    value={UserType}
                    onChange={this.onUserTypeChange}
                  >
                    {RoleList instanceof Array
                      ? RoleList.map((child, index) => {
                          return (
                            <CheckBox
                              className="UserType-radio"
                              key={index}
                              value={child.value}
                            >
                              {child.title}
                            </CheckBox>
                          );
                        })
                      : ""}
                  </CheckBoxGroup>
                </Tips> */}
                </span>
              </div>
            </Scrollbars>
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
export default connect(mapStateToProps)(IdentityPowerModal);
