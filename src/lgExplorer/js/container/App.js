import Tabheader from '../components/Tabheader/Tabheader'
import Content from '../components/Content/Content'
import { Alert } from '../../../common/index'
import { connect } from 'react-redux'
import { TokenCheck_Connect } from '../../../common/js/disconnect';
import HomeData from '../action/HomeData'
import versionChenck from '../../../common/js/public'
import config from '../../../common/js/config'
import React, { Component } from 'react';
class APP extends Component {

    constructor(props) {
        super(props);

        
        const { dispatch } = this.props;
        //获取接口一种的数据
        // dispatch(LoadingData.getLinkData());
        //获取接口二中的数据
        //dispatch(LoadingData.getResBaseData());


        // versionChenck.IEVersion() //如果是檢查IE版本是否符合
        TokenCheck_Connect(false, () => {
            if(JSON.parse(sessionStorage.getItem("UserInfo")).UserType!=='1'){
                window.location.href = config.ErrorProxy + "/Error.aspx?errcode=E011";
                return false;
            }
            if (sessionStorage.getItem('UserInfo')) {
                // let SubjectId =JSON.parse(sessionStorage.getItem("UserInfo")).SubjectId
                let SubjectId = document.cookie
                // let SubjectId = "S2-English"
                dispatch({
                    type: HomeData.GETCOURSEID_FROM_COOKIE,
                    data: SubjectId
                })
                dispatch(HomeData.getPeriodList(SubjectId))
                




            } else {
                let timerID = setInterval(() => {
                    if (sessionStorage.getItem('UserInfo')) {
                        if(JSON.parse(sessionStorage.getItem("UserInfo")).UserType!=='1'){
                            window.location.href = config.ErrorProxy + "/Error.aspx?errcode=E011";
                            return false;
                        }
                        let SubjectId = document.cookie
                        dispatch({
                            type: HomeData.GETCOURSEID_FROM_COOKIE,
                            data: SubjectId
                        })
                        dispatch(HomeData.getPeriodList(SubjectId));
                       
                        clearInterval(timerID)
                    }

                }, 20)

            }
        })




    }

    senddata = (param) => {
        return param
    }


    render() {

        const { AppAlert } = this.props
        console.log(AppAlert.type)
        return (
            <div style={{ background: "#FFF" }}>
                <Tabheader></Tabheader>
                <Content ></Content>
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




            </div >
        );
    }
}

const mapStateToProps = (state) => {
    const { AppAlert, HomeDataUpdate } = state;
    // console.log(HomeDataUpdate.PeriodList)
    return {
        AppAlert: AppAlert,
        PeriodList: HomeDataUpdate.PeriodList

    }
}

export default connect(mapStateToProps)(APP);