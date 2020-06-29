import SSActions from '../../actions/Manager/ScheduleSettingActions';

const ScheduleSetting = (state={

    SettingType:0,//默认为统一设置,

    SettingByPeriod:{

        PeriodSettingList:[]//学段信息

    },

    SettingByUnify:{

        ClassHourList:{

            Morning:[],

            Afternoon:[]

        }    //课时信息

    },

    IsEnable:0,

    Times:0,

    EditTimes:0,

    AMLimit:'12:00',

    LinkageEditStatus:false,

    AdjustClassHourModal:{

        Show:false,

        PeriodID:'',

        MorningRadioChecked:'',

        MorningInputDisabled:true,

        MorningTime:0,

        AfternoonRadioChecked:'',

        AfternoonInputDisabled:true,

        AfternoonTime:0

    },

    AddClassHourModal:{

        Show:false,

        IsUnify:true,

        PeriodID:'',

        Type:"morning",

        OldStartTime:'',

        OldEndTime:'',

        StartHour:'08',

        StartMin:'00',

        EndHour:'08',

        EndMin:'45'

    },

    EditClassHourModal:{

        Show:false,

        IsUnify:true,

        PeriodID:'',

        Type:"",

        ClassHourName:'',

        StartHour:'',

        StartMin:'',

        EndHour:"",

        EndMin:"",

        ClassHourNO:''

    },



},actions) => {

    switch (actions.type) {

        case SSActions.MANAGER_SCHEDULE_SETTING_INIT:

            return {

                ...state,

                LinkageEditStatus:false,

                ...actions.data

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_SETTING_TYPE_CHANGE:

            return {

                ...state,

                SettingType:actions.data

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_SETTING_PERIOD_INIT:

            return {

                ...state,

                SettingByPeriod:{

                    ...state.SettingByPeriod,

                    PeriodSettingList:actions.data

                }

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_SETTING_UNIFY_INIT:

            return {

                ...state,

                SettingByUnify:{

                    ...state.SettingByUnify,

                    ClassHourList:actions.data

                }

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_SETTING_PERIOD_TAB_TOGGLE:

            return {

                ...state,

                SettingByPeriod:{

                    ...state.SettingByPeriod,

                    PeriodSettingList:actions.data

                }

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_SHOW:

            return {

                ...state,

                AdjustClassHourModal:{

                    Show:true,

                    PeriodID:actions.data,

                    MorningRadioChecked:'',

                    MorningInputDisabled:true,

                    MorningTime:0,

                    AfternoonRadioChecked:'',

                    AfternoonInputDisabled:true,

                    AfternoonTime:0


                }

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_ADJUST_MODAL_HIDE:

            return {

                ...state,

                AdjustClassHourModal:{

                    Show:false

                }

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_MORNING_RADIO_CHANGE:

            return {

                ...state,

                AdjustClassHourModal:{

                    ...state.AdjustClassHourModal,

                    MorningInputDisabled:false,

                    MorningRadioChecked:actions.data

                }

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_AFTERNOON_RADIO_CHANGE:

            return {

                ...state,

                AdjustClassHourModal:{

                    ...state.AdjustClassHourModal,

                    AfternoonInputDisabled:false,

                    AfternoonRadioChecked:actions.data

                }

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_ADJUST_AFTERNOON_INPUT_CHANGE:

            return {

                ...state,

                AdjustClassHourModal:{

                    ...state.AdjustClassHourModal,

                    AfternoonTime:actions.data

                }

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_ADJUST_MORNING_INPUT_CHANGE:

            return {

                ...state,

                AdjustClassHourModal:{

                    ...state.AdjustClassHourModal,

                    MorningTime:actions.data

                }

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_SHOW:

            return {

                ...state,

                AddClassHourModal:{

                    ...state.AddClassHourModal,

                    Show:true,

                    IsUnify:actions.data.IsUnify,

                    Type:actions.data.Type,

                    PeriodID:actions.data.PeriodID?actions.data.PeriodID:state.AddClassHourModal.PeriodID,

                    StartHour:actions.data.StartHour?actions.data.StartHour:state.AddClassHourModal.StartHour,

                    StartMin:actions.data.StartMin?actions.data.StartMin:state.AddClassHourModal.StartMin,

                    EndHour: actions.data.EndHour?actions.data.EndHour:state.AddClassHourModal.EndHour,

                    EndMin: actions.data.EndMin?actions.data.EndMin:state.AddClassHourModal.EndMin

                }

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_MODAL_HIDE:

            return {

                ...state,

                AddClassHourModal:{

                    ...state.AddClassHourModal,

                    Show:false

                }

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_START_HOUR_CHANGE:

            return {

                ...state,

                AddClassHourModal:{

                    ...state.AddClassHourModal,

                    StartHour:actions.data

                }

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_START_MIN_CHANGE:

            return {

                ...state,

                AddClassHourModal:{

                    ...state.AddClassHourModal,

                    StartMin:actions.data

                }

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_END_HOUR_CHANGE:

            return {

                ...state,

                AddClassHourModal:{

                    ...state.AddClassHourModal,

                    EndHour:actions.data

                }

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_ADD_CLASSHOUR_END_MIN_CHANGE:

            return {

                ...state,

                AddClassHourModal:{

                    ...state.AddClassHourModal,

                    EndMin:actions.data

                }

            };

        case  SSActions.MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_MODAL_SHOW:

            return {

                ...state,

                EditClassHourModal:{

                    ...state.EditClassHourModal,

                    Show:true,

                    IsUnify:actions.data.IsUnify,

                    PeriodID:actions.data.PeriodID,

                    Type:actions.data.Type,

                    ClassHourName:actions.data.ClassHourName,

                    StartHour:actions.data.StartHour,

                    StartMin:actions.data.StartMin,

                    EndHour:actions.data.EndHour,

                    EndMin:actions.data.EndMin,

                    OldStartTime:actions.data.OldStartTime,

                    OldEndTime: actions.data.OldEndTime,

                    ClassHourNO:actions.data.ClassHourNO

                }

            };

        case  SSActions.MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_MODAL_HIDE:

            return {

                ...state,

                EditClassHourModal:{

                    ...state.EditClassHourModal,

                    Show:false

                }

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_START_HOUR_CHANGE:

            return {

                ...state,

                EditClassHourModal:{

                    ...state.EditClassHourModal,

                    StartHour:actions.data

                }

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_START_MIN_CHANGE:

            return {

                ...state,

                EditClassHourModal:{

                    ...state.EditClassHourModal,

                    StartMin:actions.data

                }

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_END_HOUR_CHANGE:

            return {

                ...state,

                EditClassHourModal:{

                    ...state.EditClassHourModal,

                    EndHour:actions.data

                }

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_EDIT_CLASSHOUR_END_MIN_CHANGE:

            return {

                ...state,

                EditClassHourModal:{

                    ...state.EditClassHourModal,

                    EndMin:actions.data

                }

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_SET_SWITCH_CHANGE:

            return {

                ...state,

                IsEnable:actions.data.IsEnable,

                Times:actions.data.Times

            };

        case SSActions.MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_OPEN:

            return { ...state,LinkageEditStatus:true };

        case SSActions.MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_CLOSE:

            return { ...state,LinkageEditStatus:false };

        case SSActions.MANAGER_SCHEDULE_SETTING_LINKAGE_INPUT_CHANGE:

            return { ...state,EditTimes:actions.data };

        case SSActions.MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_CANCEL:

            return { ...state,EditTimes:state.Times };

        case SSActions.MANAGER_SCHEDULE_SETTING_LINKAGE_TIME_EDIT_OK:

            return {...state,Times:state.EditTimes};

        default:

            return state;

    }

};

export default ScheduleSetting;