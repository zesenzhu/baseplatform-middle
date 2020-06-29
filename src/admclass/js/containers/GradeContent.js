import React,{Component} from 'react';
import TitleBar from '../component/TitleBar';
import {Loading, Search, PagiNation, Modal} from "../../../common";
import ContentWrapper from '../component/ContentWrapper';
import Statistics from '../component/Statistics'
import PartData from '../component/PartData';
import connect from "react-redux/es/connect/connect";
import UpDataState from '../actions/UpDataState';
import UpUIState from '../actions/UpUIState';

import $ from 'jquery';

import SearchActions from '../actions/SearchActions';

import AppAlertActions from '../actions/AppAlertActions';

import PaginationActions from "../actions/PaginationActions";

import AASActions from '../actions/AppAlertSuccess';

import {Input} from "antd";

class GradeContent extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

      //初始化内容区域的数据

      dispatch(UpDataState.getAllGradePreview());

    }
    //点击搜索
    SchoolClassSearch(e){

        const key = e.value;

        const { dispatch } = this.props;

        if (key){

            dispatch(SearchActions.SchoolClassSearch(key));

        }else{

            dispatch(AppAlertActions.alertWarn({title:"搜索内容不能为空!"}));

        }

    }

    //取消搜索

    SchoolCancelClassSearch(){

        const { dispatch } = this.props;

        dispatch(SearchActions.SchoolCancelClassSearch());

    }


    //翻页发生改变

    pageChange(e){

        const { dispatch } = this.props;

        dispatch(PaginationActions.SchoolClassPageChange(e-1));

    }

    //点击某一个年级跳转到相对应的年级界面

    GradeClick({id,name}) {

        const {dispatch} = this.props;

        dispatch({type: UpUIState.CHANGE_GRADE_ACTIVE, info: {id: id, name: name}});


        $('.frame_leftmenu_mainitem').removeClass('active');

        $('.frame_leftmenu_mainitem').removeClass('selected');

        $(`.frame_leftmenu_mainitem`).each((index,that)=>{

            if ($(that).attr('data-id')===id){

                $(that).addClass('active','selectd');

            }

        })

    }

    ClassClick({id,name}){

        const { dispatch} = this.props;

        $('.frame_leftmenu_mainitem').removeClass('active');

        $('.frame_leftmenu_mainitem').removeClass('selected');

        $(`.frame_leftmenu_onegrade_ul li`).each((index,that)=>{

            if ($(that).attr('data-id')===id){

                let GradeDom = $(that).closest('.frame_leftmenu_nextgrade_container').prev();

                $(that).addClass('active');

                $(that).children('.frame_leftmenu_onegrade_name').addClass('active');

                GradeDom.addClass('selected');

                let preId = GradeDom.attr('data-id');

                let preName = GradeDom.children('.frame_leftmenu_mainitem_name').html();

                dispatch({type:UpUIState.CHANGE_CLASS_ACTIVE,info:{id,name,preName,preId}});

            }

        })

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

    }


    //重命名点击确定
    ResetNameOk(){

        const { dispatch,DataState,UIState } = this.props;

        //判断是否输入合法和是否重命名

        let { InputText,ClassID,ClassName } = UIState.ResetNameModal;

        //如果名称未做变化
        if (ClassName === InputText){

            dispatch({type:UpUIState.RESET_CLASS_NAME_TIPS_SHOW,data:{title:"班级名称没有发生变化"}});

        }else{

            if (this.UserComm_CheckGroupName(InputText)){

                dispatch({type:UpUIState.RESET_CLASS_NAME_TIPS_HIDE});

                let { SchoolGradeClasses } = DataState;

                //获取班级所在的grade列表


                 let TheGrade = SchoolGradeClasses.Grades.find(item=>{

                     let HasClass = false;

                     item.Classes.map(i=>{

                         if (i.ClassID===ClassID){

                             HasClass = true;

                         }

                     });

                     return HasClass;

                });


                //查看是否有重名的班级

                let IsNameRepeat = false;

                TheGrade.Classes.map(item=>{

                    if (item.ClassName === InputText){

                        IsNameRepeat = true;

                        return

                    }

                });


                if (IsNameRepeat){

                    dispatch({type:UpUIState.RESET_CLASS_NAME_TIPS_SHOW,data:{title:"班级名称和其他班级名称重复"}});

                }else{


                    //做异步操作

                    dispatch(UpDataState.UpdateClassName({IsAllPreview:true,GradeID:TheGrade.GradeID,ClassID:ClassID,ClassName:InputText}));


                }

            }else{

                //检测不通过

                dispatch({type:UpUIState.RESET_CLASS_NAME_TIPS_SHOW,data:{title:"班级名称格式错误"}});

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

        const { dispatch,DataState } = this.props;

        const { SchoolGradeClasses } = DataState;

        let TheGrade = SchoolGradeClasses.Grades.find(item=>{

            let HasClass = false;

            item.Classes.map(i=>{

                if (i.ClassID===ClassID){

                    HasClass = true;

                }

            });

            return HasClass;

        });

        dispatch(AppAlertActions.alertQuery({title:"您要删除该班级么？",ok:()=>{ return this.delClassActions.bind(this,{GradeID:TheGrade.GradeID,ClassID})}}));

    }

    delClassActions({ClassID,GradeID}){

        const { dispatch,DataState } = this.props;

        let { SchoolID } = DataState.LoginUser;

        const { AllGradePreview } = DataState;

        dispatch({type:UpUIState.CLOSE_ERROR_ALERT});

        UpDataState.delClassPost({ClassIDs:ClassID,GradeID:GradeID,dispatch}).then(data=>{

            if (data==='success'){

                dispatch(AASActions.AlertSuccess({title:"删除班级成功！"}));

                dispatch(SearchActions.SchoolClassSearch(AllGradePreview.SearchKey));

                dispatch(UpDataState.UpGradeClassTree(SchoolID));

            }

        })

    }


    //班级名称检测函数

    UserComm_CheckGroupName(strInput) {

        return /^[0-9a-zA-Z()（）\u4E00-\u9FA5\uF900-\uFA2D-]{1,20}$/.test(strInput);

    }


    render() {

        const {UIState,DataState} = this.props;

        const {GradeLoading,ResetNameModal} = UIState;

        const { AllGradePreview,GradePagination } = DataState;

        const { show,InputText,ErrorTips,ErrorTipsShow } = ResetNameModal;

        return (
            <Loading tip="加载中..." spinning={GradeLoading.show}  size="large">

                <TitleBar type="icon1" title="班级信息总览"></TitleBar>

                <ContentWrapper>

                    <div className="search-wrapper clearfix">

                        <Search width={360} CancelBtnShow={AllGradePreview.CancelBtnShow} className="admclass-search" onCancelSearch={this.SchoolCancelClassSearch.bind(this)} onClickSearch={this.SchoolClassSearch.bind(this)} placeHolder="请输入班级名称或教师工号或教师姓名进行搜索"></Search>

                    </div>

                    {

                        AllGradePreview.ClassContentShow? ''

                            :

                            <React.Fragment>

                                <Statistics classNum={AllGradePreview.Class} teacherNum={AllGradePreview.CourseTecher} studentNum={AllGradePreview.Student}></Statistics>

                                <PartData

                                    GradeClick={this.GradeClick.bind(this)}

                                    type="grade"

                                    PartDataList={AllGradePreview.List}

                                ></PartData>

                            </React.Fragment>

                    }


                    {

                        AllGradePreview.ClassContentShow?

                            <React.Fragment>

                                <Loading spinning={AllGradePreview.ClassLoading}>

                                <PartData type="class" className="school-grade-class"
                                          PartDataList={AllGradePreview.ClassInfo.List}
                                          ClassClick={this.ClassClick.bind(this)}
                                          ResetClassName={this.ResetClassName.bind(this)}
                                          delClass={this.delClass.bind(this)}
                                          SearchResultShow={AllGradePreview.ClassContentShow}
                                >

                                </PartData>

                                <PagiNation pageSize={12} onChange={this.pageChange.bind(this)} current={GradePagination.CurrentPage} total={GradePagination.Total}></PagiNation>

                            </Loading>

                            </React.Fragment>

                            :''

                    }

                </ContentWrapper>

                <Modal type={1}
                       title="班级重命名"
                       mask={true}
                       visible={show}
                       width={540}
                       bodyStyle={{height:92}}
                       className="addClassModal" onOk={this.ResetNameOk.bind(this)}
                       onCancel={this.ResetNameCancel.bind(this)}>

                    <div className="ModalContent">

                        <div className="reset-classname-wrapper">

                            <span className="props">班级名称:</span>

                            <Input type="text" maxLength={20} onChange={this.ReNameInputChange.bind(this)} value={InputText} placeholder="请输入班级名称"/>

                            <div className="error-tips" style={{display:`${ErrorTipsShow?'block':'none'}`}}>{ErrorTips}</div>

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
export default connect(mapStateToProps)(GradeContent);