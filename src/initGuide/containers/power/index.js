import React,{useEffect,useCallback,useMemo,useRef,useState,memo} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import GuideTitle from '../../components/guideTitle';

import {DatePicker} from "antd";

import {Table, Loading,PagiNation,Empty} from "../../../common";

import GuideFooter from '../../components/guideFooter';

import {guiderStepChange} from "../../store/guideStep";

import {appLoadingHide} from "../../store/appLoading";

import './index.scss'



function Power(props) {

    //states

    const [loading,setLoading] = useState(true);


    //iframe的高度
    const [iframeHeight,setIframeHeight] = useState(0);


    const [step,setStep] = useState(6);

    const LoginUser = useSelector(state=>state.LoginUser);

    const {UserType,UserID,UserClass,SchoolID} = LoginUser;

    const schoolType = useSelector(state=>state.schoolType);

    const appLoading = useSelector(state=>state.appLoading);

    const dispatch  = useDispatch();

    const {history} = props;

    //refs

    useEffect(()=>{

        if (UserID){

            let step = 5;

            const { LockerVersion,ProductType } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

            if (parseInt(LockerVersion)===1){

                history.push('/schoolSetting');

            }else{

                if (schoolType==='university'){

                    step = parseInt(ProductType)===6?5:6;

                }

            }

            dispatch(guiderStepChange(step));

            setStep(step);

        }

    },[UserID]);



    //下一步
    const nextStepClick = useCallback(()=>{

        history.push('/import');

    },[]);

    //上一步
    const backStepClick = useCallback(()=>{

        console.log(schoolType);

        const { LockerVersion,ProductType } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        let hash = '/subject';

        if (schoolType==='university'){

            if (parseInt(ProductType)===6){

               hash = '/scheduleSetting';

            }

        }

        history.push(hash);

    },[]);

    //iframe的URL
    const url = useMemo(()=>{

        const token = sessionStorage.getItem("token");

        return `/html/admPower/index.html?lg_tk=${token}&showTop=0&showBottom=0&showBarner=0&isInitGuide=true`

    },[]);


    //接受消息
    window.addEventListener('message',(e)=>{

        const host = window.location.host;

        const protocol = window.location.protocol;

        if (e.data.module==='power'&&e.origin===`${protocol}//${host}`){

            setIframeHeight(e.data.height);

            setLoading(false);

        }

    });


   //iframe加载完成

    const iframeLoad = useCallback(()=>{

        setLoading(false);

    },[]);




    return(

        <Loading spinning={loading} tip={"加载中,请稍候..."}>

            <GuideTitle title={"设置角色权限"} step={step} tips={"(后续可通过“角色权限管理”模块进行管理)"}></GuideTitle>

            <iframe id={'powerIframe'} onLoad={iframeLoad} src={url} frameBorder="0"  style={{width:'100%',height:iframeHeight}}></iframe>

            {

                loading?

                    null

                    :

                    <GuideFooter next={true} back={true} backStepClick={backStepClick} nextStepClick={nextStepClick}></GuideFooter>

            }

        </Loading>

    )

}

export default memo(Power)