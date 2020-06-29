import React,{Component} from 'react';

import {connect} from 'react-redux';

import $ from 'jquery';

import TermPick from  '../../component/TermPick';

import LeftMenu from '../../component/LeftMenu';

import { Loading,Empty } from "../../../../common";

import ComPageRefresh from '../../actions/ComPageRefresh';

import SingleDoubleTable from '../../component/SingleDoubleTable';

import TeacherIndexActions from "../../actions/Teacher/TeacherIndexActions";

import CSActions from '../../actions/Teacher/ClassStudentActions';

import AppAlertActions from '../../actions/AppAlertActions';

import SDActions from "../../actions/ScheduleDetailActions";



class ClassStudent extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

        dispatch(ComPageRefresh.ComPageInit(TeacherIndexActions.ClassStudentPageInit()));

    }

    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        dispatch({type:CSActions.TEACHER_CS_WEEK_CHANGE,data:e.value});

        dispatch({type:CSActions.TEACHER_CS_LOADING_SHOW});

        dispatch(CSActions.CSWeekUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,Teacher} = this.props;

        const {WeekNO} = Teacher.ClassStudent;

        dispatch({type:CSActions.TEACHER_CS_WEEK_CHANGE,data:(WeekNO+1)});

        dispatch({type:CSActions.TEACHER_CS_LOADING_SHOW});

        dispatch(CSActions.CSWeekUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,Teacher} = this.props;

        const {WeekNO} = Teacher.ClassStudent;

        dispatch({type:CSActions.TEACHER_CS_WEEK_CHANGE,data:(WeekNO-1)});

        dispatch({type:CSActions.TEACHER_CS_LOADING_SHOW});

        dispatch(CSActions.CSWeekUpdate());

    }
    //左侧菜单选取某一个学生
    menuPickClick(pickInfo){

        const {dispatch} = this.props;

        dispatch({type:CSActions.TEACHER_CS_LOADING_SHOW});

        console.log(pickInfo);

        dispatch(CSActions.ClassStudentUpdate(pickInfo));

    }

    //点击搜索事件

    searchClick(e){

        const {dispatch} = this.props;

        if (e.value.trim()===''){

            dispatch(AppAlertActions.alertWarn({title:"搜索不能为空！"}));

        }else{

            dispatch(CSActions.StudentSearch(e.value));

        }

    }



    //取消搜索事件
    cancelSearch(e){

        const {dispatch} = this.props;

        dispatch(CSActions.CancelStuSearch());

    }

    //左侧菜单输入框改变

    LeftMenuSearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:CSActions.TEACHER_CS_LEFT_MENU_SEARCH_INPUT_CHANGE,data:e.target.value});

    }

    //弹出课程详情弹窗

    ScheduleDetailShow(Params){

        const { dispatch,Teacher } = this.props;

        /*dispatch(CSActions.ScheduleDetailShow(Params));*/

        const { ClassStudent } = Teacher;

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO,WeekNO } = ClassStudent;

        dispatch({type:SDActions.COMPONENT_SCHEDULE_DETAIL_MODAL_PARAMS_UPDATE,data:{ItemClassHour,ItemClassHourCount,NowClassHourNO,WeekNO,CanOperate:false}});

        dispatch(SDActions.ScheduleDetailShow(Params));

    }




    componentWillUpdate(){

        if (window.ScheduleLeftMenuHeightChange){

            window.ScheduleLeftMenuHeightChange($('.subject-teacher-teacher-content').height());

        }

    }


    render() {

        const { PeriodWeekTerm ,Teacher} = this.props;

        const { ClassStudent } = Teacher;

        const {ScheduleDetail,ChangeTime,AdjustClassRoom,ReplaceSchedule} = ClassStudent;

        let ItemWeek = [];

        //封装获取到的周次
        if (PeriodWeekTerm.ItemWeek) {

            ItemWeek = PeriodWeekTerm.ItemWeek.map((item) => {

                return {value:item.WeekNO,title:item.WeekNO};

            });

        }

        return (

            <div className="subject-teacher-teacher-content clearfix">

                <Loading tip="请稍后..." spinning={ClassStudent.ScheduleLoadingShow}>

                    {

                        ClassStudent.EmptyClassShow?

                            <Empty className="empty-class" type="4" title="您在该学段下没有行政班"></Empty>

                            :

                            <React.Fragment>

                                <LeftMenu
                                    title="学生列表"
                                    type="person"
                                    EmptyTitle="学生"
                                    pickList={ClassStudent.StudentList}
                                    searchTitleShow={true}
                                    searchTitle={ClassStudent.searchTitle}
                                    pickClick={this.menuPickClick.bind(this)}
                                    searchClick={this.searchClick.bind(this)}
                                    cancelSearch={this.cancelSearch.bind(this)}
                                    searchShow={ClassStudent.searchWrapperShow}
                                    searchResult={ClassStudent.searchResult}
                                    leftMenuSearchLoading={ClassStudent.searchLoadingShow}
                                    PickID={ClassStudent.PickStudentID}
                                    CancelBtnShow={ClassStudent.CancelBtnShow}
                                    SearchValue={ClassStudent.SearchValue}
                                    SearchValueChange={this.LeftMenuSearchValueChange.bind(this)}
                                    placeHolder={"请输入学生姓名或学号搜索"}
                                >

                                </LeftMenu>

                                <div className="pick-teacher-wrapper">

                                    {

                                        ClassStudent.PickStudentID!==''?

                                            <React.Fragment>

                                                <span className="teacher-name" title={ClassStudent.PickStudentName}>{ClassStudent.PickStudentName}</span>

                                                <span className="course-count"> (本周共<span className="count">{ClassStudent.ScheduleCount}</span>节课)</span>

                                            </React.Fragment>

                                            :<div className="please-select-teacher">请选择学生</div>

                                    }

                                </div>

                                <TermPick

                                    ItemWeek={ItemWeek}

                                    ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                                    NowWeekNo={ClassStudent.WeekNO}

                                    weekPickEvent = {this.weekPickEvent.bind(this)}

                                    weekNextEvent = {this.weekNextEvent.bind(this)}

                                    weekPrevEvent = {this.weekPrevEvent.bind(this)}
                                    
                                    WeekNO={PeriodWeekTerm.WeekNO?PeriodWeekTerm.WeekNO:''}

                                    >

                                </TermPick>

                                <SingleDoubleTable
                                    topHeight = {64}
                                    commonHeight = {90}
                                    commonWidth={106}
                                    leftOneWidth ={32}
                                    leftTwoWidth = {110}
                                    ItemClassHourCount={ClassStudent.ItemClassHourCount}
                                    ItemClassHour={ClassStudent.ItemClassHour}
                                    ItemWeek = {PeriodWeekTerm.ItemWeek}
                                    NowWeekNo={ClassStudent.WeekNO}
                                    schedule={ClassStudent.Schedule}
                                    NowDate={PeriodWeekTerm.NowDate}
                                    ScheduleDetailShow={this.ScheduleDetailShow.bind(this)}
                                >

                                </SingleDoubleTable>

                            </React.Fragment>

                    }

                </Loading>

            </div>

        );

    }

}

const mapStateToProps = (state) => {

    const {PeriodWeekTerm,Teacher} = state;

    return{

        PeriodWeekTerm,

        Teacher

    }

};

export default connect(mapStateToProps)(ClassStudent);