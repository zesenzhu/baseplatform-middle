import React, { Component } from "react";
// import { Table } from "antd";
import UpDataState from "../../action/data/UpDataState";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { Radio, RadioGroup, Loading, Empty } from "../../../../common";
class SetTextBookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // radio change
  onRadioGroupChange = (e) => {
    const { dispatch, DataState } = this.props;
    // console.log(e.target.value,e.target.checked);
    dispatch(
      UpDataState.SetTextBookData({
        TextBook: DataState.TextBookData.TextBookListForKey[e.target.value],
      })
    );
  };
  onRadioChange = (e) => {
    const { dispatch, DataState } = this.props;
    // console.log(e.target.value,e.target.checked);
    // dispatch(
    //   UpDataState.SetTextBookData({
    //     TextBook: DataState.TextBookData.TextBookListForKey[e.target.value],
    //   })
    // );
  };
  render() {
    const { DataState } = this.props;
    let {
      Subject,
      Grade,
      Period,
      TextBook,
    } = DataState.TextBookParams.SetTextBook.TextBookMsg;
    let { TextBookList } = DataState.TextBookData;
    // console.log(TextBook)
    return (
      <Loading
        spinning={DataState.TextBookParams.SetTextBook.SetTextBookModalLoading}
        opacity={false}
        tip="请稍候..."
      >
        <div className={`SetTextBookModal `}>
          <div className="Set-msg">
            <span title={Subject.SubjectName} className="msg-box">
              学科：<span className="msg-type">{Subject.SubjectName}</span>
            </span>
            <span title={Grade.GradeName} className="msg-box">
              年级：<span className="msg-type">{Grade.GradeName}</span>
            </span>
            <span title={Period.PeriodName} className="msg-box">
              学期：<span className="msg-type">{Period.PeriodName}</span>
            </span>
          </div>
          <div className="set-textbook-content">
            <p className="content-title">请选择教材:</p>
            <RadioGroup
              value={TextBook.TextBookId}
              onChange={this.onRadioGroupChange}
            >
              <div className="content-box">
                <Scrollbars style={{ width: 100 + "%", height: 190 + "px" }}>
                  {TextBookList instanceof Array && TextBookList.length > 0 ? (
                    TextBookList.map((child,index) => {
                      return (
                        <div key={index} className="textbook-box">
                          <Radio
                            className="textbook-radio"
                            value={child.TextBookId}
                            title={child.TextBookName}
                            onChange={this.onRadioChange}
                          >
                           <span title={child.TextBookName}> {child.TextBookName}</span> 
                          </Radio>
                        </div>
                      );
                    })
                  ) : (
                    <Empty
                      type="4"
                      title="该学科暂无教材"
                      style={{ top: "20px", position: "relative" }}
                    ></Empty>
                  )}
                </Scrollbars>
              </div>
            </RadioGroup>
          </div>
        </div>
      </Loading>
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

export default connect(mapStateToProps)(SetTextBookModal);
