import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import { Tabs, DatePicker, Tooltip, Progress } from "antd";
import Public from "../../../../common/js/public";
import { Loading } from "../../../../common";
import ContentItem from "../contentItem";
import moment from "moment";
let { MainActions, CommonActions } = actions;
const { TabPane } = Tabs;
class NearExam extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  componentWillMount() {}

  render() {
    let {
      MoreData: {
        CommonData: {
          StuResultParams: { SelectBar, TabLoadingVisible },
        },
        MainData: {
          StuNearExamData: {
            PubName,
            TotalScore,
            RankClass,
            RankGrade,
            LevelName,
            StartTime,
            EndTime,
            CourseScoreList,
          },
        },
      },
    } = this.props;
    let SubNamesList = [];
    let SubContent = [];
    let StartDate = moment(StartTime ? new Date(StartTime) : new Date()).format(
      "YYYY-MM-DD"
    );
    let EndDate = moment(StartTime ? new Date(EndTime) : new Date()).format(
      "YYYY-MM-DD"
    );
    CourseScoreList instanceof Array &&
      CourseScoreList.forEach((child, index) => {
        let { SubjectName, Score } = child;
        SubNamesList.push(SubjectName);
        SubContent.push(
          <span
            key={index}
            className={`Sub-score-box ${
              Score >= 90 ? "score-1" : Score >= 60 ? "score-2" : "score-3"
            }`}
          >
            <span title={Score ? Score + "分" : ""} className="Ssb-Score">
              {Score||Score===0 ? Score : "--"} <span>分</span>
            </span>
            <span title={SubjectName ? SubjectName : ""} className="Ssb-Sub">
              {SubjectName ? SubjectName : "--"}
            </span>
          </span>
        );
      });
    let SubNames = SubNamesList.join(",");

    return (
      <div id="NearExam">
        <p title={PubName ? PubName : "--"} className="NE-title">
          {PubName ? PubName : "--"}
        </p>
        <p className="NE-Msg">
          <span className="NEm-type">
            考试类型:{" "}
            <span title={LevelName ? LevelName : "--"}>
              {LevelName ? LevelName : "--"}
            </span>
          </span>
          <span className="NEm-Sub">
            考试科目:{" "}
            <span title={SubNames ? SubNames : "--"}>
              {SubNames ? SubNames : "--"}
            </span>
          </span>
          <span className="NEm-Time">
            考试时间:{" "}
            <span title={StartDate + "~" + EndDate}>
              {StartDate + "~" + EndDate}
            </span>
          </span>
        </p>
        <div className="NE-box">
          <div className="NEb-content">
            <div className="NEbc-box">
              {/* <Progress
                type="circle"
                width={96}
                // strokeWidth={8}
                strokeColor={
                  //   {
                  //   "0%": "#5cc5ff",
                  //   "100%": "#008fff",
                  // }
                  "#5cc5ff"
                }
                format={() => {
                  return (
                    <span className="Progress-content">
                      {RankClass}
                      <span>分</span>
                    </span>
                  );
                }}
                className="Progress-RankClass"
                percent={100}
              /> */}
              <div className="Progress-RankClass">
                <span className="Progress-content">
                  {RankClass}
                  <span>分</span>
                </span>
              </div>
              <p className="Progress-title">总分</p>
            </div>
            <div className="NEbc-box">
              {/* <Progress
                type="circle"
                width={96}
                strokeColor={
                  // {
                  // "0%": "#93d700",
                  // "100%":
                  "#489200"
                  //    ,
                  // }
                }
                format={() => {
                  return <span className="Progress-content">{TotalScore}</span>;
                }}
                className="Progress-TotalScore"
                percent={100}
              /> */}
              <div className="Progress-TotalScore">
                <span className="Progress-content">{TotalScore}</span>
              </div>
              <p className="Progress-title">班级排名</p>
            </div>
            <div className="NEbc-box">
              {/* <Progress
                type="circle"
                width={96}
                strokeColor={
                  // {
                  // "0%": "#ffa17b",
                  // "100%":
                  "#ff586c"
                  //   ,
                  // }
                }
                format={() => {
                  return <span className="Progress-content">{RankGrade}</span>;
                }}
                className="Progress-RankGrade"
                percent={100}
              /> */}
              <div className="Progress-RankGrade">
                <span className="Progress-content">{RankGrade}</span>
              </div>
              <p className="Progress-title">年级排名</p>
            </div>
          </div>
        </div>
        <div className="NE-Details">{SubContent}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let { UIState, DataState, PublicState } = state;
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(NearExam);
