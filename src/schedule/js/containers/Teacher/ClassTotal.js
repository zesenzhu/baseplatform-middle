import React,{Component} from 'react';

import { connect } from 'react-redux';

import {Loading,DropDown,Empty} from "../../../../common";

import TeacherIndexActions from "../../actions/Teacher/TeacherIndexActions";

import CTActions from '../../actions/Teacher/ClassTotalActions';

import ComPageRefresh from '../../actions/ComPageRefresh';

import TermPick from "../../component/TermPick";

import SingleDoubleTable from "../../component/SingleDoubleTable";

import OptionalClassModal from "../../component/OptionalClassModal";

import SDActions from "../../actions/ScheduleDetailActions";


class ClassTotal extends Component{


    constructor(props){

        super(props);

        const {dispatch} = this.props;

        dispatch(ComPageRefresh.ComPageInit(TeacherIndexActions.ClassTotalInit()));

    }

    //班级下拉改变

    ClassChange(e){

        const { dispatch } = this.props;

        let data = {value:e.value,title:e.title};

        dispatch({type:CTActions.TEACHER_CLASS_TOTAL_CLASS_DROP_CHANGE,data:data});

        dispatch(CTActions.ClassTotalClassDropChange());

    }

    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        dispatch({type:CTActions.TEACHER_CLASS_TOTAL_WEEK_CHANGE,data:e.value});

        dispatch(CTActions.ClassTotalPageUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,ClassTotal} = this.props;

        const {WeekNO} = ClassTotal;

        dispatch({type:CTActions.TEACHER_CLASS_TOTAL_WEEK_CHANGE,data:(WeekNO+1)});

        dispatch(CTActions.ClassTotalPageUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,ClassTotal} = this.props;

        const {WeekNO} = ClassTotal;

        dispatch({type:CTActions.TEACHER_CLASS_TOTAL_WEEK_CHANGE,data:(WeekNO-1)});

        dispatch(CTActions.ClassTotalPageUpdate());

    }

    //走班详情弹窗打开

    OptionalClassShow({ClassID,ClassHourNO,WeekDay}){

        const { dispatch,ClassTotal } = this.props;

        let {WeekNO } = ClassTotal;

        dispatch(CTActions.OptionalClassInit({ClassHourNO,WeekDay,ClassID,WeekNO}));

    }

    //走班详情弹窗关闭

    OptionalClassModalClose(){

        const { dispatch } = this.props;

        dispatch({type:CTActions.TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_MODAL_HIDE});


    }


    //走班详情页码变化
    OptionalClassPageChange(e){

        const { dispatch } = this.props;

        dispatch({type:CTActions.TEACHER_CLASS_TOTAL_OPTIONAL_CLASS_PAGE_CHANGE,data:e});

    }


    //弹出课程详情弹窗

    ScheduleDetailShow(Params){

        const { dispatch,ClassTotal } = this.props;

        /*dispatch(CTActions.ScheduleDetailShow(Params));*/

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO,WeekNO } = ClassTotal;

        dispatch({type:SDActions.COMPONENT_SCHEDULE_DETAIL_MODAL_PARAMS_UPDATE,data:{ItemClassHour,ItemClassHourCount,NowClassHourNO,WeekNO,CanOperate:false}});

        dispatch(SDActions.ScheduleDetailShow(Params));


    }


    render(){

        const { PeriodWeekTerm,ClassTotal } = this.props;

        const { ScheduleDetail,ChangeTime,AdjustClassRoom,ReplaceSchedule } = ClassTotal;


        return <div className="class-total-content teacher-class-total">

            <Loading spinning={ClassTotal.LoadingShow} tip="正在为您查找，请稍后...">

                {

                    ClassTotal.ClassEmpty?

                        <Empty className="empty-class" type="4" title="您在该学段下没有行政班"></Empty>

                        :

                        <React.Fragment>

                            {

                                ClassTotal.ClassDropShow?

                                    <DropDown

                                        dropSelectd={ClassTotal.ClassDropSelectd}

                                        dropList={ClassTotal.ClassDropList}

                                        style={{zIndex:5}}

                                        height={200}

                                        onChange={this.ClassChange.bind(this)}>

                                    </DropDown>

                                    :

                                    <div className={`class-name ${ClassTotal.ClassName===''?'unset':''}`}>{ClassTotal.ClassName?ClassTotal.ClassName:'您未有授课班级'}</div>

                            }

                            <TermPick

                                ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                                NowWeekNo={ClassTotal.WeekNO}

                                ItemWeek ={ClassTotal.WeekList}

                                weekPickEvent = {this.weekPickEvent.bind(this)}

                                weekNextEvent = {this.weekNextEvent.bind(this)}

                                weekPrevEvent = {this.weekPrevEvent.bind(this)}
                            
                                WeekNO={PeriodWeekTerm.WeekNO?PeriodWeekTerm.WeekNO:''}
                            
                            >

                            </TermPick>

                            <div className="single-double-table-wrapper" style={{marginTop:20}}>

                                <SingleDoubleTable
                                    topHeight = {64}
                                    commonHeight = {90}
                                    commonWidth={136}
                                    leftOneWidth ={56}
                                    leftTwoWidth = {136}
                                    ItemClassHourCount={ClassTotal.ItemClassHourCount}
                                    ItemClassHour={ClassTotal.ItemClassHour}
                                    ItemWeek = {PeriodWeekTerm.ItemWeek}
                                    NowWeekNo={ClassTotal.WeekNO}
                                    schedule={ClassTotal.Schedule}
                                    NowDate={PeriodWeekTerm.NowDate}
                                    OptionalClassShow={this.OptionalClassShow.bind(this)}
                                    ScheduleDetailShow={this.ScheduleDetailShow.bind(this)}>

                                </SingleDoubleTable>

                            </div>

                        </React.Fragment>

                }

            </Loading>

            <OptionalClassModal
                Show={ClassTotal.OptionalClassShow}
                LoadingShow={ClassTotal.OptionalClassLoading}
                DataSource={ClassTotal.OptionalClassData}
                Close={this.OptionalClassModalClose.bind(this)}
                PageChange={this.OptionalClassPageChange.bind(this)}
                CurrentPage={ClassTotal.OptionalClassCurrentPage}>



            </OptionalClassModal>

        </div>

    }

}

const  mapStateToProps = (state) => {

    let { PeriodWeekTerm,Teacher } = state;

    let { ClassTotal,SubjectCourseGradeClassRoom } = Teacher;

    return {

        PeriodWeekTerm,ClassTotal,SubjectCourseGradeClassRoom

    }

};

export default connect(mapStateToProps)(ClassTotal);