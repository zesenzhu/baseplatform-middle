import React from "react";
import { connect } from "react-redux";
import "../../../scss/newEdition/TimeBanner.scss";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import history from "../../containers/history";
import TopMenu from './TopMenu'
import { Button } from "../../../../common";
class TimeBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [
        // { value: "All", title: "用户档案总览", icon: "All" },
        { value: "Student", title: "学生账号管理", icon: "Student" },
        { value: "Parent", title: "家长账号管理", icon: "Parent" },
        { value: "Teacher", title: "教师账号管理", icon: "Teacher" },
        { value: "Leader", title: "领导账号管理", icon: "Leader" },
        { value: "Admin", title: "管理员账号管理 ", icon: "Admin" },
      ],
    };
  }
  onSelectMenu = (key) => {
    let route = history.location.pathname;

    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    // if (key !== "All") {
    //   // console.log(key)
    //   if (handleRoute === "Student") {
    //     window.StudentCancelSearch();
    //   } else if (handleRoute === "Teacher") {
    //     window.TeacherCancelSearch();
    //   } else if (handleRoute === "Leader") {
    //     window.LeaderCancelSearch();
    //   }
    //   history.push("/UserArchives/" + key + "/all");
    // } else {
    //   history.push("/UserArchives/" + key);
    // }
    history.push('/'+key)
  };
  render() {
    const { DataState, UIState, route } = this.props;
    let {List} = this.state
    let userMsg = DataState.LoginUser;
    let AdminPower = true;
    if (userMsg.UserType === "7" && userMsg.UserClass === "2") {
      AdminPower = false;
    }
    // let pathname = history.location.pathname;

    // let pathArr = pathname.split("/");
    // let handleRoute = pathArr[2];
    // console.log(handleRoute);

    return (
      <Router>
        <TopMenu List = {this.props.List}></TopMenu>
        
      </Router>
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
export default connect(mapStateToProps)(TimeBanner);
