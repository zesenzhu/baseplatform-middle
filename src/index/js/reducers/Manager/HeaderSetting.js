import HeaderActions from '../../actions/Manager/HeaderActions';

import MPActions from '../../actions/Manager/ManagerPageActions';

const HeaderSetting = (state={

    MenuShow:false,

    StaticsInfo:"",

    Options:{

       /* series:[

            {

            type:'pie',

            name:"第一个图",

            hoverAnimation:false,

            center:[70,72],

            radius:[70,64],

            labelLine:{

                show:false

            },

            data:[{

                value:0,

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

                name:'第一个图的圆形部分',

                hoverAnimation:false,

                center:[70,72],

                radius:[0,64],

                legendHoverLink:false,

                labelLine:{show:false},

                data:[{

                    value:1,

                    itemStyle: {

                        color: '#eff9ff',

                        shadowBlur:10,

                        shadowColor:'#c5e1f1',

                        emphasis:{color: '#eff9ff'}

                    },

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

                    }

                }]

            },

            {

                type:'pie',

                name:"第二个图",

                hoverAnimation:false,

                center:[292,72],

                radius:[70,64],

                labelLine:{

                    show:false

                },

                data:[{

                    value:0,

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

                name:'第二个图的圆形部分',

                hoverAnimation:false,

                center:[292,72],

                radius:[0,64],

                legendHoverLink:false,

                labelLine:{show:false},

                data:[{

                    value:0,

                    itemStyle: {

                        color: '#f5ffef',

                        shadowBlur:10,

                        shadowColor:'#cedce8',

                        emphasis:{color: '#f5ffef'}

                    },

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

                    }

                }]

            },

            {

                type:'pie',

                name:"第三个图",

                hoverAnimation:false,

                center:[514,72],

                radius:[70,64],

                labelLine:{

                    show:false

                },

                data:[{

                    value:0,

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

                            return `{c|${params.value}}{d|条}`;

                        },



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

                name:'第三个图的圆形部分',

                hoverAnimation:false,

                center:[514,72],

                radius:[0,64],

                legendHoverLink:false,

                labelLine:{show:false},

                data:[{

                    value:0,

                    itemStyle: {

                        color: '#fff6ef',

                        shadowBlur:10,

                        shadowColor:'#f8b599',

                        emphasis:{color: '#fff6ef'}

                    },

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

                    }

                }]

            },

            {

                type:'pie',

                name:"第四个图",

                hoverAnimation:false,

                center:[736,72],

                radius:[70,64],

                labelLine:{

                    show:false

                },

                data:[{

                    value:0,

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

                            return `{c|${params.value}}{d|B}`;

                        },



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

                name:'第四个图的圆形部分',

                hoverAnimation:false,

                center:[736,72],

                radius:[0,64],

                legendHoverLink:false,

                labelLine:{show:false},

                data:[{

                    value:0,

                    itemStyle: {

                        color: '#eff9ff',

                        shadowBlur:10,

                        shadowColor:'#b1ddff',

                        emphasis:{color: '#eff9ff'}

                    },

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

                    }

                }]

            },

            {

                type:'pie',

                name:"第五个图",

                hoverAnimation:false,

                center:[958,72],

                radius:[70,64],

                labelLine:{

                    show:false

                },

                data:[{

                    value:0,

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

                            return `{c|${params.value}}{d|B}`;

                        },



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

                name:'第五个图的圆形部分',

                hoverAnimation:false,

                center:[958,72],

                radius:[0,64],

                legendHoverLink:false,

                labelLine:{show:false},

                data:[{

                    value:0,

                    itemStyle: {

                        color: '#f5ffef',

                        shadowBlur:10,

                        shadowColor:'#c7e6c2',

                        emphasis:{color: '#f5ffef'}

                    },

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

                    }

                }]

            }


        ]*/

    }

},actions) => {

    switch (actions.type) {

        case HeaderActions.HEADER_MENU_TOGGLE:

            return {

                ...state,

                MenuShow:!state.MenuShow

            };

        case HeaderActions.HEADER_MENU_SHOW:

            return {

                ...state,

                MenuShow:true

            };

        case HeaderActions.HEADER_MENU_HIDE:

            return {

                ...state,

                MenuShow:false

            };

        case HeaderActions.HEADER_STATICS_UPDATE:

            return{

                ...state,

                ...actions.data

            };

        case MPActions.MANAGER_HEADER_STATICS_SETTING_UPDATE:

            return {

                ...state,

                Options:actions.data

            };

        default:

            return state;

    }

};

export default HeaderSetting;