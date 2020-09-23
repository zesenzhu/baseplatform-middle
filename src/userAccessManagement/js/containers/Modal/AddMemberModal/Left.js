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
import { Modal as AntdModal, Input, Collapse, Tooltip } from "antd";
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
import Tag from "../../../component/Tag";
import Tree from "./Tree";
// import Table from "../../component/Table";
let { getQueryVariable, setRole, ArrayNoRepeat } = Public;
// const { HandleAction, DataAction, PublicAction } = actions;
const { Panel } = Collapse;

class Left extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  onTagCancel = (data) => {
    const {
      HandleState: {
        ParamsData: {
          AddMember: {
            IdentityCode,
            IdentityName,
            UserType,
            IdentityID,
            MemberList,
            SelectRole,
            NodeType,
            LayoutType,
            List,
          },
        },
      },
      dispatch,
    } = this.props;
    let UpDataList = [];
    MemberList.forEach((member) => {
      if (data.NodeID !== member.NodeID) {
        UpDataList.push(member);
      }
    });
    dispatch(HandleAction.ParamsSetAddMember({ MemberList: UpDataList }));
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
            NodeType,
          },
        },
        CommonData: { RoleList },
        ControlData: {
          ModalVisible: { LeftVisible },
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
      onCancel,onOk
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
    let count = 0;
    return (
      <>
        <div className="select-box">
          <Scrollbars>
            {MemberList instanceof Array &&
              MemberList.map((child, index) => {
                if (child.nodeType === "user") {
                  count += 1;
                } else {
                  count += child.UserCount;
                }
                return (
                  <Tag
                    key={index}
                    id={
                      child.nodeType === "user"
                        ? child.NodeID
                        : child.UserCount + "人"
                    }
                    type={"edit"}
                    styleType={"dashed"}
                    onCancel={this.onTagCancel.bind(this, child)}
                    name={child.NodeName}
                  ></Tag>
                );
              })}
            {/* <Tooltip
              placement="top"
              trigger={["click"]}
              autoAdjustOverflow={true}
              getPopupContainer={(e) => e.parentNode}
              arrowPointAtCenter={true}
              title={<></>}
            >
              <span className="search">搜索...</span>
            </Tooltip> */}
          </Scrollbars>
        </div>
        <div className="my-footer">
          <span onClick={ onOk} className="btn btn-comfirm">
            确定(已选{count}人)
          </span>
          <span onClick={onCancel} className="btn btn-cancel">
            取消
          </span>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(Left);
