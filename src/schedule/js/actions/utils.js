import AppAlertActions from './AppAlertActions';

import moment from 'moment';

//移除重复的课表
const ScheduleRemoveRepeat = (Schedule) =>{

    let NewSchedule = [];

    let UniqueSchedule = Array.from(new Set(Schedule));

    UniqueSchedule.map(item=>{

        const FindIndex = NewSchedule.findIndex(i=>((i.WeekDay===item.WeekDay)&&(i.ClassHourNO===item.ClassHourNO)));

        if (FindIndex>=0){

            if (parseInt(item.IsOver)===0){

                NewSchedule.splice(FindIndex,1,item)

            }

        }else{

            NewSchedule.push(item);

        }

    });

    return NewSchedule;

};

//搜索正则
const SearchReg = ({key,type,dispatch,ErrorTips}) => {

    let pattern = '';

     if (type===1){

        pattern =  /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/

     }else{

         pattern =  /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/

     }

     if (pattern.test(key)){

         return true;

     }else{

        dispatch(AppAlertActions.alertWarn({title:ErrorTips}));

        return false;

     }


};

//限制日期

const DateDisabled = (current) => {

    return (dispatch,getState)=>{

        const { NowDate,ItemWeek } = getState().PeriodWeekTerm;

        let LastDate = ItemWeek[ItemWeek.length-1].EndDate;

        return current>=moment(LastDate).add(1,'days')||current<moment(NowDate);

    }

};




//获取节日

export const getFestival = (time)=>{

    const month = time.get("month");

    const date = time.get("date");

    let title = '';

    if ((month == 0) && (date == 1)) title = "元旦";

    if ((month == 2) && (date == 8)) title = "妇女节";

    if ((month == 4) && (date == 4)) title = "青年节";

    if ((month == 4) && (date == 1)) title = "劳动节";

    if ((month == 5) && (date == 1)) title = "儿童节";

    if ((month == 6) && (date == 1)) title = "建党节";

    if ((month == 7) && (date == 1)) title = "建军节";

    if ((month == 8) && (date == 10)) title = "教师节";

    if ((month == 9) && (date == 1)) title = "国庆节";

    return title;

};



export default {

    ScheduleRemoveRepeat,

    SearchReg,

    DateDisabled

}