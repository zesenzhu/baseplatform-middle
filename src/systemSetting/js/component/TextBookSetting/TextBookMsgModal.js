import React, { Component } from "react";
// import { Table } from "antd";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { Radio, RadioGroup } from "../../../../common";
import { Tree, Icon } from "antd";
const { TreeNode } = Tree;
class TextBookMsgModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  loop = (data) =>
    data.map((item) => {
      if (item.childs instanceof Array && item.childs.length) {
        return (
          <TreeNode key={item.nodeId} title={item.nodeName}>
            {this.loop(item.childs)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          // switcherIcon={<Icon type="form" />}
          key={item.nodeId}
          title={item.nodeName}
        />
      );
    });
  render() {
    const { DataState } = this.props;

    let { NodeList,OpenNode } = DataState.TextBookData.NodeInfo;
    return (
      <div className={`TextBookMsgModal `}>
        <Scrollbars style={{ width: 100 + "%", height: "100%" }}>
          <Tree
            showLine={true}
            defaultExpandAll={true}
            // defaultExpandedKeys={OpenNode}
          >
            {this.loop(NodeList)}
          </Tree>
        </Scrollbars>
      </div>
    );
  }
}
// PeriodTable.defaultProps = {
//   data: [],
//   title: "",
//   className: "",
// };
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(TextBookMsgModal);
