import React,{Component,createRef} from 'react';

import { connect } from 'react-redux';

import { Tabs } from 'antd';

import { Modal,Loading } from "../../../../common";

import ABTAction from "../../actions/Manager/AdjustByTeacherActions";

import appAlert from '../../actions/AppAlertActions';

import ReplaceSchedule from './ReplaceSchedule';

import ChangeSchedule from './ChangeSchedule'

import ChangeTime from './ChangeTime';

import ChangeClassRoom from './ChangeClassRoom';

import StopSchedule from './StopSchedule';


const { TabPane  } = Tabs;


class AdjustByTeacherModal extends Component{



    CloseModal(){

        const { dispatch } = this.props;

        dispatch({type:ABTAction.ADJUST_BY_TEACHER_HIDE});

    }

    //面板发生变化
    tabChange(activeKey){

        const { dispatch } = this.props;

        dispatch({type:ABTAction.ADJUST_BY_TEACHER_TAB_CHANGE,data:activeKey});

        dispatch({type:ABTAction.MANAGER_ADJUST_BY_TEACHER_MODAL_INIT});

    }


    //面板确定
    ModalOk(){

        const { dispatch,AdjustByTeacherModal } = this.props;

        const { activeKey } = AdjustByTeacherModal;


        if (activeKey==='3'){

            const { newDate,isSameDay, newClassHour, classRoomID, showDateTip, hideDateTip, showClassHourTip, hideClassHourTip, showClassRoomTip, hideClassRoomTip, } = this.changeTimeRef;

            let dateOk=false,classHourOk=false,classRoomOk=false;



            if (isSameDay&&newDate){

                dispatch(appAlert.alertWarn({title:'所选日期和节次相同'}));

            }else{

                if (newDate){

                    hideDateTip();

                    dateOk = true;

                }else{

                    showDateTip();

                }

                if (newClassHour){

                    hideClassHourTip();

                    classHourOk = true;

                }else{

                    showClassHourTip();

                }

                if (classRoomID){

                    hideClassRoomTip();

                    classRoomOk = true;

                }else{

                    showClassRoomTip();

                }

                dispatch(ABTAction.ModalCommit({changeTimeModal:{newDate,newClassHour,newClassRoomID:classRoomID,dateOk,classHourOk,classRoomOk}}));


            }


        }else if (activeKey==='4'){

            const {classRoomID1,classRoomID2,showRoomTip,hideRoomTip} = this.changeClassRoomRef;

            if (classRoomID2){

                hideRoomTip();

            }else{

                showRoomTip();

            }

            dispatch(ABTAction.ModalCommit({changeRoomModal:{classRoomID1,classRoomID2}}));

        }else{

            dispatch(ABTAction.ModalCommit({}));

        }

    }



    render() {

        const { AdjustByTeacherModal } = this.props;

        const {

            show,

            activeKey,

            LoadingShow

        } = AdjustByTeacherModal;

        return (

            <Modal className="adjust-by-teacher-modal"
                   title="按老师调整课程"
                   type={1}
                   visible={show}
                   width={840}
                   mask={true}
                   cancelText="取消"
                   onCancel={this.CloseModal.bind(this)}
                   onOk={this.ModalOk.bind(this)} >

                <Loading tip="加载中..." type="loading"  spinning={LoadingShow} opacity={false}>

                    <div className="modal-wrapper" style={{position:'relative',zIndex:3}}>

                        <Tabs type="card" onChange={this.tabChange.bind(this)} activeKey={activeKey} tabBarStyle={{width:840}} tabBarGutter={0}>

                            <TabPane tab="找人代课" key="1" >

                                {

                                    activeKey==='1'?

                                        <ReplaceSchedule></ReplaceSchedule>

                                        :''

                                }

                            </TabPane>

                            <TabPane tab="与人换课" key="2">

                                {

                                    activeKey==='2'?

                                        <ChangeSchedule></ChangeSchedule>

                                        :''

                                }

                            </TabPane>

                            <TabPane tab="调整时间" key="3">

                                {

                                    activeKey === '3' ?

                                        <ChangeTime ref={ref=>this.changeTimeRef=ref}></ChangeTime>

                                        : ''

                                }

                            </TabPane>

                            <TabPane tab="更换教室" key="4" >

                                {

                                    activeKey === '4' ?

                                        <ChangeClassRoom ref={ref=>this.changeClassRoomRef = ref}></ChangeClassRoom>

                                    :""

                                }

                            </TabPane>

                            <TabPane tab="停课" key="5">

                                {

                                    activeKey === '5' ?

                                        <StopSchedule></StopSchedule>

                                        :''

                                }

                            </TabPane>

                        </Tabs>

                </div>

                </Loading>

            </Modal>

        );

    }

}

const mapStateToProps = (state) => {

    const { AdjustByTeacherModal } = state.Manager;

    return{

        AdjustByTeacherModal

    }

};

export default connect(mapStateToProps)(AdjustByTeacherModal);