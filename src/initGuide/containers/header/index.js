import React,{useEffect,useState,useRef,useMemo,memo,useCallback} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import defaultLogo from '../../../common/images/frame/logo.png';

import {LogOut} from "../../../common/js/disconnect/index";

import {btnQueryAlertShow} from "../../store/appAlert/index";

import './index.scss';

function Header(props) {

    const [title,setTitle] = useState('');

    const [logo,setLogo] = useState('');

    const LoginUser = useSelector(state=>state.LoginUser);

    const { SchoolID,UserID,UserName,PhotoPath } = LoginUser;

    const dispatch = useDispatch();

    useEffect(()=>{

        if (UserID){

            const { ProductName,ProductLogoUrl } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

            setTitle(ProductName);

            setLogo(ProductLogoUrl?ProductLogoUrl:'');

        }

    },[UserID]);


    //退出登录

    const logout = useCallback(()=>{

        dispatch(btnQueryAlertShow({title:'确定要退出登录吗？',cancelShow:'y',ok:logoutOk}))

    },[]);



    //退出登录
    const logoutOk = useCallback(()=>{

        LogOut()

    },[]);

    return(

        <div className={"init-guide-header"}>

           <div className={"header-left-content clearfix"}>

               <i className={"logo"} style={{backgroundImage:`url(${logo?logo:defaultLogo})`}}></i>

               <div className={"product-info"}>

                    <div className={"product-title"}>{title}</div>

                   <i className={"init-guide-title-icon"}></i>

               </div>

           </div>

            <div className={"header-user-info clearfix"}>

                <i className={"header-icon"} style={{backgroundImage:`url(${PhotoPath})`}}></i>

                <div className={"user-name"}>{UserName}</div>

                <i className={"log-out"} onClick={logout}></i>

            </div>

        </div>

    )

}

export default memo(Header);