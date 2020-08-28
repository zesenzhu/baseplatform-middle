import React,{useEffect,useLayoutEffect,useRef,useState,useMemo,useCallback,memo} from 'react';

import {Anchor} from 'antd';

import './index.scss';

import $ from 'jquery';

const { Link } = Anchor;

function AnchorPoint(props) {

   const {anchorList} = props;

   const hasDom = useRef(true);

    useEffect(()=>{

        if($('.ant-anchor-wrapper .ant-anchor-link:nth-child(2)').length>0&&hasDom.current){

            hasDom.current = false;

            $('.ant-anchor-wrapper .ant-anchor-link:nth-child(2)').addClass('ant-anchor-link-active');

            $('.ant-anchor-wrapper .ant-anchor-link:nth-child(2) .ant-anchor-link-title').addClass('ant-anchor-link-title-active');

        }

    });

    useEffect(()=>{

        $(window).scroll((e)=>{

            const scrollTop = $(window).scrollTop();

            if (scrollTop<=190){

                $('.ant-anchor-wrapper .ant-anchor-link:nth-child(2)').addClass('ant-anchor-link-active');

                $('.ant-anchor-wrapper .ant-anchor-link:nth-child(2) .ant-anchor-link-title').addClass('ant-anchor-link-title-active');

            }

        });

        $(document).on('click','.ant-anchor-wrapper .ant-anchor-link',(e)=>{

            $('.ant-anchor-wrapper .ant-anchor-link').removeClass('ant-anchor-link-active');

            $('.ant-anchor-wrapper .ant-anchor-link .ant-anchor-link-title').removeClass('ant-anchor-link-title-active');

            $(e.target).addClass('ant-anchor-link-active');

            $(e.target).children('.ant-anchor-link-title').addClass('ant-anchor-link-title-active');

        });

    },[]);


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