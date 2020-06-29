import React,{Component} from 'react';

import ChangeTab from '../../component/ChangeTab';

import {HashRouter as Router,Route,Switch} from 'react-router-dom';

import Subject from './Subject';

import Teacher from './Teacher';


class SubjectTeacher extends Component{

    render() {

        const TabLinkList = [

                {link:"/manager/subject-teacher/subject",name:"学科总课表"},

                {link:"/manager/subject-teacher/teacher",name:"教师课表"}

            ];

        return (

            <div className="subject-teacher-wrapper">

                <ChangeTab TabLinkList = {TabLinkList}></ChangeTab>

                <Router>

                    <Switch>

                        <Route path="/manager/subject-teacher/subject"  component={Subject}></Route>

                        <Route path="/manager/subject-teacher/teacher"  component={Teacher}></Route>

                    </Switch>

                </Router>

            </div>

        );

    }

}


export default SubjectTeacher;