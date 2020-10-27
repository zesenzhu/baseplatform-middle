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
import { Modal as AntdModal, Input, Tooltip, Collapse } from "antd";
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
import Tag from "../../../component/Tag";

import { HandleAction, DataAction, PublicAction } from "../../../actions";
import Public from "../../../../../common/js/public";
import Scrollbars from "react-custom-scrollbars";
// import Table from "../../component/Table";
import Right from "./Right";
import Left from "./Left";
let { getQueryVariable, setRole, ArrayNoRepeat } = Public;
// const { HandleAction, DataAction, PublicAction } = actions;
class AddMemberModal extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  onModalOk = () => {
    let {
      dispatch,
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
      },
    } = this.props;
    if (MemberList.length === 0) {
      dispatch(
        PublicAction.showErrorAlert({
          type: "error",
          title: "您还没有编辑哦~",
        })
      );
      return;
    }
    dispatch(
      DataAction.AddIdentityUser({
        fn: () => {
          this.onModalCancel();
        },
      })
    );
  };
  onModalCancel = () => {
    let {
      dispatch,
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
      },
    } = this.props;
    dispatch(PublicAction.MoreLoadingClose());

    dispatch(HandleAction.SetModalVisible({ AddMemberModalVisible: false }));
    // dispatch(DataAction.GetIdentityUser({}));
    dispatch(
      HandleAction.ParamsSetAddMember({
        IdentityID: "",
        IdentityCode: "",
        IdentityName: "",
        UserType: [],
        MemberList: [],
        SelectRole: "",
        NodeID: "",
        NodeName: "",
        FullID: [],
        FullName: [],
        NodeType: "tree", //tree,user
        LayoutType: "type", //type,level
        List: [], //存当前的列表
        SearchUserWord: "", //搜索关键词
        SearchUserWordVisible: false, //搜索关键词
      })
    );
    dispatch(PublicAction.ContentLoadingClose());
    dispatch(PublicAction.MoreLoadingClose());
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
            SelectRole,
          },
        },
        CommonData: { RoleList },
        ControlData: {
          ModalVisible: { AddMemberModalVisible },
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
    let width = 900;
    let height = 591;

    let UserTypeList = [];
    UserType instanceof Array &&
      RoleList instanceof Array &&
      UserType.length > 0 &&
      RoleList.map((child, index) => {
        if (UserType.map((value) => parseInt(value)).includes(child.value)) {
          UserTypeList.push(child);
        }
      });

    return (
      <Modal
        ref="AddMemberModal"
        bodyStyle={{ padding: 0, height: height + "px" }}
        width={width}
        footer={null}
        type="1"
        title={"添加成员"}
        visible={AddMemberModalVisible}
        onCancel={this.onModalCancel}
        className="Modal AddMemberModal"
      >
        <Loading
          opacity={0.5}
          tip="请稍候..."
          size="small"
          spinning={ModalLoading}
        >
          <div style={{ height: height + "px" }} className={`ModalContent  `}>
            <div className="left">
              <Left onOk={this.onModalOk} onCancel={this.onModalCancel}></Left>
            </div>
            <div className="right">
              <Right height={height}></Right>
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
export default connect(mapStateToProps)(AddMemberModal);
