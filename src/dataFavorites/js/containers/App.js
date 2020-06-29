import React, { Component } from "react"
import { connect } from 'react-redux'

import { TokenCheck_Connect } from '../../../common/js/disconnect/index';
import Frame from '../../../common/Frame';
import CollectorRank from '../component/CollectorRank'
import collector_logo from '../../images/collector_logo.png'
import CollectorAction from '../action/CollectorAction'
import FavoritesPage from '../component/FavoritesPage'
import { Alert } from '../../../common/index'
import config from '../../../common/js/config'
import versionChenck from '../../../common/js/public'



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        const { dispatch } = props;
        versionChenck.IEVersion() //如果是檢查IE版本是否符合
        TokenCheck_Connect(false,()=>{


            if (sessionStorage.getItem('UserInfo')) {
                    // versionChenck.IEVersion()
                const { UserType } = JSON.parse(sessionStorage.getItem('UserInfo'));
    
                console.log(UserType === "1")
                if (UserType === "1" || UserType === "2") {
                    // dispatch(CollectorAction.getFolderResInfo({ typeId: '', folderID: '', startTime: '', endDate: '' }));
                    dispatch(CollectorAction.getFolderResInfo({}));
                    dispatch(CollectorAction.getRecentCollection());
                    dispatch(CollectorAction.getResTypeList())
    
    
                }
                else {
                    //如果访问者不是学生，也不是老师，这跳转到错误页面，无权访问
                    window.location.href = config.ErrorProxy + "/Error.aspx?errcode=E011"
    
    
    
                }
    
    
            } else {
    
                let timerID = setInterval(() => {
                    if (sessionStorage.getItem('UserInfo')) {
                        // versionChenck.IEVersion()
    
                        const { UserType } = JSON.parse(sessionStorage.getItem('UserInfo'));
    
                        if (UserType === "1" || UserType === "2") {
    
                            // dispatch(CollectorAction.getFolderResInfo({ typeId: '', folderID: '', startTime: '', endDate: '' }));
                            dispatch(CollectorAction.getFolderResInfo({}));
                            dispatch(CollectorAction.getRecentCollection());
                            dispatch(CollectorAction.getResTypeList())
    
                        }
                        else {
                            //如果访问者不是学生，也不是老师，这跳转到错误页面，无权访问
                            window.location.href = config.ErrorProxy + "/Error.aspx?errcode=E011"
    
    
                        }
                        clearInterval(timerID)
                    }
    
                }, 20)
    
            }

        })

       

        
    }
    render() {
        const { AppAlert } = this.props
        let userName = ""
        let userLogo = ""
        if (sessionStorage.getItem('UserInfo')) {
            const UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'))
            userName = UserInfo.UserName;
            userLogo = UserInfo.PhotoPath
            // console.log(UserInfo)
        }
        return (
            <div>
                <Frame
                    type={"circle"}
                    showBarner={false}
                    module={{ cnname: "资料收藏夹", enname: "Data Collector", image: collector_logo }}
                    userInfo={{ name: userName, image: userLogo }}>

                    <div ref="frame-right-content">

                        <FavoritesPage></FavoritesPage>
                        <CollectorRank></CollectorRank>


                        <Alert type={AppAlert.type} show={AppAlert.show} title={AppAlert.title}
                            //关闭按钮
                            onClose={AppAlert.close}
                            //确定按钮
                            onOk={AppAlert.ok}
                            //取消按钮的点击事件
                            onCancel={AppAlert.cancel}
                            okTitle={AppAlert.okTitle}
                            cancelTitle={AppAlert.cancelTitle}
                            onHide={AppAlert.hide}

                        >
                        </Alert>

                    </div>

                </Frame>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { CollectorDataChange, AppAlert } = state

    return {
        AppAlert
    }
}

export default connect(mapStateToProps)(App);