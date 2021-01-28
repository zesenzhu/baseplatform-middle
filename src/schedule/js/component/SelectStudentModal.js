import React,{useState,useImperativeHandle,useEffect,useRef,forwardRef,memo} from "react";

import { connect } from "react-redux";

import "../../scss/common/select-student-modal.scss";

import { Scrollbars } from "react-custom-scrollbars";

import apiActions from '../actions/ApiActions';

import {
  Search,
  Loading,
  CheckBox,
  CheckBoxGroup,
  Empty,
  DropDown
} from "../../../common";

function SelectStudent(props){

  //state

    const [grade,setGrade] = useEffect({

        dropSelectd:{value:'',title:'全部年级'}

    });

    //学生相关的state
    const [stuList,setStuList] = useState({

       list:[],

       searchList:[],

       checkedList:[]

    });


    //班级相关的state
    const [classList,setClassList] = useState([]);

    //redux

    console.log(props);

    const {LoginUser,dispatch} = props;

    const { UserID,UserType,SchoolID } = LoginUser;

    //props

    // const {gradeClass} = props;


    //初始化

    useEffect(()=>{


        console.log(props);


    },[]);


  //搜索
  const onClickSearch = value => {


    /*if (value.value === "") {
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
    );*/
  };

  //点击左侧
  const onClickTabClick = id => {


  };
  //全选
  const onSelectAllClick = e => {


  };
  //点击checkBox组
  const onChangeCheckBox = value => {

  };
  //搜索change
  const onChangeSearch = e => {

  };
  // 取消搜索
  const onCancelSearch = e => {

  };

  /*useImperativeHandle(ref,()=>({



  }));*/


    return (

        <div  id="SelectStudent" className="selectStudent-box">

            <div className="box-top">

              <DropDown></DropDown>

              <Search
                className="top-search"
                placeHolder="请输入学号或姓名进行搜索..."
                width={245}
              /*  Value={this.state.searchValue}
                onChange={this.onChangeSearch.bind(this)}
                onCancelSearch={this.onCancelSearch}
                CancelBtnShow={this.state.CancelBtnShow}
                onClickSearch={this.onClickSearch.bind(this)}*/>

              </Search>

            </div>

            <Loading>

                {

                  classList.length ?

                    <div className="box-content" style={{ height: "437px" }}>

                        <Scrollbars
                          style={{
                            width: 177,
                            height: 437,
                            float: "left",
                            margin: 0,
                            // display: this.state.leftShow ? "block" : "none"
                          }}
                        >
                          <ul className="selectClassBox" style={{ width: 176, height: 436, margin: 0 }}>

                            {
                              classList.map((child, index) => {
                              return (
                                <li
                                  title={child.ClassName}
                                  /*onClick={this.onClickTabClick.bind(
                                    this,
                                    child.ClassID
                                  )}
                                  className={`selectContent ${
                                    this.state.selectClassTab === child.ClassID
                                      ? "active"
                                      : ""
                                  }`}*/
                                  key={child.ClassID}
                                >
                                  {child.ClassName}
                                </li>
                              );
                            })}

                          </ul>

                        </Scrollbars>

                <Loading
                    // spinning={UIState.AppLoading.classStudentLoading}
                  style={{ height: "437px" }}>
                  <ul className="selectStudent"
                    style={{
                      // width: this.state.leftShow ? 475 + "px" : 680 + "px",
                      height: 437,
                      // display: this.state.show ? "block" : "none"
                    }}>

                      {

                        stuList.list.length ?

                          <li className="selectAllBox">

                            <CheckBox
                              className="selectAll"
                              type="gray"
                            /*  onClick={this.onSelectAllClick.bind(this)}
                              checked={this.state.checkAll}*/
                            >
                              全选
                            </CheckBox>

                          </li>
                     :

                         <Empty type="4" title="暂无符合条件的学生" style={{marginTop:238, transform: "translateY(-50%)"}}></Empty>

                    }


                    <Scrollbars style={{ width: 100 + "%", height:387}}>

                      <CheckBoxGroup
                        name="123"
                       /* value={this.state.checkList}
                        onChange={this.onChangeCheckBox.bind(this)}*/>
                        {

                          stuList.searchList.map((child, index) => {

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

                            })

                        }

                      </CheckBoxGroup>

                    </Scrollbars>

                  </ul>

                </Loading>

              </div>

                    :

                    <Empty type="4" title="暂无符合条件的学生" style={{ marginTop:238,transform:"translateY(-50%)" }}></Empty>

              }

          </Loading>

        </div>

    );

}

const mapStateToProps = state => {

  console.log(state);

  const { LoginUser } = state;

  console.log(LoginUser);

  return {

      LoginUser
  };

};
export default connect(mapStateToProps,null,null,{forwardRef:true})(memo(forwardRef(SelectStudent)));
