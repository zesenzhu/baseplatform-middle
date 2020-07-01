import HeaderActions from './HeaderActions';

import Method from "../Method";

import AppAlertActions from "../AppAlertActions";

import AppLoadingActions from '../AppLoadingActions';

import CONFIG from "../../../../common/js/config";

import dynamicFile from "dynamic-file";

import ApiActions from "../ApiActions";

import echarts from 'echarts/dist/echarts.min';

import {productInfoChange} from '../../reducers/ProductInfo';



import OnlineShadowPng from '../../../images/blue-shadow.png';

import TopVisitShadowPng from '../../../images/green-shadow.png';

import LoginShadowPng from '../../../images/oragen-shadow.png';

import DiskUsedShadowPng from '../../../images/blue-shadow.png';

import GroupShadowPng from '../../../images/green-shadow.png';





const MODULES_INFO_UPDATE = 'MODULES_INFO_UPDATE';

const MANAGER_HEADER_STATICS_SETTING_UPDATE = 'MANAGER_HEADER_STATICS_SETTING_UPDATE';


const PageInit = () => {

  return (dispatch,getState)=>{

    let { UserID,UserClass }  = getState().LoginUser;

    const managerDesk = getManagerDesk({UserID,dispatch});

    const productInfo = ApiActions.GetBaseInfoForPages({dispatch});

    Promise.all([managerDesk,productInfo]).then(res=>{

       if (res[1]){

           const data = res[1];

           if (parseInt(UserClass)!==2){

               data['MessageShow'] = true;

           }else{

               data['MessageShow'] = false;

           }

           document.title = data.ProductName;

           dispatch(productInfoChange(data));

       }

       if (res[0]){

           const { TopVisit,OnlineUsers,SuspiciousLogin,OnlineDiskUsed,GroupFileSpaceUsed,Groups } = res[0];

           dispatch({type:HeaderActions.HEADER_STATICS_UPDATE,data:{TopVisit,OnlineUsers,SuspiciousLogin,OnlineDiskUsed,GroupFileSpaceUsed}});

           dispatch({type:MODULES_INFO_UPDATE,data:Groups});

           dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

           //分割获取的数据
           const OnlineUsersNow = OnlineUsers?OnlineUsers.split('/')[0]:0;

           const OnlineUsersAll = OnlineUsers?OnlineUsers.split('/')[1]:0;

           const TopVisitNow = TopVisit?TopVisit.split('/')[0]:0;

           const TopVisitAll = TopVisit?TopVisit.split('/')[1]:0;

           const OnlineDiskUsedNow = OnlineDiskUsed?OnlineDiskUsed.split('/')[0]:0;

           const OnlineDiskUsedAll = OnlineDiskUsed?OnlineDiskUsed.split('/')[1]:0;

           const GroupFileSpaceUsedNow = GroupFileSpaceUsed?GroupFileSpaceUsed.split('/')[0]:0;

           const GroupFileSpaceUsedAll = GroupFileSpaceUsed?GroupFileSpaceUsed.split('/')[1]:0;

           //测算数值和单位

           const OnlineDiskUnit = diskSize(OnlineDiskUsedNow);

           const GroupFileSpaceUnit = diskSize(GroupFileSpaceUsedNow);

           //修改echarts的配置

              const Options = {

                  series:[

                      {

                          type:'pie',

                          id:'第一个图',

                          name:1,

                          hoverAnimation:false,

                          center:[70,72],

                          radius:[70,64],

                          labelLine:{

                              show:false

                          },

                          data:[{

                              value:OnlineUsersNow,

                              itemStyle:{

                                  normal:{

                                      color:'rgba(12,81,255,0.42)',

                                      shadowBlur:10,

                                      shadowColor:'#b7e1ff'

                                  }

                              },

                              label:{

                                  show:true,

                                  position:'center',

                                  padding:[10,0,0,0],

                                  rich:{

                                      c:{

                                          color:'#0c51ff',

                                          fontSize:36,

                                          verticalAlign:'middle'

                                      },

                                      d:{

                                          color:'#0c51ff',

                                          fontSize:16,

                                          verticalAlign:'middle'

                                      }

                                  },

                                  formatter:(params)=>{

                                      return `{c|${params.value}}{d|人}`;

                                  },



                              }

                          },{

                              value:(OnlineUsersAll-OnlineUsersNow),

                              itemStyle:{

                                  normal:{

                                      color: 'transparent',

                                  }

                              }

                          }]

                      },

                      {

                          type:'pie',

                          id:'第一个图的圆形部分',

                          name:1,

                          hoverAnimation:false,

                          center:[70,72],

                          radius:[0,64],

                          legendHoverLink:false,

                          labelLine:{show:false},

                          label:{

                              show:true,

                              position:'center',

                              rich:{

                                  c:{

                                      color:'#333',

                                      fontSize:14,

                                      padding:[0,0,200,0]

                                  }

                              },

                              formatter:params=>{

                                  return `{c|当前在线}`

                              }

                          },

                          data:[{

                              value:1,

                              itemStyle: {

                                  // color: '#eff9ff',

                                  color:new echarts.graphic.RadialGradient(0.5, 0.5, 1.0, [          // 由中心向四周渐变
                                      {
                                          offset: 0,
                                          color: "#ffffff"
                                      },
                                      {
                                          offset: 1,
                                          color: "#7ecaff"
                                      }
                                  ]),

                                  /*shadowBlur:10,

                                  shadowColor:'#c5e1f1',*/

                                  /*emphasis:{

                                      color: new echarts.graphic.RadialGradient(0.5, 0.5, 1.0, [          // 由中心向四周渐变
                                          {
                                              offset: 0,
                                              color: "#ffffff"
                                          },
                                          {
                                              offset: 1,
                                              color: "#7ecaff"
                                          }
                                      ]),


                                  }*/

                              }

                          }]

                      },

                      {

                          type:'pie',

                          id:'第二个图',

                          name:2,

                          hoverAnimation:false,

                          center:[292,72],

                          radius:[70,64],

                          labelLine:{

                              show:false

                          },

                          data:[{

                              value:TopVisitNow,

                              itemStyle:{

                                  normal:{

                                      color: 'rgba(36,151,33,0.5)',

                                      /*shadowBlur:10,

                                      shadowColor:'#c8ded1'*/

                                  }

                              },

                              label:{

                                  show:true,

                                  position:'center',

                                  padding:[10,0,0,0],

                                  rich:{

                                      c:{

                                          color:'#249721',

                                          fontSize:36,

                                          verticalAlign:'middle'

                                      },

                                      d:{

                                          color:'#249721',

                                          fontSize:16,

                                          verticalAlign:'middle'

                                      }

                                  },

                                  formatter:(params)=>{

                                      return `{c|${params.value}}{d|人}`;

                                  },



                              }

                          },{

                              value:(TopVisitAll-TopVisitNow),

                              itemStyle:{

                                  normal:{

                                      color: 'transparent',

                                  }

                              }

                          }]

                      },

                      {

                          type:'pie',

                          id:'第二个图的圆形部分',

                          name:2,

                          hoverAnimation:false,

                          center:[292,72],

                          radius:[0,64],

                          legendHoverLink:false,

                          labelLine:{show:false},

                          label:{

                              show:true,

                              position:'center',

                              rich:{

                                  c:{

                                      color:'#333',

                                      padding:[0,0,200,0],

                                      fontSize:14

                                  },
                                  d:{

                                      color:'#999',

                                      padding:[0,0,200,0],

                                      fontSize:14

                                  }

                              },

                              formatter:params=>{

                                  return `{c|访问峰值}{d|(24小时内)}`

                              }

                          },

                          data:[{

                              value:0,

                              itemStyle: {

                                  color:new echarts.graphic.RadialGradient(0.5, 0.5, 1.0, [          // 由中心向四周渐变
                                      {
                                          offset: 0,
                                          color: "#ffffff"
                                      },
                                      {
                                          offset: 1,
                                          color: "#9dcf98"
                                      }
                                  ]),

                                  /*shadowBlur:10,

                                  shadowColor:'#cedce8',*/

                                  // emphasis:{color: '#f5ffef'}

                              }

                          }]

                      },

                      {

                          type:'pie',

                          id:"第三个图",

                          name:3,

                          hoverAnimation:false,

                          center:[514,72],

                          radius:[70,64],

                          labelLine:{

                              show:false

                          },

                          data:[{

                              value:1,

                              text:SuspiciousLogin?SuspiciousLogin:0,

                              itemStyle:{

                                  normal:{

                                      color: 'rgba(233,106,57,0.36)',

                                      /*shadowBlur:10,

                                      shadowColor:'#dee0e4'*/

                                  }

                              },

                              label:{

                                  show:true,

                                  position:'center',

                                  padding:[10,0,0,0],

                                  rich:{

                                      c:{

                                          color:'#e96a39',

                                          fontSize:36,

                                          verticalAlign:'middle'

                                      },

                                      d:{

                                          color:'#e96a39',

                                          fontSize:16,

                                          verticalAlign:'middle'

                                      }

                                  },

                                  formatter:(params)=>{

                                      return `{c|${params.data.text}}{d|条}`;

                                  }

                              }

                          },{

                              value:0,

                              itemStyle:{

                                  normal:{

                                      color: 'transparent',

                                  }

                              }

                          }]

                      },

                      {

                          type:'pie',

                          id:'第三个图的圆形部分',

                          name:3,

                          hoverAnimation:false,

                          center:[514,72],

                          radius:[0,64],

                          legendHoverLink:false,

                          labelLine:{show:false},

                          label:{

                              show:true,

                              position:'center',

                              rich:{

                                  c:{

                                      color:'#333',

                                      fontSize:14,

                                      padding:[0,0,200,0]

                                  }

                              },

                              formatter:params=>{

                                  return `{c|可疑登录}`

                              }

                          },

                          data:[{

                              value:0,

                              itemStyle: {

                                  color:new echarts.graphic.RadialGradient(0.5, 0.5, 1.0, [          // 由中心向四周渐变
                                      {
                                          offset: 0,
                                          color: "#ffffff"
                                      },
                                      {
                                          offset: 1,
                                          color: "#ffbda3"
                                      }
                                  ]),

                                  /*shadowBlur:10,

                                  shadowColor:'#f8b599',*/

                                  // emphasis:{color: '#fff6ef'}

                              }

                          }]

                      },

                      {

                          type:'pie',

                          id:"第四个图",

                          name:4,

                          hoverAnimation:false,

                          center:[736,72],

                          radius:[70,64],

                          labelLine:{

                              show:false

                          },

                          data:[{

                              value:OnlineDiskUsedNow,

                              text:OnlineDiskUnit.num,

                              itemStyle:{

                                  normal:{

                                      color:'rgba(12,81,255,0.42)',

                                     /* shadowBlur:10,

                                      shadowColor:'#1b67fd'*/

                                  }

                              },

                              label:{

                                  show:true,

                                  position:'center',

                                  padding:[10,0,0,0],

                                  rich:{

                                      c:{

                                          color:'#0c51ff',

                                          fontSize:36,

                                          verticalAlign:'middle'

                                      },

                                      d:{

                                          color:'#0c51ff',

                                          fontSize:16,

                                          verticalAlign:'middle'

                                      }

                                  },

                                  formatter:(params)=>{

                                      return `{c|${params.data.text}}{d|${OnlineDiskUnit.unit}}`;

                                  },



                              }

                          },{

                              value:(OnlineDiskUsedAll-OnlineDiskUsedNow),

                              itemStyle:{

                                  normal:{

                                      color: 'transparent',

                                  }

                              }

                          }]

                      },

                      {

                          type:'pie',

                          id:"第四个图的圆形部分",

                          name:4,

                          hoverAnimation:false,

                          center:[736,72],

                          radius:[0,64],

                          legendHoverLink:false,

                          labelLine:{show:false},

                          label:{

                              show:true,

                              position:'center',

                              rich:{

                                  c:{

                                      color:'#333',

                                      fontSize:14,

                                      padding:[0,0,200,0]

                                  }

                              },

                              formatter:params=>{

                                  return `{c|网盘已用空间}`

                              }

                          },

                          data:[{

                              value:0,

                              itemStyle: {

                                  color:new echarts.graphic.RadialGradient(0.5, 0.5, 1.0, [          // 由中心向四周渐变
                                      {
                                          offset: 0,
                                          color: "#ffffff"
                                      },
                                      {
                                          offset: 1,
                                          color: "#7ecaff"
                                      }
                                  ]),

                                  /*shadowBlur:10,

                                  shadowColor:'#b1ddff',*/

                                  // emphasis:{color: '#eff9ff'}

                              }

                          }]

                      },

                      {

                          type:'pie',

                          id:"第五个图",

                          name:5,

                          hoverAnimation:false,

                          center:[958,72],

                          radius:[70,64],

                          labelLine:{

                              show:false

                          },

                          data:[{

                              value:GroupFileSpaceUsedNow,

                              text:GroupFileSpaceUnit.num,

                              itemStyle:{

                                  normal:{

                                      color: 'rgba(36,151,33,0.5)',

                                      shadowBlur:10,

                                      shadowColor:'#bbd6ca'

                                  }

                              },

                              label:{

                                  show:true,

                                  position:'center',

                                  padding:[10,0,0,0],

                                  rich:{

                                      c:{

                                          color:'#249721',

                                          fontSize:36,

                                          verticalAlign:'middle'

                                      },

                                      d:{

                                          color:'#249721',

                                          fontSize:16,

                                          verticalAlign:'middle'

                                      }

                                  },

                                  formatter:(params)=>{

                                      return `{c|${params.data.text}}{d|${GroupFileSpaceUnit.unit}}`;

                                  }



                              }

                          },{

                              value:(GroupFileSpaceUsedAll-GroupFileSpaceUsedNow),

                              itemStyle:{

                                  normal:{

                                      color: 'transparent',

                                  }

                              }

                          }]

                      },

                      {

                          type:'pie',

                          id:'第五个图的圆形部分',

                          name:5,

                          hoverAnimation:false,

                          center:[958,72],

                          radius:[0,64],

                          legendHoverLink:false,

                          labelLine:{show:false},

                          label:{

                              show:true,

                              position:'center',

                              rich:{

                                  c:{

                                      color:'#333',

                                      fontSize:14,

                                      padding:[0,0,200,0]

                                  }

                              },

                              formatter:params=>{

                                  return `{c|群文件已用空间}`

                              }

                          },

                          data:[{

                              value:0,

                              itemStyle: {

                                  color: new echarts.graphic.RadialGradient(0.5, 0.5, 1.0, [          // 由中心向四周渐变
                                      {
                                          offset: 0,
                                          color: "#ffffff"
                                      },
                                      {
                                          offset: 1,
                                          color: "#9dcf98"
                                      }
                                  ]),

                                  /*shadowBlur:10,

                                  shadowColor:'#c7e6c2',*/

                                  // emphasis:{color: '#f5ffef'}

                              }

                          }]

                      }


                  ],

              };

           dispatch({type:MANAGER_HEADER_STATICS_SETTING_UPDATE,data:Options});

           let token = sessionStorage.getItem('token');

           if (parseInt(UserClass)!==2){

               let host = `http://${window.location.host}/`;

               GetMsgWebServerAddress({dispatch}).then(data=>{

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

               })

           }

       }

    });

    /*getManagerDesk({UserID,dispatch}).then(data=>{

        if (data){

            const { TopVisit,OnlineUsers,SuspiciousLogin,OnlineDiskUsed,GroupFileSpaceUsed,Groups } = data;

            dispatch({type:HeaderActions.HEADER_STATICS_UPDATE,data:{TopVisit,OnlineUsers,SuspiciousLogin,OnlineDiskUsed,GroupFileSpaceUsed}});

            dispatch({type:MODULES_INFO_UPDATE,data:Groups});

            dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            //分割获取的数据
            const OnlineUsersNow = OnlineUsers?OnlineUsers.split('/')[0]:0;

            const OnlineUsersAll = OnlineUsers?OnlineUsers.split('/')[1]:0;

            const TopVisitNow = TopVisit?TopVisit.split('/')[0]:0;

            const TopVisitAll = TopVisit?TopVisit.split('/')[1]:0;

            const OnlineDiskUsedNow = OnlineDiskUsed?OnlineDiskUsed.split('/')[0]:0;

            const OnlineDiskUsedAll = OnlineDiskUsed?OnlineDiskUsed.split('/')[1]:0;

            const GroupFileSpaceUsedNow = GroupFileSpaceUsed?GroupFileSpaceUsed.split('/')[0]:0;

            const GroupFileSpaceUsedAll = GroupFileSpaceUsed?GroupFileSpaceUsed.split('/')[1]:0;

            //测算数值和单位

            const OnlineDiskUnit = diskSize(OnlineDiskUsedNow);

            const GroupFileSpaceUnit = diskSize(GroupFileSpaceUsedNow);

            //修改echarts的配置

            const Options = {

                series:[

                    {

                        type:'pie',

                        id:'第一个图',

                        name:1,

                        hoverAnimation:false,

                        center:[70,72],

                        radius:[70,64],

                        labelLine:{

                            show:false

                        },

                        data:[{

                            value:OnlineUsersNow,

                            itemStyle:{

                                normal:{

                                    color: '#78a4f3',

                                    shadowBlur:10,

                                    shadowColor:'#b7e1ff'

                                }

                            },

                            label:{

                                show:true,

                                position:'center',

                                padding:[10,0,0,0],

                                rich:{

                                    c:{

                                        color:'#0c51ff',

                                        fontSize:36,

                                        verticalAlign:'middle'

                                    },

                                    d:{

                                        color:'#0c51ff',

                                        fontSize:16,

                                        verticalAlign:'middle'

                                    }

                                },

                                formatter:(params)=>{

                                    return `{c|${params.value}}{d|人}`;

                                },



                            }

                        },{

                            value:OnlineUsersAll,

                            itemStyle:{

                                normal:{

                                    color: 'transparent',

                                }

                            }

                        }]

                    },

                    {

                        type:'pie',

                        id:'第一个图的圆形部分',

                        name:1,

                        hoverAnimation:false,

                        center:[70,72],

                        radius:[0,64],

                        legendHoverLink:false,

                        labelLine:{show:false},

                        label:{

                            show:true,

                            position:'center',

                            rich:{

                                c:{

                                    color:'#333',

                                    fontSize:14,

                                    padding:[0,0,200,0]

                                }

                            },

                            formatter:params=>{

                                return `{c|当前在线}`

                            }

                        },

                        data:[{

                            value:1,

                            itemStyle: {

                                color: '#eff9ff',

                                shadowBlur:10,

                                shadowColor:'#c5e1f1',

                                emphasis:{color: '#eff9ff'}

                            }

                        }]

                    },

                    {

                        type:'pie',

                        id:'第二个图',

                        name:2,

                        hoverAnimation:false,

                        center:[292,72],

                        radius:[70,64],

                        labelLine:{

                            show:false

                        },

                        data:[{

                            value:TopVisitNow,

                            itemStyle:{

                                normal:{

                                    color: '#7cb992',

                                    shadowBlur:10,

                                    shadowColor:'#c8ded1'

                                }

                            },

                            label:{

                                show:true,

                                position:'center',

                                padding:[10,0,0,0],

                                rich:{

                                    c:{

                                        color:'#249721',

                                        fontSize:36,

                                        verticalAlign:'middle'

                                    },

                                    d:{

                                        color:'#249721',

                                        fontSize:16,

                                        verticalAlign:'middle'

                                    }

                                },

                                formatter:(params)=>{

                                    return `{c|${params.value}}{d|人}`;

                                },



                            }

                        },{

                            value:TopVisitAll,

                            itemStyle:{

                                normal:{

                                    color: 'transparent',

                                }

                            }

                        }]

                    },

                    {

                        type:'pie',

                        id:'第二个图的圆形部分',

                        name:2,

                        hoverAnimation:false,

                        center:[292,72],

                        radius:[0,64],

                        legendHoverLink:false,

                        labelLine:{show:false},

                        label:{

                            show:true,

                            position:'center',

                            rich:{

                                c:{

                                    color:'#333',

                                    padding:[0,0,200,0],

                                    fontSize:14

                                },
                                d:{

                                    color:'#999',

                                    padding:[0,0,200,0],

                                    fontSize:14

                                }

                            },

                            formatter:params=>{

                                return `{c|访问峰值}{d|(24小时内)}`

                            }

                        },

                        data:[{

                            value:0,

                            itemStyle: {

                                color: '#f5ffef',

                                shadowBlur:10,

                                shadowColor:'#cedce8',

                                emphasis:{color: '#f5ffef'}

                            }

                        }]

                    },

                    {

                        type:'pie',

                        id:"第三个图",

                        name:3,

                        hoverAnimation:false,

                        center:[514,72],

                        radius:[70,64],

                        labelLine:{

                            show:false

                        },

                        data:[{

                            value:1,

                            text:SuspiciousLogin?SuspiciousLogin:0,

                            itemStyle:{

                                normal:{

                                    color: '#cf9583',

                                    shadowBlur:10,

                                    shadowColor:'#dee0e4'

                                }

                            },

                            label:{

                                show:true,

                                position:'center',

                                padding:[10,0,0,0],

                                rich:{

                                    c:{

                                        color:'#e96a39',

                                        fontSize:36,

                                        verticalAlign:'middle'

                                    },

                                    d:{

                                        color:'#e96a39',

                                        fontSize:16,

                                        verticalAlign:'middle'

                                    }

                                },

                                formatter:(params)=>{

                                    return `{c|${params.data.text}}{d|条}`;

                                }

                            }

                        },{

                            value:0,

                            itemStyle:{

                                normal:{

                                    color: 'transparent',

                                }

                            }

                        }]

                    },

                    {

                        type:'pie',

                        id:'第三个图的圆形部分',

                        name:3,

                        hoverAnimation:false,

                        center:[514,72],

                        radius:[0,64],

                        legendHoverLink:false,

                        labelLine:{show:false},

                        label:{

                            show:true,

                            position:'center',

                            rich:{

                                c:{

                                    color:'#333',

                                    fontSize:14,

                                    padding:[0,0,200,0]

                                }

                            },

                            formatter:params=>{

                                return `{c|可疑登录}`

                            }

                        },

                        data:[{

                            value:0,

                            itemStyle: {

                                color: '#fff6ef',

                                shadowBlur:10,

                                shadowColor:'#f8b599',

                                emphasis:{color: '#fff6ef'}

                            }

                        }]

                    },

                    {

                        type:'pie',

                        id:"第四个图",

                        name:4,

                        hoverAnimation:false,

                        center:[736,72],

                        radius:[70,64],

                        labelLine:{

                            show:false

                        },

                        data:[{

                            value:OnlineDiskUsedNow,

                            text:OnlineDiskUnit.num,

                            itemStyle:{

                                normal:{

                                    color: '#1662fe',

                                    shadowBlur:10,

                                    shadowColor:'#1b67fd'

                                }

                            },

                            label:{

                                show:true,

                                position:'center',

                                padding:[10,0,0,0],

                                rich:{

                                    c:{

                                        color:'#0c51ff',

                                        fontSize:36,

                                        verticalAlign:'middle'

                                    },

                                    d:{

                                        color:'#0c51ff',

                                        fontSize:16,

                                        verticalAlign:'middle'

                                    }

                                },

                                formatter:(params)=>{

                                    return `{c|${params.data.text}}{d|${OnlineDiskUnit.unit}}`;

                                },



                            }

                        },{

                            value:OnlineDiskUsedAll,

                            itemStyle:{

                                normal:{

                                    color: 'transparent',

                                }

                            }

                        }]

                    },

                    {

                        type:'pie',

                        id:"第四个图的圆形部分",

                        name:4,

                        hoverAnimation:false,

                        center:[736,72],

                        radius:[0,64],

                        legendHoverLink:false,

                        labelLine:{show:false},

                        label:{

                            show:true,

                            position:'center',

                            rich:{

                                c:{

                                    color:'#333',

                                    fontSize:14,

                                    padding:[0,0,200,0]

                                }

                            },

                            formatter:params=>{

                                return `{c|网盘已用空间}`

                            }

                        },

                        data:[{

                            value:0,

                            itemStyle: {

                                color: '#eff9ff',

                                shadowBlur:10,

                                shadowColor:'#b1ddff',

                                emphasis:{color: '#eff9ff'}

                            }

                        }]

                    },

                    {

                        type:'pie',

                        id:"第五个图",

                        name:5,

                        hoverAnimation:false,

                        center:[958,72],

                        radius:[70,64],

                        labelLine:{

                            show:false

                        },

                        data:[{

                            value:GroupFileSpaceUsedNow,

                            text:GroupFileSpaceUnit.num,

                            itemStyle:{

                                normal:{

                                    color: '#79b591',

                                    shadowBlur:10,

                                    shadowColor:'#bbd6ca'

                                }

                            },

                            label:{

                                show:true,

                                position:'center',

                                padding:[10,0,0,0],

                                rich:{

                                    c:{

                                        color:'#249721',

                                        fontSize:36,

                                        verticalAlign:'middle'

                                    },

                                    d:{

                                        color:'#249721',

                                        fontSize:16,

                                        verticalAlign:'middle'

                                    }

                                },

                                formatter:(params)=>{

                                    return `{c|${params.data.text}}{d|${GroupFileSpaceUnit.unit}}`;

                                }



                            }

                        },{

                            value:GroupFileSpaceUsedAll,

                            itemStyle:{

                                normal:{

                                    color: 'transparent',

                                }

                            }

                        }]

                    },

                    {

                        type:'pie',

                        id:'第五个图的圆形部分',

                        name:5,

                        hoverAnimation:false,

                        center:[958,72],

                        radius:[0,64],

                        legendHoverLink:false,

                        labelLine:{show:false},

                        label:{

                            show:true,

                            position:'center',

                            rich:{

                                c:{

                                    color:'#333',

                                    fontSize:14,

                                    padding:[0,0,200,0]

                                }

                            },

                            formatter:params=>{

                                return `{c|群文件已用空间}`

                            }

                        },

                        data:[{

                            value:0,

                            itemStyle: {

                                color: '#f5ffef',

                                shadowBlur:10,

                                shadowColor:'#c7e6c2',

                                emphasis:{color: '#f5ffef'}

                            }

                        }]

                    }


                ],



            };

            dispatch({type:MANAGER_HEADER_STATICS_SETTING_UPDATE,data:Options});

            let token = sessionStorage.getItem('token');

            let host = `http://${window.location.host}/`;

            GetMsgWebServerAddress({dispatch}).then(data=>{

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

            })



        }

    });*/

  }

};



//容量大小换算

const diskSize = (num) => {

    num = parseInt(num);

    if (num === 0) return { num:0,unit:"B" };

    var k = 1024; //设定基础容量大小

    var sizeStr = ['B','K','M','G','T','P','E','Z','Y']; //容量单位

    var i = 0; //单位下标和次幂

    for(var l=0;l<8;l++){   //因为只有8个单位所以循环八次

        if(num / Math.pow(k, l) < 1){ //判断传入数值 除以 基础大小的次幂 是否小于1，这里小于1 就代表已经当前下标的单位已经不合适了所以跳出循环

            break; //小于1跳出循环

        }

        i = l; //不小于1的话这个单位就合适或者还要大于这个单位 接着循环

    }
    // 例： 900 / Math.pow(1024, 0)  1024的0 次幂 是1 所以只要输入的不小于1 这个最小单位就成立了；
    //     900 / Math.pow(1024, 1)  1024的1次幂 是1024  900/1024 < 1 所以跳出循环 下边的 i = l；就不会执行  所以 i = 0； sizeStr[0] = 'B';
    //     以此类推 直到循环结束 或 条件成立
    return {num:toDecimal1NoZero(num/Math.pow(k,i)),unit:sizeStr[i]}  //循环结束 或 条件成立 返回字符

};

//保留1位小数
const toDecimal1NoZero = (x) => {

    let f = Math.round(x * 10)/10;

    let str = f.toString();

    return str;

};


const getManagerDesk = async ({UserID,dispatch}) => {

    let res = await Method.getGetData(`/SubjectInfoMgr/DeskTop/Admin/GetDeskTop?UserID=${UserID}`,2,CONFIG.DeskTopProxy);

    if (res.StatusCode === 200){

        return res.Data;

    }else{

        //window.location.href='/error.aspx';

        alert(res.Msg);

    }

};


const GetMsgWebServerAddress = async ({dispatch}) => {

    const res = await Method.getGetData('BaseApi/Global/GetSubSystemsMainServerBySubjectID?appid=000&access_token=4d39af1bff534514e24948568b750f6c&sysIDs=200&subjectID=',1);

    if (res.StatusCode===200){

        return res.Data[0];

    }else{

        dispatch(AppAlertActions.alertError({title:res.Msg?res.Msg:'消息获取失败！'}));

    }

};


export default {

    MODULES_INFO_UPDATE,

    MANAGER_HEADER_STATICS_SETTING_UPDATE,

    PageInit

}