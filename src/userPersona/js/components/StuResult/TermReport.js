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
    return (
      <div id="TermReport">
        <div className="TR-box">
          {StudentReportData instanceof Array &&
          StudentReportData.length > 0 ? (
            StudentReportData.map((child, index) => {
              return <ReportCard data={child} key={index}></ReportCard>;
            })
          ) : (
            <Empty type={"4"} title={"暂无学科成绩"}></Empty>
          )}
        </div>
        <div className='TR-bottom'>
          <span className='TRt-left'>
          班主任评语:
          </span>
          <p className='TRt-right'>
            {Comment}
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
