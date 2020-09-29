import React, { Component } from "react";
import { Tooltip } from "antd";
import TipsLog from "./TipsLog";
let columns = [
  {
    title: "姓名",
    align: "center",
    key: "UserName",
    width: 115,
    colSpan: 1,
    render: (data) => {
      let { UserName } = data;

      return (
        <span title={UserName} className="UserName">
          {UserName}
        </span>
      );
    },
  },
  {
    title: "工号",
    align: "center ",
    colSpan: 1,
    width: 115,
    key: "UserID",
    render: (data) => {
      let { UserID } = data;

      return (
        <span title={UserID} className="UserID">
          {UserID}
        </span>
      );
    },
  },
  {
    title: "所在部门",
    align: "left ",
    colSpan: 1,
    width: 630,
    key: "Content",
    render: (data) => {//教研组长的要特殊处理，学科不用tooltip，在Default组件控制
      let { Content } = data;
      if (Content instanceof Array) {
        let len = Content.length;
        if (len > 2) {
          return (
            <span className="Content">
              <span title={Content[0]} className="Content-title">
                {Content[0]}
              </span>
              {"；"}
              <span title={Content[1]} className="Content-title">
                {Content[1]}
              </span>
              <span className="Content-more">
                等
                <Tooltip
                  placement="top"
                  trigger={[ 'click']}
                  autoAdjustOverflow={true}
                  getPopupContainer={(e) => e.parentNode}
                  arrowPointAtCenter={true}
                  title={<TipsLog data={Content}></TipsLog>}
                >
                  <i>{len}</i>
                </Tooltip>
                个班级
              </span>
            </span>
          );
        } else {
          return (
            <span title={Content.join("；")} className="Content">
              {Content.length>0?Content.join("；"):'--'}
            </span>
          );
        }
      } else {
        return <span className="Content">--</span>;
      }
    },
  },
];
export default columns;
