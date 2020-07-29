import React,{Component} from 'react';

import {DropDown,Loading,Empty} from "../../../../common";

import STSAction from '../../actions/Manager/SubjectTeacherScheduleActions';

import ManagerIndexActions from '../../actions/Manager/ManagerIndexActions';

import SDActions from '../../actions/ScheduleDetailActions';

import ComPageRefresh from '../../actions/ComPageRefresh';

import DoubleSingleTable from '../../component/DoubleSingleTable';

import $ from 'jquery';

import {connect} from 'react-redux';

import {CSSTransition} from 'react-transition-group';

import WeekDayPick from '../../component/WeekDayPick';



class Subject extends Component{

    constructor(props) {

        super(props);

        this.state = {

            fullScreen:false

        };

        const {PeriodWeekTerm,dispatch} = this.props;

        dispatch(ComPageRefresh.ComPageInit(ManagerIndexActions.STSPageInit()));

    }
    //选择不同的学科
    subjectChange(e){

        const {dispatch} = this.props;

        let data = {};

        if (e.value!==0){

            data = {value:e.value,title:e.title};

        }

        dispatch({type:STSAction.STS_SUBJECT_CHANGE,data:data});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(STSAction.STSPageUpdate());

    }


    //选择上一周次
    weekDateChange(date,week,weekDay){

        const {dispatch,Manager} = this.props;

        dispatch({type:STSAction.MANAGER_STS_NOW_WEEK_NO_CHANGE,data:week});

        dispatch({type:STSAction.MANAGER_STS_NOW_WEEK_DAY_CHANGE,data:weekDay});

        dispatch({type:STSAction.MANAGER_STS_NOW_CLASS_DATE_CHANGE,data:date});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(STSAction.STSPageUpdate());

    }
    //滚动到底部

    scrollToBottom(e){

        const {dispatch,Manager} = this.props;

        const { pageIndex,TeacherCount } = Manager.SubjectTeacherSchedule;

        console.log(123);

        if (pageIndex < Math.ceil(TeacherCount/10) ){

            dispatch(STSAction.STSPageUpdate({nextPage:true}));

        }

    }

    //表格点击某一行
    clickRow(record){

        const { Manager,dispatch } = this.props;

        const { schedule } = Manager.SubjectTeacherSchedule;

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

    //弹出课程详情弹窗

    ScheduleDetailShow(Params){

        const { dispatch,Manager } = this.props;


        //旧代码
        //dispatch(STSAction.ScheduleDetailShow(Params));

        const { TeacherID } = Params;

        const { ScheduleList } = Manager.SubjectTeacherSchedule;

        let FindPage = 1;

        ScheduleList.map((item,key)=>{

            let FindIndex = item.findIndex(i=>i.id===TeacherID);

            if(FindIndex>=0){

                FindPage = key+1

            }

        });

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = Manager.SubjectCourseGradeClassRoom;

        const WeekNO = Manager.SubjectTeacherSchedule.NowWeekNO;

        dispatch({type:SDActions.COMPONENT_SCHEDULE_DETAIL_MODAL_PARAMS_UPDATE,data:{ItemClassHour,ItemClassHourCount,NowClassHourNO,WeekNO,PageIndex:FindPage}});

        dispatch(SDActions.ScheduleDetailShow(Params));


    }

    //点击全屏按钮
    FullScreenClick(e){

        this.setState({fullScreen:!this.state.fullScreen},()=>{

            if (this.state.fullScreen){

                document.body.style.overflowY="hidden";

            }else{

                document.body.style.overflowY="scroll";

            }

        });

    }


    render() {

        const {Manager,PeriodWeekTerm} = this.props;

        const {SubjectCourseGradeClassRoom,SubjectTeacherSchedule} = Manager;

        const { ScheduleDetail,ChangeTime,AdjustClassRoom,ReplaceSchedule } = SubjectTeacherSchedule;



        let dropList = [];
        //封装获取到的学科列表
        if (SubjectCourseGradeClassRoom.ItemSubject&&SubjectCourseGradeClassRoom.ItemSubject.length>0){

            dropList = SubjectCourseGradeClassRoom.ItemSubject.map((item) => {

               return {

                            value:item.SubjectID,

                            title:item.SubjectName

                       }

            });

        }

        dropList.unshift({value:'',title:"全部学科"});


        let ItemWeek = [];
        //封装获取到的周次
        if (PeriodWeekTerm.ItemWeek) {

            ItemWeek = PeriodWeekTerm.ItemWeek.map((item) => {

               return {value:item.WeekNO,title:item.WeekNO};

            });

        }

        return (

            <CSSTransition in={this.state.fullScreen} timeout={200} classNames={"full-screen"}>

                <div className={`subject-teacher-subject-content ${this.state.fullScreen?'full-screen-doing':''}`}>

                <div className="full-screen-btn" onClick={this.FullScreenClick.bind(this)}>{this.state.fullScreen?'退出全屏':'全屏'}</div>

                    <Loading spinning={SubjectTeacherSchedule.loadingShow} tip="正在为您查找，请稍后...">

                        <DropDown

                            dropSelectd={SubjectTeacherSchedule.ItemSubjectSelect}

                            dropList={dropList}

                            style={{zIndex:5}}

                            height={200}

                            onChange={this.subjectChange.bind(this)}>

                        </DropDown>

                        <WeekDayPick

                            NowWeekNO={SubjectTeacherSchedule.NowWeekNO}

                            NowWeekDay={SubjectTeacherSchedule.NowWeekDay}

                            NowClassDate={SubjectTeacherSchedule.NowClassDate}

                            WeekList={ItemWeek}

                            weekDateChange={this.weekDateChange.bind(this)}

                        >

                        </WeekDayPick>

                        <div className="double-single-table-wrapper">




                            {

                                SubjectTeacherSchedule.schedule.length>0?

                                    <DoubleSingleTable
                                        ItemClassHourCount={SubjectCourseGradeClassRoom.ItemClassHourCount}
                                        ItemClassHour={SubjectCourseGradeClassRoom.ItemClassHour}
                                        ItemWeek = {PeriodWeekTerm.ItemWeek}
                                        NowWeekNo={PeriodWeekTerm.NowWeekNo}
                                        leftColWidth={136}
                                        commonColWidth={128}
                                        rowOneHeight={32}
                                        rowTowHeight={52}
                                        commonRowHeight={90}
                                        schedule={SubjectTeacherSchedule.schedule}
                                        scheduleCount={SubjectTeacherSchedule.TeacherCount}
                                        schedulePageIndex={SubjectTeacherSchedule.pageIndex}
                                        schedulePageSize={10}
                                        onClickRow={(record) => this.clickRow.bind(this,record)}
                                        scrollToBottom={this.scrollToBottom.bind(this)}
                                        ScheduleDetailShow={this.ScheduleDetailShow.bind(this)}>

                                    </DoubleSingleTable>

                                    :

                                    <Empty type="3" title="暂无学科教师课表数据"></Empty>

                            }





                        </div>

                    </Loading>



                </div>

            </CSSTransition>

        );

    }

}

const mapStateToProps = (state) =>{

    const { Manager,PeriodWeekTerm } = state;

    return{

        Manager,

        PeriodWeekTerm

    }

};

export default connect(mapStateToProps)(Subject);