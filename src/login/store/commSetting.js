
const CHANGE_STYLE = 'CHANGE_STYLE';

const CHANGE_COMMON_SETTINGS = 'CHANGE_COMMON_SETTINGS';

const BASE_PLUGINS_CHANGE = 'BASE_PLUGINS_CHANGE';


const defaultSetting = {

    skin:'dark_tech',//深蓝风格的皮肤，总共的风格有:深蓝、黑科技

    topTitleSpread:'between',//顶部title的风格:between：介于界面两端，around：居中1200

    topTitle:{

        dark_blue:'让/学/习/办/公/更/轻/松',

        dark_tech:'让/教/与/学/更/加/智/能/轻/松'

    },

    hasDownLoad:['dark_blue'],

    footer:"",

    OpenSetInfo:[],

    basePlugin:false,

    WebIndexUrl:'',

    WebSvrAddr:''

};





const commSetting = (state = defaultSetting,actions) => {


    switch (actions.type) {

        case CHANGE_STYLE:

            const newSkin = state.skin==='dark_blue'?'dark_tech':'dark_blue';

            return { ...state,skin:newSkin };

        case CHANGE_COMMON_SETTINGS:

            return { ...state,...actions.data };

        case BASE_PLUGINS_CHANGE:

            return { ...state,basePlugin:actions.data};

        default:

            return state;

    }

};

export const changeSkin = () => {

    return { type:'CHANGE_STYLE'};

};

export const changeSetting = (json) =>{

    return { type:CHANGE_COMMON_SETTINGS,data:json };

};

export const changePluginStatus = (status) =>{

    return { type:BASE_PLUGINS_CHANGE,data:status };

};




export default commSetting;