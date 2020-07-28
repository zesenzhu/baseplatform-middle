import AASActions from '../actions/AppAlertSuccess';

import UpUIState from './UpUIState';

import Method from './Method';

import AppAlertActions from './AppAlertActions';

import PaginationActions from './PaginationActions';

import ApiActions from './ApiActions';

import CONFIG from '../../../common/js/config'

import SearchActions from "./SearchActions";

import utils from './utils';

import $ from 'jquery';




//操作常量
//获取登录用户信息
const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO';
//获取所有年级总览信息
const  GET_ALL_GRADE_PREVIEW = 'GET_ALL_GRADE_PREVIEW';
//获取年级班级信息
const GET_SHCOOL_GRADE_CLASSES = 'GET_SHCOOL_GRADE_CLASSES';
//获取某一年级总览数据
const  GET_THE_GRADE_PREVIEW = 'GET_THE_GRADE_PREVIEW';

//某一年级内classloading展现

const THE_GRADE_CLASS_LOADING_SHOW = 'THE_GRADE_CLASS_LOADING_SHOW';

const THE_GRADE_CLASS_LOADING_HIDE = 'THE_GRADE_CLASS_LOADING_HIDE';


//某一年级内是否出现统计

const THE_GRADE_CLASS_STATICS_SHOW = 'THE_GRADE_CLASS_STATICS_SHOW';

const THE_GRADE_CLASS_STATICS_HIDE = 'THE_GRADE_CLASS_STATICS_HIDE';


//搜索值的变化
const THE_GRADE_CLASS_SEARCHKEY_CHANGE = 'THE_GRADE_CLASS_SEARCHKEY_CHANGE';

//list更新
const THE_GRADE_CLASS_LIST_UPDATE = 'THE_GRADE_CLASS_LIST_UPDATE';


const ALL_GRADE_CLASS_SEARCHKEY_CHANGE = 'ALL_GRADE_CLASS_SEARCHKEY_CHANGE';

const ALL_GRADE_CLASS_LOADING_HIDE = 'ALL_GRADE_CLASS_LOADING_HIDE';

const ALL_GRADE_CLASS_LOADING_SHOW = 'ALL_GRADE_CLASS_LOADING_SHOW';

const ALL_GRADE_CLASS_CONTENT_SHOW = 'ALL_GRADE_CLASS_CONTENT_SHOW';

const ALL_GRADE_CLASS_CONTENT_HIDE = 'ALL_GRADE_CLASS_CONTENT_HIDE';

const ALL_GRADE_CLASS_LIST_UPDATE = 'ALL_GRADE_CLASS_LIST_UPDATE';

const STUDENT_SEARCHKEY_CHANGE = 'STUDENT_SEARCHKEY_CHANGE';

const STUDENT_WRAPPER_LOADING_SHOW = 'STUDENT_WRAPPER_LOADING_SHOW';

const STUDENT_WRAPPER_LOADING_HIDE = 'STUDENT_WRAPPER_LOADING_HIDE';

//获取某一班级的教师列表
const GET_THE_CLASS_THEACHERS = 'GET_THE_CLASS_THEACHERS';
//获取某一班级的学生列表
const GET_THE_CLASS_STUDENTS = 'GET_THE_CLASS_STUDENTS';
//初始所有的学生选项
const INIT_STUDEUNT_PLAIN_OPTIONS = 'INIT_STUDEUNT_PLAIN_OPTIONS';
//学生多选框变化
const STUDENTS_CHECK_LIST_CHANGE = 'STUDENTS_CHECK_LIST_CHANGE';
//学生的全选和全不选
const STUDENTS_CHECKED_ALL = 'STUDENTS_CHECKED_ALL';
const STUDENTS_CHECKED_NONE = 'STUDENTS_CHECKED_NONE';
//教师的弹窗
const ADD_TEACHER_UPDATA_TEACHERLIST = 'ADD_TEACHER_UPDATA_TEACHERLIST';
const ADD_TEACHER_UPDATA_SUBJECTS = 'ADD_TEACHER_UPDATA_SUBJECTS';
const ADD_TEACHER_CLOSE_SHOW = 'ADD_TEACHER_CLOSE_SHOW';
const ADD_TEACHER_CLOSE_HIDE = 'ADD_TEACHER_CLOSE_HIDE';
const ADD_TEACHER_UPDATE_NEW_TEACHER = 'ADD_TEACHER_UPDATE_NEW_TEACHER';
const ADD_TEACHER_UPDATE_ORIGIN_TEACHER = 'ADD_TEACHER_UPDATE_ORIGIN_TEACHER';
const ADD_TEACHER_ORIGIN_TEACHER_SHOW = 'ADD_TEACHER_ORIGIN_TEACHER_SHOW';
const ADD_TEACHER_ORIGIN_TEACHER_HIDE = 'ADD_TEACHER_ORIGIN_TEACHER_HIDE';
const ADD_TEACHER_NEW_TEACHER_TITLE = 'ADD_TEACHER_NEW_TEACHER_TITLE';

//操作的执行

const THE_GRADE_CLASS_SEARCH_CANCEL_BTN_SHOW = 'THE_GRADE_CLASS_SEARCH_CANCEL_BTN_SHOW';

const THE_GRADE_CLASS_SEARCH_CANCEL_BTN_HIDE = 'THE_GRADE_CLASS_SEARCH_CANCEL_BTN_HIDE';

const ALL_GRADE_CLASS_SEARCH_CANCEL_BTN_SHOW = 'ALL_GRADE_CLASS_SEARCH_CANCEL_BTN_SHOW';

const ALL_GRADE_CLASS_SEARCH_CANCEL_BTN_HIDE = 'ALL_GRADE_CLASS_SEARCH_CANCEL_BTN_HIDE';

//获取界面初始信息
const  getPageInit = () => {

    return (dispatch,getState) => {


        let { SchoolID } = getState().DataState.LoginUser;

        GetGradeClassTree(SchoolID,dispatch).then(data=>{

            if (data){

                dispatch({type:GET_SHCOOL_GRADE_CLASSES,data:data});

                dispatch({type:UpUIState.CHANGE_STU_ACTIVE});

            }

        });

    }
};

const UpGradeClassTree = (SchoolID)=>{

  return (dispatch,getState) => {

      GetGradeClassTree(SchoolID,dispatch).then(data=>{

          if (data){

              dispatch({type:GET_SHCOOL_GRADE_CLASSES,data:data});

              const ClassIsActive = getState().UIState.ComponentChange.class;


              if (ClassIsActive){

                  const ClassID = getState().UIState.ComponentChange.classInfo.id;

                  //将活动状态的班级继续设置为活动状态

                  $('.frame_leftmenu_onegrade_ul').children().each((index,dom)=>{

                      if ($(dom).attr('data-id')===ClassID){

                          $(dom).addClass('active');

                          $(dom).children().addClass('active');

                      }else{

                          $(dom).removeClass('active');

                          $(dom).children().removeClass('active');

                      }

                  });

              }

          }

      });

  }

};


//获取所有的年纪总览数据
const getAllGradePreview = () => {

    return (dispatch,getState) =>{

        dispatch({type:UpUIState.GRADE_LOADING_SHOW});

        let { SchoolID } = getState().DataState.LoginUser;

        //let SchoolID = 'school1';

        GetSummary(SchoolID,dispatch).then(data=>{

            if (data){

                dispatch({type:GET_ALL_GRADE_PREVIEW,data:data});

                dispatch({type:UpUIState.GRADE_LOADING_HIDE});

                dispatch({type:UpUIState.APP_LOADING_CLOSE});

            }

        });


    }

};

//获取某一年纪的所有总览数据
const getTheGradePreview = (GradeID)=> {

    return (dispatch,getState) => {

        let { SchoolID } = getState().DataState.LoginUser;

        dispatch({type:UpUIState.CLASS_LOADING_SHOW});

        getClassList({SchoolID,GradeID,PageIndex:0,PageSize:12,dispatch}).then(data=>{


            if (data){

                dispatch({type:GET_THE_GRADE_PREVIEW,data:data});

                dispatch({type:PaginationActions.CLASS_PAGINATION_CURRENT_UPDATE,data:1});

                dispatch({type:PaginationActions.CLASS_PAGINATION_TOTAL_UPDATE,data:data.Total});

                dispatch({type:UpUIState.CLASS_LOADING_HIDE});

                dispatch({type:UpUIState.APP_LOADING_CLOSE});

            }

        });

    }

};
//获取某一班级的数据
const getTheClassPreview = (ClassID) =>{

    return (dispatch,getState) => {

        dispatch({type:UpUIState.STUDENT_LOADING_SHOW});

        let getTeachersPromise = getTeachers({ClassID:ClassID,dispatch});

        let getStudentsPromise = getStudents({ClassID:ClassID,dispatch,PageSize:12,PageIndex:0});

        Promise.all([getStudentsPromise,getTeachersPromise]).then((res) => {

            dispatch({type:SearchActions.MANAGER_STUDENT_SEARCH_INIT});

            dispatch({type:GET_THE_CLASS_STUDENTS,data:res[0]});

            dispatch({type:PaginationActions.STUDENT_PAGINATION_CURRENT_UPDATE,data:1});

            dispatch({type:PaginationActions.STUDENT_PAGINATION_TOTAL_UPDATE,data:res[0].Total});

            dispatch({type:GET_THE_CLASS_THEACHERS,data:res[1]});

            //获取最新的学生列表信息，传递给待选项。
            if (res[0].List&&res[0].List.length>0&&res[0].Total>0){

                let list = res[0].List.map(item =>{return JSON.stringify({id:item.UserID,name:item.UserName})});

                dispatch({type:INIT_STUDEUNT_PLAIN_OPTIONS,data:list});

            }else{

                dispatch({type:INIT_STUDEUNT_PLAIN_OPTIONS,data:[]});

            }

            dispatch({type:STUDENTS_CHECK_LIST_CHANGE,list:[]});

            dispatch({type:STUDENTS_CHECKED_NONE});

            dispatch({type:UpUIState.STUDENT_LOADING_HIDE});

            dispatch({type:UpUIState.APP_LOADING_CLOSE});

        });

    }
};

//学生选择组件发生改变
const changeStudentCheckList = (checkList) => {

    return (dispatch,getState) => {

        dispatch({type:STUDENTS_CHECK_LIST_CHANGE,list:checkList});

        let {StudentsPlainOptions,StudentsCheckList} =  getState().DataState;

        //判断是不是全选。

        if (StudentsCheckList.length===StudentsPlainOptions.list.length){

            dispatch({type:STUDENTS_CHECKED_ALL});

        }else{

            dispatch({type:STUDENTS_CHECKED_NONE});

        }

    }

};

//添加班级
const addClass = ({GradeID,ClassName,TheGradePreviewID}) =>{

    return (dispatch,getState) => {

        let { SchoolID } = getState().DataState.LoginUser;

        let SchoolSearchKey = getState().DataState.AllGradePreview.SearchKey;

        let GradeSearchKey = getState().DataState.TheGradePreview.SearchKey;

        //关闭的弹窗的时候重置一些操作
        addClassPost({GradeID,ClassName,dispatch}).then(data=>{

           if (data===0){

               dispatch({type:UpUIState.ADD_CLASS_MODAL_HIDE});

              /* dispatch(AppAlertActions.alertSuccess({title:'添加班级成功！'}));*/

               dispatch(AASActions.AlertSuccess({title:"添加班级成功！"}));

               if (SchoolSearchKey){

                   dispatch(SearchActions.SchoolClassSearch(SchoolSearchKey));

               }else{

                   dispatch(getAllGradePreview());

               }

               if (TheGradePreviewID){

                   if (GradeSearchKey){

                        dispatch(SearchActions.GradeClassSearch(TheGradePreviewID,GradeSearchKey));

                   }else{

                       dispatch(getTheGradePreview(TheGradePreviewID));

                   }

               }

               dispatch(UpGradeClassTree(SchoolID));

               if(window.opener&&window.opener.location.href.includes('/html/admArchives')){

                   window.opener.location.reload();

               }

               //查看活动班级状态

           }

        });



    }

};


//添加教师弹框获取所有的教师和学科的数据
const getAddTeacherData = (opts) =>{

    return (dispatch,getState) => {


        let TeacherID = '';

        const { ClassID,type,originTeacherInfo } = opts;

        const { SubjectID,SubjectName } = originTeacherInfo?originTeacherInfo:{};

        let { SchoolID } = getState().DataState.LoginUser;

        switch (type) {

            case 1:

                dispatch({type:UpUIState.ADD_TEACHER_SUBJECTS_SELECT_CHANGE,data:{value:"none",title:"请选择学科"}});

                getSubjects({ClassID,dispatch}).then(data=>{

                    if (data){

                        dispatch({type:ADD_TEACHER_UPDATA_SUBJECTS,list:data.List});

                    }

                    dispatch({type:UpUIState.ADD_TEACHER_LOADING_HIDE});

                });

                break;

            case 2:

                dispatch({type:UpUIState.ADD_TEACHER_SUBJECTS_SELECT_CHANGE,data:{value:SubjectID,title:SubjectName}});

                dispatch({type:UpUIState.ADD_TEACHER_SUBJECTS_SELECT_DISABLED});

                TeacherID = getState().UIState.AddTeacherModal.originTeacherInfo.id;

                ApiActions.GetTeacherForSetCourseTeacher({SchoolID,UserID:TeacherID,SubjectID,ClassID,dispatch}).then(data=>{

                    if (data){

                        dispatch({type:ADD_TEACHER_UPDATA_TEACHERLIST,list:data});

                    }

                    dispatch({type:UpUIState.ADD_TEACHER_LOADING_HIDE});

                });

                break;

            case 3: case 4:

                if (type===4){

                    TeacherID = getState().UIState.AddTeacherModal.originTeacherInfo.id;

                }

                let getSubjectsPromise = getGangerSubjects({SchoolID,dispatch}).then(data=>{

                    if (data){

                        let dropInfo = data[0];

                        dispatch({type:ADD_TEACHER_UPDATA_SUBJECTS,list:data});

                        dispatch({type:UpUIState.ADD_TEACHER_SUBJECTS_SELECT_CHANGE,data:{value:dropInfo.SubjectID,title:dropInfo.SubjectName}});

                        getAllTeacher({SchoolID,UserID:TeacherID,SubjectIDs:dropInfo.SubjectID,PageSize:0}).then(data2=>{


                            if (data2){

                                dispatch({type:ADD_TEACHER_UPDATA_TEACHERLIST,list:data2});

                            }

                            dispatch({type:UpUIState.ADD_TEACHER_LOADING_HIDE});


                        })

                    }

                });


                break;

            default:

                return;

        }

    }

};

//教师弹窗选择的学科发生改变

const teacherModalSelectChange = (selectData) => {

    return (dispatch,getState) => {

        const {type,inputContent} = getState().UIState.AddTeacherModal;

        let { SchoolID } = getState().DataState.LoginUser;

        const ClassID = getState().UIState.ComponentChange.classInfo.id;

        dispatch({type:UpUIState.ADD_TEACHER_LIST_LOADING_SHOW});

        dispatch({type:ADD_TEACHER_UPDATE_NEW_TEACHER,data:{id:'',photo:'',name:''}});

        let TeacherID = '';

        if (type ===2||type===4){ //如果type是2或者4类型的代表更新需要将已有教师ID排除

            TeacherID = getState().UIState.AddTeacherModal.originTeacherInfo.id;

        }

        let SubjectID = selectData.value;

        if (type===1||type===2){

            ApiActions.GetTeacherForSetCourseTeacher({SchoolID,UserID:TeacherID,Keyword:inputContent,SubjectID,ClassID,dispatch}).then(data=>{

                if (data){

                    dispatch({type:ADD_TEACHER_UPDATA_TEACHERLIST,list:data});

                }

                dispatch({type:UpUIState.ADD_TEACHER_LIST_LOADING_HIDE});

            });

        }else{

            getAllTeacher({SchoolID,UserID:TeacherID,SubjectIDs:SubjectID,Keyword:inputContent}).then(data=>{

                if (data){

                    dispatch({type:ADD_TEACHER_UPDATA_TEACHERLIST,list:data});

                }

                dispatch({type:UpUIState.ADD_TEACHER_LIST_LOADING_HIDE});

            });

        }



    }

};

//教师弹窗点击搜索按钮
const  teacherSearchBtnClick = (that) => {

  return (dispatch,getState) => {

      let { type,subjectsSelect,inputContent } = getState().UIState.AddTeacherModal;

      let { SchoolID } = getState().DataState.LoginUser;

      const ClassID = getState().UIState.ComponentChange.classInfo.id;

      let RegResult = utils.SearchReg({type:1,ErrorTips:"您输入的姓名或工号不正确",dispatch,key:inputContent});

      if (RegResult){

          //展示loading
          dispatch({type:UpUIState.ADD_TEACHER_LIST_LOADING_SHOW});

          dispatch({type:UpUIState.ADD_TEACHER_CLOSE_SHOW});

          let UserID = '';

          let SubjectID = '';

          if (type===2||type===4){//排除教师ID

              UserID = getState().UIState.AddTeacherModal.originTeacherInfo.id;

          }

          if(subjectsSelect.value==='none'){

              // dispatch(AppAlertActions.alertWarn({title:"请先选择学科！"}));

              that.setState({TeacherModal:{...that.state.TeacherModal,SubjectTipsShow:true}});

              dispatch({type:ADD_TEACHER_CLOSE_HIDE});

              dispatch({type:UpUIState.ADD_TEACHER_INPUT_CHANGE,data:''});

              dispatch({type:UpUIState.ADD_TEACHER_LIST_LOADING_HIDE});

          }else{

              SubjectID = subjectsSelect.value;

              if (type===1||type===2){

                  ApiActions.GetTeacherForSetCourseTeacher({SchoolID,UserID,Keyword:inputContent,SubjectID,ClassID,dispatch}).then(data=>{

                      if (data){

                          dispatch({type:ADD_TEACHER_UPDATA_TEACHERLIST,list:data});

                          dispatch({type:UpUIState.ADD_TEACHER_LIST_LOADING_HIDE});

                      }else{

                          dispatch({type:UpUIState.ADD_TEACHER_LIST_LOADING_SHOW});

                      }

                  });

              }else{

                  getAllTeacher({SchoolID,SubjectIDs:SubjectID,UserID,Keyword:inputContent,dispatch}).then(data=>{

                      if (data){

                          dispatch({type:ADD_TEACHER_UPDATA_TEACHERLIST,list:data});

                          dispatch({type:UpUIState.ADD_TEACHER_LIST_LOADING_HIDE});

                      }else{

                          dispatch({type:UpUIState.ADD_TEACHER_LIST_LOADING_SHOW});

                      }

                  });

              }


          }

      }


  }

};

//教师弹窗点击取消搜索
const teacherSearchClose = () => {

    return (dispatch,getState) => {

        dispatch({type:UpUIState.ADD_TEACHER_LIST_LOADING_SHOW});

        let { SchoolID } = getState().DataState.LoginUser;

        let {subjectsSelect,type} = getState().UIState.AddTeacherModal;

        const ClassID = getState().UIState.ComponentChange.classInfo.id;

        let UserID = '';

        let SubjectID = '';

        if (subjectsSelect.value==='none'){

            dispatch({type:UpUIState.ADD_TEACHER_LIST_LOADING_HIDE});

            return;

        }else{

            SubjectID = subjectsSelect.value;

        }

        if (type===2||type===4){//排除教师ID

            UserID = getState().UIState.AddTeacherModal.originTeacherInfo.id;

        }

        if (type===1||type===2){

            ApiActions.GetTeacherForSetCourseTeacher({SchoolID,UserID,SubjectID,ClassID,dispatch}).then(data=>{

                if (data){

                    dispatch({type:ADD_TEACHER_UPDATA_TEACHERLIST,list:data});

                }

                dispatch({type:UpUIState.ADD_TEACHER_LIST_LOADING_HIDE});

            });

        }else{

            getAllTeacher({SchoolID,SubjectIDs:SubjectID,UserID}).then(data=>{

                if (data){

                    dispatch({type:ADD_TEACHER_UPDATA_TEACHERLIST,list:data});

                }

                dispatch({type:UpUIState.ADD_TEACHER_LIST_LOADING_HIDE});

            });

        }


    }

};
//更改班主任
const updateGenger = (classInfo) =>{

    return (dispatch,getState) => {

        const newTeacherId = getState().UIState.AddTeacherModal.newPickTeacher.id;

        const classId = classInfo.ClassID;

        const type = getState().UIState.AddTeacherModal.type;

        let tips = '';

        switch (type) {

            case 3:

                tips = '添加班主任成功';

                break;

            case 4:

                tips = '更改班主任成功！';

                break;

            default:

                tips = '';

        }

        setGengar({ClassID:classId,UserID:newTeacherId,dispatch}).then(data=>{

            if (data==='success'){

                /*dispatch(AppAlertActions.alertSuccess({title:tips}));*/

                dispatch(AASActions.AlertSuccess({title:tips}));

                getTeachers({ClassID:classId,dispatch}).then(data=>{

                    if (data){

                        dispatch({type:GET_THE_CLASS_THEACHERS,data:data});

                    }

                });

            }

            dispatch({type:UpUIState.ADD_TEACHER_MODAL_HIDE});

        });

    }

};

//删除班主任

const delGanger = ({ClassID}) => {

  return dispatch => {

      setGengar({ClassID,dispatch}).then(data=>{

          if (data==='success'){

            /*dispatch(AppAlertActions.alertSuccess({title:"删除班主任成功"}));*/

              dispatch({type:AppAlertActions.CLOSE_ERROR_ALERT});

              dispatch(AASActions.AlertSuccess({title:"撤销班主任成功!"}));

              getTeachers({ClassID,dispatch}).then(data=>{

                  if (data){

                      dispatch({type:GET_THE_CLASS_THEACHERS,data:data});

                  }

              });

          }

      })

  }

};


//更改任课教师
const updateTeacher = (classInfo) => {

    return (dispatch,getState) => {

        const newTeacherId = getState().UIState.AddTeacherModal.newPickTeacher.id;

        const ClassID = classInfo.ClassID;

        let SubjectID = '';

        const type = getState().UIState.AddTeacherModal.type;

        if (type===2){

            SubjectID = getState().UIState.AddTeacherModal.SubjectID;

        }else{

            SubjectID = getState().UIState.AddTeacherModal.subjectsSelect.value;

        }

        let tips = '';

        switch (type) {

            case 1:

                tips = '添加任课教师成功';

                break;

            case 2:

                tips = '更改任课教师成功！';

                break;

            default:

                tips = '';

        }

        setTeacher({ClassID,SubjectID,UserID:newTeacherId,dispatch}).then(data=>{

            if (data==='success'){

                /*dispatch(AppAlertActions.alertSuccess({title:tips}));*/

                dispatch(AASActions.AlertSuccess({title:tips}));

            }

            getTeachers({ClassID,dispatch}).then(data=>{

                if (data){

                    dispatch({type:GET_THE_CLASS_THEACHERS,data:data});

                }

            });

            dispatch({type:UpUIState.ADD_TEACHER_MODAL_HIDE});

        });

    }

};

const delSubjectTeacher = ({ClassID,SubjectID}) => {

    return (dispatch,getState) => {

        setTeacher({ClassID,SubjectID,dispatch}).then(data=>{

            console.log(ClassID,SubjectID);

            if (data){

                /*dispatch(AppAlertActions.alertSuccess({title:"删除成功！"}));*/

                dispatch({type:AppAlertActions.CLOSE_ERROR_ALERT});

                dispatch(AASActions.AlertSuccess({title:"删除成功！"}));

            }

            getTeachers({ClassID,dispatch}).then(data=>{

                if (data){

                    dispatch({type:GET_THE_CLASS_THEACHERS,data:data});

                }

            });

        });

    }

};


//编辑班级

const UpdateClassName = ({IsAllPreview,GradeID,ClassID,ClassName}) => {

  return (dispatch,getState) => {

      let { SchoolID } = getState().DataState.LoginUser;

      let SchoolSearchKey = getState().DataState.AllGradePreview.SearchKey;

      let GradeSearchKey = getState().DataState.TheGradePreview.SearchKey;

      editClassPost({ClassName,ClassID,dispatch}).then(data=>{

          if (data==='success'){

              //如果成功

              dispatch({type:UpUIState.RESET_CLASS_NAME_HIDE});

              /*dispatch(AppAlertActions.alertSuccess({title:"修改成功！"}));*/

              dispatch(AASActions.AlertSuccess({title:"修改成功！"}));

              if (IsAllPreview){

                  dispatch(SearchActions.SchoolClassSearch(SchoolSearchKey));

              }else{

                  if (GradeSearchKey){

                      dispatch(SearchActions.GradeClassSearch(GradeID,GradeSearchKey));

                  }else{

                      dispatch(getTheGradePreview(GradeID));

                  }

              }

              dispatch(UpGradeClassTree(SchoolID));

          }

      });

  }

};


const SetMonitorAction = ({UserID='',ClassID}) =>{

    return (dispatch,getState) => {

        const { SearchKey } = getState().DataState.TheStudentList;

        SetMonitor({UserID,ClassID,dispatch}).then(data=>{

            if (data==='success'){

                if (UserID){

                    /*dispatch(AppAlertActions.alertSuccess({title:"成功设置班长!"}));*/

                    dispatch(AASActions.AlertSuccess({title:"成功设置班长！"}));

                }else{

                    /*dispatch(AppAlertActions.alertSuccess({title:"成功取消班长!"}));*/

                    dispatch(AASActions.AlertSuccess({title:"成功撤销班长！"}));

                }

                getStudents({ClassID,Keyword:SearchKey,PageIndex:0,PageSize:12,dispatch}).then(data=>{

                    if (data){

                        dispatch({type:GET_THE_CLASS_STUDENTS,data:data});

                        dispatch({type:STUDENTS_CHECKED_NONE});

                        dispatch({type:STUDENTS_CHECK_LIST_CHANGE,list:[]});

                        let list = data.List.map(item =>{return JSON.stringify({id:item.UserID,name:item.UserName})});

                        dispatch({type:INIT_STUDEUNT_PLAIN_OPTIONS,data:list});

                        dispatch({type:PaginationActions.STUDENT_PAGINATION_CURRENT_UPDATE,data:1});

                        dispatch({type:PaginationActions.STUDENT_PAGINATION_TOTAL_UPDATE,data:data.Total});

                    }


                })

            }

        });

    }

};









//接口



//获取年级班级信息

const GetGradeClassTree = async (SchoolID,dispatch) => {

    let res = await Method.getGetData(`/UserMgr/UserInfoMgr/GetGradeClassTree?SchoolID=${SchoolID}`,2,CONFIG.AdmClassProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常",ok:()=>{ return ()=>window.location.href='error.aspx' }}));

    }

};




//获取班级总览数据

const GetSummary = async (SchoolID,dispatch) => {

    let res = await Method.getGetData(`/UserMgr/ClassMgr/GetSummary?SchoolID=${SchoolID}`,2,CONFIG.AdmClassProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常",ok:()=>{ return ()=>window.location.href='error.aspx' }}));

    }

};


//获取班级列表

const getClassList = async ({SchoolID,PageIndex,PageSize,dispatch,Keyword,GradeID}) => {


    let res = await Method.getGetData(`/UserMgr/ClassMgr/GetGradeSummary?SchoolID=${SchoolID}&PageIndex=${PageIndex}&PageSize=${PageSize}${Keyword?`&Keyword=${Keyword}`:''}${GradeID?`&GradeID=${GradeID}`:''}`,2,CONFIG.AdmClassProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));


    }


};



//获取某个班级教师接口

const getTeachers = async ({ClassID,dispatch}) => {

    let res = await Method.getGetData(`/UserMgr/ClassMgr/GetClassTeacher?ClassID=${ClassID}`,2,CONFIG.AdmClassProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }


};



//获取学生接口包含搜索

const getStudents = async ({ClassID,dispatch,Keyword,PageIndex,PageSize}) => {

    let res = await Method.getGetData(`/UserMgr/UserInfoMgr/GetStudentToPage?ClassID=${ClassID}&PageIndex=${PageIndex}&PageSize=${PageSize}${Keyword?`&Keyword=${Keyword}`:''}`,2,CONFIG.AdmClassProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }


};

//获取行政班开课学科

const getSubjects = async ({ClassID,dispatch}) => {

    let res = await Method.getGetData(`/UserMgr/ClassMgr/GetSubject?ClassID=${ClassID}`,2,CONFIG.AdmClassProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }
};


//获取班主任的学科

const getGangerSubjects = async ({SchoolID,dispatch}) => {

    let res = await Method.getGetData(`/UserMgr/UserInfoMgr/GetSubject?SchoolID=${SchoolID}`,2,CONFIG.AdmClassProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }
};



//获取所有的任课教师(用于设置班主任)

const getAllTeacher = async ({SchoolID,SubjectIDs='',Keyword,PageIndex=0,PageSize=0,UserID,dispatch}) => {

    let res = await Method.getGetData(`/UserMgr/ClassMgr/GetTeacherToPage?SchoolID=${SchoolID}&PageIndex=${PageIndex}&PageSize=${PageSize}&SubjectIDs=${SubjectIDs}${Keyword?`&Keyword=${Keyword}`:''}${UserID?`&UserID=${UserID}`:''}`,2);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }


};

//设置班主任

const setGengar =  async ({ClassID,UserID='',dispatch}) => {

    let res = await Method.getPostData(`/UserMgr/ClassMgr/SetGanger`,{

        ClassID,UserID

    },2,CONFIG.AdmClassProxy);

    if (res.StatusCode === 200){

        return res.Msg;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }


};


//设置教师

const setTeacher =  async ({ClassID,SubjectID,UserID='',dispatch}) => {

    let res = await Method.getPostData(`/UserMgr/ClassMgr/SetCourseClassTeacher`,{

        ClassID,UserID,SubjectID

    },2,CONFIG.AdmClassProxy);

    if (res.StatusCode === 200){

        return res.Msg;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }


};

//调班接口
const adjustClass =  async ({ClassID,UserIDs,dispatch}) => {

    let res = await Method.getPostData(`/UserMgr/ClassMgr/ReSetStudentClass`,{

        ClassID,UserIDs

    },2,CONFIG.AdmClassProxy);



    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }


};


//添加班级接口

const addClassPost =  async ({GradeID,ClassName,dispatch}) => {

    let res = await Method.getPostData(`/UserMgr/ClassMgr/AddClass`,{

        GradeID,ClassName

    },2,CONFIG.AdmClassProxy);



    if (res.StatusCode === 200){

        return res.ErrCode;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }


};

//编辑班级接口

const editClassPost =  async ({ClassID,ClassName,dispatch}) => {

    let res = await Method.getPostData(`/UserMgr/ClassMgr/EditClass`,{

        ClassID,ClassName

    },2,CONFIG.AdmClassProxy);



    if (res.StatusCode === 200){

        return res.Msg;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }


};

//删除班级
const delClassPost = async ({GradeID,ClassIDs,dispatch}) => {

    let res = await Method.getPostData(`/UserMgr/ClassMgr/DeleteClass`,{

        GradeID,ClassIDs

    },2,CONFIG.AdmClassProxy);



    if (res.StatusCode === 200){

        return res.Msg;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }


};

//设置取消班长

const SetMonitor = async ({UserID,ClassID,dispatch}) => {

    let res = await Method.getPostData(`/UserMgr/ClassMgr/SetMonitor`,{

        UserID,ClassID

    },2,CONFIG.AdmClassProxy);



    if (res.StatusCode === 200){

        return res.Msg;

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:"未知异常"}));

    }


};




export default {
    getPageInit,
    getAllGradePreview,
    getTheGradePreview,
    getTheClassPreview,
    changeStudentCheckList,
    addClass,
    getAddTeacherData,
    teacherModalSelectChange,

    teacherSearchBtnClick,

    teacherSearchClose,
    updateGenger,
    updateTeacher,

    getClassList,

    getStudents,

    delGanger,

    delSubjectTeacher,

    adjustClass,

    delClassPost,

    UpGradeClassTree,

    UpdateClassName,

    SetMonitorAction,

    GET_LOGIN_USER_INFO,
    GET_ALL_GRADE_PREVIEW,
    GET_SHCOOL_GRADE_CLASSES,
    GET_THE_GRADE_PREVIEW,

    THE_GRADE_CLASS_LOADING_SHOW,

    THE_GRADE_CLASS_LOADING_HIDE,

    THE_GRADE_CLASS_STATICS_SHOW,

    THE_GRADE_CLASS_STATICS_HIDE,

    THE_GRADE_CLASS_SEARCHKEY_CHANGE,

    THE_GRADE_CLASS_LIST_UPDATE,

    ALL_GRADE_CLASS_SEARCHKEY_CHANGE,

    ALL_GRADE_CLASS_LOADING_HIDE,

    ALL_GRADE_CLASS_LOADING_SHOW,

    ALL_GRADE_CLASS_CONTENT_SHOW,

    ALL_GRADE_CLASS_CONTENT_HIDE,

    ALL_GRADE_CLASS_LIST_UPDATE,

    STUDENT_SEARCHKEY_CHANGE,

    STUDENT_WRAPPER_LOADING_SHOW,

    STUDENT_WRAPPER_LOADING_HIDE,

    GET_THE_CLASS_THEACHERS,
    GET_THE_CLASS_STUDENTS,
    STUDENTS_CHECK_LIST_CHANGE,
    STUDENTS_CHECKED_ALL,
    STUDENTS_CHECKED_NONE,
    INIT_STUDEUNT_PLAIN_OPTIONS,
    ADD_TEACHER_UPDATA_SUBJECTS,
    ADD_TEACHER_UPDATA_TEACHERLIST,
    ADD_TEACHER_CLOSE_HIDE,
    ADD_TEACHER_CLOSE_SHOW,
    ADD_TEACHER_UPDATE_NEW_TEACHER,
    ADD_TEACHER_UPDATE_ORIGIN_TEACHER,
    ADD_TEACHER_ORIGIN_TEACHER_SHOW,
    ADD_TEACHER_ORIGIN_TEACHER_HIDE,
    ADD_TEACHER_NEW_TEACHER_TITLE,

    THE_GRADE_CLASS_SEARCH_CANCEL_BTN_SHOW,

    THE_GRADE_CLASS_SEARCH_CANCEL_BTN_HIDE,

    ALL_GRADE_CLASS_SEARCH_CANCEL_BTN_SHOW,

    ALL_GRADE_CLASS_SEARCH_CANCEL_BTN_HIDE

}