import React,{useEffect,useCallback,useMemo,useRef,useState,memo} from 'react';

import {Switch,Route,Redirect} from 'react-router-dom';

import SchoolSetting from '../schoolSetting';

import College from '../college';

import YearAndTerm from '../yearAndTerm';

import ScheduleSetting from '../scheduleSetting';

import Subject from '../subject';

import Power from '../power';

import Import from '../import';


function AppRoutes(props) {

    return(

        <Switch>

            <Route path={"/schoolSetting"} component={SchoolSetting}></Route>

            <Route path={"/college"} component={College}></Route>

            <Route path={"/yearAndTerm"} component={YearAndTerm}></Route>

            <Route path={"/scheduleSetting"} component={ScheduleSetting}></Route>

            <Route path={'/subject'} component={Subject}></Route>

            <Route path={'/power'} component={Power}></Route>

            <Route path={'/import'} component={Import}></Route>

            {/* <Route path={"/schoolSetting"} render={()=>{return <SchoolSetting></SchoolSetting>}}></Route>

            <Route path={"/college"} render={()=>{return <College></College>}}></Route>

            <Route path={"/yearAndTerm"} render={()=>{return <YearAndTerm></YearAndTerm>}}></Route>

            <Route path={"/scheduleSetting"} render={()=>{return <ScheduleSetting></ScheduleSetting>}}></Route>

            <Route path={'/subject'} render={()=>{return <Subject></Subject>}}></Route>

            <Route path={'/power'} render={()=>{return <Power></Power>}}></Route>

            <Route path={'/import'} render={()=>{return <Import></Import>}}></Route>*/}

            <Redirect path={"/*"} to={"/schoolSetting"}></Redirect>

        </Switch>

    )

}

export default memo(AppRoutes);