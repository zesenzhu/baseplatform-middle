import React,{useEffect,useState,useCallback,useMemo,memo,useRef} from 'react';


import './index.scss';

function Footer(props) {

    const {footerTitle} = props;

    return(

        <div className={"app-footer-wrapper"}>{footerTitle}</div>

    )

}

export default memo(Footer);