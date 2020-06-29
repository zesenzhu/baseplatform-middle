import React, { Component } from 'react';
import '../../scss/index.scss'
import config from '../../../common/js/config'
import Public from '../../../common/js/public'
import { TokenCheck_Disconnect,TokenCheck } from '../../../common/js/disconnect'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toLogin: config.LoginProxy + '/UserMgr/Login/Login.aspx?SysID=000'
        }
    }
    componentWillMount() {
        TokenCheck_Disconnect();
        let url = this.state.toLogin;
        let lg_preurl = window.location.href.split('lg_preurl=')[1];

        if (lg_preurl) {
            // console.log(decodeURIComponent(decodeURIComponent(lg_preurl)))
            // console.log(Public.getLg_tk(lg_preurl))
            this.setState({
                toLogin: url + '&lg_preurl=' + Public.getLg_tk(lg_preurl)
            })

        }
    }
    onSelfClick = () => {
        // let url = window.location.href.split('lg_preurl=')[1];
        TokenCheck()
        // window.location.href = url
    }
    onLoginClick = () => {
        sessionStorage.clear();
        window.location.href = this.state.toLogin
    }
    render() {
        return (
            <div id='Disconnect'>
                <div className='box-content'>
                    <div className='content' >
                        <p className='content-tips-1' >
                            o(︶︿︶)o页面掉线了
                            </p>
                        <p className='content-tips-2' >
                            可能您已在其它页面登出，或者您的账号在其它机器上登录了
                                </p>
                        <p className='content-tips-3' >
                            如果需要继续访问，您可以尝试以下操作
                            <a

                                className='content-link-1'

                                onClick={this.onLoginClick}
                            >
                                <input
                                    className='content-link-2'
                                    value="重新登录"
                                    type="button"></input>
                            </a>
                            或
                                    <span
                                className='content-link-3'
                                onClick={this.onSelfClick}
                            >
                                刷新页面
                                        </span>
                        </p>
                    </div>
                </div>
            </div>

        )
    }
}
export default App;
