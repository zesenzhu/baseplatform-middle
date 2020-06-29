import React,{memo} from 'react';

function Footer(props) {

    return(

        <div className={`footer ${props.skin}`}>{props.footer}</div>

    )

}

export default memo(Footer);