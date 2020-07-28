const LEFT_MENU_LIST_UPDATE = 'LEFT_MENU_LIST_UPDATE';

const LEFT_MENU_SHOW = 'LEFT_MENU_SHOW';

const LEFT_MENU_HIDE = 'LEFT_MENU_HIDE';


//左侧菜单更新
export const leftMenuListUpdate = (menu) =>{

    return {type:LEFT_MENU_LIST_UPDATE,data:menu};

};
//左侧菜单出现
export const leftMemuShow = () =>{

    return {type:LEFT_MENU_SHOW};

};
//左侧菜单消失
export const leftMemuHide = () =>{

    return {type:LEFT_MENU_HIDE};

};


const defaultState = {

    show:false,

    menuList:[

        {

            link:'/statics/grade',

            name:'年级学科教学班统计',

            id:'subject',

            menu:'menu45'

        },

        {

            link:'/statics/subject',

            name:'学科教师教学班统计',

            id:'course',

            menu:'menu46'

        },

        /*{

            link:'/statics/teacher',

            name:'教师教学班统计',

            id:'teacher',

            menu:'menu20'

        }*/

    ]

};

const leftMenu = (state=defaultState,actions) =>{

  switch (actions.type) {

      case LEFT_MENU_LIST_UPDATE:

          return {...state,memuList:actions.data};

      case LEFT_MENU_SHOW:

          return {...state,show:true};

      case LEFT_MENU_HIDE:

          return {...state,show:false};

      default:

          return state;

  }

};

export default leftMenu;