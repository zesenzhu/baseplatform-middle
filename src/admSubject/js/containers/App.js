import React, { Component } from 'react';
import {  Menu, Loading, Alert } from "../../../common";
import { connect } from 'react-redux';
import { TokenCheck_Connect, TokenCheck, getUserInfo } from '../../../common/js/disconnect'
import Frame from '../../../common/Frame';


import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import history from './history'

import logo from '../../images/SubjectLogo.png'
//import TimeBanner from '../component/TimeBanner'
import config from '../../../common/js/config'
import Subject from '../component/Subject'
import '../../scss/index.scss'
import $ from 'jquery'
import { getData } from '../../../common/js/fetch'
import actions from '../actions';
//import { urlAll, proxy } from './config'
import { QueryPower, QueryAdminPower } from "../../../common/js/power";
const SUBJECT_MODULEID = "000-2-0-18"; //学科管理

class App extends Component {


    componentWillMount() {

        let route = history.location.pathname;
        // 获取接口数据



        history.listen(() => {//路由监听
            let route = history.location.pathname;
            // console.log(route)

        })
    }




    onAppAlertOK() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
        //window.location.href = "/html/login"
    }
    onAppAlertCancel() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAppAlertClose() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    // 请求每个组件主要渲染的数据
    requestData = (route) => {
        const { dispatch,DataState } = this.props;
        if(!DataState.LoginUser.SchoolID&&!JSON.parse(sessionStorage.getItem('UserInfo'))){
            return;
        }
        let UserMsg = DataState.LoginUser.SchoolID?DataState.LoginUser:JSON.parse(sessionStorage.getItem('UserInfo'))
        // console.log(DataState.LoginUser.SchoolID,UserMsg)

        if (parseInt(UserMsg.UserType)===7||parseInt(UserMsg.UserType)===10){

            dispatch(actions.UpDataState.getPeriodMsg('/GetPeriodBySchoolID?schoolID=' + UserMsg.SchoolID));

            dispatch(actions.UpDataState.getSubjectMsg('/GetSchoolSubjectInfo?schoolID=' + UserMsg.SchoolID + '&periodID=&pageSize=8&pageIndex=1'));

            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });

        }else{

            let havePower = QueryPower({
                UserInfo: UserMsg,
                ModuleID: SUBJECT_MODULEID
            });
            havePower.then(res => {
                if (res) {
                    let pathArr = route.split('/');
                    let handleRoute = pathArr[1];
                    // console.log(route)
                    if (route === '/') {
                        //dispatch(actions.UpDataState.getAllUserPreview('/ArchivesAll'));
                        dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
                        if (!this.props.DataState.PeriodMsd)
                            dispatch(actions.UpDataState.getPeriodMsg('/GetPeriodBySchoolID?schoolID=' + UserMsg.SchoolID));
                            dispatch(actions.UpDataState.getSubjectMsg('/GetSchoolSubjectInfo?schoolID=' + UserMsg.SchoolID + '&periodID=&pageSize=8&pageIndex=1'));
                        // if (!this.props.DataState.SubjectMsg.addSubjectMsg)
                        //     dispatch(actions.UpDataState.getSubjectModalMsg('/GetSubjectInfoForAddBySchool?schoolID=' + UserMsg.SchoolID));

                    } else {
                        history.push('/')
                    }

                }})

        }
        

    };

    pageInit(){

        const { dispatch } = this.props;

        let route = history.location.pathname;

        let token = sessionStorage.getItem('token');

        const UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

        dispatch(actions.UpDataState.getLoginUser(UserInfo));

        this.requestData(route);

    }



    render() {
        const { UIState, DataState } = this.props;
        let UserID = DataState.LoginUser.UserID;

        return (
            <React.Fragment>
                <Loading opacity={false} tip="加载中..." size="large" spinning={UIState.AppLoading.appLoading}>


                    <Frame

                        /*userInfo={{
                        name: DataState.LoginUser.UserName,
                        image: DataState.LoginUser.PhotoPath
                    }}*/

                        pageInit={this.pageInit.bind(this)}

                        module={{
                            cnname: "学科管理",
                            enname: "Subject Management",
                            image: logo
                        }}
                        className='myFrame'
                        type="triangle" showBarner={false} showLeftMenu={false}>
                        {/* <div ref="frame-time-barner"><TimeBanner /></div> */}

                        <div ref="frame-right-content">
                            {UserID?<Subject></Subject>:''}
                        </div>
                    </Frame>



                </Loading>
                <Alert show={UIState.AppAlert.appAlert}
                    type={UIState.AppAlert.type}
                    abstract={UIState.AppAlert.littleTitle}
                    title={UIState.AppAlert.title}
                    onOk={UIState.AppAlert.onOk}
                    onHide={UIState.AppAlert.onHide}
                    onCancel={UIState.AppAlert.onCancel}
                    onClose={UIState.AppAlert.onClose}
                ></Alert>

            </React.Fragment >

        );
    }
}
const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(App);