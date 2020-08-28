import React,{Component} from 'react';

import { Loading,DropDown,Radio } from "../../../../common";

import { DatePicker,ConfigProvider,Tooltip } from 'antd';

import { connect } from 'react-redux';

import ABTActions from '../../actions/Teacher/AdjustByTeacherActions';

import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';

import 'moment/locale/zh-cn';

import utils from "../../actions/utils";

import {Scrollbars} from 'react-custom-scrollbars';

moment.locale('zh-cn');

class ReplaceSchedule extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

       // dispatch(ABTActions.replaceScheduleInit());

    }


    SubjectChange(info){

        //学科选择

        const { dispatch,replaceSchedule } = this.props;

        const { allClassList } = replaceSchedule;

        const list = allClassList.filter(i=>i.subjectID===info.value);

        //学科选择

        dispatch({type:ABTActions.REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:'originTeacher'}});

        dispatch({type:ABTActions.REPLACE_SHCEDULE_CLASS_LIST_UPDATE,data:list});

        dispatch({type:ABTActions.REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_CHANGE,data:info});

        dispatch({type:ABTActions.REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:'originTeacher'}});

    }

    //教师选择
    replaceTeacherDropChange(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.replaceTeacherDropChange(info));

        dispatch({type:ABTActions.REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:'replaceTeacher'}});

    }
    //教师点击搜索
    replaceTeacherClickSearch(e){

        const key = e.value;

        const { dispatch } = this.props;

        dispatch(ABTActions.replaceTeacherClickSearch(key));

    }
    //教师取消搜索
    replaceTeacherSearchClose(){

        const  { dispatch } = this.props;

        dispatch(ABTActions.replaceTeacherSearchClose())

    }

    //点击班级

    classChecked(id){

        const { dispatch } = this.props;

        dispatch(ABTActions.classChecked(id));

        dispatch({type:ABTActions.REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:'class'}});


    }


    //radio变化
    radioChange(id){

        const { dispatch } = this.props;

        dispatch(ABTActions.radioChange(id));

    }

    //月份改变
    monthChecked(id){

        const { dispatch } = this.props;

        dispatch(ABTActions.monthChecked(id));

        dispatch({type:ABTActions.REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:'month'}});

    }
    //选取周次
    weekChecked(id){

        const { dispatch } = this.props;

        dispatch(ABTActions.weekChecked(id));

        dispatch({type:ABTActions.REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:'week'}});

    }

    //日期改变的时候
    dateChecked(date,dateString){

        const { dispatch } = this.props;

        dispatch(ABTActions.dateChecked(dateString));

        dispatch({type:ABTActions.REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:'date'}});

    }

    dateDisabled(current){

        const { dispatch } = this.props;

        return  dispatch(utils.DateDisabled(current));

    }

    //dateRanger改变date日历的显示方式
    dateRander(current,today){

        const { replaceSchedule,ItemWeek,NowDate } = this.props;

        const { dateCheckedList } = replaceSchedule;

        let currentDate = moment(current).format('YYYY-MM-DD');

        let LastDate = ItemWeek[ItemWeek.length-1].EndDate;

        if (dateCheckedList.includes(currentDate)){

            return <div className="ant-calendar-date" style={{background:'#1890ff',color:"#ffffff"}}>{current.date()}</div>

        }else if (current<moment(LastDate).add(1,'days')&&current>=moment(NowDate)) {

            return <div className="ant-calendar-date" style={{color:'rgba(0, 0, 0, 0.65)',background:'transparent'}}>{current.date()}</div>

        }else{

            return <div className="ant-calendar-date" >{current.date()}</div>

        }

    }
    //课时列表的点击选择
    classHourDateChecked(date,dateString){

        const { dispatch } = this.props;

        dispatch(ABTActions.classHourDateChecked(dateString));

        dispatch({type:ABTActions.REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:'classHourDate'}});

    }

    //点击课时

    classHourChecked(opts){

        const { dispatch } = this.props;

        dispatch(ABTActions.classHourChecked(opts));

        dispatch({type:ABTActions.REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:'classHour'}});

    }









    render() {

        const { replaceSchedule,teacherList } = this.props;


        const {

            loadingShow,

            teacherOptions,

            teacherSubject,

            classList,

            replaceTeacherOptions,

            classCheckedList,

            activeRadio,

            monthsList,

            monthsCheckedList,

            weeksList,

            weeksCheckedList,

            dateCheckedList,

            classHourDate,

            WeekNO,

            WeekDay,

            dateLoadingShow,

            classHourList,

            classHourCheckedList,

            classHourLoadingShow,

            originTeacherTips,

            originTeacherTipsTitle,

            replaceTeacherTips,

            replaceTeacherTipsTitle,

            classTips,

            classTipsTitle,

            monthTips,

            monthTipsTitle,

            weekTips,

            weekTipsTitle,

            dateTips,

            dateTipsTitle,

            classHourDateTips,

            classHourDateTipsTitle,

            classHourTipsTitle,

            classHourTips,

            monthLoading,

            weekLoading

        } = replaceSchedule;

    let radios = [

        { id:"all",name:"全学期" },

        { id:"month",name:"指定月份" },

        { id:"week",name:"指定周次" },

        { id:"date",name:"指定日期" },

        { id:"classHour",name:"指定节次" },

    ];



    return (

        <Scrollbars style={{width:840,height:300}}>

            <div className="replace-schedule-wrapper">

                <div className="subject-wrapper clearfix">

                    <div className="props">学科:</div>

                    <Tooltip placement="right" visible={originTeacherTips} title={originTeacherTipsTitle} getPopupContainer={triggerNode =>triggerNode.parentNode}>

                        {

                            teacherSubject.dropShow?

                                <DropDown onChange={this.SubjectChange.bind(this)} width={90} dropSelectd={teacherSubject.select.dropSelectd} style={{zIndex:7}} dropList={teacherSubject.select.dropList}></DropDown>

                                :

                                <span className={`subject-name ${teacherSubject.name?'':'unset'}`}>{teacherSubject.name?teacherSubject.name:"暂无可调整的课程"}</span>

                        }

                    </Tooltip>

                    {/*<span className="error-tips" style={{display:`${originTeacherTips?'inline-block':'none'}`,marginLeft:10}}>{originTeacherTipsTitle}</span>*/}

                </div>

                <div className="class-wrapper clearfix">

                    <div className="props">代课班级:</div>

                    <div className={`class-pick-wrapper clearfix ${classList.length>0?'':'unset'}`}>

                        <Tooltip placement="right" visible={classTips} title={classTipsTitle} getPopupContainer={triggerNode =>triggerNode.parentNode}>

                            {

                                classList.length>0?classList.map((item,key) => {

                                        return <div key={key} className={`class-item check-item ${classCheckedList.includes(item.id)?'active':''}`} onClick={this.classChecked.bind(this,item.id)}>

                                            {

                                                item.name

                                            }

                                        </div>

                                    })

                                    :'暂无可调整的课程'

                            }

                        </Tooltip>

                    </div>

                    {/*<span className="error-tips" style={{display:`${classTips?'inline-block':'none'}`}}>{classTipsTitle}</span>*/}

                </div>

                <div className="replace-teacher-wrapper clearfix">

                    <div className="props">代课老师:</div>

                    <Tooltip placement="right" visible={replaceTeacherTips} title={replaceTeacherTipsTitle} getPopupContainer={triggerNode =>triggerNode.parentNode}>

                        <DropDown
                            width={160}
                            dropSelectd={replaceTeacherOptions.dropSelectd?replaceTeacherOptions.dropSelectd:{value:"none",title:"请选择任课教师"}}
                            type="multiple"
                            style={{zIndex:1078}}
                            mutipleOptions={{
                                range:2,
                                dropMultipleList:teacherList,
                                dropMultipleChange:this.replaceTeacherDropChange.bind(this),
                                dropClickSearch:this.replaceTeacherClickSearch.bind(this),
                                dropCancelSearch:this.replaceTeacherSearchClose.bind(this),
                                searchList:replaceTeacherOptions.searchList,
                                searchPlaceholder:"请输入教师姓名或工号搜索...",
                                searchOpen:replaceTeacherOptions.searchOpen,
                                searchLoadingShow:replaceTeacherOptions.searchLoadingShow
                            }}>

                        </DropDown>

                    </Tooltip>

                    {/*<span className="error-tips" style={{display:`${replaceTeacherTips?'inline-block':'none'}`}}>{replaceTeacherTipsTitle}</span>*/}

                </div>

                <div className="deadline-wrapper clearfix">

                    <div className="props">代课期限:</div>

                    <div className="radios-wrapper">

                        {

                            radios.map((item,key) => {

                                return <span key={key} className={`radio-item ${activeRadio === item.id?'active':''}`} onClick={this.radioChange.bind(this,item.id)}>{item.name}</span>

                            })

                        }

                    </div>

                </div>

                {

                    activeRadio==='month'?

                        <div className="byMonth dateline-pick-wrapper clearfix">

                            <Loading spinning={monthLoading}>

                                {

                                    monthsList.length>0?

                                        monthsList.map((item,key) => {

                                            if (key===monthsList.length-1){

                                                return <Tooltip key={key} placement="right" visible={monthTips} getPopupContainer={triggerNode => triggerNode.parentNode} title={monthTipsTitle} >

                                                    <div  className={`month-item check-item ${monthsCheckedList.includes(item.id)?'active':''}`} onClick={this.monthChecked.bind(this,item.id)}>

                                                        {

                                                            item.name

                                                        }

                                                    </div>

                                                </Tooltip>

                                            }else{

                                                return <div key={key} className={`month-item check-item ${monthsCheckedList.includes(item.id)?'active':''}`} onClick={this.monthChecked.bind(this,item.id)}>

                                                    {

                                                        item.name

                                                    }

                                                </div>

                                            }

                                        })

                                        :<div style={{color:'#999999'}}>当前学期没有未结束的月份，不可调整课程</div>

                                }

                            </Loading>


                            <div className="trangle"></div>

                            {/*<span className="error-tips" style={{display:`${monthTips?'inline-block':'none'}`}}>{monthTipsTitle}</span>*/}

                        </div>

                        :''

                }

                {

                    activeRadio==='week'?

                        <div className="byWeek dateline-pick-wrapper clearfix">

                            <Loading spinning={weekLoading}>

                                {

                                    weeksList.length>0?

                                        weeksList.map((item,key) => {

                                            if (key===weeksList.length-1){

                                                return <Tooltip key={key} placement="right" visible={weekTips} getPopupContainer={triggerNode => triggerNode.parentNode} title={weekTipsTitle} >

                                                    <div  className={`week-item check-item ${weeksCheckedList.includes(item)?'active':''}`} onClick={this.weekChecked.bind(this,item)}>

                                                        第{item}周

                                                    </div>

                                                </Tooltip>

                                            }else {

                                                return <div key={key}
                                                            className={`week-item check-item ${weeksCheckedList.includes(item) ? 'active' : ''}`}
                                                            onClick={this.weekChecked.bind(this, item)}>

                                                    第{item}周

                                                </div>

                                            }

                                        })

                                        :

                                        <div style={{color:'#999999'}}>当前学期没有未结束的周次，不可调整课程</div>


                                }

                            </Loading>


                            <div className="trangle"></div>

                            {/*<span className="error-tips" style={{display:`${weekTips?'inline-block':'none'}`}}>{weekTipsTitle}</span>*/}


                        </div>

                        :''

                }

                {

                    activeRadio==='date'?

                        <div className="byDate dateline-pick-wrapper clearfix">

                            <ConfigProvider locale={zhCN}>

                                <Tooltip visible={dateTips} title={dateTipsTitle} getPopupContainer={triggerNode => triggerNode.parentNode} placement="right">

                                    <DatePicker disabledDate={this.dateDisabled.bind(this)} showToday={false} dateRender={this.dateRander.bind(this)} onChange={this.dateChecked.bind(this)} style={{width:626}}></DatePicker>

                                </Tooltip>

                            </ConfigProvider>

                            <div className="date-wrapper" title={dateCheckedList.length>0?dateCheckedList.join(','):'请选择日期'}>{dateCheckedList.length>0?dateCheckedList.join(','):'请选择日期'}</div>

                            <div className="trangle"></div>

                            {/*<span className="error-tips" style={{display:`${dateTips?'inline-block':'none'}`}}>{dateTipsTitle}</span>*/}

                        </div>

                        :''

                }

                {

                    activeRadio==='classHour'?

                        <div className="byClassHour dateline-pick-wrapper clearfix">

                            <span className="title">时间:</span>

                            <ConfigProvider locale={zhCN}>

                                <Tooltip visible={classHourDateTips} title={classHourDateTipsTitle} getPopupContainer={triggerNode => triggerNode.parentNode} placement="right">

                                    <DatePicker disabledDate={this.dateDisabled.bind(this)} showToday={false} value={classHourDate?moment(classHourDate,'YYYY-MM-DD'):null} onChange={this.classHourDateChecked.bind(this)}></DatePicker>

                                </Tooltip>

                            </ConfigProvider>

                            {

                                classHourDate?

                                    <Loading  className="date-loading" spinning={dateLoadingShow} opacity={false} type="loading">

                                        <span className="week-date">(第{WeekNO}周 {WeekDay})</span>

                                    </Loading>

                                    :''

                            }

                            {/*<span className="error-tips" style={{display:`${classHourDateTips?'inline-block':'none'}`}}>{classHourDateTipsTitle}</span>*/}


                            <Loading opacity={false} className="class-hour-loading" type="loading"  spinning={classHourLoadingShow}>

                                <div className="title">节次:</div>

                                <Tooltip visible={classHourTips} title={classHourTipsTitle} getPopupContainer={triggerNode => triggerNode.parentNode} placement="right">

                                    <div className="classHour-wrapper">

                                        {

                                            classHourList.map((item,key) => {

                                                let noonChecked = false;

                                                let itemList = [];

                                                classHourCheckedList.map(itm => {

                                                    if (itm.id === item.id){

                                                        itemList = itm.list;

                                                        if (itm.checked){

                                                            noonChecked = true;

                                                            return;

                                                        }

                                                    }

                                                });

                                                return <div key={key} className="class-hour-item-wrapper clearfix">

                                                    <div className="noon">

                                                        <div className={`class-hour-item check-item ${noonChecked?'active':''}`} onClick={this.classHourChecked.bind(this,{type:'noon',id:item.id})}>

                                                            {item.name}

                                                        </div>

                                                    </div>

                                                    {

                                                        item.list.map((i,k)=> {

                                                            return <div key={k} className={`class-hour-item check-item ${itemList.includes(i)?'active':''}`} onClick={this.classHourChecked.bind(this,{type:'item',pid:item.id,id:i})}>第{i}节</div>

                                                        })

                                                    }

                                                </div>

                                            })

                                        }

                                    </div>

                                </Tooltip>

                            </Loading>

                            <div className="trangle"></div>

                            {/*<span className="error-tips" style={{display:`${classHourTips?'inline-block':'none'}`}}>{classHourTipsTitle}</span>*/}

                        </div>

                        :''

                }

            </div>

        </Scrollbars>

        );
    }
}

const mapStateToProps = (state) => {

    const { replaceSchedule,teacherList } = state.Teacher.AdjustByTeacherModal;

    const { ItemWeek,NowDate } = state.PeriodWeekTerm;

    return{

        replaceSchedule,

        teacherList,

        ItemWeek,

        NowDate

    }

};

export default connect(mapStateToProps)(ReplaceSchedule);