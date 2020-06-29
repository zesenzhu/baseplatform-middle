import '../../../sass/tabheader.scss'

import React, { Component } from 'react'
import HomeData from '../../action/HomeData'
import { connect } from 'react-redux';

class Tabheader extends Component {



    /* 监听列表头的点击事件
        @param1 头部选项卡上被点击项的ID
                根据不同的ID渲染对应的内容
    */
    headerChange(id) {
        const { dispatch,SubjectId } = this.props;
        dispatch({
            type: id
        });
        switch (id) {
            //此处注释说明：因为网站资源很多，在IE上渲染速度慢，所以当点击了网站资源这个选项的时候，
            //实际上并没有项如下两个选项一样再次获取接口数据,所以仍然是页面初始化时候的数据
            //因为首页的内容根据每个老师的学科决定，基本上是固定了，为了避免多次点击网站资源选项是由于加载速度的问题
            //导致不友好的交互体验，此处将该代码注释，如果以后有解决办法了，可以将此开启
            // case "website":  
            //     dispatch(HomeData.getPeriodList(SubjectId))
            // break;    
            case "resourceBase":
                    dispatch(HomeData.getResLinkList());
            break;
            case "myResourceBase"  :
                    dispatch(HomeData.getMyResLibList());
                   break;
            default:
                dispatch(HomeData.getResLinkList());
        }

    }


    render() {

        const { tabActive } = this.props;

        const LiList = [
            { id: "website", name: "网站" },
            { id: "resourceBase", name: "资源库" },
            { id: "myResourceBase", name: "我的资料库" },
        ]



        let result = LiList.map((item, key) => {
            return <li key={key} onClick={(e) => this.headerChange(item.id)}>
                <a className={tabActive === item.id ? "active" : ""}>
                    <div className={`tab-icon ${item.id}`}>{item.name}</div>
                </a>

            </li>;
        })

        return (
            <div className="nav">
                <div className="nav-in">
                    <ul>
                        {result}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    const { Toggle,HomeDataUpdate } = state;

    return {

        tabActive: Toggle.tabActive,
        SubjectId:HomeDataUpdate.SubjectId

    }

}

export default connect(mapStateToProps)(Tabheader);