import React,{useEffect,memo,useCallback} from 'react';

import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/bar';

import './index.scss';

function Charts(props) {

    const { xAxis,yAxis,itemColor,data,chartClick } = props;

    useEffect(()=>{

        if (data.length>0){

            const myChart =  echarts.init(document.getElementById('echarts'));

            myChart.setOption({

                xAxis: [
                    {
                        name:xAxis.name,

                        type: 'category',

                        data: xAxis.value,

                        axisTick:{

                            inside:true,

                            length:4,

                            lineStyle:{

                                color:'#65a2ab'

                            }

                        },

                        nameTextStyle:{

                            color:'#999999',

                            fontFamily:'Microsoft YaHei',

                            fontSize:14

                        },

                        axisLine:{

                            lineStyle:{

                                color:'#65a2ab'

                            }

                        },

                        axisLabel:{

                            show:true,

                            margin:10,

                            color:'#666666',

                            fontFamily:'Microsoft YaHei'

                        },

                        splitArea:{

                            show:false

                        }

                    }
                ],

                yAxis: [
                    {
                        type: 'value',

                        name:yAxis.name,

                        nameTextStyle:{

                            color:'#999999',

                            fontFamily:'Microsoft YaHei',

                            fontSize:14,



                        },

                        nameGap:20,

                        splitNumber:6,

                        axisLine:{

                            show:false

                        },

                        axisTick:{

                            show:false

                        },

                        axisLabel:{

                            margin:10,

                            color:'#999999',

                            fontFamily:'Microsoft YaHei',

                            fontSize:12

                        },

                        splitLine:{

                            lineStyle:{

                                type:'dotted'

                            }

                        }

                    }
                ],

                tooltip:{

                    show:true,

                    trigger:'axis',

                    showContent:true

                },

                series: [

                    {
                        type: 'bar',

                        label:{

                            show:true,

                            position:'top',

                            color:'#333333',

                            fontFamily:'Microsoft YaHei',

                            formatter:'{c}个'

                        },

                        itemStyle:{

                            color:new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color:itemColor.start},
                                    {offset:0.5,color:itemColor.center},
                                    {offset: 1, color:itemColor.end}
                                ]
                            ),

                            barBorderRadius:[5,5,0,0]

                        },

                        barWidth:42,

                        data:data,

                        legendHoverLink:true

                    }
                ]

            });

            myChart.on('click',clickChart);

        }

    },[data]);

    //点击事件
    const clickChart = useCallback((params)=>{

        const {data,name} = params;

        const { id } = data;

        chartClick(id,name);

    },[]);


    return(

        <div className={"charts-wrapper"}>

            <div id={"echarts"}></div>

        </div>

    )

}

Charts.defaultProps = {

  xAxis:{

      name:'',

      value:[]

  },

  yAxis:{

      name:''

  },

  data:[],

  itemColor:{

        start:'',

        center:'',

        end:''

    },

  chartClick:()=>{}

};

export default memo(Charts);