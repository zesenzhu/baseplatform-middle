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
} from "../../../../common";
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
import CONFIG from "../../../../common/js/config";
import {
  TokenCheck_Connect,
  TokenCheck,
  getUserInfo,
} from "../../../../common/js/disconnect";
import "./index.scss";
import { HandleAction, DataAction, PublicAction } from "../../actions";
import Public from "../../../../common/js/public";
import Scrollbars from "react-custom-scrollbars";

let { getQueryVariable, setRole } = Public;
// const { HandleAction, DataAction, PublicAction } = actions;
class ContentTop extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  onAddClick = () => {
    let { dispatch } = this.props;
    dispatch(
      HandleAction.ParamsSetCustomIdentity({
        IdentityName: "",
        Description: "",
        UserType: [],
        type: "add",
      })
    );

    dispatch(
      HandleAction.SetModalVisible({ CustomIdentityModalVisible: true })
    );
  };
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
      topType
    } = this.props;

    return (
      <div className="ContentTop" id="ContentTop">
        {(!topType||topType==='all')&&<><span className="CT-title CT-title-all">????????????????????????</span>
        <span className="CT-handle">
          <span onClick={this.onAddClick} className="CTh-add">
            ?????????????????????
          </span>
        </span></>}
        {
          topType==='more'&&<span className="CT-title CT-title-more">??????????????????</span>
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(ContentTop);
