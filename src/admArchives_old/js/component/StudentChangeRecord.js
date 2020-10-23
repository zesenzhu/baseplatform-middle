import React from "react";
import { connect } from "react-redux";
import "../../scss/StudentChangeRecord.scss";

class StudentChangeRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let data = this.props.data;
    return (
      <React.Fragment>
        {data instanceof Array &&
          data.map((child, index) => {
            return (
              <div key={index} className="content-map">
                <div className="map-left">
                  <div className="left-border"></div>
                  <div className="right-border"></div>
                </div>
                <span title={child.LogTime} className="map-center">{child.LogTime}</span>
                <div title={child.Content} className="map-right">{child.Content}</div>
              </div>
            );
          })}
      </React.Fragment>
    );
  }
}
export default StudentChangeRecord;
