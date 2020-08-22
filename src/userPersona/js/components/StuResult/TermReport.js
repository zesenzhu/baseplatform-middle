import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import { Tabs, DatePicker, Tooltip } from "antd";
import Public from "../../../../common/js/public";
import { Loading } from "../../../../common";
import ContentItem from "../contentItem";
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
      },
    } = this.props;
    return <div id="TermReport">TermReport</div>;
  }
}

const mapStateToProps = (state) => {
  let { UIState, DataState, PublicState } = state;
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(TermReport);
