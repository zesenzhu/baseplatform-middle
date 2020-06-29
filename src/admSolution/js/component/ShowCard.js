import React from 'react'
import { connect } from 'react-redux';
import actions from '../actions';

import { postData, getData } from '../../../common/js/fetch'
import '../../scss/ShowCard.scss'
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import CONFIG from '../../../common/js/config';
import {Button} from '../../../common'
class ShowCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    //重命名
    onResetNameClick = (data) => {
        // console.log(data)
        const { dispatch, DataState, UIState } = this.props;
        dispatch(actions.UpDataState.getSolutionID({ SolutionID: data.SolutionID, SolutionName: data.SolutionName }))
        dispatch(actions.UpUIState.ResetNameModalOpen())
    }
    //删除
    onDeleteClick = (SolutionID) => {
        const { dispatch, DataState, UIState } = this.props;

        // console.log(SolutionID)
        dispatch(actions.UpUIState.showErrorAlert({
            type: 'btn-warn',
            title: "您确定删除？",
            ok: this.onAppAlertDeleteOK.bind(this, SolutionID),
            cancel: this.onAppAlertCancel.bind(this),
            close: this.onAppAlertClose.bind(this)
        }));
        // dispatch(actions.UpUIState.showErrorAlert({
        //     type: 'btn-warn',
        //     title: "您确定删除？",
        //     ok: this.onAppAlertDeleteOK.bind(this, classID),
        //     cancel: this.onAppAlertCancel.bind(this),
        //     close: this.onAppAlertClose.bind(this)
        // }));

    }
    //单个删除
    onAppAlertDeleteOK = (SolutionID) => {
        const { dispatch, DataState, UIState } = this.props;

        let url = '/DeleteTeachingSolution';
        dispatch(actions.UpUIState.hideErrorAlert());
        postData(CONFIG.TeachingSolutionProxy + url, {
            SolutionID: SolutionID
        },2).then(res => {
            return res.json()
        }).then(json => {
            if (json.StatusCode === 400) {
                // console.log('错误码：' + json.StatusCode)
            } else if (json.StatusCode === 200) {
                dispatch(actions.UpUIState.showErrorAlert({
                    type: 'success',
                    title: "成功",
                    onHide: this.onAlertWarnHide.bind(this)
                }));
                dispatch(actions.UpDataState.getTeachingSolutionMsg('/ListTeachingSolutions?beginTime=&endTime=&pageSize=12&currentPage=1&userId=' + JSON.parse(sessionStorage.getItem('UserInfo')).UserID))
                

            }
        })
    }
    //通用提示弹窗
    // onAppAlertDeleteAllOK(SolutionID) {
    //     const { dispatch } = this.props;

    //     let url = '/DeleteSubject';
    //     dispatch(actions.UpUIState.hideErrorAlert());
    //     postData(CONFIG.proxy + url, {
    //         courseClassID: id
    //     }).then(res => {
    //         return res.json()
    //     }).then(json => {
    //         if (json.Status === 400) {
    //             // console.log('错误码：' + json.Status)
    //         } else if (json.Status === 200) {
    //             dispatch(actions.UpUIState.showErrorAlert({
    //                 type: 'success',
    //                 title: "成功",
    //                 onHide: this.onAlertWarnHide.bind(this)
    //             }));
    //         dispatch(actions.UpDataState.getTeacherCourseClassMsg('/GetCourseClassByUserID?schoolID=S0003&teacherID=T0001'));

    //         }
    //     })
    //     dispatch(actions.UpUIState.hideErrorAlert());

    // }
    onAppAlertCancel() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAppAlertClose() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }

    //关闭
    onAlertWarnHide = () => {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert())

    }
    //查看教学班
    onCheckClick = (solutionID) => {
        // console.log(solutionID)
        const { dispatch, DataState, UIState } = this.props;
        dispatch(actions.UpDataState.getTeachingSolutionDetailsMsg('/GetTeachingSolution?SolutionID=' + solutionID))
        dispatch(actions.UpUIState.TeachingSolutionDetailsModalOpen())

    }
    // 背景
    RandomBG = () => {
        let number = Math.round(Math.random()*10)
        if(number<=8){
            return number
        }else{
            return this.RandomBG()
        }
    }
    render() {
        let To = '';

        return (
            <div className='ShowCard '>



                <div className='box-main'>
                    <div className='main-content'>
                        <p title={this.props.params.SolutionName} className={`content-tips  ${'content_bg'+this.RandomBG()}`}>{this.props.params.SolutionName}</p>

                        <div className='content-details'>
                            <div className='details-row clearfix'>
                                <span className='left'>学科：</span>
                                <span title={this.props.params.SubjectName} className='right subjectName'>{this.props.params.SubjectName?this.props.params.SubjectName:'--'}</span>
                            </div>

                            <div className='details-row clearfix'>
                                <span className='left'>文件数量：</span>
                                <span title={this.props.params.FilesCount} className='right'>{this.props.params.FilesCount?this.props.params.FilesCount:'--'}</span>
                            </div>
                            <div className='details-row clearfix'>
                                <span className='left'>创建时间：</span>
                                <span title={this.props.params.CreateTime} className='right'>{this.props.params.CreateTime?this.props.params.CreateTime:'--'}</span>
                            </div>

                        </div>
                        {/* <hr className='content-hr'></hr> */}
                        <div className='handle-content'>
                            <span onClick={this.onResetNameClick.bind(this, this.props.params)} className='btn  resetName'>重命名</span>
                            <span className='icon-delete'></span>
                            <span  onClick={this.onDeleteClick.bind(this, this.props.params.SolutionID)} className='btn Delete'  >删除</span>
                            <span className='icon-delete'></span>

                            <span  onClick={this.onCheckClick.bind(this, this.props.params.SolutionID)} className='btn Check'  >查看</span>
                            
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(ShowCard);