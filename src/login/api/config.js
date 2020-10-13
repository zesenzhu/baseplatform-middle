
let config = {};

if (process.env.NODE_ENV === 'development'){

    config = {

        // GetBaseInfo:'http://192.168.2.202:7300/mock/5d772752ed0ccd1564c8df0d/login',

        GetBaseInfo:'http://192.168.129.1:30103',

        Login:'http://192.168.129.1:30103',

        IntroduceModalHtml:'http://192.168.2.207:10108/UserHelp/teacherhelp.html',

        SystemsMainServer:'http://192.168.2.207:10108/BaseApi/Global/'

    }

}


if (process.env.NODE_ENV === 'production'){

    config = {

        GetBaseInfo:'',

        Login:'',

        IntroduceModalHtml:'/UserHelp/teacherhelp.html',

        SystemsMainServer:'/BaseApi/Global/'

    }

}

export default config;