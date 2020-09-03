import {removeSlashUrl} from "./utils";

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

        //GetBaseInfo:'http://192.168.2.202:7300/mock/5d772752ed0ccd1564c8df0d/login',

        BaseProxy:'http://192.168.129.3:30103',

        //AreaProxy:'http://192.168.129.1:30103/SysMgr/Setting/Area'

        AreaProxy:'http://192.168.129.3:30103/SysMgr/Setting/Area'


    }

}


if (process.env.NODE_ENV === 'production'){

    config = {

        BaseProxy:RootUrl,

        AreaProxy:removeSlashUrl(RootUrl)+'/SysMgr/Setting/Area'

    }

}

export default config;