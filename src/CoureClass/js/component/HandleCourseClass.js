import React from "react";
import { connect } from "react-redux";
import actions from "../actions";
import "../../scss/HandleCourseClass.scss";
import { postData, getData } from "../../../common/js/fetch";
import { Scrollbars } from "react-custom-scrollbars";

import history from "../containers/history";
import { Input } from "antd";
import CONFIG from "../../../common/js/config";
import {
    Modal,
    Loading,
    DropDown,
    Table,
    Button,
    PagiNation,
    CheckBox,
    CheckBoxGroup,
    Tips, RadioGroup, Radio,
} from "../../../common";
import SelectTeacher from "./SelectTeacher";
import SelectStudent from "./SelectStudent";
import {
    GetStudentForAddOrEditCourseClassByGroupID,
    GetStudentForAddOrEditCourseClassByInit
} from "../actions/apiActions";
import {checkUrlAndPostMsg} from "../../../common/js/public";

class HandleCourseClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableSource: [],
      UserMsg: props.DataState.LoginUser,
      SubjectNameTipsTitle: "请输入教学班名称",
      courseClassName: "",
      classInfo:{

          dropSelectd:{value:'',title:'请指定一个班级'},
          dropList:[],
          tip:false,
          radioValue:1,
          classDisabled:true

      },

      firstLoad:true

    };
  }

  componentWillReceiveProps(nextProps) {
    const { DataState, UIState } = nextProps;
    let data = nextProps.DataState.GetCourseClassDetailsHandleClassMsg;
    this.setState({
      courseClassName: data.selectData
        ? data.selectData.CourseClass.CourseClassName
        : "",
      TeacherName: data.selectData ? data.selectData.Teacher.TeacherName : "",
      tableSource: data.selectData ? data.selectData.Student : [],
    });
  }

    componentDidMount() {

        this.props.onRef(this);

    }

  UNSAFE_componentWillReceiveProps(nextProps){

    const {DataState,LoginUser,dispatch} = this.props;

    const {SchoolID} = LoginUser;

    const data = DataState.GetCourseClassDetailsHandleClassMsg;

    if (data.GradeID&&this.state.firstLoad){

        this.setState({firstLoad:false},()=>{

             if (data.CourseClassType===1){

        const {ClassID,ClassName} = data.ClassItem&&data.ClassItem[0]?data.ClassItem[0]:{};

        const GradeID = data.GradeID;

          this.setState({
              tableSource: [],
          });

          dispatch(actions.UpDataState.setCourseClassStudentMsg([]));

          dispatch(actions.UpDataState.SetCourseClassDefaultMsg({ClassSource:[],Class:[]}));

          dispatch(actions.UpDataState.setClassStudentTransferTransferMsg({ClassSource:[],Class:[]}));

          dispatch(actions.UpDataState.setClassStudentTransferMsg([]));

          if (ClassID){

              const GetStudent = GetStudentForAddOrEditCourseClassByGroupID({schoolID:SchoolID,classID:ClassID,dispatch});

              const GetClass = GetStudentForAddOrEditCourseClassByInit({schoolID:SchoolID,gradeID:GradeID,dispatch});

              Promise.all([GetClass,GetStudent]).then(res=>{

                  if (res[0]){

                      const data = res[0];

                      const list = data&&data.length>0?data.map(i=>({value:i.ClassID,title:i.ClassName})):[{value:'',title:'该年级下暂无班级'}];

                      this.setState((state)=>{

                          return { ...state,classInfo:{...state.classInfo,disabled:false,dropList:list,classDisabled:false,dropSelectd:{value:ClassID,title:ClassName}}};

                      });

                  }

                  if (res[1]){

                      const data = res[1];

                      const list = data&&data.length>0?data:[];

                      dispatch(actions.UpDataState.setCourseClassStudentMsg(list));

                  }

              })

          }else{

              GetStudentForAddOrEditCourseClassByInit({schoolID:SchoolID,gradeID:GradeID,dispatch}).then(dara=>{

                if (data){

                    const list = data&&data.length>0?data.map(i=>({value:i.ClassID,title:i.ClassName})):[{value:'',title:'该年级下暂无班级'}];

                    this.setState((state)=>{

                        return { ...state,classInfo:{...state.classInfo,disabled:false,dropList:list,classDisabled:false,dropSelectd:{value:'',title:'请指定一个班级'}}};

                    });

                }

              });


          }

      }

             this.setState((state)=>{

                  return {...state,classInfo:{...state.classInfo,radioValue:data.CourseClassType}};

              });

        });

    }

  }


  componentWillMount(){

    const { DataState, dispatch } = this.props;
    // //获取路由

    let UserMsg = DataState.LoginUser.SchoolID
      ? DataState.LoginUser
      : JSON.parse(sessionStorage.getItem("UserInfo"));

    if (this.props.type === "Teacher") {
      let Subjects = DataState.GetTeacherSubjectAndGradeMsg.Subjects;

      if (Subjects.length === 1) {
        this.setState({
          SubjectSelect: Subjects[0],
          Subject: Subjects[0],
        });
      }
      dispatch(
        actions.UpDataState.setCourseClassDataMsg({ Subject: Subjects[0] })
      );
    }

  }
  //数据绑定
  onCourseClassNameChange = (e) => {

    const { DataState, UIState, dispatch } = this.props;

    this.setState({
      courseClassName: e.target.value.trim(),
    });
  };

  onCourseClassNameBlur = (e) => {
    const { DataState, UIState, dispatch } = this.props;
    let {
      CourseClassName,
      ...data
    } = DataState.GetCourseClassDetailsHandleClassMsg.selectData.CourseClass;
    //console.log(this.state.courseClassName, e.target.value)
    let Test = /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(
      e.target.value
    );

    if (e.target.value === "") {
      this.setState({
        SubjectNameTipsTitle: "请输入教学班名称",
      });
      dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_OPEN });
    } else if (!Test) {
      this.setState({
        SubjectNameTipsTitle: "教学班名称应由:数字或字母或中文汉字以及>/()（）等符号组成",
      });
      dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_OPEN });
    } else {
      dispatch({ type: actions.UpUIState.NAME_TIPS_SHOW_CLOSE });
      this.setState({
        SubjectNameTipsTitle: "请输入教学班名称",
      });
    }
    dispatch(
      actions.UpDataState.setCourseClassName({
        CourseClassName: e.target.value.trim(),
        ...data,
      })
    );
  };


  //选择教师
  onTeacherSelectClick = () => {
    const { DataState, UIState, dispatch } = this.props;
    let data = DataState.GetCourseClassDetailsHandleClassMsg;
    dispatch(actions.UpUIState.AddTeacherModalOpen());
    dispatch(
      actions.UpDataState.getSubjectTeacherMsg(
        "/GetTeacherInfoBySubjectAndKey?key=&schoolID=" +
          this.state.UserMsg.SchoolID +
          "&subjectID=" +
          data.SubjectID
      )
    );
  };
  //选择教师模态框
  AddTeacherModalOk = () => {
    const { DataState, UIState, dispatch } = this.props;
    let teacher =
      Object.keys(
        DataState.GetCourseClassDetailsHandleClassMsg.transfer.Teacher
      ).length !== 0
        ? DataState.GetCourseClassDetailsHandleClassMsg.transfer.Teacher
        : DataState.GetCourseClassDetailsHandleClassMsg.selectData.Teacher;
    dispatch(actions.UpDataState.setSubjectTeacherMsg(teacher));
    dispatch(actions.UpUIState.AddTeacherModalClose());
  };
  AddTeacherModalCancel = () => {
    const { DataState, UIState, dispatch } = this.props;
    let teacher =
      DataState.GetCourseClassDetailsHandleClassMsg.selectData.Teacher;

    dispatch(actions.UpUIState.AddTeacherModalClose());
  };
  //选择学生
  //选择教师模态框
  AddStudentModalOk = () => {
    const { DataState, UIState, dispatch } = this.props;
    let Student =
      DataState.GetCourseClassDetailsHandleClassMsg.transfer.Student;
    let Class = DataState.GetCourseClassDetailsHandleClassMsg.transfer.Class;
    let ClassSource = DataState.GetCourseClassDetailsHandleClassMsg.transfer.ClassSource;

      Student = Student.filter(i=>i.ClassID!==Class[0]);

    dispatch(actions.UpDataState.setCourseClassStudentMsg(Student));
    dispatch(actions.UpDataState.SetCourseClassDefaultMsg({ Class,ClassSource }));

    dispatch(actions.UpUIState.AddStudentModalClose());
  };
  AddStudentModalCancel = () => {
    const { DataState, UIState, dispatch } = this.props;

    let oldStudent =
      DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student;
    let Class = DataState.GetCourseClassDetailsHandleClassMsg.selectData.Class;
    let ClassSource = DataState.GetCourseClassDetailsHandleClassMsg.selectData.ClassSource;
    dispatch(actions.UpDataState.setClassStudentTransferMsg(oldStudent));

    dispatch(actions.UpDataState.setClassStudentTransferTransferMsg({Class,ClassSource}));

    dispatch(actions.UpUIState.AddStudentModalClose());
  };
  //删除学生
  onDeleteStudentClick = (id) => {
    const { DataState, UIState, dispatch } = this.props;

    let data = DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student;
    let newData = data.splice(id, 1);
    this.setState({
      tableSource: data,
    });

    dispatch(actions.UpDataState.setClassStudentTransferMsg(data));
    dispatch(actions.UpDataState.setCourseClassStudentMsg(data));
  };
  //删除班级
  onDeleteClassClick = (id) => {
    const { DataState, UIState, dispatch } = this.props;

    let data = DataState.GetCourseClassDetailsHandleClassMsg.selectData.ClassSource;
    let newData = data.splice(id, 1);
    this.setState({
      tableSource: data,
    });
    //console.log(id, newData);
    let Class = [];
    data.map(child=>{

      Class.push(child.ClassID)

    });

    dispatch(actions.UpDataState.setClassStudentTransferTransferMsg({ClassSource:data,Class}));

    dispatch(actions.UpDataState.SetCourseClassDefaultMsg({ClassSource:data,Class}));
  };
  //清空
  onDeleteAllClick = () => {
    const { DataState, UIState, dispatch } = this.props;
    this.setState({
      tableSource: [],
    });
    dispatch(actions.UpDataState.setCourseClassStudentMsg([]));
    dispatch(actions.UpDataState.SetCourseClassDefaultMsg({ClassSource:[],Class:[]}));
    dispatch(actions.UpDataState.setClassStudentTransferTransferMsg({ClassSource:[],Class:[]}));
    dispatch(actions.UpDataState.setClassStudentTransferMsg([]));


  };
  //选择弹窗
  onSelectStudentAllClick = () => {
    const { DataState, UIState, dispatch } = this.props;
    let data = DataState.GetCourseClassDetailsHandleClassMsg;
    dispatch(
      actions.UpDataState.getGradeClassMsg(
        "/GetStudentForAddOrEditCourseClassByInit?schoolID=" +
          this.state.UserMsg.SchoolID +
          "&gradeID=" +
          data.GradeID
      )
    );

    dispatch(actions.UpUIState.AddStudentModalOpen());
  };

    //选择变化

  classRadioChange(e){

      const { dispatch,DataState } = this.props;

      const { Grade } = DataState.GetCourseClassDetailsHandleClassMsg.selectData;

      const data = DataState.GetCourseClassDetailsHandleClassMsg;

      const value = e.target.value;

      const classDisabled = Grade.value===0||value===2;

      if (value===2){

          const {ClassItem,Item} = data;

          dispatch(actions.UpDataState.setCourseClassStudentMsg(Item));

          dispatch(actions.UpDataState.SetCourseClassDefaultMsg({ Class:ClassItem,ClassSource:ClassItem }));

          dispatch(actions.UpDataState.setClassStudentTransferTransferMsg({ClassSource:ClassItem,Class:ClassItem}));

      }else{

          dispatch(actions.UpDataState.setCourseClassStudentMsg([]));

          dispatch(actions.UpDataState.SetCourseClassDefaultMsg({Class:[],ClassSource:[]}));

      }

      this.setState((state)=>{

          return {...state,classInfo:{...state.classInfo,tip:false,classDisabled,radioValue:value,dropSelectd:{value:'',title:'请指定一个班级'}}};

      });

  }

    //班级选择变化

    classSelectChange(data){

        const { dispatch,LoginUser } = this.props;

        const { SchoolID } = LoginUser;

        const { value,title } = data;

        this.setState((state)=>{

            GetStudentForAddOrEditCourseClassByGroupID({schoolID:SchoolID,classID:value,dispatch}).then(data=>{

                const list = data&&data.length>0?data:[];

                dispatch(actions.UpDataState.setCourseClassStudentMsg(list));

            });

            return {...state,classInfo:{...state.classInfo,dropSelectd:data,tip:false}};

        })

    }


    toAdmClass(){

        const url = CONFIG.HashPrevProxy+'/html/admclass'+location.search;

        checkUrlAndPostMsg({btnName:'行政班管理',url});

    }


    render() {

    const { DataState, UIState,isFrame } = this.props;

    let data = DataState.GetCourseClassDetailsHandleClassMsg;

    let tableSource = data.TableSource ? data.TableSource : [];

    let teacher = data.selectData
      ? data.selectData.Teacher.length !== 0
        ? data.selectData.Teacher
        : {}
      : {};

    //获取路由
    let route = history.location.pathname;

    let pathArr = route.split("/");

    let handleRoute = pathArr[1];

    let routeID = pathArr[2];

    let subjectID = pathArr[3];

    let classID = pathArr[4];

    return (

        <React.Fragment>

        <div id="HandleCourseClass" className="HandleCourseClass">

          <div className="row clearfix">

            <div className="row-column">

              <span className="left">教学班名称：</span>

              <span className="right ">

                <Tips
                  overlayClassName="tips"
                  visible={UIState.AppTipsShow.nameTipsShow}
                  getPopupContainer={(e) => e.parentNode}
                  title={this.state.SubjectNameTipsTitle}
                >
                  <Input
                    placeholder="请输入教学班名称..."
                    style={{ width: 180 + "px" }}
                    type="text"
                    maxLength={10}
                    onChange={this.onCourseClassNameChange.bind(this)}
                    onBlur={this.onCourseClassNameBlur.bind(this)}
                    value={this.state.courseClassName}
                  />
                </Tips>

              </span>

            </div>

              <div className="row-column">
              <span className="left">学科：</span>
              <span className="right ">

                <span title={data.SubjectName} className="noChange SubjectName">
                  {data ? data.SubjectName : ""}
                </span>
              </span>
            </div>
          </div>
          <div className="row clearfix">
            <div className="row-column">
              <span className="left">所属年级：</span>
              <span className="right ">

                <span title={data.GradeName} className="noChange GradeName">
                  {data ? data.GradeName : ""}
                </span>
              </span>
            </div>
            <div className="row-column">
              <span className="left">任课老师：</span>


              {handleRoute !== "Teacher" ? (
                <span className="right">
                  <Input
                    readOnly
                    unselectable="on"
                    onClick={this.onTeacherSelectClick.bind(this)}
                    className=" selectTeacher"
                    type="text"
                    value={data.selectData ? data.selectData.Teacher.title : ""}
                    style={{ width: 150 + "px" }}
                    onChange={this.onCourseClassNameChange.bind(this)}
                  />
                  <span
                    onClick={this.onTeacherSelectClick.bind(this)}
                    className="teacher-select"
                  >
                    选择
                  </span>
                </span>
              ) : (
                <span className="right">
                  <span
                    title={data.selectData ? data.selectData.Teacher.title : ""}
                    className="noChange teacherName"
                  >
                    {data.selectData ? data.selectData.Teacher.title : ""}
                  </span>
                </span>
              )}
            </div>
          </div>

          <div className="row clearfix" style={{zIndex:3}}>

                <div className="row-column" style={{width:'100%'}}>

                    <span className="left" style={{width:'14%'}}>班级类型:</span>

                    <span className="right">

                      <RadioGroup disabled={true} value={this.state.classInfo.radioValue} onChange={this.classRadioChange.bind(this)}>

                        <Radio value={2}>走班</Radio>

                        <Radio value={1}>非走班</Radio>

                      </RadioGroup>

                      <Tips visible={this.state.classInfo.tip} title={"请指定一个班级"}>

                        <DropDown  onChange={this.classSelectChange.bind(this)} disabled={true} className={"select-class"} width={200} dropSelectd={this.state.classInfo.dropSelectd} dropList={this.state.classInfo.dropList}></DropDown>

                      </Tips>

                    </span>

                </div>


            </div>

          <div className="row clearfix">
            <div className=" row-column row-column-2">
              <span className="left">学生名单：</span>
              <span className="right right-2">
                <div className="Student-box">
                  <div className="box-top">
                    <span  style={{display:this.state.tableSource.length>0?'inline-block':'none'}} className="top-left top-left-1">
                      已选
                      <span className="count">
                        {this.state.tableSource.length}
                      </span>
                      名学生
                    </span>
                    <span className="top-left-add" style={{display:data.selectData.ClassSource.length>0&&this.state.tableSource.length>0?'inline-block':'none'}}>+</span>
                    <span style={{display:data.selectData.ClassSource.length>0?'inline-block':'none'}} className="top-left top-left-2">
                      <span className="count">
                        已选
                        {data.selectData.ClassSource.length}
                      </span>
                      个行政班
                    </span>

                     <span className="top-right">
                      {

                          this.state.classInfo.radioValue===2?

                              <>

                              <span onClick={this.onSelectStudentAllClick.bind(this)} className="handle select">选择</span>

                              <span onClick={this.onDeleteAllClick.bind(this)} className="handle deleteAll">清空</span>


                              </>

                              :

                              this.state.classInfo.dropSelectd.value?



                                  <span className={"tips"}>

                                      注：如需调整班级学生，请前往<a onClick={this.toAdmClass.bind(this)}>行政班管理</a>模块操作

                                </span>

                                :null

                      }

                  </span>

                  </div>

                  <div style={{display:this.state.tableSource.length>0?' block':'none'}} className="select-box student-box">

                      {

                          data.selectData.ClassSource.length>0?

                              <p className="box-title">学生：</p>

                              :null

                      }

                      <div className="select-content-box" style={data.selectData.ClassSource.length>0?{height:isFrame?78:122}:{height:isFrame?226:310,margin:0,border:0}}>

                      <Scrollbars
                          style={{ width: 100 + "%", height:   "100%" }}
                      >
                        <div className="box-content">
                          {this.state.tableSource.map((child, index) => {
                              return (
                                  <span
                                      className="content-card"
                                      key={child.StudentID + '-'+ index}
                                  >
                                <span
                                    title={child.StudentName}
                                    className="card-name"
                                >
                                  {child.StudentName}
                                </span>
                                <span
                                    title={child.StudentID}
                                    className="card-id"
                                >
                                  {child.StudentID}
                                </span>

                                {

                                    this.state.classInfo.radioValue===2?

                                        <span onClick={this.onDeleteStudentClick.bind(this, index)} className="icon-x"></span>

                                        :null

                                }

                              </span>
                              );
                          })}
                        </div>
                      </Scrollbars>
                    </div>
                  </div>

                  <div style={{display:data.selectData.ClassSource.length>0?' block':'none'}} className="select-box student-box">

                    {

                        this.state.tableSource.length>0?

                            <p className="box-title">行政班：</p>

                            :null

                    }


                      <div className="select-content-box" style={this.state.tableSource.length>0?{height:isFrame?78:122}:{height:isFrame?226:310,margin:0,border:0}}>

                      <Scrollbars style={{ width: 100 + "%", height:"100%" }}>

                        <div className="box-content">

                          {data.selectData.ClassSource.map((child, index) => {
                            return (
                              <span
                                className="content-card"
                                key={child.ClassID + '-'+index}
                              >
                                <span
                                  title={child.ClassName}
                                  className="card-name class-name"
                                >
                                  {child.ClassName}
                                </span>

                                <span onClick={this.onDeleteClassClick.bind(this, index)} className="icon-x"></span>

                              </span>

                            );
                          })}
                        </div>

                      </Scrollbars>
                    </div>
                  </div>



                </div>
              </span>
            </div>
          </div>
        </div>
        <Modal
          ref="SelectTeacherMadal"
          type="1"
          width={680}
          title={"选择教师"}
          bodyStyle={{ height: 525 + "px", padding: 0 }}
          visible={UIState.AddTeacherModalShow.Show}
          mask={false}
          onOk={this.AddTeacherModalOk}
          onCancel={this.AddTeacherModalCancel}
        >
          <SelectTeacher subject={data ? data.SubjectID : ""}></SelectTeacher>
        </Modal>
        <Modal
          ref="SelectStudentMadal"
          type="1"
          width={680}
          mask={false}
          title={"选择学生"}
          bodyStyle={{ height: 477 + "px", padding: 0 }}
          visible={UIState.AddStudentModalShow.Show}
          onOk={this.AddStudentModalOk}
          onCancel={this.AddStudentModalCancel}
        >
          {UIState.AddStudentModalShow.Show ? (
            <SelectStudent></SelectStudent>
          ) : (
            ""
          )}
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  let { UIState, DataState,LoginUser } = state;
  return {
    UIState,
    DataState,
      LoginUser
  };
};
export default connect(mapStateToProps)(HandleCourseClass);
