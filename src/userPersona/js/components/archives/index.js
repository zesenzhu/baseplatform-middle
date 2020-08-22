import React,{useEffect,useState,useCallback,useMemo,memo,useRef} from 'react';

import ContentItem from '../contentItem';

import './index.scss';

function Archives(props) {

    const {className,tabName,type,children} = props;

    return(

        <ContentItem type={"archives"} tabName={"学籍档案信息"}>



        </ContentItem>

    )

}

Archives.defaultProps = {



};

export default memo(Archives);