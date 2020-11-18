import ABTActions from '../../actions/Manager/AdjustByTeacherActions';




const AdjustByTeacherModal = (state={

    show:false,

    activeKey:"1",

    teacherList:[],

    LoadingShow:true,

    ClassHourList:[],

    ClassRoomTypeList:[],

    replaceSchedule:{

        loadingShow:true,

        teacherOptions:{

            dropSelectd:{value:"none",title:"请选择任课教师"},

            searchList:[],

            searchLoadingShow:false,

            searchOpen:false

        },

        replaceTeacherOptions:{

            dropDisabled:true,

            dropSelectd:{value:"none",title:"请选择任课教师"},

            dropList:[],

            searchList:[],

            searchLoadingShow:false,

            searchOpen:false

        },

        teacherSubject:{

            dropShow:false,

            select:{

                dropSelectd:'',

                dropList:[]

            },

            name:'',

            id:''

        },

        ClassTotalList:[],

        classList:[],

        classCheckedList:[],

        activeRadio:"",

        monthsList:[],

        monthsLoading:true,

        monthsCheckedList:[],

        weeksList:[],

        weeksLoading:true,

        weeksCheckedList:[],

        dateCheckedList:[],

        classHourDate:'',

        WeekDay:'',

        WeekNO:'',

        dateLoadingShow:true,

        classHourList:[],

        classHourCheckedList:[],

        classHourLoadingShow:true,

        classHourPlainOpts:[],

        originTeacherTips:false,

        originTeacherTipsTitle:'',

        replaceTeacherTips:false,

        replaceTeacherTipsTitle:'',

        classTips:false,

        classTipsTitle:'',

        monthTips:false,

        monthTipsTitle:'',

        weekTips:false,

        weekTipsTitle:'',

        dateTips:false,

        dateTipsTitle:'',

        classHourDateTips:false,

        classHourDateTipsTitle:'',

        classHourTips:false,

        classHourTipsTitle:'',

    },

    changeSchedule:{

        originDropSelectd:{value:"none",title:"请选择任课教师"},

        originSearchList:[],

        originSearchOpen:false,

        originSearchLoadingShow:true,

        originDate:'',

        originSchedulePickDisabled:true,

        originScheduleList:[],

        originScheduleDropSelectd:{value:"none",title:"请选择节次"},

        targetDropSelectd:{value:"none",title:"请选择任课教师"},

        targetSearchList:[],

        targetSearchOpen:false,

        targetSearchLoadingShow:true,

        targetDate:'',

        targetSchedulePickDisabled:true,

        targetScheduleList:[],

        targetScheduleDropSelectd:{value:"none",title:"请选择节次"},

        originTeacherTips:false,

        originDateTips:false,

        originScheduleTips:false,

        targetTeacherTips:false,

        targetDateTips:false,

        targetScheduleTips:false

    },

    changeTime:{

        oldClassRoomList:[],

        teacherDrop:{value:"none",title:"请选择任课教师"},

        searchList:[],

        searchOpen:false,

        searchLoadingShow:true,

        originDate:'',

        oldClassHourDrop:{value:"none",title:"请选择节次"},

        oldClassHourList:[],

        oldClassHourDisabled:true,

        oldWeek:'',

        oldWeekLoading:true,

        newDate:'',

        newClassHourDrop:{value:"none",title:"请选择节次"},

        newClassHourList:[],

        newClassHourDisabled:true,

        newWeek:'',

        newWeekLoading:true,

        newClassRoomDrop:{value:"none",title:"请选择教室"},

        newClassRoomList:[],

        newClassRoomDisabled:true,

        errorTips:false,

        teacherTips:false,

        originDateTips:false,

        originScheduleTips:false,

        targetDateTips:false,

        targetScheduleTips:false,

        targetClassRoomTips:false

    },

    ChangeClassRoom:{

        loadingShow:true,

        teacherDrop:{value:"none",title:"请选择任课教师"},

        teacherSearchList:[],

        teacherSearchOpen:false,

        teacherSearchLoadingShow:true,

        teacherClassRoomList:[],

        date:"",

        classHourDrop:{value:"none",title:"请选择节次"},

        classHourList:[],

        classHourDisabled:true,

        WeekNO:"",

        WeekDay:"",

        ClassHour:"",

        teacherClassRoom:{id:"none",name:"请选择节次来获取上课教室"},

        classRoomDrop:{value:"none",title:"请选择教室"},

        classRoomList:[],

        classRoomDisabled:true,

        teacherTips:false,

        dateTips:false,

        scheduleTips:false,

        targetClassRoomTips:false

    },

    StopSchedule: {

        date:"",

        classHours:[],

        classHoursCheckedList:[],

        classHoursPlainOpts:[],

        teacherDrop:{value:"none",title:"请选择任课教师"},

        teacherSearchOpen:false,

        teacherSearchLoadingShow:false,

        teacherSearchList:[],

        classHourLoading:false,

        dateTips:false,

        scheduleTips:false,

        teacherTips:false

    }

}, actions) => {

    switch (actions.type) {

        case ABTActions.ADJUST_BY_TEACHER_SHOW:

            return {

                ...state,

                show:true,

                activeKey:"1",

                LoadingShow:true,

                teacherList:[],

                ClassHourList:[],

                ClassRoomTypeList:[]

            };

        case ABTActions.MANAGER_ADJUST_BY_TEACHER_MODAL_INIT:

            return {

                ...state,

                replaceSchedule:{

                    loadingShow:true,

                    teacherOptions:{

                        dropSelectd:{value:"none",title:"请选择任课教师"},

                        searchList:[],

                        searchLoadingShow:false,

                        searchOpen:false

                    },

                    replaceTeacherOptions:{

                        dropDisabled:true,

                        dropSelectd:{value:"none",title:"请选择任课教师"},

                        dropList:[],

                        searchList:[],

                        searchLoadingShow:false,

                        searchOpen:false

                    },

                    teacherSubject:{

                        dropShow:false,

                        select:{

                            dropSelectd:'',

                            dropList:[]

                        },

                        name:'',

                        id:''

                    },

                    classList:[],

                    classCheckedList:[],

                    activeRadio:"",

                    monthsList:[],

                    monthsCheckedList:[],

                    monthsLoading:true,

                    weeksList:[],

                    weeksCheckedList:[],

                    weeksLoading:true,

                    dateCheckedList:[],

                    classHourDate:'',

                    WeekDay:'',

                    WeekNO:'',

                    dateLoadingShow:true,

                    classHourList:[],

                    classHourCheckedList:[],

                    classHourLoadingShow:true,

                    classHourPlainOpts:[],

                    originTeacherTips:false,

                    originTeacherTipsTitle:'',

                    replaceTeacherTips:false,

                    replaceTeacherTipsTitle:'',

                    classTips:false,

                    classTipsTitle:'',

                    monthTips:false,

                    monthTipsTitle:'',

                    weekTips:false,

                    weekTipsTitle:'',

                    dateTips:false,

                    dateTipsTitle:'',

                    classHourDateTips:false,

                    classHourDateTipsTitle:'',

                    classHourTips:false,

                    classHourTipsTitle:'',

                },

                changeSchedule:{

                    originDropSelectd:{value:"none",title:"请选择任课教师"},

                    originSearchList:[],

                    originSearchOpen:false,

                    originSearchLoadingShow:true,

                    originDate:'',

                    originSchedulePickDisabled:true,

                    originScheduleList:[],

                    originScheduleDropSelectd:{value:"none",title:"请选择节次"},

                    targetDropSelectd:{value:"none",title:"请选择任课教师"},

                    targetSearchList:[],

                    targetSearchOpen:false,

                    targetSearchLoadingShow:true,

                    targetDate:'',

                    targetSchedulePickDisabled:true,

                    targetScheduleList:[],

                    targetScheduleDropSelectd:{value:"none",title:"请选择节次"},

                    originTeacherTips:false,

                    originDateTips:false,

                    originScheduleTips:false,

                    targetTeacherTips:false,

                    targetDateTips:false,

                    targetScheduleTips:false

                },

                changeTime:{

                    oldClassRoomList:[],

                    teacherDrop:{value:"none",title:"请选择任课教师"},

                    searchList:[],

                    searchOpen:false,

                    searchLoadingShow:true,

                    originDate:'',

                    oldClassHourDrop:{value:"none",title:"请选择节次"},

                    oldClassHourList:[],

                    oldClassHourDisabled:true,

                    oldWeek:'',

                    oldWeekLoading:true,

                    newDate:'',

                    newClassHourDrop:{value:"none",title:"请选择节次"},

                    newClassHourList:[],

                    newClassHourDisabled:true,

                    newWeek:'',

                    newWeekLoading:true,

                    newClassRoomDrop:{value:"none",title:"请选择教室"},

                    newClassRoomList:[],

                    newClassRoomDisabled:true,

                    errorTips:false,

                    teacherTips:false,

                    originDateTips:false,

                    originScheduleTips:false,

                    targetDateTips:false,

                    targetScheduleTips:false,

                    targetClassRoomTips:false

                },

                ChangeClassRoom:{

                    loadingShow:true,

                    teacherDrop:{value:"none",title:"请选择任课教师"},

                    teacherSearchList:[],

                    teacherSearchOpen:false,

                    teacherSearchLoadingShow:true,

                    teacherClassRoomList:[],

                    date:"",

                    classHourDrop:{value:"none",title:"请选择节次"},

                    classHourList:[],

                    classHourDisabled:true,

                    WeekNO:"",

                    WeekDay:"",

                    ClassHour:"",

                    teacherClassRoom:{id:"none",name:"请选择节次来获取上课教室"},

                    classRoomDrop:{value:"none",title:"请选择教室"},

                    classRoomList:[],

                    classRoomDisabled:true,

                    teacherTips:false,

                    dateTips:false,

                    scheduleTips:false,

                    targetClassRoomTips:false

                },

                StopSchedule: {

                    date:"",

                    classHours:[],

                    classHoursCheckedList:[],

                    classHoursPlainOpts:[],

                    teacherDrop:{value:"none",title:"请选择任课教师"},

                    teacherSearchOpen:false,

                    teacherSearchLoadingShow:false,

                    teacherSearchList:[],

                    classHourLoading:false,

                    dateTips:false,

                    scheduleTips:false,

                    teacherTips:false

                }

            };

        case ABTActions.ADJUST_BY_TEACHER_HIDE:

            return {

                ...state,

                show:false,

                activeKey:"5"

            };

        case ABTActions.ADJUST_BY_TEACHER_TAB_CHANGE:

            return{...state,activeKey:actions.data};

        case ABTActions.ADJUST_BY_TEACHER_TEACHER_LIST_UPDATE:

            return {

                ...state,

                teacherList:actions.data

            };

        case ABTActions.ADJUST_BY_TEACHER_LOADING_HIDE:

            return {...state,LoadingShow:false};

        case ABTActions.ADJUST_BY_TEACHER_LOADING_SHOW:

            return {...state,LoadingShow:true};

        case ABTActions.ADJUST_BY_TEACHER_CLASS_HOURS_LIST_UPDATE:

            return {...state,ClassHourList:actions.data};

        case ABTActions.ADJUST_BY_TEACHER_CLASS_ROOM_TYPE_LIST_UPDATE:

            return {...state,ClassRoomTypeList:actions.data};

        case ABTActions.REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_SHOW:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    teacherSubject:{

                        ...state.replaceSchedule.teacherSubject,

                        dropShow:true,

                        select:{

                            dropSelectd:actions.data.dropSelectd,

                            dropList:actions.data.dropList

                        }

                    }

                }

            };

        case ABTActions.REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_CHANGE:

		    return {

			    ...state,

			    replaceSchedule:{

				    ...state.replaceSchedule,

				    teacherSubject:{

					    ...state.replaceSchedule.teacherSubject,

					    dropShow:true,

					    select:{

                            ...state.replaceSchedule.teacherSubject.select,

						    dropSelectd:actions.data

					    }

				    }

			    }

		    };

        case ABTActions.REPLACE_SHCEDULE_CLASS_LIST_UPDATE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    classList:actions.data.classList,

                    ClassTotalList:actions.data.ClassTotalList?actions.data.ClassTotalList:state.replaceSchedule.ClassTotalList

                }

            };

        case ABTActions.REPLACE_SHCEDULE_TEACHER_SSUBJECT_DROP_HIDE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    teacherSubject:{

                        ...state.replaceSchedule.teacherSubject,

                        dropShow:false,

                        id:actions.data.id,

                        name:actions.data.name

                    }

                }

            };

        case ABTActions.REPLACE_SHCEDULE_TEACHER_DROP_CHANGE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    teacherOptions:{

                        ...state.replaceSchedule.teacherOptions,

                        dropSelectd:actions.data

                    }

                }

            };

        case ABTActions.REPLACE_SHCEDULE_TEACHER_SEARCH_LIST_UPDATE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    teacherOptions:{

                        ...state.replaceSchedule.teacherOptions,

                        searchList:actions.data

                    }

                }

            };

        case ABTActions.REPLACE_SHCEDULE_TEACHER_SEARCH_OPEN:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    teacherOptions:{

                        ...state.replaceSchedule.teacherOptions,

                        searchOpen:true

                    }

                }

            };

        case ABTActions.REPLACE_SHCEDULE_TEACHER_SEARCH_CLOSE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    teacherOptions:{

                        ...state.replaceSchedule.teacherOptions,

                        searchOpen:false

                    }

                }

            };

        case ABTActions.REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_HIDE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    teacherOptions:{

                        ...state.replaceSchedule.teacherOptions,

                        searchLoadingShow:false

                    }

                }


            };

        case ABTActions.REPLACE_SHCEDULE_TEACHER_SEARCH_LOADING_SHOW:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    teacherOptions:{

                        ...state.replaceSchedule.teacherOptions,

                        searchLoadingShow:true

                    }

                }


            };

        case ABTActions.MANAGER_REPLACE_SCHEDULE_REPLACE_TEACHER_DROP_ABLED:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    replaceTeacherOptions:{

                        ...state.replaceSchedule.replaceTeacherOptions,

                        dropDisabled:false

                    }

                }

            };

        case ABTActions.MANAGER_REPLACE_SCHEDULE_REPLACE_TEACHER_DROP_LIST_UPDATE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    replaceTeacherOptions:{

                        ...state.replaceSchedule.replaceTeacherOptions,

                        dropList:actions.data

                    }

                }

            };

        case ABTActions.MANAGER_REPLACE_SCHEDULE_MONTHS_LOADING_HIDE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    monthsLoading:false

                }

            };

        case ABTActions.MANAGER_REPLACE_SCHEDULE_MONTHS_LOADING_SHOW:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    monthsLoading:true

                }

            };

        case ABTActions.MANAGER_REPLACE_SCHEDULE_WEEKS_LOADING_HIDE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    weeksLoading:false

                }

            };

        case ABTActions.MANAGER_REPLACE_SCHEDULE_WEEKS_LOADING_SHOW:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    weeksLoading:true

                }

            };

        case ABTActions.REPLACE_SHCEDULE_REPLACE_TEACHER_DROP_CHANGE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    replaceTeacherOptions:{

                        ...state.replaceSchedule.replaceTeacherOptions,

                        dropSelectd:actions.data

                    }

                }

            };

        case ABTActions.REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LIST_UPDATE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    replaceTeacherOptions:{

                        ...state.replaceSchedule.replaceTeacherOptions,

                        searchList:actions.data

                    }

                }

            };



        case ABTActions.REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_OPEN:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    replaceTeacherOptions:{

                        ...state.replaceSchedule.replaceTeacherOptions,

                        searchOpen:true

                    }

                }

            };

        case ABTActions.REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_CLOSE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    replaceTeacherOptions:{

                        ...state.replaceSchedule.replaceTeacherOptions,

                        searchOpen:false

                    }

                }

            };

        case ABTActions.REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_HIDE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    replaceTeacherOptions:{

                        ...state.replaceSchedule.replaceTeacherOptions,

                        searchLoadingShow:false

                    }

                }


            };

        case ABTActions.REPLACE_SHCEDULE_REPLACE_TEACHER_SEARCH_LOADING_SHOW:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    replaceTeacherOptions:{

                        ...state.replaceSchedule.replaceTeacherOptions,

                        searchLoadingShow:true

                    }

                }


            };

        case ABTActions.REPLACE_SHCEDULE_CLASS_CHECKED:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    classCheckedList:actions.data

                }


            };

        case ABTActions.REPLACE_SHCEDULE_RADIO_CHANGE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    activeRadio:actions.data

                }

            };

        case ABTActions.REPLACE_SHCEDULE_MONTHS_LIST_UPDATE:

            return{

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    monthsList:actions.data

                }

            };

        case ABTActions.REPLACE_SHCEDULE_MONTHS_CHECKED:

            return{

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    monthsCheckedList:actions.data

                }

            };

        case ABTActions.REPLACE_SHCEDULE_WEEK_LIST_UPDATE:

            return{

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    weeksList:actions.data

                }

            };

        case ABTActions.REPLACE_SHCEDULE_WEEK_CHECKED:

            return{

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    weeksCheckedList:actions.data

                }

            };

        case ABTActions.REPLACE_SHCEDULE_DATE_CHECKED:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    dateCheckedList:actions.data

                }

            };

        case ABTActions.REPLACE_SHCEDULE_CLASSHOUR_DATE_CHECKED:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    classHourDate:actions.data

                }

            };

        case ABTActions.REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_SHOW:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    dateLoadingShow:true

                }

            };

        case ABTActions.REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_LOADING_HIDE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    dateLoadingShow:false

                }

            };

        case ABTActions.REPLACE_SHCEDULE_CLASSHOUR_WEEK_DATE_UPDATE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    WeekNO:actions.data.WeekNO,

                    WeekDay:actions.data.WeekDay

                }

            };


        case ABTActions.REPLACE_SHCEDULE_CLASSHOUR_LOADING_SHOW:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    classHourLoadingShow:true

                }

            };

        case ABTActions.REPLACE_SHCEDULE_CLASSHOUR_LOADING_HIDE:

            return {

            ...state,

            replaceSchedule:{

                ...state.replaceSchedule,

                classHourLoadingShow:false

            }

        };

        case ABTActions.REPLACE_SHCEDULE_CLASSHOUR_LIST_CHANGE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    classHourList:actions.data.classHourList,

                    classHourPlainOpts:actions.data.classHourPlainOpts,

                    classHourCheckedList:actions.data.classHourCheckedList

                }

            };

        case ABTActions.REPLACE_SHCEDULE_CLASSHOUR_CHECKED_LIST_CHANGE:

            return {

                ...state,

                replaceSchedule:{

                    ...state.replaceSchedule,

                    classHourCheckedList:actions.data

                }

            };

            //与人换课

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_DROP_CHANGE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    originDropSelectd:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LIST_UPDATE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    originSearchList:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_OPEN:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    originSearchOpen:true

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_CLOSE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    originSearchOpen:false

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LOADING_HIDE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    originSearchLoadingShow:false

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_SEARCH_LOADING_SHOW:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    originSearchLoadingShow:true

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_DATE_PICK:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    originDate:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_ABLED:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    originSchedulePickDisabled:false

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_LIST_UPDATE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    originScheduleList:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DROP_SELECTD:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    originScheduleDropSelectd:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_ORIGIN_TEACHER_SCHEDULE_DISABLED:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    originSchedulePickDisabled:true

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_DROP_CHANGE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    targetDropSelectd:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LIST_UPDATE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    targetSearchList:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_OPEN:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    targetSearchOpen:true

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_CLOSE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    targetSearchOpen:false

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_HIDE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    targetSearchLoadingShow:false

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_SEARCH_LOADING_SHOW:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    targetSearchLoadingShow:true

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_DATE_PICK:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,


                    targetDate:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_ABLED:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    targetSchedulePickDisabled:false

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_LIST_UPDATE:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    targetScheduleList:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DROP_SELECTD:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    targetScheduleDropSelectd:actions.data

                }

            };

        case ABTActions.CHANGE_SHCEDULE_TARGET_TEACHER_SCHEDULE_DISABLED:

            return {

                ...state,

                changeSchedule:{

                    ...state.changeSchedule,

                    targetSchedulePickDisabled:true

                }

            };

            //调整时间

        case ABTActions.CHANGE_TIME_TEACHER_DROP_CHANGE:

            switch (actions.data.type) {

                case 'drop':

                    return {


                        ...state,

                      changeTime: {

                          ...state.changeTime,


                          teacherDrop:actions.data.value

                      }

                    };

                case 'search':

                    return {


                        ...state,

                        changeTime: {

                            ...state.changeTime,


                            searchOpen:true

                        }

                    };

                case 'searchLoadingShow':

                    return {


                        ...state,

                        changeTime: {

                            ...state.changeTime,


                            searchLoadingShow:true

                        }

                    };

                case 'teacherListChange':

                    return {


                        ...state,

                        changeTime: {

                            ...state.changeTime,

                            searchList:actions.data.value

                        }

                    };

                case 'searchLoadingHide':

                    return {


                        ...state,

                        changeTime: {

                            ...state.changeTime,


                            searchLoadingShow:false

                        }

                    };

                case 'searchClose':

                    return {


                        ...state,

                        changeTime: {

                            ...state.changeTime,


                            searchOpen:false

                        }

                    };

                default:

                    return state;

            }

        case ABTActions.CHANGE_TIME_ORIGIN_CHANGE:

            switch (actions.data.type) {

                case 'date':

                    return{

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            originDate:actions.data.value

                        }

                    };

                case 'classHourDisabled':

                    return{

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            oldClassHourDisabled:true

                        }

                    };

                case 'classHourAbled':

                    return{

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            oldClassHourDisabled:false,

                            oldClassHourDrop:actions.data.value

                        }

                    };

                case 'classHourListChange':

                    return{

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            oldClassHourList:actions.data.value

                        }

                    };

                case 'classHourPick':

                    return{

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            oldClassHourDrop:actions.data.value

                        }

                    };

                case 'weekChange':

                    return{

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            oldWeek:actions.data.value

                        }

                    };

                case 'oldClassRoomListChange':

                    return{

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            oldClassRoomList:actions.data.value

                        }

                    };


                default:

                    return state;

            }

        case ABTActions.CHANGE_TIME_NEW_CHANGE:

            switch (actions.data.type) {

                case 'date':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            newDate:actions.data.value

                        }

                    };

                case 'classHourDisabled':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            newClassHourDisabled:true

                        }

                    };

                case 'weekChange':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            newWeek:actions.data.value

                        }

                    };

                case 'classHourListChange':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            newClassHourList:actions.data.value

                        }

                    };

                case 'classHourAbled':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            newClassHourDisabled:false

                        }

                    };

                case 'classHourDrop':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            newClassHourDrop:actions.data.value

                        }

                    };

                case 'classRoomAbled':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            newClassRoomDisabled:false

                        }

                    };

                case 'classRoomDisabled':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            newClassRoomDisabled:true

                        }

                    };

                case 'classRoomListChange':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            newClassRoomList:actions.data.value

                        }

                    };

                case 'classRoomDrop':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            newClassRoomDrop:actions.data.value

                        }

                    };

                case 'errorTipsShow':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            errorTips:true

                        }

                    };

                case 'errorTipsHide':

                    return {

                        ...state,

                        changeTime:{

                            ...state.changeTime,

                            errorTips:false

                        }

                    };

                default:

                    return state;

            }



         //调整教室

        case ABTActions.CHANGE_CLASS_ROOM_TEACHER_CHANGE:

            switch (actions.data.type) {

                case "drop":

                    return {...state,ChangeClassRoom:{...state.ChangeClassRoom,teacherDrop:actions.data.value}};

                case "search":

                    return {...state,ChangeClassRoom:{...state.ChangeClassRoom,teacherSearchOpen:true}};

                case "searchClose":

                    return {...state,ChangeClassRoom:{...state.ChangeClassRoom,teacherSearchOpen:false}};

                case "searchLoadingShow":

                    return {...state,ChangeClassRoom:{...state.ChangeClassRoom,teacherSearchLoadingShow:true}};

                case "searchListChange":

                    return {...state,ChangeClassRoom:{...state.ChangeClassRoom,teacherSearchList:actions.data.value}};

                case "searchLoadingHide":

                    return {...state,ChangeClassRoom:{...state.ChangeClassRoom,teacherSearchLoadingShow:false}};


                default:

                    return state;

            }

        case ABTActions.CHANGE_CLASS_ROOM_WEEK_TIME_CHANGE:

            return { ...state,ChangeClassRoom:{...state.ChangeClassRoom,...actions.data} };

        case ABTActions.CHANGE_CLASS_ROOM_CLASS_HOUR_CHANGE:

            switch (actions.data.type) {

                case "classHourDrop":

                    return {...state,ChangeClassRoom:{...state.ChangeClassRoom,classHourDrop:actions.data.value}};

                case "classHourAbled":

                    return {...state,ChangeClassRoom:{...state.ChangeClassRoom,classHourDisabled:false}};

                case "classHourListChange":

                    return {...state,ChangeClassRoom:{...state.ChangeClassRoom,classHourList:actions.data.value}};

                case "classHourDisabled":

                    return {...state,ChangeClassRoom:{...state.ChangeClassRoom,classHourDisabled:true}};

                default:

                    return state;

            }

        case ABTActions.CHANGE_CLASS_ROOM_DATE_CHANGE:

            return { ...state,ChangeClassRoom:{ ...state.ChangeClassRoom,date:actions.data }};

        case ABTActions.CHANGE_CLASS_ROOM_TEACHER_CLASSROOM_LIST_CHANGE:

            return { ...state,ChangeClassRoom:{ ...state.ChangeClassRoom,teacherClassRoomList:actions.data }};

        case ABTActions.CHANGE_CLASS_ROOM_TEACHER_CLASSROOM_CHANGE:

            return {...state,ChangeClassRoom:{...state.ChangeClassRoom,teacherClassRoom:actions.data}};

        case ABTActions.CHANGE_CLASS_ROOM_CLASSROOM_CHANGE:

            switch (actions.data.type) {

                case "classRoomAbled":

                    return{ ...state,ChangeClassRoom:{...state.ChangeClassRoom,classRoomDisabled:false} };

                case "classRoomDisabled":

                    return{ ...state,ChangeClassRoom:{...state.ChangeClassRoom,classRoomDisabled:true} };

                case "classRoomDrop":

                    return{ ...state,ChangeClassRoom:{...state.ChangeClassRoom,classRoomDrop:actions.data.value} };

                case "classRoomListChange":

                    return{ ...state,ChangeClassRoom:{...state.ChangeClassRoom,classRoomList:actions.data.value} };

                default:

                    return state;

            }

        case ABTActions.STOP_SCHEDULE_CLASSHOUR_LOADING_HIDE:

            return {...state,StopSchedule:{...state.StopSchedule,classHourLoading:false}};

        case ABTActions.STOP_SCHEDULE_CLASSHOUR_LOADING_SHOW:

            return {...state,StopSchedule:{...state.StopSchedule,classHourLoading:true}};



        //停课

        case ABTActions.STOP_SCHEDULE_TEACHER_CHANGE:

            switch (actions.data.type) {

                case "drop":

                    return {...state,StopSchedule:{...state.StopSchedule,teacherDrop:actions.data.value}};

                case "search":

                    return {...state,StopSchedule:{...state.StopSchedule,teacherSearchOpen:true}};

                case "searchClose":

                    return {...state,StopSchedule:{...state.StopSchedule,teacherSearchOpen:false}};

                case "searchLoadingShow":

                    return {...state,StopSchedule:{...state.StopSchedule,teacherSearchLoadingShow:true}};

                case "teacherSearchListChange":

                    return {...state,StopSchedule:{...state.StopSchedule,teacherSearchList:actions.data.value}};

                case "searchLoadingHide":

                    return {...state,StopSchedule:{...state.StopSchedule,teacherSearchLoadingShow:false}};


                default:

                    return state;

            }

        case ABTActions.STOP_SCHEDULE_TEACHER_CLASSHOUR_CHANGE:

            return {...state,StopSchedule:{...state.StopSchedule,...actions.data}};

        case ABTActions.STOP_SCHEDULE_DATE_PICK:

            return { ...state,StopSchedule:{ ...state.StopSchedule,date:actions.data }};


         //所有的错误提示

        case ABTActions.REPLACE_SHCEDULE_ERROR_TIPS_SHOW:

            switch (actions.data.type) {

                case 'originTeacher':

                    return {...state,replaceSchedule:{...state.replaceSchedule,originTeacherTips:true,originTeacherTipsTitle:actions.data.title}};

                case 'replaceTeacher':

                    return {...state,replaceSchedule:{...state.replaceSchedule,replaceTeacherTips:true,replaceTeacherTipsTitle:actions.data.title}};

                case 'class':

                    return {...state,replaceSchedule:{...state.replaceSchedule,classTips:true,classTipsTitle:actions.data.title}};

                case 'month':

                    return {...state,replaceSchedule:{...state.replaceSchedule,monthTips:true,monthTipsTitle:actions.data.title}};

                case 'week':

                    return {...state,replaceSchedule:{...state.replaceSchedule,weekTips:true,weekTipsTitle:actions.data.title}};

                case 'date':

                    return {...state,replaceSchedule:{...state.replaceSchedule,dateTips:true,dateTipsTitle:actions.data.title}};

                case 'classHourDate':

                    return {...state,replaceSchedule:{...state.replaceSchedule,classHourDateTips:true,classHourDateTipsTitle:actions.data.title}};

                case 'classHour':

                    return {...state,replaceSchedule:{...state.replaceSchedule,classHourTips:true,classHourTipsTitle:actions.data.title}};


                default:

                    return state;

            }

        case ABTActions.REPLACE_SHCEDULE_ERROR_TIPS_HIDE:

            switch (actions.data.type) {

                case 'originTeacher':

                    return {...state,replaceSchedule:{...state.replaceSchedule,originTeacherTips:false}};

                case 'replaceTeacher':

                    return {...state,replaceSchedule:{...state.replaceSchedule,replaceTeacherTips:false}};

                case 'class':

                    return {...state,replaceSchedule:{...state.replaceSchedule,classTips:false}};

                case 'month':

                    return {...state,replaceSchedule:{...state.replaceSchedule,monthTips:false}};

                case 'week':

                    return {...state,replaceSchedule:{...state.replaceSchedule,weekTips:false}};

                case 'date':

                    return {...state,replaceSchedule:{...state.replaceSchedule,dateTips:false}};

                case 'classHourDate':

                    return {...state,replaceSchedule:{...state.replaceSchedule,classHourDateTips:false}};

                case 'classHour':

                    return {...state,replaceSchedule:{...state.replaceSchedule,classHourTips:false}};


                default:

                    return state;

            }

        case ABTActions.CHANGE_SHCEDULE_ERROR_TIPS_SHOW:

            switch (actions.data.type) {

                case 'originTeacher':

                    return {...state,changeSchedule:{...state.changeSchedule,originTeacherTips:true}};

                case 'originDate':

                    return {...state,changeSchedule:{...state.changeSchedule,originDateTips:true}};

                case 'originSchedule':

                    return {...state,changeSchedule:{...state.changeSchedule,originScheduleTips:true}};

                case 'targetTeacher':

                    return {...state,changeSchedule:{...state.changeSchedule,targetTeacherTips:true}};

                case 'targetDate':

                    return {...state,changeSchedule:{...state.changeSchedule,targetDateTips:true}};

                case 'targetSchedule':

                    return {...state,changeSchedule:{...state.changeSchedule,targetScheduleTips:true}};



                default:

                    return state;

            }

        case ABTActions.CHANGE_SHCEDULE_ERROR_TIPS_HIDE:

            switch (actions.data.type) {

                case 'originTeacher':

                    return {...state,changeSchedule:{...state.changeSchedule,originTeacherTips:false}};

                case 'originDate':

                    return {...state,changeSchedule:{...state.changeSchedule,originDateTips:false}};

                case 'originSchedule':

                    return {...state,changeSchedule:{...state.changeSchedule,originScheduleTips:false}};

                case 'targetTeacher':

                    return {...state,changeSchedule:{...state.changeSchedule,targetTeacherTips:false}};

                case 'targetDate':

                    return {...state,changeSchedule:{...state.changeSchedule,targetDateTips:false}};

                case 'targetSchedule':

                    return {...state,changeSchedule:{...state.changeSchedule,targetScheduleTips:false}};



                default:

                    return state;

            }

        case ABTActions.CHANGE_TIME_ERROR_TIPS_HIDE:

            switch (actions.data.type) {

                case 'teacher':

                    return {...state,changeTime:{...state.changeTime,teacherTips:false}};

                case 'originDate':

                    return {...state,changeTime:{...state.changeTime,originDateTips:false}};

                case 'originSchedule':

                    return {...state,changeTime:{...state.changeTime,originScheduleTips:false}};

                case 'targetDate':

                    return {...state,changeTime:{...state.changeTime,targetDateTips:false}};

                case 'targetSchedule':

                    return {...state,changeTime:{...state.changeTime,targetScheduleTips:false}};

                case 'targetClassRoom':

                    return {...state,changeTime:{...state.changeTime,targetClassRoomTips:false}};



                default:

                    return state;

            }

        case ABTActions.CHANGE_TIME_ERROR_TIPS_SHOW:

            switch (actions.data.type) {

                case 'teacher':

                    return {...state,changeTime:{...state.changeTime,teacherTips:true}};

                case 'originDate':

                    return {...state,changeTime:{...state.changeTime,originDateTips:true}};

                case 'originSchedule':

                    return {...state,changeTime:{...state.changeTime,originScheduleTips:true}};

                case 'targetDate':

                    return {...state,changeTime:{...state.changeTime,targetDateTips:true}};

                case 'targetSchedule':

                    return {...state,changeTime:{...state.changeTime,targetScheduleTips:true}};

                case 'targetClassRoom':

                    return {...state,changeTime:{...state.changeTime,targetClassRoomTips:true}};



                default:

                    return state;

            }

        case ABTActions.CHANGE_CLASS_ROOM_ERROR_TIPS_SHOW:

            switch (actions.data.type) {

                case 'teacher':

                    return {...state,ChangeClassRoom:{...state.ChangeClassRoom,teacherTips:true}};

                case 'date':

                    return {...state,ChangeClassRoom:{...state.ChangeClassRoom,dateTips:true}};

                case 'schedule':

                    return {...state,ChangeClassRoom:{...state.ChangeClassRoom,scheduleTips:true}};

                case 'targetClassRoom':

                    return {...state,ChangeClassRoom:{...state.ChangeClassRoom,targetClassRoomTips:true}};


                default:

                    return state;

            }

        case ABTActions.CHANGE_CLASS_ROOM_ERROR_TIPS_HIDE:

            switch (actions.data.type) {

                case 'teacher':

                    return {...state,ChangeClassRoom:{...state.ChangeClassRoom,teacherTips:false}};

                case 'date':

                    return {...state,ChangeClassRoom:{...state.ChangeClassRoom,dateTips:false}};

                case 'schedule':

                    return {...state,ChangeClassRoom:{...state.ChangeClassRoom,scheduleTips:false}};

                case 'targetClassRoom':

                    return {...state,ChangeClassRoom:{...state.ChangeClassRoom,targetClassRoomTips:false}};


                default:

                    return state;

            }

        case ABTActions.STOP_SCHEDULE_ERROR_TIPS_SHOW:

            switch (actions.data.type) {

                case 'teacher':

                    return {...state,StopSchedule:{...state.StopSchedule,teacherTips:true}};

                case 'date':

                    return {...state,StopSchedule:{...state.StopSchedule,dateTips:true}};

                case 'schedule':

                    return {...state,StopSchedule:{...state.StopSchedule,scheduleTips:true}};


                default:

                    return state;

            }

        case ABTActions.STOP_SCHEDULE_ERROR_TIPS_HIDE:

            switch (actions.data.type) {

                case 'teacher':

                    return {...state,StopSchedule:{...state.StopSchedule,teacherTips:false}};

                case 'date':

                    return {...state,StopSchedule:{...state.StopSchedule,dateTips:false}};

                case 'schedule':

                    return {...state,StopSchedule:{...state.StopSchedule,scheduleTips:false}};


                default:

                    return state;

            }

        default:

            return state;

    }

};

export default AdjustByTeacherModal