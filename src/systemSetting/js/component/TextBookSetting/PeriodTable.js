import React, { Component } from "react";
import { Table } from "antd";

class PeriodTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "年级",
          dataIndex: "Grade",
          key: "Grade",
          width: 120,
          align: "center",
          render: (Grade) => {
            return (
              <span className="Grade" title={Grade.GradeName}>
                {Grade.GradeName}
              </span>
            );
          },
        },
        {
          title: "教材",
          dataIndex: "TextBook",
          key: "TextBook",
          width: 180,
          align: "center",
          render: (TextBook) => {
            return (
              <span
                title={TextBook.TextBookId ? TextBook.TextBookName : "--"}
                className={`TextBook TextBookName ${
                  TextBook.TextBookId ? "haveTextBook" : "noTextBook"
                }`}
                onClick={(e) => {
                  if (TextBook.TextBookId)
                    this.props.onTextBookDetailClick(TextBook.TextBookId,TextBook);
                }}
              >
                {TextBook.TextBookId ? TextBook.TextBookName : "--"}
              </span>
            );
          },
        },
        {
          title: "操作",
          // dataIndex: "TextBook",
          key: "Edit",
          width: 100,
          align: "center",
          render: (data) => {
            return (
              <span
                onClick={(e) => {
                  this.props.onEditClick(data);
                }}
                className="Edit"
              >
                {data.TextBook.TextBookId ? "修改" : "设置"}
              </span>
            );
          },
        },
      ],
    };
  }

  render() {
    const { title, data, className } = this.props;
    return (
      <div className={`PeriodTable ${className}`}>
        <p className="table-title">{title}</p>
        <Table
          // loading={UIState.AppLoading.TableLoading}
          columns={this.state.columns}
          pagination={false}
          // onChange={this.onTableChange.bind(this)}
          dataSource={data}
        ></Table>
      </div>
    );
  }
}
PeriodTable.defaultProps = {
  data: [],
  title: "",
  className: "",
};
export default PeriodTable;
