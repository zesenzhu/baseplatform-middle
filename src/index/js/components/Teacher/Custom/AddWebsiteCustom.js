import React from "react";
import { connect } from "react-redux";
import { CheckBox, CheckBoxGroup, Tips, DropDown } from "../../../../../common";
import { Input } from "antd";
import TeacherCustomActions from "../../../actions/Teacher/TeacherCustomActions";
import { postData, getData } from "../../../../../common/js/fetch";
import CONFIG from "../../../../../common/js/config";
import "../../../../scss/AddWebsiteCustom.scss";

class AddWebsiteCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      WebName: "",
      WebNameTipsTitle: "网站名称不能为空",
      WebAddress: "",
      WebAddressTipsTitle: "网站地址不能为空",
      // Subject: {},
      // WebType: {},
      // Period: {},
      // WebTypeList: []
    };
  }
componentWillReceiveProps(nextProps){
  const { dispatch, Teacher } = nextProps;
    let WebData = Teacher.WebsiteData;
    let TeacherCustomData = Teacher.TeacherCustomData;
    this.setState({
      
      Subject: {
        SubjectName: WebData.SubjectName,
        SubjectID: WebData.SubjectID
      },
      WebType: WebData.WebType,
      WebTypeList: TeacherCustomData.WebTypeList
    });

}
  componentWillMount() {
    const { dispatch, Teacher } = this.props;
    let WebData = Teacher.WebsiteData;
    let TeacherCustomData = Teacher.TeacherCustomData;
    this.setState({
      WebName: WebData.WebName,
      WebAddress: WebData.WebAddress,
      Subject: {
        SubjectName: WebData.SubjectName,
        SubjectID: WebData.SubjectID
      },
      WebType: WebData.WebType,
      WebTypeList: TeacherCustomData.WebTypeList
    });

    let PeriodList = Teacher.TeacherCustomData.PeriodList;
    let newPeriodList = [];
    let Period = [];
    PeriodList instanceof Array &&
      PeriodList.map((child, index) => {
        if (child.value !== "0") {
          newPeriodList.push(child);
          Period.push(child.value);
        }
      });
    if (WebData.PeriodID[0] !==  '0') {
      Period = WebData.PeriodID;
    }
    this.setState({
      Period: Period,
      PeriodList: newPeriodList
    });
  }
  //   网站名称修改
  onWebNameChange = e => {
    this.setState({
      WebName: e.target.value
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
        TeacherCustomActions.setCustomTipsVisible({ WebNameTipsVisible: true })
      );
    } else {
      dispatch(
        TeacherCustomActions.setHandleWebsiteData({
          WebName: value
        })
      );
      dispatch(
        TeacherCustomActions.setCustomTipsVisible({ WebNameTipsVisible: false })
      );
    }
  };

  //   网站地址修改
  onWebAddressChange = e => {
    this.setState({
      WebAddress: e.target.value
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
        TeacherCustomActions.setCustomTipsVisible({
          WebAddressTipsVisible: true
        })
      );
    } else if (!isTrue) {
      this.setState({
        WebAddressTipsTitle: "网站地址格式错误"
      });
      dispatch(
        TeacherCustomActions.setCustomTipsVisible({
          WebAddressTipsVisible: true
        })
      );
    } else {
      this.setState({
        WebAddressTipsTitle: "网站地址不能为空"
      });
      dispatch(
        TeacherCustomActions.setHandleWebsiteData({
          WebAddress: value
        })
      );
      dispatch(
        TeacherCustomActions.setCustomTipsVisible({
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
      TeacherCustomActions.setHandleWebsiteData({
        WebType: e
      })
    );
  };

  // 选择学段
  changeCheckBox = Period => {
    const { dispatch } = this.props;
    if (Period.length === 0) {
      return;
    }
    this.setState({
      Period: Period
    });
    dispatch(
      TeacherCustomActions.setHandleWebsiteData({
        PeriodID: Period
      })
    );
  };
  render() {
    const { LoginUser, Teacher, AppLoading } = this.props;
    return (
      <div className="AddWebsiteCustom" id="AddWebsiteCustom">
        <div className="row clearfix">
          <span className="left">网站名称:</span>
          <Tips
            overlayClassName="tips"
            visible={Teacher.TeacherTipsVisible.WebNameTipsVisible}
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
            visible={Teacher.TeacherTipsVisible.WebAddressTipsVisible}
            title={this.state.WebAddressTipsTitle}
          >
            <Input
              className="right webAddress"
              placeholder="http(s)://"
              maxLength={500}
              onChange={this.onWebAddressChange.bind(this)}
              onBlur={this.onWebAddressBlur.bind(this)}
              value={this.state.WebAddress}
            ></Input>
          </Tips>
        </div>
        <div className="row clearfix">
          <span className="left">适用学科:</span>
          <span className="right subject">
            {this.state.Subject.SubjectName}
          </span>
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
            value={this.state.Period}
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { LoginUser, Teacher, AppLoading } = state;

  return {
    LoginUser,

    Teacher,

    AppLoading
  };
};
export default connect(mapStateToProps)(AddWebsiteCustom);
