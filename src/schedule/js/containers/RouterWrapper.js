import React,{memo,useState,useMemo} from "react";

import {HashRouter as Router, Redirect,withRouter,Route,Switch} from "react-router-dom";

import ManagerComponent from "./Manager";

import TeacherComponent from "./Teacher";

import StudentComponent from "./Student";

import Import from './Import';

import { useDispatch,useSelector } from 'react-redux';

import AdjustLog from './Manager/AdjustLog';

import ScheduleSetting from "./Manager/ScheduleSetting";


function RouterWrapper(props){

    const LoginUser = useSelector(state=>state.LoginUser);

    const dispatch = useDispatch();

    return (

        <Router>

            <Switch>

                <Route exact path="/manager/scheduleSetting*" component={ScheduleSetting}></Route>

                <Route exact path="/manager/adjustlog*" component={AdjustLog}></Route>

                <Route path="/manager/*"  component={ManagerComponent}></Route>

                <Route path="/teacher/*"  component={TeacherComponent}></Route>

                <Route path="/student/*"  component={StudentComponent}></Route>

                <Route path="/Import*" component={Import}></Route>

                {

                    LoginUser&&(parseInt(LoginUser.UserType)===0||parseInt(LoginUser.UserType)===7||parseInt(LoginUser.UserType)===10)?

                        <Redirect path="/*"  to={{pathname:"/manager/subject-teacher/subject"}}></Redirect>

                        :''

                }

                {

                    LoginUser&&parseInt(LoginUser.UserType)===1?

                        <Redirect path="/*" to={{pathname:"/teacher/mine"}}></Redirect>

                        :''

                }

                {

                    LoginUser&&parseInt(LoginUser.UserType)===2?

                        <Redirect path="/*" to={{pathname:"/student/mine"}}></Redirect>

                        :''

                }
            </Switch>

        </Router>

    );

}



export default memo(withRouter(RouterWrapper));

