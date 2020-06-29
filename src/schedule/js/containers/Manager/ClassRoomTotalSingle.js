import React,{Component} from 'react';

import ChangeTab from "../../component/ChangeTab";

import {HashRouter as Router, Route, Switch} from "react-router-dom";

import ClassRoomTotal from './ClassRoomTotal';

import ClassRoomSingle from './ClassRoomSingle';




class ClassRoomTotalSingle extends Component{


    render(){

        const TabLinkList = [

            {link:"/manager/room/total",name:"教室总课表"},

            {link:"/manager/room/single",name:"教室课表"}

        ];

        return <div className="class-total-single-wrapper">

            <ChangeTab TabLinkList = {TabLinkList}></ChangeTab>

            <Router>

                <Switch>

                    <Route path="/manager/room/total"  component={ClassRoomTotal}></Route>

                    <Route path="/manager/room/single"  component={ClassRoomSingle}></Route>

                </Switch>

            </Router>

        </div>

    }

}



export default ClassRoomTotalSingle;