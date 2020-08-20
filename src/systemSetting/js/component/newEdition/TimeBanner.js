import React from "react";
import { connect } from "react-redux";
import "../../../sass/newEdition/TimeBanner.scss";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import history from "../../containers/history";
import TopMenu from './TopMenu'
// import { Button } from "../../../common";
class TimeBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [
        { value: "Semester", title: "学年学期设置", icon: "Semester" },
        { value: "School", title: "学校基础资料设置", icon: "School" },
        { value: "Subsystem", title: "子系统访问设置", icon: "Subsystem" },
        
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
    // let {List} = this.state
    // let userMsg = DataState.LoginUser;
    // let AdminPower = true;
    // if (userMsg.UserType === "7" && userMsg.UserClass === "2") {
    //   AdminPower = false;
    // }
    // let pathname = history.location.pathname;

    // let pathArr = pathname.split("/");
    // let handleRoute = pathArr[2];
    // console.log(this.props.List);

    return (
      <Router>
        <TopMenu path={this.props.path} List = {this.props.List}></TopMenu>
        
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
