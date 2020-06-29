import React,{Component} from 'react';

import {Empty, Loading} from "../../../../common";

class Content extends Component{

    OpenCustomModal(type){

        const { CustomClick } = this.props;

        if (type==='Website'||type==='tool'){

            CustomClick(type)

        }else{

            let Type = '';

            switch (type) {

                case 'application':

                    Type = 'App';

                    break;

                case 'reslib':

                    Type = 'database';

                    break;

                default:

                    Type = 'App';

            }

            CustomClick(Type);

        }

    }

    render() {

        const { ModuleGroups,ImgLoad,ImgErrorLoad,GroupToggle,ClickModule,ModulesLoading } = this.props;

        return (

            <div className="content-wrapper">

                <div className="modules-container">

                    {

                        ModulesLoading?

                            <Loading  opacity={false}></Loading>

                            :''

                    }

                    {
                        //遍历模块组合
                        ModuleGroups&&ModuleGroups.map((item,key)=>{

                                //判断是否是网站

                           if (item.GroupName){

                               if (item.IsWebsiteGroup){

                                   return <div className="module-wrapper website" key={key}>

                                       <div className="module-group-name">{item.GroupName}</div>

                                       <div className="module-group-wrapper clearfix">

                                           {

                                               item.Modules.length<1?

                                                   <div className="teacher-empty" onClick={this.OpenCustomModal.bind(this,'Website')}>暂无网站资源，请先定制添加</div>

                                                   :''

                                           }

                                           {

                                               item.Modules.map((i,k)=>{

                                                   let ModuleDetail = '';
                                                   //判断是否是组合
                                                   if (i.IsGroup){

                                                       ModuleDetail = <div className="module-group-item clearfix">

                                                           {

                                                               i.SubGroupModules.map((it,kt)=>{

                                                                   if (kt<=3){

                                                                       if (it.showDom==='img'){

                                                                           return <div key={kt} className={`group-item-icon ${it.BgColor}`}>

                                                                               <img alt="" className="website-base-img" src={it.baseImgUrl} style={{display:`${it.baseImgUrl?'block':'none'}`}}/>

                                                                               <img alt=""

                                                                                    src={`${it.WebURL}/favicon.ico`}

                                                                                    onLoad={()=>ImgLoad({GroupID:item.GroupID,PNO:k,CNO:kt})}

                                                                                    onError={()=>ImgErrorLoad({GroupID:item.GroupID,PNO:k,CNO:kt})}

                                                                                    style={{display:`${it.baseImgUrl?'none':'block'}`}}

                                                                               />

                                                                           </div>

                                                                       }else if (it.showDom === 'div'){

                                                                           return <div key={kt} className={`group-item-icon ${it.BgColor}`}>{it.ModuleName[0]}</div>

                                                                       }

                                                                   }

                                                               })

                                                           }

                                                       </div>

                                                   }else{

                                                       if (i.showDom==='img'){

                                                           ModuleDetail =  <div className={`module-logo ${i.BgColor}`}>

                                                               <img alt="" className="website-base-img" src={i.baseImgUrl} style={{display:`${i.baseImgUrl?'block':'none'}`}}/>


                                                               <img alt=""

                                                                    src={`${i.WebURL}/favicon.ico`}

                                                                    onLoad={()=>ImgLoad({GroupID:item.GroupID,PNO:k})}

                                                                    onError={()=>ImgErrorLoad({GroupID:item.GroupID,PNO:k})}

                                                                    style={{display:`${i.baseImgUrl?'none':'block'}`}}

                                                               />

                                                           </div>

                                                       }else{

                                                           ModuleDetail = <div className={`module-logo ${i.BgColor}`}>{i.ModuleName[0]}</div>

                                                       }

                                                   }


                                                   return <div key={k}

                                                               className={`module-item ${i.IsGroup?'group':''}`}

                                                               onClick={i.IsGroup?(e)=>GroupToggle({GroupID:item.GroupID,PNO:k,Event:e}):(e)=>ClickModule({ModuleStatus:i.ModuleStatus,AccessType:i.AccessType,AccessParam:i.AccessParam,SysID:i.SysID,Event:e,ModuleType:i.ModuleType})}>

                                                       {

                                                           ModuleDetail

                                                       }

                                                       <div className="module-name" title={i.ModuleName}>{i.ModuleName}</div>

                                                       {

                                                           i.IsGroup?

                                                               <div className="module-detail-wrapper" style={{width:(i.SubGroupModules.length>4?548:(100+i.SubGroupModules.length*88+(i.SubGroupModules.length-1)*32))}}>

                                                                   <div className="module-detail-name">{i.ModuleName}</div>

                                                                   <div className="module-detail-item-wrapper clearfix">

                                                                       {

                                                                           i.SubGroupModules.map((it,kt)=>{

                                                                               let ModuleIcon = '';

                                                                               if (it.showDom === 'img'){

                                                                                   ModuleIcon = <div className={`module-detail-item-icon ${it.BgColor}`}>

                                                                                       {/*<img src={`${it.AccessParam}/favicon.ico`}  alt=""/>*/}

                                                                                       <img alt="" className="website-base-img" src={it.baseImgUrl} style={{display:`${it.baseImgUrl?'block':'none'}`}}/>

                                                                                       <img alt=""

                                                                                            src={`${it.WebURL}/favicon.ico`}

                                                                                            onLoad={()=>ImgLoad({GroupID:item.GroupID,PNO:k,CNO:kt})}

                                                                                            onError={()=>ImgErrorLoad({GroupID:item.GroupID,PNO:k,CNO:kt})}

                                                                                            style={{display:`${it.baseImgUrl?'none':'block'}`}}

                                                                                       />

                                                                                   </div>;

                                                                               }else{

                                                                                   ModuleIcon = <div className={`module-detail-item-icon ${it.BgColor}`}>{it.ModuleName[0]}</div>

                                                                               }

                                                                               return <div key={kt} className="module-detail-item" onClick={(e)=>ClickModule({ModuleStatus:it.ModuleStatus,AccessType:it.AccessType,AccessParam:it.AccessParam,SysID:it.SysID,Event:e,ModuleType:it.ModuleType})}>

                                                                                   {

                                                                                       ModuleIcon

                                                                                   }

                                                                                   <div className="module-detail-item-name">{it.ModuleName}</div>

                                                                               </div>

                                                                           })

                                                                       }

                                                                   </div>

                                                               </div>

                                                               :''

                                                       }

                                                   </div>

                                               })

                                           }

                                       </div>

                                   </div>

                               }else{

                                   return <div className="module-wrapper" key={key}>

                                       <div className="module-group-name">{item.GroupName}</div>

                                       <div className="module-group-wrapper clearfix">

                                           {

                                               item.Modules.length<1?

                                                   <div className="teacher-empty" onClick={this.OpenCustomModal.bind(this,item.GroupType)}>暂无{item.GroupName}资源，请先定制添加</div>

                                                   :''

                                           }

                                           {

                                               item.Modules.map((i,k)=>{

                                                   let ModuleDetail = '';
                                                   //判断是否是组合
                                                   if (i.IsGroup){

                                                       ModuleDetail = <div className="module-group-item clearfix">

                                                           {

                                                               i.SubGroupModules.map((it,kt)=>{

                                                                   if (kt<=3){

                                                                       if (it.showDom==='img'){

                                                                           return <div key={kt} className={`group-item-icon ${it.BgColor}`}>

                                                                               <img alt="" src={it.baseImgUrl} style={{display:`${it.baseImgUrl?'block':'none'}`}}/>

                                                                               <img alt=""

                                                                                    src={it.ModuleLogoPath}

                                                                                    onLoad={()=>ImgLoad({GroupID:item.GroupID,PNO:k,CNO:kt})}

                                                                                    onError={()=>ImgErrorLoad({GroupID:item.GroupID,PNO:k,CNO:kt})}

                                                                                    style={{display:'none'}}

                                                                               />

                                                                               {

                                                                                   it.baseImgUrl?

                                                                                       ''

                                                                                       :

                                                                                       <div className="group-item-icon" style={{backgroundImage: `url(${it.ModuleLogoPath})`}}></div>

                                                                               }


                                                                           </div>

                                                                       }else if (it.showDom === 'div'){

                                                                           return <div key={kt} className={`group-item-icon ${it.BgColor}`}>{it.ModuleName[0]}</div>

                                                                       }

                                                                   }

                                                               })

                                                           }

                                                       </div>

                                                   }else{

                                                       if (i.showDom==='img'){

                                                           ModuleDetail =  <div className={`module-logo`}>

                                                               <img alt="" src={i.baseImgUrl} style={{display:`${i.baseImgUrl?'block':'none'}`}}/>


                                                               <img alt=""

                                                                    src={i.ModuleLogoPath}

                                                                    onLoad={()=>ImgLoad({GroupID:item.GroupID,PNO:k})}

                                                                    onError={()=>ImgErrorLoad({GroupID:item.GroupID,PNO:k})} style={{display:`none`}}/>

                                                               <div className={`module-logo`} style={{backgroundImage: `url(${i.ModuleLogoPath})`}}></div>

                                                           </div>

                                                       }else{

                                                           ModuleDetail = <div className={`module-logo ${i.BgColor}`}>{i.ModuleName[0]}</div>

                                                       }

                                                   }


                                                   return <div key={k}

                                                               className={`module-item ${i.IsGroup?'group':''}`}

                                                               onClick={i.IsGroup?(e)=>GroupToggle({GroupID:item.GroupID,PNO:k,Event:e}):(e)=>ClickModule({ModuleStatus:i.ModuleStatus,AccessType:i.AccessType,AccessParam:i.AccessParam,SysID:i.SysID,Event:e,ModuleType:i.ModuleType})}>

                                                       {

                                                           ModuleDetail

                                                       }

                                                       <div className="module-name" title={i.ModuleName}>{i.ModuleName}</div>

                                                       {

                                                           i.IsGroup?

                                                               <div className="module-detail-wrapper" style={{width:(i.SubGroupModules.length>4?548:(100+i.SubGroupModules.length*88+(i.SubGroupModules.length-1)*32))}}>

                                                                   <div className="module-detail-name">{i.ModuleName}</div>

                                                                   <div className="module-detail-item-wrapper clearfix">

                                                                       {

                                                                           i.SubGroupModules.map((it,kt)=>{

                                                                               let ModuleIcon = '';

                                                                               if (it.showDom === 'img'){

                                                                                   ModuleIcon = <div className={`module-detail-item-icon`}>

                                                                                      {/* <img src={`${it.AccessParam}/favicon.ico`}  alt=""/>*/}

                                                                                       <img alt="" src={it.baseImgUrl} style={{display:`${it.baseImgUrl?'block':'none'}`}}/>

                                                                                       <img alt=""

                                                                                            src={it.ModuleLogoPath}

                                                                                            onLoad={()=>ImgLoad({GroupID:item.GroupID,PNO:k,CNO:kt})}

                                                                                            onError={()=>ImgErrorLoad({GroupID:item.GroupID,PNO:k,CNO:kt})}

                                                                                            style={{display:'none'}}

                                                                                       />

                                                                                       {

                                                                                           it.baseImgUrl?

                                                                                               ''

                                                                                               :

                                                                                               <div className="module-detail-item-pic" style={{backgroundImage: `url(${it.ModuleLogoPath})`}}></div>

                                                                                       }

                                                                                   </div>;

                                                                               }else{

                                                                                   ModuleIcon = <div className={`module-detail-item-icon ${it.BgColor}`}>{it.ModuleName[0]}</div>

                                                                               }

                                                                               return <div key={kt} className="module-detail-item" onClick={(e)=>ClickModule({ModuleStatus:it.ModuleStatus,AccessType:it.AccessType,AccessParam:it.AccessParam,SysID:it.SysID,Event:e,ModuleType:it.ModuleType})}>

                                                                                   {

                                                                                       ModuleIcon

                                                                                   }

                                                                                   <div className="module-detail-item-name">{it.ModuleName}</div>

                                                                               </div>

                                                                           })

                                                                       }

                                                                   </div>

                                                               </div>

                                                               :''

                                                       }

                                                   </div>

                                               })

                                           }

                                       </div>

                                   </div>

                               }

                           }

                        })

                    }

                </div>

            </div>

        );

    }

}

export default Content;