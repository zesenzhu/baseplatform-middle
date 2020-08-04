import React,{memo,useEffect,useRef,useCallback,useMemo} from 'react';

import {withRouter} from 'react-router-dom';

import {Alert,Loading} from "../../common";

import {useSelector,useDispatch} from 'react-redux';

import { GetBaseInfoForPages } from '../actions/apiActions';

import {loginUserUpdate} from "../store/LoginUser";

import {firstPageLoad} from '../../common/js/disconnect/index';

import Header from './header';

import Guider from './guider'

import AppRoutes from './appRoutes';

function App(props) {



    const { appAlert,appSuccessAlert } = useSelector(state=>state.AppAlert);

    const loading = useSelector(state=>state.AppLoading);

    const LoginUser = useSelector(state=>state.LoginUser);

    const dispatch = useDispatch();

    useEffect(()=>{

        const LgBasePlatformInfo = sessionStorage.getItem("LgBasePlatformInfo");

        if (LgBasePlatformInfo){

            firstPageLoad(firstLoad);

        }else{

            GetBaseInfoForPages({dispatch}).then(data=>{

                if (data){

                    sessionStorage.setItem('LgBasePlatformInfo',JSON.stringify(data));

                    firstPageLoad(firstLoad)

                }

            })

        }

    },[]);


    const firstLoad = () =>{

      const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

      dispatch(loginUserUpdate(UserInfo));

    };

    return(

        <>

            <Loading spinning={loading} tip={"加载中,请稍候..."} opacity={false}>

                <div className={"init-guid-app"}>

                    <Header LoginUser={LoginUser}></Header>

                    <Guider></Guider>

                    <AppRoutes></AppRoutes>

                </div>

            </Loading>



            <Alert type={appAlert.type} show={appAlert.show} title={appAlert.title} onOk={appAlert.ok} onCancel={appAlert.cancel} onClose={appAlert.close} abstract={appAlert.abstract} okShow={appAlert.okShow} cancelShow={appAlert.cancelShow}></Alert>

            <Alert  show={appSuccessAlert.show} title={appSuccessAlert.title} onHide={appSuccessAlert.hide}></Alert>


        </>

    )

}

export default memo(withRouter(App));