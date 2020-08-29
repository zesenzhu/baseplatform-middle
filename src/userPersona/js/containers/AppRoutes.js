/*
import React,{useState,useRef,useMemo,memo,useEffect,useCallback} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import { Switch,Route } from 'react-router-dom';

function AppRoutes(props) {

   const pageUsedType = useSelector(state=>state.pageUsedType);

    const {UserID,UserType} = useSelector(state=>state.targetUser);

   const { UsedType } = pageUsedType;

   useEffect(()=>{

        if (UsedType){

            console.log(UsedType);

        }

   },[UsedType]);


   const route = useMemo(()=>{

       switch (UserType) {

           case 2:

               return <Route path={"/student"} component={StudentContent}></Route>;

           case 1:

               return <Route path={"/teacher"} component={TeacherContent}></Route>;

           default:

               return null;

       }


   },[UserType]);

    return(

        <Switch>

            {route}

        </Switch>

    )

}

export default memo(AppRoutes);*/
