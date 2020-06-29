import React, { Component } from 'react';
import '../../scss/Radio.scss'
class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            className: props.className ? props.className : '',
            textClass: props.textClass ? props.textClass : '',
            checked:props.checked?true:false,
            // key:props.key?props.key:''

        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            checked:nextProps.checked
        })
    }
    onRadioChange = (e) => {
        // this.setState({
        //     checked:e.target.checked
        // })
        if(typeof this.props.onChange ==='function' )
        //console.log(e.target.value)
        this.props.onChange(e.target.checked,e.target.value);
    }
    render() {
        return (
            <div className={`component-Radio ${this.state.className}`}>
                <label>
                    <div className={`Radio-new ${this.state.checked?'open':'close'}`}>
                        <input value={this.props.value} checked={this.state.checked} type='checkBox' onChange={this.onRadioChange.bind(this)} className='Radio-old' />
                    </div></label>
                <span style={{ display:  this.props.children ? 'inline-block' : 'none' }} className={`Radio-tips ${this.state.textClass}`}>{ this.props.children}</span>
            </div>
        )
    }
}
export default Radio