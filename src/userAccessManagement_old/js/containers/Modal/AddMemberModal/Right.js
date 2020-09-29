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
  PagiNation,
} from "../../../../../common";
import { connect } from "react-redux";
import { Modal as AntdModal, Input, Collapse } from "antd";
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

import { HandleAction, DataAction, PublicAction } from "../../../actions";
import Public from "../../../../../common/js/public";
import Scrollbars from "react-custom-scrollbars";
import Tree from "./Tree";
// import Table from "../../component/Table";
let { getQueryVariable, setRole, ArrayNoRepeat } = Public;
// const { HandleAction, DataAction, PublicAction } = actions;
const { Panel } = Collapse;

class Right extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  // 面板变化
  onPanelChange = (e) => {
    console.log(e);
    let {
      dispatch,
      HandleState: {
        ParamsData: {
          CheckMember: { type },
        },
      },
    } = this.props;

    dispatch(
      HandleAction.ParamsSetAddMember({
        SelectRole: e,
      })
    );
    if (e === "admin") {
      dispatch(DataAction.GetUser({}));
    } else {
      dispatch(DataAction.GetTree({}));
    }
  };
  // 回到上一级
  onBackClick = (nodeid) => {
    this.onBackNodeClick(nodeid)
  };
  // 回指定节点
  onBackNodeClick = (NodeID) => {
    let {
      dispatch,
      HandleState: {
        ParamsData: {
          AddMember: { SelectRole },
        },
        CommonData: { RoleList },
      },
      DataState: {
        GetData: { TreeList },
      },
    } = this.props;
    if (RoleList.some((child) => child.code === NodeID)) {
      //表示是默认的
      dispatch(
        HandleAction.ParamsSetAddMember({
          SelectRole: NodeID,
          NodeType: "tree",
          LayoutType: "type",
        })
      );
      dispatch(DataAction.GetTree({}));
    } else {
      let data = this.MapNode(TreeList, NodeID);
      let FullID = [];
      let FullName = [];
      RoleList.forEach((child) => {
        if (child.code === SelectRole) {
          FullID.push(child.code);
          FullName.push(child.title);
        }
      });
      if (typeof data.FullID === "string") {
        let Pop = data.FullID.split(">");
        Pop.pop();
        FullID = FullID.concat(Pop);
      }

      if (typeof data.FullName === "string") {
        let Pop = data.FullName.split(">");
        Pop.pop();
        FullName = FullName.concat(Pop);
      }
      dispatch(
        HandleAction.ParamsSetAddMember({
          List: data.Children,
          LayoutType: "level",
          NodeID: data.NodeID,
          NodeName: data.NodeName,
          FullID: FullID,
          NodeType: "tree",
          FullName: FullName,
        })
      );
    }
  };
  // 遍历
  MapNode = (data, nodeId) => {
    let node = false;
    if (data instanceof Array) {
      data.some((child) => {
        if (child.NodeID === nodeId) {
          node = child;
          return true;
        } else if (child.Children instanceof Array) {
          node = this.MapNode(child.Children, nodeId);
          return node ? true : false;
        }
      });
    }
    return node;
  };
  render() {
    const {
      HandleState: {
        ParamsData: {
          AddMember: {
            IdentityCode,
            IdentityName,
            UserType,
            IdentityID,
            MemberList,
            NodeID,
            NodeName,
            FullID,
            FullName,
            SelectRole,
            LayoutType,
          },
        },
        CommonData: { RoleList },
        ControlData: {
          ModalVisible: { RightVisible },
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
      height,
    } = this.props;

    let UserTypeList = [];
    UserType instanceof Array &&
      RoleList instanceof Array &&
      UserType.length > 0 &&
      RoleList.map((child, index) => {
        if (UserType.map((value) => parseInt(value)).includes(child.value)) {
          UserTypeList.push(child);
        }
      });
    if (LayoutType === "level") {
    }
    return (
      <>
        {LayoutType === "level" ? (
          <div className="Level">
            <div className="Level-Top">
              <p className="Level-title">
                <span
                  className="back"
                  onClick={this.onBackClick.bind(this, FullID[FullID.length-1])}
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    className={"back-svg"}
                    data-icon="right"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
                  </svg>
                </span>
                <span title={NodeName}>{NodeName}</span>
              </p>
              <p className="Level-Full">
                {FullID instanceof Array &&
                  FullID.map((child, index) => {
                    let Name = FullName[index];
                    if (index === FullID.length - 1 && child === NodeID) {
                      return;
                    }
                    return (
                      <React.Fragment key={index}>
                        <span
                          onClick={this.onBackNodeClick.bind(this, child)}
                          className="back-node"
                          title={Name}
                        >
                          {Name}
                        </span>
                        {index !== FullID.length - 1 ? (
                          <span className="devide">/</span>
                        ) : (
                          ""
                        )}
                      </React.Fragment>
                    );
                  })}
              </p>
            </div>
            <Tree height={height}></Tree>
          </div>
        ) : (
          <Collapse
            onChange={this.onPanelChange}
            activeKey={SelectRole}
            bordered={false}
            ghost={true}
            expandIconPosition="right"
            accordion
            destroyInactivePanel={true}
          >
            {UserTypeList.map((child, index) => {
              return (
                <Panel
                  key={child.code}
                  header={
                    <div className={`user-header user-${child.code}`}>
                      <i className="user-icon"></i>
                      {child.title}
                    </div>
                  }
                >
                  <Tree height={height}></Tree>
                </Panel>
              );
            })}
          </Collapse>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(Right);
