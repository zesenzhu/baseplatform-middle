import React,{useEffect,useState,useRef,useMemo,memo,useCallback} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import './index.scss';

function Header(props) {

    return(

        <div className={"init-guid-header"}>

            <div className={"header-content-wrapper"}>



            </div>

        </div>

    )

}

export default memo(Header);