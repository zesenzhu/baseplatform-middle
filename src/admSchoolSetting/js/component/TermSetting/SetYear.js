import React, { Component } from "react";
import { connect } from "react-redux";
import { DatePicker } from "antd";
import { Modal, DropDown, Loading } from "../../../../common";
import moment from "moment";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import history from "../../containers/history";
import "./index.scss";
import actions from "../../actions";
let { UpDataState,UpUIState } = actions;
let format = "YYYY-MM-DD HH:mm:ss";
class SetYear extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  SetYearOk = () => {
    let {
      dispatch,
      UIState: {
        AppLoading: { modalLoading },
      },
    } = this.props;
    if (modalLoading) {
      return;
    }
    dispatch(
      UpDataState.SetNewTermInfoForMulti({
        func: () => {
          dispatch(actions.UpDataState.GetCurrentTermInfoForMulti({}));

          this.SetYearCancel();
          dispatch(
            UpUIState.showErrorAlert({ type: "success", title: "操作成功" })
          );
        },
      })
    );
  };
  SetYearCancel = () => {
    let {
      dispatch,
      UIState: {
        AppLoading: { modalLoading },
      },
    } = this.props;
    // if (modalLoading) {
    //   return;
    // }

    dispatch(UpDataState.SetYearParams({ Visible: false }));
  };
  /*  监听调整学期期限中开始时间输入框中值的变化
    param 1 所选日期的Moment对象
    param 2　所有日期的字符串格式
    */
  onStartChange = (value, datastring) => {
    // console.log(datastring)
    let { dispatch } = this.props;
    dispatch(
      UpDataState.SetYearParams({
        Visible: true,
        NextTermStartDate: moment(value).format(format),
      })
    );
  };
  /* 不可选日期
        param1 日历中默认表示所有时间的对象
        param2 当前目标时间
    */
  disabledDate = (current, targetTime, type) => {
    const {
      DataState: {
        CommonData: {
          SetYearParams: { Visible, NextTermEndDate, NextTermStartDate, Term },
        },
        TermData: {},
      },
    } = this.props;

    let str = "";
    if (type === "start") {
      str = targetTime === "" ? NextTermStartDate : targetTime;
    } else {
      str = targetTime === "" ? NextTermEndDate : targetTime;
    }

    //返回当前目标时间前后两个月之间的所有日期
    //换句话说不可以选的日期是以当前目标时间为界，前后两个月之外的时间。
    return (
      current > moment(str).add(2, "months") ||
      current < moment(str).subtract(2, "months")
    );
  };
  render() {
    let {
      DataState: {
        CommonData: {
          SetYearParams: { Visible, NextTermEndDate, NextTermStartDate, Term },
        },
        TermData: {},
      },
      UIState: {
        AppLoading: { modalLoading },
      },
    } = this.props;
    return (
      <Modal
        ref="SetYear"
        bodyStyle={{ height: "216px" }}
        type="1"
        title={"启用新学期"}
        width={600}
        visible={Visible}
        className="SetYear"
        destroyOnClose={true}
        onOk={this.SetYearOk}
        onCancel={this.SetYearCancel}
      >
        <Loading
          opacity={0.5}
          tip="处理中..."
          size="small"
          spinning={modalLoading}
        >
          <div className="row">
            <span className="left">新的学期:</span>
            <span className="right">{Term.title ? Term.title : ""}</span>
          </div>
          <div className="row">
            <span className="left">开始时间:</span>
            <span className="right">
              <DatePicker
                allowClear={false}
                format="YYYY-MM-DD"
                placeholder="请选择日期"
                value={
                  NextTermStartDate === undefined || NextTermStartDate === ""
                    ? null
                    : moment(NextTermStartDate)
                }
                onChange={this.onStartChange}
                disabledDate={(e) =>
                  this.disabledDate(e, NextTermStartDate, "start")
                }
                showToday={false}
                suffixIcon={<i className="calender-logo"></i>}
                defaultPickerValue={moment(NextTermStartDate)}
              ></DatePicker>
            </span>
          </div>
          <div className="row">
            <span className="left">结束时间:</span>
            <span className="right">
              <DatePicker
                allowClear={false}
                format="YYYY-MM-DD"
                placeholder="请选择日期"
                value={
                  NextTermEndDate === undefined || NextTermEndDate === ""
                    ? null
                    : moment(NextTermEndDate)
                }
                onChange={this.onStartChange}
                disabledDate={(e) =>
                  this.disabledDate(e, NextTermEndDate, "start")
                }
                showToday={false}
                suffixIcon={<i className="calender-logo"></i>}
                defaultPickerValue={moment(NextTermEndDate)}
              ></DatePicker>
            </span>
          </div>
        </Loading>
      </Modal>
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
export default connect(mapStateToProps)(SetYear);
