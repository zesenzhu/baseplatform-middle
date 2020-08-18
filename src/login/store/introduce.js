const defaultIntroduce = {

    dark_blue:{

        active:0,

            list:[

                { title:'个性化应用',describe:'可定制个性化的功能和资源，构建专属的应用空间' },

                { title:'一体化平台',describe:'统一的操作习惯，互通的应用数据，一站式学习和办公' },

                { title:'海量学科资源',describe:'丰富的网络资源，多样的应用模式，备课和学习更高效' },

                { title:'多终端支持',describe:'适用于PC、手机和平板，不同场景随心使用' }

            ]

    },

    dark_tech:{

        active:0,

        list:[

            { title:'一体化备课',describe:'——教学方案的专业化、一体化备课' },

            { title:'智能化编辑教材',describe:'——人工智能、高效、多媒体教材' },

            { title:'学生自主学习',describe:'——个性化、自由式学习' },

            { title:'AI考试',describe:'——让考试更加智能轻松' }

        ]

    },

    ai_school:{

        active:0,

        list:[

            { title:'个性化校园办公',describe:'可定制个性化应用,为老师/管理员提供专属的个人办公平台'},

            { title:'节能提效',describe:'物联网管控,节能降耗提效,营造安全、绿色、高效、智能的校园环境' },

            { title:'教学管理多端应用',describe:'全面覆盖教、学、管理各类信息化平台,同时适用于PC端、手机App、小程序' },

            { title:'一体化设计',describe:'统一认证,数据互通,智能联动的校园信息化平台'}

        ]

    },

    ai_exam:{

        active:0,

        list:[

            { title:'节能提效',},

            { title:'教学管理多端应用'},

            { title:'一体化设计'}

        ]

    },

    ai_practice:{

        active:0,

        list:[

            { title:'完整教育生态闭环',describe:"满足“管”“备”“教”“训”“评”"},

            { title:'专业实训实验',describe:'教学实践一体化'},

            { title:'详细学情分析',describe:'全面掌握学习动态'},

            {title:'完善课程体系',describe:'轻松实现“0”备课'}

        ]

    }

};

const INTRODUCE_CHANGE = 'INTRODUCE_CHANGE';


export const introduceChange = ({skin,activeIndex}) =>{

    return { type:'INTRODUCE_CHANGE',data:{skin,activeIndex} };

};

const introduce = (state=defaultIntroduce,actions)=>{

    switch (actions.type) {

        case 'INTRODUCE_CHANGE':

            switch (actions.data.skin) {

                case 'dark_blue':

                    return { ...state,dark_blue:{ ...state.dark_blue,active:actions.data.activeIndex } };

                case 'dark_tech':

                    return { ...state,dark_tech:{ ...state.dark_tech,active:actions.data.activeIndex } };

                case 'ai_school':

                    return { ...state,ai_school:{ ...state.ai_school,active:actions.data.activeIndex } };

                case 'ai_exam':

                    return { ...state,ai_exam:{ ...state.ai_exam,active:actions.data.activeIndex } };

                case 'ai_practice':

                    return { ...state,ai_practice:{ ...state.ai_practice,active:actions.data.activeIndex } };

                default:

                    return state;

            }

        default:

            return state;

    }

};

export default introduce;