import React,{Component} from 'react';

import {Frame,Alert} from './index.js';

import { getData,postData } from "./js/fetch";

import { LogOut,getQueryVariable } from "./js/disconnect";

import CONFIG from './js/config';

import dynamicFile from 'dynamic-file';

import {firstPageLoad} from '../common/js/disconnect/index';

import publicJS from '../common/js/public';

class FrameContainer extends Component{

    constructor(props) {

        super(props);

        this.state={

            AlertShow:false,

            ProductName:'',

            ProVersion:'',

            WebIndexUrl:'/',

            WebRootUrl:'/',

            messageShow:true,

            showBarner:parseInt(getQueryVariable('showBarner'))===0?false:true,

            showTop:parseInt(getQueryVariable('showTop'))===0?false:true,

            showBottom:parseInt(getQueryVariable('showBottom'))===0?false:true,

            showLeftMenu:parseInt(getQueryVariable('showLeftMenu'))===0?false:true,

            UserInfo:{

                name:'',

                image:''

            },

            childrenLoad:false,

            Logo:'',

            Identity:{

                Icon:'',

                Name:''

            }

        };

    }

    componentDidMount(){

        const {register,pageInit,moduleID,onRef} = this.props;

        if (onRef){

            onRef(this);

        }

        if (publicJS.IEVersion()){

            if (register){//是注册界面直接去获取产品名称

                this.GetProduct().then(data=>{

                    if (data){

                        sessionStorage.setItem("LgBasePlatformInfo",JSON.stringify(data));

                        this.setState({childrenLoad:true,WebIndexUrl:data.WebIndexUrl,ProVersion:data.ProVersion,ProductName:data.ProductName,Logo:data.ProductLogoUrl?data.ProductLogoUrl:''});

                    }

                });

            }else{

                this.GetProduct().then(data=>{

                        if (data){

                            sessionStorage.setItem("LgBasePlatformInfo",JSON.stringify(data));

                            const rootUrl = data.WebRootUrl[data.WebRootUrl.length-1]==='/'?data.WebRootUrl.substring(0,data.WebRootUrl.length-1):data.WebRootUrl;

                            this.setState({WebRootUrl:rootUrl,WebIndexUrl:data.WebIndexUrl,ProVersion:data.ProVersion,ProductName:data.ProductName,Logo:data.ProductLogoUrl?data.ProductLogoUrl:''});

                            firstPageLoad(()=>{

                                this.IntegrateMsg();

                                const { UserType,UserName,PhotoPath } = JSON.parse(sessionStorage.getItem("UserInfo"));

                                if (parseInt(data.ProductType)===6){

                                    let proName = '';

                                    switch (parseInt(UserType)) {

                                        case 0:

                                            proName = '人工智能实训管理平台';

                                            break;

                                        case 1:

                                            proName = '人工智能实训教学平台';

                                            break;

                                        case 2:

                                            proName = '人工智能实训学习平台';

                                            break;

                                        default:

                                            proName = '人工智能实训管理平台';

                                    }

                                    this.setState({UserInfo:{name:UserName,image:PhotoPath},childrenLoad:true,ProductName:proName});

                                }else{

                                    this.setState({UserInfo:{name:UserName,image:PhotoPath},childrenLoad:true});

                                }
                                
                                if (pageInit){

                                    pageInit();

                                }

                            });

                        }

                    });

            }

        }

    }

    //集成消息模块函数
    IntegrateMsg(){

        let token = sessionStorage.getItem('token');

        const {WebRootUrl} = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        let { UserType,UserClass } = JSON.parse(sessionStorage.getItem('UserInfo'));

        if ((!(parseInt(UserType)===0&&parseInt(UserClass)===2))&&(parseInt(UserType)!==6)){

                this.GetMessage().then(data=>{

                    if (data){

                        let PsnMgrLgAssistantAddr = data.WebSvrAddr;

                        sessionStorage.setItem('PsnMgrToken',token);//用户Token

                        sessionStorage.setItem('PsnMgrMainServerAddr',WebRootUrl); //基础平台IP地址和端口号 形如：http://192.168.129.1:30103/

                        sessionStorage.setItem('PsnMgrLgAssistantAddr',PsnMgrLgAssistantAddr);

                        dynamicFile([

                            `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/css/lancoo.cp.assistantInfoCenter.css`,

                            `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/js/jquery-1.7.2.min.js`

                        ]).then(()=>{

                            dynamicFile([

                                `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/assets/jquery.pagination.js`,

                                `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/js/lancoo.cp.assistantInfoCenter.js`

                            ])

                        });

                    }else{

                        this.setState({messageShow:false});

                    }

                })

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
    async GetMessage(){

        const result = await getData(CONFIG.Import+'/Base/GetSingleSubsystemServer?SysID=200&SubjectID=',1);

        const res = await result.json();

        if (res.StatusCode===200){

            return res.Data;

        }

    }

    //获取用户身份
    async GetIdentity(){

        const {UserID} = JSON.parse(sessionStorage.getItem("UserInfo"));

        const result = await getData(`${CONFIG.Import}/UserMgr/PowerMgr/GetIdentityTypeByUserID?UserID=${UserID}`,2);

        const res = await result.json();

        if (res.StatusCode===200){

            return res.Data;

        }

    }


    //根据用户身份code获取用户身份详情
    async GetIdentityTypeByCode(IdentityCodes){

        const {SchoolID} = JSON.parse(sessionStorage.getItem("UserInfo"));

        const result = await getData(`${CONFIG.Import}/UserMgr/PowerMgr/GetIdentityTypeByCode?SchoolID=${SchoolID}&IdentityCodes=${IdentityCodes}`,2);

        const res = await result.json();

        if (res.StatusCode===200){

            return res.Data;

        }

    }

    //模块和身份校验
    async ValidateIdentity(IdentityCode,ModuleID){

        const {UserID} = JSON.parse(sessionStorage.getItem("UserInfo"));

        const result = await postData(`${CONFIG.Import}/UserMgr/PowerMgr/ValidateIdentity`,{

            IdentityCode,ModuleID,UserID

        },2);

        const res = await result.json();

        if (res.StatusCode===200){

            return res.Data;

        }

    }


    ///获取身份和对应的模块ID
    getIdentity({ModuleID},callBack){

        let identity = getQueryVariable('lg_ic');

        const { ProductType } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        if (parseInt(ProductType)===3){

            if (identity){

                this.GetIdentityTypeByCode(identity).then(data=>{

                    if (data&&data.length>0){

                        this.IdentityRecognition(data,ModuleID,callBack);

                    }

                })

            }else{

                this.GetIdentity().then(data=>{

                    if (data&&data.length>0){

                        this.IdentityRecognition(data,ModuleID,callBack);

                    }

                })

            }

        }

    }


    IdentityRecognition(IdentityList,ModuleID,callBack){

        const promiseList  =  IdentityList.map(async (i)=>{

            const res =  await this.ValidateIdentity(i.IdentityCode,ModuleID);

            return res;

        });

        Promise.all(promiseList).then(res=>{

            const index = res.findIndex(i=>i===true);

            if (index>=0){

                const IdentityItem = IdentityList[index];

                this.setState({

                    Identity:{

                        Icon:IdentityItem.IconUrl,

                        Name:IdentityItem.IsPreset?'':IdentityItem.IdentityName

                    }

                },()=>{

                    if (callBack){

                        callBack(IdentityItem);

                    }

                });

            }else{

                window.location.href = CONFIG.ErrorProxy + "/Error.aspx?errcode=E011";

            }

        });

    }



    render() {

        const { children,onRef, pageInit,type,register,showBarner,showTop, showBottom, module, userInfo, msg, showLeftMenu,contentShow,onLogOut, ...reset } = this.props;

        return (

            <React.Fragment>

                <Frame

                    type={type}

                    module={module}

                    userInfo={userInfo?userInfo:this.state.UserInfo}

                    showLeftMenu={showLeftMenu===false?false:this.state.showLeftMenu}

                    showBarner={showBarner===false?false:this.state.showBarner}

                    showTop={showTop===false?false:this.state.showTop}

                    showBottom={showBottom===false?false:this.state.showBottom}

                    onLogOut={this.Logout.bind(this)}

                    contentShow={contentShow}

                    ProductName={this.state.ProductName}

                    ProVersion={this.state.ProVersion}

                    WebIndexUrl={this.state.WebIndexUrl}

                    WebRootUrl={this.state.WebRootUrl}

                    MessageShow={this.state.messageShow}

                    logo={this.state.Logo}

                    register={register}

                    Identity={this.state.Identity}

                    {...reset}

                >

                    {

                        this.state.childrenLoad?

                            children

                            :null

                    }

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