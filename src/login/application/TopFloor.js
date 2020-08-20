import React,{memo,useCallback} from 'react';

import Header from '../components/Header';

import Footer from '../components/Footer';

import Content from './Content';

import {useSelector,useDispatch} from 'react-redux';

function TopFloor(props) {

    const { WebRootUrl='',footer,skin,hasDownLoad,topTitle,PCDownLoadWebSvrAddr='',IntroWebSvrAddr='',aiSchoolLink='',ProductType } = useSelector(state=>state.commSetting);

    return(

        <div className={"top_wrapper"}>

            <div className="top_content_wrapper">

                <Header WebRootUrl={WebRootUrl} IntroWebSvrAddr={IntroWebSvrAddr} PCDownLoadWebSvrAddr={PCDownLoadWebSvrAddr} ProductType={ProductType} aiSchoolLink={aiSchoolLink} topTitle={topTitle} skin={skin} hasDownLoad={hasDownLoad}></Header>

                <Content></Content>

            </div>

            <Footer footer={footer} skin={skin}></Footer>

        </div>

    )

}



export default memo(TopFloor);