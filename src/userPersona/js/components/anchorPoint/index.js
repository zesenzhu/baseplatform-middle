import React,{useEffect,useRef,useState,useMemo,useCallback,memo} from 'react';

import {Anchor} from 'antd';

const {Link} = Anchor;

function AnchorPoint(props) {

   const {anchorList} = props;

    return(

        <div className={"anchor-wrapper"}>

            <Anchor>

                {

                    anchorList.map(i=>{

                        return <Link activeLink={"111"}>123</Link>

                    })

                }

            </Anchor>

        </div>

    )

}

AnchorPoint.defaultProps = {

    anchorList:[]

};

export default memo(AnchorPoint);