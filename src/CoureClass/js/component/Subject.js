import React from "react";
import { connect } from "react-redux";
import actions from "../actions";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import "../../scss/All.scss";
import ShowCard from "./ShowCard";
import history from "../containers/history";
import Aniamtion from "../../../common/js/Aniamtion/index";

class Subject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Subjects: {},
      green: "#1ca222",
      orange: "#ff7e00",
      blue: "#1790e5"
    };
  }
  componentWillReceiveProps(nextProps) {
    const { DataState, UIState } = nextProps;
    console.log(DataState.GetCoureClassAllMsg.Subjects instanceof Object);

    if (!(DataState.GetCoureClassAllMsg.Subjects instanceof Object)) {
      return;
    }
    let route = history.location.pathname;
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    let routeID = pathArr[2];
    let subjectID = pathArr[3];
    let classID = pathArr[4];
    let isExist = false;
    console.log("ss");
    if (!routeID) {
      return;
    }
    if (this.state.Subjects === DataState.GetCoureClassAllMsg.Subjects) {
      return;
    }
    this.setState({
      Subjects: DataState.GetCoureClassAllMsg.Subjects
    });
    for (let index in DataState.GetCoureClassAllMsg.Subjects) {
      if (index === routeID) {
        isExist = true;
      }
    }
    if (!isExist) {
      history.push("/All");
    }
  }
  ShowCardBox = () => {
    const { DataState, UIState } = this.props;
    let route = history.location.pathname;
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    let routeID = pathArr[2];
    let item = DataState.GetSubjectAllMsg.hasOwnProperty(routeID)
      ? DataState.GetSubjectAllMsg[routeID].Item
      : [];
    //let subject = DataState.GetSubjectAllMsg.hasOwnProperty(routeID)?DataState.GetSubjectAllMsg[routeID].Item:[];
    let showCardBox = item.map((child, index) => {
      return (
        <ShowCard
          type="class"
          params={child}
          subject={routeID}
          key={index + "-" + routeID}
        ></ShowCard>
      );
    });

    return showCardBox;
  };
  render() {
    const { DataState, UIState } = this.props;
    let route = history.location.pathname;
    let pathArr = route.split("/");
    let handleRoute = pathArr[1];
    let routeID = pathArr[2];
    return (
      <div className="All">
        <div className="All-box">
          <div className="All-top">
            <span className="top-tips">
              <span className="tips menu10">教学班级总览</span>
            </span>
          </div>
          <div className="All-hr"></div>
          <div className="All-content">
            <div className="content-All-box">
              <div className="all All-coureClass">
                <Aniamtion.WaveRound
                  background={this.state.green}
                  num={
                    DataState.GetSubjectAllMsg.hasOwnProperty(routeID)
                      ? DataState.GetSubjectAllMsg[routeID].CourseClassCount
                      : ""
                  }
                ></Aniamtion.WaveRound>
                {/* <span className="all-num coureClass-num">
                  {DataState.GetSubjectAllMsg.hasOwnProperty(routeID)
                    ? DataState.GetSubjectAllMsg[routeID].CourseClassCount
                    : ""}
                </span> */}
                <span className="all-tips">教学班数量</span>
              </div>
              <div className="all All-teacher">
                <Aniamtion.WaveRound
                  background={this.state.orange}
                  num={
                    DataState.GetSubjectAllMsg.hasOwnProperty(routeID)
                      ? DataState.GetSubjectAllMsg[routeID].TeacherCount
                      : ""
                  }
                ></Aniamtion.WaveRound>
                {/* <span className="all-num teacher-num">
                  {DataState.GetSubjectAllMsg.hasOwnProperty(routeID)
                    ? DataState.GetSubjectAllMsg[routeID].TeacherCount
                    : ""}
                </span> */}
                <span className="all-tips">任课教师数量</span>
              </div>
              <div className="all All-subject">
                <Aniamtion.WaveRound
                  background={this.state.blue}
                  num={
                    DataState.GetSubjectAllMsg.hasOwnProperty(routeID)
                      ? DataState.GetSubjectAllMsg[routeID].StudentCount
                      : ""
                  }
                ></Aniamtion.WaveRound>
                {/* <span className="all-num teacher-num">
                  {DataState.GetSubjectAllMsg.hasOwnProperty(routeID)
                    ? DataState.GetSubjectAllMsg[routeID].StudentCount
                    : ""}
                </span> */}
                <span className="all-tips">学生人数</span>
              </div>
            </div>
            <div className="content-subject-box">{this.ShowCardBox()}</div>
          </div>
        </div>
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
export default connect(mapStateToProps)(Subject);
