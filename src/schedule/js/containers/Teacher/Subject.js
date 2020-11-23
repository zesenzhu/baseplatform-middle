import React,{Component} from 'react';

import WeekDayPick from "../../component/WeekDayPick";

import STSAction from "../../actions/Teacher/SubjectTeacherSubjectActions";

import {connect} from 'react-redux';

import TeacherIndexActions from "../../actions/Teacher/TeacherIndexActions";

import {DropDown, Empty, Loading} from "../../../../common";

import DoubleSingleTable from "../../component/DoubleSingleTable";

import SelfDoubleSingleTable from "../../component/selfDoubleSingleTable";

import $ from 'jquery';

import ComPageRefresh from "../../actions/ComPageRefresh";


import SDActions from "../../actions/ScheduleDetailActions";

import {CSSTransition} from 'react-transition-group';



class Subject extends Component{

    constructor(props) {

        super(props);

        this.state = {

            fullScreen:false

        };

        const {PeriodWeekTerm,dispatch} = this.props;

        dispatch(ComPageRefresh.ComPageInit(TeacherIndexActions.STSPageInit()));

    }

    //选择某一周次
    weekDateChange(date,week,weekDay){

        const {dispatch} = this.props;

        dispatch({type:STSAction.TEACHER_STS_NOW_WEEK_NO_CHANGE,data:week});

        dispatch({type:STSAction.TEACHER_STS_NOW_WEEK_DAY_CHANGE,data:weekDay});

        dispatch({type:STSAction.TEACHER_STS_NOW_CLASS_DATE_CHANGE,data:date});

        // $('#tb').find('div.ant-table-body').scrollTop(0);

        if (this.tableRef){

            this.tableRef.scrollToTop();

        }

        dispatch(STSAction.STSPageUpdate());

    }


    //滚动到底部

    scrollToBottom(e){

        if (this.tableRef){

            const top = this.tableRef.getScrollTop();

            this.tableRef.scrollTop(top-1);

        }

        const {dispatch,Teacher} = this.props;

        let { TeacherCount,pageIndex } = Teacher.SubjectTeacherSubjectSchedule;

        if (pageIndex < Math.ceil(TeacherCount/10)){

            dispatch(STSAction.STSPageUpdate({nextPage:true}));

        }

    }

    //表格点击某一行
    clickRow(record){

        const { Teacher,dispatch } = this.props;

        const { schedule } = Teacher.SubjectTeacherSubjectSchedule;

        let rID  = record.id;

        schedule.map((item,key)=>{

            if (item.id === rID){

                schedule[key]['active'] = true;

            }else{

                schedule[key]['active'] = false;

            }

        });

        dispatch({type:STSAction.SUBJECT_TEACHER_SCHEDULE_UPDATE,data:schedule});

    }

    //切换不同的学科

    subjectChange(e){

        const { dispatch } = this.props;

        dispatch({type:STSAction.TEACHER_STS_SUBJECT_DROP_CHANGE,data:e});

	    if (this.tableRef){

		    this.tableRef.scrollToTop();

	    }

        dispatch(STSAction.STSPageUpdate())

    }


    //弹出课程详情弹窗

    ScheduleDetailShow(Params){

        const { dispatch,Teacher } = this.props;

        /*dispatch(STSAction.ScheduleDetailShow(Params));*/

        const { SubjectTeacherSubjectSchedule,SubjectCourseGradeClassRoom } = Teacher;

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = SubjectCourseGradeClassRoom;

        const WeekNO = SubjectTeacherSubjectSchedule.NowWeekNO;

        dispatch({type:SDActions.COMPONENT_SCHEDULE_DETAIL_MODAL_PARAMS_UPDATE,data:{ItemClassHour,ItemClassHourCount,NowClassHourNO,WeekNO,CanOperate:false}});

        dispatch(SDActions.ScheduleDetailShow(Params));

    }


    //点击全屏按钮

    /*FullScreenClick(e){

        this.setState({fullScreen:!this.state.fullScreen},()=>{

            if (this.state.fullScreen){

                document.body.style.overflowY="hidden";

            }else{

                document.body.style.overflowY="scroll";

            }

        });

    }*/


    render() {

        const { PeriodWeekTerm,Teacher } = this.props;

        const { SubjectTeacherSubjectSchedule,SubjectCourseGradeClassRoom  } = Teacher;

        const {SubjectSelectd,SubjectDropList,SubjectDropShow,SubjectTitleName,ScheduleDetail,ChangeTime,AdjustClassRoom,ReplaceSchedule} = SubjectTeacherSubjectSchedule;


        let ItemWeek = [];
        //封装获取到的周次
        if (PeriodWeekTerm.ItemWeek) {

            ItemWeek = PeriodWeekTerm.ItemWeek.map((item) => {

                return {value:item.WeekNO,title:item.WeekNO};

            });

        }



        return (

                <div className={`subject-teacher-subject-content`}>

                    <Loading spinning={SubjectTeacherSubjectSchedule.loadingShow} tip="正在为您查找，请稍后...">

                        {

                            SubjectDropShow?

                                <DropDown

                                    dropSelectd={SubjectSelectd}

                                    dropList={SubjectDropList}

                                    style={{zIndex:5}}

                                    height={200}

                                    onChange={this.subjectChange.bind(this)}>

                                </DropDown>

                                :

                                <div className="subject-title-name">{SubjectTitleName}学科</div>

                        }

                        <WeekDayPick

                            WeekList={ItemWeek}

                            NowWeekNO={SubjectTeacherSubjectSchedule.NowWeekNO}

                            NowWeekDay={SubjectTeacherSubjectSchedule.NowWeekDay}

                            NowClassDate={SubjectTeacherSubjectSchedule.NowClassDate}

                            weekDateChange={this.weekDateChange.bind(this)}

                            OriginWeekList={PeriodWeekTerm.ItemWeek}

                        >



                        </WeekDayPick>

                        {

                            SubjectTeacherSubjectSchedule.schedule.length>0?

                                <SelfDoubleSingleTable
                                    ref={ref=>this.tableRef=ref}
                                    ItemClassHour={SubjectCourseGradeClassRoom.ItemClassHour}
                                    schedule={SubjectTeacherSubjectSchedule.schedule}
                                    scrollToBottom={this.scrollToBottom.bind(this)}
                                    ScheduleDetailShow={this.ScheduleDetailShow.bind(this)}>

                                </SelfDoubleSingleTable>

                                :

                                <Empty type="3" title="暂无学科教师课表数据"></Empty>

                        }

                    </Loading>

                </div>

        );

    }

}

const mapStateToProps = (state) => {

  const { PeriodWeekTerm,Teacher } = state;

  return{

      PeriodWeekTerm,

      Teacher

  }

};

export default connect(mapStateToProps)(Subject);