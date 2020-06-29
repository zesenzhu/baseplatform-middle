import AppAlertActions from '../AppAlertActions'

import ApiActions from '../ApiActions';

import ComPageRefresh from '../ComPageRefresh';

//停课弹窗
const STOP_SCHEDULE_SHOW = 'STOP_SCHEDULE_SHOW';

const STOP_SCHEDULE_HIDE = 'STOP_SCHEDULE_HIDE';

const STOP_SCHEDULE_LOADING_HIDE = 'STOP_SCHEDULE_LOADING_HIDE';

const STOP_SCHEDULE_LOADING_SHOW = 'STOP_SCHEDULE_LOADING_SHOW';

const  STOP_SCHEDULE_DATE_CHANGE = 'STOP_SCHEDULE_DATE_CHANGE';

const STOP_SCHEDULE_WEEK_DATE_LOADING_HIDE = 'STOP_SCHEDULE_WEEK_DATE_LOADING_HIDE';

const STOP_SCHEDULE_WEEK_DATE_LOADING_SHOW = 'STOP_SCHEDULE_WEEK_DATE_LOADING_SHOW';

const STOP_SCHEDULE_WEEK_DATE_CHANGE = 'STOP_SCHEDULE_WEEK_DATE_CHANGE';

const STOP_SCHEDULE_INFO_UPDATE = 'STOP_SCHEDULE_INFO_UPDATE';

const STOP_SCHEDULE_CLASSHOUR_CHECKED = 'STOP_SCHEDULE_CLASSHOUR_CHECKED';

const STOP_SCHEDULE_PERIOD_GRADE_CHECKED = 'STOP_SCHEDULE_PERIOD_GRADE_CHECKED';

//日期变更
const dateChange = (date) => {

        return (dispatch,getState) => {

            dispatch({type:STOP_SCHEDULE_DATE_CHANGE,data:date});

            if (date === ''){

                dispatch({type:STOP_SCHEDULE_WEEK_DATE_CHANGE,data:{weekDay:'',weekNO:''}});

            }else{

                dispatch({type:STOP_SCHEDULE_WEEK_DATE_LOADING_SHOW});

                let { SchoolID } = getState().LoginUser;

                ApiActions.GetWeekInfoByDate({SchoolID,ClassDate:date,dispatch}).then(data => {

                    if (data){

                        const { WeekNO,WeekDay } = data;

                        let weekDay = '';

                        switch (WeekDay) {

                            case 0:

                                weekDay = '星期一';

                                break;

                            case 1:

                                weekDay = '星期二';

                                break;

                            case 2:

                                weekDay = '星期三';

                                break;

                            case 3:

                                weekDay = '星期四';

                                break;

                            case 4:

                                weekDay = '星期五';

                                break;

                            case 5:

                                weekDay = '星期六';

                                break;

                            case 6:

                                weekDay = '星期日';

                                break;

                            default:

                                weekDay = '星期一';

                        }

                        dispatch({type:STOP_SCHEDULE_WEEK_DATE_CHANGE,data:{weekDay:weekDay,weekNO:WeekNO}});

                        dispatch({type:STOP_SCHEDULE_WEEK_DATE_LOADING_HIDE});

                    }else{

                        dispatch({type:STOP_SCHEDULE_WEEK_DATE_LOADING_HIDE});

                    }

                })

            }

        }

};

//弹窗信息初始化
const InfoInit = () => {

    return (dispatch,getState) => {

        dispatch({type:STOP_SCHEDULE_LOADING_SHOW});

        let { SchoolID } = getState().LoginUser;

        let Periods = getState().PeriodWeekTerm.ItemPeriod;

        ApiActions.GetAllOptionForAddSchedule({SchoolID,dispatch}).then(data => {

            let Grades = data.ItemGrade;

            let ItemClassHour = data.ItemClassHour;

            let periodGrades = Periods.map(item => {

                let list = Grades.map(i => {

                    if (i.PeriodID === item.PeriodID){

                        return {

                            id:i.GradeID,

                            name:i.GradeName,

                            checked:false

                        }

                    }else{

                        return;

                    }

                }).filter(itm => itm !== undefined);

                return {

                    id:item.PeriodID,

                    name:item.PeriodName,

                    checked:false,

                    list

                }

            });

            let periodGradesPlainOpts = Periods.map(item => {

                let list = Grades.map(i => {

                    if (i.PeriodID === item.PeriodID){

                        return i.GradeID;

                    }else{

                        return;

                    }

                }).filter(itm => itm !== undefined);

                return {

                    id:item.PeriodID,

                    list

                }

            });

            let periodGradesCheckedList = Periods.map(item => {

                let list = [];

                return {

                    id:item.PeriodID,

                    checked:false,

                    list

                }

            });

            let classHours = [];

            let morning = {type:1,name:"上午",list:[]};

            let afternoon = {type:2,name:"下午",list:[]};

            let tonight = {type:3,name:"晚上",list:[]};

            ItemClassHour.map(item => {

                if (item.ClassHourType === 1){

                    morning['list'].push({no:item.ClassHourNO,name:item.ClassHourName});

                }else if (item.ClassHourType === 2){

                    afternoon['list'].push({no:item.ClassHourNO,name:item.ClassHourName});

                }else if (item.ClassHourType === 3){

                    tonight['list'].push({no:item.ClassHourNO,name:item.ClassHourName});

                }

            });

            if (morning.list.length > 0){

                classHours.push(morning);

            }

            if (afternoon.list.length > 0){

                classHours.push(afternoon);

            }

            if (tonight.list.length > 0){

                classHours.push(tonight);

            }

            let classHoursPlainOpts = classHours.map(item => {

                let list = [];

                item.list.map(i => {

                    list.push(i.no);

                });

                return {

                    type:item.type,

                    list

                }

            });

            let classHoursCheckedList = classHours.map(item => {

                let list = [];

                return {

                    type:item.type,

                    checked:false,

                    list

                }

            });

            dispatch({type:STOP_SCHEDULE_INFO_UPDATE,data:{

                    periodGrades,

                    periodGradesPlainOpts,

                    periodGradesCheckedList,

                    classHours,

                    classHoursPlainOpts,

                    classHoursCheckedList

                }});

            dispatch({type:STOP_SCHEDULE_LOADING_HIDE});

        });

    }

};

//点击课时

const classHoursChecked = (opts) => {

    return (dispatch,getState) => {

        const { classHoursCheckedList,classHoursPlainOpts } = getState().Manager.StopScheduleModal;

        let checkedList = [];

        if (opts.type === 'noon'){

            checkedList = classHoursCheckedList.map((item) => {

                if (item.type === opts.id){
                    //判断状态如果是已选改为未选
                    if (item.checked){

                        return{

                            type:item.type,

                            checked:false,

                            list:[]

                        }

                    }else{//如果是未选改为已选

                        let list = [];

                        classHoursPlainOpts.map(i => {

                            if (i.type === item.type){

                                list = i.list;

                            }

                        });

                        return {

                            type:item.type,

                            checked:true,

                            list

                        }

                    }

                }else{

                    return item;

                }

            });

        }else{

            checkedList = classHoursCheckedList.map(item => {

                if (item.type === opts.pid){

                    //如果已经选中，去除选中的状态
                    if (item.list.includes(opts.id)){

                        item.list.remove(opts.id);

                        return {

                            type:item.type,

                            checked:false,

                            list:item.list

                        }

                    }else{//没有选中。先选中然后判断上一层的状态

                        item.list.push(opts.id);

                        let plainOptions = [];

                        classHoursPlainOpts.map(i => {

                            if (i.type === item.type){

                                plainOptions = i.list;

                            }

                        });

                        //判断是否是需要置为全选
                        if(item.list.length === plainOptions.length){//需要全选

                            return{

                                type:item.type,

                                checked:true,

                                list:item.list

                            }

                        }else{//不需要全选

                            return{

                                type:item.type,

                                checked:false,

                                list:item.list

                            }

                        }

                    }

                }else{

                    return item;

                }

            });

        }

        dispatch({type:STOP_SCHEDULE_CLASSHOUR_CHECKED,data:{classHoursCheckedList:checkedList}});

    }

};


//点击年级选中
const periodChecked = (opts) => {

    return (dispatch,getState) => {

        const { periodGradesCheckedList,periodGradesPlainOpts } = getState().Manager.StopScheduleModal;

        let checkedList = [];

        if (opts.type === 'period'){

            checkedList = periodGradesCheckedList.map((item) => {

                if (item.id === opts.id){
                    //判断状态如果是已选改为未选
                    if (item.checked){

                        return{

                            id:item.id,

                            checked:false,

                            list:[]

                        }

                    }else{//如果是未选改为已选

                        let list = [];

                        periodGradesPlainOpts.map(i => {

                            if (i.id === item.id){

                                list = i.list;

                            }

                        });

                        return {

                            id:item.id,

                            checked:true,

                            list

                        }

                    }

                }else{

                    return item;

                }

            });

        }else{

            checkedList = periodGradesCheckedList.map(item => {

                if (item.id === opts.pid){

                    console.log(opts,item.list);
                    //如果已经选中，去除选中的状态
                    if (item.list.includes(opts.id)){

                        item.list.remove(opts.id);

                        return {

                            id:item.id,

                            checked:false,

                            list:item.list

                        }

                    }else{//没有选中。先选中然后判断上一层的状态

                        item.list.push(opts.id);

                        let plainOptions = [];

                        periodGradesPlainOpts.map(i => {

                            if (i.id === item.id){

                                plainOptions = i.list;

                            }

                        });

                        //判断是否是需要置为全选
                        if(item.list.length === plainOptions.length){//需要全选

                            return{

                                id:item.id,

                                checked:true,

                                list:item.list

                            }

                        }else{//不需要全选

                            return{

                                id:item.id,

                                checked:false,

                                list:item.list

                            }

                        }

                    }

                }else{

                    return item;

                }

            });

        }

        dispatch({type:STOP_SCHEDULE_PERIOD_GRADE_CHECKED,data:{periodGradesCheckedList:checkedList}});

    }

};

//隐藏弹窗
const hideAlert = (dispatch) => {

    return  () =>dispatch({type:AppAlertActions.APP_ALERT_HIDE});

};

//提交弹窗信息
const commitInfo = (that) => {

    return (dispatch,getState) => {

        dispatch({type:STOP_SCHEDULE_LOADING_SHOW});

        const { date,periodGradesCheckedList,classHoursCheckedList } = getState().Manager.StopScheduleModal;

        //判断是否全部都已经选择完毕
        let gradeChecked = false;

        periodGradesCheckedList.map(item => {

            if (item.checked){

                gradeChecked = true;

            }else {

                if (item.list.length > 0){

                    gradeChecked = true

                }

            }



        });

        let classHoursChecked = false;

        classHoursCheckedList.map(item => {

            if (item.checked){

                classHoursChecked = true;

            }else {

                if (item.list.length > 0){

                    classHoursChecked = true

                }

            }

        });


        if (!gradeChecked){

            // dispatch(AppAlertActions.alertWarn({title:"请选择需要停课的年级！"}));

            that.setState({GradeTips:true});

            dispatch({type:STOP_SCHEDULE_LOADING_HIDE});

        }

        if (!classHoursChecked){

            // dispatch(AppAlertActions.alertWarn({title:"请选择需要暂停的课时！"}));

            that.setState({ScheduleTips:true});

            dispatch({type:STOP_SCHEDULE_LOADING_HIDE});

        }

        if (date === ''){

            // dispatch(AppAlertActions.alertWarn({title:"请选择需要停课的日期！"}));

            that.setState({DateTips:true});

            dispatch({type:STOP_SCHEDULE_LOADING_HIDE});

        }

        if (gradeChecked&&classHoursChecked&&(date!=='')){

            let ClassDate = date;

            let ClassHours = classHoursCheckedList.map(item => {

                if (item.list.length > 0){

                    return item.list;

                }else{

                    return;

                }

            }).filter(i => i!==undefined).join(',');

            let Grades = periodGradesCheckedList.map(item => {

                if (item.list.length > 0){

                    return item.list;

                }else{

                    return;

                }

            }).filter(i => i!==undefined).join(',');

            let { UserID,UserType,SchoolID } = getState().LoginUser;

            ApiActions.BatchCloseSchedule({

                SchoolID,UserID,UserType,ClassHours,ClassDate,Grades,dispatch

            }).then(data => {

                if (data===0){

                    dispatch({type:STOP_SCHEDULE_HIDE});

                   dispatch(AppAlertActions.alertSuccess({title:"停课成功！"}));

                    ComPageRefresh.ComPageUpdate(dispatch);

                }

                dispatch({type:STOP_SCHEDULE_LOADING_HIDE});

            });



        }

    }

};

export default {

    STOP_SCHEDULE_SHOW,

    STOP_SCHEDULE_LOADING_HIDE,

    STOP_SCHEDULE_LOADING_SHOW,

    STOP_SCHEDULE_DATE_CHANGE,

    STOP_SCHEDULE_WEEK_DATE_LOADING_HIDE,

    STOP_SCHEDULE_WEEK_DATE_LOADING_SHOW,

    STOP_SCHEDULE_WEEK_DATE_CHANGE,

    STOP_SCHEDULE_INFO_UPDATE,

    STOP_SCHEDULE_CLASSHOUR_CHECKED,

    STOP_SCHEDULE_PERIOD_GRADE_CHECKED,

    STOP_SCHEDULE_HIDE,

    dateChange,

    classHoursChecked,

    periodChecked,

    commitInfo,

    InfoInit

}