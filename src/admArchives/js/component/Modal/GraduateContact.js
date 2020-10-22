import React, { Component } from "react";
import { connect } from "react-redux";
import { Input } from "antd";
import { Modal, DropDown, Loading, Tips } from "../../../../common";
import moment from "moment";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import history from "../../containers/history";
import actions from "../../actions";
let { MainAction, CommonAction, PublicAction, util } = actions;

class GraduateContact extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  ModalOk = () => {
    let {
      dispatch,
      DataState: {
        CommonData: {
          ModalVisible: { UserArchivesModalVisible },
          UserArchivesParams: { UserArchivesModalType, UserArchivesModalRole },
        },
      },
      PublicState: {
        Loading: { ModalLoading },
      },
    } = this.props;
    if (ModalLoading) {
      return;
    }
    dispatch(
      util.checkGraduateContact({
        success: () => {
          dispatch(
            MainAction.EditGraduateContact({
              fn: () => {
                this.ModalCancel();
                dispatch(
                  PublicAction.showErrorAlert({
                    type: "success",
                    title: "操作成功",
                  })
                );
                dispatch(MainAction.GetGraduateToPage({}));
              },
            })
          );
        },
      })
    );
  };
  ModalCancel = () => {
    let { dispatch } = this.props;
    // if (modalLoading) {
    //   return;
    // }
    dispatch(
      CommonAction.SetModalVisible({
        GraduateContactModalVisible: false,
      })
    );
    dispatch(
      CommonAction.SetGraduateEditParams({
        Telephone: "",
        Email: "",
        HomeAddress: "",
        UserID: "",
      })
    );
    dispatch(
      CommonAction.SetTipsVisibleParams({
        TelephoneTipsVisible: false,
        EmailTipsVisible: false,
        HomeAddressTipsVisible: false,
      })
    );
  };
  onTelephoneChange = (e) => {
    const { dispatch } = this.props;
    dispatch(
      CommonAction.SetGraduateEditParams({
        Telephone: e.target.value.trim(),
      })
    );
    // this.setState({
    //   Telephone: e.target.value.trim()
    // });
  };
  onTelephoneBlur = (e) => {
    const { dispatch } = this.props;
    let value = e.target.value;
    dispatch(
      util.checkTelephone({
        value,
        success: (State) => {
          dispatch(CommonAction.SetGraduateEditParams({ Telephone: value }));
        },
      })
    );
  };
  onEmailChange = (e) => {
    const { dispatch } = this.props;
    dispatch(
      CommonAction.SetGraduateEditParams({
        Email: e.target.value.trim(),
      })
    );
    // this.setState({
    //   Telephone: e.target.value.trim()
    // });
  };
  onEmailBlur = (e) => {
    const { dispatch } = this.props;
    let value = e.target.value;
    dispatch(
      util.checkEmail({
        value,
        success: (State) => {
          dispatch(CommonAction.SetGraduateEditParams({ Email: value }));
        },
      })
    );
  };
  onHomeAddressChange = (e) => {
    const { dispatch } = this.props;
    dispatch(
      CommonAction.SetGraduateEditParams({
        HomeAddress: e.target.value.trim(),
      })
    );
    // this.setState({
    //   Telephone: e.target.value.trim()
    // });
  };
  onHomeAddressBlur = (e) => {
    const { dispatch } = this.props;
    let value = e.target.value;
    dispatch(
      util.checkHomeAddress({
        value,
        success: (State) => {
          dispatch(CommonAction.SetGraduateEditParams({ HomeAddress: value }));
        },
      })
    );
  };
  render() {
    let {
      DataState: {
        CommonData: {
          ModalVisible: { GraduateContactModalVisible },
          TipsVisible: {
            TelephoneTipsVisible,
            EmailTipsVisible,
            HomeAddressTipsVisible,
          },
          TipsTitle: {
            TelephoneTipsTitle,
            EmailTipsTitle,
            HomeAddressTipsTitle,
          },
          GraduateEditParams: { Telephone, Email, HomeAddress },
          UserArchivesParams: { UserArchivesModalType, UserArchivesModalRole },
        },
      },
      PublicState: {
        Loading: { ModalLoading },
      },
    } = this.props;

    return (
      <Modal
        ref="GraduateContact"
        bodyStyle={{ height: "216px" }}
        type="1"
        title={"编辑毕业去向"}
        width={540}
        visible={GraduateContactModalVisible}
        className="GraduateContact"
        onOk={this.ModalOk}
        onCancel={this.ModalCancel}
      >
        <Loading
          opacity={0.5}
          tip="处理中..."
          size="small"
          spinning={ModalLoading}
        >
          <div className="row">
            <span className="left">预留电话：</span>
            <span className="right">
              <Tips
                //   placement="right"
                getPopupContainer={(e) => e.parentNode}
                overlayClassName="tips"
                visible={TelephoneTipsVisible}
                title={TelephoneTipsTitle}
              >
                <Input
                  placeholder="请输入预留电话..."
                  maxLength={11}
                  type="text"
                  className="Telephone"
                  value={Telephone}
                  onChange={this.onTelephoneChange.bind(this)}
                  onBlur={this.onTelephoneBlur.bind(this)}
                  style={{ display: "inline-block" }}
                ></Input>
              </Tips>
            </span>
          </div>
          <div className="row">
            <span className="left">电子邮箱：</span>
            <span className="right">
              <Tips
                //   placement="right"
                getPopupContainer={(e) => e.parentNode}
                overlayClassName="tips"
                visible={EmailTipsVisible}
                title={EmailTipsTitle}
              >
                <Input
                  placeholder="请输入电子邮箱..."
                  type="text"
                  className="Email"
                  value={Email}
                  onChange={this.onEmailChange.bind(this)}
                  onBlur={this.onEmailBlur.bind(this)}
                  style={{ display: "inline-block" }}
                ></Input>
              </Tips>
            </span>
          </div>
          <div className="row">
            <span className="left">家庭住址：</span>
            <span className="right">
              <Tips
                //   placement="right"
                getPopupContainer={(e) => e.parentNode}
                overlayClassName="tips"
                visible={HomeAddressTipsVisible}
                title={HomeAddressTipsTitle}
              >
                <Input.TextArea
                  placeholder="请输入家庭住址..."
                  className="HomeAddress"
                  value={HomeAddress}
                  onChange={this.onHomeAddressChange.bind(this)}
                  onBlur={this.onHomeAddressBlur.bind(this)}
                  height={56}
                  width={354}
                ></Input.TextArea>
              </Tips>
            </span>
          </div>
          {/* <span
            className="tips"
            style={{
              display: UIState.GraduateJobTypeVisible
                ? "inline-block"
                : "none",
            }}
          >
            <span className="error"></span>
            <span style={{ verticalAlign: "middle" }}>
              输入内容含有非法字符
            </span>
          </span> */}
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
export default connect(mapStateToProps)(GraduateContact);
