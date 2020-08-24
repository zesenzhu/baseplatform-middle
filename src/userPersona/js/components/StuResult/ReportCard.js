import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import { Tabs, DatePicker, Tooltip } from "antd";
import Public from "../../../../common/js/public";
import { Loading } from "../../../../common";
import ContentItem from "../contentItem";
let { MainActions, CommonActions } = actions;
const { TabPane } = Tabs;
class ReportCard extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  componentWillMount() {}

  render() {
    let { data } = this.props;
    let { SubjectName, CourseName, Score, Rank, Comment } = data;
    return (
      <div className="ReportCard">
        <p title={SubjectName} className="SubjectName">
          {SubjectName}
        </p>
        <div className="RC-Msg">
          <div className="RCM-content">
            <p title={Score} className="RCMc-top">
              {Score}
            </p>
            <p className="RCMc-bottom">总评分</p>
          </div>
          <i className='devide'></i>
          <div className="RCM-content">
            <p title={Rank} className="RCMc-top">
              {Rank}
            </p>
            <p className="RCMc-bottom">评定等级</p>
          </div>
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
export default connect(mapStateToProps)(ReportCard);
