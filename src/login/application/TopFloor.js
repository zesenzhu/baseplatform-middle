import React,{memo} from 'react';

import Header from '../components/Header';

import Footer from '../components/Footer';

import Content from './Content';

import {connect} from 'react-redux';

function TopFloor(props) {

    const { footer,skin,hasDownLoad,topTitle,WebSvrAddr,aiSchoolLink,ProductType } = props;

    const { picChange } = props;

    return(

        <div className={"top_wrapper"}>

            <div className="top_content_wrapper">

                <Header ProductType={ProductType} aiSchoolLink={aiSchoolLink} topTitle={topTitle} WebSvrAddr={WebSvrAddr} skin={skin} hasDownLoad={hasDownLoad}></Header>

                <Content picChange={picChange}></Content>

            </div>

            <Footer footer={footer} skin={skin}></Footer>

        </div>

    )

}

const mapStateToProps = (state)=>{

    const { commSetting } = state;

    return commSetting;

};

export default connect(mapStateToProps)(TopFloor);