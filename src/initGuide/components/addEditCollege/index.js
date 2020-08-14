import React,{useEffect,useCallback,useMemo,useRef,useState,memo,useImperativeHandle,forwardRef} from 'react';

import {useSelector,useDispatch} from 'react-redux';

import {Input} from "antd";

import {Modal,Tips,Loading} from "../../../common";

import {schoolNameReg,schoolCodeReg} from "../../actions/utils";

import {AddCollege,EditCollege} from '../../actions/apiActions';

import {btnWarnAlertShow, successAlertShow} from "../../store/appAlert";

import './index.scss';

function AddEditCollege(props,ref) {

    //学院名称
    const [name,setName] = useState({

       tip:false,

       title:'请输入学院名称',

       value:''

    });

    //学院代码
    const [code,setCode] = useState({

        tip:false,

        title:'请输入学院代码',

        value:''

    });


    //loading
    const [loading,setLoading] = useState(false);

    const {UserType,UserID,UserClass,SchoolID} = useSelector(state=>state.LoginUser);

    const dispatch  = useDispatch();

    const { isEdit,show,CollegeCode,CollegeName,CollegeID } = props;

    const { closeModal,okModal } = props;

    const nameRef = useRef(name);

    const codeRef = useRef(code);

    const schoolIDRef = useRef(SchoolID);

    const isEditRef = useRef(isEdit);

    const collegeIDRef = useRef(CollegeID);

    const collegeNameRef = useRef(CollegeName);

    const collegeCodeRef = useRef(CollegeCode);

    useEffect(()=>{

        schoolIDRef.current = SchoolID;

    },[SchoolID]);

    useEffect(()=>{

        isEditRef.current = isEdit;

    },[isEdit]);

    useEffect(()=>{

        collegeIDRef.current = CollegeID;

    },[CollegeID]);

    useEffect(()=>{

        collegeNameRef.current = CollegeName;

    },[CollegeName]);

    useEffect(()=>{

        collegeCodeRef.current = CollegeCode;

    },[CollegeCode]);


    useEffect(()=>{

        if (isEdit){

            setCode(d=>{

                codeRef.current = {...d,value:CollegeCode};

                return {...d,value:CollegeCode};

            });

            setName(d=>{

                nameRef.current = {...d,value:CollegeName};

                return {...d,value:CollegeName};

            })

        }

    },[show]);


    //学校名称变化
    const nameChange = useCallback((e)=>{

        e.persist();

        setName(d=>{

            nameRef.current = { ...d,value:e.target.value};

            return { ...d,value:e.target.value};

        })

    },[]);

    //学校代码变化
    const codeChange = useCallback((e)=>{

        e.persist();

        setCode(d=>{

            codeRef.current = { ...d,value:e.target.value};

            return { ...d,value:e.target.value};

        })

    },[]);

    //学校名称blur
    const nameBlur = useCallback((e)=>{

        const { value } = nameRef.current;

        if (value){

            const result = schoolNameReg(value);

            if (result){

                setName(d=>{

                    nameRef.current = { ...d,tip:false};

                    return { ...d,tip:false};

                })

            }else{

                setName(d=>{

                    nameRef.current = { ...d,tip:true,title:"学院名称由中文,英文,数字或()（）等特殊字符组成"};

                    return { ...d,tip:true,title:"学院名称由中文,英文,数字和()（）等特殊字符组成"};

                })

            }

        }else{

            setName(d=>{

                nameRef.current = { ...d,tip:true,title:"请输入学院名称"};

                return { ...d,tip:true,title:"请输入学院名称"};

            })

        }

    },[]);

    //学校代码blur
    const codeBlur = useCallback((e)=>{

        const { value } = codeRef.current;

        if (value){

            const result = schoolCodeReg(value);

            if (result){

                setCode(d=>{

                    codeRef.current = { ...d,tip:false};

                    return { ...d,tip:false};

                })

            }else{

                setCode(d=>{

                    codeRef.current = { ...d,tip:true,title:"学院代码由英文和数字组成"};

                    return { ...d,tip:true,title:"学院代码由英文和数字组成"};

                })

            }

        }else{

            setCode(d=>{

                codeRef.current = { ...d,tip:true,title:"请输入学院代码"};

                return { ...d,tip:true,title:"请输入学院代码"};

            })

        }

    },[]);

    const ok = useCallback(()=>{

        let nameOk=false,codeOk=false;

        if (!nameRef.current.value){

            setName(d=>{

                nameRef.current = {...d,tip:true,title:'请输入学院名称'};

               return {...d,tip:true,title:'请输入学院名称'};

            });

        }

        if (!codeRef.current.value){

            setCode(d=>{

                codeRef.current = {...d,tip:true,title:'请输入学院代码'};

                return {...d,tip:true,title:'请输入学院代码'};

            });

        }

        if (!nameRef.current.tip&&nameRef.current.value){

            nameOk = true;

        }

        if (!codeRef.current.tip&&codeRef.current.value){

            codeOk = true;

        }

        if (nameOk&&codeOk){

            setLoading(true);

            if (isEditRef.current){

                if (collegeCodeRef.current===codeRef.current.value&&collegeNameRef.current===nameRef.current.value){

                    dispatch(btnWarnAlertShow({title:'没有任何变化'}));

                    setLoading(false);

                }else{

                    EditCollege({dispatch,SchoolID:schoolIDRef.current,CollegeID:collegeIDRef.current,CollegeName:nameRef.current.value,CollegeCode:codeRef.current.value}).then(data=>{

                        if (data===0){

                            okModal();

                            dispatch(successAlertShow({title:'修改成功'}));

                        }

                        setLoading(false);

                    })

                }


            }else{

                AddCollege({dispatch,SchoolID:schoolIDRef.current,CollegeCode:codeRef.current.value,CollegeName:nameRef.current.value}).then(data=>{

                    if (data===0){

                        okModal();

                        dispatch(successAlertShow({title:'添加成功'}));

                    }

                    setLoading(false);

                })

            }


        }

    },[]);


    //modal初始化

    const modalInit = ()=>{

        setName({

            tip:false,

            title:'请输入学院名称',

            value:''

        });

        setCode({

            tip:false,

            title:'请输入学院代码',

            value:''

        });

        setLoading(false);

    };


    useImperativeHandle(ref,()=>({

        modalInit

    }));

    return(

        <Modal

            type={"1"}

            visible={show}

            title={isEdit?'编辑学院':'添加学院'}

            width={400}

            bodyStyle={{height:150}}

            className={"add-edit-college"}

            onOk={ok}

            onCancel={closeModal}

        >

            <Loading spinning={loading} tip={"加载中,请稍候..."}>

                <table ref={ref}>

                    <tbody>

                    <tr>

                        <td className={"col1"}>院系代码:</td>

                        <td className={"col2"}>

                            <Tips visible={code.tip} title={code.title}>

                                <Input onBlur={codeBlur} placeholder={"请输入院系代码"} value={code.value} onChange={codeChange}/>

                            </Tips>

                        </td>

                    </tr>

                    <tr>

                        <td className={"col1"}>院系名称:</td>

                        <td className={"col2"}>

                            <Tips visible={name.tip} title={name.title}>

                                <Input onBlur={nameBlur} placeholder={"请输入院系名称"} value={name.value} onChange={nameChange}/>

                            </Tips>

                        </td>

                    </tr>

                    </tbody>

                </table>

            </Loading>

        </Modal>

    )

}


export default memo(forwardRef(AddEditCollege));