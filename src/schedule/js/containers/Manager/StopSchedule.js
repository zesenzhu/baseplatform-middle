import React,{Component} from 'react';

import { Loading,DropDown } from "../../../../common";

import { DatePicker,ConfigProvider,Tooltip } from 'antd';

import { connect } from 'react-redux';

import ABTActions from '../../actions/Manager/AdjustByTeacherActions';

import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';

import 'moment/locale/zh-cn';

import utils from "../../actions/utils";

moment.locale('zh-cn');


class StopSchedule extends Component{


    //教师选取
    teacherDropChange(info){

        const { dispatch } = this.props;

        dispatch(ABTActions.stopScheduleTeacherPick(info));

    }

    teacherClickSearch(e){

        const { dispatch } = this.props;

        const key = e.value;

        dispatch(ABTActions.stopScheduleTeacherClickSearch(key));

    }

    teacherSearchClose(){

        const { dispatch } = this.props;

        dispatch(ABTActions.stopScheduleTeacherSearchClose());

    }

    dateDisabled(current){

        const { dispatch } = this.props;

        return dispatch(utils.DateDisabled(current));

    }

    datePick(date,dateString){

        const { dispatch } = this.props;

        dispatch(ABTActions.stopScheduleDateChange(dateString));

    }

    classHoursChecked(opts){

        const { dispatch } = this.props;

        dispatch(ABTActions.stopScheduleClassHoursChecked(opts));

    }

    render() {

        const { teacherList,StopSchedule } = this.props;

        const {

            date,

            classHours,

            classHoursCheckedList,

            teacherDrop,

            teacherSearchList,

            teacherSearchOpen,

            teacherSearchLoadingShow,

            classHourLoading,

            dateTips,

            scheduleTips,

            teacherTips

        } = StopSchedule;



        return (

            <div className="stop-schedule-by-teacher-wrapper">

                <div className="teacher-wrapper">

                    <span className="props">老师:</span>

                    <Tooltip visible={teacherTips} title="请选择任课教师" placement="right" autoAdjustOverflow={false} getPopupContainer={triggerNode => triggerNode.parentNode}>

                        <DropDown  width={300}
                                   dropSelectd={teacherDrop}
                                   type="multiple"
                                   style={{zIndex:5}}
                                   mutipleOptions={{
                                       range:2,
                                       width:640,
                                       dropMultipleList:teacherList,
                                       dropMultipleChange:this.teacherDropChange.bind(this),
                                       dropClickSearch:this.teacherClickSearch.bind(this),
                                       dropCancelSearch:this.teacherSearchClose.bind(this),
                                       searchList:teacherSearchList,
                                       searchPlaceholder:"请输入姓名或工号进行搜索...",
                                       searchOpen:teacherSearchOpen,
                                       searchLoadingShow:teacherSearchLoadingShow
                                   }}>

                        </DropDown>

                    </Tooltip>


                    {/*<span className="error-tips" style={{display:`${teacherTips?'block':'none'}`}}>请选择任课教师</span>*/}

                </div>

                <div className="checked-date-wrapper">

                    <span className="props">停课时间:</span>

                    <ConfigProvider locale={zhCN}>

                        <Tooltip visible={dateTips} title="请选择日期" placement="right" autoAdjustOverflow={false} getPopupContainer={triggerNode => triggerNode.parentNode}>

                            <DatePicker disabledDate={this.dateDisabled.bind(this)} value={date?moment(date,'YYYY-MM-DD'):null} onChange={this.datePick.bind(this)}></DatePicker>

                        </Tooltip>

                    </ConfigProvider>

                    {/*<span className="error-tips" style={{display:`${dateTips?'block':'none'}`}}>请选择日期</span>*/}

                </div>

                <Loading type="loading" spinning={classHourLoading}>

                    {
                        classHours.length>0?

                            <div className="class-hour-pick-wrapper">

                                {

                                    classHours.map((item,key) => {


                                        let noonChecked = false;


                                        classHoursCheckedList.map(itm => {

                                            if (itm.type === item.type){

                                                if (itm.checked){

                                                    noonChecked = true;

                                                }

                                            }

                                        });

                                        return  <div key={key} className="class-hour-item clearfix">

                                            <div className="noon">

                                                <div className={`check-item ${noonChecked?'active':''}`} onClick={this.classHoursChecked.bind(this,{type:'noon',id:item.type})}>

                                                    {item.name}

                                                </div>

                                            </div>

                                            {

                                                item.list.map((i,k) => {

                                                    let itemChecked = false;

                                                    classHoursCheckedList.map(it => {

                                                        if (it.type === item.type){

                                                            if (it.list.includes(i.id)){

                                                                itemChecked = true;

                                                            }

                                                        }

                                                    });

                                                    if ((key===classHours.length-1)&&(k===item.list.length-1)){

                                                        return <Tooltip visible={scheduleTips} title="请选择节次" placement="right" autoAdjustOverflow={false} getPopupContainer={triggerNode => triggerNode.parentNode}>

                                                                    <div key={k} className={`check-item ${itemChecked?'active':''}`} onClick={this.classHoursChecked.bind(this,{type:'item',pid:item.type,id:i.id})}>

                                                                        第{i.name}节

                                                                    </div>

                                                                </Tooltip>

                                                    }else{

                                                        return <div key={k} className={`check-item ${itemChecked?'active':''}`} onClick={this.classHoursChecked.bind(this,{type:'item',pid:item.type,id:i.id})}>

                                                            第{i.name}节

                                                        </div>

                                                    }

                                                })

                                            }

                                        </div>

                                    })

                                }

                            </div>

                            :<div style={{color:'#999999'}}>

                                {

                                    (teacherDrop.value!=='none')&&(date!=='')?`该任课教师在${date}暂无课程`:'请选择任课教师'

                                }

                             </div>
                    }

                </Loading>

                {/*<span className="error-tips" style={{display:`${scheduleTips?'block':'none'}`}}>请选择节次</span>*/}

            </div>

        );

    }

}


const mapStateToProps = (state) => {

    const { StopSchedule,teacherList } = state.Manager.AdjustByTeacherModal;

    return{

        StopSchedule,

        teacherList

    }

};

export default connect(mapStateToProps)(StopSchedule);