import React,{ useState,useRef,useEffect,memo } from 'react';

import {Loading, Modal} from "../../../common";

import ApiActons from '../actions/ApiActions';

import {connect} from 'react-redux';




function ChangeTimeModal(props){

    //已选择的时间

    const [selectTime,setSelectTime] = useState({

       weekDay:'',

       classHour:''

    });

    //loading
    const [loading,setLoading] = useState(true);


    //当前周次
    const [weekNO,setWeekNO] = useState(1);


    //当前课时
    const [nowClassHour,setNowClassHour] = useState(1);

    //当前日期
    const [nowDate,setNowDate] = useState(1);

    //该节课所在日期

    const [scheduleDate,setScheduleDate] = useState(1);


    //该节课所在的课时
    const [classHourNO,setClassHourNO] = useState(1);

    //所获取的课程
    const [schedule,setSchedule] = useState([]);


    const  { Params,SelectClassHour,WeekPick,CloseChangeTime,ChangeTimeCommit,dispatch } = props;

    const {

        Show=false,ModalLoading=true,WeekNO=0,ClassDate='',NowClassHourNO=0,

        ItemClassHour=[],ItemWeek=[],ItemClassHourCount=[],NowDate='',WeekDay='',

        ClassHourType='',ClassHourNO='',StartEndTime='',SelectWeekDay='',SelectClassHourNO=0,

        NowClassRoomID='',ClassID='',CourseClassID='',TeacherID='',OriginWeekNO=1

    } = Params;


    useEffect(()=>{

        setWeekNO(WeekNO);

        setNowClassHour(NowClassHourNO);

        setNowDate(NowDate);

        setClassHourNO(ClassHourNO);

        setScheduleDate(ClassDate);

    },[WeekNO,NowClassHourNO,NowDate,ClassDate,ClassHourNO]);


    //初始化
    useEffect(()=>{

        if (Show){

            ApiActons.GetScheduleForChangeTime({ClassID,TeacherID,CourseClassID,ClassRoomID:NowClassRoomID,WeekNO,dispatch}).then(data=>{

                if (data){

                    const list = data.Item&&data.Item.length>0?data.Item:[];

                    setSchedule(list);

                }

                setLoading(false);

            });

        }

    },[Show]);



    const weekPick = (num) =>{

        setLoading(true);

        ApiActons.GetScheduleForChangeTime({ClassID,TeacherID,CourseClassID,ClassRoomID:NowClassRoomID,WeekNO:num,dispatch}).then(data=>{

            if (data){

                const list = data.Item&&data.Item.length>0?data.Item:[];

                setSchedule(list);

            }

            setLoading(false);

        });

        WeekPick(num);

    };



    const getNextDay = (d) =>{

        d = new Date(d);
        d = +d + 1000*60*60*24;
        d = new Date(d);
        //return d;
        //格式化
        return d.getFullYear()+"-"+(SupplyZero(d.getMonth()+1))+"-"+SupplyZero(d.getDate());


    };


    const SupplyZero = (number) =>{

        let NumberStr = number.toString();

        let Number = NumberStr;

        if (NumberStr.length<2){

            Number = `0${NumberStr}`;

        }

        return Number;

    };

    //判断转化为时间戳

    const ToTime = (time) =>{

       return new Date(time).getTime();

    };

    //获取每周的开始日期
    let StartDate = '';

    //th
    let ths = [];

    let TimeList = [];

    //计算时间
    if (ItemWeek.length>0){

        StartDate = ItemWeek.find(item=>item.WeekNO===WeekNO).StartDate;

        let StartTime = new Date(StartDate.replace(/-/g,'/'));

        let DateTitle = '';

        for (let i = 0; i<=6; i++){

            let WeekDayTitle = '';
            //设置title
            switch (i) {

                case 0:

                    WeekDayTitle = '星期一';

                    break;

                case 1:

                    WeekDayTitle = '星期二';

                    break;

                case 2:

                    WeekDayTitle = '星期三';

                    break;

                case 3:

                    WeekDayTitle = '星期四';

                    break;

                case 4:

                    WeekDayTitle = '星期五';

                    break;

                case 5:

                    WeekDayTitle = '星期六';

                    break;

                case 6:

                    WeekDayTitle = '星期日';

                    break;

                default:

                    WeekDayTitle = '';

            }

            if (i===0){

                DateTitle = StartDate;

                TimeList.push(DateTitle);

            }else{

                StartTime = getNextDay(StartTime);

                DateTitle = StartTime;

                TimeList.push(DateTitle);

            }

            let th = <th key={i} className='week-day'>

                <div className="week">{WeekDayTitle}</div>

                <div className="day">{DateTitle}</div>

            </th>;

            ths.push(th);

        }

    }


 /*   let FooterClassHourType = '';

    switch (ClassHourType) {

        case 1:

            FooterClassHourType = '上午';

            break;

        case 2:

            FooterClassHourType = '下午';

            break;

        case 3:

            FooterClassHourType = '晚上';

            break;

        default:

            FooterClassHourType = '';

    }*/


    let courseTotal = {

        ClassHourIndex:0,

        TypeIndex:0

    };


    let MaxWeek =  ItemWeek.length>0?ItemWeek[ItemWeek.length-1].WeekNO:1;


    return (

        <Modal type={1}

               title='调整时间'

               visible={Show}

               width={976}

               mask={true}

               className="component-change-time-wrapper"

               onCancel={e=>CloseChangeTime()}

               onOk={e=>ChangeTimeCommit()}

        >

            <Loading spinning={ModalLoading}>

                <div className="modal-content-wrapper">

                    <div className="week-no-wrapper">

                            <span className={`prev ${WeekNO<=1?'disabled':''}`} onClick={WeekNO<=1?e=>{}:e=>weekPick(WeekNO-1)}>&lt;上一周</span>

                            <span className="now-week">第{WeekNO}周</span>

                            <span className={`next ${WeekNO>=MaxWeek?'disabled':''}`} onClick={WeekNO>=MaxWeek?e=>{}:e=>weekPick(WeekNO+1)}>下一周&gt;</span>

                    </div>

                    <div className="content-table">

                        <table className="component-change-time-table">

                            <thead>

                                <tr>

                                    <th className="blank" colSpan={2}></th>

                                    {ths}

                                </tr>

                            </thead>

                            <tbody>

                            {

                                ItemClassHour&&ItemClassHour.map((item,key) => {

                                    let firstTd = '';
                                    //判断上下午，以及合并单元格


                                    ItemClassHourCount.map((i,k) => {

                                        if (key===courseTotal.ClassHourIndex){

                                            if (k===courseTotal.TypeIndex){

                                                let noon = '';

                                                switch (i.ClassHourType) {

                                                    case 1:

                                                        noon = "上午";

                                                        break;

                                                    case 2:

                                                        noon = "下午";

                                                        break;

                                                    case 3:

                                                        noon = "晚上";

                                                        break;

                                                    default:

                                                        noon = "上午";

                                                        break;

                                                }

                                                firstTd = <td  className="noon"  rowSpan={i.CountType}>{noon}</td>;

                                                courseTotal.ClassHourIndex += i.CountType;

                                                courseTotal.TypeIndex+=1;

                                                return;

                                            }

                                        }

                                    });

                                    let tds = [];


                                        //从周一开始判断
                                    for (let i =0; i <= 6; i++){

                                            let CanSelect = false;

                                            let isNowSchedule = false;

                                            let NowTime = ToTime(nowDate);

                                            let Time = ToTime(TimeList[i]);

                                            let dayToTime = ToTime(scheduleDate);

                                            //判断当天日期是否大于正在上的日期
                                            if (NowTime<Time){

                                                CanSelect = true;

                                            }else if (NowTime===Time) {//如果当天日期和正在上课日期相同

                                                //如果有现在正在上的课时的话，判断正在上的课时，如果没有的话默认当天不可选择

                                                if (nowClassHour){

                                                    if (item.ClassHourNO>=nowClassHour){

                                                        CanSelect = true;

                                                    }

                                                }

                                            }

                                            if (Time===dayToTime&&classHourNO===item.ClassHourNO){

                                                isNowSchedule = true;

                                            }


                                            if (CanSelect){ //是否可被选择

                                                if (isNowSchedule){//是当前的课程

                                                    tds.push(<td key={i} className={`shedule`} >

                                                        <div className='select not-allowed'>选择</div>

                                                    </td>);

                                                }else{

                                                    if (SelectWeekDay===i&&SelectClassHourNO===item.ClassHourNO){//是否是已选中的课时

                                                        tds.push(<td key={i} className={`shedule`} >

                                                            <div className='select active'>已选择</div>

                                                        </td>);

                                                    }else{

                                                        const findItem = schedule.find(it=>{

                                                            let findDay = it.WeekDayNO === (i+1);

                                                            let findClassHour = it.ClassHourNO === item.ClassHourNO;

                                                            return findDay&&findClassHour;

                                                        });

                                                        if (findItem){//当前的课时是否有课程存在

                                                            let classHourTitle = <div className={"chooise"}>选择</div>;

                                                            let hasEvent = true;

                                                            switch (findItem.Type) {

                                                                case 1:

                                                                    classHourTitle = <div className={"has_single_classroom"}>教室有课</div>;

                                                                    break;

                                                                case 2:

                                                                    classHourTitle = <div className={"disabled one"}>教师有课</div>;

                                                                    hasEvent = false;

                                                                    break;

                                                                case 3:

                                                                    classHourTitle = <div className={"disabled two"}>教室有课<br></br>教师有课</div>;

                                                                    hasEvent = false;

                                                                    break;

                                                                case 4:

                                                                    classHourTitle = <div className={"disabled one"}>班级有课</div>;

                                                                    hasEvent = false;

                                                                    break;

                                                                case 5:

                                                                    classHourTitle = <div className={"disabled two"}>教室有课<br></br>班级有课</div>;

                                                                    hasEvent = false;

                                                                    break;

                                                                case 6:

                                                                    classHourTitle = <div className={"disabled two"}>教师有课<br></br>班级有课</div>;

                                                                    hasEvent = false;

                                                                    break;

                                                                case 7:

                                                                    classHourTitle = <div className={"disabled three"}>教师有课<br></br>班级有课<br></br>教室有课</div>;

                                                                    hasEvent = false;

                                                                    break;

                                                                default:

                                                                    hasEvent = true;

                                                                    classHourTitle = <div className={"chooise"}>选择</div>;

                                                            }

                                                            tds.push(<td key={i} className={`shedule`} >

                                                                <div className={`select ${hasEvent?'':'disabled'}`} onClick={hasEvent?e=>{SelectClassHour({SelectWeekDay:i,SelectClassHourNO:item.ClassHourNO,SelectDate:TimeList[i]})}:e=>{}}>

                                                                    {classHourTitle}

                                                                </div>

                                                            </td>);

                                                        }else{

                                                            tds.push(<td key={i} className={`shedule`} >

                                                                <div className='select' onClick={e=>{ SelectClassHour({SelectWeekDay:i,SelectClassHourNO:item.ClassHourNO,SelectDate:TimeList[i]}) }}>

                                                                    <div className={"chooise"}>选择</div>

                                                                </div>

                                                            </td>);

                                                        }

                                                    }

                                                }


                                            }else{//当都是过去的课程时

                                                tds.push(<td key={i} className={`shedule`} >

                                                    <div ></div>

                                                </td>);

                                            }

                                        }

                                    return  <tr key={key}>

                                        {
                                            firstTd===''?<React.Fragment></React.Fragment>:firstTd
                                        }

                                        <td className={`course-time course${key+1}`} >

                                            <div className="course-time-title" >第{item.ClassHourNO}节</div>

                                            <div className="course-time-time">{item.StartTime}-{item.EndTime}</div>

                                        </td>

                                        {

                                            tds

                                        }

                                    </tr>

                                })

                            }

                            <tr>

                                <td colSpan={9} className="footer-info">

                                    <span className="dec">原上课时间:</span>

                                    <span>第{OriginWeekNO}周</span>

                                    <span>{WeekDay}</span>

                                    <span className="footer-class-date">({ClassDate})</span>

                                    {/*<span>{FooterClassHourType}</span>*/}

                                    <span>第{ClassHourNO}节</span>

                                    <span className="footer-time">({StartEndTime})</span>

                                </td>

                            </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </Loading>

        </Modal>

    );

}


const mapStateToProps = (state) =>{

    const { ChangeTime } = state.ScheduleDetail;

    return {ChangeTime};

};

export default connect(mapStateToProps)(memo(ChangeTimeModal));