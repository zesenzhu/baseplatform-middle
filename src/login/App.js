import React,{useEffect,useState,useCallback} from 'react';

import { connect } from 'react-redux';

import './assets/scss/index.scss';

import { Loading,Alert,CheckBox } from "../common";

import {getQueryVariable} from "../common/js/disconnect";

import {getNewTkUrl,goToNextPage,decodeObjValue,removeSlashUrl} from "./api/utils";

import { GetBaseInfo,loginApi,GetSystemsMainServer } from './api/index';

import { introduceChange } from './store/introduce';

import { changeSkin,changeSetting,changePluginStatus,getMacID } from './store/commSetting';

import { showWarnAlert,hideAlert } from './store/appAlert';

import Bs2Cs from './api/Bs2CsCommon';

import TopFloor from './application/TopFloor';

import BottomFloor from './application/BottomFloor';

function App(props){

    const [AppLoading,setAppLoading] = useState(true);

    //智慧校园的链接
    const [aiSchoolLink,setAiSchoolLink] = useState({

       schoolWeb:'',

       education:'',

       downLoad:''

    });

    //默认不选择不再提示

    const [unCheckedTips,setUnCheckedTips] = useState(false);

    const { commSetting,slider,appAlert,dispatch } = props;

    const { skin,WebIndexUrl,ClinetDownUrl } = commSetting;

    useEffect(()=>{

        window.changeStyle = changeStyle;

        window.top.GetCharString = GetCharString;

    },[]);

    useEffect(()=>{

        const url = getQueryVariable('lg_preurl')?getQueryVariable('lg_preurl'):WebIndexUrl;

        const urlObj = getNewTkUrl({preUrl:url});

        let nexUrl = '';

        switch (urlObj.type) {

            case 1:

                nexUrl = urlObj.nexType===1?urlObj.newUrl+'?lg_tk=':urlObj.newUrl+'&lg_tk=';

                break;

            case 2:

                nexUrl = urlObj.newUrl+'&lg_tk=';

                break;

            case 3:

                nexUrl = urlObj.newUrl+'?lg_tk=';

                break;

        }

        window.top._goUrl = GetCharCodes(nexUrl);

    },[WebIndexUrl]);

    //异步获取数据
    useEffect(()=>{

        GetBaseInfo({dispatch}).then(data=>{

            if (data){

                let skin = '';
                
                switch (parseInt(data.ProductType)) {

                    case 1:

                        skin = 'dark_blue';

                        break;

                    case 2:

                        skin = 'dark_tech';

                        break;

                    case 0:

                    case 3:

                        skin = 'ai_school';

                        getAiSchoolLink();

                        break;

                    case 4:

                        skin = 'cloud_schoolroom';

                        break;

                    case 5:

                        skin = 'ai_exam';

                        break;

                }

                if (parseInt(data.ProductType)===2||parseInt(data.ProductType)===5){

                    const appid = '000';

                    const access_token = '4d39af1bff534514e24948568b750f6c';

                    const sysIDs = parseInt(data.ProductType)===2?990:751;

                    GetSystemsMainServer({appid,access_token,sysIDs,dispatch}).then(res=>{

                        if (res){

                            const obj =  res[0]?res[0]:{};

                            const { WebSvrAddr='' } = obj;

                            data['WebSvrAddr'] = WebSvrAddr;

                        }

                        initData(skin,data);

                    })


                }else{

                    initData(skin,data);

                }


            }

        })

    },[]);



    const initData = (skin,data) =>{

        dispatch(changeSetting({skin,...data,footer:data.ProVersion}));

        setAppLoading(false);

        //判断锁控是否正常

        if (parseInt(data.LockerState)===1&&data.ClinetDownUrl){


            const token = sessionStorage.getItem('token')?sessionStorage.getItem('token'):localStorage.getItem('token');

            const lg_sysid = getQueryVariable('lg_sysid')?getQueryVariable('lg_sysid'):101;

            //再判断是否已登录
            if (token){

                loginApi({token:token,method:'TokenCheck',params:lg_sysid}).then((res)=>{

                    if (res.data.result===true){//如果是已登录判断用户类型再做跳转,否则都要做检查基础平台插件

                        localStorage.setItem('token',token);

                        loginApi({token,method:'GetUserInfo',params:lg_sysid?lg_sysid:'000'}).then(result=>{

                            //如果成功获取到用户信息
                            if (result.data&&result.error==='0'){

                                const UserInfo = decodeObjValue(result.data);

                                sessionStorage.setItem("UserInfo",JSON.stringify(UserInfo));

                                goToNextPage({token,WebIndexUrl:data.WebIndexUrl,UserType:UserInfo.UserType});

                            }else{

                                goToNextPage({token,WebIndexUrl:data.WebIndexUrl,UserType:''});

                            }

                        },err=>{

                            goToNextPage({token,WebIndexUrl:data.WebIndexUrl,UserType:''});

                        });

                    }else{

                        sessionStorage.clear();

                        localStorage.removeItem('token');

                        //当token失效的时候再判断MacID是否登录

                        if (localStorage.getItem('LgBaseMacID')){

                            loginApi({method:'GetTokenByMac',params:localStorage.getItem('LgBaseMacID')}).then(d=>{

                                //macid有过登录的情况下

                                if (d.error==='0'&&d.data.token){

                                    localStorage.setItem('token',d.data.token);

                                    sessionStorage.setItem('token',d.data.token);

                                    loginApi({token:d.data.token,method:'GetUserInfo',params:lg_sysid?lg_sysid:'000'}).then(result=>{

                                        //如果成功获取到用户信息
                                        if (result.data&&result.error==='0'){

                                            const UserInfo = decodeObjValue(result.data);

                                            sessionStorage.setItem("UserInfo",JSON.stringify(UserInfo));

                                            goToNextPage({token:d.data.token,WebIndexUrl:data.WebIndexUrl,UserType:UserInfo.UserType});

                                        }else{

                                            goToNextPage({token:d.data.token,WebIndexUrl:data.WebIndexUrl,UserType:''});

                                        }

                                    },err=>{

                                        goToNextPage({token:d.data.token,WebIndexUrl:data.WebIndexUrl,UserType:''});

                                    });

                                }else{
                                    //macid登录失败

                                    checkBase({ProductName:data.ProductName,ClinetDownUrl:data.ClinetDownUrl,WebIndexUrl:data.WebIndexUrl});

                                }

                            },er=>{

                                //macid登录失败
                                checkBase({ProductName:data.ProductName,ClinetDownUrl:data.ClinetDownUrl,WebIndexUrl:data.WebIndexUrl});

                            });

                        }else{

                            checkBase({ProductName:data.ProductName,ClinetDownUrl:data.ClinetDownUrl,WebIndexUrl:data.WebIndexUrl});

                        }


                    }

                },(resp,err)=>{

                    dispatch(showErrorAlert({title:decodeURIComponent(err)}));

                    sessionStorage.clear();

                    localStorage.removeItem('token');

                    if (localStorage.getItem('LgBaseMacID')){

                        loginApi({method:'GetTokenByMac',params:localStorage.getItem('LgBaseMacID')}).then(d=>{

                            if (d.error==='0'&&d.data.token){

                                localStorage.setItem('token',d.data.token);

                                sessionStorage.setItem('token',d.data.token);

                                loginApi({token:d.data.token,method:'GetUserInfo',params:lg_sysid?lg_sysid:'000'}).then(result=>{

                                    //如果成功获取到用户信息
                                    if (result.data&&result.error==='0'){

                                        const UserInfo = decodeObjValue(result.data);

                                        sessionStorage.setItem("UserInfo",JSON.stringify(UserInfo));

                                        goToNextPage({token:d.data.token,WebIndexUrl:data.WebIndexUrl,UserType:UserInfo.UserType});

                                    }else{

                                        goToNextPage({token:d.data.token,WebIndexUrl:data.WebIndexUrl,UserType:''});

                                    }

                                },err=>{

                                    goToNextPage({token:d.data.token,WebIndexUrl:data.WebIndexUrl,UserType:''});

                                });

                            }else{

                                checkBase({ProductName:data.ProductName,ClinetDownUrl:data.ClinetDownUrl,WebIndexUrl:data.WebIndexUrl});

                            }

                        },er=>{

                            checkBase({ProductName:data.ProductName,ClinetDownUrl:data.ClinetDownUrl,WebIndexUrl:data.WebIndexUrl});

                        });

                    }else{

                        checkBase({ProductName:data.ProductName,ClinetDownUrl:data.ClinetDownUrl,WebIndexUrl:data.WebIndexUrl});

                    }

                });

            }else{//没有登录的情况下判断是否有基础插件包

                if (localStorage.getItem('LgBaseMacID')){

                    loginApi({method:'GetTokenByMac',params:localStorage.getItem('LgBaseMacID')}).then(d=>{

                        if (d.error==='0'&&d.data.token){

                            localStorage.setItem('token',d.data.token);

                            sessionStorage.setItem('token',d.data.token);

                            loginApi({token:d.data.token,method:'GetUserInfo',params:lg_sysid?lg_sysid:'000'}).then(result=>{

                                //如果成功获取到用户信息
                                if (result.data&&result.error==='0'){

                                    const UserInfo = decodeObjValue(result.data);

                                    sessionStorage.setItem("UserInfo",JSON.stringify(UserInfo));

                                    goToNextPage({token:d.data.token,WebIndexUrl:data.WebIndexUrl,UserType:UserInfo.UserType});

                                }else{

                                    goToNextPage({token:d.data.token,WebIndexUrl:data.WebIndexUrl,UserType:''});

                                }

                            },err=>{

                                goToNextPage({token:d.data.token,WebIndexUrl:data.WebIndexUrl,UserType:''});

                            });

                        }else{

                            checkBase({ProductName:data.ProductName,ClinetDownUrl:data.ClinetDownUrl,WebIndexUrl:data.WebIndexUrl});

                        }

                    },er=>{

                        checkBase({ProductName:data.ProductName,ClinetDownUrl:data.ClinetDownUrl,WebIndexUrl:data.WebIndexUrl});

                    });

                }else{

                    checkBase({ProductName:data.ProductName,ClinetDownUrl:data.ClinetDownUrl,WebIndexUrl:data.WebIndexUrl});

                }

            }

        }else{//锁控不正常的情况下显示锁控信息，清除登录信息

            setAppLoading(false);

            document.title=data.ProductName;

            sessionStorage.clear();

            localStorage.removeItem('token');

            dispatch(showWarnAlert({title:`加密锁异常,${data.LockerMsg}`,okShow:'n',cancelTitle:'确定',cancel:()=>{window.location.reload()},close:()=>{window.location.reload()}}));

        }

    };



    const slideChange = (activeIndex) => {

        //轮播变化引导改变

        dispatch(introduceChange({skin,activeIndex}));

    };

    //改变style风格样式,对外抛出
    const changeStyle = () => {

        dispatch(changeSkin());

    };

    //下载基础插件包
    const downLoadBase = ({dispatch,ClinetDownUrl}) => {

        dispatch(hideAlert(dispatch));

       window.open(ClinetDownUrl);

    };


    //检查基础插件包
    const checkBase = ({ProductName,ClinetDownUrl,WebIndexUrl}) => {

        let BstoCs = new Bs2Cs((result)=>{

            document.title=ProductName;

            if (!result) {

                const NoCheck = localStorage.getItem("LgBasePluginsNoCheck");

                if (NoCheck!=='true'){

                    dispatch(showWarnAlert({title:<div className={"prompt"}>

                            <div className={"title"}>检测到未安装基础插件包，为确保功能正常，请先下载安装</div>

                            <div className={"no-check-tips"}>

                                <CheckBox checked={unCheckedTips} onClick={e=>baseCheckChange(ClinetDownUrl)}>不再提示</CheckBox>

                            </div>

                        </div>,

                        ok: e=>downLoadBase({ClinetDownUrl,dispatch}),

                        okTitle:"确定下载"

                    }));

                }

                dispatch(changePluginStatus(false));

                setAppLoading(false);

            }else{

                dispatch(changePluginStatus(true));

                const MacID = localStorage.getItem('LgBaseMacID');

                if (!MacID){//如果之前存储的macID不存在

                    result.GetMacIDs();//调用获取MacID的方法

                }else{

                    setAppLoading(false);

                }

            }

        },(macObj)=>{

            const macId = JSON.parse(macObj)['LocalMacIDs'][0];

            //存储MacID
            localStorage.setItem('LgBaseMacID',macId);

            if (macId){

                loginApi({method:'GetTokenByMac',params:macId}).then(d=>{

                    if (d.error==='0'&&d.data.token){

                        localStorage.setItem('token',d.data.token);

                        sessionStorage.setItem('token',d.data.token);

                        loginApi({token:d.data.token,method:'GetUserInfo',params:'000'}).then(result=>{

                            //如果成功获取到用户信息
                            if (result.data&&result.error==='0'){

                                const UserInfo = decodeObjValue(result.data);

                                sessionStorage.setItem("UserInfo",JSON.stringify(UserInfo));

                                goToNextPage({token:d.data.token,WebIndexUrl,UserType:UserInfo.UserType});

                            }else{

                                goToNextPage({token:d.data.token,WebIndexUrl,UserType:''});

                            }

                            setAppLoading(false);

                        },err=>{

                            goToNextPage({token:d.data.token,WebIndexUrl,UserType:''});

                            setAppLoading(false);

                        });

                    }else{

                        setAppLoading(false);

                    }

                });

            }else{

                setAppLoading(false);

            }

        });

    };


    //获取智慧校园的右上角产品地址

    const getAiSchoolLink = ()=>{

        GetSystemsMainServer({appid:'000',access_token:'4d39af1bff534514e24948568b750f6c',sysIDs:'E46,E34,260',dispatch}).then(res=>{

            const list = res&&res.length>0?res:[];

            let downLoad='',education='',schoolWeb='';

            list.map(i=>{
                
               switch (i.SysID) {

                   case "260":

                       downLoad = removeSlashUrl(i.WebSvrAddr?i.WebSvrAddr:'');

                       break;

                   case "E46":

                       schoolWeb = removeSlashUrl(i.WebSvrAddr?i.WebSvrAddr:'');

                       break;

                   case "E34":

                       education = removeSlashUrl(i.WebSvrAddr?i.WebSvrAddr:'');

                       break;

               } 
                
            });

            setAiSchoolLink(d=>({...d,downLoad,education,schoolWeb}));

        })

    };


    //切换是否提示的按钮

    const baseCheckChange = (ClinetDownUrl)=> {

        setUnCheckedTips(d => {

            localStorage.setItem("LgBasePluginsNoCheck", !d);

            dispatch(showWarnAlert({

                title: <div className={"prompt"}>

                    <div className={"title"}>检测到未安装基础插件包，为确保功能正常，请先下载安装</div>

                    <div className={"no-check-tips"}>

                        <CheckBox checked={!d} onClick={e=>baseCheckChange(ClinetDownUrl)}>不再提示</CheckBox>

                    </div>

                </div>,

                ok: e => downLoadBase({ClinetDownUrl,dispatch}),

                okTitle: "确定下载"

            }));

            return !d;

        });

    };



    const GetCharString = (codes) => {
        var str = "";
        try {
            for (var i = 0; i < codes.length; i++) {
                str += String.fromCharCode(parseInt(codes[i] + codes[i + 1], 16));
                i++;
            }
        } catch (e) { }
        return str;
    };


    const GetCharCodes = (str) => {
        var codes = "";
        try {
            for (var i = 0; i < str.length; i++) {
                codes += str.charCodeAt(i).toString(16).toUpperCase();
            }
        } catch (e) { }
        return codes;
    };


    return(

        <div className={`app ${skin}`}>

            {

                    AppLoading?

                    <Loading tip={"加载中,请稍后..."}></Loading>

                    :

                    <>

                        <TopFloor  aiSchoolLink={aiSchoolLink} picChange={slideChange}></TopFloor>

                        <BottomFloor  slideChange={slideChange} slider={slider} skin={skin}></BottomFloor>

                    </>

            }




            <Alert className={skin} type={appAlert.type} okShow={appAlert.okShow} cancelShow={appAlert.cancelShow} onClose={appAlert.close} show={appAlert.show} title={appAlert.title} onOk={appAlert.ok} onCancel={appAlert.cancel} okTitle={appAlert.okTitle} cancelTitle={appAlert.cancelTitle}></Alert>



        </div>

    )

}

const mapStateToProps = (state)=>{

    return state;

};


export default connect(mapStateToProps)(App);