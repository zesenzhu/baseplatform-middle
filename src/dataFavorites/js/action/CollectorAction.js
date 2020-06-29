import ApiAction from './Api'

import UiLoading from '../action/LoadingAction'
const GET_FOLDER_RESCOURCE_INFO = "GET_FOLDER_RESCOURCE_INFO"//获取目录下所有信息
const GET_FOLDER_INFO = "GET_FOLDER_INFO"//获取收藏夹整体目录信息
const REFRESH_FOLDERRES_INFO = "REFRESH_FOLDERRES_INFO"//刷新当前目录信息
const GET_RECENT_COLLECTOR_INFO = "GET_RECENT_COLLECTOR_INFO"//获取最近收藏信息
const GET_COLLECTOR_RANK_INFO = "GET_COLLECTOR_RANK_INFO"//获取搜藏排行榜信息
const GET_COLLECTOR_INFO_FROM_TYPE = "GET_COLLECTOR_INFO_FROM_TYPE"//根据来源获取目录下资料信息
const REFRESH_COLLECT_RESULT = "REFRESH_COLLECT_RESULT"//更新右侧排行表内容区内容//
const UPDATE_CURRENT_PATH = "UPDATE_CURRENT_PATH"//更新当前所在目录
const STORE_RIGHT_CONTENT="STORE_RIGHT_CONTENT"//存储右侧当前被选中显示的内容区



/* 获取目录下所有信息
   @param1 请求接口是所需要的参数 

*/
const getFolderResInfo = (
    { typeId = '',
        folderID = "",
        keyword = "",
        startTime = "",
        endDate = "",
        pageIndex = 1,
        pageSize = 10 }, type = "default"

) => {
    return dispatch => {

        console.log(startTime);
      
        let url = "";
        if (type === "default") {
            url = `/SysMgr/Favorite/GetResInfo?typeId=${typeId}&folderID=${folderID}&keyword=${keyword}&startTime=${startTime}&endDate=${endDate}&pageIndex=${pageIndex}&pageSize=${pageSize}`

        } else {
            url = `/SysMgr/Favorite/GetMobileResInfo?typeId=${typeId}&keyword=${keyword}&startTime=${startTime}&endDate=${endTime}&pageIndex=${pageIndex}&pageSize=${pageSize}`

        }
        // `/SysMgr/Favorite/API/GetResInfo?typeId=""&folderID=""
        ApiAction.getMethod(url).then(json => {
            if (json.StatusCode === 200) {
                let folderResInfo = json.Data

                let newList = folderResInfo.List.map(item => {


                    if (item.IsFolder === true) {
                        return {
                            ...item,
                            fileType: "folder",
                            checked: false

                        }
                    }
                    else {
                        return {

                            ...item,
                            fileType: "single",
                            checked: false

                        }

                    }

                })
                console.log(newList)
                folderResInfo = {
                    ...folderResInfo,
                    List: newList
                }

                dispatch({
                    type: GET_FOLDER_RESCOURCE_INFO,
                    data: folderResInfo
                })
                
            }

            dispatch({
                type: UiLoading.FAV_LOADING_SHOW,
                data: false
            })


        })



    }

}
//获取最近收藏信息
const getRecentCollection = () => {
    return dispatch => {
        dispatch({
            type: UiLoading.RANK_LOADING_SHOW,
            data: true
        })
        let url = `/SysMgr/Favorite/GetRecentCollections`;
        ApiAction.getMethod(url).then(json => {
            if (json.StatusCode === 200) {
                let collectionResult = json.Data
                // collectionResult.unshift({ResultType:"recent"})
                dispatch({
                    type: GET_RECENT_COLLECTOR_INFO,
                    data: collectionResult

                })
                dispatch({
                    type: UiLoading.RANK_LOADING_SHOW,
                    data: false
                })
            }
        })


    }
}
//获取收藏排行榜信息
const getCollectionRankList = () => {
    return dispatch => {
        dispatch({
            type: UiLoading.RANK_LOADING_SHOW,
            data: true
        })
        let url = `/SysMgr/Favorite/GetHotResList`
        ApiAction.getMethod(url).then(json => {
            if (json.StatusCode === 200) {
                let collectionResult = json.Data
                // collectionResult.unshift({ResultType:"ranT"})
                dispatch({
                    type: GET_COLLECTOR_RANK_INFO,
                    data: collectionResult
                })
                dispatch({
                    type: UiLoading.RANK_LOADING_SHOW,
                    data: false
                })
            }
        })
    }
}
//获取来源列表
const getResTypeList = () => {
    return dispatch => {

        let url = '/SysMgr/Favorite/GetTypeList';
        ApiAction.getMethod(url).then(json => {
            if (json.StatusCode === 200) {
                let typeList = json.Data
                dispatch({
                    type: GET_COLLECTOR_INFO_FROM_TYPE,
                    data: typeList
                })

            }
        })
    }
}

//获取收藏夹整体目录信息
const getfolderInfo = () => {
    return dispatch => {
        const url = `/SysMgr/Favorite/GetFolderInfo`
        ApiAction.getMethod(url).then(json => {
            if (json.StatusCode === 200) {
                let folderList = json.Data
                dispatch({
                    type: GET_FOLDER_INFO,
                    data: folderList
                })
            }
        })
    }
}

export default {
    GET_FOLDER_RESCOURCE_INFO,
    getFolderResInfo,
    GET_RECENT_COLLECTOR_INFO,
    getRecentCollection,
    GET_COLLECTOR_RANK_INFO,
    getCollectionRankList,
    GET_COLLECTOR_INFO_FROM_TYPE,
    getResTypeList,
    REFRESH_COLLECT_RESULT,
    UPDATE_CURRENT_PATH,
    REFRESH_FOLDERRES_INFO,
    GET_FOLDER_INFO,
    getfolderInfo,
    STORE_RIGHT_CONTENT




}
