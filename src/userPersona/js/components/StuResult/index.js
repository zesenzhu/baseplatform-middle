import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import { Carousel, DatePicker, Tabs, Tooltip } from "antd";
import Public from "../../../../common/js/public";
import "./index.scss";
let { MainActions, CommonActions } = actions;

class StuResult extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {};
  }
  render() {
    return <div>1111</div>;
  }
}

const mapStateToProps = (state) => {
  let { UIState, DataState, PublicState } = state;
  return {
    ...state,
  };
};
export default connect(mapStateToProps)(StuResult);
