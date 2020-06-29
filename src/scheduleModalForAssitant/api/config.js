
let config = {};

if (process.env.NODE_ENV === 'development'){

    config = {

        proxy:'http://192.168.2.207:10108'

    }

}


if (process.env.NODE_ENV === 'production'){

    config = {

        proxy:''

    }

}

export default config;