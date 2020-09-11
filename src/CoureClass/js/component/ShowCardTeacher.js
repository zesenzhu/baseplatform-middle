import React from 'react'
import { connect } from 'react-redux';
import actions from '../actions';
import { postData, getData } from '../../../common/js/fetch'
import '../../scss/ShowCard.scss'
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import CONFIG from '../../../common/js/config';
import history from "../containers/history";

class ShowCardTeacher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserMsg:props.DataState.LoginUser

        }
    }

    //编辑教学班
    onHandleClick = (classID) => {
      // console.log(classID)
        const { dispatch, DataState, UIState } = this.props;
        dispatch(actions.UpUIState.ChangeCourseClassModalOpen())
        dispatch(actions.UpDataState.getCourseClassDetailsHandleClassMsg('/GetCourseClassDetail?courseClassID=' + classID))
    }
    //删除教学班
    onDeleteClick = (classID) => {
        const { dispatch, DataState, UIState } = this.props;
       
      // console.log(classID)
        
        dispatch(actions.UpUIState.showErrorAlert({
            type: 'btn-warn',
            title: "您确定删除？",
            ok: this.onAppAlertDeleteOK.bind(this, classID),
            cancel: this.onAppAlertCancel.bind(this),
            close: this.onAppAlertClose.bind(this)
        }));

    }
     //关闭
  onAlertWarnHide = () => {
    const { dispatch } = this.props;
    dispatch(actions.UpUIState.hideErrorAlert());
  };
    //单个删除
    onAppAlertDeleteOK = (id) => {
        const { dispatch, DataState, UIState } = this.props;
        let userMsg = DataState.LoginUser;
        let url = '/DeleteCourseClass';
        dispatch(actions.UpUIState.hideErrorAlert());
        postData(CONFIG.CourseClassProxy + url, {
            courseClassIDs: id,
            schoolID:userMsg.SchoolID,
            userID:userMsg.UserID,
            userType:userMsg.UserType
        },2,'json').then(res => {
            return res.json()
        }).then(json => {
            if (json.StatusCode === 200) {
                dispatch(actions.UpUIState.showErrorAlert({
                    type: 'success',
                    title: "成功",
                    onHide: this.onAlertWarnHide.bind(this)
                }));

                history.push('/Teacher');

            // dispatch(actions.UpDataState.getTeacherCourseClassMsg('/GetCourseClassByUserID?schoolID='+this.state.UserMsg.SchoolID+'&userID='+this.state.UserMsg.SchoolID));

                dispatch(
                    actions.UpDataState.getTeacherCourseClassMsg(
                        "/GetCourseClassByUserID?schoolID=" +
                        userMsg.SchoolID +
                        "&teacherID=" +
                        userMsg.UserID
                    )
                );


            }
        })
    }
    //通用提示弹窗
    onAppAlertOK() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());

    }
    onAppAlertCancel() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAppAlertClose() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    //查看教学班
    onCheckClick = (classID) => {
      // console.log(classID)
        const { dispatch, DataState, UIState } = this.props;
        dispatch(actions.UpUIState.CourseClassDetailsModalOpen())
        dispatch(actions.UpDataState.getCourseClassDetailsMsg('/GetCourseClassDetail?courseClassID='+classID))
    }



    render() {


        const { teacherManagePower } = this.props;

        let To = '';
        To = '/Teacher/' + this.props.params.CourseClassID;
        return (
            <div className='ShowCard-box-Teacher '>

                <div className='box-3'></div>
                <div className='box-2'></div>

                <div className='box-main'>
                    <div className='main-content'>
                        <p title={this.props.params.CourseClassName} className='content-tips'>{this.props.params.CourseClassName}</p>
                        <div className='content-hr' ></div>
                        <div className='content-details'>
                            <div className='details-row clearfix'>
                                <span className='left'>学科：</span>
                                <span className='right subjectName'>{this.props.params.SubjectName}</span>
                            </div>
                            <div className='details-row clearfix'>
                                <span className='left'>所属年级：</span>
                                <span className='right'>{this.props.params.GradeName}</span>
                            </div>
                            <div className='details-row clearfix'>
                                <span className='left'>学生数量：</span>
                                <span className='right'>{this.props.params.StudentCount}人<span onClick={this.onCheckClick.bind(this, this.props.params.CourseClassID)} className='checkStudent' >查看学生名单</span></span>
                            </div>

                        </div>

                    </div>

                    {

                        teacherManagePower?

                            <div className='handle-content'>
                                <span onClick={this.onHandleClick.bind(this, this.props.params.CourseClassID)} className='left'><i className='resetName'></i><span>编辑</span></span>
                                <span onClick={this.onDeleteClick.bind(this, this.props.params.CourseClassID)} className='right'><i className='Delete'></i><span>删除</span></span>
                                <span className='divide'></span>
                            </div>

                            :null

                    }


                </div>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    let { UIState, DataState,teacherManagePower } = state;
    return {
        UIState,
        DataState,
        teacherManagePower
    }
};
export default connect(mapStateToProps)(ShowCardTeacher);