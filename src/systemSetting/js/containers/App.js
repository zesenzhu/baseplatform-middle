import React, { Component } from 'react';

import MainContent from '../component/MainContent/MainContent'

import { connect } from 'react-redux'
import { Alert}  from  '../../../common/index'

import AppAlertAction from '../action/UI/AppAlertAction';



class App extends Component {
    constructor(props) {
        super(props);
            this.state={}

    }
 

    render() {
            const {AppAlert } =this.props
        return (
            <div>
  
                <MainContent></MainContent>

                <Alert type={AppAlert.type}  show={AppAlert.show} title={AppAlert.title}
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

        );
    }
}

const mapStateToProps = (state) => {
    const { AppAlert} = state;
    return {
        AppAlert:AppAlert
    }
}

export default connect(mapStateToProps)(App);