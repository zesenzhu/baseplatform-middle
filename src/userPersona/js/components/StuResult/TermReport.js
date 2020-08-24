import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import { Tabs, DatePicker, Tooltip } from "antd";
import Public from "../../../../common/js/public";
import { Loading, Empty } from "../../../../common";
import ContentItem from "../contentItem";
import ReportCard from "./ReportCard";
let { MainActions, CommonActions } = actions;
const { TabPane } = Tabs;
class TermReport extends Component {
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
        MainData: { StudentReportData },
      },
    } = this.props;
    let CommentData = "";
    return (
      <div id="TermReport">
        <div className="TR-box">
          {StudentReportData instanceof Array &&
          StudentReportData.length > 0 ? (
            StudentReportData.map((child, index) => {
              if (child.SubjectName === "-1") {
                return "";
              }
              return <ReportCard data={child} key={index}></ReportCard>;
            })
          ) : (
            <Empty
              style={{ marginBottom: "20px" }}
              type={"4"}
              title={"暂无学科成绩"}
            ></Empty>
          )}
        </div>
        <div className="TR-bottom clearfix">
          <span className="TRt-left">班主任评语:</span>
          <p className="TRt-right">
            {StudentReportData instanceof Array &&
            (CommentData = StudentReportData.find((child) => {
              return child.SubjectName === "-1";
            })) &&
            CommentData.Comment
              ? CommentData.Comment
              : <span className='none'>暂无班主任评语</span>}
          </p>
        </div>
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
export default connect(mapStateToProps)(TermReport);
