import React, { Component } from "react";
import { Menu, Loading, Alert, Modal, Button, Empty } from "../../../common";
import { connect } from "react-redux";
import Frame from "../../../common/Frame";

import { Modal as AntdModal, Input } from "antd";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import history from "./history";
import TeachingAbsolution from "../component/TeachingSolution";
import SolutionDetails from "../component/SolutionDetails";
import logo from "../../images/icon-logo.png";
//import TimeBanner from '../component/TimeBanner'
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import {
  TokenCheck_Connect,
  TokenCheck,
  getUserInfo
} from "../../../common/js/disconnect";

import "../../scss/index.scss";
import $ from "jquery";
import actions from "../actions";
//import { urlAll, proxy } from './config'
import { QueryPower, QueryAdminPower } from "../../../common/js/power";
const POWER_MODULEID = "000-2-0-09"; //用户权限管理模块ID

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      UserMsg: props.DataState.LoginUser,
      resetName: "",
      period:{ value: 0, title: "全部",StartDate:'', EndDate:''}
    };
  }

  componentWillMount() {
    const { dispatch, DataState } = this.props;
    let route = history.location.pathname;
    //判断token是否存在
    TokenCheck_Connect(false,()=>{
      let token = sessionStorage.getItem("token");
      // sessionStorage.setItem('UserInfo', '')
      if (sessionStorage.getItem("UserInfo")) {
        dispatch(
          actions.UpDataState.getLoginUser(
            JSON.parse(sessionStorage.getItem("UserInfo"))
          )
        );
        dispatch(
          actions.UpDataState.getTeachingSolutionTermMsg(
            "/GetTermInfoList"
          )
        );
        dispatch(
          actions.UpDataState.getTeachingSolutionMsg(
            "/ListTeachingSolutions?period=&beginTime=&endTime=&pageSize=12&currentPage=1&userId=" +
              JSON.parse(sessionStorage.getItem("UserInfo")).UserID
          )
        );
      } else {
        getUserInfo(token, "000");
        let timeRun = setInterval(function() {
          if (sessionStorage.getItem("UserInfo")) {
            dispatch(
              actions.UpDataState.getLoginUser(
                JSON.parse(sessionStorage.getItem("UserInfo"))
              )
            );
            dispatch(
              actions.UpDataState.getTeachingSolutionMsg(
                "/ListTeachingSolutions?period=&beginTime=&endTime=&pageSize=12&currentPage=1&userId=" +
                  JSON.parse(sessionStorage.getItem("UserInfo")).UserID
              )
            );
            clearInterval(timeRun);
          }
        }, 1000);
        //dispatch(actions.UpDataState.getLoginUser(JSON.parse(sessionStorage.getItem('UserInfo'))));
      }
    });
    //sessionStorage.setItem('token','')

    
  }
  //查看弹窗
  TeachingSolutionDetailsModalOk = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.TeachingSolutionDetailsModalClose());
  };
  TeachingSolutionDetailsModalCancel = () => {
    const { dispatch } = this.props;

    dispatch(actions.UpUIState.TeachingSolutionDetailsModalClose());
  };
  //重命名
  onResetNameChange = e => {
    // console.log(e.target.value)
    const { dispatch } = this.props;
    this.setState({
      resetName: e.target.value.trim()
    });
  };
  //重命名弹窗ok回调
  onResetNameOk = () => {
    const { DataState, dispatch } = this.props;
    let url = "/EditTeachingSolution";
    let UserMsg = DataState.LoginUser;
    // console.log(this.state.resetName)
    if (
      this.state.resetName === DataState.GetSolutionID.Solution.SolutionName ||
      this.state.resetName === ""
    ) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-error",
          title: "你输入的方案名有误~",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this)
        })
      );
      return;
    }
    postData(
      CONFIG.TeachingSolutionProxy + url,
      {
        SolutionID: DataState.GetSolutionID.Solution.SolutionID,
        UserID: UserMsg.UserID,
        SolutionName: this.state.resetName
      },
      2
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.StatusCode === 200) {
          dispatch(
            actions.UpUIState.showErrorAlert({
              type: "success",
              title: "成功",
              onHide: this.onAlertWarnHide.bind(this)
            })
          );
          this.setState({
            resetName: ""
          });
          dispatch(
            actions.UpDataState.getTeachingSolutionMsg(
              "/ListTeachingSolutions?period=&beginTime="+this.state.period.StartDate+"&endTime="+this.state.period.EndDate+"&pageSize=12&currentPage=1&userId=" +
                JSON.parse(sessionStorage.getItem("UserInfo")).UserID
            )
          );
        }
      });

    dispatch(actions.UpUIState.ResetNameModalClose());
  };
  //提示弹窗
  onAppAlertOK() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertCancel() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertClose() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  //自动关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  //重命名弹窗取消回调
  onResetNameCancel = () => {
    const { dispatch } = this.props;

    dispatch(actions.UpUIState.ResetNameModalClose());
  };
  // 方案数据子传父
  upData = childObj => {
    // console.log(childObj)

    if (!(childObj instanceof Object)) {
      console.log("upData所传递参数错误");
      return;
    }
    if(childObj.period){
        this.setState({
            period:childObj.period
        })
        // console.log(childObj.period)
    }
  };
  render() {
    const { UIState, DataState } = this.props;
    let UserID = DataState.LoginUser.UserID

    return (
      <React.Fragment>
        <Loading
          opacity={false}
          tip="加载中..."
          size="large"
          spinning={UIState.AppLoading.appLoading}
        >
          <Frame
            userInfo={{
              name: DataState.LoginUser.UserName,
              image: DataState.LoginUser.PhotoPath
            }}
            module={{
              cnname: "教学方案管理",
              enname: "Teaching Absolution",
              image: logo
            }}
            type="triangle"
            showBarner={false}
            showLeftMenu={false}
          >
            {/* <div ref="frame-time-barner"><TimeBanner /></div> */}

            <div
              className="box"
            //   style={{
            //     background:
            //       DataState.GetTeachingSolutionMsg.solutionData instanceof
            //         Array &&
            //       DataState.GetTeachingSolutionMsg.solutionData.length
            //         ? "transparent"
            //         : "#fff"
            //   }}
              ref="frame-right-content"
            >
              {/* {DataState.GetTeachingSolutionMsg.solutionData instanceof Array &&
              DataState.GetTeachingSolutionMsg.solutionData.length ? */}
               {UserID?
                <TeachingAbsolution
                  upData={this.upData.bind(this)}
                ></TeachingAbsolution>:''
              }
              {/* : (
                <Empty
                  type="4"
                  className="Empty"
                  title="您还没有添加教学方案哦~"
                ></Empty>
              )} */}
            </div>
          </Frame>
        </Loading>
        <Alert
          show={UIState.AppAlert.appAlert}
          type={UIState.AppAlert.type}
          abstract={UIState.AppAlert.littleTitle}
          title={UIState.AppAlert.title}
          onOk={UIState.AppAlert.onOk}
          onHide={UIState.AppAlert.onHide}
          onCancel={UIState.AppAlert.onCancel}
          onClose={UIState.AppAlert.onClose}
        ></Alert>
        {/* 模态框 */}
        <Modal
          ref="CourseClassDetailsMadal"
          bodyStyle={{ height: 522 + "px", padding: 0 }}
          type="1"
          width={936}
          footer={null}
          title={"教学方案详情"}
          visible={UIState.TeachingSolutionDetailsModal.Show}
          onOk={this.TeachingSolutionDetailsModalOk}
          onCancel={this.TeachingSolutionDetailsModalCancel}
        >
          <Loading spinning={UIState.AppLoading.modalLoading}>
            <SolutionDetails></SolutionDetails>
          </Loading>
        </Modal>
        {/* 重命名 */}
        <AntdModal
          width={300}
          title={"重命名"}
          onOk={this.onResetNameOk}
          onCancel={this.onResetNameCancel}
          visible={UIState.TeachingSolutionDetailsModal.ResetNameShow}
        >
          <div className="resetName">
            <span className="left">方案名称：</span>
            <Input
              className="right"
              placeholder="请输入新的方案名称"
              value={this.state.resetName}
              onChange={this.onResetNameChange.bind(this)}
            ></Input>
          </div>
        </AntdModal>
      </React.Fragment>
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
export default connect(mapStateToProps)(App);
