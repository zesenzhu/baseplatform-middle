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

export default {

    ScheduleRemoveRepeat,

    SearchReg,

    DateDisabled

}