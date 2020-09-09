import React,{useEffect,useCallback,useMemo,useRef,useState,memo} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import GuideTitle from '../../components/guideTitle';

import {DatePicker} from "antd";

import {Table, Loading,PagiNation,Empty} from "../../../common";

import GuideFooter from '../../components/guideFooter';

import {guiderStepChange} from "../../store/guideStep";

import {appLoadingHide} from "../../store/appLoading";

import './index.scss'



function Subject(props) {

    //states

    const [loading,setLoading] = useState(true);

    //iframe的高度
    const [iframeHeight,setIframeHeight] = useState(0);

    const [step,setStep] = useState(5);

    const LoginUser = useSelector(state=>state.LoginUser);

    const {UserType,UserID,UserClass,SchoolID} = LoginUser;

    const schoolType = useSelector(state=>state.schoolType);

    const appLoading = useSelector(state=>state.appLoading);

    const dispatch  = useDispatch();

    const {history} = props;




    useEffect(()=>{

        if (UserID){

            const step = schoolType==='middle'?4:5;

            dispatch(guiderStepChange(step));

            setStep(step);

        }

    },[UserID]);



    //下一步
    const nextStepClick = useCallback(()=>{

        const { LockerVersion,ProductType } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        let hash = '/power';

        if (parseInt(LockerVersion)===1){

            hash = '/import';

        }else{

            hash = '/power';

        }

        history.push(hash);

    },[]);

    //上一步
    const backStepClick = useCallback(()=>{

        history.push('/scheduleSetting');

    },[]);

    //iframe的URL
    const url = useMemo(()=>{

        const token = sessionStorage.getItem("token");

        return `/html/admSubject/index.html?lg_tk=${token}&showTop=0&showBottom=0&showBarner=0&isInitGuide=true`

    },[]);


    //接受消息
    window.addEventListener('message',(e)=>{

        const host = window.location.host;

        const protocol = window.location.protocol;

        if (e.data.module==='subject'&&e.origin===`${protocol}//${host}`){

            

            setIframeHeight(e.data.height);

        }

    });

    //iframe加载完毕
    const iframeLoad = useCallback(()=>{

        setLoading(false);

    });

    return(

        <Loading spinning={loading} tip={"加载中,请稍候..."}>

            <GuideTitle title={"设置学科"} step={step} tips={"(后续可通过“学科管理”模块进行管理)"}></GuideTitle>

            <iframe id={'subjectIframe'} onLoad={iframeLoad} src={url} frameBorder="0"  style={{width:'100%',height:iframeHeight}}></iframe>

            {

                loading?

                    null

                    :

                    <GuideFooter next={true} back={true} backStepClick={backStepClick} nextStepClick={nextStepClick}></GuideFooter>

            }


        </Loading>

    )

}

export default memo(Subject)