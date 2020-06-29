import React from 'react';
import {Empty} from '../../../common'
import '../../scss/TipsPower.scss';
class TipsPower extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const PowerList = this.props.data.Powers.map((power, index) => {
            return (
                <Power key={index+power.value} power={power}></Power>
            )
        })
        return (
            <div className='TipsPower'> 
                    {PowerList.length?PowerList:<Empty style={{paddingBottom:20+'px',paddingTop:10+'px'}} type='4' title='暂无权限'></Empty>}
            </div>
        )
    }
}

function Power(props) {
    const data = props.power;
    const dataList = data.PowerChild.map((child, index) => {
        return (
            <span className='powerText' key={child.value+index}>{child.PowerChildName}{index!==data.PowerChild.length-1?<span className='text-after'>，</span>:''}</span>
        )
    })
    return (
        <div key={props.power.value} className='tipsPower-Box'>
            <div className='box-top'>
                <span className='top-tip'>{data.PowerName+':'}</span>
            </div>
            <div style={{ borderTop: '1px #ccc dashed' }} ></div>
            <div className='box-content'>
                {dataList}
            </div>
        </div>
    )
}
export default TipsPower;