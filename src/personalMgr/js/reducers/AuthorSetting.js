import ASActions from '../actions/AuthorSettingActions';

const AuthorSetting  = (state={

    LoadingShow:true,

    AuthorList:[],

    BindModal:{

        Show:false,

        IframeLoading:true,

        Name:'',

        Url:''

    }

},actions) => {

    switch (actions.type) {

        case ASActions.AUTHOR_SETTING_PAGE_INIT:

            return {

                ...state,

                AuthorList:actions.data

            };

        case ASActions.AUTHOR_SETTING_LOADING_SHOW:

            return { ...state,LoadingShow:true };

        case ASActions.AUTHOR_SETTING_LOADING_HIDE:

            return { ...state,LoadingShow:false };

        case ASActions.AUTHOR_SETTING_IFRAME_LOADING_SHOW:

            return { ...state,BindModal:{...state.BindModal,IframeLoading:true}};

        case ASActions.AUTHOR_SETTING_IFRAME_LOADING_HIDE:

            return { ...state,BindModal:{...state.BindModal,IframeLoading:false}};

        case ASActions.AUTHOR_SETTING_BIND_MODAL_SHOW:

            return {

                ...state,

                BindModal:{

                    ...state.BindModal,

                    Show:true,

                    Name:actions.data.Name,

                    Url:actions.data.Url

                }

            };

        case ASActions.AUTHOR_SETTING_BIND_MODAL_HIDE:

            return {

                ...state,

                BindModal:{

                    ...state.BindModal,

                    Show:false

                }

            };

        default:

            return state;

    }

};

export default AuthorSetting;