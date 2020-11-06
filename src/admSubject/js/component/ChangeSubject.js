import React from "react";
import "../../scss/ChangeSubject.scss";
import { connect } from "react-redux";
import { Input } from "antd";
import {
  CheckBox,
  CheckBoxGroup,
  Loading,
  DropDown,
  Tips
} from "../../../common";
import { defaultGrades } from "../containers/config";
import actions from "../actions";

class ChangeSubject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      GlobalGradeIDs: "",
      SubjectName: "",
      selectGrade: [],
      showInput: true,
      SubjectInput: "",
      dropSelected: { value: 0, title: "自定义", GlabalGrades: [] },
      SubjectNameTipsTitle: "学科名称格式有误",
      GradeTipsTitle: "开课年级没有选择"
    };
  }
  componentWillMount() {
    const { DataState, UIState } = this.props;
    // let selectGrade = []
    // DataState.PeriodMsg.map((child, index) => {
    //     if (index === 0)
    //         return;
    //     selectGrade.push(child)
    // })
    // this.setState({
    //     selectGrade: selectGrade,

    // })
    let selectGrade = [];
    // if (this.state.type === 'change') {
    //     DataState.PeriodMsg.value.map((child, index) => {
    //         // console.log(child)
    //         if (index === 0)
    //             return;
    //         let GradesArr = child.Grades.split(',');

    //         let selectGrades = DataState.ChangeSubjectMsg.GlobalGradeIDs.split(',');
    //         // console.log(selectGrades)
    //         let mySelect = [];

    //         GradesArr.map((child2, index) => {
    //             selectGrades.map((child3, index2) => {
    //                 if (child2 === child3)
    //                     mySelect.push(child3);
    //             })
    //         })

    //         selectGrade.push(mySelect)
    //         // console.log(selectGrade)

    //     })
    //     this.setState({
    //         selectGrade: selectGrade
    //     })
    // }
    // // console.log(DataState.PeriodMsg.value  instanceof Array)
    DataState.PeriodMsg.value instanceof Array &&
      DataState.PeriodMsg.value.map((child, index) => {
        // // console.log(child)
        if (index === 0) return;
        let GradesArr = child.Grades.split(",");

        let selectGrades = DataState.ChangeSubjectMsg.GlobalGradeIDs.split(",");
        // // console.log(selectGrades)
        let mySelect = [];

        GradesArr.map((child2, index) => {
          selectGrades.map((child3, index2) => {
            if (child2 === child3) mySelect.push(child3);
          });
        });

        selectGrade.push(mySelect);
        // console.log(selectGrade)
      });
    this.setState({
      selectGrade: selectGrade
    });
  }

  componentWillUpdate() {}
  componentWillReceiveProps(nextProps) {
    const { DataState, UIState } = nextProps;
    //// console.log(nextProps)
    if (this.state.type === "change")
      this.setState({
        GlobalGradeIDs: DataState.ChangeSubjectMsg.GlobalGradeIDs,
        SubjectName: DataState.ChangeSubjectMsg.SubjectName
      });
    let selectGrade = [];

    DataState.PeriodMsg.value instanceof Array &&
      DataState.PeriodMsg.value.map((child, index) => {
        //// console.log(child)
        if (index === 0) return;
        let GradesArr = child.Grades.split(",");

        let selectGrades = DataState.ChangeSubjectMsg.GlobalGradeIDs.split(",");
        //// console.log(selectGrades)
        let mySelect = [];

        GradesArr.map((child2, index) => {
          selectGrades.map((child3, index2) => {
            if (child2 === child3) mySelect.push(child3);
          });
        });

        selectGrade.push(mySelect);
        //// console.log(selectGrade)
        this.setState({
          selectGrade: selectGrade
        });
      });
  }

  onCheckBoxGroupChange = (index, value) => {
    const { dispatch, DataState, UIState } = this.props;

    let selectGrade = this.state.selectGrade;
    value.sort();

    selectGrade = selectGrade.map((child, key) => {
      if (index - 1 === key) return value;
      return child;
    });
    
    let selectGradeTwo = [];
    selectGrade.map(child => {
      if (child.length !== 0) {
        selectGradeTwo.push(child);
      }
    });
    let grade = selectGradeTwo.join();
    // console.log(selectGrade,selectGradeTwo,grade);
    if (grade.slice(0, 1) === ",") grade = grade.slice(1);

    dispatch(actions.UpDataState.handleSubjectModalMsg(grade));
  };
  onCheckBoxChange = (index, e) => {
    const { dispatch, DataState, UIState } = this.props;
    let selectGrade = this.state.selectGrade;
    let checkValue = [];

    DataState.PeriodMsg.value instanceof Array &&
      DataState.PeriodMsg.value.map((child, key) => {
        if (index === key) checkValue = child.Grades;
      });

    if (e.target.checked) {
      selectGrade = selectGrade.map((child, key) => {
        if (index - 1 === key) return checkValue;
        return child;
      });
    } else {
      selectGrade = selectGrade.map((child, key) => {
        if (index - 1 === key) return [];
        return child;
      });
    }
    let newGrade = [];
    selectGrade.map(child => {
      if (child.length !== 0) newGrade.push(child);
    });
    // console.log(newGrade)
    let grade = newGrade.join();
    if (grade.slice(0, 1) === ",") grade = grade.slice(1);
    dispatch(actions.UpDataState.handleSubjectModalMsg(grade));
  };

  //添加学科下拉菜单
  dropMenuSubject = value => {
    const { dispatch, DataState, UIState } = this.props;
    // console.log(value)
    let GlabalGrades = "";
    if (value.value === 0) {
      this.setState({
        showInput: true,
        dropSelected: value
      });
    } else {
      this.setState({
        showInput: false,
        dropSelected: value
      });
    }
    DataState.SubjectMsg.addSubjectMsg instanceof Array &&
      DataState.SubjectMsg.addSubjectMsg.map((child, index) => {
        if (child.value === value.value) GlabalGrades = child.GlabalGrades;
      });
    dispatch(
      actions.UpDataState.handleSubjectNameModalMsg({
        SubjectName: value.title,
        SubjectID: value.value
      })
    );
    dispatch(actions.UpDataState.handleSubjectModalMsg(GlabalGrades));
  };

  onSubjectInputChange = e => {
    const { dispatch, DataState } = this.props;

    this.setState({
      SubjectInput: e.target.value
    });
  };
  onSubjectInputBlur = e => {
    const { dispatch, DataState } = this.props;
    let Test = /^[,_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{1,50}$/;
    if (Test.test(e.target.value)) {
      dispatch({ type: actions.UpUIState.TIPS_VISIBLE_CLOSE });

      dispatch(
        actions.UpDataState.handleSubjectNameModalMsg({
          SubjectName: e.target.value,
          SubjectID: ""
        })
      );
      // dispatch(actions.UpDataState.handleSubjectModalMsg(""));
    } else {
      dispatch({ type: actions.UpUIState.TIPS_VISIBLE_OPEN });
    }
  };
  render() {
    const { DataState, UIState } = this.props;
    let data = {};
    let AppTips = UIState.AppTips;
    return (
      <Loading size="large" spinning={UIState.AppLoading.modalLoading}>
        <div className="chageSubject">
          <div className="row clearfix">
            <span className="culonm-1">学科名称：</span>
            <span
              style={{
                display: this.state.type === "change" ? "block" : "none"
              }}
              className="culonm-2"
            >
              <span
                title={DataState.ChangeSubjectMsg.SubjectName}
                className="subjectName"
              >
                {this.state.type === "change"
                  ? DataState.ChangeSubjectMsg.SubjectName
                  : "错误"}
              </span>
            </span>
            <div
              className="culonm-2 dropMenuBox"
              style={{ display: this.state.type === "add" ? "block" : "none" }}
            >
              <DropDown
                ref="dropMenuSubject"
                style={{ zIndex: 2 }}
                className={"DropMenu"}
                onChange={this.dropMenuSubject.bind(this)}
                width={120}
                height={96}
                dropSelectd={this.state.dropSelected}
                dropList={
                  DataState.SubjectMsg.addSubjectMsg
                    ? DataState.SubjectMsg.addSubjectMsg
                    : [{ value: 0, title: "自定义", GlabalGrades: [] }]
                }
              ></DropDown>
              <Tips
                overlayClassName="tips"
                placement={"right"}
                getPopupContainer={e => e.parentNode}
                autoAdjustOverflow={false}
                visible={AppTips.SubjectNameTips}
                title={this.state.SubjectNameTipsTitle}
              >
                <Input
                  type="text"
                  width={200}
                  maxLength={8}
                  onChange={this.onSubjectInputChange.bind(this)}
                  onBlur={this.onSubjectInputBlur.bind(this)}
                  value={this.state.SubjectInput}
                  className="box-input"
                  style={{
                    display: this.state.showInput ? "inline-block" : "none"
                  }}
                  placeholder="输入学科名称..."
                ></Input>
              </Tips>
            </div>
          </div>
          <div className="row clearfix">
            <span className="culonm-1">开课年级：</span>
            <div className="culonm-2 culonm-3">
              <Tips
                overlayClassName="tips"
                placement={"rightTop"}
                getPopupContainer={e => e.parentNode}
                autoAdjustOverflow={false}
                overlayStyle={{top:0}}
                visible={AppTips.GradeTips}
                title={this.state.GradeTipsTitle}
              >
                {DataState.PeriodMsg.value instanceof Array &&
                  DataState.PeriodMsg.value.map((child, index) => {
                    if (index === 0) return;
                    let GradesArr = child.Grades.split(",");

                    let selectGrades = DataState.ChangeSubjectMsg.GlobalGradeIDs.split(
                      ","
                    );
                    let checkGroup = false;
                    let mySelect = [];
                    //let selectGrade = this.state.selectGrade;
                    GradesArr.map((child2, index) => {
                      selectGrades.map((child3, index2) => {
                        if (child2 === child3) mySelect.push(child3);
                      });
                    });
                    if (mySelect.length === GradesArr.length) checkGroup = true;

                    // selectGrade.push(mySelect)
                    // this.setState({
                    //     selectGrade:selectGrade
                    // })
                    return (
                      <div className="checkBoxGroup" key={index}>
                        <CheckBox
                          className={`checkAll ${checkGroup ? "select" : ""}`}
                          onChange={this.onCheckBoxChange.bind(this, index)}
                          checked={checkGroup}
                        >
                          <span title={child.title} className="checkContent">
                            {child.title}
                          </span>
                        </CheckBox>
                        <span className="delete"></span>
                        <CheckBoxGroup
                          onChange={this.onCheckBoxGroupChange.bind(
                            this,
                            index
                          )}
                          value={mySelect}
                        >
                          {GradesArr instanceof Array &&
                            GradesArr.map((child2, index) => {
                              return (
                                <label key={index}>
                                  <div
                                    className={`checkBox ${
                                      mySelect.includes(child2) ? "select" : ""
                                    }`}
                                  >
                                    <div className="newCheckBoxStyle">
                                      <CheckBox
                                        value={child2}
                                        onChange={this.onCheck}
                                      ></CheckBox>
                                    </div>
                                    <span
                                      title={defaultGrades[child2]}
                                      className="checkBox-tips"
                                    >
                                      {defaultGrades[child2]}
                                    </span>
                                  </div>
                                </label>
                              );
                            })}
                        </CheckBoxGroup>
                      </div>
                    );
                  })}
              </Tips>
            </div>
          </div>
        </div>
      </Loading>
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
export default connect(mapStateToProps)(ChangeSubject);
