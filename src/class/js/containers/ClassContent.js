import React,{Component} from 'react';
import TitleBar from '../component/TitleBar';
import {PagiNation, Search,Modal,Loading,Tips} from "../../../common";

import ContentWrapper from '../component/ContentWrapper';
import Statistics from '../component/Statistics'
import PartData from '../component/PartData';
import connect from "react-redux/es/connect/connect";
import UpDataState from '../actions/UpDataState';
import PaginationActions from '../actions/PaginationActions';
import AASActions from '../actions/AppAlertSuccess';
import AppAlertActions from "../actions/AppAlertActions";
import SearchActions from "../actions/SearchActions";
import UpUIState from "../actions/UpUIState";
import $ from "jquery";
import {Input} from "antd";




class ClassContent extends Component{
    constructor(props) {
        super(props);

        const {dispatch,info} = props;

        const {SchoolGradeClasses} = props.DataState;
        //初始化内容区域数据

        dispatch(UpDataState.getTheGradePreview(info.id));//获取数据

    }

    //页码变化

    pageChange(e){

        const { dispatch,info } = this.props;

        dispatch(PaginationActions.GradeClassPageChange(info.id,e-1));

    }




    //班级搜索

    GradeClassSearch(e){

        const key = e.value;

        const { dispatch,info } = this.props;

        if (key){

            dispatch(SearchActions.GradeClassSearch(info.id,key));

        }else {

            dispatch(AppAlertActions.alertWarn({title:"搜索不能为空!"}));

        }

    }


    //取消搜索

    GradeClassCancelSearch(){

        const { dispatch,info } = this.props;

        dispatch(SearchActions.GradeClassCloseSearch(info.id));

    }

    //点击班级

    ClassClick({id,name}){

        const { dispatch,info } = this.props;

        dispatch({type:UpUIState.CHANGE_CLASS_ACTIVE,info:{id,name,preName:info.name,preId:info.id}});

        /*$('.frame_leftmenu_mainitem').removeClass('active');

        $('.frame_leftmenu_mainitem').removeClass('selected');

        $(`.frame_leftmenu_onegrade_ul li`).each((index,that)=>{

            if ($(that).attr('data-id')===id){

                $(that).addClass('active');

                $(that).children('.frame_leftmenu_onegrade_name').addClass('active');

                $(that).closest('.frame_leftmenu_nextgrade_container').prev().addClass('selected');

            }

        })*/

    }

    //重命名班级名称

    ResetClassName({ClassID,Event,ClassName}){

        Event.stopPropagation();

        const { dispatch } = this.props;

        dispatch({type:UpUIState.RESET_CLASS_NAME_SHOW,data:{ClassID,ClassName}});

    }

    //重命名输入框变化

    ReNameInputChange(e){

        const { dispatch } = this.props;

        dispatch({type:UpUIState.RESET_CLASS_NAME_INPUT_CHANG,data:e.target.value});

        dispatch({type:UpUIState.RESET_CLASS_NAME_TIPS_HIDE});

    }


    //重命名点击确定
    ResetNameOk(){

        const { dispatch,DataState,UIState,info } = this.props;

        //判断是否输入合法和是否重命名

        let { InputText,ClassID,ClassName } = UIState.ResetNameModal;

        //如果名称未做变化
        if (ClassName === InputText){

            dispatch({type:UpUIState.RESET_CLASS_NAME_TIPS_SHOW,data:{title:"班级名称没有发生变化"}});

        }else{

            if (this.UserComm_CheckGroupName(InputText)){

                dispatch({type:UpUIState.RESET_CLASS_NAME_TIPS_HIDE});

                let GradeID = info.id;

                let { SchoolGradeClasses } = DataState;

                //获取班级所在的grade列表
                let TheGrade = SchoolGradeClasses.Grades.find(item=>item.GradeID===GradeID);

                //查看是否有重名的班级

                let IsNameRepeat = false;

                TheGrade.Classes.map(item=>{

                    if (item.ClassName === InputText){

                        IsNameRepeat = true;

                        return

                    }

                });


                if (IsNameRepeat){

                    dispatch({type:UpUIState.RESET_CLASS_NAME_TIPS_SHOW,data:{title:"同年级内已存在同名班级"}});

                }else{


                    //做异步操作

                    dispatch(UpDataState.UpdateClassName({GradeID:info.id,ClassID:ClassID,ClassName:InputText}));


                }

            }else{

                //检测不通过

                dispatch({type:UpUIState.RESET_CLASS_NAME_TIPS_SHOW,data:{title:"班级名称应由1-20位的汉字、字母、数字以及括号组成，建议以年级为前缀"}});

            }

        }

    }


    //重命名点击取消
    ResetNameCancel(){

        const { dispatch } = this.props;

        dispatch({type:UpUIState.RESET_CLASS_NAME_HIDE});

    }

    //删除班级

    delClass({ClassID,Event}){

        Event.stopPropagation();

        const { dispatch,info } = this.props;

        dispatch(AppAlertActions.alertQuery({title:"确定要删除该班级吗？",ok:()=>{ return this.delClassActions.bind(this,{GradeID:info.id,ClassID})}}));

    }

    delClassActions({ClassID,GradeID}){

        const { dispatch,DataState } = this.props;

        let { SchoolID } = DataState.LoginUser;

        const {SearchKey} = DataState.TheGradePreview;

        dispatch({type:UpUIState.CLOSE_ERROR_ALERT});

        UpDataState.delClassPost({ClassIDs:ClassID,GradeID:GradeID,dispatch}).then(data=>{

            if (data==='success'){

                dispatch(AASActions.AlertSuccess({title:"删除班级成功！"}));

                if (SearchKey){

                    dispatch(SearchActions.GradeClassSearch(GradeID,SearchKey));

                }else{

                    dispatch(UpDataState.getTheGradePreview(GradeID));

                }

                dispatch(UpDataState.UpGradeClassTree(SchoolID));

            }

        })

    }


    //班级名称检测函数

    UserComm_CheckGroupName(strInput) {

        return /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/.test(strInput);

    }



    render() {

        const {UIState,DataState,info} = this.props;

        const {ClassLoading} = UIState;

        const {TheGradePreview,ClassPagination} = DataState;

        const { show,InputText,ErrorTips,ErrorTipsShow } = UIState.ResetNameModal;


        return (
            <Loading tip="加载中..." spinning={ClassLoading.show}  size="large">

                <TitleBar type="icon2" title={info.name}></TitleBar>

                <ContentWrapper>

                    <div className="search-wrapper clearfix">

                        <Search width={360} className="admclass-search" CancelBtnShow={TheGradePreview.CancelBtnShow} onCancelSearch={this.GradeClassCancelSearch.bind(this)} onClickSearch={this.GradeClassSearch.bind(this)} placeHolder="请输入班级名称或教师工号或教师姓名进行搜索"></Search>

                    </div>

                    {

                        TheGradePreview.StaticsShow?

                            <Statistics classNum={TheGradePreview.Class} teacherNum={TheGradePreview.CourseTecher} studentNum={TheGradePreview.Student}></Statistics>

                            :''

                    }

                    <Loading spinning={TheGradePreview.ClassLoading}>

                        <PartData type="class"

                                  className={!TheGradePreview.StaticsShow?'school-grade-class':''}

                                  PartDataList={TheGradePreview.List}
                                  ClassClick={this.ClassClick.bind(this)}
                                  ResetClassName={this.ResetClassName.bind(this)}
                                  delClass={this.delClass.bind(this)}
                                  SearchResultShow={!TheGradePreview.StaticsShow}
                        >

                        </PartData>

                    </Loading>

                    <PagiNation pageSize={12} onChange={this.pageChange.bind(this)} current={ClassPagination.CurrentPage} total={ClassPagination.Total}></PagiNation>

                </ContentWrapper>


                <Modal type={1}
                       title="班级重命名"
                       mask={true}
                       visible={show}

                       width={540}
                       bodyStyle={{height:160}}
                       className="addClassModal" onOk={this.ResetNameOk.bind(this)}
                       onCancel={this.ResetNameCancel.bind(this)}>

                    <div className="ModalContent">

                        <div className="reset-classname-wrapper" style={{marginTop:40}}>

                            <span className="props">班级名称:</span>

                            <Tips placement="bottom" visible={ErrorTipsShow} title={ErrorTips}>

                                <Input type="text" maxLength={20} onChange={this.ReNameInputChange.bind(this)} value={InputText} placeholder="请输入班级名称"/>

                            </Tips>

                            {/*<div className="error-tips" style={{display:`${ErrorTipsShow?'block':'none'}`}}>{ErrorTips}</div>*/}

                        </div>

                    </div>

                </Modal>


            </Loading>
        );
    }
}
const  mapStateToProps = (state) => {
    let {UIState,DataState} = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(ClassContent);