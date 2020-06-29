import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Frame, Menu, Loading, Alert } from "../../../common";
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import history from '../containers/history'


import actions from '../actions';
import $ from 'jquery'
import CONFIG from '../../../common/js/config';


import '../../scss/ImportFile.scss'
import { DetailsModal, DropDown, PagiNation, Search, Table, Button, CheckBox, CheckBoxGroup, Modal } from '../../../common/index'

import { getData } from '../../../common/js/fetch'
import { func } from 'prop-types';
import { get } from 'http';

import ImportExcel from '../../../common/js/Import/ImportExcel'
import ImportPhoto from '../../../common/js/Import/ImportPhoto'


class ImportFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            select: 'file',
            userMsg:props.DataState.LoginUser

        }
        const { dispatch, DataState } = this.props;


    }

    componentWillMount() {
        const { DataState, dispatch } = this.props;
    }
    componentDidMount() {
        // $.get('/UserMgr/TeachInfoMgr/Import.aspx?SchoolID='+this.state.userMsg.SchoolID+'&Type=courseclass&UserID='+this.state.userMsg.UserID+'&UserName='+this.state.userMsg.UserName+'&Token='+ sessionStorage.getItem('token'),function(data){
        //   // console.log(data)
        //     $('#content-box').html(data)
        // })

        // $.ajax({
        //     url:CONFIG.UserInfoProxy+'/Import.aspx?Token=0111&UserType=Student',
        //     type:'get',
        //     dataType:'html',
        //     success:function(data){
        //         $('#content-box').html(data)
        //     }
        // })
        // getData(CONFIG.UserInfoProxy+'/Import.aspx?Token=0111&UserType=Student',1,'no-cors').then(data => {
        //   // console.log(data)
        //     $('#content-box').html(data)
        // })
        // let route = history.location.pathname.split('/');

        
        // ('/UserMgr/TeachInfoMgr/Import.aspx?SchoolID='+this.state.userMsg.SchoolID+'&Type=courseclass&UserID='+this.state.userMsg.UserID+'&UserName='+this.state.userMsg.UserName+'&Token='+ sessionStorage.getItem('token'), {
        //     method: 'get',//*post、get、put、delete，此项为请求方法相关的配置 
        //     mode: 'cors',//no-cors(跨域模式但服务器端不支持cors),*cors(跨域模式，需要服务器通过Access-control-Allow-Origin来
        //     //允许指定的源进行跨域),same-origin(同源)
        //     cache: 'no-cache',//*no-cache,default,reload,force-cache,only-ifcached,此项为缓存相关配置
        //     credentials: 'omit',//*include(携带cookie)、same-origin(cookie同源携带)、omit(不携带)

        //     headers: {
        //         'Accept': 'application/json, text/plain, text/html,*/*',//请求头，代表的、发送端（客户端）希望接收的数据类型
        //         'Content-Type': 'application/x-www-form-urlencoded',//实体头，代表发送端（客户端|服务器）发送的实体数据的数据类型
        //     },
        //     redirect: 'follow',//manual、*follow(自动重定向)、error，此项为重定向的相关配置
        //     // referrer: 'no-referrer',//该首部字段会告知服务器请求的原始资源的URI

        // }).then(data => {
        //   // console.log(data)
        //     $('#content-box').html(data)
        // })
    }

    //点击tab
    onTabClick = (name) => {
        this.setState({
            select: name
        })
    }
    render() {
        const { UIState, DataState } = this.props;

        return (
            <React.Fragment>
                {/* <div className='Tab'>
                    <span ref='file' onClick={this.onTabClick.bind(this, 'file')} className={`Tab-btn ${this.state.select === 'file' ? 'btn-select' : ''}`}>导入基本资料</span>
                    <span ref='picture' onClick={this.onTabClick.bind(this, 'picture')} className={`Tab-btn ${this.state.select === 'picture' ? 'btn-select' : ''}`}>导入照片</span>
                </div> */}


               <ImportExcel ImportTitle='导入教学班' ImportTarget='courseclass'></ImportExcel>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};

export default connect(mapStateToProps)(ImportFile)