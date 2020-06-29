import React,{Component} from 'react';

import {HashRouter as Router,Route,Switch,Redirect} from  'react-router-dom';

import HeaderRouter from '../../component/HeaderRouter';

import TeacherPersonalSchedule from './TeacherPersonalSchedule'

import SubjectTeacher from './SubjectTeacher';

import ClassTotalStudent from "../Teacher/ClassTotalStudent";

import { connect } from 'react-redux';




class Index extends Component{




    render() {

        let HeaderLinkList = [];

        const { LoginUser,dispatch } = this.props;

        const { UserType,UserClass,UserID } = LoginUser;

        if (Object.keys(LoginUser).length>0){

            if (UserType==='1'){

                let UserClassType = UserClass[2];

                if (UserClassType==='1'){

                    HeaderLinkList = [

                                {link:"/teacher/subject-teacher",name:"学科教师课表",logo:"subject"},

                                {link:"/teacher/mine",name:"我的课表",logo:"mine"},

                                {link:"/teacher/class",name:"班级课表",logo:"class"},

                            ];

                }else{

                    HeaderLinkList = [

                        {link:"/teacher/subject-teacher",name:"学科教师课表",logo:"subject"},

                        {link:"/teacher/mine",name:"我的课表",logo:"mine"}

                    ];

                }

            }else {

                window.location.href='/Error.aspx?errcode=E011';

            }

        }


        return (

            <React.Fragment>

                {/*头部的路由选项卡*/}

                <HeaderRouter HeaderLinkList={HeaderLinkList}></HeaderRouter>
                {/* 泡泡型标签链接按钮*/}

                <Router>

                    <Switch>

                        <Route path="/teacher/subject-teacher/*" component={SubjectTeacher}></Route>

                        <Route path="/teacher/mine" component={TeacherPersonalSchedule}></Route>

                        <Route path="/teacher/class/*" component={ClassTotalStudent}></Route>

                        <Redirect path="/teacher/subject-teacher*" to={{pathname:"/teacher/subject-teacher/subject"}}></Redirect>

                        <Redirect path="/teacher/class*" to={{pathname:"/teacher/class/total"}}></Redirect>


                    </Switch>

                </Router>

            </React.Fragment>

        );

    }

}

const mapStateToProps = (state) => {

    const { LoginUser } = state;

    return { LoginUser };

};

export default connect(mapStateToProps)(Index);