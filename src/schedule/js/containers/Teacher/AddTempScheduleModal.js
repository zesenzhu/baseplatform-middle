import React,{useEffect,useState,useRef,useImperativeHandle,forwardRef,memo} from 'react';

import {connect} from 'react-redux';

import { Modal,DropDown,Loading,Tips } from "../../../../common";

import {Button,Input} from "antd";

import ATSMActions from '../../actions/Teacher/AddTempScheduleModalActions'

import AddEditClass from "../../component/AddEditClass";

import $ from 'jquery';

import {useStateValue} from "../../actions/hooks";




function AddTempScheduleModal(props){


    //state

    //学科能否选取
    const [subjectSelect,setSubSelect] = useState({

        disabled:false

    });

    //教室能否选取
    const [classRoomSelect,setClassRoomSelect] = useState({

        disabled:false

    });

    //临时教室输入

    const [classRoomInput,setClassRoomInput] = useState({

        tip:false,

        tipTitle:'请输入教室名称',

        edit:false,

        value:''

    });

    //学科输入

    const [subjectInput,setSubInput] = useState({

        tip:false,

        tipTitle:'请输入学科名称',

        edit:false,

        value:''

    });

    //临时班级

    const [tmpClass,setTmpClass] = useState({

        className:'',

        modalShow:false,

        stuList:[]

    });



    //临时的课程

    const {AddTempScheduleModal,LoginUser,dispatch,PeriodWeekTerm} = props;

    const { SchoolID,UserID,UserType,UserName } = LoginUser;


    //refs
    const AddEditClassRef = useRef();

    const AddScheduleModalRef = useStateValue(AddTempScheduleModal);

    const subjectInputRef = useStateValue(subjectInput);

    const tmpClassRef = useStateValue(tmpClass);

    const classRoomInputRef = useStateValue(classRoomInput);




    //学科选项改变
    const subjectChange = (e) => {

       dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_CHANGE,data:e});

       dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_ERROR_HIDE});

        const { SubjectList,gradeClass,teachers,classDisabled,teacherDisabled,checkedClass,checkedTeacher } = AddTempScheduleModal;

        if (classDisabled){

            dispatch({type: ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_ABLED});

        }

        const SubjectGrades = SubjectList.find(item=>item.SubjectID===e.value).Grades;

        const SubjectGradeList = SubjectGrades.split(',');

        const classList = gradeClass.map(item=>{

            if (SubjectGradeList.findIndex(i=>i===item.id)>=0){

                return item

            }else{

                return;

            }

        }).filter(item=>item!==undefined);

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_LIST_UPDATE,data:classList});

        dispatch({type: ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_CHANGE,data:''});


        $('.select-class .search_cancel_input').hide();

        $('.select-class .search_text_input').val('');

        $('.select-class .dropdown_item1_name.slide .dropdown_item3_li.active').removeClass('.active');

        $('.select-class .dropdown_item1_name.slide').removeClass('slide');

        $('.select-class .dropdown_item1_name').next('.dropdown_list_ul3').hide();


    };

    //班级选项改变
    const classChange = (e) => {

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_CHANGE,data:{title:e.value,value:e.id}});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_ERROR_HIDE});

    };

    //老师改变
    const teacherChange = (e) => {

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_TEACHER_CHANGE,data:{title:e.value,value:e.id}});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_TEACHER_ERROR_HIDE});

    };
    //周次变更
    const weekChange = (e) =>{

        const { value } = e;

        const {WeekNO,NowDate} = PeriodWeekTerm;

        const WeekDay = new Date(NowDate).getDay();

        const { date } = AddTempScheduleModal;

        if (WeekNO===value){

            const newDate = date.filter(i=>i.value+1>=WeekDay);

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_INFO_UPDATE,data:{date:newDate}});

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_DATE_CHANGE,data:{value:'none',title:'请选择星期'}});

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_CHANGE,data:{value:"none",title:"请选择课时"}});

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_DISABLED});

        }else{

            let newDate = [];

            for (let i = 0; i <= 6; i++){

                let title = '';

                switch (i) {

                    case 0:

                        title = '星期一';

                        break;

                    case 1:

                        title = '星期二';

                        break;

                    case 2:

                        title = '星期三';

                        break;

                    case 3:

                        title = '星期四';

                        break;

                    case 4:

                        title = '星期五';

                        break;

                    case 5:

                        title = '星期六';

                        break;

                    case 6:

                        title = '星期日';

                        break;

                    default:

                        title = '星期一';

                }

                newDate.push({

                    value:i,

                    title

                });

            }

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_INFO_UPDATE,data:{date:newDate}});

        }


        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_WEEK_CHANGE,data:e});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_DATE_ABLED});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_WEEK_ERROR_HIDE});

    };

    //星期变更
    const dateChange = (e) => {

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_DATE_CHANGE,data:e});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ABLED});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_DATE_ERROR_HIDE});

    };

    //课时变更
    const classHourChange = (e) => {

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_CHANGE,data:e});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_HIDE});

    };

    //教室变更
    const classRoomChange = (e) => {

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_CHANGE,data:{title:e.value,value:e.id}});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_HIDE});

    };
    //点击OK按钮
    const ok = (e) => {

        let SubjectOK,ClassOk,WeekOk,DateOk,ClassHourOk,ClassRoomOk = false;

        if (subjectInputRef.current.edit){

            if (subjectInputRef.current.value){

                let result = /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(subjectInputRef.current.value);

                if (result){

                    SubjectOK = true;

                }else{

                    setSubInput(e=>({...e,tip:true,tipTitle:'学科名称格式不正确'}));

                }

            }else{

                setSubInput(e=>({...e,tip:true,tipTitle:'请输入学科名称'}));

            }

        }else{

            if (AddScheduleModalRef.current.SubjectDropShow){

                if (Object.keys(AddScheduleModalRef.current.checkedSubject).length <= 0){

                    dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_ERROR_SHOW});

                }else{

                    SubjectOK = true;

                }

            }else {

                if(AddScheduleModalRef.current.SubjectID){

                    SubjectOK = true;

                }else{

                    dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_ERROR_SHOW});

                }

            }

        }



        if (tmpClassRef.current.className){

            ClassOk = true;

        }else if (Object.keys(AddScheduleModalRef.current.checkedClass).length <= 0){

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_ERROR_SHOW});

        }else{

            ClassOk = true;

        }



        if (Object.keys(AddScheduleModalRef.current.checkedWeek).length <= 0){

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_WEEK_ERROR_SHOW});

        }else{

            WeekOk = true;

        }

        if (Object.keys(AddScheduleModalRef.current.checkedDate).length <= 0){

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_DATE_ERROR_SHOW});

        }else{

            DateOk = true;

        }

        if (Object.keys(AddScheduleModalRef.current.checkedClassHour).length <= 0){

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_SHOW});

        }else {

            ClassHourOk = true;

        }

        if (classRoomInputRef.current.edit){

            if (classRoomInputRef.current.value){

                const result = /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(classRoomInputRef.current.value);

                if (result){

                    ClassRoomOk = true;

                }else{

                    setClassRoomInput(e=>({...e,tip:true,tipTitle:'教室名称格式错误'}));

                }

            }else{

                setClassRoomInput(e=>({...e,tip:true,tipTitle:'请输入教室名称'}));

            }

        }else if (Object.keys(AddScheduleModalRef.current.checkedClassRoom).length <= 0){

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_SHOW});

        }else{

            ClassRoomOk = true;

        }

        if (SubjectOK&&ClassOk&&WeekOk&&DateOk&&ClassHourOk&&ClassRoomOk){

            const subID = subjectInputRef.current.edit?'':(AddScheduleModalRef.current.SubjectDropShow?AddScheduleModalRef.current.checkedSubject.value:AddScheduleModalRef.current.SubjectID);

            const subName = subjectInputRef.current.edit?subjectInputRef.current.value:'';

            const classID = tmpClassRef.current.className?'':AddScheduleModalRef.current.checkedClass.value;

            const courseClassName = tmpClassRef.current.className?tmpClassRef.current.className:'';

            const classRoomID = classRoomInputRef.current.edit?'':AddScheduleModalRef.current.checkedClassRoom.value;

            const classRoomName = classRoomInputRef.current.edit?classRoomInputRef.current.value:'';

            const stuIDs = tmpClassRef.current.className?tmpClassRef.current.stuList.map(i=>i.StudentID).join(','):'';


            dispatch(ATSMActions.commitInfo({ModalInit:modalInit,SubjectID:subID,SubjectName:subName,ClassID:classID,CourseClassName:courseClassName,ClassRoomID:classRoomID,ClassRoomName:classRoomName,StudentIDs:stuIDs}));

        }

    };


    const modalInit = () => {

        //学科能否选取
        setSubSelect({

            disabled:false

        });

        //教室能否选取
        setClassRoomSelect({

            disabled:false

        });


        //学科输入

        setSubInput({

            tip:false,

            tipTitle:'请输入学科名称',

            edit:false,

            value:''

        });

        //临时班级

        setTmpClass({

            className:'',

            modalShow:false,

            stuList:[]

        });


        //临时教室输入

        setClassRoomInput({

            tip:false,

            tipTitle:'请输入教室名称',

            edit:false,

            value:''

        });


    };

    //点击取消交互
    const cancel = () => {

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_HIDE});

        modalInit();

    };

    //点击班级的搜索
    const classSearchClick = (e) => {

        const {value} = e;

        dispatch(ATSMActions.classSearch(value));

    };

    //取消班级搜索
    const classSearchClose = () => {

        dispatch(ATSMActions.classSearchClose());

    };


    //点击教室搜索
    const classRoomSearchClick = (e) => {

        const {value} = e;

        dispatch(ATSMActions.classRoomSearch(value));

    };

    //取消教室搜索
    const classRoomSearchClose = () => {

        dispatch(ATSMActions.classRoomSearchClose());

    };

    //点击教师
    const teacherSearchClick = (e) => {

        const {value} = e;

        dispatch(ATSMActions.teacherSearch(value));

    };

    //教师取消搜索
    const  teacherSearchClose = () =>{

        dispatch(ATSMActions.teacherSearchClose());

    };


    //点击添加临时学科按钮
    const addSubShow = () =>{

        const { gradeClass,teachers,subject } = AddTempScheduleModal;

        setSubInput(data=>({...data,edit:true}));

        setSubSelect(data=>({...data,disabled:true}));

        dispatch({type: ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_CHANGE,data:{value:'none',title:'请选择学科'}});

        dispatch({type: ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_SUBJECT_ERROR_HIDE});

        if (!tmpClass.className){

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_ABLED});

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_LIST_UPDATE,data:gradeClass});

            $('.select-class .search_cancel_input').hide();

            $('.select-class .search_text_input').val('');

            $('.select-class .dropdown_item1_name.slide').removeClass('slide');

            $('.select-class .dropdown_item1_name').next('.dropdown_list_ul3').hide();


        }

    };

    //取消编辑临时学科

    const addSubClose = () =>{

        setSubInput(data=>({...data,edit:false,tip:false,value:''}));//切换编辑状态

        setSubSelect(data=>({...data,disabled:false}));//左侧选择禁用

        if (!tmpClass.edit){

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_DISABLED});

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_CHANGE,data:{title:'请选择教师',value:'none'}});

        }

    };



    //取消临时班级

    const cancelEditClass = () => {

        setTmpClass(data=>({...data,className:'',stuList:[]}));

        const { SubjectList,gradeClass,checkedSubject } = AddTempScheduleModal;

        if (subjectInput.edit){

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_ABLED});

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_LIST_UPDATE,data:gradeClass});

        }else{

            if (checkedSubject){

                if (checkedSubject.value!=='none'){

                    const SubjectGrades = SubjectList.find(item=>item.SubjectID===checkedSubject.value).Grades;

                    const SubjectGradeList = SubjectGrades.split(',');

                    const classList = gradeClass.map(item=>{

                        if (SubjectGradeList.findIndex(i=>i===item.id)>=0){

                            return item

                        }else{

                            return;

                        }

                    }).filter(item=>item!==undefined);

                    dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_ABLED});

                    dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_LIST_UPDATE,data:classList});

                }

            }

        }

        $('.select-class .search_cancel_input').hide();

        $('.select-class .search_text_input').val('');

        $('.select-class .dropdown_item1_name.slide').removeClass('slide');

        $('.select-class .dropdown_item1_name').next('.dropdown_list_ul3').hide();



    };

    //添加临时教室
    const addClassRoomShow = () =>{

        setClassRoomInput(data=>({...data,edit:true}));

        setClassRoomSelect(data=>({...data,disabled:true}));

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_CHANGE,data:{title:'请选择教室',value:'none'}});

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_HIDE});

    };


    //添加临时教室取消
    const addClassRoomClose = () =>{

        setClassRoomInput(data=>({...data,edit:false,tip:false,value:''}));

        setClassRoomSelect(data=>({...data,disabled:false}));

        dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASSROOM_CHANGE,data:{title:'请选择教室',value:'none'}});

        $('.select-class-room .search_cancel_input').hide();

        $('.select-class-room .search_text_input').val('');

        $('.select-class-room .dropdown_item1_name.slide').removeClass('slide');

        $('.select-class-room .dropdown_item1_name').next('.dropdown_list_ul3').hide();


    };


    const addClassOk = () =>{

        const {stuListCheckList,className,showTip,showStuTip,classNameTrue} = AddEditClassRef.current;


        if (!className){

            showTip('请输入班级名称');

        }

        if (stuListCheckList.length===0){

            showStuTip();

        }

        if (classNameTrue&&className&&stuListCheckList.length>0){

            setTmpClass(e=>({...e,stuList:stuListCheckList,className,modalShow:false}));

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_DROP_DISABLED});

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_ERROR_HIDE});

            dispatch({type:ATSMActions.TEACHER_ADD_SCHEDULE_MODAL_CLASS_CHANGE,data:{title:'请选择班级',value:'none'}});


        }

    };


    const subjectInputBlur = () => {

        if (subjectInput.value){

            let result = /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(subjectInput.value);

            if (result){

                setSubInput(e=>({...e,tip:false}));

            }else{

                setSubInput(e=>({...e,tip:true,tipTitle:'输入的学科名称格式不正确'}));

            }

        }else{

            setSubInput(e=>({...e,tip:false}));

        }

    };

    const classRoomInputBlur = () => {

        if (classRoomInput.value){

            let result = /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(classRoomInput.value);

            if (result){

                setClassRoomInput(e=>({...e,tip:false}));

            }else{

                setClassRoomInput(e=>({...e,tip:true,tipTitle:'输入的学科名称格式不正确'}));

            }

        }else{

            setClassRoomInput(e=>({...e,tip:false}));

        }

    };



        return (

            <>

                <Modal
                       className="add-schedule-modal-wrapper"
                       visible={AddTempScheduleModal.show}
                       title="添加临时课程"
                       type={1}
                       width={680}
                       bodyStyle={{height:286}}
                       mask={true}
                       maskClosable={false}
                       cancelText="取消"
                       onOk={ok}
                       onCancel={cancel}
                       destroyOnClose={true}
                >

                    <div className="ModalContent">

                        <Loading spinning={AddTempScheduleModal.loadingShow} tip="加载中...">

                            <table className="modalTable">

                            <tbody>

                                <tr>

                                    <td className="props">学科:</td>

                                    <td style={{position:'relative',zIndex:4}}>

                                        <Tips title="请选择学科"  visible={AddTempScheduleModal.subjectErrorShow}>

                                            {

                                                AddTempScheduleModal.SubjectDropShow?

                                                    <DropDown
                                                        width={150}
                                                        height={300}
                                                        onChange={subjectChange}
                                                        style={{zIndex:10}}
                                                        dropSelectd={AddTempScheduleModal.checkedSubject?AddTempScheduleModal.checkedSubject:{value:"none",title:"请选择学科"}}
                                                        dropList = {AddTempScheduleModal.subject}
                                                        disabled={subjectSelect.disabled}
                                                    >
                                                    </DropDown>

                                                    :

                                                    <div className={`subject-name ${AddTempScheduleModal.SubjectID?'':'none'}`}>{AddTempScheduleModal.SubjectID?AddTempScheduleModal.SubjectName:'您暂未有所教课程'}</div>

                                            }



                                        </Tips>

                                    </td>

                                    <td>

                                        {

                                            subjectInput.edit?

                                                <>

                                                    <Tips title={subjectInput.tipTitle} visible={subjectInput.tip} autoAdjustOverflow={false}>

                                                        <Input value={subjectInput.value} onBlur={subjectInputBlur} onChange={e=>{e.persist();setSubInput(data=>({...data,value:e.target.value}))}}/>

                                                    </Tips>

                                                    <Button type={"link"} onClick={addSubClose}>取消</Button>

                                                </>

                                                :

                                                <Button type={"link"} onClick={addSubShow}>+添加临时学科</Button>


                                        }

                                    </td>

                                </tr>

                                <tr>

                                    <td className="props">上课班级:</td>

                                    <td style={{position:'relative',zIndex:3}}>

                                        <Tips title="请选择班级"  visible={AddTempScheduleModal.classErrorShow}>

                                            <DropDown
                                            width={150}
                                            className={"select-class"}
                                            type="multiple"
                                            dropSelectd={AddTempScheduleModal.checkedClass?AddTempScheduleModal.checkedClass:{value:"none",title:"请选择班级"}}
                                            disabled={AddTempScheduleModal.classDisabled}
                                            mutipleOptions={{
                                                range:2,
                                                dropMultipleList:AddTempScheduleModal.classList,
                                                dropSelectd:AddTempScheduleModal.checkedClass?AddTempScheduleModal.checkedClass:{value:"none",title:"请选择班级"},
                                                dropMultipleChange:classChange,
                                                dropClickSearch:classSearchClick,
                                                dropCancelSearch:classSearchClose,
                                                searchList:AddTempScheduleModal.classSearchList,
                                                searchPlaceholder:"请输入班级名称搜索...",
                                                searchOpen:AddTempScheduleModal.classSearchOpen,
                                                searchLoadingShow:AddTempScheduleModal.classSearchLoadingShow,
                                                CancelBtnShow:AddTempScheduleModal.classSearchCancelShow
                                            }}
                                            style={{zIndex:9}}>

                                        </DropDown>

                                        </Tips>

                                    </td>

                                    <td>

                                        {

                                            tmpClass.className?

                                                <span className={"add-class-name"} title={tmpClass.className}>{tmpClass.className}</span>

                                                :''

                                        }

                                        <Button type={"link"} onClick={e=>setTmpClass(data=>({...data,modalShow:true}))}>{tmpClass.className?'编辑':'+添加'}临时班级</Button>


                                        {

                                            tmpClass.className?

                                                <Button type={"link"} onClick={cancelEditClass}>取消</Button>

                                                :''

                                        }

                                    </td>

                                </tr>

                                <tr>

                                    <td className="props">上课老师:</td>

                                    <td>

                                       <div className="teacher-name" >{UserName}</div>

                                    </td>



                                </tr>

                                <tr>

                                    <td className="props">上课时间:</td>

                                    <td style={{position:'relative',zIndex:2}}>

                                        <Tips title="请选择周次"  visible={AddTempScheduleModal.weekErrorShow}>

                                            <DropDown
                                            width={150}
                                            style={{zIndex:7}}
                                            TitleShow={false}
                                            height={300}
                                            className="week"
                                            dropSelectd={AddTempScheduleModal.checkedWeek?AddTempScheduleModal.checkedWeek:{value:"none",title:"请选择周次"}}
                                            dropList={AddTempScheduleModal.week}
                                            onChange={weekChange}>

                                        </DropDown>

                                        </Tips>

                                        <Tips title="请选择星期"  visible={AddTempScheduleModal.dateErrorShow}>

                                            <DropDown
                                            width={150}
                                            style={{zIndex:7}}
                                            height={300}
                                            className="date"
                                            disabled={AddTempScheduleModal.dateDisabled}
                                            dropSelectd={AddTempScheduleModal.checkedDate?AddTempScheduleModal.checkedDate:{value:"none",title:"请选择星期"}}
                                            dropList={AddTempScheduleModal.date}
                                            onChange={dateChange}>

                                        </DropDown>

                                        </Tips>

                                        <Tips title="请选择课时"  visible={AddTempScheduleModal.classHourErrorShow}>

                                            <DropDown
                                            width={150}
                                            style={{zIndex:7}}
                                            height={300}
                                            TitleShow={false}
                                            className="classHour"
                                            disabled={AddTempScheduleModal.classHourDisabled}
                                            dropSelectd={AddTempScheduleModal.checkedClassHour?AddTempScheduleModal.checkedClassHour:{value:"none",title:"请选择课时"}}
                                            dropList={AddTempScheduleModal.classHour}
                                            onChange={classHourChange}>

                                        </DropDown>

                                        </Tips>

                                    </td>

                                </tr>

                                <tr>

                                    <td className="props">上课教室:</td>

                                    <td style={{position:'relative',zIndex:1,width:160}}>

                                        <Tips title="请选择教室"  visible={AddTempScheduleModal.classRoomErrorShow}>

                                            <DropDown
                                            width={150}
                                            type="multiple"
                                            className={"select-class-room"}
                                            dropSelectd={AddTempScheduleModal.checkedClassRoom?AddTempScheduleModal.checkedClassRoom:{value:"none",title:"请选择教室"}}
                                            disabled={classRoomSelect.disabled}
                                            mutipleOptions={{
                                                range:2,
                                                dropMultipleList:AddTempScheduleModal.classRoom,
                                                dropSelectd:AddTempScheduleModal.checkedClassRoom?AddTempScheduleModal.checkedClassRoom:{value:"none",title:"请选择教室"},
                                                dropMultipleChange:classRoomChange,
                                                dropClickSearch:classRoomSearchClick,
                                                searchList:AddTempScheduleModal.classRoomSearchList,
                                                searchPlaceholder:"请输入教室名称或ID搜索...",
                                                searchLoadingShow:AddTempScheduleModal.classRoomSearchLoadingShow,
                                                dropCancelSearch:classRoomSearchClose,
                                                searchOpen:AddTempScheduleModal.classRoomSearchOpen,
                                                CancelBtnShow:AddTempScheduleModal.classRoomSearchCancelShow
                                            }}
                                            style={{zIndex:6}}>

                                        </DropDown>

                                        </Tips>

                                    </td>

                                    <td>

                                        {

                                            classRoomInput.edit?

                                                <>

                                                    <Tips visible={classRoomInput.tip} title={classRoomInput.tipTitle}>

                                                        <Input value={classRoomInput.value} onBlur={classRoomInputBlur} onChange={e=>{e.persist();setClassRoomInput(data=>({...data,value:e.target.value}))}}/>

                                                    </Tips>

                                                    <Button type={"link"} onClick={addClassRoomClose}>取消</Button>

                                                </>

                                                :

                                                <Button type={"link"} onClick={addClassRoomShow}>+添加临时教室</Button>

                                        }

                                    </td>

                                </tr>

                            </tbody>

                        </table>

                        </Loading>

                    </div>

                </Modal>

                <Modal
                    className="add-edit-class-modal"
                    visible={tmpClass.modalShow}
                    title="添加临时班级"
                    type={1}
                    width={800}
                    mask={true}
                    maskClosable={false}
                    cancelText="取消"
                    onOk={addClassOk}
                    onCancel={e=>setTmpClass(data=>({...data,modalShow:false}))}
                    bodyStyle={{ height:380,padding:0}}
                    destroyOnClose={true}

                >

                    {

                        tmpClass.modalShow?

                            <AddEditClass ref={AddEditClassRef} name={tmpClass.className} stuCheckedList={tmpClass.stuList} gradeClass={AddTempScheduleModal.gradeClass}></AddEditClass>

                            :

                            ''

                    }



                </Modal>

            </>

        );


}

const mapStateToState = (state) => {

    const { AddTempScheduleModal } = state.Teacher;

    const { LoginUser,PeriodWeekTerm } = state;

    return{

        AddTempScheduleModal,

        LoginUser,

        PeriodWeekTerm

    }

};

export default connect(mapStateToState)(memo(AddTempScheduleModal));