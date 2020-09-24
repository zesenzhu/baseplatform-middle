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
// import WebsiteCustom from '../component/WebsiteCustom'
import "../../scss/index.scss";
import { HandleAction, DataAction, PublicAction } from "../actions";
import Public from "../../../common/js/public";
import Scrollbars from "react-custom-scrollbars";
import Main from "./Main";
const { Bs2CsProxy } = CONFIG;
let { getQueryVariable, setRole } = Public;
// const { HandleAction, DataAction, PublicAction } = actions;
class App extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      UserMsg: props.PublicState.LoginMsg,
    };
  }

  componentWillMount() {
    const { dispatch, DataState } = this.props;
    let route = history.location.pathname;
    //判断token是否存在
    let that = this;
  }

  // 第一次访问所要请求的接口
  RequestData = () => {
    const { dispatch, DataState, PublicState } = this.props;
    // if (!PublicState.LoginMsg.isLogin) {
    //查询userInfo是否存在
    if (JSON.parse(sessionStorage.getItem("UserInfo"))) {
      let userMsg = setRole(JSON.parse(sessionStorage.getItem("UserInfo"))); //做角色处理，增加个Role字段
      dispatch(
        PublicAction.getLoginUser(
          // ...JSON.parse(sessionStorage.getItem("UserInfo")),
          userMsg
        )
      );

      if (!userMsg.SchoolID) {
        //做字段排除，不存在就不能进界面
        return;
      }
      // 数据请求前的处理
      // 获取是否开启家长功能
      dispatch(DataAction.GetConfig({}));

      this.RouteListening({ isFirst: true });

      history.listen(() => this.RouteListening({}));
      // this.RequestData();
      dispatch(PublicAction.AppLoadingClose());
    }
    // }

    // console.log(userMsg.UserType,userMsg.UserClass,userMsg.UserType !== "6" || userMsg.UserClass !== "2")
  };
  // 路由监听
  RouteListening = ({ isFirst = false, fn = () => {} }) => {
    const {
      dispatch,
      DataState,
      PublicState: {
        LoginMsg: { CollegeID, CollegeName },
      },
    } = this.props;

    let Route = this.ConstructRoute();
    dispatch(HandleAction.SetRouteParams(Route));

    let FirstRoute = Route[0];
    let SecondRoute = Route[1];
    // console.log(Route, FirstRoute);
    if (FirstRoute === "") {
      this.AllGetData({});
    } else {
      this.SetFirstDefaultRoute({ isFirst: true });
    }
    fn();
  };

  // 设置第一级默认路径
  SetFirstDefaultRoute = ({ isFirst }) => {
    let { dispatch } = this.props;
    if (isFirst) {
      //如果是第一次,因为不会进行数据和路由更新，需要手动
      dispatch(HandleAction.SetRouteParams(["", ""]));

      this.AllGetData({});
    }
    history.push("/");
  };
  AllGetData = () => {
    let { dispatch } = this.props;

    dispatch(DataAction.GetIdentityTypeList({}));
  };
  // 解析路由
  ConstructRoute = (tpye = "construct", key) => {
    // type:construct,直接解析，获取pathname，分解为数组
    let route = history.location.pathname.slice(1);
    // console.log(history, route);
    let pathArr = route.split("/");
    if (tpye === "construct") {
      if (key === undefined) {
        return pathArr;
      } else if (key instanceof Number) {
        return pathArr[key];
      } else if (key instanceof String) {
        return pathArr.includes((child) => child === key);
      }
    }
  };
  // 搜索修改
  onChangeSearch = (e) => {
    let { dispatch } = this.props;
    dispatch(
      HandleAction.ParamsSetSearchIdentity({ SearchValue: e.target.value })
    );
  };
  // 确认修改
  onClickSearch = (e) => {
    let { dispatch } = this.props;
    dispatch(
      HandleAction.ParamsSetSearchIdentity({
        KeyWord: e.value,
        PageIndex: 1,
        PageSize: 5,
        CancelBtnShow: "y",
      })
    );
    dispatch(DataAction.SearchIdentityUser({}));
    dispatch(
      HandleAction.SetModalVisible({ SearchIdentityModalVisible: true })
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
        ParamsData: {
          SearchIdentity: { SearchValue, KeyWord, CancelBtnShow },
        },
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
      <React.Fragment>
        <Loading
          opacity={false}
          tip="加载中..."
          size="large"
          spinning={AppLoading}
        >
          <Frame
            userInfo={{
              name: UserName,
              image: PhotoPath,
            }}
            module={{
              cnname: cnname,
              enname: enname,
              image: image,
            }}
            type={FrameType}
            showLeftMenu={showLeftMenu}
            showBarner={!showBarner}
            className={`myFrame  ${className}`}
            pageInit={this.RequestData}
          >
            <div ref="frame-time-barner" style={{textAlign:'right'}}>
              <Search
                placeHolder="请输入用户姓名/工号/学号搜索用户身份权限..."
                onClickSearch={this.onClickSearch}
                height={32}
                width={380}
                Value={SearchValue}
                // onCancelSearch={this.onCancelSearch}
                onChange={this.onChangeSearch}
                // CancelBtnShow={CancelBtnShow}
              ></Search>
            </div>
            <div ref="frame-right-content">
              <Loading
                opacity={false}
                // tip="加载中..."
                size="small"
                spinning={ContentLoading}
              >
                <Router>
                  <Route path="/" component={Main}>
                    {/* <Redirect from="*" to="/" /> */}
                  </Route>

                  {/* <Redirect from="/" to="/UserArchives" /> */}
                  {/* <Route path="/" component={Temple}>
                    <Redirect from="/" to="/UserArchives" />
                  </Route> */}
                </Router>
              </Loading>
            </div>
          </Frame>
        </Loading>
        <Alert
          show={appAlert}
          type={type}
          abstract={littleTitle}
          title={title}
          onOk={onOk}
          onHide={onHide}
          onCancel={onCancel}
          onClose={onClose}
        ></Alert>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(App);
