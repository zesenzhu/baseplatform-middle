import React, { Component } from "react";
import {
  Frame,
  Menu,
  Loading,
  Alert,
  LeftMenu,
  Modal,
  Radio as MyRadio,
  RadioGroup,
} from "../../../common";
import { connect } from "react-redux";
import CONFIG from "../../../common/js/config";
import student from "../../images/img-student.png";
import master from "../../images/img-master.png";
import teacher from "../../images/img-teacher.png";
import director from "../../images/img-director.png";
import Radio from "./Radio";
// import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import { postData, getData } from "../../../common/js/fetch";
import actions from "../actions";
import "../../scss/PowerContent.scss";
import { async } from "q";

class PowerContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 0,
      disabled: false,
      userMsg: props.DataState.LoginUser,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { DataState, UIState } = nextProps;
    if (DataState.GetUserPowerMsg.Power.student) {
      // // console.log(DataState.GetUserPowerMsg.Power.student[0].Status)
      this.setState({
        radioValue: DataState.GetUserPowerMsg.Power.student[0].Status,
      });
    }
  }
  onRadioChange = (value, id) => {
    // console.log(value, id)
    const { DataState, UIState, dispatch } = this.props;
    let Power = DataState.GetUserPowerMsg.Power;
    let UserMsg = DataState.LoginUser;
    let url = "/SetGlobalUserPower";
    if (this.state.disabled === true) return;
    this.setState({
      disabled: true,
    });
    postData(
      CONFIG.PowerProxy + url,
      {
        PowerID: id,
        SchoolID: this.state.userMsg.SchoolID,
        Status: value ? 1 : 0,
      },
      2
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          this.setState({
            disabled: false,
          });
          if (json.Data === null) {
            Power = this.handlePower(Power, value ? 1 : 0, id);
            dispatch(actions.UpDataState.setUserPowerMsg(Power));
          } else if (json.Data === -2) {
            // console.log('参数错误')
          } else if (json.Data === -10) {
            // console.log('接口发生未知异常')
          }
        }
      })
      .catch((err) => {
        // console.log(err)
      });
  };
  //
  onChangeRadio = (e, id) => {
    // console.log(e.target.value, this.state.radioValue)
    const { DataState, UIState, dispatch } = this.props;
    let Power = DataState.GetUserPowerMsg.Power;
    let UserMsg = DataState.LoginUser;
    // let id = Power.student[0].PowerID;
    let url = "/SetGlobalUserPower";
    let value = e.target.value;
    if (this.state.disabled === true) return;
    this.setState({
      disabled: true,
    });
    postData(
      CONFIG.PowerProxy + url,
      {
        PowerID: id,
        SchoolID: UserMsg.SchoolID,
        Status: value,
      },
      2
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.StatusCode === 200) {
          this.setState({
            disabled: false,
          });
          if (json.Data === null) {
            Power = this.handlePower(Power, value, id);
            dispatch(actions.UpDataState.setUserPowerMsg(Power));
          } else if (json.Data === -1) {
            // console.log('状态')
          } else if (json.Data === -2) {
            // console.log('参数错误')
          } else if (json.Data === -10) {
            // console.log('接口发生未知异常')
          }
        }
      })
      .catch((err) => {
        // console.log(err)
      });
    // this.setState({
    //     radioValue: e.target.value
    // })
  };
  //处理数据
  handlePower(power, value, id) {
    for (let key in power) {
      power[key] = power[key].map((child, index) => {
        if (child.PowerID === id) {
          child.Status = value;
        }
        return child;
      });
    }
    return power;
  }
  render() {
    const { DataState, UIState } = this.props;
    let Power = DataState.GetUserPowerMsg.Power;
    // console.log(Power)
    return (
      <div id="powerContent" className="powerContent">
        <div className="power-box">
          <div className="power-top">
            <span className="top-tips">
              <span className="tips tip-menu">{"用户权限管理"}</span>
            </span>
          </div>
          <div className="power-hr"></div>
          {Power.student ? (
            <div className="power-content">
              <div className="content-row clearfix">
                <div className="left">
                  <img width={108} height={116} alt="student" src={student} />
                </div>
                <div className="right">
                  <div className="radio-box-1">
                    <div>
                      <Radio
                        value={Power.student[0].PowerID}
                        checked={Power.student[0].Status !== 0 ? true : false}
                        className="radio"
                        onChange={this.onRadioChange.bind(this)}
                      >
                        {/* {Power.student[0].PowerName} */}
                        <span className="radio-tips-1">
                          {Power.student[0].PowerName}
                        </span>
                        <span className="radio-tips-2">
                          ({" "}
                          {
                            Power.student[0].Status === 0
                              ? "需要经过学校管理员或班主任审核确认后，系统才会为学生创建用户账号"
                              : "注册完成时，即可使用，不需要经过审核"
                            // "在学生提交档案时系统便为其创建用户账号"
                          }
                          )
                        </span>
                      </Radio>
                      {/* <div className="radio-box-2">
                        <RadioGroup
                          name="radioGroup"
                          value={Power.student[0].Status}
                          onChange={(e) =>
                            this.onChangeRadio(e, Power.student[0].PowerID)
                          }
                        >
                          <div className="radio-2">
                            <MyRadio
                              type
                              value={1}
                              disabled={
                                Power.student[0].Status === 0 ? true : false
                              }
                            ></MyRadio>
                            <span className="radio-tips-1">先审后用模式</span>
                            <span className="radio-tips-2">
                              需要经过学校管理员或班主任审核确认后，系统才会为学生创建用户账号
                            </span>
                          </div>
                          <div className="radio-2">
                            <MyRadio
                              type
                              value={2}
                              disabled={
                                Power.student[0].Status === 0 ? true : false
                              }
                            ></MyRadio>
                            <span className="radio-tips-1">先用后审模式</span>
                            <span className="radio-tips-2">
                              在学生提交档案时系统便为其创建用户账号
                            </span>
                          </div>
                        </RadioGroup>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-row clearfix">
                <div className="left">
                  <img width={108} height={116} alt="teacher" src={teacher} />
                </div>
                <div className="right">
                  <div>
                    <Radio
                      value={Power.teacher[0].PowerID}
                      checked={Power.teacher[0].Status !== 0 ? true : false}
                      className="radio"
                      onChange={this.onRadioChange.bind(this)}
                    >
                      {/* {Power.teacher[0].PowerName} */}
                      <span className="radio-tips-1">
                        {Power.teacher[0].PowerName}
                      </span>
                      <span className="radio-tips-2">
                        (
                        {
                          Power.teacher[0].Status === 0
                            ? "需要经过学校管理员或班主任审核确认后，系统才会为学生创建用户账号"
                            : "注册完成时，即可使用，不需要经过审核"
                          // "在学生提交档案时系统便为其创建用户账号"
                        }
                        )
                      </span>
                    </Radio>
                    {/* <div className="radio-box-2">
                      <RadioGroup
                        name="radioGroup"
                        value={Power.teacher[0].Status}
                        onChange={(e) =>
                          this.onChangeRadio(e, Power.teacher[0].PowerID)
                        }
                      >
                        <div className="radio-2">
                          <MyRadio
                            type
                            value={1}
                            disabled={
                              Power.teacher[0].Status === 0 ? true : false
                            }
                          ></MyRadio>
                          <span className="radio-tips-1">先审后用模式</span>
                          <span className="radio-tips-2">
                            需要经过学校管理员，系统才会为教师创建用户账号
                          </span>
                        </div>
                        <div className="radio-2">
                          <MyRadio
                            type
                            value={2}
                            disabled={
                              Power.teacher[0].Status === 0 ? true : false
                            }
                          ></MyRadio>
                          <span className="radio-tips-1">先用后审模式</span>
                          <span className="radio-tips-2">
                            在教师提交档案时系统便为其创建用户账号
                          </span>
                        </div>
                      </RadioGroup>
                    </div> */}
                    {Power.teacher instanceof Array &&
                      Power.teacher.map((child, index) => {
                        if (index === 0) {
                          return "";
                        } else
                          return (
                            <Radio
                              key={child.PowerID}
                              value={child.PowerID}
                              checked={child.Status !== 0 ? true : false}
                              className="radio"
                              onChange={this.onRadioChange.bind(this)}
                            >
                              {/* {child.PowerName} */}
                              <span className="radio-tips-1">
                                {child.PowerName}
                              </span>
                              <span className="radio-tips-2">
                                
                                {
                                  child.PowerID === "Teacher_CourseClass_CURD"
                                    ? "(可以自主添加、修改、删除教学班)"
                                    : child.PowerID === "Teacher_Schedule_C"
                                    ? "(可以自主录入课表安排)"
                                    : child.PowerID === "Teacher_Schedule_U"
                                    ? "(可以调整个人课表)"
                                    : ""
                                  // "在学生提交档案时系统便为其创建用户账号"
                                }
                                
                              </span>
                            </Radio>
                          );
                      })}
                    {/* <Radio
                            value={Power.teacher[1].PowerID}
                            checked={Power.teacher[1].Status !== 0 ? true : false}
                            className="radio"
                            onChange={this.onRadioChange.bind(this)}
                          >
                            {Power.teacher[1].PowerName}
                          </Radio>
                          <Radio
                            value={Power.teacher[2].PowerID}
                            checked={Power.teacher[2].Status !== 0 ? true : false}
                            className="radio"
                            onChange={this.onRadioChange.bind(this)}
                          >
                            {Power.teacher[2].PowerName}
                          </Radio> */}
                  </div>
                </div>
              </div>
              <div className="content-row clearfix">
                <div className="left">
                  <img width={108} height={116} alt="master" src={master} />
                </div>
                <div className="right">
                  <div>
                    {
                      Power.ganger instanceof Array &&
                        Power.ganger.map((child, index) => {
                          return (
                            <Radio
                              key={child.PowerID}
                              value={child.PowerID}
                              checked={child.Status !== 0 ? true : false}
                              className="radio"
                              onChange={this.onRadioChange.bind(this)}
                            >
                              <span className="radio-tips-1">
                                {child.PowerName}
                              </span>
                              <span className="radio-tips-2">
                                
                                {
                                  child.PowerID === "Ganger_Student_CURD"
                                    ? "(可以自主添加、修改、删除班级学生档案)"
                                    : ""
                                  // "在学生提交档案时系统便为其创建用户账号"
                                }
                                
                              </span>
                            </Radio>
                          );
                        })
                      // <Radio
                      //     value={Power.ganger[0].PowerID}
                      //     checked={Power.ganger[0].Status !== 0 ? true : false}
                      //     className='radio'
                      //     onChange={this.onRadioChange.bind(this)}
                      // >{Power.ganger[0].PowerName}</Radio>
                      // <Radio
                      //     value={Power.ganger[1].PowerID}
                      //     checked={Power.ganger[1].Status !== 0 ? true : false}
                      //     className='radio'
                      //     onChange={this.onRadioChange.bind(this)}
                      // >{Power.ganger[1].PowerName}</Radio>
                    }
                  </div>
                </div>
              </div>
              {/* <div className="content-row clearfix">
                <div className="left">
                  <img width={108} height={116} alt="director" src={director} />
                </div>
                <div className="right">
                  <div>
                    {Power.dean instanceof Array &&
                      Power.dean.map((child, index) => {
                        return (
                          <Radio
                            key={child.PowerID}
                            value={child.PowerID}
                            checked={child.Status !== 0 ? true : false}
                            className="radio"
                            onChange={this.onRadioChange.bind(this)}
                          >
                            {child.PowerName}
                          </Radio>
                        );
                      })}
                    
                  </div>
                </div>
              </div> */}
              <div className="content-row clearfix">
                <div className="left">
                  <img width={108} height={116} alt="director" src={director} />
                </div>
                <div className="right">
                  <div>
                    {Power.parents instanceof Array &&
                      Power.parents.map((child, index) => {
                        return (
                          <Radio
                            key={child.PowerID}
                            value={child.PowerID}
                            checked={child.Status !== 0 ? true : false}
                            className="radio"
                            onChange={this.onRadioChange.bind(this)}
                          >
                            <span className="radio-tips-1">
                              {child.PowerName}
                            </span>
                            <span className="radio-tips-2">
                              
                              {
                                child.PowerID === "Parents_Show"
                                  ? "(可以登录平台访问相应功能)"
                                  : ""
                                // "在学生提交档案时系统便为其创建用户账号"
                              }
                              
                            </span>
                          </Radio>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  let { UIState, DataState } = state;
  return {
    UIState,
    DataState,
  };
};
export default connect(mapStateToProps)(PowerContent);
