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


    //分页

    const [pagination,setPagination] = useState({

       total:0,

       pageSize:10,

       current:1

    });

    //数据源头

    const [dataSource,setDataSource] = useState([]);


    const [subjectModal,setSubjectModal] = useState({

       show:false,

       isDefault:false,

       subId:'',

       subName:''

    });

    //iframe的高度
    const [iframeHeight,setIframeHeight] = useState(0);


    const LoginUser = useSelector(state=>state.LoginUser);

    const {UserType,UserID,UserClass,SchoolID} = LoginUser;

    const schoolType = useSelector(state=>state.schoolType);

    const appLoading = useSelector(state=>state.appLoading);

    const dispatch  = useDispatch();

    const {history} = props;

    //refs

    const paginationRef = useRef(pagination);


    useEffect(()=>{

        if (UserID){

            const step = schoolType==='middle'?4:5;

            dispatch(guiderStepChange(step));

            setLoading(false);

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
    const url = useMemo(()=>{

        const token = sessionStorage.getItem("token");

        return `/html/admSubject/index.html?lg_tk=${token}&showTop=0&showBottom=0&showBarner=0&isInitGuide=true`

    },[]);


    //接受消息
    window.addEventListener('message',(e)=>{

        if (e.data.height){

            setIframeHeight(e.data.height);

            setLoading(false);

        }

    });


    return(

        <Loading spinning={loading} tip={"加载中,请稍候..."}>

            <GuideTitle title={"设置学科"} step={1} tips={"(后续可通过“学科管理”模块进行管理)"}></GuideTitle>

            <iframe src={url} frameBorder="0"  style={{height:iframeHeight}}></iframe>

            <GuideFooter next={true} back={true} backStepClick={backStepClick} nextStepClick={nextStepClick}></GuideFooter>

        </Loading>

    )

}

export default memo(Subject)