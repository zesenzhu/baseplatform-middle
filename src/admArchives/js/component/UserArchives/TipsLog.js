import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

class TipsLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { data: Logs, userName } = this.props;
    return (
      <div className="TipsLog">
        <div className="TL-top">{userName}的档案变更记录</div>
        <div className="TL-Box">
          <Scrollbars>
            <div className="TL-right">
              <div className="TL-left"></div>

              {Logs instanceof Array &&
                Logs.map((child, index) => {
                  let { LogTime, Content } = child;
                  return (
                    <p key={index} className="TL-details">
                      <span className="TL-time">{LogTime}</span>
                      <span className="TL-content" title={Content}>
                        {Content}
                      </span>
                    </p>
                  );
                })}
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export default TipsLog;
