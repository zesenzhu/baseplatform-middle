import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

class TipsLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let Logs = this.props.data;
    return (
      <React.Fragment>
        <div className="tips-Box">
          <Scrollbars autoHeight autoHeightMax={350} style={{ width: "400px" }}>
            {Logs instanceof Array &&
              Logs.map((child, index) => {
                return (
                  <div key={index} className="box-content">
                    <div className="content" style={{ borderBottom: "1px #c1c1c1 dashed"}}>
                      <span title={child.Content} className={`content-text `}>
                        {child.Content}
                      </span>
                    </div>
                    {/* <hr style={{ borderBottom: "1px #c1c1c1 dashed",width:'380px' }} /> */}
                  </div>
                );
              })}
          </Scrollbars>
        </div>
      </React.Fragment>
    );
  }
}

export default TipsLog;
