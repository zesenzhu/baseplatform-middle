import React,{Component} from 'react';

import { connect } from 'react-redux';

import $ from 'jquery';

import ManagerIndexActions from "../../actions/Manager/ManagerIndexActions";

import CSActions from '../../actions/Manager/ClassSingleActions';

import AppAlertActions from '../../actions/AppAlertActions';

import LeftMenu from "../../component/LeftMenu";

import TermPick from "../../component/TermPick";

import {Loading} from "../../../../common";

import SingleDoubleTable from "../../component/SingleDoubleTable";

import OptionalClassModal from "../../component/OptionalClassModal";

import ComPageRefresh from "../../actions/ComPageRefresh";

/*
import ScheduleDetailModal from "../../component/ScheduleDetailModal";

import ChangeTimeModal from "../../component/ChangeTimeModal";

import AdjustClassRoomModal from "../../component/AdjustClassRoomModal";

import ReplaceScheduleModal from "../../component/ReplaceScheduleModal";
*/

import SDActions from "../../actions/ScheduleDetailActions";



class ClassSingle extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

        dispatch(ComPageRefresh.ComPageInit(ManagerIndexActions.ClassSingleInit()));

    }

    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_WEEK_CHANGE,data:e.value});

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_SHOW});

       dispatch(CSActions.WeekUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,Manager,ClassSingle} = this.props;

        const {WeekNO} = ClassSingle;

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_WEEK_CHANGE,data:(WeekNO+1)});

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_SHOW});

        dispatch(CSActions.WeekUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,Manager,ClassSingle} = this.props;

        const {WeekNO} = ClassSingle;

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_WEEK_CHANGE,data:(WeekNO-1)});

        dispatch(CSActions.WeekUpdate());

    }
    //左侧菜单选取某一个班级
    menuPickClick(pickInfo){

        const {dispatch} = this.props;

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_SCHEDULE_LOADING_SHOW});

        dispatch(CSActions.ClassSingleScheduleUpdate(pickInfo));

    }

    //点击搜索事件

    searchClick(e){

        const {dispatch} = this.props;

        if (e.value.trim()===''){

            dispatch(AppAlertActions.alertWarn({title:"搜索不能为空！"}));

        }else{

            dispatch(CSActions.ClassSearch(e.value));

        }

    }

    //取消搜索事件
    cancelSearch(e){

        const {dispatch} = this.props;

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_SEARCH_RESULT_HIDE});

        dispatch({type:CSActions.MANAGER_CSA_LEFT_MENU_CANCEL_BTN_HIDE});

        dispatch({type:CSActions.MANAGER_CSA_LEFT_MENU_SEARCH_INPUT_CHANGE,data:''});


    }

    //左侧菜单输入框改变

    LeftSearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:CSActions.MANAGER_CSA_LEFT_MENU_SEARCH_INPUT_CHANGE,data:e.target.value});

    }

    //走班详情弹窗打开

    OptionalClassShow({ClassHourNO,WeekDay}){

        const { dispatch,ClassSingle } = this.props;

        let { PickClassID,WeekNO } = ClassSingle;

        dispatch(CSActions.OptionalClassInit({ClassHourNO,WeekDay,ClassID:PickClassID,WeekNO}))

    }

    //走班详情弹窗关闭

    OptionalClassModalClose(){

        const { dispatch } = this.props;

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_MODAL_HIDE});


    }


    //走班详情页码变化
    OptionalClassPageChange(e){

        const { dispatch } = this.props;

        dispatch({type:CSActions.MANAGER_CLASS_SINGLE_OPTIONAL_CLASS_PAGE_CHANGE,data:e});

    }



    //弹出课程详情弹窗

    ScheduleDetailShow(Params){

        const { dispatch,Manager } = this.props;

       /* dispatch(CSActions.ScheduleDetailShow(Params));*/

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = Manager.SubjectCourseGradeClassRoom;

        const {WeekNO} = Manager.ClassSingle;

        dispatch({type:SDActions.COMPONENT_SCHEDULE_DETAIL_MODAL_PARAMS_UPDATE,data:{ItemClassHour,ItemClassHourCount,NowClassHourNO,WeekNO}});

        dispatch(SDActions.ScheduleDetailShow(Params));

    }


    /*//停课

    StopSchedule(params){

        const { dispatch } = this.props;

        dispatch(CSActions.StopSchedule(params));

    }

    //恢复上课
    RebackStopSchedule(params){

        const { dispatch } = this.props;

        dispatch(CSActions.RebackStopSchedule(params));

    }

    //关闭弹窗

    ScheduleDetailClose(){

        const { dispatch } = this.props;

        dispatch({type:CSActions.MANAGER_CS_SCHEDULE_DETAIL_MODAL_HIDE});

        /!*ComPageRefresh.ComPageUpdate(dispatch);*!/

        dispatch(CSActions.WeekUpdate());

    }

    //调整时间弹窗

    ChangeTimeShow(params){

        const { dispatch } = this.props;

        dispatch(CSActions.ChangeTimeShow(params));

    }

    //调整时间弹窗点击某一个课时

    SelectClassHour(params){

        const { dispatch } = this.props;

        dispatch(CSActions.SelectClassHour(params));

    }


    //调整时间弹窗切换周次

    WeekPick(WeekNO){

        const { dispatch } = this.props;

        dispatch(CSActions.WeekPick(WeekNO));

    }

    //调整时间弹窗关闭

    CloseChangeTime(){

        const { dispatch } = this.props;

        dispatch({type:CSActions.MANAGER_CS_CHANGE_TIME_MODAL_HIDE});

    }

    //点击调整时间弹窗确定
    ChangeTimeCommit(){

        const { dispatch } = this.props;

        dispatch(CSActions.ChangeTimeCommit());

    }

    //撤销调整时间
    RebackTime(params){

        const { dispatch } = this.props;

        dispatch(CSActions.RebackTime(params));

    }

    //调整教室弹窗
    AdjustClassRoomShow(params){

        const { dispatch } = this.props;

        dispatch(CSActions.AdjustClassRoomShow(params));

    }

    //调整教室弹窗切换选中教室事件

    ChangeClassRoomPick(e){

        const { dispatch } = this.props;

        dispatch({type:CSActions.MANAGER_CS_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE,data:e.target.value});

    }

    //调整教室教室类型切换

    ChangeClassRoomType(key){

        const { dispatch } = this.props;

        dispatch({type:CSActions.MANAGER_CS_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE,data:key});

    }

    //调整教室搜索值变化

    SearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:CSActions.MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,data:e.target.value});


    }

    //点击教室搜索

    ClassRoomSearchClick(SearchValue){

        const { dispatch } = this.props;

        dispatch(CSActions.ClassRoomSearchClick(SearchValue))

    }

    //取消搜索教室

    ClassRoomSearchCancel(){

        const { dispatch } = this.props;

        dispatch({type:CSActions.MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE});

        dispatch({type:CSActions.MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE});

        dispatch({type:CSActions.MANAGER_CS_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,data:''});

    }


    //关闭调整教室弹窗

    CloseAdjustClassRoom(){

        const { dispatch } = this.props;

        dispatch({type:CSActions.MANAGER_CS_ADJUST_CLASSROOM_MODAL_HIDE});

    }

    //调整教室弹窗提交
    AdjustClassRoomCommit(){

        const { dispatch } = this.props;

        dispatch(CSActions.AdjustClassRoomCommit());

    }

    //撤销教室调整

    RebackClassRoom(params){

        const { dispatch } = this.props;

        dispatch(CSActions.RebackClassRoom(params));

    }

    //找人代课弹窗出现

    ChooseReplaceTeacherShow(params){

        const { dispatch } = this.props;

        dispatch(CSActions.ChooseReplaceTeacherShow(params));

    }

    //找人代课教师选择

    ReplaceTeacherPick(ID){

        const { dispatch } = this.props;

        dispatch({type:CSActions.MANAGER_CS_REPLACE_SCHEDULE_MODAL_TEACHER_PICK,data:ID});

    }

    //找人代课输入框改变

    ReplaceSearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:CSActions.MANAGER_CS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,data:e.target.value});

    }

    //点击代课教师搜索

    ReplaceSearchClick(SearchValue){

        const { dispatch } = this.props;

        dispatch(CSActions.ReplaceSearchClick(SearchValue));

    }

    //取消搜索教师

    ReplaceSearchCancel(){

        const { dispatch } = this.props;

        dispatch({type:CSActions.MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE});

        dispatch({type:CSActions.MANAGER_CS_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE});

        dispatch({type:CSActions.MANAGER_CS_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,data:''});

    }

    //关闭找人代课弹窗

    ReplaceScheduleClose(){

        const { dispatch } = this.props;

        dispatch({type:CSActions.MANAGER_CS_REPLACE_SCHEDULE_MODAL_HIDE});

    }

    //找人代课弹窗提交
    ReplaceScheduleCommit(){

        const { dispatch } = this.props;

        dispatch(CSActions.ReplaceScheduleCommit());

    }

    //找人代课撤销

    RebackReplaceSchedule(params){

        const { dispatch } = this.props;

        dispatch(CSActions.RebackReplaceSchedule(params));

    }*/

    componentWillUpdate(){

        if (window.ScheduleLeftMenuHeightChange){

            window.ScheduleLeftMenuHeightChange($('.subject-teacher-teacher-content').height());

        }

    }


    render() {

        const { PeriodWeekTerm ,ClassSingle,Manager} = this.props;

        const {SubjectCourseGradeClassRoom} = Manager;

        const { ScheduleDetail,ChangeTime,AdjustClassRoom,ReplaceSchedule } = ClassSingle;



        //封装获取到的周次


        return (

            <div className="subject-teacher-teacher-content clearfix">

                <Loading tip="请稍后..." spinning={ClassSingle.ScheduleLoadingShow}>

                    <LeftMenu
                        title="班级列表"
                        type="class"
                        EmptyTitle="班级"
                        pickList={ClassSingle.ClassList}
                        pickClick={this.menuPickClick.bind(this)}
                        searchClick={this.searchClick.bind(this)}
                        cancelSearch={this.cancelSearch.bind(this)}
                        searchShow={ClassSingle.SearchWrapperShow}
                        searchResult={ClassSingle.SearchResult}
                        leftMenuSearchLoading={ClassSingle.SearchLoadingShow}
                        PickID={ClassSingle.PickClassID}
                        CancelBtnShow={ClassSingle.CancelBtnShow}
                        SearchValue={ClassSingle.SearchValue}
                        SearchValueChange={this.LeftSearchValueChange.bind(this)}
                        placeHolder={"请输入名称或ID搜索"}
                    >


                    </LeftMenu>

                    <div className="pick-teacher-wrapper">

                        {ClassSingle.PickClass === '' ?

                            <div className="please-select-teacher">请选择班级</div>


                            :

                            <span className="teacher-name" title={ClassSingle.PickClass}>{ClassSingle.PickClass}</span>

                        }
                                {/*<span className="course-count"> (本周共<span className="count">{ClassSingle.ScheduleCount}</span>节课)</span>*/}

                    </div>

                    <TermPick

                        ItemWeek={ClassSingle.WeekList}

                        ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                        NowWeekNo={ClassSingle.WeekNO}

                        weekPickEvent = {this.weekPickEvent.bind(this)}

                        weekNextEvent = {this.weekNextEvent.bind(this)}

                        weekPrevEvent = {this.weekPrevEvent.bind(this)}
                        
                        WeekNO={PeriodWeekTerm.WeekNO?PeriodWeekTerm.WeekNO:''}>

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
                        NowWeekNo={ClassSingle.WeekNO}
                        schedule={ClassSingle.Schedule}
                        NowDate={PeriodWeekTerm.NowDate}
                        OptionalClassShow={this.OptionalClassShow.bind(this)}
                        ScheduleDetailShow={this.ScheduleDetailShow.bind(this)}>

                    </SingleDoubleTable>

                    <OptionalClassModal
                        Show={ClassSingle.OptionalClassShow}
                        LoadingShow={ClassSingle.OptionalClassLoading}
                        DataSource={ClassSingle.OptionalClassData}
                        Close={this.OptionalClassModalClose.bind(this)}
                        PageChange={this.OptionalClassPageChange.bind(this)}
                        CurrentPage={ClassSingle.OptionalClassCurrentPage}>

                    </OptionalClassModal>

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

    let { ClassSingle } = Manager;

    return {

        PeriodWeekTerm,ClassSingle,Manager

    }

};

export default connect(mapStateToProps)(ClassSingle);