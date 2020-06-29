import React, { Component } from "react";
 
import { TokenCheck_Connect } from '../../../../common/js/disconnect';
 
import setting from '../../../images/setting_logo.png';
 
import config from '../../../../common/js/config'
import history from '../../containers/history'
import { QueryPower } from '../../../../common/js/power'
import  versionChenck from '../../../../common/js/public'



import { connect } from 'react-redux';
class InitSystem extends Component{
    constructor(props){
        super(props);
        this.state ={}
    }
    render(){
        return <div className='InitSystem' id='InitSystem'></div>
    }
}

const mapStateToProps = (state) => {

    return {
        state
    }
}

export default connect(mapStateToProps)(InitSystem);