import React, {useEffect, useState, useCallback, useMemo, memo, useRef} from "react";

import { useDispatch, useSelector } from "react-redux";

import ContentItem from '../contentItem';

import LinkBtn from '../linkBtn';

import {removeSlashUrl} from "../../actions/utils";

import "./index.scss";

function Account(props) {

    //loading
    const [loading,setLoading] = useState(true);

    //标签名称
    const [tabName,setTabName] = useState('');

    const {UsedType} = useSelector(state=>state.pageUsedType);

    const userArchives = useSelector(state=>state.userArchives);

    const { UserID,UserType } = useSelector(state=>state.targetUser);

    const dispatch = useDispatch();

    useEffect(()=>{

        if (UsedType==='OtherToStu'){

            setTabName("个人基本信息");

        }else{

            setTabName("账号信息");

        }

        if (UserType===2){



        }

    },[]);



    return(

        <ContentItem type={"account"} tabName={tabName}>

            <div className={"account-wrapper"}>



            </div>

        </ContentItem>

    )

}

export default memo(Account);