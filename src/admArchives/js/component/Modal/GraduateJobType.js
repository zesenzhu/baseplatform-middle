import React, { Component } from "react";
import { connect } from "react-redux";
import { Input } from "antd";
import {
  Modal,
  DropDown,
  Loading,
  Tips,
  Radio,
  RadioGroup,
} from "../../../../common";
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

class GraduateJobType extends Component {
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
          GraduateEditParams: { Discription },
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
      util.checkDiscription({
        value: Discription,
        success: (State) => {
          dispatch(
            MainAction.EditGraduateTrack({
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
        GraduateJobTypeModalVisible: false,
      })
    );
    dispatch(
      CommonAction.SetGraduateEditParams({
        Discription: "",
        JobType: "升学",
        UserName: "",
        UserID: "",
      })
    );
    dispatch(
      CommonAction.SetTipsVisibleParams({
        DiscriptionTipsVisible: false,
      })
    );
  };
  // radio事件
  onRadioChange = (e) => {
    //console.log(e)
    const { dispatch } = this.props;
    dispatch(CommonAction.SetGraduateEditParams({ JobType: e.target.value }));
  };
  onDiscriptionChange = (e) => {
    const { dispatch } = this.props;
    dispatch(
      CommonAction.SetGraduateEditParams({
        Discription: e.target.value,
      })
    );
    // this.setState({
    //   Telephone: e.target.value
    // });
  };
  onDiscriptionBlur = (e) => {
    const { dispatch } = this.props;
    let value = e.target.value;
    dispatch(
      util.checkDiscription({
        value,
        success: (State) => {
          dispatch(CommonAction.SetGraduateEditParams({ Discription: value }));
        },
      })
    );
  };
  render() {
    let {
      DataState: {
        CommonData: {
          ModalVisible: { GraduateJobTypeModalVisible },
          TipsVisible: {
            TelephoneTipsVisible,
            EmailTipsVisible,
            DiscriptionTipsVisible,
          },
          TipsTitle: {
            DiscriptionTipsTitle,
            EmailTipsTitle,
            HomeAddressTipsTitle,
          },
          GraduateEditParams: { UserID, UserName, Discription, JobType },
          UserArchivesParams: { UserArchivesModalType, UserArchivesModalRole },
        },
      },
      PublicState: {
        Loading: { ModalLoading },
      },
    } = this.props;

    return (
      <Modal
        ref="GraduateJobType"
        bodyStyle={{ height: "216px" }}
        type="1"
        title={"编辑毕业去向"}
        width={540}
        visible={GraduateJobTypeModalVisible}
        className="GraduateJobType"
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
            <span className="left">学生：</span>
            <span title={UserName} className="right UserName">
              {UserName ? UserName : "--"}
              <span title={UserID} className="UserID">
                ({UserID ? UserID : "--"})
              </span>
            </span>
          </div>
          <div className="row">
            <span className="left">去向类型：</span>
            <span className="right">
              <RadioGroup
                name="radioGroup"
                value={
                  JobType === "升学" || JobType === "就业" ? JobType : "升学"
                }
                onChange={this.onRadioChange.bind(this)}
              >
                <Radio type="gray" value="升学">
                  升学
                </Radio>
                <Radio type="gray" value="就业">
                  就业
                </Radio>
              </RadioGroup>
            </span>
          </div>
          <div className="row">
            <span className="left">去向描述：</span>
            <span className="right">
              <Tips
                //   placement="right"
                getPopupContainer={(e) => e.parentNode}
                overlayClassName="tips"
                visible={DiscriptionTipsVisible}
                title={DiscriptionTipsTitle}
              >
                <Input
                  placeholder="请输入去向..."
                  className="Discription"
                  value={Discription}
                  onChange={this.onDiscriptionChange.bind(this)}
                  style={{ display: "inline-block" }}
                  onBlur={this.onDiscriptionBlur.bind(this)}
                ></Input>
              </Tips>
            </span>
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
export default connect(mapStateToProps)(GraduateJobType);
