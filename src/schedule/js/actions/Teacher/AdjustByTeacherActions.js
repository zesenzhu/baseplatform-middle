import React from 'react';

import utils from '../utils';

import AppAlertActions from '../AppAlertActions';

import ApiActions from "../ApiActions";

import ComPageRefresh from '../ComPageRefresh';

//关于弹窗公共部分
const ADJUST_BY_TEACHER_SHOW = 'ADJUST_BY_TEACHER_SHOW';

const ADJUST_BY_TEACHER_HIDE = 'ADJUST_BY_TEACHER_HIDE';

const ADJUST_BY_TEACHER_TEACHER_LIST_UPDATE = 'ADJUST_BY_TEACHER_TEACHER_LIST_UPDATE';

const ADJUST_BY_TEACHER_TAB_CHANGE = 'ADJUST_BY_TEACHER_TAB_CHANGE';

const ADJUST_BY_TEACHER_LOADING_SHOW = 'ADJUST_BY_TEACHER_LOADING_SHOW';

const ADJUST_BY_TEACHER_LOADING_HIDE = 'ADJUST_BY_TEACHER_LOADING_HIDE';

const ADJUST_BY_TEACHER_CLASS_HOURS_LIST_UPDATE = 'ADJUST_BY_TEACHER_CLASS_HOURS_LIST_UPDATE';

const ADJUST_BY_TEACHER_CLASS_ROOM_TYPE_LIST_UPDATE = 'ADJUST_BY_TEACHER_CLASS_ROOM_TYPE_LIST_UPDATE';


const REPLACE_SHCEDULE_ERROR_TIPS_SHOW = 'REPLACE_SHCEDULE_ERROR_TIPS_SHOW';

const REPLACE_SHCEDULE_ERROR_TIPS_HIDE = 'REPLACE_SHCEDULE_ERROR_TIPS_HIDE';

const CHANGE_SHCEDULE_ERROR_TIPS_SHOW = 'CHANGE_SHCEDULE_ERROR_TIPS_SHOW';

const CHANGE_SHCEDULE_ERROR_TIPS_HIDE = 'CHANGE_SHCEDULE_ERROR_TIPS_HIDE';

const CHANGE_TIME_ERROR_TIPS_SHOW = 'CHANGE_TIME_ERROR_TIPS_SHOW';

const CHANGE_TIME_ERROR_TIPS_HIDE = 'CHANGE_TIME_ERROR_TIPS_HIDE';

const CHANGE_CLASS_ROOM_ERROR_TIPS_SHOW = 'CHANGE_CLASS_ROOM_ERROR_TIPS_SHOW';

const CHANGE_CLASS_ROOM_ERROR_TIPS_HIDE = 'CHANGE_CLASS_ROOM_ERROR_TIPS_HIDE';

const STOP_SCHEDULE_ERROR_TIPS_SHOW = 'STOP_SCHEDULE_ERROR_TIPS_SHOW';

const STOP_SCHEDULE_ERROR_TIPS_HIDE = 'STOP_SCHEDULE_ERROR_TIPS_HIDE';


//找人代课


const REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_SHOW = 'REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_SHOW';

const REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_HIDE = 'REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_HIDE';

const REPLACE_SHCEDULE_CLASS_LIST_UPDATE = 'REPLACE_SHCEDULE_CLASS_LIST_UPDATE';

const REPLACE_SHCEDULE_TEACHER_DROP_CHANGE = 'REPLACE_SHCEDULE_TEACHER_DROP_CHANGE';

const REPLACE_SHCEDULE_TEACHER_SEARCH_OPEN = 'REPLACE_SHCEDULE_TEACHER_SEARCH_OPEN';

const REPLACE_SHCEDULE_TEACHER_SEARCH_CLOSE = 'REPLACE_SHCEDULE_TEACHER_SEARCH_CLOSE';

const REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_SHOW = 'REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_SHOW';

const REPLACE_SHCEDULE_TEACHER_SEARCH_LIST_UPDATE = 'REPLACE_SHCEDULE_TEACHER_SEARCH_LIST_UPDATE';

const REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_HIDE = 'REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_HIDE';





const REPLACE_SHCEDULE_REPLACE_TEACHER_DROP_CHANGE = 'REPLACE_SHCEDULE_REPLACE_TEACHER_DROP_CHANGE';

const REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_OPEN = 'REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_OPEN';

const REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_CLOSE = 'REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_CLOSE';

const REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_SHOW = 'REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_SHOW';

const REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LIST_UPDATE = 'REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LIST_UPDATE';

const REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_HIDE = 'REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_HIDE';

const REPLACE_SHCEDULE_CLASS_CHECKED = 'REPLACE_SHCEDULE_CLASS_CHECKED';

const REPLACE_SHCEDULE_RADIO_CHANGE = 'REPLACE_SHCEDULE_RADIO_CHANGE';

const REPLACE_SHCEDULE_MONTHS_LIST_UPDATE = 'REPLACE_SHCEDULE_MONTHS_LIST_UPDATE';

const REPLACE_SHCEDULE_MONTHS_CHECKED = 'REPLACE_SHCEDULE_MONTHS_CHECKED';

const REPLACE_SHCEDULE_WEEK_LIST_UPDATE = 'REPLACE_SHCEDULE_WEEK_LIST_UPDATE';

const REPLACE_SHCEDULE_WEEK_CHECKED = 'REPLACE_SHCEDULE_WEEK_CHECKED';

const REPLACE_SHCEDULE_DATE_CHECKED = 'REPLACE_SHCEDULE_DATE_CHECKED';

const REPLACE_SHCEDULE_DATE_HEIGHT_CHANGE = 'REPLACE_SHCEDULE_DATE_HEIGHT_CHANGE';

const REPLACE_SHCEDULE_CLASSHOUR_DATE_CHECKED = 'REPLACE_SHCEDULE_CLASSHOUR_DATE_CHECKED';

const REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_HIDE = 'REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_HIDE';

const REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_SHOW = 'REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_SHOW';

const REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_UPDATE = 'REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_UPDATE';

const REPLACE_SHCEDULE_CLASSHOUR_LOADING_SHOW = 'REPLACE_SHCEDULE_CLASSHOUR_LOADING_SHOW';

const REPLACE_SHCEDULE_CLASSHOUR_LOADING_HIDE = 'REPLACE_SHCEDULE_CLASSHOUR_LOADING_HIDE';

const REPLACE_SHCEDULE_CLASSHOUR_LIST_CHANGE = 'REPLACE_SHCEDULE_CLASSHOUR_LIST_CHANGE';

const REPLACE_SHCEDULE_CLASSHOUR_CHECKED_LIST_CHANGE = 'REPLACE_SHCEDULE_CLASSHOUR_CHECKED_LIST_CHANGE';

//月份取消loading

const TEACHER_REPLACE_SHCEDULE_MONTHS_LOADING_HIDE = 'TEACHER_REPLACE_SHCEDULE_MONTHS_LOADING_HIDE';


//周次取消loading

const TEACHER_REPLACE_SHCEDULE_WEEKS_LOADING_HIDE = 'TEACHER_REPLACE_SHCEDULE_WEEKS_LOADING_HIDE';


//与人换课
const CHANGE_SHCEDULE_ORIGIN_TEACHER_DROP_CHANGE = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_DROP_CHANGE';

const CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_OPEN = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_OPEN';

const CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_CLOSE = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_CLOSE';

const CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LOADING_SHOW = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LOADING_SHOW';

const CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LIST_UPDATE = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LIST_UPDATE';

const CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LOADING_HIDE = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LOADING_HIDE';

const CHANGE_SHCEDULE_ORIGIN_TEACHER_DATE_PICK = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_DATE_PICK';

const  CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_ABLED = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_ABLED';

const CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_LIST_UPDATE = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_LIST_UPDATE';

const CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DROP_SELECTD = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DROP_SELECTD';

const CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DISABLED = 'CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DISABLED';


const CHANGE_SHCEDULE_TARGET_TEACHER_DROP_CHANGE = 'CHANGE_SHCEDULE_TARGET_TEACHER_DROP_CHANGE';

const CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_OPEN = 'CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_OPEN';

const CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_CLOSE = 'CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_CLOSE';

const CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_SHOW = 'CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_SHOW';

const CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LIST_UPDATE = 'CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LIST_UPDATE';

const CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_HIDE = 'CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_HIDE';

const CHANGE_SHCEDULE_TARGET_TEACHER_DATE_PICK = 'CHANGE_SHCEDULE_TARGET_TEACHER_DATE_PICK';

const  CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_ABLED = 'CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_ABLED';

const CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_LIST_UPDATE = 'CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_LIST_UPDATE';

const CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DROP_SELECTD = 'CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DROP_SELECTD';

const CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DISABLED = 'CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DISABLED';





//调整时间

const CHANGE_TIME_TEACHER_DROP_CHANGE = 'CHANGE_TIME_TEACHER_DROP_CHANGE';

const CHANGE_TIME_ORIGIN_CHANGE = 'CHANGE_TIME_ORIGIN_CHANGE';

const CHANGE_TIME_NEW_CHANGE = 'CHANGE_TIME_NEW_CHANGE';


//调整教室

const CHANGE_CLASS_ROOM_TEACHER_CHANGE = 'CHANGE_CLASS_ROOM_TEACHER_CHANGE';

const CHANGE_CLASS_ROOM_WEEK_TIME_CHANGE = 'CHANGE_TIME_WEEK_TIME_CHANGE';

const CHANGE_CLASS_ROOM_CLASS_HOUR_CHANGE = 'CHANGE_TIME_CLASS_HOUR_CHANGE';

const CHANGE_CLASS_ROOM_DATE_CHANGE = 'CHANGE_CLASS_ROOM_DATE_CHANGE';

const CHANGE_CLASS_ROOM_TEACHER_CLASSROOM_LIST_CHANGE = 'CHANGE_CLASS_ROOM_TEACHER_CLASSROOM_LIST_CHANGE';

const CHANGE_CLASS_ROOM_TEACHER_CLASSROOM_CHANGE = 'CHANGE_CLASS_ROOM_TEACHER_CLASSROOM_CHANGE';

const CHANGE_CLASS_ROOM_CLASSROOM_CHANGE = 'CHANGE_CLASS_ROOM_CLASSROOM_CHANGE';


//停课

const STOP_SCHEDULE_TEACHER_CHANGE = 'STOP_SCHEDULE_TEACHER_CHANGE';

const STOP_SCHEDULE_TEACHER_CLASSHOUR_CHANGE = 'STOP_SCHEDULE_TEACHER_CLASSHOUR_CHANGE';

const STOP_SCHEDULE_DATE_PICK = 'STOP_SCHEDULE_DATE_PICK';

const STOP_SCHEDULE_CLASSHOUR_LOADING_SHOW = 'STOP_SCHEDULE_CLASSHOUR_LOADING_SHOW';

const STOP_SCHEDULE_CLASSHOUR_LOADING_HIDE = 'STOP_SCHEDULE_CLASSHOUR_LOADING_HIDE';


//找人代课初始化
const AdjustByTeacherScheduleInit = () => {

    return ( dispatch,getState ) => {

        let { UserID,SchoolID } = getState().LoginUser;

        ApiActions.GetAllOptionForAddSchedule({SchoolID,dispatch}).then(data => {

            if (data){

                let teacherList = data.ItemSubject.map(item => {

                    let list =  data.ItemTeacher.map(i => {

                        if (i.SubjectID === item.SubjectID){

                            return{

                                name:i.TeacherName,

                                id:i.TeacherID

                            }

                        }else{

                            return;

                        }

                    }).filter(itm => itm!==undefined);

                    return {

                        id:item.SubjectID,

                        name:item.SubjectName,

                        list

                    }

                });

                let ClassHourList = data.ItemClassHour.map(item=>{

                    return {

                        ID:item.ClassHourNO,

                        Type:item.ClassHourType,

                        Name:item.ClassHourName

                    }

                });

                const ClassRoomTypeList = data.ItemClassRoomType&&data.ItemClassRoomType.length>0?data.ItemClassRoomType:[];

                dispatch({type:ADJUST_BY_TEACHER_CLASS_ROOM_TYPE_LIST_UPDATE,data:ClassRoomTypeList});

                dispatch({type:ADJUST_BY_TEACHER_CLASS_HOURS_LIST_UPDATE,data:ClassHourList});

                dispatch({type:ADJUST_BY_TEACHER_TEACHER_LIST_UPDATE,data:teacherList});


            }


            ApiActions.GetSubjectAndClassInfoByTeacherID({TeacherID:UserID,dispatch}).then(data=>{

               if (data){

                   if (data.ItemSubject.length > 1){

                       let  list = data.ItemSubject.map(item => {

                           return {

                               value:item.SubjectID,

                               title:item.SubjectName

                           }

                       });

                       let classList = data.ItemClass.map(item => {

                           if (item.SubjectID === list[0].value){

                               return {

                                   id:item.ClassID,

                                   name:item.ClassName

                               }

                           }else{

                               return;

                           }

                       }).filter(i => i!==undefined);

                       dispatch({type:REPLACE_SHCEDULE_CLASS_LIST_UPDATE,data:classList});

                       dispatch({type:REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_SHOW,data:{

                               dropSelectd:{value:list[0].value,title:list[0].title},

                               dropList:list

                           }});

                   }else{

                       let  subject =  data.ItemSubject[0]?data.ItemSubject[0]:{SubjectID:"none",SubjectName:""};

                       let subjectObj = { id:subject.SubjectID,name:subject.SubjectName };

                       let classList = data.ItemClass.length>0?data.ItemClass.map(item => {

                           return {

                               id:item.ClassID,

                               name:item.ClassName

                           }

                       }):[];

                       dispatch({type:REPLACE_SHCEDULE_CLASS_LIST_UPDATE,data:classList});

                       dispatch({type:REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_HIDE,data:{

                               id:subjectObj.id,

                               name:subjectObj.name

                           }});

                   }

               }

               dispatch({type:ADJUST_BY_TEACHER_LOADING_HIDE});

           });


        });

    };

};


//教师选择
const replaceTeacherDropChange = (info) => {


    return ( dispatch,getState ) => {

        dispatch({type:REPLACE_SHCEDULE_REPLACE_TEACHER_DROP_CHANGE,data:{value:info.id,title:info.value}});

    }

};

//教师搜索
const replaceTeacherClickSearch = (key) => {

    return (dispatch,getState) => {

        if (key.trim() !== ''){

            let pattern =  utils.SearchReg({type:1,dispatch,ErrorTips:"您输入的教师姓名或工号不正确",key:key});

            if (pattern){

                let {SchoolID} = getState().LoginUser;

                dispatch({type:REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_OPEN});

                dispatch({type:REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_SHOW});

                ApiActions.GetTeacherBySubjectIDAndKey({SchoolID,Key:key,dispatch}).then(data => {

                    if (data){

                        let teacherSearchList = data.map(item => {

                            return{

                                id:item.TeacherID,

                                name:item.TeacherName

                            };

                        });

                        dispatch({type:REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LIST_UPDATE,data:teacherSearchList});

                        dispatch({type:REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_HIDE});

                    }

                });

            }

        }else{

          dispatch(AppAlertActions.alertWarn({title:"搜索的内容不能为空！"}));

        }

    };

};

//取消教师的搜索.
const replaceTeacherSearchClose = (key) => {

    return dispatch => {

        dispatch({type:REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_CLOSE})

    }

};

//点击班级
const classChecked = (id) => {

  return ( dispatch,getState ) => {

      let { classCheckedList } = getState().Teacher.AdjustByTeacherModal.replaceSchedule;

      let checked = false;

      classCheckedList.map(item => {

         if (item === id){

             checked = true;

             return;

         }

      });

      if (checked){

            classCheckedList.remove(id);

      }else{

          classCheckedList.push(id);

      }

      dispatch({type:REPLACE_SHCEDULE_CLASS_CHECKED,data:classCheckedList});

  }

};
//radio变化
const radioChange = (id) => {

    return (dispatch,getState) => {

      dispatch({type:REPLACE_SHCEDULE_RADIO_CHANGE,data:id});

      dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:'month'}});

        dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:'week'}});

        dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:'date'}});

        dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:'classHourDate'}});

        dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:'classHour'}});

      let { SchoolID } = getState().LoginUser;

        ApiActions.GetAllDateTimeInfo({SchoolID,dispatch}).then(data => {

            if (data){

                if (id === 'month') {

                    const {ItemMonth} = data;

                    let list = ItemMonth.map(item => {

                        return {

                            id: item.MonthID,

                            name: item.MonthName

                        }

                    });

                    dispatch({type: REPLACE_SHCEDULE_MONTHS_LIST_UPDATE, data: list});

                    dispatch({type:TEACHER_REPLACE_SHCEDULE_MONTHS_LOADING_HIDE});

                }

                if (id === 'week'){

                    const { ItemWeek } = data;

                    let  list = ItemWeek.map(item => item.WeekNO);

                    list.sort((a,b)=>parseInt(a) - parseInt(b));

                    dispatch({type:REPLACE_SHCEDULE_WEEK_LIST_UPDATE,data:list});

                    dispatch({type:TEACHER_REPLACE_SHCEDULE_WEEKS_LOADING_HIDE});

                }

                if (id === 'classHour'){

                    let morning = { id:1,name:"上午",list:[] };

                    let afternoon = { id:2,name:"下午" ,list:[]};
                    
                    let night = { id:3,name:"晚上" ,list:[]};

                    data.ItemClassHour.map(item => {

                        switch (item.ClassHourType) {

                            case 1:

                                morning['list'].push(item.ClassHourNO);

                                break;

                            case 2:

                                afternoon['list'].push(item.ClassHourNO);

                                break;

                            case 3:

                                night['list'].push(item.ClassHourNO);

                                break;

                            default:

                                morning['list'].push(item.ClassHourNO);

                        }

                    });

                    let classHourList = [];

                    if (morning.list.length>0){

                        morning.list.sort((a,b)=>parseInt(a)-parseInt(b));

                        classHourList.push(morning);

                    }

                    if (afternoon.list.length>0){

                        afternoon.list.sort((a,b)=>parseInt(a)-parseInt(b));

                        classHourList.push(afternoon);

                    }

                    if (night.list.length>0){

                        night.list.sort((a,b)=>parseInt(a)-parseInt(b));

                        classHourList.push(night);

                    }

                    let classHourPlainOpts = JSON.parse(JSON.stringify(classHourList));

                    let classHourCheckedList = classHourList.map(item =>{

                        return{

                            id:item.id,

                            name:item.name,

                            checked:false,

                            list:[]

                        }

                    });

                    dispatch({type:REPLACE_SHCEDULE_CLASSHOUR_LIST_CHANGE,data:{classHourList,classHourPlainOpts,classHourCheckedList}});

                    dispatch({type:REPLACE_SHCEDULE_CLASSHOUR_LOADING_HIDE});

                }

            }

        });

    };

};
//月份变化
const monthChecked = (id) => {

    return (dispatch,getState) => {

        let {monthsCheckedList} = getState().Teacher.AdjustByTeacherModal.replaceSchedule;

        if (monthsCheckedList.includes(id)){

            monthsCheckedList.remove(id);

        }else{

            monthsCheckedList.push(id);

        }

        dispatch({type:REPLACE_SHCEDULE_MONTHS_CHECKED,data:monthsCheckedList});

    }

};
//周次变化
const weekChecked = (id) => {

    return (dispatch,getState) => {

        let {weeksCheckedList} = getState().Teacher.AdjustByTeacherModal.replaceSchedule;

        if (weeksCheckedList.includes(id)){

            weeksCheckedList.remove(id);

        }else{

            weeksCheckedList.push(id);

        }

        dispatch({type:REPLACE_SHCEDULE_MONTHS_CHECKED,data:weeksCheckedList});

    }

};

//日期变化
const dateChecked = (date) => {

    return (dispatch,getState) => {

        let { dateCheckedList } = getState().Teacher.AdjustByTeacherModal.replaceSchedule;

        if (date ===''){

            dateCheckedList = [];

        }else if (dateCheckedList.includes(date)){

            let findIndex = dateCheckedList.findIndex(item=>item===date);

            if (findIndex>=0){

                dateCheckedList.splice(findIndex,1);

            }

        }else{

            dateCheckedList.push(date);

        }

        dispatch({type:REPLACE_SHCEDULE_DATE_CHECKED,data:dateCheckedList});

    }

};
//课时日期选取
const classHourDateChecked = (date) => {

    return (dispatch,getState) => {

        dispatch({type:REPLACE_SHCEDULE_CLASSHOUR_DATE_CHECKED,data:date});

        dispatch({type:REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_SHOW});

        let { SchoolID } = getState().LoginUser;

        if (date){

            ApiActions.GetWeekInfoByDate({SchoolID,ClassDate:date,dispatch}).then(data => {

                if (data){

                    let WeekNO = data.WeekNO;

                    let weekDay = data.WeekDay;

                    let WeekDay = '';

                    switch (weekDay) {

                        case 0:

                            WeekDay = '星期一';

                            break;

                        case 1:

                            WeekDay = '星期二';

                            break;

                        case 2:

                            WeekDay = '星期三';

                            break;

                        case 3:

                            WeekDay = '星期四';

                            break;

                        case 4:

                            WeekDay = '星期五';

                            break;

                        case 5:

                            WeekDay = '星期六';

                            break;

                        case 6:

                            WeekDay = '星期日';

                            break;

                        default:

                            WeekDay = '星期一';

                    }

                    dispatch({type:REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_UPDATE,data:{WeekNO,WeekDay}});

                    dispatch({type:REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_HIDE});

                }

            });

        }




    }

};
//课时选取
const classHourChecked = (opts) => {

    return (dispatch,getState) => {

        const { classHourCheckedList,classHourPlainOpts } = getState().Teacher.AdjustByTeacherModal.replaceSchedule;

        let checkedList = [];

        if (opts.type === 'noon'){

            checkedList = classHourCheckedList.map((item) => {

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

                        classHourPlainOpts.map(i => {

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

            checkedList = classHourCheckedList.map(item => {

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

                        classHourPlainOpts.map(i => {

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

        dispatch({type:REPLACE_SHCEDULE_CLASSHOUR_CHECKED_LIST_CHANGE,data:checkedList});

    }

};

//与人换课

//原始教师日期改变
const originDateChecked = (date) => {

    return (dispatch,getState) => {

        dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_DATE_PICK,data:date});

        dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DROP_SELECTD,data:{value:"none",title:"请选择课时"}});

        if (date !== ''){

            let TeacherID = getState().LoginUser.UserID;

            let ClassDate = date;

            ApiActions.GetScheduleByTeacherIDAndDate({TeacherID,ClassDate,dispatch}).then(data => {

               if (data){

                    let list = data.map(item => {

                        let noon = '';

                       switch (item.ClassHourType) {

                           case 1:

                               noon = '上午';

                               break;

                           case 2:

                               noon = '下午';

                               break;

                           case 3:

                               noon = '晚上';

                               break;

                           default:

                               noon = '上午';

                       }

                       let title = <span title={`第${item.ClassHourNO}节 (${noon})`}>第{item.ClassHourNO}节<span className="noon">({noon})</span></span>

                       return {

                           value:item.ScheduleID,

                           title:title

                       }


                    });

                    if (list.length<=0){

                        list = [{value:"none",title:"您还未有所教课程"}];

                    }

                    dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_ABLED});

                    dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_LIST_UPDATE,data:list})

               }

            });

        }else{

            dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DISABLED});

            dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_LIST_UPDATE,data:''});

        }

    }

};

//待选节次变更
const originScheduleDropChange = (info) => {

    return ( dispatch ) => {

        console.log(info);

        dispatch({type:CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DROP_SELECTD,data:info});

    }

};

const targetTeacherDropChange = (info) => {

    return ( dispatch,getState ) => {

        let { targetDate } = getState().Teacher.AdjustByTeacherModal.changeSchedule;

        dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_DROP_CHANGE,data:{value:info.id,title:info.value}});

        dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DROP_SELECTD,data:{value:"none",title:"请选择课时"}});

        if (targetDate !== ''){

            let TeacherID = info.id;

            let ClassDate = targetDate;


            ApiActions.GetScheduleByTeacherIDAndDate({ClassDate,TeacherID,dispatch}).then(data => {

                if (data){

                    let list = data.map(item => {

                        let noon = '';

                        switch (item.ClassHourType) {

                            case 1:

                                noon = '上午';

                                break;

                            case 2:

                                noon = '下午';

                                break;

                            case 3:

                                noon = '晚上';

                                break;

                            default:

                                noon = '上午';

                        }

                        let title = <span title={`第${item.ClassHourNO}节 (${noon})`}>第{item.ClassHourNO}节<span className="noon">({noon})</span></span>

                        return {

                            value:item.ScheduleID,

                            title:title

                        }


                    });

                    if (list.length<=0){

                        list = [{value:"none",title:"您还未有所教课程"}];

                    }

                    dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_ABLED});

                    dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_LIST_UPDATE,data:list})

                }

            });

        }

    }

};
//搜索待选教师
const targetTeacherClickSearch = (key) => {

    return (dispatch,getState) => {

        if (key.trim() !== ''){

            let pattern =  utils.SearchReg({type:1,dispatch,ErrorTips:"您输入的教师姓名或工号不正确",key:key});

            if (pattern){

                let SchoolID = getState().LoginUser;

                dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_OPEN});

                dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_SHOW});

                ApiActions.GetTeacherBySubjectIDAndKey({SchoolID,dispatch}).then(data => {

                    if (data){

                        let teacherSearchList =data.map(item => {

                            return{

                                id:item.TeacherID,

                                name:item.TeacherName

                            };

                        });

                        dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LIST_UPDATE,data:teacherSearchList});

                        dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_HIDE});

                    }

                });

            }

        }else{

            dispatch(AppAlertActions.alertWarn({title:"搜索的内容不能为空！"}));

        }

    };

};
//取消待选教师搜索
const targetTeacherSearchClose = () => {

    return dispatch => {

        dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_CLOSE});

    }

};

//待选教师日期改变
const targetDateChecked = (date) => {

    return (dispatch,getState) => {

        dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_DATE_PICK,data:date});

        dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DROP_SELECTD,data:{value:"none",title:"请选择课时"}});

        if (date !== ''){

            let { targetDropSelectd } = getState().Teacher.AdjustByTeacherModal.changeSchedule;

            if (targetDropSelectd.value){

                let TeacherID = targetDropSelectd.value;

                let ClassDate = date;

                ApiActions.GetScheduleByTeacherIDAndDate({ClassDate,TeacherID,dispatch}).then(data => {

                    if (data){

                        let list = data.map(item => {

                            let noon = '';

                            switch (item.ClassHourType) {

                                case 1:

                                    noon = '上午';

                                    break;

                                case 2:

                                    noon = '下午';

                                    break;

                                case 3:

                                    noon = '晚上';

                                    break;

                                default:

                                    noon = '上午';

                            }

                            let title = <span title={`第${item.ClassHourNO}节 (${noon})`}>第{item.ClassHourNO}节<span className="noon">({noon})</span></span>

                            return {

                                value:item.ScheduleID,

                                title:title

                            }


                        });

                        if (list.length<=0){

                            list = [{value:"none",title:"您还未有所教课程"}];

                        }

                        dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_ABLED});

                        dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_LIST_UPDATE,data:list})

                    }

                });

            }

        }else{

            dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DISABLED});

            dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_LIST_UPDATE,data:''});

        }

    }

};

//待选节次变更

const targetScheduleDropChange = (info) => {

    return ( dispatch ) => {

        dispatch({type:CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DROP_SELECTD,data:info});

    }

};




//调整时间日期变化
const changeTimeOriginDate = (date) => {

    return (dispatch,getState) => {

        dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:"date",value:date}});

        dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:"classHourPick",value:{value:'none',title:"请选择节次"}}});

        if (date !== ''){

            let TeacherID = getState().LoginUser.UserID;

            let { SchoolID } = getState().LoginUser;

            let ClassDate = date;

            let GetScheduleByTeacherIDAndDate = ApiActions.GetScheduleByTeacherIDAndDate({TeacherID,ClassDate,dispatch});

            let GetWeekInfoByDate = ApiActions.GetWeekInfoByDate({SchoolID,ClassDate,dispatch});

            Promise.all([GetScheduleByTeacherIDAndDate,GetWeekInfoByDate]).then(res => {

                const json1 = res[0];

                const json2 = res[1];

                //第一个异步
                if (json1){

                    let list = json1.map(item => {

                        let noon = '';

                        switch (item.ClassHourType) {

                            case 1:

                                noon = '上午';

                                break;

                            case 2:

                                noon = '下午';

                                break;

                            case 3:

                                noon = '晚上';

                                break;

                            default:

                                noon = '上午';

                        }

                        let title = <span title={`第${item.ClassHourNO}节 (${noon})`}>第{item.ClassHourNO}节<span className="noon">({noon})</span></span>

                        return {

                            value:item.ScheduleID,

                            title:title,

                            no:item.ClassHourNO

                        }


                    });

                    let classRoomList = json1.map(item => {

                        return {

                            ScheduleID:item.ScheduleID,

                            ClassRoomID:item.ClassRoomID,

                            ClassRoomName:item.ClassRoomName

                        }


                    });

                    if (list.length<=0){

                        list = [{value:"none",title:"您暂未有任何课程"}];

                    }

                    dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:"classHourAbled",value:{value:"none",title:"请选择节次"}}});

                    dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:'classHourListChange',value:list}});

                    dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:"oldClassRoomListChange",value:classRoomList}});

                }


                //第二个异步

                if (json2){

                    let WeekNO = json2.WeekNO;

                    let weekDay = json2.WeekDay;

                    let WeekDay = '';

                    switch (weekDay) {

                        case 0:

                            WeekDay = '星期一';

                            break;

                        case 1:

                            WeekDay = '星期二';

                            break;

                        case 2:

                            WeekDay = '星期三';

                            break;

                        case 3:

                            WeekDay = '星期四';

                            break;

                        case 4:

                            WeekDay = '星期五';

                            break;

                        case 5:

                            WeekDay = '星期六';

                            break;

                        case 6:

                            WeekDay = '星期日';

                            break;

                        default:

                            WeekDay = '星期一';

                    }

                    dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:'weekChange',value:{WeekNO,WeekDay}}});

                }

            });

        }else{

            dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:"classHourDisabled"}});

            // dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:"classHourPick",value:{title:"请选择节次",value:"none"}}});

            dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:"weekChange",value:""}});

        }

    }

};

//旧的课时选取

const changTimeOldClassHourPick = (info) =>{

    return (dispatch,getState) => {

        const { newClassRoomDrop,newClassHourDrop,oldClassRoomList,oldClassHourDrop,oldWeek } = getState().Teacher.AdjustByTeacherModal.changeTime;

        const { value,title } = info;

        dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:"classHourPick",value:info}});

        if (value!=='none'){

            let classRoom = oldClassRoomList.find(item=>item.ScheduleID===value);

            let classRoomObject = { value:classRoom.ClassRoomID,title:classRoom.ClassRoomName };


            if (newClassHourDrop.value==='none'){

                dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"classRoomDrop",value:classRoomObject}});

            }

            dispatch({type:CHANGE_TIME_ORIGIN_CHANGE,data:{type:"weekChange",value:{...oldWeek,ClassHour:title}}});

        }

    }

};

//新的日期选取

const changeTimeNewTimeChange = (date) => {

    return (dispatch,getState) => {

        dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"date",value:date}});

        let { newClassRoomDrop,newClassHourDrop } = getState().Teacher.AdjustByTeacherModal.changeTime;

        if (date !== ''){

            let { SchoolID } = getState().LoginUser;

            const { ClassHourList } = getState().Teacher.AdjustByTeacherModal;

            ApiActions.GetWeekInfoByDate({SchoolID,ClassDate:date,dispatch}).then(data=>{

                if (data){

                    let WeekNO = data.WeekNO;

                    let weekDay = data.WeekDay;

                    let WeekDay = '';

                    switch (weekDay) {

                        case 0:

                            WeekDay = '星期一';

                            break;

                        case 1:

                            WeekDay = '星期二';

                            break;

                        case 2:

                            WeekDay = '星期三';

                            break;

                        case 3:

                            WeekDay = '星期四';

                            break;

                        case 4:

                            WeekDay = '星期五';

                            break;

                        case 5:

                            WeekDay = '星期六';

                            break;

                        case 6:

                            WeekDay = '星期日';

                            break;

                        default:

                            WeekDay = '星期一';

                    }

                    dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:'weekChange',value:{WeekNO,WeekDay}}});

                    let ClassHour = ClassHourList.map(item => {

                        let title = '';

                        switch (item.Type) {


                            case 1:

                                title = '上午';

                                break;

                            case 2:

                                title = '下午';

                                break;

                            case 3:

                                title = '晚上';

                                break;

                            default:

                                title = ''

                        }

                        let titleWrapper = <span>第{item.ID}节 <span className="noon">({title})</span></span>;

                        return {

                            value:item.ID,

                            title:titleWrapper

                        }

                    });

                    dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"classHourListChange",value:ClassHour}});

                    dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"classHourAbled"}});

                }

            });

            if (newClassRoomDrop.value!=='none'&&newClassHourDrop.value!=='none'){

                ApiActions.ClassRoomIsUseded({ClassDate:date,ClassHourNO:newClassHourDrop.value,ClassRoomID:newClassRoomDrop.value,dispatch}).then(data=>{

                    if (data){

                        if (data.Useded === 1){

                            dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"errorTipsShow"}});

                        }else{

                            dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"errorTipsHide"}});

                        }

                    }

                })

            }

           /* let GetAllOptionForAddSchedule = ApiActions.GetAllOptionForAddSchedule({SchoolID,dispatch});

            Promise.all([GetWeekInfoByDate,GetAllOptionForAddSchedule]).then(res => {

                const json1 = res[0];

                const json2 = res[1];

                if (json1){

                    let WeekNO = json1.WeekNO;

                    let weekDay = json1.WeekDay;

                    let WeekDay = '';

                    switch (weekDay) {

                        case 0:

                            WeekDay = '星期一';

                            break;

                        case 1:

                            WeekDay = '星期二';

                            break;

                        case 2:

                            WeekDay = '星期三';

                            break;

                        case 3:

                            WeekDay = '星期四';

                            break;

                        case 4:

                            WeekDay = '星期五';

                            break;

                        case 5:

                            WeekDay = '星期六';

                            break;

                        case 6:

                            WeekDay = '星期日';

                            break;

                        default:

                            WeekDay = '星期一';

                    }

                    dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:'weekChange',value:{WeekNO,WeekDay}}});

                }


                if (json2){

                    let { newWeek } = getState().Teacher.AdjustByTeacherModal.changeTime;

                    let ClassHour = json2.ItemClassHour.map(item => {

                        let title = '';

                        switch (item.ClassHourType) {


                            case 1:

                                title = '上午';

                                break;

                            case 2:

                                title = '下午';

                                break;

                            case 3:

                                title = '晚上';

                                break;

                            default:

                                title = ''

                        }

                        let titleWrapper = <span>第{item.ClassHourNO}节 <span className="noon">({title})</span></span>;

                        return {

                            value:item.ClassHourNO,

                            title:titleWrapper

                        }

                    });


                    dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"classHourListChange",value:ClassHour}});

                    dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"classHourAbled"}});

                }


            });*/


        }else{

            dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"classHourDisabled"}});

            dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"classHourDrop",value:{value:"none",title:"请选择节次"}}});

            dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"classRoomDisabled"}});

            dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"classRoomDrop",value:{value:"none",title:"请选择教室"}}});

            dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"weekChange",value:""}});

        }

    }

};

//新的课时的选取
const changeTimeNewClassHourPick = (info) => {

  return (dispatch,getState) => {

      let { newWeek,newDate,newClassRoomDrop,newClassHourDrop } = getState().Teacher.AdjustByTeacherModal.changeTime;

      dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"classHourDrop",value:info}});

      dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"weekChange",value:{...newWeek,ClassHour:info.title}}});

      ApiActions.GetClassRoomIsNotBusy({ClassHourNO:info.value,ClassDate:newDate,dispatch}).then(data => {

          if (data){

              let classRoomList = data.map(item => {

                  return {

                      value:item.ClassRoomID,

                      title:item.ClassRoomName

                  }

              });

              if (classRoomList.lenth<=0){

                  classRoomList = [{value:'none',title:"暂无闲置教室"}];

              }

              dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"classRoomAbled"}});

              dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"classRoomListChange",value:classRoomList}});


              if (newClassRoomDrop.value !== 'none'){


                  ApiActions.ClassRoomIsUseded({ClassRoomID:newClassRoomDrop.value,ClassDate:newDate,ClassHourNO:info.value,dispatch}).then(data=>{

                        //是否被占用的接口

                      if (data){

                          if (data.Useded === 1){

                              dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"errorTipsShow"}});

                          }else{

                              dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"errorTipsHide"}});

                          }

                      }

                  });


              }


          }

      })


  }

};

//新的教室更改

const changeTimeNewClassRoomPick = (info) => {

    return (dispatch,getState) =>{

        let { newDate,newClassHourDrop } = getState().Teacher.AdjustByTeacherModal.changeTime;

        dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"classRoomDrop",value:info}});

        if (newDate!==''&&newClassHourDrop.value!=='none'){

            ApiActions.ClassRoomIsUseded({ClassDate:newDate,ClassHourNO:newClassHourDrop.value,ClassRoomID:info.value,dispatch}).then(data=>{

                if (data){

                    if (data.Useded === 1){

                        dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"errorTipsShow"}});

                    }else{

                        dispatch({type:CHANGE_TIME_NEW_CHANGE,data:{type:"errorTipsHide"}});

                    }

                }

            })

        }

    }

};



//日期选取

const changeClassRoomDatePick = (date) => {

    return (dispatch,getState) => {

        dispatch({type:CHANGE_CLASS_ROOM_DATE_CHANGE,data:date});

        if (date !== ''){

            let { SchoolID,UserID } = getState().LoginUser;

            ApiActions.GetWeekInfoByDate({SchoolID,ClassDate:date,dispatch}).then(data=>{

                if (data){

                    let WeekNO = data.WeekNO;

                    let weekDay = data.WeekDay;

                    let WeekDay = '';

                    switch (weekDay) {

                        case 0:

                            WeekDay = '星期一';

                            break;

                        case 1:

                            WeekDay = '星期二';

                            break;

                        case 2:

                            WeekDay = '星期三';

                            break;

                        case 3:

                            WeekDay = '星期四';

                            break;

                        case 4:

                            WeekDay = '星期五';

                            break;

                        case 5:

                            WeekDay = '星期六';

                            break;

                        case 6:

                            WeekDay = '星期日';

                            break;

                        default:

                            WeekDay = '星期一';

                    }

                    dispatch({type:CHANGE_CLASS_ROOM_WEEK_TIME_CHANGE,data:{WeekNO,WeekDay}});


                }

            });

            let TeacherID = getState().LoginUser.UserID;

            let ClassDate = date;

            ApiActions.GetScheduleByTeacherIDAndDate({TeacherID,ClassDate,dispatch}).then(data => {

              if (data){

                  let list = data.map(item => {

                      let noon = '';

                      switch (item.ClassHourType) {

                          case 1:

                              noon = '上午';

                              break;

                          case 2:

                              noon = '下午';

                              break;

                          case 3:

                              noon = '晚上';

                              break;

                          default:

                              noon = '上午';

                      }

                      let title = <span title={`第${item.ClassHourNO}节 (${noon})`}>第{item.ClassHourNO}节<span className="noon">({noon})</span></span>

                      return {

                          value:item.ScheduleID,

                          title:title,

                          NO:item.ClassHourNO

                      }


                  });

                  let classRoomList = data.map(item => {

                      return {

                          ScheduleID:item.ScheduleID,

                          ClassRoomID:item.ClassRoomID,

                          ClassRoomName:item.ClassRoomName

                      }


                  });

                  if (list.length<=0){

                      list = [{value:"none",title:"您暂无所教课程"}];

                  }

                  dispatch({type:CHANGE_CLASS_ROOM_TEACHER_CLASSROOM_LIST_CHANGE,data:classRoomList});

                  dispatch({type:CHANGE_CLASS_ROOM_CLASS_HOUR_CHANGE,data:{type:"classHourAbled"}});

                  dispatch({type:CHANGE_CLASS_ROOM_CLASS_HOUR_CHANGE,data:{type:"classHourListChange",value:list}});

                  dispatch({type:CHANGE_CLASS_ROOM_CLASS_HOUR_CHANGE,data:{type:'classHourDrop',value:{value:"none",title:"请选择节次"}}});


              }

            });

        }else{

            dispatch({type:CHANGE_CLASS_ROOM_WEEK_TIME_CHANGE,data:{WeekNO:'',WeekDay:'',ClassHour:''}});

            dispatch({type:CHANGE_CLASS_ROOM_CLASS_HOUR_CHANGE,data:{type:"classHourDisabled"}});

            dispatch({type:CHANGE_CLASS_ROOM_CLASS_HOUR_CHANGE,data:{type:"classHourDrop",value:{value:"none",title:"请选择节次"}}});

            dispatch({type:CHANGE_CLASS_ROOM_TEACHER_CLASSROOM_CHANGE,data:{id:"none",name:"请选择节次来获取上课教室"}});

            dispatch({type:CHANGE_CLASS_ROOM_CLASSROOM_CHANGE,data:{type:"classRoomDisabled"}});

            dispatch({type:CHANGE_CLASS_ROOM_CLASSROOM_CHANGE,data:{type:"classRoomDrop",value:{value:"none",title:"请选择教室"}}});

        }

    }

};



//课时选取
const changeClassRoomClassHourPick = (info) => {

    return (dispatch,getState) => {

        const { date,classHourList,WeekNO,WeekDay,teacherClassRoomList } = getState().Teacher.AdjustByTeacherModal.ChangeClassRoom;

        const { value,title } = info;

        dispatch({type:CHANGE_CLASS_ROOM_CLASS_HOUR_CHANGE,data:{type:"classHourDrop",value:info}});

        if (value!=='none'){

            let classRoom = teacherClassRoomList.find(item=>item.ScheduleID===value);

            let classRoomObject = { id:classRoom.ClassRoomID,name:classRoom.ClassRoomName };

            dispatch({type:CHANGE_CLASS_ROOM_TEACHER_CLASSROOM_CHANGE,data:classRoomObject});

            dispatch({type:CHANGE_CLASS_ROOM_WEEK_TIME_CHANGE,data:{ClassHour:info.title}});

            dispatch({type:CHANGE_CLASS_ROOM_CLASSROOM_CHANGE,data:{type:"classRoomAbled"}});

            dispatch({type:CHANGE_CLASS_ROOM_CLASSROOM_CHANGE,data:{type:"classRoomDrop",value:{value:"none",title:"请选择教室"}}});

            let no = classHourList.find(item=>{return item.value===value}).NO;

            ApiActions.GetClassRoomIsNotBusy({ClassDate:date,ClassHourNO:no,dispatch}).then(data=>{

                if (data){

                    let classRoomList = data.map(item=>{

                        return {

                            value:item.ClassRoomID,

                            title:item.ClassRoomName

                        }

                    });

                    dispatch({type:CHANGE_CLASS_ROOM_CLASSROOM_CHANGE,data:{type:"classRoomListChange",value:classRoomList}});

                }

            });

        }

    }

};


//点击教室
const changeClassRoomClassRoomPick = (info) => {

    return dispatch => {

        dispatch({type:CHANGE_CLASS_ROOM_CLASSROOM_CHANGE,data:{type:"classRoomDrop",value:info}});

    }

};




//时间变化

const stopScheduleDateChange = (date) => {

    return (dispatch,getState) => {

        dispatch({type:STOP_SCHEDULE_DATE_PICK,data:date});

        dispatch({type:STOP_SCHEDULE_ERROR_TIPS_HIDE,data:{type:'schedule'}});

        if (date !== ''){

            dispatch({type:STOP_SCHEDULE_CLASSHOUR_LOADING_SHOW});

            let TeacherID = getState().LoginUser.UserID;

            let ClassDate = date;

            ApiActions.GetScheduleByTeacherIDAndDate({TeacherID,ClassDate,dispatch}).then(data=>{

                if (data){

                    let classHours = [];

                    let morning = {type:1,name:"上午",list:[]};

                    let afternoon = {type:2,name:"下午",list:[]};

                    let tonight = {type:3,name:"晚上",list:[]};

                    data.map(item => {

                        if (item.ClassHourType === 1){

                            morning['list'].push({id:item.ScheduleID,name:item.ClassHourNO});

                        }else if (item.ClassHourType === 2){

                            afternoon['list'].push({id:item.ScheduleID,name:item.ClassHourNO});

                        }else if (item.ClassHourType === 3){

                            tonight['list'].push({id:item.ScheduleID,name:item.ClassHourNO});

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

                            list.push(i.id);

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

                    dispatch({type:STOP_SCHEDULE_TEACHER_CLASSHOUR_CHANGE,data:{classHoursPlainOpts,classHoursCheckedList,classHours}});

                    dispatch({type:STOP_SCHEDULE_CLASSHOUR_LOADING_HIDE});

                }

            });

        }else{

            dispatch({type:STOP_SCHEDULE_TEACHER_CLASSHOUR_CHANGE,data:{classHours:[]}});

        }

    }

};

//课时选取

const stopScheduleClassHoursChecked = (opts) => {

    return (dispatch,getState) => {

        const { classHoursCheckedList,classHoursPlainOpts } = getState().Teacher.AdjustByTeacherModal.StopSchedule;

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

                        console.log(123);

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

        dispatch({type:STOP_SCHEDULE_TEACHER_CLASSHOUR_CHANGE,data:{classHoursCheckedList:checkedList}});

    }

};


//提交按教师修改弹窗

//提交弹窗

const ModalCommit = ({changeTimeModal,changeRoomModal}) => {

  return (dispatch,getState) => {

      const { AdjustByTeacherModal } = getState().Teacher;

      const { activeKey } = AdjustByTeacherModal;

      const { replaceSchedule,changeSchedule,changeTime,ChangeClassRoom,StopSchedule } = AdjustByTeacherModal;

      //是否是第一个tab

      if (activeKey==='1'){

        let {

            activeRadio,

            replaceTeacherOptions,

            classCheckedList,

            classList,

            monthsCheckedList,

            weeksCheckedList,

            dateCheckedList,

            classHourCheckedList,

            classHourDate,

            teacherSubject

        } = replaceSchedule;

        let replaceTeacherOk,classOk,dayLineOk,subjectOk = false;


        //判断替代的教师是否已被选择
          if (replaceTeacherOptions.dropSelectd.value==='none'){

              dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"replaceTeacher",title:"请选择教师"}});

          }else{

              replaceTeacherOk = true;

              dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"replaceTeacher"}});

          }


          //判断班级
          if (classCheckedList.length>0){

              classOk = true;

              dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"class"}});

          }else{

              dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"class",title:"请选择班级"}});

          }


          //判断学科
          if (teacherSubject.dropShow){

            if (teacherSubject.select.dropSelectd===''){

                dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"originTeacher",title:"请选择学科"}});

            }else{

                subjectOk = true;

                dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"originTeacher"}});

            }

          }else{

              if (teacherSubject.name===''){

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"originTeacher",title:"请选择学科"}});

              }else{

                  subjectOk = true;

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"originTeacher"}});

              }

          }


          //判断班级是否选择

          if (classList.length>0){

              if (classCheckedList.length>0){

                  classOk = true;

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"class"}});

              }else{

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"class",title:"请选择班级"}});

              }

          }


          if (activeRadio === 'all'){

              dayLineOk = true;

          }

          if (activeRadio === 'month'){

              if(monthsCheckedList.length>0){

                  dayLineOk = true;

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"month"}})

              }else{

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"month",title:"请选择月份"}})

              }

          }

          if (activeRadio === 'week'){

              if(weeksCheckedList.length>0){

                  dayLineOk = true;

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"week"}})

              }else{

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"week",title:"请选择周次"}})

              }

          }

          if (activeRadio === 'date'){

              if(dateCheckedList.length>0){

                  dayLineOk = true;

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"date"}})

              }else{

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"date",title:"请选择日期"}})

              }

          }

          if (activeRadio === 'classHour'){

              let thisDateOk,thisClassHourOk = false;

              let classHourLength = 0;

              classHourCheckedList.map(item => {

                  classHourLength = classHourLength + item.list.length;

              });

              if (classHourDate){

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"classHourDate"}});

                  thisDateOk = true;

              }else {

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"classHourDate",title:"请选择日期"}});


              }



              if (classHourLength>0){

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"classHour"}});

                  thisClassHourOk = true;

              }else {

                  dispatch({type:REPLACE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"classHour",title:"请选择课时"}});


              }


              if (thisDateOk&&thisClassHourOk){

                  dayLineOk = true;

              }

          }


          //所有的都已经OK了可以向后台发送请求了
          if (replaceTeacherOk&&classOk&&subjectOk&&dayLineOk){

              let Type,Item = '';

              switch (activeRadio) {

                  case 'all':

                      Type = 0;

                      break;

                  case 'month':

                      Type = 1;

                      Item = monthsCheckedList.join(',');

                      break;

                  case 'week':

                      Type = 2;

                      Item = weeksCheckedList.join(',');

                      break;

                  case 'date':

                      Type = 3;

                      Item = dateCheckedList.join(',');

                      break;

                  case 'classHour':

                      Type = 4;

                       let list = classHourCheckedList.map(item=>item.list);

                       let ClassHoursLit = [...list];

                      Item = `${classHourDate};${ClassHoursLit.join(',')}`;

                      break;

                  default:

                      Type = 0;

                      Item = '';


              }

              let { SchoolID,UserID,UserType } = getState().LoginUser;

              let TeacherID1 = getState().LoginUser.UserID;

              let TeacherID2 = replaceTeacherOptions.dropSelectd.value;

              let SubjectID = '';

              let {teacherSubject,classCheckedList} =  getState().Teacher.AdjustByTeacherModal.replaceSchedule;

              if (teacherSubject.dropShow){

                  SubjectID = teacherSubject.select.dropSelectd.value;

              }else{

                  SubjectID = teacherSubject.id;

              }

              let ClassID = classList.filter(i=>{return classCheckedList.includes(i.id)}).map(i=>i.id).join(',');

              let ClassNameList = classList.filter(i=>{

                  return classCheckedList.includes(i.id);

              }).map(i=>i.name).join(',');

              dispatch({type:ADJUST_BY_TEACHER_LOADING_SHOW});

              ApiActions.SetSubstituteTeacher({

                  Type,Item,TeacherID1,TeacherID2,dispatch,

                  SchoolID,UserID,UserType:parseInt(UserType),SubjectID,ClassID,

                  ClassName:ClassNameList

              }).then((data) => {

                  if (data===0){

                      dispatch({type:ADJUST_BY_TEACHER_HIDE});

                      dispatch(AppAlertActions.alertSuccess({title:"找人代课成功！"}));

                      ComPageRefresh.ComPageUpdate(dispatch);

                  }

                  dispatch({type:ADJUST_BY_TEACHER_LOADING_HIDE});

              })

          }


      }


      if (activeKey==='2'){

        let {

            originDate,originScheduleDropSelectd,

            targetDropSelectd,targetDate,targetScheduleDropSelectd } = changeSchedule;

        let originDateOk,originScheduleOk,targetTeacherOk,targetDateOk,targetScheduleOk = false;


          if (originDate){

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"originDate"}});

              originDateOk = true;

          }else{

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"originDate"}});

          }

          if (originScheduleDropSelectd.value==='none'){

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"originSchedule"}});

          }else{

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"originSchedule"}});

              originScheduleOk = true;

          }

          if (targetDropSelectd.value==='none'){

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"targetTeacher"}});

          }else{

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"targetTeacher"}});

              targetTeacherOk = true;

          }

          if (targetDate){

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"targetDate"}});

              targetDateOk = true;

          }else{

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"targetDate"}});

          }

          if (targetScheduleDropSelectd.value==='none'){

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_SHOW,data:{type:"targetSchedule"}});

          }else{

              dispatch({type:CHANGE_SHCEDULE_ERROR_TIPS_HIDE,data:{type:"targetSchedule"}});

              targetScheduleOk = true;

          }

          if (originDateOk&&originScheduleOk&&targetTeacherOk&&targetDateOk&&targetScheduleOk){

              let ScheduleID1 = originScheduleDropSelectd.value;

              let ScheduleID2 = targetScheduleDropSelectd.value;

              dispatch({type:ADJUST_BY_TEACHER_LOADING_SHOW});

              const { UserType,UserID } = getState().LoginUser;

              ApiActions.ExchangeTeacherSchedule({UserType,UserID,ScheduleID1,ScheduleID2,dispatch}).then(data=>{

                 if (data===0){

                     dispatch({type:ADJUST_BY_TEACHER_HIDE});

                     dispatch(AppAlertActions.alertSuccess({title:"与人换课成功！"}));

                     ComPageRefresh.ComPageUpdate(dispatch);

                 }

                  dispatch({type:ADJUST_BY_TEACHER_LOADING_HIDE});

              });

          }

      }

      if (activeKey==='3'){

            let { oldClassHourList,errorTips,originDate,oldClassHourDrop,newDate,newClassHourDrop,newClassRoomDrop } = changeTime;


            let originDateOk,originSchedukeOk = false;


          if (originDate){

              dispatch({type:CHANGE_TIME_ERROR_TIPS_HIDE,data:{type:"originDate"}});

              originDateOk = true;

          }else{

              dispatch({type:CHANGE_TIME_ERROR_TIPS_SHOW,data:{type:"originDate"}});

          }

          if (oldClassHourDrop.value==='none'){

              dispatch({type:CHANGE_TIME_ERROR_TIPS_SHOW,data:{type:"originSchedule"}});

          }else{

              dispatch({type:CHANGE_TIME_ERROR_TIPS_HIDE,data:{type:"originSchedule"}});

              originSchedukeOk = true;

          }


          const { dateOk,classHourOk,classRoomOk } = changeTimeModal?changeTimeModal:{};



          if (originDateOk&&originSchedukeOk&&dateOk&&classHourOk&&classRoomOk){

              let ScheduleID = oldClassHourDrop.value;

              let ClassDate1 = originDate;

              let ClassHourNO1 = oldClassHourList.find(item=>item.value === ScheduleID).no;

              /*let ClassDate2 = newDate;

              let ClassHourNO2 = newClassHourDrop.value;

              let ClassRoomID = newClassRoomDrop.value;*/

              let ClassDate2 = changeTimeModal.newDate;

              let ClassHourNO2 = changeTimeModal.newClassHour;

              let ClassRoomID = changeTimeModal.newClassRoomID;

              dispatch({type:ADJUST_BY_TEACHER_LOADING_SHOW});

              const { UserType,UserID } = getState().LoginUser;

              ApiActions.EditClassDateOne({

                  UserType,UserID,ScheduleID,ClassDate1,ClassHourNO1,ClassDate2,ClassHourNO2,ClassRoomID,dispatch

              }).then(data=>{

                 if (data===0){

                     dispatch({type:ADJUST_BY_TEACHER_HIDE});

                     dispatch(AppAlertActions.alertSuccess({title:"调整时间成功！"}));

                     ComPageRefresh.ComPageUpdate(dispatch);

                 }

                  dispatch({type:ADJUST_BY_TEACHER_LOADING_HIDE});

              });


          }

      }

      if (activeKey==='4'){

          let { classHourList,date,classHourDrop,teacherClassRoom,classRoomDrop } = ChangeClassRoom;

          let dateOk,scheduleOk,targetClassRoomOk = false;

          const { classRoomID1,classRoomID2 } = changeRoomModal?changeRoomModal:{};

          if (date){

              dispatch({type:CHANGE_CLASS_ROOM_ERROR_TIPS_HIDE,data:{type:"date"}});

              dateOk = true;

          }else{

              dispatch({type:CHANGE_CLASS_ROOM_ERROR_TIPS_SHOW,data:{type:"date"}});

          }

          /*if (classHourDrop.value==='none'){

              dispatch({type:CHANGE_CLASS_ROOM_ERROR_TIPS_SHOW,data:{type:"schedule"}});

          }else{

              dispatch({type:CHANGE_CLASS_ROOM_ERROR_TIPS_HIDE,data:{type:"schedule"}});

              scheduleOk = true;

          }*/


          if (classRoomID1){

              dispatch({type:CHANGE_CLASS_ROOM_ERROR_TIPS_HIDE,data:{type:"schedule"}});

              scheduleOk = true;

          }else{

              dispatch({type:CHANGE_CLASS_ROOM_ERROR_TIPS_SHOW,data:{type:"schedule"}});

          }


         /* if (classRoomDrop.value==='none'){

              dispatch({type:CHANGE_CLASS_ROOM_ERROR_TIPS_SHOW,data:{type:"targetClassRoom"}});

          }else{

              dispatch({type:CHANGE_CLASS_ROOM_ERROR_TIPS_HIDE,data:{type:"targetClassRoom"}});

              targetClassRoomOk = true;

          }*/

          if (classRoomID2){

              targetClassRoomOk = true;
          }

          if (dateOk&&scheduleOk&&targetClassRoomOk){

              dispatch({type:ADJUST_BY_TEACHER_LOADING_SHOW});

              let { SchoolID } = getState().LoginUser;

              let ClassHourNo = classHourList.find(item=>item.value === classHourDrop.value).NO;

              let Type = 4;

              let Item = `${date};${ClassHourNo}`;

              const { UserType,UserID } = getState().LoginUser;

            /*  let ClassRoomID1 = teacherClassRoom.id;

              let ClassRoomID2 = classRoomDrop.value;*/

              ApiActions.AdjustClassRooomOfSchedule({

                  UserType,UserID,SchoolID,Type,Item,ClassRoomID1:classRoomID1,ClassRoomID2:classRoomID2,dispatch

              }).then(data=>{

                  if (data===0){

                      dispatch({type:ADJUST_BY_TEACHER_HIDE});

                      dispatch(AppAlertActions.alertSuccess({title:"调整教室成功！"}));

                      ComPageRefresh.ComPageUpdate(dispatch);

                  }

                  dispatch({type:ADJUST_BY_TEACHER_LOADING_HIDE});

              });


          }

      }

      if (activeKey==='5'){

        let { date,classHoursCheckedList } = StopSchedule;

        let dateOk,scheduleOk = false;

        let ScheduleLength = 0;

        classHoursCheckedList.map(item=>{

            ScheduleLength = ScheduleLength + item.list.length;

        });


          if (date){

              dispatch({type:STOP_SCHEDULE_ERROR_TIPS_HIDE,data:{type:"date"}});

              dateOk = true;

          }else{

              dispatch({type:STOP_SCHEDULE_ERROR_TIPS_SHOW,data:{type:"date"}});

          }

          if (ScheduleLength>0){

              dispatch({type:STOP_SCHEDULE_ERROR_TIPS_HIDE,data:{type:"schedule"}});

              scheduleOk = true;

          }else{

              dispatch({type:STOP_SCHEDULE_ERROR_TIPS_SHOW,data:{type:"schedule"}});

          }

          if (dateOk&&scheduleOk){

              dispatch({type:ADJUST_BY_TEACHER_LOADING_SHOW});

              let ScheduleList = [...classHoursCheckedList.map(item=>item.list)];

              let ScheduleIDs = ScheduleList.join(',');

              let { UserID,UserType } = getState().LoginUser;

              ApiActions.CloseTeacherSchedule({UserID,UserType:parseInt(UserType),ScheduleIDs,dispatch}).then(data=>{

                  if (data===0){

                      dispatch({type:ADJUST_BY_TEACHER_HIDE});

                      dispatch(AppAlertActions.alertSuccess({title:"停课成功！"}));

                      ComPageRefresh.ComPageUpdate(dispatch);

                  }

                  dispatch({type:ADJUST_BY_TEACHER_LOADING_HIDE});

              })

          }

      }

  }

};










const hideAlert = (dispatch) => {

    return () => {dispatch({type:AppAlertActions.APP_ALERT_HIDE})};

};

Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val) return i;
    }
    return -1;
};

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};








export default {

    ADJUST_BY_TEACHER_TAB_CHANGE,

    ADJUST_BY_TEACHER_SHOW,

    ADJUST_BY_TEACHER_HIDE,

    ADJUST_BY_TEACHER_TEACHER_LIST_UPDATE,

    ADJUST_BY_TEACHER_LOADING_SHOW,

    ADJUST_BY_TEACHER_LOADING_HIDE,

    ADJUST_BY_TEACHER_CLASS_HOURS_LIST_UPDATE,

    ADJUST_BY_TEACHER_CLASS_ROOM_TYPE_LIST_UPDATE,

    REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_SHOW,

    REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_HIDE,

    REPLACE_SHCEDULE_CLASS_LIST_UPDATE,

    REPLACE_SHCEDULE_TEACHER_DROP_CHANGE,

    REPLACE_SHCEDULE_TEACHER_SEARCH_OPEN,

    REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_SHOW,

    REPLACE_SHCEDULE_TEACHER_SEARCH_LIST_UPDATE,

    REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_HIDE,

    REPLACE_SHCEDULE_REPLACE_TEACHER_DROP_CHANGE,

    REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_OPEN,

    REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_SHOW,

    REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LIST_UPDATE,

    REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_HIDE,

    REPLACE_SHCEDULE_TEACHER_SEARCH_CLOSE,

    REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_CLOSE,

    REPLACE_SHCEDULE_CLASS_CHECKED,

    REPLACE_SHCEDULE_RADIO_CHANGE,

    REPLACE_SHCEDULE_MONTHS_LIST_UPDATE,

    REPLACE_SHCEDULE_MONTHS_CHECKED,

    REPLACE_SHCEDULE_WEEK_LIST_UPDATE,

    REPLACE_SHCEDULE_WEEK_CHECKED,

    REPLACE_SHCEDULE_DATE_CHECKED,

    REPLACE_SHCEDULE_CLASSHOUR_DATE_CHECKED,

    REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_HIDE,

    REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_SHOW,

    REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_UPDATE,

    REPLACE_SHCEDULE_CLASSHOUR_LOADING_SHOW,

    REPLACE_SHCEDULE_CLASSHOUR_LOADING_HIDE,

    REPLACE_SHCEDULE_CLASSHOUR_LIST_CHANGE,

    REPLACE_SHCEDULE_CLASSHOUR_CHECKED_LIST_CHANGE,

    TEACHER_REPLACE_SHCEDULE_MONTHS_LOADING_HIDE,

    TEACHER_REPLACE_SHCEDULE_WEEKS_LOADING_HIDE,

    //与人换课
    CHANGE_SHCEDULE_ORIGIN_TEACHER_DROP_CHANGE,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_OPEN,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_CLOSE,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LOADING_SHOW,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LIST_UPDATE,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LOADING_HIDE,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_DATE_PICK,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_ABLED,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_LIST_UPDATE,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DROP_SELECTD,

    CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DISABLED,

    CHANGE_SHCEDULE_TARGET_TEACHER_DROP_CHANGE,

    CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_OPEN,

    CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_CLOSE,

    CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_SHOW,

    CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LIST_UPDATE,

    CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_HIDE,

    CHANGE_SHCEDULE_TARGET_TEACHER_DATE_PICK,

    CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_ABLED,

    CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_LIST_UPDATE,

    CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DROP_SELECTD,

    CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DISABLED,


    //调整时间

    CHANGE_TIME_TEACHER_DROP_CHANGE,

    CHANGE_TIME_ORIGIN_CHANGE,

    CHANGE_TIME_NEW_CHANGE,

    //调整教室

    CHANGE_CLASS_ROOM_TEACHER_CHANGE,

    CHANGE_CLASS_ROOM_WEEK_TIME_CHANGE,

    CHANGE_CLASS_ROOM_CLASS_HOUR_CHANGE,

    CHANGE_CLASS_ROOM_DATE_CHANGE,

    CHANGE_CLASS_ROOM_TEACHER_CLASSROOM_LIST_CHANGE,

    CHANGE_CLASS_ROOM_TEACHER_CLASSROOM_CHANGE,

    CHANGE_CLASS_ROOM_CLASSROOM_CHANGE,

    //停课

    STOP_SCHEDULE_TEACHER_CHANGE,

    STOP_SCHEDULE_TEACHER_CLASSHOUR_CHANGE,

    STOP_SCHEDULE_DATE_PICK,

    STOP_SCHEDULE_CLASSHOUR_LOADING_SHOW,

    STOP_SCHEDULE_CLASSHOUR_LOADING_HIDE,

    REPLACE_SHCEDULE_ERROR_TIPS_SHOW,

    REPLACE_SHCEDULE_ERROR_TIPS_HIDE,

    CHANGE_SHCEDULE_ERROR_TIPS_SHOW,

    CHANGE_SHCEDULE_ERROR_TIPS_HIDE,

    CHANGE_TIME_ERROR_TIPS_SHOW,

    CHANGE_TIME_ERROR_TIPS_HIDE,

    CHANGE_CLASS_ROOM_ERROR_TIPS_SHOW,

    CHANGE_CLASS_ROOM_ERROR_TIPS_HIDE,

    STOP_SCHEDULE_ERROR_TIPS_SHOW,

    STOP_SCHEDULE_ERROR_TIPS_HIDE,

    AdjustByTeacherScheduleInit,

    replaceTeacherDropChange,

    replaceTeacherClickSearch,

    replaceTeacherSearchClose,

    classChecked,

    radioChange,

    monthChecked,

    weekChecked,

    dateChecked,

    classHourDateChecked,

    classHourChecked,

    //与人换课

    originDateChecked,

    originScheduleDropChange,

    targetTeacherDropChange,

    targetTeacherClickSearch,

    targetTeacherSearchClose,

    targetDateChecked,

    targetScheduleDropChange,


    //调整时间

    changeTimeOriginDate,

    changTimeOldClassHourPick,

    changeTimeNewTimeChange,

    changeTimeNewClassHourPick,

    changeTimeNewClassRoomPick,

    //换教室

    changeClassRoomDatePick,

    changeClassRoomClassHourPick,

    changeClassRoomClassRoomPick,


    //停课

    stopScheduleDateChange,

    stopScheduleClassHoursChecked,

    //提交弹窗

    ModalCommit

};