import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../images/icon-logo.png'
import { Menu, Loading, Alert } from "../../../common";
import Frame from '../../../common/Frame';
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import history from '../containers/history'
import TimeBanner from './TimeBanner'
import All from './All'
import Student from './Student'
import Teacher from './Teacher'
import Leader from './Leader'
import actions from '../actions';
import $ from 'jquery'
import CONFIG from '../../../common/js/config';

import '../../scss/index.scss'
import RegisterWillExamine from './RegisterWillExamine'
import RegisterDidExamine from './RegisterDidExamine'
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
        
        let path = history.location.pathname.split('/')
        let route = path[2]
        this.state = {
            select: 'file',
            userMsg: props.DataState.LoginUser,
            show: true,
            role:route === 'Teacher' ? '教师' :route === 'Leader'?'领导' :route === 'Student'?'学生':route === 'Graduate'?'毕业生':''
        }
        const { dispatch, DataState } = this.props;


    }

    // componentWillMount() {
    //     const { DataState, dispatch } = this.props;
    // }
    componentWillMount() {
        // $.get(CONFIG.UserInfoProxy+'/Import.aspx?Token=0111&UserType=Student',function(data){
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
        //     //console.log(data)
        //     $('#content-box').html(data)
        // })
        let path = history.location.pathname.split('/');
        let route = path[2]
        this.setState({
            select: 'file',
            show:true,
            Route:route === 'Teacher' ? 'teacher' :route === 'Leader'?'leader'  :route === 'Student'?'student':'graduate'
        })
        // document.title=route === 'Teacher' ? '导入教师档案' :route === 'Leader'?'导入领导 档案'  :route === 'Student'?'导入学生档案':'导入毕业生档案'
    }
    ImportHtml = (type,route) => {
        



        // let url = '/Import.aspx'
        // if(type==='picture'){
        //      url = '/ImportPhoto.aspx'
        // }
        // fetch(CONFIG.UserInfoProxy + url+'?Token=' + sessionStorage.getItem('token') + '&UserType=' + route[2], {
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
        //     return data.text();

        // }).then(text => {
        //     //console.log(text)
        //     $('#content-box').html(text)
        //     this.setState({
        //         show:false
        //     })
        // })
    }
    //点击tab
    onTabClick = (name) => {
        let path = history.location.pathname.split('/');
        let route = path[2]

        this.setState({
            select: name,
            show:true,
            Route:name==='picture'?route:route === 'Teacher' ? 'teacher' :route === 'Leader'?'leader' :route === 'Student'?'student':route === 'Graduate'?'graduate':'',
           
        })
        // this.setState({
        //     type:type,
        //     route:route
        // })
        // this.ImportHtml(name,route)
    }
    render() {
        const { UIState, DataState } = this.props;
        let path = history.location.pathname.split('/');
        let route = path[2]
// console.log(this.state.Route)

        // const data = {
        //     userName: '康欣',
        //     userImg: 'http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg',
        //     Gende: '男',
        //     userText: '学如逆水行舟，不进则退',
        //     userID: '20170025444',
        //     userGrade: '一年级',
        //     userClass: '1班',
        //     userIDCard: '',
        //     userPhone: '15626248624',
        //     userMail: '1519406168@qq.com',
        //     userAddress: '蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团蓝鸽集团',
        //     userRegisterTime: '2019-01-01 12:24',
        //     userRegisterIP: '190.163.252.198'
        // };
        return (
            <React.Fragment>
                <Frame userInfo={{
                    name: DataState.LoginUser.UserName,
                    image: DataState.LoginUser.PhotoPath
                }}

                    module={{
                        cnname: "用户档案管理",
                        enname: "User Profile Management",
                        image: logo
                    }}
                    className='myFrame'

                    type="circle" showLeftMenu={false}
                    showBarner={false}>
                    <div className='box' ref="frame-right-content" key={this.props.location.pathname}>
                        <div className='Tab' style={{display:this.state.Route==='graduate'?'none':'block'}}>
                <span ref='file' onClick={this.onTabClick.bind(this, 'file')} className={`Tab-btn ${this.state.select === 'file' ? 'btn-select' : ''}`}>{'导入'+this.state.role+'资料'}</span>
                            <span ref='picture' onClick={this.onTabClick.bind(this, 'picture')} className={`Tab-btn ${this.state.select === 'picture' ? 'btn-select' : ''}`}>{'导入'+this.state.role+'照片'}</span>
                        </div>
                        {/* <iframe id='content-box' src={CONFIG.UserInfoProxy+'/Import.aspx?Token=0111&UserType=Student'}>
                            
                        </iframe> */}
                        {/* <Loading opacity={false} size='large' spinning={this.state.show}>
                            <div id='content-box' className='content-box'>

                            </div>
                        </Loading> */}
                        <div className={'content-box'} style={{borderRadius:this.state.Route==='graduate'?'12px 12px 12px 12px':'0 12px 12px 12px'}}>
                            {
                                this.state.select==='file'?<ImportExcel ImportTitle={route==='Graduate'?'导入毕业去向':''}  ImportTarget={this.state.Route}></ImportExcel>:<ImportPhoto ImportTarget={this.state.Route==='Leader'?'SchoolLeader':this.state.Route}></ImportPhoto>
                            }
                        </div>

                    </div>
                </Frame>

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