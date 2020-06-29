import ApiAction from '../action/Api'


const GET_WEBSITELINK_FROM_DIFFERENT_PREIOD = "GET_WEBSITELINK_FROM_DIFFERENT_PREIOD"//从不同学段获取网站信息
const REFRESH_WEBSITELINK_RESOURCE = "REFRESH_WEBSITELINK_RESOURCE"//更新网站资源链接
const GET_PEROIDLIST_INFO = "GET_PEROIDLIST_INFO" //获取学段信息
const GET_RESOURCE_LINK_INFO = "GET_RESOURCE_LINK_INFO"//资源库链接信息
const REFRESH_RESOURCELINK_INFO = "REFRESH_RESOURCELINK_INFO"//更新资源库链接
const GET_MYRESOURCE_INFO = "GET_MYRESOURCE_INFO"//获取我的资源库链接信息
const INIT_LOADING_HIDE = "INIT_LOADING_HIDE"//默认进入页面时候的加载中效果
const PERIOD_WEBLISTLINK_LOADING = "PERIOD_WEBLISTLINK_LOADING"//切换时候学段时候的加载中效果
const colorList = ["red", "green", "blue", "pink", "purple", "qing"];//网站资源的各种颜色的背景
const GETCOURSEID_FROM_COOKIE = "GETCOURSEID_FROM_COOKIE"//在cookie中获取存放在学科ID参数
const colorIndex = colorList.length - 1;
const RESOURCE_LOADING = "RESOURCE_LOADING",





    /* 获取网站资源链接
       @param1  默认获取的是P1（小学学段）
       @param2  学科ID
    */

    getLinkData = (Period = "P1", SubjectId) => {
        // let url = `/SubjectResMgr/LancooBrowser/GetPeriodList?Period=${Period}`
        let url = `/SubjectResMgr/LancooBrowser/WebsitesList?Period=${Period}&SubjectId=${SubjectId}`
        console.log(SubjectId)
        return dispatch => {
            dispatch({
                type: PERIOD_WEBLISTLINK_LOADING,
                data: true
            })
            ApiAction.getMethod(url).then(json => {
                let webLinkList = json.Data
                webLinkList = webLinkList.map(item => {
                    return {
                        ...item,
                        List: item.List.map(i => {
                            let ranIndex = Math.floor(Math.random() * (colorIndex + 1));
                            return {
                                ...i,
                                word: "",//初始化的时候给每个链接对象添加一个Word变量，用来存储网站名称的第一个字
                                imgShow: "0",//初始化默认图标的状态（加载中z）
                                backgroundColor: colorList[ranIndex]//初始化数据的时候给图片添加一个背景图
                            }
                        })
                    }

                })
                console.log(webLinkList)

                dispatch({
                    type: GET_WEBSITELINK_FROM_DIFFERENT_PREIOD,
                    data: webLinkList
                })
                //初始化整个界面时候的Loading
                dispatch({
                    type: INIT_LOADING_HIDE

                })
                //年纪列表对应区的Loading
                dispatch({
                    type: PERIOD_WEBLISTLINK_LOADING,
                    data: false
                })
            })
        }
    }

/* 获取年级（学段列表）
    @parameter1  学科ID，根据所传的学科向后台进行请求
*/
const getPeriodList = (SubjectId) => {
    let url = `/SubjectResMgr/LancooBrowser/GetPeriodList`;
    return dispatch => {
        ApiAction.getMethod(url).then(json => {
            if (json.StatusCode === 200) {
                let periodList = json.Data
                console.log("接收成功");
                dispatch({
                    type: GET_PEROIDLIST_INFO,
                    data: periodList
                });
                //根据学科ID获取网站资源信息

                dispatch(getLinkData(periodList[0].PeriodId, SubjectId));

            }
        })


    }
}



//获取资源库列表
const getResLinkList = () => {
    return dispatch => {
        dispatch({
            type: RESOURCE_LOADING,
            data: true
        })
        const url = `/SubjectResMgr/LancooBrowser/GetResLibList`
        ApiAction.getMethod(url).then(json => {

            if (json.StatusCode === 200) {
                let resLinkList = json.Data.map(item => {
                    let ranIndex = Math.floor(Math.random() * (colorIndex + 1));
                    return {
                        ...item,
                        word: "",
                        backgroundColor: colorList[ranIndex]//给图片添加一个背景颜色

                    }

                })
                dispatch({
                    type: GET_RESOURCE_LINK_INFO,
                    data: resLinkList
                })

                dispatch({
                    type: RESOURCE_LOADING,
                    data: false
                })
            }

            else {
                console.log(json.Msg)
            }
        })
    }
}

//获取我的资料库列表
const getMyResLibList = () => {
    return dispatch => {

        dispatch({
            type: RESOURCE_LOADING,
            data: true
        })
        const url = `/SubjectResMgr/LancooBrowser/GetMyResLibList`
        ApiAction.getMethod(url).then(json => {
            if (json.StatusCode === 200) {
                let myResLibList = json.Data
                dispatch({
                    type: GET_MYRESOURCE_INFO,
                    data: myResLibList
                })
                dispatch({
                    type: RESOURCE_LOADING,
                    data: false
                })
            }
        });
    }


}




export default {
    GET_WEBSITELINK_FROM_DIFFERENT_PREIOD,
    getLinkData,
    REFRESH_WEBSITELINK_RESOURCE,

    GET_PEROIDLIST_INFO,
    getPeriodList,

    GET_RESOURCE_LINK_INFO,
    getResLinkList,
    REFRESH_RESOURCELINK_INFO,

    GET_MYRESOURCE_INFO,
    getMyResLibList,

    INIT_LOADING_HIDE,
    PERIOD_WEBLISTLINK_LOADING,
    RESOURCE_LOADING,

    GETCOURSEID_FROM_COOKIE,

}