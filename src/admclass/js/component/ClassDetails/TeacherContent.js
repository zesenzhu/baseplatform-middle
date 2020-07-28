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
import TeacherCard from "../Cards/TeacherCard";
// import "../../scss/Main.scss";
import $ from "jquery";
class TeacherContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillReceiveProps(nextProps) {
    const { DataState } = nextProps;
  }
  componentDidMount() {}
  render() {
    const {
      data: { Total, List, Ganger },
      className,
      children,
      onSetGangerClick,
      canControl,
      onReSetClick,
      onDeleteClick,
      onDetailModalShow,
      ...other
    } = this.props;

    return (
      <div className={`TeacherContent ${className}`} {...other}>
        <p className="top-tip">
          <span className="tip-left">教师名单</span>
          <span className="tip-right">({Total}人)</span>
        </p>
        <div className="tc-main">
          <TeacherCard
            type={"ganger"}
            // onCardClick={this.onCardClick}
            onSetGangerClick={onSetGangerClick}
            onReSetClick={onReSetClick}
            onDeleteClick={onDeleteClick}
            // key={index}
            onDetailModalShow={onDetailModalShow}
            data={Ganger}
            canControl={canControl}
            // className={"TeacherCard"}
          ></TeacherCard>
          {List instanceof Array && List.length > 0
            ? List.map((child, index) => {
                return (
                  <TeacherCard
                    key={index}
                    type={"teacher"}
                    onDetailModalShow={onDetailModalShow}
                    data={child}
                    canControl={canControl}
                    // className={"TeacherCard"}
                  ></TeacherCard>
                );
              })
            : ""}
        </div>
      </div>
    );
  }
}
TeacherContent.defaultProps = {
  className: "",
  canControl: false,
  onSetGangerClick: () => {},
  onReSetClick: () => {},
  onDeleteClick: () => {},
  onDetailModalShow: () => {},

  data: {
    Total: 0,
    List: [],
    Ganger: {
      IsSet: false,
    },
  },
};
export default TeacherContent;
