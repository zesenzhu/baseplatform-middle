import CollectorAction from '../action/CollectorAction'




const CollectDataChange = (state = {
    folderResInfo: {
        List: []
    },//目录下所有资料的信息
    collectionResult: [],//存储右侧排行榜和最近收藏共用的数组
    typeList: [], //存储资料的来源列表
    currentPath: [{ "folderId": "", "folderName": "资料收藏夹" }],//默认用户所有目录的默认路径路径
    folderInfo:[],  //存储收藏夹整体目录结构列表
    rightSelect:"recent"//右侧内容去默认渲染最近收藏 


}, action) => {
    switch (action.type) {
        case CollectorAction.GET_FOLDER_RESCOURCE_INFO:
            return {
                ...state,
                // ...folderResInfo, 
                // List:action.data.List,
                folderResInfo: action.data
            }
        case CollectorAction.REFRESH_FOLDERRES_INFO:
            return {
                ...state,
                folderResInfo: action.data
            }
        case CollectorAction.GET_RECENT_COLLECTOR_INFO:
            return {
                ...state,
                collectionResult: action.data
            }
        case CollectorAction.GET_COLLECTOR_RANK_INFO:
            return {
                ...state,
                collectionResult: action.data
            }
        case CollectorAction.GET_COLLECTOR_INFO_FROM_TYPE:
            return {
                ...state,
                typeList: action.data
            }
        case CollectorAction.REFRESH_COLLECT_RESULT:
            return {
                ...state,
                collectionResult: action.data
            }
        case CollectorAction.UPDATE_CURRENT_PATH:
            return {
                ...state,
                currentPath: action.data
            }
        case CollectorAction.GET_FOLDER_INFO:
            return {
                ...state,
                folderInfo: action.data
            }
        case CollectorAction.STORE_RIGHT_CONTENT:
            return{
                ...state,
                rightSelect:action.data
            }    

        default:
            return state;
    }
};
export default CollectDataChange