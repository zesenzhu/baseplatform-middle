import React,{useEffect,useCallback,useMemo,useRef,useState,memo} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import GuideTitle from '../../components/guideTitle';

import {Input,Button} from "antd";

import {Tips, CheckBoxGroup, CheckBox, Loading} from "../../../common";

import AreaCheck from '../../components/areaCheck';

import SchoolTypeCheck from '../../components/schoolTypeCheck';

import SchoolSystemCheck from '../../components/schoolSystemCheck';

import { schoolCodeReg,schoolNameReg } from '../../actions/utils';

import {GetSchoolInfo,uploadSchoolLogo,AddSchoolInfo,EditSchoolInfo_Middle,EditSchoolInfo_Univ} from "../../actions/apiActions";

import {appLoadingHide} from "../../store/appLoading";

import {loginUserUpdate} from "../../store/LoginUser";

import CropperModal from '../../../common/js/CropperModal';

import {removeSlashUrl} from "../../actions/utils";

import {btnWarnAlertShow} from "../../store/appAlert";

import GuideFooter from '../../components/guideFooter';

import {guiderStepChange} from "../../store/guideStep";

import './index.scss';



function SchoolSetting(props) {


    //states

    const [loading,setLoading] = useState(true);

    //学校名称
    const [schoolName,setSchoolName] = useState({

        tip:false,

        title:'请输入学校名称',

        value:''

    });


    //学校代码
    const [schoolCode,setSchoolCode] = useState({

        tip:false,

        title:'请输入学校代码',

        value:''

    });

    //学校区域

    const [schoolArea,setSchoolArea]  = useState({

       provinceID:'',cityID:'',countyID:'',ready:false

    });

    //学段选择（中小学）
    const [period,setPeriod] = useState({

        primary:{

            disabled:true,

            checked:'',

            originChecked:''

        },

        middle:{

            disabled:true,

            checked:'',

            originChecked:''

        },

        heigh:{

            disabled:true,

            checked:'',

            originChecked:''

        },

        tip:false

    });


    //学制（大学）
    const [system,setSystem] = useState({

        tip:false,

        checked:''

    });


    //学校logo

    const [schoolLogo,setSchoolLogo] = useState({

       show:false,

        logoUrl:'',

        badgeUrl:'',

        actionUrl:''

    });


    const LoginUser = useSelector(state=>state.LoginUser);

    const {UserType,UserID,UserClass,SchoolID} = LoginUser;

    const schoolType = useSelector(state=>state.schoolType);

    const appLoading = useSelector(state=>state.appLoading);

    const dispatch  = useDispatch();


    const {history} = props;


    //refs

    const schoolNameRef = useRef(schoolName);

    const schoolCodeRef = useRef(schoolCode);

    const schoolAreaRef = useRef(schoolArea);

    const periodRef = useRef(period);

    const systemRef = useRef(system);

    const schoolLogoRef = useRef(schoolLogo);

    const schoolTypeRef = useRef(schoolType);

    const loginUserRef = useRef(LoginUser);


    //存放临时文件
    const tmpFileRef = useRef();

    const AreaCheckRef = useRef();

    const fileRef = useRef();

    const uploadImgRef = useRef();

    useEffect(()=>{

        loginUserRef.current = LoginUser;

        return ()=>{

            loginUserRef.current = '';

        }

    },[LoginUser]);

    useEffect(()=>{

        let unMount = false;
        
        if (UserID){

            dispatch(guiderStepChange(1));

            if (SchoolID){ //如果有学校ID的情况下先获取学校设置

                GetSchoolInfo({dispatch,SchoolID}).then(data=>{

                    if (!unMount){

                        if (data){

                            const {SchoolName,SchoolCode,SchoolLogoUrl,SchoolLogoUrl_Long,ProvinceID,CityID,CountyID,SchoolType,SchoolSessionType} = data;

                            if (schoolType==='middle'){ //中小学的时候判断学段信息

                                const list = SchoolSessionType.split("/");

                                switch (parseInt(SchoolType)) {

                                    case 1:

                                        setPeriod(d=>{

                                            periodRef.current = { ...d,

                                                primary:{ checked:list[0],disabled:false,originChecked:list[0]},

                                                middle:{checked:'',disabled:true,originChecked:parseInt(list[1])===0?(9-parseInt(list[0])).toString():list[1]}

                                            };

                                            return { ...d,

                                                primary:{ checked:list[0],disabled:false,originChecked:list[0]},

                                                middle:{checked:'',disabled:true,originChecked:parseInt(list[1])===0?(9-parseInt(list[0])).toString():list[1]}

                                            };

                                        });

                                        break;

                                    case 2:

                                        setPeriod(d=>{

                                            periodRef.current = { ...d,

                                                middle:{ checked:list[1],disabled:false,originChecked:list[1]},

                                                primary:{checked:'',disabled:true,originChecked:parseInt(list[0])===0?(9-parseInt(list[1])).toString():list[0]}

                                            };

                                            return { ...d,

                                                middle:{ checked:list[1],disabled:false,originChecked:list[1]},

                                                primary:{checked:'',disabled:true,originChecked:parseInt(list[0])===0?(9-parseInt(list[1])).toString():list[0]}


                                            };

                                        });

                                        break;

                                    case 4:

                                        setPeriod(d=>{

                                            periodRef.current = { ...d,

                                                primary:{ checked:'',disabled:true,originChecked:'5'},

                                                middle:{ checked:'',disabled:true,originChecked:'4'},

                                                heigh:{ checked:'3',disabled:false,originChecked:'3'}

                                            };

                                            return { ...d,

                                                primary:{ checked:'',disabled:true,originChecked:'5'},

                                                middle:{ checked:'',disabled:true,originChecked:'4'},

                                                heigh:{ checked:'3',disabled:false,originChecked:'3'}

                                            };

                                        });

                                        break;

                                    case 3:

                                        setPeriod(d=>{

                                            periodRef.current = { ...d,primary:{ checked:list[0],disabled:false,originChecked:list[0]},middle:{ checked:list[1],disabled:false,originChecked:list[1]}};

                                            return { ...d,primary:{ checked:list[0],disabled:false,originChecked:list[0]},middle:{ checked:list[1],disabled:false,originChecked:list[1]}};

                                        });

                                        break;

                                    case 5:

                                        setPeriod(d=>{

                                            periodRef.current = { ...d,

                                                primary:{ checked:list[0],disabled:false,originChecked:list[0]},

                                                middle:{ checked:'',disabled:false,originChecked:list[1]},

                                                heigh:{ checked:'3',disabled:false,originChecked:'3'}

                                            };

                                            return { ...d,

                                                primary:{ checked:list[0],disabled:false,originChecked:list[0]},

                                                middle:{ checked:'',disabled:false,originChecked:list[1]},

                                                heigh:{ checked:'3',disabled:false,originChecked:'3'}

                                            };

                                        });

                                        break;

                                    case 6:

                                        setPeriod(d=>{

                                            const list = SchoolSessionType.split("/");

                                            periodRef.current = { ...d,

                                                primary:{ checked:'',disabled:true,originChecked:parseInt(list[0])===0?(9-parseInt(list[1])).toString():list[0]},

                                                middle:{ checked:list[1],disabled:false,originChecked:list[1]},

                                                heigh:{ checked:'3',disabled:false,originChecked:'3'}

                                            };

                                            return { ...d,

                                                primary:{ checked:'',disabled:true,originChecked:parseInt(list[0])===0?(9-parseInt(list[1])).toString():list[0]},

                                                middle:{ checked:list[1],disabled:false,originChecked:list[1]},

                                                heigh:{ checked:'3',disabled:false,originChecked:'3'}

                                            };

                                        });

                                        break;

                                    case 7:

                                        setPeriod(d=>{

                                            const list = SchoolSessionType.split("/");

                                            periodRef.current = { ...d,primary:{ checked:list[0],disabled:false,originChecked:list[0]},middle:{ checked:list[1],disabled:false,originChecked:list[1]},heigh:{ checked:'3',disabled:false,originChecked:'3'}};

                                            return { ...d,primary:{ checked:list[0],disabled:false,originChecked:list[0]},middle:{ checked:list[1],disabled:false,originChecked:list[1]},heigh:{ checked:'3',disabled:false,originChecked:'3'}};

                                        });

                                        break;

                                }

                            }else{//大学的时候直接使用学制

                                setSystem(d=>{

                                    systemRef.current = { ...d,checked:SchoolSessionType};

                                    return { ...d,checked:SchoolSessionType};

                                });

                            }

                            setSchoolArea(d=>{

                                schoolAreaRef.current = { ...d,provinceID:ProvinceID,cityID:CityID,countyID:CountyID,ready:true };

                                return { ...d,provinceID:ProvinceID,cityID:CityID,countyID:CountyID,ready:true };

                            });

                            setSchoolName(d=>{

                                schoolNameRef.current = {...d,value:SchoolName};

                                return {...d,value:SchoolName};

                            });

                            setSchoolCode(d=>{

                                schoolCodeRef.current = {...d,value:SchoolCode};

                                return {...d,value:SchoolCode};

                            });

                            logoInit(SchoolLogoUrl,SchoolLogoUrl_Long);

                            setLoading(false);

                            dispatch(appLoadingHide());

                        }

                        dispatch(appLoadingHide());

                    }

                })

            }else{

                logoInit();

                setLoading(false);

                setSchoolArea(d=>({...d,ready:true}));

                dispatch(appLoadingHide());

            }

        }

        return ()=>{

            unMount = true;

        }
        
    },[UserID]);


    useEffect(()=>{

        schoolTypeRef.current = schoolType;

        return ()=>{

            schoolTypeRef.current = '';

        }

    },[schoolType]);



    //学校名称变化
    const schoolNameChange = useCallback((e)=>{

        e.persist();

        setSchoolName(d=>{

            schoolNameRef.current = {...d,value:e.target.value,tip:false};

            return {...d,value:e.target.value,tip:false};

        });

    },[]);


    //学校代码变化
    const schoolCodeChange = useCallback((e)=>{

        e.persist();

        setSchoolCode(d=>{

            schoolCodeRef.current = {...d,value:e.target.value};

            return {...d,value:e.target.value};

        });

    },[]);


    //学校名称blur

    const schoolNameBlur = useCallback(()=>{

        const schoolName = schoolNameRef.current.value;

        if (schoolName){

            const result = schoolNameReg(schoolName);

            if (result){

                setSchoolName(d=>{

                    schoolNameRef.current = { ...d,tip:false };

                    return { ...d,tip:false};

                });

            }else{

                setSchoolName(d=>{

                    schoolNameRef.current = { ...d,tip:true,title:'学校名称由中文、数字、字母、()（）等符号组成' };

                    return { ...d,tip:true,title:'学校名称由中文、数字、字母、()（）等符号组成'};

                });

            }

        }else{

            setSchoolName(d=>{

                schoolNameRef.current = { ...d,tip:true,title:'请输入学校名称' };

                return { ...d,tip:true,title:'请输入学校名称'};

            });

        }

    },[]);

    //学校代码blur

    const schoolCodeBlur = useCallback(()=>{

        const schoolCode = schoolCodeRef.current.value;

        if (schoolCode){

            const result = schoolCodeReg(schoolCode);

            if (result){

                setSchoolCode(d=>{

                    schoolCodeRef.current = { ...d,tip:false };

                    return { ...d,tip:false};

                });

            }else{

                setSchoolCode(d=>{

                    schoolCodeRef.current = { ...d,tip:true,title:'学校代码有英文字母或数字组成' };

                    return { ...d,tip:true,title:'学校代码有英文字母或数字组成'};

                });

            }

        }else{

            setSchoolCode(d=>{

                schoolCodeRef.current = { ...d,tip:true,title:'请输入学校代码' };

                return { ...d,tip:true,title:'请输入学校代码'};

            });

        }

    },[]);






    //中小学的事件

    //点击学制
    const radioClick = useCallback(({type,value}) =>{

        const { primary,middle } = periodRef.current;

        if (type==='primary'){

            setPeriod(d=>{

                const active = !middle.disabled;

                const middleNum = (9-parseInt(value)).toString();

                const checked = active?middleNum:'';

                const originChecked = middleNum;

                periodRef.current = {...d,primary:{...d.primary,checked:value,originChecked:value},middle:{...d.middle,checked,originChecked}};

                return {...d,primary:{...d.primary,checked:value,originChecked:value},middle:{...d.middle,checked,originChecked}};

            });

        }else{

            setPeriod(d=>{

                const active = !primary.disabled;

                const primaryNum = (9-parseInt(value)).toString();

                const checked = active?primaryNum:'';

                const originChecked = primaryNum;

                periodRef.current = {...d,middle:{...d.middle,checked:value,originChecked:value},primary:{...d.primary,checked,originChecked}};

                return {...d,middle:{...d.middle,checked:value,originChecked:value},primary:{...d.primary,checked,originChecked}};

            });

        }

    },[]);


    //点击学段

    const periodClick = useCallback((type) =>{

        const {primary,middle,heigh} = periodRef.current;

        let active = false;

        switch (type) {

            case 'primary':

                 active = !primary.disabled;

                if(active){

                    setPeriod(d=>{

                        periodRef.current =  {...d,primary:{...d.primary,disabled:true,checked:''}};

                        return {...d,primary:{...d.primary,disabled:true,checked:''}};

                    })

                }else{

                    setPeriod(d=>{

                        periodRef.current =  {...d,primary:{...d.primary,disabled:false,checked:d.primary.originChecked?d.primary.originChecked:'6'}};

                        return {...d,primary:{...d.primary,disabled:false,checked:d.primary.originChecked?d.primary.originChecked:'6'}};

                    })

                }

                break;

            case 'middle':

                 active = !middle.disabled;

                if(active){

                    setPeriod(d=>{

                        periodRef.current =  {...d,middle:{...d.middle,disabled:true,checked:''}};

                        return {...d,middle:{...d.middle,disabled:true,checked:''}};

                    })

                }else{

                    setPeriod(d=>{

                        periodRef.current =  {...d,middle:{...d.middle,disabled:false,checked:d.middle.originChecked?d.middle.originChecked:'3'}};

                        return {...d,middle:{...d.middle,disabled:false,checked:d.middle.originChecked?d.middle.originChecked:'3'}};

                    })

                }

                break;

            case 'heigh':

                 active = !heigh.disabled;

                if(active){

                    setPeriod(d=>{

                        periodRef.current =  {...d,heigh:{...d.heigh,disabled:true,checked:''}};

                        return {...d,heigh:{...d.heigh,disabled:true,checked:''}};

                    })

                }else{

                    setPeriod(d=>{

                        periodRef.current =  {...d,heigh:{...d.heigh,disabled:false,checked:'3'}};

                        return {...d,heigh:{...d.heigh,disabled:false,checked:'3'}};

                    })

                }

                break;

        }

        setPeriod(d=>{

            periodRef.current = {...d,tip:false};

            return {...d,tip:false}

        });

    },[]);

    //大学版事件

    const systemChange = useCallback((e)=>{

        setSystem(d=>{

           systemRef.current = { ...d,tip:false,checked:e.target.value };

           return { ...d,tip:false,checked:e.target.value };

        });

    },[]);



    //打开学校logo弹窗事件

    const schoolLogoShow = useCallback(()=>{

        setSchoolLogo(d=>{

            schoolLogoRef.current = {...d,show:true};

            return {...d,show:true};

        });

    },[]);

    //关闭学校logo的弹窗
    const closeSchoolLogoModal = useCallback(() =>{

        setSchoolLogo(d=>{

            schoolLogoRef.current = {...d,show:false};

            return {...d,show:false};

        });

    },[]);


    //提交学校logo事件
    const schoolLogoCommit = useCallback((blob,filePath) =>{

        const { ResHttpRootUrl } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        const logoUrl = ResHttpRootUrl+filePath;

        setSchoolLogo(d=>{

            schoolLogoRef.current = {...d,logoUrl};

            return {...d,logoUrl};

        });

    },[]);


    //学校logo初始化

    const logoInit = (SchoolLogoUrl,SchoolLogoUrl_Long) =>{

        const { ResHttpRootUrl } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        const logoUrl = SchoolLogoUrl?SchoolLogoUrl:`${removeSlashUrl(ResHttpRootUrl)}/SysSetting/Attach/default.png`;

        const badgeUrl = SchoolLogoUrl_Long?SchoolLogoUrl_Long:`${removeSlashUrl(ResHttpRootUrl)}/SysSetting/Attach/default_280_40.png`;

        const actionUrl = `${removeSlashUrl(ResHttpRootUrl)}/SubjectRes_UploadHandler.ashx?method=doUpload_WholeFile&userid=${UserID}`;

        setSchoolLogo(d=>{

            schoolLogoRef.current = {...d,logoUrl,badgeUrl,actionUrl};

            return {...d,logoUrl,badgeUrl,actionUrl};

        });

    };

    const schoolLogoReset = useCallback(()=>{

        const { ResHttpRootUrl } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        const logoUrl =`${removeSlashUrl(ResHttpRootUrl)}/SysSetting/Attach/default.png`;

        setSchoolLogo(d=>{

            schoolLogoRef.current = { ...d,logoUrl};

            return { ...d,logoUrl};

        });

    },[]);


    //当校徽初始化错误
    const badgeLoadErr = useCallback(()=>{

        const { ResHttpRootUrl } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        setSchoolLogo(d=>{

            schoolLogoRef.current = {...d,badgeUrl:`${removeSlashUrl(ResHttpRootUrl)}/SysSetting/Attach/default_280_40.png`};

            return {...d,badgeUrl:`${removeSlashUrl(ResHttpRootUrl)}/SysSetting/Attach/default_280_40.png`};

        });

    },[]);


    //当学校logo初始化错误

    const logoLoadErr = useCallback(()=>{

        const { ResHttpRootUrl } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        setSchoolLogo(d=>{

            schoolLogoRef.current = {...d,logoUrl:`${removeSlashUrl(ResHttpRootUrl)}/SysSetting/Attach/default.png`};

            return {...d,logoUrl:`${removeSlashUrl(ResHttpRootUrl)}/SysSetting/Attach/default.png`};

        });

    },[]);


    //校徽文件变化

    const fileChange = useCallback((e)=>{

        const file = e.target.files[0];

        tmpFileRef.current = file;

        const fileType = file.name.split('.')[file.name.split('.').length-1].toLowerCase();

        if (['png','svg'].includes(fileType)){

            if (file.size/1024>2048){

                dispatch(btnWarnAlertShow({title:'上传的图片大小超过2M的限制'}));

                fileRef.current.value = '';

            }else{

                const reader = new FileReader();

                reader.readAsDataURL(file);

                reader.onload = imgNotView;

            }

        }else{

            dispatch(btnWarnAlertShow({title:'上传的图片的格式错误'}));

            fileRef.current.value = '';

        }

    },[]);

    //预览上传的图片，但是不展示

    const imgNotView = (e)=>{

        const url = e.target.result;

        uploadImgRef.current.src = url;

    };

    //上传的图片的尺寸判断
    const tmpImgLoad = useCallback((e) =>{

        const { ResHttpRootUrl } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        if (uploadImgRef.current.width===280&&uploadImgRef.current.height===40){

            //执行上传操作

            uploadSchoolLogo(tmpFileRef.current,UserID,dispatch).then(data=>{

                if (data){

                    setSchoolLogo(d=>{

                        schoolLogoRef.current = {...d,badgeUrl:`${ResHttpRootUrl+data}`};

                        return {...d,badgeUrl:`${ResHttpRootUrl+data}`}

                    });

                }else{

                    fileRef.current.value='';

                }

            })


        }else{

            dispatch(btnWarnAlertShow({title:'上传图片的尺寸不正确，请重新上传'}));

            uploadImgRef.current.src='';

            fileRef.current.value='';

        }

    },[]);

    //使用默认校徽
    const schoolBadgeReset = useCallback(()=>{

        const { ResHttpRootUrl } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        const badgeUrl = `${removeSlashUrl(ResHttpRootUrl)}/SysSetting/Attach/default_280_40.png`;

        setSchoolLogo(d=>{

            schoolLogoRef.current = {...d,badgeUrl};

            return {...d,badgeUrl};
        });

    },[]);


    //提交并到下一步

    const nextStepClick = useCallback(()=>{

        const { provinceID,showProvinceTip,hideProvinceTip,cityID,hideCityTip,showCityTip,countyID,showCountyTip,hideCountyTip } = AreaCheckRef.current;

        let provinceOk=false,cityOk=false,countyOk=false,schoolNameOk=false,schoolCodeOk=false,schoolSystemOk=false,schoolTypeOk=false;


        //判断省市县

        if (!provinceID&&!cityID&&!countyID){

            provinceOk = true;

            cityOk = true;

            countyOk = true;

        }else{

            if (provinceID){

                provinceOk = true;

                hideProvinceTip();

            }else{

                showProvinceTip();

            }

            if (cityID){

                cityOk = true;

                hideCityTip();

            }else{

                showCityTip();

            }

            if (countyID){

                countyOk = true;

                hideCountyTip();

            }else{

                showCountyTip();

            }

        }



        //判断是大学还是中小学,设置学段和学制问题

        if (schoolTypeRef.current==='middle'){

            if (periodRef.current.primary.disabled&&periodRef.current.middle.disabled&&periodRef.current.heigh.disabled){

                setPeriod(d=>{

                   periodRef.current = {...d,tip:true};

                   return {...d,tip:true};

                });

            }else if(!periodRef.current.primary.disabled&&periodRef.current.middle.disabled&&!periodRef.current.heigh.disabled){

                dispatch(btnWarnAlertShow({title:'学段必须是连续的'}));

            }else{

                schoolTypeOk = true;

                setPeriod(d=>{

                    periodRef.current = {...d,tip:false};

                    return {...d,tip:false};

                });

            }

        }else{

            if (systemRef.current.checked){

                schoolSystemOk = true;

                setSystem(d=>{

                    systemRef.current = {...d,tip:false};

                    return {...d,tip:false};

                });

            }else{

                setSystem(d=>{

                    systemRef.current = {...d,tip:true};

                    return {...d,tip:true};

                });

            }

        }

        if (!schoolNameRef.current.value){

            setSchoolName(d=>{

               schoolNameRef.current = {...d,tip:true,title:'请输入学校名称'};

               return {...d,tip:true,title:'请输入学校名称'};

            });

        }

        if (!schoolCodeRef.current.value){

            setSchoolCode(d=>{

                schoolCodeRef.current = {...d,tip:true,title:'请输入学校代码'};

                return {...d,tip:true,title:'请输入学校代码'};

            });

        }

        if (!schoolNameRef.current.tip&&schoolNameRef.current.value){

            schoolNameOk = true;

        }

        if (!schoolCodeRef.current.tip&&schoolCodeRef.current.value){

            schoolCodeOk = true;

        }

        let SchoolName='',SchoolImgUrl_Long='',SchoolCode='',SchoolLevel='',SchoolType='',SchoolSessionType='',SchoolImgUrl='',CountyID='';

        //在这里请求接口,成功后跳转到下一页

        if (schoolTypeRef.current==='middle'){ //如果是中小学

            if (provinceOk&&cityOk&&countyOk&&schoolNameOk&&schoolCodeOk&&schoolTypeOk){//判断中小学是否可以提交

                setLoading(true);

                SchoolName = schoolNameRef.current.value;

                SchoolCode = schoolCodeRef.current.value;

                SchoolLevel = 2;

                const {primary,middle,heigh} = periodRef.current;

                SchoolType = (primary.disabled?0:1)+(middle.disabled?0:2)+(heigh.disabled?0:4);

                switch (SchoolType) {

                    case 1:

                        SchoolSessionType = `${primary.checked}/0/0`;

                        break;

                    case 2:

                        SchoolSessionType = `0/${middle.checked}/0`;

                        break;

                    case 3:

                        SchoolSessionType = `${primary.checked}/${middle.checked}/0`;

                        break;

                    case 4:

                        SchoolSessionType = `0/0/${heigh.checked}`;

                        break;

                    case 6:

                        SchoolSessionType = `0/${middle.checked}/${heigh.checked}`;

                        break;

                    case 7:

                        SchoolSessionType = `${primary.checked}/${middle.checked}/${heigh.checked}`;

                        break;

                }

               /* if (SchoolType!==4){

                    if (primary.disabled){

                        SchoolSessionType = `${9-parseInt(middle.checked)}/${middle.checked}/3`

                    }else if (middle.disabled){

                        SchoolSessionType = `${primary.checked}/${9-parseInt(primary.checked)}/3`

                    }else {

                        SchoolSessionType = `${primary.checked}/${middle.checked}/3`

                    }

                }else{

                    SchoolSessionType = '5/4/3';

                }*/

                SchoolImgUrl = schoolLogoRef.current.logoUrl;

                SchoolImgUrl_Long = schoolLogoRef.current.badgeUrl;

                CountyID = countyID;

                if (loginUserRef.current.SchoolID){//修改学校信息

                    EditSchoolInfo_Middle({UserID:loginUserRef.current.UserID,SchoolImgUrl_Long,

                        dispatch,SchoolID:loginUserRef.current.SchoolID,

                        SchoolName,SchoolCode,SchoolLevel,SchoolType,SchoolSessionType,SchoolImgUrl,CountyID}).then(data=>{

                        setLoading(false);

                        if (data===0){

                            toNextPage();

                        }

                    })

                }else{

                    AddSchoolInfo({UserID:loginUserRef.current.UserID,

                        dispatch,SchoolName,SchoolCode,SchoolLevel,SchoolImgUrl_Long,

                        SchoolType,SchoolSessionType,SchoolImgUrl,CountyID}).then(data=>{

                        setLoading(false);

                        if (data){

                            const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

                            UserInfo['SchoolID'] = data;

                            sessionStorage.setItem("UserInfo",JSON.stringify(UserInfo));

                            dispatch(loginUserUpdate(UserInfo));

                            toNextPage();

                        }

                    })

                }

            }

        }else{

            if (provinceOk&&cityOk&&countyOk&&schoolNameOk&&schoolCodeOk&&schoolSystemOk){ //判断大学是否可以提交

                setLoading(true);

                SchoolName = schoolNameRef.current.value;

                SchoolCode = schoolCodeRef.current.value;

                SchoolLevel = 1;

                SchoolType = 1;

                SchoolSessionType = systemRef.current.checked ;

                SchoolImgUrl = schoolLogoRef.current.logoUrl;

                SchoolImgUrl_Long = schoolLogoRef.current.badgeUrl;

                CountyID = countyID;

                if (loginUserRef.current.SchoolID){

                    EditSchoolInfo_Univ({dispatch,UserID:loginUserRef.current.UserID,SchoolImgUrl_Long,

                        SchoolType,SchoolID:loginUserRef.current.SchoolID,SchoolName,SchoolCode,SchoolLevel,SchoolSessionType,SchoolImgUrl,

                        CountyID

                    }).then(data=>{

                        setLoading(false);

                        if (data===0){

                            toNextPage();

                        }

                    })

                }else{

                    AddSchoolInfo({UserID:loginUserRef.current.UserID,

                        dispatch,SchoolName,SchoolCode,SchoolLevel,SchoolImgUrl_Long,

                        SchoolType,SchoolSessionType,SchoolImgUrl,CountyID}).then(data=>{

                        setLoading(false);

                         if (data){

                             const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));

                             UserInfo['SchoolID'] = data;

                             sessionStorage.setItem("UserInfo",JSON.stringify(UserInfo));

                             dispatch(loginUserUpdate(UserInfo));

                             toNextPage();

                         }

                    })

                }


            }

        }

    },[]);

    //跳转到下一项
    const toNextPage = ()=>{

      if (schoolTypeRef.current==='middle'){

        history.push('/yearAndTerm');

      }else{

        history.push('/college');

      }

    };


    return(

        <Loading spinning={loading} tip={"加载中,请稍候..."}>

            <GuideTitle title={"设置学校基础信息"} step={1} tips={"(后续可通过“系统设置”模块进行管理)"}></GuideTitle>

            <div className={"school-setting"}>

                <table className={"school-setting-tb"}>

                    <tbody>

                    <tr>

                        <td className={"col1 school-sign"}>学校标志:</td>

                        <td className={"col2"}>

                            <div className={"school-logo-wrapper clearfix"}>

                                <img width={108} height={108} onError={logoLoadErr} src={schoolLogo.logoUrl} alt={"图片"} className={"logo-img"} />

                                <div className={"btn-wrapper"}>

                                    <Button className={"upload"} onClick={schoolLogoShow}>上传图片</Button>

                                    <Button className={"reset"} onClick={schoolLogoReset}>使用默认</Button>

                                    <div className={"tips"}>上传要求: 请上传png/jpg格式的图片，图片大小不能超过2MB</div>

                                </div>

                                <div className={"tab"}>圆形校徽</div>

                            </div>

                           {/* <div className={"school-badge-wrapper clearfix"}>

                                <img alt={"图片"} width={280} height={40} src={schoolLogo.badgeUrl} onError={badgeLoadErr}  className={"logo-img"} />

                                <div className={"btn-wrapper"}>

                                    <Button className={"upload"}>

                                        上传图片

                                        <input ref={fileRef} className={"upload-file"} type={"file"} accept={"image/png,image/svg"} onChange={fileChange}/>

                                    </Button>

                                    <Button className={"reset"} onClick={schoolBadgeReset}>使用默认</Button>

                                    <div className={"tips"}>上传要求:大小不能超过2MB,像素为280*40的png/svg，</div>

                                </div>

                                <div className={"tab"}>长方形校徽</div>

                            </div>

                            <img className={"img-tmp-file"} onLoad={tmpImgLoad} ref={uploadImgRef} alt=""/>
*/}

                        </td>

                    </tr>

                    <tr>

                        <td className={"col1"}>学校名称:</td>

                        <td className={"col2"}>

                            <Tips visible={schoolName.tip} title={schoolName.title}>

                                <Input maxLength={20} onBlur={schoolNameBlur} className={"school-name"} onChange={schoolNameChange} value={schoolName.value}/>

                            </Tips>

                        </td>

                    </tr>

                    <tr>

                        <td className={"col1"}>学校代码:</td>

                        <td className={"col2"}>

                        {

                            SchoolID?

                                <div children={"school-code"}>{schoolCode.value}</div>

                                :

                                <Tips visible={schoolCode.tip} title={schoolCode.title}>

                                    <Input maxLength={10} onBlur={schoolCodeBlur} className={"school-code"} onChange={schoolCodeChange} value={schoolCode.value}/>

                                </Tips>

                        }

                        </td>

                    </tr>

                    <tr>

                        <td className={"col1"}>{schoolType==='middle'?'学校类型:':'学校学制:'}</td>

                        <td className={"col2"}>

                            {

                                schoolType==='middle'?

                                    <div className={"school-type"}>

                                        <Tips visible={period.tip} title={"请选择学校类型"}>

                                            <SchoolTypeCheck radioClick={radioClick} periodClick={periodClick} period={period}></SchoolTypeCheck>

                                        </Tips>

                                    </div>

                                    :

                                    <div className={"school-system"}>

                                        <Tips visible={system.tip} title={"请选择学校学制"}>

                                            <SchoolSystemCheck systemChange={systemChange} checked={system.checked}></SchoolSystemCheck>

                                        </Tips>

                                    </div>

                            }

                        </td>

                    </tr>

                    <tr>

                        <td className={"col1"}>所在区域:</td>

                        <td className={"col2"}>

                            {

                                schoolArea.ready?

                                    <AreaCheck ProvinceID={schoolArea.provinceID} CityID={schoolArea.cityID} CountyID={schoolArea.countyID} ref={AreaCheckRef}></AreaCheck>

                                    :null

                            }

                        </td>

                    </tr>

                    </tbody>

                </table>

                <GuideFooter nextStepClick={nextStepClick}></GuideFooter>

            </div>

            <CropperModal onSubmit={schoolLogoCommit} onClose={closeSchoolLogoModal} Visiable={schoolLogo.show} UpDataUrl={schoolLogo.actionUrl} diskName={"SysSetting"}></CropperModal>

        </Loading>

    )

}


export default memo(SchoolSetting);