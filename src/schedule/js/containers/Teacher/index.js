import React,{useEffect,useCallback,useState,useMemo,useRef,memo} from 'react';

import {HashRouter as Router,Route,Switch,Redirect} from  'react-router-dom';

import HeaderRouter from '../../component/HeaderRouter';

import TeacherPersonalSchedule from './TeacherPersonalSchedule'

import SubjectTeacher from './SubjectTeacher';

import ClassTotalStudent from "../Teacher/ClassTotalStudent";

import { useSelector,useDispatch } from 'react-redux';

import {getQueryVariable} from "../../../../common/js/disconnect";


function Index(props){

    const [isFrame,setIsFrame] = useState(false);

    const [headerLink,setHeaderLink] = useState([]);


    const LoginUser = useSelector(state=>state.LoginUser);

    const { UserType,UserClass,UserID } = LoginUser;

    const dispatch = useDispatch();

    useEffect(()=>{

        if (UserID){

            if (getQueryVariable("iFrame")){

                setIsFrame(true);

            }

            if (UserType==='1'){

                let UserClassType = UserClass[2];

                if (UserClassType==='1'){

                    console.log(getQueryVariable('iFrame'));

                    let list = getQueryVariable('iFrame')?
                        [
                        {link:"/teacher/mine",name:"我的课表",logo:"mine"},
                        {link:"/teacher/class",name:"班级课表",logo:"class"}
                        ]:
                        [
                            {link:"/teacher/subject-teacher",name:"学科教师课表",logo:"subject"},
                            {link:"/teacher/mine",name:"我的课表",logo:"mine"},
                            {link:"/teacher/class",name:"班级课表",logo:"class"}
                        ];

                    setHeaderLink(list);

                }else{

                    let list = getQueryVariable('iFrame')?
                        [
                            {link:"/teacher/mine",name:"我的课表",logo:"mine"},
                        ]:
                        [
                            {link:"/teacher/subject-teacher",name:"学科教师课表",logo:"subject"},
                            {link:"/teacher/mine",name:"我的课表",logo:"mine"},
                        ];

                    setHeaderLink(list);

                }

            }else {

                window.location.href='/Error.aspx?errcode=E011';

            }

        }

    },[UserID]);


        return (

            <React.Fragment>

                {/*头部的路由选项卡*/}

                <HeaderRouter HeaderLinkList={headerLink}></HeaderRouter>

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


export default memo(Index);