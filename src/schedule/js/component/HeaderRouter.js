import React,{Component} from 'react';

import {HashRouter as Router,withRouter,NavLink} from "react-router-dom";

class HeaderRouter extends Component{

    render() {

        const {HeaderLinkList} =this.props;

        return (



            <div className="schedule-router-tab clearfix">

                {

                    HeaderLinkList&&HeaderLinkList.map((item,key) => {

                        return  <NavLink key={key} className="schedule-router-tab-item" activeClassName="active" to={item.link} >

                                    <span className={`router-logo ${item.logo}`}></span>

                                    <span className={`router-title ${item.logo}`} >{item.name}</span>

                                </NavLink>

                    })

                }

            </div>

        );
    }
}
export default  withRouter(HeaderRouter);