import HeaderActions from './HeaderActions';

import AppLoadingActions from '../AppLoadingActions';

import ModulesActions from './ModuleActions';

import dynamicFile from "dynamic-file";

import ApiActions from "../ApiActions";

import {productInfoChange} from '../../reducers/ProductInfo';

import AppIcon from '../../../images/App.png';

import SourceIcon from '../../../images/database.png';

import ToolIcon from '../../../images/tool.png';

import WebIcon from '../../../images/Website.png';


const MODULES_INFO_UPDATE = 'MODULES_INFO_UPDATE';


const PageInit = () => {

  return (dispatch,getState)=>{

    let { UserID }  = getState().LoginUser;

        const { SubjectNames,SubjectIDs } = JSON.parse(sessionStorage.getItem("UserInfo"));

        const SubjectNameList = SubjectNames.split(',');

        const SubjectIDList = SubjectIDs.split(',');

        let SubjectsInfo = [];

        for (let i = 0;i < SubjectNameList.length;i++){

            SubjectsInfo.push({

                id:SubjectIDList[i],

                name:SubjectNameList[i]

            })

        }

        dispatch({type:HeaderActions.TEACHER_HEADER_SUBJECTS_UPDATE,data:SubjectsInfo});

        dispatch({type:HeaderActions.TEACHER_HEADER_SUBJECTS_PICK_CHANGE,data:SubjectsInfo[0]});

      const teacherDeskTop = ApiActions.GetTeacherDeskTop({UserID,SubjectID:SubjectsInfo[0].id,dispatch});

      const productInfo = ApiActions.GetBaseInfoForPages({dispatch});



        Promise.all([teacherDeskTop,productInfo]).then(res=>{


          if (res[1]){

                document.title = res[1].ProductName;

                dispatch(productInfoChange(res[1]));

          }

          if (res[0]){

              let sortArr = res[0].sort((a,b)=>{

                  return a.OrderNo - b.OrderNo

              });

              let ModuleGroups = sortArr.map(item=>{

                  return {

                      ...item,

                      "Modules":item.Modules.sort((a,b)=>{ return a.OrderNo - b.OrderNo }).map(i=>{

                          let StartImg = '';

                          switch (i.ModuleType) {

                              case 'tool':

                                  StartImg = ToolIcon;

                                  break;

                              case 'application':

                                  StartImg = AppIcon;

                                  break;

                              case 'website':

                                  StartImg = WebIcon;

                                  break;

                              case 'reslib':

                                  StartImg = SourceIcon;

                                  break;

                              default:

                                  StartImg = '';

                          }

                          if (i.IsGroup){

                              let SubGroupModules = i.SubGroupModules.sort((a,b)=>{ return a.OrderNo - b.OrderNo }).map(it=>{

                                  let RandomArr = ['green','orange','blue'];

                                  let bg = RandomArr[Math.floor(Math.random()*RandomArr.length)];

                                  let StartImg = '';

                                  switch (it.ModuleType) {

                                      case 'tool':

                                          StartImg = ToolIcon;

                                          break;

                                      case 'application':

                                          StartImg = AppIcon;

                                          break;

                                      case 'website':

                                          StartImg = WebIcon;

                                          break;

                                      case 'reslib':

                                          StartImg = SourceIcon;

                                          break;

                                      default:

                                          StartImg = '';

                                  }

                                  let WebURL = '';

                                  if (it.ModuleType==='website'){

                                      WebURL = UrlGetIcon(it.AccessParam);

                                      return {

                                          ...it,

                                          "showDom":"img",

                                          "baseImgUrl":StartImg,

                                          "BgColor":bg,

                                          WebURL

                                      }

                                  }else{

                                      return {

                                          ...it,

                                          "showDom":"img",

                                          "baseImgUrl":StartImg,

                                          "BgColor":bg

                                      }

                                  }



                              });


                              return {

                                  ...i,

                                  SubGroupModules:SubGroupModules,

                                  DetailShow:false

                              }

                          }else{

                              let RandomArr = ['green','orange','blue'];

                              let bg = RandomArr[Math.floor(Math.random()*RandomArr.length)];

                              let WebURL = '';

                              if (i.ModuleType==='website'){

                                  WebURL = UrlGetIcon(i.AccessParam);

                                  return {

                                      ...i,

                                      "showDom":"img",

                                      "baseImgUrl":StartImg,

                                      "BgColor":bg,

                                      WebURL

                                  }

                              }else{

                                  return {

                                      ...i,

                                      "showDom":"img",

                                      "baseImgUrl":StartImg,

                                      "BgColor":bg

                                  }

                              }

                          }

                      })

                  }

              });

              dispatch({type:ModulesActions.TEACHER_MODULE_GROUPS_UPDATE,data:ModuleGroups});

              const AssistantStatus = res[0].find(item=>item.GroupName==='').Modules.find(i=>i.ModuleID==='200-0-1-01').ModuleStatus;

              if (AssistantStatus===1){

                  const LgAssistantAddr = res[0].find(item=>item.GroupName==='').Modules.find(i=>i.ModuleID==='200-0-1-01').AccessParam;

                  let token = sessionStorage.getItem('token');

                  const protocol = window.location.protocol;

                  const host = `${protocol}//${window.location.host}/`;

                  sessionStorage.setItem('PsnMgrToken',token);

                  sessionStorage.setItem("PsnMgrMainServerAddr",host);

                  sessionStorage.setItem("PsnMgrLgAssistantAddr",LgAssistantAddr);

                  dynamicFile([

                      `${LgAssistantAddr}PsnMgr/LgAssistant/css/lancoo.cp.assistant.css`,

                      `${LgAssistantAddr}PsnMgr/LgAssistant/assets/layui-v2.5.5/layui/css/layui.css`,

                      `${LgAssistantAddr}PsnMgr/LgAssistant/js/jquery-1.7.2.min.js`

                  ]).then(()=>{

                      dynamicFile([

                          `${LgAssistantAddr}PsnMgr/LgAssistant/assets/jquery.pagination.js`,

                          `${LgAssistantAddr}PsnMgr/LgAssistant/assets/layui-v2.5.5/layui/layui.js`,

                      ]).then(()=>{

                          dynamicFile([`${LgAssistantAddr}PsnMgr/LgAssistant/js/lancoo.cp.assistant.js`]).then(()=>{

                              Agassitant();

                          });

                      })

                  });

              }

          }

          dispatch({type:ModulesActions.TEACHER_MODULE_LOADING_HIDE});

          dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

      });

      /*  ApiActions.GetTeacherDeskTop({UserID,SubjectID:SubjectsInfo[0].id,dispatch}).then(data=>{

          if (data){

              let sortArr = data.sort((a,b)=>{

                  return a.OrderNo - b.OrderNo

              });


              let ModuleGroups = sortArr.map(item=>{

                  return {

                      ...item,

                      "Modules":item.Modules.sort((a,b)=>{ return a.OrderNo - b.OrderNo }).map(i=>{

                          let StartImg = '';

                          switch (i.ModuleType) {

                              case 'tool':

                                  StartImg = ToolIcon;

                                  break;

                              case 'application':

                                  StartImg = AppIcon;

                                  break;

                              case 'website':

                                  StartImg = WebIcon;

                                  break;

                              case 'reslib':

                                  StartImg = SourceIcon;

                                  break;

                              default:

                                  StartImg = '';

                          }

                          if (i.IsGroup){

                              let SubGroupModules = i.SubGroupModules.sort((a,b)=>{ return a.OrderNo - b.OrderNo }).map(it=>{

                                  let RandomArr = ['green','orange','blue'];

                                  let bg = RandomArr[Math.floor(Math.random()*RandomArr.length)];

                                  let StartImg = '';

                                  switch (it.ModuleType) {

                                      case 'tool':

                                          StartImg = ToolIcon;

                                          break;

                                      case 'application':

                                          StartImg = AppIcon;

                                          break;

                                      case 'website':

                                          StartImg = WebIcon;

                                          break;

                                      case 'reslib':

                                          StartImg = SourceIcon;

                                          break;

                                      default:

                                          StartImg = '';

                                  }

                                  let WebURL = '';

                                  if (it.ModuleType==='website'){

                                      WebURL = UrlGetIcon(it.AccessParam);

                                      return {

                                          ...it,

                                          "showDom":"img",

                                          "baseImgUrl":StartImg,

                                          "BgColor":bg,

                                          WebURL

                                      }

                                  }else{

                                      return {

                                          ...it,

                                          "showDom":"img",

                                          "baseImgUrl":StartImg,

                                          "BgColor":bg

                                      }

                                  }



                              });


                              return {

                                  ...i,

                                  SubGroupModules:SubGroupModules,

                                  DetailShow:false

                              }

                          }else{

                              let RandomArr = ['green','orange','blue'];

                              let bg = RandomArr[Math.floor(Math.random()*RandomArr.length)];

                              let WebURL = '';

                              if (i.ModuleType==='website'){

                                  WebURL = UrlGetIcon(i.AccessParam);

                                  return {

                                      ...i,

                                      "showDom":"img",

                                      "baseImgUrl":StartImg,

                                      "BgColor":bg,

                                      WebURL

                                  }

                              }else{

                                  return {

                                      ...i,

                                      "showDom":"img",

                                      "baseImgUrl":StartImg,

                                      "BgColor":bg

                                  }

                              }

                          }

                      })

                  }

              });

              dispatch({type:ModulesActions.TEACHER_MODULE_GROUPS_UPDATE,data:ModuleGroups});

              const AssistantStatus = data.find(item=>item.GroupName==='').Modules.find(i=>i.ModuleID==='200-0-1-01').ModuleStatus;

              if (AssistantStatus===1){

                  const LgAssistantAddr = data.find(item=>item.GroupName==='').Modules.find(i=>i.ModuleID==='200-0-1-01').AccessParam;

                  let token = sessionStorage.getItem('token');

                  const protocol = window.location.protocol;

                  const host = `${protocol}//${window.location.host}/`;

                  sessionStorage.setItem('PsnMgrToken',token);

                  sessionStorage.setItem("PsnMgrMainServerAddr",host);

                  sessionStorage.setItem("PsnMgrLgAssistantAddr",LgAssistantAddr);

                  dynamicFile([

                      `${LgAssistantAddr}PsnMgr/LgAssistant/css/lancoo.cp.assistant.css`,

                      `${LgAssistantAddr}PsnMgr/LgAssistant/assets/layui-v2.5.5/layui/css/layui.css`,

                      `${LgAssistantAddr}PsnMgr/LgAssistant/js/jquery-1.7.2.min.js`

                  ]).then(()=>{

                      dynamicFile([

                          `${LgAssistantAddr}PsnMgr/LgAssistant/assets/jquery.pagination.js`,

                          `${LgAssistantAddr}PsnMgr/LgAssistant/assets/layui-v2.5.5/layui/layui.js`,

                      ]).then(()=>{

                          dynamicFile([`${LgAssistantAddr}PsnMgr/LgAssistant/js/lancoo.cp.assistant.js`]).then(()=>{

                              Agassitant();

                          });

                      })

                  });

              }

          }

          dispatch({type:ModulesActions.TEACHER_MODULE_LOADING_HIDE});

          dispatch({type:AppLoadingActions.APP_LOADING_HIDE});



      });
*/

  }

};


const PageUpdate = () =>{

    return (dispatch,getState)=>{

        const SubjectID = getState().Teacher.HeaderSetting.SubjectSelect.id;

        const {UserID} = getState().LoginUser;

        dispatch({type:ModulesActions.TEACHER_MODULE_LOADING_SHOW});

        dispatch(UpdateModules({UserID,SubjectID}));


    }

};



const UpdateModules = ({UserID,SubjectID}) =>{

    return dispatch=>{

        dispatch({type:ModulesActions.TEACHER_MODULE_LOADING_SHOW});

        ApiActions.GetTeacherDeskTop({UserID,SubjectID,dispatch}).then(data=>{

            if (data){

                let ModuleGroups = data.sort((a,b)=>{ return a.OrderNo - b.OrderNo }).map(item=>{

                    return {

                        ...item,

                        "Modules":item.Modules.sort((a,b)=>{ return a.OrderNo - b.OrderNo }).map(i=>{

                            let StartImg = '';

                            switch (i.ModuleType) {

                                case 'tool':

                                    StartImg = ToolIcon;

                                    break;

                                case 'application':

                                    StartImg = AppIcon;

                                    break;

                                case 'website':

                                    StartImg = WebIcon;

                                    break;

                                case 'reslib':

                                    StartImg = SourceIcon;

                                    break;

                                default:

                                    StartImg = '';

                            }

                            if (i.IsGroup){

                                let SubGroupModules = i.SubGroupModules.sort((a,b)=>{ return a.OrderNo - b.OrderNo }).map(it=>{

                                    let RandomArr = ['green','orange','blue'];

                                    let bg = RandomArr[Math.floor(Math.random()*RandomArr.length)];

                                    let StartImg = '';

                                    switch (it.ModuleType) {

                                        case 'tool':

                                            StartImg = ToolIcon;

                                            break;

                                        case 'application':

                                            StartImg = AppIcon;

                                            break;

                                        case 'website':

                                            StartImg = WebIcon;

                                            break;

                                        case 'reslib':

                                            StartImg = SourceIcon;

                                            break;

                                        default:

                                            StartImg = '';

                                    }

                                    let WebURL = '';

                                    if (it.ModuleType==='website'){

                                        WebURL = UrlGetIcon(it.AccessParam);

                                        return {

                                            ...it,

                                            "showDom":"img",

                                            "baseImgUrl":StartImg,

                                            "BgColor":bg,

                                            WebURL

                                        }

                                    }else{

                                        return {

                                            ...it,

                                            "showDom":"img",

                                            "baseImgUrl":StartImg,

                                            "BgColor":bg

                                        }

                                    }



                                });


                                return {

                                    ...i,

                                    SubGroupModules:SubGroupModules,

                                    DetailShow:false

                                }

                            }else{

                                let RandomArr = ['green','orange','blue'];

                                let bg = RandomArr[Math.floor(Math.random()*RandomArr.length)];

                                let WebURL = '';

                                if (i.ModuleType==='website'){

                                    WebURL = UrlGetIcon(i.AccessParam);

                                    return {

                                        ...i,

                                        "showDom":"img",

                                        "baseImgUrl":StartImg,

                                        "BgColor":bg,

                                        WebURL

                                    }

                                }else{

                                    return {

                                        ...i,

                                        "showDom":"img",

                                        "baseImgUrl":StartImg,

                                        "BgColor":bg

                                    }

                                }

                            }

                        })

                    }

                });

                dispatch({type:ModulesActions.TEACHER_MODULE_GROUPS_UPDATE,data:ModuleGroups});

            }

            dispatch({type:ModulesActions.TEACHER_MODULE_LOADING_HIDE});

            dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

        });

    }

};


const UrlGetIcon = url => {
    let urlArr = "";
    // console.log(url,url instanceof String,typeof url)
    if (typeof url !== "string") {
        return;
    }
    if (url.indexOf("://") !== "-1") {
        urlArr = url
            .split("/")
            .slice(0, 3)
            .join("/");
        // console.log(urlArr)
        return urlArr;
    } else {
        urlArr = url.split("/")[0];
        // console.log(urlArr)

        return urlArr;
    }
};


export default {

    MODULES_INFO_UPDATE,

    PageInit,

    PageUpdate

}