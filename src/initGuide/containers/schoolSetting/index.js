import React,{useEffect,useCallback,useMemo,useRef,useState,memo} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import GuideTitle from '../../components/guideTitle';

import {Input,Button} from "antd";

import {Tips,CheckBoxGroup,CheckBox} from "../../../common";

import AreaCheck from '../../components/areaCheck';

import SchoolTypeCheck from '../../components/schoolTypeCheck';

import SchoolSystemCheck from '../../components/schoolSystemCheck';

import { schoolCodeReg,schoolNameReg } from '../../actions/utils';

import {GetSchoolInfo} from "../../actions/apiActions";

import {appLoadingHide} from "../../store/appLoading";

import CropperModal from '../../../common/js/CropperModal';

import {removeSlashUrl} from "../../actions/utils";

import {btnWarnAlertShow} from "../../store/appAlert";

import GuideFooter from '../../components/guideFooter';

import './index.scss';

function SchoolSetting(props) {


    //states

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


    const {UserType,UserID,UserClass,SchoolID} = useSelector(state=>state.LoginUser);

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

    const AreaCheckRef = useRef();

    const fileRef = useRef();

    const uploadImgRef = useRef();

    useEffect(()=>{
        
        if (UserID){

            if (SchoolID){ //如果有学校ID的情况下先获取学校设置

                GetSchoolInfo({dispatch,SchoolID}).then(data=>{

                    if (data){

                        const {SchoolName,SchoolCode,SchoolLogoUrl,ProvinceID,CityID,CountyID,SchoolType,SchoolSessionType} = data;

                        if (schoolType==='middle'){ //中小学的时候判断学段信息

                            switch (parseInt(SchoolType)) {

                                case 1:

                                    setPeriod(d=>{

                                        periodRef.current = { ...d,primary:{ checked:SchoolSessionType,disabled:false,originChecked:SchoolSessionType}};

                                        return { ...d,primary:{ checked:SchoolSessionType,disabled:false,originChecked:SchoolSessionType}};

                                    });

                                    break;

                                case 2:

                                    setPeriod(d=>{

                                        periodRef.current = { ...d,middle:{ checked:SchoolSessionType,disabled:false,originChecked:SchoolSessionType}};

                                        return { ...d,middle:{ checked:SchoolSessionType,disabled:false,originChecked:SchoolSessionType}};

                                    });

                                    break;

                                case 4:

                                    setPeriod(d=>{

                                        periodRef.current = { ...d,heigh:{ checked:SchoolSessionType,disabled:false,originChecked:SchoolSessionType}};

                                        return { ...d,heigh:{ checked:SchoolSessionType,disabled:false,originChecked:SchoolSessionType}};

                                    });

                                    break;

                                case 3:

                                    setPeriod(d=>{

                                        const list = SchoolSessionType.split("/");

                                        periodRef.current = { ...d,primary:{ checked:list[0],disabled:false,originChecked:list[0]},middle:{ checked:list[1],disabled:false,originChecked:list[1]}};

                                        return { ...d,primary:{ checked:list[0],disabled:false,originChecked:list[0]},middle:{ checked:list[1],disabled:false,originChecked:list[1]}};

                                    });

                                    break;

                                case 5:

                                    setPeriod(d=>{

                                        const list = SchoolSessionType.split("/");

                                        periodRef.current = { ...d,primary:{ checked:list[0],disabled:false,originChecked:list[0]},heigh:{ checked:list[1],disabled:false,originChecked:list[1]}};

                                        return { ...d,primary:{ checked:list[0],disabled:false,originChecked:list[0]},heigh:{ checked:list[1],disabled:false,originChecked:list[1]}};

                                    });

                                    break;

                                case 6:

                                    setPeriod(d=>{

                                        const list = SchoolSessionType.split("/");

                                        periodRef.current = { ...d,middle:{ checked:list[0],disabled:false,originChecked:list[0]},heigh:{ checked:list[1],disabled:false,originChecked:list[1]}};

                                        return { ...d,middle:{ checked:list[0],disabled:false,originChecked:list[0]},heigh:{ checked:list[1],disabled:false,originChecked:list[1]}};

                                    });

                                    break;

                                case 7:

                                    setPeriod(d=>{

                                        const list = SchoolSessionType.split("/");

                                        periodRef.current = { ...d,primary:{ checked:list[0],disabled:false,originChecked:list[0]},middle:{ checked:list[1],disabled:false,originChecked:list[1]},heigh:{ checked:list[2],disabled:false,originChecked:list[2]}};

                                        return { ...d,primary:{ checked:list[0],disabled:false,originChecked:list[0]},middle:{ checked:list[1],disabled:false,originChecked:list[1]},heigh:{ checked:list[2],disabled:false,originChecked:list[2]}};

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

                        logoInit(SchoolLogoUrl);

                    }

                })

            }else{

                logoInit();

            }

        }
        
    },[UserID]);


    useEffect(()=>{

        schoolTypeRef.current = schoolType;

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

                        periodRef.current =  {...d,primary:{...d.primary,disabled:false,checked:d.primary.originChecked}};

                        return {...d,primary:{...d.primary,disabled:false,checked:d.primary.originChecked}};

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

                        periodRef.current =  {...d,middle:{...d.middle,disabled:false,checked:d.middle.originChecked}};

                        return {...d,middle:{...d.middle,disabled:false,checked:d.middle.originChecked}};

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

                        periodRef.current =  {...d,heigh:{...d.heigh,disabled:false,checked:d.heigh.originChecked}};

                        return {...d,heigh:{...d.heigh,disabled:false,checked:d.heigh.originChecked}};

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

    const logoInit = (SchoolLogoUrl) =>{

        const { ResHttpRootUrl } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        const logoUrl = SchoolLogoUrl?SchoolLogoUrl:`${removeSlashUrl(ResHttpRootUrl)}/SysSetting/Attach/default.png`;

        const badgeUrl = `${removeSlashUrl(ResHttpRootUrl)}/SysSetting/Attach/custom_280_40.png`;

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

    //校徽初始化成功
    const badgeLoad = useCallback(()=>{

        if (appLoading){

            dispatch(appLoadingHide());

        }

    },[]);

    //当校徽初始化错误
    const badgeLoadErr = useCallback(()=>{

        const { ResHttpRootUrl } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        if (appLoading){

            setSchoolLogo(d=>{

                schoolLogoRef.current = {...d,badgeUrl:`${removeSlashUrl(ResHttpRootUrl)}/SysSetting/Attach/default_280_40.png`};

                return {...d,badgeUrl:`${removeSlashUrl(ResHttpRootUrl)}/SysSetting/Attach/default_280_40.png`};

            });

            dispatch(appLoadingHide());

        }

    },[]);


    //校徽文件变化

    const fileChange = useCallback((e)=>{

        const file = e.target.files[0];

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

        console.log(e,uploadImgRef.current);

    };

    //上传的图片的尺寸判断
    const tmpImgLoad = useCallback((e) =>{

        if (uploadImgRef.current.width===280&&uploadImgRef.current.height===40){



        }else{

            dispatch(btnWarnAlertShow({title:'上传图片的尺寸不正确，请重新上传'}));

            uploadImgRef.current.src='';

            fileRef.current.value='';

        }

    },[]);

    //使用默认校徽
    const schoolBadgeReset = useCallback(()=>{

        const { ResHttpRootUrl } = JSON.parse(sessionStorage.getItem("LgBasePlatformInfo"));

        const badgeUrl = `${removeSlashUrl(ResHttpRootUrl)}/SysSetting/Attach/custom_280_40.png`;

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

        //判断是大学还是中小学,设置学段和学制问题



        if (schoolTypeRef.current==='middle'){

            if (periodRef.current.primary.disabled&&periodRef.current.middle.disabled&&periodRef.current.heigh.disabled){

                setPeriod(d=>{

                   periodRef.current = {...d,tip:true};

                   return {...d,tip:true};

                });

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


        if (!schoolNameRef.current.tip){

            schoolNameOk = true;

        }

        if (!schoolCodeRef.current.tip){

            schoolCodeOk = true;

        }


        //在这里请求接口,成功后跳转到下一页


        toNextPage();



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

        <>

            <GuideTitle title={"设置院系基础信息"} step={1} tips={"(后续可通过“系统设置”模块进行管理)"}></GuideTitle>

            <div className={"school-setting"}>

                <table className={"school-setting-tb"}>

                    <tbody>

                    <tr>

                        <td className={"col1 school-sign"}>学校标志:</td>

                        <td className={"col2"}>

                            <div className={"school-logo-wrapper clearfix"}>

                                <img src={schoolLogo.logoUrl} className={"logo-img"} alt=""/>

                                <div className={"btn-wrapper"}>

                                    <Button className={"upload"} onClick={schoolLogoShow}>上传图片</Button>

                                    <Button className={"reset"} onClick={schoolLogoReset}>使用默认</Button>

                                    <div className={"tips"}>上传要求: 请上传png/jpg格式的图片，图片大小不能超过2MB</div>

                                </div>

                                <div className={"tab"}>圆形校徽</div>

                            </div>

                            <div className={"school-badge-wrapper clearfix"}>

                                <img src={schoolLogo.badgeUrl} onError={badgeLoadErr} onLoad={badgeLoad} className={"logo-img"} alt=""/>

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

                        </td>

                    </tr>

                    <tr>

                        <td className={"col1"}>学校名称:</td>

                        <td className={"col2"}>

                            <Tips visible={schoolName.tip} title={schoolName.title}>

                                <Input onBlur={schoolNameBlur} className={"school-name"} onChange={schoolNameChange} value={schoolName.value}/>

                            </Tips>

                        </td>

                    </tr>

                    <tr>

                        <td className={"col1"}>学校代码:</td>

                        <td className={"col2"}>

                            <Tips visible={schoolCode.tip} title={schoolCode.title}>

                                <Input onBlur={schoolCodeBlur} className={"school-code"} onChange={schoolCodeChange} value={schoolCode.value}/>

                            </Tips>

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

        </>

    )

}


export default memo(SchoolSetting);