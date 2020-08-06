
let config = {};

if (process.env.NODE_ENV === 'development'){

    config = {

        //GetBaseInfo:'http://192.168.2.202:7300/mock/5d772752ed0ccd1564c8df0d/login',

        BaseProxy:'http://192.168.129.1:30103'

    }

}


if (process.env.NODE_ENV === 'production'){

    config = {

        BaseProxy:''

    }

}

export default config;