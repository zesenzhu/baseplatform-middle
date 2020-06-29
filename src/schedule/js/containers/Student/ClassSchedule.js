import React,{Component} from 'react';

import { connect } from 'react-redux';

import {Loading} from "../../../../common";

import TermPick from "../../component/TermPick";

import SingleDoubleTable from "../../component/SingleDoubleTable";

import OptionalClassModal from "../../component/OptionalClassModal";

import SDActions from "../../actions/ScheduleDetailActions";

import apiActions from "../../actions/ApiActions";

import utils from "../../actions/utils";

import appLoading from "../../actions/AppLoadingActions";

import {getQueryVariable} from "../../../../common/js/disconnect";


class ClassTotal extends Component{

    constructor(props){

        super(props);

        this.state={

            loading:true,

            firstLoad:true,

            schedule:[],

            NowWeekNO:1,

            optionalShow:false,

            optionalLoading:true,

            optionalData:[],

            optionalCurrentPage:1,

        };

    }


    //选择某一周次
    weekPickEvent(e){

        this.setState({NowWeekNO:e.value},()=>{

            this.updateSchedule(e.value);

        })

    }

    //选择下一周次
    weekNextEvent(){

        this.setState({

            NowWeekNO:this.state.NowWeekNO+1

        },()=>{

            this.updateSchedule(this.state.NowWeekNO);

        });

    }

    //选择上一周次
    weekPrevEvent(){

        this.setState({

            NowWeekNO:this.state.NowWeekNO-1

        },()=>{

            this.updateSchedule(this.state.NowWeekNO);

        });

    }

    //走班详情弹窗打开

    OptionalClassShow({ClassID,ClassHourNO,WeekDay}){

        const { dispatch } = this.props;

        this.setState({optionalShow:true});

        apiActions.GetCourseClassInfo({ClassID,ClassHourNO,WeekNO:this.state.WeekNO,WeekDayNO:WeekDay,dispatch}).then(data=>{

            let DataSource = [];

            if (data&&data.length>0){

                DataSource = data.map((item,key)=>{

                        return {

                            key:key,

                            ...item,

                        }

                    })

            }

            this.setState({optionalData:DataSource,optionalLoading:false});

        });


    }

    //走班详情弹窗关闭

    OptionalClassModalClose(){

        this.setState({ optionalShow:false,

            optionalLoading:true,

            optionalData:[],

            optionalCurrentPage:1});


    }


    //走班详情页码变化
    OptionalClassPageChange(e){

        this.setState({optionalCurrentPage:e});

    }


    //弹出课程详情弹窗

    ScheduleDetailShow(Params){

        const { dispatch,Student } = this.props;

        const { ItemClassHour,ItemClassHourCount,NowClassHourNO } = Student;

        dispatch({type:SDActions.COMPONENT_SCHEDULE_DETAIL_MODAL_PARAMS_UPDATE,data:{ItemClassHour,ItemClassHourCount,NowClassHourNO,WeekNO:this.state.NowWeekNO,CanOperate:false}});

        dispatch(SDActions.ScheduleDetailShow(Params));


    }


    componentWillReceiveProps(nextProps){

        const { Student,dispatch,PeriodWeekTerm,LoginUser } = nextProps;

        console.log(getQueryVariable('WeekNO'));

        const WeekNO = getQueryVariable('WeekNO')?getQueryVariable('WeekNO'):PeriodWeekTerm.WeekNO;

        const {ItemClassHour} = Student.CommonInfo;

        const { SchoolID,UserID,GroupID } = LoginUser;

        if (ItemClassHour.length>0&&this.state.firstLoad){

            this.setState({firstLoad:false},()=>{

                apiActions.GetScheduleOfClassOne({SchoolID,WeekNO,ClassID:GroupID,dispatch}).then(data => {

                        let Schedule = [];

                        if (data){

                            Schedule = data.ItemSchedule&&data.ItemSchedule.length>0?utils.ScheduleRemoveRepeat(data.ItemSchedule.map((item) => {

                                return {

                                    ...item,

                                    title:item.SubjectName,

                                    titleID:item.SubjectID,

                                    secondTitle:item.TeacherName,

                                    secondTitleID:item.TeacherID,

                                    thirdTitle:item.ClassRoomName,

                                    thirdTitleID:item.ClassRoomID,

                                    WeekDay:item.WeekDay,

                                    ClassHourNO:item.ClassHourNO,

                                    ScheduleType:item.ScheduleType

                                }

                            })):[];

                            data.ItemCourseClass.map(item=>{

                                let ShiftClass = {

                                    ClassID:item.ClassID,

                                    WeekDay:item.WeekDayNO,

                                    ClassHourNO:item.ClassHourNO,

                                    IsShift:true

                                };

                                Schedule.push(ShiftClass);

                            });

                        }

                        this.setState({loading:false,schedule:Schedule,NowWeekNO:parseInt(WeekNO)});

                        dispatch({type:appLoading.APP_LOADING_HIDE});

                    });

            })

        }

    }


    updateSchedule(WeekNO){

        const { dispatch,LoginUser } = this.props;

        const { SchoolID,UserID } = LoginUser;

        this.setState({loading:true});

        apiActions.GetScheduleOfClassOne({SchoolID,WeekNO,ClassID:LoginUser.GroupID,dispatch}).then(data => {

            let Schedule = [];

            if (data){

                Schedule = data.ItemSchedule&&data.ItemSchedule.length>0?utils.ScheduleRemoveRepeat(data.ItemSchedule.map((item) => {

                    return {

                        ...item,

                        title:item.SubjectName,

                        titleID:item.SubjectID,

                        secondTitle:item.TeacherName,

                        secondTitleID:item.TeacherID,

                        thirdTitle:item.ClassRoomName,

                        thirdTitleID:item.ClassRoomID,

                        WeekDay:item.WeekDay,

                        ClassHourNO:item.ClassHourNO,

                        ScheduleType:item.ScheduleType

                    }

                })):[];

                data.ItemCourseClass.map(item=>{

                    let ShiftClass = {

                        ClassID:item.ClassID,

                        WeekDay:item.WeekDayNO,

                        ClassHourNO:item.ClassHourNO,

                        IsShift:true

                    };

                    Schedule.push(ShiftClass);

                });

            }

            this.setState({loading:false,schedule:Schedule});

        });

    }


    componentDidMount(){

        const { Student,dispatch,PeriodWeekTerm,LoginUser } = this.props;

        const WeekNO = getQueryVariable('WeekNO')?getQueryVariable('WeekNO'):PeriodWeekTerm.WeekNO;

        console.log(getQueryVariable('WeekNO'));

        const {ItemClassHour} = Student.CommonInfo;

        const { SchoolID,UserID } = LoginUser;

        if (ItemClassHour.length>0&&this.state.firstLoad){

            this.setState({firstLoad:false},()=>{

                apiActions.GetScheduleByUserID({SchoolID,PeriodID:'',UserType:2,UserID,WeekNO,dispatch}).then(data=>{

                    let schedule = [];

                    if (data){

                        schedule = data.ItemSchedule&&data.ItemSchedule.length>0?utils.ScheduleRemoveRepeat(data.ItemSchedule.map((item) => {

                            return {

                                ...item,

                                title:item.SubjectName,

                                titleID:item.SubjectID,

                                secondTitle:(item.ClassName===''?item.CourseClassName:item.ClassName),

                                secondTitleID:(item.ClassName===''?item.CourseClassID:item.ClassID),

                                thirdTitle:item.ClassRoomName,

                                thirdTitleID:item.ClassRoomID,

                                WeekDay:item.WeekDay,

                                ClassHourNO:item.ClassHourNO,

                                ScheduleType:item.ScheduleType

                            }


                        })):[];

                    }

                    this.setState({loading:false,schedule,NowWeekNO:parseInt(WeekNO)});

                    dispatch({type:appLoading.APP_LOADING_HIDE});

                })

            })

        }

    }


    render(){

        const { PeriodWeekTerm,Student,LoginUser } = this.props;

        console.log(Student,this.state.firstLoad);

        const { CommonInfo } = Student;

        let ItemWeek = [];

        if (PeriodWeekTerm.ItemWeek){

            ItemWeek = PeriodWeekTerm.ItemWeek.map((item) => {

                return {value:item.WeekNO,title:item.WeekNO};

            });

        }

        return <div className="class-total-content teacher-class-total" style={{border:0}}>

            <Loading spinning={this.state.loading} tip="正在为您查找，请稍后...">

                <div className={`class-name`} style={{float:'left'}}>{LoginUser.GroupName}</div>

                    <TermPick

                        ItemTermName={PeriodWeekTerm.ItemTerm?PeriodWeekTerm.ItemTerm.TermName:''}

                        NowWeekNo={this.state.NowWeekNO}

                        ItemWeek ={ItemWeek}

                        weekPickEvent = {this.weekPickEvent.bind(this)}

                        weekNextEvent = {this.weekNextEvent.bind(this)}

                        weekPrevEvent = {this.weekPrevEvent.bind(this)}

                        WeekNO={this.state.NowWeekNO}

                    >

                    </TermPick>

                    <div className="single-double-table-wrapper" style={{marginTop:20}}>

                        <SingleDoubleTable
                            topHeight = {64}
                            commonHeight = {90}
                            commonWidth={136}
                            leftOneWidth ={56}
                            leftTwoWidth = {136}
                            ItemClassHourCount={CommonInfo.ItemClassHourCount}
                            ItemClassHour={CommonInfo.ItemClassHour}
                            ItemWeek = {PeriodWeekTerm.ItemWeek}
                            NowWeekNo={this.state.NowWeekNO}
                            schedule={this.state.schedule}
                            NowDate={PeriodWeekTerm.NowDate}
                            OptionalClassShow={this.OptionalClassShow.bind(this)}
                            ScheduleDetailShow={this.ScheduleDetailShow.bind(this)}
                        >

                        </SingleDoubleTable>

                    </div>

            </Loading>

            <OptionalClassModal
                Show={this.state.optionalShow}
                LoadingShow={this.state.optionalLoading}
                DataSource={this.state.optionalData}
                Close={this.OptionalClassModalClose.bind(this)}
                PageChange={this.OptionalClassPageChange.bind(this)}
                CurrentPage={this.state.optionalCurrentPage}>

            </OptionalClassModal>

        </div>

    }

}

const  mapStateToProps = (state) => {

    let { PeriodWeekTerm,Student,LoginUser } = state;

    return {

        PeriodWeekTerm,Student,LoginUser

    }

};

export default connect(mapStateToProps)(ClassTotal);