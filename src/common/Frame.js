import React,{Component} from 'react';

import {Frame,Alert} from './index.js';

import { getData } from "./js/fetch";

import { LogOut,getQueryVariable } from "./js/disconnect";

import CONFIG from './js/config';

import dynamicFile from 'dynamic-file';



class FrameContainer extends Component{

    constructor(props) {

        super(props);

        this.state={

            AlertShow:false,

            ProductName:'',

            ProVersion:'',

            WebIndexUrl:'/',

            messageShow:true,

            showBarner:parseInt(getQueryVariable('showBarner'))===0?false:true,

            showTop:parseInt(getQueryVariable('showTop'))===0?false:true,

            showBottom:parseInt(getQueryVariable('showBottom'))===0?false:true,

            showLeftMenu:parseInt(getQueryVariable('showLeftMenu'))===0?false:true

        }

    }

    componentDidMount(){

        const {register} = this.props;

        if (register){//是注册界面直接去获取产品名称

            this.GetProduct().then(data=>{

                if (data){

                    this.setState({WebIndexUrl:data.WebIndexUrl,ProVersion:data.ProVersion,ProductName:data.ProductName});

                }

            });

        }else{

            if (sessionStorage.getItem('UserInfo')){

                this.IntegrateMsg();

            }else{

                let WaitUserInfo = setInterval(()=>{

                    if (sessionStorage.getItem('UserInfo')){

                        this.IntegrateMsg();

                        clearInterval(WaitUserInfo);

                    }

                },20);

            }

        }

    }

    //集成消息模块函数
    IntegrateMsg(){

        let token = sessionStorage.getItem('token');

        let { UserType,UserClass } = JSON.parse(sessionStorage.getItem('UserInfo'));

        let host = `http://${window.location.host}/`;

        this.GetProduct().then(data=>{

            if (data){

                this.setState({WebIndexUrl:data.WebIndexUrl,ProVersion:data.ProVersion,ProductName:data.ProductName});

            }

        });

        if (!(parseInt(UserType)===0&&parseInt(UserClass)===2)){

            this.GetMethod().then(data=>{

                if (data){

                    let PsnMgrLgAssistantAddr = data.WebSvrAddr;

                    sessionStorage.setItem('PsnMgrToken',token);//用户Token

                    sessionStorage.setItem('PsnMgrMainServerAddr', host); //基础平台IP地址和端口号 形如：http://192.168.129.1:30103/

                    sessionStorage.setItem('PsnMgrLgAssistantAddr',PsnMgrLgAssistantAddr);

                    dynamicFile([

                        `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/css/lancoo.cp.assistantInfoCenter.css`,

                        `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/js/jquery-1.7.2.min.js`

                    ]).then(()=>{

                        dynamicFile([

                            `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/assets/jquery.pagination.js`,

                            `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/js/lancoo.cp.assistantInfoCenter.js`

                        ])

                    })

                }

            });

        }else{

            this.setState({messageShow:false});

        }



    }


    //点击退出登录
    AlertOk(){

        LogOut();

    }

    //点击退出登录弹窗取消

    AlertClose(){

        this.setState({AlertShow:false});

    }

    //退出登录
    Logout(){

        this.setState({AlertShow:true});

    }


    //获取产品相关

    async GetProduct() {

        const result = await getData(CONFIG.Import + '/Global/GetBaseInfoForPages', 1);

        const res = await result.json();

        if (res.StatusCode === 200) {

            return res.Data;

        }

    }

    //获取消息中心地址和路径
    async GetMethod(){

        const result = await getData(CONFIG.Import+'/Base/GetSingleSubsystemServer?SysID=200',1);

        const res = await result.json();

        if (res.StatusCode===200){

            return res.Data;

        }

    }


    render() {

        const { children, type,register,showBarner,showTop, showBottom, module, userInfo, msg, showLeftMenu,contentShow,onLogOut, ...reset } = this.props;

        return (

            <React.Fragment>

                <Frame

                    type={type}

                    module={module}

                    userInfo={userInfo}

                    showLeftMenu={showLeftMenu===false?false:this.state.showLeftMenu}

                    showBarner={showBarner===false?false:this.state.showBarner}

                    showTop={showTop===false?false:this.state.showTop}

                    showBottom={showBottom===false?false:this.state.showBottom}

                    onLogOut={this.Logout.bind(this)}

                    contentShow={contentShow}

                    ProductName={this.state.ProductName}

                    ProVersion={this.state.ProVersion}

                    WebIndexUrl={this.state.WebIndexUrl}

                    MessageShow={this.state.messageShow}

                    register={register}

                    {...reset}

                >

                    { children }

                </Frame>

                <Alert
                    type="btn-query"
                    title="确定要退出登录吗?"
                    show={this.state.AlertShow}
                    onOk={this.AlertOk.bind(this)}
                    onCancel={this.AlertClose.bind(this)}
                    onClose={this.AlertClose.bind(this)}
                >

                </Alert>



            </React.Fragment>

        );

    }

}


FrameContainer.defaultProps ={

    showBarner:true,

    showTop:true,

    showBottom:true,

    showLeftMenu:false

};
export default FrameContainer;