import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Frame, Menu, Loading, Alert } from "../../../common";
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import history from '../containers/history'


import actions from '../actions';
import $ from 'jquery'
import CONFIG from '../../../common/js/config';


import '../../scss/ImportFile.scss'
import { DetailsModal, DropDown, PagiNation, Search, Table, Button, CheckBox, CheckBoxGroup, Modal } from '../../../common/index'

import { getData } from '../../../common/js/fetch'
import { func } from 'prop-types';
import { get } from 'http';

import ImportExcel from '../../../common/js/Import/ImportExcel'
import ImportPhoto from '../../../common/js/Import/ImportPhoto'
import {appLoadingHide} from "../reducers/AppLoading";


class ImportFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            select: 'file',
            userMsg:props.DataState.LoginUser

        }
        const { dispatch, DataState } = this.props;


    }

    componentWillMount() {
        const { DataState, dispatch } = this.props;
    }
    componentDidMount() {

        const { dispatch } = this.props;



    }

    //点击tab
    onTabClick = (name) => {
        this.setState({
            select: name
        })
    }
    render() {
        const { UIState, DataState } = this.props;

        return (
            <React.Fragment>
                {/* <div className='Tab'>
                    <span ref='file' onClick={this.onTabClick.bind(this, 'file')} className={`Tab-btn ${this.state.select === 'file' ? 'btn-select' : ''}`}>导入基本资料</span>
                    <span ref='picture' onClick={this.onTabClick.bind(this, 'picture')} className={`Tab-btn ${this.state.select === 'picture' ? 'btn-select' : ''}`}>导入照片</span>
                </div> */}


               <ImportExcel ImportTitle='导入教学班' ImportTarget='courseclass'></ImportExcel>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};

export default connect(mapStateToProps)(ImportFile)