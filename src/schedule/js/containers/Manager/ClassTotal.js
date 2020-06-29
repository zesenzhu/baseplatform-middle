import React,{Component} from 'react';

import { connect } from 'react-redux';

import {DropDown, Empty, Loading} from "../../../../common";

import ManagerIndexActions from "../../actions/Manager/ManagerIndexActions";

import CTActions from '../../actions/Manager/ClassTotalActions';

import ComPageRefresh from '../../actions/ComPageRefresh';

import TermPick from "../../component/TermPick";

import $ from "jquery";

import DoubleSingleTable from "../../component/DoubleSingleTable";

import SDActions from "../../actions/ScheduleDetailActions";

import {CSSTransition} from 'react-transition-group';





class ClassTotal extends Component{

    constructor(props){

        super(props);

        this.state = {

            fullScreen:false

        };

        const {dispatch} = this.props;

        dispatch(ComPageRefresh.ComPageInit(ManagerIndexActions.ClassTotalInit()));

    }


    //年级下拉改变

    GradeChange(e){

        const {dispatch} = this.props;

        let data = {};

        if (e.value!=="none"){

            data = {value:e.value,title:e.title};

        }

        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_GRADE_SELECT_CHANGE,data:data});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(CTActions.ClassTotalPageUpdate());

    }

    //选择某一周次
    weekPickEvent(e){

        const {dispatch} = this.props;

        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_WEEK_CHANGE,data:e.value});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(CTActions.ClassTotalPageUpdate());

    }

    //选择下一周次
    weekNextEvent(){

        const {dispatch,ClassTotal} = this.props;

        const {WeekNO} = ClassTotal;

        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_WEEK_CHANGE,data:(WeekNO+1)});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(CTActions.ClassTotalPageUpdate());

    }

    //选择上一周次
    weekPrevEvent(){

        const {dispatch,ClassTotal} = this.props;

        const {WeekNO} = ClassTotal;

        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_WEEK_CHANGE,data:(WeekNO-1)});;

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(CTActions.ClassTotalPageUpdate());

    }

    //滚动到底部

    scrollToBottom(e){

        const {dispatch,ClassTotal} = this.props;

        const { ClassCount,PageIndex } = ClassTotal;

        if (PageIndex < Math.ceil(ClassCount/10)){

            dispatch(CTActions.ClassTotalPageUpdate({nextPage:true}));

        }

        /* else if (Math.ceil(ClassCount/10)>0){

            message.info('已经是最后一页了！',0.2);

            message.config({maxCount:1,top:200});

        } */

    }

    //表格点击某一行
    clickRow(record){

        const { ClassTotal,dispatch } = this.props;

        const { Schedule } = ClassTotal;

        let rID  = record.id;

        Schedule.map((item,key)=>{

            if (item.id === rID){

                Schedule[key]['active'] = true;

            }else{

                Schedule[key]['active'] = false;

            }

        });

        dispatch({type:CTActions.MANAGER_CLASS_TOTAL_SCHEDULE_UPDATE,data:Schedule});

    }


    //弹出课程详情弹窗

    ScheduleDetailShow(Params){

        const { dispatch,SubjectCourseGradeClassRoom,ClassTotal } = this.props;

        /*dispatch(CTActions.ScheduleDetailShow(Params));*/

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = SubjectCourseGradeClassRoom;

        const {WeekNO,ScheduleList} = ClassTotal;

        const { ClassID } = Params;

        let FindPage = 1;

        ScheduleList.map((item,key)=>{

            let FindIndex = item.findIndex(i=>i.id===ClassID);

            if(FindIndex>=0){

                FindPage = key+1

            }

        });

        dispatch({type:SDActions.COMPONENT_SCHEDULE_DETAIL_MODAL_PARAMS_UPDATE,data:{ItemClassHour,ItemClassHourCount,NowClassHourNO,WeekNO,PageIndex:FindPage}});

        dispatch(SDActions.ScheduleDetailShow(Params));

    }


    //点击全屏按钮

    FullScreenClick(e) {

        this.setState({fullScreen: !this.state.fullScreen}, () => {

            if (this.state.fullScreen) {

                document.body.style.overflowY = "hidden";

            } else {

                document.body.style.overflowY = "scroll";

            }

        });

    }


    render(){


        const { PeriodWeekTerm,SubjectCourseGradeClassRoom,ClassTotal } = this.props;

        const { ScheduleDetail,ChangeTime,AdjustClassRoom,ReplaceSchedule } = ClassTotal;



        return(

            <CSSTransition in={this.state.fullScreen} timeout={200} classNames={"full-screen"}>

                <div className={`class-total-content`}>

                    <div className="full-screen-btn" onClick={this.FullScreenClick.bind(this)}>{this.state.fullScreen?'退出全屏':'全屏'}</div>

                    <Loading spinning={ClassTotal.LoadingShow} tip="正在为您查找，请稍后...">

                        <DropDown

                            dropSelectd={ClassTotal.GradeDropSelectd}

                            dropList={ClassTotal.GradeDropList}

                            style={{zIndex:5}}

                            height={200}

                            onChange={this.GradeChange.bind(this)}>

                        </DropDown>

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

                        <div className="double-single-table-wrapper">

                             {

                                ClassTotal.Schedule.length>0?

                                    <DoubleSingleTable
                                        ItemClassHourCount={SubjectCourseGradeClassRoom.ItemClassHourCount}
                                        ItemClassHour={SubjectCourseGradeClassRoom.ItemClassHour}
                                        ItemWeek = {PeriodWeekTerm.ItemWeek}
                                        NowWeekNo={PeriodWeekTerm.NowWeekNo}
                                        leftColWidth={136}
                                        commonColWidth={128}
                                        rowOneHeight={46}
                                        rowTowHeight={64}
                                        commonRowHeight={90}
                                        schedule={ClassTotal.Schedule}
                                        onClickRow={(record) => this.clickRow.bind(this,record)}
                                        scrollToBottom={this.scrollToBottom.bind(this)}
                                        ScheduleDetailShow={this.ScheduleDetailShow.bind(this)}
                                    >

                                    </DoubleSingleTable>

                                    :

                                    <Empty type="3" title="暂无班级课表数据"></Empty>

                             }


                        </div>

                    </Loading>

                </div>

            </CSSTransition>

        )

    }


}

const  mapStateToProps = (state) => {

    let { PeriodWeekTerm,Manager } = state;

    let { ClassTotal,SubjectCourseGradeClassRoom } = Manager;

    return {

        PeriodWeekTerm,ClassTotal,SubjectCourseGradeClassRoom

    }

};

export default connect(mapStateToProps)(ClassTotal);