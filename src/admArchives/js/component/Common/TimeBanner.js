import React, { Component } from "react";
import {
  Loading,
  Empty,
  DropDown,
  CheckBox,
  CheckBoxGroup,
  PagiNation,
  Modal,
  Button,
  Search,
} from "../../../../common";
import { connect } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { Icon, Table } from "antd";
import history from "../../containers/history";
import { postData, getData } from "../../../../common/js/fetch";
import CONFIG from "../../../../common/js/config";
import actions from "../../actions";
// import "../../scss/Main.scss";
import $ from "jquery";
const { UpDataState, UpUIState, PublicAction } = actions;
class TimeBanner extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    const { DataState } = nextProps;
  }
  componentDidMount() {}
  render() {
    const {
      DataState: {
        MainData: { UnreadLogCount },
        CommonData: { BannerList, RouteData,RolePower: { IsCollege, IsLeader }, },
      },
      PublicState,
      SelectMenu,
    } = this.props;
    let handleRoute = RouteData[1];

    return (
      <Router>
        <div className="TimeBanner">
          {BannerList instanceof Array &&
            BannerList.map((child, index) => {
              return (
                <span
                  key={index}
                  onClick={() => SelectMenu(child.value)}
                  className={`menu-bar ${
                    handleRoute === child.value ? "active" : ""
                  }`}
                >
                  <span className={`bar-content ${"bar-icon-" + child.icon}`}>
                    {child.title}
                  </span>
                </span>
              );
            })}
        </div>
        {!IsLeader?UnreadLogCount !== 0 ? (
          <span className="timeBanner_tips">
            最近有
            <span className="tips_num">{UnreadLogCount}</span>
            份档案发生了变更，
            <Link
              to="/UserArchives/LogDynamic"
              target="_blank"
              className="tips_handle"
            >
              查看详情{">>"}
            </Link>
          </span>
        ) : (
          <span className="timeBanner_tips">
            最近没有档案发生变更，
            <Link
              to="/UserArchives/LogRecord"
              target="_blank"
              className="tips_handle"
            >
              查看全部变更记录{">>"}
            </Link>
          </span>
        ):''}
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  let { UIState, DataState, PublicState } = state;
  return {
    UIState,
    DataState,
    PublicState,
  };
};
export default connect(mapStateToProps)(TimeBanner);
