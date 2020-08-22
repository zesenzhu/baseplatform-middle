import React,{useEffect,useState,useCallback,useMemo,memo,useRef} from 'react';

import ContentItem from '../contentItem';

import LinkBtn from '../linkBtn';

import {getDetailStuStatus} from '../../actions/apiActions';

import './index.scss';

import {Progress} from 'antd';

function Archives(props) {

    const [loading,setLoading] = useState(true);

    const {className,tabName,type,children} = props;

    /*useState(()=>{

        getDetailStuStatus()

    },[]);*/

    return(

        <ContentItem type={"archives"} tabName={"学籍档案信息"}>

            <div className={"archives-wrapper"}>

                <div className={"btn-wrapper clearfix"}>

                    <LinkBtn type={"archives"}>档案信息管理</LinkBtn>

                </div>

                <div className={"archives-table"}>

                    <table>

                        <tbody>



                        </tbody>

                    </table>

                </div>

                {/*<div className={"loading"}><div className={"loading-title"}>加载中,请稍候...</div></div>*/}

                <Progress
                    type="circle"
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    percent={90}

                    width={100}
                />

            </div>

        </ContentItem>

    )

}

Archives.defaultProps = {



};

export default memo(Archives);