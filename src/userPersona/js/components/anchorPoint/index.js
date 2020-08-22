import React,{useEffect,useRef,useState,useMemo,useCallback,memo} from 'react';

import {Anchor} from 'antd';

import './index.scss';

const { Link } = Anchor;

function AnchorPoint(props) {

   const {anchorList} = props;

    return(

        <Anchor showInkInFixed={false}>

            {

                anchorList.map(i=>{

                    return <Link href={`#${i.id}`} key={i.id} title={i.title}></Link>

                })

            }

        </Anchor>

    )

}

AnchorPoint.defaultProps = {

    anchorList:[]

};

export default memo(AnchorPoint);