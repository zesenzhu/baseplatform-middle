import React,{Component} from 'react';

import {connect} from 'react-redux';

import $ from 'jquery';

import TermPick from  '../../component/TermPick';

import LeftMenu from '../../component/LeftMenu';

import { Loading } from "../../../../common";

import SingleDoubleTable from '../../component/SingleDoubleTable';

import TeacherIndexActions from "../../actions/Teacher/TeacherIndexActions";

import STTActions from '../../actions/Teacher/SubjectTeacherTeacherActions';

import ComPageRefresh from "../../actions/ComPageRefresh";

import SDActions from "../../actions/ScheduleDetailActions";


class Teacher extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

        dispatch(ComPageRefresh.ComPageInit(TeacherIndexActions.STTPageInit()));

    }


    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:e.value});

        dispatch({type:STTActions.SCHEDULE_LOADING_SHOW});

        dispatch(STTActions.STTWeekUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,Teacher} = this.props;

        const {NowWeekNo} = Teacher.SubjectTeacherTeacherSchedule;

        dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:(NowWeekNo+1)});

        dispatch({type:STTActions.SCHEDULE_LOADING_SHOW});

        dispatch(STTActions.STTWeekUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,Teacher} = this.props;

        const {NowWeekNo} = Teacher.SubjectTeacherTeacherSchedule;

        dispatch({type:STTActions.STT_NOW_WEEK_CHANGE,data:(NowWeekNo-1)});

        dispatch({type:STTActions.SCHEDULE_LOADING_SHOW});

        dispatch(STTActions.STTWeekUpdate());

    }
    //左侧菜单选取某一个教师
    menuPickClick(pickInfo){

        const {dispatch} = this.props;

        dispatch({type:STTActions.SCHEDULE_LOADING_SHOW});

        dispatch(STTActions.STTTeacherUpdate(pickInfo));

    }

    //点击搜索事件

    searchClick(e){

        const {dispatch} = this.props;

        dispatch(STTActions.STTTeacherSearch(e.value));

    }

    //取消搜索事件
    cancelSearch(e){

        const {dispatch} = this.props;

        dispatch(STTActions.cancelSearch());

        dispatch({type:STTActions.TEACHER_STT_LEFT_MENU_SEARCH_INPUT_CHANGE,data:''});

        dispatch({type:STTActions.TEACHER_STT_LEFT_MENU_CANCEL_BTN_HIDE});


    }

    //左侧菜单输入框改变

    LeftMenuSearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:STTActions.TEACHER_STT_LEFT_MENU_SEARCH_INPUT_CHANGE,data:e.target.value});

    }

    //弹出课程详情弹窗

    ScheduleDetailShow(Params){

        const { dispatch,Teacher } = this.props;

        /*dispatch(STTActions.ScheduleDetailShow(Params));*/

        const {SubjectTeacherTeacherSchedule,SubjectCourseGradeClassRoom} = Teacher;

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = SubjectCourseGradeClassRoom;

        const WeekNO = SubjectTeacherTeacherSchedule.NowWeekNo;

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

        const {SubjectTeacherTeacherSchedule,SubjectCourseGradeClassRoom} = Teacher;

        const {ScheduleDetail,ChangeTime,AdjustClassRoom,ReplaceSchedule} = SubjectTeacherTeacherSchedule;

        let ItemWeek = [];
        //封装获取到的周次
        if (PeriodWeekTerm.ItemWeek) {

            ItemWeek = PeriodWeekTerm.ItemWeek.map((item) => {

                return {value:item.WeekNO,title:item.WeekNO};

            });

        }

        return (

            <div className="subject-teacher-teacher-content clearfix">

                <Loading tip="请稍后..." spinning={SubjectTeacherTeacherSchedule.ScheduleLoadingShow}>

                    <LeftMenu
                        title="教师列表"
                        type="person"
                        EmptyTitle="教师"
                        pickList={SubjectTeacherTeacherSchedule.teacherList}
                        pickClick={this.menuPickClick.bind(this)}
                        searchClick={this.searchClick.bind(this)}
                        cancelSearch={this.cancelSearch.bind(this)}
                        searchShow={SubjectTeacherTeacherSchedule.searchWrapperShow}
                        searchResult={SubjectTeacherTeacherSchedule.searchResult}
                        leftMenuSearchLoading={SubjectTeacherTeacherSchedule.searchLoadingShow}
                        searchTitleShow={SubjectTeacherTeacherSchedule.searchTitleShow}
                        searchTitle={SubjectTeacherTeacherSchedule.searchTitle}
                        PickID={SubjectTeacherTeacherSchedule.pickTeacherID}
                        CancelBtnShow={SubjectTeacherTeacherSchedule.CancelBtnShow}
                        SearchValue={SubjectTeacherTeacherSchedule.SearchValue}
                        SearchValueChange={this.LeftMenuSearchValueChange.bind(this)}
                        placeHolder={"请输入姓名或工号搜索"}
                    >

                    </LeftMenu>

                    <div className="pick-teacher-wrapper">

                        {

                            SubjectTeacherTeacherSchedule.pickTeacher===''?

                                <div className="please-select-teacher">请选择教师</div>

                                :

                                <React.Fragment>

                                    <span className="teacher-name" title={SubjectTeacherTeacherSchedule.pickTeacher}>{SubjectTeacherTeacherSchedule.pickTeacher}</span>

                                    <span className="course-count"> (本周共<span className="count">{SubjectTeacherTeacherSchedule.ScheduleCount}</span>节课)</span>

                                </React.Fragment>

                        }

                    </div>

                    <TermPick

                        ItemWeek={ItemWeek}

                        ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                        NowWeekNo={SubjectTeacherTeacherSchedule.NowWeekNo}

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
                            ItemClassHourCount={SubjectCourseGradeClassRoom.ItemClassHourCount}
                            ItemClassHour={SubjectCourseGradeClassRoom.ItemClassHour}
                            ItemWeek = {PeriodWeekTerm.ItemWeek}
                            NowWeekNo={SubjectTeacherTeacherSchedule.NowWeekNo}
                            schedule={SubjectTeacherTeacherSchedule.schedule}
                            NowDate={PeriodWeekTerm.NowDate}
                            ScheduleDetailShow={this.ScheduleDetailShow.bind(this)}>

                        </SingleDoubleTable>

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

export default connect(mapStateToProps)(Teacher);