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
  DetailsModal,
} from "../../../common";
import Frame from "../../../common/Frame";
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
import history from "../config/history";
//import TimeBanner from '../component/TimeBanner'
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import {
  TokenCheck_Connect,
  TokenCheck,
  getUserInfo,
} from "../../../common/js/disconnect";

import { HandleAction, DataAction, PublicAction } from "../actions";
import Public from "../../../common/js/public";
import Scrollbars from "react-custom-scrollbars";
import ContentTop from "../component/ContentTop";
import Table from "../component/Table";
import CustomIdentityModal from "./Modal/CustomIdentityModal";
import IdentityPowerModal from "./Modal/IdentityPowerModal";
import CheckMemberModal from "./Modal/CheckMemberModal";
import AddMemberModal from "./Modal/AddMemberModal";
import SearchIdentityModal from "./Modal/SearchIdentityModal";
let { getQueryVariable, setRole } = Public;
// const { HandleAction, DataAction, PublicAction } = actions;
class Main extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }

  render() {
    const {
      HandleState: {
        CommonData: {
          FrameData: {
            type: FrameType,
            cnname,
            enname,
            image,
            showLeftMenu,
            showBarner,
            className,
          },
        },
        ControlData: { ModalVisible },
      },
      PublicState: {
        Loading: { AppLoading, ContentLoading },
        Alert: {
          appAlert,
          title,
          type,
          littleTitle,
          onOk,
          onHide,
          onCancel,
          onClose,
        },
        LoginMsg: { UserName, PhotoPath },
      },
    } = this.props;

    return (
      <div className="Content Main" id="Main">
        <ContentTop></ContentTop>
        <Table></Table>
        <CustomIdentityModal></CustomIdentityModal>
        <IdentityPowerModal></IdentityPowerModal>
        <CheckMemberModal></CheckMemberModal>
        <AddMemberModal></AddMemberModal>
        {/* <SearchIdentityModal></SearchIdentityModal> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(Main);
