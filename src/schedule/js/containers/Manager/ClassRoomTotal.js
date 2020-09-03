import React,{Component} from 'react';

import { connect } from 'react-redux';

import {DropDown, Empty, Loading} from "../../../../common";


import ManagerIndexActions from "../../actions/Manager/ManagerIndexActions";

import CRTActions from '../../actions/Manager/ClassRoomTotalActions';

import $ from "jquery";

import SelfDoubleSingleTable from "../../component/selfDoubleSingleTable";

import ComPageRefresh from "../../actions/ComPageRefresh";

import SDActions from "../../actions/ScheduleDetailActions";

import {CSSTransition} from 'react-transition-group';

import WeekDayPick from "../../component/WeekDayPick";




class ClassRoomTotal extends Component{

    constructor(props){

        super(props);

        this.state = {

            fullScreen:false

        };

        const {dispatch} = props;

        dispatch(ComPageRefresh.ComPageInit(ManagerIndexActions.ClassRoomTotalInit()));

    }


    //年级下拉改变

    RoomTypeChange(e){
        
        const {dispatch} = this.props;

        let data = {};

        if (e.value!=="none"){

            data = {value:e.value,title:e.title};

        }

        dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_ROOMTYPE_SELECT_CHANGE,data:data});

        $('#tb').find('div.ant-table-body').scrollTop(0);

        dispatch(CRTActions.ClassTotalPageUpdate());

    }

    //选择某一周次
    weekDateChange(date,week,weekDay){

        const {dispatch} = this.props;

        dispatch({type:CRTActions.MANAGER_CRT_NOW_WEEK_NO_CHANGE,data:week});

        dispatch({type:CRTActions.MANAGER_CRT_NOW_WEEK_DAY_CHANGE,data:weekDay});

        dispatch({type:CRTActions.MANAGER_CRT_NOW_CLASS_DATE_CHANGE,data:date});

        // $('#tb').find('div.ant-table-body').scrollTop(0);

        this.tableRef.scrollToTop();

        dispatch(CRTActions.ClassTotalPageUpdate());

    }


    //滚动到底部

    scrollToBottom(e){

        const {dispatch,ClassRoomTotal} = this.props;

        const { PageIndex,ClassRoomCount } = ClassRoomTotal;

        if (PageIndex < Math.ceil(ClassRoomCount/10)){

            dispatch(CRTActions.ClassTotalPageUpdate({nextPage:true}));

        }

    }

    //表格点击某一行
    clickRow(record){

        const { ClassRoomTotal,dispatch } = this.props;

        const { Schedule } = ClassRoomTotal;

        let rID  = record.id;

        Schedule.map((item,key)=>{

            if (item.id === rID){

                Schedule[key]['active'] = true;

            }else{

                Schedule[key]['active'] = false;

            }

        });

        dispatch({type:CRTActions.MANAGER_CLASS_ROOM_TOTAL_SCHEDULE_UPDATE,data:Schedule});

    }


    //弹出课程详情弹窗

    ScheduleDetailShow(Params){

        const { dispatch,SubjectCourseGradeClassRoom,ClassRoomTotal } = this.props;

        /*dispatch(CRTActions.ScheduleDetailShow(Params));*/

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = SubjectCourseGradeClassRoom;

        const {NowWeekNO,ScheduleList} = ClassRoomTotal;

        const { ClassRoomID } = Params;

        let FindPage = 1;

        ScheduleList.map((item,key)=>{

            let FindIndex = item.findIndex(i=>i.id===ClassRoomID);

            if(FindIndex>=0){

                FindPage = key+1

            }

        });

        dispatch({type:SDActions.COMPONENT_SCHEDULE_DETAIL_MODAL_PARAMS_UPDATE,data:{ItemClassHour,ItemClassHourCount,NowClassHourNO,WeekNO:NowWeekNO,PageIndex:FindPage}});

        dispatch(SDActions.ScheduleDetailShow(Params));

    }


    render(){

        const { PeriodWeekTerm,SubjectCourseGradeClassRoom,ClassRoomTotal } = this.props;

        const { ScheduleDetail,ChangeTime,AdjustClassRoom,ReplaceSchedule } = ClassRoomTotal;

        return(

            <CSSTransition in={this.state.fullScreen} timeout={200} classNames={"full-screen"}>

                <div className={`class-total-content ${this.state.fullScreen?'full-screen-doing':''}`}>

                    <Loading spinning={ClassRoomTotal.LoadingShow} tip="正在为您查找，请稍后...">

                        <DropDown

                            dropSelectd={ClassRoomTotal.RoomTypeDropSelectd}

                            dropList={ClassRoomTotal.RoomTypeDropList}

                            style={{zIndex:5}}

                            height={200}

                            onChange={this.RoomTypeChange.bind(this)}>

                        </DropDown>

                        <WeekDayPick

                            WeekList={ClassRoomTotal.WeekList}

                            NowWeekNO={ClassRoomTotal.NowWeekNO}

                            NowWeekDay={ClassRoomTotal.NowWeekDay}

                            NowClassDate={ClassRoomTotal.NowClassDate}

                            weekDateChange={this.weekDateChange.bind(this)}

                            OriginWeekList={PeriodWeekTerm.ItemWeek}

                        >

                        </WeekDayPick>

                            {

                                ClassRoomTotal.Schedule.length>0?

                                    <SelfDoubleSingleTable
                                        ref={ref=>this.tableRef=ref}
                                        ItemClassHour={SubjectCourseGradeClassRoom.ItemClassHour}
                                        schedule={ClassRoomTotal.Schedule}
                                        scrollToBottom={this.scrollToBottom.bind(this)}
                                        ScheduleDetailShow={this.ScheduleDetailShow.bind(this)}
                                    >

                                    </SelfDoubleSingleTable>

                                    :

                                    <Empty type="3" title="暂无教室课表数据"></Empty>

                            }

                    </Loading>

                </div>

            </CSSTransition>

        )
    }

}

const  mapStateToProps = (state) => {

    let { PeriodWeekTerm,Manager } = state;

    let { ClassRoomTotal,SubjectCourseGradeClassRoom } = Manager;

    return {

        PeriodWeekTerm,ClassRoomTotal,SubjectCourseGradeClassRoom

    }

};

export default connect(mapStateToProps)(ClassRoomTotal);