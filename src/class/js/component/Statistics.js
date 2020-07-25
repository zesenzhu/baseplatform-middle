import React,{Component} from 'react';

import Aniamtion from '../../../common/js/Aniamtion/index'

class Statistics extends Component{
    render() {
        const {classNum,teacherNum,studentNum} = this.props;

        return (
            <div className="statistic-wrapper">
                <ul>

                    <li className="statistic-item">
                        {/*<div className="statistic-bg statistic-green">
                            <div className="statistic-num">{classNum}</div>
                        </div>*/}

                        <Aniamtion.WaveRound num={classNum} background={'#1ca222'}></Aniamtion.WaveRound>

                        <div className="statistic-title">班级数量</div>
                    </li>
                    <li className="statistic-item">
                        {/*<div className="statistic-bg statistic-orange">
                            <div className="statistic-num">{teacherNum}</div>
                        </div>*/}

                        <Aniamtion.WaveRound num={teacherNum} background={'#ff7e00'}></Aniamtion.WaveRound>


                        <div className="statistic-title">教师人数</div>
                    </li>
                    <li className="statistic-item">
                        {/*<div className="statistic-bg statistic-blue">
                            <div className="statistic-num">{studentNum}</div>
                        </div>*/}

                        <Aniamtion.WaveRound num={studentNum} background={'#1790e5'}></Aniamtion.WaveRound>


                        <div className="statistic-title">学生人数</div>
                    </li>



                </ul>

            </div>
        );
    }
}
export default Statistics;