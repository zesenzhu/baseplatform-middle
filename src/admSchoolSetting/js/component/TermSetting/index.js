import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "../../../../common";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import history from "../../containers/history";
import "./index.scss";
import actions from "../../actions";
import SetYear from "./SetYear";
let { UpDataState } = actions;
class TermSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSetYearClick = () => {
    let {
      dispatch,
      DataState: {
        TermData: { NextTermEndDate, NextTermStartDate, TermList },
      },
    } = this.props;

    dispatch(
      UpDataState.SetYearParams({
        Visible: true,
        NextTermEndDate,
        NextTermStartDate,
        Term: TermList[0],
      })
    );
  };
  render() {
    let {
      DataState: {
        TermData: {
          TotalWeeks,
          TermStatus,
          TermStartYear,
          TermEndYear,
          TermYearStatus,
          CurrentWeek,
          MomentStartDate,
          MomentEndDate,
        },
      },
    } = this.props;
    let TermStatusTitle = "";
    switch (TermStatus) {
      case 1:
        TermStatusTitle = (
          <>
            {" "}
            学期 <span className="before">尚未开始</span>
          </>
        );
        break;
      case 2:
        TermStatusTitle = (
          <>
            学期 <span className="now">第{CurrentWeek}周</span>
          </>
        );
        break;
      case 3:
        TermStatusTitle = (
          <>
            {" "}
            学期 <span className="will">已经结束</span>
          </>
        );
        break;
      default:
        break;
    }
    return (
      <div id="TermSetting" className="Content">
        <div className="Content-top">
          <span className="top-name">学年学期设置</span>
        </div>
        <div className="Content-hr"></div>
        <div className="Content-box">
          {/* <div className="notice-tip">
            本学期共<span className="TotalWeeks">{TotalWeeks}</span> 周，当前
            {TermStatusTitle}
          </div> */}
          <div className="TermDetails clearfix">
            <div className="TD-YearSetting ">
              <span className="TD-titleBar">当前学年学期</span>
              <p className="YearSetting">
                <span className="yearBar">
                  {TermStartYear + "-" + TermEndYear}
                </span>
                学年
              </p>
              <p className="YearSetting">
                第<span className="yearBar">{TermYearStatus}</span>学期
              </p>
              <span
                onClick={() => {
                  if (TermStatus !== 2) {
                    return;
                  }
                  this.onSetYearClick();
                }}
                className={`btn-begin ${
                  TermStatus !== 2 ? "btn-disabled" : ""
                }`}
              >
                启用新学期
              </span>
              <p className="TD-tips">各校学期结束后才能启用新学期</p>
            </div>
            <div className="TD-TermSetting">
              <span className="TD-titleBar">当前学期期限</span>
              <p className="TermSetting">
                <span className="TS-bar TS-year">{MomentStartDate.Year}</span>年
                <span className="TS-bar TS-month">{MomentStartDate.Month}</span>
                月<span className="TS-bar TS-day">{MomentStartDate.Day}</span>日
              </p>
              <p className="TermSetting">至</p>
              <p className="TermSetting">
                <span className="TS-bar TS-year">{MomentEndDate.Year}</span>年
                <span className="TS-bar TS-month">{MomentEndDate.Month}</span>月
                <span className="TS-bar TS-day">{MomentEndDate.Day}</span>日
              </p>
              <p className="TD-tips">各校的学期期限，由各校管理员自行设置</p>
            </div>
          </div>
          <p className="sys-tip">
            为避免影响系统的正常运行，请勿随意修改学年学期信息。
          </p>
        </div>
        <SetYear></SetYear>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState,
  };
};
export default connect(mapStateToProps)(TermSetting);
