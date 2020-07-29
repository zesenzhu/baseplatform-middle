import React,{memo} from 'react';

import './index.scss';

function CardTab(props) {

    const {list,type,tabClick} = props;

    return(

        <div className={`card-statics-wrapper card-type${type} clearfix`}>

            {

                list.map(i=>{

                    return(

                        <div key={i.CardID} className={"card-item"} onClick={e=>tabClick({CardID:i.CardID,CardName:i.CardName})}>

                            <div className={"card-content"}>

                                <div className="title" title={i.CardName}>{i.CardName}</div>

                                <div className={"content-wrapper"}>

                                    {

                                        i.CardItemList&&i.CardItemList.map(item=>{

                                           return(

                                               <div key={item.CardProps} className={"content-item clearfix"}>

                                                   <div className={"props"}>{item.CardProps}</div>

                                                   <div className={"value"}>{item.CardValue}</div>

                                               </div>

                                           )

                                        })

                                    }

                                </div>

                            </div>

                        </div>

                    )

                })

            }

        </div>

    )

}

CardTab.defaultProps = {

    list:[],

    type:1,

    tabClick:()=>{}

};

export default memo(CardTab);