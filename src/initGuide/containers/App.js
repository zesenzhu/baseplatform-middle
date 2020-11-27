import React,{memo,useEffect,useRef,useCallback,useMemo} from 'react';

import {withRouter} from 'react-router-dom';

import {Alert,Loading} from "../../common";

import {useSelector,useDispatch} from 'react-redux';

import { GetBaseInfoForPages,GetSchoolInitStatus } from '../actions/apiActions';

import {loginUserUpdate} from "../store/LoginUser";

import {firstPageLoad} from '../../common/js/disconnect/index';

import {schoolTypeChange} from "../store/schoolType";

import {GetCurrentTermInfo} from '../actions/apiActions';

import {getQueryVariable} from "../../common/js/disconnect/index";

import Header from './header';

import Guider from './guider'

import AppRoutes from './appRoutes';

import './App.scss';

import {getNewTkUrl} from "../actions/utils";

function App(props) {



    const { appAlert,appSuccessAlert } = useSelector(state=>state.appAlert);

    const loading = useSelector(state=>state.appLoading);

    const LoginUser = useSelector(state=>state.LoginUser);

    const dispatch = useDispatch();

    const { history } = props;


    useEffect(()=>{

        GetBaseInfoForPages({dispatch}).then(data=>{

                if (data){

                    sessionStorage.setItem('LgBasePlatformInfo',JSON.stringify(data));

                    firstPageLoad(firstLoad)

                }

            });

    },[]);


    const firstLoad = () =>{

      const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

      const CopyUserInfo = UserInfo;

      CopyUserInfo['UserType'] = parseInt(UserInfo['UserType']);

      const { SchoolID,UserType } = CopyUserInfo;

      const token = sessionStorage.getItem("token");

      const { ProductUseRange } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

      if ([1,2,6,7,9].includes(parseInt(ProductUseRange))){

            dispatch(schoolTypeChange('university'));

            //dispatch(schoolTypeChange('middle'));

        }else if ([3,4,5,8].includes(parseInt(ProductUseRange))){

            dispatch(schoolTypeChange('middle'));

            //dispatch(schoolTypeChange('university'));

        }


      if (UserType===0){

          if (SchoolID){

              GetSchoolInitStatus({schoolID:SchoolID,dispatch}).then(data=>{

                  if (data){

                      const {UserType,SchoolID} = JSON.parse(sessionStorage.getItem("UserInfo"));

                      const { WebIndexUrl } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

                      const token = sessionStorage.getItem("token");

                      const preUri = getQueryVariable('lg_preurl');

                      let nexUrl = '';

                      const urlObj = preUri?getNewTkUrl({preUrl:preUri,jointParam:`?lg_tk=${token}`}):getNewTkUrl({preUrl:WebIndexUrl,jointParam:`?lg_tk=${token}`});

	                  const uriMain = urlObj.newUrl.split('#/')[0];

	                  const uriHash = urlObj.newUrl.split('#/')[1]?'#/'+urlObj.newUrl.split('#/')[1]:'';

                      switch (urlObj.type) {

                          case 1:

                              nexUrl = urlObj.newUrl;

                              break;

                          case 2:

	                          nexUrl = uriMain + '&lg_tk=' + token+uriHash;

                              break;

                          case 3:

	                          nexUrl = uriMain + '?lg_tk=' + token+uriHash;

                              break;

                      }

                      window.location.href = nexUrl;

                  }else{

                      dispatch(loginUserUpdate(UserInfo));

                  }

              });

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

                        {

                            LoginUser.UserID?

                                <AppRoutes></AppRoutes>

                                :null

                        }

                    </div>



                </div>

            </Loading>



            <Alert type={appAlert.type} show={appAlert.show} title={appAlert.title} onOk={appAlert.ok} onCancel={appAlert.cancel} onClose={appAlert.close} abstract={appAlert.abstract} okShow={appAlert.okShow} cancelShow={appAlert.cancelShow}></Alert>

            <Alert type={appSuccessAlert.type} show={appSuccessAlert.show} title={appSuccessAlert.title} onHide={appSuccessAlert.hide}></Alert>


        </>

    )

}

export default memo(withRouter(App));