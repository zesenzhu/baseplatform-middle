import React, { Component } from "react";
// import { Table } from "antd";
import UpDataState from "../../action/data/UpDataState";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { Radio, RadioGroup, Loading, Empty,Modal ,DropDown} from "../../../../common";
import { Input } from "antd";
class SetTextBookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // visible:true,
      // inputValue:'',
    };
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
  setTextBookOk =()=>{
    this.setState({visible:false})
  }
  setTextBookCancel=()=>{
    this.setState({visible:false})
  }
  changeinput =(e)=>{
    this.setState({
      inputValue: e.target.value.trim()
    })
  }
  inputFocus=()=>{

  }
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
      <div>
      <Loading
        spinning={DataState.TextBookParams.SetTextBook.SetTextBookModalLoading}
        opacity={false}
        tip="请稍候..."
      >
        <div className={`SetTextBookModal `}>
          <div className="Set-msg">
            <span title={Subject.SubjectName} className="msg-box">
              学科：<span className="msg-type" style={{'color':'#ff6600'}}>{Subject.SubjectName}</span>
            </span>
            <span title={Grade.GradeName} className="msg-box">
              年级：<span className="msg-type" style={{'color':'#ff6600'}}>{Grade.GradeName}</span>
            </span>
            <span title={Period.PeriodName} className="msg-box">
              学期：<span className="msg-type" style={{'color':'#ff6600'}}>{Period.PeriodName}</span>
            </span>
          </div>
          <div className="set-textbook-content">
            <p className="content-title">请选择教材:</p>
           
            <RadioGroup
              value={TextBook.TextBookId}
              onChange={this.onRadioGroupChange}
            >
              <div className="content-box">
            
                <Scrollbars style={{ width: 100 + "%", height: 340 + "px" }}>
                <div className='add-textbook-div' onClick={()=>{this.props.setTextBookshow(1)}}><i></i><b>+ 添加教材</b></div>
                  {TextBookList instanceof Array && TextBookList.length > 0 ? (
                    TextBookList.map((child,index) => {
                      return (
                        <div key={index} className="textbook-box" style={child.TextBookId==TextBook.TextBookId?{background:"#E8F4FF"}:{}}>
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
                  ) : 
                    // <Empty
                    //   type="4"
                    //   title="该学科暂无教材"
                    //   style={{ top: "20px", position: "relative" }}
                    // ></Empty>
                  ''}
                </Scrollbars>
              </div>
            </RadioGroup>
            
          </div>
        </div>
      </Loading>
      {/* <Modal
          ref="setTextBook"
          bodyStyle={{ padding: '16px' }}
          type="1"
          width={780}
          title={"添加教材"}
          visible={this.state.visible}
          onOk={this.setTextBookOk.bind(this)}
          onCancel={this.setTextBookCancel.bind(this)}
          className="setTextBook-Modal"
        >
         <div>名称：<Input className='input-class' placeholder="请输入教材名称" onChange={this.changeinput.bind(this)} maxLength={50} value={this.state.inputValue} onFocus={() => { this.inputFocus() }} type='text' max={10} style={{ width: '280px'}}></Input></div>
         <div><span>年级：</span></div>
        {this.state.TextBookList? <DropDown width={150} dropSelectd={TextBookList[this.state.dropListSelectidx0]} type="simple" onChange={this.onDropChange0.bind(this)} dropList={TextBookList} height={200}></DropDown > : []}
        </Modal> */}
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

export default connect(mapStateToProps)(SetTextBookModal);
