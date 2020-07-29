import React,{useEffect,useCallback,useMemo,memo} from 'react';

import history from '../../../containers/history';

import {NavLink} from 'react-router-dom';

import './index.scss';

function Banner(props) {

    const {tabList} = props;

    return(

        <div className={"banner-tab-wrapper"}>

            {

                tabList.map(i=>{

                    return(

                        <NavLink to={i.TabPath} activeClassName={"active"} key={i.TabID} className={`tab-item ${i.TabID}`}>{i.TabName}</NavLink>

                    )

                })

            }

        </div>

    )

}

Banner.defaultProps = {

    tabList:[],

    tabActive:''

};

export default memo(Banner);