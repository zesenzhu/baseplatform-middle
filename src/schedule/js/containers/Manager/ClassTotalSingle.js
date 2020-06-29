import React,{Component} from 'react';

import ChangeTab from "../../component/ChangeTab";

import {HashRouter as Router, Route, Switch} from "react-router-dom";

import ClassTotal from './ClassTotal';

import ClassSingle from './ClassSingle';




class ClassTotalSingle extends Component{


    render(){

        const TabLinkList = [

            {link:"/manager/class/total",name:"班级总课表"},

            {link:"/manager/class/single",name:"班级课表"}

        ];

        return <div className="class-total-single-wrapper">

            <ChangeTab TabLinkList = {TabLinkList}></ChangeTab>

            <Router>

                <Switch>

                    <Route path="/manager/class/total"  component={ClassTotal}></Route>

                    <Route path="/manager/class/single"  component={ClassSingle}></Route>

                </Switch>

            </Router>

        </div>

    }

}



export default ClassTotalSingle;