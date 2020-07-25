import React,{useState,useEffect,useMemo,memo} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import {HashRouter as Router,Route,Redirect,Switch} from 'react-router-dom';

import Manage from './manage';

import CollegeTotal from './statics/college-statics/total';

import TheCollege from './statics/college-statics/the-college';

import CourseTotal from './statics/course-statics/total';

import TheCourse from './statics/course-statics/the-course';

import TeacherTotal from './statics/teacher-statics/total';

import TheResearchRoom from './statics/teacher-statics/the-research-room';

import ImportFile from '../component/ImportFile';

import Record from '../component/Record';

import Dynamic from '../component/Dynamic';

import Teacher from '../component/Teacher';


function AppRoutes(props){

    const {UserType,UserClass} = useSelector(state=>state.LoginUser);

    const RedirctPath = useMemo(()=>{

        switch (UserType) {

            case 0:

                return (<Switch>

                    <Route path="/Log/Record" component={Record}></Route>

                    <Route path="/Log/Dynamic" component={Dynamic}></Route>

                    <Redirect path={"/statics/teacher*"} to={'/statics/teacher/total'}></Redirect>

                    <Redirect path={"/statics/course*"} to={'/statics/course/total'}></Redirect>

                    <Redirect path={"/statics/college*"} to={'/statics/college/total'}></Redirect>

                    <Redirect path={"/statics*"} to={'/statics/college/total'}></Redirect>

                    <Redirect path={"/*"} to={'/manage'}></Redirect>

                </Switch>);

                break;

            case 1:

                return (<Switch>

                    <Redirect path={"/*"} to={'/Teacher'}></Redirect>

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

            <Route exact path={"/statics/college/total"} component={CollegeTotal}></Route>

            <Route exact path={"/statics/college/:collegeID"} component={TheCollege}></Route>

            <Route exact path={"/statics/course/total"} component={CourseTotal}></Route>

            <Route exact path={"/statics/course/:courseType"} component={TheCourse}></Route>

            <Route exact path={"/statics/teacher/total"} component={TeacherTotal}></Route>

            <Route exact path={"/statics/teacher/:teachingRoomID"} component={TheResearchRoom}></Route>

            <Route exact path="/ImportFile" component={ImportFile}></Route>

            <Route exact path="/Teacher" component={Teacher}></Route>

            {RedirctPath}

        </Switch>

    )

}



export default memo(AppRoutes);