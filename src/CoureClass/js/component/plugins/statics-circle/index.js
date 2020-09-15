import React,{useEffect,useMemo,useState,memo} from 'react';

import './index.scss';

import Aniamtion from "../../../../../common/js/Aniamtion";


function StaticsCircle(props) {

    const { list } = props;

    return(

        <div className={`statics-circle-wrapper circle${list.length}`}>

            {

                list.map((i,k)=>{

                  const length = list.length;

                  let color = 'green';

                  // let color = '#1ca222';

                  if (length===3){

                    switch (k) {

                        case 0:

                            // color = '#1ca222';

                            color = 'green';

                            break;

                        case 1:

                            // color = '#ff7e00';

                            color = 'orange';

                            break;

                        case 2:

                            // color = '#1790e5';

                            color = 'blue';

                            break;

                    }

                  }else{

                    switch (k) {

                          case 0:

                              // color = '#9179fc';

                              color = 'pink';

                              break;

                          case 1:

                              // color = '#1ca222';

                              color = 'green';

                              break;

                          case 2:

                              // color = '#ff7e00';

                              color = 'orange';

                              break;

                          case 3:

                              // color = '#1790e5';

                              color = 'blue';

                              break;

                      }

                  }

                  return(

                      <div key={i.id} className={"circle-item"}>

                          {/*<Aniamtion.WaveRound background={color} num={i.value}>

                          </Aniamtion.WaveRound>*/}

                          <div className={`circle-bg ${color}`}>{i.value}</div>

                          <div className="title">{i.title}</div>

                      </div>

                  )

                })

            }

        </div>

    )

}


StaticsCircle.defaultProps = {

  list:[]

};

export default memo(StaticsCircle);