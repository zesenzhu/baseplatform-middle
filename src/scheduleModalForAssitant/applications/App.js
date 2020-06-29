import React,{useState,useEffect,useRef,useContext} from 'react';

import {StateContext} from './ReduxConatiner';

import {getQueryUrlParams,modalGetNeedInfo} from "../api/utils";

import {urlParamsChange} from '../store/index';

import ChangeTimeModal from './ChangeTimeModal';

import ChangeClassRoomModal from './ChangeClassRoomModal';

import ChangeTeacherModal from './ChangeTeacherModal';

import {showErrorAlert} from "../store/appAlert";

import {Alert} from '../../common';




function App() {


    const {state,dispatch} = useContext(StateContext);

    const  { appAlert } = state;



    useEffect(()=> {

        const params = getQueryUrlParams();

        urlParamsChange(params,dispatch);

        const {token,Type,ScheduleID} = params;

        //获取modal所需要的信息

        //判断参数是否合法和正确

        if (token&&Type&&ScheduleID&&(parseInt(Type)===1||parseInt(Type)===2||parseInt(Type)===3)){

            modalGetNeedInfo({token,ScheduleID,dispatch});

        }else{

            showErrorAlert({title:'参数不合法或者参数不正确',dispatch});

        }



    },[]);

    return(

        <>

            {

                state.Type===1?

                    <ChangeTimeModal>


                    </ChangeTimeModal>

                    :''

            }

            {

                state.Type === 2?

                    <ChangeClassRoomModal></ChangeClassRoomModal>

                    :''

            }

            {

                state.Type === 3?

                    <ChangeTeacherModal></ChangeTeacherModal>

                    :''

            }

            <Alert type={appAlert.type} title={appAlert.title} abstract={appAlert.abstract} okTitle={appAlert.okTitle} cancelTitle={appAlert.cancelTitle} show={appAlert.show} cancelShow={appAlert.cancelShow} okShow={appAlert.okShow} onHide={appAlert.hide} onOk={appAlert.ok} onCancel={appAlert.cancel} onClose={appAlert.close}></Alert>

        </>

    )

}

export default App;