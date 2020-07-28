import React,{Component} from 'react';
import TitleBar from '../component/TitleBar';
import {Search, Button, Loading, Modal, DetailsModal} from "../../../common";
import connect from "react-redux/es/connect/connect";
import UpDataState from '../actions/UpDataState';
import UpUIState from '../actions/UpUIState';
import AppAlertActions from '../actions/AppAlertActions';
import SearchActions from '../actions/SearchActions';
import ContentWrapper from '../component/ContentWrapper';
import TeacherTabWrapper from '../component/TeacherTabWrapper'
import StudentTabWrapper from '../component/StudentTabWrapper';
import AdjustClassModal from '../component/AdjustClassModal';
import AddTeacherModal from '../component/AddTeacherModal';
import PaginationActions from "../actions/PaginationActions";
import DMActions from "../actions/DetailModalActions";
import ApiActions from "../actions/ApiActions";
import AASActions from "../actions/AppAlertSuccess";




class StudentContent extends Component{

    constructor(props) {

        super(props);

        this.state={

            info:props.info,

            TeacherModal:{

                SubjectTipsShow:false

            }

        };

        const {dispatch,DataState} = this.props;

        const {SchoolGradeClasses} = DataState;


        dispatch(UpDataState.getTheClassPreview(props.info.id));//获取数据

    }

    onCheckChange({IsChecked,value}){

        const {dispatch,DataState} = this.props;

        const { StudentsCheckList } = DataState;

        if (IsChecked){

            let index = StudentsCheckList.findIndex(item=>item===value);

            StudentsCheckList.splice(index,1);

        }else{

            StudentsCheckList.push(value);

        }

        console.log(StudentsCheckList);

        dispatch(UpDataState.changeStudentCheckList(StudentsCheckList));

    }

    onChangeAll(){

        const {DataState,dispatch} = this.props;

        const {StudentsCheckAll,StudentsPlainOptions} = DataState;
        //判断是点击的取消全选还是进行全选
        if (StudentsCheckAll.checkAll){

            dispatch({type:UpDataState.STUDENTS_CHECKED_NONE});

            dispatch({type:UpDataState.STUDENTS_CHECK_LIST_CHANGE,list:[]});

        } else{

            dispatch({type:UpDataState.STUDENTS_CHECKED_ALL});

            dispatch({type:UpDataState.STUDENTS_CHECK_LIST_CHANGE,list:StudentsPlainOptions.list});

        }

    }
    //点击调班按钮
    adjustBtnClick(e){

        const {dispatch,DataState} = this.props;

        const {StudentsCheckList} = DataState;

        //判断是否有选中的项
        if (StudentsCheckList.length===0){

            dispatch(AppAlertActions.alertWarn({title:"请先勾选学生"}));

        }else{
            //弹出弹窗
            dispatch({type:UpUIState.ADJUST_CLASS_MODAL_SHOW});
        }

    }

    hide(e){

        const {dispatch} = this.props;

        dispatch({type:UpUIState.CLOSE_ERROR_ALERT});

    }


    //调班模态框点击OK事件
    adjustClassOk(e){

        const {dispatch,DataState,info} = this.props;

        const {StudentsCheckList} = DataState;

        const {AdjustClassModal} = this.props.UIState;

        if (AdjustClassModal.gradeChecked.value==="none"){

            dispatch({type:UpUIState.ADJUST_CLASS_ERROR_SHOW});

        }else if (AdjustClassModal.classChecked.value==="none"){

            dispatch({type:UpUIState.ADJUST_CLASS_ERROR_SHOW});

        }else{

            const stuIDList = StudentsCheckList.map((item) => { return JSON.parse(item).id});

            const AdjustClassID = AdjustClassModal.classChecked.value;

            const UserIDs =  stuIDList.join(',');

            const ThisClassID = info.id;

            dispatch(AppAlertActions.alertQuery({title:"确定进行调班吗？",ok:e=>this.adjustClassSure.bind(this,{AdjustClassID,UserIDs,ThisClassID})}));

        }

    }
    //调班模态框点击Cancel事件
    adjustClassCancel(e){

        const {dispatch} = this.props;

        dispatch({type:UpUIState.ADJUST_CLASS_MODAL_HIDE});

    }

    adjustClassSure({AdjustClassID,UserIDs,ThisClassID}){

        const { dispatch,DataState } = this.props;

        const { TheStudentList } = DataState;

        const { SearchResultTipsShow,SearchKey } = TheStudentList;

        let Keyword = '';

        if (SearchResultTipsShow){

            Keyword = SearchKey;

        }

        UpDataState.adjustClass({ClassID:AdjustClassID,UserIDs,dispatch}).then(data=>{

            if (data ===0){

                dispatch({type:UpDataState.STUDENT_WRAPPER_LOADING_SHOW});

                dispatch({type:UpUIState.ADJUST_CLASS_MODAL_HIDE});

                dispatch({type:AppAlertActions.CLOSE_ERROR_ALERT});

                dispatch(AASActions.AlertSuccess({title:"调班成功！"}));

                dispatch({type:UpDataState.STUDENTS_CHECK_LIST_CHANGE,list:[]});

                dispatch({type:UpDataState.STUDENTS_CHECKED_NONE});

                UpDataState.getStudents({ClassID:ThisClassID,Keyword,PageIndex:0,PageSize:12,dispatch}).then(data=>{

                    if (data){

                        const PlainList = data.List.map(item =>{return JSON.stringify({id:item.UserID,name:item.UserName})})

                        dispatch({type:UpDataState.GET_THE_CLASS_STUDENTS,data:data});

                        dispatch({type:UpDataState.INIT_STUDEUNT_PLAIN_OPTIONS,data:PlainList});

                        dispatch({type:PaginationActions.STUDENT_PAGINATION_CURRENT_UPDATE,data:1});

                        dispatch({type:PaginationActions.STUDENT_PAGINATION_TOTAL_UPDATE,data:data.Total});

                    }

                    dispatch({type:UpDataState.STUDENT_WRAPPER_LOADING_HIDE});

                })

            }

        })


    }

    //调班模态框年级选择改变

    gradeSelectChange(e){

        const {dispatch,DataState,info} = this.props;

        const {Grades} = DataState.SchoolGradeClasses;

        const {value} = e;

        //如果选择的是请选择年级的话

        // dispatch({type:UpUIState.ADJUST_CLASS_ERROR_HIDE});

        //获取所选的值所在的年级
        let gradeSelect = Grades.find((item)=>{return item.GradeID === value});
        //根据URL得到本班级的classID
        let ClassID = info.id;
        //获取除去本年级的班级数组
        let classList =  gradeSelect.Classes.filter((item) => {return item.ClassID !== ClassID});

        dispatch({type:UpUIState.ADJUST_CLASS_GRADE_CHANGE,checked:e});

        dispatch({type:UpUIState.ADJUST_CLASS_CLASS_CHANGE,checked:{value:"none",title:"请选择班级"}});

        dispatch({type:UpUIState.ADJUST_CLASS_CLASS_LIST_UPDATE,list:classList});

        dispatch({type:UpUIState.ADJUST_CLASS_CLASSLIST_ABLED});

    }


    //调班模态框班级选择改变
    classSelectChange(e) {

        const {dispatch} = this.props;

        dispatch({type:UpUIState.ADJUST_CLASS_ERROR_HIDE});

        dispatch({type:UpUIState.ADJUST_CLASS_CLASS_CHANGE,checked:e});

    }

    //关闭教师弹窗
    teacherModalHide(e){

        const {dispatch} = this.props;

        dispatch({type:UpUIState.ADD_TEACHER_MODAL_HIDE});

        this.setState({TeacherModal:{...this.state.TeacherModal,SubjectTipsShow:false}});

    }

    //弹出添加教师的弹窗
    addTeacherModalShow(opt){

        const {dispatch,info} = this.props;


        switch (opt.type) {

            case 1:

                ApiActions.GetSubject({ClassID:info.id,dispatch}).then(data=>{

                   if (data){

                       const { Total,List } = data;

                       if (Total>0){

                           if (List.length===0){

                               dispatch(AppAlertActions.alertWarn({title:`本班${Total}门学科均已设置任课教师，无需添加`}));

                           }else{

                               dispatch({type:UpUIState.ADD_TEACHER_MODAL_SHOW});

                               dispatch(UpDataState.getAddTeacherData({ClassID:info.id,...opt}));

                           }

                       }else{

                           dispatch(AppAlertActions.alertWarn({title:'本班未开设学科，无法添加任课教师。'}));

                       }

                   }

                });

                break;

            case 2:

                dispatch({type:UpUIState.ADD_TEACHER_MODAL_SHOW,options:{

                        originTeacherShow:true,

                        originTeacherInfo:opt.originTeacherInfo,

                        originTeacherTitle:"原任课教师",

                        newTeacherTitle:"新任课教师",

                        modalTitle:"更改任课教师",

                        type:2,

                        SubjectID:opt.originTeacherInfo.SubjectID

                    }});

                dispatch(UpDataState.getAddTeacherData({ClassID:info.id,...opt}));


                break;

            case 3:

                dispatch({type:UpUIState.ADD_TEACHER_MODAL_SHOW,options:{

                        originTeacherShow:false,

                        modalTitle:"设置班主任",

                        newTeacherTitle:"班主任",

                        type:3

                    }});

                dispatch(UpDataState.getAddTeacherData({ClassID:info.id,...opt}));


                break;

            case 4:

                dispatch({type:UpUIState.ADD_TEACHER_MODAL_SHOW,options:{

                        originTeacherShow:true,

                        originTeacherInfo:opt.originTeacherInfo,

                        originTeacherTitle:"原班主任",

                        newTeacherTitle:"新班主任",

                        modalTitle:"更改班主任",

                        type:4

                    }});

                dispatch(UpDataState.getAddTeacherData({ClassID:info.id,...opt}));

                break;

            default:

                dispatch({type:UpUIState.ADD_TEACHER_MODAL_SHOW});

        }

        //初始化所有的教师和学科的数据

    }

    //点击选中某一个教师的事件
    itemLick(info) {

        const {dispatch} = this.props;

        dispatch({type:UpDataState.ADD_TEACHER_UPDATE_NEW_TEACHER,data:info});

    }

    //选择下拉后的事件
    teacherModalDropChange(e){

        const {dispatch} = this.props;

        dispatch({type:UpUIState.ADD_TEACHER_SUBJECTS_SELECT_CHANGE,data:e});

        dispatch(UpDataState.teacherModalSelectChange(e))

        this.setState({TeacherModal:{...this.state.TeacherModal,SubjectTipsShow:false}});

    }

    //教师弹窗输入框值变化
    teacherModalInputContentChange(e){

        const {dispatch} = this.props;

        dispatch({type:UpUIState.ADD_TEACHER_INPUT_CHANGE,data:e.target.value});

    }

    //教师弹窗点击搜索按钮
    teacherSearchBtnClick(e){

        const {dispatch,UIState} = this.props;

        const {inputContent} = UIState.AddTeacherModal;

        if (inputContent!==''){//输入的列表中不等于空

            dispatch(UpDataState.teacherSearchBtnClick(this));

        }else{//如果等于空的时候弹框警告

           //dispatch(AppAlertActions.alertWarn({title:"请输入搜索的内容！"}));

        }

    }

    StuSearchKeyChange(e){

        const { dispatch } = this.props;

        dispatch({type:UpDataState.STUDENT_SEARCHKEY_CHANGE,data:e.target.value});

    }

    teacherSearchClose(e){

        const {dispatch,UIState} = this.props;

        dispatch({type:UpUIState.ADD_TEACHER_CLOSE_HIDE});

        dispatch({type:UpUIState.ADD_TEACHER_INPUT_CHANGE,data:''});

        dispatch(UpDataState.teacherSearchClose());

    }
    //点击OK的时候
    teacherModalOk(e){

        const {dispatch,UIState,info} =this.props;

        const {AddTeacherModal} = UIState;

        //先判断是否选中一个新的教师

        if (AddTeacherModal.subjectsSelect.value!=='none'){

            if (AddTeacherModal.newPickTeacher.id){

                if (AddTeacherModal.type===3||AddTeacherModal.type===4){ //是修改的班主任

                    dispatch(UpDataState.updateGenger({ClassID:info.id}));

                }else{//是修改的任课教师

                    dispatch(UpDataState.updateTeacher({ClassID:info.id}));

                }

            }else{

                dispatch(AppAlertActions.alertWarn({title:"请先选择一个教师！"}));

            }

        }else{

            // dispatch(AppAlertActions.alertWarn({title:"请先选择一个学科！"}));

            this.setState({TeacherModal:{...this.state.TeacherModal,SubjectTipsShow:true}});

        }

    }
    //学生搜索
    onStudentSearch(e){

        const key = e.value;

        const { info,dispatch } = this.props;

        if (key){

            dispatch(SearchActions.StudentSearch(info.id,key));

        }else{

            dispatch(AppAlertActions.alertWarn({title:"搜索不能为空！"}));

        }

    }

    //取消学生搜索

    StudentCancelSearch(){

        const { dispatch,info } = this.props;

        dispatch(SearchActions.StudentCancelSearch(info.id))

    }


    //学生页码发生变化

    StudentPageChange(e){

        console.log(e);

        const { dispatch,info } = this.props;

        dispatch(PaginationActions.StudentPageChange(e-1,info.id));

    }

    //删除班主任

    delGanger(){

        const { dispatch,info } = this.props;

        dispatch(AppAlertActions.alertQuery({title:"您确定要撤销该班主任么？",ok:()=>{

                return this.delGangerActions.bind(this,info)

            }}));

    }

    delGangerActions(info){

        const { dispatch } = this.props;

        dispatch(UpDataState.delGanger({ClassID:info.id}));

    }


    //删除教师

    delSubjectTeacher({SubjectID}){

        const { dispatch,info } = this.props;

        dispatch({type:UpUIState.SHOW_ERROR_ALERT,data:{

                type:"btn-query",

                title:"您确定要删除该学科任课教师么？",

                ok:()=>{  return dispatch(UpDataState.delSubjectTeacher({ClassID:info.id,SubjectID}));},

                cancel:()=>dispatch({type:UpUIState.CLOSE_ERROR_ALERT}),

                close:()=>dispatch({type:UpUIState.CLOSE_ERROR_ALERT})

            }});

    }


    MonitorClick({UserID,isMonitor}){

        const { info,dispatch } = this.props;

        if (isMonitor){

            UserID = '';

        }

        dispatch(UpDataState.SetMonitorAction({UserID,ClassID:info.id}));

    }

    //用户详情弹窗出现

    DetailModalShow(Params){

        const { dispatch } = this.props;

        dispatch(DMActions.Init(Params))

    }

    //弹窗消失

    DetailModalHide(e){

        const { dispatch } = this.props;

        dispatch(DMActions.Hide());

    }




    render() {

        const {UIState,DataState,info,DetailModal} = this.props;

        const {StudentLoading} = UIState;

        const {StudentPagination,TheTeachersList,TheStudentList,SchoolGradeClasses,StudentsCheckList,StudentsCheckAll} = DataState;

        return (

            <Loading tip="加载中..."  spinning={StudentLoading.show}  size="large">
                {/*第一个标题*/}
                <TitleBar type="icon2" title={`${info.preName} > ${info.name}`}></TitleBar>
               {/* 教师内容区域*/}
                <ContentWrapper>

                    <span className="number-wrapper">教师名单 <span className="num">({TheTeachersList.Total}人)</span></span>

                    <div className="btn-wrapper clearfix">

                        <Button size="small" color="blue" className="addTeacher" onClick={this.addTeacherModalShow.bind(this,{type:1})}>添加任课教师</Button>

                    </div>

                    <TeacherTabWrapper TeacherDetailShow={this.DetailModalShow.bind(this)} delSubjectTeacher={this.delSubjectTeacher.bind(this)} delGanger={this.delGanger.bind(this)} addTeacherModalShow={this.addTeacherModalShow.bind(this)} Teachers={TheTeachersList}></TeacherTabWrapper>

                </ContentWrapper>

                {/*学生内容区域*/}
                <ContentWrapper>

                    <span className="number-wrapper stu">学生名单

                        {

                            TheStudentList.TotalShow?

                                <span className="num">({TheStudentList.Total}人)</span>

                                :''

                        }

                    </span>

                    <div className="search-wrapper clearfix">

                        <Search className="admclass-search-student"

                                width={280}

                                placeHolder="请输入学号或姓名进行搜索..."

                                onCancelSearch={this.StudentCancelSearch.bind(this)}

                                onClickSearch={this.onStudentSearch.bind(this)}

                                CancelBtnShow={TheStudentList.SearchBtnShow}

                                Value={TheStudentList.SearchKey}

                                onChange={this.StuSearchKeyChange.bind(this)}


                        ></Search>

                        {

                            TheStudentList.SearchResultTipsShow?

                                <div className="stu-search-result-tips">

                                    搜索关键词"{TheStudentList.SearchKeyResult}"，共找到<span style={{color:"#ff6600"}}>{TheStudentList.Total}</span>人

                                </div>

                                :''

                        }

                    </div>

                    <StudentTabWrapper

                        CheckList={StudentsCheckList}

                        onChangeAll={this.onChangeAll.bind(this)}

                        allChecked={StudentsCheckAll.checkAll}

                        onCheckChange={this.onCheckChange.bind(this)}

                        StudentList={TheStudentList}

                        adjustBtnClick ={this.adjustBtnClick.bind(this)}

                        StudentWrapperLoading = { TheStudentList.WrapperLoading }

                        StudentPagination={StudentPagination}

                        StudentPageChange={this.StudentPageChange.bind(this)}

                        MonitorClick={this.MonitorClick.bind(this)}

                        StudentDetailShow={this.DetailModalShow.bind(this)}

                        SearchResultShow={TheStudentList.SearchResultTipsShow}

                    >

                    </StudentTabWrapper>

                </ContentWrapper>

                {/*调班弹出窗*/}

                <Modal type={1} title="调班"

                       visible={UIState.AdjustClassModal.show}

                       mask={true}


                       width={540}

                       bodyStyle={{height:236}}

                       className="adjustClassModal"

                       onOk={this.adjustClassOk.bind(this)}

                       onCancel={this.adjustClassCancel.bind(this)}>

                    {/*弹出层内容区域*/}

                    <div className="ModalContent">

                        <AdjustClassModal

                            schoolClassList={SchoolGradeClasses.Grades}

                            gradeSelecd={UIState.AdjustClassModal.gradeDropSelectd}

                            classSelectd ={UIState.AdjustClassModal.classDropSelectd}

                            checkList={StudentsCheckList}

                            classDisabled={UIState.AdjustClassModal.classDisabled}

                            classSelectChange={this.classSelectChange.bind(this)}

                            gradeSelectChange={this.gradeSelectChange.bind(this)}

                            classList={UIState.AdjustClassModal.classList}

                            errTipsShow={UIState.AdjustClassModal.errTipsShow}

                            errTips={UIState.AdjustClassModal.errTips}>

                        </AdjustClassModal>

                    </div>

                </Modal>

               {/* 教师的弹窗（添加任课教师1、更改任课教师2、添加班主任3、更改班主任4）*/}

               <Modal type={1} title={UIState.AddTeacherModal.modalTitle}

                      visible={UIState.AddTeacherModal.show}

                      mask={true} width={1000}

                      bodyStyle={{height:536}}


                      className="addTeacherModal"

                      onCancel={this.teacherModalHide.bind(this)}

                      cancelText = "取消"

                      onOk = {this.teacherModalOk.bind(this)}>

                   <AddTeacherModal

                            loadingShow={UIState.AddTeacherModal.loadingShow}

                            subjects={UIState.AddTeacherModal.subjects}

                            teacherList = {UIState.AddTeacherModal.teacherList}

                            subjectsSelect = {UIState.AddTeacherModal.subjectsSelect}

                            itemClick={this.itemLick.bind(this)}

                            closeShow={UIState.AddTeacherModal.closeShow}

                            newPickTeacher = {{
                                id:UIState.AddTeacherModal.newPickTeacher.id,
                                name:UIState.AddTeacherModal.newPickTeacher.name,
                                photo:UIState.AddTeacherModal.newPickTeacher.photo
                            }}

                            originTeacherShow = {UIState.AddTeacherModal.originTeacherShow}

                            originTeacherInfo = {UIState.AddTeacherModal.originTeacherInfo}

                            newTeacherTitle = {UIState.AddTeacherModal.newTeacherTitle}

                            originTeacherTitle={UIState.AddTeacherModal.originTeacherTitle}

                            teacherModalDropChange = {this.teacherModalDropChange.bind(this)}

                            teacherLoadingShow = {UIState.AddTeacherModal.teacherLoadingShow}

                            inputContent = {UIState.AddTeacherModal.inputContent}

                            inputContentChange = {this.teacherModalInputContentChange.bind(this)}

                            searchBtnClick = {this.teacherSearchBtnClick.bind(this)}

                            emptyShow = {UIState.AddTeacherModal.emptyShow}

                            searchClose = {this.teacherSearchClose.bind(this)}

                            subjectDropDisabled={UIState.AddTeacherModal.subjectDropDisabled}

                            TabShow={(UIState.AddTeacherModal.type===3||UIState.AddTeacherModal.type===4)?true:false}

                            TheClassTeacherList={TheTeachersList.List}

                            Ganger={TheTeachersList.Ganger}

                            subjectTipsShow={this.state.TeacherModal.SubjectTipsShow}

                            >

                   </AddTeacherModal>

               </Modal>

                <DetailsModal

                    visible={DetailModal.Show}

                    module={1}

                    data={DetailModal[DetailModal.ActiveInfo]}

                    type={DetailModal.ActiveInfo}

                    onCancel={this.DetailModalHide.bind(this)}

                >


                </DetailsModal>


            </Loading>

        );
    }
}

const  mapStateToProps = (state) => {

    let {UIState,DataState,DetailModal} = state;

    return {

        UIState,

        DataState,

        DetailModal

    }
};
export default connect(mapStateToProps)(StudentContent);