import React,{Component} from 'react';

import { Modal,Loading,Tips } from "../../../../common";

import { DatePicker,ConfigProvider } from 'antd';

import { connect } from 'react-redux';

import StopScheduleActions from '../../actions/Manager/StopScheduleActions';

import zhCN from 'antd/es/locale/zh_CN';

import moment from 'moment';

import 'moment/locale/zh-cn';

import utils from '../../actions/utils';

moment.locale('zh-cn');

class StopScheduleModal extends Component{

    constructor(props) {

        super(props);

        this.state={

            GradeTips:false,

            DateTips:false,

            ScheduleTips:false

        }

    }


    //日期选择后
    datePick(date,dateString){

        const { dispatch } = this.props;

        dispatch(StopScheduleActions.dateChange(dateString));

        this.setState({DateTips:false});

    }

    //点击课时
    classHoursChecked(opts){

        const { dispatch } = this.props;

        dispatch(StopScheduleActions.classHoursChecked(opts));

        this.setState({ScheduleTips:false});

    }

    dateDisabled(current){

        const { dispatch } = this.props;

        return dispatch(utils.DateDisabled(current));

        this.setState({DateTips:false});

    }

    //当学段年级被选中的情况下
    periodChecked(opts) {

        const { dispatch } = this.props;

        dispatch(StopScheduleActions.periodChecked(opts));

        this.setState({GradeTips:false});

    }

    //弹窗关闭
    alertClose(){

        const { dispatch } = this.props;

        dispatch({type:StopScheduleActions.STOP_SCHEDULE_HIDE});

        this.setState({

            GradeTips:false,

            DateTips:false,

            ScheduleTips:false

        });

    }

    //弹窗确定
    alertCommit(){

        const { dispatch } = this.props;

        dispatch(StopScheduleActions.commitInfo(this));

    }

    render() {

        const { StopScheduleModal } = this.props;

        const {

            loadingShow,

            date,

            dateLoadingShow,

            weekNO,

            weekDay,

            classHours,

            classHoursCheckedList,

            periodGrades,

            periodGradesCheckedList

        } = StopScheduleModal;


        return (

            <Modal className="stop-schedule-modal"
                   title="停课"
                   type={1}
                   visible={StopScheduleModal.show}
                   width={780}
                   bodyStyle={{height:332}}
                   mask={true}
                   cancelText="取消"
                   onCancel={this.alertClose.bind(this)}
                   onOk={this.alertCommit.bind(this)} >

                <div className="ModalContent">

                    <Loading opacity={false} spinning={loadingShow} tip="加载中...">

                        <div className="checked-date-wrapper">

                                <span className="props">日期:</span>

                                <ConfigProvider locale={zhCN}>

                                    <Tips title="请选择停课日期" visible={this.state.DateTips}>

                                        <DatePicker disabledDate={this.dateDisabled.bind(this)} value={date?moment(date,'YYYY-MM-DD'):null} onChange={this.datePick.bind(this)}></DatePicker>

                                    </Tips>


                                    <Loading spinning={dateLoadingShow} type="loading">

                                        {

                                            weekNO?

                                                <span className="date-picked-time">(第{weekNO}周 {weekDay})</span>

                                                :''

                                        }

                                    </Loading>

                                </ConfigProvider>

                        </div>

                        <div className="class-hour-wrapper clearfix">

                            <span className="props">节次:</span>

                            <Tips title="请选择停课节次" visible={this.state.ScheduleTips}>

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

                                                                if (it.list.includes(i.no)){

                                                                    itemChecked = true;

                                                                }

                                                            }

                                                        });

                                                        return <div key={k} className={`check-item ${itemChecked?'active':''}`} onClick={this.classHoursChecked.bind(this,{type:'item',pid:item.type,id:i.no})}>

                                                            {i.name}

                                                        </div>

                                                    })

                                                }

                                            </div>

                                        })

                                    }
                                </div>

                            </Tips>

                        </div>

                        <div className="grade-selected-wrapper clearfix">

                            <div className="props">范围:</div>

                            <Tips placement="top" title="请选择需要停课的年级" visible={this.state.GradeTips}>

                                <div className="grade-selected-container clearfix">

                                    {

                                        periodGrades.map((item,key) => {

                                            let periodChecked = false;
                                            //变量看看是否全选
                                            periodGradesCheckedList.map((itm) => {

                                                if (itm.id === item.id){

                                                    if (itm.checked){

                                                        periodChecked = true;

                                                    }

                                                }

                                            });

                                            return <div key={key} className="period-item-wrapper clearfix">

                                                <div className="period">

                                                    <div className={`check-item ${periodChecked?'active':''}`} onClick={this.periodChecked.bind(this,{type:"period",id:item.id})}>

                                                        {item.name}

                                                    </div>

                                                </div>

                                                {

                                                    item.list.map((i,k) => {

                                                        //判断该选项是否是选中

                                                        let itemChecked = false;

                                                        periodGradesCheckedList.map((itm) => {

                                                            if (itm.id === item.id){

                                                                itm.list.map((it) => {

                                                                    if (it === i.id){

                                                                        itemChecked = true;

                                                                    }

                                                                });

                                                            }

                                                        });

                                                        return <div key={k} className={`check-item ${itemChecked?'active':''}`} onClick={this.periodChecked.bind(this,{type:"item",pid:item.id,id:i.id})}>{i.name}</div>

                                                    })

                                                }

                                            </div>

                                        })

                                    }

                                </div>

                            </Tips>

                        </div>

                    </Loading>

                </div>

            </Modal>

        );

    }

}

const mapStateToProps = (state) => {

  const { StopScheduleModal } = state.Manager;

  return{

      StopScheduleModal

  }

};

export default connect(mapStateToProps)(StopScheduleModal);