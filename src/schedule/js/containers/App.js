import React,{Component} from 'react';

import {Loading,Alert} from "../../../common";

import {checkUrlAndPostMsg} from '../../../common/js/public';

import Frame from '../../../common/Frame';

import { connect } from 'react-redux';

import {HashRouter as Router,withRouter} from 'react-router-dom';

import DocumentTitle from 'react-document-title';

import AdjustBtnsWrapper from '../component/Manager/AdjustBtnsWrapper';

import AddScheduleModal from './Manager/AddScheduleModal';

import AdjustByTimeModal from  './Manager/AdjustByTimeModal'

import ModuleCommonActions from '../actions/ModuleCommonActions';

import PeriodWeekTermActions from '../actions/PeriodWeekTermActions';

import ASMAction from  '../actions/Manager/AddScheduleModalActions';

import ABTMActions from '../actions/Manager/AdjustByTimeModalActions';

import ABCRActions from '../actions/Manager/AdjustByClassRoomActions';

import StopScheduleActions from '../actions/Manager/StopScheduleActions'

import DelScheduleActions from '../actions/Manager/DelScheduleActions';

import StopScheduleModal from './Manager/StopScheduleModal';

import DelScheduleModal from './Manager/DelScheduleModal';

import ABTActions from '../actions/Manager/AdjustByTeacherActions';

import RouterWrapper from './RouterWrapper';

import '../../scss/index.scss';

import RouterSetActions from "../actions/RouterSetActions";

import $ from 'jquery';

import ComPageRefresh from '../actions/ComPageRefresh';

import TeacherPowerActions from '../actions/Teacher/TeacherPowerActions';

import {QueryPower,QueryOtherPower} from '../../../common/js/power/index';

import ScheduleDetailModal from "../component/ScheduleDetailModal";

import ChangeTimeModal from "../component/ChangeTimeModal";

import AdjustClassRoomModal from "../component/AdjustClassRoomModal";

import ReplaceScheduleModal from "../component/ReplaceScheduleModal";

import ChangeScheduleModal from '../component/ChangeScheduleModal';

import SDActions from "../actions/ScheduleDetailActions";

import config from "../../../common/js/config";

import {getQueryVariable} from "../../../common/js/disconnect";


class App extends Component{

    constructor(props) {

        super(props);

        this.state = {

            //???????????????????????????
            isWorkPlantform:false

        }

    }


    pageInit(){

        const {dispatch} = this.props;

        const Hash = location.hash;

        //?????????????????????

        const UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

        const {ProductType} = JSON.parse(sessionStorage.getItem('LgBasePlatformInfo'));

        const { UserType,UserClass } = UserInfo;

        if (getQueryVariable('isWorkPlantform')){

            document.getElementsByClassName("frame-drag-flag")[0].style.backgroundColor = '#ffffff';

            document.getElementsByClassName("frame-content-rightside")[0].style.borderTop = '1px solid #f2f2f2';

            this.setState({isWorkPlantform:true});

            $(document).on('click',()=>{

                window.parent.postMessage("schedule",'*');

            });

        }

        if(parseInt(ProductType)===3){

            if ([0,1,2,3].includes(parseInt(UserType))){

                if (parseInt(UserType)===0){//?????????????????????

                    this.Frame.getIdentity({ModuleID:'000004'},(identify)=>{

                        dispatch(ModuleCommonActions.getCommonInfo());

                        if (Hash.includes('Import')){

                            dispatch({type:RouterSetActions.ROUTER_SET_TO_IMPORT})

                        }else{

                            dispatch({type:RouterSetActions.ROUTER_SET_TO_DEFAULT})

                        }

                    });

                }else if (parseInt(UserType)===1) {

                    this.Frame.getIdentity({ModuleID:''},(identify)=>{

                        let GetAdjustPower =  QueryOtherPower({UserType,SchoolID:UserInfo.SchoolID,Power:'Teacher_Schedule_U'});

                        let GetImportPower = QueryOtherPower({UserType,SchoolID:UserInfo.SchoolID,Power:'Teacher_Schedule_C'});

                        Promise.all([GetAdjustPower,GetImportPower]).then(res=>{

                            dispatch({type:TeacherPowerActions.TEACHER_POWER_CHANGE,data:{Adjust:res[0],AddImport:res[1]}});

                            dispatch(ModuleCommonActions.getCommonInfo());

                            if (Hash.includes('Import')){

                                if (!res[1]){

                                    window.location.href='/Error.aspx?errcode=E011';

                                }else{

                                    dispatch({type:RouterSetActions.ROUTER_SET_TO_IMPORT})

                                }

                            }else{

                                dispatch({type:RouterSetActions.ROUTER_SET_TO_DEFAULT})

                            }

                        });

                    });

                }else{

                    this.Frame.getIdentity({ModuleID:''},(identify)=>{

                        dispatch(ModuleCommonActions.getCommonInfo());

                    });

                }

            }else{//???????????????

                window.location.href='/Error.aspx?errcode=E011';

            }

        }else{

            //????????????
            if ([0,1,2,3,7,10].includes(parseInt(UserType))){

                if (parseInt(UserType)===0){//?????????????????????

                    QueryPower({UserInfo,ModuleID:'000-2-0-07'}).then(data=>{

                        if (data){

                            dispatch(ModuleCommonActions.getCommonInfo());

                            if (Hash.includes('Import')){

                                dispatch({type:RouterSetActions.ROUTER_SET_TO_IMPORT})

                            }else{

                                dispatch({type:RouterSetActions.ROUTER_SET_TO_DEFAULT})

                            }

                        }else{

                            window.location.href='/Error.aspx?errcode=E011';

                        }

                    });

                }else if (parseInt(UserType)===1) {

                    let GetAdjustPower =  QueryOtherPower({UserType,SchoolID:UserInfo.SchoolID,Power:'Teacher_Schedule_U'});

                    let GetImportPower = QueryOtherPower({UserType,SchoolID:UserInfo.SchoolID,Power:'Teacher_Schedule_C'});

                    Promise.all([GetAdjustPower,GetImportPower]).then(res=>{

                        dispatch({type:TeacherPowerActions.TEACHER_POWER_CHANGE,data:{Adjust:res[0],AddImport:res[1]}});

                        dispatch(ModuleCommonActions.getCommonInfo());

                        if (Hash.includes('Import')){

                            if (!res[1]){

                                window.location.href='/Error.aspx?errcode=E011';

                            }else{

                                dispatch({type:RouterSetActions.ROUTER_SET_TO_IMPORT})

                            }

                        }else{

                            dispatch({type:RouterSetActions.ROUTER_SET_TO_DEFAULT})

                        }

                    });

                }else{

                    dispatch(ModuleCommonActions.getCommonInfo());

                }

            }else{//???????????????

                window.location.href='/Error.aspx?errcode=E011';

            }


        }

    }



    periodChange(key) {

        const {dispatch} = this.props;

        dispatch({type:PeriodWeekTermActions.PERIOD_VALUE_CHANGE,key:key});

        ComPageRefresh.ComPageUpdate(dispatch);

    }

    //??????????????????????????????
    addScheduleModalShow(){

        const {dispatch} = this.props;

        dispatch({type:ASMAction.ADD_SCHEDULE_MODAL_SHOW});

        $('.add-schedule-modal-wrapper .dropdown_list_ul3').hide();

        $('.add-schedule-modal-wrapper .dropdown_item1_name').removeClass('slide');

        $('.add-schedule-modal-wrapper .dropdown_item3_li').removeClass('active');

        dispatch(ASMAction.InfoInit());

    }
    //?????????????????????
    adjustByTimeModalShow(){

        const {dispatch} = this.props;

        dispatch({type:ABTMActions.ADJUST_BY_TIME_SHOW});

        dispatch(ABTMActions.InfoInit());

    }

    //????????????
    stopScheduleShow(){

        const {dispatch} = this.props;

        dispatch({type:StopScheduleActions.STOP_SCHEDULE_SHOW});

        dispatch(StopScheduleActions.InfoInit());

    }

    //??????????????????
    delScheduleShow(){

        const {dispatch} = this.props;

        dispatch({type:DelScheduleActions.DEL_SCHEDULE_SHOW});

        dispatch(DelScheduleActions.InfoInit());

    }

    //????????????????????????

    adjustByTeacherShow(){

        const { dispatch } = this.props;

        dispatch({type:ABTActions.ADJUST_BY_TEACHER_SHOW});

        dispatch(ABTActions.AdjustByTeacherModalInit());

    }

    //????????????????????????

    adjustByClassRoomShow(){

        const { dispatch } = this.props;

        dispatch({type:ABCRActions.MANAGER_ADJUST_BY_CLASSROOM_SHOW});

    }


    //????????????

    Import(){

        const url = config.HashPrevProxy + location.pathname+location.search+'#/Import';

        checkUrlAndPostMsg({btnName:'????????????',url});

    }

    //?????????????????????

    ScheduleSettingShow(){

        const url = config.HashPrevProxy+location.pathname+location.search+'#/manager/scheduleSetting';

        checkUrlAndPostMsg({btnName:'???????????????',url});

    }

    //?????????????????????

    PathToIntellenct(){

        console.log(this.props);

        const { Url } = this.props.state.Manager.Intellenct;

        const token = sessionStorage.getItem('token');

        if (Url){

            window.open(`${Url}?lg_tk=${token}`);

        }

    }



    //??????

    StopSchedule(params){

        const { dispatch } = this.props;

        dispatch(SDActions.StopSchedule(params));

    }

    //????????????
    RebackStopSchedule(params){

        const { dispatch } = this.props;

        dispatch(SDActions.RebackStopSchedule(params));

    }

    //????????????

    ScheduleDetailClose(){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_SCHEDULE_DETAIL_MODAL_HIDE});

    }

    //??????????????????

    ChangeTimeShow(params){

        const { dispatch } = this.props;

        dispatch(SDActions.ChangeTimeShow(params));

    }

    //???????????????????????????????????????

    SelectClassHour(params){

        const { dispatch } = this.props;

        dispatch(SDActions.SelectClassHour(params));

    }


    //??????????????????????????????

    WeekPick(WeekNO){

        const { dispatch } = this.props;

        dispatch(SDActions.WeekPick(WeekNO));

    }

    //????????????????????????

    CloseChangeTime(){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_CHANGE_TIME_MODAL_HIDE});

    }

    //??????????????????????????????
    ChangeTimeCommit(){

        const { dispatch } = this.props;

        dispatch(SDActions.ChangeTimeCommit());

    }

    //??????????????????
    RebackTime(params){

        const { dispatch } = this.props;

        dispatch(SDActions.RebackTime(params));

    }

    //??????????????????
    AdjustClassRoomShow(params){

        const { dispatch } = this.props;

        dispatch(SDActions.AdjustClassRoomShow(params));

    }

    //??????????????????????????????????????????

    ChangeClassRoomPick(e){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_ADJUST_CLASSROOM_MODAL_CHECKED_CHANGE,data:e.target.value});

    }

    //??????????????????????????????

    ChangeClassRoomType(key){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_ADJUST_CLASSROOM_MODAL_CLASSROOM_TYPE_CHANGE,data:key});

    }

    //???????????????????????????

    SearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,data:e.target.value});


    }

    //??????????????????

    ClassRoomSearchClick(SearchValue){

        const { dispatch } = this.props;

        dispatch(SDActions.ClassRoomSearchClick(SearchValue))

    }

    //??????????????????

    ClassRoomSearchCancel(){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_CANCEL_BTN_HIDE});

        dispatch({type:SDActions.COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_WRAPPER_HIDE});

        dispatch({type:SDActions.COMPONENT_ADJUST_CLASSROOM_MODAL_SEARCH_VALUE_CHANGE,data:''});

    }


    //????????????????????????

    CloseAdjustClassRoom(){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_ADJUST_CLASSROOM_MODAL_HIDE});

    }

    //????????????????????????
    AdjustClassRoomCommit(){

        const { dispatch } = this.props;

        dispatch(SDActions.AdjustClassRoomCommit());

    }

    //??????????????????

    RebackClassRoom(params){

        const { dispatch } = this.props;

        dispatch(SDActions.RebackClassRoom(params));

    }

    //????????????????????????

    ChooseReplaceTeacherShow(params){

        const { dispatch } = this.props;

        dispatch(SDActions.ChooseReplaceTeacherShow(params));

    }

    //????????????????????????

    ReplaceTeacherPick(ID){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_REPLACE_SCHEDULE_MODAL_TEACHER_PICK,data:ID});

    }

    //???????????????????????????

    ReplaceSearchValueChange(e){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,data:e.target.value});

    }

    //????????????????????????

    ReplaceSearchClick(SearchValue){

        const { dispatch } = this.props;

        dispatch(SDActions.ReplaceSearchClick(SearchValue));

    }

    //??????????????????

    ReplaceSearchCancel(){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_CANCEL_BTN_HIDE});

        dispatch({type:SDActions.COMPONENT_REPLACE_SCHEDULE_MODAL_SEARCH_WRAPPER_HIDE});

        dispatch({type:SDActions.COMPONENT_REPLACE_SCHEDULE_MODAL_INPUT_CHANGE,data:''});

    }

    //????????????????????????

    ReplaceScheduleClose(){

        const { dispatch } = this.props;

        dispatch({type:SDActions.COMPONENT_REPLACE_SCHEDULE_MODAL_HIDE});

    }

    //????????????????????????
    ReplaceScheduleCommit(){

        const { dispatch } = this.props;

        dispatch(SDActions.ReplaceScheduleCommit());

    }

    //??????????????????

    RebackReplaceSchedule(params){

        const { dispatch } = this.props;

        dispatch(SDActions.RebackReplaceSchedule(params));

    }


    //??????

    ChangeScheduleShow(params){

        const { dispatch } = this.props;

        dispatch(SDActions.ChangeScheduleShow(params));

    }


    onRef(ref){

        this.Frame = ref;

    }

    render() {

        const {state,history} = this.props;

        const { LoginUser,ScheduleDetail,AppLoading,ModuleSetting,Manager,PeriodWeekTerm,AppAlert,RouterSet } = state;

        const { AdjustBtns } = Manager;

        const pathname = history.location.pathname;

        const routes = pathname.split('/');

        let subtitle = '';
        
        if (routes[1]==='Import'){

            subtitle = '????????????';

        }else if(routes[1]==='manager'){

            if (routes[2]==='adjustlog'){

                subtitle = '????????????';

            }else if (routes[2]==='scheduleSetting'){

                subtitle = '???????????????';

            }

        }

        return (



                <React.Fragment>

                   <DocumentTitle title={ModuleSetting.moduleCnName}>

                       <React.Fragment>

                       {

                           AppLoading.show?

                               <Loading opacity={false} size="large" tip="?????????..."></Loading>

                               :''

                       }


                       <Frame
                            module={{
                                cnname:ModuleSetting.moduleCnName,
                                enname:ModuleSetting.moduleEnName,
                                image:ModuleSetting.logo,
                                subtitle
                            }}

                            showBarner={RouterSet.router==='/'?ModuleSetting.timeBar:false}
                            pageInit={this.pageInit.bind(this)}
                            type="circle"
                            onRef={this.onRef.bind(this)}

                        >

                            <div ref="frame-time-barner">

                                {

                                    PeriodWeekTerm.ItemPeriod&&PeriodWeekTerm.ItemPeriod.length>1?

                                        <div className={`schedule-period-tab ${this.state.isWorkPlantform?'work-plant-form':''} clearfix`}>

                                            {

                                                PeriodWeekTerm.ItemPeriod.map((item,key) => {

                                                    return <div key={item.PeriodID} onClick={this.periodChange.bind(this,key)} className={`schedule-period-item ${PeriodWeekTerm.defaultPeriodIndex===key?'active':''}`}>

                                                        {item.PeriodName}

                                                    </div>

                                                })

                                            }

                                        </div>

                                        :null

                                }


                                {

                                    parseInt(LoginUser.UserType) === 0||parseInt(LoginUser.UserType) === 7||parseInt(LoginUser.UserType) === 10?

                                        <AdjustBtnsWrapper

                                            adjustBtns={AdjustBtns}

                                            ScheduleSettingShow={this.ScheduleSettingShow.bind(this)}

                                            addScheduleModalShow={this.addScheduleModalShow.bind(this)}

                                            adjustByTimeModalShow = {this.adjustByTimeModalShow.bind(this)}

                                            stopScheduleShow={this.stopScheduleShow.bind(this)}

                                            delScheduleShow = {this.delScheduleShow.bind(this)}

                                            adjustByTeacherShow = {this.adjustByTeacherShow.bind(this)}

                                            adjustByClassRoomShow={this.adjustByClassRoomShow.bind(this)}

                                            Import={this.Import.bind(this)}

                                            Intellenct={this.PathToIntellenct.bind(this)}

                                            IntellenctUrl={Manager.Intellenct.Url}

                                        >

                                        </AdjustBtnsWrapper>

                                        :''

                                }

                            </div>

                            <div ref="frame-right-content">

                                <RouterWrapper></RouterWrapper>

                            </div>

                        </Frame>

                       </React.Fragment>

                   </DocumentTitle>

                   <AddScheduleModal></AddScheduleModal>

                   <AdjustByTimeModal></AdjustByTimeModal>

                   <StopScheduleModal></StopScheduleModal>

                   <DelScheduleModal></DelScheduleModal>


                   <Alert type={AppAlert.type}
                          title={AppAlert.title}
                          abstract={AppAlert.abstract}
                          show={AppAlert.show}
                          onClose={AppAlert.close}
                          onCancel={AppAlert.cancel}
                          onOk={AppAlert.ok}
                          onHide={AppAlert.hide}
                          okTitle={AppAlert.okTitle}
                          cancelTitle={AppAlert.cancelTitle}>

                   </Alert>

                    <ScheduleDetailModal

                        Params={ScheduleDetail.ScheduleDetail}

                        CanOperate={ScheduleDetail.Params.CanOperate}

                        StopSchedule={this.StopSchedule.bind(this)}

                        RebackStopSchedule={this.RebackStopSchedule.bind(this)}

                        ChangeTimeShow={this.ChangeTimeShow.bind(this)}

                        ScheduleDetailClose={this.ScheduleDetailClose.bind(this)}

                        RebackTime={this.RebackTime.bind(this)}

                        AdjustClassRoomShow={this.AdjustClassRoomShow.bind(this)}

                        RebackClassRoom={this.RebackClassRoom.bind(this)}

                        ChooseReplaceTeacherShow={this.ChooseReplaceTeacherShow.bind(this)}

                        RebackReplaceSchedule={this.RebackReplaceSchedule.bind(this)}

                        ChangeScheduleShow={this.ChangeScheduleShow.bind(this)}


                    >

                    </ScheduleDetailModal>

                    <ChangeTimeModal

                        Params={ScheduleDetail.ChangeTime}

                        SelectClassHour={this.SelectClassHour.bind(this)}

                        WeekPick={this.WeekPick.bind(this)}

                        CloseChangeTime={this.CloseChangeTime.bind(this)}

                        ChangeTimeCommit={this.ChangeTimeCommit.bind(this)}

                    >

                    </ChangeTimeModal>

                    <AdjustClassRoomModal

                        Params={ScheduleDetail.AdjustClassRoom}

                        ChangeClassRoomPick={this.ChangeClassRoomPick.bind(this)}

                        ChangeClassRoomType={this.ChangeClassRoomType.bind(this)}

                        SearchValueChange={this.SearchValueChange.bind(this)}

                        ClassRoomSearchClick={this.ClassRoomSearchClick.bind(this)}

                        ClassRoomSearchCancel={this.ClassRoomSearchCancel.bind(this)}

                        CloseAdjustClassRoom={this.CloseAdjustClassRoom.bind(this)}

                        AdjustClassRoomCommit={this.AdjustClassRoomCommit.bind(this)}

                    >

                    </AdjustClassRoomModal>

                    <ReplaceScheduleModal

                        Params={ScheduleDetail.ReplaceSchedule}

                        ReplaceTeacherPick={this.ReplaceTeacherPick.bind(this)}

                        SearchValueChange={this.ReplaceSearchValueChange.bind(this)}

                        ReplaceSearchClick={this.ReplaceSearchClick.bind(this)}

                        ReplaceSearchCancel={this.ReplaceSearchCancel.bind(this)}

                        ReplaceScheduleClose={this.ReplaceScheduleClose.bind(this)}

                        ReplaceScheduleCommit={this.ReplaceScheduleCommit.bind(this)}

                    >



                    </ReplaceScheduleModal>

                    <ChangeScheduleModal></ChangeScheduleModal>

                </React.Fragment>


        );
    }
}

const mapStateToProps = (state) => {

  return{
      state
  }

};

export default connect(mapStateToProps)(withRouter(App));