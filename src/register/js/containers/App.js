import React, { Component } from "react";
import { Menu, Loading, Alert, Modal, Button, Empty } from "../../../common";
import { connect } from "react-redux";
import Frame from "../../../common/Frame";

import Register from "../component/Register";
import history from "./history";
import logo from "../../images/icon-WebResources.png";
//import TimeBanner from '../component/TimeBanner'
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";

// import WebsiteCustom from '../component/WebsiteCustom'
import "../../scss/index.scss";
import actions from "../actions";
//import { urlAll, proxy } from './config'

class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      role:'Student'
    };
  }

  componentWillMount() {
    const { dispatch, DataState } = this.props;
    // dispatch(actions.UpUIState.AppLoadingClose());
    let route = history.location.pathname;
    // console.log(route)
    
    dispatch(actions.UpDataState.getSchoolInfo());
    this.requestData(route)
    
    let that = this;
    history.listen(() => {
      //路由监听
      let route = history.location.pathname;
      // 获取接口数据
      // console.log(route)
      that.requestData(route);
    })
  }

  requestData = route => {
    const { dispatch, DataState } = this.props;
    
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    // let ID = pathArr[3];
    if (
      
      handleRoute !== "Student" &&
      handleRoute !== "Teacher"
    ) {
      dispatch(actions.UpUIState.AppLoadingOpen());

      history.push("/Student");
      this.setState({
        role:'Student'
      })
      return;
    }
      this.setState({
        role:handleRoute
      })
    // console.log(handleRoute)

    dispatch(actions.UpUIState.AppLoadingClose());
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

  render() {
    const { UIState, DataState } = this.props;
    let UserID = DataState.LoginUser.UserID;
    return (
      <React.Fragment>
        <Loading
          opacity={false}
          tip="加载中..."
          size="large"
          spinning={UIState.AppLoading.appLoading}
        >
          <Frame
            module={{
              cnname: "注册",
              enname: "Register",
              image: logo
            }}
            className="myFrame"
            register={true}
            type="circle"
            showBarner={false}
            showLeftMenu={false}
          >
            {/* <div ref="frame-time-barner"><TimeBanner /></div> */}

            <div className="box" ref="frame-right-content">
              <Loading spinning={UIState.AppLoading.rightLoading}>
                <Register role={this.state.role}></Register>
              </Loading>
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
