import HomeData from '../action/HomeData'


const HomeDataUpdate = (state = {
    WebsiteResLink: [],
    PeriodList: [],
    ResLinkList: [],
    MyResLibList: [],
    defaultLoading: true,
    periodWebsiteLoading: true,
    resourceLoading: true,
    SubjectId:""


}, action) => {
    switch (action.type) {
        case HomeData.GET_WEBSITELINK_FROM_DIFFERENT_PREIOD:

            return {
                ...state,
                WebsiteResLink: action.data
            }
        case HomeData.REFRESH_WEBSITELINK_RESOURCE:
            return {
                ...state,
                WebsiteResLink: action.data
            }
        case HomeData.GET_PEROIDLIST_INFO:
            return {
                ...state,
                PeriodList: action.data

            }
        case HomeData.GET_RESOURCE_LINK_INFO:
            return {
                ...state,
                ResLinkList: action.data
            }
        case HomeData.REFRESH_RESOURCELINK_INFO:
            return {
                ...state,
                ResLinkList: action.data
            }
        case HomeData.GET_MYRESOURCE_INFO:
            return {
                ...state,
                MyResLibList: action.data
            }
        case HomeData.INIT_LOADING_HIDE:
            return {
                ...state,
                defaultLoading: false
            }
        case HomeData.PERIOD_WEBLISTLINK_LOADING:
            return {
                ...state,
                periodWebsiteLoading: action.data
            }
        case HomeData.RESOURCE_LOADING:
            return{
                ...state,
                resourceLoading:action.data
            }
        case HomeData.GETCOURSEID_FROM_COOKIE:
            return{
                ...state,
                SubjectId:action.data
            }    

        default:
            return state;
    }
};
export default HomeDataUpdate;