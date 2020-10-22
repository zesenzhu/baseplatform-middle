import React from "react";
import { connect } from "react-redux";
import { Button, Radio, RadioGroup, Tips } from "../../../common/index";
import { Input } from "antd";
import CONFIG from "../../../common/js/config";
import actions from "../actions";
import "../../scss/GraduateJobType.scss";

class GraduateJobType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Discription: this.props.DataState.GetGraduateMsg.GraduateInitMsg
        .Discription
    };
  }

  // radio事件
  onRadioChange = e => {
    //console.log(e)
    const { dispatch } = this.props;
    dispatch(actions.UpDataState.setGraduateMsg({ JobType: e.target.value }));
  };
  onDiscriptionChange = e => {
    const { dispatch } = this.props;
    this.setState({
      Discription: e.target.value.trim()
    });
  };
  onDiscriptionBlur = e => {
    const { dispatch } = this.props;
    let Test = /^[?？+-=\.\\/\*()（）A-Za-z0-9\u4e00-\u9fa5]{1,30}$/;
    if (Test.test(e.target.value) || e.target.value === '') {
      dispatch(
        actions.UpUIState.editModalTipsVisible({
          GraduateJobTypeVisible: false
        })
      );
      dispatch(
        actions.UpDataState.setGraduateMsg({ Discription: e.target.value })
      );
    } else {
      dispatch(
        actions.UpUIState.editModalTipsVisible({ GraduateJobTypeVisible: true })
      );
    }
  };
  render() {
    const { DataState, UIState } = this.props;
    let { GraduateChangeMsg, GraduateInitMsg } = DataState.GetGraduateMsg;
    return (
      <div className="GraduateJobType">
        <div className="row">
          <span className="left">学生：</span>
          <span title={GraduateChangeMsg.UserName} className="right UserName">
            {GraduateChangeMsg.UserName}
            <span title={GraduateChangeMsg.UserID} className="UserID">
              ({GraduateChangeMsg.UserID})
            </span>
          </span>
        </div>
        <div className="row">
          <span className="left">去向类型：</span>
          <span className="right">
            <RadioGroup
              name="radioGroup"
              value={
                GraduateChangeMsg.JobType === "升学" ||
                GraduateChangeMsg.JobType === "就业"
                  ? GraduateChangeMsg.JobType
                  : "升学"
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
              getPopupContainer={e => e.parentNode}
              overlayClassName="tips"
              visible={UIState.EditModalTipsVisible.GraduateJobTypeVisible}
              title={"输入内容含有非法字符"}
            >
              <Input
                placeholder="请输入去向"
                className="Discription"
                value={this.state.Discription}
                onChange={this.onDiscriptionChange.bind(this)}
                style={{ display: "inline-block" }}
                onBlur={this.onDiscriptionBlur.bind(this)}
              ></Input>
            </Tips>
          </span>
        </div>
        {/* <span className='tips' style={{ display: UIState.EditModalTipsVisible.GraduateJobTypeVisible ? 'inline-block' : 'none' }}>
                    <span className='error'></span>
                    <span style={{ verticalAlign: 'middle' }}>输入内容含有非法字符</span>
                </span> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState
  };
};
export default connect(mapStateToProps)(GraduateJobType);
