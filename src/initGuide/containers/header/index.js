import React,{useEffect,useState,useRef,useMemo,memo,useCallback} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import './index.scss';

function Header(props) {

    const [title,setTitle] = useState('');

    const LoginUser = useSelector(state=>state.LoginUser);

    const { SchoolID,UserID,UserName,PhotoPath } = LoginUser;

    useEffect(()=>{

        if (UserID){

            const { ProductName } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

            setTitle(ProductName);

        }

    },[UserID]);

    return(

        <div className={"init-guide-header"}>

           <div className={"header-left-content clearfix"}>

               <i className={"logo"}></i>

               <div className={"product-info"}>

                    <div className={"product-title"}>{title}</div>

                   <i className={"init-guide-title-icon"}></i>

               </div>

           </div>

            <div className={"header-user-info clearfix"}>

                <i className={"header-icon"} style={{backgroundImage:`url(${PhotoPath})`}}></i>

                <div className={"user-name"}>{UserName}</div>

                <i className={"log-out"}></i>

            </div>

        </div>

    )

}

export default memo(Header);