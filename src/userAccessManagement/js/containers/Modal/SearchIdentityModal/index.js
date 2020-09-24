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
import Table from "./Table";
let { getQueryVariable, setRole, ArrayNoRepeat } = Public;
// const { HandleAction, DataAction, PublicAction } = actions;
class SearchIdentityModal extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }

  onModalCancel = () => {
    this.onCancelClick()

    let {
      dispatch,
      HandleState: {
        ParamsData: {
          SearchIdentity: {
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

    dispatch(
      HandleAction.SetModalVisible({ SearchIdentityModalVisible: false })
    );
    // dispatch(DataAction.GetIdentityUser({}));
    dispatch(
      HandleAction.ParamsSetSearchIdentity({
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
      })
    );
    dispatch(PublicAction.ContentLoadingClose());
    dispatch(PublicAction.MoreLoadingClose());
  };
  // 搜索修改
  onChangeSearch = (e) => {
    let { dispatch } = this.props;
    let CancelBtnShow = 'y'
    if(e.target.value===''){
      CancelBtnShow = 'n'
    }
    dispatch(
      HandleAction.ParamsSetSearchIdentity({CancelBtnShow, SearchValue: e.target.value })
    );
  };
  // 确认修改
  onClickSearch = (e) => {
    let { dispatch } = this.props;
    this.onCancelClick()
    dispatch(
      HandleAction.ParamsSetSearchIdentity({
        KeyWord: e.value,
        CancelBtnShow: "y",
      })
    );
    dispatch(DataAction.SearchIdentityUser({}));
  };
  // 取消搜索
  onCancelSearch = () => {
    let { dispatch } = this.props;
    dispatch(
      HandleAction.ParamsSetSearchIdentity({
        // KeyWord: "",
        SearchValue: "",
        CancelBtnShow: "n",
      })
    );
    // dispatch(DataAction.SearchIdentityUser({}));
  };
  // 取消编辑用户，传至table，只要有search都要加这个来控制
  onCancelClick = () => {
    let { dispatch } = this.props;
    dispatch(
      HandleAction.ParamsSetSearchIdentity({
        EditIndex: -1,
      })
    );
    //  置空
    dispatch({
      type: DataAction.GET_IDENTITY_TYPE_FOR_ACCREDIT,
      data: [],
    });
  };
  render() {
    const {
      HandleState: {
        ParamsData: {
          SearchIdentity: { SearchValue, KeyWord, CancelBtnShow, PageSize },
        },
        CommonData: { RoleList },
        ControlData: {
          ModalVisible: { SearchIdentityModalVisible },
        },
      },
      DataState: {
        GetData: {
          SearchIdentity: { PageIndex, Total, List },
        },
      },
      PublicState: {
        Loading: { AppLoading, ContentLoading, ModalLoading, MoreLoadingClose },
      },
    } = this.props;
    let width = 900;
    let height = 610;

    // let UserTypeList = [];
    // UserType instanceof Array &&
    //   RoleList instanceof Array &&
    //   UserType.length > 0 &&
    //   RoleList.map((child, index) => {
    //     if (UserType.map((value) => parseInt(value)).includes(child.value)) {
    //       UserTypeList.push(child);
    //     }
    //   });

    return (
      <Modal
        ref="SearchIdentityModal"
        bodyStyle={{ padding: 0, height: height + "px" }}
        width={width}
        footer={null}
        type="1"
        title={"搜索用户身份权限"}
        visible={SearchIdentityModalVisible}
        onCancel={this.onModalCancel}
        className="Modal SearchIdentityModal"
      >
        {/* <Loading
          opacity={false}
          tip="请稍候..."
          size="small"
          spinning={ModalLoading}
        > */}
          <div style={{ height: height + "px" }} className={`ModalContent  `}>
            <div className="Modal-Top">
              <Search
                placeHolder="请输入用户姓名/工号/学号搜索用户身份权限..."
                onClickSearch={this.onClickSearch}
                height={32}
                width={380}
                Value={SearchValue}
                onCancelSearch={this.onCancelSearch}
                onChange={this.onChangeSearch}
                CancelBtnShow={CancelBtnShow}
              ></Search>
            </div>
            <p className="total">
              共搜索到<span className="count">{Total}</span>条结果
            </p>
            <Table onCancelClick={this.onCancelClick}></Table>
          </div>
        {/* </Loading> */}
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(SearchIdentityModal);
