const APP_ALERT_SHOW = 'APP_ALERT_SHOW';

const APP_ALERT_HIDE = 'APP_ALERT_HIDE';


const defaultAlert = {

    type:'btn-warn',

    show:false,

    title:'',

    ok:null,

    cancel:null,

    okTitle:'确定',

    cancelTitle:"取消",

    close:null,

    cancelShow:'y',

    okShow:'y'

};

const appAlert = (state=defaultAlert,actions) => {

  switch (actions.type) {

      case APP_ALERT_SHOW:

          return { ...state,show:true,...actions.data };

      case APP_ALERT_HIDE:

          return { ...state,show:false,...actions.data };

      default:

          return state;

  }

};


export const showErrorAlert = ({title,ok,okTitle,cancelTitle,close,okShow,cancelShow,cancel}) => {

    return dispatch=>{

         dispatch({ type:APP_ALERT_SHOW,data:{

                type:'btn-error',

                 title,

                 ok:ok?ok:hideAlert(dispatch),

                 okTitle:okTitle?okTitle:"确定",

                 cancelTitle:cancelTitle?cancelTitle:"取消",

                cancel:cancel?cancel:hideAlert(dispatch),

                 cancelShow,

                 okShow,

                 close:close?close:hideAlert(dispatch)
         }});

    }

};

export const showWarnAlert = ({title,ok,cancel,okTitle,close,cancelTitle,okShow,cancelShow,dispatch}) => {

    return dispatch=>{

        dispatch({ type:APP_ALERT_SHOW,data:{

                type:'btn-warn',

                title,

                ok:ok?ok:hideAlert(dispatch),

                okTitle:okTitle?okTitle:'确定',

                cancelTitle:cancelTitle?cancelTitle:'取消',

                cancel:cancel?cancel:hideAlert(dispatch),

                cancelShow,

                okShow,

                close:close?close:hideAlert(dispatch)
            }});

    }

};


export const hideAlert = (dispatch) => {

    return ()=>{ dispatch({type:APP_ALERT_HIDE});};

};


export default appAlert;