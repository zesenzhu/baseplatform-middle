import ComPageRefresh from '../ComPageRefresh';

import AppAlertActions from '../../actions/AppAlertActions';

import ApiActions from '../../actions/ApiActions';

const ADJUST_BY_TIME_SHOW = 'ADJUST_BY_TIME_SHOW';

const ADJUST_BY_TIME_HIDE = 'ADJUST_BY_TIME_HIDE';

const ADJUST_BY_TIME_LOADING_HIDE = 'ADJUST_BY_TIME_LOADING_HIDE';

const ADJUST_BY_TIME_LOADING_SHOW = 'ADJUST_BY_TIME_LOADING_SHOW';

const ADJUST_BY_TIME_INFO_UPDATE = 'ADJUST_BY_TIME_INFO_UPDATE';

const ADJUST_BY_TIME_PERIOD_GRADE_CHECKED = 'ADJUST_BY_TIME_PERIOD_GRADE_CHECKED';

const ADJUST_BY_TIME_NEW_CLASSHOUR_CHECKED = 'ADJUST_BY_TIME_NEW_CLASSHOUR_CHECKED';

const ADJUST_BY_TIME_OLD_CLASSHOUR_CHECKED = 'ADJUST_BY_TIME_OLD_CLASSHOUR_CHECKED';

const ADJUST_BY_TIME_OLD_DATE_UPDATE = 'ADJUST_BY_TIME_OLD_DATE_UPDATE';

const ADJUST_BY_TIME_NEW_DATE_UPDATE = 'ADJUST_BY_TIME_NEW_DATE_UPDATE';

const ADJUST_BY_TIME_NEW_WEEK_DATE_UPDATE = 'ADJUST_BY_TIME_NEW_WEEK_DATE_UPDATE';

const ADJUST_BY_TIME_OLD_WEEK_DATE_UPDATE = 'ADJUST_BY_TIME_OLD_WEEK_DATE_UPDATE';

const ADJUST_BY_TIME_OLD_WEEK_DATE_LOADING_SHOW = 'ADJUST_BY_TIME_OLD_WEEK_DATE_LOADING_SHOW';

const ADJUST_BY_TIME_OLD_WEEK_DATE_LOADING_HIDE = 'ADJUST_BY_TIME_OLD_WEEK_DATE_LOADING_HIDE';

const ADJUST_BY_TIME_NEW_WEEK_DATE_LOADING_HIDE = 'ADJUST_BY_TIME_NEW_WEEK_DATE_LOADING_HIDE';

const ADJUST_BY_TIME_NEW_WEEK_DATE_LOADING_SHOW = 'ADJUST_BY_TIME_NEW_WEEK_DATE_LOADING_SHOW';

//初始化弹窗信息
const InfoInit = () => {

    return (dispatch,getState) => {

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

            let oldClassHours = [];

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

                oldClassHours.push(morning);

            }

            if (afternoon.list.length > 0){

                oldClassHours.push(afternoon);

            }

            if (tonight.list.length > 0){

                oldClassHours.push(tonight);

            }

            let newClassHours = JSON.parse(JSON.stringify(oldClassHours));

            let oldClassHourPlainOpts = oldClassHours.map(item => {

                let list = [];

               item.list.map(i => {

                   list.push(i.no);

               });

               return {

                   type:item.type,

                   list

               }

            });

            let oldClassHourCheckedList = oldClassHours.map(item => {

                let list = [];

                return {

                    type:item.type,

                    checked:false,

                    list

                }

            });

            let newClassHourPlainOpts = JSON.parse(JSON.stringify(oldClassHourPlainOpts));

            let newClassHourCheckedList = JSON.parse(JSON.stringify(oldClassHourCheckedList));

            dispatch({type:ADJUST_BY_TIME_INFO_UPDATE,data:{

                    periodGrades,

                    periodGradesPlainOpts,

                    periodGradesCheckedList,

                    oldClassHours,

                    oldClassHourPlainOpts,

                    oldClassHourCheckedList,

                    newClassHours,

                    newClassHourPlainOpts,

                    newClassHourCheckedList

            }});

            dispatch({type:ADJUST_BY_TIME_LOADING_HIDE});

        });

    }

};

//点击年级选中
const periodChecked = (opts) => {

    return (dispatch,getState) => {

        const { periodGradesCheckedList,periodGradesPlainOpts } = getState().Manager.AdjustByTimeModal;

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

        dispatch({type:ADJUST_BY_TIME_PERIOD_GRADE_CHECKED,data:{periodGradesCheckedList:checkedList}});

    }

};


//点击旧课时选中
const oldClassHourChecked = (opts) => {

    return (dispatch,getState) => {

        const { oldClassHourCheckedList,oldClassHourPlainOpts } = getState().Manager.AdjustByTimeModal;

        let checkedList = [];

        if (opts.type === 'noon'){

            checkedList = oldClassHourCheckedList.map((item) => {

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

                        oldClassHourPlainOpts.map(i => {

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

            checkedList = oldClassHourCheckedList.map(item => {

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

                        oldClassHourPlainOpts.map(i => {

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

        dispatch({type:ADJUST_BY_TIME_OLD_CLASSHOUR_CHECKED,data:{oldClassHourCheckedList:checkedList}});

    }

};

//点击新课时选中
const newClassHourChecked = (opts) => {

    return (dispatch,getState) => {

        const { newClassHourCheckedList,newClassHourPlainOpts } = getState().Manager.AdjustByTimeModal;

        let checkedList = [];

        if (opts.type === 'noon'){

            checkedList = newClassHourCheckedList.map((item) => {

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

                        newClassHourPlainOpts.map(i => {

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

            checkedList = newClassHourCheckedList.map(item => {

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

                        newClassHourPlainOpts.map(i => {

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

        dispatch({type:ADJUST_BY_TIME_NEW_CLASSHOUR_CHECKED,data:{newClassHourCheckedList:checkedList}});

    }

};


//旧日期变更
const oldDateUpdate = (date) => {

    return (dispatch,getState) => {

        dispatch({type:ADJUST_BY_TIME_OLD_DATE_UPDATE,data:date});

        if (date === ''){

            dispatch({type:ADJUST_BY_TIME_OLD_WEEK_DATE_UPDATE,data:{weekDay:'',weekNo:''}});

        }else{

            dispatch({type:ADJUST_BY_TIME_OLD_WEEK_DATE_LOADING_SHOW});

            let { SchoolID } = getState().LoginUser;

            ApiActions.GetWeekInfoByDate({

                SchoolID,ClassDate:date,dispatch

            }).then(data => {

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

                    dispatch({type:ADJUST_BY_TIME_OLD_WEEK_DATE_UPDATE,data:{weekDay:weekDay,weekNo:WeekNO}});

                    dispatch({type:ADJUST_BY_TIME_OLD_WEEK_DATE_LOADING_HIDE});

                }else{

                    dispatch({type:ADJUST_BY_TIME_OLD_WEEK_DATE_LOADING_HIDE});

                }

            })

        }

    }

};

//新的日期变更
const newDateUpdate = (date) => {

    return (dispatch,getState) => {

        dispatch({type:ADJUST_BY_TIME_NEW_DATE_UPDATE,data:date});

        if (date === ''){

            dispatch({type:ADJUST_BY_TIME_NEW_WEEK_DATE_UPDATE,data:{weekDay:'',weekNo:''}});

        }else{

            dispatch({type:ADJUST_BY_TIME_NEW_WEEK_DATE_LOADING_SHOW});

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

                    dispatch({type:ADJUST_BY_TIME_NEW_WEEK_DATE_UPDATE,data:{weekDay:weekDay,weekNo:WeekNO}});

                    dispatch({type:ADJUST_BY_TIME_NEW_WEEK_DATE_LOADING_HIDE});

                }else{

                    dispatch({type:ADJUST_BY_TIME_NEW_WEEK_DATE_LOADING_HIDE});

                }

            })

        }

    }

};




//提交弹窗内容

const commitInfo = (that) => {

    return (dispatch,getState) => {

        dispatch({type:ADJUST_BY_TIME_LOADING_SHOW});

        const { oldDate,newDate,periodGradesCheckedList,oldClassHourCheckedList,newClassHourCheckedList } = getState().Manager.AdjustByTimeModal;

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

        let oldClassHourChecked = false;

        oldClassHourCheckedList.map(item => {

            if (item.checked){

                oldClassHourChecked = true;

            }else {

                if (item.list.length > 0){

                    oldClassHourChecked = true

                }

            }

        });

        let newClassHourChecked = false;

        newClassHourCheckedList.map(item => {

            if (item.checked){

                newClassHourChecked = true;

            }else {

                if (item.list.length > 0){

                    newClassHourChecked = true

                }

            }



        });

        let oldClassHourCheckedLength = 0;

        oldClassHourCheckedList.map(item => {

            oldClassHourCheckedLength = oldClassHourCheckedLength + item.list.length;

        });

        let newClassHourCheckedLength = 0;

        newClassHourCheckedList.map(item => {

            newClassHourCheckedLength = newClassHourCheckedLength + item.list.length;

        });

        if (!gradeChecked){

            // dispatch(AppAlertActions.alertWarn({title:"请选择需要调整的年级！"}));

            that.setState({GradeTips:true});

            dispatch({type:ADJUST_BY_TIME_LOADING_HIDE});

        }

        if (!oldClassHourChecked){

            // dispatch(AppAlertActions.alertWarn({title:"请选择调整前课时！"}));

            that.setState({BeforeScheduleTips:true});

            dispatch({type:ADJUST_BY_TIME_LOADING_HIDE});

        }

        if (!newClassHourChecked){

            // dispatch(AppAlertActions.alertWarn({title:"请选择调整后课时！"}));

            that.setState({AfterScheduleTips:true});

            dispatch({type:ADJUST_BY_TIME_LOADING_HIDE});

        }

        if (oldDate === ''){

            // dispatch(AppAlertActions.alertWarn({title:"请选择调整前日期！"}));

            that.setState({BeforeTimeTips:true});

            dispatch({type:ADJUST_BY_TIME_LOADING_HIDE});

        }

        if (newDate === ''){

            // dispatch(AppAlertActions.alertWarn({title:"请选择调整后日期！"}));

            that.setState({AfterTimeTips:true});

            dispatch({type:ADJUST_BY_TIME_LOADING_HIDE});

        }

        if (oldClassHourCheckedLength !== newClassHourCheckedLength){

            dispatch(AppAlertActions.alertWarn({title:"调整前后的课时数量应一致"}));

            dispatch({type:ADJUST_BY_TIME_LOADING_HIDE});

        }


        if (gradeChecked&&oldClassHourChecked&&newClassHourChecked&&newDate&&oldDate&&(oldClassHourCheckedLength === newClassHourCheckedLength)){

            let ClassDate1 = oldDate;

            let ClassDate2 = newDate;

            let ClassHours1 = oldClassHourCheckedList.map(item => {

                if (item.list.length > 0){

                    return item.list;

                }else{

                    return;

                }

            }).filter(i => i!==undefined).join(',');

            let ClassHours2 = newClassHourCheckedList.map(item => {

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

            let { UserID } = getState().LoginUser;

            ApiActions.BatchEditClassDate(

                {UserID,ClassDate1,ClassDate2,ClassHours1,ClassHours2,Grades,dispatch}

            ).then(data => {

               if (data===0){

                   dispatch({type:ADJUST_BY_TIME_HIDE});

                   dispatch(AppAlertActions.alertSuccess({title:"调整成功！"}));

                   // ComPageRefresh.ComPageUpdate(dispatch);

	               dispatch(ComPageRefresh.ComPageScheduleBetterUpdate());

               }

                dispatch({type:ADJUST_BY_TIME_LOADING_HIDE});

            });

        }

    }

};

const hideAlert = (dispatch) => {

   return  () =>dispatch({type:AppAlertActions.APP_ALERT_HIDE});

};


//自定义的数组去除方法
Array.prototype.indexOf = function(val) {

    for (var i = 0; i < this.length; i++) {

        if (this[i] === val) return i;

    }

    return -1;

};
//自定义的数组去除方法
Array.prototype.remove = function(val) {

    var index = this.indexOf(val);

    if (index > -1) {

        this.splice(index, 1);

    }

};


export default {

    ADJUST_BY_TIME_HIDE,

    ADJUST_BY_TIME_SHOW,

    ADJUST_BY_TIME_LOADING_HIDE,

    ADJUST_BY_TIME_LOADING_SHOW,

    ADJUST_BY_TIME_INFO_UPDATE,

    ADJUST_BY_TIME_PERIOD_GRADE_CHECKED,

    ADJUST_BY_TIME_OLD_CLASSHOUR_CHECKED,

    ADJUST_BY_TIME_NEW_CLASSHOUR_CHECKED,

    ADJUST_BY_TIME_NEW_DATE_UPDATE,

    ADJUST_BY_TIME_OLD_DATE_UPDATE,

    ADJUST_BY_TIME_NEW_WEEK_DATE_UPDATE,

    ADJUST_BY_TIME_OLD_WEEK_DATE_UPDATE,

    ADJUST_BY_TIME_NEW_WEEK_DATE_LOADING_SHOW,

    ADJUST_BY_TIME_NEW_WEEK_DATE_LOADING_HIDE,

    ADJUST_BY_TIME_OLD_WEEK_DATE_LOADING_HIDE,

    ADJUST_BY_TIME_OLD_WEEK_DATE_LOADING_SHOW,

    InfoInit,

    periodChecked,

    oldClassHourChecked,

    newClassHourChecked,

    oldDateUpdate,

    newDateUpdate,

    commitInfo

}