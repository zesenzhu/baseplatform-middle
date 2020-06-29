import React,{useEffect,useState,useRef,memo} from 'react';

import {connect} from 'react-redux';

import { Modal,DropDown,Loading,Tips } from "../../../../common";

import {Button,Input} from 'antd';

import ASMActions from '../../actions/Manager/AddScheduleModalActions';

import apiActions from '../../actions/ApiActions';

import appAlertActions from '../../actions/AppAlertActions';

import AddEditClass from '../../component/AddEditClass';

import $ from 'jquery';

import {useStateValue} from "../../actions/hooks";


function AddScheduleModal(props) {

    //state

    //学科能否选取
    const [subjectSelect,setSubSelect] = useState({

       disabled:false

    });

    //教室能否选取
    const [classRoomSelect,setClassRoomSelect] = useState({

        disabled:false

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

        edit:false,

        modalShow:false,

        stuList:[]

    });


    //临时教师输入

    const [teacherInput,setTeacherInput] = useState({

        tip:false,

        tipTitle:'请输入教师姓名',

        edit:false,

        value:''

    });

    //教师多选的

    const [teacherMutiple,setTeacherMutile] = useState({

        tip:false,

        dropSelectd:{value:'none',title:'请选择教师'},

        dropList:[],

        searchOpen:false,

        searchList:[],

        disabled:true,

        searchLoading:false,

        CancelBtnShow:'n'

    });


    //临时教室输入

    const [classRoomInput,setClassRoomInput] = useState({

        tip:false,

        tipTitle:'请输入教室名称',

        edit:false,

        value:''

    });


    const {AddScheduleModal,LoginUser,dispatch,PeriodWeekTerm} = props;

    const { SchoolID,UserID,UserType } = LoginUser;



    //refs

    const AddEditClassRef = useRef();

    const AddScheduleModalRef = useStateValue(AddScheduleModal);

    const subjectInputRef = useStateValue(subjectInput);

    const tmpClassRef = useStateValue(tmpClass);

    const teacherInputRef = useStateValue(teacherInput);

    const classRoomInputRef = useStateValue(classRoomInput);



    //学科选项改变
    const subjectChange = (e) => {

        dispatch({type: ASMActions.ADD_SHEDULE_MODAL_SUBJECT_CHANGE,data: e});

        dispatch({type: ASMActions.ADD_SCHEDULE_MODAL_SUBJECT_ERROR_HIDE});

        const { subject,gradeClass,teachers,classDisabled,teacherDisabled,checkedClass,checkedTeacher } = AddScheduleModal;

        if (!tmpClassRef.current.className&&!teacherInputRef.current.edit){

            dispatch({type: ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_DROP_ABLED});

        }else if(!tmpClassRef.current.className){

            dispatch({type: ASMActions.MANAGER_ADD_SCHEDULE_MODAL_ClASS_DROP_ABLED});


        }else if (!teacherInputRef.current.edit){

            dispatch({type: ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_ABLED});

        }



        const SubjectGrades = subject.find(item=>item.value===e.value).Grades;

        const SubjectGradeList = SubjectGrades.split(',');

        const classList = gradeClass.map(item=>{

            if (SubjectGradeList.findIndex(i=>i===item.id)>=0){

                return item

            }else{

                return;

            }

        }).filter(item=>item!==undefined);

        const teacherList = teachers.map(item=>{

            if (item.SubjectID===e.value){

                return {

                    value:item.TeacherID,

                    title:<span className="teacher-id-name" title={`${item.TeacherName}[${item.TeacherID}]`}><span className="teacher-name">{item.TeacherName}</span><span className="teacher-id" style={{color:'#999'}}>[{item.TeacherID}]</span></span>

                }

            }else{

                return;

            }

        }).filter(i=>i!==undefined);

        dispatch({type: ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_DROP_CHANGE});

        dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_LIST_UPDATE,data:{teacherList,classList}});

        if (teacherList.length===0){

               dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_DISABLED});

               dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_CHANGE,data:{value:"none",title:"该学科下暂无教师"}});

        }

        //切换学科清除搜索输入的内容

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASS_SEARCH_CLOSE});

        $('.select-class .search_cancel_input').hide();

        $('.select-class .search_text_input').val('');

        $('.select-class .dropdown_item1_name.slide .dropdown_item3_li.active').removeClass('.active');

        $('.select-class .dropdown_item1_name.slide').removeClass('slide');

        $('.select-class .dropdown_item1_name').next('.dropdown_list_ul3').hide();


    };



    //班级选项改变
    const classChange = (e) => {

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASS_CHANGE,data:{title:e.value,value:e.id}});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASS_ERROR_HIDE});

    };

    //老师改变
    const teacherChange = (e) => {

        let value='',title='';

        if (subjectInputRef.current.edit){

            value = e.id;

            title = e.value;

            setTeacherMutile(data=>({...data,dropSelectd:{value,title}}));

        }else{

            value = e.value;

            title = e.title;

        }

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_TEACHER_CHANGE,data:{value,title}});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_TEACHER_ERROR_HIDE});

    };
    //周次变更
    const weekChange = (e) => {

        const { value } = e;

        const {WeekNO,NowDate} = PeriodWeekTerm;

        const WeekDay = new Date(NowDate).getDay();

        const { date } = AddScheduleModal;

        if (WeekNO===value){

            const newDate = date.filter(i=>i.value+1>=WeekDay);

            dispatch({type:ASMActions.ADD_SHEDULE_MODAL_INFO_UPDATE,data:{date:newDate}});

            dispatch({type:ASMActions.ADD_SHEDULE_MODAL_DATE_CHANGE,data:{value:'none',title:'请选择星期'}});

            dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSHOUR_CHANGE,data:{value:"none",title:"请选择课时"}});

            dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSHOUR_DISABLED});

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

            dispatch({type:ASMActions.ADD_SHEDULE_MODAL_INFO_UPDATE,data:{date:newDate}});

        }

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_WEEK_CHANGE,data:e});

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_DATE_ABLED});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_WEEK_ERROR_HIDE});

    };

    //星期变更
    const dateChange = (e) => {

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_DATE_CHANGE,data:e});

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSHOUR_ABLED});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_DATE_ERROR_HIDE});

    };

    //课时变更
    const classHourChange = (e) => {

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSHOUR_CHANGE,data:e});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_HIDE});

    };

    //教室变更
    const classRoomChange = (e) =>{

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSROOM_CHANGE,data:{title:e.value,value:e.id}});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_HIDE});

    };
    //点击OK按钮
    const ok = () => {

        let subjectOk=false,classOk=false,teacherOk=false,weekOk=false,dayOk=false,classHourOk=false,classRoomOk=false;

        if (subjectInputRef.current.edit){

             if (subjectInputRef.current.value){

                 let result = /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(subjectInputRef.current.value);

                 if (result){

                     subjectOk = true;

                 }else{

                     setSubInput(e=>({...e,tip:true,tipTitle:'学科名称格式不正确'}));

                 }

             }else{

                setSubInput(e=>({...e,tip:true,tipTitle:'请输入学科名称'}));

             }

        }else{

            if (Object.keys(AddScheduleModalRef.current.checkedSubject).length <= 0||AddScheduleModalRef.current.checkedSubject.value==='none'){

                dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_SUBJECT_ERROR_SHOW});

            }else{

                subjectOk = true;

            }

        }

        if (tmpClassRef.current.className){

            classOk = true;

        }else{

            if (Object.keys(AddScheduleModalRef.current.checkedClass).length <= 0){

                dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASS_ERROR_SHOW});

            }else{

                classOk = true;

            }

        }


        if (teacherInputRef.current.edit){

            if (teacherInputRef.current.value){

                let result =  /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/.test(teacherInputRef.current.value);

                if (result){

                    teacherOk = true;

                }else{

                    setTeacherInput(e=>({...e,tip:true,title:'教师姓名格式不正确'}));

                }


            }else{

                setTeacherInput(e=>({...e,tip:true,title:'请输入教师姓名'}));

            }

        }else{

            if (Object.keys(AddScheduleModalRef.current.checkedTeacher).length <= 0||AddScheduleModalRef.current.checkedTeacher.value==='none'){

                dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_TEACHER_ERROR_SHOW});

            }else{

                teacherOk = true;

            }

        }



        if (Object.keys(AddScheduleModalRef.current.checkedWeek).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_WEEK_ERROR_SHOW});

        }else{

            weekOk = true;

        }

        if (Object.keys(AddScheduleModalRef.current.checkedDate).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_DATE_ERROR_SHOW});

        }else{

            dayOk = true;

        }

        if (Object.keys(AddScheduleModalRef.current.checkedClassHour).length <= 0){

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASSHOUR_ERROR_SHOW});

        }else{

            classHourOk = true;

        }

        if (classRoomInputRef.current.edit){

            if (classRoomInputRef.current.value){

                const result = /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(classRoomInputRef.current.value);

                if (result){

                    classRoomOk = true;

                }else{

                    setClassRoomInput(e=>({...e,tip:true,tipTitle:'教室名称格式错误'}));

                }

            }else{

                setClassRoomInput(e=>({...e,tip:true,tipTitle:'请输入教室名称'}));

            }

        }else{

            if (Object.keys(AddScheduleModalRef.current.checkedClassRoom).length <= 0||AddScheduleModalRef.current.checkedClassRoom.value==='none'){

                dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_SHOW});

            }else{

                classRoomOk = true;

            }

        }



        if (subjectOk&&classOk&&teacherOk&&weekOk&&dayOk&&classHourOk&&classRoomOk){

            const subID = subjectInputRef.current.edit?'':AddScheduleModalRef.current.checkedSubject.value;

            const subName = subjectInputRef.current.edit?subjectInputRef.current.value:'';

            const classID = tmpClassRef.current.className?'':AddScheduleModalRef.current.checkedClass.value;

            const courseClassName = tmpClassRef.current.className?tmpClassRef.current.className:'';

            const teacherID = teacherInputRef.current.edit?'':AddScheduleModalRef.current.checkedTeacher.value;

            const teacherName = teacherInputRef.current.edit?teacherInputRef.current.value:'';

            const classRoomID = classRoomInputRef.current.edit?'':AddScheduleModalRef.current.checkedClassRoom.value;

            const classRoomName = classRoomInputRef.current.edit?classRoomInputRef.current.value:'';

            const stuIDs = tmpClassRef.current.className?tmpClassRef.current.stuList.map(i=>i.StudentID).join(','):'';

            dispatch(ASMActions.commitInfo({ModalInit:modalInit,SubjectID:subID,SubjectName:subName,ClassID:classID,CourseClassName:courseClassName,TeacherID:teacherID,TeacherName:teacherName,ClassRoomID:classRoomID,ClassRoomName:classRoomName,StudentIDs:stuIDs}));

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

            edit:false,

            modalShow:false,

            stuList:[]

        });


        //临时教师输入

        setTeacherInput({

            tip:false,

            tipTitle:'请输入教师姓名',

            edit:false,

            value:''

        });

        //教师多选的

        setTeacherMutile({

            tip:false,

            dropSelectd:{value:'none',title:'请选择教师'},

            dropList:[],

            searchOpen:false,

            searchList:[],

            disabled:true,

            searchLoading:false,

            CancelBtnShow:'n'

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

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_HIDE});

        modalInit();

    };

    //点击班级的搜索
    const classSearchClick = (e) =>{

        const {value} = e;

        dispatch(ASMActions.classSearch(value));

    };

    //取消班级搜索
    const classSearchClose = () =>{

        dispatch(ASMActions.classSearchClose());

    };


    //点击教室搜索
    const classRoomSearchClick = (e) => {

        const {value} = e;

        dispatch(ASMActions.classRoomSearch(value));

    };

    //取消教室搜索
    const classRoomSearchClose = () =>{

        dispatch(ASMActions.classRoomSearchClose());

    };

    //点击教师
    const teacherSearchClick = (e) =>{

        const {value} = e;

        let result =  /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/.test(value);

        if (result){

            setTeacherMutile(d=>({...d,searchOpen:true,searchLoading:true,CancelBtnShow:'y'}));

            apiActions.GetTeacherBySubjectIDAndKey({SchoolID,PeriodID:'',SubjectID:'',Key:value,dispatch}).then(data=>{

                if (data){

                    const searchList = data.map(i=>({id:i.TeacherID,name:i.TeacherName}));

                    setTeacherMutile(d=>({...d,searchList}));

                }

                setTeacherMutile(d=>({...d,searchLoading:false}));

            });

        }else{

            dispatch(appAlertActions.alertWarn({title:'输入教师姓名或工号不正确'}))

        }


        //dispatch(ASMActions.teacherSearch(value));



    };

    //教师取消搜索
    const teacherSearchClose = () =>{

        //dispatch(ASMActions.teacherSearchClose());

        setTeacherMutile(d=>({...d,searchOpen:false,CancelBtnShow:'n'}));

    };



    //非redux事件

    //点击添加临时学科按钮
    const addSubShow = () =>{

      const { gradeClass,teachers,subject } = AddScheduleModal;

      setSubInput(data=>({...data,edit:true}));

      setSubSelect(data=>({...data,disabled:true}));

      dispatch({type: ASMActions.ADD_SHEDULE_MODAL_SUBJECT_CHANGE,data:{value:'none',title:'请选择学科'}});

      dispatch({type: ASMActions.ADD_SCHEDULE_MODAL_SUBJECT_ERROR_HIDE});

      if (!tmpClass.className){

          dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_ClASS_DROP_ABLED});

          dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_LIST_UPDATE,data:{classList:gradeClass}});

          $('.select-class .search_cancel_input').hide();

          $('.select-class .search_text_input').val('');

          $('.select-class .dropdown_item1_name.slide').removeClass('slide');

          $('.select-class .dropdown_item1_name').next('.dropdown_list_ul3').hide();

      }



      if (!teacherInput.edit){

        dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_ABLED});

        const dropList = subject.map(i=>{

            const list = teachers.filter(item=>item.SubjectID===i.value).map(item=>({id:item.TeacherID,name:item.TeacherName}));

            return {

                id:i.value,

                name:i.title,

                list

            }

        });

        setTeacherMutile(e=>({...e,disabled:false,dropList,dropSelectd:{value:'none',title:'请选择教师'}}));

          $('.select-teacher-multiple .search_cancel_input').hide();

          $('.select-teacher-multiple .search_text_input').val('');

          $('.select-teacher-multiple .dropdown_item1_name.slide').removeClass('slide');

          $('.select-teacher-multiple .dropdown_item1_name').next('.dropdown_list_ul3').hide();

    }



};


    //取消编辑临时学科

    const addSubClose = () =>{

        setSubInput(data=>({...data,edit:false,tip:false,value:''}));//切换编辑状态

        setSubSelect(data=>({...data,disabled:false}));//左侧选择禁用

        if (!tmpClass.edit){

            dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_DROP_DISABLED});

            dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_DROP_CHANGE});

        }

        if (!teacherInput.edit){

            dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_DISABLED});

            dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_DROP_CHANGE});

        }

    };


    //取消临时班级

    const cancelEditClass = () => {

        setTmpClass(data=>({...data,className:'',stuList:[]}));

        const { SubjectList,gradeClass,checkedSubject } = AddScheduleModalRef.current;

        if (subjectInput.edit){

            dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_ClASS_DROP_ABLED});

            dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_LIST_UPDATE,data:{classList:gradeClass}});

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

                    dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_ClASS_DROP_ABLED});

                    dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_LIST_UPDATE,data:{classList}});

                }

            }

        }

        $('.select-class .search_cancel_input').hide();

        $('.select-class .search_text_input').val('');

        $('.select-class .dropdown_item1_name.slide').removeClass('slide');

        $('.select-class .dropdown_item1_name').next('.dropdown_list_ul3').hide();


    };


    //点击添加临时教师
    const addTeacherShow = () =>{

        setTeacherInput(data=>({...data,edit:true}));

        setTeacherMutile(data=>({...data,disabled:true,dropSelectd:{value:'none',title:'请选择教师'}}));

        dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_DISABLED});

        dispatch({type: ASMActions.ADD_SHEDULE_MODAL_TEACHER_CHANGE,data:{value:'none',title:'请选择教师'}});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_TEACHER_ERROR_HIDE});

    };


    //取消添加临时教师
    const addTeacherClose = () =>{

        const { checkedSubject,teachers } = AddScheduleModalRef.current;

        setTeacherInput(data=>({...data,edit:false,tip:false,value:''}));

        if (!subjectInput.edit){

            if (checkedSubject&&checkedSubject.value==='none'){

                dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_DISABLED});

                dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_CHANGE,data:{value:'none',title:'请选择教师'}});

            }else{

                const teacherList = teachers.map(item=>{

                    if (item.SubjectID===checkedSubject.value){

                        return {

                            value:item.TeacherID,

                            title:<span className="teacher-id-name" title={`${item.TeacherName}[${item.TeacherID}]`}><span className="teacher-name">{item.TeacherName}</span><span className="teacher-id" style={{color:'#999'}}>[{item.TeacherID}]</span></span>

                        }

                    }else{

                        return;

                    }

                }).filter(i=>i!==undefined);

                dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_TEACHER_DROP_ABLED});

                dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_TEACHER_LIST_UPDATE,data:{teacherList}});

            }

        }else{

            setTeacherMutile(e=>({...e,disabled:false}));

            $('.select-teacher-multiple .search_cancel_input').hide();

            $('.select-teacher-multiple .search_text_input').val('');

            $('.select-teacher-multiple .dropdown_item1_name.slide').removeClass('slide');

            $('.select-teacher-multiple .dropdown_item1_name').next('.dropdown_list_ul3').hide();


        }

    };


    //添加临时教室
    const addClassRoomShow = () =>{

        setClassRoomInput(data=>({...data,edit:true}));

        setClassRoomSelect(data=>({...data,disabled:true}));

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSROOM_CHANGE,data:{title:'请选择教室',value:'none'}});

        dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASSROOM_ERROR_HIDE});

    };

    //添加临时教室取消
    const addClassRoomClose = () =>{

        setClassRoomInput(data=>({...data,edit:false,tip:false,value:''}));

        setClassRoomSelect(data=>({...data,disabled:false}));

        dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASSROOM_CHANGE,data:{title:'请选择教室',value:'none'}});

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

            dispatch({type:ASMActions.MANAGER_ADD_SCHEDULE_MODAL_CLASS_DROP_DISABLED});

            dispatch({type:ASMActions.ADD_SCHEDULE_MODAL_CLASS_ERROR_HIDE});

            dispatch({type:ASMActions.ADD_SHEDULE_MODAL_CLASS_CHANGE,data:{title:'请选择班级',value:''}});


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


    const teacherInputBlur = () => {

        if (teacherInput.value){

            let result =  /^[A-Za-z0-9]{1,30}$|^[a-zA-Z0-9_.·\u4e00-\u9fa5 ]{0,48}[a-zA-Z0-9_.·\u4e00-\u9fa5]$/.test(teacherInput.value);

            if (result){

                setTeacherInput(e=>({...e,tip:false}));

            }else{

                setTeacherInput(e=>({...e,tip:true,tipTitle:'输入的学科名称格式不正确'}));

            }

        }else{

            setTeacherInput(e=>({...e,tip:false}));

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

            <Modal className="add-schedule-modal-wrapper" visible={AddScheduleModal.show}
                   title="添加临时课程"
                   type={1}
                   width={680}
                   bodyStyle={{height:286}}
                   mask={true}
                   maskClosable={false}
                   cancelText="取消"
                   onOk={ok}
                   onCancel={cancel}
                   //destroyOnClose={true}
            >

                <div className="ModalContent">

                    <Loading spinning={AddScheduleModal.loadingShow} tip="加载中...">

                        <table className="modalTable">

                        <tbody>

                            <tr>

                                <td className="props">学科:</td>

                                <td style={{position:"relative",zIndex:5,width:160}}>

                                    <Tips title="请选择学科"  visible={AddScheduleModal.subjectErrorShow}>

                                        <DropDown
                                            width={150}
                                            height={300}
                                            onChange={subjectChange}
                                            style={{zIndex:10}}
                                            dropSelectd={AddScheduleModal.checkedSubject?AddScheduleModal.checkedSubject:{value:"none",title:"请选择学科"}}
                                            dropList = {AddScheduleModal.subject}
                                            disabled={subjectSelect.disabled}
                                        >

                                        </DropDown>

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

                                <td style={{position:"relative",zIndex:4,width:160}}>

                                    <Tips title="请选择班级"  visible={AddScheduleModal.classErrorShow}>



                                        <DropDown

                                        className="select-class"

                                        width={150}

                                        type="multiple"

                                        disabled={AddScheduleModal.classDisabled}

                                        dropSelectd={AddScheduleModal.checkedClass?AddScheduleModal.checkedClass:{value:"none",title:"请选择班级"}}

                                        mutipleOptions={{
                                            range:2,
                                            dropMultipleList:AddScheduleModal.classList,
                                            dropMultipleChange:classChange,
                                            dropClickSearch:classSearchClick,
                                            dropCancelSearch:classSearchClose,
                                            dropSelectd:AddScheduleModal.checkedClass?AddScheduleModal.checkedClass:{value:"none",title:"请选择班级"},
                                            searchList:AddScheduleModal.classSearchList,
                                            searchPlaceholder:"请输入班级名称进行搜索...",
                                            searchOpen:AddScheduleModal.classSearchOpen,
                                            searchLoadingShow:AddScheduleModal.classSearchLoadingShow,
                                            CancelBtnShow:AddScheduleModal.classSearchCancelShow
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

                                <td style={{position:"relative",zIndex:3,width:160}}>

                                    <Tips title="请选择教师" visible={AddScheduleModal.teacherErrorShow}>

                                        {

                                            subjectInput.edit?

                                                <DropDown
                                                    width={150}
                                                    className={"select-teacher-multiple"}
                                                    type="multiple"
                                                    disabled={teacherMutiple.disabled}
                                                    dropSelectd={teacherMutiple.dropSelectd}
                                                    mutipleOptions={{
                                                        range:2,
                                                        dropMultipleList:teacherMutiple.dropList,
                                                        dropSelectd:teacherMutiple.dropSelectd,
                                                        dropMultipleChange:teacherChange,
                                                        dropClickSearch:teacherSearchClick,
                                                        dropCancelSearch:teacherSearchClose,
                                                        searchList:teacherMutiple.searchList,
                                                        searchPlaceholder:"请输入教师名称进行搜索...",
                                                        searchOpen:teacherMutiple.searchOpen,
                                                        searchLoadingShow:teacherMutiple.searchLoading,
                                                        CancelBtnShow:teacherMutiple.CancelBtnShow
                                                    }}
                                                    onChange={teacherChange}
                                                    height={200}
                                                    style={{zIndex:8}}
                                                >

                                                </DropDown>

                                                :

                                                <DropDown
                                                    width={150}
                                                    type="simple"
                                                    TitleShow={false}
                                                    disabled={AddScheduleModal.teacherDisabled}
                                                    dropSelectd={AddScheduleModal.checkedTeacher?AddScheduleModal.checkedTeacher:{value:"none",title:"请选择教师"}}
                                                    dropList={AddScheduleModal.teacherList}
                                                    onChange={teacherChange}
                                                    height={300}
                                                    style={{zIndex:8}}>

                                                </DropDown>

                                        }

                                    </Tips>

                                </td>

                                <td>

                                    {

                                        teacherInput.edit?

                                            <>

                                                <Tips visible={teacherInput.tip} title={teacherInput.tipTitle}>

                                                    <Input value={teacherInput.value} onBlur={teacherInputBlur} onChange={e=>{e.persist();setTeacherInput(data=>({...data,value:e.target.value}))}}/>

                                                </Tips>

                                                <Button type={"link"} onClick={addTeacherClose}>取消</Button>

                                            </>

                                            :

                                            <Button type={"link"} onClick={addTeacherShow}>+添加临时教师</Button>

                                    }

                                </td>

                            </tr>

                            <tr>

                                <td className="props">上课时间:</td>

                                <td style={{position:"relative",zIndex:2}}>

                                    <Tips title="请选择周次"  visible={AddScheduleModal.weekErrorShow}>

                                        <DropDown
                                            width={150}
                                            style={{zIndex:7}}
                                            height={300}
                                            className="week"
                                            TitleShow={false}
                                            dropSelectd={AddScheduleModal.checkedWeek?AddScheduleModal.checkedWeek:{value:"none",title:"请选择周次"}}
                                            dropList={AddScheduleModal.week}
                                            onChange={weekChange}>

                                        </DropDown>

                                    </Tips>

                                    <Tips title="请选择星期"  visible={AddScheduleModal.dateErrorShow}>

                                        <DropDown
                                        width={150}
                                        style={{zIndex:7}}
                                        height={300}
                                        className="date"
                                        disabled={AddScheduleModal.dateDisabled}
                                        dropSelectd={AddScheduleModal.checkedDate?AddScheduleModal.checkedDate:{value:"none",title:"请选择星期"}}
                                        dropList={AddScheduleModal.date}
                                        onChange={dateChange}>

                                    </DropDown>

                                    </Tips>

                                    <Tips title="请选择课时" visible={AddScheduleModal.classHourErrorShow}>

                                        <DropDown
                                        width={150}
                                        style={{zIndex:7}}
                                        height={300}
                                        TitleShow={false}
                                        className="classHour"
                                        disabled={AddScheduleModal.classHourDisabled}
                                        dropSelectd={AddScheduleModal.checkedClassHour?AddScheduleModal.checkedClassHour:{value:"none",title:"请选择课时"}}
                                        dropList={AddScheduleModal.classHour}
                                        onChange={classHourChange}>

                                    </DropDown>

                                    </Tips>

                                </td>

                            </tr>

                            <tr>

                                <td className="props">上课教室:</td>

                                <td style={{position:"relative",zIndex:1,width:160}}>

                                    <Tips title="请选择教室"  visible={AddScheduleModal.classRoomErrorShow}>

                                        <DropDown
                                        width={150}
                                        type="multiple"
                                        className={"select-class-room"}
                                        disabled={classRoomSelect.disabled}
                                        dropSelectd={AddScheduleModal.checkedClassRoom?AddScheduleModal.checkedClassRoom:{value:"none",title:"请选择教室"}}
                                        mutipleOptions={{
                                            range:2,
                                            dropMultipleList:AddScheduleModal.classRoom,
                                            dropSelectd:AddScheduleModal.checkedClassRoom?AddScheduleModal.checkedClassRoom:{value:"none",title:"请选择教室"},
                                            dropMultipleChange:classRoomChange,
                                            dropClickSearch:classRoomSearchClick,
                                            searchList:AddScheduleModal.classRoomSearchList,
                                            searchPlaceholder:"请输入教室名称或ID进行搜索...",
                                            searchLoadingShow:AddScheduleModal.classRoomSearchLoadingShow,
                                            dropCancelSearch:classRoomSearchClose,
                                            searchOpen:AddScheduleModal.classRoomSearchOpen,
                                            CancelBtnShow:AddScheduleModal.classRoomSearchCancelShow
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

                        <AddEditClass ref={AddEditClassRef} name={tmpClass.className} stuCheckedList={tmpClass.stuList} gradeClass={AddScheduleModal.gradeClass}></AddEditClass>

                        :

                        ''

                }



            </Modal>

        </>

    );

}

const mapStateToState = (state) => {

    const { AddScheduleModal } = state.Manager;

    const { LoginUser,PeriodWeekTerm } = state;

    return{

        AddScheduleModal,

        LoginUser,

        PeriodWeekTerm

    }

};

export default connect(mapStateToState)(memo(AddScheduleModal));