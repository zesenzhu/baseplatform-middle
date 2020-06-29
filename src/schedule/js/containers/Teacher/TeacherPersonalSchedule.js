import React,{Component} from 'react';

import {connect} from 'react-redux';

import TopButtons from '../../component/Teacher/TopButtons';

import TermPick from "../../component/TermPick"

import TeacherIndexActions from '../../actions/Teacher/TeacherIndexActions';

import {Loading} from "../../../../common";

import SingleDoubleTable from "../../component/SingleDoubleTable";

import TPActions from "../../actions/Teacher/TeacherPersonalActions";

import ATSMActions from '../../actions/Teacher/AddTempScheduleModalActions';

import AdjustByTeacherActions from '../../actions/Teacher/AdjustByTeacherActions';

import AdjustByTeacherModal from './AdjustByTeacherModal';

import ComPageRefresh from "../../actions/ComPageRefresh";

/*
import ScheduleDetailModal from "../../component/ScheduleDetailModal";

import ChangeTimeModal from "../../component/ChangeTimeModal";

import AdjustClassRoomModal from "../../component/AdjustClassRoomModal";

import ReplaceScheduleModal from "../../component/ReplaceScheduleModal";
*/

import AddTempScheduleModal from './AddTempScheduleModal';

import $ from "jquery";

import SDActions from "../../actions/ScheduleDetailActions";


class TeacherPersonalSchedule extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

        dispatch(ComPageRefresh.ComPageInit(TeacherIndexActions.TeacherPersonalInit()));

    }

    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        dispatch({type:TPActions.TP_NOW_WEEK_CHANGE,data:e.value});

        dispatch(TPActions.TPSUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,Teacher} = this.props;

        const {NowWeekNo} = Teacher.PersonalSchedule;

        dispatch({type:TPActions.TP_NOW_WEEK_CHANGE,data:(NowWeekNo+1)});

        dispatch(TPActions.TPSUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,Teacher} = this.props;

        const {NowWeekNo} = Teacher.PersonalSchedule;

        dispatch({type:TPActions.TP_NOW_WEEK_CHANGE,data:(NowWeekNo-1)});

        dispatch(TPActions.TPSUpdate());

    }

    AdjustScheduleShow(){

        const { dispatch } = this.props;

        dispatch({type:AdjustByTeacherActions.ADJUST_BY_TEACHER_SHOW});

        dispatch(AdjustByTeacherActions.AdjustByTeacherScheduleInit());

    }

    //导入课表

    Import(){

        window.open('/html/schedule/#/Import');

    }

    //添加临时课程弹窗
    AddTempScheduleShow(){

        const { dispatch } = this.props;

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_SHOW});

        $('.add-schedule-modal-wrapper .dropdown_list_ul3').hide();

        $('.add-schedule-modal-wrapper .dropdown_item1_name').removeClass('slide');

        $('.add-schedule-modal-wrapper .dropdown_item3_li').removeClass('active');


        dispatch(ATSMActions.InfoInit());

    }



    //弹出课程详情弹窗

    ScheduleDetailShow(Params){

        const { dispatch,Teacher } = this.props;

        /*dispatch(TPActions.ScheduleDetailShow(Params));*/

        const { PersonalSchedule,SubjectCourseGradeClassRoom } = Teacher;

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = SubjectCourseGradeClassRoom;

        const WeekNO = PersonalSchedule.NowWeekNo;

        dispatch({type:SDActions.COMPONENT_SCHEDULE_DETAIL_MODAL_PARAMS_UPDATE,data:{ItemClassHour,ItemClassHourCount,NowClassHourNO,WeekNO,CanOperate:true}});

        dispatch(SDActions.ScheduleDetailShow(Params));

    }


 /*   //停课

    StopSchedule(params){

        const { dispatch } = this.props;

        dispatch(TPActions.StopSchedule(params));

    }

    //恢复上课
    RebackStopSchedule(params){

        const { dispatch } = this.props;

        dispatch(TPActions.RebackStopSchedule(params));

    }

    //关闭弹窗

    ScheduleDetailClose(){

        const { dispatch } = this.props;

        dispatch({type:TPActions.TEACHER_TP_SCHEDULE_DETAIL_MODAL_HIDE});

        /!*ComPageRefresh.ComPageUpdate(dispatch);*!/

        dispatch(TPActions.TPSUpdate());

    }

    //调整时间弹窗

    ChangeTimeShow(params){

        const { dispatch } = this.props;

        dispatch(TPActions.ChangeTimeShow(params));

    }

    //调整时间弹窗点击某一个课时

    SelectClassHour(params){

        const { dispatch } = this.props;

        dispatch(TPActions.SelectClassHour(params));

    }


    //调整时间弹窗切换周次

    WeekPick(WeekNO){

        const { dispatch } = this.props;

        dispatch(TPActions.WeekPick(WeekNO));

    }

    //调整时间弹窗关闭

    CloseChangeTime(){

        const { dispatch } = this.props;

        dispatch({type:TPActions.TEACHER_TP_CHANGE_TIME_MODAL_HIDE});

    }

    //点击调整时间弹窗确定
    ChangeTimeCommit(){

        const { dispatch } = this.props;

        dispatch(TPActions.ChangeTimeCommit());

    }

    //撤销调整时间
    RebackTime(params){

        const { dispatch } = this.props;

        dispatch(TPActions.RebackTime(params));

    }

    //调整教室弹窗
    AdjustClassRoomShow(params){

        const { dispatch } = this.props;

        dispatch(TPActions.AdjustClassRoomShow(params));

    }

    //调整教室弹窗切换选中教室事件

    ChangeClassRoomPick(e){

        const { dispatch } = this.props;

        dispatch({type:TPActions.TEACHER_TP_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE,data:e.target.value});

    }

    //调整教室教室类型切换

    ChangeClassRoomType(key){

        const { dispatch } = this.props;

        dispatch({type:TPActions.TEACHER_TP_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE,data:key});

    }

    //调整教室搜索值变化

    SearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:TPActions.TEACHER_TP_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,data:e.target.value});


    }

    //点击教室搜索

    ClassRoomSearchClick(SearchValue){

        const { dispatch } = this.props;

        dispatch(TPActions.ClassRoomSearchClick(SearchValue))

    }

    //取消搜索教室

    ClassRoomSearchCancel(){

        const { dispatch } = this.props;

        dispatch({type:TPActions.TEACHER_TP_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE});

        dispatch({type:TPActions.TEACHER_TP_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE});

        dispatch({type:TPActions.TEACHER_TP_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,data:''});

    }


    //关闭调整教室弹窗

    CloseAdjustClassRoom(){

        const { dispatch } = this.props;

        dispatch({type:TPActions.TEACHER_TP_ADJUST_CLASSROOM_MODAL_HIDE});

    }

    //调整教室弹窗提交
    AdjustClassRoomCommit(){

        const { dispatch } = this.props;

        dispatch(TPActions.AdjustClassRoomCommit());

    }

    //撤销教室调整

    RebackClassRoom(params){

        const { dispatch } = this.props;

        dispatch(TPActions.RebackClassRoom(params));

    }

    //找人代课弹窗出现

    ChooseReplaceTeacherShow(params){

        const { dispatch } = this.props;

        dispatch(TPActions.ChooseReplaceTeacherShow(params));

    }

    //找人代课教师选择

    ReplaceTeacherPick(ID){

        const { dispatch } = this.props;

        dispatch({type:TPActions.TEACHER_TP_REPLACE_SCHEDULE_MODAL_TEACHER_PICK,data:ID});

    }

    //找人代课输入框改变

    ReplaceSearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:TPActions.TEACHER_TP_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,data:e.target.value});

    }

    //点击代课教师搜索

    ReplaceSearchClick(SearchValue){

        const { dispatch } = this.props;

        dispatch(TPActions.ReplaceSearchClick(SearchValue));

    }

    //取消搜索教师

    ReplaceSearchCancel(){

        const { dispatch } = this.props;

        dispatch({type:TPActions.TEACHER_TP_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE});

        dispatch({type:TPActions.TEACHER_TP_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE});

        dispatch({type:TPActions.TEACHER_TP_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,data:''});

    }

    //关闭找人代课弹窗

    ReplaceScheduleClose(){

        const { dispatch } = this.props;

        dispatch({type:TPActions.TEACHER_TP_REPLACE_SCHEDULE_MODAL_HIDE});

    }

    //找人代课弹窗提交
    ReplaceScheduleCommit(){

        const { dispatch } = this.props;

        dispatch(TPActions.ReplaceScheduleCommit());

    }

    //找人代课撤销

    RebackReplaceSchedule(params){

        const { dispatch } = this.props;

        dispatch(TPActions.RebackReplaceSchedule(params));

    }*/





    render() {

        const { Teacher,PeriodWeekTerm } = this.props;

        const { PersonalSchedule,SubjectCourseGradeClassRoom,Power } = Teacher;

        const {ScheduleDetail,ChangeTime,AdjustClassRoom,ReplaceSchedule} = PersonalSchedule;


        let ItemWeek = [];
        //封装获取到的周次
        if (PeriodWeekTerm.ItemWeek) {

            ItemWeek = PeriodWeekTerm.ItemWeek.map((item) => {

                return {value:item.WeekNO,title:item.WeekNO};

            });

        }

        return (

            <div className="teacher-mine-wrapper">

                {

                    Power.Adjust||Power.AddImport?

                        <TopButtons

                            AdjustScheduleShow={this.AdjustScheduleShow.bind(this)}

                            Import={this.Import.bind(this)}

                            AddTempScheduleShow={this.AddTempScheduleShow.bind(this)}

                            Power={Power}>


                        </TopButtons>

                        :''

                }

                <TermPick

                    ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                    NowWeekNo={PersonalSchedule.NowWeekNo}

                    ItemWeek ={ItemWeek}

                    weekPickEvent = {this.weekPickEvent.bind(this)}

                    weekNextEvent = {this.weekNextEvent.bind(this)}

                    weekPrevEvent = {this.weekPrevEvent.bind(this)}
                    
                    WeekNO={PeriodWeekTerm.WeekNO?PeriodWeekTerm.WeekNO:''}
                    
                    >

                </TermPick>

                <Loading tip="请稍后..." spinning={PersonalSchedule.loadingShow}>

                    <SingleDoubleTable
                        topHeight = {64}
                        commonHeight = {90}
                        commonWidth={128}
                        leftOneWidth ={52}
                        leftTwoWidth = {136}
                        ItemClassHourCount={SubjectCourseGradeClassRoom.ItemClassHourCount}
                        ItemClassHour={SubjectCourseGradeClassRoom.ItemClassHour}
                        ItemWeek = {PeriodWeekTerm.ItemWeek}
                        NowWeekNo={PersonalSchedule.NowWeekNo}
                        schedule={PersonalSchedule.schedule}
                        NowDate = {PeriodWeekTerm.NowDate}
                        ScheduleDetailShow={this.ScheduleDetailShow.bind(this)}>

                    </SingleDoubleTable>

                </Loading>

                <AdjustByTeacherModal></AdjustByTeacherModal>

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

                    CanOperate={Power.Adjust}

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

                <AddTempScheduleModal>

                </AddTempScheduleModal>

            </div>

        );

    }

}

const mapStateToProps = (state) => {

    const { Teacher,PeriodWeekTerm } = state;

    return {

        Teacher,

        PeriodWeekTerm

    };

};

export default connect(mapStateToProps)(TeacherPersonalSchedule);