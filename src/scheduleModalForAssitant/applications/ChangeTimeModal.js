import React,{useState,useEffect,useMemo,useContext,memo} from 'react';

import {StateContext} from './ReduxConatiner';

import {GetScheduleForChangeTime} from '../api/index';

import {Loading, Modal} from "../../common";

import {Scrollbars} from 'react-custom-scrollbars';

import {ChangeDateAndGetTea} from '../api/index';

import {useStateValue} from "../api/hooks";

import {showSuccessAlert, showWarnAlert} from "../store/appAlert";

function ChangeTimeModal(props) {

    const [loading,setLoading] = useState(true);

    const [selectTime,setSelectTime] = useState({

        weekDay:'',

        classHour:'',

        classDate:''

    });

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


    //解析props数组

    const {state,dispatch} = useContext(StateContext);

    const { ScheduleInfo,UserInfo } = state;

    const { SchoolID,UserID,UserType } = UserInfo;

    const { ItemSchedule=[],NowClassDate='',NowClassHourNO=0,ItemWeek=[],ItemClassHour=[],ItemClassHourCount=[] } = ScheduleInfo;

    const { WeekNO='',WeekDay='',ClassID='',CourseClassID='',ScheduleType='',ClassRoomID='',ClassRoomName='',ScheduleID,TeacherID='',ClassDate='',ClassHourNO=1 } = ItemSchedule.length>0?ItemSchedule[0]:{};


    useEffect(()=>{

        if (ScheduleInfo&&loading){

            GetScheduleForChangeTime({ClassID,CourseClassID,ClassRoomID,TeacherID,WeekNO,dispatch}).then(data=>{

                setLoading(false);

                setSchedule(data&&data.length>0?data:[]);

                setWeekNO(WeekNO);

                setScheduleDate(ClassDate);

                setClassHourNO(ClassHourNO);

                setNowClassHour(NowClassHourNO);

                setNowDate(NowClassDate);

            });

        }

    },[ItemSchedule]);



    //ref

    const selectTimeRef = useStateValue(selectTime);

    const scheduleCommitRef = useStateValue({

        SchoolID,UserID,TeacherID,ClassDate,ClassHourNO,ScheduleID,ClassRoomID,ClassRoomName

    });

    //function

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


    const MaxWeek = useMemo(()=>{

        return ItemWeek.length>0?ItemWeek[ItemWeek.length-1].WeekNO:1;

    },[ItemWeek]);

    const TimeList = useMemo(()=>{

        let list = [];

        if (ItemWeek.length>0) {

            let StartDate = ItemWeek.find(item => item.WeekNO === weekNO).StartDate;

            let StartTime = new Date(StartDate.replace(/-/g, '/'));

            let DateTitle = '';

            for (let i = 1; i <= 7; i++) {

                if (i === 1) {

                    DateTitle = StartDate;

                    list.push(DateTitle);

                } else {

                    StartTime = getNextDay(StartTime);

                    DateTitle = StartTime;

                    list.push(DateTitle);

                }

            }

        }

        return list;

    },[ItemWeek,weekNO]);

    const ths = useMemo(()=>{

        let list = [];

        if (ItemWeek.length>0){

            let StartDate = ItemWeek.find(item=>item.WeekNO===weekNO).StartDate;

            let StartTime = new Date(StartDate.replace(/-/g,'/'));

            let DateTitle = '';

            for (let i = 1; i<=7; i++){

                let WeekDayTitle = '';
                //设置title
                switch (i) {

                    case 1:

                        WeekDayTitle = '星期一';

                        break;

                    case 2:

                        WeekDayTitle = '星期二';

                        break;

                    case 3:

                        WeekDayTitle = '星期三';

                        break;

                    case 4:

                        WeekDayTitle = '星期四';

                        break;

                    case 5:

                        WeekDayTitle = '星期五';

                        break;

                    case 6:

                        WeekDayTitle = '星期六';

                        break;

                    case 7:

                        WeekDayTitle = '星期日';

                        break;

                    default:

                        WeekDayTitle = '';

                }

                if (i===1){

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

                list.push(th);

            }

        }

        return list;

    },[ItemWeek,weekNO]);

    const weekDayTitle = useMemo(()=>{

        let title = '星期一';

        if (WeekDay){

            switch (WeekDay) {

                case 1:

                    title= '星期一';

                    break;

                case 2:

                    title= '星期二';

                    break;

                case 3:

                    title= '星期三';

                    break;

                case 4:

                    title= '星期四';

                    break;

                case 5:

                    title= '星期五';

                    break;

                case 6:

                    title= '星期六';

                    break;

                case 7:

                    title= '星期日';

                    break;

                default :

                    title= '星期一';

                    break;

            }

        }

        return title;

    },[WeekDay]);

    let courseTotal = {

        ClassHourIndex:0,

        TypeIndex:0

    };


    //选择课时
    const SelectClassHour = ({SelectWeekDay,SelectClassHourNO,SelectDate}) =>{

        setSelectTime(d=>({...d,weekDay:SelectWeekDay,classHour:SelectClassHourNO,classDate:SelectDate}));

    };

    const weekPick = (WeekNO) => {

        setWeekNO(WeekNO);

        setSelectTime(d=>({...d,weekDay:'',classHour:'',classDate:''}));

        updateSchedule({WeekNO});

    };


    const updateSchedule = ({WeekNO})=>{

        setLoading(true);

        GetScheduleForChangeTime({ClassID,CourseClassID,ClassRoomID,TeacherID,WeekNO,dispatch}).then(data=>{

            setLoading(false);

            setSchedule(data&&data.length>0?data:[]);

        });

    };


    //提交更新

    const changeTimeCommit = () =>{

        const { classDate,classHour } = selectTimeRef.current;

        if (classDate&&classHour){

            setLoading(true);

            const { UserID,SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,ClassRoomID,ClassRoomName } = scheduleCommitRef.current;

            const ScheduleClassDateAndClassHourNO = `${classDate},${classHour}`;

            ChangeDateAndGetTea({UserID,SchoolID,TeacherID,ClassDate,ClassHourNO,ScheduleID,ScheduleClassDateAndClassHourNO,NowClassRoomID:ClassRoomID,NowClassRoomName:ClassRoomName,dispatch}).then(data=>{

                if (data===0){

                    showSuccessAlert({title:'调整教室成功',dispatch});

                    if (window.parent){

                        window.parent.postMessage('updateCourse','*');

                    }else{

                        window.postMessage('updateCourse','*');

                    }

                }

                setLoading(false);

            });

        }else{

            showWarnAlert({title:'请选择时间',dispatch});

        }


    };

    //关闭弹窗

    const closeModal = () =>{

        if (window.parent){

            window.parent.postMessage('closeIframe','*');

        }else{

            window.postMessage('closeIframe','*');

        }

    };



    return(

        <Modal type={1}

               title='调整时间'

               visible={true}

               width={976}

               mask={true}

               bodyStyle={{minHeight:400,padding:'24px 0'}}

               className="component-change-time-wrapper"

               onCancel={closeModal}

               onOk={e=>changeTimeCommit()}

        >

            <Loading spinning={loading} opacity={false}>

                <div className="modal-content-wrapper">

                    <div className="week-no-wrapper">

                        <span className={`prev ${weekNO<=1?'disabled':''}`} onClick={weekNO<=1?e=>{}:e=>weekPick(weekNO-1)}>&lt;上一周</span>

                        <span className="now-week">第{weekNO}周</span>

                        <span className={`next ${weekNO>=MaxWeek?'disabled':''}`} onClick={weekNO>=MaxWeek?e=>{}:e=>weekPick(weekNO+1)}>下一周&gt;</span>

                    </div>


                    <Scrollbars style={{width:942,height:452,margin:'0 auto'}}>

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

                                                        if (selectTime.weekDay===i&&selectTime.classHour===item.ClassHourNO){//是否是已选中的课时

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

                                        <span>第{WeekNO}周</span>

                                        <span>{weekDayTitle}</span>

                                        <span className="footer-class-date">({ClassDate})</span>

                                        <span>{parseInt(ScheduleType)===1?'上午':parseInt(ScheduleType)===2?'下午':'晚上'}</span>

                                        <span>第{ClassHourNO}节</span>

                                        <span className="footer-time">({ItemClassHour.find(i=>i.ClassHourNO===ClassHourNO)?ItemClassHour.find(i=>i.ClassHourNO===ClassHourNO).StartTime:''}-{ItemClassHour.find(i=>i.ClassHourNO===ClassHourNO)?ItemClassHour.find(i=>i.ClassHourNO===ClassHourNO).EndTime:''})</span>

                                    </td>

                                </tr>

                                    </tbody>

                                </table>

                        </div>

                    </Scrollbars>



                </div>

            </Loading>

        </Modal>

    )

}



export default memo(ChangeTimeModal);