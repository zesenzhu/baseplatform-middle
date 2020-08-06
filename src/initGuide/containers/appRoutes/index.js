import React,{useEffect,useCallback,useMemo,useRef,useState,memo} from 'react';

import {HashRouter as Router,Switch,Route,Redirect} from 'react-router-dom';

import Guider from "../guider";

import {useSelector,useDispatch} from 'react-redux';

function AppRoutes(props) {

    const {UserType,UserID,UserClass,SchoolID} = useSelector(state=>state.LoginUser);

    useEffect(()=>{

        if (UserID){



        }

    },[UserType,UserID,SchoolID]);

    return(

        <Switch>

            <Route path={"/"}></Route>

        </Switch>

    )

}

export default AppRoutes;