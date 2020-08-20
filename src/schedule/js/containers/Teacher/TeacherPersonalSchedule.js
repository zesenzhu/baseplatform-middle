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

import AddTempScheduleModal from './AddTempScheduleModal';

import $ from "jquery";

import SDActions from "../../actions/ScheduleDetailActions";
import {getQueryVariable} from "../../../../common/js/disconnect";


class TeacherPersonalSchedule extends Component{

    constructor(props) {

        super(props);

        const {dispatch} = props;

        dispatch(ComPageRefresh.ComPageInit(TeacherIndexActions.TeacherPersonalInit()));

        this.state={

            isWorkPlantform:false

        }

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


    componentDidMount(){

        if (getQueryVariable('isWorkPlantform')){

            this.setState({isWorkPlantform:true});

        }

    }


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

            <div className={`teacher-mine-wrapper ${this.state.isWorkPlantform?'work-plant-form':''}`}>

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