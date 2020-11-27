import React from 'react';

import AppAlertActions from '../AppAlertActions';

import ApiActions from '../ApiActions';

import ComPageRefresh from '../ComPageRefresh';

import utils from '../utils';


//关于弹窗公共部分
const MANAGER_ADJUST_BY_CLASSROOM_SHOW = 'MANAGER_ADJUST_BY_CLASSROOM_SHOW';

const MANAGER_ADJUST_BY_CLASSROOM_HIDE = 'MANAGER_ADJUST_BY_CLASSROOM_HIDE';

const MANAGER_ADJUST_BY_CLASSROOM_CLASSROOM_LIST_UPDATE = 'MANAGER_ADJUST_BY_CLASSROOM_CLASSROOM_LIST_UPDATE';

//初始教室列表更新

const MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_CLASSROOM_LIST_UPDATE = 'MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_CLASSROOM_LIST_UPDATE';

const MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_CLASSROOM_CHANGE = 'MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_CLASSROOM_CHANGE';

const MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_OPEN = 'MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_OPEN';

const MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_SHOW = 'MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_SHOW';

const MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_HIDE = 'MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_HIDE';

const MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LIST_UPDATE = 'MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LIST_UPDATE';

const MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_ALL_LIST_UPDATE = 'MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_ALL_LIST_UPDATE';

const MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_CLOSE = 'MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_CLOSE';


//目标教室列表更新

const MANAGER_ADJUST_BY_CLASSROOM_TARGET_CLASSROOM_LIST_UPDATE = 'MANAGER_ADJUST_BY_CLASSROOM_TARGET_CLASSROOM_LIST_UPDATE';


const MANAGER_ADJUST_BY_CLASSROOM_TARGET_CLASSROOM_CHANGE = 'MANAGER_ADJUST_BY_CLASSROOM_TARGET_CLASSROOM_CHANGE';

const MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_OPEN = 'MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_OPEN';

const MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_SHOW = 'MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_SHOW';

const MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_HIDE = 'MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_HIDE';

const MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LIST_UPDATE = 'MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LIST_UPDATE';

const MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_ALL_LIST_UPDATE = 'MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_ALL_LIST_UPDATE';

const MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_CLOSE = 'MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_CLOSE';


const MANAGER_ADJUST_BY_CLASSROOM_RADIO_CHANGE = 'MANAGER_ADJUST_BY_CLASSROOM_RADIO_CHANGE';

const MANAGER_ADJUST_BY_CLASSROOM_MONTHS_LIST_UPDATE = 'MANAGER_ADJUST_BY_CLASSROOM_MONTHS_LIST_UPDATE';

const MANAGER_ADJUST_BY_CLASSROOM_MONTHS_CHECKED = 'MANAGER_ADJUST_BY_CLASSROOM_MONTHS_CHECKED';

const MANAGER_ADJUST_BY_CLASSROOM_WEEK_LIST_UPDATE = 'MANAGER_ADJUST_BY_CLASSROOM_WEEK_LIST_UPDATE';

const MANAGER_ADJUST_BY_CLASSROOM_WEEK_CHECKED = 'MANAGER_ADJUST_BY_CLASSROOM_WEEK_CHECKED';

const MANAGER_ADJUST_BY_CLASSROOM_DATE_CHECKED = 'MANAGER_ADJUST_BY_CLASSROOM_DATE_CHECKED';

const MANAGER_ADJUST_BY_CLASSROOM_DATE_HEIGHT_CHANGE = 'MANAGER_ADJUST_BY_CLASSROOM_DATE_HEIGHT_CHANGE';

const MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_DATE_CHECKED = 'MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_DATE_CHECKED';

const MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_WEEK_DATE_LOADING_HIDE = 'MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_WEEK_DATE_LOADING_HIDE';

const MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_WEEK_DATE_LOADING_SHOW = 'MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_WEEK_DATE_LOADING_SHOW';

const MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_WEEK_DATE_UPDATE = 'MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_WEEK_DATE_UPDATE';

const MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_LOADING_SHOW = 'MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_LOADING_SHOW';

const MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_LOADING_HIDE = 'MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_LOADING_HIDE';

const MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_LIST_CHANGE = 'MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_LIST_CHANGE';

const MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_CHECKED_LIST_CHANGE = 'MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_CHECKED_LIST_CHANGE';



const MANAGER_ADJUST_BY_CLASSROOM_LOADING_SHOW = 'MANAGER_ADJUST_BY_CLASSROOM_LOADING_SHOW';

const MANAGER_ADJUST_BY_CLASSROOM_LOADING_HIDE = 'MANAGER_ADJUST_BY_CLASSROOM_LOADING_HIDE';





const MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_SHOW = 'MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_SHOW';

const MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_HIDE = 'MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_HIDE';

//月份loading消失

const MANAGER_ADJUST_BY_CLASSROOM_MONTHS_LOADING_HIDE = 'MANAGER_ADJUST_BY_CLASSROOM_MONTHS_LOADING_HIDE';


//周次loading消失

const MANAGER_ADJUST_BY_CLASSROOM_WEEKS_LOADING_HIDE = 'MANAGER_ADJUST_BY_CLASSROOM_WEEKS_LOADING_HIDE';


//找人代课初始化
const PageInit = () => {

    return ( dispatch,getState ) => {

        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_LOADING_SHOW});



        let {LoginUser} = getState();

        let { SchoolID } = LoginUser;

        ApiActions.GetAllOptionForAddSchedule({SchoolID,dispatch}).then(data => {

            if (data){

                let ClassRoomList = data.ItemClassRoomType.map(item => {

                    let list =  data.ItemClassRoom.map(i => {

                        if (i.ClassRoomTypeID === item.ClassRoomTypeID){

                            return{

                                name:i.ClassRoomName,

                                id:i.ClassRoomID

                            }

                        }else{

                            return;

                        }

                    }).filter(itm => itm!==undefined);

                    return {

                        id:item.ClassRoomTypeID,

                        name:item.ClassRoomTypeName,

                        list

                    }

                });

                dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_CLASSROOM_LIST_UPDATE,data:ClassRoomList});

            }

            dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_LOADING_HIDE});

        });

    };

};

//教室搜索
const OriginClassRoomSearch = (key) => {

    return (dispatch,getState) => {

        if (key.trim() !== ''){

            let pattern =  utils.SearchReg({type:2,dispatch,ErrorTips:"您输入的教室名称或ID不正确",key:key});

            if (pattern){

                let {SchoolID} = getState().LoginUser;

                const ClassRoomID = getState().Manager.AdjustByClassRoom.TargetClassRoom.DropSelectd.value;

                dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_OPEN});

                dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_SHOW});

                ApiActions.GetClassRoomByClassTypeAndKey({SchoolID,PeriodID:'',ClassRoomTypeID:'',Key:key,dispatch}).then(data=>{

                    if (data){

                        let SearchList = [];

                        const SearchAllList = data.map(item => {

                            return{

                                id:item.ClassRoomID,

                                name:item.ClassRoomName

                            };

                        });

                        if (ClassRoomID!=='none'){

                            SearchList = data.map(item => {

                                return{

                                    id:item.ClassRoomID,

                                    name:item.ClassRoomName

                                };

                            }).filter(i=>i.id!==ClassRoomID);

                        }else{

                            SearchList = data.map(item => {

                                return{

                                    id:item.ClassRoomID,

                                    name:item.ClassRoomName

                                };

                            });

                        }

                        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_ALL_LIST_UPDATE,data:SearchAllList});

                        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LIST_UPDATE,data:SearchList});


                    }

                    dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_HIDE});


                });

            }

        }else{

           dispatch(AppAlertActions.alertWarn({title:"搜索的内容不能为空！"}));

        }

    };

};

//取消教师的搜索
const OriginClassRoomCancelSearch = () => {

    return dispatch => {

        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_CLOSE});

    }

};


//目标教室搜索
const TargetClassRoomSearch = (key) => {

    return (dispatch,getState) => {

        if (key.trim() !== ''){

            let pattern =  utils.SearchReg({type:2,dispatch,ErrorTips:"您输入的教室名称或ID不正确",key:key});

            if (pattern){

                let {SchoolID} = getState().LoginUser;

                const ClassRoomID = getState().Manager.AdjustByClassRoom.OriginClassRoom.DropSelectd.value;

                dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_OPEN});

                dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_SHOW});

                ApiActions.GetClassRoomByClassTypeAndKey({SchoolID,PeriodID:'',ClassRoomTypeID:'',Key:key,dispatch}).then(data=>{

                    if (data){

                        let SearchList = [];

                        const SearchAllList = data.map(item => {

                            return{

                                id:item.ClassRoomID,

                                name:item.ClassRoomName

                            };

                        });

                        if (ClassRoomID!=='none'){

                            SearchList = data.map(item => {

                                return{

                                    id:item.ClassRoomID,

                                    name:item.ClassRoomName

                                };

                            }).filter(i=>i.id!==ClassRoomID);

                        }else{

                            SearchList = data.map(item => {

                                return{

                                    id:item.ClassRoomID,

                                    name:item.ClassRoomName

                                };

                            });

                        }

                        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LIST_UPDATE,data:SearchList});

                        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_ALL_LIST_UPDATE,data:SearchAllList});


                    }

                    dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_HIDE});


                });

            }

        }else{

            dispatch(AppAlertActions.alertWarn({title:"搜索的内容不能为空！"}));

        }

    };

};

//取消目标教室的搜索
const TargetClassRoomCancelSearch = () => {

    return dispatch => {

        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_CLOSE});

    }

};




//radio变化
const radioChange = (id) => {

    return (dispatch,getState) => {

      dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_RADIO_CHANGE,data:id});

        let { SchoolID } = getState().LoginUser;

        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_HIDE,data:{type:'month'}});

        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_HIDE,data:{type:'week'}});

        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_HIDE,data:{type:'date'}});

        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_HIDE,data:{type:'classHourDate'}});

        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_HIDE,data:{type:'classHour'}});

        ApiActions.GetAllDateTimeInfo({SchoolID,dispatch}).then(data => {

            if (data) {

                if (id === 'month') {

                    const {ItemMonth} = data;

                    let list = ItemMonth.map(item => {

                        return {

                            id: item.MonthID,

                            name: item.MonthName

                        }

                    });

                    dispatch({type: MANAGER_ADJUST_BY_CLASSROOM_MONTHS_LIST_UPDATE, data: list});

                    dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_MONTHS_LOADING_HIDE});


                }

                if (id === 'week') {

                    const {ItemWeek} = data;

                    let list = ItemWeek.map(item => item.WeekNO);

                    dispatch({type: MANAGER_ADJUST_BY_CLASSROOM_WEEK_LIST_UPDATE, data: list});

                    dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_WEEKS_LOADING_HIDE});

                }

                if (id === 'classHour') {

                    let morning = {id: 1, name: "上午", list: []};

                    let afternoon = {id: 2, name: "下午", list: []};

                    let night = {id: 3, name: "晚上", list: []};

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

                    if (morning.list.length > 0) {

                        classHourList.push(morning);

                    }

                    if (afternoon.list.length > 0) {

                        classHourList.push(afternoon);

                    }

                    if (night.list.length > 0) {

                        classHourList.push(night);

                    }

                    let classHourPlainOpts = JSON.parse(JSON.stringify(classHourList));

                    let classHourCheckedList = classHourList.map(item => {

                        return {

                            id: item.id,

                            name: item.name,

                            checked: false,

                            list: []

                        }

                    });

                    dispatch({
                        type: MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_LIST_CHANGE,
                        data: {classHourList, classHourPlainOpts, classHourCheckedList}
                    });

                    dispatch({type: MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_LOADING_HIDE});

                }

            }

        });

    };

};
//月份变化
const monthChecked = (id) => {

    return (dispatch,getState) => {

        let {monthsCheckedList} = getState().Manager.AdjustByClassRoom;

        if (monthsCheckedList.includes(id)){

            monthsCheckedList.remove(id);

        }else{

            monthsCheckedList.push(id);

        }

        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_MONTHS_CHECKED,data:monthsCheckedList});

    }

};
//周次变化
const weekChecked = (id) => {

    return (dispatch,getState) => {

        let {weeksCheckedList} = getState().Manager.AdjustByClassRoom;

        if (weeksCheckedList.includes(id)){

            weeksCheckedList.remove(id);

        }else{

            weeksCheckedList.push(id);

        }

        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_MONTHS_CHECKED,data:weeksCheckedList});

    }

};

//日期变化
const dateChecked = (date) => {

    return (dispatch,getState) => {

        let { dateCheckedList } = getState().Manager.AdjustByClassRoom;

        if (date ===''){

            dateCheckedList = [];

        }else if (dateCheckedList.includes(date)) {

            let findIndex = dateCheckedList.findIndex(item=>item===date);

            if (findIndex>=0){

                dateCheckedList.splice(findIndex,1);

            }

        }else{

            dateCheckedList.push(date);

        }

        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_DATE_CHECKED,data:dateCheckedList});

    }

};
//课时日期选取
const classHourDateChecked = (date) => {

    return (dispatch,getState) => {

        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_DATE_CHECKED,data:date});

        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_WEEK_DATE_LOADING_SHOW});

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

                    dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_WEEK_DATE_UPDATE,data:{WeekNO,WeekDay}});

                    dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_WEEK_DATE_LOADING_HIDE});

                }

            });

        }

    }

};


//课时选取
const classHourChecked = (opts) => {

    return (dispatch,getState) => {

        const { classHourCheckedList,classHourPlainOpts } = getState().Manager.AdjustByClassRoom;

        let checkedList = [];

        console.log(opts);

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

        dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_CHECKED_LIST_CHANGE,data:checkedList});

    }

};








//提交按教师修改弹窗

//提交弹窗

const ModalCommit = () => {

  return (dispatch,getState) => {

      const { AdjustByClassRoom } = getState().Manager;

        let {

            activeRadio,

            OriginClassRoom,

            TargetClassRoom,

            classCheckedList,

            classList,

            monthsCheckedList,

            weeksCheckedList,

            dateCheckedList,

            classHourCheckedList,

            classHourDate

        } = AdjustByClassRoom;

        let OriginClassRoomOk,TargetClassRoomOk,DayLineOk = false;

        //判断原始教室是否已被选择
        if (OriginClassRoom.DropSelectd.value==='none'){

            dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_SHOW,data:{type:"OriginClassRoom",title:"请选择教室"}});

        }else{

            OriginClassRoomOk = true;

            dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_HIDE,data:{type:"OriginClassRoom"}});


        }

        //判断替代的教师是否已被选择
          if (TargetClassRoom.DropSelectd.value==='none'){

              dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_SHOW,data:{type:"TargetClassRoom",title:"请选择教室"}});

          }else{

              TargetClassRoomOk = true;

              dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_HIDE,data:{type:"TargetClassRoom"}});

          }

          //判断班级是否选择


          if (activeRadio === 'all'){

              DayLineOk = true;

          }

          if (activeRadio === 'month'){

              if(monthsCheckedList.length>0){

                  DayLineOk = true;

                  dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_HIDE,data:{type:"month"}})

              }else{

                  dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_SHOW,data:{type:"month",title:"请选择月份"}})

              }

          }

          if (activeRadio === 'week'){

              if(weeksCheckedList.length>0){

                  DayLineOk = true;

                  dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_HIDE,data:{type:"week"}})

              }else{

                  dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_SHOW,data:{type:"week",title:"请选择周次"}})

              }

          }

          if (activeRadio === 'date'){

              if(dateCheckedList.length>0){

                  DayLineOk = true;

                  dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_HIDE,data:{type:"date"}})

              }else{

                  dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_SHOW,data:{type:"date",title:"请选择日期"}})

              }

          }

          if (activeRadio === 'classHour'){

              let thisDateOk,thisClassHourOk = false;

              let classHourLength = 0;

              classHourCheckedList.map(item => {

                  classHourLength = classHourLength + item.list.length;

              });

              if (classHourDate){

                  dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_HIDE,data:{type:"classHourDate"}});

                  thisDateOk = true;

              }else {

                  dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_SHOW,data:{type:"classHourDate",title:"请选择日期"}});


              }



              if (classHourLength>0){

                  dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_HIDE,data:{type:"classHour"}});

                  thisClassHourOk = true;

              }else {

                  dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_SHOW,data:{type:"classHour",title:"请选择课时"}});


              }


              if (thisDateOk&&thisClassHourOk){

                  DayLineOk = true;

              }

          }

          //所有的都已经OK了可以向后台发送请求了
          if (OriginClassRoomOk&&TargetClassRoomOk&&DayLineOk){

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

              let ClassRoomID1 = OriginClassRoom.DropSelectd.value;

              let ClassRoomID2 = TargetClassRoom.DropSelectd.value;

              let SubjectID = '';

              let {classCheckedList} =  getState().Manager.AdjustByClassRoom;


              dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_LOADING_SHOW});

              ApiActions.AdjustClassRooomOfSchedule({

                  Type,Item,ClassRoomID1,ClassRoomID2,dispatch,

                  SchoolID,UserID,UserType:parseInt(UserType)

              }).then((data) => {

                  if (data===0){

                      dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_HIDE});

                      dispatch(AppAlertActions.alertSuccess({title:"调整教室成功！"}));

                      // ComPageRefresh.ComPageUpdate(dispatch);

	                  dispatch(ComPageRefresh.ComPageScheduleBetterUpdate());

                  }

                  dispatch({type:MANAGER_ADJUST_BY_CLASSROOM_LOADING_HIDE});

              });

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

    MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_CLASSROOM_CHANGE,

    MANAGER_ADJUST_BY_CLASSROOM_SHOW,

    MANAGER_ADJUST_BY_CLASSROOM_HIDE,

    MANAGER_ADJUST_BY_CLASSROOM_CLASSROOM_LIST_UPDATE,

    MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_SHOW,

    MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LOADING_HIDE,

    MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_OPEN,

    MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_LIST_UPDATE,

    MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_CLOSE,

    MANAGER_ADJUST_BY_CLASSROOM_TARGET_CLASSROOM_CHANGE,

    MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_SHOW,

    MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LOADING_HIDE,

    MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_OPEN,

    MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_LIST_UPDATE,

    MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_CLOSE,

    MANAGER_ADJUST_BY_CLASSROOM_LOADING_SHOW,

    MANAGER_ADJUST_BY_CLASSROOM_LOADING_HIDE,

    MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_SHOW,

    MANAGER_ADJUST_BY_CLASSROOM_ERROR_TIPS_HIDE,

    MANAGER_ADJUST_BY_CLASSROOM_RADIO_CHANGE,

    MANAGER_ADJUST_BY_CLASSROOM_MONTHS_LIST_UPDATE,

    MANAGER_ADJUST_BY_CLASSROOM_MONTHS_CHECKED,

    MANAGER_ADJUST_BY_CLASSROOM_WEEK_LIST_UPDATE,

    MANAGER_ADJUST_BY_CLASSROOM_WEEK_CHECKED,

    MANAGER_ADJUST_BY_CLASSROOM_DATE_CHECKED,

    MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_DATE_CHECKED,

    MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_WEEK_DATE_LOADING_HIDE,

    MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_WEEK_DATE_LOADING_SHOW,

    MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_WEEK_DATE_UPDATE,

    MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_LOADING_SHOW,

    MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_LOADING_HIDE,

    MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_LIST_CHANGE,

    MANAGER_ADJUST_BY_CLASSROOM_CLASSHOUR_CHECKED_LIST_CHANGE,

    MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_CLASSROOM_LIST_UPDATE,

    MANAGER_ADJUST_BY_CLASSROOM_TARGET_CLASSROOM_LIST_UPDATE,

    MANAGER_ADJUST_BY_CLASSROOM_ORIGIN_SEARCH_ALL_LIST_UPDATE,

    MANAGER_ADJUST_BY_CLASSROOM_TARGET_SEARCH_ALL_LIST_UPDATE,

    MANAGER_ADJUST_BY_CLASSROOM_WEEKS_LOADING_HIDE,

    MANAGER_ADJUST_BY_CLASSROOM_MONTHS_LOADING_HIDE,

    PageInit,

    OriginClassRoomSearch,

    OriginClassRoomCancelSearch,

    TargetClassRoomSearch,

    TargetClassRoomCancelSearch,

    radioChange,

    monthChecked,

    weekChecked,

    dateChecked,

    classHourDateChecked,

    classHourChecked,

    //提交弹窗

    ModalCommit

};