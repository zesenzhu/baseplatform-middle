import React,{useState,useEffect,memo} from 'react';

import {Loading, Modal} from "../../../common";

import apiActions from '../actions/ApiActions';

import SDActions from '../actions/ScheduleDetailActions';

import appAlert from '../actions/AppAlertActions';

import {useStateValue} from '../actions/hooks';

import {connect} from 'react-redux';

import '../../scss/common/component-change-schedule-modal.scss';

import ComPageRefresh from "../actions/ComPageRefresh";

function ChangeScheduleModal(props) {

    //states

    //loading
    const [loading,setLoading] = useState(true);


    //当前展示的周次

    const [weekNO,setWeekNO] = useState(()=>{

        return WeekNO?WeekNO:1;

    });


    //当前课程所在的周次
    const [originWeekNO,setOriginWeekNO] = useState(()=>{

        return WeekNO?WeekNO:1;

    });


    //已选中的节次和日期

    const [selectSchedule,setSelectSchedule] = useState(()=>{

        return {

            weekDay:'',

            classHour:'',

            scheduleID:''

        }

    });

    const [schedule,setSchedule] = useState([]);



    const { LoginUser,ChangeSchedule,ScheduleDetail,dispatch } = props;

    const {SchoolID,UserID,UserType} = LoginUser;

    const { SubjectID } = ScheduleDetail;

    const {

        Show=false,WeekNO=0,ClassDate='',NowClassHourNO=0,

        ItemClassHour=[],ItemWeek=[],ItemClassHourCount=[],NowDate='',WeekDay='',

        ClassHourNO='',StartEndTime='', ClassID='',CourseClassID='',TeacherID='',ScheduleID=''

    } = ChangeSchedule;





    const selectScheduleRef = useStateValue(selectSchedule);

    const scheduleIDRef = useStateValue(ScheduleID);

    const loginUserRef = useStateValue(LoginUser);

    const changeScheduleRef = useStateValue(ChangeSchedule);


    //初始化

    useEffect(()=>{

        if (Show){

            apiActions.GetScheduleOfClassOne({SchoolID,ClassID:ClassID?ClassID:CourseClassID,WeekNO,dispatch}).then(data=>{

                const list = data.ItemSchedule&&data.ItemSchedule.length>0?data.ItemSchedule:[];

                setSchedule(list);

                setLoading(false);
                
            });

            setWeekNO(WeekNO);

            setOriginWeekNO(WeekNO);

        }

    },[Show]);


    //functions



    //获取下一天的日期
    const getNextDay = (d) =>{

        d = new Date(d);
        d = +d + 1000*60*60*24;
        d = new Date(d);
        //return d;
        //格式化
        return d.getFullYear()+"-"+(SupplyZero(d.getMonth()+1))+"-"+SupplyZero(d.getDate());


    };

    //对日期进行补0操作
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



    //选取某一个课时

    const selectClassHour = ({SelectWeekDay,SelectClassHourNO,scheduleID}) =>{

        setSelectSchedule(d=>({...d,classHour:SelectClassHourNO,weekDay:SelectWeekDay,scheduleID}));

    };


    //翻页

    const weekPick = (num) =>{

        setLoading(true);

        apiActions.GetScheduleOfClassOne({SchoolID,ClassID,WeekNO:num,dispatch}).then(data=>{

            const list = data.ItemSchedule&&data.ItemSchedule.length>0?data.ItemSchedule:[];

            setSchedule(list);

            setWeekNO(num);

            setSelectSchedule(d=>({...d,weekDay:'',classHour:''}));

            setLoading(false);

        });



    };


    const changeScheduleCommit = () =>{

          setLoading(true);

        if(selectScheduleRef.current.scheduleID){

            const schoolID = loginUserRef.current.SchoolID;

            const userType = loginUserRef.current.UserType;

            const userID = loginUserRef.current.UserID;

            const teacherID = changeScheduleRef.current.TeacherID;

            const scheduleID = changeScheduleRef.current.ScheduleID;

            const classDate = changeScheduleRef.current.ClassDate;

            const classHourNO = changeScheduleRef.current.ClassHourNO;

            apiActions.ExchangeTeacherSchedule({UserID:userID,UserType:userType,ScheduleID1:scheduleID,ScheduleID2:selectScheduleRef.current.scheduleID,dispatch}).then(errCode=>{

                if (errCode===0){

                    dispatch({type:SDActions.COMPONENT_CHANGE_SCHEDULE_MODAL_HIDE});

                    dispatch(SDActions.ScheduleModalInfoUpdate({SchoolID:schoolID,TeacherID:teacherID,ScheduleID:scheduleID,ClassDate:classDate,ClassHourNO:classHourNO}));

                    dispatch(ComPageRefresh.ComPageScheduleUpdate());

                    modalInit();

                }

                setLoading(false);

            })

        }else{

            dispatch(appAlert.alertWarn({title:'请选择进行换课的课程'}));

            setLoading(false);

        }

    };


    const changeScheduleHide = () => {

        modalInit();

        dispatch({type:SDActions.COMPONENT_CHANGE_SCHEDULE_MODAL_HIDE});

    };


    const modalInit = () =>{


        setLoading(true);


        setWeekNO(1);


        //当前课程所在的周次
        setOriginWeekNO(1);


        //已选中的节次和日期

        setSelectSchedule({

                weekDay:'',

                classHour:'',

                scheduleID:''

        });

        setSchedule([]);

    };



    //获取每周的开始日期
    let StartDate = '';

    //th
    let ths = [];

    let TimeList = [];

    //计算时间
    if (ItemWeek.length>0){

        StartDate = ItemWeek.find(item=>item.WeekNO===weekNO).StartDate;

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


    /*let FooterClassHourType = '';

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





    return(

        <Modal type={1}

               title='换课'

               visible={Show}

               width={976}

               mask={true}

               className="component-change-schedule-wrapper"

               onCancel={changeScheduleHide}

               onOk={changeScheduleCommit}

        >

            <Loading spinning={loading}>

                <div className="modal-content-wrapper">

                    <div className="week-no-wrapper">

                        <span className={`prev ${weekNO<=1?'disabled':''}`} onClick={weekNO<=1?e=>{}:e=>weekPick(weekNO-1)}>&lt;上一周</span>

                        <span className="now-week">第{weekNO}周</span>

                        <span className={`next ${weekNO>=MaxWeek?'disabled':''}`} onClick={weekNO>=MaxWeek?e=>{}:e=>weekPick(weekNO+1)}>下一周&gt;</span>

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

                                        let NowTime = ToTime(NowDate);

                                        let Time = ToTime(TimeList[i]);

                                        let findIt = '';

                                        //判断当天日期是否大于正在上的日期
                                        if (NowTime<Time){

                                            findIt = schedule.find(it=>it.WeekDay===i&&it.ClassHourNO===item.ClassHourNO);

                                           if (findIt){

                                               CanSelect = true;

                                           }

                                        }else if (NowTime===Time) {//如果当天日期和正在上课日期相同

                                            //如果有现在正在上的课时的话，判断正在上的课时，如果没有的话默认当天不可选择

                                            if (NowClassHourNO&&(item.ClassHourNO>=NowClassHourNO)){

                                                findIt = schedule.find(it=>it.WeekDay===i&&it.ClassHourNO===item.ClassHourNO);

                                                if (findIt){

                                                    CanSelect = true;

                                                }

                                            }

                                        }


                                        if (CanSelect){ //是否可被选择

                                            if (selectSchedule.weekDay===i&&selectSchedule.classHour===item.ClassHourNO){//是否是已选中的课时

                                                tds.push(<td key={i} className={`schedule`} >

                                                    <div className='select active'>已选择</div>

                                                </td>);

                                            }else{

                                                console.log(findIt);

                                                tds.push(<td key={i} className={`schedule`} >

                                                    <div className={`select ${(SubjectID===findIt.SubjectID&&TeacherID===findIt.TeacherID)?'disabled':''}`} onClick={(SubjectID===findIt.SubjectID&&TeacherID===findIt.TeacherID)?()=>{}:e=>{selectClassHour({SelectWeekDay:i,SelectClassHourNO:item.ClassHourNO,scheduleID:findIt.ScheduleID}) }}>

                                                        <div className={"subject-name"}>{findIt.SubjectName}</div>

                                                        <div className={"teacher-name"}>{findIt.TeacherName}</div>

                                                    </div>

                                                </td>);

                                            }

                                            }else{//当都是过去的课程时

                                            tds.push(<td key={i} className={`schedule`} >

                                                <div className={"empty"}></div>

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

                                    <span>第{originWeekNO}周</span>

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

    )

}


const mapStateToProps = (state) =>{

    const { ScheduleDetail } = state;

    const { LoginUser } = state;

    const { ChangeSchedule } = ScheduleDetail;

    return {ChangeSchedule,LoginUser,ScheduleDetail:ScheduleDetail.ScheduleDetail};

};

export default connect(mapStateToProps)(memo(ChangeScheduleModal));