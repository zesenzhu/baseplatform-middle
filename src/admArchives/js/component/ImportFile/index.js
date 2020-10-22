import React, { Component } from "react";
import { connect } from "react-redux";

import { Menu, Loading, Alert } from "../../../../common";

import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import history from "../../containers/history";

import actions from "../../actions";
import $ from "jquery";
import CONFIG from "../../../../common/js/config";

// import "../../scss/index.scss";

import {
  DetailsModal,
  DropDown,
  PagiNation,
  Search,
  Table,
  Button,
  CheckBox,
  CheckBoxGroup,
  Modal,
} from "../../../../common/index";

import { getData } from "../../../../common/js/fetch";

import ImportExcel from "../../../../common/js/Import/ImportExcel";
import ImportPhoto from "../../../../common/js/Import/ImportPhoto";

class ImportFile extends React.Component {
  constructor(props) {
    super(props);

    let path = history.location.pathname.split("/");
    let route = path[2];
    this.state = {
      select: "file",
      userMsg: props.DataState.LoginUser,
      show: true,

      Route:
        route === "Teacher"
          ? "teacher_1"
          : route === "Leader"
          ? "leader_1"
          : route === "Student"
          ? "student_1"
          : "graduate",
      role:
        route === "Teacher"
          ? "教师"
          : route === "Leader"
          ? "领导"
          : route === "Student"
          ? "学生"
          : route === "Graduate"
          ? "毕业生"
          : "",
      // userType:
      //   props.DataState.LoginUser.UserClass === 1 ||
      //   props.DataState.LoginUser.UserClass === 2
      //     ? true
      //     : false //1、2表示是学校管理员，4表示学院管理员
    };
    const { dispatch, DataState } = this.props;
  }

  componentWillMount() {
    let path = history.location.pathname.split("/");
    let route = path[2];
    this.setState({});
    // document.title=route === 'Teacher' ? '导入教师档案' :route === 'Leader'?'导入领导 档案'  :route === 'Student'?'导入学生档案':'导入毕业生档案'
  }

  //点击tab
  onTabClick = (name) => {
    let path = history.location.pathname.split("/");
    let route = path[2];

    this.setState({
      select: name,
      show: true,
      Route:
        name === "picture"
          ? route
          : route === "Teacher"
          ? "teacher_1"
          : route === "Leader"
          ? "leader_1"
          : route === "Student"
          ? "student_1"
          : route === "Graduate"
          ? "graduate"
          : "",
    });

    // this.setState({
    //     type:type,
    //     route:route
    // })
    // this.ImportHtml(name,route)
  };
  render() {
    const { UIState, DataState } = this.props;
    let path = history.location.pathname.split("/");
    let route = path[2];
    console.log(this.state.Route);

    // const data = {
    //     userName: '康欣',
    //     userImg: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
    //     Gende: '男',
    //     userText: '学如逆水行舟，不进则退',
    //     userID: '20170025444',
    //     userGrade: '一年级',
    //     userClass: '1班',
    //     userIDCard: '',
    //     userPhone: '15626248624',
    //     userMail: '1519406168@qq.com',
    //     userAddress: '蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团',
    //     userRegisterTime: '2019-01-01 12:24',
    //     userRegisterIP: '190.163.252.198'
    // };
    return (
      <React.Fragment>
        {/* <Frame
          userInfo={{
            name: DataState.LoginUser.UserName,
            image: DataState.LoginUser.PhotoPath
          }}
          module={{
            cnname: "用户档案管理",
            enname: "User Profile Management",
            image: logo
          }}
          className="myFrame"
          type="circle"
          showLeftMenu={false}
          showBarner={false}
        >
          <div
            className="box"
            ref="frame-right-content"
            key={this.props.location.pathname}
          > */}
        <div
          className="Tab"
          style={{
            display: this.state.Route === "graduate" ? "none" : "block",
          }}
        >
          <span
            ref="file"
            onClick={this.onTabClick.bind(this, "file")}
            className={`Tab-btn ${
              this.state.select === "file" ? "btn-select" : ""
            }`}
          >
            {"导入" + this.state.role + "资料"}
          </span>
          <span
            ref="picture"
            onClick={this.onTabClick.bind(this, "picture")}
            className={`Tab-btn ${
              this.state.select === "picture" ? "btn-select" : ""
            }`}
          >
            {"导入" + this.state.role + "照片"}
          </span>
        </div>
        {/* <iframe id='content-box' src={CONFIG.UserInfoProxy+'/Import.aspx?Token=0111&UserType=Student'}>
                            
                        </iframe> */}
        {/* <Loading opacity={false} size='large' spinning={this.state.show}>
                            <div id='content-box' className='content-box'>

                            </div>
                        </Loading> */}
        <div
          className={"content-box"}
          style={{
            borderRadius:
              this.state.Route === "graduate"
                ? "12px 12px 12px 12px"
                : "0 12px 12px 12px",
          }}
        >
          {this.state.select === "file" ? (
            <ImportExcel
              ImportTitle={route === "Graduate" ? "导入毕业去向" : ""}
              ImportTarget={this.state.Route}
            ></ImportExcel>
          ) : (
            <ImportPhoto
              ImportTarget={
                this.state.Route === "Leader"
                  ? "SchoolLeader"
                  : this.state.Route
              }
            ></ImportPhoto>
          )}
        </div>
        {/* </div>
        </Frame> */}
      </React.Fragment>
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

export default connect(mapStateToProps)(ImportFile);
