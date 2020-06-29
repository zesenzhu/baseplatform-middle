import React,{Component} from 'react';

import {HashRouter as Router, NavLink,withRouter} from 'react-router-dom';

class ChangeTab extends Component{

    render() {

        const {TabLinkList} = this.props;

        const hash = this.props.location.pathname;

        return (

            <div className="schedule-change-tab">

                {

                    TabLinkList&&TabLinkList.map((item,key) => {

                        return  <div className="change-tab-wrapper" key={key}>

                            {

                                hash===item.link?

                                    <React.Fragment>

                                        <NavLink className="schedule-change-tab-item" activeClassName="active"  to={item.link} >

                                            {item.name}

                                            <div className="line"></div>

                                            <div className="circle"></div>

                                        </NavLink>

                                        <div className="change-tab-shadow"></div>

                                    </React.Fragment>

                                    :

                                    <NavLink className="schedule-change-tab-item"  to={item.link}>

                                        <div className="blank-title">{item.name}</div>

                                    </NavLink>

                            }


                        </div>

                    })

                }

            </div>
        );
    }
}
export default withRouter(ChangeTab);