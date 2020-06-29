import React, { Component } from "react";
import { Loading } from "../../../common";
import { connect } from "react-redux";
import Frame from "../../../common/Frame";
import history from "../containers/history";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";

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
      UserMsg: props.DataState.LoginUser,
      type:''
    };
  }

  componentWillMount() {
    const { dispatch, DataState } = this.props;
    let UserID = this.getQueryVariable("userID");
    let type = this.getQueryVariable('type')
    console.log(UserID,type);
    if(!UserID||!type){
      return false
    }
    this.setState({
      type:type
    })
    dispatch(actions.UpDataState.getUserInfo("/GetUserDetail?UserID=" + UserID));
  }

  getQueryVariable = variable => {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === variable) {
        return pair[1];
      }
    }
    return false;
  };

  render() {
    const { UIState, DataState } = this.props;
    let data = DataState.UserInfo;
    let type = this.state.type;
    console.log(data,type)
    if(!Object.keys(data).length||!type){
      return false
    }
    return (
      <div className="UserInfo">
        <Loading
          opacity={false}
          tip="加载中..."
          size="large"
          spinning={UIState.AppLoading.appLoading}
          // spinning={false}
        >
          <div className="modal-top">
            <div className="top-img" alt={data.UserName}   style={{background:`url(${data.PhotoPath_NoCache}) no-repeat center center / 80px`}}>
              {/* <img
                width={80}
                height={80}
                alt={data.UserName}
                src={data.PhotoPath_NoCache}
              ></img> */}
            </div>
            <p className="top-userName" title={data.UserName}>
              {data.UserName}
              <span title={data.Gender } style={{ opacity: 0.64, marginLeft: 3 + "px" }}>
                {data.Gender === "男" ? "♂" : data.Gender === "女" ? "♀" : ""}
              </span>
            </p>
            <p className="top-userText" title={data.Sign}>
              {data.Sign}
            </p>
          </div>
          <div className="modal-content">
            <div className="content-box">
              <div className="row">
                <span className="col-left">
                  {type === "student" || type === "graduate" ? "学号" : "工号"}
                </span>
                <span className="col-right" title={data.UserID}>
                  {data.UserID ? (
                    data.UserID
                  ) : (
                    <span className="content-null">未填写</span>
                  )}
                </span>
              </div>
              <div
                className="row"
                style={{ display: type === "graduate" ? "block" : "none" }}
              >
                <span className="col-left">{"毕业年份"}</span>
                <span className="col-right" title={data.Year + "年"}>
                  {data.Year ? (
                    data.Year + "年"
                  ) : (
                    <span className="content-null">未填写</span>
                  )}
                </span>
              </div>
              <div
                className="row"
                style={{ display: type === "graduate" ? "block" : "none" }}
              >
                <span className="col-left">{"班级"}</span>
                <span className="col-right" title={data.ClassName}>
                  {data.ClassName ? (
                    data.ClassName
                  ) : (
                    <span className="content-null">未填写</span>
                  )}
                </span>
              </div>
              <div
                className="row"
                style={{
                  display:
                    type !== "leader" && type !== "graduate" && type !== "admin"
                      ? "block"
                      : "none"
                }}
              >
                <span className="col-left">
                  {type === "student" || type === "examine"
                    ? "班级"
                    : "所教学科"}
                </span>
                <span
                  className="col-right"
                  title={
                    type === "student" || type === "examine"
                      ? data.GradeName && data.ClassName
                        ? data.GradeName + " > " + data.ClassName
                        : ""
                      : data.SubjectNames
                      ? data.SubjectNames
                      : ""
                  }
                >
                  {type === "student" || type === "examine" ? (
                    data.GradeName && data.ClassName ? (
                      data.GradeName + " > " + data.ClassName
                    ) : (
                      <span className="content-null">未填写</span>
                    )
                  ) : data.SubjectNames ? (
                    data.SubjectNames
                  ) : (
                    <span className="content-null">未填写</span>
                  )}
                </span>
              </div>
              <div
                className="row"
                style={{ display: type === "teacher" ? "block" : "none" }}
              >
                <span className="col-left">{"职称"}</span>
                <span className="col-right" title={data.TitleName}>
                  {data.TitleName ? (
                    data.TitleName
                  ) : (
                    <span className="content-null">未填写</span>
                  )}
                </span>
              </div>
              <div
                className="row"
                style={{ display: type === "leader" ? "block" : "none" }}
              >
                <span className="col-left">{"行政职务"}</span>
                <span className="col-right" title={data.Position}>
                  {data.Position ? (
                    data.Position
                  ) : (
                    <span className="content-null">未填写</span>
                  )}
                </span>
              </div>
              <div
                className="row"
                style={{ display: type === "graduate" ? "block" : "none" }}
              >
                <span className="col-left">{"毕业去向"}</span>
                <span
                  className="col-right"
                  title={
                    (data.jobType ? data.jobType : "") +
                    " " +
                    (data.discription ? data.discription : "")
                  }
                >
                  {data.hasTrack ? (
                    <span className="text-overflow">
                      <span className="text" style={{ marginRight: 10 + "px" }}>
                        {data.jobType}
                      </span>
                      <span className="text">{data.discription}</span>
                    </span>
                  ) : (
                    <span className="content-null">--</span>
                  )}
                </span>
              </div>
              <div className="row" style={{ marginTop: 20 + "px" }}>
                <span className="col-left">{"身份证号码"}</span>
                <span className="col-right" title={data.IDCardNo}>
                  {data.IDCardNo ? (
                    data.IDCardNo
                  ) : (
                    <span className="content-null">未填写</span>
                  )}
                </span>
              </div>
              <div className="row">
                <span className="col-left">{"联系电话"}</span>
                <span className="col-right" title={data.Telephone}>
                  {data.Telephone ? (
                    data.Telephone
                  ) : (
                    <span className="content-null">未填写</span>
                  )}
                </span>
              </div>
              <div className="row">
                <span className="col-left">{"电子邮箱"}</span>
                <span className="col-right" title={data.Email}>
                  {data.Email ? (
                    data.Email
                  ) : (
                    <span className="content-null">未填写</span>
                  )}
                </span>
              </div>
              <div className="row row-adress">
                <span className="col-left">{"家庭住址"}</span>
                <span className="col-right" title={data.HomeAddress}>
                  {data.HomeAddress ? (
                    data.HomeAddress
                  ) : (
                    <span className="content-null">未填写</span>
                  )}
                </span>
              </div>
              <div
                className="row"
                style={{
                  marginTop: 20 + "px",
                  display: type === "examine" ? "block" : "none"
                }}
              >
                <span className="col-left">{"注册时间"}</span>
                <span className="col-right" title={data.UserRegisterTime}>
                  {data.UserRegisterTime ? (
                    data.UserRegisterTime
                  ) : (
                    <span className="content-null">未填写</span>
                  )}
                </span>
              </div>
              <div
                className="row"
                style={{
                  marginBottom: 20 + "px",
                  display: type === "examine" ? "block" : "none"
                }}
              >
                <span className="col-left">{"注册IP"}</span>
                <span className="col-right" title={data.UserRegisterIP}>
                  {data.UserRegisterIP ? (
                    data.UserRegisterIP
                  ) : (
                    <span className="content-null">未填写</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </Loading>
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
export default connect(mapStateToProps)(App);
