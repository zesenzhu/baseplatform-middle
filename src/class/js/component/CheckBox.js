import React,{ Component } from 'react';
import StudentsCheckList from "../reducers/data/StudentsCheckList";

class CheckBox extends Component{

    render() {

        const  { onClick,IsChecked,value,children } = this.props;

        return (

            <label className="ant-checkbox-circle ant-checkbox-wrapper">

                <span className={`ant-checkbox ${IsChecked?'ant-checkbox-checked':''}`}>

                <input onClick={e=>{onClick({IsChecked,value})}} type="checkbox" className="ant-checkbox-input" value={value}/>

                <span className="ant-checkbox-inner"/>

                    {children}

                </span>

            </label>

        );

    }

}

export default CheckBox;