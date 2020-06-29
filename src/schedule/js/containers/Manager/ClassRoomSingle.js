import React,{Component} from 'react';

import { connect } from 'react-redux';

import $ from 'jquery';

import ManagerIndexActions from "../../actions/Manager/ManagerIndexActions";

import CRSActions from '../../actions/Manager/ClassRoomSingleActions';

import AppAlertActions from '../../actions/AppAlertActions';

import LeftMenu from "../../component/LeftMenu";

import TermPick from "../../component/TermPick";

import {Loading} from "../../../../common";

import SingleDoubleTable from "../../component/SingleDoubleTable";

import ComPageRefresh from "../../actions/ComPageRefresh";

/*
import ScheduleDetailModal from "../../component/ScheduleDetailModal";

import ChangeTimeModal from "../../component/ChangeTimeModal";

import AdjustClassRoomModal from "../../component/AdjustClassRoomModal";

import ReplaceScheduleModal from "../../component/ReplaceScheduleModal";
*/

import SDActions from "../../actions/ScheduleDetailActions";


class ClassRoomSingle extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

        dispatch(ComPageRefresh.ComPageInit(ManagerIndexActions.ClassRoomSingleInit()));

    }

    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_WEEK_CHANGE,data:e.value});

        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_SHOW});

       dispatch(CRSActions.WeekUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,Manager,ClassRoomSingle} = this.props;

        const {WeekNO} = ClassRoomSingle;

        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_WEEK_CHANGE,data:(WeekNO+1)});

        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_SHOW});

        dispatch(CRSActions.WeekUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,Manager,ClassRoomSingle} = this.props;

        const {WeekNO} = ClassRoomSingle;

        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_WEEK_CHANGE,data:(WeekNO-1)});

        dispatch(CRSActions.WeekUpdate());

    }
    //左侧菜单选取某一个班级
    menuPickClick(pickInfo){

        const {dispatch} = this.props;

        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_SCHEDULE_LOADING_SHOW});

        dispatch(CRSActions.ClassRoomSingleScheduleUpdate(pickInfo));

    }

    //点击搜索事件

    searchClick(e){

        const {dispatch} = this.props;

        if (e.value.trim()===''){

            dispatch(AppAlertActions.alertWarn({title:"搜索不能为空！"}));

        }else{

            dispatch(CRSActions.ClassSearch(e.value));

        }

    }

    //取消搜索事件
    cancelSearch(e){

        const {dispatch} = this.props;

        dispatch({type:CRSActions.MANAGER_CLASS_ROOM_SINGLE_SEARCH_RESULT_HIDE});

        dispatch({type:CRSActions.MANAGER_CRS_LEFT_MENU_SEARCH_INPUT_CHANGE,data:''});

        dispatch({type:CRSActions.MANAGER_CRS_LEFT_MENU_CANCEL_BTN_HIDE});


    }



    //左侧菜单输入框改变
    LeftMenuSearchValueChange(e) {

        const {dispatch} = this.props;

        dispatch({type:CRSActions.MANAGER_CRS_LEFT_MENU_SEARCH_INPUT_CHANGE,data:e.target.value});

    }

    //弹出课程详情弹窗

    ScheduleDetailShow(Params){

        const { dispatch,Manager,ClassRoomSingle } = this.props;

        /*dispatch(CRSActions.ScheduleDetailShow(Params));*/

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = Manager.SubjectCourseGradeClassRoom;

        const {WeekNO} = ClassRoomSingle;

        dispatch({type:SDActions.COMPONENT_SCHEDULE_DETAIL_MODAL_PARAMS_UPDATE,data:{ItemClassHour,ItemClassHourCount,NowClassHourNO,WeekNO}});

        dispatch(SDActions.ScheduleDetailShow(Params));

    }


    /*//停课

    StopSchedule(params){

        const { dispatch } = this.props;

        dispatch(CRSActions.StopSchedule(params));

    }

    //恢复上课
    RebackStopSchedule(params){

        const { dispatch } = this.props;

        dispatch(CRSActions.RebackStopSchedule(params));

    }

    //关闭弹窗

    ScheduleDetailClose(){

        const { dispatch } = this.props;

        dispatch({type:CRSActions.MANAGER_CRS_SCHEDULE_DETAIL_MODAL_HIDE});

        /!*ComPageRefresh.ComPageUpdate(dispatch);*!/

        dispatch(CRSActions.WeekUpdate());

    }

    //调整时间弹窗

    ChangeTimeShow(params){

        const { dispatch } = this.props;

        dispatch(CRSActions.ChangeTimeShow(params));

    }

    //调整时间弹窗点击某一个课时

    SelectClassHour(params){

        const { dispatch } = this.props;

        dispatch(CRSActions.SelectClassHour(params));

    }


    //调整时间弹窗切换周次

    WeekPick(WeekNO){

        const { dispatch } = this.props;

        dispatch(CRSActions.WeekPick(WeekNO));

    }

    //调整时间弹窗关闭

    CloseChangeTime(){

        const { dispatch } = this.props;

        dispatch({type:CRSActions.MANAGER_CRS_CHANGE_TIME_MODAL_HIDE});

    }

    //点击调整时间弹窗确定
    ChangeTimeCommit(){

        const { dispatch } = this.props;

        dispatch(CRSActions.ChangeTimeCommit());

    }

    //撤销调整时间
    RebackTime(params){

        const { dispatch } = this.props;

        dispatch(CRSActions.RebackTime(params));

    }

    //调整教室弹窗
    AdjustClassRoomShow(params){

        const { dispatch } = this.props;

        dispatch(CRSActions.AdjustClassRoomShow(params));

    }

    //调整教室弹窗切换选中教室事件

    ChangeClassRoomPick(e){

        const { dispatch } = this.props;

        dispatch({type:CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE,data:e.target.value});

    }

    //调整教室教室类型切换

    ChangeClassRoomType(key){

        const { dispatch } = this.props;

        dispatch({type:CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE,data:key});

    }

    //调整教室搜索值变化

    SearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,data:e.target.value});


    }

    //点击教室搜索

    ClassRoomSearchClick(SearchValue){

        const { dispatch } = this.props;

        dispatch(CRSActions.ClassRoomSearchClick(SearchValue))

    }

    //取消搜索教室

    ClassRoomSearchCancel(){

        const { dispatch } = this.props;

        dispatch({type:CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE});

        dispatch({type:CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE});

        dispatch({type:CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,data:''});

    }


    //关闭调整教室弹窗

    CloseAdjustClassRoom(){

        const { dispatch } = this.props;

        dispatch({type:CRSActions.MANAGER_CRS_ADJUST_CLASSROOM_MODAL_HIDE});

    }

    //调整教室弹窗提交
    AdjustClassRoomCommit(){

        const { dispatch } = this.props;

        dispatch(CRSActions.AdjustClassRoomCommit());

    }

    //撤销教室调整

    RebackClassRoom(params){

        const { dispatch } = this.props;

        dispatch(CRSActions.RebackClassRoom(params));

    }

    //找人代课弹窗出现

    ChooseReplaceTeacherShow(params){

        const { dispatch } = this.props;

        dispatch(CRSActions.ChooseReplaceTeacherShow(params));

    }

    //找人代课教师选择

    ReplaceTeacherPick(ID){

        const { dispatch } = this.props;

        dispatch({type:CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_TEACHER_PICK,data:ID});

    }

    //找人代课输入框改变

    ReplaceSearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,data:e.target.value});

    }

    //点击代课教师搜索

    ReplaceSearchClick(SearchValue){

        const { dispatch } = this.props;

        dispatch(CRSActions.ReplaceSearchClick(SearchValue));

    }

    //取消搜索教师

    ReplaceSearchCancel(){

        const { dispatch } = this.props;

        dispatch({type:CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE});

        dispatch({type:CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE});

        dispatch({type:CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,data:''});

    }

    //关闭找人代课弹窗

    ReplaceScheduleClose(){

        const { dispatch } = this.props;

        dispatch({type:CRSActions.MANAGER_CRS_REPLACE_SCHEDULE_MODAL_HIDE});

    }

    //找人代课弹窗提交
    ReplaceScheduleCommit(){

        const { dispatch } = this.props;

        dispatch(CRSActions.ReplaceScheduleCommit());

    }

    //找人代课撤销

    RebackReplaceSchedule(params){

        const { dispatch } = this.props;

        dispatch(CRSActions.RebackReplaceSchedule(params));

    }*/

    componentWillUpdate(){

        if (window.ScheduleLeftMenuHeightChange){

            window.ScheduleLeftMenuHeightChange($('.subject-teacher-teacher-content').height());

        }

    }


    render() {

        const { PeriodWeekTerm ,ClassRoomSingle,Manager} = this.props;

        const {SubjectCourseGradeClassRoom} = Manager;

        //封装获取到的周次

        const { ScheduleDetail,ChangeTime,AdjustClassRoom,ReplaceSchedule } = ClassRoomSingle;



        return (

            <div className="subject-teacher-teacher-content clearfix">

                <Loading tip="请稍后..." spinning={ClassRoomSingle.ScheduleLoadingShow}>

                    <LeftMenu
                        title="教室列表"
                        type="classroom"
                        EmptyTitle="教室"
                        pickList={ClassRoomSingle.ClassRoomList}
                        pickClick={this.menuPickClick.bind(this)}
                        searchClick={this.searchClick.bind(this)}
                        cancelSearch={this.cancelSearch.bind(this)}
                        searchShow={ClassRoomSingle.SearchWrapperShow}
                        searchResult={ClassRoomSingle.SearchResult}
                        leftMenuSearchLoading={ClassRoomSingle.SearchLoadingShow}
                        PickID={ClassRoomSingle.PickClassRoomID}
                        CancelBtnShow={ClassRoomSingle.CancelBtnShow}
                        SearchValue={ClassRoomSingle.SearchValue}
                        SearchValueChange={this.LeftMenuSearchValueChange.bind(this)}
                        placeHolder={"请输入名称或ID搜索"}>

                    </LeftMenu>

                    <div className="pick-teacher-wrapper">

                            {

                                ClassRoomSingle.PickClassRoom===''?

                                <div className="please-select-teacher">请选择教室</div>

                                :

                                <React.Fragment>

                                    <span className="teacher-name" title={ClassRoomSingle.PickClassRoom}>{ClassRoomSingle.PickClassRoom}</span>

                                    <span className="course-count"> (本周共<span className="count">{ClassRoomSingle.ScheduleCount}</span>节课)</span>

                                </React.Fragment>

                            }

                            </div>

                    <TermPick

                        ItemWeek={ClassRoomSingle.WeekList}

                        ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                        NowWeekNo={ClassRoomSingle.WeekNO}

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
                            NowWeekNo={ClassRoomSingle.WeekNO}
                            schedule={ClassRoomSingle.Schedule}
                            NowDate={PeriodWeekTerm.NowDate}
                            ScheduleDetailShow={this.ScheduleDetailShow.bind(this)}>

                        </SingleDoubleTable>

                </Loading>

                {/*<ScheduleDetailModal

                    Params={ScheduleDetail}

                    StopSchedule={this.StopSchedule.bind(this)}

                    RebackStopSchedule={this.RebackStopSchedule.bind(this)}

                    ChangeTimeShow={this.ChangeTimeShow.bind(this)}

                    ScheduleDetailClose={this.ScheduleDetailClose.bind(this)}

                    RebackTime={this.RebackTime.bind(this)}

                    AdjustClassRoomShow={this.AdjustClassRoomShow.bind(this)}

                    RebackClassRoom={this.RebackClassRoom.bind(this)}

                    ChooseReplaceTeacherShow={this.ChooseReplaceTeacherShow.bind(this)}

                    RebackReplaceSchedule={this.RebackReplaceSchedule.bind(this)}

                >

                </ScheduleDetailModal>

                <ChangeTimeModal

                    Params={ChangeTime}

                    SelectClassHour={this.SelectClassHour.bind(this)}

                    WeekPick={this.WeekPick.bind(this)}

                    CloseChangeTime={this.CloseChangeTime.bind(this)}

                    ChangeTimeCommit={this.ChangeTimeCommit.bind(this)}

                >

                </ChangeTimeModal>

                <AdjustClassRoomModal

                    Params={AdjustClassRoom}

                    ChangeClassRoomPick={this.ChangeClassRoomPick.bind(this)}

                    ChangeClassRoomType={this.ChangeClassRoomType.bind(this)}

                    SearchValueChange={this.SearchValueChange.bind(this)}

                    ClassRoomSearchClick={this.ClassRoomSearchClick.bind(this)}

                    ClassRoomSearchCancel={this.ClassRoomSearchCancel.bind(this)}

                    CloseAdjustClassRoom={this.CloseAdjustClassRoom.bind(this)}

                    AdjustClassRoomCommit={this.AdjustClassRoomCommit.bind(this)}

                >

                </AdjustClassRoomModal>

                <ReplaceScheduleModal

                    Params={ReplaceSchedule}

                    ReplaceTeacherPick={this.ReplaceTeacherPick.bind(this)}

                    SearchValueChange={this.ReplaceSearchValueChange.bind(this)}

                    ReplaceSearchClick={this.ReplaceSearchClick.bind(this)}

                    ReplaceSearchCancel={this.ReplaceSearchCancel.bind(this)}

                    ReplaceScheduleClose={this.ReplaceScheduleClose.bind(this)}

                    ReplaceScheduleCommit={this.ReplaceScheduleCommit.bind(this)}

                >



                </ReplaceScheduleModal>*/}

            </div>

        );

    }

}

const  mapStateToProps = (state) => {

    let { LoginUser,Manager,PeriodWeekTerm } = state;

    let { ClassRoomSingle } = Manager;

    return {

        PeriodWeekTerm,ClassRoomSingle,Manager

    }

};

export default connect(mapStateToProps)(ClassRoomSingle);