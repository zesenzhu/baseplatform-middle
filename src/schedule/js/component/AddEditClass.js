import React,{useState,useRef,useEffect,memo,forwardRef,useImperativeHandle} from "react";

import { connect } from "react-redux";

import { Scrollbars } from "react-custom-scrollbars";

import { Input } from "antd";

import {Tips,Modal} from "../../../common";

import SelectStudent from './SelectStudent';


function AddEditClass(props,ref){

    const [loading,setLoading] = useState(false);

    const [className,setClassName] = useState({

        tip:false,

        tipTitle:'请输入班级名称',

        value:''

    });

    const [stuList,setStuList] = useState([]);

    const [modalShow,setModalShow] = useState(false);

    const [stuTip,setStuTip] = useState(false);


    //props

    const { gradeClass,stuCheckedList,name } = props;

    const SelectStudentRef = useRef();


    useEffect(()=>{

        setStuList(stuCheckedList);

        setClassName(e=>({...e,value:name}));

    },[]);


    //选择学生

    const AddStudentModalOk = () => {

        const { stuCheckedList } = SelectStudentRef.current;

        setModalShow(false);

        setStuTip(false);

        setStuList(stuCheckedList);

    };


    //删除学生
    const onDeleteStudentClick = i => {

        const checkedList = stuList.filter(item=>item.StudentID!==i.StudentID);

        setStuList(checkedList);

    };
    //清空
    const onDeleteAllClick = () => {

        setStuList([]);

    };


    //学科名称blur

    const courseClassNameBlur = () =>{

        if (className.value===''){

            setClassName(data=>({...data,tip:false}));

        }else{

            let result = /^[_\->/()（）A-Za-z0-9\u4e00-\u9fa5]{0,50}$/.test(className.value);

            if (result){

                setClassName(data=>({...data,tip:false}));

            }else{

                setClassName(data=>({...data,tip:true,tipTitle:'班级名称格式不正确'}));

            }

        }

    };


    useImperativeHandle(ref,()=>({

        stuListCheckList:stuList,

        className:className.value,

        showTip:(title)=>setClassName(e=>({...e,tip:true,tipTitle:title})),

        showStuTip:()=>setStuTip(true),

        classNameTrue:!className.tip

    }));


    return (

        <>

            <div ref={ref} id="HandleCourseClass" className="HandleCourseClass">

                <div className="row clearfix">

                    <div className="row-column">

                        <span className="left">教学班名称：</span>

                        <span className="right ">

                            <Tips visible={className.tip} title={className.tipTitle}>

                                <Input
                                    placeholder="请输入教学班名称..."
                                    style={{ width:240 }}
                                    type="text"
                                    maxLength={20}
                                    onBlur={courseClassNameBlur}
                                    onChange={e=>{e.persist();setClassName(data=>({...data,value:e.target.value}))}}
                                    value={className.value}
                                />

                            </Tips>

                        </span>

                    </div>

                </div>

                <div className="row clearfix">

                    <div className=" row-column row-column-2">

                        <span className="left">学生名单：</span>

                        <span className="right right-2">

                            <Tips visible={stuTip} title={"请选择学生"}>

                                <div className="Student-box">

                                <div className="box-top">

                                    <span className="top-left">
                                      已选
                                      <span className="count">
                                        {stuList.length}
                                      </span>
                                      名学生
                                    </span>

                                    <span className="top-right">

                                        <span onClick={e=>setModalShow(true)} className="handle select">选择</span>

                                        <span onClick={onDeleteAllClick} className="handle deleteAll">清空</span>

                                    </span>

                                </div>

                                <Scrollbars style={{ width: 100 + "%", height:228 }}>

                                    <div className="box-content">

                                        {
                                            stuList.map((i,k) => {

                                                return (
                                                    <span className="content-card" key={k}>

                                                  <span title={i.StudentName} className="card-name">{i.StudentName}</span>

                                                  <span title={i.StudentID} className="card-id">{i.StudentID}</span>

                                                  <span onClick={e=>onDeleteStudentClick(i)} className="icon-x"></span>

                                          </span>

                                                );
                                            })}

                                    </div>

                                </Scrollbars>

                            </div>

                            </Tips>

                        </span>

                    </div>

                </div>

            </div>

            <Modal

                type="1"
                width={680}
                mask={false}
                title={"选择学生"}
                bodyStyle={{ height: 477 + "px", padding: 0 }}
                visible={modalShow}
                onOk={AddStudentModalOk}
                onCancel={e=>setModalShow(false)}
            >

                {

                    modalShow?

                        <SelectStudent stuCheckedList={stuList} gradeClass={gradeClass} ref={SelectStudentRef}></SelectStudent>

                        :''

                }

            </Modal>

        </>
    );

}


const mapStateToProps = (state) => {

  return state;

};

export default connect(mapStateToProps,null,null,{forwardRef:true})(memo(forwardRef(AddEditClass)));
