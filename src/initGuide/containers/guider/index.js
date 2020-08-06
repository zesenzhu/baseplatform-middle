import React,{useEffect,useState,useRef,useMemo,memo,useCallback} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import './index.scss';

function Guider(props) {

    return(

        <div className={"init-guider"}>

            <div className={"guider-wrapper"}>



            </div>

        </div>

    )

}

export default memo(Guider);