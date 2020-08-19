import React,{memo,useState,useEffect,useMemo} from 'react';

import ChangeTab from '../../component/ChangeTab';

import {HashRouter as Router,Route,Switch} from 'react-router-dom';

import Subject from './Subject';

import Teacher from './Teacher';

import {getQueryVariable} from "../../../../common/js/disconnect";


function SubjectTeacher(props){

    const [isWorkPlantform,setIsWorkPlantform] = useState(false);

    useEffect(()=>{

        if (getQueryVariable('isWorkPlantform')){

            setIsWorkPlantform(true);

        }

    },[]);

    const TabLinkList =useMemo(()=>{

      return [

          {link:"/teacher/subject-teacher/subject",name:"学科总课表"},

          {link:"/teacher/subject-teacher/teacher",name:"教师课表"}

      ]

    },[]);

    return (

        <div className={`subject-teacher-wrapper ${isWorkPlantform?'in-work-plant-form':''}`}>

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


export default memo(SubjectTeacher);