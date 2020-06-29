import React, { Component } from "react";
import {
  Frame,
  Menu,
  Loading,
  Alert,
  PagiNation,
  DropDown,
  Search,
  Empty
} from "../../../common";
import { connect } from "react-redux";
import "../../scss/TeachingSolution.scss";
import ShowCard from "./ShowCard";
import { getData, postData } from "../../../common/js/fetch";
import actions from "../actions";

class TeachingSolution extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      dropSelect: { value: 0, title: "全部" },
      DropList: [
        { value: 0, title: "全部",StartDate:'', EndDate:''},
        
      ],
      CancelBtnShow: "n",
      keyword: "",
      searchValue: "",
      userMsg: props.DataState.LoginUser,
      pagination:1
    };
  }

  //分页改变回调
  onPaginationChange = page => {
    const { dispatch } = this.props;
    // console.log(page)
    this.setState({
      pagination: page
    });
    dispatch(
      actions.UpDataState.getTeachingSolutionMsg(
        "/ListTeachingSolutions?period=" +
          this.state.keyword +
          "&beginTime="+this.state.dropSelect.StartDate+"&endTime="+this.state.dropSelect.EndDate+"&pageSize=12&currentPage=" +
          page +
          "&userId=" +
          this.state.userMsg.UserID
      )
    );
  };
  // 学期下拉
  periodDropMenuSecond = e => {
    const { dispatch, DataState } = this.props;
    this.setState({
      dropSelect: e
    });
    console.log(e)
    let time = e.value;
    let StartDate = '';
    let EndDate = '';
    let period = { value: 0, title: "全部",StartDate:'', EndDate:''};
    DataState.GetTeachingSolutionMsg.solutionTerm.map((child,index)=> {
      if(child.value===time){
        StartDate = child.StartDate;
        EndDate = child.EndDate;
        period = child
      }
    })
    this.props.upData({ period: period });

    dispatch(
      actions.UpDataState.getTeachingSolutionMsg(
        "/ListTeachingSolutions?period=" +
          this.state.keyword +
          "&beginTime="+StartDate+"&endTime="+EndDate+"&pageSize=12&currentPage=" +
          this.state.pagination +
          "&userId=" +
          this.state.userMsg.UserID
      )
    );
  };
  // 搜索
  SolutionSearch = e => {
    const { dispatch, DataState } = this.props;

    if (e.value === "") {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-error",
          title: "你还没有输入关键字哦~",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this)
        })
      );
      return;
    }
    this.setState({
      keyword: "&keyword=" + e.value,
      CancelBtnShow: "y",
      pagination: 1
    });
    dispatch(
      actions.UpDataState.getTeachingSolutionMsg(
        "/ListTeachingSolutions?period=&keyword=" +
          e.value +
          "&beginTime="+this.state.dropSelect.StartDate+"&endTime="+this.state.dropSelect.EndDate+"&pageSize=12&currentPage=" +
          this.state.pagination +
          "&userId=" +
          this.state.userMsg.UserID
      )
    );
  };
  //搜索change
  onChangeSearch = e => {
    this.setState({
      searchValue: e.target.value
    });
  };
  // 取消搜索
  onCancelSearch = e => {
    const { dispatch } = this.props;
    this.setState({
      CancelBtnShow: "n",
      keyword: "",
      searchValue: "",

      pagination: 1
    });
    dispatch(
      actions.UpDataState.getTeachingSolutionMsg(
        "/ListTeachingSolutions?period=&keyword=&beginTime="+this.state.dropSelect.StartDate+"&endTime="+this.state.dropSelect.EndDate+"&pageSize=12&currentPage=" +
          this.state.pagination +
          "&userId=" +
          this.state.userMsg.UserID
      )
    );
  };
  //提示事件
  onAppAlertOK() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertCancel() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  onAppAlertClose() {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  }
  render() {
    const { DataState, UIState } = this.props;

    return (
      <div id="TeachingSolution">
        <div className="content-box">
          <div className="box-top">
            <div className='top-period'>
            <span className='period-tips'>学期</span>
            <DropDown
              ref="dropMenu"
              width={120}
              height={240}
            //   title={"学期"}
            //   className="top-period"
              dropSelectd={this.state.dropSelect}
              dropList={DataState.GetTeachingSolutionMsg.solutionTerm}
              onChange={this.periodDropMenuSecond.bind(this)}
            ></DropDown>
            </div>
            <Search
              placeHolder="输入关键词搜索.."
              onClickSearch={this.SolutionSearch.bind(this)}
              height={30}
              width={250}
              className='top-search'
              Value={this.state.searchValue}
              onCancelSearch={this.onCancelSearch}
              onChange={this.onChangeSearch.bind(this)}
              CancelBtnShow={this.state.CancelBtnShow}
            ></Search>
          </div>
          <div className="box-content">
            {DataState.GetTeachingSolutionMsg.solutionData instanceof Array && DataState.GetTeachingSolutionMsg.solutionData.length > 0 ?DataState.GetTeachingSolutionMsg.solutionData.map(
              (child, index) => {
                return <ShowCard key={index} params={child}></ShowCard>;
              }
            ):(
                <Empty
                  type="4"
                  className="Empty"
                //   title="您还没有添加教学方案哦~"
                ></Empty>
              )}
          </div>

          <PagiNation
            className="pagination"
            hideOnsinglePage={true}
            pageSize={12}
            current={this.state.pagination}
            showQuickJumper={true}
            total={DataState.GetTeachingSolutionMsg.TotalPage}
            onChange={this.onPaginationChange.bind(this)}
          ></PagiNation>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState
  };
};
export default connect(mapStateToProps)(TeachingSolution);
