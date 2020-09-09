import React,{useEffect,useCallback,useMemo,useRef,useState,memo} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import GuideTitle from '../../components/guideTitle';

import {DatePicker} from "antd";

import {Tips,DropDown, Loading} from "../../../common";

import GuideFooter from '../../components/guideFooter';

import {guiderStepChange} from "../../store/guideStep";

import {appLoadingHide} from "../../store/appLoading";


import './index.scss'

import moment from 'moment';

import {getQueryVariable} from "../../../common/js/disconnect";



function ScheduleSettinng(props) {

    //states

    const [loading,setLoading] = useState(true);

    //step
    const [step,setStep] = useState(4);

    //iframe高度

    const [iframeHeight,setIframeHeight] = useState(0);

    const LoginUser = useSelector(state=>state.LoginUser);

    const {UserType,UserID,UserClass,SchoolID} = LoginUser;

    const schoolType = useSelector(state=>state.schoolType);

    const appLoading = useSelector(state=>state.appLoading);

    const dispatch  = useDispatch();

    const {history} = props;


    const iframeRef = useRef();


    useEffect(()=>{

        if (UserID){

            const step = schoolType==='middle'?3:4;

            setStep(step);

            dispatch(guiderStepChange(step));

        }

    },[UserID]);






    //下一步
    const nextStepClick = useCallback(()=>{

        const { LockerVersion,ProductType } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        let hash = '/subject';

        if (schoolType==='university'){

           if (parseInt(ProductType)===6){

                if (parseInt(LockerVersion)===1){

                    hash = '/import';

                }else{

                    hash = '/power';

                }

           }

        }

        history.push(hash);

    },[]);

    //上一步

    const backStepClick = useCallback(()=>{

     /*   if (schoolTypeRef.current==='middle'){

            history.push('/schoolSetting');

        }else{

            history.push('/college');

        }*/

     history.push('/yearAndTerm');

    },[]);


    //iframe的URL
    const iframeUrl = useMemo(()=>{

        const token = sessionStorage.getItem("token");

        const src = `/html/schedule?lg_tk=${token}&showTop=0&showBottom=0&showBarner=0&isInitGuide=true#/manager/scheduleSetting`;

        return src;

    },[]);


    //iframe加载完毕
    const iframeLoaded = useCallback(()=>{

        setLoading(false);

    },[]);


    window.addEventListener('message',(e)=>{

        const host = window.location.host;

        const protocol = window.location.protocol;

        if (e.data.module==='schedule'&&e.origin===`${protocol}//${host}`){

            setIframeHeight(e.data.height);

        }

    });





    return(

        <Loading spinning={loading} tip={"加载中,请稍候..."}>

            <GuideTitle title={"设置上课时间"} step={step} tips={"(后续可通过“课程安排管理”模块进行管理)"}></GuideTitle>

            <iframe width={'100%'}  ref={iframeRef} frameBorder={0} src={iframeUrl} style={{height:iframeHeight}} onLoad={iframeLoaded}></iframe>

            {

                loading?

                    null

                    :

                    <GuideFooter next={true} back={true} backStepClick={backStepClick} nextStepClick={nextStepClick}></GuideFooter>

            }

        </Loading>

    )

}

export default memo(ScheduleSettinng)