import React from 'react';
import img_QQ from '../../images/QQ.png'
import img_weixin from '../../images/weixin.png'
import img_weibo from '../../images/weibo.png'
import img_telephone from '../../images/telephone.png'
import  '../../scss/TipsContact.scss';
class TipsContact extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <React.Fragment>
                <div className='tips-Box'>
                    <div className='box-top'>
                        <span className='top-tip'>联系方式：</span>
                    </div>
                    <div style={{borderTop:'1px #ccc dashed'}}></div>
                    <div className='box-content'>
                        <div className='content'>
                            <img alt='QQ' src={img_QQ} width='28' height='28'/>
                            <span title={this.props.data.QQ?this.props.data.QQ:""} className={`content-text ${this.props.data.QQ?'':'content-null'}`}>{this.props.data.QQ?this.props.data.QQ:'未填写'}</span>
                        </div>
                        <div className='content'>
                            <img alt='微信' src={img_weixin} width='28' height='28'/>
                            <span title={this.props.data.WeiXin?this.props.data.WeiXin:""} className={`content-text ${this.props.data.WeiXin?'':'content-null'}`}>{this.props.data.WeiXin?this.props.data.WeiXin:'未填写'}</span>
                        </div>
                        <br />
                        <div className='content'>
                            <img alt='微博' src={img_weibo} width='28' height='28'/>
                            <span title={this.props.data.Weibo?this.props.data.Weibo:""} className={`content-text ${this.props.data.Weibo?'':'content-null'}`}>{this.props.data.Weibo?this.props.data.Weibo:'未填写'}</span>
                        </div>
                        <div className='content'>
                            <img alt='手机号码' src={img_telephone} width='28' height='28'/>
                            <span title={this.props.data.Telephone?this.props.data.Telephone:""} className={`content-text ${this.props.data.Telephone?'':'content-null'}`}>{this.props.data.Telephone?this.props.data.Telephone:'未填写'}</span>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default TipsContact;