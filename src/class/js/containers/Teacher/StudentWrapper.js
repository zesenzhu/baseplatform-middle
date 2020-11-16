import React,{Component} from 'react';

import {connect} from 'react-redux';

import TitleBar from '../../component/TitleBar';

import {
    Empty,
    Modal,
    CheckBox,
    Button,
    PagiNation,
    Loading,
    Search,
    DetailsModal
} from "../../../../common";

import SelfCheckBox from '../../component/CheckBox';

import CCActions from '../../actions/Teacher/ClassChargeActions'

import StudentInfo from './StudentInfoModal';

import SIMActions from '../../actions/Teacher/StudentInfoModalActions';

import DMActions from "../../actions/DetailModalActions";



class StudentWrapper extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

    }

    //设置取消班长
    MonitorClick(Params){

        const { dispatch } = this.props;

        dispatch(CCActions.SetMonitor(Params))

    }

    //搜索的值发生变化

    StuSearchInputChange(e){

        const { dispatch } = this.props;

        dispatch({type:CCActions.TEACHER_CLASS_CHARGE_STUDENT_SEARCH_VALUE_CHANGE,data:e.target.value});

    }

    //学生点击搜索

    StuSearchClick(e){

        const { dispatch } = this.props;

        dispatch(CCActions.StuSearchClick());

    }

    //学生取消搜索

    StuCancelSearch(){

        const { dispatch } = this.props;

        dispatch(CCActions.StuCancelSearch());

    }

    //学生页码发生变化

    StudentPageChange(e){

        const { dispatch } = this.props;

        dispatch(CCActions.StudentPageChange(e));

    }

    //点击某一个学生

    StuCheckedChange({IsChecked,value}){

        const { dispatch,ClassCharge } = this.props;

        let { StudentCheckList } = ClassCharge;

        if (IsChecked){

            let index = StudentCheckList.findIndex(item=>item===value);

            StudentCheckList.splice(index,1);

        }else{

            StudentCheckList.push(value);

        }

        dispatch(CCActions.StuCheckedChange(StudentCheckList));

    }

    //学生全选或者取消全选

    StudentCheckAll(CheckAll){

        const { dispatch } = this.props;

        dispatch(CCActions.StudentCheckAll(CheckAll));

    }

    //删除学生

    DelStudent(){

        const { dispatch,ClassCharge } = this.props;

        dispatch(CCActions.DelStudent());

    }

    //关闭添加或者编辑学生弹窗

    StudentModalHide(e){

        const { dispatch } = this.props;

        dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_ERROR_TIPS_HIDE,data:{type:""}});

        dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_HIDE});

    }

    //点击确定

    StudentModalOk(e){

        const { dispatch } = this.props;

        dispatch(SIMActions.StudentModalOk());

    }

    //点击弹出编辑学生详情弹窗

    EditorModalShow(UserID){

        const { dispatch } = this.props;

        dispatch({type:SIMActions.TEACHER_STUDENT_INFO_EDITOR_STUDENT_ID_CHANGE,data:UserID});

        dispatch({type:SIMActions.TEACHER_STUDENT_INFO_MODAL_SHOW});

    }

    //用户详情弹窗出现

    DetailModalShow(Params){

        const { dispatch,DataState:{
            LoginUser:{
              identify
            }
          }  } = this.props;
        let token = sessionStorage.getItem("token");
        window.open(
          "/html/userPersona/index.html?userType=" +
            Params.UserType +
            "&userID=" +
            Params.UserID +
            "&lg_tk=" +
            token+
            (identify && identify instanceof Array && identify.length > 0
              ? "&lg_ic=" + identify[0].IdentityCode
              : "")
        );
        // dispatch(DMActions.Init(Params))

    }

    //弹窗消失

    DetailModalHide(e){

        const { dispatch } = this.props;

        dispatch(DMActions.Hide())

    }


    render(){

        const { ClassCharge,StudentInfoModal,DetailModal } = this.props;



        const {

            StudentCheckList,StudentAllCheck,StudentPower,TeacherPower,

            StudentSearchValue,StuCancelSearchBtn,StudentLoading,

            StudentPage,StudentSearchOpen,StudentSearchResultKey

        } = ClassCharge;

        const { Total,List } = ClassCharge.Student;

        return <div className="teacher-stu-list-wrapper">

            <TitleBar type="icon3" title="班级学生" abstract={StudentSearchOpen?false:`(共${Total}人)`}></TitleBar>

            {

                StudentSearchOpen?

                    <div className="stu-search-result-tips teacher">

                        搜索关键词"{StudentSearchResultKey}"，共找到<span style={{color:"#ff6600"}}>{Total}</span>人

                    </div>

                    :''

            }

            <Search onCancelSearch={this.StuCancelSearch.bind(this)} placeHolder="请输入学号或姓名进行搜索..." Value={StudentSearchValue} CancelBtnShow={StuCancelSearchBtn} onChange={this.StuSearchInputChange.bind(this)} width={240} onClickSearch={this.StuSearchClick.bind(this)}></Search>

            <Loading spinning={StudentLoading} opacity={false}>

                <div className="person-tab-wrapper clearfix">

                {

                    List.length>0?

                        <React.Fragment>

                           {/* <CheckBoxGroup className="clearfix" value={StudentCheckList} onChange={this.StuCheckedChange.bind(this)}>

                                {
                                    List.map((item,key) => {
                                        //是否是班长
                                        let isMonitor = item.UserClass===1?true:false;
                                        //性别男女或者保密
                                        let sex= 'none';

                                        switch (item.Gender) {
                                            case '男':
                                                sex = 'men';
                                                break;
                                            case '女':
                                                sex = 'women';
                                                break;
                                            default:
                                                sex = 'none'
                                        }

                                        return <div key={key} className={`person-item-wrapper ${isMonitor?'monitor':''}`} >

                                            <div className="person-item-content clearfix">

                                                <div className="person-item-photo" onClick={this.DetailModalShow.bind(this,{UserID:item.UserID,UserType:2})} style={{backgroundImage:`url(${item.PhotoPath})`}}></div>

                                                <div className="person-item-info-wrapper">

                                                    <div className="person-item-info">

                                                        <div className="person-item-name" onClick={this.DetailModalShow.bind(this,{UserID:item.UserID,UserType:2})} title={item.UserName}>{item.UserName}</div>

                                                        <div className={`person-sex-icon ${sex}`}></div>

                                                    </div>

                                                    <div className="person-item-id" title={item.UserID}>{item.UserID}</div>

                                                </div>

                                                {

                                                    StudentPower?

                                                        <CheckBox type="circle" value={item.UserID}></CheckBox>

                                                        :''

                                                }

                                                <div className="cooperate">

                                                    <div className="set-monitor" onClick={()=>{this.MonitorClick({UserID:item.UserID,isMonitor})}}>{isMonitor?'取消班长':'设为班长'}</div>

                                                    {

                                                        StudentPower?

                                                            <React.Fragment>

                                                                <div className="line"></div>

                                                                <div className="editor-stu" onClick={this.EditorModalShow.bind(this,item.UserID)}>编辑</div>

                                                            </React.Fragment>

                                                            :''

                                                    }


                                                </div>

                                            </div>

                                            <div className="person-item-border"></div>

                                        </div>

                                    })
                                }

                            </CheckBoxGroup>*/}

                             <div className="clearfix"  >

                                {
                                    List.map((item,key) => {
                                        //是否是班长
                                        let isMonitor = item.UserClass===1?true:false;
                                        //性别男女或者保密
                                        let sex= 'none';

                                        switch (item.Gender) {
                                            case '男':
                                                sex = 'men';
                                                break;
                                            case '女':
                                                sex = 'women';
                                                break;
                                            default:
                                                sex = 'none'
                                        }

                                        return <div key={key} className={`person-item-wrapper ${isMonitor?'monitor':''}`} >

                                            <div className="person-item-content clearfix">

                                                <div className="person-item-photo" onClick={this.DetailModalShow.bind(this,{UserID:item.UserID,UserType:2})} style={{backgroundImage:`url(${item.PhotoPath})`}}></div>

                                                <div className="person-item-info-wrapper">

                                                    <div className="person-item-info">

                                                        <div className="person-item-name" onClick={this.DetailModalShow.bind(this,{UserID:item.UserID,UserType:2})} title={item.UserName}>{item.UserName}</div>

                                                        <div className={`person-sex-icon ${sex}`}></div>

                                                    </div>

                                                    <div className="person-item-id" title={item.UserID}>{item.UserID}</div>

                                                </div>

                                                {

                                                    StudentPower?

                                                        <SelfCheckBox  value={item.UserID} IsChecked={StudentCheckList.includes(item.UserID)?true:false} onClick={this.StuCheckedChange.bind(this)}></SelfCheckBox>

                                                    :''

                                                }

                                                <div className="cooperate">

                                                    <div className="set-monitor" onClick={()=>{this.MonitorClick({UserID:item.UserID,isMonitor})}}>{isMonitor?'撤销班长':'设为班长'}</div>

                                                    {

                                                        StudentPower?

                                                            <React.Fragment>

                                                                <div className="line"></div>

                                                                <div className="editor-stu" onClick={this.EditorModalShow.bind(this,item.UserID)}>编辑</div>

                                                            </React.Fragment>

                                                            :''

                                                    }


                                                </div>

                                            </div>

                                            <div className="person-item-border"></div>

                                        </div>

                                    })
                                }

                            </div>

                            {

                                StudentPower?

                                    <div className="person-checkgroup-wrapper">

                                        <CheckBox checked={StudentAllCheck} onChange={this.StudentCheckAll.bind(this,StudentAllCheck)}>全选</CheckBox>

                                        <Button size="small" className="person-adjust-btn" color="red" onClick={this.DelStudent.bind(this)}>删除</Button>

                                    </div>

                                    :''

                            }


                            <PagiNation  className={`size24 ${StudentPower?'right':'center'}`} pageSize={20} onChange={e=>this.StudentPageChange(e)} total={Total} current={StudentPage}></PagiNation>

                        </React.Fragment>

                        :

                        <Empty type="5" title={StudentSearchOpen?'暂无符合条件的学生数据':"暂无学生数据"}></Empty>


                }

            </div>

            </Loading>

            <Modal type={1} title={StudentInfoModal.Title}

                   visible={StudentInfoModal.Show}

                   mask={true} width={810}

                   bodyStyle={{height:420}}

                   className="student-modal"

                   cancelText = "取消"

                   onCancel={this.StudentModalHide.bind(this)}

                   onOk = {this.StudentModalOk.bind(this)}
            >

                <Loading spinning={StudentInfoModal.Loading}>

                    {

                        StudentInfoModal.Show?

                            <StudentInfo></StudentInfo>

                            :''

                    }

                </Loading>


            </Modal>

            <DetailsModal

                visible={DetailModal.Show}

                module={1}

                data={DetailModal[DetailModal.ActiveInfo]}

                type={DetailModal.ActiveInfo}

                onCancel={this.DetailModalHide.bind(this)}

            >


            </DetailsModal>

        </div>

    }

}

const mapStateToProps = (state)=>{

    const{ ClassCharge,StudentInfoModal, } = state.Teacher;

    const { DetailModal,DataState } = state;

    return {

        ClassCharge,

        StudentInfoModal,

        DetailModal,DataState

    }

};

export default connect(mapStateToProps)(StudentWrapper);