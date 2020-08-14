import React,{useEffect,useCallback,useMemo,useRef,useState,memo} from 'react';

import {Switch,Route,Redirect} from 'react-router-dom';

import SchoolSetting from '../schoolSetting';

import College from '../college';

import YearAndTerm from '../yearAndTerm';


function AppRoutes(props) {

    return(

        <Switch>

            <Route path={"/schoolSetting"} component={SchoolSetting}></Route>

            <Route path={"/college"} component={College}></Route>

            <Route path={"/yearAndTerm"} component={YearAndTerm}></Route>

            <Redirect path={"/*"} to={"/schoolSetting"}></Redirect>

        </Switch>

    )

}

export default memo(AppRoutes);