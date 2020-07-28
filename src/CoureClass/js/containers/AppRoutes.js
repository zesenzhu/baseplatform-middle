import React,{useState,useEffect,useMemo,memo} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import {HashRouter as Router,Route,Redirect,Switch} from 'react-router-dom';

import Manage from './manage';

import GradeTotal from './statics/grade-statics/total';

import TheGrade from './statics/grade-statics/the-grade';

import SubjectTotal from './statics/subject-statics/total';

import TheSubject from './statics/subject-statics/the-subject';

import ImportFile from '../component/ImportFile';

import Record from '../component/Record';

import Dynamic from '../component/Dynamic';

import Teacher from '../component/Teacher';

import Student from './Student';


function AppRoutes(props){

    const {UserType,UserClass} = useSelector(state=>state.LoginUser);

    const RedirctPath = useMemo(()=>{

        switch (UserType) {

            case 0:

                return (<Switch>

                    <Route path="/Log/Record" component={Record}></Route>

                    <Route path="/Log/Dynamic" component={Dynamic}></Route>

                    <Redirect path={"/statics/subject*"} to={'/statics/subject/total'}></Redirect>

                    <Redirect path={"/statics/grade*"} to={'/statics/grade/total'}></Redirect>

                    <Redirect path={"/statics*"} to={'/statics/grade/total'}></Redirect>

                    <Redirect path={"/*"} to={'/manage'}></Redirect>

                </Switch>);

                break;

            case 1:

                return (<Switch>

                    <Redirect path={"/*"} to={'/Teacher'}></Redirect>

                </Switch>);

                break;

            case 2:

                return (<Switch>

                    <Redirect path={"/*"} to={'/Student'}></Redirect>

                </Switch>);

                break;

        }

    },[UserType]);

    return(

        <Switch>

           {/* {

                parseInt(UserType)===0||(parseInt(UserType)===7&&parseInt(UserClass)===2)?

                    <Switch>

                        <Route exact path="/ImportFile" component={ImportFile}></Route>

                        <Route path={'/manager'} component={Manager}></Route>

                        <Route path="/Log/Record" component={Record}></Route>

                        <Route path="/Search/:value" key={history.location.pathname}  component={Search}></Route>

                        <Route path="/Log/Dynamic" component={Dynamic}></Route>

                        <Redirect path={"/"} to={"/manager/subject/all"}></Redirect>

                    </Switch>

                    :''

            }

            {

                parseInt(UserType)===1?

                    <Switch>

                        <Route exact path="/ImportFile" component={ImportFile}></Route>

                        <Route path="/Teacher" component={Teacher}></Route>

                        <Redirect path={"/"} to={"/Teacher"}></Redirect>

                    </Switch>

                    :''

            }*/}

            <Route exact path={"/manage"} component={Manage}></Route>

            <Route exact path={"/statics/grade/total"} component={GradeTotal}></Route>

            <Route exact path={"/statics/grade/:gradeID"} component={TheGrade}></Route>

            <Route exact path={"/statics/subject/total"} component={SubjectTotal}></Route>

            <Route exact path={"/statics/subject/:subjectID"} component={TheSubject}></Route>

            <Route exact path="/ImportFile" component={ImportFile}></Route>

            <Route exact path="/Teacher" component={Teacher}></Route>

            <Route path={"/Student"} component={Student}></Route>

            {RedirctPath}

        </Switch>

    )

}



export default memo(AppRoutes);