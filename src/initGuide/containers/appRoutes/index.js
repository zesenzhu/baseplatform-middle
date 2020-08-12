import React,{useEffect,useCallback,useMemo,useRef,useState,memo} from 'react';

import {HashRouter as Router,Switch,Route,Redirect} from 'react-router-dom';

import {useSelector,useDispatch} from 'react-redux';

import SchoolSetting from '../schoolSetting';


function AppRoutes(props) {

    const {UserType,UserID,UserClass,SchoolID} = useSelector(state=>state.LoginUser);

    useEffect(()=>{

        if (UserID){



        }

    },[UserType,UserID,SchoolID]);

    return(

        <Switch>

            <Route path={"/schoolSetting"} component={SchoolSetting}></Route>

            <Redirect path={"/*"} to={"/schoolSetting"}></Redirect>

        </Switch>

    )

}

export default AppRoutes;