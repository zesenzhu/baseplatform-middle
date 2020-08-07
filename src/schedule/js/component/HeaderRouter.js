import React,{useEffect,useState,useMemo,memo} from 'react';

import {HashRouter as Router,withRouter,NavLink} from "react-router-dom";

import {getQueryVariable} from "../../../common/js/disconnect";

function HeaderRouter(props){

        const [isWorkPlantform,setIsWorkPlantform] = useState(false);

        useEffect(()=>{

            if(getQueryVariable('isWorkPlantform')){

                setIsWorkPlantform(true);

            }

        },[]);

        const {HeaderLinkList} = props;

        return (

            <div className={`schedule-router-tab ${isWorkPlantform?'work-plant-form':''} clearfix`}>

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
export default  withRouter(memo(HeaderRouter));