import React,{memo,useEffect,useRef,useCallback,useMemo} from 'react';

import {withRouter} from 'react-router-dom';

import {Alert,Loading} from "../../common";

import {useSelector,useDispatch} from 'react-redux';

import { GetBaseInfoForPages } from '../actions/apiActions';

import {loginUserUpdate} from "../store/LoginUser";

import {firstPageLoad} from '../../common/js/disconnect/index';

import {schoolTypeChange} from "../store/schoolType";

import {GetCurrentTermInfo} from '../actions/apiActions';

import Header from './header';

import Guider from './guider'

import AppRoutes from './appRoutes';

import './App.scss';

function App(props) {



    const { appAlert,appSuccessAlert } = useSelector(state=>state.appAlert);

    const loading = useSelector(state=>state.appLoading);

    const LoginUser = useSelector(state=>state.LoginUser);

    const dispatch = useDispatch();

    const { history } = props;


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

      const CopyUserInfo = UserInfo;

      CopyUserInfo['UserType'] = parseInt(UserInfo['UserType']);

      const { SchoolID,UserType } = CopyUserInfo;

      const token = sessionStorage.getItem("token");

        const { ProductUseRange } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        if ([4,7,8,9].includes(parseInt(ProductUseRange))){

            window.location.href = `/html/admSchoolSetting?lg_tk=${token}`;

        }else if ([1,2,6].includes(parseInt(ProductUseRange))){

            dispatch(schoolTypeChange('university'));

            //dispatch(schoolTypeChange('middle'));

        }else if ([3,5].includes(parseInt(ProductUseRange))){

            dispatch(schoolTypeChange('middle'));

            //dispatch(schoolTypeChange('university'));

        }


      if (UserType===0){

          if (SchoolID){

              GetCurrentTermInfo({dispatch,SchoolID}).then(data=>{

                  if (data){

                      history.push('/schoolSetting');

                      dispatch(loginUserUpdate(UserInfo));

                      //真实的跳转

                  }else{

                      history.push('/schoolSetting');

                      dispatch(loginUserUpdate(UserInfo));

                  }

              })

          }else{

              history.push('/schoolSetting');

              dispatch(loginUserUpdate(UserInfo));

          }


      }else{

          window.location.href='/Error.aspx?errcode=E011';

      }

    };

    return(

        <>

            <Loading spinning={loading} tip={"加载中,请稍候..."} opacity={false}>

                <div className={"init-guid-app"}>

                    <Header></Header>

                    <Guider></Guider>

                    <div className={"init-guide-content"}>

                        <AppRoutes></AppRoutes>

                    </div>



                </div>

            </Loading>



            <Alert type={appAlert.type} show={appAlert.show} title={appAlert.title} onOk={appAlert.ok} onCancel={appAlert.cancel} onClose={appAlert.close} abstract={appAlert.abstract} okShow={appAlert.okShow} cancelShow={appAlert.cancelShow}></Alert>

            <Alert  show={appSuccessAlert.show} title={appSuccessAlert.title} onHide={appSuccessAlert.hide}></Alert>


        </>

    )

}

export default memo(withRouter(App));