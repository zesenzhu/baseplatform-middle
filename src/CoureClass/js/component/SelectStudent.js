import React from "react";
import { connect } from "react-redux";
import actions from "../actions";
import "../../scss/SelectStudent.scss";
import { postData, getData } from "../../../common/js/fetch";
import { Scrollbars } from "react-custom-scrollbars";

import history from "../containers/history";
import { Input } from "antd";
import CONFIG from "../../../common/js/config";
import {
  Search,
  Loading,
  CheckBox,
  CheckBoxGroup,
  Empty
} from "../../../common";

class SelectStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: false,
      selectClassTab: "",
      checkAll: false,
      checkList: [],
      show: false,
      UserMsg: props.DataState.LoginUser,
      leftShow: true,
      CancelBtnShow: "n",
      keyword: "",
      searchValue: "",
      isSelectAll:false
    };
  }
  componentWillMount() {
    const { DataState, UIState } = this.props;
    let selectStudent = DataState.GetCourseClassDetailsHandleClassMsg.selectData
      ? DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student
      : [];
    let checkList = selectStudent.map((child, index) => {
      return child.StudentID;
    });

    this.setState({
      checkList: checkList
    });
  }
  componentWillReceiveProps(nextProps) {
    const { DataState, UIState } = nextProps;
    let transfer =
      nextProps.DataState.GetCourseClassDetailsHandleClassMsg.transfer.Student;
    let selectStudent = DataState.GetCourseClassDetailsHandleClassMsg.selectData
      ? DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student
      : [];
    let ClassStudent = DataState.GetStudentClassMsg.ClassStudent
      ? DataState.GetStudentClassMsg.ClassStudent
      : [];
    let checkList = transfer.map((child, index) => {
      return child.StudentID;
    });
    let defaultCheckList = selectStudent.map((child, index) => {
      return child.StudentID;
    });
    // console.log(ClassStudent)
    let plainOptions = ClassStudent.propStudent
      ? ClassStudent.propStudent.map((child, index) => {
          //该行政班的学生
          return child.StudentID;
        })
      : [];

    let selectList = [];
    let len = plainOptions.length;
    // console.log(checkList,selectStudent,transfer)
    let isOld = {};
    checkList.map((child, index) => {
      plainOptions.map(key => {
        if (key === child && !isOld[key]) {
          //防止重复自减
          len--;
          isOld[key] = true;
        }
      });
    });
    // console.log(len)
    this.setState({
      checkList: checkList,
      plainOptions: plainOptions,
      // checkAll: len === 0 ? true : false
    });
    if (
      !this.state.selectClassTab   &&
      DataState.GetStudentClassMsg.GradeClass.length
    ) {
    console.log(this.state.selectClassTab,DataState.GetStudentClassMsg.GradeClass[0].ClassID)

      // this.setState({
      //   selectClassTab: DataState.GetStudentClassMsg.GradeClass[0].ClassID
      // });
      this.onClickTabClick( DataState.GetStudentClassMsg.GradeClass[0].ClassID);
    }
  }
  //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    //console.log('ddd')
    dispatch(actions.UpUIState.hideErrorAlert());
  };
  //搜索
  onClickSearch = value => {
    const { DataState, UIState, dispatch } = this.props;
    let gradeID =
      DataState.GetCourseClassDetailsHandleClassMsg.selectData.Grade.value;
    // console.log(value.value);
    if (value.value === "") {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "warn",
          title: "搜索关键字不能为空",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertClose.bind(this),
          onHide: this.onAlertWarnHide.bind(this)
        })
      );
      return;
    }
    let Test = /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/.test(
      value.value
    );
    if (!Test) {
      dispatch(
        actions.UpUIState.showErrorAlert({
          type: "btn-error",
          title: "输入的学号或姓名格式不正确",
          ok: this.onAppAlertOK.bind(this),
          cancel: this.onAppAlertCancel.bind(this),
          close: this.onAppAlertCancel.bind(this)
        })
      );
      return;
    }
    this.setState({
      show: true,
      CancelBtnShow: "y",
      keyword: value.value,
      // selectClassTab: '',
      leftShow: false
    });
    dispatch(
      actions.UpDataState.searchClassStudentMsg(
        "/GetStudentForAddOrEditCourseClassByKey?schoolID=" +
          this.state.UserMsg.SchoolID +
          "&gradeID=" +
          gradeID +
          "&key=" +
          value.value
      )
    );
  };
  //通用提示弹窗
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
  onStopClickTabClick = (e,id)=>{
    // console.log(e,id)
    e.stopPropagation();

    const { DataState, UIState, dispatch } = this.props;
    this.setState({
      selectClassTab: id,
      show: true,
      // checkAll: false
    });
    let isSelectAll = false
    let Class = DataState.GetCourseClassDetailsHandleClassMsg.transfer.Class;
    Class.map(child=>{
      if(child===id){
        isSelectAll = true;
      }
    })
    this.setState({
      isSelectAll
    })
    // let oldStudent = DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student;
    // dispatch(actions.UpDataState.setClassStudentTransferMsg(oldStudent))
    dispatch(
      actions.UpDataState.getClassStudentMsg(
        "/GetStudentForAddOrEditCourseClassByGroupID?schoolID=" +
          this.state.UserMsg.SchoolID +
          "&classID=" +
          id
      )
    );
  }
  //点击左侧
  onClickTabClick = (id,Class = '',func=()=>{}) => {
    const { DataState, UIState, dispatch } = this.props;
    this.setState({
      selectClassTab: id,
      show: true,
      // checkAll: false
    });
    // let oldStudent = DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student;
    // dispatch(actions.UpDataState.setClassStudentTransferMsg(oldStudent))
    let isSelectAll = false
    Class =Class?Class: DataState.GetCourseClassDetailsHandleClassMsg.transfer.Class;
    Class.map(child=>{
      if(child===id){
        isSelectAll = true;
      }
    })
    this.setState({
      isSelectAll
    })
    console.log(Class,isSelectAll,id)
    dispatch(
      actions.UpDataState.getClassStudentMsg(
        "/GetStudentForAddOrEditCourseClassByGroupID?schoolID=" +
          this.state.UserMsg.SchoolID +
          "&classID=" +
          id,func
      )
    );
  };
  onSelectAllClick = e =>{
    e.stopPropagation();

  }
  //全选
  onSelectAllChange = e => {
// e.stopPropagation()
    const { DataState, UIState, dispatch } = this.props;
    let oldCheckedList = this.state.checkList;
    let transfer =
      DataState.GetCourseClassDetailsHandleClassMsg.transfer.Student;
    let popStudent = DataState.GetStudentClassMsg.ClassStudent.propStudent; //数据类型[{id:id,name:name}]
    let studentList = DataState.GetStudentClassMsg.ClassStudent.studentList; //数据类型：{id：name}
    let oldStudent =
      DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student; //上次改变生成的数据
      let ClassList = DataState.GetStudentClassMsg.GradeClass
    // let checkAll = e.target.checked;
    //  checkAll =false;
    let oldClass = DataState.GetCourseClassDetailsHandleClassMsg.transfer.Class;
    let firstArray = [];
    let secondArray = [];
    let SelectTabID = ''
    if(oldClass.length<e.length){
      firstArray = e;
      secondArray = oldClass
    }else{
      firstArray = oldClass;
      secondArray = e
    }
    firstArray.map(child=>{
    let isChecked = false

      secondArray.map((child2,index2)=>{
        if(!(!isChecked&&child2!==child)){
       
          isChecked = true
        }
      })
      console.log(isChecked)
      if(!isChecked){
        SelectTabID = child
      }
    })
    console.log(SelectTabID,oldClass,e)
    let isSelectClassTab = false;
    let ClassSource = []
    e.map(child=>{
      if(SelectTabID===child){
        isSelectClassTab = true
      }
      ClassList.map(child2=>{
      if(child2.ClassID===child){
        ClassSource.push(child2)
      }
      })
    })
    this.setState({
      selectClassTab:SelectTabID
    })
    
    dispatch(actions.UpDataState.setClassStudentTransferTransferMsg({Class:e,ClassSource}))
    let that = this
this.onClickTabClick(SelectTabID,e,(popStudent)=>{
  if (isSelectClassTab) {
    let newStudent = [];
    popStudent.map((child, index) => {
      //全选的
      let isNewStudent = false;
      let unEqual = true;
      transfer.map((oldChild, oldIndex) => {
        // if (oldChild.StudentID !== child.StudentID && oldIndex === oldStudent.length - 1 && unEqual) {
        //     isNewStudent = true;
        // } else if (oldChild.StudentID === child.StudentID) {
        //     unEqual = false;
        // }
        if (oldChild.StudentID === child.StudentID) {
          unEqual = false;
          isNewStudent = true;
        }
      });
      if (!isNewStudent) {
        //去除重复的
        newStudent.push(child);
      }
    });

    //生成全选后的数组
    let transferStudent = newStudent.concat(transfer);
    let newCheckList = [];
    let newTransferStudent = [];
    transferStudent.map((child, index) => {
      let isSelectAllClassOfStudent = false
    e.map(child2=>{
      if(child.ClassID===child2){
        isSelectAllClassOfStudent = true
      }
    })
      if(!isSelectAllClassOfStudent){
        newCheckList.push(child.StudentID)
        newTransferStudent.push(child)
      }
    });
    // console.log(newCheckList,oldStudent,newStudent,transferStudent)

    // console.log(newCheckList)
    that.setState({
      // checkAll: true,
      isSelectAll:true,
      checkList: newCheckList
    });
    //dispatch(actions.UpDataState.setClassStudentTransferMsg('/CourseClass_searchStudentID?gradeID='+this.state.selectClassTab+'&school=sss&key'+value))
    dispatch(actions.UpDataState.setClassStudentTransferMsg(newTransferStudent));
  } else {
    let newStudent = [];
    transfer.map((child, index) => {
      //取消全选的
      let Equal = false;
      popStudent.map((oldChild, oldIndex) => {
        if (oldChild.StudentID === child.StudentID) {
          Equal = true;
        }
      });
      if (!Equal) {
        return newStudent.push(child);
      }
    });

    //生成全选后的数组
    let transferStudent = newStudent;
    // let newCheckList = transferStudent.map((child, index) => {
    //   return child.StudentID;
    // });
    let newCheckList = [];
    let newTransferStudent = [];
    transferStudent.map((child, index) => {
      let isSelectAllClassOfStudent = false
    e.map(child2=>{
      if(child.ClassID===child2){
        isSelectAllClassOfStudent = true
      }
    })
      if(!isSelectAllClassOfStudent){
        newCheckList.push(child.StudentID)
        newTransferStudent.push(child)
      }
    });
    that.setState({
      isSelectAll: false,
      checkList: newCheckList
    });
    dispatch(actions.UpDataState.setClassStudentTransferMsg(newTransferStudent));
  }
})

    // console.log(this.state.plainOptions)
   
  };
  //点击checkBox组
  onChangeCheckBox = value => {
    const { DataState, UIState, dispatch } = this.props;
    let plainOptions = this.state.plainOptions;
    let oldCheckList = this.state.checkList;
    let popStudent = DataState.GetStudentClassMsg.ClassStudent.propStudent; //数据类型[{id:id,name:name}]
    let studentList = DataState.GetStudentClassMsg.ClassStudent.studentList; //数据类型：{id：name}
    let oldStudent =
      DataState.GetCourseClassDetailsHandleClassMsg.selectData.Student; //上次改变生成的数据
    let transfer =
      DataState.GetCourseClassDetailsHandleClassMsg.transfer.Student;
      let ClassList = DataState.GetStudentClassMsg.GradeClass

    //获得列表没选的
    let newCheckList = [];
    plainOptions.map((child, index) => {
      let unSelect = true;
      value.map(valueChild => {
        if (child === valueChild) {
          unSelect = false;
        }
      });
      if (unSelect) {
        newCheckList.push(child);
      }
    });
    //checklist去掉未选的
    let newTransfer = transfer;
    let newTrans = [];
    // console.log(newTransfer, oldCheckList, newCheckList)
    let isSelectList = [];
    oldCheckList.map((child, index) => {
      let isSelect = true;
      let isTranSelect = true;
      newCheckList.map(list => {
        if (list === child) {
          //进来就是没选择的
          isSelect = false;
          newTransfer.map((trans, key) => {
            if (trans.StudentID === child) {
              isTranSelect = false;
              newTrans.push(key);
            }
          });
        }
      });

      if (isSelect) {
        isSelectList.push(child);
      }
    });
    // console.log(newTrans)
    let transtrans = [];
    newTransfer.map((child, index) => {
      let a = true;
      newTrans.map(key => {
        if (key === index) {
          a = false;
        }
      });
      if (a) {
        transtrans.push(child);
      }
    });

    //旧选中加新选
    let transerNewData = [];
    let newList = [];
    value.map((child, index) => {
      let isNew = true;
      isSelectList.map(valueChild => {
        if (valueChild === child) {
          isNew = false;
        }
      });

      if (isNew) {
        popStudent.map((pop, index) => {
          if (pop.StudentID === child) {
            transerNewData.push(pop);
          }
        });
        newList.push(child);
      }
    });
    // console.log(transtrans, transerNewData)
    newTrans = transtrans.concat(transerNewData);
    let endCheckList = isSelectList.concat(newList);

    // // console.log(value, endCheckList)
    this.setState({
      checkList: endCheckList,
      isSelectAll: value.length === this.state.plainOptions.length ? true : false
    });
    let ClassSelect = DataState.GetCourseClassDetailsHandleClassMsg.transfer.Class
    let newClassSelect = []
if(value.length === this.state.plainOptions.length){
  ClassSelect.map(child=>{
    if(child!==this.state.selectClassTab){
      newClassSelect.push(child)
    }

  })
  newClassSelect.push(this.state.selectClassTab)
}else{
  ClassSelect.map(child=>{
    if(child!==this.state.selectClassTab){
      newClassSelect.push(child)
    }
  })
}
let ClassSource = []
newClassSelect.map(child=>{
  ClassList.map(child2=>{
    if(child2.ClassID===child){
      ClassSource.push(child2)
    }
    })
})
    dispatch(actions.UpDataState.setClassStudentTransferTransferMsg({Class:newClassSelect,ClassSource}))

    dispatch(actions.UpDataState.setClassStudentTransferMsg(newTrans));
  };
  //搜索change
  onChangeSearch = e => {
    this.setState({
      searchValue: e.target.value.trim()
    });
  };
  // 取消搜索
  onCancelSearch = e => {
    const { dispatch, DataState } = this.props;
    this.setState({
      CancelBtnShow: "n",
      keyword: "",
      searchValue: "",
      selectClassTab: "",
      leftShow: true
    });
    if (DataState.GetStudentClassMsg.GradeClass.length) {
      this.setState({
        selectClassTab: DataState.GetStudentClassMsg.GradeClass[0].ClassID
      });
      this.onClickTabClick( DataState.GetStudentClassMsg.GradeClass[0].ClassID);
    }
  };
  render() {
    const { DataState, UIState } = this.props;
    let ClassList = DataState.GetStudentClassMsg.GradeClass
      ? DataState.GetStudentClassMsg.GradeClass
      : [];
      let Class = DataState.GetCourseClassDetailsHandleClassMsg.transfer.Class
      ? DataState.GetCourseClassDetailsHandleClassMsg.transfer.Class
      : [];
    let StudentList = DataState.GetStudentClassMsg.ClassStudent
      ? DataState.GetStudentClassMsg.ClassStudent
      : [];
    let propStudent = StudentList.propStudent ? StudentList.propStudent : [];
    // if(ClassList[0].ClassID){
    //     this.onClickTabClick(ClassList[0].ClassID)
    // }
    //console.log(this.state.checkList)
    return (
      <React.Fragment>
        <div id="SelectStudent" className="selectStudent-box">
          <div className="box-top">
            <Search
              className="top-search"
              placeHolder="请输入学号或姓名进行搜索..."
              width="300"
              Value={this.state.searchValue}
              onChange={this.onChangeSearch.bind(this)}
              onCancelSearch={this.onCancelSearch}
              CancelBtnShow={this.state.CancelBtnShow}
              onClickSearch={this.onClickSearch.bind(this)}
            ></Search>
          </div>
          <Loading spinning={UIState.AppLoading.studentLoading}>
            {ClassList.length ? (
              <div className="box-content" style={{ height: "437px" }}>
                <Scrollbars
                  style={{
                    width: 177 + "px",
                    height: 437 + "px",
                    float: "left",
                    margin: 0,
                    display: this.state.leftShow ? "block" : "none"
                  }}
                >
                  <CheckBoxGroup
                        name="123"
                        value={Class}
                        className="selectClassBox"
                    style={{ width: 176 + "px", height: 436 + "px", margin: 0 }}
                        onChange={this.onSelectAllChange.bind(this)}
                      >
                  {/* <ul
                    className="selectClassBox"
                    style={{ width: 176 + "px", height: 436 + "px", margin: 0 }}
                  > */}
                    {ClassList.map((child, index) => {
                      return (
                        <li
                          title={child.ClassName}
                          onClick={e=>this.onStopClickTabClick(
                            e,
                            child.ClassID
                          )}
                          className={`selectContent ${
                            this.state.selectClassTab === child.ClassID
                              ? "active"
                              : ""
                          }`}
                          
                          key={child.ClassID}
                        >
                          <CheckBox
                          className="selectAll"
                          type="gray"
                          value={child.ClassID}
                          onClick={this.onSelectAllClick.bind(this)}
                          // checked={this.state.checkAll}
                        >
                          
                        </CheckBox>
                        <span className='ClassName'>{child.ClassName}</span>
                        </li>
                      );
                    })}
                  {/* </ul> */}
                  </CheckBoxGroup>
                </Scrollbars>
                <Loading
                  spinning={UIState.AppLoading.classStudentLoading}
                  style={{ height: "437px" }}
                >
                  <ul
                    className="selectStudent"
                    style={{
                      width: this.state.leftShow ? 475 + "px" : 680 + "px",
                      height: 437 + "px",
                      display: this.state.show ? "block" : "none"
                    }}
                  >
                    {propStudent.length ?  
                    <Scrollbars
                      style={{ width: 100 + "%", height: 387 + "px" }}
                    >
                      <CheckBoxGroup
                        name="123"
                        value={this.state.isSelectAll?DataState.GetStudentClassMsg.ClassStudent.CheckList:this.state.checkList}
                        onChange={this.onChangeCheckBox.bind(this)}
                      >
                        {propStudent.map((child, index) => {
                          return (
                            <li className="selectContent" key={child.StudentID}>
                              <CheckBox type="gray" value={child.StudentID}>
                                <span
                                  title={child.StudentName}
                                  className="studentName"
                                >
                                  {child.StudentName}
                                </span>
                                <span
                                  title={child.StudentID}
                                  className="studentID"
                                >
                                  {"[" + child.StudentID + "]"}
                                </span>
                              </CheckBox>
                            </li>
                          );
                        })}
                      </CheckBoxGroup>
                    </Scrollbars>
                     : (
                      <Empty
                        type="4"
                        title="暂无符合条件的学生"
                        style={{
                          marginTop: "238.5px",
                          transform: "translateY(-50%)"
                        }}
                      ></Empty>
                    )}
                  </ul>
                </Loading>
              </div>
            ) : (
              <Empty
                type="4"
                title="暂无符合条件的学生"
                style={{ marginTop: "238.5px", transform: "translateY(-50%)" }}
              ></Empty>
            )}
          </Loading>
        </div>
      </React.Fragment>
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
export default connect(mapStateToProps)(SelectStudent);
