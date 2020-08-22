import React,{useEffect,useState,useCallback,useMemo,memo,useRef} from 'react';

import ContentItem from '../contentItem';

import LinkBtn from '../linkBtn';

import './index.scss';

function Archives(props) {

    const {className,tabName,type,children} = props;

    return(

        <ContentItem type={"archives"} tabName={"学籍档案信息"}>

            <div className={"archives-wrapper"}>

                <div className={"btn-wrapper clearfix"}>

                    <LinkBtn type={"archives"}>档案信息管理</LinkBtn>

                </div>

            </div>

        </ContentItem>

    )

}

Archives.defaultProps = {



};

export default memo(Archives);