import React,{Component} from 'react';

import ChangeTab from '../../component/ChangeTab';

import {HashRouter as Router,Route,Switch} from 'react-router-dom';

import Subject from './Subject';

import Teacher from './Teacher'

import {connect} from 'react-redux';

class SubjectTeacher extends Component{

    render() {

        const TabLinkList = [

            {link:"/teacher/subject-teacher/subject",name:"学科总课表"},

            {link:"/teacher/subject-teacher/teacher",name:"教师课表"}

        ];

        return (

            <div className="subject-teacher-wrapper">

                <ChangeTab TabLinkList = {TabLinkList}></ChangeTab>

                <Router>

                    <Switch>

                        <Route path="/teacher/subject-teacher/subject"  component={Subject}></Route>

                        <Route path="/teacher/subject-teacher/teacher"  component={Teacher}></Route>

                    </Switch>

                </Router>

            </div>

        );

    }

}
const mapStateToProps = (state) =>{

    return{
        state
    }

};

export default connect(mapStateToProps)(SubjectTeacher);