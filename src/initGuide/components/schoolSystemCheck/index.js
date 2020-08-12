import React,{useEffect,useCallback,useMemo,useRef,useState,memo} from 'react';

import {RadioGroup,Radio} from "../../../common";

import './index.scss';

function SchoolSystemCheck(props) {

    const { checked } = props;

    const { systemChange } = props;

    return(

        <RadioGroup value={checked} onChange={systemChange}>

            <Radio value={'3'}>三年制</Radio>

            <Radio value={'4'}>四年制</Radio>

            <Radio value={'5'}>五年制</Radio>

        </RadioGroup>

    )

}

export default memo(SchoolSystemCheck);