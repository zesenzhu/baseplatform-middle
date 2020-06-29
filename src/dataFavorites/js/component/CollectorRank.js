import React, { Component } from 'react'
import '../../sass/collectorRank.scss'
import { connect } from 'react-redux';
import CollectorAction from '../action/CollectorAction'
import AppAlertAction from '../action/AppAlertAction'
import { Loading,Empty } from '../../../common/index'
import ApiAction from '../action/Api';
class CollectorRank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "recent",

        };
    }

    /* 监听最近收藏与收藏排行榜的切换事件
        @param1 头部表的点击项(recent)、(rank)
    */
    clickChange = (clickParam) => {
        const { dispatch } = this.props
        this.setState({
            selected: clickParam
        })
        if (clickParam === "rank") {
            dispatch(CollectorAction.getCollectionRankList())
            dispatch({
                type: CollectorAction.STORE_RIGHT_CONTENT,
                data: "rank"
            })
        }
        else {
            dispatch(CollectorAction.getRecentCollection())
            dispatch({
                type: CollectorAction.STORE_RIGHT_CONTENT,
                data: "recent"
            })
        }
    }
    /* 收藏项的点击事件
    @param1 收藏项点击后跳转的相对地址（网络地址） */
    skipTolink = (address) => {
        window.open(address, 'top');
    }


    /*  监听从排行榜收藏或者取消收藏切换提示事件
        @param1 资源Id(排行榜上收藏项Id)
        @param2 当前收藏项的收藏状态（true/false）
        @param3 收藏说明（非必选）
     */
    rankCollectAction = (ResId, Iscollected, resRemark = "") => {
        let { dispatch, collectionResult, currentPath } = this.props
        let currentFolderId = currentPath[currentPath.length - 1].folderId;
        //如果iscollected为true表示当前状态是已收藏,需要取消收藏,否则相反
        if (Iscollected === true) {

            dispatch(AppAlertAction.alertQuery({
                title: "是否取消该收藏",
                ok: () => { return this.cancelCollect.bind(this, ResId, currentFolderId) },
            }))
        } else {

            //当前状态为false需要收藏该资料
            const url = `/SysMgr/Favorite/DoCollectFromRankList`;
            ApiAction.postMethod(url, { "resInfoId": ResId, "resRemark": resRemark, "folderId": currentFolderId }).then(data => {
                if (data === 0) {
                    console.log("success")
                    this.upDateCollector(ResId)//调用取消收藏的方法
                    dispatch(AppAlertAction.alertSuccess({ title: "收藏成功!" }))
                    dispatch(CollectorAction.getFolderResInfo({ folderID: currentFolderId }))//刷新右侧内容区
                    dispatch(CollectorAction.getCollectionRankList());//刷新排行版的内容

                }
                else {
                    dispatch(AppAlertAction.alertError({ title: "收藏失败" }))
                }
            })
        }



    }
    /* 取消收藏事件
        @param1 资源ID(收藏项的ID)
        @param2 当前用户所在目录的目录Id
    */
    cancelCollect = (ResId, currentFolderId) => {
        let url = `/SysMgr/Favorite/CancelCollectRes`;
        const { dispatch } = this.props
        ApiAction.postMethod(url, { resIds: ResId }).then(data => {

            if (data === 0) {
                console.log(data)
                dispatch(AppAlertAction.alertSuccess({ title: "已取消收藏" }))
                this.upDateCollector(ResId)
                dispatch(CollectorAction.getFolderResInfo({ folderID: currentFolderId }))
                dispatch(CollectorAction.getCollectionRankList());

            }
        })

    }

    /* 更新收藏排行榜上被收藏项的图标状态
        @param1 资源ID
    */
    upDateCollector = (ResId) => {
        let { dispatch, collectionResult } = this.props
        let newResult = collectionResult.map(item => {
            if (item.ID === ResId) {
                return {
                    ...item,
                    isClollected: !item.isClollected
                }

            }
            else {
                return item;
            }

        })

        dispatch({
            type: CollectorAction.REFRESH_COLLECT_RESULT,
            data: newResult
        })
    }




    render() {
        const { selected } = this.state
        const { collectionResult, rankLoading } = this.props
        let tipInfo = "";
        let exeit = "0";
        let collectorRes=""
        //根据点击项结果渲染右侧列表内容区信息
        if (collectionResult) {
            if (collectionResult.length === 0) {
                // console.log("不存在")
                tipInfo = <Empty type="3" className="Empty" title={"最近暂无收藏"} />
                exeit = "1"
            }
             collectorRes = collectionResult.map((item, key) => {
                return (<li className={`clearfix ${selected === "recent" ? 'recent' : 'rank'}`}> <div className="ranklogo">
                    {key < 9 ? `0${key + 1}` : `${key + 1}`}
                </div>
                    <div className="collector-detail"
                        onClick={() => this.skipTolink(item.ResLinkForWeb)}
                    >
                        <span className="top-wrap" title={item.Name}>{item.Name}</span>
                        <span className="bottom-wrap" >{selected === "recent" ? `${item.CreateTime}` : `${item.TypeName}`}  &nbsp;|&nbsp;
                    {selected === "recent" ? `${item.TypeName}` : `${item.CollectionCount}收藏`}</span>
                    </div>{
                        selected === "rank" ? <div className={`collect-logo ${item.isClollected === true ? 'checked' : ''}`} onClick={() => this.rankCollectAction(item.ID, item.isClollected)}></div> : ""
                    }

                    <div className="splitline"></div>
                </li>);

            })
        }

        return (
            <div className="collector-integration">
                <ul className="collector-tabChange clearfix">
                    <li className={selected === "recent" ? 'selected' : ""}
                        onClick={() => this.clickChange("recent")}>最近收藏</li>
                    <li className={selected === "rank" ? 'selected' : ""}
                        onClick={() => this.clickChange("rank")}>收藏排行榜</li>
                </ul>
                <ul className="collector-content">
                    {/* <li> <div className="ranklogo recent">01</div>
                        <div className="collector-detail">
                            人类简史:从动物到上帝
                        <span >2019-01-01 12:12  &nbsp;|&nbsp;&nbsp;电子教案</span></div>
                        <div className="splitline"></div>
                    </li> */}
                    <Loading spinning={rankLoading} opacity={false} tip="请稍后...">


                        {collectorRes}
                        {tipInfo}

                    </Loading>

                </ul>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    const { CollectorDataChange, UILoading } = state
    const { collectionResult, currentPath, rightSelect } = CollectorDataChange
    const { rankLoading } = UILoading
    // console.log(currentPath);
    return {
        collectionResult,
        currentPath,
        rankLoading,
        rightSelect
    }
}
export default connect(mapStateToProps)(CollectorRank);