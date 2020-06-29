import React,{Component} from 'react';

import { Modal,Loading } from "../../../../common";

import { connect } from 'react-redux';

import DelScheduleActions from '../../actions/Manager/DelScheduleActions';

class DelScheduleModal extends Component{


    //当学段年级被选中的情况下
    periodChecked(opts) {

        const { dispatch } = this.props;

        dispatch(DelScheduleActions.periodChecked(opts));

    }

    //弹窗关闭
    alertClose(){

        const { dispatch } = this.props;

        dispatch({type:DelScheduleActions.DEL_SCHEDULE_HIDE});

    }

    //弹窗确定
    alertCommit(){

        const { dispatch } = this.props;

        dispatch(DelScheduleActions.commitInfo());

    }

    render() {

        const { DelScheduleModal } = this.props;

        const {

            show,

            loadingShow,

            periodGrades,

            periodGradesCheckedList

        } = DelScheduleModal;

        return (

            <Modal className="del-schedule-modal"
                   title="删除课程"
                   type={1}
                   visible={show}
                   width={740}
                   bodyStyle={{height:234}}
                   mask={true}
                   cancelText="取消"
                   onCancel={this.alertClose.bind(this)}
                   onOk={this.alertCommit.bind(this)} >

                <div className="ModalContent">

                    <Loading opacity={false} spinning={loadingShow} tip="加载中...">

                        <div className="grade-selected-wrapper">

                            <div className="props">范围:</div>

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

                        </div>

                    </Loading>

                </div>

            </Modal>

        );

    }

}

const mapStateToProps = (state) => {

  const { DelScheduleModal } = state.Manager;

  return{

      DelScheduleModal

  }

};

export default connect(mapStateToProps)(DelScheduleModal);