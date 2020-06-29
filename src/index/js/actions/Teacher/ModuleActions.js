const  TEACHER_MODULE_GROUPS_UPDATE = 'TEACHER_MODULE_GROUPS_UPDATE';

const TEACHER_MODULE_LOADING_HIDE = 'TEACHER_MODULE_LOADING_HIDE';

const TEACHER_MODULE_LOADING_SHOW = 'TEACHER_MODULE_LOADING_SHOW';


//如果image加载成功
const ImgLoad = ({GroupID,PNO,CNO})=>{

  return (dispatch,getState)=>{

      let { ModuleGroups } = getState().Teacher.Modules;

      let NewModuleGroups =  ModuleGroups.map(item=>{

          if (item.GroupID===GroupID){

            if (CNO!==undefined){

                let Modules = item.Modules.map((i,k)=>{

                   if (k === PNO){

                        return {

                            ...i,

                            SubGroupModules:i.SubGroupModules.map((it,kt)=>{

                                if (kt === CNO){

                                    return {

                                        ...it,

                                        showDom:"img",

                                        baseImgUrl:''

                                    }

                                }else{

                                    return it;

                                }

                            })

                        }

                   }else{

                       return i;

                   }

                });

                return {

                    ...item,

                    Modules:Modules

                }

            }else{

               let Modules = item.Modules.map((i,k)=>{

                    if (k === PNO){

                        return {

                            ...i,

                            showDom:"img",

                            baseImgUrl:''

                        }

                    }else{

                        return i;

                    }

               });

               return {

                   ...item,

                   Modules:Modules

               }

            }

          }else{

              return item;

          }

      });



      dispatch({type:TEACHER_MODULE_GROUPS_UPDATE,data:NewModuleGroups});

  }

};

//如果img加载失败

const ImgErrorLoad = ({GroupID,PNO,CNO})=>{

    return (dispatch,getState)=>{

        let { ModuleGroups } = getState().Teacher.Modules;

        let NewModuleGroups =  ModuleGroups.map(item=>{

            if (item.GroupID===GroupID){

                if (CNO!==undefined){

                    let Modules = item.Modules.map((i,k)=>{

                        if (k === PNO){

                            return {

                                ...i,

                                SubGroupModules:i.SubGroupModules.map((it,kt)=>{

                                    if (kt === CNO){

                                        return {

                                            ...it,

                                            showDom:"div"

                                        }

                                    }else{

                                        return it;

                                    }

                                })

                            }

                        }else{

                            return i;

                        }

                    });

                    return {

                        ...item,

                        Modules:Modules

                    }

                }else{

                    let Modules = item.Modules.map((i,k)=>{

                        if (k === PNO){

                            return {

                                ...i,

                                showDom:"div",

                            }

                        }else{

                            return i;

                        }

                    });

                    return {

                        ...item,

                        Modules:Modules

                    }

                }

            }else{

                return item;

            }

        });

        dispatch({type:TEACHER_MODULE_GROUPS_UPDATE,data:NewModuleGroups});

    }

};


//点击组合

const GroupToggle = ({GroupID,OrderNo}) => {

  return (dispatch,getState)=>{

      console.log(GroupID);

    let { ModuleGroups } = getState().Teacher.Modules;

    let NewModuleGroups = ModuleGroups.map(item=>{

       if (item.GroupID === GroupID){

            return {

                ...item,

                Modules:item.Modules.map(i=>{

                    if (i.OrderNo === OrderNo){

                        return {

                            ...i,

                            DetailShow:!i.DetailShow

                        }

                    }else{

                        if (i.IsGroup){

                            return {

                                ...i,

                                DetailShow:false

                            }

                        }else{

                            return i;

                        }

                    }

                })

            }

       }else{

        return {

            ...item,

            Modules:item.Modules.map(i=>{

                if (i.IsGroup){

                    return {

                        ...i,

                        DetailShow:false

                    }

                }else{

                    return i;

                }

            })

        };

       }

    });

      dispatch({type:TEACHER_MODULE_GROUPS_UPDATE,data:NewModuleGroups});

  }

};


const GroupDetailHide = () => {

    return (dispatch,getState)=>{

        let { ModuleGroups } = getState().Teacher.Modules;

        let NewModuleGroups = ModuleGroups.map(item=>{

            return {

                ...item,

                Modules:item.Modules.map(i=>{

                    if (i.IsGroup){

                        return {

                            ...i,

                            DetailShow:false

                        }

                    }else{

                        return i;

                    }

                })

            }

        });

        dispatch({type:TEACHER_MODULE_GROUPS_UPDATE,data:NewModuleGroups});

    }

};


export default {

    TEACHER_MODULE_GROUPS_UPDATE,

    TEACHER_MODULE_LOADING_SHOW,

    TEACHER_MODULE_LOADING_HIDE,

    ImgLoad,

    ImgErrorLoad,

    GroupToggle,

    GroupDetailHide

}