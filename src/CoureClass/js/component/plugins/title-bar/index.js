import React,{useEffect,useCallback,useMemo,memo} from 'react';

import './index.scss';

function TitleBar(props) {

    const {type,title,rightContent} = props;

    return(

        <div className={`title-bar-wrapper ${type}`}>

            <div className={"content"}>

                <div className={"left-title"}>{title}</div>

                <div className={"right-wrapper"}>{rightContent}</div>

            </div>


        </div>

    )

}

TitleBar.defaultProps = {

    type:'',

    title:'',

    rightContent:''

};

export default memo(TitleBar);