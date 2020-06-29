import React from "react";
import { connect } from "react-redux";
import { CheckBox, CheckBoxGroup, Tips, DropDown } from "../../../common";
import { Input } from "antd";
import actions from "../actions";
import { postData, getData } from "../../../common/js/fetch";
import CONFIG from "../../../common/js/config";
import "../../scss/WebsiteCustom.scss";

class WebsiteCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      WebName: "",
      WebNameTipsTitle: "网站名称不能为空",
      WebAddress: "",
      WebAddressTipsTitle: "网站地址不能为空",
      Subject: {},
      WebType: {},
      Period: [],
      WebTypeList: [],
      PeriodID:[],
      SubjectList:{},
      checkAll:false
    };
  }

  componentWillMount() {
    const { dispatch, DataState,UIState } = this.props;
    let WebData = DataState.WebsiteData;
    let TypeList = DataState.GetMenuData.TypeList;
    let PeriodList = DataState.GetMenuData.PeriodList;
    let SubjectList = DataState.GetMenuData.SubjectList;
    let checkAll = false
    

    let newPeriodList = [];
    let Period = [];
    PeriodList instanceof Array &&
      PeriodList.map((child, index) => {
        if (child.value !== 0) {
          newPeriodList.push(child);
          // Period.push(child.value); 
        }
      });
    // if (WebData.PeriodID[0] !==  0) {
    //   Period = WebData.PeriodID;
    // }
    if(newPeriodList.length===WebData.PeriodID.length){
      checkAll = true
    }

    this.setState({
      WebName: WebData.WebName,
      WebAddress: WebData.WebAddress,
      Subject: WebData.Subject,
      WebType: WebData.WebType,
      WebTypeList: TypeList.slice(1),
      SubjectList:SubjectList.slice(1),
      PeriodID:WebData.PeriodID,
      PeriodList: newPeriodList,
      checkAll:checkAll
    });
    // this.setState({
    //   // Period: Period,
    //   PeriodList: newPeriodList
    // });
  }
  //   网站名称修改
  onWebNameChange = e => {
    this.setState({
      WebName: e.target.value.trim()
    });
  };
  // 网站名称修改失去焦点
  onWebNameBlur = e => {
    const { dispatch } = this.props;
    let Test = /\S/;

    // console.log(e.target.value);
    let value = e.target.value;
    if (!Test.test(value)) {
      dispatch(
        actions.UpUIState.AppTipsVisible({ WebNameTipsVisible: true })
      );
    } else {
      dispatch(
        actions.UpDataState.setWebsiteData({
          WebName: value
        })
      );
      dispatch(
        actions.UpUIState.AppTipsVisible({ WebNameTipsVisible: false })
      );
    }
  };

  //   网站地址修改
  onWebAddressChange = e => {
    this.setState({
      WebAddress: e.target.value.trim()
    });
  };
  // 网站地址修改失去焦点
  onWebAddressBlur = e => {
    const { dispatch } = this.props;
    let Test = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
    // console.log(e.target.value);
    let value = e.target.value;
    let isTrue = Test.test(value);

    if (value === "") {
      this.setState({
        WebAddressTipsTitle: "网站地址不能为空"
      });
      dispatch(
        actions.UpUIState.AppTipsVisible({
          WebAddressTipsVisible: true
        })
      );
    } else if (!isTrue) {
      this.setState({
        WebAddressTipsTitle: "网站地址格式错误"
      });
      dispatch(
        actions.UpUIState.AppTipsVisible({
          WebAddressTipsVisible: true
        })
      );
    } else {
      this.setState({
        WebAddressTipsTitle: "网站地址不能为空"
      });
      dispatch(
        actions.UpDataState.setWebsiteData({
          WebAddress: value
        })
      );
      dispatch(
        actions.UpUIState.AppTipsVisible({
          WebAddressTipsVisible: false
        })
      );
    }
  };

  // 类型选择
  onDropMenuChange = e => {
    const { dispatch } = this.props;
    console.log(e);
    this.setState({
      WebType: e
    });
    dispatch(
      actions.UpDataState.setWebsiteData({
        WebType: e
      })
    );
  };
 // 学科选择
 onDropMenuSubjectChange = e => {
  const { dispatch } = this.props;
  console.log(e);
  this.setState({
    Subject: e
  });
  dispatch(
    actions.UpDataState.setWebsiteData({
      Subject: e
    })
  );
};
  // 选择学段
  changeCheckBox = Period => {
    const { dispatch } = this.props;
    // console.log(Period)
    let checkAll = false
    if (Period.length === 0) {
      return;
    }

    if(Period.length!==this.state.PeriodList.length){
      checkAll = false
    }else{
      checkAll = true

    }
    // console.log(Period.length,this.state.PeriodList.length,checkAll)

    this.setState({
      PeriodID: Period,
      checkAll:checkAll
    });
    dispatch(
      actions.UpDataState.setWebsiteData({
        PeriodID: Period
      })
    );
  };

  // 选择全部
  onChangeAll =(e)=>{
    const { dispatch } = this.props;
    // console.log(e);
    let Period = [];
    this.state.PeriodList.map((child)=>{
      Period.push(child.value)
    })
    if(e.target.checked){
      
      this.setState({
        PeriodID: Period,
        checkAll:true
      });
    }else{
      Period = [Period[0]]
      this.setState({
        PeriodID: Period,
        checkAll:false
      });
    }
    dispatch(
      actions.UpDataState.setWebsiteData({
        PeriodID: Period
      })
    );
  }
  render() {
    const { LoginUser, DataState,UIState } = this.props;
    return (
      <div className="WebsiteCustom" id="WebsiteCustom">
        <div className="row clearfix">
          <span className="left">网站名称:</span>
          <Tips
            overlayClassName="tips"
            visible={UIState.AppTipsVisible.WebNameTipsVisible}
            title={this.state.WebNameTipsTitle}
          >
            <Input
              className="right webName"
              placeholder="请输入网站名称.."
              maxLength={20}
              onChange={this.onWebNameChange.bind(this)}
              onBlur={this.onWebNameBlur.bind(this)}
              value={this.state.WebName}
            ></Input>
          </Tips>
        </div>
        <div className="row clearfix">
          <span className="left">网站地址:</span>
          <Tips
            overlayClassName="tips"
            visible={UIState.AppTipsVisible.WebAddressTipsVisible}
            title={this.state.WebAddressTipsTitle}
          >
            <Input
              className="right webAddress"
              placeholder="http(s)://"
              maxLength={400}
              onChange={this.onWebAddressChange.bind(this)}
              onBlur={this.onWebAddressBlur.bind(this)}
              value={this.state.WebAddress}
            ></Input>
          </Tips>
        </div>
        <div className="row clearfix">
          <span className="left">适用学科:</span>
          <DropDown
            ref="WebNameDropMenu"
            className="right Subject"
            style={{ zIndex: 2 }}
            onChange={this.onDropMenuSubjectChange.bind(this)}
            width={110}
            height={240}
            dropSelectd={this.state.Subject}
            dropList={this.state.SubjectList}
          ></DropDown>
        </div>
        <div className="row clearfix">
          <span className="left">网站分类:</span>
          <DropDown
            ref="dropMenu"
            className="right WebType"
            style={{ zIndex: 2 }}
            onChange={this.onDropMenuChange.bind(this)}
            width={110}
            height={240}
            dropSelectd={this.state.WebType}
            dropList={this.state.WebTypeList}
          ></DropDown>
        </div>
        <div className="row clearfix">
          <span className="left">适用学段:</span>
          <CheckBoxGroup
            onChange={this.changeCheckBox.bind(this)}
            className={"right checkedBoxGroupMap PeriodList"}
            value={this.state.PeriodID}
          >
            {this.state.PeriodList instanceof Array &&
              this.state.PeriodList.map((child, index) => {
                // if(child.value==='0'){
                //   return;
                // }
                return (
                  <CheckBox
                    className={"checkedBoxMap Period"}
                    key={index}
                    value={child.value}
                    type='gray'
                  >
                    {child.title}
                  </CheckBox>
                );
              })}
              
          </CheckBoxGroup>
          {
                this.state.PeriodList instanceof Array &&
                this.state.PeriodList.length>1?<CheckBox
                className={"checkedBoxAll "}
                key={'all'}
                value={'all'}
                type='gray'
                checked={this.state.checkAll}
                onChange={this.onChangeAll.bind(this)}
              >
                全部
              </CheckBox>:''
              }
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
export default connect(mapStateToProps)(WebsiteCustom);
