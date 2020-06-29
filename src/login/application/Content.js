import React,{useState,useEffect,useRef,Fragment} from 'react';

import { Input,Button } from "antd";

import {showWarnAlert,showErrorAlert,hideAlert} from "../store/appAlert";

import {loginApi} from "../api";

import {getQueryVariable} from "../../common/js/disconnect";

import {Modal,Loading} from "../../common";

import {connect} from 'react-redux';

import md5 from 'md5';

import {getNewTkUrl,goToNextPage,decodeObjValue} from "../api/utils";


function Content(props) {

    const [bluePicList,setBluePicList] = useState([0,1,2,3]);

    //aibPic
    const [aiPicList,setAiPicList] = useState([0,1,2]);

    const [techPicList,setTechPicList] = useState([0,1,2]);

    const [aiExamPicList,setAiExamPicList] = useState([0,1,2]);

    const [account,setAccount] = useState(()=>{

        const username = localStorage.getItem('LgBaseAccount');

        return username?username:''

    });

    const [pwd,setPwd] = useState('');

    const [modalShow,setModalShow] = useState(false);

    const [modalLoading,setModalLoading] = useState(true);

    const [modalTitle,setModalTitle] = useState('');

    const [modalUrl,setModalUrl] = useState('');

    const [loginLoading,setLoginLoading] = useState(false);

    const [delAccountBtn,setDelAccount] = useState(()=>{

        const username = localStorage.getItem('LgBaseAccount');

        return username?true:false

    });

    const [delPwdBtn,setDelPwd] = useState(false);

    const accountInput = useRef();

    const pwdInput = useRef();



    const { introduce,commSetting,picChange,dispatch } = props;

    const { skin,OpenSetInfo,basePlugin,WebIndexUrl,ClinetDownUrl,WebRootUrl } = commSetting;

    let { active } = introduce[skin]?introduce[skin]:{};

    const {title, describe} = introduce[skin]?introduce[skin].list[active]:{};

    useEffect(()=>{

        if (skin!=='ai_school'&&skin!=='dark_tech'&&skin!=='ai_exam') return;

        let timer = setTimeout(()=>{

                if (active===2){

                    picChange(0)

                }else{

                    picChange(active+1);

                }


            },4000);
        
        return ()=>{

            clearTimeout(timer);

        }

    },[active]);

    useEffect(()=>{

      window.top.ClosePop = closeModal;

    },[]);


    //点击注册按钮
    const signIn = () => {

        if (account){

            if (pwd){

                if (basePlugin){//如果是已安装插件包就不需要提示直接进行

                    loginFnc();

                }else{

                    dispatch(showWarnAlert({title:"检测到未安装基础插件包，为确保功能正常，请先下载安装",okTitle:'确定下载',cancelTitle:'直接登录',okShow:'y',cancelShow:'y',ok:downLoadBase,cancel:()=>{

                            loginFnc();

                        }}))

                }

            }else{

                dispatch(showWarnAlert({title:"请输入登录密码",okShow:'n',cancelTitle:'确定',close:pwdFoucs,cancel:pwdFoucs,cancelShow:'y'}));


            }

        }else{

            dispatch(showWarnAlert({title:"请输入登录账号",okShow:'n',cancelTitle:'确定',close:accountFoucs,cancel:accountFoucs,cancelShow:'y'}));

        }


    };



    //下载基础插件包
    const downLoadBase = () => {

        dispatch(hideAlert(dispatch));

        window.open(ClinetDownUrl);

    };

    //打开弹窗
    const openModal = ({title,url}) => {

        setModalLoading(true);

        setModalTitle(title);

        setModalUrl(url);

        setModalShow(true);

    };

    //关闭弹窗
    const closeModal = ()=>{

        setModalShow(false);

    };

    //keyup事件
    const KeyUp = (e) => {

        e.stopPropagation();

        if (e.keyCode===13){

            signIn();

        }

    };


    //登录函数

    const loginFnc = () => {

        setLoginLoading(true);

        const md5Pwd = md5(pwd).toString().split('').reverse().join('');

        const browser = navigator.userAgent;

        const lg_sysid = getQueryVariable('lg_sysid')?getQueryVariable('lg_sysid'):101;

        const macId = localStorage.getItem('LgBaseMacID')?localStorage.getItem('LgBaseMacID'):'';

        loginApi({method:'Login',params:`${account}|${md5Pwd}|${lg_sysid}|2||${macId}|${browser}`}).then((res)=>{

            if (parseInt(res.error)===0){

                switch (parseInt(res.data.result)) {

                    case 0:

                        dispatch(showErrorAlert({title:"登录失败",okShow:'n',cancelTitle:'确定',cancel:accountFoucs,close:accountFoucs,cancelShow:'y'}));

                        break;

                    case 1:

                        localStorage.setItem('LgBaseAccount',account);

                        localStorage.setItem('token',res.data.token);

                        sessionStorage.setItem("token",res.data.token);

                        loginApi({token:res.data.token,method:'GetUserInfo',params:'000'}).then(result=>{

                            //如果成功获取到用户信息
                            if (result.data&&result.error==='0'){

                                const UserInfo = decodeObjValue(result.data);

                                sessionStorage.setItem("UserInfo",JSON.stringify(UserInfo));

                                goToNextPage({token:res.data.token,WebIndexUrl,UserType:UserInfo.UserType});

                            }else{

                                goToNextPage({token:res.data.token,WebIndexUrl,UserType:''});

                            }

                        },err=>{

                            goToNextPage({token:res.data.token,WebIndexUrl,UserType:''});

                        });

                        break;

                    case 2:

                        dispatch(showErrorAlert({title:"登录失败，账号不存在",okShow:'n',cancelTitle:'确定',cancel:accountFoucs,close:accountFoucs,cancelShow:'y'}));

                        break;

                    case 3:

                        dispatch(showErrorAlert({title:"登录失败，账号或密码错误",okShow:'n',cancelTitle:'确定',cancel:pwdFoucs,close:pwdFoucs,cancelShow:'y'}));

                        break;

                    case 4:

                        dispatch(showErrorAlert({title:"登录失败，该账号已在其它 IP 登录",okShow:'n',cancelTitle:'确定',cancel:accountFoucs,close:accountFoucs,cancelShow:'y'}));

                        break;

                    case 5:

                    case 6:

                    case 7:

                    case 8:

                        dispatch(showErrorAlert({title:decodeURIComponent(res.data.token),okShow:'n',cancelTitle:'确定',cancel:accountFoucs,close:accountFoucs,cancelShow:'y'}));

                        break;

                }

            }else{

                dispatch(showErrorAlert({title:"登录失败",okShow:'n',cancelTitle:'确定',cancel:accountFoucs,close:accountFoucs,cancelShow:'y'}));

            }

            setLoginLoading(false);

        },(resp,err)=>{

            dispatch(showErrorAlert({title:decodeURIComponent(err),okShow:'n',cancelTitle:'确定',cancel:accountFoucs,close:accountFoucs,cancelShow:'y'}));

            setLoginLoading(false);

        });

    };


    //用户名和密码的聚焦
    const accountFoucs = () => {

       dispatch(hideAlert(dispatch));

       //晚一点再聚焦
       setTimeout(()=>{

           accountInput.current.focus();

       },200);

    };

    const pwdFoucs = () => {

         dispatch(hideAlert(dispatch));

        //晚一点再聚焦
        setTimeout(()=>{

            pwdInput.current.focus();

        },200);

    };

    //用户名和密码变化

    const accountChange = (str) => {

        setAccount(str);

        if (str){

            setDelAccount(true);

        }else{

            setDelAccount(false);

        }

    };

    const pwdChange = (str) => {

        setPwd(str);

        if (str){

            setDelPwd(true);

        }else{

            setDelPwd(false);

        }

    };

    //清除账号和密码

    const clearAccount = () => {

        setAccount('');

        setDelAccount(false);

        accountInput.current.focus();

    };

    const clearPwd = () => {

        setPwd('');

        setDelPwd(false);

        pwdInput.current.focus();

    };


    return(

        <div className={"content_wrapper"} style={{marginTop:(window.innerHeight-634)>0?(window.innerHeight-634)/2:20}}>

            <div className={"content_left_wrapper"}>

                {

                    skin==='dark_blue'?

                        <div className="dark_blue_left_introduce">

                            {

                                bluePicList.map((i,k)=>{

                                    if (k===active){

                                    return(

                                        <Fragment key={k}>

                                            <div className={`pic pic${active+1}`}></div>

                                            <div className={`introduce-wrapper introduce${active+1}`}>

                                                <div className="introduce-title">{title}</div>

                                                <div className="introduce-describe">{describe}</div>

                                            </div>

                                        </Fragment>

                                        )

                                    }

                                })

                            }

                        </div>

                        :''

                }

                {

                    skin==='dark_tech'?

                        <div className="dark_tech_left_introduce">

                            {

                                techPicList.map((i,k)=>{

                                    if (k===active){

                                        return(

                                            <Fragment key={k}>

                                                <div className={"pic-wrapper"}>

                                                    <i className={`pic pic${active+1}`}></i>

                                                    <i className={`pallet pallet${active+1}`}></i>

                                                </div>

                                                <div className={`introduce-wrapper introduce${active+1}`}>

                                                    <span className="introduce-title">{title}</span>

                                                    <span className="introduce-describe">{describe}</span>

                                                </div>

                                            </Fragment>

                                        )

                                    }

                                })

                            }

                        </div>

                        :''

                }


                {

                    skin==='cloud_schoolroom'?

                        <div className="cloud_schoolroom_left_introduce">



                        </div>

                        :''

                }

                {

                    skin==='ai_school'?

                        <div className="ai_school_left_introduce">

                            {

                                aiPicList.map((i,k)=>{

                                    if (k===active){

                                        return(

                                            <Fragment key={k}>

                                                <div className={`pic pic${active+1}`}></div>

                                                <div className={`introduce-wrapper introduce${active+1}`}>

                                                    <div className="introduce-title">{title}</div>

                                                    <div className="introduce-describe">{describe}</div>

                                                </div>

                                            </Fragment>

                                        )

                                    }

                                })

                            }

                        </div>

                        :''

                }

                {

                    skin==='ai_exam'?

                        <div className="ai_exam_left_introduce">

                            {

                                aiExamPicList.map((i,k)=>{

                                    if (k===active){

                                        return(

                                            <Fragment key={k}>

                                                <div className={`ai_exam_bg bg${k+1}`}>

                                                    <div className={"ai-exam-top-box"}>

                                                        {

                                                            k===0?

                                                                <>

                                                                    <div className={`animate-center center${k+1}`}>

                                                                        <i className={"robot"}></i>

                                                                        <i className={"card card1"}></i>

                                                                        <i className={"card card2"}></i>

                                                                        <i className={"card card3"}></i>

                                                                    </div>

                                                                </>

                                                                :

                                                                k===1?

                                                                <>

                                                                    <div className={`animate-center center${k+1}`}>

                                                                        <i className={"arrow"}></i>

                                                                        <i className={"exam-paper"}></i>

                                                                    </div>

                                                                </>

                                                                :

                                                                <>

                                                                    <div className={`animate-center center${k+1}`}>

                                                                        <div className={"success-wrapper"}>

                                                                            <i className={"success"}></i>

                                                                        </div>

                                                                        <i className={"board"}></i>

                                                                    </div>

                                                                </>


                                                        }

                                                    </div>

                                                    <div className={`title title${k+1}`}></div>

                                                </div>

                                            </Fragment>

                                        )

                                    }

                                })

                            }

                        </div>

                        :''

                }


            </div>

            <div className={"content_right_wrapper"}>

                <div className={`${skin}_sign_wrapper`}>

                    <Loading spinning={loginLoading} opacity={true}>

                        <div className="locked-wrapper">

                        </div>

                        <div className={"normal-wrapper"}>

                            <div className="title">欢迎您，请登录</div>

                            <div className={"account_wrapper"}>

                                <Input ref={accountInput} className="account" value={account} onChange={e=>accountChange(e.target.value)} onKeyUp={KeyUp}  placeholder={"请输入登录账号"}/>

                                <i onClick={clearAccount} style={{display:`${delAccountBtn?'block':'none'}`}} className={"input_clear account_clear"}></i>

                            </div>

                            <div className={"pwd_wrapper"}>

                                <Input ref={pwdInput} className="pwd" value={pwd} onChange={e=>pwdChange(e.target.value)} onKeyUp={KeyUp}  type={"password"} placeholder={"请输入登录密码"}/>

                                <i onClick={clearPwd} style={{display:`${delPwdBtn?'block':'none'}`}} className={"input_clear pwd_clear"}></i>

                            </div>

                            <div className={"forget_pwd_wrapper"}>

                                <a className={"forget_pwd link"} target={"_blank"} target={"_blank"} href={`${WebRootUrl}/UserMgr/Login/GetPwdBack/CheckUserID.aspx`} >忘记密码?</a>

                            </div>

                            <Button type={"primary"} className={"to-login"} onClick={signIn}>登录</Button>

                            {

                                OpenSetInfo&&OpenSetInfo.length>0?

                                    <>

                                        <div className={"split_wrapper"}>

                                            <i className="left_line split_line"></i>

                                            <span className={"split_text"}>第三方账号登录</span>

                                            <i className={"right_line split_line"}></i>

                                        </div>

                                        <div className={"author_wrapper"}>

                                            {
                                                OpenSetInfo.map((item,key)=>{

                                                    let type = '';

                                                    switch (item.OpenType) {

                                                        case 1:

                                                            type = "qq";

                                                            break;

                                                        case 2:

                                                            type = "weibo";

                                                            break;

                                                        case 4:

                                                            type = "wechat";

                                                            break;

                                                    }

                                                    if (type!=='wechat'){

                                                        return <div key={key} className={type} onClick={e=>openModal({title:item.OpenType===1?'QQ':'微博',url:item.OpenUrl})}></div>

                                                    }else{

                                                        return;

                                                    }

                                                })
                                            }

                                        </div>

                                    </>

                                    :''

                            }

                            <div className={"sign_up_wrapper"}>

                                还没有账号？<a target={"_blank"} href={`/html/register`} className={"sign_up_link link"}>立即注册</a>

                            </div>

                        </div>

                    </Loading>

                </div>

            </div>


            <Modal
                type="1"
                title={`通过${modalTitle}登录`}
                width={850}
                bodyStyle={{height:462}}
                footer={null}
                destroyOnClose={true}
                visible={modalShow}
                className={"author_modal"}
                onCancel={closeModal}
            >

                <Loading spinning={modalLoading} opacity={false} tip={"加载中，请稍候..."}>

                    <iframe src={modalUrl} className={"author_iframe"} onLoad={e=>setModalLoading(false)} frameBorder="0"></iframe>

                </Loading>


            </Modal>

        </div>

    )

}

const mapStateToProps = (state)=>{

    return state;

};

export default connect(mapStateToProps)(Content);