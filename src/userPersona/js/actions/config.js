let config = {};

const host = window.location.host;

const pathName = window.location.pathname;

const protocol = window.location.protocol;

let pathFolder = '';

if (pathName.includes('/html/')) {

    pathFolder = pathName.split('/html/')[0];

} else if (pathName.includes('.html')) {

    let strArr = window.location.pathname.split('.html')[0].split('/');

    strArr.pop();

    pathFolder = strArr.join('/');

} else {

    pathFolder = pathName;

}

const RootUrl = protocol+'//'+host + pathFolder;


if (process.env.NODE_ENV === 'development'){

    config = {

        moniProxy:'http://192.168.2.202:7300/mock/5f40ff6044c5b010dca04032/userPersona',

        ceshiProxy:'http://192.168.129.2:30103'

    }

}


if (process.env.NODE_ENV === 'production'){

    config = {

        moniProxy:RootUrl,

        ceshiProxy:''

    }

}




export default config;
