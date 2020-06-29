import React,{Component} from 'react';

import { connect } from 'react-redux';

import $ from "jquery";

import AppLoadingActions from '../actions/AppLoadingActions';

import ImportExcel from '../../../common/js/Import/ImportExcel';


class Import extends Component{

    constructor(props) {

        super(props);

        this.state={

            FirstUpload:true

        }

    }


    componentWillUpdate(){

        const { LoginUser,dispatch } = this.props;

        if (Object.keys(LoginUser).length>0&&this.state.FirstUpload){

            dispatch({type:AppLoadingActions.APP_LOADING_HIDE});

            this.setState({FirstUpload:false});

        }
    }


    componentDidMount(){

        const { dispatch } = this.props;

        $('.frame-content-rightside').css({

            'margin-top':'0px',

            "border-radius":"12px",

            "border-top":"0px"

        });

    }


    render(){

        const { LoginUser } = this.props;

        return <div id="import-wrapper">

            <ImportExcel ImportTitle="导入课表" ImportTarget="scheduleMiddle"></ImportExcel>

        </div>

    }

}

const  mapStateToProps = (state) => {

    let { LoginUser } = state;

    return {

        LoginUser

    }

};

export default connect(mapStateToProps)(Import);